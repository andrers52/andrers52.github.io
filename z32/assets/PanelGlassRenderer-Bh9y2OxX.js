import{b as m}from"./z32-CGATcw43.js";const _=`// GPU panel-glass renderer — screen-space rounded-rectangle glass backing.
//
// Each panel is a flat rounded rectangle drawn in screen-space pixel
// coordinates.  The DOM panel element renders the content and interaction
// layer above this quad; the GPU only supplies the semi-transparent surface,
// border, and a subtle glass sheen.
//
// The panel is drawn *after* world labels and *before* the browser-composited
// DOM overlay. The compositor copies the canvas-so-far into a sampleable
// texture; this shader refracts that captured scene through the rounded-rect
// glass surface, giving the same lens-like feel as the node-pill material.

struct PanelGlassInstance {
    centerX:       f32,
    centerY:       f32,
    width:         f32,
    height:        f32,
    cornerRadius:  f32,
    opacity:       f32,
    fillR:         f32,
    fillG:         f32,
    fillB:         f32,
    fillA:         f32,
    borderR:       f32,
    borderG:       f32,
    borderB:       f32,
    borderA:       f32,
    glassTintR:    f32,
    glassTintG:    f32,
    glassTintB:    f32,
    fresnelPower:  f32,
    glowIntensity: f32,
    glowR:         f32,
    glowG:         f32,
    glowB:         f32,
    specIntensity: f32,
    specPower:     f32,
    shape:         f32,
    tabDir:        f32,
}

// Minimal camera uniforms — only the canvas pixel dimensions are needed for
// the screen-space orthographic projection.
struct Camera {
    canvasW: f32,
    canvasH: f32,
    _pad:    vec2<f32>,
}

@group(0) @binding(0) var<storage, read> panels: array<PanelGlassInstance>;
@group(0) @binding(1) var<uniform> camera: Camera;
// Captured scene (background + sprites + edges + text), copied by the
// compositor immediately before the panel-glass pass. Sampling this copy
// lets the glass body refract what is behind the panel instead of just
// tinting over a blank background.
@group(0) @binding(2) var sceneTex: texture_2d<f32>;
@group(0) @binding(3) var sceneSampler: sampler;

struct VertexOutput {
    @builtin(position) pos:           vec4<f32>,
    @location(0) uv:                  vec2<f32>,
    @location(1) halfSize:            vec2<f32>,
    @location(2) cornerRadius:        f32,
    @location(3) fillColor:           vec4<f32>,
    @location(4) borderColor:         vec4<f32>,
    @location(5) opacity:             f32,
    @location(6) glassTint:           vec3<f32>,
    @location(7) fresnelPower:        f32,
    @location(8) glowColor:           vec3<f32>,
    @location(9) glowIntensity:       f32,
    @location(10) specIntensity:      f32,
    @location(11) specPower:          f32,
    @location(12) shape:              f32,
    @location(13) tabDir:             f32,
}

const VERTS_PER_PANEL: u32 = 6u;

// Pixel-space antialiasing feather and border ring width.
const AA_FEATHER: f32 = 1.0;
const BORDER_WIDTH: f32 = 1.5;

const LIGHT_DIR: vec3<f32> = vec3<f32>(-0.45, 0.7, 0.55);
const VIEW_DIR:  vec3<f32> = vec3<f32>(0.0, 0.0, 1.0);

// ── Glass-slab refraction ─────────────────────────────────────────────────
// The panel is modelled as a thick flat slab of glass with rounded, bevelled
// edges. The interior is flat (head-on view ⇒ the hexagons behind show through
// near-undistorted, only tinted blue), while the bevelled rim acts like a thick
// lens that bends the background — the "expected" glass distortion lives there.
const GLASS_IOR:        f32 = 1.5;
// Width (px) of the bevelled edge band where the slab curves down to its rim.
const BEVEL_PX:         f32 = 42.0;
// How far the surface normal tilts outward at the very rim (drives refraction).
const EDGE_TILT:        f32 = 1.65;
// Pixel displacement applied to the refracted lookup, and its hard clamp.
const REFRACT_SCALE:    f32 = 46.0;
const REFRACT_MAX_DISP: f32 = 64.0;
// Chromatic dispersion: R and B rays bend slightly differently at the rim.
const DISPERSION:       f32 = 0.018;
// Beer–Lambert blue tint: how strongly the glass colours the transmitted scene
// in the flat interior, and the extra density picked up across the thick rim.
const TINT_BASE:        f32 = 0.30;
const TINT_EDGE:        f32 = 0.55;

// Panel shape selector (PanelGlassInstance.shape).
const SHAPE_ROUNDED_RECT: f32 = 0.0;   // all four corners rounded (panels)
const SHAPE_TAB:          f32 = 1.0;   // browser-tab silhouette (rail tab)

// Browser-tab shoulder radius / flare band (px). The bounds stream inflates the
// tab quad height by 2× this beyond the icon; MUST match PANEL_TAB_FLARE_PX in
// nexus-brainiac-elements.ts.
const TAB_FLARE_PX: f32 = 10.0;

// Signed-distance function for an axis-aligned rounded box with a UNIFORM corner
// radius, centred at origin.
fn sd_rounded_box(p: vec2<f32>, b: vec2<f32>, r: f32) -> f32 {
    let q = abs(p) - b + r;
    return length(max(q, vec2<f32>(0.0))) + min(max(q.x, q.y), 0.0) - r;
}

// SDF of a box whose corner radius differs PER X-SIDE: \`r_neg\` on the -x side,
// \`r_pos\` on the +x side. Square (r=0) on the flat side, convex round on the
// free side reproduces the CSS rail-tab body silhouette.
fn sd_tab_box(p: vec2<f32>, b: vec2<f32>, r_neg: f32, r_pos: f32) -> f32 {
    let r = select(r_neg, r_pos, p.x >= 0.0);
    let q = abs(p) - b + r;
    return length(max(q, vec2<f32>(0.0))) + min(max(q.x, q.y), 0.0) - r;
}

// Smooth-union (polynomial smin): blends two SDFs \`a\`,\`b\` with blend radius \`k\`.
// Where the two surfaces meet, the join is a smooth CONCAVE fillet of ~radius k
// — the reverse-curve shoulder, with no hard corners/points.
fn smin(a: f32, b: f32, k: f32) -> f32 {
    let h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
    return mix(b, a, h) - k * h * (1.0 - h);
}

// Rail-tab SDF in the canonical frame (flat/connected edge on the LEFT at
// x = -b.x, free edge on the RIGHT). A browser-tab silhouette: an icon-sized
// body (rounded only on the free corners) that flares WIDER toward the screen
// edge, the flare joining the body with a smooth concave shoulder.
//
// Built as the smooth-union of:
//   • body  — icon-sized box, square on the connected side, \`r\`-rounded free side
//   • base  — a full-height (±b.y) slab hugging the screen edge (the wider foot)
// The smin blend (radius \`fr\`) turns the body→base step into the concave shoulder.
fn sd_rail_tab(p: vec2<f32>, b: vec2<f32>, r: f32, fr: f32) -> f32 {
    // Body: half-height pulled in by \`fr\` so it matches the icon; the base then
    // restores the full ±b.y extent at the screen edge.
    let body_hy = max(b.y - fr, r);
    let body = sd_tab_box(p, vec2<f32>(b.x, body_hy), 0.0, r);

    // Base foot: full quad height, a strip of width ~2·fr against the screen edge.
    let base_cx = -b.x;           // centre x (left side at the screen edge)
    let base = sd_rounded_box(p - vec2<f32>(base_cx, 0.0), vec2<f32>(0.0, b.y), 2.0);

    // Smooth-union: the body and the taller base merge with a concave shoulder.
    return smin(body, base, fr);
}

// Dispatch to the active panel shape. For SHAPE_TAB the free edge is determined
// by \`dir\`: dir>0 ⇒ flat (screen-edge) side on the LEFT, free side on the RIGHT
// (left rail); dir<0 ⇒ mirrored (right rail / chat).
fn sd_panel(p: vec2<f32>, b: vec2<f32>, r: f32, shape: f32, dir: f32) -> f32 {
    if (shape == SHAPE_TAB) {
        // Flip x so the canonical frame (flat edge left) matches \`dir\`.
        let pf = vec2<f32>(p.x * sign(dir), p.y);
        // Shoulder radius = the flare band the bounds stream added beyond the
        // icon (the quad half-height exceeds the icon half-height by exactly this,
        // so the body fills the icon and the shoulders occupy the extra band).
        // MUST equal PANEL_TAB_FLARE_PX in nexus-brainiac-elements.ts.
        let fr = TAB_FLARE_PX;
        return sd_rail_tab(pf, b, r, fr);
    }
    return sd_rounded_box(p, b, r);
}

// Outward 2-D gradient of the active panel SDF (finite differences in local px).
fn sd_panel_grad(p: vec2<f32>, b: vec2<f32>, r: f32, shape: f32, dir: f32) -> vec2<f32> {
    let e = 1.0;
    let dx = sd_panel(p + vec2<f32>(e, 0.0), b, r, shape, dir) - sd_panel(p - vec2<f32>(e, 0.0), b, r, shape, dir);
    let dy = sd_panel(p + vec2<f32>(0.0, e), b, r, shape, dir) - sd_panel(p - vec2<f32>(0.0, e), b, r, shape, dir);
    let g = vec2<f32>(dx, dy);
    let l = length(g);
    return select(vec2<f32>(0.0), g / l, l > 1e-4);
}

@vertex
fn panel_glass_vs(@builtin(vertex_index) vid: u32) -> VertexOutput {
    let panelIdx  = vid / VERTS_PER_PANEL;
    let localVid  = vid % VERTS_PER_PANEL;
    let panel     = panels[panelIdx];

    let hw = panel.width  * 0.5;
    let hh = panel.height * 0.5;

    // Quad corners: triangle-list 0,1,2 and 2,1,3.
    let cornerIdx = array<u32, 6>(0u, 1u, 2u, 2u, 1u, 3u)[localVid];
    let signX = select(-1.0, 1.0, (cornerIdx & 1u) == 1u);   // odd = right
    let signY = select(-1.0, 1.0, (cornerIdx & 2u) == 0u);   // <2 = top

    let padX = hw + AA_FEATHER;
    let padY = hh + AA_FEATHER;
    let localX = signX * padX;
    let localY = signY * padY;

    let px = panel.centerX + localX;
    // Screen-space Y points down in CSS / WebGPU; the input centerY is already
    // a viewport-relative top-left origin from getBoundingClientRect().
    let py = panel.centerY + localY;

    var out: VertexOutput;
    // Map pixel coordinates to clip space.
    out.pos.x = (px / camera.canvasW) * 2.0 - 1.0;
    out.pos.y = 1.0 - (py / camera.canvasH) * 2.0;
    out.pos.z = 0.0;
    out.pos.w = 1.0;

    out.uv             = vec2<f32>(localX, localY);
    out.halfSize       = vec2<f32>(hw, hh);
    out.cornerRadius   = panel.cornerRadius;
    out.fillColor      = vec4<f32>(panel.fillR, panel.fillG, panel.fillB, panel.fillA);
    out.borderColor    = vec4<f32>(panel.borderR, panel.borderG, panel.borderB, panel.borderA);
    out.opacity        = panel.opacity;
    out.glassTint      = vec3<f32>(panel.glassTintR, panel.glassTintG, panel.glassTintB);
    out.fresnelPower   = panel.fresnelPower;
    out.glowColor      = vec3<f32>(panel.glowR, panel.glowG, panel.glowB);
    out.glowIntensity  = panel.glowIntensity;
    out.specIntensity  = panel.specIntensity;
    out.specPower      = panel.specPower;
    out.shape          = panel.shape;
    out.tabDir         = panel.tabDir;
    return out;
}

// Surface normal of the glass slab. The interior is flat (N ≈ +Z), so the
// background shows through near-undistorted; within \`BEVEL_PX\` of the rounded
// rim the surface curves down and the normal tilts outward along the SDF
// gradient, giving the thick-glass edge that bends the hexagons behind it.
fn panel_slab_normal(p: vec2<f32>, b: vec2<f32>, r: f32, d: f32, shape: f32, dir: f32) -> vec3<f32> {
    // 0 in the flat interior → 1 at the rim; smooth bevel ramp.
    let bevel = smoothstep(-BEVEL_PX, 0.0, d);
    let grad = sd_panel_grad(p, b, r, shape, dir);
    // Tilt the normal outward, scaled by a curved (quadratic) bevel profile so
    // the slope is gentle just inside the bevel and steep right at the rim.
    let tilt = grad * EDGE_TILT * bevel * bevel;
    return normalize(vec3<f32>(-tilt, 1.0));
}

@fragment
fn panel_glass_fs(in: VertexOutput) -> @location(0) vec4<f32> {
    let b = in.halfSize;
    let r = in.cornerRadius;
    let shape = in.shape;
    let dir = in.tabDir;
    let d = sd_panel(in.uv, b, r, shape, dir);

    // Flat-slab normal with bevelled, refracting rounded edges.
    let N = panel_slab_normal(in.uv, b, r, d, shape, dir);
    let bevel = smoothstep(-BEVEL_PX, 0.0, d); // 0 interior → 1 at the rim

    // ── Refracted scene (the see-through of the glass) ───────────────────
    // Refract the head-on view ray through the slab normal and sample the
    // captured scene at the displaced pixel. In the flat interior the ray is
    // un-bent (background shows through straight); the bevel bends it strongly.
    let canvas    = vec2<f32>(camera.canvasW, camera.canvasH);
    let base_uv   = in.pos.xy / canvas;
    let incident  = vec3<f32>(0.0, 0.0, -1.0);
    let rvec      = refract(incident, N, 1.0 / GLASS_IOR);
    var disp_px   = rvec.xy * REFRACT_SCALE;
    let dl        = length(disp_px);
    if (dl > REFRACT_MAX_DISP) {
        disp_px = disp_px * (REFRACT_MAX_DISP / dl);
    }
    // Chromatic dispersion: sample R/G/B along slightly different offsets so the
    // bent rim splits the background into faint colour fringes like real glass.
    let disp_uv = disp_px / canvas;
    let uv_r = clamp(base_uv + disp_uv * (1.0 + DISPERSION), vec2<f32>(0.0), vec2<f32>(1.0));
    let uv_g = clamp(base_uv + disp_uv,                      vec2<f32>(0.0), vec2<f32>(1.0));
    let uv_b = clamp(base_uv + disp_uv * (1.0 - DISPERSION), vec2<f32>(0.0), vec2<f32>(1.0));
    let scene_sample = vec3<f32>(
        textureSampleLevel(sceneTex, sceneSampler, uv_r, 0.0).r,
        textureSampleLevel(sceneTex, sceneSampler, uv_g, 0.0).g,
        textureSampleLevel(sceneTex, sceneSampler, uv_b, 0.0).b,
    );

    // ── Blue glass tint (Beer–Lambert) ──────────────────────────────────
    // Normalised sapphire hue; the transmitted scene is multiplied by it, more
    // strongly across the thicker rim than the thin flat centre.
    let max_c     = max(in.glassTint.r, max(in.glassTint.g, in.glassTint.b));
    let hue       = in.glassTint / max(max_c, 1e-4);
    let density   = mix(TINT_BASE, TINT_EDGE, bevel);
    let tint      = mix(vec3<f32>(1.0), hue, density);
    var color     = scene_sample * tint;
    // A faint sapphire body so dark areas behind the panel still read as glass,
    // not as a transparent hole.
    color = color + in.glassTint * in.glowIntensity * 0.5;

    // ── Surface highlights ──────────────────────────────────────────────
    // Fresnel rim brightening — concentrated on the bevel where N tilts away.
    let fresnel = pow(1.0 - max(0.0, N.z), in.fresnelPower);
    color = color + fresnel * 0.7 * hue;

    // Specular glint from the key light, sharpened on the bevel.
    let R    = reflect(-LIGHT_DIR, N);
    let spec = pow(max(0.0, dot(R, VIEW_DIR)), in.specPower) * in.specIntensity;
    color = color + spec * vec3<f32>(1.0, 1.0, 1.0);

    // Antialiased silhouette alpha.
    let fill_alpha = 1.0 - smoothstep(-AA_FEATHER, 0.0, d);

    // Bright glass edge: a crisp inner rim ring that sells the rounded slab.
    let border_alpha = fill_alpha *
        smoothstep(-BORDER_WIDTH - AA_FEATHER, -BORDER_WIDTH, d);
    color = mix(color, in.borderColor.rgb, border_alpha * in.borderColor.a);

    // Final alpha = silhouette AA × per-panel surface alpha (fillColor.a, the
    // static glass transparency) × dynamic collapse envelope (opacity 0→1).
    return vec4<f32>(color, fill_alpha * in.fillColor.a * in.opacity);
}
`,g=26,b=g*4,y=6,x=16;class v{device;pipeline;bindGroupLayout;uniformBuffer;sceneSampler;fallbackSceneTexture;fallbackSceneView;instanceBuffer;instanceCapacity;stagingFloats;constructor(d,l,a,h,i,r,f,e){this.device=d,this.pipeline=l,this.bindGroupLayout=a,this.uniformBuffer=h,this.sceneSampler=f,this.fallbackSceneTexture=e,this.fallbackSceneView=e.createView({label:"panel-glass-fallback-scene-view"}),this.instanceBuffer=i,this.instanceCapacity=r,this.stagingFloats=new Float32Array(new ArrayBuffer(r*b))}static async create(d,l){const a=d.device,h=new m(a),{module:i}=await h.compile(_,"panel-glass-shader"),r=a.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{type:"read-only-storage"}},{binding:1,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}},{binding:2,visibility:GPUShaderStage.FRAGMENT,texture:{sampleType:"float",viewDimension:"2d"}},{binding:3,visibility:GPUShaderStage.FRAGMENT,sampler:{type:"filtering"}}],label:"panel-glass-bgl"}),f=a.createPipelineLayout({bindGroupLayouts:[r],label:"panel-glass-layout"}),e=a.createRenderPipeline({layout:f,vertex:{module:i,entryPoint:"panel_glass_vs"},fragment:{module:i,entryPoint:"panel_glass_fs",targets:[{format:l,blend:{color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}},writeMask:15}]},primitive:{topology:"triangle-list"},depthStencil:{depthWriteEnabled:!1,depthCompare:"always",format:"depth24plus"},label:"panel-glass-pipeline"}),s=a.createBuffer({size:x,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST,label:"panel-glass-camera-ubo"}),p=16,u=a.createBuffer({size:p*b,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST,label:"panel-glass-instance-buf"}),o=a.createSampler({magFilter:"linear",minFilter:"linear",addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge",label:"panel-glass-scene-sampler"}),c=a.createTexture({size:{width:1,height:1},format:l,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST,label:"panel-glass-fallback-scene-tex"});return new v(a,e,r,s,u,p,o,c)}render(d,l,a,h,i,r,f){if(a.length===0)return;a.length>this.instanceCapacity&&(this.instanceBuffer.destroy(),this.instanceCapacity=Math.max(a.length,this.instanceCapacity*2),this.instanceBuffer=this.device.createBuffer({size:this.instanceCapacity*b,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST,label:"panel-glass-instance-buf"}),this.stagingFloats=new Float32Array(new ArrayBuffer(this.instanceCapacity*b)));const e=this.stagingFloats;for(let c=0;c<a.length;c++){const n=a[c],t=c*g;e[t+0]=n.centerX,e[t+1]=n.centerY,e[t+2]=n.width,e[t+3]=n.height,e[t+4]=n.cornerRadius,e[t+5]=n.opacity,e[t+6]=n.fillR,e[t+7]=n.fillG,e[t+8]=n.fillB,e[t+9]=n.fillA,e[t+10]=n.borderR,e[t+11]=n.borderG,e[t+12]=n.borderB,e[t+13]=n.borderA,e[t+14]=n.glassTintR,e[t+15]=n.glassTintG,e[t+16]=n.glassTintB,e[t+17]=n.fresnelPower,e[t+18]=n.glowIntensity,e[t+19]=n.glowR,e[t+20]=n.glowG,e[t+21]=n.glowB,e[t+22]=n.specIntensity,e[t+23]=n.specPower,e[t+24]=n.shape,e[t+25]=n.tabDir}this.device.queue.writeBuffer(this.instanceBuffer,0,e,0,a.length*g);const s=new Float32Array(4);s[0]=h,s[1]=i,s[2]=0,s[3]=0,this.device.queue.writeBuffer(this.uniformBuffer,0,s);const p=this.device.createBindGroup({layout:this.bindGroupLayout,entries:[{binding:0,resource:{buffer:this.instanceBuffer}},{binding:1,resource:{buffer:this.uniformBuffer}},{binding:2,resource:f??this.fallbackSceneView},{binding:3,resource:this.sceneSampler}],label:"panel-glass-bg"}),u={colorAttachments:[{view:l,loadOp:"load",storeOp:"store"}],label:"panel-glass-pass"};r!==void 0&&(u.depthStencilAttachment={view:r,depthLoadOp:"load",depthStoreOp:"store"});const o=d.beginRenderPass(u);o.setPipeline(this.pipeline),o.setBindGroup(0,p),o.draw(a.length*y),o.end()}destroy(){this.instanceBuffer.destroy(),this.uniformBuffer.destroy(),this.fallbackSceneTexture.destroy()}}export{v as PanelGlassRenderer};

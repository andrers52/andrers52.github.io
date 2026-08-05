import{b as q}from"./z32-CGATcw43.js";const Y=`// text-render.wgsl — Instanced SDF (Signed Distance Field) text rendering.
//
// Each glyph instance emits a textured quad (6 vertices).  The vertex shader
// reads per-glyph instance data from a storage buffer and projects from world
// space to clip space using the view-projection matrix (same projection as
// sprite-render.wgsl, including perspective when enabled).
//
// The fragment shader implements SDF alpha testing:
//   1. Sample the distance field (r8unorm texture, value in [0, 1]).
//   2. Edge = 0.5; inside glyph > 0.5, outside < 0.5.
//   3. Anti-aliased alpha via smoothstep around the edge threshold.
//   4. Multiply by per-glyph color and opacity.
//
// SDF text is scale-independent — glyphs remain crisp regardless of camera
// zoom.  The anti-aliasing width adapts to screen-space pixel density via
// fwidth() (screen-space derivative of the SDF value), producing consistent
// edge quality at any magnification.
//
// Reference:
//   Green, C. "Improved Alpha-Tested Magnification for Vector Textures and
//   Special Effects." Valve, SIGGRAPH 2007.

// ─── Structures ─────────────────────────────────────────────────────

// Per-glyph instance data.
// 56 bytes (14 × f32) per glyph.
struct GlyphInstance {
    worldX:   f32,          // world-space centre X of glyph quad
    worldY:   f32,          // world-space centre Y of glyph quad
    worldZ:   f32,          // world-space Z (perspective depth)
    width:    f32,          // world-space width
    height:   f32,          // world-space height
    rotation: f32,          // rotation in radians (from parent text label)
    opacity:  f32,          // 0–1 alpha multiplier
    atlasU0:  f32,          // glyph SDF atlas UV min U
    atlasV0:  f32,          // glyph SDF atlas UV min V
    atlasU1:  f32,          // glyph SDF atlas UV max U
    atlasV1:  f32,          // glyph SDF atlas UV max V
    colorR:   f32,          // text color R (0–1)
    colorG:   f32,          // text color G (0–1)
    colorB:   f32,          // text color B (0–1)
}

// Camera uniforms — same struct as sprite-render.wgsl.
struct Camera {
    viewProj: mat4x4<f32>,
    canvasW:  f32,
    canvasH:  f32,
    vpW:      f32,
    vpH:      f32,
}

// ─── Bindings ───────────────────────────────────────────────────────

@group(0) @binding(0) var<storage, read> glyphs    : array<GlyphInstance>;
@group(0) @binding(1) var<uniform>       camera    : Camera;
@group(0) @binding(2) var                sdfAtlas  : texture_2d<f32>;
@group(0) @binding(3) var                sdfSampler: sampler;

// ─── Vertex → Fragment interface ────────────────────────────────────

struct VertexOut {
    @builtin(position) pos:     vec4<f32>,
    @location(0)       uv:      vec2<f32>,
    @location(1)       opacity: f32,
    @location(2)       color:   vec3<f32>,
}

// ─── Quad vertex expansion table ────────────────────────────────────

const QUAD_OFFSETS = array<vec2<f32>, 6>(
    vec2<f32>(-0.5, -0.5), vec2<f32>( 0.5, -0.5), vec2<f32>(-0.5,  0.5),
    vec2<f32>( 0.5, -0.5), vec2<f32>( 0.5,  0.5), vec2<f32>(-0.5,  0.5),
);

const QUAD_UVS = array<vec2<f32>, 6>(
    vec2<f32>(0.0, 1.0), vec2<f32>(1.0, 1.0), vec2<f32>(0.0, 0.0),
    vec2<f32>(1.0, 1.0), vec2<f32>(1.0, 0.0), vec2<f32>(0.0, 0.0),
);

// ─── Vertex shader ──────────────────────────────────────────────────

@vertex
fn text_vs(
    @builtin(vertex_index)   vertexIdx:   u32,
    @builtin(instance_index) instanceIdx: u32,
) -> VertexOut {
    var out: VertexOut;

    let g = glyphs[instanceIdx];

    // Local quad vertex in glyph-local space.
    let localOffset = QUAD_OFFSETS[vertexIdx];
    let scaled = vec2<f32>(localOffset.x * g.width, localOffset.y * g.height);

    // Apply rotation around glyph centre.
    let cosR = cos(g.rotation);
    let sinR = sin(g.rotation);
    let rotated = vec2<f32>(
        scaled.x * cosR - scaled.y * sinR,
        scaled.x * sinR + scaled.y * cosR,
    );

    // World position.
    let worldPos = vec3<f32>(g.worldX + rotated.x, g.worldY + rotated.y, g.worldZ);

    // World → clip space via view-projection matrix.
    out.pos = camera.viewProj * vec4<f32>(worldPos, 1.0);

    // Interpolate UV within the glyph atlas sub-rectangle.
    let quadUV = QUAD_UVS[vertexIdx];
    out.uv = vec2<f32>(
        mix(g.atlasU0, g.atlasU1, quadUV.x),
        mix(g.atlasV0, g.atlasV1, quadUV.y),
    );

    out.opacity = g.opacity;
    out.color = vec3<f32>(g.colorR, g.colorG, g.colorB);

    return out;
}

// ─── Fragment shader ────────────────────────────────────────────────

@fragment
fn text_fs(in: VertexOut) -> @location(0) vec4<f32> {
    // Sample the SDF: value > 0.5 is inside the glyph, < 0.5 is outside.
    let dist = textureSample(sdfAtlas, sdfSampler, in.uv).r;

    // Compute anti-aliased alpha using the screen-space derivative of the
    // distance field.  fwidth() gives the rate of change per screen pixel,
    // producing consistent edge softness regardless of zoom level.
    let edgeWidth = fwidth(dist) * 0.75;
    let alpha = smoothstep(0.5 - edgeWidth, 0.5 + edgeWidth, dist);

    let finalAlpha = alpha * in.opacity;
    if (finalAlpha < 0.01) {
        discard;
    }

    return vec4<f32>(in.color, finalAlpha);
}
`,H=56,j=6,Q=80,Z=.3,O=.953,k=.364,z=.06,K=-.75,J=.364,$=.06,ee=.953,te=.364,ne=.06;class V{device;pipeline;bindGroupLayout;uniformBuffer;sampler;glyphAtlas;instanceBuffer;instanceCapacity;scratchBuf=new Float32Array(512*14);_lastBgRects=[];constructor(n,p,i,o,g,c,a,h){this.device=n,this.pipeline=p,this.bindGroupLayout=i,this.uniformBuffer=o,this.sampler=g,this.glyphAtlas=c,this.instanceBuffer=a,this.instanceCapacity=h}static async create(n,p,i){const o=n.device,g=new q(o),{module:c}=await g.compile(Y,"text-render-shader"),a=o.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX,buffer:{type:"read-only-storage"}},{binding:1,visibility:GPUShaderStage.VERTEX,buffer:{type:"uniform"}},{binding:2,visibility:GPUShaderStage.FRAGMENT,texture:{sampleType:"float",viewDimension:"2d"}},{binding:3,visibility:GPUShaderStage.FRAGMENT,sampler:{type:"filtering"}}],label:"text-render-bgl"}),h=o.createPipelineLayout({bindGroupLayouts:[a],label:"text-render-layout"}),u=o.createRenderPipeline({layout:h,vertex:{module:c,entryPoint:"text_vs"},fragment:{module:c,entryPoint:"text_fs",targets:[{format:i,blend:{color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}},writeMask:15}]},primitive:{topology:"triangle-list"},depthStencil:{depthWriteEnabled:!0,depthCompare:"less-equal",format:"depth24plus"},label:"text-render-pipeline"}),f=o.createBuffer({size:Q,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST,label:"text-render-camera-uniforms"}),m=o.createSampler({magFilter:"linear",minFilter:"linear",label:"text-sdf-sampler"}),y=512,v=o.createBuffer({size:y*H,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST,label:"text-glyph-instance-buffer"});return new V(o,u,a,f,m,p,v,y)}fitTextToWidth(n,p,i,o){if(!n||o<=0)return n;const g=a=>{let h=0,u=1/0,f=-1/0;for(const m of a){const y=this.glyphAtlas.getOrCreate(m,p);if(m!==" "){const v=h+y.advance*i/2,t=y.glyphWidth*i/2;u=Math.min(u,v-t),f=Math.max(f,v+t)}h+=y.advance*i}return Number.isFinite(u)?f-u:0};if(g(n)<=o)return n;let c="";for(const a of n){if(g(c+a+"…")>o)break;c+=a}return c.length===0&&(c=String.fromCodePoint(n.codePointAt(0))),c+"…"}textRegion(n){const p=n.width/2,i=n.height/2,o=n.height*Z,g=-p+o;let c=g;if(n.activeCheck){const f=K*p+J*i+$*n.height;c=Math.max(c,f)}let a=-g;if(n.pinned){const f=p-O*i-ee*i-te*i-ne*i;a=Math.min(a,f)}if(n.collapsibleCaret){const f=p-O*i-k*i-z*i;a=Math.min(a,f)}const h=Math.max(0,a-c),u=(c+a)/2;return{width:h,centerOffsetX:u,leftEdgeX:c,rightEdgeX:a}}render(n,p,i,o,g){if(i.length===0){this._lastBgRects=[];return}const c=14;let a=0;const h=new Array(i.length),u=new Array(i.length).fill(0),f=new Array(i.length).fill(-1/0),m=new Array(i.length).fill(1/0);for(let s=0;s<i.length;s++){const e=i[s];if(!e.text){h[s]="";continue}const x=this.glyphAtlas.getFontMetrics(e.fontFamily),C=e.height/x.lineHeight,d=this.textRegion(e);u[s]=d.centerOffsetX,f[s]=d.leftEdgeX,m[s]=d.rightEdgeX,h[s]=this.fitTextToWidth(e.text,e.fontFamily,C,d.width)}const y=this.glyphAtlas.getSolidEntry();for(let s=0;s<i.length;s++){const e=i[s];e.bgColor&&e.bgColor[3]>0&&a++;const x=h[s];if(x)for(const C of x)C!==" "&&a++}if(a===0)return;const v=a*c;this.scratchBuf.length<v&&(this.scratchBuf=new Float32Array(D(v)));const t=this.scratchBuf;let r=0;for(let s=0;s<i.length;s++){const e=i[s];e.bgColor&&e.bgColor[3]>0&&(t[r++]=e.worldX,t[r++]=e.worldY,t[r++]=e.worldZ,t[r++]=e.width,t[r++]=e.height,t[r++]=e.rotation,t[r++]=e.opacity*e.bgColor[3],t[r++]=y.uv[0],t[r++]=y.uv[1],t[r++]=y.uv[2],t[r++]=y.uv[3],t[r++]=e.bgColor[0],t[r++]=e.bgColor[1],t[r++]=e.bgColor[2]);const x=h[s];if(!x)continue;const C=this.glyphAtlas.getFontMetrics(e.fontFamily),d=e.height/C.lineHeight;let G=0;const B=[];for(const A of x){const l=this.glyphAtlas.getOrCreate(A,e.fontFamily);B.push({char:A,entry:l}),G+=l.advance}let F=e.worldX+u[s]-G*d/2;const U=e.worldX+f[s],I=e.worldX+m[s];if(Number.isFinite(U)&&Number.isFinite(I)){let A=F,l=1/0,_=-1/0;for(const{char:E,entry:b}of B){if(E!==" "){const R=A+b.advance*d/2,T=b.glyphWidth*d/2;l=Math.min(l,R-T),_=Math.max(_,R+T)}A+=b.advance*d}if(Number.isFinite(l)){const E=(l+_)/2,b=(U+I)/2;F+=b-E}}const M=Math.cos(e.rotation),W=Math.sin(e.rotation);for(const{char:A,entry:l}of B){if(A===" "){F+=l.advance*d;continue}const _=l.glyphWidth*d,E=l.glyphHeight*d,R=F+l.advance*d/2-e.worldX,T=e.worldX+R*M,N=e.worldY+R*W;t[r++]=T,t[r++]=N,t[r++]=e.worldZ,t[r++]=_,t[r++]=E,t[r++]=e.rotation,t[r++]=e.opacity,t[r++]=l.uv[0],t[r++]=l.uv[1],t[r++]=l.uv[2],t[r++]=l.uv[3],t[r++]=e.color[0],t[r++]=e.color[1],t[r++]=e.color[2],F+=l.advance*d}}a>this.instanceCapacity&&(this.instanceBuffer.destroy(),this.instanceCapacity=D(a),this.instanceBuffer=this.device.createBuffer({size:this.instanceCapacity*H,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST,label:"text-glyph-instance-buffer"})),this.device.queue.writeBuffer(this.instanceBuffer,0,t.buffer,t.byteOffset,v*Float32Array.BYTES_PER_ELEMENT);const w=new Float32Array(20);w.set(o.viewProj,0),w[16]=o.canvasW,w[17]=o.canvasH,w[18]=0,w[19]=o.vpH,this.device.queue.writeBuffer(this.uniformBuffer,0,w);const L=this.device.createBindGroup({layout:this.bindGroupLayout,entries:[{binding:0,resource:{buffer:this.instanceBuffer}},{binding:1,resource:{buffer:this.uniformBuffer}},{binding:2,resource:this.glyphAtlas.textureView},{binding:3,resource:this.sampler}],label:"text-render-bg"}),P={colorAttachments:[{view:p,loadOp:"load",storeOp:"store"}],label:"text-render-pass"};g!==void 0&&(P.depthStencilAttachment={view:g,depthLoadOp:"load",depthStoreOp:"store"});const S=n.beginRenderPass(P);S.setPipeline(this.pipeline),S.setBindGroup(0,L),S.draw(j,a),S.end()}destroy(){this.uniformBuffer.destroy(),this.instanceBuffer.destroy()}}function D(X){let n=X-1;return n|=n>>1,n|=n>>2,n|=n>>4,n|=n>>8,n|=n>>16,n+1}export{V as TextRenderer};

import{b as x}from"./z32-CGATcw43.js";const w=`// sprite-render.wgsl — Instanced sprite rendering shader for the WebGPU
// scene blit pipeline.  Reads per-sprite instance data from a storage buffer
// and renders textured quads sampled from a packed texture atlas.
//
// Each sprite instance emits 6 vertices (2 triangles) using the vertex index.
// The vertex shader applies rotation around the sprite centre and projects
// from world space to clip space using a view-projection matrix.
//
// Perspective projection is handled by the standard GPU pipeline:
// the view-projection matrix encodes a pinhole camera model where
// clip.w = focalLength + depth.  The GPU's fixed-function perspective divide
// (x/w, y/w, z/w) produces correct perspective foreshortening.
//
// Normal-mapped lighting:
//   Sprites carry a second set of UVs pointing into a normal atlas.
//   The fragment shader decodes the normal, applies the sprite's 2D rotation,
//   and computes Lambertian diffuse against a directional light.
//   Sprites without a normal map atlas entry use a flat normal (pure blue)
//   and receive uniform lighting.
//
// Reference: Foley, van Dam et al. "Computer Graphics: Principles and Practice"
//   Ch. 6 — Viewing pipeline, Ch. 13 — Perspective projection.
// Reference: Shirley, P. "Fundamentals of Computer Graphics" 4th ed., §7.3.

// ─── Structures ─────────────────────────────────────────────────────

// Per-sprite instance data uploaded from the scene buffer.
// 80 bytes (20 × f32) per sprite.
struct SpriteInstance {
    worldX:    f32,              // world-space centre X
    worldY:    f32,              // world-space centre Y
    worldZ:    f32,              // world-space Z (perspective depth)
    width:     f32,              // world-space width
    height:    f32,              // world-space height
    rotation:  f32,              // rotation in radians (CCW positive)
    opacity:   f32,              // 0–1 alpha multiplier
    atlasU0:   f32,              // color atlas UV min U
    atlasV0:   f32,              // color atlas UV min V
    atlasU1:   f32,              // color atlas UV max U
    atlasV1:   f32,              // color atlas UV max V
    flags:    f32,               // packed: bit 0 = billboard, bit 1 = flipX
    normalU0:  f32,              // normal atlas UV min U
    normalV0:  f32,              // normal atlas UV min V
    normalU1:  f32,              // normal atlas UV max U
    normalV1:  f32,              // normal atlas UV max V
    quatX:     f32,              // 3D orientation quaternion X
    quatY:     f32,              // 3D orientation quaternion Y
    quatZ:     f32,              // 3D orientation quaternion Z
    quatW:     f32,              // 3D orientation quaternion W
}

// Camera uniforms: view-projection matrix + auxiliary scalars.
struct Camera {
    viewProj: mat4x4<f32>,       // combined view-projection matrix (col-major)
    canvasW:  f32,               // canvas width in physical pixels
    canvasH:  f32,               // canvas height in physical pixels
    timeSec:  f32,               // seconds, for the loading-shimmer sweep (slot was vpW, unused)
    vpH:      f32,               // viewport height in world units
}

// ─── Bindings ───────────────────────────────────────────────────────

@group(0) @binding(0) var<storage, read> sprites : array<SpriteInstance>;
@group(0) @binding(1) var<uniform>       camera  : Camera;
@group(0) @binding(2) var                atlas   : texture_2d<f32>;
@group(0) @binding(3) var                atlasSampler : sampler;
@group(0) @binding(4) var                normalAtlas  : texture_2d<f32>;
@group(0) @binding(5) var<uniform>       lightGlobals : LightGlobals;
@group(0) @binding(6) var<storage, read> lights       : array<vec4<f32>>;

// Light globals uniform: directional light + ambient + point light count.
struct LightGlobals {
    dirLightDir:     vec4<f32>,  // xyz = direction, w = intensity
    dirLightColor:   vec4<f32>,  // rgb = color, a = unused
    ambientAndCount: vec4<f32>,  // x = ambient, y = numPointLights, z = normalInfluence, w = unused
}

// ─── Vertex → Fragment interface ────────────────────────────────────

struct VertexOut {
    @builtin(position) pos:        vec4<f32>,
    @location(0)       uv:         vec2<f32>,
    @location(1)       opacity:    f32,
    @location(2)       normalUV:   vec2<f32>,
    @location(3)       rotation:   f32,
    // MUST be @interpolate(flat): flags are bit-tested via u32() in the
    // fragment shader, and default perspective-correct interpolation of a
    // per-instance constant accumulates fp error that grows as the quad
    // nears the camera (4.0 → 3.9999997 → u32() truncates → bit lost).
    // Same pattern as the flat \`flags\` in pill-render.wgsl.
    @location(4) @interpolate(flat) flags: f32,
    @location(5)       worldPos:   vec3<f32>,
    @location(6)       quat:       vec4<f32>,
    @location(7)       glassLocal: vec2<f32>,   // sprite-local pos, for the glass mask
    @location(8)       glassHalf:  vec2<f32>,   // sprite half-extents, for the glass mask
}

// ─── Node-image "glass pill" material (flags bit 2) ─────────────────────
// When a sprite is a nexus node-image pill the fragment shader renders it as
// translucent green glass with a rounded-rect silhouette, so the pill's glass
// FRAME (drawn in the pill pass) reads as holding the image inside it. The
// image is composited over the real background by the sprite pass's own alpha
// blend — that is the genuine see-through the flat overlay never achieved.
const GLASS_IMAGE_FLAG_BIT:    u32 = 4u;             // matches SpriteInstance flags bit 2
const GLASS_IMAGE_TINT:        vec3<f32> = vec3<f32>(0.50, 0.92, 0.66);
const GLASS_IMAGE_PAPER_ALPHA: f32 = 0.26;           // loading placeholder base alpha
// Inset the drawn image toward the centre by this fraction of the half-extent so
// a transparent margin separates it from the pill's refractive glass frame (drawn
// in the pill pass). Chosen to land the image edge just inside the frame's bevel
// band (FRAME_BEVEL_FRAC in pill-render.wgsl) so the rim frames the image instead
// of bending its outer edge.
const GLASS_IMAGE_MARGIN:      f32 = 0.20;
// Loading placeholder (flags bit 3, client-side only): while the node image
// is still decoding into the atlas, Screen.ts emits the same quad with this
// bit instead of GLASS_IMAGE_FLAG_BIT. Rendered as the same glass material
// with a diagonal highlight band sweeping across, so the pill reads as
// "glass, image on its way" rather than an empty frame.
const GLASS_LOADING_FLAG_BIT:  u32 = 8u;
const GLASS_LOADING_SWEEP_HZ:  f32 = 0.5;            // full sweeps per second
const GLASS_LOADING_BAND_GAIN: f32 = 0.30;           // extra alpha at band centre

// Rounded-rect signed distance (Inigo Quilez). Negative inside. Matches the
// pill's \`sd_rounded_box\` so the sprite mask lines up with the glass frame.
fn sd_round_box2(p: vec2<f32>, b: vec2<f32>, r: f32) -> f32 {
    let q = abs(p) - b + r;
    return length(max(q, vec2<f32>(0.0))) + min(max(q.x, q.y), 0.0) - r;
}

// ─── Quad vertex expansion table ────────────────────────────────────
// Two-triangle quad.  Local coordinates in [-0.5, +0.5] so the
// sprite is centred on its world position.

const QUAD_OFFSETS = array<vec2<f32>, 6>(
    vec2<f32>(-0.5, -0.5), vec2<f32>( 0.5, -0.5), vec2<f32>(-0.5,  0.5),
    vec2<f32>( 0.5, -0.5), vec2<f32>( 0.5,  0.5), vec2<f32>(-0.5,  0.5),
);

// Matching UV coordinates for atlas lookup.
// V is flipped: sprite top (Y=+0.5) → texture top (V=0), because the
// world is Y-up but texture V increases downward.
const QUAD_UVS = array<vec2<f32>, 6>(
    vec2<f32>(0.0, 1.0), vec2<f32>(1.0, 1.0), vec2<f32>(0.0, 0.0),
    vec2<f32>(1.0, 1.0), vec2<f32>(1.0, 0.0), vec2<f32>(0.0, 0.0),
);

// ─── Vertex shader ──────────────────────────────────────────────────

@vertex
fn sprite_vs(
    @builtin(vertex_index)   vertexIdx:   u32,
    @builtin(instance_index) instanceIdx: u32,
) -> VertexOut {
    var out: VertexOut;

    let s = sprites[instanceIdx];

    // ── Local quad vertex in sprite-local space ──────────────────
    let localOffset = QUAD_OFFSETS[vertexIdx];
    let scaled = vec2<f32>(localOffset.x * s.width, localOffset.y * s.height);

    // ── Apply rotation around sprite centre ──────────────────────
    // If quaternion is identity (or near), use legacy 2D rotation.
    let quatLenSq = s.quatX*s.quatX + s.quatY*s.quatY + s.quatZ*s.quatZ + s.quatW*s.quatW;
    let isQuatIdentity = quatLenSq < 0.001 || (s.quatW > 0.999 && abs(s.quatX) < 0.001 && abs(s.quatY) < 0.001 && abs(s.quatZ) < 0.001);

    var rotatedLocal: vec3<f32>;
    if (isQuatIdentity) {
        let cosR = cos(s.rotation);
        let sinR = sin(s.rotation);
        rotatedLocal = vec3<f32>(
            scaled.x * cosR - scaled.y * sinR,
            scaled.x * sinR + scaled.y * cosR,
            0.0,
        );
    } else {
        // Quaternion rotation: v' = q * v * q_conj
        let qx = s.quatX;
        let qy = s.quatY;
        let qz = s.quatZ;
        let qw = s.quatW;
        let vx = scaled.x;
        let vy = scaled.y;
        let vz = 0.0;
        // tx = 2 * cross(q.xyz, v)
        let tx = 2.0 * (qy * vz - qz * vy);
        let ty = 2.0 * (qz * vx - qx * vz);
        let tz = 2.0 * (qx * vy - qy * vx);
        rotatedLocal = vec3<f32>(
            vx + qw * tx + (qy * tz - qz * ty),
            vy + qw * ty + (qz * tx - qx * tz),
            vz + qw * tz + (qx * ty - qy * tx),
        );
    }

    // ── World → clip space via view-projection matrix ────────────
    var worldPos: vec3<f32>;
    let isBillboard = (u32(s.flags) & 1u) != 0u;
    if (isBillboard) {
        let rightCol = vec3<f32>(camera.viewProj[0][0], camera.viewProj[1][0], camera.viewProj[2][0]);
        let upCol    = vec3<f32>(camera.viewProj[0][1], camera.viewProj[1][1], camera.viewProj[2][1]);
        let fx = length(rightCol);
        let fy = length(upCol);
        let rightNorm = select(vec3<f32>(1.0, 0.0, 0.0), rightCol / fx, fx > 0.0);
        let upNorm    = select(vec3<f32>(0.0, 1.0, 0.0), upCol / fy, fy > 0.0);
        let cornerWorld = rightNorm * scaled.x + upNorm * scaled.y;
        worldPos = vec3<f32>(s.worldX + cornerWorld.x, s.worldY + cornerWorld.y, s.worldZ + cornerWorld.z);
        let centerClip = camera.viewProj * vec4<f32>(worldPos, 1.0);
        let zoomScale = camera.vpH / camera.canvasH;
        out.pos = vec4<f32>(centerClip.x * zoomScale, centerClip.y * zoomScale, centerClip.z, centerClip.w);
    } else {
        worldPos = vec3<f32>(s.worldX + rotatedLocal.x, s.worldY + rotatedLocal.y, s.worldZ + rotatedLocal.z);
        out.pos = camera.viewProj * vec4<f32>(worldPos, 1.0);
    }

    // ── Interpolate UVs within the atlas sub-rectangles ──────────
    let quadUV = QUAD_UVS[vertexIdx];
    out.uv = vec2<f32>(
        mix(s.atlasU0, s.atlasU1, quadUV.x),
        mix(s.atlasV0, s.atlasV1, quadUV.y),
    );
    out.normalUV = vec2<f32>(
        mix(s.normalU0, s.normalU1, quadUV.x),
        mix(s.normalV0, s.normalV1, quadUV.y),
    );

    // Node-image pills: expand the sampled UV range about the centre by
    // 1/(1-margin) so the image shrinks into a central sub-rect, leaving a
    // transparent margin ring (masked out in the fragment shader) between the
    // image and the glass frame. Non-image sprites are unaffected.
    if ((u32(s.flags) & GLASS_IMAGE_FLAG_BIT) != 0u) {
        let inv = 1.0 / (1.0 - GLASS_IMAGE_MARGIN);
        out.uv = vec2<f32>(
            mix(s.atlasU0, s.atlasU1, (quadUV.x - 0.5) * inv + 0.5),
            mix(s.atlasV0, s.atlasV1, (quadUV.y - 0.5) * inv + 0.5),
        );
    }

    out.opacity = s.opacity;
    out.rotation = s.rotation;
    out.flags = s.flags;
    out.worldPos = worldPos;
    out.quat = vec4<f32>(s.quatX, s.quatY, s.quatZ, s.quatW);
    // Sprite-local coords + half-extents for the node-image glass mask. \`scaled\`
    // is the axis-aligned local offset (node-image pills are never rotated).
    out.glassLocal = scaled;
    out.glassHalf  = vec2<f32>(s.width, s.height) * 0.5;

    return out;
}

// ─── Fragment shader ────────────────────────────────────────────────

@fragment
fn sprite_fs(in: VertexOut) -> @location(0) vec4<f32> {
    let texColor = textureSample(atlas, atlasSampler, in.uv);
    // Sample the normal map here too: \`textureSample\` requires uniform control
    // flow, and the glass-image branch below can \`discard\`/\`return\` early, so
    // both samples must happen before it. (Consumed later in the lit path.)
    let normalSample = textureSample(normalAtlas, atlasSampler, in.normalUV);

    // ── Node-image glass pill (flags bit 2) ─────────────────────────────
    // Rounded-rect mask + green tint + ink-aware translucency. The rounded-rect
    // distance and its AA width use screen-space derivatives, so they are
    // computed in uniform control flow (before the branch) to stay valid.
    // Rounded-rectangle corners (0.22·height = 0.44·halfHeight), NOT a full
    // circle. Clamped to glassHalf.x so narrow images stay sensible. The mask is
    // inset by GLASS_IMAGE_MARGIN so the image sits in a central sub-rect with a
    // transparent margin between it and the glass frame (the frame's bevel refracts
    // that margin, not the image, so the image edge is no longer bent).
    let g_half = in.glassHalf * (1.0 - GLASS_IMAGE_MARGIN);
    let g_r    = min(g_half.y * 0.44, g_half.x);
    let g_d    = sd_round_box2(in.glassLocal, g_half, g_r);
    let g_aa   = max(fwidth(g_d), 1e-4);
    let g_mask = 1.0 - smoothstep(-g_aa, g_aa, g_d);

    // Loading-shimmer mask: image nodes get a centered square placeholder so the
    // shimmer reads as the same shape as the square image it is standing in for.
    // Computed here (not inside the flags branch) so the derivative call stays in
    // uniform control flow.
    let l_half = vec2<f32>(min(in.glassHalf.x, in.glassHalf.y));
    let l_d    = sd_round_box2(in.glassLocal, l_half, 0.0);
    let l_aa   = max(fwidth(l_d), 1e-4);
    let l_mask = 1.0 - smoothstep(-l_aa, l_aa, l_d);

    if ((u32(in.flags) & GLASS_LOADING_FLAG_BIT) != 0u) {
        if (l_mask < 0.01) {
            discard;
        }
        // Diagonal shimmer: normalised (x+y) position in [-1, 1] swept by a
        // moving highlight band. The phase overshoots past both edges so the
        // band fully exits before wrapping.
        let extent = max(in.glassHalf.x + in.glassHalf.y, 1e-3);
        let sweep  = (in.glassLocal.x + in.glassLocal.y) / extent;
        let phase  = fract(camera.timeSec * GLASS_LOADING_SWEEP_HZ) * 2.8 - 1.4;
        let band   = 1.0 - smoothstep(0.0, 0.35, abs(sweep - phase));
        let alpha  = (GLASS_IMAGE_PAPER_ALPHA + band * GLASS_LOADING_BAND_GAIN)
                     * in.opacity * l_mask;
        return vec4<f32>(GLASS_IMAGE_TINT, alpha);
    }
    if ((u32(in.flags) & GLASS_IMAGE_FLAG_BIT) != 0u) {
        if (g_mask < 0.01) {
            discard;
        }
        // The image shows in its NATURAL colours, clipped only to the
        // rounded-rect silhouette. Only the pill FRAME (drawn in the pill pass)
        // is tinted green — exactly like the chat panel, where the glass rim is
        // coloured but the content inside is not. (Previously the whole image
        // was green-multiplied and ink-alpha translucent, which washed the
        // picture green and made it read as a tinted sticker.)
        return vec4<f32>(texColor.rgb, texColor.a * in.opacity * g_mask);
    }

    // Multiply alpha by sprite opacity.
    let alpha = texColor.a * in.opacity;

    // Discard nearly-transparent fragments to avoid blending artefacts.
    if (alpha < 0.01) {
        discard;
    }

    // ── Normal-mapped lighting ───────────────────────────────────
    // Decode the (already-sampled) normal from [0,1] to [-1,1].
    let normalXY = normalSample.rg * 2.0 - 1.0;
    let normalZ = sqrt(max(0.0, 1.0 - dot(normalXY, normalXY)));
    var surfaceNormal = vec3<f32>(normalXY.x, normalXY.y, normalZ);

    // When the sprite is horizontally flipped, the sampled normal's X
    // component points the wrong way (the bump is now on the opposite
    // side). Negate X to match the mirrored geometry.
    let isFlipX = (u32(in.flags) & 2u) != 0u;
    if (isFlipX) {
        surfaceNormal.x = -surfaceNormal.x;
    }

    // Rotate the surface normal by the sprite's orientation so lighting
    // stays consistent when the sprite spins.
    let quatLenSq = in.quat.x*in.quat.x + in.quat.y*in.quat.y + in.quat.z*in.quat.z + in.quat.w*in.quat.w;
    let isQuatIdentity = quatLenSq < 0.001 || (in.quat.w > 0.999 && abs(in.quat.x) < 0.001 && abs(in.quat.y) < 0.001 && abs(in.quat.z) < 0.001);

    var rotatedNormal: vec3<f32>;
    if (isQuatIdentity) {
        let cosR = cos(in.rotation);
        let sinR = sin(in.rotation);
        rotatedNormal = vec3<f32>(
            surfaceNormal.x * cosR - surfaceNormal.y * sinR,
            surfaceNormal.x * sinR + surfaceNormal.y * cosR,
            surfaceNormal.z,
        );
    } else {
        // Quaternion rotation of the normal.
        let qx = in.quat.x;
        let qy = in.quat.y;
        let qz = in.quat.z;
        let qw = in.quat.w;
        let vx = surfaceNormal.x;
        let vy = surfaceNormal.y;
        let vz = surfaceNormal.z;
        let tx = 2.0 * (qy * vz - qz * vy);
        let ty = 2.0 * (qz * vx - qx * vz);
        let tz = 2.0 * (qx * vy - qy * vx);
        rotatedNormal = vec3<f32>(
            vx + qw * tx + (qy * tz - qz * ty),
            vy + qw * ty + (qz * tx - qx * tz),
            vz + qw * tz + (qx * ty - qy * tx),
        );
    }
    surfaceNormal = normalize(rotatedNormal);

    // ── Dynamic lighting accumulation ──────────────────────────────
    // Start with ambient contribution.
    var accumulatedLight = vec3<f32>(lightGlobals.ambientAndCount.x);

    // Directional light (fallback when no point lights are active).
    let dirDiffuse = max(dot(surfaceNormal, normalize(lightGlobals.dirLightDir.xyz)), 0.0);
    accumulatedLight += lightGlobals.dirLightColor.rgb * dirDiffuse * lightGlobals.dirLightDir.w;

    // Point lights (bounded loop, max 32).
    let numLights = u32(lightGlobals.ambientAndCount.y);
    for (var i = 0u; i < numLights; i = i + 1u) {
        let posRadius = lights[i * 2u + 0u];
        let colInt    = lights[i * 2u + 1u];

        let toLight = posRadius.xyz - in.worldPos;
        let dist = length(toLight);
        let radius = posRadius.w;

        // Quadratic smooth falloff: 1.0 at center, 0.0 at radius.
        let t = clamp(dist / max(radius, 0.001), 0.0, 1.0);
        let attenuation = (1.0 - t * t) * colInt.w;

        let L = normalize(toLight);
        let diffuse = max(dot(surfaceNormal, L), 0.0);
        accumulatedLight += colInt.rgb * diffuse * attenuation;
    }

    let litColor = texColor.rgb * accumulatedLight;

    // Blend between fully lit (normal-mapped) and flat (unlit) based on
    // normalInfluence.  For arcade sprites, a value < 1.0 keeps colours
    // readable while still giving depth from the normal map.
    let normalInfluence = lightGlobals.ambientAndCount.z;
    let finalColor = mix(texColor.rgb, litColor, normalInfluence);

    return vec4<f32>(finalColor, alpha);
}
`,v=80,q=6,S=80;class b{device;pipeline;bindGroupLayout;uniformBuffer;sampler;atlas;normalAtlas;instanceBuffer;instanceCapacity;stagingFloats;dummyGlobalsBuffer;dummyLightsBuffer;constructor(a,p,f,l,i,o,r,c,e,s,d){this.device=a,this.pipeline=p,this.bindGroupLayout=f,this.uniformBuffer=l,this.sampler=i,this.atlas=o,this.normalAtlas=r,this.instanceBuffer=c,this.instanceCapacity=e,this.stagingFloats=new Float32Array(new ArrayBuffer(e*20*4)),this.dummyGlobalsBuffer=s,this.dummyLightsBuffer=d}static async create(a,p,f,l){const i=a.device,o=new x(i),{module:r}=await o.compile(w,"sprite-render-shader"),c=i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX,buffer:{type:"read-only-storage"}},{binding:1,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}},{binding:2,visibility:GPUShaderStage.FRAGMENT,texture:{sampleType:"float",viewDimension:"2d"}},{binding:3,visibility:GPUShaderStage.FRAGMENT,sampler:{type:"filtering"}},{binding:4,visibility:GPUShaderStage.FRAGMENT,texture:{sampleType:"float",viewDimension:"2d"}},{binding:5,visibility:GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}},{binding:6,visibility:GPUShaderStage.FRAGMENT,buffer:{type:"read-only-storage"}}],label:"sprite-render-bgl"}),e=i.createPipelineLayout({bindGroupLayouts:[c],label:"sprite-render-layout"}),s=i.createRenderPipeline({layout:e,vertex:{module:r,entryPoint:"sprite_vs"},fragment:{module:r,entryPoint:"sprite_fs",targets:[{format:l,blend:{color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}},writeMask:15}]},primitive:{topology:"triangle-list"},depthStencil:{depthWriteEnabled:!1,depthCompare:"less-equal",format:"depth24plus"},label:"sprite-render-pipeline"}),d=i.createBuffer({size:S,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST,label:"sprite-render-camera-uniforms"}),g=i.createSampler({magFilter:"linear",minFilter:"linear",label:"sprite-atlas-sampler"}),m=256,h=i.createBuffer({size:m*v,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST,label:"sprite-instance-buffer"}),u=i.createBuffer({size:48,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST,label:"sprite-dummy-light-globals"}),t=i.createBuffer({size:1024,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST,label:"sprite-dummy-light-storage"});return i.queue.writeBuffer(u,0,new Float32Array(12)),i.queue.writeBuffer(t,0,new Float32Array(256)),new b(i,s,c,d,g,p,f,h,m,u,t)}render(a,p,f,l,i,o){const r=f.length;if(r===0)return;r>this.instanceCapacity&&(this.instanceBuffer.destroy(),this.instanceCapacity=_(r),this.instanceBuffer=this.device.createBuffer({size:this.instanceCapacity*v,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST,label:"sprite-instance-buffer"}),this.stagingFloats=new Float32Array(new ArrayBuffer(this.instanceCapacity*20*4)));const c=r*20,e=this.stagingFloats;e.fill(0,0,c);for(let u=0;u<r;u++){const t=f[u],n=u*20;e[n+0]=t.worldX,e[n+1]=t.worldY,e[n+2]=t.worldZ,e[n+3]=t.width,e[n+4]=t.height,e[n+5]=t.rotation,e[n+6]=t.opacity,e[n+7]=t.atlasU0,e[n+8]=t.atlasV0,e[n+9]=t.atlasU1,e[n+10]=t.atlasV1,e[n+11]=t.flags,e[n+12]=t.normalU0,e[n+13]=t.normalV0,e[n+14]=t.normalU1,e[n+15]=t.normalV1,e[n+16]=t.quatX,e[n+17]=t.quatY,e[n+18]=t.quatZ,e[n+19]=t.quatW}this.device.queue.writeBuffer(this.instanceBuffer,0,e,0,c);const s=new Float32Array(20);s.set(l.viewProj,0),s[16]=l.canvasW,s[17]=l.canvasH,s[18]=performance.now()%36e5/1e3,s[19]=l.vpH,this.device.queue.writeBuffer(this.uniformBuffer,0,s);const d=[{binding:0,resource:{buffer:this.instanceBuffer}},{binding:1,resource:{buffer:this.uniformBuffer}},{binding:2,resource:this.atlas.textureView},{binding:3,resource:this.sampler},{binding:4,resource:this.normalAtlas.textureView}];o!==void 0?d.push({binding:5,resource:{buffer:o.globalsGpuBuffer}},{binding:6,resource:{buffer:o.lightsGpuBuffer}}):d.push({binding:5,resource:{buffer:this.dummyGlobalsBuffer}},{binding:6,resource:{buffer:this.dummyLightsBuffer}});const g=this.device.createBindGroup({layout:this.bindGroupLayout,entries:d,label:"sprite-render-bg"}),m={colorAttachments:[{view:p,loadOp:"load",storeOp:"store"}],label:"sprite-render-pass"};i!==void 0&&(m.depthStencilAttachment={view:i,depthLoadOp:"load",depthStoreOp:"store"});const h=a.beginRenderPass(m);h.setPipeline(this.pipeline),h.setBindGroup(0,g),h.draw(q,r),h.end()}destroy(){this.uniformBuffer.destroy(),this.instanceBuffer.destroy(),this.dummyGlobalsBuffer.destroy(),this.dummyLightsBuffer.destroy()}}function _(y){let a=y-1;return a|=a>>1,a|=a>>2,a|=a>>4,a|=a>>8,a|=a>>16,a+1}export{b as SpriteRenderer};

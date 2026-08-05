import{b as v}from"./z32-CGATcw43.js";const _=`// Edge connector render shader.
//
// Each edge can carry a straight perpendicular stem at each end before
// curving — useful for graph-viz layouts where connectors should exit
// each node orthogonally for a moment before bending.  The 12 body
// quads are partitioned:
//
//   quad 0          — start stem    [p0,  p0_stem]
//   quads 1..10     — cubic Bezier  [p0_stem, p3_stem]   (10 segments)
//   quad 11         — end stem      [p3_stem, p3]
//
// Where p0_stem = p0 + stem_from_len · n_from,
//       p3_stem = p3 + stem_to_len   · n_to,
//   and n_from = normalize(cp1 − p0), n_to = normalize(cp2 − p3).
//
// When stem_from_len = stem_to_len = 0 (the legacy code path) the stem
// quads collapse to zero area and the visual is the Bezier alone —
// identical to the pre-stem behaviour.  When \`curved=false\` is the
// caller's intent, cp1/cp2 are placed on the chord at 1/3 and 2/3 by
// \`connector_behavior\`, so the cubic degenerates to a straight line.
//
// Per-edge vertex layout (VERTS_PER_EDGE = 12·6 + 6 = 78):
//   [0   .. 72)   — body quads
//   [72  .. 75)   — start arrowhead triangle
//   [75  .. 78)   — end arrowhead triangle
//
// Anti-aliasing: the fragment shader smoothsteps the interpolated
// distance from the line centre, giving sub-pixel smooth edges.

struct EdgeInstance {
    startX:       f32,
    startY:       f32,
    startZ:       f32,
    endX:         f32,
    endY:         f32,
    endZ:         f32,
    strokeR:      f32,
    strokeG:      f32,
    strokeB:      f32,
    strokeA:      f32,
    lineWidth:    f32,
    headLength:   f32,
    flags:        u32,
    _reserved:    u32,
    cp1X:         f32,
    cp1Y:         f32,
    cp2X:         f32,
    cp2Y:         f32,
    stemFromLen:  f32,
    stemToLen:    f32,
}

// Camera uniforms — same struct as sprite-render.wgsl.
struct Camera {
    viewProj: mat4x4<f32>,
    canvasW:  f32,
    canvasH:  f32,
    vpW:      f32,
    vpH:      f32,
}

@group(0) @binding(0) var<storage, read> edges: array<EdgeInstance>;
@group(0) @binding(1) var<uniform> camera: Camera;

struct VertexOutput {
    @builtin(position) pos: vec4<f32>,
    @location(0) color: vec4<f32>,
    @location(1) edgeDist: f32,   // signed distance from line center (for AA)
    @location(2) halfWidth: f32,  // half line width in NDC-ish space (for AA)
}

const PI: f32 = 3.14159265;
const ARROW_HALF_ANGLE: f32 = 0.5236; // PI/6 = 30 degrees

// Body partitioning.  Must match \`BODY_QUADS_PER_EDGE\` (= 26) in
// EdgeRenderer.ts: 1 start stem + 24 Bezier quads + 1 end stem.
const START_STEM_END:  u32 = 6u;     // [0,   6)   — start stem quad
const BEZIER_END:      u32 = 150u;   // [6,  150)  — 24 Bezier quads × 6 verts
const END_STEM_END:    u32 = 156u;   // [150,156)  — end stem quad
const START_ARROW_END: u32 = 159u;   // [156,159)  — start arrowhead
const VERTS_PER_EDGE:  u32 = 162u;   // [159,162)  — end arrowhead
const BEZIER_SEGMENTS: u32 = 24u;

// Extra width added to the line quad for anti-aliasing feathering.
const AA_PADDING: f32 = 1.5;

// Cubic Bezier position at parameter t ∈ [0,1].
fn bezier_pos(t: f32, p0: vec2<f32>, p1: vec2<f32>, p2: vec2<f32>, p3: vec2<f32>) -> vec2<f32> {
    let u = 1.0 - t;
    return u*u*u * p0 + 3.0 * u*u * t * p1 + 3.0 * u * t*t * p2 + t*t*t * p3;
}

// Cubic Bezier first derivative (tangent direction, magnitude unnormalised).
fn bezier_tan(t: f32, p0: vec2<f32>, p1: vec2<f32>, p2: vec2<f32>, p3: vec2<f32>) -> vec2<f32> {
    let u = 1.0 - t;
    return 3.0 * u*u * (p1 - p0) + 6.0 * u * t * (p2 - p1) + 3.0 * t*t * (p3 - p2);
}

// Lay out a quad corner: returns (worldPos, signed-perpendicular-distance).
// \`posStart\`, \`posEnd\` are the two end-points of the quad's centreline;
// \`tanN\` is the unit tangent (used to derive the perpendicular).
fn quad_corner(
    cornerIdx: u32,
    posStart: vec2<f32>,
    posEnd: vec2<f32>,
    tanN: vec2<f32>,
    hw: f32,
) -> vec3<f32> {
    // triangle-list quad: vertices 0,1,2, 2,1,3
    //   0 = start, +perp   1 = start, -perp
    //   2 = end,   +perp   3 = end,   -perp
    let cornerMap = array<u32, 6>(0u, 1u, 2u, 2u, 1u, 3u);
    let corner = cornerMap[cornerIdx];
    let isEnd = corner >= 2u;
    let isPlusPerp = (corner & 1u) == 0u;
    let perp = vec2<f32>(-tanN.y, tanN.x);
    let sideSign = select(-1.0, 1.0, isPlusPerp);
    let centre = select(posStart, posEnd, isEnd);
    let p = centre + perp * (hw * sideSign);
    return vec3<f32>(p.x, p.y, hw * sideSign);
}

@vertex
fn edge_vs(@builtin(vertex_index) vid: u32) -> VertexOutput {
    let edgeIdx = vid / VERTS_PER_EDGE;
    let localVid = vid % VERTS_PER_EDGE;
    let e = edges[edgeIdx];

    let color = vec4<f32>(e.strokeR, e.strokeG, e.strokeB, e.strokeA);

    let p0 = vec2<f32>(e.startX, e.startY);
    let p1 = vec2<f32>(e.cp1X, e.cp1Y);
    let p2 = vec2<f32>(e.cp2X, e.cp2Y);
    let p3 = vec2<f32>(e.endX, e.endY);

    // Outward unit normals — derived from cp1/cp2 displacement off the
    // anchors.  In the curved+side-mid case this is exactly the side
    // normal \`connector_behavior\` chose; in the straight-line case
    // cp1/cp2 lie on the chord at 1/3, 2/3, so this is the chord
    // direction — fine, because stems are zero there.
    let dFrom = p1 - p0;
    let dFromLen = length(dFrom);
    let nFrom = select(vec2<f32>(1.0, 0.0), dFrom / dFromLen, dFromLen > 0.0001);
    let dTo = p2 - p3;
    let dToLen = length(dTo);
    let nTo = select(vec2<f32>(-1.0, 0.0), dTo / dToLen, dToLen > 0.0001);

    let p0Stem = p0 + nFrom * e.stemFromLen;
    let p3Stem = p3 + nTo   * e.stemToLen;

    let worldToPixel = camera.canvasH / camera.vpH;
    let aaPadWorld = AA_PADDING / worldToPixel;
    let hw = e.lineWidth * 0.5 + aaPadWorld;

    var worldPos = vec2<f32>(0.0, 0.0);
    var eDist: f32 = 0.0;
    var isArrowhead: bool = false;
    var worldZ: f32 = 0.0;

    if localVid < START_STEM_END {
        // ── Start stem: straight quad from p0 to p0Stem along nFrom ──
        let r = quad_corner(localVid, p0, p0Stem, nFrom, hw);
        worldPos = vec2<f32>(r.x, r.y);
        eDist = r.z;
        worldZ = e.startZ;
    } else if localVid < BEZIER_END {
        // ── Bezier body: 10 quads sampling t ∈ [0, 1] ──
        let bezVid     = localVid - START_STEM_END;
        let segmentIdx = bezVid / 6u;       // 0..9
        let cornerIdx  = bezVid % 6u;
        let cornerMap  = array<u32, 6>(0u, 1u, 2u, 2u, 1u, 3u);
        let corner     = cornerMap[cornerIdx];
        let isEnd      = corner >= 2u;
        let isPlusPerp = (corner & 1u) == 0u;
        let tIdx = segmentIdx + select(0u, 1u, isEnd);
        let t = f32(tIdx) / f32(BEZIER_SEGMENTS);
        let pos = bezier_pos(t, p0Stem, p1, p2, p3Stem);
        let tan = bezier_tan(t, p0Stem, p1, p2, p3Stem);
        let tanLen = length(tan);
        let tanN = select(vec2<f32>(1.0, 0.0), tan / tanLen, tanLen > 0.0001);
        let perp = vec2<f32>(-tanN.y, tanN.x);
        let sideSign = select(-1.0, 1.0, isPlusPerp);
        worldPos = pos + perp * (hw * sideSign);
        eDist = hw * sideSign;
        worldZ = mix(e.startZ, e.endZ, t);
    } else if localVid < END_STEM_END {
        // ── End stem: quad from p3Stem to p3 ──
        // Motion direction along the stem centreline is -nTo (we're
        // travelling from p3_stem back toward p3, which sits at p3_stem
        // − stem·nTo).  The Bezier ends with tangent -nTo as well, so
        // passing -nTo to \`quad_corner\` matches the perp orientation at
        // the seam exactly and prevents a visible 180° twist where the
        // bezier and end stem join.
        let r = quad_corner(localVid - BEZIER_END, p3Stem, p3, -nTo, hw);
        worldPos = vec2<f32>(r.x, r.y);
        eDist = r.z;
        worldZ = e.endZ;
    } else if localVid < START_ARROW_END {
        // ── Start arrowhead — tip at P0, opens along nFrom ──
        isArrowhead = true;
        let hasHead = (e.flags & 1u) != 0u;
        let tip = p0;
        if !hasHead {
            worldPos = tip;
        } else {
            // Curve direction at start is nFrom (along the stem); arrow
            // opens BACK along this direction, so triangle base sits in
            // +nFrom direction from tip.
            let angle = atan2(nFrom.y, nFrom.x) + PI;
            let localIdx = localVid - END_STEM_END;
            if localIdx == 0u {
                worldPos = tip;
            } else if localIdx == 1u {
                worldPos = tip - vec2<f32>(
                    e.headLength * cos(angle - ARROW_HALF_ANGLE),
                    e.headLength * sin(angle - ARROW_HALF_ANGLE),
                );
            } else {
                worldPos = tip - vec2<f32>(
                    e.headLength * cos(angle + ARROW_HALF_ANGLE),
                    e.headLength * sin(angle + ARROW_HALF_ANGLE),
                );
            }
        }
        worldZ = e.startZ;
    } else {
        // ── End arrowhead — tip at P3, base extends along +nTo (outward) ──
        isArrowhead = true;
        let hasHead = (e.flags & 2u) != 0u;
        let tip = p3;
        if !hasHead {
            worldPos = tip;
        } else {
            // The curve arrives at p3 going in direction -nTo (from
            // p3Stem toward p3).  Arrow points AT p3 with the triangle
            // base extending outward (= along +nTo).  Encoding parallels
            // the start arrowhead: we want
            //   base = tip - headLength·(cos a, sin a) = tip + headLength·nTo
            // ⇒ (cos a, sin a) = −nTo  ⇒  a = atan2(nTo.y, nTo.x) + π.
            let angle = atan2(nTo.y, nTo.x) + PI;
            let localIdx = localVid - START_ARROW_END;
            if localIdx == 0u {
                worldPos = tip;
            } else if localIdx == 1u {
                worldPos = tip - vec2<f32>(
                    e.headLength * cos(angle - ARROW_HALF_ANGLE),
                    e.headLength * sin(angle - ARROW_HALF_ANGLE),
                );
            } else {
                worldPos = tip - vec2<f32>(
                    e.headLength * cos(angle + ARROW_HALF_ANGLE),
                    e.headLength * sin(angle + ARROW_HALF_ANGLE),
                );
            }
        }
        worldZ = e.endZ;
    }

    // ── World → clip space via view-projection matrix ──
    var out: VertexOutput;
    out.pos = camera.viewProj * vec4<f32>(worldPos.x, worldPos.y, worldZ, 1.0);
    out.color = color;
    // For arrowheads, force eDist to 0 so they render at full opacity (no AA fade).
    out.edgeDist = select(eDist, 0.0, isArrowhead);
    out.halfWidth = hw;
    return out;
}

@fragment
fn edge_fs(in: VertexOutput) -> @location(0) vec4<f32> {
    // Anti-aliased edge: smoothstep from full opacity at center to transparent
    // at the edge boundary.  The AA region is the padding we added to hw.
    let coreHalfWidth = in.halfWidth - AA_PADDING / (camera.canvasH / camera.vpH);
    let d = abs(in.edgeDist);
    let alpha = 1.0 - smoothstep(coreHalfWidth, in.halfWidth, d);
    return vec4<f32>(in.color.rgb, in.color.a * alpha);
}
`,g=80,E=26,w=E*6+6,A=80;class m{device;pipeline;bindGroupLayout;uniformBuffer;instanceBuffer;instanceCapacity;stagingFloats;constructor(d,l,r,a,i,o){this.device=d,this.pipeline=l,this.bindGroupLayout=r,this.uniformBuffer=a,this.instanceBuffer=i,this.instanceCapacity=o,this.stagingFloats=new Float32Array(new ArrayBuffer(o*20*4))}static async create(d,l){const r=d.device,a=new v(r),{module:i}=await a.compile(_,"edge-render-shader"),o=r.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{type:"read-only-storage"}},{binding:1,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}}],label:"edge-render-bgl"}),e=r.createPipelineLayout({bindGroupLayouts:[o],label:"edge-render-layout"}),c=r.createRenderPipeline({layout:e,vertex:{module:i,entryPoint:"edge_vs"},fragment:{module:i,entryPoint:"edge_fs",targets:[{format:l,blend:{color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}}}]},primitive:{topology:"triangle-list"},depthStencil:{depthWriteEnabled:!0,depthCompare:"less-equal",format:"depth24plus"},label:"edge-render-pipeline"}),s=r.createBuffer({size:A,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST,label:"edge-camera-ubo"}),p=64,u=r.createBuffer({size:p*g,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST,label:"edge-instance-buf"});return new m(r,c,o,s,u,p)}render(d,l,r,a,i){if(r.length===0)return;r.length>this.instanceCapacity&&(this.instanceBuffer.destroy(),this.instanceCapacity=Math.max(r.length,this.instanceCapacity*2),this.instanceBuffer=this.device.createBuffer({size:this.instanceCapacity*g,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST,label:"edge-instance-buf"}),this.stagingFloats=new Float32Array(new ArrayBuffer(this.instanceCapacity*20*4)));const o=r.length*20,e=this.stagingFloats,c=new Uint32Array(e.buffer);e.fill(0,0,o);for(let h=0;h<r.length;h++){const t=r[h],n=h*20;e[n+0]=t.startX,e[n+1]=t.startY,e[n+2]=t.startZ,e[n+3]=t.endX,e[n+4]=t.endY,e[n+5]=t.endZ,e[n+6]=t.strokeR,e[n+7]=t.strokeG,e[n+8]=t.strokeB,e[n+9]=t.strokeA,e[n+10]=t.lineWidth,e[n+11]=t.headLength,c[n+12]=t.flags,c[n+13]=0,e[n+14]=t.cp1X,e[n+15]=t.cp1Y,e[n+16]=t.cp2X,e[n+17]=t.cp2Y,e[n+18]=t.stemFromLen,e[n+19]=t.stemToLen}this.device.queue.writeBuffer(this.instanceBuffer,0,e,0,o);const s=new Float32Array(20);s.set(a.viewProj,0),s[16]=a.canvasW,s[17]=a.canvasH,s[18]=0,s[19]=a.vpH,this.device.queue.writeBuffer(this.uniformBuffer,0,s);const p=this.device.createBindGroup({layout:this.bindGroupLayout,entries:[{binding:0,resource:{buffer:this.instanceBuffer}},{binding:1,resource:{buffer:this.uniformBuffer}}],label:"edge-render-bg"}),u={colorAttachments:[{view:l,loadOp:"load",storeOp:"store"}],label:"edge-render-pass"};i!==void 0&&(u.depthStencilAttachment={view:i,depthLoadOp:"load",depthStoreOp:"store"});const f=d.beginRenderPass(u);f.setPipeline(this.pipeline),f.setBindGroup(0,p),f.draw(r.length*w),f.end()}destroy(){this.instanceBuffer.destroy(),this.uniformBuffer.destroy()}}export{m as EdgeRenderer};

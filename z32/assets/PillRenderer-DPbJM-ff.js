import{b as v}from"./z32-CGATcw43.js";const A=`// GPU pill renderer — instanced rounded-rectangle pills with a 3D glass
// material.
//
// Each pill is a world-space axis-aligned rounded rectangle rendered using
// a signed-distance field (SDF) for smooth antialiased edges, an optional
// border ring, and a stylised *3D-look* glass shading model that is faked
// from the 2-D SDF gradient (no actual 3-D geometry).  One quad = 6
// vertices (triangle-list).
//
// Per-pill vertex layout (VERTS_PER_PILL = 6):
//   0,1,2 — first triangle of the quad
//   3,4,5 — second triangle (2,1,3 reuse)
//
// The fragment shader combines:
//   * Diffuse term        — light from a fixed key-light direction.
//   * Inner glow          — soft inner gradient driven by raise-amount.
//   * Fresnel rim         — edge brightening (Schlick-style power law).
//   * Specular highlight  — sharp Blinn-Phong highlight at the key light.
//   * Border ring         — thin coloured ring just inside the silhouette.
//
// SDF reference: Inigo Quilez, "2D distance functions"
//   https://iquilezles.org/articles/distfunctions2d/
//
// Schlick / Blinn-Phong references:
//   Schlick, C. "An Inexpensive BRDF Model for Physically-Based Rendering"
//     EUROGRAPHICS 1994.
//   Blinn, J. F. "Models of Light Reflection for Computer Synthesized
//     Pictures", SIGGRAPH 1977.

struct PillInstance {
    centerX:       f32,
    centerY:       f32,
    centerZ:       f32,
    width:         f32,
    height:        f32,
    rotation:      f32,
    opacity:       f32,
    fillR:         f32,
    fillG:         f32,
    fillB:         f32,
    fillA:         f32,
    borderR:       f32,
    borderG:       f32,
    borderB:       f32,
    borderA:       f32,
    cornerRadius:  f32,
    flags:         u32,   // bit0=selected, bit1=collapsed, bit2=collapsible, bit3=active, bit4=hover-collapse, bit5=hover-checkmark, bit7=pinned
    // ── Glass material fields (10 × f32) ────────────────────────────────
    glassTintR:    f32,   // translucent glass body red
    glassTintG:    f32,   // translucent glass body green
    glassTintB:    f32,   // translucent glass body blue
    fresnelPower:  f32,   // edge rim brightening exponent (e.g. 2.5)
    glowIntensity: f32,   // inner glow strength (0..1)
    glowR:         f32,   // inner glow red
    glowG:         f32,   // inner glow green
    glowB:         f32,   // inner glow blue
    specIntensity: f32,   // specular highlight strength (0..1)
    specPower:     f32,   // specular highlight sharpness (e.g. 32)
    // ── End glass material fields ───────────────────────────────────────
    _pad:          f32,   // reserved, zero — keeps the struct 16-byte aligned
}

// Camera uniforms — identical layout to edge-render.wgsl / sprite-render.wgsl.
struct Camera {
    viewProj: mat4x4<f32>,
    canvasW:  f32,
    canvasH:  f32,
    vpW:      f32,
    vpH:      f32,
}

@group(0) @binding(0) var<storage, read> pills: array<PillInstance>;
@group(0) @binding(1) var<uniform> camera: Camera;
// The scene rendered so far (background + sprites + edges), copied into a
// sampleable texture by the compositor immediately before the pill pass.
// The glass body REFRACTS this image — without it the pill could only fake
// a 3-D look from its own SDF gradient. Sampling a copy (not the live
// render target) avoids a read-while-write hazard.
@group(0) @binding(2) var sceneTex: texture_2d<f32>;
@group(0) @binding(3) var sceneSampler: sampler;

struct VertexOutput {
    @builtin(position) pos:              vec4<f32>,
    // Local UV in [-halfSize, +halfSize] — (0,0) = pill center.
    @location(0) uv:                     vec2<f32>,
    @location(1) halfSize:               vec2<f32>,   // half-extents in world units
    @location(2) cornerRadius:           f32,
    @location(3) fillColor:              vec4<f32>,
    @location(4) borderColor:            vec4<f32>,
    @location(5) opacity:                f32,
    @location(6) @interpolate(flat) flags: u32,
    // ── Glass material interpolants ─────────────────────────────────────
    @location(7) glassTint:             vec3<f32>,
    @location(8) fresnelPower:          f32,
    @location(9) glowColor:             vec3<f32>,
    @location(10) glowIntensity:        f32,
    @location(11) specIntensity:        f32,
    @location(12) specPower:            f32,
}

const VERTS_PER_PILL: u32 = 6u;

// AA feather width in world units — tiny enough to be sub-pixel at normal zoom.
const AA_FEATHER: f32 = 0.8;
// Border ring width in world units.
const BORDER_WIDTH: f32 = 1.5;
// Selection ring width in world units.  Matches the \`ars-info-tile\`
// \`box-shadow: 0 0 0 3px \${accentColor}\` selection ring (CHANGELOG
// "selection highlight made unmistakable, 2026-05-18").  Kept as a
// discrete width so the band is a fixed pixel-equivalent distance
// from the silhouette regardless of pill size.
const SELECTION_RING_WIDTH: f32 = 3.0;
// The selection ring colour is NOT a global constant — it is the
// per-pill \`in.borderColor.rgb\` (set by the host to the full accent
// colour when \`PILL_FLAG_SELECTED\` is set, mirroring the
// \`ars-info-tile\` design where the border and the box-shadow ring
// share the same accent hue).  This means a cyan-accent pill shows
// a cyan ring, a green-accent pill shows a green ring, and a
// future palette change can't desync the two surfaces.

// Pill flag bits (must match Rust / TypeScript constants).
//   PILL_FLAG_SELECTED         = 0x01 — bit 0, see
//     brainiac-core/src/frame_buffer/mod.rs::PILL_FLAG_SELECTED and
//     renderer/FrameBufferReader.ts::PILL_FLAG_SELECTED.
//   PILL_FLAG_COLLAPSED        = 0x02 — bit 1
//   PILL_FLAG_COLLAPSIBLE      = 0x04 — bit 2
//   PILL_FLAG_ACTIVE           = 0x08 — bit 3 (edit-mode checkmark)
//   PILL_FLAG_HOVER_COLLAPSE   = 0x10 — bit 4, client-only hover mark
//   PILL_FLAG_HOVER_CHECKMARK  = 0x20 — bit 5, client-only hover mark
//   PILL_FLAG_PINNED           = 0x80 — bit 7
const PILL_FLAG_SELECTED: u32         = 0x01u;
const PILL_FLAG_COLLAPSED: u32        = 0x02u;
const PILL_FLAG_COLLAPSIBLE: u32      = 0x04u;
const PILL_FLAG_ACTIVE: u32           = 0x08u;
const PILL_FLAG_HOVER_COLLAPSE: u32   = 0x10u;
const PILL_FLAG_HOVER_CHECKMARK: u32  = 0x20u;
const PILL_FLAG_DRAGGABLE: u32        = 0x40u;
const PILL_FLAG_PINNED: u32           = 0x80u;
const PILL_FLAG_HOVER_PIN: u32        = 0x100u;
// bit 9 — the pill frames a node image. The interior is cleared to transparent
// so the node's atlas sprite (drawn beneath in the SPRITES pass) shows through;
// only the glass rim / border / selection ring remain as a frame.
const PILL_FLAG_IMAGE: u32            = 0x200u;

// ── Image-node icon-strip constants ─────────────────────────────────────────
//
// Image-mode pills draw their pin and collapse/expand glyphs in a vertical
// strip to the RIGHT of the image frame, instead of inside the pill body.
// The vertex shader widens the quad only on the +X side; the fragment shader
// places pin at right-top and caret at right-bottom.  All distances scale with
// the frame half-height so the icons stay proportional to the node.
const IMAGE_ICON_STRIP_HFRAC: f32 = 1.55;  // extra half-width on the right, in units of the icon reference half-height
const IMAGE_ICON_CX_HFRAC:    f32 = 0.85;  // icon centre offset from the right frame edge
const IMAGE_ICON_CY_HFRAC:    f32 = 0.42;  // icon centre offset above/below frame centre
const IMAGE_ICON_RGB:         vec3<f32> = vec3<f32>(0.92, 0.92, 0.96);
// Image-mode pin/collapse glyphs render at a FIXED reference half-height so they
// keep the normal text-pill icon size even though the image frame is much taller
// (IMAGE_NODE_HEIGHT). 27 = half of the text-pill height (TITLE_ONLY_NODE_HEIGHT
// 54). Both the glyph size and the strip offsets scale by it, and pill.rs mirrors
// it in the hit-tests. Without this the icons scaled ~3× with the enlarged frame.
const IMAGE_ICON_REF_HALF_H:  f32 = 27.0;

// ── 3D glass material constants ────────────────────────────────────────────
//
// The pill is shaded as a real CAPSULE: a half-cylinder body capped by two
// hemispheres, bulging toward the viewer.  Modelling it analytically (rather
// than finite-differencing the rounded-box SDF) is what keeps the surface
// crease-free.  The old SDF-gradient normal flipped direction across the
// capsule's medial axis (the central spine), producing a hard bright "line"
// down the middle and a converging wedge ("tip") at each cap.  The capsule
// normal varies smoothly everywhere — exactly the contour of a pill.
//
// LIGHT_DIR is the *direction to* the key light (upper-left, normalised).
// VIEW_DIR is the *direction to* the camera (+Z — we render the front face).
//
// DOME_FLATTEN (>1) flattens the bulge: the cross-section height is divided
// by it, so the highlight spreads into a soft band instead of a sharp crest.
// 1.0 is a full hemisphere; ~1.8 reads as a gently domed glass pill.
const LIGHT_DIR:     vec3<f32> = vec3<f32>(-0.45, 0.7, 0.55);
const VIEW_DIR:      vec3<f32> = vec3<f32>(0.0, 0.0, 1.0);
const DOME_FLATTEN:  f32       = 1.8;

// ── Real-refraction constants ───────────────────────────────────────────────
//
// GLASS_IOR is the index of refraction of the body. ~1.5 is crown glass;
// natural emerald (beryl) is ~1.57–1.59. 1.5 bends the view ray (Snell's
// law, the \`refract\` builtin) by 1.0/GLASS_IOR at the air→glass interface.
//
// REFRACT_GAIN scales how strongly the refracted scene shows through the body.
// REFRACT_DEPTH is the virtual back-plane distance (× the capsule radius):
// a longer march bends the background further.  REFRACT_MAX clamps the screen
// displacement (× radius) so the extreme rim bending stays coherent instead
// of sampling wildly off-pill.  Larger REFRACT_DEPTH ⇒ more edge distortion.
const GLASS_IOR:     f32       = 1.5;
const REFRACT_GAIN:  f32       = 0.9;
const REFRACT_DEPTH: f32       = 2.6;
const REFRACT_MAX:   f32       = 0.9;

// ── Image-frame (flat-slab) glass constants ─────────────────────────────────
//
// An image-mode pill is NOT the domed capsule above — it is a flat glass slab
// laid OVER the node's image (which is drawn beneath, in the SPRITES pass, and
// so is already in \`sceneTex\`). It mirrors the left-panel material
// (panel-glass.wgsl): a flat interior that lets the image show through
// near-undistorted, with a bevelled rim that bends the image outward — "the
// pill with the image inside it, its form changed by it". Everything is tinted
// green (the pill's \`glassTint\`) so it reads as the same material.
//
// FRAME_BEVEL_FRAC — width of the refracting rim band as a fraction of the
//   pill half-height (the "border deformation" zone; interior is flat).
// FRAME_EDGE_TILT  — how far the normal tilts outward at the rim.
// FRAME_TINT_BASE / _EDGE — Beer–Lambert green density = how much green the
//   glass adds and, equivalently, how much it dims the image. TINT_BASE 0.30 ⇒
//   the flat centre shows the image at ~70% with a light green wash ("~30%
//   transparent, inside green glass"); _EDGE is heavier across the thick rim.
//   This density is the "transparency" dial — the pill fully covers the image
//   (coverage 1.0), so the image reads as translucent because the glass dims it,
//   not because the pill lets the opaque sprite show through.
const FRAME_BEVEL_FRAC: f32 = 0.18;
const FRAME_EDGE_TILT:  f32 = 1.65;
const FRAME_TINT_BASE:  f32 = 0.30;
const FRAME_TINT_EDGE:  f32 = 0.60;

// SDF for axis-aligned rounded box centred at origin.
// \`p\`  — sample point in local space (centre = 0,0).
// \`b\`  — half-extents of the full rectangle (the SDF subtracts \`r\` internally).
// \`r\`  — corner radius.
fn sd_rounded_box(p: vec2<f32>, b: vec2<f32>, r: f32) -> f32 {
    let q = abs(p) - b + r;
    return length(max(q, vec2<f32>(0.0))) + min(max(q.x, q.y), 0.0) - r;
}

@vertex
fn pill_vs(@builtin(vertex_index) vid: u32) -> VertexOutput {
    let pillIdx  = vid / VERTS_PER_PILL;
    let localVid = vid % VERTS_PER_PILL;
    let pill     = pills[pillIdx];

    let hw = pill.width  * 0.5;
    let hh = pill.height * 0.5;

    // Quad corners in [-0.5, 0.5] local space.
    // triangle-list: 0,1,2 and 2,1,3  (= two triangles sharing edge 1-2)
    //   corner 0 = top-left,    corner 1 = top-right
    //   corner 2 = bottom-left, corner 3 = bottom-right
    let cornerIdx = array<u32, 6>(0u, 1u, 2u, 2u, 1u, 3u)[localVid];
    let signX = select(-1.0, 1.0, (cornerIdx & 1u) == 1u);   // odd=right
    let signY = select(-1.0, 1.0, (cornerIdx & 2u) == 0u);   // <2=top

    // Image-mode pills reserve a vertical icon strip on the right side of the
    // frame.  Widen the quad only on +X so the pin/collapse glyphs are not
    // clipped; the frame SDF still uses the original half-width, so the border
    // stays tightly around the image.
    let is_image = (pill.flags & PILL_FLAG_IMAGE) != 0u;
    // The strip only has to clear the fixed-size icons (see IMAGE_ICON_REF_HALF_H),
    // not scale with the tall frame — otherwise it would reserve a huge empty band.
    let iconStripHalfW = select(0.0, IMAGE_ICON_REF_HALF_H * IMAGE_ICON_STRIP_HFRAC, is_image);

    // Add AA padding so the feathered edge doesn't clip.
    let padX = hw + AA_FEATHER;
    let padY = hh + AA_FEATHER;
    var localX = signX * padX;
    if (signX > 0.0) {
        localX = localX + iconStripHalfW;
    }
    let localY = signY * padY;

    // Rotate + translate to world space.
    let cosR = cos(pill.rotation);
    let sinR = sin(pill.rotation);
    let worldX = pill.centerX + cosR * localX - sinR * localY;
    let worldY = pill.centerY + sinR * localX + cosR * localY;

    var out: VertexOutput;
    out.pos            = camera.viewProj * vec4<f32>(worldX, worldY, pill.centerZ, 1.0);
    out.uv             = vec2<f32>(localX, localY);
    out.halfSize       = vec2<f32>(hw, hh);
    out.cornerRadius   = pill.cornerRadius;
    out.fillColor      = vec4<f32>(pill.fillR, pill.fillG, pill.fillB, pill.fillA);
    out.borderColor    = vec4<f32>(pill.borderR, pill.borderG, pill.borderB, pill.borderA);
    out.opacity        = pill.opacity;
    out.flags          = pill.flags;
    out.glassTint      = vec3<f32>(pill.glassTintR, pill.glassTintG, pill.glassTintB);
    out.fresnelPower   = pill.fresnelPower;
    out.glowColor      = vec3<f32>(pill.glowR, pill.glowG, pill.glowB);
    out.glowIntensity  = pill.glowIntensity;
    out.specIntensity  = pill.specIntensity;
    out.specPower      = pill.specPower;
    return out;
}

// Signed-distance function for a triangle with vertices a, b, c.
// Returns negative inside, positive outside.
// Based on Inigo Quilez, "2D distance functions".
fn sd_triangle(p: vec2<f32>, a: vec2<f32>, b: vec2<f32>, c: vec2<f32>) -> f32 {
    let e0 = b - a;
    let e1 = c - b;
    let e2 = a - c;
    let v0 = p - a;
    let v1 = p - b;
    let v2 = p - c;
    let pq0 = v0 - e0 * clamp(dot(v0, e0) / dot(e0, e0), 0.0, 1.0);
    let pq1 = v1 - e1 * clamp(dot(v1, e1) / dot(e1, e1), 0.0, 1.0);
    let pq2 = v2 - e2 * clamp(dot(v2, e2) / dot(e2, e2), 0.0, 1.0);
    let s = sign(e0.x * e2.y - e0.y * e2.x);
    let d0 = vec2<f32>(dot(pq0, pq0), s * (v0.x * e0.y - v0.y * e0.x));
    let d1 = vec2<f32>(dot(pq1, pq1), s * (v1.x * e1.y - v1.y * e1.x));
    let d2 = vec2<f32>(dot(pq2, pq2), s * (v2.x * e2.y - v2.y * e2.x));
    let d = min(min(d0, d1), d2);
    return -sqrt(d.x) * sign(d.y);
}

// Signed-distance function for a line segment from a to b.
// Returns the Euclidean distance from point p to the segment.
fn sd_segment(p: vec2<f32>, a: vec2<f32>, b: vec2<f32>) -> f32 {
    let pa = p - a;
    let ba = b - a;
    let h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
    return length(pa - ba * h);
}

// ── Pin / caret icon helpers ────────────────────────────────────────────────
//
// These return the raw icon alpha (0..1, unmultiplied by fill/opacity) for a
// fragment position relative to the icon centre.  The regular pill and the
// image-node strip both use the same glyph geometry so the two modes stay
// visually consistent.

// Pushpin glyph: diagonal pin with a round head at the top-right.
fn pin_icon_alpha(local: vec2<f32>, halfH: f32) -> f32 {
    let pinH = halfH * 0.70;
    let pinW = halfH * 0.364;
    let needleTip   = vec2<f32>(-pinW * 0.55, -pinH * 0.50);
    let needleBase  = vec2<f32>( pinW * 0.10,  pinH * 0.20);
    let needleThick = pinW * 0.09;
    let dNeedle = sd_segment(local, needleTip, needleBase) - needleThick;
    let headCenter = needleBase;
    let headRadius = pinW * 0.38;
    let dHead = length(local - headCenter) - headRadius;
    let dPin = min(dNeedle, dHead);
    return 1.0 - smoothstep(-AA_FEATHER, AA_FEATHER, dPin);
}

// Collapse/expand caret glyph: down-pointing triangle; rotated 90° CW when collapsed.
fn caret_icon_alpha(local: vec2<f32>, halfH: f32, collapsed: bool) -> f32 {
    let caretH = halfH * 0.70;
    let caretW = halfH * 0.364;
    var cp = local;
    if (collapsed) {
        cp = vec2<f32>(cp.y, -cp.x);
    }
    let t0 = vec2<f32>(-caretW, caretH * 0.5);
    let t1 = vec2<f32>(caretW, caretH * 0.5);
    let t2 = vec2<f32>(0.0, -caretH * 0.5);
    let dTri = sd_triangle(cp, t0, t1, t2);
    return 1.0 - smoothstep(-AA_FEATHER, AA_FEATHER, dTri);
}

// ── Analytic capsule surface (crease-free pill) ─────────────────────────────
//
// A capsule = a line segment (the "spine") inflated by radius \`r\`.  For an
// axis-aligned pill the spine runs along x from -(b.x - r) to +(b.x - r).
// Every interior point's geometry is determined by its offset from the
// NEAREST spine point — this single rule gives a half-cylinder along the body
// and a hemisphere at each cap, with NO special-casing and no medial-axis
// discontinuity (the source of the old centre "line" and cap "tip").

// Vector from the nearest spine point to \`p\` (the in-plane radial offset).
// Its length is the distance to the spine; the capsule SDF is that minus \`r\`.
fn pill_radial(p: vec2<f32>, b: vec2<f32>, r: f32) -> vec2<f32> {
    let half_len = max(b.x - r, 0.0);
    let spine_x  = clamp(p.x, -half_len, half_len);
    return p - vec2<f32>(spine_x, 0.0);
}

// Height (z) of the bulging front face above the back plane, as a function of
// distance-to-spine.  A circular cross-section of radius \`r\`, flattened by
// DOME_FLATTEN.  Zero at the rim (dist = r), maximal on the spine (dist = 0).
fn pill_height(dist: f32, r: f32) -> f32 {
    return sqrt(max(r * r - dist * dist, 0.0)) / DOME_FLATTEN;
}

// Outward surface normal of the capsule front face at \`p\`, in pill-local
// space.  For a circular cross-section the normal is simply the 3-D direction
// from the spine to the surface point: (radial, z) normalised.  This is the
// normal of a cylinder along the body and of a sphere at the caps — smooth
// across the whole surface, including the spine where it points straight up.
fn pill_normal(p: vec2<f32>, b: vec2<f32>, r: f32) -> vec3<f32> {
    let radial = pill_radial(p, b, r);
    let dist   = length(radial);
    let z      = sqrt(max(r * r - dist * dist, 0.0)) / DOME_FLATTEN;
    return normalize(vec3<f32>(radial, z));
}

// ── Glass lens (real refraction off the analytic capsule) ───────────────────
//
// Sample the captured scene through the glass capsule and return the
// Beer–Lambert-tinted refracted colour.  Driving refraction off the SAME
// analytic capsule normal as the lighting keeps the lens crease-free at the
// spine and caps (the old screen-space-derivative lens reintroduced the
// medial-axis discontinuity).
//
// MUST be called from uniform control flow: it evaluates \`dpdx\`/\`dpdy\` to get
// the world→screen scale.  The fragment entry calls it unconditionally.
//
// Beer–Lambert (Bouguer 1729 / Beer 1852), transmittance T = exp(-σ·ℓ): the
// emerald body is approximated as a colour filter — the per-pill tint
// normalised to its brightest channel — whose strength grows with optical
// depth, so deeper glass passes more green and less red/blue (the emerald
// signature). https://en.wikipedia.org/wiki/Beer–Lambert_law
fn refract_scene(
    frag_px: vec2<f32>,
    uv:      vec2<f32>,
    b:       vec2<f32>,
    r:       f32,
    tint:    vec3<f32>,
) -> vec3<f32> {
    let canvas = vec2<f32>(camera.canvasW, camera.canvasH);

    // World units per screen pixel (length of the local-x gradient — a scale,
    // not a direction). Converts the world-unit refraction march into the
    // pixel units of the scene texture.
    let world_per_px = max(length(vec2<f32>(dpdx(uv.x), dpdy(uv.x))), 1e-6);
    let px_per_world = 1.0 / world_per_px;

    let radial = pill_radial(uv, b, r);
    let dist   = length(radial);

    // Analytic capsule normal & front-face height (world units).
    let n      = pill_normal(uv, b, r);
    let h      = pill_height(dist, r);

    // Refract a head-on view ray (−Z) through the surface (Snell's law) and
    // march it to a virtual back plane \`REFRACT_DEPTH·r\` behind the body. The
    // denominator (−rvec.z) shrinks toward the rim where the surface is most
    // tilted, so the march — and thus the displacement — grows there: maximum
    // distortion at the edges, exactly as asked. It is clamped so a grazing
    // rim ray cannot blow the length up to infinity.
    let incident   = vec3<f32>(0.0, 0.0, -1.0);
    let rvec       = refract(incident, n, 1.0 / GLASS_IOR);
    let base_world = r * REFRACT_DEPTH;
    let rlen_world = (h + base_world) / max(-rvec.z, 0.18);

    // Map the local-xy displacement to screen pixels. World +Y is up but the
    // framebuffer / scene-texture +Y is down, hence the Y flip. (Pill rotation
    // is 0 in nexus, so local axes align with world axes.)
    var disp_px = vec2<f32>(rvec.x, -rvec.y) * rlen_world * px_per_world;

    // Keep the extreme-rim displacement coherent — clamp to a fraction of the
    // on-screen radius so the lens never samples wildly off the pill.
    let max_disp = r * px_per_world * REFRACT_MAX;
    let dl       = length(disp_px);
    if (dl > max_disp) {
        disp_px = disp_px * (max_disp / dl);
    }

    let sample_uv = (frag_px + disp_px) / canvas;
    let scene     = textureSampleLevel(sceneTex, sceneSampler, sample_uv, 0.0).rgb;

    // Beer–Lambert emerald absorption: strengthens with optical depth, which
    // is 1 on the spine (thick glass) and 0 at the rim (thin glass).
    let depth      = clamp(1.0 - dist / max(r, 1e-4), 0.0, 1.0);
    let max_c      = max(tint.r, max(tint.g, tint.b));
    let filter_col = tint / max(max_c, 1e-4);
    let transmit   = mix(vec3<f32>(1.0), filter_col, depth);
    return scene * transmit;
}

// ── Flat-slab glass for image-mode pills ────────────────────────────────────
//
// Outward 2-D gradient of the rounded-box SDF (finite differences in local
// world units). Points outward across the whole silhouette; used to tilt the
// slab normal at the rim.
fn box_grad(p: vec2<f32>, b: vec2<f32>, r: f32) -> vec2<f32> {
    let e = max(length(fwidth(p)), 1e-3);
    let dx = sd_rounded_box(p + vec2<f32>(e, 0.0), b, r) - sd_rounded_box(p - vec2<f32>(e, 0.0), b, r);
    let dy = sd_rounded_box(p + vec2<f32>(0.0, e), b, r) - sd_rounded_box(p - vec2<f32>(0.0, e), b, r);
    let g = vec2<f32>(dx, dy);
    let l = length(g);
    return select(vec2<f32>(0.0), g / l, l > 1e-4);
}

// Flat-slab surface normal (mirrors panel-glass's \`panel_slab_normal\`): N ≈ +Z
// over the flat interior (image shows through straight), tilting outward within
// the bevel band near the rim so the edge bends the image. \`bevel_px\` is the
// bevel band width in the same (world) units as \`d\`.
fn slab_normal(p: vec2<f32>, b: vec2<f32>, r: f32, d: f32, bevel_px: f32) -> vec3<f32> {
    let bevel = smoothstep(-bevel_px, 0.0, d);          // 0 interior → 1 at rim
    let grad  = box_grad(p, b, r);
    let tilt  = grad * FRAME_EDGE_TILT * bevel * bevel;  // gentle→steep toward rim
    return normalize(vec3<f32>(-tilt, 1.0));
}

// Image-frame glass: a flat green slab over the node image. Refracts the
// captured scene (which already contains the image sprite, drawn beneath) so
// the flat centre passes the image near-undistorted while the bevelled rim
// bends it — the panel material, recoloured green. Returns premultiplied-ready
// (colour, coverage) where coverage is how opaque the slab is over the image.
fn shade_image_frame(
    frag_px: vec2<f32>,
    uv:      vec2<f32>,
    b:       vec2<f32>,
    r:       f32,
    d:       f32,
    tint:    vec3<f32>,
    fresnel_pow: f32,
) -> vec4<f32> {
    let canvas   = vec2<f32>(camera.canvasW, camera.canvasH);
    let bevel_px = b.y * FRAME_BEVEL_FRAC;
    let N        = slab_normal(uv, b, r, d, bevel_px);
    let bevel    = smoothstep(-bevel_px, 0.0, d);        // 0 interior → 1 at rim

    // World→pixel scale (see refract_scene): converts the refraction march into
    // scene-texture pixels. Evaluated in uniform control flow by the caller.
    let world_per_px = max(length(vec2<f32>(dpdx(uv.x), dpdy(uv.x))), 1e-6);
    let px_per_world = 1.0 / world_per_px;

    // Refract the head-on view ray through the slab normal and sample the scene
    // at the displaced pixel. Flat interior ⇒ ray un-bent (image straight);
    // bevel ⇒ ray bent, so the rim distorts the image. Displacement scales with
    // the bevel band so it stays proportional to the node size.
    let incident = vec3<f32>(0.0, 0.0, -1.0);
    let rvec     = refract(incident, N, 1.0 / GLASS_IOR);
    var disp_px  = vec2<f32>(rvec.x, -rvec.y) * bevel_px * px_per_world;
    let max_disp = b.y * px_per_world * REFRACT_MAX;
    let dl       = length(disp_px);
    if (dl > max_disp) { disp_px = disp_px * (max_disp / dl); }

    let sample_uv = (frag_px + disp_px) / canvas;
    let scene     = textureSampleLevel(sceneTex, sceneSampler, sample_uv, 0.0).rgb;

    // Green Beer–Lambert tint: light over the flat centre, heavier at the rim.
    let max_c    = max(tint.r, max(tint.g, tint.b));
    let hue      = tint / max(max_c, 1e-4);
    let density  = mix(FRAME_TINT_BASE, FRAME_TINT_EDGE, bevel);
    let glass    = mix(vec3<f32>(1.0), hue, density);
    var color    = scene * glass;

    // Fresnel edge highlight — concentrated on the bevel, in the green hue, so
    // the rim reads as a lit glass edge.
    let fresnel = pow(1.0 - max(0.0, N.z), fresnel_pow);
    color = color + fresnel * 0.6 * hue;

    // FRAME-ONLY coverage: \`bevel\` is 0 across the flat interior and rises to 1
    // at the rim, so the glass is painted as a refractive frame and the centre
    // is left transparent. The node image itself is drawn (translucent + green +
    // rounded) by the SPRITES pass and shows through the transparent centre; here
    // the pill only contributes the deformed glass border — the same refractive
    // rim the chat panel uses. Silhouette AA is applied by the caller via
    // \`fill_alpha\`.
    return vec4<f32>(color, bevel);
}

// Glass material shading: returns a linear-RGB colour for the pill
// fragment, given the local UV, the pill geometry, and the per-pill
// glass-material fields.  Caller is responsible for compositing the
// border, the AA alpha, the caret/checkmark icons, and the per-pill
// opacity.
fn shade_glass(
    uv:         vec2<f32>,
    half_size:  vec2<f32>,
    r:          f32,
    fill_color: vec4<f32>,
    glass_tint: vec3<f32>,
    fresnel_pow: f32,
    glow_color: vec3<f32>,
    glow_int:   f32,
    spec_int:   f32,
    spec_pow:   f32,
) -> vec3<f32> {
    let d = sd_rounded_box(uv, half_size, r);
    let N = pill_normal(uv, half_size, r);

    // Diffuse — directional from the key light. A baseline of 0.4 keeps
    // the body visible in the shadow side; 0.6 lets the lit side
    // dominate where the surface faces the light.
    let n_dot_l = max(0.0, dot(N, LIGHT_DIR));
    let body = glass_tint * (0.4 + 0.6 * n_dot_l);

    // Inner glow — brighter at the centre, falling off toward the
    // silhouette. \`raise\` is the depth into the pill (clamped to
    // [0, 1]); for a full capsule (r = h/2) the centre is at depth
    // r, so the centre reaches raise = 1.
    let raise = clamp(-d / max(r, 0.0001), 0.0, 1.0);
    let glow  = glow_color * glow_int * raise;

    // Fresnel — Schlick-style edge brightening. The exponent is taken
    // from the per-pill material (typical 2.5).
    let n_dot_v = max(0.0, N.z);
    let fresnel = pow(1.0 - n_dot_v, fresnel_pow);

    // Specular — Blinn-Phong highlight from the key light, white. The
    // result is 0 except in a small bright spot near the highlight.
    let R   = reflect(-LIGHT_DIR, N);
    let spec = pow(max(0.0, dot(R, VIEW_DIR)), spec_pow) * spec_int;

    // Compose. The fill-colour alpha drives how strongly the Fresnel
    // rim bleeds through, so a transparent body still shows a clean
    // edge ring.
    var color = body;
    color = color + glow;
    color = color + fresnel * fill_color.a * 0.6 * fill_color.rgb;
    color = color + spec * vec3<f32>(1.0, 1.0, 1.0);
    return color;
}

@fragment
fn pill_fs(in: VertexOutput) -> @location(0) vec4<f32> {
    let b = in.halfSize;
    let d = sd_rounded_box(in.uv, b, in.cornerRadius);

    // Image-frame mode: the pill is a hollow glass frame around a node image
    // (the image is a sprite drawn beneath in the SPRITES pass). The interior
    // is punched out to transparent so the image shows through; only the rim,
    // border, and selection ring are drawn.  The regular in-pill caret / pin /
    // checkmark glyphs are instead drawn in a vertical strip to the right of the
    // frame so they never overlap the image.
    let is_image = (in.flags & PILL_FLAG_IMAGE) != 0u;

    // Common button state flags reused by both regular and image-mode layouts.
    let isCollapsed       = (in.flags & PILL_FLAG_COLLAPSED) != 0u;
    let isPinned          = (in.flags & PILL_FLAG_PINNED) != 0u;
    let isHoverPin        = (in.flags & PILL_FLAG_HOVER_PIN) != 0u;
    let isHoverCollapse   = (in.flags & PILL_FLAG_HOVER_COLLAPSE) != 0u;
    let showImageCollapse = is_image && (in.flags & PILL_FLAG_COLLAPSIBLE) != 0u && (in.flags & PILL_FLAG_ACTIVE) == 0u;
    let showRegularPin    = !is_image && (in.flags & PILL_FLAG_ACTIVE) == 0u;
    let showRegularCaret  = !is_image && (in.flags & PILL_FLAG_COLLAPSIBLE) != 0u && (in.flags & PILL_FLAG_ACTIVE) == 0u;

    // ── 1. Glass material base colour ─────────────────────────────────
    // The body is a faked-3D glass capsule (see \`shade_glass\`). When
    // the per-pill glass material is the zero-vector (e.g. legacy
    // pre-glass entries) the body falls back to a plain flat fill so
    // the visual contract is preserved.
    // Real refraction of the captured scene behind the pill. Computed
    // UNCONDITIONALLY (before the material branch) because \`refract_scene\`
    // evaluates screen-space derivatives, which require uniform control flow.
    let refracted = refract_scene(
        in.pos.xy, in.uv, b, in.cornerRadius, in.glassTint,
    );

    // Image-frame slab shading. Also uses screen-space derivatives, so it is
    // computed here (uniform control flow) and consumed in the \`is_image\`
    // branch at the end.
    let image_frame = shade_image_frame(
        in.pos.xy, in.uv, b, in.cornerRadius, d, in.glassTint, in.fresnelPower,
    );

    var body_rgb: vec3<f32>;
    if (!is_image) {
        if (length(in.glassTint) < 0.001) {
            // Legacy / flat fallback — keeps old pills from going black.
            body_rgb = in.fillColor.rgb;
        } else {
            body_rgb = shade_glass(
                in.uv, b, in.cornerRadius, in.fillColor,
                in.glassTint, in.fresnelPower,
                in.glowColor, in.glowIntensity,
                in.specIntensity, in.specPower,
            );
            // Add the refracted scene as inner luminosity on top of the emerald
            // body. REFRACT_GAIN keeps the shimmer from washing out the gem.
            body_rgb = body_rgb + refracted * REFRACT_GAIN;
        }
    }

    // ── 2. Border ring ─────────────────────────────────────────────────
    // A thin annulus just inside the rounded-rect boundary. The border
    // colour comes from the per-pill material (slightly darker shade
    // of the fill, set by Rust at register time).
    let fill_alpha   = 1.0 - smoothstep(-AA_FEATHER, 0.0, d);
    // Thin border ring just inside the silhouette:
    //   * (1.0 - smoothstep(-AA_FEATHER, 0.0, d))  → 1 inside the pill, 0 outside
    //   * smoothstep(-BORDER_WIDTH - AA_FEATHER, -BORDER_WIDTH, d) → 0 deep inside, 1 near edge
    // Product = a band of width BORDER_WIDTH hugging the inner edge.
    let border_alpha = fill_alpha *
        smoothstep(-BORDER_WIDTH - AA_FEATHER, -BORDER_WIDTH, d);
    let border_rgb   = in.borderColor.rgb;

    // Border on top of the glass body. We render the border *after* the
    // glass so the rim stays sharp and consistent regardless of the
    // glass parameters.
    var color = mix(body_rgb, border_rgb, border_alpha * in.borderColor.a);

    // ── 3. Collapse/expand caret icon ──────────────────────────────────
    // Drawn only on collapsible pills that are NOT in edit mode. When the
    // node is active (PILL_FLAG_ACTIVE) the checkmark icon takes the left
    // side and the caret is hidden, mirroring how the checkmark is hidden
    // in view mode.
    if (showRegularCaret) {
        // Caret position: right side of the pill, anchored a fixed distance
        // left of the right edge so it stays tight to the capsule end.
        let caretCenter = vec2<f32>(in.halfSize.x - in.halfSize.y * 0.953, 0.0);
        let caretAlpha = caret_icon_alpha(in.uv - caretCenter, in.halfSize.y, isCollapsed) * fill_alpha;

        if (caretAlpha > 0.0) {
            let caret = vec4<f32>(IMAGE_ICON_RGB, caretAlpha);
            color = mix(color, caret.rgb, caret.a);
        }
    }

    // ── 4. Pin icon ────────────────────────────────────────────────────
    // Drawn on the right side, left of the collapse caret. Always visible on
    // non-image pills; dimmed (0.55× alpha) when the node is not pinned so
    // the pinned state is visually distinct. Hidden in edit mode so it
    // doesn't overlap the active-mode checkmark.
    if (showRegularPin) {
        // Pin sits left of the caret: fixed distance from the right edge,
        // then a fixed gap left of the caret centre.
        let pinCenter = vec2<f32>(in.halfSize.x - in.halfSize.y * 2.0966, 0.0);
        var pinAlpha = pin_icon_alpha(in.uv - pinCenter, in.halfSize.y) * fill_alpha;
        // Dim the icon when the node is not yet pinned so pinned vs. hover-only
        // states are visually distinct.
        if (!isPinned) {
            pinAlpha *= 0.55;
        }
        if (pinAlpha > 0.0) {
            let pin = vec4<f32>(IMAGE_ICON_RGB, pinAlpha);
            color = mix(color, pin.rgb, pin.a);
        }
    }

    // ── 5. Active-mode checkmark icon ──────────────────────────────────
    // Drawn on the left side when the node is in edit mode
    // (PILL_FLAG_ACTIVE).  It is the mirror of the collapse caret: same
    // height, same stroke weight, same clearance from the pill edge, just
    // positioned at -0.75·halfWidth and drawn as a check instead of a
    // triangle.
    if (!is_image && (in.flags & PILL_FLAG_ACTIVE) != 0u) {
        // Mirror the caret geometry so the two icons share the same
        // visual footprint and the same text-clearance budget.
        let checkCx = -in.halfSize.x * 0.75;
        let checkCy = 0.0;
        let cp = in.uv - vec2<f32>(checkCx, checkCy);

        let checkH = in.halfSize.y * 0.70;
        let checkW = in.halfSize.y * 0.364;
        let thick = in.halfSize.y * 0.08;

        // Checkmark strokes fit inside the same bounding box as the caret
        // (width ±checkW, height ±checkH/2).  First stroke drops from the
        // left to the bottom-centre; second stroke rises to the upper-right.
        let s1a = vec2<f32>(-checkW * 0.45, checkH * 0.15);
        let s1b = vec2<f32>(-checkW * 0.05, -checkH * 0.45);
        let s2a = s1b;
        let s2b = vec2<f32>(checkW * 0.75, checkH * 0.45);

        let d1 = sd_segment(cp, s1a, s1b) - thick;
        let d2 = sd_segment(cp, s2a, s2b) - thick;
        let dCheck = min(d1, d2);

        let checkAlpha = (1.0 - smoothstep(-AA_FEATHER, AA_FEATHER, dCheck)) * fill_alpha;
        if (checkAlpha > 0.0) {
            let checkRGB = vec3<f32>(0.4, 0.85, 0.4);
            let check = vec4<f32>(checkRGB, checkAlpha);
            color = mix(color, check.rgb, check.a);
        }
    }

    // ── 6. Selection ring (PILL_FLAG_SELECTED) ─────────────────────────
    // A solid 3px accent-coloured ring rendered just outside the body's
    // normal border, exactly like the CSS \`box-shadow: 0 0 0 3px
    // \${accentColor}\` on \`ars-info-tile[data-selected=true]\`.  The
    // ring lives in the SDF band
    //   d ∈ [ -BORDER_WIDTH - AA_FEATHER - SELECTION_RING_WIDTH,
    //         -BORDER_WIDTH - AA_FEATHER ]
    // which is OUTSIDE the body (d < 0) — \`fill_alpha\` is 0 there so
    // we must NOT multiply by it (otherwise the ring would be
    // invisible).  We do multiply by \`in.opacity\` so a fading pill
    // fades its ring too — no "ghost" ring after the body has gone.
    //
    // The ring colour is \`in.borderColor.rgb\` — the host sets the
    // border to the full per-pill accent when \`is_selected=true\`,
    // matching the \`ars-info-tile\` contract.  This means a
    // cyan-accent pill shows a cyan ring, a green-accent pill shows
    // a green ring, and a future palette refresh can't desync the
    // two surfaces.
    //
    // The bit is bit 0 of \`flags\` (Rust: \`PILL_FLAG_SELECTED = 0x01\`,
    // TS: \`FrameBufferReader.ts::PILL_FLAG_SELECTED = 0x01\`).  Bits
    // 1/2/3 are taken by COLLAPSED / COLLAPSIBLE / ACTIVE so a
    // selected node can still display its caret / checkmark icons
    // without overlap.
    //
    // Band-pass shape: a triangular peak at the centre of the band
    // (ramp up from 0 at the outer edge, ramp back to 0 at the
    // inner edge).  A plain \`smoothstep(ringInner, ringOuter, d)\`
    // would saturate at 1 for any d ≥ ringOuter and would bleed
    // the ring colour over the entire body — the band-pass
    // subtraction keeps the ring confined to the band.  A pure
    // smoothstep would also fail the "unselected pill produces
    // zero ring contribution" test at d > 0 (inside the body).
    // Selection ring for regular pills.  Image-frame selection is handled
    // inside the image-mode branch so the ring stays around the frame.
    if (!is_image && (in.flags & PILL_FLAG_SELECTED) != 0u) {
        let ringInner = -BORDER_WIDTH - AA_FEATHER - SELECTION_RING_WIDTH;
        let ringOuter = -BORDER_WIDTH - AA_FEATHER;
        let ringMid   = (ringInner + ringOuter) * 0.5;
        let ringAlpha = (smoothstep(ringInner, ringMid, d)
                       - smoothstep(ringMid, ringOuter, d)) * in.opacity;
        if (ringAlpha > 0.0) {
            let ring = vec4<f32>(in.borderColor.rgb, ringAlpha);
            color = mix(color, ring.rgb, ring.a);
        }
    }

    // ── 7. Button hover ring ───────────────────────────────────────────
    // When the pointer is over a clickable sub-button, draw a bright ring
    // around that button so the mark is tied to the control, not the whole
    // pill.  The ring is centred on the icon position and scales with the
    // pill half-height, matching the caret/checkmark sizing.
    // Image-mode hover rings are drawn inside the image branch.
    var hoverRingAlpha = 0.0;
    let hoverRingRadius = in.halfSize.y * 0.58;
    // Image-mode hover rings track the fixed-size icons, not the tall frame.
    let imgHoverRingRadius = IMAGE_ICON_REF_HALF_H * 0.58;
    let hoverRingWidth = 1.8;
    let hoverRingRGB = vec3<f32>(1.0, 1.0, 1.0);

    if (!is_image && (in.flags & PILL_FLAG_HOVER_COLLAPSE) != 0u) {
        let collapseCenter = vec2<f32>(in.halfSize.x - in.halfSize.y * 0.953, 0.0);
        let dc = length(in.uv - collapseCenter);
        let innerEdge = hoverRingRadius - hoverRingWidth * 0.5;
        let outerEdge = hoverRingRadius + hoverRingWidth * 0.5;
        hoverRingAlpha = (smoothstep(innerEdge - AA_FEATHER, innerEdge, dc)
                        - smoothstep(outerEdge, outerEdge + AA_FEATHER, dc))
                        * in.opacity;
    } else if (!is_image && (in.flags & PILL_FLAG_HOVER_CHECKMARK) != 0u) {
        let checkmarkCenter = vec2<f32>(-in.halfSize.x * 0.75, 0.0);
        let dc = length(in.uv - checkmarkCenter);
        let innerEdge = hoverRingRadius - hoverRingWidth * 0.5;
        let outerEdge = hoverRingRadius + hoverRingWidth * 0.5;
        hoverRingAlpha = (smoothstep(innerEdge - AA_FEATHER, innerEdge, dc)
                        - smoothstep(outerEdge, outerEdge + AA_FEATHER, dc))
                        * in.opacity;
    } else if (!is_image && (in.flags & PILL_FLAG_HOVER_PIN) != 0u) {
        let pinCenter = vec2<f32>(in.halfSize.x - in.halfSize.y * 2.0966, 0.0);
        let dc = length(in.uv - pinCenter);
        let innerEdge = hoverRingRadius - hoverRingWidth * 0.5;
        let outerEdge = hoverRingRadius + hoverRingWidth * 0.5;
        hoverRingAlpha = (smoothstep(innerEdge - AA_FEATHER, innerEdge, dc)
                        - smoothstep(outerEdge, outerEdge + AA_FEATHER, dc))
                        * in.opacity;
    }

    if (hoverRingAlpha > 0.0) {
        let hoverRing = vec4<f32>(hoverRingRGB, hoverRingAlpha);
        color = mix(color, hoverRing.rgb, hoverRing.a);
    }

    // Image-frame mode: the pill is a flat GREEN GLASS SLAB laid over the node
    // image (drawn beneath, in the SPRITES pass, so it is already in \`sceneTex\`).
    // Not the domed capsule (whose thick body swallowed the image), and not the
    // old flat-opaque frame (which just painted a green ring on top). Instead it
    // mirrors the left-panel material (panel-glass.wgsl): the flat centre lets
    // the image show through ~70% with a light green tint, and the bevelled rim
    // bends the image outward — "the pill with the image inside it, its shape
    // changed by it".
    if (is_image) {
        // The pill is a hollow glass FRAME around the node image (the image is a
        // translucent, green-tinted, rounded sprite drawn beneath in the SPRITES
        // pass). \`image_frame.rgb\` is the refractive green glass; \`image_frame.a\`
        // is the rim-weighted bevel coverage (0 in the centre → 1 at the rim), so
        // the interior stays transparent and the image shows through.
        var out_rgb   = image_frame.rgb;
        var out_cov   = image_frame.a * fill_alpha;

        // Crisp border ring on the outer edge, so the frame reads as a defined
        // glass edge over the image (same border colour as a normal pill).
        out_rgb = mix(out_rgb, in.borderColor.rgb, border_alpha * in.borderColor.a);
        out_cov = max(out_cov, border_alpha * in.borderColor.a);

        // Selection ring, outside the body (d < 0), in the accent colour — same
        // band-pass shape as step 6, kept here because the branch returns early.
        if ((in.flags & PILL_FLAG_SELECTED) != 0u) {
            let ringInner = -BORDER_WIDTH - AA_FEATHER - SELECTION_RING_WIDTH;
            let ringOuter = -BORDER_WIDTH - AA_FEATHER;
            let ringMid   = (ringInner + ringOuter) * 0.5;
            let ring_cov  = smoothstep(ringInner, ringMid, d) - smoothstep(ringMid, ringOuter, d);
            out_rgb = mix(out_rgb, in.borderColor.rgb, ring_cov);
            out_cov = max(out_cov, ring_cov);
        }

        // Pin icon: right-top of the image frame. Always visible; dimmed
        // when not pinned. Use raw icon alpha here; the final \`return\`
        // multiplies coverage by \`in.opacity\`, so we must not apply opacity
        // twice.
        {
            let pinCenter = vec2<f32>(
                b.x + IMAGE_ICON_REF_HALF_H * IMAGE_ICON_CX_HFRAC,
                IMAGE_ICON_REF_HALF_H * IMAGE_ICON_CY_HFRAC,
            );
            var pinAlpha = pin_icon_alpha(in.uv - pinCenter, IMAGE_ICON_REF_HALF_H);
            if (!isPinned) {
                pinAlpha *= 0.55;
            }
            if (pinAlpha > 0.0) {
                out_rgb = mix(out_rgb, IMAGE_ICON_RGB, pinAlpha);
                out_cov = max(out_cov, pinAlpha);
            }
            if (isHoverPin) {
                let dc = length(in.uv - pinCenter);
                let innerEdge = imgHoverRingRadius - hoverRingWidth * 0.5;
                let outerEdge = imgHoverRingRadius + hoverRingWidth * 0.5;
                let ringAlpha = smoothstep(innerEdge - AA_FEATHER, innerEdge, dc)
                                - smoothstep(outerEdge, outerEdge + AA_FEATHER, dc);
                if (ringAlpha > 0.0) {
                    out_rgb = mix(out_rgb, hoverRingRGB, ringAlpha);
                    out_cov = max(out_cov, ringAlpha);
                }
            }
        }

        // Collapse/expand caret: right-bottom of the image frame.
        if (showImageCollapse) {
            let caretCenter = vec2<f32>(
                b.x + IMAGE_ICON_REF_HALF_H * IMAGE_ICON_CX_HFRAC,
                -IMAGE_ICON_REF_HALF_H * IMAGE_ICON_CY_HFRAC,
            );
            let caretAlpha = caret_icon_alpha(in.uv - caretCenter, IMAGE_ICON_REF_HALF_H, isCollapsed);
            if (caretAlpha > 0.0) {
                out_rgb = mix(out_rgb, IMAGE_ICON_RGB, caretAlpha);
                out_cov = max(out_cov, caretAlpha);
            }
            if (isHoverCollapse) {
                let dc = length(in.uv - caretCenter);
                let innerEdge = imgHoverRingRadius - hoverRingWidth * 0.5;
                let outerEdge = imgHoverRingRadius + hoverRingWidth * 0.5;
                let ringAlpha = smoothstep(innerEdge - AA_FEATHER, innerEdge, dc)
                                - smoothstep(outerEdge, outerEdge + AA_FEATHER, dc);
                if (ringAlpha > 0.0) {
                    out_rgb = mix(out_rgb, hoverRingRGB, ringAlpha);
                    out_cov = max(out_cov, ringAlpha);
                }
            }
        }

        return vec4<f32>(out_rgb, out_cov * in.opacity);
    }

    return vec4<f32>(color, fill_alpha * in.opacity);
}`,_=112,E=6,R=80;class b{device;pipeline;bindGroupLayout;uniformBuffer;sceneSampler;fallbackSceneTexture;fallbackSceneView;instanceBuffer;instanceCapacity;stagingFloats;constructor(h,o,i,r,l,s,c,e){this.device=h,this.pipeline=o,this.bindGroupLayout=i,this.uniformBuffer=r,this.sceneSampler=c,this.fallbackSceneTexture=e,this.fallbackSceneView=e.createView({label:"pill-fallback-scene-view"}),this.instanceBuffer=l,this.instanceCapacity=s,this.stagingFloats=new Float32Array(new ArrayBuffer(s*28*4))}static async create(h,o){const i=h.device,r=new v(i),{module:l}=await r.compile(A,"pill-render-shader"),s=i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{type:"read-only-storage"}},{binding:1,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}},{binding:2,visibility:GPUShaderStage.FRAGMENT,texture:{sampleType:"float",viewDimension:"2d"}},{binding:3,visibility:GPUShaderStage.FRAGMENT,sampler:{type:"filtering"}}],label:"pill-render-bgl"}),c=i.createPipelineLayout({bindGroupLayouts:[s],label:"pill-render-layout"}),e=i.createRenderPipeline({layout:c,vertex:{module:l,entryPoint:"pill_vs"},fragment:{module:l,entryPoint:"pill_fs",targets:[{format:o,blend:{color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}}}]},primitive:{topology:"triangle-list"},depthStencil:{depthWriteEnabled:!1,depthCompare:"always",format:"depth24plus"},label:"pill-render-pipeline"}),f=i.createBuffer({size:R,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST,label:"pill-camera-ubo"}),a=128,u=i.createBuffer({size:a*_,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST,label:"pill-instance-buf"}),m=i.createSampler({magFilter:"linear",minFilter:"linear",addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge",label:"pill-scene-sampler"}),d=i.createTexture({size:{width:1,height:1},format:o,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST,label:"pill-fallback-scene-tex"});return new b(i,e,s,f,u,a,m,d)}render(h,o,i,r,l,s){if(i.length===0)return;i.length>this.instanceCapacity&&(this.instanceBuffer.destroy(),this.instanceCapacity=Math.max(i.length,this.instanceCapacity*2),this.instanceBuffer=this.device.createBuffer({size:this.instanceCapacity*_,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST,label:"pill-instance-buf"}),this.stagingFloats=new Float32Array(new ArrayBuffer(this.instanceCapacity*28*4)));const c=i.length*28,e=this.stagingFloats,f=new Uint32Array(e.buffer);for(let g=0;g<i.length;g++){const t=i[g],n=g*28;e[n+0]=t.centerX,e[n+1]=t.centerY,e[n+2]=t.centerZ,e[n+3]=t.width,e[n+4]=t.height,e[n+5]=t.rotation,e[n+6]=t.opacity,e[n+7]=t.fillR,e[n+8]=t.fillG,e[n+9]=t.fillB,e[n+10]=t.fillA,e[n+11]=t.borderR,e[n+12]=t.borderG,e[n+13]=t.borderB,e[n+14]=t.borderA,e[n+15]=t.cornerRadius,f[n+16]=t.flags,e[n+17]=t.glassTintR,e[n+18]=t.glassTintG,e[n+19]=t.glassTintB,e[n+20]=t.fresnelPower,e[n+21]=t.glowIntensity,e[n+22]=t.glowR,e[n+23]=t.glowG,e[n+24]=t.glowB,e[n+25]=t.specIntensity,e[n+26]=t.specPower,e[n+27]=0}this.device.queue.writeBuffer(this.instanceBuffer,0,e,0,c);const a=new Float32Array(20);a.set(r.viewProj,0),a[16]=r.canvasW,a[17]=r.canvasH,a[18]=0,a[19]=r.vpH,this.device.queue.writeBuffer(this.uniformBuffer,0,a);const u=s??this.fallbackSceneView,m=this.device.createBindGroup({layout:this.bindGroupLayout,entries:[{binding:0,resource:{buffer:this.instanceBuffer}},{binding:1,resource:{buffer:this.uniformBuffer}},{binding:2,resource:u},{binding:3,resource:this.sceneSampler}],label:"pill-render-bg"}),d={colorAttachments:[{view:o,loadOp:"load",storeOp:"store"}],label:"pill-render-pass"};l!==void 0&&(d.depthStencilAttachment={view:l,depthLoadOp:"load",depthStoreOp:"store"});const p=h.beginRenderPass(d);p.setPipeline(this.pipeline),p.setBindGroup(0,m),p.draw(i.length*E),p.end()}destroy(){this.instanceBuffer.destroy(),this.uniformBuffer.destroy(),this.fallbackSceneTexture.destroy()}}export{b as PillRenderer};

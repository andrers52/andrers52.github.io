import{c as O,w as H,d as q,b as D,P as V}from"./z32-CGATcw43.js";const Z=80;function B(i){return{centerX:i.centerX,centerY:i.centerY,centerZ:i.centerZ,viewportH:i.viewportH,canvasW:i.canvasW,canvasH:i.canvasH,pitch:i.pitch,yaw:i.yaw,roll:i.roll,focalLength:i.focalLength}}class j{device;_uniformBuffer;_config;constructor(e){this.device=e,this._uniformBuffer=e.createBuffer({size:Z,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST,label:"camera-uniforms"}),this._config={centerX:0,centerY:0,centerZ:0,viewportW:1,viewportH:1,canvasW:1,canvasH:1,pitch:0,yaw:0,roll:0,focalLength:0}}update(e){this._config={...e};const t=O(B(e)),n=new Float32Array(20);n.set(t,0),n[16]=e.canvasW,n[17]=e.canvasH,n[18]=0,n[19]=e.viewportH,this.device.queue.writeBuffer(this._uniformBuffer,0,n)}get uniformBuffer(){return this._uniformBuffer}get config(){return this._config}worldToCanvas(e,t,n=0){return H(B(this._config),e,t,n)}canvasToWorld(e,t,n=0){return q(B(this._config),e,t,n)}destroy(){this._uniformBuffer.destroy()}}class y{pipeline;bindGroupLayout;device;label;constructor(e,t,n,r){this.device=e,this.pipeline=t,this.bindGroupLayout=n,this.label=r}static async create(e,t,n){const r=n??new D(e),{module:s}=await r.compile(t.shader.source,`${t.label}-shader`),o=t.buffers.map((u,f)=>({binding:f,visibility:GPUShaderStage.COMPUTE,buffer:{type:Q(u.type)}})),a=e.createBindGroupLayout({entries:o,label:`${t.label}-bgl`}),l=e.createPipelineLayout({bindGroupLayouts:[a],label:`${t.label}-layout`}),c=e.createComputePipeline({layout:l,compute:{module:s,entryPoint:t.shader.entryPoint},label:t.label});return new y(e,c,a,t.label)}createBindGroup(e){const t=e.map((n,r)=>({binding:r,resource:{buffer:n}}));return this.device.createBindGroup({layout:this.bindGroupLayout,entries:t,label:`${this.label}-bg`})}dispatch(e,t,n,r=1,s=1){const o=this.createBindGroup(t),a=e.beginComputePass({label:`${this.label}-pass`});a.setPipeline(this.pipeline),a.setBindGroup(0,o),a.dispatchWorkgroups(n,r,s),a.end()}dispatchWithBindGroup(e,t,n,r=1,s=1){const o=e.beginComputePass({label:`${this.label}-pass`});o.setPipeline(this.pipeline),o.setBindGroup(0,t),o.dispatchWorkgroups(n,r,s),o.end()}}function Q(i){switch(i){case"storage":return"storage";case"uniform":return"uniform";case"read-only-storage":return"read-only-storage"}}const U=Symbol("brainiac.compositor.constructor"),x=new WeakSet,C=new WeakSet;class z extends Error{constructor(){super("Particle pipeline for this GPUDevice is already owned by a Compositor.  Constructing a second ParticleSystem / ParticleRenderer on the same device is not supported — the device has exactly one particle pipeline, exposed via Compositor.particleSystem / Compositor.emitterScheduler.  See docs/PARTICLE_INTEGRATION.md § Enforcement (R2)."),this.name="ParticlePipelineAlreadyOwnedError"}}class $ extends Error{constructor(){super("A Compositor is already attached to this canvas.  The prior `particles` demo reproduced its bug by creating an overlay canvas and a second pipeline — this assertion prevents that pattern.  Destroy the existing Compositor before creating a new one, or render to a different canvas.  See docs/PARTICLE_INTEGRATION.md § Enforcement (R3)."),this.name="CompositorAlreadyAttachedError"}}function K(i){if(x.has(i))throw new z;x.add(i)}function J(i){x.delete(i)}function ee(i){if(C.has(i))throw new $;C.add(i)}function te(i){C.delete(i)}function L(i,e){if(e!==U&&x.has(i))throw new z}const W=32,h=1e5,ne=W*h,v=64,ie=4+h*4,re=12,T=56;function se(i,e,t,n){return(n&255)<<24|(t&255)<<16|(e&255)<<8|i&255}function oe(i){const e=new Float32Array(T/4);e[0]=i.worldX,e[1]=i.worldY,e[2]=i.velocityRange[0],e[3]=i.velocityRange[1],e[4]=i.angleRange[0],e[5]=i.angleRange[1],e[6]=i.gravity;const t=se(...i.color);return new Uint32Array(e.buffer)[7]=t,e[8]=i.lifetime[0],e[9]=i.lifetime[1],e[10]=i.size[0],e[11]=i.size[1],e[12]=i.spreadX??0,e[13]=i.spreadY??0,e}function A(i,e,t=1){if(!i||i.length===0)return t;if(i.length===1||e<=i[0].time)return i[0].value;if(e>=i[i.length-1].time)return i[i.length-1].value;let n=0,r=i.length-1;for(;n<r-1;){const c=n+r>>>1;i[c].time<=e?n=c:r=c}const s=i[n],o=i[r],a=o.time-s.time,l=a>0?(e-s.time)/a:0;return s.value+(o.value-s.value)*l}const ae=64,le=ae*4,_=4,N=4+_*5*4;function ce(i){const e=new ArrayBuffer(N),t=new DataView(e);t.setUint32(0,Math.min(i.count,_),!0);for(let n=0;n<_;n++){const r=i.fields[n]??{kind:0,x:0,y:0,strength:0,falloff:0},s=4+n*20;t.setFloat32(s+0,r.kind,!0),t.setFloat32(s+4,r.x,!0),t.setFloat32(s+8,r.y,!0),t.setFloat32(s+12,r.strength,!0),t.setFloat32(s+16,r.falloff,!0)}return new Uint8Array(e)}function ue(i){const e=[];for(const t of i)if(t.active!==!1){switch(t.kind){case"wind":{const n=Math.hypot(t.directionX,t.directionY);n>0&&e.push({kind:1,x:t.directionX/n,y:t.directionY/n,strength:t.strength,falloff:0});break}case"point":{e.push({kind:2,x:t.x,y:t.y,strength:t.strength,falloff:t.falloffRadius??0});break}case"vortex":{e.push({kind:3,x:t.x,y:t.y,strength:t.strength*(t.angularSpeed??1),falloff:t.falloffRadius??0});break}}if(e.length>=_)break}return{count:e.length,fields:e}}const fe=`// particle-spawn.wgsl — Spawn compute shader for the GPU particle system.
//
// Reclaims dead-pool indices via atomicSub and initializes particles from
// SpawnDesc descriptors uploaded by the host.  Each invocation spawns one
// particle using a wang_hash PRNG seeded from (uniforms.seed + global_id).
//
// Buffer contracts are defined in ParticleTypes.ts; keep the two in sync.

// ─── PRNG utilities ─────────────────────────────────────────────────

fn wang_hash(seed: u32) -> u32 {
    var s = seed;
    s = (s ^ 61u) ^ (s >> 16u);
    s = s * 9u;
    s = s ^ (s >> 4u);
    s = s * 0x27d4eb2du;
    s = s ^ (s >> 15u);
    return s;
}

fn rand_f32(seed: ptr<function, u32>) -> f32 {
    *seed = wang_hash(*seed);
    return f32(*seed) / 4294967295.0;
}

fn rand_range(seed: ptr<function, u32>, lo: f32, hi: f32) -> f32 {
    return lo + rand_f32(seed) * (hi - lo);
}

// ─── Structures ─────────────────────────────────────────────────────

// GPU-side spawn descriptor (56 bytes, matches SPAWN_DESC_STRIDE).
struct SpawnDesc {
    position:    vec2<f32>,  // offset  0
    velocityMin: f32,        // offset  8
    velocityMax: f32,        // offset 12
    angleMin:    f32,        // offset 16
    angleMax:    f32,        // offset 20
    gravity:     f32,        // offset 24
    color:       u32,        // offset 28  (packed RGBA)
    lifetimeMin: f32,        // offset 32
    lifetimeMax: f32,        // offset 36
    sizeMin:     f32,        // offset 40
    sizeMax:     f32,        // offset 44
    spreadX:     f32,        // offset 48  — random position jitter ±spreadX
    spreadY:     f32,        // offset 52  — random position jitter ±spreadY
}

// Particle buffer entry (32 bytes, alignment 8).
struct Particle {
    position: vec2<f32>,  // offset  0
    velocity: vec2<f32>,  // offset  8
    color:    u32,        // offset 16
    life:     f32,        // offset 20  (current age; -1.0 = dead)
    lifetime: f32,        // offset 24  (total lifetime)
    _pad:     f32,        // offset 28
}

// Free-list of reclaimable particle indices.
// count is an atomic counter at offset 0, followed by the index stack.
struct DeadPool {
    count:   atomic<u32>,
    indices: array<u32>,
}

// Per-dispatch uniforms for the spawn pass.
//
// \`descCount\` is the number of spawn descriptors actually WRITTEN this
// frame (one per active emitter whose accumulator flushed a spawn).
// The descriptor buffer itself is fixed-capacity (MAX_SPAWN_DESCS_PER_FRAME
// slots) and is NOT cleared between frames — slots beyond \`descCount\`
// hold stale data from previous frames.  Shaders MUST use
// \`uniforms.descCount\` (not \`arrayLength(&spawnDescs)\`) when indexing
// into the buffer, or they will pick up stale descriptors and spawn
// particles at positions from frames ago — the phantom-emitter bug.
struct Uniforms {
    spawnCount: u32,
    seed:       u32,
    descCount:  u32,
    _pad:       u32,
}

// ─── Bindings ───────────────────────────────────────────────────────

@group(0) @binding(0) var<storage, read>       spawnDescs : array<SpawnDesc>;
@group(0) @binding(1) var<storage, read_write>  deadPool   : DeadPool;
@group(0) @binding(2) var<storage, read_write>  particles  : array<Particle>;
@group(0) @binding(3) var<uniform>              uniforms   : Uniforms;

// ─── Entry point ────────────────────────────────────────────────────

@compute @workgroup_size(64)
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
    let idx = gid.x;

    // Each invocation spawns exactly one particle; skip excess threads.
    if (idx >= uniforms.spawnCount) {
        return;
    }

    // Claim a dead-pool slot.  atomicSub returns the value *before* the
    // subtraction, so the new top-of-stack index is (old - 1).
    let oldCount = atomicSub(&deadPool.count, 1u);

    // If the pool was already empty (oldCount == 0) we have nothing to
    // reclaim.  Restore the counter and bail out.
    if (oldCount == 0u) {
        atomicAdd(&deadPool.count, 1u);
        return;
    }

    // The reclaimed slot sits at stack position (oldCount - 1).
    let particleIdx = deadPool.indices[oldCount - 1u];

    // Pick the spawn descriptor for this particle.  Must use the
    // uniform \`descCount\` (real descriptors written this frame) rather
    // than \`arrayLength(&spawnDescs)\` — see the Uniforms struct comment
    // for why (stale-descriptor phantom-emitter bug).
    let desc = spawnDescs[idx % uniforms.descCount];

    // Seed the PRNG from the uniform seed and global invocation id.
    var rng = wang_hash(uniforms.seed + idx);

    // Randomise emission angle and speed within the descriptor ranges.
    let angle = rand_range(&rng, desc.angleMin, desc.angleMax);
    let speed = rand_range(&rng, desc.velocityMin, desc.velocityMax);

    let vx = cos(angle) * speed;
    let vy = sin(angle) * speed;

    let lt = rand_range(&rng, desc.lifetimeMin, desc.lifetimeMax);

    // Initialize the particle based on emitter type.
    // Initialize the particle with optional position jitter (spread).
    // When spreadX/spreadY > 0, each particle spawns at a random offset
    // within ±spread from the descriptor's position, producing even
    // spatial distribution (e.g., rain across the full viewport width).
    let jitterX = rand_range(&rng, -desc.spreadX, desc.spreadX);
    let jitterY = rand_range(&rng, -desc.spreadY, desc.spreadY);
    particles[particleIdx].position = desc.position + vec2<f32>(jitterX, jitterY);
    particles[particleIdx].velocity = vec2<f32>(vx, vy);
    particles[particleIdx].color    = desc.color;
    particles[particleIdx].life     = 0.0;       // freshly born
    particles[particleIdx].lifetime = lt;
    particles[particleIdx]._pad     = rand_range(&rng, desc.sizeMin, desc.sizeMax);
}
`,de=`// particle-update.wgsl — Per-frame update compute shader for the GPU particle
// system.
//
// Integrates velocity (with gravity + force fields) and position using simple
// Euler steps, advances particle age, and returns expired particles to the
// dead pool.
//
// Force fields (wind, point attractors, vortex) are evaluated per-particle
// per-frame directly in this shader.  This follows the Niagara/Unity approach
// where the GPU applies forces during the integration step, enabling effects
// like vortices that continuously swirl particles.
//
// Buffer contracts are defined in ParticleTypes.ts and ParticleCurveLUT.ts;
// keep them in sync.

// ─── Structures ─────────────────────────────────────────────────────

// Particle buffer entry (32 bytes, alignment 8).
struct Particle {
    position: vec2<f32>,  // offset  0
    velocity: vec2<f32>,  // offset  8
    color:    u32,        // offset 16
    life:     f32,        // offset 20  (current age; -1.0 = dead)
    lifetime: f32,        // offset 24  (total lifetime)
    _pad:     f32,        // offset 28  (base size in pixels)
}

// Free-list of reclaimable particle indices.
struct DeadPool {
    count:   atomic<u32>,
    indices: array<u32>,
}

// Per-frame uniforms for the update pass.
struct Uniforms {
    dt:         f32,
    gravityX:   f32,
    gravityY:   f32,
    // Total particle slot count (== MAX_PARTICLES).  We iterate ALL slots
    // because the dead-pool stack scatters alive particles across arbitrary
    // indices — there is no contiguous [0, aliveCount) range.
    maxSlots:   u32,
}

// GPU force field descriptor (20 bytes, 5 × f32).
struct GPUForceField {
    kind:     f32,  // 0=inactive, 1=wind, 2=point, 3=vortex
    x:        f32,  // direction X (wind) or center X (point/vortex)
    y:        f32,  // direction Y (wind) or center Y (point/vortex)
    strength: f32,  // force strength (negative = repulsor for point)
    falloff:  f32,  // falloff radius (0 = infinite range)
}

// Force field uniform block: count + up to 4 fields (84 bytes total).
// Layout matches ParticleCurveLUT.ts FORCE_FIELD_UNIFORM_SIZE = 84.
// GPUForceField has alignment 4 (all f32 members), so the array can
// start immediately after count at offset 4 — no padding needed.
struct ForceFieldUniforms {
    count: u32,
    fields: array<GPUForceField, 4>,
}

// ─── Bindings ───────────────────────────────────────────────────────

@group(0) @binding(0) var<storage, read_write>  particles   : array<Particle>;
@group(0) @binding(1) var<storage, read_write>  deadPool    : DeadPool;
@group(0) @binding(2) var<uniform>              uniforms    : Uniforms;
@group(0) @binding(3) var<storage, read>        forceFields : ForceFieldUniforms;

// ─── Force Field Evaluation ─────────────────────────────────────────

const MAX_GPU_FORCE_FIELDS: u32 = 4u;

/**
 * Compute the total force on a particle from all active GPU force fields.
 *
 * Wind:     constant directional force (position-independent).
 * Point:    radial force toward/away from center, inverse-distance falloff.
 * Vortex:   tangential force perpendicular to radial direction.
 *
 * Turbulence is CPU-only for now (requires WGSL noise implementation).
 */
fn computeTotalForce(px: f32, py: f32) -> vec2<f32> {
    var totalForce = vec2<f32>(0.0, 0.0);
    let count = min(forceFields.count, MAX_GPU_FORCE_FIELDS);

    for (var i = 0u; i < count; i = i + 1u) {
        let field = forceFields.fields[i];

        // Skip inactive fields.
        if (field.kind < 0.5) {
            continue;
        }

        let kind = i32(field.kind);

        if (kind == 1) {
            // ── Wind: constant directional force ──────────────────
            totalForce = totalForce + vec2<f32>(field.x, field.y) * field.strength;
        } else if (kind == 2) {
            // ── Point attractor/repulsor ───────────────────────────
            let dx = field.x - px;
            let dy = field.y - py;
            let dist = max(length(vec2<f32>(dx, dy)), 1.0);

            // Check falloff radius (0 = infinite).
            if (field.falloff > 0.0 && dist > field.falloff) {
                continue;
            }

            let magnitude = field.strength / dist;
            let dir = vec2<f32>(dx, dy) / dist;
            totalForce = totalForce + dir * magnitude;
        } else if (kind == 3) {
            // ── Vortex: tangential force ───────────────────────────
            let dx = px - field.x;
            let dy = py - field.y;
            let dist = length(vec2<f32>(dx, dy));

            if (dist < 0.001) {
                continue;
            }

            if (field.falloff > 0.0 && dist > field.falloff) {
                continue;
            }

            // Tangent direction: (-dy, dx) / dist (CCW rotation).
            let tangent = vec2<f32>(-dy, dx) / dist;
            let falloff = select(1.0, max(0.0, 1.0 - dist / field.falloff), field.falloff > 0.0);
            totalForce = totalForce + tangent * field.strength * falloff;
        }
    }

    return totalForce;
}

// ─── Entry point ────────────────────────────────────────────────────

@compute @workgroup_size(64)
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
    let idx = gid.x;

    // Skip threads beyond the particle buffer capacity.
    if (idx >= uniforms.maxSlots) {
        return;
    }

    // Skip already-dead particles (life == -1.0).
    if (particles[idx].life < 0.0) {
        return;
    }

    let dt = uniforms.dt;

    // Base gravity.
    let gravity = vec2<f32>(uniforms.gravityX, uniforms.gravityY);

    // GPU force fields evaluated per-particle per-frame.
    let px = particles[idx].position.x;
    let py = particles[idx].position.y;
    let forceFieldAccel = computeTotalForce(px, py);

    // Euler integration: velocity += (gravity + force fields) * dt
    particles[idx].velocity = particles[idx].velocity + (gravity + forceFieldAccel) * dt;

    // Position integration: position += velocity * dt
    particles[idx].position = particles[idx].position + particles[idx].velocity * dt;

    // Age the particle.
    particles[idx].life = particles[idx].life + dt;

    // If the particle has exceeded its lifetime, retire it.
    if (particles[idx].life >= particles[idx].lifetime) {
        // Mark dead so subsequent frames skip this slot.
        particles[idx].life = -1.0;

        // Push the index back onto the dead pool stack.
        // atomicAdd returns the value *before* the addition — that is
        // exactly the position where we should write the returned index.
        let slot = atomicAdd(&deadPool.count, 1u);
        deadPool.indices[slot] = idx;
    }
}
`,pe=`// particle-indirect.wgsl — Indirect dispatch preparation shader for the GPU
// particle system.
//
// Runs as a single invocation each frame to compute the number of workgroups
// required by the update pass.  The result is written into an indirect
// dispatch buffer consumed by dispatchWorkgroupsIndirect().
//
// alive = maxParticles - deadPool.count
// workgroups = ceil(alive / workgroupSize)
//
// Buffer contracts are defined in ParticleTypes.ts; keep the two in sync.

// ─── Structures ─────────────────────────────────────────────────────

// Read-only view of the dead pool — we only need the counter.
struct DeadPool {
    count:   u32,
    indices: array<u32>,
}

// Per-dispatch uniforms for the indirect prep pass.
struct Uniforms {
    maxParticles:  u32,
    workgroupSize: u32,
}

// ─── Bindings ───────────────────────────────────────────────────────

@group(0) @binding(0) var<storage, read>        deadPool : DeadPool;
@group(0) @binding(1) var<storage, read_write>  indirect : array<u32, 3>;
@group(0) @binding(2) var<uniform>              uniforms : Uniforms;

// ─── Entry point ────────────────────────────────────────────────────

@compute @workgroup_size(1)
fn main() {
    // Determine how many particles are currently alive.
    let dead  = deadPool.count;
    let alive = select(uniforms.maxParticles - dead, 0u, dead >= uniforms.maxParticles);

    // Compute number of workgroups via integer ceiling division.
    // When alive == 0 we still dispatch 0 workgroups (the GPU no-ops).
    var workgroups = 0u;
    if (alive > 0u) {
        workgroups = (alive + uniforms.workgroupSize - 1u) / uniforms.workgroupSize;
    }

    // Write the indirect dispatch arguments: (X, Y, Z).
    indirect[0] = workgroups;
    indirect[1] = 1u;
    indirect[2] = 1u;
}
`,R=4096,he=R*T,I=16,ge=16,me=8;class E{particleBuffer;deadPoolBuffer;indirectBuffer;spawnDescBuffer;spawnUniformBuffer;updateUniformBuffer;forceFieldStorageBuffer;indirectUniformBuffer;spawnQueue=[];spawnPipeline;updatePipeline;indirectPipeline;device;_aliveCount=0;frameCounter=0;_forceFields=[];_cachedForceFieldBytes=null;_forceFieldsDirty=!0;constructor(e,t,n,r,s,o,a,l,c,u,f,d){this.device=e,this.particleBuffer=t,this.deadPoolBuffer=n,this.indirectBuffer=r,this.spawnDescBuffer=s,this.spawnUniformBuffer=o,this.updateUniformBuffer=a,this.forceFieldStorageBuffer=l,this.indirectUniformBuffer=c,this.spawnPipeline=u,this.updatePipeline=f,this.indirectPipeline=d}static async create(e,t){L(e.device,t);const n=e.device,r=n.createBuffer({size:ne,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_SRC,mappedAtCreation:!0,label:"particle-buffer"}),s=new Float32Array(r.getMappedRange()),o=W/4,a=5;for(let b=0;b<h;b++)s[b*o+a]=-1;r.unmap();const l=n.createBuffer({size:ie,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC,mappedAtCreation:!0,label:"dead-pool-buffer"}),c=new Uint32Array(l.getMappedRange());c[0]=h;for(let b=0;b<h;b++)c[b+1]=b;l.unmap();const u=n.createBuffer({size:re,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.INDIRECT|GPUBufferUsage.COPY_SRC,label:"indirect-buffer"}),f=n.createBuffer({size:he,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST,label:"spawn-desc-buffer"}),d=n.createBuffer({size:ge,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST,label:"spawn-uniforms"}),p=n.createBuffer({size:I,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST,label:"update-uniforms"}),g=n.createBuffer({size:N,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST,label:"force-field-storage"}),m=n.createBuffer({size:me,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST,label:"indirect-uniforms"}),[P,w,S]=await Promise.all([y.create(n,{shader:{source:fe,entryPoint:"main"},buffers:[{type:"read-only-storage"},{type:"storage"},{type:"storage"},{type:"uniform"}],label:"particle-spawn"}),y.create(n,{shader:{source:de,entryPoint:"main"},buffers:[{type:"storage"},{type:"storage"},{type:"uniform"},{type:"read-only-storage"}],label:"particle-update"}),y.create(n,{shader:{source:pe,entryPoint:"main"},buffers:[{type:"read-only-storage"},{type:"storage"},{type:"uniform"}],label:"particle-indirect"})]);return new E(n,r,l,u,f,d,p,g,m,P,w,S)}enqueueSpawn(e){if(this.spawnQueue.length>=R)throw new Error(`Spawn queue overflow: ${this.spawnQueue.length+1} descriptors exceeds MAX_SPAWN_DESCS_PER_FRAME (${R}). Increase MAX_SPAWN_DESCS_PER_FRAME or reduce emitter count.`);this.spawnQueue.push(e)}tick(e,t,n=[0,0]){if(this.spawnQueue.length>0){const c=T/4,u=this.spawnQueue.length*c,f=new Float32Array(u);let d=0,p=0;for(const w of this.spawnQueue){const S=oe(w);f.set(S,d),d+=c,p+=w.count}this.device.queue.writeBuffer(this.spawnDescBuffer,0,f);const g=this.spawnQueue.length,m=new Uint32Array([p,this.frameCounter++,g,0]);this.device.queue.writeBuffer(this.spawnUniformBuffer,0,m);const P=Math.ceil(p/v);this.spawnPipeline.dispatch(e,[this.spawnDescBuffer,this.deadPoolBuffer,this.particleBuffer,this.spawnUniformBuffer],P),this._aliveCount=Math.min(this._aliveCount+p,h),this.spawnQueue=[]}const r=new ArrayBuffer(I),s=new Float32Array(r),o=new Uint32Array(r);if(s[0]=t,s[1]=n[0],s[2]=n[1],o[3]=h,this.device.queue.writeBuffer(this.updateUniformBuffer,0,new Uint8Array(r)),this._forceFieldsDirty||this._cachedForceFieldBytes===null){const c=ue(this._forceFields);this._cachedForceFieldBytes=ce(c),this._forceFieldsDirty=!1}this.device.queue.writeBuffer(this.forceFieldStorageBuffer,0,this._cachedForceFieldBytes);const a=Math.ceil(h/v);this.updatePipeline.dispatch(e,[this.particleBuffer,this.deadPoolBuffer,this.updateUniformBuffer,this.forceFieldStorageBuffer],a);const l=new Uint32Array([h,v]);return this.device.queue.writeBuffer(this.indirectUniformBuffer,0,l),this.indirectPipeline.dispatch(e,[this.deadPoolBuffer,this.indirectBuffer,this.indirectUniformBuffer],1),this.particleBuffer}get aliveCount(){return this._aliveCount}setForceFields(e){this._forceFields=e,this._forceFieldsDirty=!0}destroy(){this.particleBuffer.destroy(),this.deadPoolBuffer.destroy(),this.indirectBuffer.destroy(),this.spawnDescBuffer.destroy(),this.spawnUniformBuffer.destroy(),this.updateUniformBuffer.destroy(),this.forceFieldStorageBuffer.destroy(),this.indirectUniformBuffer.destroy()}}const ye=`// particle-render.wgsl

struct Particle {
    position: vec2<f32>,
    velocity: vec2<f32>,
    color:    u32,
    life:     f32,
    lifetime: f32,
    _pad:     f32,
}

struct RenderUniforms {
    viewProj:     mat4x4<f32>,
    canvasWidth:  f32,
    canvasHeight: f32,
    streakScale:  f32,
    orbMode:      f32,
}

const CURVE_LUT_SIZE: u32 = 64u;

struct CurveLUTUniforms {
    samples: array<f32, 64>,
}

@group(0) @binding(0) var<storage, read> particles : array<Particle>;
@group(0) @binding(1) var<uniform>       uniforms  : RenderUniforms;
@group(0) @binding(2) var<uniform>       sizeLUT   : CurveLUTUniforms;

fn sampleSizeCurve(t: f32) -> f32 {
    if (sizeLUT.samples[0] == 0.0 && sizeLUT.samples[63] == 0.0) {
        return 1.0;
    }
    let clamped = clamp(t, 0.0, 1.0);
    let scaledIdx = clamped * f32(CURVE_LUT_SIZE - 1u);
    let idx0 = u32(scaledIdx);
    let idx1 = min(idx0 + 1u, CURVE_LUT_SIZE - 1u);
    let frac = scaledIdx - floor(scaledIdx);
    return mix(sizeLUT.samples[idx0], sizeLUT.samples[idx1], frac);
}

struct VertexOut {
    @builtin(position)  pos:   vec4<f32>,
    @location(0)        color: vec4<f32>,
    @location(1)        uv:    vec2<f32>,
}

const QUAD_UVS = array<vec2<f32>, 6>(
    vec2<f32>(0.0, 0.0), vec2<f32>(1.0, 0.0), vec2<f32>(0.0, 1.0),
    vec2<f32>(1.0, 0.0), vec2<f32>(1.0, 1.0), vec2<f32>(0.0, 1.0),
);

fn unpack_color(packed: u32) -> vec4<f32> {
    let r = f32(packed & 0xFFu)         / 255.0;
    let g = f32((packed >> 8u)  & 0xFFu) / 255.0;
    let b = f32((packed >> 16u) & 0xFFu) / 255.0;
    let a = f32((packed >> 24u) & 0xFFu) / 255.0;
    return vec4<f32>(r, g, b, a);
}

@vertex
fn particle_vs(
    @builtin(vertex_index)   vertexIdx:   u32,
    @builtin(instance_index) instanceIdx: u32,
) -> VertexOut {
    var out: VertexOut;

    let p = particles[instanceIdx];

    if (p.life < 0.0) {
        out.pos   = vec4<f32>(0.0, 0.0, 0.0, 0.0);
        out.color = vec4<f32>(0.0);
        out.uv    = vec2<f32>(0.0);
        return out;
    }

    // Project world position through viewProj matrix (same as sprites/edges/text).
    let worldPos = vec4<f32>(p.position.x, p.position.y, 0.0, 1.0);
    let clipCenter = uniforms.viewProj * worldPos;

    let ageFraction = p.life / max(p.lifetime, 0.001);
    let baseSize = p._pad;
    let size = baseSize * sampleSizeCurve(ageFraction);
    let uv = QUAD_UVS[vertexIdx];

    var offsetPx: vec2<f32>;

    if (uniforms.streakScale > 0.0) {
        let speed = length(p.velocity);
        let streakDir = select(
            vec2<f32>(0.0, -1.0),
            p.velocity / speed,
            speed > 1.0
        );
        let perpDir = vec2<f32>(-streakDir.y, streakDir.x);
        let streakLen   = max(speed * uniforms.streakScale, size);
        let streakWidth = max(size * 0.3, 1.5);
        let localX = (uv.x - 0.5) * streakWidth;
        let localY = (uv.y - 0.5) * streakLen;
        offsetPx = perpDir * localX + streakDir * localY;
    } else {
        var quadSize = size;
        if (uniforms.orbMode > 0.0) {
            let phase = f32(p.color & 0xFFu) / 255.0 * 6.283;
            let pulse = 1.0 + 0.12 * sin(p.life * 6.283 + phase);
            quadSize = size * pulse * 1.5;
        }
        offsetPx = (uv - vec2<f32>(0.5)) * quadSize;
    }

    // Convert pixel offset -> clip-space offset.
    // clip = NDC * w, and NDC = (pixel / canvas) * 2, so:
    // clipOffset = (pixel / canvas) * 2 * w
    let clipOffsetX = offsetPx.x * 2.0 / uniforms.canvasWidth  * clipCenter.w;
    let clipOffsetY = offsetPx.y * 2.0 / uniforms.canvasHeight * clipCenter.w;

    out.pos = vec4<f32>(
        clipCenter.x + clipOffsetX,
        clipCenter.y + clipOffsetY,
        clipCenter.z,
        clipCenter.w,
    );

    let baseColor = unpack_color(p.color);
    let fadeFactor = 1.0 - smoothstep(0.7, 1.0, ageFraction);
    out.color = vec4<f32>(baseColor.rgb, baseColor.a * fadeFactor);
    out.uv = uv;

    return out;
}

@fragment
fn particle_fs(in: VertexOut) -> @location(0) vec4<f32> {
    var alpha: f32;

    if (uniforms.orbMode > 0.0) {
        let dist = length(in.uv - vec2<f32>(0.5));
        let coreR = 0.10;
        let bodyR = 0.23;
        var orbColor: vec3<f32>;
        var orbAlpha: f32;
        if (dist < coreR) {
            let t = dist / coreR;
            orbColor = mix(vec3<f32>(1.0, 1.0, 1.0), in.color.rgb, t * t);
            orbAlpha = 1.0;
        } else if (dist < bodyR) {
            let t = (dist - coreR) / (bodyR - coreR);
            orbColor = in.color.rgb * (1.0 - 0.15 * t);
            orbAlpha = 1.0 - 0.1 * t;
        } else {
            let glowDist = (dist - bodyR) / (0.5 - bodyR);
            orbAlpha = exp(-glowDist * 3.5) * 0.6;
            orbColor = in.color.rgb;
        }
        if (dist > 0.5) {
            orbAlpha = 0.0;
        }
        let a = orbAlpha * in.color.a;
        return vec4<f32>(orbColor * a, a);
    } else if (uniforms.streakScale > 0.0) {
        let centerDist = abs(in.uv.x - 0.5) * 2.0;
        let centerGlow = exp(-centerDist * 6.0);
        let endFade = smoothstep(0.0, 0.15, in.uv.y) * smoothstep(1.0, 0.85, in.uv.y);
        alpha = centerGlow * endFade * 0.6;
    } else {
        let dist = length(in.uv - vec2<f32>(0.5));
        alpha = smoothstep(0.5, 0.0, dist);
    }

    let a = in.color.a * alpha;
    return vec4<f32>(in.color.rgb * a, a);
}
`,be=6,ve=96;class k{device;pipeline;bindGroupLayout;uniformBuffer;sizeLUTBuffer;constructor(e,t,n,r,s){this.device=e,this.pipeline=t,this.bindGroupLayout=n,this.uniformBuffer=r,this.sizeLUTBuffer=s}static async create(e,t,n){L(e.device,n);const r=e.device,s=new D(r),{module:o}=await s.compile(ye,"particle-render-shader"),a=r.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX,buffer:{type:"read-only-storage"}},{binding:1,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}},{binding:2,visibility:GPUShaderStage.VERTEX,buffer:{type:"uniform"}}],label:"particle-render-bgl"}),l=r.createPipelineLayout({bindGroupLayouts:[a],label:"particle-render-layout"}),c=r.createRenderPipeline({layout:l,vertex:{module:o,entryPoint:"particle_vs"},fragment:{module:o,entryPoint:"particle_fs",targets:[{format:t,blend:{color:{srcFactor:"one",dstFactor:"one",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one",operation:"add"}},writeMask:15}]},primitive:{topology:"triangle-list"},depthStencil:{depthWriteEnabled:!1,depthCompare:"less-equal",format:"depth24plus"},label:"particle-render-pipeline"}),u=r.createBuffer({size:ve,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST,label:"particle-render-uniforms"}),f=r.createBuffer({size:le,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST,label:"size-curve-lut"});return new k(r,c,a,u,f)}render(e,t,n,r,s=0,o=0,a){const l=new Float32Array(24);l.set(r.viewProj,0),l[16]=r.canvasW,l[17]=r.canvasH,l[18]=s,l[19]=o,this.device.queue.writeBuffer(this.uniformBuffer,0,l);const c=this.device.createBindGroup({layout:this.bindGroupLayout,entries:[{binding:0,resource:{buffer:n}},{binding:1,resource:{buffer:this.uniformBuffer}},{binding:2,resource:{buffer:this.sizeLUTBuffer}}],label:"particle-render-bg"}),u={colorAttachments:[{view:t,loadOp:"load",storeOp:"store"}],label:"particle-render-pass"};a!==void 0&&(u.depthStencilAttachment={view:a,depthLoadOp:"load",depthStoreOp:"store"});const f=e.beginRenderPass(u);f.setPipeline(this.pipeline),f.setBindGroup(0,c),f.draw(be,h),f.end()}setSizeCurveLUT(e){e?this.device.queue.writeBuffer(this.sizeLUTBuffer,0,e):this.device.queue.writeBuffer(this.sizeLUTBuffer,0,new Float32Array(64))}destroy(){this.uniformBuffer.destroy(),this.sizeLUTBuffer.destroy()}}function Pe(i,e){const t=[0,2*Math.PI];return{particles:[{emitter:"explosion",worldX:i,worldY:e,count:200,color:[255,140,60,255],velocityRange:[60,180],angleRange:t,gravity:-60,lifetime:[.3,1.2],size:[4,16],blendMode:"additive"},{emitter:"explosion-debris",worldX:i,worldY:e,count:50,color:[120,120,120,200],velocityRange:[40,100],angleRange:t,gravity:-120,lifetime:[.5,2],size:[2,6],blendMode:"alpha"},{emitter:"explosion-spark",worldX:i,worldY:e,count:30,color:[255,240,180,255],velocityRange:[100,200],angleRange:t,gravity:0,lifetime:[.1,.4],size:[1,3],blendMode:"additive"}],postProcessing:[{effect:"bloom",threshold:.45,intensity:.35}],screenShake:{intensity:8,durationMs:400},screenFlash:{color:[255,200,100,180],durationMs:150},lights:[{x:i,y:e,z:0,r:1,g:.6,b:.2,radius:300,intensity:2,lifetime:.8}]}}function we(i,e){return{particles:[{emitter:"fire",worldX:i,worldY:e,count:8,color:[255,100,30,220],velocityRange:[15,45],angleRange:[Math.PI/2-.4,Math.PI/2+.4],gravity:25,lifetime:[.4,1],size:[6,18],blendMode:"additive"},{emitter:"fire-smoke",worldX:i,worldY:e,count:3,color:[80,80,80,100],velocityRange:[8,20],angleRange:[Math.PI/2-.2,Math.PI/2+.2],gravity:8,lifetime:[1,2.5],size:[10,25],blendMode:"alpha"}],postProcessing:null,screenShake:null,screenFlash:null,lights:[{x:i,y:e,z:0,r:1,g:.5,b:.15,radius:150,intensity:.8,lifetime:.1}]}}function xe(i,e){return{particles:[{emitter:"rain",worldX:i,worldY:e,count:20,color:[220,230,255,150],velocityRange:[350,550],angleRange:[-Math.PI/2-.05,-Math.PI/2+.05],gravity:0,lifetime:[1.5,3],size:[2,4],blendMode:"alpha"}],postProcessing:[{effect:"colorize",r:.5,g:.55,b:.7,intensity:.15}],screenShake:null,screenFlash:null,lights:null}}function _e(i,e){return{particles:[{emitter:"snow",worldX:i,worldY:e,count:8,color:[255,255,255,200],velocityRange:[20,60],angleRange:[-Math.PI/2-.5,-Math.PI/2+.5],gravity:-10,lifetime:[2,5],size:[2,8],blendMode:"alpha"}],postProcessing:[{effect:"brighten",amount:10}],screenShake:null,screenFlash:null,lights:null}}function Se(i,e){return{particles:[{emitter:"shockwave",worldX:i,worldY:e,count:100,color:[220,255,255,255],velocityRange:[80,150],angleRange:[0,2*Math.PI],gravity:0,lifetime:[.2,.6],size:[2,5],blendMode:"additive"}],postProcessing:null,screenShake:{intensity:4,durationMs:300},screenFlash:null,lights:[{x:i,y:e,z:0,r:.4,g:.8,b:1,radius:400,intensity:1,lifetime:.5}]}}function Be(i,e){return{particles:[{emitter:"damage",worldX:i,worldY:e,count:20,color:[220,50,30,200],velocityRange:[30,80],angleRange:[0,2*Math.PI],gravity:-60,lifetime:[.2,.6],size:[3,8],blendMode:"alpha"}],postProcessing:[{effect:"chromatic-aberration",offset:3,texelW:1/1280,texelH:1/720},{effect:"vignette",radius:.5,softness:.4}],screenShake:{intensity:5,durationMs:250},screenFlash:{color:[200,0,0,100],durationMs:100},lights:[{x:i,y:e,z:0,r:1,g:.2,b:.1,radius:200,intensity:1.5,lifetime:.3}]}}const Ue={explosion:Pe,fire:we,rain:xe,snow:_e,shockwave:Se,damage:Be};function Ce(i,e,t,n){const r=Ue[i],s=r(e,t);return n?{particles:n.particles??s.particles,postProcessing:n.postProcessing!==void 0?n.postProcessing:s.postProcessing,screenShake:n.screenShake!==void 0?n.screenShake:s.screenShake,screenFlash:n.screenFlash!==void 0?n.screenFlash:s.screenFlash,lights:n.lights!==void 0?n.lights:s.lights}:s}const Re={explosion:.5,damage:.3},Fe={shakeOffsetX:0,shakeOffsetY:0,flashAlpha:0,flashColor:[0,0,0,0]};class Te{particleSystem;postProcessPipeline;lightBuffer;activeShake=null;activeFlash=null;tempPostProcessing=null;savedPostProcessingChain=null;constructor(e,t,n){this.particleSystem=e,this.postProcessPipeline=t,this.lightBuffer=n}trigger(e,t,n,r){const s=Ce(e,t,n,r);this.applyEffect(e,s)}applyEffect(e,t){for(const n of t.particles)this.particleSystem.enqueueSpawn(n);if(t.postProcessing!==null){const n=Re[e];n!==void 0&&(this.savedPostProcessingChain=this.postProcessPipeline.currentDescriptors,this.tempPostProcessing={remaining:n}),this.postProcessPipeline.setChain(t.postProcessing)}if(t.lights!==null)for(const n of t.lights)this.lightBuffer.addSpawn(n);t.screenShake!==null&&(this.activeShake={intensity:t.screenShake.intensity,totalDuration:t.screenShake.durationMs/1e3,remaining:t.screenShake.durationMs/1e3}),t.screenFlash!==null&&(this.activeFlash={color:[...t.screenFlash.color],totalDuration:t.screenFlash.durationMs/1e3,remaining:t.screenFlash.durationMs/1e3})}tick(e){let t=0,n=0,r=0,s=[0,0,0,0];if(this.activeShake!==null)if(this.activeShake.remaining-=e,this.activeShake.remaining<=0)this.activeShake=null;else{const o=this.activeShake.remaining/this.activeShake.totalDuration,a=this.activeShake.intensity*o,l=Math.random()*2*Math.PI;t=Math.cos(l)*a,n=Math.sin(l)*a}return this.activeFlash!==null&&(this.activeFlash.remaining-=e,this.activeFlash.remaining<=0?this.activeFlash=null:(r=this.activeFlash.remaining/this.activeFlash.totalDuration,s=this.activeFlash.color)),this.tempPostProcessing!==null&&(this.tempPostProcessing.remaining-=e,this.tempPostProcessing.remaining<=0&&(this.postProcessPipeline.setChain(this.savedPostProcessingChain??[]),this.tempPostProcessing=null,this.savedPostProcessingChain=null)),t===0&&n===0&&r===0?Fe:{shakeOffsetX:t,shakeOffsetY:n,flashAlpha:r,flashColor:s}}get isActive(){return this.activeShake!==null||this.activeFlash!==null||this.tempPostProcessing!==null}}function Ee(i){switch(i.kind){case"point":return{x:0,y:0,angle:NaN};case"circle":return ke(i);case"ring":return Me(i);case"box":return Ae(i);case"line":return Ie(i);case"arc":return Ge(i);default:return{x:0,y:0,angle:NaN}}}function ke(i){const e=Math.random()*Math.PI*2;let t;return i.edgeOnly?t=i.radius:t=i.radius*Math.sqrt(Math.random()),{x:Math.cos(e)*t,y:Math.sin(e)*t,angle:e}}function Me(i){const e=i.arc??Math.PI*2,n=(i.arcOffset??0)+Math.random()*e,r=i.innerRadius*i.innerRadius,s=i.outerRadius*i.outerRadius,o=Math.sqrt(r+Math.random()*(s-r));return{x:Math.cos(n)*o,y:Math.sin(n)*o,angle:n}}function Ae(i){if(i.edgeOnly){const e=2*(i.halfWidth*2+i.halfHeight*2);let t=Math.random()*e,n,r;return t<i.halfWidth*2?(n=-i.halfWidth+t,r=-i.halfHeight):(t-=i.halfWidth*2,t<i.halfHeight*2?(n=i.halfWidth,r=-i.halfHeight+t):(t-=i.halfHeight*2,t<i.halfWidth*2?(n=i.halfWidth-t,r=i.halfHeight):(t-=i.halfWidth*2,n=-i.halfWidth,r=i.halfHeight-t))),{x:n,y:r,angle:NaN}}return{x:(Math.random()*2-1)*i.halfWidth,y:(Math.random()*2-1)*i.halfHeight,angle:NaN}}function Ie(i){const e=Math.random(),t=i.x1+(i.x2-i.x1)*e,n=i.y1+(i.y2-i.y1)*e,r=Math.atan2(i.y2-i.y1,i.x2-i.x1);return{x:t,y:n,angle:r+Math.PI/2}}function Ge(i){const e=i.startAngle+Math.random()*i.span;return{x:Math.cos(e)*i.radius,y:Math.sin(e)*i.radius,angle:e}}const Oe={kind:"point"};function De(i,e,t){if(i.active===!1)return[0,0];switch(i.kind){case"wind":return Le(i);case"point":return We(i,e,t);case"vortex":return Ne(i,e,t);case"turbulence":return Ye(i,e,t);default:return[0,0]}}function ze(i,e,t){let n=0,r=0;for(const s of i){const[o,a]=De(s,e,t);n+=o,r+=a}return{fx:n,fy:r}}function Le(i,e,t){const n=Math.hypot(i.directionX,i.directionY);if(n===0)return[0,0];const r=i.directionX/n,s=i.directionY/n;return[r*i.strength,s*i.strength]}function We(i,e,t){const n=i.x-e,r=i.y-t,s=Math.hypot(n,r);if(i.falloffRadius!==void 0&&s>i.falloffRadius)return[0,0];const o=Math.max(s,1),a=i.strength/o;if(s===0)return[0,0];const l=n/s,c=r/s;return[l*a,c*a]}function Ne(i,e,t){const n=e-i.x,r=t-i.y,s=Math.hypot(n,r);if(i.falloffRadius!==void 0&&s>i.falloffRadius)return[0,0];if(s===0)return[0,0];const o=-r/s,a=n/s,l=i.falloffRadius?Math.max(0,1-s/i.falloffRadius):1,c=i.strength*i.angularSpeed*l;return[o*c,a*c]}function Ye(i,e,t){const n=i.frequency??1,r=i.octaves??2;let s=0,o=0,a=1,l=0;for(let c=0;c<r;c++){const u=n*(1<<c),f=i.time*.5,d=Math.sin(e*u*.01+f+c*1.7)*a,p=Math.cos(t*u*.01+f+c*2.3)*a;s+=d,o+=p,l+=a,a*=.5}return l>0&&(s=s/l*i.strength,o=o/l*i.strength),[s,o]}function G(i,e,t){const n={birth:[],death:[],tick:[]};if(!i)return n;for(const r of i){const s={...r.template,worldX:e,worldY:t};switch(r.event){case"birth":n.birth.push(s);break;case"death":n.death.push(r);break;case"tick":n.tick.push(r);break}}return n}class Xe{emitters=new Map;nextId=0;get activeCount(){let e=0;for(const t of this.emitters.values())t.completed||e++;return e}get totalCount(){return this.emitters.size}addEmitter(e){const t=e.id||`emitter_${this.nextId++}`;this.emitters.has(t)&&console.warn(`[EmitterScheduler] addEmitter("${t}") — id ALREADY exists. The previous state will be overwritten.  This usually means a duplicate AttachEmitter arrived for the same (agentId, slot) pair, and Screen.attachEmitter's dedup failed to catch it. See docs/PARTICLE_INTEGRATION.md § Enforcement.`);const n={config:{...e,id:t},accumulator:0,elapsed:0,spawnedCount:0,completed:!1};return this.emitters.set(t,n),t}removeEmitter(e){return this.emitters.delete(e)}updatePosition(e,t,n){const r=this.emitters.get(e);r&&(r.config.worldX=t,r.config.worldY=n)}updateAngleRange(e,t){const n=this.emitters.get(e);n&&(n.config.template.angleRange=t)}advanceSpawn(e,t){const n=this.emitters.get(e);if(!n||n.completed||n.config.active===!1||(n.config.mode??"continuous")==="burst")return;const r=n.config.rate??10;n.accumulator+=t*r}setActive(e,t){const n=this.emitters.get(e);n&&(n.config.active!==!1!==t&&this.onStateChange&&this.onStateChange(e,t,n.config.worldX,n.config.worldY),n.config.active=t)}onStateChange=null;onSpawn=null;updateForceFields(e,t){const n=this.emitters.get(e);n&&(n.config.forceFields=t)}clear(){this.emitters.clear()}tick(e,t){let n=0;const r=[];for(const[s,o]of this.emitters){if(o.config.active===!1||o.completed)continue;o.elapsed+=e;const a=o.config.delay??0;if(o.elapsed<a)continue;const l=o.config.duration??1/0;if(o.elapsed-a>=l){o.completed=!0,r.push(s);continue}(o.config.mode??"continuous")==="burst"?(n+=this.fireBurst(o,t),o.completed=!0,r.push(s)):n+=this.fireContinuous(o,e,t)}for(const s of r)this.emitters.delete(s);return n}isActive(e){const t=this.emitters.get(e);return t!==void 0&&!t.completed&&t.config.active!==!1}getEmitterInfo(e){const t=this.emitters.get(e);return t?{elapsed:t.elapsed,spawnedCount:t.spawnedCount,completed:t.completed}:null}fireBurst(e,t){const n=this.buildSpawnDescriptor(e);t.enqueueSpawn(n),e.spawnedCount+=n.count;const r=G(e.config.subEmitters,e.config.worldX,e.config.worldY);for(const s of r.birth)t.enqueueSpawn(s);return 1+r.birth.length}fireContinuous(e,t,n){const r=Math.floor(e.accumulator);if(r<=0)return 0;e.accumulator-=r,this.onSpawn&&this.onSpawn(e.config.id,r,e.config.worldX,e.config.worldY);const s=this.buildSpawnDescriptor(e,r);n.enqueueSpawn(s),e.spawnedCount+=r;const o=G(e.config.subEmitters,e.config.worldX,e.config.worldY);for(const a of o.birth)n.enqueueSpawn(a);return 1+o.birth.length}buildSpawnDescriptor(e,t){const n=e.config,r=n.template,s=n.shape??Oe,o=Ee(s),a={...r,worldX:n.worldX+o.x,worldY:n.worldY+o.y,count:t??r.count};if(!isNaN(o.angle)&&n.shape){const l=(r.angleRange[1]-r.angleRange[0])/2;a.angleRange=[o.angle-l,o.angle+l]}if(n.forceFields&&n.forceFields.length>0){const l=ze(n.forceFields,n.worldX,n.worldY);a.gravity=r.gravity+(l.fx+l.fy)*.5}if(n.curves&&n.applyCurves!==!1){const l=A(n.curves.size,0,1);a.size=[r.size[0]*l,r.size[1]*l];const c=A(n.curves.velocity,0,1);a.velocityRange=[r.velocityRange[0]*c,r.velocityRange[1]*c]}return a}}const He=`// physics-hash-count.wgsl — Count particles per spatial hash bin.
//
// First pass of the spatial hash build pipeline.  Each alive particle is
// hashed to a 2-D grid bin based on its position and the uniform cell size.
// The bin count is accumulated atomically so concurrent threads do not race.
//
// Dead particles (life < 0) are skipped — they must not participate in
// collision detection.
//
// The resulting binCounts array is consumed by the prefix-sum pass to
// compute bin offsets for the scatter pass.
//
// Reference: Harada, T. et al. "Real-time Rigid Body Simulation on GPUs."
//            GPU Gems 3, Ch. 29, NVIDIA 2007.

// ─── Structures ─────────────────────────────────────────────────────

// Particle buffer entry (32 bytes, alignment 8).
// Must match ParticleTypes.ts layout exactly.
struct Particle {
    position: vec2<f32>,  // offset  0
    velocity: vec2<f32>,  // offset  8
    color:    u32,        // offset 16
    life:     f32,        // offset 20  (current age; < 0 = dead)
    lifetime: f32,        // offset 24
    _pad:     f32,        // offset 28
}

// Per-dispatch uniforms for the hash-count pass.
struct Uniforms {
    cellSize:      f32,   // spatial hash cell edge length
    gridW:         u32,   // number of bins along X
    gridH:         u32,   // number of bins along Y
    particleCount: u32,   // total particles to iterate
}

// ─── Bindings ───────────────────────────────────────────────────────

@group(0) @binding(0) var<storage, read>        particles : array<Particle>;
@group(0) @binding(1) var<storage, read_write>  binCounts : array<atomic<u32>>;
@group(0) @binding(2) var<uniform>              uniforms  : Uniforms;

// ─── Entry point ────────────────────────────────────────────────────

@compute @workgroup_size(64)
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
    let idx = gid.x;

    // Skip threads beyond particle count.
    if (idx >= uniforms.particleCount) {
        return;
    }

    // Skip dead particles (life < 0 marks a dead slot).
    if (particles[idx].life < 0.0) {
        return;
    }

    // Compute the 2-D bin index from the particle's world-space position.
    let cellX = u32(floor(particles[idx].position.x / uniforms.cellSize));
    let cellY = u32(floor(particles[idx].position.y / uniforms.cellSize));

    // Clamp to grid bounds to prevent out-of-range writes from particles
    // that have drifted outside the world (before boundary collision).
    let cx = min(cellX, uniforms.gridW - 1u);
    let cy = min(cellY, uniforms.gridH - 1u);

    let bin = cy * uniforms.gridW + cx;

    // Atomically increment the count for this bin.
    atomicAdd(&binCounts[bin], 1u);
}
`,qe=`// physics-hash-prefix-sum.wgsl — Parallel exclusive prefix sum (Blelloch scan).
//
// Second pass of the spatial hash build pipeline.  Computes exclusive prefix
// sums over the bin counts so that binOffsets[i] = sum(binCounts[0..i-1]).
// This tells the scatter pass where each bin's sorted particle indices begin.
//
// For small grids (< 512 bins), a single workgroup is sufficient.  The
// Blelloch up-sweep / down-sweep operates entirely in workgroup-local shared
// memory, avoiding the complexity of multi-workgroup hierarchical scans.
//
// Reference: Blelloch, G.E. "Prefix Sums and Their Applications." CMU 1990.
//            Harris, M. "Parallel Prefix Sum (Scan) with CUDA." GPU Gems 3, Ch. 39.

// ─── Constants ──────────────────────────────────────────────────────
// N = shared memory size = 2 × workgroup_size.
// Workgroup size 256 → each thread processes 2 elements → 512 bins max.
const N: u32 = 512u;
const WG_SIZE: u32 = 256u;

// ─── Uniforms ───────────────────────────────────────────────────────

struct Uniforms {
    binCount: u32,  // total number of spatial hash bins
}

// ─── Bindings ───────────────────────────────────────────────────────

@group(0) @binding(0) var<storage, read>        binCounts  : array<u32>;
@group(0) @binding(1) var<storage, read_write>  binOffsets : array<u32>;
@group(0) @binding(2) var<uniform>              uniforms   : Uniforms;

// Workgroup-local shared memory for the scan.
var<workgroup> temp: array<u32, 512>;

// ─── Entry point ────────────────────────────────────────────────────

@compute @workgroup_size(256)
fn main(
    @builtin(local_invocation_id)  lid: vec3<u32>,
    @builtin(workgroup_id)         wid: vec3<u32>,
) {
    let n = uniforms.binCount;
    let tid = lid.x;

    // Load two elements per thread into shared memory (bank-conflict-free).
    let ai = tid;
    let bi = tid + WG_SIZE;

    if (ai < n) {
        temp[ai] = binCounts[ai];
    } else {
        temp[ai] = 0u;
    }
    if (bi < n) {
        temp[bi] = binCounts[bi];
    } else {
        temp[bi] = 0u;
    }

    // ── Up-sweep (reduce) phase ──
    var offset = 1u;
    var d = WG_SIZE;  // N/2
    loop {
        if (d == 0u) {
            break;
        }
        workgroupBarrier();
        if (tid < d) {
            let ai_idx = offset * (2u * tid + 1u) - 1u;
            let bi_idx = offset * (2u * tid + 2u) - 1u;
            if (ai_idx < N && bi_idx < N) {
                temp[bi_idx] = temp[bi_idx] + temp[ai_idx];
            }
        }
        offset = offset * 2u;
        d = d >> 1u;
    }

    // Clear the last element (set identity for exclusive scan).
    if (tid == 0u) {
        temp[N - 1u] = 0u;
    }

    // ── Down-sweep phase ──
    d = 1u;
    loop {
        if (offset == 0u) {
            break;
        }
        workgroupBarrier();
        if (tid < d) {
            let ai_idx = offset * (2u * tid + 1u) - 1u;
            let bi_idx = offset * (2u * tid + 2u) - 1u;
            if (ai_idx < N && bi_idx < N) {
                let t = temp[ai_idx];
                temp[ai_idx] = temp[bi_idx];
                temp[bi_idx] = temp[bi_idx] + t;
            }
        }
        offset = offset >> 1u;
        d = d * 2u;
        if (d > WG_SIZE) {
            break;
        }
    }

    workgroupBarrier();

    // Write results back to global memory.
    if (ai < n) {
        binOffsets[ai] = temp[ai];
    }
    if (bi < n) {
        binOffsets[bi] = temp[bi];
    }
}
`,Ve=`// physics-hash-scatter.wgsl — Scatter particles into spatially sorted order.
//
// Third pass of the spatial hash build pipeline.  Each alive particle
// computes its bin, then atomically claims a slot within that bin's
// range (binOffsets[bin] + atomicAdd(binCounts[bin], 1)) and writes
// its particle index into sortedIndices at that slot.
//
// After this pass, particles within the same spatial cell are contiguous
// in sortedIndices, enabling O(1)-per-neighbor iteration in the collision
// shaders.
//
// NOTE: binCounts must be cleared to 0 before this pass (it was consumed
// by the prefix sum and is now reused as a per-bin write cursor).
//
// Reference: Green, S. "Particle Simulation using CUDA." NVIDIA 2010.

// ─── Structures ─────────────────────────────────────────────────────

// Particle buffer entry (32 bytes, alignment 8).
struct Particle {
    position: vec2<f32>,  // offset  0
    velocity: vec2<f32>,  // offset  8
    color:    u32,        // offset 16
    life:     f32,        // offset 20
    lifetime: f32,        // offset 24
    _pad:     f32,        // offset 28
}

struct Uniforms {
    cellSize:      f32,
    gridW:         u32,
    gridH:         u32,
    particleCount: u32,
}

// ─── Bindings ───────────────────────────────────────────────────────

@group(0) @binding(0) var<storage, read>        particles     : array<Particle>;
@group(0) @binding(1) var<storage, read_write>  binCounts     : array<atomic<u32>>;
@group(0) @binding(2) var<storage, read>        binOffsets    : array<u32>;
@group(0) @binding(3) var<storage, read_write>  sortedIndices : array<u32>;
@group(0) @binding(4) var<uniform>              uniforms      : Uniforms;

// ─── Entry point ────────────────────────────────────────────────────

@compute @workgroup_size(64)
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
    let idx = gid.x;

    if (idx >= uniforms.particleCount) {
        return;
    }

    // Skip dead particles — they must not appear in the sorted structure.
    if (particles[idx].life < 0.0) {
        return;
    }

    // Compute bin index (same hash as count pass).
    let cellX = u32(floor(particles[idx].position.x / uniforms.cellSize));
    let cellY = u32(floor(particles[idx].position.y / uniforms.cellSize));
    let cx = min(cellX, uniforms.gridW - 1u);
    let cy = min(cellY, uniforms.gridH - 1u);
    let bin = cy * uniforms.gridW + cx;

    // Claim a slot within this bin's range.
    let localOffset = atomicAdd(&binCounts[bin], 1u);
    let slot = binOffsets[bin] + localOffset;

    sortedIndices[slot] = idx;
}
`,Ze=`// physics-collision-particle.wgsl — Particle-particle collision response.
//
// Reads the spatial hash (sortedIndices + binOffsets) to find neighbors
// in the 3x3 grid of bins surrounding each particle.  For each neighbor
// within 2*radius, applies elastic bounce response:
//   1. Position-based correction — separate overlapping particles.
//   2. Velocity reflection — exchange velocity components along the
//      collision normal, scaled by the restitution coefficient.
//
// This is purely visual physics — no game state is affected.  Visual
// divergence between networked clients is acceptable.
//
// Reference: Harada, T. et al. "Real-time Rigid Body Simulation on GPUs."
//            GPU Gems 3, Ch. 29, NVIDIA 2007.

// ─── Structures ─────────────────────────────────────────────────────

struct Particle {
    position: vec2<f32>,
    velocity: vec2<f32>,
    color:    u32,
    life:     f32,
    lifetime: f32,
    _pad:     f32,
}

struct Uniforms {
    cellSize:      f32,
    gridW:         u32,
    gridH:         u32,
    radius:        f32,
    restitution:   f32,
    particleCount: u32,
}

// ─── Bindings ───────────────────────────────────────────────────────

@group(0) @binding(0) var<storage, read_write>  particles     : array<Particle>;
@group(0) @binding(1) var<storage, read>        sortedIndices : array<u32>;
@group(0) @binding(2) var<storage, read>        binOffsets    : array<u32>;
@group(0) @binding(3) var<storage, read>        binCounts     : array<u32>;
@group(0) @binding(4) var<uniform>              uniforms      : Uniforms;

// ─── Entry point ────────────────────────────────────────────────────

@compute @workgroup_size(64)
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
    let idx = gid.x;

    if (idx >= uniforms.particleCount) {
        return;
    }

    // Skip dead particles.
    if (particles[idx].life < 0.0) {
        return;
    }

    let pos = particles[idx].position;
    var vel = particles[idx].velocity;
    var posCorrection = vec2<f32>(0.0, 0.0);

    let minDist = 2.0 * uniforms.radius;

    // Determine which bin this particle is in.
    let cellX = i32(floor(pos.x / uniforms.cellSize));
    let cellY = i32(floor(pos.y / uniforms.cellSize));

    let gridW = i32(uniforms.gridW);
    let gridH = i32(uniforms.gridH);

    // Iterate over the 3x3 neighborhood of bins.
    for (var dy = -1; dy <= 1; dy = dy + 1) {
        for (var dx = -1; dx <= 1; dx = dx + 1) {
            let nx = cellX + dx;
            let ny = cellY + dy;

            // Skip out-of-bounds bins.
            if (nx < 0 || ny < 0 || nx >= gridW || ny >= gridH) {
                continue;
            }

            let neighborBin = u32(ny) * uniforms.gridW + u32(nx);
            let binStart = binOffsets[neighborBin];
            let binEnd   = binStart + binCounts[neighborBin];

            // Iterate over particles in this bin.
            for (var j = binStart; j < binEnd; j = j + 1u) {
                let otherIdx = sortedIndices[j];

                // Skip self-collision.
                if (otherIdx == idx) {
                    continue;
                }

                let otherPos = particles[otherIdx].position;
                let diff = pos - otherPos;
                let distSq = dot(diff, diff);

                // Check if within collision distance.
                if (distSq < minDist * minDist && distSq > 0.0001) {
                    let dist = sqrt(distSq);
                    let normal = diff / dist;

                    // Position-based correction: push particles apart by half
                    // the overlap distance along the collision normal.
                    let overlap = minDist - dist;
                    posCorrection = posCorrection + normal * (overlap * 0.5);

                    // Velocity reflection: reflect the velocity component
                    // along the collision normal, scaled by restitution.
                    let relVel = dot(vel - particles[otherIdx].velocity, normal);
                    if (relVel < 0.0) {
                        vel = vel - normal * relVel * (1.0 + uniforms.restitution) * 0.5;
                    }
                }
            }
        }
    }

    // Apply accumulated corrections.
    particles[idx].position = pos + posCorrection;
    particles[idx].velocity = vel;
}
`,je=`// physics-collision-boundary.wgsl — Particle-boundary collision response.
//
// Each alive particle is checked against an axis-aligned bounding box
// (AABB) representing the world boundaries.  If a particle has crossed
// a boundary, its velocity component perpendicular to that boundary is
// reflected (scaled by the restitution coefficient) and its position is
// clamped to within the boundary.
//
// This is a simple and efficient O(1) per-particle check — no spatial
// hash required.
//
// This is purely visual physics — no game state depends on the outcome.

// ─── Structures ─────────────────────────────────────────────────────

struct Particle {
    position: vec2<f32>,
    velocity: vec2<f32>,
    color:    u32,
    life:     f32,
    lifetime: f32,
    _pad:     f32,
}

struct Uniforms {
    worldMinX:     f32,
    worldMinY:     f32,
    worldMaxX:     f32,
    worldMaxY:     f32,
    restitution:   f32,
    particleCount: u32,
}

// ─── Bindings ───────────────────────────────────────────────────────

@group(0) @binding(0) var<storage, read_write>  particles : array<Particle>;
@group(0) @binding(1) var<uniform>              uniforms  : Uniforms;

// ─── Entry point ────────────────────────────────────────────────────

@compute @workgroup_size(64)
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
    let idx = gid.x;

    if (idx >= uniforms.particleCount) {
        return;
    }

    // Skip dead particles.
    if (particles[idx].life < 0.0) {
        return;
    }

    var pos = particles[idx].position;
    var vel = particles[idx].velocity;

    let rest = uniforms.restitution;

    // Left boundary.
    if (pos.x < uniforms.worldMinX) {
        pos.x = uniforms.worldMinX;
        vel.x = abs(vel.x) * rest;
    }

    // Right boundary.
    if (pos.x > uniforms.worldMaxX) {
        pos.x = uniforms.worldMaxX;
        vel.x = -abs(vel.x) * rest;
    }

    // Bottom boundary (min Y — Y-up world: Y=0 is the bottom).
    if (pos.y < uniforms.worldMinY) {
        pos.y = uniforms.worldMinY;
        vel.y = abs(vel.y) * rest;
    }

    // Top boundary (max Y — Y-up world: Y=worldMaxY is the top).
    if (pos.y > uniforms.worldMaxY) {
        pos.y = uniforms.worldMaxY;
        vel.y = -abs(vel.y) * rest;
    }

    particles[idx].position = pos;
    particles[idx].velocity = vel;
}
`;class M{binCountsBuffer;binOffsetsBuffer;sortedIndicesBuffer;hashCountPipeline;prefixSumPipeline;hashScatterPipeline;collisionParticlePipeline;collisionBoundaryPipeline;device;config;numBins;gridW;gridH;constructor(e,t,n,r,s,o,a,l,c,u){this.device=e,this.config={...t},this.binCountsBuffer=n,this.binOffsetsBuffer=r,this.sortedIndicesBuffer=s,this.hashCountPipeline=o,this.prefixSumPipeline=a,this.hashScatterPipeline=l,this.collisionParticlePipeline=c,this.collisionBoundaryPipeline=u;const f=t.worldBounds.maxX-t.worldBounds.minX,d=t.worldBounds.maxY-t.worldBounds.minY;this.gridW=Math.ceil(f/t.cellSize),this.gridH=Math.ceil(d/t.cellSize),this.numBins=this.gridW*this.gridH}static async create(e,t){const n=e.device,r=t.worldBounds.maxX-t.worldBounds.minX,s=t.worldBounds.maxY-t.worldBounds.minY,o=Math.ceil(r/t.cellSize),a=Math.ceil(s/t.cellSize),l=o*a,c=n.createBuffer({size:l*4,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST,label:"physics-bin-counts"}),u=n.createBuffer({size:(l+1)*4,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST,label:"physics-bin-offsets"}),f=n.createBuffer({size:h*4,usage:GPUBufferUsage.STORAGE,label:"physics-sorted-indices"}),[d,p,g,m,P]=await Promise.all([y.create(n,{shader:{source:He,entryPoint:"main"},buffers:[{type:"read-only-storage"},{type:"storage"},{type:"uniform"}],label:"physics-hash-count"}),y.create(n,{shader:{source:qe,entryPoint:"main"},buffers:[{type:"read-only-storage"},{type:"storage"},{type:"uniform"}],label:"physics-prefix-sum"}),y.create(n,{shader:{source:Ve,entryPoint:"main"},buffers:[{type:"read-only-storage"},{type:"storage"},{type:"read-only-storage"},{type:"storage"},{type:"uniform"}],label:"physics-hash-scatter"}),y.create(n,{shader:{source:Ze,entryPoint:"main"},buffers:[{type:"storage"},{type:"read-only-storage"},{type:"read-only-storage"},{type:"read-only-storage"},{type:"uniform"}],label:"physics-collision-particle"}),y.create(n,{shader:{source:je,entryPoint:"main"},buffers:[{type:"storage"},{type:"uniform"}],label:"physics-collision-boundary"})]);return new M(n,t,c,u,f,d,p,g,m,P)}simulate(e,t,n){if(n<=0)return;const r=Math.min(n,h);e.clearBuffer(this.binCountsBuffer);const s=this._createHashUniforms(r);this.hashCountPipeline.dispatch(e,[t,this.binCountsBuffer,s],Math.ceil(r/v));const o=this._createPrefixSumUniforms();this.prefixSumPipeline.dispatch(e,[this.binCountsBuffer,this.binOffsetsBuffer,o],1),e.clearBuffer(this.binCountsBuffer);const a=this._createHashUniforms(r);this.hashScatterPipeline.dispatch(e,[t,this.binCountsBuffer,this.binOffsetsBuffer,this.sortedIndicesBuffer,a],Math.ceil(r/v));const l=this._createCollisionParticleUniforms(r);this.collisionParticlePipeline.dispatch(e,[t,this.sortedIndicesBuffer,this.binOffsetsBuffer,this.binCountsBuffer,l],Math.ceil(r/v));const c=this._createBoundaryUniforms(r);this.collisionBoundaryPipeline.dispatch(e,[t,c],Math.ceil(r/v))}setWorldBounds(e){this.config.worldBounds={...e};const t=e.maxX-e.minX,n=e.maxY-e.minY;this.gridW=Math.ceil(t/this.config.cellSize),this.gridH=Math.ceil(n/this.config.cellSize),this.numBins=this.gridW*this.gridH}destroy(){this.binCountsBuffer.destroy(),this.binOffsetsBuffer.destroy(),this.sortedIndicesBuffer.destroy()}_createHashUniforms(e){const t=new ArrayBuffer(16),n=new Float32Array(t),r=new Uint32Array(t);n[0]=this.config.cellSize,r[1]=this.gridW,r[2]=this.gridH,r[3]=e;const s=this.device.createBuffer({size:16,usage:GPUBufferUsage.UNIFORM,mappedAtCreation:!0,label:"physics-hash-uniforms"});return new Uint8Array(s.getMappedRange()).set(new Uint8Array(t)),s.unmap(),s}_createPrefixSumUniforms(){const e=new Uint32Array([this.numBins]),t=this.device.createBuffer({size:4,usage:GPUBufferUsage.UNIFORM,mappedAtCreation:!0,label:"physics-prefix-sum-uniforms"});return new Uint32Array(t.getMappedRange()).set(e),t.unmap(),t}_createCollisionParticleUniforms(e){const t=new ArrayBuffer(24),n=new Float32Array(t),r=new Uint32Array(t);n[0]=this.config.cellSize,r[1]=this.gridW,r[2]=this.gridH,n[3]=this.config.particleRadius,n[4]=this.config.restitution,r[5]=e;const s=this.device.createBuffer({size:24,usage:GPUBufferUsage.UNIFORM,mappedAtCreation:!0,label:"physics-collision-particle-uniforms"});return new Uint8Array(s.getMappedRange()).set(new Uint8Array(t)),s.unmap(),s}_createBoundaryUniforms(e){const t=new ArrayBuffer(24),n=new Float32Array(t),r=new Uint32Array(t);n[0]=this.config.worldBounds.minX,n[1]=this.config.worldBounds.minY,n[2]=this.config.worldBounds.maxX,n[3]=this.config.worldBounds.maxY,n[4]=this.config.restitution,r[5]=e;const s=this.device.createBuffer({size:24,usage:GPUBufferUsage.UNIFORM,mappedAtCreation:!0,label:"physics-collision-boundary-uniforms"});return new Uint8Array(s.getMappedRange()).set(new Uint8Array(t)),s.unmap(),s}}const F=32,Qe=32,$e=F*Qe,Y=48,Ke=Y/4;class Je{device;globalsBuffer;lightsBuffer;lights=[];dirLight;constructor(e){this.device=e,this.globalsBuffer=e.createBuffer({size:Y,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST,label:"light-globals-ubo"}),this.lightsBuffer=e.createBuffer({size:$e,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST,label:"point-lights-ssbo"}),this.dirLight={dirX:.2,dirY:.2,dirZ:1,colorR:1,colorG:1,colorB:1,intensity:.6,ambient:.45,normalInfluence:.35}}addLight(e){this.lights.length>=F&&this.lights.shift(),this.lights.push(e)}addSpawn(e){this.addLight({x:e.x,y:e.y,z:e.z,r:e.r,g:e.g,b:e.b,radius:e.radius,intensity:e.intensity,remaining:e.lifetime})}setDirectional(e){this.dirLight={...e}}tick(e){for(let t=this.lights.length-1;t>=0;t--){const n=this.lights[t];n.remaining>0&&(n.remaining-=e,n.remaining<=0&&this.lights.splice(t,1))}}upload(){const e=new Float32Array(Ke);e[0]=this.dirLight.dirX,e[1]=this.dirLight.dirY,e[2]=this.dirLight.dirZ,e[3]=this.dirLight.intensity,e[4]=this.dirLight.colorR,e[5]=this.dirLight.colorG,e[6]=this.dirLight.colorB,e[7]=0,e[8]=this.dirLight.ambient,e[9]=this.lights.length,e[10]=this.dirLight.normalInfluence,e[11]=0,this.device.queue.writeBuffer(this.globalsBuffer,0,e);const t=new Float32Array(F*8);for(let n=0;n<this.lights.length;n++){const r=this.lights[n],s=n*8;t[s+0]=r.x,t[s+1]=r.y,t[s+2]=r.z,t[s+3]=r.radius,t[s+4]=r.r,t[s+5]=r.g,t[s+6]=r.b,t[s+7]=r.intensity}this.device.queue.writeBuffer(this.lightsBuffer,0,t)}get globalsGpuBuffer(){return this.globalsBuffer}get lightsGpuBuffer(){return this.lightsBuffer}get activeLightCount(){return this.lights.length}get directional(){return this.dirLight}destroy(){this.globalsBuffer.destroy(),this.lightsBuffer.destroy()}}class X{ctx;device;format;canvas;canvasContext;_camera;_particleSystem;_particleRenderer;_postProcessing;_effects;_emitterScheduler;_physics=null;_spriteRenderer=null;_textRenderer=null;_edgeRenderer=null;_pillRenderer=null;_panelGlassRenderer=null;_lightBuffer;_streakScale=0;width;height;_depthTexture;_sceneCaptureTexture;constructor(e,t,n,r,s,o,a,l,c,u,f,d){this.ctx=e,this.device=e.device,this.format=t,this.canvas=n,this.canvasContext=r,this._camera=s,this._particleSystem=o,this._particleRenderer=a,this._postProcessing=l,this._effects=c,this._lightBuffer=d,this._emitterScheduler=new Xe,this.width=u,this.height=f}static async create(e,t){const{canvas:n,format:r,width:s,height:o}=t;ee(n),K(e.device);const a=n.getContext("webgpu");a.configure({device:e.device,format:r,alphaMode:"premultiplied",usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.COPY_SRC|GPUTextureUsage.COPY_DST});const l=e.device.createTexture({size:{width:s,height:o},format:"depth24plus",usage:GPUTextureUsage.RENDER_ATTACHMENT,label:"compositor-depth-texture"}),c=new j(e.device),[u,f,d]=await Promise.all([E.create(e,U),k.create(e,r,U),V.create(e,s,o,r)]),p=new Je(e.device),g=new Te(u,d,p);await d.prewarmFilters(),await d.ensurePassthroughCompiled();const m=new X(e,r,n,a,c,u,f,d,g,s,o,p);return m._depthTexture=l,m._sceneCaptureTexture=m.createSceneCaptureTexture(s,o),m}createSceneCaptureTexture(e,t){return this.device.createTexture({size:{width:e,height:t},format:this.format,usage:GPUTextureUsage.COPY_DST|GPUTextureUsage.TEXTURE_BINDING,label:"compositor-scene-capture"})}renderFrame(e){const{sprites:t,textLabels:n,edges:r,pills:s,panelGlass:o,camera:a,dt:l,gravity:c}=e;this.updateCameraAndEffects(a,l);const u=this.device.createCommandEncoder({label:"compositor-frame"});this.runParticleCompute(u,l,c);const f=this.canvasContext.getCurrentTexture(),d=f.createView({label:"compositor-canvas-view"}),p=this._depthTexture.createView({label:"compositor-depth-view"});this.clearAndBackground(u,d);const g=this.buildRendererCamera(a);this.renderGeometry(u,f,d,p,g,t,n,r,s,o),this.renderParticles(u,d,p,g),this.applyPostProcessing(u,f),this.device.queue.submit([u.finish()])}updateCameraAndEffects(e,t){this._camera.update(e),this._effects.tick(t),this._lightBuffer.tick(t)}runParticleCompute(e,t,n){this._emitterScheduler.tick(t,this._particleSystem),this._particleSystem.tick(e,t,n??[0,0]),this._physics!==null&&this._physics.simulate(e,this._particleSystem.particleBuffer,this._particleSystem.aliveCount)}clearAndBackground(e,t){e.beginRenderPass({colorAttachments:[{view:t,loadOp:"clear",storeOp:"store",clearValue:{r:0,g:0,b:0,a:1}}],depthStencilAttachment:{view:this._depthTexture.createView({label:"compositor-depth-view"}),depthLoadOp:"clear",depthStoreOp:"store",depthClearValue:1},label:"compositor-clear-pass"}).end(),this._postProcessing.hasActiveBackgroundChain&&this._postProcessing.applyBackground(e,t)}buildRendererCamera(e){return{viewProj:O(e),canvasW:e.canvasW,canvasH:e.canvasH,vpH:e.viewportH}}renderGeometry(e,t,n,r,s,o,a,l,c,u){if(this._lightBuffer.upload(),this._spriteRenderer!==null&&o.length>0&&this._spriteRenderer.render(e,n,o,s,r,this._lightBuffer),this._edgeRenderer!==null&&l&&l.length>0&&this._edgeRenderer.render(e,n,l,s,r),this._pillRenderer!==null&&c&&c.length>0){e.copyTextureToTexture({texture:t},{texture:this._sceneCaptureTexture},{width:this.width,height:this.height});const f=this._sceneCaptureTexture.createView({label:"compositor-scene-capture-view"});this._pillRenderer.render(e,n,c,s,r,f)}if(this._textRenderer!==null&&a&&a.length>0&&this._textRenderer.render(e,n,a,s,r),this._panelGlassRenderer!==null&&u&&u.length>0){e.copyTextureToTexture({texture:t},{texture:this._sceneCaptureTexture},{width:this.width,height:this.height});const f=this._sceneCaptureTexture.createView({label:"compositor-scene-capture-view-panel"});this._panelGlassRenderer.render(e,n,u,s.canvasW,s.canvasH,r,f)}}renderParticles(e,t,n,r){this._particleRenderer.render(e,t,this._particleSystem.particleBuffer,{viewProj:r.viewProj,canvasW:r.canvasW,canvasH:r.canvasH},this._streakScale,0,n)}applyPostProcessing(e,t){if(!this._postProcessing.hasActiveChain)return;const n=this._postProcessing.dimensions;(n.width!==this.width||n.height!==this.height)&&this._postProcessing.resize(this.width,this.height),e.copyTextureToTexture({texture:t},{texture:this._postProcessing.sourceTexture},{width:this.width,height:this.height}),this._postProcessing.apply(e,this._postProcessing.sourceTextureView),e.copyTextureToTexture({texture:this._postProcessing.resultTexture},{texture:t},{width:this.width,height:this.height})}setSpriteRenderer(e){this._spriteRenderer=e}setTextRenderer(e){this._textRenderer=e}setEdgeRenderer(e){this._edgeRenderer=e}setPillRenderer(e){this._pillRenderer=e}setPanelGlassRenderer(e){this._panelGlassRenderer=e}setStreakScale(e){this._streakScale=e}get particleSystem(){return this._particleSystem}get emitterScheduler(){return this._emitterScheduler}get postProcessing(){return this._postProcessing}get effects(){return this._effects}get lightBuffer(){return this._lightBuffer}addPointLight(e){this._lightBuffer.addLight(e)}setDirectionalLight(e){this._lightBuffer.setDirectional(e)}get camera(){return this._camera}get physics(){return this._physics}async setPhysicsEnabled(e,t){if(e){if(!t)throw new Error("Compositor.setPhysicsEnabled: config is required when enabling physics");this._physics!==null&&this._physics.destroy(),this._physics=await M.create(this.ctx,t)}else this._physics!==null&&(this._physics.destroy(),this._physics=null)}resize(e,t){this.width=e,this.height=t,this._postProcessing.resize(e,t),this._depthTexture.destroy(),this._depthTexture=this.device.createTexture({size:{width:e,height:t},format:"depth24plus",usage:GPUTextureUsage.RENDER_ATTACHMENT,label:"compositor-depth-texture"}),this._sceneCaptureTexture.destroy(),this._sceneCaptureTexture=this.createSceneCaptureTexture(e,t)}destroy(){this._emitterScheduler.clear(),this._camera.destroy(),this._particleRenderer.destroy(),this._particleSystem.destroy(),this._postProcessing.destroy(),this._physics!==null&&(this._physics.destroy(),this._physics=null),this._spriteRenderer!==null&&(this._spriteRenderer.destroy(),this._spriteRenderer=null),this._textRenderer!==null&&(this._textRenderer.destroy(),this._textRenderer=null),this._panelGlassRenderer!==null&&(this._panelGlassRenderer.destroy(),this._panelGlassRenderer=null),this._lightBuffer.destroy(),this._depthTexture.destroy(),this._sceneCaptureTexture.destroy(),te(this.canvas),J(this.device)}}export{X as Compositor};

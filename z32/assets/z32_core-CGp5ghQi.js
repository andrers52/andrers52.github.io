/* @ts-self-types="./z32_core.d.ts" */

/**
 * JS-facing handle for a Worker-side scheduler.
 *
 * Constructed once per Worker boot from a `SchedulerInit` message.
 * The TS bootstrap (`runtime/SchedulerWorker.ts`) creates one, then
 * drives a loop that reads a request batch off the SAB inbox, calls
 * [`Self::process_batch`], writes the returned bytes to the SAB
 * outbox, and repeats.
 *
 * Interior mutability via `RefCell` so the wasm-bindgen `&self`
 * method signature can mutate the contained session — same pattern
 * `SessionManager` uses for its `SessionManagerInner`.
 */
export class SchedulerWorker {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        SchedulerWorkerFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_schedulerworker_free(ptr, 0);
    }
    /**
     * Ingest the host's latest physics-SAB
     * snapshot.  Called by the Worker's TS bootstrap before each
     * `process_batch` call, with the bytes read from the
     * `SharedArrayBuffer` shipped via `SchedulerInitMessage.physicsSab`.
     *
     * After this call, worker-side behaviours that read through
     * [`crate::agent::EnvHandle::physics_sab_reader`] observe the
     * shipped snapshot.  Returns `true` on success, `false` if the
     * snapshot's wire layout doesn't match the Worker's local
     * engine — caller logs and drops the snapshot (the Worker
     * keeps reading the previous one).
     * @param {Uint8Array} snapshot
     * @returns {boolean}
     */
    apply_physics_sab_snapshot(snapshot) {
        const ptr0 = passArray8ToWasm0(snapshot, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.schedulerworker_apply_physics_sab_snapshot(this.__wbg_ptr, ptr0, len0);
        return ret !== 0;
    }
    /**
     * Mount the named app on this Worker's
     * session without an init payload.  Equivalent to
     * `mount_app_with_payload(app_name, &[])` from JS but accepts
     * only the app name to keep the original signature working for
     * apps that don't need state migration.
     *
     * The TS bootstrap calls this when the host's
     * `SchedulerInitMessage` lacks `appInitPayload`.  See
     * `runtime/SchedulerWorker.ts`.
     * @param {string} app_name
     * @returns {boolean}
     */
    mount_app(app_name) {
        const ptr0 = passStringToWasm0(app_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.schedulerworker_mount_app(this.__wbg_ptr, ptr0, len0);
        return ret !== 0;
    }
    /**
     * Mount the named app on this
     * Worker's session with an app-specific init payload.
     *
     * Deprecated wire-compat shim: there is no worker `Start` to
     * deliver the payload to, so the bytes are ignored.  Kept so the
     * TS bootstrap (`SchedulerWorker.ts`) can keep passing
     * `SchedulerInitMessage.appInitPayload` unchanged.
     * @param {string} app_name
     * @param {Uint8Array} payload
     * @returns {boolean}
     */
    mount_app_with_payload(app_name, payload) {
        const ptr0 = passStringToWasm0(app_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArray8ToWasm0(payload, wasm.__wbindgen_malloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.schedulerworker_mount_app_with_payload(this.__wbg_ptr, ptr0, len0, ptr1, len1);
        return ret !== 0;
    }
    /**
     * Mount the named app on this Worker
     * with an init payload that includes JS-side `SharedArrayBuffer`s.
     *
     * Deprecated wire-compat shim: like `mount_app_with_payload`, the
     * payload and buffers have no worker `Start` to be delivered to
     * and are ignored beyond validation.
     *
     * The TS bootstrap (`SchedulerWorker.ts`) extracts a
     * `SharedArrayBuffer[]` from the `scheduler-init` message and
     * passes it here as a `js_sys::Array`.  Each element is downcast
     * to `SharedArrayBuffer`; non-SAB elements abort the mount.
     * @param {string} app_name
     * @param {Uint8Array} payload
     * @param {Array<any>} shared_buffers
     * @returns {boolean}
     */
    mount_app_with_payload_and_buffers(app_name, payload, shared_buffers) {
        const ptr0 = passStringToWasm0(app_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArray8ToWasm0(payload, wasm.__wbindgen_malloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.schedulerworker_mount_app_with_payload_and_buffers(this.__wbg_ptr, ptr0, len0, ptr1, len1, shared_buffers);
        return ret !== 0;
    }
    /**
     * Construct a Worker handle with the given scheduler id.
     *
     * The TS bootstrap calls this from the `'scheduler-init'`
     * postMessage handler, passing the `schedulerId` the host
     * allocated for this Worker.
     * @param {number} scheduler_id
     */
    constructor(scheduler_id) {
        const ret = wasm.schedulerworker_new(scheduler_id);
        this.__wbg_ptr = ret >>> 0;
        SchedulerWorkerFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * Slot capacity of the Worker's local physics-SAB buffer.  Must
     * match the host's capacity for snapshot ingest to succeed; TS
     * uses this to size its `SharedArrayBuffer`.
     * @returns {number}
     */
    get physics_sab_capacity() {
        const ret = wasm.schedulerworker_physics_sab_capacity(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Byte length the Worker expects for a physics-SAB snapshot.
     * TS calls this once at bootstrap to size its
     * `Uint8Array` view over the `SharedArrayBuffer` before
     * calling [`Self::apply_physics_sab_snapshot`].
     * @returns {number}
     */
    get physics_sab_len() {
        const ret = wasm.schedulerworker_physics_sab_len(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Pointer to the Worker's local
     * physics-SAB buffer in its own WASM linear memory.  TS in the
     * Worker constructs `new Uint8Array(workerWasm.memory.buffer,
     * ptr, physics_sab_len)` to mirror the intent half WASM → SAB
     * after each `process_batch`.  Symmetric with the host's
     * `SessionManager::physics_sab_ptr`.
     *
     * Exposed as a getter so TS can
     * read it as `worker.physics_sab_ptr` (a number) instead of
     * `worker.physics_sab_ptr()` (a function call).  Without the
     * getter attribute, accessing without parens returned the
     * method object, which `new Uint8Array(buf, fn, len)` coerced
     * to byte-offset 0 → the WASM→SAB mirror was reading the start
     * of linear memory instead of the SAB buffer, so worker
     * mailbox writes silently disappeared.
     * @returns {number}
     */
    get physics_sab_ptr() {
        const ret = wasm.schedulerworker_physics_sab_ptr(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Process one inbound batch and return the outbound batch.
     *
     * Errors are surfaced as a JS string via wasm-bindgen's
     * `Result<Vec<u8>, JsValue>` shape — the TS side logs and
     * drops the bad payload.  The Worker stays alive.
     * @param {Uint8Array} inbound_bytes
     * @param {number} now_ms
     * @param {number} dt_ms
     * @returns {Uint8Array}
     */
    process_batch(inbound_bytes, now_ms, dt_ms) {
        const ptr0 = passArray8ToWasm0(inbound_bytes, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.schedulerworker_process_batch(this.__wbg_ptr, ptr0, len0, now_ms, dt_ms);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        var v2 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v2;
    }
    /**
     * This Worker's scheduler id (as a plain `u32` for JS).
     * @returns {number}
     */
    get scheduler_id() {
        const ret = wasm.schedulerworker_scheduler_id(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Ship the host's boot-time agent roster to this Worker.
     *
     * Called by the TS bootstrap (`SchedulerWorker.ts`) right after the
     * app mount, with the JSON-decoded `SchedulerInitMessage.agentRoster`
     * the host produced via `SessionManager::remote_scheduler_roster`.
     * Builds the host→local id translation that lets host-initiated
     * targeted messages (addressed to host-side stub ids) reach the
     * worker-local agents.  Must run after the mount (the Worker's
     * kind registry is only populated once `register_kinds` ran) and
     * before the first `process_batch`.
     *
     * Returns `false` on malformed JSON — the caller logs and the
     * Worker keeps running with its previous (typically empty) map, in
     * which case host-initiated targeted messages surface through the
     * undeliverable-drop audit instead of vanishing silently.
     * @param {string} roster_json
     * @returns {boolean}
     */
    set_agent_roster(roster_json) {
        const ptr0 = passStringToWasm0(roster_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.schedulerworker_set_agent_roster(this.__wbg_ptr, ptr0, len0);
        return ret !== 0;
    }
    /**
     * Number of `process_batch` calls completed since construction.
     * Surfaces tick progress to the supervisor's heartbeat checks
     * @returns {bigint}
     */
    get tick_count() {
        const ret = wasm.schedulerworker_tick_count(this.__wbg_ptr);
        return BigInt.asUintN(64, ret);
    }
}
if (Symbol.dispose) SchedulerWorker.prototype[Symbol.dispose] = SchedulerWorker.prototype.free;

/**
 * Session and protocol layer. Wraps SessionManagerInner with RefCell for
 * interior mutability -- all wasm_bindgen methods take `&self` to avoid
 * recursive borrow errors from async tick loop re-entry.
 */
export class SessionManager {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        SessionManagerFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_sessionmanager_free(ptr, 0);
    }
    /**
     * @param {number} agent_id
     * @param {string} commands_json
     * @returns {Uint8Array}
     */
    apply_agent_commands(agent_id, commands_json) {
        const ptr0 = passStringToWasm0(commands_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.sessionmanager_apply_agent_commands(this.__wbg_ptr, agent_id, ptr0, len0);
        var v2 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v2;
    }
    /**
     * Decode + route a `MessageBatch` byte slice received from an
     * off-thread Worker scheduler.  Returns the number of messages
     * that were successfully routed; ignored bytes (decode error,
     * unknown target) are silently dropped.
     * @param {Uint8Array} bytes
     * @returns {number}
     */
    apply_cross_scheduler_batch(bytes) {
        const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.sessionmanager_apply_cross_scheduler_batch(this.__wbg_ptr, ptr0, len0);
        return ret >>> 0;
    }
    /**
     * BSP split: apply position updates from workers.
     * @param {string} updates_json
     */
    apply_worker_results(updates_json) {
        const ptr0 = passStringToWasm0(updates_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.sessionmanager_apply_worker_results(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * Build the unified frame buffer for one user, reading the user's
     * own `UserCamera` for projection state.  Called by the TS emit
     * dispatch for each `EmitUserUpdate` message — one build per
     * connected user per tick.  See `SessionManagerInner::build_frame_buffer_for_user`
     * for the per-user vs. global scratch story.
     * @param {string} user_id
     */
    build_frame_buffer_for_user(user_id) {
        const ptr0 = passStringToWasm0(user_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.sessionmanager_build_frame_buffer_for_user(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {string} kind
     * @param {string} image_name
     * @param {number} width
     * @param {number} height
     * @param {boolean} is_solid
     * @param {number} x_pos
     * @param {number} y_pos
     * @returns {Uint8Array}
     */
    configure_user_agent(kind, image_name, width, height, is_solid, x_pos, y_pos) {
        const ptr0 = passStringToWasm0(kind, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(image_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.sessionmanager_configure_user_agent(this.__wbg_ptr, ptr0, len0, ptr1, len1, width, height, is_solid, x_pos, y_pos);
        var v3 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v3;
    }
    /**
     * @param {string} image_name
     * @param {number} width
     * @param {number} height
     * @param {boolean} is_solid
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @param {string} kind
     * @param {string} presentation_json
     * @returns {number}
     */
    create_agent(image_name, width, height, is_solid, x, y, z, kind, presentation_json) {
        const ptr0 = passStringToWasm0(image_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(kind, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(presentation_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ret = wasm.sessionmanager_create_agent(this.__wbg_ptr, ptr0, len0, width, height, is_solid, x, y, z, ptr1, len1, ptr2, len2);
        return ret >>> 0;
    }
    /**
     * @param {string} user_id
     * @returns {Uint8Array}
     */
    disconnect_user(user_id) {
        const ptr0 = passStringToWasm0(user_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.sessionmanager_disconnect_user(this.__wbg_ptr, ptr0, len0);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        var v2 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v2;
    }
    /**
     * @param {string} owning_agent_id
     * @returns {Uint8Array}
     */
    disconnect_user_by_owning_agent_id(owning_agent_id) {
        const ptr0 = passStringToWasm0(owning_agent_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.sessionmanager_disconnect_user_by_owning_agent_id(this.__wbg_ptr, ptr0, len0);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        var v2 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v2;
    }
    /**
     * Return a flat array describing the host's outbound batches:
     * `[sched_id_0, len_0, ...payload_0, sched_id_1, len_1, ...]`.
     *
     * Drains `SimulationEngine::pending_cross_scheduler` and encodes
     * one [`crate::scheduler::MessageBatch`] per destination
     * scheduler.  Returns an empty vector when there is nothing to
     * ship.
     *
     * The flat layout avoids the wasm-bindgen `Vec<(u32, Vec<u8>)>`
     * limitation; JS reads it via a small TS helper that walks the
     * header bytes.  See `WebWorkerRuntime.drainAndSend` (Step C.6
     * integration).
     * @returns {Uint8Array}
     */
    drain_cross_scheduler_batches() {
        const ret = wasm.sessionmanager_drain_cross_scheduler_batches(this.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * @param {string} payload_json
     * @returns {Uint8Array}
     */
    emit_procedural_sound_visible(payload_json) {
        const ptr0 = passStringToWasm0(payload_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.sessionmanager_emit_procedural_sound_visible(this.__wbg_ptr, ptr0, len0);
        var v2 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v2;
    }
    /**
     * @param {string} event_name
     * @param {string} payload_json
     * @returns {Uint8Array}
     */
    emit_to_all(event_name, payload_json) {
        const ptr0 = passStringToWasm0(event_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(payload_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.sessionmanager_emit_to_all(this.__wbg_ptr, ptr0, len0, ptr1, len1);
        var v3 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v3;
    }
    /**
     * @param {string} user_id
     * @param {string} event_name
     * @param {string} payload_json
     * @returns {Uint8Array}
     */
    emit_to_user(user_id, event_name, payload_json) {
        const ptr0 = passStringToWasm0(user_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(event_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(payload_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ret = wasm.sessionmanager_emit_to_user(this.__wbg_ptr, ptr0, len0, ptr1, len1, ptr2, len2);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        var v4 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v4;
    }
    /**
     * Run one engine pulse.
     *
     * Emits NO render updates.  Pair with [`Self::request_visible_updates`]
     * when a frame snapshot is wanted.  See the doc comment on the inner
     * `engine_step` for the decoupling rationale.
     * @param {number} now_ms
     * @returns {Uint8Array}
     */
    engine_step(now_ms) {
        const ret = wasm.sessionmanager_engine_step(this.__wbg_ptr, now_ms);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * Push a raw typed message into the session's `pending_typed_messages`
     * buffer. The next `engine_step` call drains it via
     * `_dispatch_pending_typed_messages`, delivering to the target's mailbox
     * (or dispatching framework messages inline). This is the entry point
     * async work (e.g. `wasm_bindgen_futures` futures) uses to enqueue messages
     * back into the engine — the engine owns the sim and the SessionManager
     * is the only handle async code can reach.
     *
     * The payload is empty (`MessagePayload::new()`); callers that need to
     * pass typed fields can use `enqueue_typed_message_with_payload` (see
     * below). Most async re-broadcasts (the kb_oracle's post-hydrate broadcast,
     * for example) only need a target + msg_id.
     * @param {number} target
     * @param {number} id
     */
    enqueue_typed_message(target, id) {
        wasm.sessionmanager_enqueue_typed_message(this.__wbg_ptr, target, id);
    }
    /**
     * @param {string} commands_json
     * @returns {Uint8Array}
     */
    execute_commands(commands_json) {
        const ptr0 = passStringToWasm0(commands_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.sessionmanager_execute_commands(this.__wbg_ptr, ptr0, len0);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        var v2 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v2;
    }
    /**
     * @param {string} agent_id
     * @returns {string}
     */
    find_user_id_by_owning_agent_id(agent_id) {
        let deferred2_0;
        let deferred2_1;
        try {
            const ptr0 = passStringToWasm0(agent_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            const ret = wasm.sessionmanager_find_user_id_by_owning_agent_id(this.__wbg_ptr, ptr0, len0);
            deferred2_0 = ret[0];
            deferred2_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
        }
    }
    /**
     * JS-owned copy of the unified frame buffer bytes (Node.js fallback).
     * @returns {Uint8Array}
     */
    frame_buffer_bytes() {
        const ret = wasm.sessionmanager_frame_buffer_bytes(this.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * Length of the unified frame buffer in bytes.
     * @returns {number}
     */
    frame_buffer_len() {
        const ret = wasm.sessionmanager_frame_buffer_len(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Pointer to the unified frame buffer in WASM linear memory.
     * @returns {number}
     */
    frame_buffer_ptr() {
        const ret = wasm.sessionmanager_frame_buffer_ptr(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} agent_id
     * @returns {string}
     */
    get_agent_state(agent_id) {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.sessionmanager_get_agent_state(this.__wbg_ptr, agent_id);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @returns {string}
     */
    get_all_agent_states() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.sessionmanager_get_all_agent_states(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @returns {string}
     */
    get_connected_user_ids() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.sessionmanager_get_connected_user_ids(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {number} agent_id
     * @param {number} range
     * @returns {Uint32Array}
     */
    get_nearby_agent_ids(agent_id, range) {
        const ret = wasm.sessionmanager_get_nearby_agent_ids(this.__wbg_ptr, agent_id, range);
        var v1 = getArrayU32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @param {string} user_id
     * @returns {string}
     */
    get_owning_agent_id(user_id) {
        let deferred2_0;
        let deferred2_1;
        try {
            const ptr0 = passStringToWasm0(user_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            const ret = wasm.sessionmanager_get_owning_agent_id(this.__wbg_ptr, ptr0, len0);
            deferred2_0 = ret[0];
            deferred2_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
        }
    }
    /**
     * @param {string} user_id
     * @param {string} payload_json
     * @returns {Uint8Array}
     */
    handle_app_message(user_id, payload_json) {
        const ptr0 = passStringToWasm0(user_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(payload_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.sessionmanager_handle_app_message(this.__wbg_ptr, ptr0, len0, ptr1, len1);
        var v3 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v3;
    }
    /**
     * Handle a binary app message — zero-copy path for high-frequency data.
     *
     * `message` is the message tag (e.g. "status_update").
     * `content` is the raw binary payload (e.g. msgpack-encoded snapshot).
     * The bytes are passed directly to `Environment::on_message_binary()`
     * with a single decode in Rust — no JSON round-trip.
     * @param {string} user_id
     * @param {string} payload_json
     * @returns {Uint8Array}
     */
    handle_client_start(user_id, payload_json) {
        const ptr0 = passStringToWasm0(user_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(payload_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.sessionmanager_handle_client_start(this.__wbg_ptr, ptr0, len0, ptr1, len1);
        var v3 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v3;
    }
    /**
     * @param {string} user_id
     * @param {string} payload_json
     * @returns {Uint8Array}
     */
    handle_user_event(user_id, payload_json) {
        const ptr0 = passStringToWasm0(user_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(payload_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.sessionmanager_handle_user_event(this.__wbg_ptr, ptr0, len0, ptr1, len1);
        var v3 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v3;
    }
    /**
     * @param {string} kind
     * @param {string} event
     * @returns {boolean}
     */
    has_rust_handler(kind, event) {
        const ptr0 = passStringToWasm0(kind, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(event, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.sessionmanager_has_rust_handler(this.__wbg_ptr, ptr0, len0, ptr1, len1);
        return ret !== 0;
    }
    /**
     * @param {string} demo_name
     * @returns {Uint8Array}
     */
    mount_app_by_name(demo_name) {
        const ptr0 = passStringToWasm0(demo_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.sessionmanager_mount_app_by_name(this.__wbg_ptr, ptr0, len0);
        var v2 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v2;
    }
    /**
     * Return the currently-mounted app's worker-init payload bytes,
     * or an empty `Vec` if there's no payload to migrate.  TS calls this once per Worker spawn
     * (after the host's `Start` ran in `mount_app_by_name`); the
     * bytes are placed in `SchedulerInitMessage.appInitPayload` and
     * arrive at the Worker's `Start` via
     * `StartEnv::worker_init_payload`.
     *
     * Returns `Vec` (not `Option<Vec>`) because wasm-bindgen
     * marshals `Option<Vec<u8>>` awkwardly; the TS side branches on
     * empty-vs-non-empty.
     * @returns {Uint8Array}
     */
    mounted_app_worker_init_payload() {
        const ret = wasm.sessionmanager_mounted_app_worker_init_payload(this.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * Return the currently-mounted app's
     * `SharedArrayBuffer` transferables (always a `js_sys::Array`,
     * possibly empty).  TS calls this once per Worker spawn alongside
     * `mounted_app_worker_init_payload`; the SABs are placed in
     * `SchedulerInitMessage.appInitSharedBuffers` and arrive at the
     * Worker's `Start` via `StartEnv::worker_shared_buffers`.
     *
     * wasm32 only — native builds have no SAB concept and no Worker
     * runtime that would consume them.
     * @returns {Array<any>}
     */
    mounted_app_worker_shared_buffers() {
        const ret = wasm.sessionmanager_mounted_app_worker_shared_buffers(this.__wbg_ptr);
        return ret;
    }
    constructor() {
        const ret = wasm.sessionmanager_new();
        this.__wbg_ptr = ret >>> 0;
        SessionManagerFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @param {number} agent_id
     * @param {number} px
     * @param {number} py
     * @returns {number}
     */
    overlapping_solid_agent_id(agent_id, px, py) {
        const ret = wasm.sessionmanager_overlapping_solid_agent_id(this.__wbg_ptr, agent_id, px, py);
        return ret >>> 0;
    }
    /**
     * Slot capacity (agent count) of the physics SAB.  TS can use
     * this to size its reader-side bookkeeping and to validate the
     * SAB layout's `capacity` header field round-trips correctly.
     * @returns {number}
     */
    physics_sab_capacity() {
        const ret = wasm.sessionmanager_physics_sab_capacity(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Byte length of the physics SAB.  Pairs with
     * [`Self::physics_sab_ptr`] for the TS-side
     * `Uint8Array(memory.buffer, ptr, len)` construction.
     * @returns {number}
     */
    physics_sab_len() {
        const ret = wasm.sessionmanager_physics_sab_len(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Raw pointer to the physics SAB
     * buffer in WASM linear memory.  TS reads `len` bytes starting
     * here as a `Uint8Array` view; the bytes are the on-wire layout
     * from [`crate::scheduler::physics_sab`].
     *
     * The host can copy these bytes into a
     * `SharedArrayBuffer` and ship it to each Worker via the init
     * message; the renderer can also read directly from the SAB on
     * every `rAF`.  The accessor just
     * exposes the bytes for tests + diagnostic snapshots.
     *
     * The pointer is valid until the next mutation of the
     * underlying `Vec<u8>` — typically the next `engine_step` call
     * that triggers `publish_physics_sab`.
     * @returns {number}
     */
    physics_sab_ptr() {
        const ret = wasm.sessionmanager_physics_sab_ptr(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {string} kind
     * @param {string} event
     * @param {number} handler_id
     */
    register_rust_handler(kind, event, handler_id) {
        const ptr0 = passStringToWasm0(kind, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(event, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        wasm.sessionmanager_register_rust_handler(this.__wbg_ptr, ptr0, len0, ptr1, len1, handler_id);
    }
    /**
     * @param {string} user_id
     * @returns {Uint8Array}
     */
    register_user(user_id) {
        const ptr0 = passStringToWasm0(user_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.sessionmanager_register_user(this.__wbg_ptr, ptr0, len0);
        var v2 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v2;
    }
    /**
     * Snapshot of the scheduler ids that are currently flagged as
     * off-thread Workers.  The JS-side runtime uses this list to
     * decide which `SchedulerRuntime::spawn` calls to issue at boot
     * (one per id) and which SAB channels to poll for responses.
     *
     * Returns ids in ascending order for deterministic spawn
     * ordering across runs.
     * @returns {Uint32Array}
     */
    remote_scheduler_ids() {
        const ret = wasm.sessionmanager_remote_scheduler_ids(this.__wbg_ptr);
        var v1 = getArrayU32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * Boot-time agent roster for one off-thread scheduler, JSON-encoded
     * as `Vec<AgentRosterEntry>` (`(host id, Kind name)` pairs sorted
     * by host id).  TS fetches this once per Worker spawn (next to
     * `remote_scheduler_ids`) and ships it via
     * `SchedulerInitMessage.agentRoster`; the Worker applies it through
     * `SchedulerWorker::set_agent_roster` to build its host→local id
     * translation, so host-initiated targeted messages addressed to
     * host-side stub ids reach the worker-local agents.
     *
     * Returns `"[]"` for unknown or in-process (non-remote) scheduler
     * ids — their agents share the host's id space and need no
     * translation.
     * @param {number} sid
     * @returns {string}
     */
    remote_scheduler_roster(sid) {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.sessionmanager_remote_scheduler_roster(this.__wbg_ptr, sid);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {number} agent_id
     */
    remove_agent(agent_id) {
        wasm.sessionmanager_remove_agent(this.__wbg_ptr, agent_id);
    }
    /**
     * @param {string} user_id
     * @returns {Uint8Array}
     */
    request_initial_page_info(user_id) {
        const ptr0 = passStringToWasm0(user_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.sessionmanager_request_initial_page_info(this.__wbg_ptr, ptr0, len0);
        var v2 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v2;
    }
    /**
     * @returns {Uint8Array}
     */
    request_visible_updates() {
        const ret = wasm.sessionmanager_request_visible_updates(this.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * @param {number} agent_id
     * @returns {Uint8Array}
     */
    reserve_agent_id(agent_id) {
        const ret = wasm.sessionmanager_reserve_agent_id(this.__wbg_ptr, agent_id);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * @param {string} owning_agent_id
     * @returns {string}
     */
    resolve_user_id_by_owning_agent_id(owning_agent_id) {
        let deferred3_0;
        let deferred3_1;
        try {
            const ptr0 = passStringToWasm0(owning_agent_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            const ret = wasm.sessionmanager_resolve_user_id_by_owning_agent_id(this.__wbg_ptr, ptr0, len0);
            var ptr2 = ret[0];
            var len2 = ret[1];
            if (ret[3]) {
                ptr2 = 0; len2 = 0;
                throw takeFromExternrefTable0(ret[2]);
            }
            deferred3_0 = ptr2;
            deferred3_1 = len2;
            return getStringFromWasm0(ptr2, len2);
        } finally {
            wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
        }
    }
    /**
     * @param {number} agent_id
     * @param {number} x
     * @param {number} y
     * @param {number} z
     */
    set_agent_position(agent_id, x, y, z) {
        wasm.sessionmanager_set_agent_position(this.__wbg_ptr, agent_id, x, y, z);
    }
    /**
     * @param {number} agent_id
     * @param {number} vx
     * @param {number} vy
     */
    set_agent_velocity(agent_id, vx, vy) {
        wasm.sessionmanager_set_agent_velocity(this.__wbg_ptr, agent_id, vx, vy);
    }
    /**
     * @param {string} background_imagename
     * @returns {Uint8Array}
     */
    set_background_image_name(background_imagename) {
        const ptr0 = passStringToWasm0(background_imagename, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.sessionmanager_set_background_image_name(this.__wbg_ptr, ptr0, len0);
        var v2 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v2;
    }
    /**
     * @param {string} user_id
     * @param {string} payload_json
     * @returns {Uint8Array}
     */
    set_camera(user_id, payload_json) {
        const ptr0 = passStringToWasm0(user_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(payload_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.sessionmanager_set_camera(this.__wbg_ptr, ptr0, len0, ptr1, len1);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        var v3 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v3;
    }
    /**
     * @param {number} w
     * @param {number} h
     */
    set_canvas_size(w, h) {
        wasm.sessionmanager_set_canvas_size(this.__wbg_ptr, w, h);
    }
    /**
     * Pause or resume the force-directed solver and its pre-physics hooks.
     * See `SessionManagerInner::set_force_directed_paused` for full docs.
     * @param {boolean} paused
     */
    set_force_directed_paused(paused) {
        wasm.sessionmanager_set_force_directed_paused(this.__wbg_ptr, paused);
    }
    /**
     * Report host-context capabilities detected by the TS host at boot.
     * `caps_json` is a JSON array of capability strings, e.g.
     * `["opfs_sync","webgpu","audio_worklet"]`.
     * @param {string} caps_json
     */
    set_host_capabilities(caps_json) {
        const ptr0 = passStringToWasm0(caps_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.sessionmanager_set_host_capabilities(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * Register the interest-manager agent ID. The engine will call
     * `interest_manager_tick()` each frame when this is `Some`.
     * @param {number} id
     */
    set_interest_manager_id(id) {
        wasm.sessionmanager_set_interest_manager_id(this.__wbg_ptr, id);
    }
    /**
     * Set how many grid cells around each camera cell receive `MSG_TICK`.
     * @param {number} radius
     */
    set_spatial_tick_cull_radius(radius) {
        wasm.sessionmanager_set_spatial_tick_cull_radius(this.__wbg_ptr, radius);
    }
    /**
     * Toggle spatial tick culling (production default: off in tests).
     * @param {boolean} enabled
     */
    set_spatial_tick_culling(enabled) {
        wasm.sessionmanager_set_spatial_tick_culling(this.__wbg_ptr, enabled);
    }
    /**
     * @param {string} user_id
     * @param {number} cx
     * @param {number} cy
     * @param {number} w
     * @param {number} h
     * @param {number} rotation
     */
    set_user_camera(user_id, cx, cy, w, h, rotation) {
        const ptr0 = passStringToWasm0(user_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.sessionmanager_set_user_camera(this.__wbg_ptr, ptr0, len0, cx, cy, w, h, rotation);
    }
    /**
     * @param {string} user_id
     * @param {number} canvas_w
     * @param {number} canvas_h
     */
    set_user_canvas_size(user_id, canvas_w, canvas_h) {
        const ptr0 = passStringToWasm0(user_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.sessionmanager_set_user_canvas_size(this.__wbg_ptr, ptr0, len0, canvas_w, canvas_h);
    }
    /**
     * @param {number} world_width
     * @param {number} world_height
     * @returns {Uint8Array}
     */
    start(world_width, world_height) {
        const ret = wasm.sessionmanager_start(this.__wbg_ptr, world_width, world_height);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * @param {number} call_id
     * @param {string} payload_json
     * @returns {Uint8Array}
     */
    submit_high_scores_result(call_id, payload_json) {
        const ptr0 = passStringToWasm0(payload_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.sessionmanager_submit_high_scores_result(this.__wbg_ptr, call_id, ptr0, len0);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        var v2 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v2;
    }
    /**
     * @param {number} call_id
     * @returns {Uint8Array}
     */
    submit_user_connection_projected_result(call_id) {
        const ret = wasm.sessionmanager_submit_user_connection_projected_result(this.__wbg_ptr, call_id);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * Poll the supervisor and return a flat
     * `[sid0, code0, sid1, code1, …]` `Vec<u32>` of decisions, sorted
     * by scheduler id (matches `Supervisor::poll`'s sort).  The TS
     * driver in `RuntimeHost.ts` decodes pairwise and acts on each
     * `(sid, code)` using the constants exported by the scheduler
     * module (`ACTION_CODE_HEALTHY = 0`, `_RESPAWN = 1`, `_FORGET = 2`).
     *
     * `now_ms` is the TS clock at the time of poll — must match the
     * clock the dispatcher passes to `dispatch_behaviors`
     * (`performance.now()` in the browser).  The Worker heartbeats
     * recorded by Slice 2's piggyback ride the same clock through
     * the batch envelope, so cross-process comparisons are
     * consistent.
     *
     * Flat `Vec<u32>` chosen over a JSON or serde-msgpack return
     * because the poll cadence (~10 Hz) × small payload (typically
     * 2-10 schedulers) makes serde overhead the dominant cost; the
     * flat layout is two memory writes per decision and TS unpacks
     * in a single for-loop.
     * @param {number} now_ms
     * @returns {Uint32Array}
     */
    supervisor_poll(now_ms) {
        const ret = wasm.sessionmanager_supervisor_poll(this.__wbg_ptr, now_ms);
        var v1 = getArrayU32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * Re-aim every router entry pointing at the
     * old scheduler to point at the new one.  Called by the respawn
     * driver after terminating a wedged Worker and spawning a fresh
     * one with the same `SchedulerInit` (which deterministically
     * re-creates agents at the same ids via the cached
     * `worker_init_payload`).  Returns the number of router entries
     * rewritten.
     *
     * `old == new` is a no-op (the router treats it as such); the
     * counter still returns 0 so callers can log "rebound N
     * placements" without an extra branch.
     * @param {number} old_sid
     * @param {number} new_sid
     * @returns {number}
     */
    supervisor_rebind(old_sid, new_sid) {
        const ret = wasm.sessionmanager_supervisor_rebind(this.__wbg_ptr, old_sid, new_sid);
        return ret >>> 0;
    }
    /**
     * Drop the supervisor's bookkeeping for a
     * scheduler.  TS driver calls this after acting on a `Forget`
     * decision, or after a successful `Respawn` to clear the old
     * scheduler id (the fresh one will be auto-tracked on its first
     * heartbeat per Slice 2's piggyback semantics).
     * @param {number} sid
     */
    supervisor_untrack(sid) {
        wasm.sessionmanager_supervisor_untrack(this.__wbg_ptr, sid);
    }
    /**
     * @param {number} agent_id
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @param {number} vx
     * @param {number} vy
     * @param {number} vz
     * @param {number} heading
     * @param {number} w
     * @param {number} h
     * @param {string} kind
     * @param {string} owner_id
     * @param {string} image_name
     * @param {string} presentation_json
     * @param {boolean} is_visible
     * @param {boolean} is_camera
     * @param {boolean} is_solid
     * @returns {Uint8Array}
     */
    sync_agent_state(agent_id, x, y, z, vx, vy, vz, heading, w, h, kind, owner_id, image_name, presentation_json, is_visible, is_camera, is_solid) {
        const ptr0 = passStringToWasm0(kind, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(owner_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(image_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ptr3 = passStringToWasm0(presentation_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len3 = WASM_VECTOR_LEN;
        const ret = wasm.sessionmanager_sync_agent_state(this.__wbg_ptr, agent_id, x, y, z, vx, vy, vz, heading, w, h, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, is_visible, is_camera, is_solid);
        var v5 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v5;
    }
    /**
     * @param {number} agent_id
     * @param {string} text
     * @param {string} text_color
     * @param {string} background_color
     * @param {string} font
     */
    sync_agent_text(agent_id, text, text_color, background_color, font) {
        const ptr0 = passStringToWasm0(text, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(text_color, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(background_color, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ptr3 = passStringToWasm0(font, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len3 = WASM_VECTOR_LEN;
        wasm.sessionmanager_sync_agent_text(this.__wbg_ptr, agent_id, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3);
    }
    /**
     * BSP split: run post-behavior steps (camera, scene buffer). Returns outbound messages.
     * @returns {Uint8Array}
     */
    tick_post_behaviors() {
        const ret = wasm.sessionmanager_tick_post_behaviors(this.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * BSP split: run pre-behavior steps (actor model, app exec). Returns outbound messages.
     * @param {number} now_ms
     * @returns {Uint8Array}
     */
    tick_pre_behaviors(now_ms) {
        const ret = wasm.sessionmanager_tick_pre_behaviors(this.__wbg_ptr, now_ms);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * @param {number} agent_id
     * @param {number} angle
     * @returns {Uint8Array}
     */
    update_agent_target_angle(agent_id, angle) {
        const ret = wasm.sessionmanager_update_agent_target_angle(this.__wbg_ptr, agent_id, angle);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
}
if (Symbol.dispose) SessionManager.prototype[Symbol.dispose] = SessionManager.prototype.free;

/**
 * 3D vector with f64 components, exposed to JavaScript via wasm-bindgen.
 *
 * Used throughout the engine for positions, velocities, and sizes.
 * The z component supports depth layering (draw order) and 3D perspective.
 */
export class Vector {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Vector.prototype);
        obj.__wbg_ptr = ptr;
        VectorFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        VectorFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_vector_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get x() {
        const ret = wasm.__wbg_get_vector_x(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get y() {
        const ret = wasm.__wbg_get_vector_y(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get z() {
        const ret = wasm.__wbg_get_vector_z(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set x(arg0) {
        wasm.__wbg_set_vector_x(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set y(arg0) {
        wasm.__wbg_set_vector_y(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set z(arg0) {
        wasm.__wbg_set_vector_z(this.__wbg_ptr, arg0);
    }
    /**
     * Absolute value of each component.
     */
    abs() {
        wasm.vector_abs(this.__wbg_ptr);
    }
    /**
     * In-place addition.
     * @param {Vector} other
     */
    add(other) {
        _assertClass(other, Vector);
        wasm.vector_add(this.__wbg_ptr, other.__wbg_ptr);
    }
    /**
     * Adjust magnitude to `target_size` while preserving direction.
     * @param {number} target_size
     */
    adjust_to_size(target_size) {
        wasm.vector_adjust_to_size(this.__wbg_ptr, target_size);
    }
    /**
     * Angle (radians) between this vector and `other`.
     * @param {Vector} other
     * @returns {number}
     */
    angle(other) {
        _assertClass(other, Vector);
        const ret = wasm.vector_angle(this.__wbg_ptr, other.__wbg_ptr);
        return ret;
    }
    /**
     * Copy components from another Vector into this one.
     * @param {Vector} other
     */
    copy(other) {
        _assertClass(other, Vector);
        wasm.vector_copy(this.__wbg_ptr, other.__wbg_ptr);
    }
    /**
     * Cross product with another vector (returns a new vector).
     * @param {Vector} other
     * @returns {Vector}
     */
    cross_product(other) {
        _assertClass(other, Vector);
        const ret = wasm.vector_cross_product(this.__wbg_ptr, other.__wbg_ptr);
        return Vector.__wrap(ret);
    }
    /**
     * Euclidean distance to another vector.
     * @param {Vector} other
     * @returns {number}
     */
    distance(other) {
        _assertClass(other, Vector);
        const ret = wasm.vector_distance(this.__wbg_ptr, other.__wbg_ptr);
        return ret;
    }
    /**
     * Divide all components by a scalar (guards against divide-by-zero).
     * @param {number} value
     */
    divide_by_scalar(value) {
        wasm.vector_divide_by_scalar(this.__wbg_ptr, value);
    }
    /**
     * Dot product with another vector.
     * @param {Vector} other
     * @returns {number}
     */
    dot_product(other) {
        _assertClass(other, Vector);
        const ret = wasm.vector_dot_product(this.__wbg_ptr, other.__wbg_ptr);
        return ret;
    }
    /**
     * Equality check.
     * @param {Vector} other
     * @returns {boolean}
     */
    equal(other) {
        _assertClass(other, Vector);
        const ret = wasm.vector_equal(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * 2D equality (ignores Z).
     * @param {Vector} other
     * @returns {boolean}
     */
    equal_2d(other) {
        _assertClass(other, Vector);
        const ret = wasm.vector_equal_2d(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Negate X.
     */
    flip_x() {
        wasm.vector_flip_x(this.__wbg_ptr);
    }
    /**
     * Negate Y.
     */
    flip_y() {
        wasm.vector_flip_y(this.__wbg_ptr);
    }
    /**
     * Negate Z.
     */
    flip_z() {
        wasm.vector_flip_z(this.__wbg_ptr);
    }
    /**
     * Angle of the XY projection from the positive X axis.
     * @returns {number}
     */
    get_angle() {
        const ret = wasm.vector_get_angle(this.__wbg_ptr);
        return ret;
    }
    /**
     * Negate all components (reverse direction).
     */
    invert() {
        wasm.vector_invert(this.__wbg_ptr);
    }
    /**
     * Scale all components by a scalar.
     * @param {number} value
     */
    multiply_by_scalar(value) {
        wasm.vector_multiply_by_scalar(this.__wbg_ptr, value);
    }
    /**
     * Create a new Vector. All components default to 0.
     * @param {number} x
     * @param {number} y
     * @param {number} z
     */
    constructor(x, y, z) {
        const ret = wasm.vector_new(x, y, z);
        this.__wbg_ptr = ret >>> 0;
        VectorFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * Normalise to unit length; no-op if already zero-length.
     */
    normalize() {
        wasm.vector_normalize(this.__wbg_ptr);
    }
    /**
     * Zero Z (project onto XY plane).
     */
    project_over_xy() {
        wasm.vector_project_over_xy(this.__wbg_ptr);
    }
    /**
     * Zero Y (project onto XZ plane).
     */
    project_over_xz() {
        wasm.vector_project_over_xz(this.__wbg_ptr);
    }
    /**
     * Zero X (project onto YZ plane).
     */
    project_over_yz() {
        wasm.vector_project_over_yz(this.__wbg_ptr);
    }
    /**
     * Round all components to the nearest integer.
     */
    round() {
        wasm.vector_round(this.__wbg_ptr);
    }
    /**
     * Return a new vector scaled by a scalar.
     * @param {number} value
     * @returns {Vector}
     */
    scaled(value) {
        const ret = wasm.vector_scaled(this.__wbg_ptr, value);
        return Vector.__wrap(ret);
    }
    /**
     * Set all three components in one call, returning `self` for chaining.
     * @param {number} x
     * @param {number} y
     * @param {number} z
     */
    set(x, y, z) {
        wasm.vector_set(this.__wbg_ptr, x, y, z);
    }
    /**
     * Set from polar coordinates (angle in radians, magnitude).
     * @param {number} angle
     * @param {number} size
     */
    set_from_angle_and_size(angle, size) {
        wasm.vector_set_from_angle_and_size(this.__wbg_ptr, angle, size);
    }
    /**
     * Euclidean length of this vector.
     * @returns {number}
     */
    size() {
        const ret = wasm.vector_size(this.__wbg_ptr);
        return ret;
    }
    /**
     * In-place subtraction.
     * @param {Vector} other
     */
    subtract(other) {
        _assertClass(other, Vector);
        wasm.vector_subtract(this.__wbg_ptr, other.__wbg_ptr);
    }
    /**
     * Zero the z component (project onto XY plane).
     */
    to_2d() {
        wasm.vector_to_2d(this.__wbg_ptr);
    }
    /**
     * Absolute difference on the X axis.
     * @param {Vector} other
     * @returns {number}
     */
    x_distance(other) {
        _assertClass(other, Vector);
        const ret = wasm.vector_x_distance(this.__wbg_ptr, other.__wbg_ptr);
        return ret;
    }
    /**
     * In-place rotation around the X-axis (pitch).
     *
     * Applies the standard Rx rotation matrix:
     *   y' =  y·cos(θ) − z·sin(θ)
     *   z' =  y·sin(θ) + z·cos(θ)
     * x is unchanged.
     *
     * Reference: Rotation matrix — basic 3D rotations,
     * https://en.wikipedia.org/wiki/Rotation_matrix#Basic_3D_rotations
     * @param {number} angle
     */
    x_rotate(angle) {
        wasm.vector_x_rotate(this.__wbg_ptr, angle);
    }
    /**
     * Absolute difference on the Y axis.
     * @param {Vector} other
     * @returns {number}
     */
    y_distance(other) {
        _assertClass(other, Vector);
        const ret = wasm.vector_y_distance(this.__wbg_ptr, other.__wbg_ptr);
        return ret;
    }
    /**
     * In-place rotation around the Y-axis (yaw).
     *
     * Applies the standard Ry rotation matrix:
     *   x' =  x·cos(θ) + z·sin(θ)
     *   z' = −x·sin(θ) + z·cos(θ)
     * y is unchanged.
     *
     * Reference: Rotation matrix — basic 3D rotations,
     * https://en.wikipedia.org/wiki/Rotation_matrix#Basic_3D_rotations
     * @param {number} angle
     */
    y_rotate(angle) {
        wasm.vector_y_rotate(this.__wbg_ptr, angle);
    }
    /**
     * Absolute difference on the Z axis.
     * @param {Vector} other
     * @returns {number}
     */
    z_distance(other) {
        _assertClass(other, Vector);
        const ret = wasm.vector_z_distance(this.__wbg_ptr, other.__wbg_ptr);
        return ret;
    }
    /**
     * In-place Z-axis rotation (roll).
     *
     * Applies the standard Rz rotation matrix:
     *   x' = x·cos(θ) − y·sin(θ)
     *   y' = x·sin(θ) + y·cos(θ)
     * z is unchanged.
     *
     * Reference: Rotation matrix — basic 3D rotations,
     * https://en.wikipedia.org/wiki/Rotation_matrix#Basic_3D_rotations
     * @param {number} angle
     */
    z_rotate(angle) {
        wasm.vector_z_rotate(this.__wbg_ptr, angle);
    }
}
if (Symbol.dispose) Vector.prototype[Symbol.dispose] = Vector.prototype.free;

/**
 * r" Auto-generated by `#[brainiac_app]` — returns JSON metadata for the
 * r" TS bootstrap to read (title, description, icon).
 * @returns {string}
 */
export function __brainiac_app_metadata_z32app() {
    let deferred1_0;
    let deferred1_1;
    try {
        const ret = wasm.__brainiac_app_metadata_z32app();
        deferred1_0 = ret[0];
        deferred1_1 = ret[1];
        return getStringFromWasm0(ret[0], ret[1]);
    } finally {
        wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
}

/**
 * r" Auto-generated by `#[brainiac_app]` — returns JSON metadata for the
 * r" TS bootstrap to read (title, description, icon).
 * @returns {string}
 */
export function __brainiac_app_metadata_z32menuapp() {
    let deferred1_0;
    let deferred1_1;
    try {
        const ret = wasm.__brainiac_app_metadata_z32menuapp();
        deferred1_0 = ret[0];
        deferred1_1 = ret[1];
        return getStringFromWasm0(ret[0], ret[1]);
    } finally {
        wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
}

/**
 * r" Auto-generated by `#[brainiac_app]` — initializes the engine and
 * r" registers this app with the app registry at WASM startup.
 */
export function __brainiac_register_z32app() {
    wasm.__brainiac_register_z32app();
}

/**
 * r" Auto-generated by `#[brainiac_app]` — initializes the engine and
 * r" registers this app with the app registry at WASM startup.
 */
export function __brainiac_register_z32menuapp() {
    wasm.__brainiac_register_z32menuapp();
}

/**
 * Build JSON metadata for an app.  Called by the `#[brainiac_app]` macro's
 * generated `__brainiac_app_metadata_*` function so the TS bootstrap can
 * read title, description, and icon before mounting the app.
 * @param {string} name
 * @param {string} title
 * @param {string} description
 * @param {string | null} [icon]
 * @returns {string}
 */
export function app_metadata_json(name, title, description, icon) {
    let deferred5_0;
    let deferred5_1;
    try {
        const ptr0 = passStringToWasm0(name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(title, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(description, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        var ptr3 = isLikeNone(icon) ? 0 : passStringToWasm0(icon, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len3 = WASM_VECTOR_LEN;
        const ret = wasm.app_metadata_json(ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3);
        deferred5_0 = ret[0];
        deferred5_1 = ret[1];
        return getStringFromWasm0(ret[0], ret[1]);
    } finally {
        wasm.__wbindgen_free(deferred5_0, deferred5_1, 1);
    }
}

/**
 * Initialize the global logger.
 * @param {string | null} [level]
 */
export function init_logging(level) {
    var ptr0 = isLikeNone(level) ? 0 : passStringToWasm0(level, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.init_logging(ptr0, len0);
}

/**
 * Resolve startup configuration from a raw config JSON string.
 *
 * Replaces the TS-side `BECommonDefinitions.start()` logic.
 * Accepts the contents of `config.json` and returns a JSON object
 * with all resolved values: ports, addresses, world dimensions,
 * and Z-ordering constants.  No decisions happen in TS.
 * @param {string} json_config
 * @returns {string}
 */
export function startup_config(json_config) {
    let deferred2_0;
    let deferred2_1;
    try {
        const ptr0 = passStringToWasm0(json_config, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.startup_config(ptr0, len0);
        deferred2_0 = ret[0];
        deferred2_1 = ret[1];
        return getStringFromWasm0(ret[0], ret[1]);
    } finally {
        wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
    }
}

/**
 * Return the WASM build timestamp for version tracking.
 * Embedded at compile time so stale WASM is immediately detectable.
 * @returns {string}
 */
export function wasm_build_version() {
    let deferred1_0;
    let deferred1_1;
    try {
        const ret = wasm.wasm_build_version();
        deferred1_0 = ret[0];
        deferred1_1 = ret[1];
        return getStringFromWasm0(ret[0], ret[1]);
    } finally {
        wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
}

/**
 * Single `#[wasm_bindgen(start)]` entry point for the z32-core WASM binary.
 * Both `z32-menu` and `z32` apps are registered here so the multi-world
 * bootstrap can mount either by name via `mount_app_by_name`.
 */
export function z32_core_start() {
    wasm.z32_core_start();
}

function __wbg_get_imports() {
    const import0 = {
        __proto__: null,
        __wbg___wbindgen_throw_5549492daedad139: function(arg0, arg1) {
            throw new Error(getStringFromWasm0(arg0, arg1));
        },
        __wbg_error_259c2e4a1ced388a: function(arg0, arg1) {
            console.error(getStringFromWasm0(arg0, arg1));
        },
        __wbg_error_a6fa202b58aa1cd3: function(arg0, arg1) {
            let deferred0_0;
            let deferred0_1;
            try {
                deferred0_0 = arg0;
                deferred0_1 = arg1;
                console.error(getStringFromWasm0(arg0, arg1));
            } finally {
                wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
            }
        },
        __wbg_get_unchecked_7c6bbabf5b0b1fbf: function(arg0, arg1) {
            const ret = arg0[arg1 >>> 0];
            return ret;
        },
        __wbg_instanceof_SharedArrayBuffer_126fabbc55035482: function(arg0) {
            let result;
            try {
                result = arg0 instanceof SharedArrayBuffer;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_length_fae3e439140f48a4: function(arg0) {
            const ret = arg0.length;
            return ret;
        },
        __wbg_log_45257b26edc514ea: function(arg0, arg1) {
            console.log(getStringFromWasm0(arg0, arg1));
        },
        __wbg_log_608a220122479bac: function(arg0, arg1) {
            console.log(getStringFromWasm0(arg0, arg1));
        },
        __wbg_new_227d7c05414eb861: function() {
            const ret = new Error();
            return ret;
        },
        __wbg_new_with_length_7a3e5757e0797ecb: function(arg0) {
            const ret = new Array(arg0 >>> 0);
            return ret;
        },
        __wbg_set_4702dfa37c77f492: function(arg0, arg1, arg2) {
            arg0[arg1 >>> 0] = arg2;
        },
        __wbg_stack_3b0d974bbf31e44f: function(arg0, arg1) {
            const ret = arg1.stack;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_warn_86ef03db8cfb4dd4: function(arg0) {
            console.warn(arg0);
        },
        __wbindgen_cast_0000000000000001: function(arg0, arg1) {
            // Cast intrinsic for `Ref(String) -> Externref`.
            const ret = getStringFromWasm0(arg0, arg1);
            return ret;
        },
        __wbindgen_init_externref_table: function() {
            const table = wasm.__wbindgen_externrefs;
            const offset = table.grow(4);
            table.set(0, undefined);
            table.set(offset + 0, undefined);
            table.set(offset + 1, null);
            table.set(offset + 2, true);
            table.set(offset + 3, false);
        },
    };
    return {
        __proto__: null,
        "./z32_core_bg.js": import0,
    };
}

const SchedulerWorkerFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_schedulerworker_free(ptr >>> 0, 1));
const SessionManagerFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_sessionmanager_free(ptr >>> 0, 1));
const VectorFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_vector_free(ptr >>> 0, 1));

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
}

function getArrayU32FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint32ArrayMemory0().subarray(ptr / 4, ptr / 4 + len);
}

function getArrayU8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}

let cachedDataViewMemory0 = null;
function getDataViewMemory0() {
    if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || (cachedDataViewMemory0.buffer.detached === undefined && cachedDataViewMemory0.buffer !== wasm.memory.buffer)) {
        cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
    }
    return cachedDataViewMemory0;
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return decodeText(ptr, len);
}

let cachedUint32ArrayMemory0 = null;
function getUint32ArrayMemory0() {
    if (cachedUint32ArrayMemory0 === null || cachedUint32ArrayMemory0.byteLength === 0) {
        cachedUint32ArrayMemory0 = new Uint32Array(wasm.memory.buffer);
    }
    return cachedUint32ArrayMemory0;
}

let cachedUint8ArrayMemory0 = null;
function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

function passArray8ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 1, 1) >>> 0;
    getUint8ArrayMemory0().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function passStringToWasm0(arg, malloc, realloc) {
    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8ArrayMemory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8ArrayMemory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }
    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
        const ret = cachedTextEncoder.encodeInto(arg, view);

        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

function takeFromExternrefTable0(idx) {
    const value = wasm.__wbindgen_externrefs.get(idx);
    wasm.__externref_table_dealloc(idx);
    return value;
}

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });
cachedTextDecoder.decode();
const MAX_SAFARI_DECODE_BYTES = 2146435072;
let numBytesDecoded = 0;
function decodeText(ptr, len) {
    numBytesDecoded += len;
    if (numBytesDecoded >= MAX_SAFARI_DECODE_BYTES) {
        cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });
        cachedTextDecoder.decode();
        numBytesDecoded = len;
    }
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

const cachedTextEncoder = new TextEncoder();

if (!('encodeInto' in cachedTextEncoder)) {
    cachedTextEncoder.encodeInto = function (arg, view) {
        const buf = cachedTextEncoder.encode(arg);
        view.set(buf);
        return {
            read: arg.length,
            written: buf.length
        };
    };
}

let WASM_VECTOR_LEN = 0;

let wasmModule, wasm;
function __wbg_finalize_init(instance, module) {
    wasm = instance.exports;
    wasmModule = module;
    cachedDataViewMemory0 = null;
    cachedUint32ArrayMemory0 = null;
    cachedUint8ArrayMemory0 = null;
    wasm.__wbindgen_start();
    return wasm;
}

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);
            } catch (e) {
                const validResponse = module.ok && expectedResponseType(module.type);

                if (validResponse && module.headers.get('Content-Type') !== 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else { throw e; }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);
    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };
        } else {
            return instance;
        }
    }

    function expectedResponseType(type) {
        switch (type) {
            case 'basic': case 'cors': case 'default': return true;
        }
        return false;
    }
}

function initSync(module) {
    if (wasm !== undefined) return wasm;


    if (module !== undefined) {
        if (Object.getPrototypeOf(module) === Object.prototype) {
            ({module} = module)
        } else {
            console.warn('using deprecated parameters for `initSync()`; pass a single object instead')
        }
    }

    const imports = __wbg_get_imports();
    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }
    const instance = new WebAssembly.Instance(module, imports);
    return __wbg_finalize_init(instance, module);
}

async function __wbg_init(module_or_path) {
    if (wasm !== undefined) return wasm;


    if (module_or_path !== undefined) {
        if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
            ({module_or_path} = module_or_path)
        } else {
            console.warn('using deprecated parameters for the initialization function; pass a single object instead')
        }
    }

    if (module_or_path === undefined) {
        module_or_path = new URL('z32_core_bg.wasm', import.meta.url);
    }
    const imports = __wbg_get_imports();

    if (typeof module_or_path === 'string' || (typeof Request === 'function' && module_or_path instanceof Request) || (typeof URL === 'function' && module_or_path instanceof URL)) {
        module_or_path = fetch(module_or_path);
    }

    const { instance, module } = await __wbg_load(await module_or_path, imports);

    return __wbg_finalize_init(instance, module);
}

export { initSync, __wbg_init as default };

(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function t(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(s){if(s.ep)return;s.ep=!0;const n=t(s);fetch(s.href,n)}})();function ms(a,e){const t=a[e];return typeof t!="function"?null:t}function bs(a){return typeof a=="object"&&a!==null&&"images"in a&&Array.isArray(a.images)}const vs="modulepreload",ys=function(a,e){return new URL(a,e).href},ur={},oe=function(e,t,r){let s=Promise.resolve();if(t&&t.length>0){const i=document.getElementsByTagName("link"),l=document.querySelector("meta[property=csp-nonce]"),o=l?.nonce||l?.getAttribute("nonce");s=Promise.allSettled(t.map(c=>{if(c=ys(c,r),c in ur)return;ur[c]=!0;const d=c.endsWith(".css"),u=d?'[rel="stylesheet"]':"";if(!!r)for(let g=i.length-1;g>=0;g--){const f=i[g];if(f.href===c&&(!d||f.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${c}"]${u}`))return;const h=document.createElement("link");if(h.rel=d?"stylesheet":vs,d||(h.as="script"),h.crossOrigin="",h.href=c,o&&h.setAttribute("nonce",o),document.head.appendChild(h),d)return new Promise((g,f)=>{h.addEventListener("load",g),h.addEventListener("error",()=>f(new Error(`Unable to preload CSS for ${c}`)))})}))}function n(i){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=i,window.dispatchEvent(l),!l.defaultPrevented)throw i}return s.then(i=>{for(const l of i||[])l.status==="rejected"&&n(l.reason);return e().catch(n)})};class y{static disableAllVerifications=!1;static assert=(e,t="Error")=>{if(!y.disableAllVerifications){if(e!==0&&(!e||typeof e>"u"))throw new Error("Test failed: "+t);return!0}};static assertHasProperties=(e,t,r)=>{t.forEach(s=>{y.hasProperty(e,s,r)})};static hasProperty=(e,t,r="Property not found")=>{y.assert(e[t],r)};static assertIsEqual=(e,t,r="Elements should be equal")=>{y.assert(e===t,r)};static assertIsNotEqual=(e,t,r="Error: should not be equal")=>{y.assert(e!==t,r)};static assertIsValidString=(e,t,r="Error: invalid string")=>{y.assertIsString(e,"Test Error: string to test not found"),y.assertIsArray(t,"Test Error: array of valid strings not found"),y.assert(t.includes(e),r)};static assertIsFunction=(e,t="Error: expecting a function")=>{y.assert(typeof e=="function",t)};static assertIsObject=(e,t="Error: expecting an object")=>{y.assert(typeof e=="object",t)};static assertIsOptionalFunction=(e,t="Error: expecting a(n optional) function")=>{e&&y.assert(typeof e=="function",t)};static assertIsNumber=(e,t="Error: expecting a number")=>{y.assert(typeof e=="number"&&!isNaN(parseFloat(e))&&isFinite(e),t)};static assertIsString=(e,t="Error: expecting a string")=>{y.assert(typeof e=="string",t)};static assertIsArray=(e,t="Error: expecting an array")=>{y.assert(Array.isArray(e),t)};static assertIsEmptyArray=(e,t="Error: array not empty")=>{y.assert(e.length===0,t)};static assertIsNotEmptyArray=(e,t="Error: array empty")=>{y.assert(e.length!==0,t)};static assertIsArrayOfNumbers=(e,t="Error: expecting an array of numbers")=>{y.disableAllVerifications||(y.assertIsArray(e,t),e.forEach(r=>y.assertIsNumber(r,t)))};static assertIsArrayOfObjects=(e,t="Error: expecting an array of objects")=>{y.disableAllVerifications||(y.assertIsArray(e,t),e.forEach(r=>y.assertIsObject(r,t)))};static assertIsLiteralString=(e,t="Error: expecting a literal string")=>{y.assert(typeof e=="string",t)};static assertValueIsInsideLimits=(e,t,r,s="Error: value out of limits")=>{y.assert(e>=t&&e<=r,s)};static assertIsTrue=(e,t="Error: should be true")=>{y.assert(typeof e=="boolean"&&e,t)};static assertIsFalse=(e,t="Error: should be false")=>{y.assert(typeof e=="boolean"&&!e,t)};static assertIsTruthy=(e,t="Error: should be truthy")=>{y.assert(e,t)};static assertIsFalsy=(e,t="Error: should be falsy")=>{y.assertIsTruthy(!e,t)};static assertIsEquivalent=(e,t,r="Error: should be the equivalent")=>{y.assert(e==t,r)};static assertIsNotEquivalent=(e,t,r="Error: should not be the equivalent")=>{y.assert(e!=t,r)};static assertIsUndefined=(e,t="Should be undefined")=>{y.assert(typeof e>"u",t)};static assertIsNotUndefined=(e,t="Should not be undefined")=>{y.assert(typeof e<"u",t)};static assertIsNull=(e,t="Should be null")=>{y.assert(e===null,t)};static assertIsNotNull=(e,t="Should not be null")=>{y.assert(e!==null,t)};static assertNotContains=(e,t,r="Container should not contain item")=>{typeof e=="string"?(y.assertIsString(e,"Expected string container"),y.assert(!e.includes(t),r)):Array.isArray(e)?(y.assertIsArray(e,"Expected array container"),y.assert(!e.includes(t),r)):y.assert(!1,"Expected string or array for not contains assertion")};static assertThrows=(e,t="Function should throw an error")=>{y.assertIsFunction(e,"Expected a function for throw test");let r=!1;try{e()}catch{r=!0}y.assert(r,t)};static assertDoesNotThrow=(e,t="Function should not throw an error")=>{y.assertIsFunction(e,"Expected a function for no-throw test");let r=!1,s=null;try{e()}catch(n){r=!0,s=n}y.assert(!r,t+(s?` (threw: ${s})`:""))};static assertGreaterThan=(e,t,r="Number should be greater than expected")=>{y.assertIsNumber(e,"Expected actual value to be a number"),y.assertIsNumber(t,"Expected expected value to be a number"),y.assert(e>t,r)};static assertLessThan=(e,t,r="Number should be less than expected")=>{y.assertIsNumber(e,"Expected actual value to be a number"),y.assertIsNumber(t,"Expected expected value to be a number"),y.assert(e<t,r)};static assertGreaterThanOrEqual=(e,t,r="Number should be greater than or equal to expected")=>{y.assertIsNumber(e,"Expected actual value to be a number"),y.assertIsNumber(t,"Expected expected value to be a number"),y.assert(e>=t,r)};static assertLessThanOrEqual=(e,t,r="Number should be less than or equal to expected")=>{y.assertIsNumber(e,"Expected actual value to be a number"),y.assertIsNumber(t,"Expected expected value to be a number"),y.assert(e<=t,r)};static assertInstanceOf=(e,t,r="Object should be instance of expected constructor")=>{y.assertIsFunction(t,"Expected constructor to be a function"),y.assert(e instanceof t,r)};static assertArraysEqual=(e,t,r="Arrays should be equal")=>{y.assertIsArray(e,"Expected actual to be an array"),y.assertIsArray(t,"Expected expected to be an array"),y.assertIsEqual(e.length,t.length,"Arrays should have same length");for(let s=0;s<e.length;s++)y.assertIsEqual(e[s],t[s],`Array elements at index ${s} should be equal`)};static assertObjectsEqual=(e,t,r="Objects should be equal")=>{y.assertIsObject(e,"Expected actual to be an object"),y.assertIsObject(t,"Expected expected to be an object");const s=Object.keys(e),n=Object.keys(t);y.assertIsEqual(s.length,n.length,r+": Objects should have the same number of keys");for(const i of n)y.assertHasProperty(e,i,r+`: Missing key "${i}" in actual object`),typeof e[i]=="object"&&e[i]!==null&&typeof t[i]=="object"&&t[i]!==null?Array.isArray(e[i])&&Array.isArray(t[i])?y.assertArraysEqual(e[i],t[i],r+`: Property "${i}" should be equal`):!Array.isArray(e[i])&&!Array.isArray(t[i])?y.assertObjectsEqual(e[i],t[i],r+`: Property "${i}" should be equal`):y.assert(!1,r+`: Property "${i}" type mismatch (array vs object)`):y.assertIsEqual(e[i],t[i],r+`: Property "${i}" should be equal (expected ${t[i]}, got ${e[i]})`)};static assertMatches=(e,t,r="String should match pattern")=>{y.assertIsString(e,"Expected string to test against pattern");const s=t instanceof RegExp?t:new RegExp(t);y.assert(s.test(e),r)};static assertNotMatches=(e,t,r="String should not match pattern")=>{y.assertIsString(e,"Expected string to test against pattern");const s=t instanceof RegExp?t:new RegExp(t);y.assert(!s.test(e),r)};static assertContains=(e,t,r="Container should contain item")=>{typeof e=="string"?(y.assertIsString(e,"Expected string container"),y.assert(e.includes(t),r)):Array.isArray(e)?(y.assertIsArray(e,"Expected array container"),y.assert(e.includes(t),r)):y.assert(!1,"Expected string or array for contains assertion")};static assertHasProperty=(e,t,r="Expected object to have property")=>{y.assertIsObject(e,"Expected an object for property check"),y.assertIsString(t,"Expected property name to be a string"),y.assert(e.hasOwnProperty(t)||t in e,r+` "${t}"`)};static assertHasLength=(e,t,r="Expected array to have specific length")=>{y.assertIsArray(e,"Expected an array for length check"),y.assertIsNumber(t,"Expected length to be a number"),y.assertIsEqual(e.length,t,r+` ${t}, but got ${e.length}`)};static assertIsType=(e,t,r="Expected value to be of specific type")=>{switch(t){case"string":y.assertIsString(e,r+` string, but got ${typeof e}`);break;case"number":y.assertIsNumber(e,r+` number, but got ${typeof e}`);break;case"object":y.assertIsObject(e,r+` object, but got ${typeof e}`);break;case"function":y.assertIsFunction(e,r+` function, but got ${typeof e}`);break;case"array":y.assertIsArray(e,r+` array, but got ${typeof e}`);break;case"boolean":y.assert(typeof e=="boolean",r+` boolean, but got ${typeof e}`);break;default:y.assert(!1,`Unknown type "${t}" for type assertion`)}};static assertThrowsWithMessage=(e,t,r="Function should throw an error")=>{y.assertIsFunction(e,"Expected a function for throw test");let s=!1,n=null;try{e()}catch(i){s=!0,n=i}if(y.assert(s,r),t){const i=n?.message||n;y.assert(i.includes(t),`Expected error message to contain "${t}", but got "${i}"`)}};static assertIsValidJSON=(e,t="Error: invalid JSON string")=>{try{JSON.parse(e)}catch(r){y.assert(!1,t+": "+r.message)}};static disable=()=>{let e=Object.getOwnPropertyNames(y);for(let t of e)typeof y[t]=="function"&&t.includes("assert")&&(y[t]=()=>{})}}class Re{static isPlaying(e){return!e.paused}static rewind(e){e.currentTime=0}static stop(e){e.pause(),e.currentTime=0}static playSound(e,t){Re.isPlaying(e)&&Re.rewind(e);function r(){t(),e.removeEventListener("ended",r)}t&&e.addEventListener("ended",r),e.play()}static playSoundLoop(e){e.addEventListener("ended",()=>{Re.rewind(e),e.play()},!1),e.play()}static clearAllEvents(e){Re.stop(e)}}const ws={buildType:"dev"},ye=(a,e)=>({x:a,y:e}),xs={images:[{newImageName:"whiteParticle.jpg",imageName:null,size:ye(30,30),effectsToApply:[{name:"RadialGradient",parameters:{startColor:"white",endColor:"black"}}]},{newImageName:"redParticle.jpg",imageName:null,size:ye(30,30),effectsToApply:[{name:"RadialGradient",parameters:{startColor:"red",endColor:"black"}}]},{newImageName:"greenParticle.jpg",imageName:null,size:ye(30,30),effectsToApply:[{name:"RadialGradient",parameters:{startColor:"green",endColor:"black"}}]},{newImageName:"blueParticle.jpg",imageName:null,size:ye(30,30),effectsToApply:[{name:"RadialGradient",parameters:{startColor:"blue",endColor:"black"}}]},{newImageName:"triangle.jpg",imageName:null,size:ye(100,100),opacity:.6,fillColor:"red",strokeColor:"yellow",effectsToApply:[{name:"Triangle",parameters:{}}]},{newImageName:"star.jpg",imageName:null,size:ye(100,100),fillColor:"grey",strokeColor:"grey",effectsToApply:[{name:"Star",parameters:{}}]},{newImageName:"circle.jpg",imageName:null,size:ye(100,100),fillColor:"red",strokeColor:"red",effectsToApply:[{name:"Circle",parameters:{}}]},{newImageName:"dotted_black_background.jpg",imageName:null,size:ye(1e3,1e3),fillColor:"grey",strokeColor:"white",effectsToApply:[{name:"DottedRectangle",parameters:{}}]}]},Hr={MIN_SCREEN_DIMENSION:900,CAMERA_Z_POSITION:0,MOUSE_Z_POSITION:1,TOP_AGENT_Z_POSITION:2,FOREGROUND_AGENT_Z_POSITION:3,INTERMEDIARY_AGENT_Z_POSITION:4,BACKGROUND_AGENT_Z_POSITION:5,WORLD_WIDTH:12e3,WORLD_HEIGHT:12e3,CAMERA_WIDTH:500,CAMERA_HEIGHT:500,BACK_BUTTON_IMAGE:"./be/media/images/button_close.png",MOUSE_POINTER_IMAGE:"./be/media/images/mouse_pointer.png",CONFIG_JSON:"./config/config.json",COMMON_RESOURCES:["./config/config.json"],COMMON_EFFECTS_DESCRIPTION:xs,MOUSE_DOWN_CHANGE_FACTOR:1.5,AGENT_SELECTABLE_SIZE_CHANGE_FACTOR:1.5,AGENT_PRESSABLE_SIZE_CHANGE_FACTOR:1.5,WEB_PORT:4e3,WEB_SOCKET_ADDRESS_IP:"localhost",WEB_SOCKET_ADDRESS:"http://localhost:4000",config:ws,start(a){if(this.config=a,a.buildType==="deploy"?(this.WEB_PORT=80,this.WEB_SOCKET_ADDRESS_IP="45.63.87.109"):(this.WEB_PORT=4e3,this.WEB_SOCKET_ADDRESS_IP="localhost"),Number.isFinite(a.webPort)&&(this.WEB_PORT=a.webPort),typeof a.webSocketAddressIP=="string"&&a.webSocketAddressIP.length>0&&(this.WEB_SOCKET_ADDRESS_IP=a.webSocketAddressIP),typeof a.webSocketAddress=="string"&&a.webSocketAddress.length>0){this.WEB_SOCKET_ADDRESS=a.webSocketAddress;return}this.WEB_SOCKET_ADDRESS=`http://${this.WEB_SOCKET_ADDRESS_IP}:${this.WEB_PORT}`}};var _s={};const Es=new Set(["dev","test"]);function Ss(){if(typeof window>"u"||!window.location)return!1;const a=window.location.hostname;return a==="localhost"||a==="127.0.0.1"||a==="[::1]"}function Cs(){const a=Hr.config?.buildType;return a?Es.has(a):typeof process<"u"&&_s?!1:Ss()}function q(...a){Cs()&&console.log(...a)}const Gr=8,Wr=17,qr=64,As=1,ks=2,Is=3,Ts=1024*1024;function Rs(a=Ts){if(!Number.isInteger(a)||a<=0)throw new Error(`createCompositorBuffers: sceneBufferBytes must be a positive integer, got ${a}`);const e=Gr+qr*Wr;return{inputRing:new SharedArrayBuffer(e),sceneBuffer:new SharedArrayBuffer(a)}}function xt(a,e,t,r){const s=new DataView(a),n=new Int32Array(a),i=Atomics.load(n,0),l=Gr+i%qr*Wr;s.setUint8(l,e),s.setFloat32(l+1,t,!0),s.setFloat32(l+5,r,!0),s.setFloat64(l+9,performance.now(),!0),Atomics.store(n,0,i+1)}new TextEncoder;const Ps=4096;function Vr(a,e,t){let r=e;const s=r+t,n=[];let i="";for(;r<s;){const l=a[r++];if(!(l&128))n.push(l);else if((l&224)===192){const o=a[r++]&63;n.push((l&31)<<6|o)}else if((l&240)===224){const o=a[r++]&63,c=a[r++]&63;n.push((l&31)<<12|o<<6|c)}else if((l&248)===240){const o=a[r++]&63,c=a[r++]&63,d=a[r++]&63;let u=(l&7)<<18|o<<12|c<<6|d;u>65535&&(u-=65536,n.push(u>>>10&1023|55296),u=56320|u&1023),n.push(u)}else n.push(l);n.length>=Ps&&(i+=String.fromCharCode(...n),n.length=0)}return n.length>0&&(i+=String.fromCharCode(...n)),i}const Ls=new TextDecoder,Ms=200;function zs(a,e,t){const r=a.subarray(e,e+t);return Ls.decode(r)}function Ds(a,e,t){return t>Ms?zs(a,e,t):Vr(a,e,t)}class at{type;data;constructor(e,t){this.type=e,this.data=t}}class Q extends Error{constructor(e){super(e);const t=Object.create(Q.prototype);Object.setPrototypeOf(this,t),Object.defineProperty(this,"name",{configurable:!0,enumerable:!1,value:Q.name})}}const Ge=4294967295;function Bs(a,e,t){const r=Math.floor(t/4294967296),s=t;a.setUint32(e,r),a.setUint32(e+4,s)}function Yr(a,e){const t=a.getInt32(e),r=a.getUint32(e+4);return t*4294967296+r}function Os(a,e){const t=a.getUint32(e),r=a.getUint32(e+4);return t*4294967296+r}const Fs=-1,$s=4294967296-1,Ns=17179869184-1;function Us({sec:a,nsec:e}){if(a>=0&&e>=0&&a<=Ns)if(e===0&&a<=$s){const t=new Uint8Array(4);return new DataView(t.buffer).setUint32(0,a),t}else{const t=a/4294967296,r=a&4294967295,s=new Uint8Array(8),n=new DataView(s.buffer);return n.setUint32(0,e<<2|t&3),n.setUint32(4,r),s}else{const t=new Uint8Array(12),r=new DataView(t.buffer);return r.setUint32(0,e),Bs(r,4,a),t}}function Hs(a){const e=a.getTime(),t=Math.floor(e/1e3),r=(e-t*1e3)*1e6,s=Math.floor(r/1e9);return{sec:t+s,nsec:r-s*1e9}}function Gs(a){if(a instanceof Date){const e=Hs(a);return Us(e)}else return null}function Ws(a){const e=new DataView(a.buffer,a.byteOffset,a.byteLength);switch(a.byteLength){case 4:return{sec:e.getUint32(0),nsec:0};case 8:{const t=e.getUint32(0),r=e.getUint32(4),s=(t&3)*4294967296+r,n=t>>>2;return{sec:s,nsec:n}}case 12:{const t=Yr(e,4),r=e.getUint32(0);return{sec:t,nsec:r}}default:throw new Q(`Unrecognized data size for timestamp (expected 4, 8, or 12): ${a.length}`)}}function qs(a){const e=Ws(a);return new Date(e.sec*1e3+e.nsec/1e6)}const Vs={type:Fs,encode:Gs,decode:qs};class Nt{static defaultCodec=new Nt;__brand;builtInEncoders=[];builtInDecoders=[];encoders=[];decoders=[];constructor(){this.register(Vs)}register({type:e,encode:t,decode:r}){if(e>=0)this.encoders[e]=t,this.decoders[e]=r;else{const s=-1-e;this.builtInEncoders[s]=t,this.builtInDecoders[s]=r}}tryToEncode(e,t){for(let r=0;r<this.builtInEncoders.length;r++){const s=this.builtInEncoders[r];if(s!=null){const n=s(e,t);if(n!=null){const i=-1-r;return new at(i,n)}}}for(let r=0;r<this.encoders.length;r++){const s=this.encoders[r];if(s!=null){const n=s(e,t);if(n!=null){const i=r;return new at(i,n)}}}return e instanceof at?e:null}decode(e,t,r){const s=t<0?this.builtInDecoders[-1-t]:this.decoders[t];return s?s(e,t,r):new at(t,e)}}function Ys(a){return a instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&a instanceof SharedArrayBuffer}function pr(a){return a instanceof Uint8Array?a:ArrayBuffer.isView(a)?new Uint8Array(a.buffer,a.byteOffset,a.byteLength):Ys(a)?new Uint8Array(a):Uint8Array.from(a)}function _t(a){return`${a<0?"-":""}0x${Math.abs(a).toString(16).padStart(2,"0")}`}const Xs=16,js=16;class Zs{hit=0;miss=0;caches;maxKeyLength;maxLengthPerKey;constructor(e=Xs,t=js){this.maxKeyLength=e,this.maxLengthPerKey=t,this.caches=[];for(let r=0;r<this.maxKeyLength;r++)this.caches.push([])}canBeCached(e){return e>0&&e<=this.maxKeyLength}find(e,t,r){const s=this.caches[r-1];e:for(const n of s){const i=n.bytes;for(let l=0;l<r;l++)if(i[l]!==e[t+l])continue e;return n.str}return null}store(e,t){const r=this.caches[e.length-1],s={bytes:e,str:t};r.length>=this.maxLengthPerKey?r[Math.random()*r.length|0]=s:r.push(s)}decode(e,t,r){const s=this.find(e,t,r);if(s!=null)return this.hit++,s;this.miss++;const n=Vr(e,t,r),i=Uint8Array.prototype.slice.call(e,t,t+r);return this.store(i,n),n}}const Mt="array",Ze="map_key",Xr="map_value",Js=a=>{if(typeof a=="string"||typeof a=="number")return a;throw new Q("The type of key must be string or number but "+typeof a)};class Ks{stack=[];stackHeadPosition=-1;get length(){return this.stackHeadPosition+1}top(){return this.stack[this.stackHeadPosition]}pushArrayState(e){const t=this.getUninitializedStateFromPool();t.type=Mt,t.position=0,t.size=e,t.array=new Array(e)}pushMapState(e){const t=this.getUninitializedStateFromPool();t.type=Ze,t.readCount=0,t.size=e,t.map={}}getUninitializedStateFromPool(){if(this.stackHeadPosition++,this.stackHeadPosition===this.stack.length){const e={type:void 0,size:0,array:void 0,position:0,readCount:0,map:void 0,key:null};this.stack.push(e)}return this.stack[this.stackHeadPosition]}release(e){if(this.stack[this.stackHeadPosition]!==e)throw new Error("Invalid stack state. Released state is not on top of the stack.");if(e.type===Mt){const r=e;r.size=0,r.array=void 0,r.position=0,r.type=void 0}if(e.type===Ze||e.type===Xr){const r=e;r.size=0,r.map=void 0,r.readCount=0,r.type=void 0}this.stackHeadPosition--}reset(){this.stack.length=0,this.stackHeadPosition=-1}}const We=-1,Ut=new DataView(new ArrayBuffer(0)),Qs=new Uint8Array(Ut.buffer);try{Ut.getInt8(0)}catch(a){if(!(a instanceof RangeError))throw new Error("This module is not supported in the current JavaScript engine because DataView does not throw RangeError on out-of-bounds access")}const gr=new RangeError("Insufficient data"),en=new Zs;class Ht{extensionCodec;context;useBigInt64;rawStrings;maxStrLength;maxBinLength;maxArrayLength;maxMapLength;maxExtLength;keyDecoder;mapKeyConverter;totalPos=0;pos=0;view=Ut;bytes=Qs;headByte=We;stack=new Ks;entered=!1;constructor(e){this.extensionCodec=e?.extensionCodec??Nt.defaultCodec,this.context=e?.context,this.useBigInt64=e?.useBigInt64??!1,this.rawStrings=e?.rawStrings??!1,this.maxStrLength=e?.maxStrLength??Ge,this.maxBinLength=e?.maxBinLength??Ge,this.maxArrayLength=e?.maxArrayLength??Ge,this.maxMapLength=e?.maxMapLength??Ge,this.maxExtLength=e?.maxExtLength??Ge,this.keyDecoder=e?.keyDecoder!==void 0?e.keyDecoder:en,this.mapKeyConverter=e?.mapKeyConverter??Js}clone(){return new Ht({extensionCodec:this.extensionCodec,context:this.context,useBigInt64:this.useBigInt64,rawStrings:this.rawStrings,maxStrLength:this.maxStrLength,maxBinLength:this.maxBinLength,maxArrayLength:this.maxArrayLength,maxMapLength:this.maxMapLength,maxExtLength:this.maxExtLength,keyDecoder:this.keyDecoder})}reinitializeState(){this.totalPos=0,this.headByte=We,this.stack.reset()}setBuffer(e){const t=pr(e);this.bytes=t,this.view=new DataView(t.buffer,t.byteOffset,t.byteLength),this.pos=0}appendBuffer(e){if(this.headByte===We&&!this.hasRemaining(1))this.setBuffer(e);else{const t=this.bytes.subarray(this.pos),r=pr(e),s=new Uint8Array(t.length+r.length);s.set(t),s.set(r,t.length),this.setBuffer(s)}}hasRemaining(e){return this.view.byteLength-this.pos>=e}createExtraByteError(e){const{view:t,pos:r}=this;return new RangeError(`Extra ${t.byteLength-r} of ${t.byteLength} byte(s) found at buffer[${e}]`)}decode(e){if(this.entered)return this.clone().decode(e);try{this.entered=!0,this.reinitializeState(),this.setBuffer(e);const t=this.doDecodeSync();if(this.hasRemaining(1))throw this.createExtraByteError(this.pos);return t}finally{this.entered=!1}}*decodeMulti(e){if(this.entered){yield*this.clone().decodeMulti(e);return}try{for(this.entered=!0,this.reinitializeState(),this.setBuffer(e);this.hasRemaining(1);)yield this.doDecodeSync()}finally{this.entered=!1}}async decodeAsync(e){if(this.entered)return this.clone().decodeAsync(e);try{this.entered=!0;let t=!1,r;for await(const l of e){if(t)throw this.entered=!1,this.createExtraByteError(this.totalPos);this.appendBuffer(l);try{r=this.doDecodeSync(),t=!0}catch(o){if(!(o instanceof RangeError))throw o}this.totalPos+=this.pos}if(t){if(this.hasRemaining(1))throw this.createExtraByteError(this.totalPos);return r}const{headByte:s,pos:n,totalPos:i}=this;throw new RangeError(`Insufficient data in parsing ${_t(s)} at ${i} (${n} in the current buffer)`)}finally{this.entered=!1}}decodeArrayStream(e){return this.decodeMultiAsync(e,!0)}decodeStream(e){return this.decodeMultiAsync(e,!1)}async*decodeMultiAsync(e,t){if(this.entered){yield*this.clone().decodeMultiAsync(e,t);return}try{this.entered=!0;let r=t,s=-1;for await(const n of e){if(t&&s===0)throw this.createExtraByteError(this.totalPos);this.appendBuffer(n),r&&(s=this.readArraySize(),r=!1,this.complete());try{for(;yield this.doDecodeSync(),--s!==0;);}catch(i){if(!(i instanceof RangeError))throw i}this.totalPos+=this.pos}}finally{this.entered=!1}}doDecodeSync(){e:for(;;){const e=this.readHeadByte();let t;if(e>=224)t=e-256;else if(e<192)if(e<128)t=e;else if(e<144){const s=e-128;if(s!==0){this.pushMapState(s),this.complete();continue e}else t={}}else if(e<160){const s=e-144;if(s!==0){this.pushArrayState(s),this.complete();continue e}else t=[]}else{const s=e-160;t=this.decodeString(s,0)}else if(e===192)t=null;else if(e===194)t=!1;else if(e===195)t=!0;else if(e===202)t=this.readF32();else if(e===203)t=this.readF64();else if(e===204)t=this.readU8();else if(e===205)t=this.readU16();else if(e===206)t=this.readU32();else if(e===207)this.useBigInt64?t=this.readU64AsBigInt():t=this.readU64();else if(e===208)t=this.readI8();else if(e===209)t=this.readI16();else if(e===210)t=this.readI32();else if(e===211)this.useBigInt64?t=this.readI64AsBigInt():t=this.readI64();else if(e===217){const s=this.lookU8();t=this.decodeString(s,1)}else if(e===218){const s=this.lookU16();t=this.decodeString(s,2)}else if(e===219){const s=this.lookU32();t=this.decodeString(s,4)}else if(e===220){const s=this.readU16();if(s!==0){this.pushArrayState(s),this.complete();continue e}else t=[]}else if(e===221){const s=this.readU32();if(s!==0){this.pushArrayState(s),this.complete();continue e}else t=[]}else if(e===222){const s=this.readU16();if(s!==0){this.pushMapState(s),this.complete();continue e}else t={}}else if(e===223){const s=this.readU32();if(s!==0){this.pushMapState(s),this.complete();continue e}else t={}}else if(e===196){const s=this.lookU8();t=this.decodeBinary(s,1)}else if(e===197){const s=this.lookU16();t=this.decodeBinary(s,2)}else if(e===198){const s=this.lookU32();t=this.decodeBinary(s,4)}else if(e===212)t=this.decodeExtension(1,0);else if(e===213)t=this.decodeExtension(2,0);else if(e===214)t=this.decodeExtension(4,0);else if(e===215)t=this.decodeExtension(8,0);else if(e===216)t=this.decodeExtension(16,0);else if(e===199){const s=this.lookU8();t=this.decodeExtension(s,1)}else if(e===200){const s=this.lookU16();t=this.decodeExtension(s,2)}else if(e===201){const s=this.lookU32();t=this.decodeExtension(s,4)}else throw new Q(`Unrecognized type byte: ${_t(e)}`);this.complete();const r=this.stack;for(;r.length>0;){const s=r.top();if(s.type===Mt)if(s.array[s.position]=t,s.position++,s.position===s.size)t=s.array,r.release(s);else continue e;else if(s.type===Ze){if(t==="__proto__")throw new Q("The key __proto__ is not allowed");s.key=this.mapKeyConverter(t),s.type=Xr;continue e}else if(s.map[s.key]=t,s.readCount++,s.readCount===s.size)t=s.map,r.release(s);else{s.key=null,s.type=Ze;continue e}}return t}}readHeadByte(){return this.headByte===We&&(this.headByte=this.readU8()),this.headByte}complete(){this.headByte=We}readArraySize(){const e=this.readHeadByte();switch(e){case 220:return this.readU16();case 221:return this.readU32();default:{if(e<160)return e-144;throw new Q(`Unrecognized array type byte: ${_t(e)}`)}}}pushMapState(e){if(e>this.maxMapLength)throw new Q(`Max length exceeded: map length (${e}) > maxMapLengthLength (${this.maxMapLength})`);this.stack.pushMapState(e)}pushArrayState(e){if(e>this.maxArrayLength)throw new Q(`Max length exceeded: array length (${e}) > maxArrayLength (${this.maxArrayLength})`);this.stack.pushArrayState(e)}decodeString(e,t){return!this.rawStrings||this.stateIsMapKey()?this.decodeUtf8String(e,t):this.decodeBinary(e,t)}decodeUtf8String(e,t){if(e>this.maxStrLength)throw new Q(`Max length exceeded: UTF-8 byte length (${e}) > maxStrLength (${this.maxStrLength})`);if(this.bytes.byteLength<this.pos+t+e)throw gr;const r=this.pos+t;let s;return this.stateIsMapKey()&&this.keyDecoder?.canBeCached(e)?s=this.keyDecoder.decode(this.bytes,r,e):s=Ds(this.bytes,r,e),this.pos+=t+e,s}stateIsMapKey(){return this.stack.length>0?this.stack.top().type===Ze:!1}decodeBinary(e,t){if(e>this.maxBinLength)throw new Q(`Max length exceeded: bin length (${e}) > maxBinLength (${this.maxBinLength})`);if(!this.hasRemaining(e+t))throw gr;const r=this.pos+t,s=this.bytes.subarray(r,r+e);return this.pos+=t+e,s}decodeExtension(e,t){if(e>this.maxExtLength)throw new Q(`Max length exceeded: ext length (${e}) > maxExtLength (${this.maxExtLength})`);const r=this.view.getInt8(this.pos+t),s=this.decodeBinary(e,t+1);return this.extensionCodec.decode(s,r,this.context)}lookU8(){return this.view.getUint8(this.pos)}lookU16(){return this.view.getUint16(this.pos)}lookU32(){return this.view.getUint32(this.pos)}readU8(){const e=this.view.getUint8(this.pos);return this.pos++,e}readI8(){const e=this.view.getInt8(this.pos);return this.pos++,e}readU16(){const e=this.view.getUint16(this.pos);return this.pos+=2,e}readI16(){const e=this.view.getInt16(this.pos);return this.pos+=2,e}readU32(){const e=this.view.getUint32(this.pos);return this.pos+=4,e}readI32(){const e=this.view.getInt32(this.pos);return this.pos+=4,e}readU64(){const e=Os(this.view,this.pos);return this.pos+=8,e}readI64(){const e=Yr(this.view,this.pos);return this.pos+=8,e}readU64AsBigInt(){const e=this.view.getBigUint64(this.pos);return this.pos+=8,e}readI64AsBigInt(){const e=this.view.getBigInt64(this.pos);return this.pos+=8,e}readF32(){const e=this.view.getFloat32(this.pos);return this.pos+=4,e}readF64(){const e=this.view.getFloat64(this.pos);return this.pos+=8,e}}function jr(a,e){return new Ht(e).decode(a)}const zt=1297237570,fr=2,ge=32,tn=16;var ce=(a=>(a[a.Camera=1]="Camera",a[a.Sprites=2]="Sprites",a[a.Edges=3]="Edges",a[a.DomPresentation=4]="DomPresentation",a[a.TextResources=5]="TextResources",a[a.ImageRegistry=6]="ImageRegistry",a[a.Effects=7]="Effects",a[a.Visuals=8]="Visuals",a[a.DomUiNode=10]="DomUiNode",a[a.Pills=11]="Pills",a[a.Shapes=12]="Shapes",a))(ce||{});const rn=48,ut=52,Zr=2,sn=34,nn=1,mr=8,br=32,vr=80,he=112,Jr=72,yr=2,Kr=4,pt=8,an=16,on=32,ln=256,cn=64,je=512;function Ae(a){if(a.byteLength<ge)throw new Error(`parseFrameBuffer: buffer too small (${a.byteLength} bytes, header is ${ge})`);const e=a.getUint32(0,!0);if(e!==zt)throw new Error(`parseFrameBuffer: bad magic 0x${e.toString(16)}, expected 0x${zt.toString(16)} ('BFRM')`);const t=a.getUint32(4,!0);if(t!==fr)throw new Error(`parseFrameBuffer: unsupported version ${t}, expected ${fr}`);const r=a.getUint32(8,!0),s=a.getUint32(16,!0),n=a.getUint32(20,!0),i=a.getUint32(24,!0);if(n!==ge)throw new Error(`parseFrameBuffer: section_table_offset ${n} must equal header size ${ge} (no header growth supported in v1)`);if(i>a.byteLength)throw new Error(`parseFrameBuffer: total_length ${i} exceeds buffer.byteLength ${a.byteLength}`);const l=new Map;for(let o=0;o<s;o++){const c=n+o*tn,d=a.getUint32(c,!0),u=a.getUint32(c+4,!0),p=a.getUint32(c+8,!0);if(u+p>i)throw new Error(`parseFrameBuffer: section ${o} (kind ${d}) extends past total_length`);l.set(d,{offset:u,length:p})}return{frameId:r,totalLength:i,sections:l,buffer:a}}function te(a,e){const t=a.sections.get(e);return!t||t.length===0?null:new DataView(a.buffer.buffer,a.buffer.byteOffset+t.offset,t.length)}function Me(a){const e=te(a,1);return!e||e.byteLength<rn?null:{centerX:e.getFloat32(0,!0),centerY:e.getFloat32(4,!0),centerZ:e.getFloat32(8,!0),viewportW:e.getFloat32(12,!0),viewportH:e.getFloat32(16,!0),roll:e.getFloat32(20,!0),focalLength:e.getFloat32(24,!0),pitch:e.getFloat32(32,!0),yaw:e.getFloat32(36,!0)}}function qe(a){const e=a.sections.get(2);return e?Math.floor(e.length/ut):0}function Et(a,e,t){const r=a.sections.get(2);if(!r)throw new Error("readSpriteEntry: SPRITES section missing");const s=r.offset+e*ut,n=a.buffer,i=t??{};return i.spriteId=n.getUint16(s,!0),i.flags=n.getUint8(s+Zr),i.x=n.getFloat32(s+4,!0),i.y=n.getFloat32(s+8,!0),i.w=n.getFloat32(s+12,!0),i.h=n.getFloat32(s+16,!0),i.rotation=n.getFloat32(s+20,!0),i.opacity=n.getFloat32(s+24,!0),i.worldZ=n.getFloat32(s+28,!0),i.zIndex=n.getInt16(s+32,!0),i.agentId=n.getUint16(s+sn,!0),i.quatX=n.getFloat32(s+36,!0),i.quatY=n.getFloat32(s+40,!0),i.quatZ=n.getFloat32(s+44,!0),i.quatW=n.getFloat32(s+48,!0),i}function wr(a){return te(a,10)}function dn(a,e,t){const r=a.sections.get(12);if(!r)throw new Error("readShapeEntry: SHAPES section missing");const s=r.offset+e*Jr,n=a.buffer,i=t??{};return i.agentId=n.getUint16(s+0,!0),i.shapeType=n.getUint16(s+2,!0),i.centerX=n.getFloat32(s+4,!0),i.centerY=n.getFloat32(s+8,!0),i.centerZ=n.getFloat32(s+12,!0),i.width=n.getFloat32(s+16,!0),i.height=n.getFloat32(s+20,!0),i.rotation=n.getFloat32(s+24,!0),i.opacity=n.getFloat32(s+28,!0),i.fillR=n.getFloat32(s+32,!0),i.fillG=n.getFloat32(s+36,!0),i.fillB=n.getFloat32(s+40,!0),i.fillA=n.getFloat32(s+44,!0),i.borderR=n.getFloat32(s+48,!0),i.borderG=n.getFloat32(s+52,!0),i.borderB=n.getFloat32(s+56,!0),i.borderA=n.getFloat32(s+60,!0),i.cornerRadius=n.getFloat32(s+64,!0),i.flags=n.getUint32(s+68,!0),i}function xr(a){const e=te(a,7);if(!e)return[];const t=new Uint8Array(e.buffer,e.byteOffset,e.byteLength),r=jr(t);return Array.isArray(r)?r:[]}class hn{worker=null;inputRing=null;sceneBuffer=null;sceneBufferView=null;_ready=!1;onDragConfirm=null;get ready(){return this._ready}async start(e={}){if(typeof SharedArrayBuffer>"u")throw new Error("CompositorBridge requires SharedArrayBuffer. Ensure the server sends Cross-Origin-Opener-Policy: same-origin and Cross-Origin-Embedder-Policy: require-corp headers.");const t=Rs(e.sceneBufferBytes);return this.inputRing=t.inputRing,this.sceneBuffer=t.sceneBuffer,this.sceneBufferView=new DataView(this.sceneBuffer),this.worker=new Worker(new URL(""+new URL("compositor-worker-0ZgdAIcO.js",import.meta.url).href,import.meta.url),{type:"module"}),new Promise(r=>{this.worker.onmessage=n=>{n.data.type==="ready"?(this._ready=!0,r()):n.data.type==="dragConfirm"&&this.onDragConfirm?.(n.data.agentId,n.data.worldX,n.data.worldY)};const s={type:"init",inputRing:this.inputRing,sceneBuffer:this.sceneBuffer};this.worker.postMessage(s)})}stop(){this.worker?.terminate(),this.worker=null,this._ready=!1}writeMouseDown(e,t){this.inputRing&&xt(this.inputRing,As,e,t)}writeMouseMove(e,t){this.inputRing&&xt(this.inputRing,ks,e,t)}writeMouseUp(e,t){this.inputRing&&xt(this.inputRing,Is,e,t)}getSceneBufferView(){if(!this.sceneBufferView||this.sceneBufferView.byteLength<ge||this.sceneBufferView.getUint32(0,!0)!==zt)return null;const t=this.sceneBufferView.getUint32(24,!0);return t===0||t>this.sceneBufferView.byteLength?null:new DataView(this.sceneBufferView.buffer,0,t)}sendCamera(e,t,r,s,n,i,l,o,c){if(!this.worker)return;const d={type:"setCamera",camCx:e,camCy:t,camW:r,camH:s,pitch:n,yaw:i,roll:l,canvasW:o,canvasH:c};this.worker.postMessage(d)}sendAuthorityScene(e){if(!this.worker)return;const t={type:"sceneFromAuthority",data:e};this.worker.postMessage(t,[e])}sendParticleSpawn(e){if(!this.worker)return;const t={type:"spawnParticles",descriptor:e};this.worker.postMessage(t)}sendScreenEffect(e){if(!this.worker)return;const t={type:"screenEffect",descriptor:e};this.worker.postMessage(t)}}class un{drivers=new Map;register(e,t){this.drivers.set(e,t)}dispatch(e,t){const r=this.drivers.get(e);return r===void 0?!1:(r(t),!0)}}const Dt={CANVAS_ID:"gameCanvas",LOADING_ANIMATION_ID:"loading_animation",LOADING_ANIMATION_CLASS_NAME:"centered",ANIMATION_INTERVAL:16,MOUSE_MOVE_PROPAGATION_LATENCY:16,MOUSE_DOWN_LATENCY:150};Object.freeze(Dt);class gt{static createCanvas(e,t){let r=document.createElement("canvas");return r.width=e,r.height=t,r}static createPieGraph(e,t,r){let s=gt.createCanvas(e,t),n=s.getContext("2d"),i=2*Math.PI/100,l=0,o=e/2,c=t/2;for(let d=0;d<r.length;d++){let u=r[d],p=i*u.percentage,h=l+p;n.beginPath(),n.moveTo(o,c),n.arc(o,c,Math.min(e,t)/2,l,h),n.lineTo(o,c),n.fillStyle=u.color,n.fill(),l=h}return s}static createPieGraphWithEvenlyDistributedColors(e,t,r){let s=100/r.length,n=r.map(i=>({color:i,percentage:s}));return gt.createPieGraph(e,t,n)}}class et{static randomInt(e){return Math.floor(Math.random()*e)}static randomFromIntervalInclusive(e,t){y.assert(Number.isInteger(e)&&Number.isInteger(t),"Random.randomFromIntervalInclusive error: expecting two integer values");let r,s,n;return s=Math.min(e,t),r=Math.max(e,t),n=r-s,Math.floor(Math.random()*(n+1)+s)}static randomFromInterval(e,t){let r,s,n;s=Math.min(e,t),r=Math.max(e,t),n=r-s;let i=Math.random()*n+s;return Number.isInteger(e)&&Number.isInteger(t)?Math.round(i):i}static occurrenceProbability(e){if(e<=0)return!1;if(e>=1)return!0;let t=1/e;return et.randomFromInterval(1,t)===1}}class tt{static sum=e=>e.reduce((t,r)=>t+r,0);static mean=e=>e.reduce((t,r)=>t+r,0)/e.length;static meanDifferenceTwoByTwo=e=>{if(e.length===0||e.length===1)throw"cannot calculate meanDifferenceTwoByTwo";let t=0;for(let r=1;r<e.length;r++)t+=e[r]-e[r-1];return t/(e.length-1)};static lastIndex=e=>e.length-1;static last=e=>e.length>=1?e[tt.lastIndex(e)]:"undefined";static first=e=>e.length>=1?e[0]:"undefined";static isLast=(e,t)=>t===this.last();static isFirst=(e,t)=>t===this.first();static flatten=(e,t=!0)=>{let r=t?[...e]:e;return r.concat.apply([],r)};static unflatten=(e,t,r=!0)=>{let s=r?JSON.parse(JSON.stringify(e)):e,n=[];for(;s.length>0;)n.push(s.splice(0,t));return n};static removeLast=e=>(e.splice(-1,1),e);static clone=(e,t)=>t?e.map(function(r){return t(r)}):e.map(r=>Array.isArray(r)||r.clone?r.clone():typeof r=="object"?Object.assign({},r):r);static choiceWithProbabilities=(e,t)=>{y.assertIsArray(t),y.assert(t.length===e.length,"Probabilities size must be equal to array size");let r=t.map(n=>Math.random()*n),s=tt.indexOfGreaterValue(r);return e[s]};static choice=e=>e[et.randomInt(e.length)];static indexChoice=e=>et.randomInt(e.length);static indexOfGreaterValue=e=>{let t=e[0],r=0;for(let s=1;s<e.length;s++)e[s]>t&&(t=e[s],r=s);return r};static range=function*(e,t){for(let r=e;r<t;++r)yield r}}function pn(a){return typeof a=="object"&&a!==null&&typeof a.clientX=="number"&&typeof a.clientY=="number"}function Qr(a){return typeof a=="object"&&a!==null&&"width"in a&&typeof a.width=="number"&&"height"in a&&typeof a.height=="number"}function Bt(a){return Qr(a)&&"getContext"in a&&typeof a.getContext=="function"}function gn(a){return typeof a=="object"&&a!==null&&"play"in a&&typeof a.play=="function"}function fn(a,e){if(!e)throw new Error("RadialGradient effect requires parameters.");const t=a.createRadialGradient(a.canvas.width/2,a.canvas.height/2,0,a.canvas.width/2,a.canvas.height/2,e.fillRect?Math.min(a.canvas.width,a.canvas.height):Math.min(a.canvas.width/2,a.canvas.height/2));t.addColorStop(0,e.startColor),t.addColorStop(1,e.endColor),e.combineOption&&(a.globalCompositeOperation=e.combineOption),e.fillRect?(a.fillStyle=t,a.fillRect(0,0,a.canvas.width,a.canvas.height)):(a.beginPath(),a.arc(a.canvas.width/2,a.canvas.height/2,Math.min(a.canvas.width/2,a.canvas.height/2),0,Math.PI*2),a.closePath(),a.fillStyle=t,a.strokeStyle="black",a.stroke(),a.fill())}function mn(a){const t=Math.min(a.canvas.width,a.canvas.height)/2-2;a.beginPath(),a.arc(a.canvas.width/2,a.canvas.height/2,t,0,2*Math.PI),a.closePath(),a.lineWidth=2}function bn(a){a.beginPath(),a.lineWidth=2,a.rect(0,0,a.canvas.width,a.canvas.height),a.fillStyle="black",a.strokeStyle="grey",a.lineWidth=1;for(let s=0;s<a.canvas.width;s=s+a.canvas.width/20)for(let n=0;n<a.canvas.height;n=n+a.canvas.height/20)a.rect(s,n,1,1);a.stroke()}function vn(a){a.beginPath(),a.rect(0,0,a.canvas.width,a.canvas.height),a.lineWidth=2}function yn(a){const s=a.canvas.width/4+7.5,n=a.canvas.height/2,i=30,l=a.canvas.height-30,o=a.canvas.width-30,c=a.canvas.height/2;a.beginPath(),a.lineWidth=2,a.strokeStyle="yellow",a.moveTo(30,30),a.lineTo(o,c),a.lineTo(i,l),a.lineTo(s,n),a.lineTo(30,30),a.fill(),a.stroke()}function wn(a){const t=(a.canvas.width+a.canvas.height)/2;a.beginPath(),a.rect(2,2,t-2*2,t-2*2),a.lineWidth=2}function xn(a){const t=a.canvas.width/2;a.beginPath(),a.lineWidth=2,a.strokeStyle="yellow",a.moveTo(t,10),a.lineTo(t+a.canvas.width/4,a.canvas.height-10),a.lineTo(10,a.canvas.height/3),a.lineTo(a.canvas.width-10,a.canvas.height/3),a.lineTo(t-a.canvas.width/4,a.canvas.height-10),a.lineTo(t,10),a.fill(),a.stroke()}function _n(a){a.beginPath(),a.moveTo(0,0),a.lineTo(0,a.canvas.height),a.lineTo(a.canvas.width,a.canvas.height/2),a.lineTo(0,0),a.lineWidth=2}function En(a,e){const{open:t,high:r,low:s,close:n,priceMin:i,priceMax:l}=e,o=a.canvas.width,c=a.canvas.height,d=2,u=l-i;if(u<=0)return;const p=v=>d+(1-(v-i)/u)*(c-d*2),h=o/2,g=Math.max(o*.6,2);a.beginPath(),a.moveTo(h,p(r)),a.lineTo(h,p(s)),a.stroke();const f=p(Math.max(t,n)),m=p(Math.min(t,n)),b=Math.max(m-f,1);a.beginPath(),a.rect(h-g/2,f,g,b)}function Sn(a,e){const{candles:t,priceMin:r,priceMax:s,bullColor:n,bearColor:i}=e;if(!t||t.length===0)return;const l=a.canvas.width,o=a.canvas.height,c=4,d=s-r;if(d<=0)return;const u=f=>c+(1-(f-r)/d)*(o-c*2),p=t.length,h=(l-c*2)/p,g=Math.max(h*.6,2);for(let f=0;f<p;f++){const[m,b,v,w,x]=t[f],_=x>=.5?n:i,E=c+(f+.5)*h;a.strokeStyle=_,a.lineWidth=1,a.beginPath(),a.moveTo(E,u(b)),a.lineTo(E,u(v)),a.stroke();const A=u(Math.max(m,w)),I=u(Math.min(m,w)),C=Math.max(I-A,1);a.fillStyle=_,a.fillRect(E-g/2,A,g,C)}a.beginPath()}function Cn(a,e){const{points:t,lineWidth:r}=e;if(!t||t.length<2)return;const s=a.canvas.width,n=a.canvas.height;a.lineWidth=r,a.beginPath(),a.moveTo(t[0][0]*s,t[0][1]*n);for(let i=1;i<t.length;i++)a.lineTo(t[i][0]*s,t[i][1]*n);a.stroke(),a.beginPath()}function An(a,e){const{horizontalLines:t,verticalLines:r}=e,s=a.canvas.width,n=a.canvas.height;a.save(),a.strokeStyle="rgba(255, 255, 255, 0.15)",a.lineWidth=1,a.beginPath();for(const i of t??[]){const l=i*n;a.moveTo(0,l),a.lineTo(s,l)}for(const i of r??[]){const l=i*s;a.moveTo(l,0),a.lineTo(l,n)}a.stroke(),a.restore(),a.beginPath()}function kn(a){const e=a.canvas.width,t=a.canvas.height,r=e/2,s=t/2,n=Math.min(e,t),i=n*.08,l=e-n*.08,o=n*.25,c=t-n*.15,d=n*.12;a.beginPath(),a.moveTo(i+d,o),a.lineTo(l-d,o),a.arcTo(l,o,l,o+d,d),a.lineTo(l,c-n*.15),a.quadraticCurveTo(l,c,l-n*.1,c),a.lineTo(l-n*.2,c),a.quadraticCurveTo(l-n*.25,c-n*.05,r+n*.05,c-n*.1),a.lineTo(r-n*.05,c-n*.1),a.quadraticCurveTo(i+n*.25,c-n*.05,i+n*.2,c),a.lineTo(i+n*.1,c),a.quadraticCurveTo(i,c,i,c-n*.15),a.lineTo(i,o+d),a.arcTo(i,o,i+d,o,d),a.closePath(),a.fill(),a.stroke();const u=r-n*.2,p=s+n*.05,h=n*.09;a.beginPath(),a.arc(u,p,h,0,2*Math.PI),a.stroke(),a.beginPath(),a.arc(u,p,h*.4,0,2*Math.PI),a.fill();const g=r+n*.2,f=s+n*.05;a.beginPath(),a.arc(g,f,h,0,2*Math.PI),a.stroke(),a.beginPath(),a.arc(g,f,h*.4,0,2*Math.PI),a.fill();const m=r+n*.2,b=s-n*.18,v=n*.035,w=n*.06;a.beginPath(),a.arc(m,b+w,v,0,2*Math.PI),a.fill(),a.stroke(),a.beginPath(),a.arc(m+w,b,v,0,2*Math.PI),a.fill(),a.stroke(),a.beginPath(),a.arc(m-w,b,v,0,2*Math.PI),a.fill(),a.stroke(),a.beginPath(),a.arc(m,b-w,v,0,2*Math.PI),a.fill(),a.stroke();const x=r-n*.2,_=s-n*.18,E=n*.06,A=n*.025;a.fillRect(x-E,_-A,E*2,A*2),a.strokeRect(x-E,_-A,E*2,A*2),a.fillRect(x-A,_-E,A*2,E*2),a.strokeRect(x-A,_-E,A*2,E*2);const I=o+n*.04;a.beginPath(),a.moveTo(i+n*.12,I),a.lineTo(r-n*.05,I),a.lineTo(r-n*.08,I-n*.04),a.lineTo(i+n*.15,I-n*.04),a.closePath(),a.fill(),a.stroke(),a.beginPath(),a.moveTo(r+n*.05,I),a.lineTo(l-n*.12,I),a.lineTo(l-n*.15,I-n*.04),a.lineTo(r+n*.08,I-n*.04),a.closePath(),a.fill(),a.stroke()}function In(a,e){e&&e.bgFill&&(a.save(),a.fillStyle=e.bgFill,a.fillRect(0,0,a.canvas.width,a.canvas.height),a.restore());const r=a.canvas.width/2,s=a.canvas.height/2,n=Math.sqrt(3),i=(a.canvas.width-2*2)/2,l=(a.canvas.height-2*2)/n,o=Math.max(0,Math.min(i,l)),c=o*.5,d=o*n*.5;a.beginPath(),a.moveTo(r+o,s),a.lineTo(r+c,s+d),a.lineTo(r-c,s+d),a.lineTo(r-o,s),a.lineTo(r-c,s-d),a.lineTo(r+c,s-d),a.closePath(),a.lineWidth=2}function Tn(a,e){const t=Math.max(1,e.hexRadius),r=e.lineWidth??1.5,s=e.gap??0,n=Math.max(1,t-s);e.bgFill&&(a.save(),a.fillStyle=e.bgFill,a.fillRect(0,0,a.canvas.width,a.canvas.height),a.restore());const i=Math.sqrt(3),l=1.5*t,o=i*t,c=n*.5,d=n*i*.5,u=a.canvas.width,p=a.canvas.height,h=Math.floor(-l/l)-1,g=Math.ceil((u+l)/l)+1,f=Math.floor(-o/o)-1,m=Math.ceil((p+o)/o)+1;a.lineJoin="miter",a.beginPath();for(let b=h;b<g;b++){const v=b*l,w=(b%2+2)%2===0?0:o*.5;for(let x=f;x<m;x++){const _=x*o+w;v<-l||v>=u+l||_<-o||_>=p+o||(a.moveTo(v+n,_),a.lineTo(v+c,_+d),a.lineTo(v-c,_+d),a.lineTo(v-n,_),a.lineTo(v-c,_-d),a.lineTo(v+c,_-d),a.closePath())}}a.lineWidth=r}function Rn(a,e){const t=Math.max(1,e.hexRadius),r=e.lineWidth??1.5,s=Math.max(1,e.crossSize??6);e.bgFill&&(a.save(),a.fillStyle=e.bgFill,a.fillRect(0,0,a.canvas.width,a.canvas.height),a.restore());const n=Math.sqrt(3),i=1.5*t,l=n*t,o=a.canvas.width,c=a.canvas.height,d=Math.floor(-i/i)-1,u=Math.ceil((o+i)/i)+1,p=Math.floor(-l/l)-1,h=Math.ceil((c+l)/l)+1;a.lineJoin="miter",a.beginPath(),a.lineWidth=r;for(let g=d;g<u;g++){const f=g*i,m=(g%2+2)%2===0?0:l*.5;for(let b=p;b<h;b++){const v=b*l+m;f<-i||f>=o+i||v<-l||v>=c+l||(a.moveTo(f-s,v),a.lineTo(f+s,v),a.moveTo(f,v-s),a.lineTo(f,v+s))}}}function Pn(a,e,t,r,s,n,i,l,o,c="source-over"){const d=e?a.retrieveResourceObject(e):null,u=document.createElement("canvas");u.width=t?t.x:d?d.width:100,u.height=t?t.y:d?d.height:100;const p=u.getContext("2d");if(!p)throw new Error("Could not get 2D context");switch(d&&p.drawImage(d,0,0),p.save(),p.fillStyle==="#000000"&&(p.fillStyle="white"),p.strokeStyle==="#000000"&&(p.strokeStyle="white"),typeof r=="number"&&(p.globalAlpha=r),s&&(p.fillStyle=s),n&&(p.strokeStyle=n),c&&(p.globalCompositeOperation=c),l){case"RadialGradient":fn(p,o??void 0);break;case"Ship":yn(p);break;case"Square":wn(p);break;case"Triangle":_n(p);break;case"Star":xn(p);break;case"Gamepad":kn(p);break;case"Hexagon":{In(p,{bgFill:(o??{}).bgFill??null});break}case"HexagonTiling":{const h=o??{};Tn(p,{hexRadius:h.hexRadius??24,lineWidth:h.lineWidth??1.5,bgFill:h.bgFill??null});break}case"CrossTiling":{const h=o??{};Rn(p,{hexRadius:h.hexRadius??24,lineWidth:h.lineWidth??1.5,crossSize:h.crossSize??6,bgFill:h.bgFill??null});break}case"Circle":mn(p);break;case"DottedRectangle":bn(p);break;case"OutlineRectangle":vn(p);break;case"RoundedRectangle":{const h=o??{},g=h.radius??6,f=h.inset??2,m=p.canvas.width,b=p.canvas.height;p.beginPath(),p.moveTo(f+g,f),p.lineTo(m-f-g,f),p.arcTo(m-f,f,m-f,f+g,g),p.lineTo(m-f,b-f-g),p.arcTo(m-f,b-f,m-f-g,b-f,g),p.lineTo(f+g,b-f),p.arcTo(f,b-f,f,b-f-g,g),p.lineTo(f,f+g),p.arcTo(f,f,f+g,f,g),p.closePath();break}case"LinearGradient":{const h=o??{},g=p.canvas.width,f=p.canvas.height,m=p.createLinearGradient((h.x0??0)*g,(h.y0??0)*f,(h.x1??0)*g,(h.y1??1)*f);for(const[b,v]of h.stops??[])m.addColorStop(b,v);if(p.fillStyle=m,p.fillRect(0,0,g,f),p.restore(),!e){const b=i||a.createNewImageName();return a.addLocalResource(b,u),b}return a.addLocalResource(e,u),e}case"Dot":{const h=o??{},g=p.canvas.width,f=p.canvas.height;p.beginPath(),p.arc((h.x??.5)*g,(h.y??.5)*f,h.radius??3,0,Math.PI*2);break}case"Pill":{const g=(o??{}).inset??1,f=p.canvas.width,m=p.canvas.height,b=(m-g*2)/2;p.beginPath(),p.moveTo(g+b,g),p.lineTo(f-g-b,g),p.arcTo(f-g,g,f-g,g+b,b),p.lineTo(f-g,m-g-b),p.arcTo(f-g,m-g,f-g-b,m-g,b),p.lineTo(g+b,m-g),p.arcTo(g,m-g,g,m-g-b,b),p.lineTo(g,g+b),p.arcTo(g,g,g+b,g,b),p.closePath();break}case"Candlestick":{const h=o??{};En(p,{open:h.open??0,high:h.high??0,low:h.low??0,close:h.close??0,priceMin:h.priceMin??0,priceMax:h.priceMax??100});break}case"CandlestickChart":{const h=o??{};Sn(p,{candles:h.candles??[],priceMin:h.priceMin??0,priceMax:h.priceMax??100,bullColor:h.bullColor??"#00e664",bearColor:h.bearColor??"#ff4646"});break}case"Polyline":{const h=o??{};Cn(p,{points:h.points??[],lineWidth:h.lineWidth??1});break}case"ChartGrid":{const h=o??{};An(p,{horizontalLines:h.horizontalLines??[],verticalLines:h.verticalLines??[]});break}default:throw new Error(`Effect requires a supported drawingEffectName, received ${String(l)}.`)}if(o&&"dash"in o){const h=o.dash;h&&typeof p.setLineDash=="function"&&p.setLineDash(h)}if(p.fill(),p.stroke(),p.restore(),!e){const h=i||a.createNewImageName();return a.addLocalResource(h,u),h}return a.addLocalResource(e,u),e}function Ln(a){return typeof HTMLImageElement<"u"&&a instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&a instanceof HTMLCanvasElement}class Mn{SUPPORTED_AUDIO_SUFFIXES=["mp3","ogg"];SUPPORTED_IMAGE_SUFFIXES=["png","jpg","jpeg","svg"];resources_loading=0;readyWaiters=[];resources={};_staleAtlasNames=new Set;_filterBaker=null;_nextResourceId=1;_resourcesById=new Map;_imageNameToId=new Map;ResolvedImageUtil=typeof window<"u"&&"ImageUtil"in window&&window.ImageUtil||typeof self<"u"&&"ImageUtil"in self&&self.ImageUtil||typeof globalThis<"u"&&"ImageUtil"in globalThis&&globalThis.ImageUtil||gt;constructor(){}async ensureFilterBaker(){if(!this._filterBaker){const{ImageFilterBaker:e}=await oe(async()=>{const{ImageFilterBaker:t}=await import("./ImageFilterBaker-CMUdH7TV.js");return{ImageFilterBaker:t}},[],import.meta.url);this._filterBaker=new e}return this._filterBaker}getIdentifierSuffix(e){return tt.last(e.split("."))}getMimeType(e){const t=this.getIdentifierSuffix(e),r={mp3:"audio/mpeg3",ogg:"audio/ogg",png:"image/png",jpg:"image/jpeg",jpeg:"image/jpeg",svg:"image/svg+xml",json:"application/json"};return y.assert(Object.prototype.hasOwnProperty.call(r,t),`resourceStore#getMimeType suffix not found ${t}`),r[t]}isReady(){return this.resources_loading<=0}createEffectsFromDescriptor(e){const t=[];for(const r of e.images)this._processOneImageDescriptor(r,t);return t.length===0?Promise.resolve():Promise.all(t).then(()=>{})}_processOneImageDescriptor(e,t){let r=e.newImageName,s=e.imageName;r&&this.resources[r]!==void 0&&this._staleAtlasNames.add(r);let n=e.size;const i=e.opacity,l=e.fillColor,o=e.strokeColor,c=e.effectsToApply;let d=0;for(;d<c.length;){const u=c[d];if(typeof u.name=="string"&&u.name.startsWith("__filter:")){const f=[];let m=d;for(;m<c.length&&typeof c[m].name=="string"&&c[m].name.startsWith("__filter:");)f.push({filterName:c[m].name.slice(9),parameters:c[m].parameters}),m++;t.push(this._applyFilterChain({imageName:s,newImageName:r,chain:f})),!s&&r&&(s=r,r=null,n=null),d=m;continue}let p=u.parameters;const h=u.combineOption,g=u.dash;g&&(p={...p??{},dash:g}),Pn(this,s,n,i,l,o,r,u.name,this._coerceEffectArguments(p),h),!s&&r&&(s=r,r=null,n=null),d++}}async _applyFilterChain(e){const{imageName:t,newImageName:r,chain:s}=e,n=t??r,i=r??t;if(!n||!i){console.warn("[ResourceStore] filter chain has no source/target name; skipping");return}const l=this.resources[n];if(!Ln(l)){console.warn(`[ResourceStore] filter chain source "${n}" is not a filterable image (canvas/img); skipping`);return}const o=await this.ensureFilterBaker();try{const c=await o.bake(l,s);this.resources[i]!==void 0&&this._staleAtlasNames.add(i),this.resources[i]=c}catch(c){console.error(`[ResourceStore] image filter bake failed for "${i}":`,c)}}drainStaleAtlasNames(){if(this._staleAtlasNames.size===0)return[];const e=Array.from(this._staleAtlasNames);return this._staleAtlasNames.clear(),e}whenReady(){return this.resources_loading===0?Promise.resolve():new Promise(e=>{this.readyWaiters.push(e)})}callWhenReady(e){return this.whenReady().then(e)}resolveReadyWaitersIfIdle(){if(this.resources_loading!==0)return;this.readyWaiters.splice(0).forEach(t=>t())}decrease_resources_counter(){y.assert(this.resources_loading>0,"Error in resource loading counting in Resource Store..."),this.resources_loading--,this.resolveReadyWaitersIfIdle()}clearAll(){this.resources={}}clearAllBut(e){Object.keys(this.resources).forEach(t=>{e.includes(t)||this.removeResource(t)})}isType(e,t){for(let r=0;r<t.length;r++)if(e.indexOf(t[r])!==-1)return!0;return!1}isAudio(e){return this.isType(e,this.SUPPORTED_AUDIO_SUFFIXES)}isImage(e){return this.isType(e,this.SUPPORTED_IMAGE_SUFFIXES)}isJSONFile(e){return this.isType(e,[".json"])}isSupportedResource(e){return this.isAudio(e)||this.isImage(e)||this.isJSONFile(e)}storeAudioData(e,t){const r=new Audio,s=()=>{r.removeEventListener("canplaythrough",s,!1),r.removeEventListener("load",s,!1),this.resources[e]=r,this.decrease_resources_counter()},n=()=>{throw r.removeEventListener("error",n,!1),new Error("Audio loading Error: "+e)};r.src=typeof t=="string"?t:window.URL.createObjectURL(t),r.addEventListener("canplaythrough",s,!1),r.addEventListener("load",s,!1),r.addEventListener("error",n,!1),r.load()}storeImageData(e,t){const r=new Image;r.onload=()=>{this.resources[e]=r,this.decrease_resources_counter(),window.URL.revokeObjectURL(r.src)},r.src=window.URL.createObjectURL(t)}_normalMapName(e){return!e.endsWith(".png")||e.endsWith("_normal.png")?null:e.slice(0,-4)+"_normal.png"}loadImage(e){y.assert(!!e,"resourceStore#loadImage error: image not defined");try{const t=new XMLHttpRequest;t.onloadend=()=>{this.storeImageData(e,t.response)},t.open("GET",e,!0),t.responseType="blob",t.send();const r=this._normalMapName(e);if(r){this.resources_loading++;const s=new XMLHttpRequest;s.onloadend=()=>{s.status===200?this.storeImageData(r,s.response):this.decrease_resources_counter()},s.open("GET",r,!0),s.responseType="blob",s.send()}}catch(t){throw new Error("resourceStore#loadImage error trying to load image "+e+`
 Details: 
 `+t)}}loadAudio(e){y.assert(!!e,"resourceStore#loadAudio error: image not defined"),this.storeAudioData(e,e)}loadJSON(e){try{const t=new XMLHttpRequest;t.onloadend=()=>{const r=t.responseText;tt.last(e.split("/"))==="effects_descriptor.json"?this.createEffectsFromDescriptor(JSON.parse(r)):this.resources[e]=JSON.parse(r),this.decrease_resources_counter()},t.open("GET",e,!0),t.responseType="text",t.send()}catch(t){throw new Error("resourceStore#loadJSON error trying to read JSON file "+e+`
 Details: 
 `+t)}}addResource(e){return this.resources[e]?this:(this.resources_loading++,y.assert(this.isSupportedResource(e),"resourceStore: resource type not recognized"),this.isImage(e)?this.loadImage(e):this.isAudio(e)?this.loadAudio(e):this.loadJSON(e),this)}addLocalResource(e,t){return this.resources[e]=t,this.resolveReadyWaitersIfIdle(),this}createNewImageName(e=!1){let t;do t=`${e?"":"temp_"}image_${et.randomInt(1e8).toString()}.jpg`;while(this.resources[t]);return t}removeResourceIfTemporary(e){e.includes("temp_")&&this.removeResource(e)}removeTemporaryResources(){Object.keys(this.resources).forEach(e=>{e.includes("temp_")&&this.removeResource(e)})}createNewImage(e,t,r=!1){const s=this.createNewImageName(r);return this.addLocalResource(s,this.ResolvedImageUtil.createCanvas(e,t)),s}cloneImage(e){const t=this.retrieveResourceObject(e);if(!Qr(t))throw new Error(`ResourceStore#cloneImage expected drawable resource: ${e}`);const r=this.ResolvedImageUtil.createCanvas(t.width,t.height),s=r.getContext("2d");s&&s.drawImage(t,0,0);const n=this.createNewImageName(!1);return this.addLocalResource(n,r),n}getImageData(e){const t=this.retrieveResourceObject(e);if(!Bt(t))throw new Error(`ResourceStore#getImageData expected canvas resource: ${e}`);const r=t.getContext("2d");if(!r)throw new Error("Could not get 2D context from canvas");return r.getImageData(0,0,t.width,t.height)}setImageData(e,t){const r=this.retrieveResourceObject(e);if(!Bt(r))throw new Error(`ResourceStore#setImageData expected canvas resource: ${e}`);const s=r.getContext("2d");s&&s.putImageData(t,0,0)}checkResourceObjectExists(e){return this.resources[e]!==void 0}retrieveResourceObject(e){return this.checkResourceObjectExists(e)?this.resources[e]:(q("Resource Store error: trying to retrieve unknown resource: "+e),this.isImage(e)?this.ResolvedImageUtil.createCanvas(10,10):new Audio)}removeResource(e){return delete this.resources[e],this}hasResource(e){return!!(Object.prototype.hasOwnProperty.call(this.resources,e)&&this.resources[e])}_coerceEffectArguments(e){if(e===null)return null;if(e!==void 0){if(typeof e!="object")throw new Error(`ResourceStore effect parameters must be an object, null, or undefined. Received ${typeof e}.`);return e}}retrieveAllResourceNamesBySuffix(e){const t=this.getMimeType(e),r=[];return Object.keys(this.resources).forEach(s=>{try{this.getMimeType(s)===t&&r.push(s)}catch{}}),r}retrieveAllAudioNames(){let e=[];return this.SUPPORTED_AUDIO_SUFFIXES.forEach(t=>{e=e.concat(this.retrieveAllResourceNamesBySuffix(t))}),e}registerImageResource(e){const t=this._imageNameToId.get(e);if(t!==void 0)return t;const r=this._nextResourceId++;return this._imageNameToId.set(e,r),this._resourcesById.set(r,{type:"image",name:e}),r}registerTextResource(e,t,r,s){const n=this._nextResourceId++;return this._resourcesById.set(n,{type:"text",text:e,font:s,textColor:t,bgColor:r}),n}updateTextResource(e,t,r,s,n){this._resourcesById.set(e,{type:"text",text:t,font:n,textColor:r,bgColor:s})}getResourceById(e){return this._resourcesById.get(e)}getImageId(e){return this._imageNameToId.get(e)}imageRegistryJson(){const e={};for(const[t,r]of this._imageNameToId)e[t]=r;return JSON.stringify(e)}}const Je={};function zn(){for(const a of Object.keys(Je))delete Je[a]}function St(a,e,t,r){return{center:{x:a,y:e,z:0},size:{x:t,y:r,z:0}}}const Dn={fontToFontFace(a="14px GoodDog"){return a.substring(a.indexOf(" ")+1)},drawText(a,e,t,r,s,n){const i=a.retrieveResourceObject(e);if(!Bt(i))throw new Error(`TextToImage#drawText expected canvas resource: ${e}`);const l=i.getContext("2d");if(!l)throw new Error("Could not get 2D context");l.clearRect(0,0,l.canvas.width,l.canvas.height),s&&(l.beginPath(),l.rect(0,0,l.canvas.width,l.canvas.height),l.fillStyle=s,l.fill()),l.fillStyle=n||"black",l.font=r,l.textBaseline="bottom",l.textAlign="center",l.fillText(t,l.canvas.width/2,l.canvas.height)},createRectangleFromTextAndFont(a,e,t){y.assert(!!a,"TextToImage#createRectangleFromTextAndFont Error: expecting font parameter to measure"),y.assertIsLiteralString(a,"TextToImage#createRectangleFromTextAndFont Error: font is not a string literal"),t.font=a;const r=a.match(/\d+/),s=r?parseInt(r[0]):14,n=t.measureText(e).width||1;return St(0,0,n,s)},createImageFromText(a,e=St(0,0,100,100),t="",r="GoodDog",s="rgba(125, 125, 125, 0)",n="black",i){if(y.assertIsLiteralString(t,"Presentation.textToImagel Error: text is not a string literal"),t==="")return{imageName:null,font:null};if(Je[t])return Je[t];const l=St(e.center.x,e.center.y,e.size.x*2,e.size.y*2),o=a.createNewImage(l.size.x,l.size.y,!0),c=this.getFontToFitTextOnRectangle(t,r,l,i);this.drawText(a,o,t,c,s,n);const d={imageName:o,font:c};return Je[t]=d,d},getFontToFitTextOnRectangle(a,e,t,r){let s=300,n;do s--,n=`${s}px ${e}`,r.font=n;while((r.measureText(a).width>=t.size.x||s>=t.size.y)&&s>1);return n}};function Bn(a){return a/2}function wt(a){return a.focalLength&&a.focalLength>0?a.focalLength:Bn(a.viewportH)}function Ue(a){return{centerX:a.centerX,centerY:a.centerY,centerZ:a.centerZ??0,viewportH:a.viewportH,canvasW:a.canvasW,canvasH:a.canvasH,pitch:a.pitch??0,yaw:a.yaw??0,roll:a.roll??0,focalLength:a.focalLength??0}}function it(a,e,t){const r=Math.sin(a),s=Math.cos(a),n=Math.sin(e),i=Math.cos(e),l=Math.sin(t),o=Math.cos(t),c={x:n*s,y:r,z:i*s},d={x:i*o-n*r*l,y:s*l,z:-n*o-i*r*l},u={x:-i*l-n*r*o,y:s*o,z:n*l-i*r*o};return{right:d,up:u,forward:c}}function es(a){const{viewportH:e,canvasH:t}=Ue(a);return e<=0||t<=0?1:t/e}function Oa(a){const{centerX:e,centerY:t,centerZ:r,viewportH:s,canvasW:n,canvasH:i,pitch:l,yaw:o,roll:c}=Ue(a),d=wt(a),u=s/2,p=u*n/i,{right:h,up:g,forward:f}=it(l,o,c),m=d/p,b=d/u,v=f.x*e+f.y*t+f.z*r,w=-(m*(h.x*e+h.y*t+h.z*r)),x=-(b*(g.x*e+g.y*t+g.z*r)),_=-v,E=d-v;return new Float32Array([m*h.x,b*g.x,f.x,f.x,m*h.y,b*g.y,f.y,f.y,m*h.z,b*g.z,f.z,f.z,w,x,_,E])}function On(a){const{centerX:e,centerY:t,centerZ:r,pitch:s,yaw:n,roll:i}=Ue(a),l=es(a),{right:o,up:c,forward:d}=it(s,n,i),u=e*l,p=t*l,h=r*l,g=o.x*u+o.y*p+o.z*h,f=c.x*u+c.y*p+c.z*h,m=d.x*u+d.y*p+d.z*h;return new Float32Array([o.x,-c.x,-d.x,0,-o.y,c.y,d.y,0,-o.z,c.z,d.z,0,-g,f,m,1])}function Fn(a,e,t,r=0){const{centerX:s,centerY:n,centerZ:i,viewportH:l,canvasW:o,canvasH:c,pitch:d,yaw:u,roll:p}=Ue(a),h=wt(a),g=l/2,f=g*o/c,{right:m,up:b,forward:v}=it(d,u,p),w=e-s,x=t-n,_=r-i,E=w*m.x+x*m.y+_*m.z,A=w*b.x+x*b.y+_*b.z,I=w*v.x+x*v.y+_*v.z,C=h+I,N=E*h/(f*C),T=A*h/(g*C),R=(N+1)*.5*o,z=(1-T)*.5*c;return{canvasX:R,canvasY:z}}function $n(a,e,t,r=0){const{centerX:s,centerY:n,centerZ:i,viewportH:l,canvasW:o,canvasH:c,pitch:d,yaw:u,roll:p}=Ue(a),h=wt(a),g=l/2,f=g*o/c,{right:m,up:b,forward:v}=it(d,u,p),w=e-s,x=t-n,_=r-i,E=w*m.x+x*m.y+_*m.z,A=w*b.x+x*b.y+_*b.z,I=w*v.x+x*v.y+_*v.z,C=h+I,N=E*h/(f*C),T=A*h/(g*C),R=(N+1)*.5*o,z=(1-T)*.5*c,D=I>0&&C>0;return{canvasX:R,canvasY:z,csZ:I,w:C,visible:D}}function Nn(a,e,t){const{centerX:r,centerY:s,centerZ:n,viewportH:i,canvasW:l,canvasH:o,pitch:c,yaw:d,roll:u}=Ue(a),p=wt(a),h=i/2,g=h*l/o,{right:f,up:m,forward:b}=it(c,d,u),v=e/l*2-1,w=1-t/o*2,x=r+v*g*f.x+w*h*m.x,_=s+v*g*f.y+w*h*m.y,E=n+v*g*f.z+w*h*m.z,A=b.x+v*g/p*f.x+w*h/p*m.x,I=b.y+v*g/p*f.y+w*h/p*m.y,C=b.z+v*g/p*f.z+w*h/p*m.z;return{origin:{x,y:_,z:E},direction:{x:A,y:I,z:C}}}function Fa(a,e,t,r=0){const s=Nn(a,e,t);if(Math.abs(s.direction.z)<1e-12)return{worldX:s.origin.x,worldY:s.origin.y};const n=(r-s.origin.z)/s.direction.z;return{worldX:s.origin.x+n*s.direction.x,worldY:s.origin.y+n*s.direction.y}}const Un={spacing_xs:"var(--arsds-spacing-xs)",spacing_sm:"var(--arsds-spacing-sm)",spacing_md:"var(--arsds-spacing-md)",spacing_lg:"var(--arsds-spacing-lg)",spacing_xl:"var(--arsds-spacing-xl)",color_text_primary:"var(--arsds-color-text-primary)",color_text_muted:"var(--arsds-color-text-muted)",color_text_inverse:"var(--arsds-color-text-inverse)",color_surface:"var(--arsds-color-surface)",color_surface_hover:"var(--arsds-color-surface-hover)",color_border:"var(--arsds-color-border)",color_border_subtle:"var(--arsds-color-border-subtle)",color_accent:"var(--arsds-color-accent)",color_danger:"var(--arsds-color-danger)",color_success:"var(--arsds-color-success)",color_info:"var(--arsds-color-info)",color_warning:"var(--arsds-color-warning)",font_size_sm:"var(--arsds-font-size-sm)",font_size_md:"var(--arsds-font-size-md)",font_size_lg:"var(--arsds-font-size-lg)",font_size_xl:"var(--arsds-font-size-xl)",font_weight_normal:"var(--arsds-font-weight-normal)",font_weight_bold:"var(--arsds-font-weight-bold)",radius_sm:"var(--arsds-radius-sm)",radius_md:"var(--arsds-radius-md)",radius_lg:"var(--arsds-radius-lg)",shadow_sm:"var(--arsds-shadow-sm)",shadow_md:"var(--arsds-shadow-md)",shadow_lg:"var(--arsds-shadow-lg)"};function Ve(a){return Un[a]??a}function Ye(a){const e=Object.keys(a);if(e.length!==1)return null;const t=e[0],r=a[t];return{name:t,data:r}}const Ct={Generic:"div",Dialog:"ars-dialog",Panel:"ars-panel",Group:"ars-group",Select:"ars-select",TextInput:"ars-input",DatePicker:"ars-date-picker",Toggle:"ars-toggle",InfoTile:"ars-info-tile",Label:"span",Badge:"ars-badge",Button:"ars-button",Spacer:"div",List:"ars-list",Markdown:"ars-markdown",Image:"img"},_r={Dialog:["dialog:close","ars-select:change","ars-toggle:change","ars-input:change"],Select:["ars-select:change"],TextInput:["ars-input:change"],DatePicker:["ars-date-picker:select"],Toggle:["ars-toggle:change"],InfoTile:["ars-info-tile:activate","ars-info-tile:toggle-collapse","ars-info-tile:edit-save","ars-info-tile:edit-cancel"],Button:["ars-button:click"],List:["ars-list:select"]},Er=1080,Hn=5,Gn=.25;function Wn(a,e){if(e<=0||a<=0)return 1;const t=e/(Er*Hn),r=e/(Er*Gn);return t>=r?1:.5+2*Math.max(0,Math.min(1,(a-t)/(r-t)))}class qn{#e=new Map;#t=null;#r;#s;#n;constructor(e,t){this.#r=e,this.#n=t;const r=e.querySelector("[data-dom-adapter-world-scene]");if(r)this.#s=r;else{const s=document.createElement("div");s.dataset.domAdapterWorldScene="",s.style.cssText="position:absolute;top:50%;left:50%;transform-origin:0 0 0;transform-style:preserve-3d;",e.appendChild(s),this.#s=s}}set onForwardEvent(e){this.#t=e}reconcile(e,t){let r;try{const n=e.slice(0);r=jr(n)}catch{return}const s=new Map;for(const n of r)s.set(n.agentId,n);for(const[n,i]of this.#e)try{s.has(n)||this.#l(n,i)}catch(l){console.warn(`[DomAdapter] failed to destroy element ${n}:`,l)}for(const[n,i]of s)try{const l=this.#e.get(n);if(l){const o=Ye(l.lastEntry.node),c=Ye(i.node);if(o&&c&&(o.name==="Generic"?o.data.tag_name??"div":Ct[o.name])!==(c.name==="Generic"?c.data.tag_name??"div":Ct[c.name])){this.#l(n,l);const u=this.#a(i);u&&(this.#e.set(n,{element:u,space:i.space,lastEntry:i,forwardEventListeners:u.__daListeners??new Map,lastAttributes:u.__daAttributes}),delete u.__daListeners,delete u.__daAttributes)}else this.#o(l,i),l.lastEntry=i}else{const o=this.#a(i);o&&(this.#e.set(n,{element:o,space:i.space,lastEntry:i,forwardEventListeners:o.__daListeners??new Map,lastAttributes:o.__daAttributes}),delete o.__daListeners,delete o.__daAttributes)}}catch(l){console.warn(`[DomAdapter] failed to reconcile element ${n}:`,l)}this.#i(s,t)}reapplyTransforms(e){const t=new Map;for(const[,r]of this.#e)r.lastEntry&&t.set(r.lastEntry.agentId,r.lastEntry);this.#i(t,e)}clear(){for(const[e,t]of this.#e)this.#l(e,t);this.#e.clear(),this.#s.style.transform="",this.#r.style.perspective=""}#i(e,t){const r=es(t);this.#r.style.perspective=`${t.canvasH/2}px`,this.#r.style.perspectiveOrigin="50% 50%";const s=On(t);this.#s.style.transform=`matrix3d(${Array.from(s).join(", ")})`;const n=new Map;for(const[l,o]of this.#e){const c=e.get(l);if(c)if(c.space==="screen")n.set(l,{x:c.x-c.w/2,y:c.y-c.h/2,visible:!0});else{const d=$n(t,c.x,c.y,c.z);n.set(l,{x:d.canvasX,y:d.canvasY,visible:d.visible})}}for(const[l,o]of e){if(o.space!=="screen")continue;const c=o.childIds;if(!c||c.length===0)continue;const d=this.#e.get(l);if(!d)continue;const u=d.element;u.style.position="relative";const p=n.get(l);for(const h of c){const g=this.#e.get(h);if(!g)continue;const f=n.get(h);g.element.parentElement!==u&&u.appendChild(g.element),p&&f&&(g.element.style.position="absolute",g.element.style.left=`${f.x-p.x}px`,g.element.style.top=`${f.y-p.y}px`)}}const i=new Set;for(const[,l]of e)if(l.childIds)for(const o of l.childIds)i.add(o);for(const[l,o]of this.#e){const c=e.get(l);if(c)if(c.space==="world"){const d=n.get(l);if(!d||!d.visible){o.element.style.visibility="hidden",o.element.style.pointerEvents="none";continue}o.element.style.visibility="",o.element.style.pointerEvents=c.pointerEvents||"",o.element.parentElement!==this.#s&&this.#s.appendChild(o.element);const u=c.x*r,p=-c.y*r,h=-c.z*r,g=-c.rotation*180/Math.PI;o.element.style.position="absolute",o.element.style.left="0px",o.element.style.top="0px",o.element.style.width=`${c.w}px`,o.element.style.height=`${c.h}px`,o.element.style.maxWidth="none",o.element.style.maxHeight="none",o.element.style.zIndex=`${c.zIndex}`,o.element.style.transformOrigin="0 0 0";const f=c.w*r/2,m=c.h*r/2;o.element.style.transform=`translate3d(${u.toFixed(3)}px, ${p.toFixed(3)}px, ${h.toFixed(3)}px) rotateZ(${g.toFixed(3)}deg) translate(-${f.toFixed(3)}px, -${m.toFixed(3)}px) scale3d(${r.toFixed(5)}, ${r.toFixed(5)}, 1)`,o.element.style.setProperty("--ba-world-scale",r.toFixed(5));const b=r>0?1/r:1;o.element.style.setProperty("--ba-inv-scale",b.toFixed(5)),o.element.style.setProperty("--ba-marker-size-factor",Wn(r,t.canvasH).toFixed(5))}else{if(i.has(l)){o.element.style.width=`${c.w}px`,o.element.style.height=`${c.h}px`,o.element.style.maxWidth="none",o.element.style.maxHeight="none",o.element.style.zIndex=`${c.zIndex}`;continue}const d=n.get(l);if(!d)continue;o.element.parentElement!==this.#n&&this.#n.appendChild(o.element),o.element.style.display="",o.element.style.position="absolute",o.element.style.left=`${d.x}px`,o.element.style.top=`${d.y}px`,o.element.style.width=`${c.w}px`,o.element.style.height=`${c.h}px`,o.element.style.maxWidth="none",o.element.style.maxHeight="none",o.element.style.zIndex=`${c.zIndex}`}}}#a(e){const t=Ye(e.node);if(!t)return null;const r=t.name==="Generic"?t.data.tag_name??"div":Ct[t.name];if(!r)return null;const s=document.createElement(r);if(s.setAttribute("data-brainiac-agent-id",String(e.agentId)),e.attributes)for(const[o,c]of Object.entries(e.attributes))s.setAttribute(o,c);if(e.pointerEvents&&(s.style.pointerEvents=e.pointerEvents),e.cssVariables)for(const[o,c]of Object.entries(e.cssVariables))s.style.setProperty(o,c);this.#d(s,t.name,t.data);const n=[..._r[t.name]??[]];if(e.forwardEvents)for(const o of e.forwardEvents)n.includes(o)||n.push(o);const i=new Map;for(const o of n){const c=d=>{this.#t?.(o,{agentId:e.agentId,detail:d.detail})};s.addEventListener(o,c),i.set(o,c)}return s.__daListeners=i,s.__daAttributes=e.attributes?{...e.attributes}:{},(e.space==="screen"?this.#n:this.#s).appendChild(s),s}#o(e,t){const r=Ye(t.node);if(!r)return;const s=e.element;if(s.style.pointerEvents=t.pointerEvents||"",t.cssVariables)for(const[o,c]of Object.entries(t.cssVariables))s.style.setProperty(o,c);JSON.stringify(e.lastEntry.node)!==JSON.stringify(t.node)&&this.#d(s,r.name,r.data);const i=t.attributes??{},l=e.lastAttributes??{};for(const o of Object.keys(l))o in i||s.removeAttribute(o);for(const[o,c]of Object.entries(i))s.setAttribute(o,c);e.lastAttributes={...i},this.#c(e,t),e.space!==t.space&&((t.space==="screen"?this.#n:this.#s).appendChild(s),e.space=t.space)}#c(e,t){const r=new Set([..._r[Ye(t.node)?.name??""]??[],...t.forwardEvents??[]]),s=e.element;for(const[n,i]of e.forwardEventListeners)r.has(n)||(s.removeEventListener(n,i),e.forwardEventListeners.delete(n));for(const n of r){if(e.forwardEventListeners.has(n))continue;const i=l=>{this.#t?.(n,{agentId:t.agentId,detail:l.detail})};s.addEventListener(n,i),e.forwardEventListeners.set(n,i)}}#l(e,t){for(const[r,s]of t.forwardEventListeners)t.element.removeEventListener(r,s);t.element.remove(),this.#e.delete(e)}#d(e,t,r){switch(t){case"Generic":if(r.class_name&&(e.className=r.class_name),r.text_content&&(e.textContent=r.text_content),r.attributes)for(const[s,n]of Object.entries(r.attributes))e.setAttribute(s,n);if(r.css_variables)for(const[s,n]of Object.entries(r.css_variables))e.style.setProperty(s,n);if(r.properties){const s=r.properties;for(const[n,i]of Object.entries(s))try{e[n]=i}catch(l){console.warn(`[DomAdapter] property "${n}" setter threw:`,l)}}break;case"Dialog":r.title!==void 0&&e.setAttribute("title",r.title),r.close_button!==void 0&&e.toggleAttribute("show-close-button",!!r.close_button);break;case"Select":r.label!==void 0&&e.setAttribute("label",r.label),r.value!==void 0&&e.setAttribute("value",r.value),r.options&&(e.options=r.options.map(([s,n])=>({value:s,label:n})));break;case"TextInput":r.label!==void 0&&e.setAttribute("label",r.label),r.value!==void 0&&e.setAttribute("value",r.value),r.placeholder!==void 0&&e.setAttribute("placeholder",r.placeholder);break;case"DatePicker":r.label!==void 0&&e.setAttribute("label",r.label),r.value!==void 0&&e.setAttribute("value",r.value);break;case"Toggle":r.label!==void 0&&e.setAttribute("label",r.label),r.checked!==void 0&&e.toggleAttribute("checked",!!r.checked);break;case"InfoTile":this.#h(e,{title:r.title,subtitle:r.subtitle,name:r.name??null,accentColor:r.accent_color?Ve(r.accent_color):null,properties:r.properties}),e.toggleAttribute("not-collapsible",!r.collapsible),e.toggleAttribute("collapsed",!!r.collapsed),e.toggleAttribute("selected",!!r.selected);break;case"Label":if(e.textContent=r.text,r.style){const s=r.style;e.style.fontSize=Ve(s.size),e.style.fontWeight=Ve(s.weight),e.style.color=Ve(s.color)}break;case"Badge":r.text!==void 0&&(e.textContent=r.text||""),r.severity!==void 0&&e.setAttribute("variant",r.severity);break;case"Button":r.label!==void 0&&(e.textContent=r.label||""),r.action!==void 0&&e.setAttribute("variant",r.action);break;case"Spacer":{const s=Ve(r.size);e.style.height=`var(${s})`,e.style.width="100%";break}case"List":r.selectable!==void 0&&e.toggleAttribute("selectable",!!r.selectable);break;case"Markdown":r.source!==void 0&&(e.source=r.source);break;case"Image":r.url&&e.setAttribute("src",r.url),r.alt&&e.setAttribute("alt",r.alt),r.fit&&(e.style.objectFit=r.fit);break}}#h(e,t){e.data=t}}const ts={explosion:{count:200,color:[255,140,60,255],velocityRange:[50,150],angleRange:[0,2*Math.PI],gravity:0,lifetime:[.5,1.5],size:[4,12],blendMode:"additive"},fire:{count:80,color:[255,80,20,200],velocityRange:[20,60],angleRange:[Math.PI/2-.3,Math.PI/2+.3],gravity:20,lifetime:[.3,1],size:[6,16],blendMode:"additive"},thruster:{count:60,color:[255,220,100,255],velocityRange:[180,300],angleRange:[Math.PI/2-.4,Math.PI/2+.4],gravity:0,lifetime:[.075,.15],size:[6,18],spreadX:8,spreadY:8,blendMode:"additive"},smoke:{count:40,color:[160,160,160,120],velocityRange:[10,30],angleRange:[Math.PI/2-.4,Math.PI/2+.4],gravity:10,lifetime:[1,3],size:[8,20],blendMode:"alpha"},rain:{count:20,color:[220,230,255,150],velocityRange:[350,550],angleRange:[-Math.PI/2-.05,-Math.PI/2+.05],gravity:0,lifetime:[1.5,3],size:[2,4],blendMode:"alpha",spreadX:400,spreadY:0},sparkle:{count:30,color:[255,220,100,255],velocityRange:[30,80],angleRange:[0,2*Math.PI],gravity:0,lifetime:[.3,.8],size:[2,6],blendMode:"additive"},ring:{count:60,color:[100,255,255,200],velocityRange:[40,60],angleRange:[0,2*Math.PI],gravity:0,lifetime:[.5,1],size:[3,8],blendMode:"additive"},"explosion-debris":{count:50,color:[120,120,120,200],velocityRange:[40,100],angleRange:[0,2*Math.PI],gravity:-120,lifetime:[.5,2],size:[2,6],blendMode:"alpha"},"explosion-spark":{count:30,color:[255,240,180,255],velocityRange:[100,200],angleRange:[0,2*Math.PI],gravity:0,lifetime:[.1,.4],size:[1,3],blendMode:"additive"},"fire-smoke":{count:3,color:[80,80,80,100],velocityRange:[8,20],angleRange:[Math.PI/2-.2,Math.PI/2+.2],gravity:8,lifetime:[1,2.5],size:[10,25],blendMode:"alpha"},snow:{count:8,color:[255,255,255,200],velocityRange:[20,60],angleRange:[-Math.PI/2-.5,-Math.PI/2+.5],gravity:-10,lifetime:[2,5],size:[2,8],blendMode:"alpha"},shockwave:{count:100,color:[220,255,255,255],velocityRange:[80,150],angleRange:[0,2*Math.PI],gravity:0,lifetime:[.2,.6],size:[2,5],blendMode:"additive"},damage:{count:20,color:[220,50,30,200],velocityRange:[30,80],angleRange:[0,2*Math.PI],gravity:-60,lifetime:[.2,.6],size:[3,8],blendMode:"alpha"},"slither-orb":{count:3,color:[100,255,200,255],velocityRange:[2,8],angleRange:[0,2*Math.PI],gravity:0,lifetime:[3,6],size:[14,28],blendMode:"additive",spreadX:8,spreadY:8},trail:{count:5,color:[200,200,255,180],velocityRange:[1,5],angleRange:[0,2*Math.PI],gravity:0,lifetime:[.3,.8],size:[2,5],blendMode:"alpha",spreadX:3,spreadY:3},magic:{count:50,color:[180,100,255,255],velocityRange:[20,60],angleRange:[0,2*Math.PI],gravity:15,lifetime:[.5,1.5],size:[3,10],blendMode:"additive"},blood:{count:40,color:[180,20,10,220],velocityRange:[40,120],angleRange:[0,2*Math.PI],gravity:-150,lifetime:[.3,1],size:[2,6],blendMode:"alpha"},confetti:{count:60,color:[255,220,50,230],velocityRange:[30,80],angleRange:[0,2*Math.PI],gravity:-20,lifetime:[1.5,4],size:[3,8],blendMode:"alpha",spreadX:100,spreadY:10},bubbles:{count:15,color:[180,220,255,100],velocityRange:[10,30],angleRange:[Math.PI/2-.3,Math.PI/2+.3],gravity:5,lifetime:[2,5],size:[4,14],blendMode:"alpha"},portal:{count:60,color:[100,200,255,200],velocityRange:[15,40],angleRange:[0,2*Math.PI],gravity:0,lifetime:[.8,2],size:[3,8],blendMode:"additive"},lightning:{count:25,color:[200,220,255,255],velocityRange:[150,400],angleRange:[0,2*Math.PI],gravity:0,lifetime:[.05,.2],size:[1,4],blendMode:"additive"}};function Sr(a){return a in ts}function Cr(a,e,t,r){const s=ts[a];return{emitter:a,worldX:e,worldY:t,...s,...r}}function Vn(a){return a.presentation?.space||"world"}function Yn(a){return a.presentation?.renderer?a.presentation.renderer:a.presentation?.dom?.tagName?"dom":"canvas"}function Xn(a){return a.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()}function Ar(a,e){return`${Math.round(a)},${Math.round(e)}`}function rs(a){if(a.startsWith("#")){const t=a.slice(1);return t.length===3?[parseInt(t[0]+t[0],16)/255,parseInt(t[1]+t[1],16)/255,parseInt(t[2]+t[2],16)/255]:[parseInt(t.slice(0,2),16)/255,parseInt(t.slice(2,4),16)/255,parseInt(t.slice(4,6),16)/255]}const e=a.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);return e?[+e[1]/255,+e[2]/255,+e[3]/255]:[1,1,1]}function jn(a){const e=rs(a),t=a.match(/rgba\([^)]+,\s*([\d.]+)\s*\)/),r=t?parseFloat(t[1]):1;return[e[0],e[1],e[2],r]}const Zn=10;class Gt{canvas;overlayRoot;screenOverlayRoot;context;backgroundImage=null;presentationLoopId=null;worldRectangle;canvasId;camera;minScreenDimension;resourceStore;tmpCanvasRectangle={center:{x:0,y:0,z:0},size:{x:1,y:1,z:0}};tmpTextRectangle={center:{x:0,y:0,z:0},size:{x:1,y:1,z:0}};tmpCanvasSize={x:0,y:0,z:0};tmpCanvasBounds={center:{x:0,y:0,z:0},size:{x:1,y:1,z:0}};tmpFrameAgentMap=new Map;textResourcesById=new Map;imageResourcesById=new Map;agentRenderStyles=new Map;spriteUvCache=new Map;domAdapter=null;gpuContext=null;compositor=null;textureAtlas=null;normalAtlas=null;spriteRenderer=null;glyphAtlas=null;getGlyphAdvanceTable(e="sans-serif"){return this.glyphAtlas?this.glyphAtlas.getAdvanceTable(e):null}textRenderer=null;gpuFormat="bgra8unorm";gpuCanvas=null;_gpuClearCountdown=0;_pillInstances=[];_shapeEntries=[];_panelGlassInstances=[];_panelGlassLiveGeom=new Map;_edgeInstances=[];_hoveredPillButton=null;_webgpuInitializing=!1;_gameLoopRunning=!1;lastFrameTime=0;frameDt=1/60;activeEmitterIds=new Map;emitterDiagnosticFrames=0;emitterDiagnosticLogged=!1;lastFreshBfrmMs=0;pendingEmitterOps=[];pendingPostProcessingChain=null;pendingWorldFrameBuffers=new Map;lastParsedFrame=null;snapshotRing=[];static SNAPSHOT_RING_SIZE=4;renderDelayMs=0;lastRenderedSpriteCount=0;lastRenderedSceneData=null;zoomOutFactor=1;onBeforeDrawAgent=null;onAfterDrawAgent=null;onBeforeDrawScreen=null;onAfterDrawScreen=null;onDrawBackground=null;getLocalAgents=null;onCanvasSize=null;onBeforeFrame=[];constructor(){}addCanvas(){const e=document.getElementById(this.canvasId);if(e){this.canvas=e,this.canvas.style.position="absolute",this.canvas.style.inset="0",this.canvas.style.zIndex="2",this.canvas.style.backgroundColor="transparent";return}const t=globalThis;if(typeof globalThis<"u"&&(t.JSDOM||t.__vitest_worker__)){document.body.insertAdjacentHTML("beforeend",'<canvas id="'+this.canvasId+'" style="position:absolute;inset:0;z-index:2;background-color:transparent;"></canvas>'),this.canvas=document.getElementById(this.canvasId);let s=!1;try{this.canvas.getContext&&this.canvas.getContext("2d")||(s=!0)}catch{s=!0}if(s){const n=()=>({clearRect:()=>{},fillRect:()=>{},save:()=>{},restore:()=>{},drawImage:()=>{},translate:()=>{},rotate:()=>{},scale:()=>{},beginPath:()=>{},moveTo:()=>{},lineTo:()=>{},stroke:()=>{},fill:()=>{},rect:()=>{},arc:()=>{},closePath:()=>{},measureText:()=>({width:0}),fillText:()=>{},canvas:this.canvas});Object.defineProperty(this.canvas,"getContext",{configurable:!0,writable:!0,value:n})}}else this.canvas=document.createElement("canvas"),this.canvas.id=this.canvasId,this.canvas.style.position="absolute",this.canvas.style.inset="0",this.canvas.style.zIndex="2",this.canvas.style.backgroundColor="transparent",document.body.appendChild(this.canvas);this.canvas.focus()}addOverlayRoot(){const e=`${this.canvasId}-overlay`,t=`${this.canvasId}-overlay-screen`,r=document.getElementById(e),s=document.getElementById(t);if(r instanceof HTMLDivElement&&s instanceof HTMLDivElement){this.overlayRoot=r,this.screenOverlayRoot=s;return}this.overlayRoot=document.createElement("div"),this.overlayRoot.id=e,this.overlayRoot.style.position="fixed",this.overlayRoot.style.inset="0",this.overlayRoot.style.overflow="hidden",this.overlayRoot.style.pointerEvents="none",this.overlayRoot.style.zIndex="10",document.body.appendChild(this.overlayRoot),this.screenOverlayRoot=document.createElement("div"),this.screenOverlayRoot.id=t,this.screenOverlayRoot.style.position="fixed",this.screenOverlayRoot.style.inset="0",this.screenOverlayRoot.style.overflow="hidden",this.screenOverlayRoot.style.pointerEvents="none",this.screenOverlayRoot.style.zIndex="11",document.body.appendChild(this.screenOverlayRoot)}hideCanvas(){this.canvas.style.visibility="hidden"}showCanvas(){this.canvas.style.visibility="visible"}getContext(){return this.context}getOverlayRoot(){return this.overlayRoot}setBackgroundImageName(e){const t=e?this.resourceStore.retrieveResourceObject(e):null;this.backgroundImage=this._isCanvasImageSource(t)?t:null}defineZoomOutFactor(){const e=this.getSize();if(y.assert(!!e.x,"screen not ready!"),e.x>=this.minScreenDimension&&e.y>=this.minScreenDimension)return 1;const t=Math.min(e.x,e.y);return this.minScreenDimension/t}start(e){this.onBeforeDrawAgent=e.onBeforeDrawAgentInput,this.onAfterDrawAgent=e.onAfterDrawAgentInput,this.onBeforeDrawScreen=e.onBeforeDrawScreenInput||null,this.onAfterDrawScreen=e.onAfterDrawScreenInput,this.minScreenDimension=e.minScreenDimensionInput,this.camera=e.cameraInput,this.canvasId=e.canvasIdInput,this.resourceStore=e.resourceStoreInput,this.worldRectangle={center:{x:0,y:0,z:0},size:{x:e.worldWidth,y:e.worldHeight,z:0}},this.addCanvas(),this.addOverlayRoot(),this.adjustCanvasToWindowSize();let t=null;try{t=this.canvas.getContext("2d")}catch{}if(!t)throw new Error(`Screen.start requires a 2D canvas rendering context for canvas ${this.canvasId}.`);this.context=t,this.domAdapter=new qn(this.overlayRoot,this.screenOverlayRoot),this.setCameraSizeToCanvas()}getTextResource(e){return this.textResourcesById.get(e)}getImageNameById(e){return this.imageResourcesById.get(e)}upsertResourceBatch(e,t){for(const[r,s]of e)this.imageResourcesById.set(r,s);for(const[r,s,n,i,l]of t){const o=l.match(/(\d+px\s+)(.+)$/),c=o?o[2]:"sans-serif",d=rs(n),u=i!=="transparent"?jn(i):null;this.textResourcesById.set(r,{text:s,font:l,textColor:n,bgColor:i,fontFamily:c,colorVec:d,bgColorVec:u})}}upsertAgentRenderStyle(e){for(const t of e){const r=this.agentRenderStyles.get(t.agentId);this.agentRenderStyles.set(t.agentId,{spriteId:t.spriteId,pillStyle:t.pillStyle,panelGlassStyle:t.panelGlassStyle}),t.spriteId!==void 0&&t.spriteId!==r?.spriteId&&this._ensureSpriteUvCache(t.spriteId)}}setPanelGlassLiveGeometry(e,t){t===null?this._panelGlassLiveGeom.delete(e):this._panelGlassLiveGeom.set(e,t)}getParticleSystem(){return this.compositor?.particleSystem??null}attachEmitter(e){if(!Sr(e.emitter)){console.warn(`[Screen] attachEmitter: unknown preset "${e.emitter}", ignoring`);return}const t=this.compositor?.emitterScheduler;if(!t){this.pendingEmitterOps.push({kind:"attach",desc:e});return}const r=`${e.agentId}:${e.slot}`,s=this.activeEmitterIds.get(r);s&&t.removeEmitter(s.schedulerId);const n={};e.count!==void 0&&(n.count=e.count),e.color!==void 0&&(n.color=e.color),e.size!==void 0&&(n.size=e.size),e.angleRange!==void 0&&(n.angleRange=e.angleRange);const i=Cr(e.emitter,0,0,n),l={id:r,mode:"continuous",worldX:0,worldY:0,template:i,rate:e.rate??30,duration:1/0,active:!1},o=t.addEmitter(l);this.activeEmitterIds.set(r,{schedulerId:o,agentId:e.agentId,offsetX:e.offsetX??0,offsetY:e.offsetY??0,baseAngleRange:i.angleRange})}detachEmitter(e){const t=this.compositor?.emitterScheduler;if(!t){this.pendingEmitterOps.push({kind:"detach",desc:e});return}if(e.slot==="*"){for(const r of[...this.activeEmitterIds.keys()])if(r.startsWith(`${e.agentId}:`)){const s=this.activeEmitterIds.get(r);s&&t&&t.removeEmitter(s.schedulerId),this.activeEmitterIds.delete(r)}}else{const r=`${e.agentId}:${e.slot}`,s=this.activeEmitterIds.get(r);s&&t&&t.removeEmitter(s.schedulerId),this.activeEmitterIds.delete(r)}}updateEmitterPositions(e,t){if(this.activeEmitterIds.size===0)return;const r=this.compositor?.emitterScheduler;if(!r||!e)return;let s=0;if(t){const u=performance.now();s=this.lastFreshBfrmMs>0?(u-this.lastFreshBfrmMs)/1e3:1/25,this.lastFreshBfrmMs=u}const n=new Map,i=qe(e),l={};for(let u=0;u<i;u++)Et(e,u,l),n.has(l.agentId)||n.set(l.agentId,{x:l.x,y:l.y,heading:l.rotation});let o=0;for(const[,u]of this.activeEmitterIds){const p=n.get(u.agentId);if(!p){r.setActive(u.schedulerId,!1);continue}o++;const h=Math.cos(p.heading),g=Math.sin(p.heading),f=u.offsetX*h-u.offsetY*g,m=u.offsetX*g+u.offsetY*h;r.setActive(u.schedulerId,!0),r.updatePosition(u.schedulerId,p.x+f,p.y+m);const b=(u.baseAngleRange[1]-u.baseAngleRange[0])/2;r.updateAngleRange(u.schedulerId,[p.heading+Math.PI-b,p.heading+Math.PI+b]),t&&r.advanceSpawn(u.schedulerId,s)}const c=n.size,d=this.activeEmitterIds.size;if(this.emitterDiagnosticFrames++,!this.emitterDiagnosticLogged&&this.emitterDiagnosticFrames>Zn&&d>0&&o===0){const u=Array.from(this.activeEmitterIds.values()).map(h=>h.agentId),p=Array.from(n.keys());console.warn(`[Screen] ${d} emitters registered but no anchor agent is in the current SPRITES frame after ${this.emitterDiagnosticFrames} frames. Emitter anchor agentIds: [${u.join(", ")}]. SPRITES entry count: ${c}. SPRITES agentIds: [${p.join(", ")||"(empty)"}]. Common causes: (1) anchor agent has no sprite image (see docs/PARTICLE_INTEGRATION.md § Anchor must be sprite-bearing), (2) anchor agent is outside the camera frustum, (3) AttachEmitter was sent with an agentId that doesn't match any server-authoritative agent.  This warning fires once per session.`),this.emitterDiagnosticLogged=!0}}enqueueFrameBuffer(e){this.pendingWorldFrameBuffers.set(0,{zIndex:0,buffer:e})}enqueueWorldFrameBuffer(e,t,r){this.pendingWorldFrameBuffers.set(e,{zIndex:t,buffer:r})}_readEdgeInstances(e){const t=te(e,ce.Edges);if(!t)return this._edgeInstances.length=0,this._edgeInstances;const r=Math.floor(t.byteLength/vr);for(;this._edgeInstances.length<r;)this._edgeInstances.push({startX:0,startY:0,startZ:0,endX:0,endY:0,endZ:0,strokeR:0,strokeG:0,strokeB:0,strokeA:0,lineWidth:0,headLength:0,flags:0,cp1X:0,cp1Y:0,cp2X:0,cp2Y:0,stemFromLen:0,stemToLen:0});this._edgeInstances.length=r;for(let s=0;s<r;s++){const n=s*vr,i=this._edgeInstances[s];i.startX=t.getFloat32(n,!0),i.startY=t.getFloat32(n+4,!0),i.startZ=t.getFloat32(n+8,!0),i.endX=t.getFloat32(n+12,!0),i.endY=t.getFloat32(n+16,!0),i.endZ=t.getFloat32(n+20,!0),i.strokeR=t.getFloat32(n+24,!0),i.strokeG=t.getFloat32(n+28,!0),i.strokeB=t.getFloat32(n+32,!0),i.strokeA=t.getFloat32(n+36,!0),i.lineWidth=t.getFloat32(n+40,!0),i.headLength=t.getFloat32(n+44,!0),i.flags=t.getUint32(n+48,!0),i.cp1X=t.getFloat32(n+56,!0),i.cp1Y=t.getFloat32(n+60,!0),i.cp2X=t.getFloat32(n+64,!0),i.cp2Y=t.getFloat32(n+68,!0),i.stemFromLen=t.getFloat32(n+72,!0),i.stemToLen=t.getFloat32(n+76,!0)}return this._edgeInstances}_readPillInstances(e){const t=te(e,ce.Pills);if(!t)return this._pillInstances.length=0,this._pillInstances;const r=Math.floor(t.byteLength/he);for(;this._pillInstances.length<r;)this._pillInstances.push({agentId:0,centerX:0,centerY:0,centerZ:0,width:0,height:0,rotation:0,opacity:0,fillR:0,fillG:0,fillB:0,fillA:0,borderR:0,borderG:0,borderB:0,borderA:0,cornerRadius:0,flags:0,glassTintR:0,glassTintG:0,glassTintB:0,fresnelPower:0,glowIntensity:0,glowR:0,glowG:0,glowB:0,specIntensity:0,specPower:0});this._pillInstances.length=r;for(let s=0;s<r;s++){const n=s*he,i=this._pillInstances[s];i.agentId=t.getUint16(n+0,!0),i.centerX=t.getFloat32(n+4,!0),i.centerY=t.getFloat32(n+8,!0),i.centerZ=t.getFloat32(n+12,!0),i.width=t.getFloat32(n+16,!0),i.height=t.getFloat32(n+20,!0),i.rotation=t.getFloat32(n+24,!0),i.opacity=t.getFloat32(n+28,!0),i.fillR=t.getFloat32(n+32,!0),i.fillG=t.getFloat32(n+36,!0),i.fillB=t.getFloat32(n+40,!0),i.fillA=t.getFloat32(n+44,!0),i.borderR=t.getFloat32(n+48,!0),i.borderG=t.getFloat32(n+52,!0),i.borderB=t.getFloat32(n+56,!0),i.borderA=t.getFloat32(n+60,!0),i.cornerRadius=t.getFloat32(n+64,!0),i.flags=t.getUint32(n+68,!0),i.glassTintR=t.getFloat32(n+72,!0),i.glassTintG=t.getFloat32(n+76,!0),i.glassTintB=t.getFloat32(n+80,!0),i.fresnelPower=t.getFloat32(n+84,!0),i.glowIntensity=t.getFloat32(n+88,!0),i.glowR=t.getFloat32(n+92,!0),i.glowG=t.getFloat32(n+96,!0),i.glowB=t.getFloat32(n+100,!0),i.specIntensity=t.getFloat32(n+104,!0),i.specPower=t.getFloat32(n+108,!0),this._applyPillButtonHoverFlags(i)}return this._pillInstances}_readShapeInstances(e){const t=te(e,ce.Shapes);if(!t)return this._shapeEntries.length=0,this._shapeEntries;const r=Math.floor(t.byteLength/Jr);for(;this._shapeEntries.length<r;)this._shapeEntries.push({agentId:0,shapeType:0,centerX:0,centerY:0,centerZ:0,width:0,height:0,rotation:0,opacity:0,fillR:0,fillG:0,fillB:0,fillA:0,borderR:0,borderG:0,borderB:0,borderA:0,cornerRadius:0,flags:0});this._shapeEntries.length=r;for(let s=0;s<r;s++)dn(e,s,this._shapeEntries[s]);return this._shapeEntries}_shapesToPillInstances(e){const t=[];for(const r of e){if(r.shapeType===yr)continue;const n=this.agentRenderStyles.get(r.agentId)?.pillStyle,i={agentId:r.agentId,centerX:r.centerX,centerY:r.centerY,centerZ:r.centerZ,width:r.width,height:r.height,rotation:r.rotation,opacity:r.opacity,fillR:r.fillR,fillG:r.fillG,fillB:r.fillB,fillA:r.fillA,borderR:r.borderR,borderG:r.borderG,borderB:r.borderB,borderA:r.borderA,cornerRadius:r.cornerRadius,flags:r.flags,glassTintR:n?.glassTintR??0,glassTintG:n?.glassTintG??0,glassTintB:n?.glassTintB??0,fresnelPower:n?.fresnelPower??2.5,glowIntensity:n?.glowIntensity??0,glowR:n?.glowR??0,glowG:n?.glowG??0,glowB:n?.glowB??0,specIntensity:n?.specIntensity??.5,specPower:n?.specPower??32};this._applyPillButtonHoverFlags(i),t.push(i)}return t}_shapesToPanelGlassInstances(e){const t=[];for(const r of e){if(r.shapeType!==yr)continue;const n=this.agentRenderStyles.get(r.agentId)?.panelGlassStyle,i=this._panelGlassLiveGeom.get(r.agentId);t.push({centerX:i?.centerX??r.centerX,centerY:i?.centerY??r.centerY,width:i?.width??r.width,height:i?.height??r.height,cornerRadius:i?.cornerRadius??n?.cornerRadius??r.cornerRadius,opacity:i?.opacity??r.opacity,fillR:n?.fillR??r.fillR,fillG:n?.fillG??r.fillG,fillB:n?.fillB??r.fillB,fillA:n?.fillA??r.fillA,borderR:n?.borderR??r.borderR,borderG:n?.borderG??r.borderG,borderB:n?.borderB??r.borderB,borderA:n?.borderA??r.borderA,glassTintR:n?.glassTintR??r.fillR,glassTintG:n?.glassTintG??r.fillG,glassTintB:n?.glassTintB??r.fillB,fresnelPower:n?.fresnelPower??2.5,glowIntensity:n?.glowIntensity??0,glowR:n?.glowR??0,glowG:n?.glowG??0,glowB:n?.glowB??0,specIntensity:n?.specIntensity??.5,specPower:n?.specPower??32,shape:i?.shape??0,tabDir:i?.tabDir??1})}return t}_applyPillButtonHoverFlags(e){!this._hoveredPillButton||this._hoveredPillButton.agentId!==e.agentId||(this._hoveredPillButton.button==="collapse"?e.flags|=an:this._hoveredPillButton.button==="checkmark"?e.flags|=on:e.flags|=ln)}_squareLoadingImagePills(e,t){if(t.size!==0)for(const r of e){if(!t.has(r.agentId)||!(r.flags&je))continue;const s=Math.min(r.width,r.height);r.width=s,r.height=s,r.cornerRadius=0}}_snapEdgesToLoadingImageNodes(e,t){if(!(t.size===0||e.length===0))for(const r of e)this._snapEdgeEndpoint(r,!0,t),this._snapEdgeEndpoint(r,!1,t)}_snapEdgeEndpoint(e,t,r){const s=t?e.startX:e.endX,n=t?e.startY:e.endY;for(const i of r.values()){const l=s-i.centerX,o=n-i.centerY,c=Math.abs(l),d=Math.abs(o),u=Math.max(i.halfW,i.halfH)*.05+1e-4;if(!(Math.abs(c-i.halfW)<=u&&d<=i.halfH+u||Math.abs(d-i.halfH)<=u&&c<=i.halfW+u))continue;const h=Math.max(c,d);if(h<1e-6)continue;const g=i.sqHalf/h,f=i.centerX+l*g,m=i.centerY+o*g,b=f-s,v=m-n;return t?(e.startX=f,e.startY=m,e.cp1X+=b,e.cp1Y+=v):(e.endX=f,e.endY=m,e.cp2X+=b,e.cp2Y+=v),!0}return!1}setHoveredPillButton(e){this._hoveredPillButton=e}refreshDOMTransforms(){if(!this.domAdapter||!this.camera)return;const e=this.camera.rectangle;this.domAdapter.reapplyTransforms({centerX:e.center.x,centerY:e.center.y,centerZ:e.center.z??0,viewportH:e.size.y,canvasW:this.canvas.width,canvasH:this.canvas.height,pitch:e.pitch??0,yaw:e.yaw??0,roll:e.rotationZ??0,focalLength:e.focalLength??0})}setWorldToCameraSize(){this.worldRectangle.size.x=this.camera.rectangle.size.x,this.worldRectangle.size.y=this.camera.rectangle.size.y,this.worldRectangle.size.z=this.camera.rectangle.size.z}setCameraSizeToCanvas(){const e=this.getSize();return this.camera.rectangle.size.x=e.x*this.zoomOutFactor,this.camera.rectangle.size.y=e.y*this.zoomOutFactor,this.camera.rectangle.size.z=e.z*this.zoomOutFactor,this.camera.rectangle.size}getCanvas(){return this.canvas}adjustCanvasToWindowSize(){this.canvas.width=globalThis.innerWidth,this.canvas.height=globalThis.innerHeight,this.zoomOutFactor=this.defineZoomOutFactor(),this.gpuCanvas&&(this.gpuCanvas.width=this.canvas.width,this.gpuCanvas.height=this.canvas.height),this.compositor&&this.compositor.resize(this.canvas.width,this.canvas.height)}getSize(){return this.tmpCanvasSize.x=this.canvas.width,this.tmpCanvasSize.y=this.canvas.height,this.tmpCanvasSize.z=0,this.tmpCanvasSize}getRectangle(){return this.tmpCanvasBounds.center.x=0,this.tmpCanvasBounds.center.y=0,this.tmpCanvasBounds.center.z=0,this.tmpCanvasBounds.size.x=this.canvas.width,this.tmpCanvasBounds.size.y=this.canvas.height,this.tmpCanvasBounds.size.z=0,this.tmpCanvasBounds}clear(){this.context&&(this.context.save(),this.context.fillStyle="black",this.context.fillRect(0,0,this.canvas.width,this.canvas.height),this.context.restore())}clearTransparent(){this.context&&this.context.clearRect(0,0,this.canvas.width,this.canvas.height)}drawAgentImage(e,t,r=e.imageName){if(!r)throw new Error(`Screen.drawAgentImage requires an imageName for agent ${String(e.id??"unknown")}.`);if(!this.resourceStore.hasResource(r))throw new Error(`Screen.drawAgentImage requires a loaded resource named ${r}.`);this.context.save(),typeof e.opacity=="number"&&e.opacity!==0&&(this.context.globalAlpha=e.opacity);const s=this.camera?.rectangle?.rotationZ||0,n=(e.heading??e.orientation)||0,i=2*Math.PI-(n-s);t.size.x/=this.zoomOutFactor,t.size.y/=this.zoomOutFactor,this.context.globalCompositeOperation=e.compositeOperation||"source-over";const l=i%(2*Math.PI)<1e-9;let o,c,d,u;l?(o=Math.floor(t.center.x-t.size.x/2),c=Math.floor(t.center.y-t.size.y/2),d=Math.ceil(t.center.x+t.size.x/2)-o,u=Math.ceil(t.center.y+t.size.y/2)-c):(this.context.translate(t.center.x,t.center.y),this.context.rotate(i),o=-t.size.x/2,c=-t.size.y/2,d=t.size.x,u=t.size.y),this.onBeforeDrawAgent&&this.onBeforeDrawAgent(e,i,this.context,t);try{const p=this.resourceStore.retrieveResourceObject(r);if(!this._isCanvasImageSource(p))throw new Error(`Screen.drawAgentImage requires ${r} to resolve to a canvas image source.`);this.context.drawImage(p,o,c,d,u)}catch(p){throw new Error(`Screen.drawAgentImage failed for ${r}: ${p instanceof Error?p.message:String(p)}`)}this.onAfterDrawAgent&&this.onAfterDrawAgent(e,i,this.context,t),this.context.restore()}drawBackground(){if(!this.camera||!this.backgroundImage)return;const e=this.backgroundImage.width,t=this.backgroundImage.height,r=this.worldRectangle.size.x,s=this.worldRectangle.size.y,n=this.worldRectangle.center.x,i=this.worldRectangle.center.y,l=this.camera.rectangle,o=n-r/2,c=i+s/2,d=l.center.x-l.size.x/2,u=l.center.y+l.size.y/2,p=Math.abs(d-o),h=Math.abs(u-c),g=r>0?e/r:1,f=s>0?t/s:1,m=l.size.x*g,b=l.size.y*f,v=p*g,w=h*f;this.context.drawImage(this.backgroundImage,v,w,m,b,0,0,this.canvas.width,this.canvas.height)}createImageFromTextForAgent(e){const t=e.text||"",r=this.tmpTextRectangle;return r.center.x=e.rectangle.center.x,r.center.y=e.rectangle.center.y,r.center.z=e.rectangle.center.z,r.size.x=t.length*5,r.size.y=15,r.size.z=e.rectangle.size.z||0,Dn.createImageFromText(this.resourceStore,r,t,e.fontFace??void 0,e.backgroundColor??void 0,e.textColor??void 0,this.context).imageName}getCanvasRectangleForAgent(e,t=this.tmpCanvasRectangle){return Vn(e)==="screen"?(this._copyRect(e.rectangle,t),t):this._projectWorldToCanvas(e.rectangle,t)}_projectWorldToCanvas(e,t){const r=this.camera.rectangle,s=this.canvas.width,n=this.canvas.height,i=r.size.y;if(i<=0)return this._copyRect(e,t),t;const l=Fn({centerX:r.center.x,centerY:r.center.y,viewportH:i,canvasW:s,canvasH:n,pitch:r.pitch??0,yaw:r.yaw??0,roll:r.rotationZ??0},e.center.x,e.center.y,e.center.z),o=n/i;return t.center.x=l.canvasX,t.center.y=l.canvasY,t.center.z=e.center.z??0,t.size.x=e.size.x*o,t.size.y=e.size.y*o,t.size.z=0,t}_copyRect(e,t){t.center.x=e.center.x,t.center.y=e.center.y,t.center.z=e.center.z,t.size.x=e.size.x,t.size.y=e.size.y,t.size.z=e.size.z}drawAgent(e,t=this.tmpFrameAgentMap){if(Yn(e)==="dom")return;const r=!e.imageName&&e.text?this.createImageFromTextForAgent(e):e.imageName,s=this.getCanvasRectangleForAgent(e);if(r){if(!this.resourceStore.hasResource(r))return;this.drawAgentImage(e,s,r)}}drawAllAgents(e){if(!this.camera)return;this.tmpFrameAgentMap.clear();for(const r of e)r.id!=null&&this.tmpFrameAgentMap.set(r.id,r);const t=[...e].sort((r,s)=>{const n=r.rectangle.center.z||0;return(s.rectangle.center.z||0)-n});for(const r of t)this.drawAgent(r,this.tmpFrameAgentMap)}drawWorldBorder(){if(!this.camera)return;const e=this._projectWorldToCanvas(this.worldRectangle,this.tmpCanvasRectangle);e.size.x/=this.zoomOutFactor,e.size.y/=this.zoomOutFactor;const t=this.camera.rectangle.rotationZ||0;this.context.save(),this.context.beginPath();const r=20;this.context.lineWidth=r,this.context.strokeStyle="red",t?(this.context.translate(e.center.x,e.center.y),this.context.rotate(-t),this.context.rect(-e.size.x/2,-e.size.y/2,e.size.x+r/2,e.size.y+r/2)):this.context.rect(e.center.x-e.size.x/2,e.center.y-e.size.y/2,e.size.x+r/2,e.size.y+r/2),this.context.stroke(),this.context.restore()}async initWebGPU(){if(!(this._webgpuInitializing||this.gpuContext)){this._webgpuInitializing=!0;try{if(typeof navigator>"u"||!navigator.gpu){if(typeof document<"u"&&document.body&&!document.getElementById("brainiac-webgpu-warning")){const v=document.createElement("div");v.id="brainiac-webgpu-warning",v.style.cssText="position:fixed;top:0;left:0;right:0;background:#c00;color:#fff;padding:1em 1.5em;text-align:center;font-family:sans-serif;font-size:14px;z-index:99999;box-shadow:0 2px 8px rgba(0,0,0,0.3)",v.textContent="WebGPU is required to run this app, but is not available in your browser. Please use a recent version of Chrome, Edge, or Firefox with WebGPU enabled.",document.body.appendChild(v)}throw new Error("[Screen.initWebGPU] WebGPU not available (navigator.gpu missing). A user-facing warning banner has been injected into the page.")}const[{GPUContext:e},{Compositor:t},{TextureAtlas:r},{SpriteRenderer:s},{GlyphAtlas:n},{TextRenderer:i}]=await Promise.all([oe(()=>Promise.resolve().then(()=>li),void 0,import.meta.url),oe(()=>import("./Compositor-CLg3v6gl.js"),[],import.meta.url),oe(()=>import("./TextureAtlas-CEXlIAqn.js"),[],import.meta.url),oe(()=>import("./SpriteRenderer-aaP7mChX.js"),[],import.meta.url),oe(()=>import("./GlyphAtlas-sbTmWT6P.js"),[],import.meta.url),oe(()=>import("./TextRenderer-CWWMSOlm.js"),[],import.meta.url)]),l=await e.create();this.gpuContext=l,this.gpuFormat=navigator.gpu.getPreferredCanvasFormat(),l.device.lost.then(v=>{console.warn(`[Screen] GPU device lost (${v.reason}): ${v.message}`),this.destroyGPU(),setTimeout(()=>{q("[Screen] Attempting WebGPU re-initialization after device loss..."),this.initWebGPU().catch(w=>{console.error("[Screen] WebGPU re-initialization failed:",w)})},500)});const o=document.createElement("canvas");o.id=`${this.canvasId}-webgpu`,o.width=this.canvas.width,o.height=this.canvas.height,o.style.position="absolute",o.style.inset="0",o.style.zIndex="1",o.style.pointerEvents="none",this.canvas.insertAdjacentElement("afterend",o),this.gpuCanvas=o;const c={canvas:o,format:this.gpuFormat,width:o.width,height:o.height};if(this.compositor=await t.create(l,c),this.pendingPostProcessingChain){const v=this.pendingPostProcessingChain;this.pendingPostProcessingChain=null,this.setPostProcessingChain(v)}else this.compositor.postProcessing.setChain([{effect:"bloom",threshold:.72,intensity:.12}]);this.textureAtlas=r.create(l),this.normalAtlas=r.create(l);const d=document.createElement("canvas");d.width=1,d.height=1;const u=d.getContext("2d");u.fillStyle="#8080ff",u.fillRect(0,0,1,1),this.normalAtlas.addImage("__fallback_normal",d),this.normalAtlas.upload(),this.spriteRenderer=await s.create(l,this.textureAtlas,this.normalAtlas,this.gpuFormat),this.compositor.setSpriteRenderer(this.spriteRenderer),this.glyphAtlas=n.create(l),this.textRenderer=await i.create(l,this.glyphAtlas,this.gpuFormat),this.compositor.setTextRenderer(this.textRenderer);const{EdgeRenderer:p}=await oe(async()=>{const{EdgeRenderer:v}=await import("./EdgeRenderer-CKkOWSo7.js");return{EdgeRenderer:v}},[],import.meta.url),h=await p.create(l,this.gpuFormat);this.compositor.setEdgeRenderer(h);const{PillRenderer:g}=await oe(async()=>{const{PillRenderer:v}=await import("./PillRenderer-DPbJM-ff.js");return{PillRenderer:v}},[],import.meta.url),f=await g.create(l,this.gpuFormat);this.compositor.setPillRenderer(f);const{PanelGlassRenderer:m}=await oe(async()=>{const{PanelGlassRenderer:v}=await import("./PanelGlassRenderer-Bh9y2OxX.js");return{PanelGlassRenderer:v}},[],import.meta.url),b=await m.create(l,this.gpuFormat);this.compositor.setPanelGlassRenderer(b),q("[Screen] WebGPU compositor initialized (sprites + SDF text + edges + pills)")}finally{this._webgpuInitializing=!1}if(this.pendingEmitterOps.length>0){const e=this.pendingEmitterOps;this.pendingEmitterOps=[],q(`[Screen] draining ${e.length} pending emitter ops`);for(const t of e)t.kind==="attach"?this.attachEmitter(t.desc):this.detachEmitter(t.desc)}}}destroyGPU(){this._webgpuInitializing=!1,this.pendingPostProcessingChain=null;try{this.compositor?.destroy()}catch{}this.compositor=null,this.spriteRenderer=null,this.textRenderer=null;try{this.textureAtlas?.destroy()}catch{}try{this.normalAtlas?.destroy()}catch{}this.textureAtlas=null,this.normalAtlas=null;try{this.glyphAtlas?.destroy()}catch{}this.glyphAtlas=null;try{this.gpuContext?.destroy()}catch{}this.gpuContext=null,this.gpuCanvas&&(this.gpuCanvas.remove(),this.gpuCanvas=null)}ensureAtlasEntry(e){if(!this.textureAtlas)return;const t=this.textureAtlas.getEntry(e);let r=null;if(!e.startsWith("__text:")){{if(e.startsWith("__particle:"))return;{if(t){if(this.resourceStore){const n=this.textureAtlas.getSourceRef?.(e),i=this.resourceStore.retrieveResourceObject(e);if((n===void 0||i!==n)&&this._isCanvasImageSource(i)){i instanceof HTMLCanvasElement&&i.getContext("2d");try{this.textureAtlas.updateImage(e,i),this.textureAtlas.upload()}catch(o){q("[Screen] atlas updateImage failed for",e,o)}}}return t}if(!this.resourceStore?.checkResourceObjectExists(e))return;const s=this.resourceStore.retrieveResourceObject(e);this._isCanvasImageSource(s)&&(s instanceof HTMLCanvasElement&&s.getContext("2d"),r=s)}}if(!(!r||r.width===0||r.height===0))try{return this.textureAtlas.addImage(e,r)}catch{this.textureAtlas.reset();try{return this.textureAtlas.addImage(e,r)}catch(s){q("[Screen] ensureAtlasEntry failed after reset for",e,s);return}}}}ensureNormalAtlasEntry(e){if(!this.normalAtlas)return;const t=e.slice(0,-4)+"_normal.png",r=this.normalAtlas.getEntry(t);if(r)return r;if(!this.resourceStore?.checkResourceObjectExists(t))return this.normalAtlas.getEntry("__fallback_normal")??void 0;const s=this.resourceStore.retrieveResourceObject(t);if(this._isCanvasImageSource(s))try{return this.normalAtlas.addImage(t,s)}catch{this.normalAtlas.reset();try{return this.normalAtlas.addImage(t,s)}catch(n){return q("[Screen] ensureNormalAtlasEntry failed after reset for",t,n),this.normalAtlas.getEntry("__fallback_normal")??void 0}}return this.normalAtlas.getEntry("__fallback_normal")??void 0}_ensureSpriteUvCache(e){if(this.spriteUvCache.has(e))return;const t=this.getImageNameById(e);if(!t||t.startsWith("__particle:")||t.startsWith("__text:"))return;const r=this.ensureAtlasEntry(t);if(!r)return;const s=this.ensureNormalAtlasEntry(t);this.spriteUvCache.set(e,{atlasU0:r.uv[0],atlasV0:r.uv[1],atlasU1:r.uv[2],atlasV1:r.uv[3],normalU0:s?s.uv[0]:0,normalV0:s?s.uv[1]:0,normalU1:s?s.uv[2]:0,normalV1:s?s.uv[3]:0})}_refreshSpriteUvCache(){if(!this.textureAtlas)return;let e=!1;for(const[t,r]of this.spriteUvCache){const s=this.getImageNameById(t);if(!s)continue;const n=this.textureAtlas.getEntry(s);if(n)if(r.atlasU0===n.uv[0]&&r.atlasV0===n.uv[1]&&r.atlasU1===n.uv[2]&&r.atlasV1===n.uv[3]){const i=this.textureAtlas.getSourceRef?.(s),l=this.resourceStore?.retrieveResourceObject(s);if((i===void 0||l!==i)&&this._isCanvasImageSource(l))try{this.textureAtlas.updateImage(s,l),e=!0}catch(c){q("[Screen] atlas updateImage failed for",s,c)}}else{const i=this.ensureNormalAtlasEntry(s);this.spriteUvCache.set(t,{atlasU0:n.uv[0],atlasV0:n.uv[1],atlasU1:n.uv[2],atlasV1:n.uv[3],normalU0:i?i.uv[0]:0,normalV0:i?i.uv[1]:0,normalU1:i?i.uv[2]:0,normalV1:i?i.uv[3]:0})}}e&&this.textureAtlas.upload()}_buildSpriteMap(e){const t=new Map,r=qe(e);for(let s=0;s<r;s++){const n=Et(e,s);t.set(n.agentId,n)}return t}_lerp(e,t,r){return e+(t-e)*r}_slerpQuat(e,t,r,s,n,i,l,o,c){let d=e*n+t*i+r*l+s*o,u=n,p=i,h=l,g=o;d<0&&(u=-n,p=-i,h=-l,g=-o,d=-d);const f=.9995;let m,b,v,w;if(d>f)m=e+c*(u-e),b=t+c*(p-t),v=r+c*(h-r),w=s+c*(g-s);else{const _=Math.acos(d),E=_*c,A=Math.sin(E),I=Math.sin(_),C=Math.cos(E)-d*A/I,N=A/I;m=C*e+N*u,b=C*t+N*p,v=C*r+N*h,w=C*s+N*g}const x=Math.sqrt(m*m+b*b+v*v+w*w);if(x>1e-12){const _=1/x;m*=_,b*=_,v*=_,w*=_}else m=0,b=0,v=0,w=1;return{x:m,y:b,z:v,w}}_interpolateSceneEntry(e,t,r){const s=this._slerpQuat(e.quatX,e.quatY,e.quatZ,e.quatW,t.quatX,t.quatY,t.quatZ,t.quatW,r);return{spriteId:t.spriteId,flags:t.flags,agentId:t.agentId,x:this._lerp(e.x,t.x,r),y:this._lerp(e.y,t.y,r),w:this._lerp(e.w,t.w,r),h:this._lerp(e.h,t.h,r),rotation:this._lerp(e.rotation,t.rotation,r),opacity:this._lerp(e.opacity,t.opacity,r),worldZ:this._lerp(e.worldZ,t.worldZ,r),zIndex:t.zIndex,quatX:s.x,quatY:s.y,quatZ:s.z,quatW:s.w}}_interpolateCamera(e,t,r){return!e||!t?t??e:{centerX:this._lerp(e.centerX,t.centerX,r),centerY:this._lerp(e.centerY,t.centerY,r),centerZ:this._lerp(e.centerZ,t.centerZ,r),viewportW:this._lerp(e.viewportW,t.viewportW,r),viewportH:this._lerp(e.viewportH,t.viewportH,r),roll:this._lerp(e.roll,t.roll,r),focalLength:this._lerp(e.focalLength,t.focalLength,r),pitch:this._lerp(e.pitch,t.pitch,r),yaw:this._lerp(e.yaw,t.yaw,r)}}_spriteEntryToInstance(e,t){const r=this.getTextResource(e.spriteId);if(r)return r.text?{sprite:null,textLabel:{text:r.text,fontFamily:r.fontFamily,color:r.colorVec,bgColor:r.bgColorVec,worldX:e.x,worldY:e.y,worldZ:e.worldZ,width:e.w,height:e.h,rotation:e.rotation,opacity:e.opacity}}:{sprite:null,textLabel:null};const s=this.getImageNameById(e.spriteId);if(!s)return{sprite:null,textLabel:null};if(s.startsWith("__particle:"))return{sprite:null,textLabel:null};let n=this.spriteUvCache.get(e.spriteId);if(!n){const d=this.ensureAtlasEntry(s);if(!d){if(e.flags&br){t?.set(e.agentId,{centerX:e.x,centerY:e.y,halfW:e.w*.5,halfH:e.h*.5,sqHalf:Math.min(e.w,e.h)*.5});const p=(e.flags&mr)!==0;return{sprite:{worldX:e.x,worldY:e.y,worldZ:e.worldZ,width:e.w,height:e.h,rotation:e.rotation,opacity:e.opacity,atlasU0:0,atlasV0:0,atlasU1:0,atlasV1:0,flags:(p?1:0)+8,normalU0:0,normalV0:0,normalU1:0,normalV1:0,quatX:e.quatX,quatY:e.quatY,quatZ:e.quatZ,quatW:e.quatW},textLabel:null}}return{sprite:null,textLabel:null}}const u=this.ensureNormalAtlasEntry(s);n={atlasU0:d.uv[0],atlasV0:d.uv[1],atlasU1:d.uv[2],atlasV1:d.uv[3],normalU0:u?u.uv[0]:0,normalV0:u?u.uv[1]:0,normalU1:u?u.uv[2]:0,normalV1:u?u.uv[3]:0},this.spriteUvCache.set(e.spriteId,n)}const i=(e.flags&16)!==0,l=(e.flags&mr)!==0,o=(e.flags&br)!==0,c=(l?1:0)+(i?2:0)+(o?4:0);return{sprite:{worldX:e.x,worldY:e.y,worldZ:e.worldZ,width:e.w,height:e.h,rotation:e.rotation,opacity:e.opacity,atlasU0:i?n.atlasU1:n.atlasU0,atlasV0:n.atlasV0,atlasU1:i?n.atlasU0:n.atlasU1,atlasV1:n.atlasV1,flags:c,normalU0:i?n.normalU1:n.normalU0,normalV0:n.normalV0,normalU1:i?n.normalU0:n.normalU1,normalV1:n.normalV1,quatX:e.quatX,quatY:e.quatY,quatZ:e.quatZ,quatW:e.quatW},textLabel:null}}_readSpritesDirect(e,t){const r=[],s=[],n=qe(e);for(let i=0;i<n;i++){const l=Et(e,i),{sprite:o,textLabel:c}=this._spriteEntryToInstance(l,t);o&&r.push(o),c&&s.push(c)}return{sprites:r,textLabels:s}}_getInterpolationFrames(e){const t=this.snapshotRing;if(t.length<2||this.renderDelayMs<=0)return{prev:t[t.length-1]??null,next:null,t:1};for(let r=0;r<t.length-1;r++)if(t[r].arrivalTime<=e&&t[r+1].arrivalTime>e){const s=t[r+1].arrivalTime-t[r].arrivalTime,n=s>0?(e-t[r].arrivalTime)/s:0;return{prev:t[r],next:t[r+1],t:Math.max(0,Math.min(1,n))}}return e<t[0].arrivalTime?{prev:t[0],next:null,t:0}:{prev:t[t.length-1],next:null,t:1}}renderFrameWebGPU(e,t,r,s){if(!this.compositor||!this.textureAtlas)return;this._refreshSpriteUvCache();const n=new Map;let i=[],l=[],o=null;if(this.renderDelayMs>0&&this.snapshotRing.length>=2){const p=performance.now(),{prev:h,next:g,t:f}=this._getInterpolationFrames(p-this.renderDelayMs);if(h&&g){const m=this._buildSpriteMap(h.frame),b=this._buildSpriteMap(g.frame);for(const[,v]of b){const w=m.get(v.agentId),x=w?this._interpolateSceneEntry(w,v,f):v,{sprite:_,textLabel:E}=this._spriteEntryToInstance(x,n);_&&i.push(_),E&&l.push(E)}o=this._interpolateCamera(Me(h.frame),Me(g.frame),f)}else if(h){const m=this._readSpritesDirect(h.frame,n);i=m.sprites,l=m.textLabels,o=Me(h.frame)}}if(i.length===0&&l.length===0&&!o){const p=this._readSpritesDirect(e,n);i=p.sprites,l=p.textLabels,o=Me(e)}const c=r;let d=[];if(s.length>0){const p=this._shapesToPillInstances(s);c.push(...p),d=this._shapesToPanelGlassInstances(s)}if(this._squareLoadingImagePills(c,n),this._snapEdgesToLoadingImageNodes(t,n),c.length>0&&l.length>0){const p=new Set,h=new Set,g=new Set;for(const f of c){const m=Ar(f.centerX,f.centerY);f.flags&Kr&&!(f.flags&pt)&&p.add(m),f.flags&pt&&h.add(m),g.add(m)}for(const f of l){const m=Ar(f.worldX,f.worldY);p.has(m)&&(f.collapsibleCaret=!0),h.has(m)&&(f.activeCheck=!0),g.has(m)&&(f.pinned=!0)}}if(this.textureAtlas.upload(),this.normalAtlas?.upload(),!o)throw new Error("[Screen] CAMERA section missing from frame buffer");const u={...o,canvasW:this.gpuCanvas?.width??this.canvas.width,canvasH:this.gpuCanvas?.height??this.canvas.height};this.camera?.rectangle&&(this.camera.rectangle.center.x=o.centerX,this.camera.rectangle.center.y=o.centerY,this.camera.rectangle.center.z=o.centerZ,this.camera.rectangle.size.x=o.viewportW,this.camera.rectangle.size.y=o.viewportH,this.camera.rectangle.rotationZ=o.roll,this.camera.rectangle.pitch=o.pitch,this.camera.rectangle.yaw=o.yaw,this.camera.rectangle.focalLength=o.focalLength),this.compositor.renderFrame({sprites:i,textLabels:l,edges:t.length>0?t:void 0,pills:c.length>0?c:void 0,panelGlass:d.length>0?d:void 0,camera:u,dt:Math.min(this.frameDt,.1)})}processEffectDescriptors(e){if(e.length===0||!this.compositor)return;let t=!1;for(const r of e)switch(r.type){case"SpawnParticles":r.emitter==="rain"&&(t=!0),this.handleSpawnParticles(r);break;case"TriggerVisualEffect":this.handleTriggerVisualEffect(r);break;default:console.warn("[Screen] Unknown effect descriptor type:",r.type)}this.compositor.setStreakScale(t?.15:0)}setPostProcessingChain(e){const t=this.compositor?.postProcessing;if(!t){this.pendingPostProcessingChain=e;return}this.pendingPostProcessingChain=null;const r=e.map(s=>{const n=s,i=Xn(n.effect);return{...n,effect:i}});t.setChain(r).catch(s=>{console.error("[Screen] setPostProcessingChain failed:",s)})}handleSpawnParticles(e){const t=this.compositor?.particleSystem;if(!t)return;const{emitter:r,worldX:s,worldY:n}=e,i={count:e.count,color:e.color,velocityRange:e.velocityRange,angleRange:e.angleRange,gravity:e.gravity,lifetime:e.lifetime,size:e.size,blendMode:e.blendMode.toLowerCase()==="alpha"?"alpha":"additive",spreadX:e.spreadX??0,spreadY:e.spreadY??0};Sr(r)?t.enqueueSpawn(Cr(r,s,n,i)):t.enqueueSpawn({emitter:r,worldX:s,worldY:n,...i})}handleTriggerVisualEffect(e){const t=this.compositor?.effects;t&&t.trigger(e.preset,e.worldX,e.worldY)}_renderMultiWorldComposition(e){const r=e.map(([g,f])=>({worldId:g,...f})).sort((g,f)=>g.zIndex-f.zIndex).map(g=>({worldId:g.worldId,zIndex:g.zIndex,frame:Ae(g.buffer)}));if(this.onCanvasSize?.(this.canvas.width,this.canvas.height),this.textureAtlas&&this.resourceStore){const g=this.resourceStore.drainStaleAtlasNames();for(const f of g)this.textureAtlas.removeEntry(f),this.normalAtlas?.removeEntry(f+"_normal")}const s=[],n=[],i=[],l=[],o=[];let c=null,d=0;for(const g of r){const{sprites:f,textLabels:m}=this._readSpritesDirect(g.frame);s.push(...f),n.push(...m);const b=this._readEdgeInstances(g.frame);i.push(...b);const v=this._readPillInstances(g.frame);l.push(...v);const w=this._readShapeInstances(g.frame);w.length>0&&(l.push(...this._shapesToPillInstances(w)),o.push(...this._shapesToPanelGlassInstances(w))),d+=qe(g.frame);const x=Me(g.frame);x&&(c=x)}this.lastRenderedSpriteCount=d;const u=r[r.length-1]?.frame??null;this.lastRenderedSceneData=u?te(u,ce.Sprites):null,this.lastParsedFrame=u,c&&this.camera?.rectangle&&(this.camera.rectangle.center.x=c.centerX,this.camera.rectangle.center.y=c.centerY,this.camera.rectangle.center.z=c.centerZ,this.camera.rectangle.size.x=c.viewportW,this.camera.rectangle.size.y=c.viewportH,this.camera.rectangle.rotationZ=c.roll,this.camera.rectangle.pitch=c.pitch,this.camera.rectangle.yaw=c.yaw,this.camera.rectangle.focalLength=c.focalLength);for(const g of r)this.processEffectDescriptors(xr(g.frame));const p=performance.now();this.frameDt=this.lastFrameTime>0?(p-this.lastFrameTime)/1e3:1/60,this.lastFrameTime=p;for(const g of r)this.updateEmitterPositions(g.frame,!0);if(this.clearTransparent(),this.backgroundImage&&this.drawBackground(),this.onDrawBackground&&this.camera){const g=this.camera.rectangle;this.onDrawBackground(this.context,{centerX:g.center.x,centerY:g.center.y,viewportW:g.size.x,viewportH:g.size.y,roll:g.rotationZ??0})}if(this.compositor)try{if(this.textureAtlas?.upload(),this.normalAtlas?.upload(),c&&d>0){const g={...c,canvasW:this.gpuCanvas?.width??this.canvas.width,canvasH:this.gpuCanvas?.height??this.canvas.height};this.camera?.rectangle&&(this.camera.rectangle.center.x=c.centerX,this.camera.rectangle.center.y=c.centerY,this.camera.rectangle.center.z=c.centerZ,this.camera.rectangle.size.x=c.viewportW,this.camera.rectangle.size.y=c.viewportH,this.camera.rectangle.rotationZ=c.roll,this.camera.rectangle.pitch=c.pitch,this.camera.rectangle.yaw=c.yaw,this.camera.rectangle.focalLength=c.focalLength),this.compositor.renderFrame({sprites:s,textLabels:n,edges:i.length>0?i:void 0,pills:l.length>0?l:void 0,panelGlass:o.length>0?o:void 0,camera:g,dt:Math.min(this.frameDt,.1)}),this._gpuClearCountdown=0}else{c&&d===0?this._gpuClearCountdown=5:!c&&this._gpuClearCountdown>0&&this._gpuClearCountdown--;const g=this.camera?.rectangle;this.compositor.renderFrame({sprites:[],textLabels:[],edges:i.length>0?i:void 0,pills:l.length>0?l:void 0,panelGlass:o.length>0?o:void 0,camera:{centerX:g?.center.x??0,centerY:g?.center.y??0,centerZ:0,viewportW:g?.size.x??this.canvas.width,viewportH:g?.size.y??this.canvas.height,canvasW:this.gpuCanvas?.width??this.canvas.width,canvasH:this.gpuCanvas?.height??this.canvas.height,pitch:g?.pitch??0,yaw:g?.yaw??0,roll:g?.rotationZ??0,focalLength:0},dt:Math.min(this.frameDt,.1)})}}catch(g){console.error("[Screen] compositor.renderFrame threw, disabling render loop:",g),this.compositor=null}if(this.domAdapter&&this.camera){const g=this.camera.rectangle,f=r[r.length-1]?.frame??null;if(f){const m=wr(f);if(m){const b={centerX:g.center.x,centerY:g.center.y,centerZ:g.center.z??0,viewportH:g.size.y,canvasW:this.canvas.width,canvasH:this.canvas.height,pitch:g.pitch??0,yaw:g.yaw??0,roll:g.rotationZ??0,focalLength:g.focalLength??0},v=m.buffer.slice(m.byteOffset,m.byteOffset+m.byteLength);this.domAdapter.reconcile(v,b)}}}this.onBeforeDrawScreen&&this.onBeforeDrawScreen(this.context);const h=this.getLocalAgents?.();h&&h.length>0&&this.drawAllAgents(h),this.onAfterDrawScreen&&this.onAfterDrawScreen(this.context)}gamePresentationLoop=()=>{if(this._gameLoopRunning)return;this._gameLoopRunning=!0;for(const h of this.onBeforeFrame)h();const e=Array.from(this.pendingWorldFrameBuffers.entries());if(this.pendingWorldFrameBuffers.clear(),e.length>1){this._renderMultiWorldComposition(e),this.presentationLoopId=globalThis.requestAnimationFrame(this.gamePresentationLoop),this._gameLoopRunning=!1;return}const r=e.length>0?e[0][1].buffer:null;if(this.onCanvasSize?.(this.canvas.width,this.canvas.height),this.textureAtlas&&this.resourceStore){const h=this.resourceStore.drainStaleAtlasNames();for(const g of h)this.textureAtlas.removeEntry(g),this.normalAtlas?.removeEntry(g+"_normal")}let s=null;r&&(s=Ae(r),this.lastParsedFrame=s,this.snapshotRing.push({frameId:s.frameId,arrivalTime:performance.now(),frame:s}),this.snapshotRing.length>Gt.SNAPSHOT_RING_SIZE&&this.snapshotRing.shift());const n=s??this.lastParsedFrame;if(this.lastRenderedSpriteCount=n?qe(n):0,this.lastRenderedSceneData=n?te(n,ce.Sprites):null,n&&this.camera?.rectangle){const h=Me(n);h&&(this.camera.rectangle.center.x=h.centerX,this.camera.rectangle.center.y=h.centerY,this.camera.rectangle.center.z=h.centerZ,this.camera.rectangle.size.x=h.viewportW,this.camera.rectangle.size.y=h.viewportH,this.camera.rectangle.rotationZ=h.roll,this.camera.rectangle.pitch=h.pitch,this.camera.rectangle.yaw=h.yaw,this.camera.rectangle.focalLength=h.focalLength)}s&&this.processEffectDescriptors(xr(s));const i=performance.now();if(this.frameDt=this.lastFrameTime>0?(i-this.lastFrameTime)/1e3:1/60,this.lastFrameTime=i,this.updateEmitterPositions(n,s!==null),this.clearTransparent(),this.backgroundImage&&this.drawBackground(),this.onDrawBackground&&this.camera){const h=this.camera.rectangle;this.onDrawBackground(this.context,{centerX:h.center.x,centerY:h.center.y,viewportW:h.size.x,viewportH:h.size.y,roll:h.rotationZ??0})}const l=n?this._readEdgeInstances(n):[],o=n?this._readPillInstances(n):[],c=n?this._readShapeInstances(n):[],d=[...o];let u=[];if(c.length>0&&(d.push(...this._shapesToPillInstances(c)),u=this._shapesToPanelGlassInstances(c)),this.compositor)try{n&&this.lastRenderedSpriteCount>0?(this.renderFrameWebGPU(n,l,o,c),this._gpuClearCountdown=0):(n&&this.lastRenderedSpriteCount===0?this._gpuClearCountdown=5:!n&&this._gpuClearCountdown>0&&this._gpuClearCountdown--,this.compositor.renderFrame({sprites:[],textLabels:[],edges:l.length>0?l:void 0,pills:d.length>0?d:void 0,panelGlass:u.length>0?u:void 0,camera:{centerX:this.camera?.rectangle.center.x??0,centerY:this.camera?.rectangle.center.y??0,centerZ:0,viewportW:this.camera?.rectangle.size.x??this.canvas.width,viewportH:this.camera?.rectangle.size.y??this.canvas.height,canvasW:this.canvas.width,canvasH:this.canvas.height,pitch:this.camera?.rectangle.pitch??0,yaw:this.camera?.rectangle.yaw??0,roll:this.camera?.rectangle.rotationZ??0,focalLength:0},dt:Math.min(this.frameDt,.1)}))}catch(h){console.error("[Screen] compositor.renderFrame threw, disabling render loop:",h),this.compositor=null}if(s&&this.domAdapter&&this.camera){const h=this.camera.rectangle,g=wr(s);if(g){const f={centerX:h.center.x,centerY:h.center.y,centerZ:h.center.z??0,viewportH:h.size.y,canvasW:this.canvas.width,canvasH:this.canvas.height,pitch:h.pitch??0,yaw:h.yaw??0,roll:h.rotationZ??0,focalLength:h.focalLength??0},m=g.buffer.slice(g.byteOffset,g.byteOffset+g.byteLength);this.domAdapter.reconcile(m,f)}}this.onBeforeDrawScreen&&this.onBeforeDrawScreen(this.context);const p=this.getLocalAgents?.();p&&p.length>0&&this.drawAllAgents(p),this.onAfterDrawScreen&&this.onAfterDrawScreen(this.context),this.presentationLoopId=globalThis.requestAnimationFrame(this.gamePresentationLoop),this._gameLoopRunning=!1};clearFrameCache(){this.snapshotRing.length=0,this.lastParsedFrame=null,this.pendingWorldFrameBuffers.clear(),this.pendingEmitterOps.length=0,this.lastRenderedSceneData=null,this.lastRenderedSpriteCount=0,this.lastFrameTime=0,this.lastFreshBfrmMs=0,this._gpuClearCountdown=5,this.activeEmitterIds.clear(),this.compositor?.emitterScheduler?.clear(),this.domAdapter?.clear(),this.setPostProcessingChain([]),this.backgroundImage=null,this.imageResourcesById.clear(),this.textResourcesById.clear(),this.agentRenderStyles.clear(),this.spriteUvCache.clear(),this.onBeforeDrawAgent=null,this.onAfterDrawAgent=null,this.onBeforeDrawScreen=null,this.onAfterDrawScreen=null,this.onDrawBackground=null,this.getLocalAgents=null,this.onCanvasSize=null,this.renderDelayMs=0,this.emitterDiagnosticFrames=0,this.emitterDiagnosticLogged=!1,zn()}stopGamePresentationLoop(){this.presentationLoopId!==null&&(globalThis.cancelAnimationFrame(this.presentationLoopId),this.presentationLoopId=null),this._gameLoopRunning=!1,this.activeEmitterIds.clear(),this.compositor?.emitterScheduler?.clear(),this.domAdapter?.clear(),this.destroyGPU(),this.clear(),this.snapshotRing.length=0,this.lastParsedFrame=null,this.pendingWorldFrameBuffers.clear(),this.pendingEmitterOps.length=0,this.lastRenderedSceneData=null,this.lastRenderedSpriteCount=0,this.lastFrameTime=0,this.lastFreshBfrmMs=0}_isCanvasImageSource(e){return typeof e=="object"&&e!==null&&(this._isCanvasImageSourceWithSize(e)||this._isImageBitmap(e))}_isCanvasImageSourceWithSize(e){return typeof e!="object"||e===null?!1:typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement?!0:"width"in e&&typeof e.width=="number"&&"height"in e&&typeof e.height=="number"}_isImageBitmap(e){return typeof ImageBitmap<"u"&&e instanceof ImageBitmap}}class Jn{propagate;pressedKeys=new Set;constructor(e){this.propagate=e}start(){window.addEventListener("keydown",this.onKeyDown),window.addEventListener("keyup",this.onKeyUp)}stop(){window.removeEventListener("keydown",this.onKeyDown),window.removeEventListener("keyup",this.onKeyUp),this.pressedKeys.clear()}getDeepActiveElement(){let e=document.activeElement;for(;e&&e.shadowRoot&&e.shadowRoot.activeElement;)e=e.shadowRoot.activeElement;return e}isFocusInInteractiveControl(){const e=this.getDeepActiveElement();if(!e||e===document.body||e===document.documentElement)return!1;const t=e.tagName.toLowerCase();if(t==="input"||t==="textarea"||t==="select"||t==="button"||e.isContentEditable)return!0;const r=e.getAttribute("tabindex");return r!==null&&parseInt(r,10)>=0}onKeyDown=e=>{const t=this.isFocusInInteractiveControl();if((e.key.startsWith("Arrow")||e.key===" "||e.key==="Spacebar")&&!t&&e.preventDefault(),t||e.repeat)return;const s=e.key.replace(/"/g,"");this.pressedKeys.add(s),this.propagate("onKeyDown",s)};onKeyUp=e=>{const t=e.key.replace(/"/g,"");this.pressedKeys.delete(t),this.propagate("onKeyUp",t)}}class Kn{propagate;screen;mouseCanvasX=0;mouseCanvasY=0;hasMouseCanvasPosition=!1;mousePositionChanged=!1;lastPropagatedX=NaN;lastPropagatedY=NaN;_beforeFrameCb=null;constructor(e,t){this.propagate=e,this.screen=t}start(e){window.addEventListener("mousedown",this.onMouseDown),window.addEventListener("dblclick",this.onDoubleClick),window.addEventListener("contextmenu",this.onContextMenu),window.addEventListener("mousemove",this.onMouseMove),window.addEventListener("mouseup",this.onMouseUp),window.addEventListener("scroll",this.preventMotion,!1),window.addEventListener("touchmove",this.treatTouchMove,{passive:!1}),this._beforeFrameCb=this.propagateMouseMoveOnInterval,this.screen.onBeforeFrame.push(this._beforeFrameCb)}stop(){if(window.removeEventListener("mousedown",this.onMouseDown),window.removeEventListener("dblclick",this.onDoubleClick),window.removeEventListener("contextmenu",this.onContextMenu),window.removeEventListener("mousemove",this.onMouseMove),window.removeEventListener("mouseup",this.onMouseUp),window.removeEventListener("scroll",this.preventMotion),window.removeEventListener("touchmove",this.treatTouchMove),this._beforeFrameCb){const e=this.screen.onBeforeFrame.indexOf(this._beforeFrameCb);e!==-1&&this.screen.onBeforeFrame.splice(e,1),this._beforeFrameCb=null}}buildCanvasPayload(){const e=this.screen.getSize();return{canvasX:this.mouseCanvasX,canvasY:this.mouseCanvasY,canvasW:e.x,canvasH:e.y}}updateMouseCanvasPosition(e){const t=this._resolvePointer(e);if(!t)throw new Error("MouseHandler requires a pointer event with client coordinates.");const r=this.screen.getCanvas().getBoundingClientRect();this.mouseCanvasX=t.clientX-r.left,this.mouseCanvasY=t.clientY-r.top,this.hasMouseCanvasPosition=!0}onMouseDown=e=>{this.updateMouseCanvasPosition(e),this.propagate("onMouseDown",this.buildCanvasPayload()),e.stopPropagation()};onDoubleClick=e=>{this.updateMouseCanvasPosition(e),this.propagate("onDoubleClick",this.buildCanvasPayload()),e.stopPropagation()};onContextMenu=e=>{this.updateMouseCanvasPosition(e),this.propagate("onContextMenu",this.buildCanvasPayload()),e.preventDefault(),e.stopPropagation()};onMouseUp=e=>{this.updateMouseCanvasPosition(e),this.mousePositionChanged=!1,this.propagate("onMouseUp",this.buildCanvasPayload())};onMouseMove=e=>{e.preventDefault();const t=this.hasMouseCanvasPosition?this.mouseCanvasX:null,r=this.hasMouseCanvasPosition?this.mouseCanvasY:null;this.updateMouseCanvasPosition(e),(!this.hasMouseCanvasPosition||this.mouseCanvasX!==t||this.mouseCanvasY!==r)&&(this.mousePositionChanged=!0)};treatTouchMove=e=>{e.preventDefault(),this.updateMouseCanvasPosition(e),this.propagate("onMouseMove",this.buildCanvasPayload()),this.preventMotion(e)};preventMotion=e=>{window.scrollTo(0,0),e.preventDefault(),e.stopPropagation()};propagateMouseMoveOnInterval=()=>{if(this.mousePositionChanged){const e=this.mouseCanvasX,t=this.mouseCanvasY;(e!==this.lastPropagatedX||t!==this.lastPropagatedY)&&(this.propagate("onMouseMove",this.buildCanvasPayload()),this.lastPropagatedX=e,this.lastPropagatedY=t),this.mousePositionChanged=!1}};_resolvePointer(e){if("touches"in e&&e.touches&&e.touches.length>0){const t=e.touches.item(0);if(t)return{clientX:t.clientX,clientY:t.clientY}}return pn(e)?{clientX:e.clientX,clientY:e.clientY}:null}}const At=.1;class Qn{propagate;gamepadPrevState=new Map;gamepadRafId=null;constructor(e){this.propagate=e}start(){window.addEventListener("gamepadconnected",this.onGamepadConnected),window.addEventListener("gamepaddisconnected",this.onGamepadDisconnected)}stop(){this.gamepadRafId!==null&&(window.cancelAnimationFrame(this.gamepadRafId),this.gamepadRafId=null),window.removeEventListener("gamepadconnected",this.onGamepadConnected),window.removeEventListener("gamepaddisconnected",this.onGamepadDisconnected),this.gamepadPrevState.clear()}scheduleGamepadPoll=()=>{this.gamepadRafId=window.requestAnimationFrame(this.pollGamepads)};onGamepadConnected=e=>{const t=e.gamepad,r={index:t.index,id:t.id,mapping:t.mapping,axes:t.axes.length,buttons:t.buttons.length};this.gamepadPrevState.set(t.index,{axes:Array.from(t.axes),buttons:t.buttons.map(s=>s.pressed)}),this.propagate("onGamepadConnected",r),this.gamepadRafId===null&&this.scheduleGamepadPoll()};onGamepadDisconnected=e=>{const t=e.gamepad;this.gamepadPrevState.delete(t.index);const r={index:t.index};this.propagate("onGamepadDisconnected",r),this.gamepadPrevState.size===0&&this.gamepadRafId!==null&&(window.cancelAnimationFrame(this.gamepadRafId),this.gamepadRafId=null)};applyDeadZone(e){return Math.abs(e)<At?0:(e<0?-1:1)*(Math.abs(e)-At)/(1-At)}pollGamepads=()=>{if(typeof navigator>"u"||!navigator.getGamepads){this.scheduleGamepadPoll();return}const e=navigator.getGamepads();for(let t=0;t<e.length;t++){const r=e[t];if(!r)continue;const s=this.gamepadPrevState.get(r.index);if(!s){this.gamepadPrevState.set(r.index,{axes:Array.from(r.axes),buttons:r.buttons.map(i=>i.pressed)});continue}let n=!1;for(let i=0;i<r.axes.length;i++){const l=r.axes[i]??0,o=this.applyDeadZone(l),c=s.axes[i]??0;if(o!==c){s.axes[i]=o,i<=1&&(n=!0);const d={index:r.index,axis:i,value:o};this.propagate("onGamepadAxis",d)}}n&&this.propagate("onGamepadLeftStick",{index:r.index,x:s.axes[0]??0,y:s.axes[1]??0});for(let i=0;i<r.buttons.length;i++){const l=r.buttons[i],o=l.pressed,c=s.buttons[i]??!1;if(o!==c){s.buttons[i]=o;const d={index:r.index,button:i,pressed:o,value:l.value};this.propagate("onGamepadButton",d)}}}this.scheduleGamepadPoll()}}class ei{propagate=()=>{};screen;keyboardHandler;mouseHandler;gamepadHandler;constructor(){}onResizeCanvas=()=>{const e=this.screen.getCanvas();if(!e)throw new Error("UserEvents.onResizeCanvas requires an initialized screen canvas.");this.screen.adjustCanvasToWindowSize(),this.screen.refreshDOMTransforms(),this.propagate("onResizeCanvas",{x:e.width,y:e.height,z:0})};start(e,t,r){if(!r?.getCanvas||!r?.getSize)throw new Error("UserEvents.start requires a Screen with canvas and size accessors.");this.screen=r,this.propagate=t,this.keyboardHandler=new Jn(this.propagate),this.mouseHandler=new Kn(this.propagate,this.screen),this.gamepadHandler=new Qn(this.propagate),this.keyboardHandler.start(),this.mouseHandler.start(e),this.gamepadHandler.start(),window.addEventListener("resize",this.onResizeCanvas)}stop(){this.keyboardHandler?.stop(),this.mouseHandler?.stop(),this.gamepadHandler?.stop(),window.removeEventListener("resize",this.onResizeCanvas)}}var ae=(a=>(a[a.Command=0]="Command",a[a.Event=1]="Event",a[a.Query=2]="Query",a[a.Reply=3]="Reply",a[a.Error=4]="Error",a[a.Control=5]="Control",a))(ae||{});(a=>{function e(i){return i===2}a.expectsReply=e;function t(i){return i===1||i===5}a.isBroadcast=t;function r(i){return i===0||i===2||i===3||i===4}a.requiresTarget=r;function s(i){return i===1||i===5}a.requiresTopic=s;function n(i){switch(i){case 0:return"Command";case 1:return"Event";case 2:return"Query";case 3:return"Reply";case 4:return"Error";case 5:return"Control";default:return`Unknown(${i})`}}a.toString=n})(ae||(ae={}));var Ot;(a=>{function e(r,s){return{kind:r,messageKind:s}}a.create=e;function t(r){switch(r.kind){case 0:return`${ae.toString(r.messageKind)} message requires a target module`;case 1:return`${ae.toString(r.messageKind)} message requires a topic`;case 2:return`${ae.toString(r.messageKind)} message should not have a target`;case 3:return`${ae.toString(r.messageKind)} message should not have a topic`}}a.toString=t})(Ot||(Ot={}));class ti extends Error{errorKind;messageKind;constructor(e,t){super(Ot.toString({kind:e,messageKind:t})),this.errorKind=e,this.messageKind=t,this.name="EnvelopeValidationError"}toStructured(){return{kind:this.errorKind,messageKind:this.messageKind}}}class ee{messageId;kind;sender;target;topic;correlationId;payload;constructor(e,t,r,s){this.messageId=e,this.kind=t,this.sender=r,this.target=null,this.topic=null,this.correlationId=null,this.payload=s}static new(e,t,r){return new ee(e,5,t,r)}static command(e,t,r,s){const n=new ee(e,0,t,s);return n.target=r,n}static event(e,t,r,s){const n=new ee(e,1,t,s);return n.topic=r,n}static query(e,t,r,s){const n=new ee(e,2,t,s);return n.target=r,n}static reply(e,t,r,s,n){const i=new ee(e,3,t,n);return i.target=r,i.correlationId=s,i}static error(e,t,r,s,n){const i=new ee(e,4,t,n);return i.target=r,i.correlationId=s,i}withCorrelationId(e){return this.correlationId=e,this}withTopic(e){return this.topic=e,this}withTarget(e){return this.target=e,this}mapPayload(e){const t=new ee(this.messageId,this.kind,this.sender,e(this.payload));return t.target=this.target,t.topic=this.topic,t.correlationId=this.correlationId,t}validate(){const e=this.kind;return ae.requiresTarget(e)&&this.target===null?{ok:!1,error:{kind:0,messageKind:e}}:ae.requiresTopic(e)&&this.topic===null?{ok:!1,error:{kind:1,messageKind:e}}:ae.isBroadcast(e)&&this.target!==null?{ok:!1,error:{kind:2,messageKind:e}}:!ae.isBroadcast(e)&&this.topic!==null&&!ae.requiresTopic(e)?{ok:!1,error:{kind:3,messageKind:e}}:{ok:!0}}validateOrThrow(){const e=this.validate();if(!e.ok){const t=e.error;throw new ti(t.kind,t.messageKind)}}}const Ft=2,be=31,kr=255,Ir=4e6,ri=new TextEncoder,si=new TextDecoder,ni=new Uint8Array(0);function $a(a){const e=a.topic!==null?ri.encode(a.topic):ni,t=e.length,r=a.payload.length;if(t>kr)throw new Error(`Topic too long: ${t} > ${kr}`);if(r>Ir)throw new Error(`Payload too long: ${r} > ${Ir}`);const s=be+t+r,n=new ArrayBuffer(s),i=new DataView(n),l=new Uint8Array(n);i.setUint8(0,Ft),i.setUint32(1,a.messageId>>>0,!0),i.setUint32(5,Math.floor(a.messageId/4294967296)>>>0,!0),i.setUint32(9,a.sender,!0),i.setUint32(13,a.target??0,!0);const o=a.correlationId??0;return i.setUint32(17,o>>>0,!0),i.setUint32(21,Math.floor(o/4294967296)>>>0,!0),i.setUint8(25,a.kind),i.setUint8(26,t),i.setUint32(27,r,!0),l.set(e,be),l.set(a.payload,be+t),n}function Na(a){const e=a instanceof ArrayBuffer?new Uint8Array(a):new Uint8Array(a.buffer,a.byteOffset,a.byteLength),t=new DataView(e.buffer,e.byteOffset,e.byteLength);if(e.byteLength<be)throw new Error(`Buffer too small for envelope header: ${e.byteLength}`);const r=t.getUint8(0);if(r!==Ft)throw new Error(`Unsupported envelope wire version: got ${r}, expected ${Ft}`);const s=t.getUint32(1,!0)+4294967296*t.getUint32(5,!0),n=t.getUint32(9,!0),i=t.getUint32(13,!0),l=t.getUint32(17,!0)+4294967296*t.getUint32(21,!0),o=t.getUint8(25),c=t.getUint8(26),d=t.getUint32(27,!0),u=be+c+d;if(e.byteLength<u)throw new Error(`Buffer too small: expected ${u}, got ${e.byteLength}`);const p=c>0?si.decode(e.subarray(be,be+c)):null,h=e.slice(be+c,be+c+d),g=new ee(s,o,n,h);return g.target=i!==0?i:null,g.correlationId=l!==0?l:null,g.topic=p,g}var rt=(a=>(a[a.Created=0]="Created",a[a.Initialized=1]="Initialized",a[a.Running=2]="Running",a[a.Stopped=3]="Stopped",a[a.Failed=4]="Failed",a))(rt||{});(a=>{function e(t){switch(t){case 0:return"Created";case 1:return"Initialized";case 2:return"Running";case 3:return"Stopped";case 4:return"Failed";default:return`Unknown(${t})`}}a.toString=e})(rt||(rt={}));var Tr;(a=>{function e(t){switch(t.kind){case"InitFailed":return`module init failed: ${t.reason}`;case"StartFailed":return`module start failed: ${t.reason}`;case"StopFailed":return`module stop failed: ${t.reason}`;case"InvalidTransition":return`invalid state transition: ${rt.toString(t.from)} -> ${rt.toString(t.to)}`}}a.toString=e})(Tr||(Tr={}));var Rr;(a=>{function e(t){switch(t.kind){case"ModuleRegistered":return`module registered: ${t.moduleId.toString()}`;case"ModuleUnregistered":return`module unregistered: ${t.moduleId.toString()}`;case"MessageEnqueued":return`message enqueued: ${t.messageId}`;case"MessageDispatched":return`message dispatched: ${t.messageId}`;case"MessagePublished":return`message published: ${t.messageId} -> ${t.topic} (${t.deliveries} deliveries)`;case"MailboxOverflow":return`mailbox overflow: actor ${t.actorId}, message ${t.messageId}, policy ${t.policy}`}}a.toString=e})(Rr||(Rr={}));const Pr=.85,Lr=.42,Mr=27,we=Hr;class ii{userName="";gameContainerId="contentArea";onAfterDrawAgent=null;onBeforeDrawAgent=null;onBeforeDrawScreen=null;onAfterDrawScreen=null;onDrawBackground=null;app=null;agentsExecutionIntervalId=null;channel=null;_pollFrameCb=null;config=null;_backgroundImageName="";camera={rectangle:{center:{x:0,y:0,z:0},size:{x:1,y:1,z:0}}};resourceStore=new Mn;screen=new Gt;driverRegistry=new un;compositorBridge=new hn;_isDragging=!1;_hoveredPillButton=null;userEvents;_eventHandlers=new Map;constructor(){this.userEvents=new ei,this._registerCapabilityDrivers()}_registerCapabilityDrivers(){this.driverRegistry.register("nexus.sound",e=>{const t=e;q("Sound.playSound requested:",t.name),this._handlePlaySound(t.name,t.x??0,t.y??0)}),this.driverRegistry.register("nexus.procedural_sound",e=>{const t=e;q("Sound.playDescr requested:",t.descr),this._handlePlayDescr(t.descr,t.x??0,t.y??0)}),this.driverRegistry.register("nexus.sound_loop",e=>{const t=e;q("Sound.playSoundLoop requested:",t.name);const r=this.resourceStore.retrieveResourceObject(t.name);gn(r)&&Re.playSoundLoop(r)})}registerDriver(e,t){this.driverRegistry.register(e,t)}_on(e,t){this._eventHandlers.has(e)||this._eventHandlers.set(e,[]),this._eventHandlers.get(e).push(t)}_off(e){this._eventHandlers.delete(e)}_emit(e,...t){this._eventHandlers.get(e)?.forEach(r=>{try{r(...t)}catch(s){console.error(s)}})}_handlePlaySound(e,t,r){if(!e)throw new Error("Presentation Sound.playSound requires a sound descriptor.");let s;try{s=JSON.parse(e)}catch{throw new Error(`Presentation Sound.playSound requires a JSON-serialized SoundEffectDescriptor. Got invalid JSON: ${e}`)}this._playTypedSound(s,{x:t,y:r})}_handlePlayDescr(e,t,r){if(!e)throw new Error("Presentation Sound.playDescr requires a descriptor.");if(typeof e=="string"){let s;try{s=JSON.parse(e)}catch{throw new Error(`Presentation Sound.playDescr requires a JSON-serialized SoundEffectDescriptor. Got invalid JSON: ${e}`)}this._playTypedSound(s,{x:t,y:r});return}this._playTypedSound(e,{x:t,y:r})}async _playTypedSound(e,t){const{getAudioMixer:r}=await oe(async()=>{const{getAudioMixer:i}=await import("./audio_mixer-tftRAZcw.js");return{getAudioMixer:i}},[],import.meta.url),s=await r();if(!s)throw new Error(`AudioMixer is unavailable — sound playback requires browser AudioContext support. Descriptor type: ${e?.type??"unknown"}`);const n=t?{x:t.x,y:t.y,z:0}:void 0;s.playSound(e,n),q(`AudioMixer played sound: ${e?.type??"unknown"}`)}_rehydrateVector(e){if(!e)throw new Error("_rehydrateVector called with falsy input. The deserialized payload is missing required vector data.");const t=this._getVectorData(e);if(t&&t.length>=2){const r=t.length>=3&&typeof t[2]=="number"?t[2]:0;return{x:t[0],y:t[1],z:r}}if(typeof e.x=="number"&&typeof e.y=="number"){const r=typeof e.z=="number"?e.z:0;return{x:e.x,y:e.y,z:r}}return e}setCameraToAgentPosition(e){const t=this.screen.getSize(),r=this.screen.zoomOutFactor,s={center:{x:e.rectangle.center.x,y:e.rectangle.center.y,z:e.rectangle.center.z??0},size:{x:t.x*r,y:t.y*r,z:0}};this.setCamera({rectangle:s})}getCamera(){return this.camera}getResourceStore(){return this.resourceStore}getScreen(){return this.screen}getVisibleAgentCount(){return this.screen?.lastRenderedSpriteCount??0}setCamera(e){const t=this._rehydrateVector(e.rectangle.center),r=this._rehydrateVector(e.rectangle.size);if(t&&typeof t.x=="number"){const s=t;this.camera.rectangle.center.x=s.x,this.camera.rectangle.center.y=s.y,this.camera.rectangle.center.z=s.z}if(r&&typeof r.x=="number"){const s=r;this.camera.rectangle.size.x=s.x,this.camera.rectangle.size.y=s.y,this.camera.rectangle.size.z=s.z}if(typeof e.rectangle.rotationZ=="number"&&(this.camera.rectangle.rotationZ=e.rectangle.rotationZ),typeof e.rectangle.pitch=="number"&&(this.camera.rectangle.pitch=e.rectangle.pitch),typeof e.rectangle.yaw=="number"&&(this.camera.rectangle.yaw=e.rectangle.yaw),typeof e.rectangle.focalLength=="number"&&(this.camera.rectangle.focalLength=e.rectangle.focalLength),this.compositorBridge.ready){const s=this.camera.rectangle.center,n=this.camera.rectangle.size,i=this.screen.getSize();this.compositorBridge.sendCamera(s.x,s.y,n.x,n.y,this.camera.rectangle.pitch??0,this.camera.rectangle.yaw??0,this.camera.rectangle.rotationZ??0,i.x,i.y)}}_removeAllAudioEvents(){this.resourceStore.retrieveAllAudioNames().map(e=>Re.clearAllEvents(e))}_removeLoadingMessage(){const e=document.getElementById("loading");e&&e.parentNode.removeChild(e)}_snapshotVector(e){if(!e)return null;const t=this._getVectorData(e),r=typeof e.x=="number"?e.x:t&&t.length>=1?t[0]:void 0,s=typeof e.y=="number"?e.y:t&&t.length>=2?t[1]:void 0,n=typeof e.z=="number"?e.z:t&&t.length>=3?t[2]:0;return typeof r!="number"||typeof s!="number"?null:{x:r,y:s,z:n}}_snapshotCamera(e){if(!e||!e.rectangle)return null;const t=this._snapshotVector(e.rectangle.center),r=this._snapshotVector(e.rectangle.size);return!t||!r?null:{rectangle:{center:t,size:r,rotationZ:e.rectangle.rotationZ,pitch:e.rectangle.pitch,yaw:e.rectangle.yaw}}}propagateUserEvent=(e,t)=>{const r=this._snapshotVector(t)||t;if(this.compositorBridge.ready){const s=r,n=s.canvasX??s.x??0,i=s.canvasY??s.y??0;e==="onMouseDown"?(this.compositorBridge.writeMouseDown(n,i),this._updateDragCursor(n,i,"down")):e==="onMouseMove"?(this.compositorBridge.writeMouseMove(n,i),this._updateDragCursor(n,i,"move")):e==="onMouseUp"&&(this.compositorBridge.writeMouseUp(n,i),this._updateDragCursor(n,i,"up"))}if(this.channel?.ready){const s=new TextEncoder().encode(JSON.stringify({event:e,arg:r})),n=ee.event(0,0,"nexus.user_event",s);this.channel.sendReliable(n)}window.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!1,composed:!0}))};_updateDragCursor(e,t,r){const s=this.screen.getCanvas?.();if(!s)return;console.log("[cursor diag] _updateDragCursor");const n=this._hitTestPillCheckmark(e,t)??this._hitTestPillPin(e,t)??this._hitTestPillButton(e,t)??null;this._hoveredPillButton=n,this.screen.setHoveredPillButton(n),r==="down"?n?(this._isDragging=!1,s.style.cursor="pointer"):this._hitTestDraggable(e,t)||this._hitTestDraggablePill(e,t)?(this._isDragging=!0,s.style.cursor="grabbing"):s.style.cursor="":r==="up"?(this._isDragging=!1,n?s.style.cursor="pointer":s.style.cursor=this._hitTestDraggable(e,t)||this._hitTestDraggablePill(e,t)?"grab":""):this._isDragging||(n?s.style.cursor="pointer":s.style.cursor=this._hitTestDraggable(e,t)||this._hitTestDraggablePill(e,t)?"grab":"")}_hitTestDraggable(e,t){const r=this.compositorBridge.getSceneBufferView();if(!r||r.byteLength<ge)return!1;let s;try{s=Ae(r)}catch{return!1}const n=te(s,ce.Sprites);if(!n)return!1;const i=this.camera.rectangle,l=this.screen.getSize().x||1,o=this.screen.getSize().y||1,c=i.size.x/l,d=i.size.y/o,u=e*c+(i.center.x-i.size.x/2),p=(o-t)*d+(i.center.y-i.size.y/2),h=Math.floor(n.byteLength/ut);for(let g=0;g<h;g++){const f=g*ut;if(!(n.getUint8(f+Zr)&nn))continue;const b=n.getFloat32(f+4,!0),v=n.getFloat32(f+8,!0),w=n.getFloat32(f+12,!0),x=n.getFloat32(f+16,!0);if(Math.abs(u-b)<=w/2&&Math.abs(p-v)<=x/2)return!0}return!1}_hitTestDraggablePill(e,t){const r=this.compositorBridge.getSceneBufferView();if(!r||r.byteLength<ge)return!1;let s;try{s=Ae(r)}catch{return!1}const n=te(s,ce.Pills);if(!n)return!1;const i=this.camera.rectangle,l=this.screen.getSize().x||1,o=this.screen.getSize().y||1,c=i.size.x/l,d=i.size.y/o,u=e*c+(i.center.x-i.size.x/2),p=(o-t)*d+(i.center.y-i.size.y/2),h=Math.floor(n.byteLength/he);for(let g=0;g<h;g++){const f=g*he;if(!(n.getUint32(f+68,!0)&cn))continue;const b=n.getFloat32(f+4,!0),v=n.getFloat32(f+8,!0),w=n.getFloat32(f+16,!0),x=n.getFloat32(f+20,!0);if(Math.abs(u-b)<=w/2&&Math.abs(p-v)<=x/2)return!0}return!1}_hitTestPillButton(e,t){const r=this.compositorBridge.getSceneBufferView();if(!r||r.byteLength<ge)return null;let s;try{s=Ae(r)}catch{return null}const n=te(s,ce.Pills);if(!n)return null;const i=this.camera.rectangle,l=this.screen.getSize().x||1,o=this.screen.getSize().y||1,c=i.size.x/l,d=i.size.y/o,u=e*c+(i.center.x-i.size.x/2),p=(o-t)*d+(i.center.y-i.size.y/2),h=48,g=48,f=.953,m=.364,b=Math.floor(n.byteLength/he);for(let v=0;v<b;v++){const w=v*he,x=n.getUint32(w+68,!0);if(!(x&Kr))continue;const _=n.getUint16(w+0,!0),E=n.getFloat32(w+4,!0),A=n.getFloat32(w+8,!0),I=n.getFloat32(w+16,!0),C=n.getFloat32(w+20,!0),N=I/2,T=C/2,R=x&je?Mr:T;let z,D;x&je?(z=E+N+Pr*R,D=A-Lr*R):(z=E+N-f*T,D=A);const $=Math.max(h/2,m*R),O=Math.max(g/2,R),fe=z-$,L=z+$,S=D-O,H=D+O;if(u>=fe&&u<=L&&p>=S&&p<=H)return console.log("[cursor diag] _hitTestPillButton"),{agentId:_,button:"collapse"}}return null}_hitTestPillPin(e,t){console.log("[cursor diag] _hitTestPillPin");const r=this.compositorBridge.getSceneBufferView();if(!r||r.byteLength<ge)return null;let s;try{s=Ae(r)}catch{return null}const n=te(s,ce.Pills);if(!n)return null;const i=this.camera.rectangle,l=this.screen.getSize().x||1,o=this.screen.getSize().y||1,c=i.size.x/l,d=i.size.y/o,u=e*c+(i.center.x-i.size.x/2),p=(o-t)*d+(i.center.y-i.size.y/2),h=48,g=48,f=.953,m=1.1436,b=.364,v=Math.floor(n.byteLength/he);for(let w=0;w<v;w++){const x=w*he,_=n.getUint32(x+68,!0);if(_&pt)continue;const E=n.getUint16(x+0,!0),A=n.getFloat32(x+4,!0),I=n.getFloat32(x+8,!0),C=n.getFloat32(x+16,!0),N=n.getFloat32(x+20,!0),T=C/2,R=N/2,z=_&je?Mr:R;let D,$;_&je?(D=A+T+Pr*z,$=I+Lr*z):(D=A+T-f*R-m*R,$=I);const O=Math.max(h/2,b*z),fe=Math.max(g/2,z),L=D-O,S=D+O,H=$-fe,F=$+fe;if(u>=L&&u<=S&&p>=H&&p<=F)return{agentId:E,button:"pin"}}return null}_hitTestPillCheckmark(e,t){console.log("[cursor diag] _hitTestPillCheckmark");const r=this.compositorBridge.getSceneBufferView();if(!r||r.byteLength<ge)return null;let s;try{s=Ae(r)}catch{return null}const n=te(s,ce.Pills);if(!n)return null;const i=this.camera.rectangle,l=this.screen.getSize().x||1,o=this.screen.getSize().y||1,c=i.size.x/l,d=i.size.y/o,u=e*c+(i.center.x-i.size.x/2),p=(o-t)*d+(i.center.y-i.size.y/2),h=48,g=48,f=.75,m=.364,b=Math.floor(n.byteLength/he);for(let v=0;v<b;v++){const w=v*he;if(!(n.getUint32(w+68,!0)&pt))continue;const _=n.getUint16(w+0,!0),E=n.getFloat32(w+4,!0),A=n.getFloat32(w+8,!0),I=n.getFloat32(w+16,!0),C=n.getFloat32(w+20,!0),N=I/2,T=C/2,R=E-f*N,z=Math.max(h/2,m*T),D=Math.max(g/2,T),$=R-z,O=R+z,fe=A-D,L=A+D;if(u>=$&&u<=O&&p>=fe&&p<=L)return{agentId:_,button:"checkmark"}}return null}connectChannel(e){if(this.channel=e,this._setupChannelHandlers(),e.pollFrame){const t=()=>e.pollFrame();this.screen.onBeforeFrame.push(t),this._pollFrameCb=t}}_startConnection(){if(!this.config)throw new Error("Presentation configuration is not loaded.");if(!this.channel)throw new Error("Presentation._startConnection: no channel wired. Call `connectChannel(await connectClient({ localApp, workerUrl, signalingUrl }))` before starting Presentation.")}_setupChannelHandlers(){if(!this.channel)throw new Error("Presentation _setupChannelHandlers requires an initialized channel.");this.channel.onMessage((e,t)=>{if(e==="unreliable"){let s;if(t instanceof DataView)s=t;else if(t instanceof ArrayBuffer)s=new DataView(t);else return;if(this.compositorBridge.ready){const n=new ArrayBuffer(s.byteLength);new Uint8Array(n).set(new Uint8Array(s.buffer,s.byteOffset,s.byteLength)),this.compositorBridge.sendAuthorityScene(n)}this.screen.enqueueFrameBuffer(s);return}const r=t;if(r.topic)try{const s=JSON.parse(new TextDecoder().decode(r.payload));this._handleServerMessage(r.topic,s)}catch{}})}_handleServerMessage(e,t){if(!this.driverRegistry.dispatch(e,t))switch(e){case"nexus.emit":{const r=t;this._handleNamedEvent(r.event,r.data);break}case"nexus.post_processing":{const r=t;q("SetPostProcessing requested:",r.chain),this.screen.setPostProcessingChain(r.chain);break}case"nexus.visuals":{const r=t;q("DispatchVisuals received:",r.descriptors.length,"descriptors"),this.resourceStore.createEffectsFromDescriptor({images:r.descriptors});break}case"nexus.attach_emitter":{const r=t;q("AttachEmitter received:",r.desc),this.screen.attachEmitter(r.desc);break}case"nexus.detach_emitter":{const r=t;q("DetachEmitter received:",r.desc),this.screen.detachEmitter(r.desc);break}case"nexus.resource_batch":{const r=t;q("ResourceBatch received:",r.images.length,"images,",r.texts.length,"texts"),this.screen.upsertResourceBatch(r.images,r.texts);break}case"nexus.agent_render_style":{const r=t;q("AgentRenderStyle received:",r.styles.length,"styles"),this.screen.upsertAgentRenderStyle(r.styles);break}}}_handleNamedEvent(e,t){switch(e){case"messageToAppClient":{const r=t,s=this.app?ms(this.app,r.message):null;s&&s.call(this.app,r.contentObject);break}case"camera":{this.setCamera(t);break}case"AgentRunner.clientStartReady":{this._emit("gameReady",t);break}case"requestInitialPageInfoReady":{this._emit("initialPageInfoReady",t);break}case"Presentation.openModalLink":{const r=document.getElementById("openModalLink");r&&r.click();break}default:this._emit(e,t);break}}async start(e){this.app=e,await this._loadBootstrapResources(),await this._initializeRuntime(),this._startConnection(),await this.connectToGameServer()}async connectToGameServer(){const e=this._requireApp();if(this.screen.stopGamePresentationLoop(),this._removeAllAudioEvents(),this.resourceStore.removeTemporaryResources(),this.userEvents.stop(),this.compositorBridge.stop(),this._off("gameReady"),y.assertIsFunction(e.getMediaAssets,"You need to define 'getMediaAssets' on the game to be able to load your media assets."),e.getMediaAssets().forEach(n=>this.resourceStore.addResource(n)),await this.resourceStore.whenReady(),e.onAfterDrawAgent&&(this.onAfterDrawAgent=e.onAfterDrawAgent.bind(e)),e.onBeforeDrawAgent&&(this.onBeforeDrawAgent=e.onBeforeDrawAgent.bind(e)),e.onBeforeDrawScreen&&(this.onBeforeDrawScreen=e.onBeforeDrawScreen.bind(e)),e.onAfterDrawScreen&&(this.onAfterDrawScreen=e.onAfterDrawScreen.bind(e)),e.onDrawBackground&&(this.onDrawBackground=e.onDrawBackground.bind(e)),this.screen.start({onBeforeDrawAgentInput:this.onBeforeDrawAgent,onAfterDrawAgentInput:this.onAfterDrawAgent,onBeforeDrawScreenInput:this.onBeforeDrawScreen,onAfterDrawScreenInput:this.onAfterDrawScreen,minScreenDimensionInput:we.MIN_SCREEN_DIMENSION,cameraInput:this.camera,canvasIdInput:Dt.CANVAS_ID,worldWidth:we.WORLD_WIDTH,worldHeight:we.WORLD_HEIGHT,resourceStoreInput:this.resourceStore}),this.screen.getLocalAgents=()=>[],this.onDrawBackground&&(this.screen.onDrawBackground=this.onDrawBackground),this.config?.worldToCameraSize&&this.screen.setWorldToCameraSize(),!e.showInitialScreenAndReturnUserName)throw new Error("Presentation requires app.showInitialScreenAndReturnUserName before connecting to the game server.");this.userName=await e.showInitialScreenAndReturnUserName(this),this.screen.adjustCanvasToWindowSize(),this.screen.setCameraSizeToCanvas();const r=this._snapshotVector(this.camera.rectangle.size)||this.camera.rectangle.size,s={userName:this.userName,cameraSize:r};if(q(`[Presentation] connectToGameServer: channel=${!!this.channel}, userName=${this.userName}`),this.channel){this._on("gameReady",(...l)=>{const o=l[0],c=o?.userAgentId;this.setBackgroundImageName(o?.backgroundImagename??""),e.onConnectToServer&&e.onConnectToServer(this.userName,c),this.userEvents.start(Dt.MOUSE_MOVE_PROPAGATION_LATENCY,this.propagateUserEvent,this.screen),this.screen.domAdapter&&(this.screen.domAdapter.onForwardEvent=(d,u)=>{if(d==="nexus-panel-glass:bounds"){const p=u;p.detail&&this.screen.setPanelGlassLiveGeometry(p.agentId,p.detail);return}this.propagateUserEvent(d,u)}),this.compositorBridge.start().catch(d=>{q("Compositor Worker unavailable — SharedArrayBuffer requires COOP/COEP headers:",d)}),this.compositorBridge.onDragConfirm=(d,u,p)=>{this.messageToGameServer("agentDragEnd",{agentId:d,x:u,y:p})},this.screen.initWebGPU().then(()=>{const d=this.screen.getGlyphAdvanceTable();this.channel&&d&&this.messageToGameServer("glyphMetrics",d),this.screen.gamePresentationLoop()}).catch(d=>{console.error("[Presentation] WebGPU init failed:",d),this.screen.gamePresentationLoop()})}),q(`[Presentation] sending clientStart for user: ${s.userName}`);const n=new TextEncoder().encode(JSON.stringify({userName:s.userName,cameraSize:s.cameraSize})),i=ee.event(0,0,"nexus.client_start",n);this.channel.sendReliable(i)}}setBackgroundImageName(e){this._backgroundImageName=e,this.screen.setBackgroundImageName(e)}getBackgroundImageName(){return this._backgroundImageName}startGameSession(e){this.userName=e;const t=this._snapshotVector(this.camera.rectangle.size)||this.camera.rectangle.size,r={userName:this.userName,cameraSize:t};if(this.channel?.ready){const s=new TextEncoder().encode(JSON.stringify({userName:r.userName,cameraSize:r.cameraSize})),n=ee.event(0,0,"nexus.client_start",s);this.channel.sendReliable(n)}}messageToGameServer(e,t){if(!this.channel)throw new Error("Presentation messageToGameServer requires an initialized channel.");const r=new TextEncoder().encode(JSON.stringify({message:e,contentObject:t})),s=ee.event(0,0,"nexus.app_message",r);this.channel.sendReliable(s)}async _loadBootstrapResources(){const e=this._requireApp();this.resourceStore.createEffectsFromDescriptor(we.COMMON_EFFECTS_DESCRIPTION),we.COMMON_RESOURCES.forEach(r=>this.resourceStore.addResource(r));const t=e.getEffectsDescription?.();t&&bs(t)&&this.resourceStore.createEffectsFromDescriptor(t),await this.resourceStore.whenReady()}async _initializeRuntime(){this._removeLoadingMessage(),this.config=this.resourceStore.retrieveResourceObject(we.CONFIG_JSON),we.start(this.config),we.config?.buildType==="deploy"&&(y.disableAllVerifications=!0)}_getVectorData(e){if(!e||typeof e!="object")return;const t=e;return Array.isArray(t.data)?t.data:void 0}_coerceVector(e){if(!e)return null;const t=this._rehydrateVector(e);return t&&typeof t.x=="number"?t:null}destroy(){if(this.compositorBridge.stop(),this.channel?.close(),this.channel=null,this._pollFrameCb){const e=this.screen.onBeforeFrame.indexOf(this._pollFrameCb);e!==-1&&this.screen.onBeforeFrame.splice(e,1),this._pollFrameCb=null}}_requireApp(){if(!this.app)throw new Error("Presentation app is not initialized.");return this.app}}const ai=[],oi={maxStorageBufferBindingSize:256*1024*1024,maxBufferSize:256*1024*1024,maxComputeWorkgroupsPerDimension:65535};class st{device;queue;limits;features;constructor(e,t){this.device=e,this.queue=e.queue,this.limits=e.limits,this.features=t}static async create(e){const t=st._getGPU();if(!t)throw new Error("WebGPU is not supported in this browser. The engine requires Chrome 113+, Safari 17+, or Firefox 141+.");const r=await t.requestAdapter(e);if(!r)throw new Error("WebGPU adapter request failed. No suitable GPU found.");const s={};for(const[o,c]of Object.entries(oi)){const d=r.limits[o];d!==void 0&&(s[o]=Math.min(c,d))}const n=await r.requestDevice({requiredFeatures:ai.filter(o=>r.features.has(o)),requiredLimits:s});n.addEventListener("uncapturederror",o=>{console.error("[GPUContext] Uncaptured GPU error:",o.error)});const l={adapterInfo:r.info,limits:n.limits,features:n.features,hasTimestampQuery:n.features.has("timestamp-query")};return new st(n,l)}destroy(){this.device.destroy()}static _getGPU(){return typeof navigator<"u"?navigator.gpu:void 0}}const li=Object.freeze(Object.defineProperty({__proto__:null,GPUContext:st},Symbol.toStringTag,{value:"Module"}));class ss{device;cache=new Map;constructor(e){this.device=e}async compile(e,t){const r=this.cache.get(t);if(r)return{module:r,diagnostics:[],hasErrors:!1};const s=this.device.createShaderModule({code:e,label:t}),i=(await s.getCompilationInfo()).messages.map(o=>({message:o.message,type:o.type,lineNum:o.lineNum,linePos:o.linePos})),l=i.some(o=>o.type==="error");if(l){const o=i.filter(c=>c.type==="error").map(c=>`  Line ${c.lineNum}:${c.linePos}: ${c.message}`).join(`
`);throw new Error(`WGSL compilation failed for "${t}":
${o}`)}return this.cache.set(t,s),{module:s,diagnostics:i,hasErrors:l}}compileSync(e,t){const r=this.cache.get(t);if(r)return r;const s=this.device.createShaderModule({code:e,label:t});return this.cache.set(t,s),s}evict(e){this.cache.delete(e)}clearCache(){this.cache.clear()}}const ns=`// Generates a fullscreen triangle covering the viewport.
// Uses vertex_index 0,1,2 to produce a triangle that covers [-1,1] NDC.
//
// The oversized-triangle technique avoids a fullscreen quad (4 vertices,
// 2 triangles, diagonal seam).  A single triangle with vertices at
// (-1,-1), (3,-1), (-1,3) covers the entire clip-space square [-1,1]².
// The rasteriser clips the excess automatically.
//
// Reference: Shdr.bkcore.com "Fullscreen Triangle" trick, popularised by
// Iñigo Quilez and widely used in demoscene / post-processing passes.

struct VertexOutput {
    @builtin(position) position: vec4f,
    @location(0) uv: vec2f,
}

@vertex
fn vs(@builtin(vertex_index) vid: u32) -> VertexOutput {
    // Oversized triangle: positions at (-1,-1), (3,-1), (-1,3)
    let x = f32(i32(vid & 1u) * 4 - 1);
    let y = f32(i32(vid >> 1u) * 4 - 1);
    var out: VertexOutput;
    out.position = vec4f(x, y, 0.0, 1.0);
    out.uv = vec2f((x + 1.0) * 0.5, (1.0 - y) * 0.5); // flip Y for texture coords
    return out;
}
`,ci=`// postfx-passthrough.wgsl — Identity post-processing pass.
//
// Samples the input texture and returns it unchanged.  Useful as:
//   - A test fixture to verify the ping-pong pipeline works end-to-end
//   - The identity element in an effect chain (no visual change)
//   - A base template for new post-processing effects
//
// Pairs with fullscreen-triangle.wgsl (vertex shader).

// ─── Bindings ───────────────────────────────────────────────────────

@group(0) @binding(0) var inputTexture : texture_2d<f32>;
@group(0) @binding(1) var texSampler   : sampler;

// No params needed — this is the identity pass.

// ─── Vertex → Fragment interface ────────────────────────────────────

struct VertexOutput {
    @builtin(position) position: vec4f,
    @location(0) uv: vec2f,
}

// ─── Fragment shader ────────────────────────────────────────────────

@fragment
fn fs(in: VertexOutput) -> @location(0) vec4f {
    return textureSample(inputTexture, texSampler, in.uv);
}
`,di=`// postfx-bloom.wgsl — Additive glow pass.
//
// Adds a brightness boost to pixels whose luminance exceeds \`threshold\`.
// Unlike a pure extract pass, this adds the boost on top of the original
// colour so it can be used as a single-pass atmospheric glow effect:
//
//   result = rgb + rgb * intensity * step(threshold, luminance)
//
// When used in a chain, follow with \`blur\` to spread the glow.
//
// Luminance uses the ITU-R BT.709 luma coefficients.

// ─── Uniforms ───────────────────────────────────────────────────────

struct Params {
    threshold: f32,   // luminance cutoff (0–1)
    intensity: f32,   // brightness multiplier for above-threshold pixels
}

// ─── Bindings ───────────────────────────────────────────────────────

@group(0) @binding(0) var inputTexture : texture_2d<f32>;
@group(0) @binding(1) var texSampler   : sampler;
@group(0) @binding(2) var<uniform> params : Params;

// ─── Vertex → Fragment interface ────────────────────────────────────

struct VertexOutput {
    @builtin(position) position: vec4f,
    @location(0) uv: vec2f,
}

// ─── Fragment shader ────────────────────────────────────────────────

@fragment
fn fs(in: VertexOutput) -> @location(0) vec4f {
    let color = textureSample(inputTexture, texSampler, in.uv);
    let rgb   = color.rgb;

    // ITU-R BT.709 luma.
    let luminance = dot(rgb, vec3f(0.2126, 0.7152, 0.0722));

    // Additive glow: bright pixels get an intensity boost on top of original.
    let boost = select(0.0, params.intensity, luminance > params.threshold);
    let result = rgb * (1.0 + boost);

    return vec4f(clamp(result, vec3f(0.0), vec3f(1.0)), color.a);
}
`,hi=`// postfx-blur.wgsl — Single-pass 3×3 Gaussian blur approximation (Phase W3.4).
//
// Applies a 9-tap weighted kernel across the 3×3 neighbourhood of each
// texel.  The weights follow the 2D Gaussian:
//
//     1/16  2/16  1/16       0.0625  0.125  0.0625
//     2/16  4/16  2/16   =   0.125   0.25   0.125
//     1/16  2/16  1/16       0.0625  0.125  0.0625
//
// For radii larger than 1 texel the sample offsets are scaled by
// (radiusX, radiusY), broadening the effective kernel footprint.  This
// is a box-like approximation; for production-quality large-radius blur
// prefer a separable two-pass approach (horizontal + vertical).
//
// Pairs with fullscreen-triangle.wgsl (vertex shader).

// ─── Uniforms ───────────────────────────────────────────────────────

struct Params {
    radiusX: f32,    // horizontal blur radius in texels (≥1.0)
    radiusY: f32,    // vertical blur radius in texels (≥1.0)
    texelW:  f32,    // 1.0 / textureWidth
    texelH:  f32,    // 1.0 / textureHeight
}

// ─── Bindings ───────────────────────────────────────────────────────

@group(0) @binding(0) var inputTexture : texture_2d<f32>;
@group(0) @binding(1) var texSampler   : sampler;
@group(0) @binding(2) var<uniform> params : Params;

// ─── Vertex → Fragment interface ────────────────────────────────────

struct VertexOutput {
    @builtin(position) position: vec4f,
    @location(0) uv: vec2f,
}

// ─── Fragment shader ────────────────────────────────────────────────

@fragment
fn fs(in: VertexOutput) -> @location(0) vec4f {
    // Per-texel step scaled by the requested radius.
    let stepX = params.texelW * params.radiusX;
    let stepY = params.texelH * params.radiusY;

    // 3×3 Gaussian weights (sum = 1.0).
    let w_corner = 0.0625;  // 1/16
    let w_edge   = 0.125;   // 2/16
    let w_center = 0.25;    // 4/16

    // Sample the 3×3 neighbourhood.
    var result = vec4f(0.0);

    // Row -1
    result += textureSample(inputTexture, texSampler, in.uv + vec2f(-stepX, -stepY)) * w_corner;
    result += textureSample(inputTexture, texSampler, in.uv + vec2f(   0.0, -stepY)) * w_edge;
    result += textureSample(inputTexture, texSampler, in.uv + vec2f( stepX, -stepY)) * w_corner;

    // Row 0
    result += textureSample(inputTexture, texSampler, in.uv + vec2f(-stepX,    0.0)) * w_edge;
    result += textureSample(inputTexture, texSampler, in.uv)                          * w_center;
    result += textureSample(inputTexture, texSampler, in.uv + vec2f( stepX,    0.0)) * w_edge;

    // Row +1
    result += textureSample(inputTexture, texSampler, in.uv + vec2f(-stepX,  stepY)) * w_corner;
    result += textureSample(inputTexture, texSampler, in.uv + vec2f(   0.0,  stepY)) * w_edge;
    result += textureSample(inputTexture, texSampler, in.uv + vec2f( stepX,  stepY)) * w_corner;

    return vec4f(clamp(result.rgb, vec3f(0.0), vec3f(1.0)), result.a);
}
`,ui=`// postfx-vignette.wgsl — Vignette darkening effect (Phase W3.4).
//
// Darkens the image edges using a radial falloff centred on the screen.
// The \`radius\` parameter controls where the darkening begins (distance
// from UV centre) and \`softness\` controls the width of the transition
// band.
//
// The factor is computed via smoothstep so the transition is
// Hermite-interpolated (C¹ continuous), avoiding hard edges.
//
// Historically used in photography to describe the natural light
// fall-off of lenses; in games it draws attention to the screen centre.
//
// Pairs with fullscreen-triangle.wgsl (vertex shader).

// ─── Uniforms ───────────────────────────────────────────────────────

struct Params {
    radius:   f32,   // distance from centre where darkening begins (0–1)
    softness: f32,   // width of the transition band (>0)
}

// ─── Bindings ───────────────────────────────────────────────────────

@group(0) @binding(0) var inputTexture : texture_2d<f32>;
@group(0) @binding(1) var texSampler   : sampler;
@group(0) @binding(2) var<uniform> params : Params;

// ─── Vertex → Fragment interface ────────────────────────────────────

struct VertexOutput {
    @builtin(position) position: vec4f,
    @location(0) uv: vec2f,
}

// ─── Fragment shader ────────────────────────────────────────────────

@fragment
fn fs(in: VertexOutput) -> @location(0) vec4f {
    let color = textureSample(inputTexture, texSampler, in.uv);

    // Distance from the UV-space centre (0.5, 0.5).
    let dist = length(in.uv - vec2f(0.5, 0.5));

    // smoothstep(edge0, edge1, x): returns 0 when x ≥ edge0, 1 when x ≤ edge1.
    // We want factor = 1.0 at the centre and 0.0 at the edges.
    let factor = smoothstep(params.radius, params.radius - params.softness, dist);

    return vec4f(clamp(color.rgb * factor, vec3f(0.0), vec3f(1.0)), color.a);
}
`,pi=`// postfx-grayscale.wgsl — Grayscale conversion effect (Phase W3.5).
//
// Converts the image to grayscale using ITU-R BT.709 luma coefficients:
//   L = 0.2126·R + 0.7152·G + 0.0722·B
//
// The \`intensity\` parameter controls the blend between the original
// colour (0.0) and full grayscale (1.0), allowing partial desaturation.
//
// Pairs with fullscreen-triangle.wgsl (vertex shader).

// ─── Uniforms ───────────────────────────────────────────────────────

struct Params {
    intensity: f32,  // 0 = original colour, 1 = full grayscale
}

// ─── Bindings ───────────────────────────────────────────────────────

@group(0) @binding(0) var inputTexture : texture_2d<f32>;
@group(0) @binding(1) var texSampler   : sampler;
@group(0) @binding(2) var<uniform> params : Params;

// ─── Vertex → Fragment interface ────────────────────────────────────

struct VertexOutput {
    @builtin(position) position: vec4f,
    @location(0) uv: vec2f,
}

// ─── Fragment shader ────────────────────────────────────────────────

@fragment
fn fs(in: VertexOutput) -> @location(0) vec4f {
    let color = textureSample(inputTexture, texSampler, in.uv);
    let rgb   = color.rgb;

    // BT.709 luminance.
    let gray = dot(rgb, vec3f(0.2126, 0.7152, 0.0722));

    // Blend between original and grayscale.
    let result = mix(rgb, vec3f(gray), params.intensity);

    return vec4f(clamp(result, vec3f(0.0), vec3f(1.0)), color.a);
}
`,gi=`// postfx-sepia.wgsl — Sepia tone colour effect (Phase W3.5).
//
// Applies the classic sepia-tone colour transform, simulating the warm
// brownish tint of aged photographs.  The standard sepia matrix is:
//
//     R' = 0.393·R + 0.769·G + 0.189·B
//     G' = 0.349·R + 0.686·G + 0.168·B
//     B' = 0.272·R + 0.534·G + 0.131·B
//
// This matrix is derived from the W3C CSS filter specification
// (https://www.w3.org/TR/filter-effects-1/#sepiaEquivalent) and
// produces a result consistent with the CSS \`sepia()\` filter.
//
// The \`intensity\` parameter controls the blend between the original
// colour (0.0) and full sepia (1.0).
//
// Pairs with fullscreen-triangle.wgsl (vertex shader).

// ─── Uniforms ───────────────────────────────────────────────────────

struct Params {
    intensity: f32,  // 0 = original colour, 1 = full sepia
}

// ─── Bindings ───────────────────────────────────────────────────────

@group(0) @binding(0) var inputTexture : texture_2d<f32>;
@group(0) @binding(1) var texSampler   : sampler;
@group(0) @binding(2) var<uniform> params : Params;

// ─── Vertex → Fragment interface ────────────────────────────────────

struct VertexOutput {
    @builtin(position) position: vec4f,
    @location(0) uv: vec2f,
}

// ─── Fragment shader ────────────────────────────────────────────────

@fragment
fn fs(in: VertexOutput) -> @location(0) vec4f {
    let color = textureSample(inputTexture, texSampler, in.uv);
    let rgb   = color.rgb;

    // Sepia colour matrix (W3C CSS filter-effects spec).
    let sepia = vec3f(
        dot(rgb, vec3f(0.393, 0.769, 0.189)),
        dot(rgb, vec3f(0.349, 0.686, 0.168)),
        dot(rgb, vec3f(0.272, 0.534, 0.131)),
    );

    // Blend between original and sepia.
    let result = mix(rgb, sepia, params.intensity);

    return vec4f(clamp(result, vec3f(0.0), vec3f(1.0)), color.a);
}
`,fi=`// postfx-invert.wgsl — Colour inversion effect (Phase W3.5).
//
// Inverts the RGB channels of the image: output = 1.0 - input.
// Alpha is preserved unchanged.
//
// The \`intensity\` parameter controls the blend between the original
// colour (0.0) and the fully inverted colour (1.0).  At 0.5 this
// produces a flat mid-grey for all colours (since mix(c, 1-c, 0.5)
// = 0.5 for any c).
//
// Pairs with fullscreen-triangle.wgsl (vertex shader).

// ─── Uniforms ───────────────────────────────────────────────────────

struct Params {
    intensity: f32,  // 0 = original, 1 = fully inverted
}

// ─── Bindings ───────────────────────────────────────────────────────

@group(0) @binding(0) var inputTexture : texture_2d<f32>;
@group(0) @binding(1) var texSampler   : sampler;
@group(0) @binding(2) var<uniform> params : Params;

// ─── Vertex → Fragment interface ────────────────────────────────────

struct VertexOutput {
    @builtin(position) position: vec4f,
    @location(0) uv: vec2f,
}

// ─── Fragment shader ────────────────────────────────────────────────

@fragment
fn fs(in: VertexOutput) -> @location(0) vec4f {
    let color    = textureSample(inputTexture, texSampler, in.uv);
    let inverted = vec3f(1.0) - color.rgb;

    // Blend between original and inverted; preserve alpha.
    let result = mix(color.rgb, inverted, params.intensity);

    return vec4f(clamp(result, vec3f(0.0), vec3f(1.0)), color.a);
}
`,mi=`// postfx-colorize.wgsl — Colour tinting effect (Phase W3.5).
//
// Converts the image to grayscale and multiplies by a user-specified
// tint colour (r, g, b).  The \`intensity\` parameter controls the blend
// between the original colour (0.0) and the fully tinted result (1.0).
//
// Grayscale uses the ITU-R BT.709 luma coefficients:
//   L = 0.2126·R + 0.7152·G + 0.0722·B
//
// Pairs with fullscreen-triangle.wgsl (vertex shader).

// ─── Uniforms ───────────────────────────────────────────────────────

struct Params {
    r:         f32,  // tint colour red   (0–1)
    g:         f32,  // tint colour green  (0–1)
    b:         f32,  // tint colour blue   (0–1)
    intensity: f32,  // 0 = original, 1 = fully tinted
}

// ─── Bindings ───────────────────────────────────────────────────────

@group(0) @binding(0) var inputTexture : texture_2d<f32>;
@group(0) @binding(1) var texSampler   : sampler;
@group(0) @binding(2) var<uniform> params : Params;

// ─── Vertex → Fragment interface ────────────────────────────────────

struct VertexOutput {
    @builtin(position) position: vec4f,
    @location(0) uv: vec2f,
}

// ─── Fragment shader ────────────────────────────────────────────────

@fragment
fn fs(in: VertexOutput) -> @location(0) vec4f {
    let color = textureSample(inputTexture, texSampler, in.uv);
    let rgb   = color.rgb;

    // Convert to grayscale (BT.709 luma).
    let gray = dot(rgb, vec3f(0.2126, 0.7152, 0.0722));

    // Apply tint colour to the grayscale value.
    let tinted = vec3f(gray) * vec3f(params.r, params.g, params.b);

    // Blend between original and tinted.
    let result = mix(rgb, tinted, params.intensity);

    return vec4f(clamp(result, vec3f(0.0), vec3f(1.0)), color.a);
}
`,bi=`// postfx-threshold.wgsl — Binary threshold effect (Phase W3.5).
//
// Converts the image to a two-tone (black and white) result based on
// luminance.  Pixels whose BT.709 luminance exceeds \`level\` become
// white (1.0); all others become black (0.0).  Alpha is preserved.
//
// This is the simplest form of image segmentation and is useful for
// creating silhouettes, masks, and high-contrast stylised looks.
//
// Pairs with fullscreen-triangle.wgsl (vertex shader).

// ─── Uniforms ───────────────────────────────────────────────────────

struct Params {
    level: f32,  // luminance threshold (0–1)
}

// ─── Bindings ───────────────────────────────────────────────────────

@group(0) @binding(0) var inputTexture : texture_2d<f32>;
@group(0) @binding(1) var texSampler   : sampler;
@group(0) @binding(2) var<uniform> params : Params;

// ─── Vertex → Fragment interface ────────────────────────────────────

struct VertexOutput {
    @builtin(position) position: vec4f,
    @location(0) uv: vec2f,
}

// ─── Fragment shader ────────────────────────────────────────────────

@fragment
fn fs(in: VertexOutput) -> @location(0) vec4f {
    let color = textureSample(inputTexture, texSampler, in.uv);
    let rgb   = color.rgb;

    // BT.709 luminance.
    let gray = dot(rgb, vec3f(0.2126, 0.7152, 0.0722));

    // Binary selection: white if above threshold, black otherwise.
    let bw = select(vec3f(0.0), vec3f(1.0), gray > params.level);

    return vec4f(bw, color.a);
}
`,vi=`// postfx-brighten.wgsl — Brightness adjustment effect (Phase W3.5).
//
// Adds a uniform brightness offset to all RGB channels.  The \`amount\`
// parameter is in the range [-255, 255] (8-bit scale, matching the
// existing TS/Rust Brighten filter) and is divided by 255 to map into
// normalised [0,1] colour space before addition.
//
// Positive values brighten, negative values darken.  The result is
// clamped to [0, 1].  Alpha is preserved unchanged.
//
// Pairs with fullscreen-triangle.wgsl (vertex shader).

// ─── Uniforms ───────────────────────────────────────────────────────

struct Params {
    amount: f32,  // brightness offset in 8-bit scale (−255 to +255)
}

// ─── Bindings ───────────────────────────────────────────────────────

@group(0) @binding(0) var inputTexture : texture_2d<f32>;
@group(0) @binding(1) var texSampler   : sampler;
@group(0) @binding(2) var<uniform> params : Params;

// ─── Vertex → Fragment interface ────────────────────────────────────

struct VertexOutput {
    @builtin(position) position: vec4f,
    @location(0) uv: vec2f,
}

// ─── Fragment shader ────────────────────────────────────────────────

@fragment
fn fs(in: VertexOutput) -> @location(0) vec4f {
    let color = textureSample(inputTexture, texSampler, in.uv);

    // Convert 8-bit offset to normalised range and add.
    let offset = params.amount / 255.0;
    let result = color.rgb + vec3f(offset);

    return vec4f(clamp(result, vec3f(0.0), vec3f(1.0)), color.a);
}
`,yi=`// postfx-transparency.wgsl — Transparency increase effect (Phase W3.5).
//
// Reduces the alpha channel of every pixel by a fixed \`amount\` (in
// 8-bit scale, 0–255).  RGB channels are preserved unchanged.
//
// The amount is divided by 255 to operate in normalised [0,1] alpha
// space, matching the existing TS/Rust IncreaseTransparency filter.
// The result is clamped so alpha never goes below 0.
//
// Pairs with fullscreen-triangle.wgsl (vertex shader).

// ─── Uniforms ───────────────────────────────────────────────────────

struct Params {
    amount: f32,  // alpha reduction in 8-bit scale (0–255)
}

// ─── Bindings ───────────────────────────────────────────────────────

@group(0) @binding(0) var inputTexture : texture_2d<f32>;
@group(0) @binding(1) var texSampler   : sampler;
@group(0) @binding(2) var<uniform> params : Params;

// ─── Vertex → Fragment interface ────────────────────────────────────

struct VertexOutput {
    @builtin(position) position: vec4f,
    @location(0) uv: vec2f,
}

// ─── Fragment shader ────────────────────────────────────────────────

@fragment
fn fs(in: VertexOutput) -> @location(0) vec4f {
    let color = textureSample(inputTexture, texSampler, in.uv);

    // Reduce alpha by the given amount (normalised from 8-bit scale).
    let newAlpha = max(0.0, color.a - params.amount / 255.0);

    return vec4f(color.rgb, newAlpha);
}
`,wi=`// postfx-chromatic-aberration.wgsl — RGB channel offset effect (Phase W3.6).
//
// Simulates chromatic aberration (colour fringing) by offsetting the
// red and blue channels in opposite directions along the radial axis
// from the screen centre.  The green channel is sampled at the
// original UV.
//
// The offset direction is the normalised vector from UV centre (0.5,
// 0.5) to the current fragment.  This produces a radial fringe pattern
// that is strongest at the edges and zero at the centre — matching
// real lens chromatic aberration.
//
// The \`offset\` parameter is specified in texels.  It is converted to
// UV-space using \`texelW\` and \`texelH\`.
//
// Pairs with fullscreen-triangle.wgsl (vertex shader).

// ─── Uniforms ───────────────────────────────────────────────────────

struct Params {
    offset: f32,   // channel separation magnitude in texels
    texelW: f32,   // 1.0 / textureWidth
    texelH: f32,   // 1.0 / textureHeight
}

// ─── Bindings ───────────────────────────────────────────────────────

@group(0) @binding(0) var inputTexture : texture_2d<f32>;
@group(0) @binding(1) var texSampler   : sampler;
@group(0) @binding(2) var<uniform> params : Params;

// ─── Vertex → Fragment interface ────────────────────────────────────

struct VertexOutput {
    @builtin(position) position: vec4f,
    @location(0) uv: vec2f,
}

// ─── Fragment shader ────────────────────────────────────────────────

@fragment
fn fs(in: VertexOutput) -> @location(0) vec4f {
    // Radial direction from screen centre to this fragment.
    let centre    = vec2f(0.5, 0.5);
    let toFrag    = in.uv - centre;
    let dist      = length(toFrag);

    // Normalise the direction; at the exact centre use zero offset.
    let dir = select(toFrag / dist, vec2f(0.0), dist < 0.0001);

    // Convert texel offset to UV-space offset.
    let uvOffset = dir * params.offset * vec2f(params.texelW, params.texelH);

    // Sample each channel at a different UV position.
    let r = textureSample(inputTexture, texSampler, in.uv + uvOffset).r;
    let g = textureSample(inputTexture, texSampler, in.uv).g;
    let b = textureSample(inputTexture, texSampler, in.uv - uvOffset).b;

    // Use alpha from the centre (unshifted) sample.
    let a = textureSample(inputTexture, texSampler, in.uv).a;

    return vec4f(clamp(vec3f(r, g, b), vec3f(0.0), vec3f(1.0)), a);
}
`,xi=`// postfx-noise.wgsl — Film grain noise effect (Phase W3.6).
//
// Adds pseudo-random noise to the image, simulating the grain of
// analogue film or sensor noise in low-light digital photography.
//
// The hash function uses the classic \`fract(sin(dot(...)) * 43758.5453)\`
// pseudo-random generator, which is cheap and produces visually
// acceptable noise for real-time effects.  The \`seed\` parameter should
// be varied per frame (e.g., using a frame counter or time value) to
// produce animated grain.
//
// The \`intensity\` parameter controls the blend between the original
// image (0.0) and the noise pattern (1.0).  Typical values are in the
// 0.05–0.2 range.
//
// Reference: "The Book of Shaders" — Patricio Gonzalez Vivo
//   https://thebookofshaders.com/10/
//
// Pairs with fullscreen-triangle.wgsl (vertex shader).

// ─── Uniforms ───────────────────────────────────────────────────────

struct Params {
    intensity: f32,  // noise strength (0 = none, 1 = full noise)
    seed:      f32,  // per-frame seed for animation (e.g. frame count)
}

// ─── Bindings ───────────────────────────────────────────────────────

@group(0) @binding(0) var inputTexture : texture_2d<f32>;
@group(0) @binding(1) var texSampler   : sampler;
@group(0) @binding(2) var<uniform> params : Params;

// ─── Vertex → Fragment interface ────────────────────────────────────

struct VertexOutput {
    @builtin(position) position: vec4f,
    @location(0) uv: vec2f,
}

// ─── Helpers ────────────────────────────────────────────────────────

// Cheap pseudo-random hash.  Returns a value in [0, 1).
fn hash(uv: vec2f, seed: f32) -> f32 {
    return fract(sin(dot(uv + seed, vec2f(12.9898, 78.233))) * 43758.5453);
}

// ─── Fragment shader ────────────────────────────────────────────────

@fragment
fn fs(in: VertexOutput) -> @location(0) vec4f {
    let color = textureSample(inputTexture, texSampler, in.uv);

    // Generate noise in [-0.5, 0.5] range for balanced grain.
    let noise = hash(in.uv, params.seed) - 0.5;

    // Mix noise into the colour channels.
    let result = color.rgb + vec3f(noise * params.intensity);

    return vec4f(clamp(result, vec3f(0.0), vec3f(1.0)), color.a);
}
`,_i=`// postfx-sharpen.wgsl — Unsharp mask / Laplacian sharpening (Phase W3.6).
//
// Applies a 3×3 Laplacian-based sharpening kernel.  The kernel
// enhances edges by subtracting a blurred version from the original:
//
//     sharpened = original + (original - blurred) × amount
//
// Equivalently, the kernel coefficients are:
//
//     [ 0  -1   0]            [0  -a   0]
//     [-1   5  -1]  →  scaled [-a 1+4a -a]
//     [ 0  -1   0]            [0  -a   0]
//
// where \`a = amount\`.  At amount=1.0 this is the standard sharpen
// kernel (centre = 5, cross = −1).  Higher values produce stronger
// sharpening; values between 0 and 1 produce subtler enhancement.
//
// Reference: Gonzalez & Woods, "Digital Image Processing", 4th ed.,
//   Ch. 3 — Spatial Filtering and Laplacian sharpening.
//
// Pairs with fullscreen-triangle.wgsl (vertex shader).

// ─── Uniforms ───────────────────────────────────────────────────────

struct Params {
    amount: f32,   // sharpening strength (0 = none, 1 = standard, >1 = strong)
    texelW: f32,   // 1.0 / textureWidth
    texelH: f32,   // 1.0 / textureHeight
}

// ─── Bindings ───────────────────────────────────────────────────────

@group(0) @binding(0) var inputTexture : texture_2d<f32>;
@group(0) @binding(1) var texSampler   : sampler;
@group(0) @binding(2) var<uniform> params : Params;

// ─── Vertex → Fragment interface ────────────────────────────────────

struct VertexOutput {
    @builtin(position) position: vec4f,
    @location(0) uv: vec2f,
}

// ─── Fragment shader ────────────────────────────────────────────────

@fragment
fn fs(in: VertexOutput) -> @location(0) vec4f {
    let uv = in.uv;
    let dx = params.texelW;
    let dy = params.texelH;

    // Sample the centre pixel and the four cardinal neighbours.
    let centre = textureSample(inputTexture, texSampler, uv).rgb;
    let top    = textureSample(inputTexture, texSampler, uv + vec2f( 0.0, -dy)).rgb;
    let bottom = textureSample(inputTexture, texSampler, uv + vec2f( 0.0,  dy)).rgb;
    let left   = textureSample(inputTexture, texSampler, uv + vec2f(-dx,  0.0)).rgb;
    let right  = textureSample(inputTexture, texSampler, uv + vec2f( dx,  0.0)).rgb;

    // Laplacian: the difference between the centre and the average of
    // its neighbours captures high-frequency detail (edges).
    let laplacian = centre * 4.0 - top - bottom - left - right;

    // Sharpened = original + amount × Laplacian.
    let result = centre + laplacian * params.amount;

    let alpha = textureSample(inputTexture, texSampler, uv).a;
    return vec4f(clamp(result, vec3f(0.0), vec3f(1.0)), alpha);
}
`,Ei=`// postfx-sobel.wgsl — Sobel edge detection (Phase W3.6).
//
// Computes image gradients using the Sobel operator and outputs the
// edge magnitude as a grayscale image.  The two 3×3 Sobel kernels
// approximate the horizontal (Gx) and vertical (Gy) first derivatives:
//
//     Gx = [-1  0  1]     Gy = [-1 -2 -1]
//          [-2  0  2]          [ 0  0  0]
//          [-1  0  1]          [ 1  2  1]
//
//     magnitude = sqrt(Gx² + Gy²)
//
// The input is converted to grayscale (BT.709 luma) before computing
// gradients.  The output magnitude is clamped to [0, 1] and written
// as an RGB grayscale value with the original alpha.
//
// Reference: Sobel, I. & Feldman, G. (1968). "A 3×3 Isotropic Gradient
//   Operator for Image Processing."  Stanford AI Project.
//
// Pairs with fullscreen-triangle.wgsl (vertex shader).

// ─── Uniforms ───────────────────────────────────────────────────────

struct Params {
    texelW: f32,   // 1.0 / textureWidth
    texelH: f32,   // 1.0 / textureHeight
}

// ─── Bindings ───────────────────────────────────────────────────────

@group(0) @binding(0) var inputTexture : texture_2d<f32>;
@group(0) @binding(1) var texSampler   : sampler;
@group(0) @binding(2) var<uniform> params : Params;

// ─── Vertex → Fragment interface ────────────────────────────────────

struct VertexOutput {
    @builtin(position) position: vec4f,
    @location(0) uv: vec2f,
}

// ─── Helpers ────────────────────────────────────────────────────────

// Convert an RGB sample to BT.709 luminance.
fn luma(uv: vec2f) -> f32 {
    let c = textureSample(inputTexture, texSampler, uv).rgb;
    return dot(c, vec3f(0.2126, 0.7152, 0.0722));
}

// ─── Fragment shader ────────────────────────────────────────────────

@fragment
fn fs(in: VertexOutput) -> @location(0) vec4f {
    let uv = in.uv;
    let dx = params.texelW;
    let dy = params.texelH;

    // Sample the 3×3 neighbourhood as grayscale luminance values.
    //   tl  tc  tr
    //   ml  mc  mr
    //   bl  bc  br
    let tl = luma(uv + vec2f(-dx, -dy));
    let tc = luma(uv + vec2f(0.0, -dy));
    let tr = luma(uv + vec2f( dx, -dy));
    let ml = luma(uv + vec2f(-dx,  0.0));
    let mr = luma(uv + vec2f( dx,  0.0));
    let bl = luma(uv + vec2f(-dx,  dy));
    let bc = luma(uv + vec2f(0.0,  dy));
    let br = luma(uv + vec2f( dx,  dy));

    // Sobel horizontal gradient: Gx.
    let gx = -tl + tr - 2.0 * ml + 2.0 * mr - bl + br;

    // Sobel vertical gradient: Gy.
    let gy = -tl - 2.0 * tc - tr + bl + 2.0 * bc + br;

    // Edge magnitude.
    let magnitude = sqrt(gx * gx + gy * gy);

    let alpha = textureSample(inputTexture, texSampler, uv).a;
    return vec4f(vec3f(clamp(magnitude, 0.0, 1.0)), alpha);
}
`,Si=`// postfx-pixel-art.wgsl — Pixel art block-averaging effect.
//
// Produces a blocky, retro pixel-art look by averaging every pixel colour
// within each block and filling the block with that average.  This matches
// the original TypeScript PixelArt filter behaviour (box filter per block).
//
// Algorithm:
//   For each fragment:
//   1. Determine which block the fragment belongs to.
//   2. Loop over all texels in the block (constant upper bound + break).
//   3. Sample each texel via textureSampleLevel (LOD 0 — no uniformity req).
//   4. Accumulate RGBA and divide by the block area.
//
// textureSampleLevel is used instead of textureSample because the loop
// bounds depend on per-fragment UV (non-uniform control flow).  Unlike
// textureSample, textureSampleLevel does not require uniform control flow
// because the LOD is explicitly specified (WGSL Spec §16.7.5).
//
// The loop upper bound is a compile-time constant (MAX_BLOCK = 32); the
// runtime blockSize is enforced via a conditional break.
//
// Reference: Classic mosaic / pixelate filter — simple box averaging
// aligned to a regular grid.  Matches the original brainiac-engine
// PixelArt filter in browser/image/image_filter/filters/PixelArt.ts.
//
// Pairs with fullscreen-triangle.wgsl (vertex shader).

// ─── Uniforms ───────────────────────────────────────────────────────

struct Params {
    blockSize: f32,  // block size in texels (e.g. 6.0 for 6×6 pixels)
    texelW:    f32,  // 1.0 / textureWidth
    texelH:    f32,  // 1.0 / textureHeight
}

// ─── Constants ──────────────────────────────────────────────────────

const MAX_BLOCK: i32 = 32;

// ─── Bindings ───────────────────────────────────────────────────────

@group(0) @binding(0) var inputTexture : texture_2d<f32>;
@group(0) @binding(1) var texSampler   : sampler;
@group(0) @binding(2) var<uniform> params : Params;

// ─── Vertex → Fragment interface ────────────────────────────────────

struct VertexOutput {
    @builtin(position) position: vec4f,
    @location(0) uv: vec2f,
}

// ─── Fragment shader ────────────────────────────────────────────────

@fragment
fn fs(in: VertexOutput) -> @location(0) vec4f {
    let texW = 1.0 / params.texelW;
    let texH = 1.0 / params.texelH;
    let block = max(params.blockSize, 1.0);
    let blockI = i32(block);

    // Convert UV → texel coordinates and find the block origin (in texels).
    let texelCoord = in.uv * vec2f(texW, texH);
    let blockOriginF = floor(texelCoord / block) * block;

    // Clamp block extent to texture edges.
    let blockEndX = min(i32(blockOriginF.x) + blockI, i32(texW));
    let blockEndY = min(i32(blockOriginF.y) + blockI, i32(texH));

    // Accumulate all texel colours within the block.
    var acc = vec4f(0.0);
    var count = 0.0;

    for (var by = 0; by < MAX_BLOCK; by++) {
        let py = i32(blockOriginF.y) + by;
        if (py >= blockEndY) { break; }

        for (var bx = 0; bx < MAX_BLOCK; bx++) {
            let px = i32(blockOriginF.x) + bx;
            if (px >= blockEndX) { break; }

            // Convert texel centre back to UV for sampling.
            let sampleUV = vec2f(f32(px) + 0.5, f32(py) + 0.5) * vec2f(params.texelW, params.texelH);
            acc += textureSampleLevel(inputTexture, texSampler, sampleUV, 0.0);
            count += 1.0;
        }
    }

    return acc / max(count, 1.0);
}
`,Ci=`// postfx-pixel-art-edges.wgsl — Outline pixel art effect.
//
// Pixelates the image (block averaging) and draws 1px dark outlines at
// block boundaries where adjacent blocks have significantly different
// average colours.  This produces the characteristic hand-drawn pixel art
// look with visible contour lines separating colour regions.
//
// Algorithm (single-pass):
//   1. Compute the current block's average colour (same as pixel-art.wgsl).
//   2. Determine if the fragment is on a block boundary edge.
//   3. For each boundary edge, compute the neighbour block's average.
//   4. If perceptual colour difference exceeds threshold, darken the pixel.
//   5. Interior fragments output the plain block average (no neighbour work).
//
// The outline is drawn by multiplying the block average by a darkness
// factor (0..1), creating a natural darkened contour rather than a flat
// black line — this preserves the local colour hue in the outline.
//
// Inspired by Kopf & Lischinski, "Depixelizing Pixel Art" (SIGGRAPH 2011)
// — reversed: instead of removing pixel art structure, we create it.
//
// Performance: interior fragments compute 1 block average.  Boundary
// fragments compute 2–3 averages (current + 1–2 neighbours).  Corner
// fragments are the worst case at 3 averages, but corners are rare.
//
// Pairs with fullscreen-triangle.wgsl (vertex shader).

// ─── Uniforms ───────────────────────────────────────────────────────

struct Params {
    blockSize:      f32,  // block size in texels (e.g. 6.0)
    texelW:         f32,  // 1.0 / textureWidth
    texelH:         f32,  // 1.0 / textureHeight
    threshold:      f32,  // colour difference threshold for outlines [0..1]
    darknessFactor: f32,  // outline pixel multiplier (0 = black, 1 = no outline)
}

// ─── Constants ──────────────────────────────────────────────────────

const MAX_BLOCK: i32 = 32;

// ─── Bindings ───────────────────────────────────────────────────────

@group(0) @binding(0) var inputTexture : texture_2d<f32>;
@group(0) @binding(1) var texSampler   : sampler;
@group(0) @binding(2) var<uniform> params : Params;

// ─── Vertex → Fragment interface ────────────────────────────────────

struct VertexOutput {
    @builtin(position) position: vec4f,
    @location(0) uv: vec2f,
}

// ─── Helpers ────────────────────────────────────────────────────────

/// Compute the average colour of the block whose origin is at \`origin\`
/// (in texel coordinates).  Clamps to texture bounds.
fn blockAverage(origin: vec2f, blockI: i32, texW: f32, texH: f32) -> vec4f {
    let endX = min(i32(origin.x) + blockI, i32(texW));
    let endY = min(i32(origin.y) + blockI, i32(texH));
    // Reject out-of-bounds block origins (neighbour off the image edge).
    if (i32(origin.x) < 0 || i32(origin.y) < 0 ||
        i32(origin.x) >= i32(texW) || i32(origin.y) >= i32(texH)) {
        return vec4f(-1.0); // sentinel: no valid neighbour
    }

    var acc = vec4f(0.0);
    var count = 0.0;
    for (var by = 0; by < MAX_BLOCK; by++) {
        let py = i32(origin.y) + by;
        if (py >= endY) { break; }
        for (var bx = 0; bx < MAX_BLOCK; bx++) {
            let px = i32(origin.x) + bx;
            if (px >= endX) { break; }
            let uv = vec2f(f32(px) + 0.5, f32(py) + 0.5) * vec2f(params.texelW, params.texelH);
            acc += textureSampleLevel(inputTexture, texSampler, uv, 0.0);
            count += 1.0;
        }
    }
    return acc / max(count, 1.0);
}

/// Perceptual colour difference (luminance-weighted).
fn colorDiff(a: vec4f, b: vec4f) -> f32 {
    return dot(abs(a.rgb - b.rgb), vec3f(0.299, 0.587, 0.114));
}

// ─── Fragment shader ────────────────────────────────────────────────

@fragment
fn fs(in: VertexOutput) -> @location(0) vec4f {
    let texW = 1.0 / params.texelW;
    let texH = 1.0 / params.texelH;
    let block = max(params.blockSize, 1.0);
    let blockI = i32(block);

    // Resolve defaults (0 means "use default").
    let thresh = select(params.threshold, 0.1, params.threshold <= 0.0);
    let darkness = select(params.darknessFactor, 0.15, params.darknessFactor <= 0.0);

    // Current block origin.
    let texelCoord = in.uv * vec2f(texW, texH);
    let blockOriginF = floor(texelCoord / block) * block;

    // Current block average.
    let current = blockAverage(blockOriginF, blockI, texW, texH);

    // Local position within the block (0..block-1 range).
    let local = texelCoord - blockOriginF;

    // Check each boundary edge and compare with the neighbour block.
    var isOutline = false;

    // Left boundary: localX < 1.
    if (local.x < 1.0) {
        let nb = blockAverage(blockOriginF + vec2f(-block, 0.0), blockI, texW, texH);
        if (nb.r >= 0.0 && colorDiff(current, nb) > thresh) { isOutline = true; }
    }
    // Right boundary: localX >= block - 1.
    if (local.x >= block - 1.0) {
        let nb = blockAverage(blockOriginF + vec2f(block, 0.0), blockI, texW, texH);
        if (nb.r >= 0.0 && colorDiff(current, nb) > thresh) { isOutline = true; }
    }
    // Top boundary: localY < 1.
    if (local.y < 1.0) {
        let nb = blockAverage(blockOriginF + vec2f(0.0, -block), blockI, texW, texH);
        if (nb.r >= 0.0 && colorDiff(current, nb) > thresh) { isOutline = true; }
    }
    // Bottom boundary: localY >= block - 1.
    if (local.y >= block - 1.0) {
        let nb = blockAverage(blockOriginF + vec2f(0.0, block), blockI, texW, texH);
        if (nb.r >= 0.0 && colorDiff(current, nb) > thresh) { isOutline = true; }
    }

    if (isOutline) {
        return vec4f(current.rgb * darkness, current.a);
    }
    return current;
}
`,Ai=`// postfx-pixel-art-retro.wgsl — Retro 8-bit pixel art effect.
//
// Combines three classic retro rendering techniques in one pass:
//   1. Block averaging (pixelation) — same grid mosaic as pixel-art.wgsl
//   2. Ordered Bayer dithering (4×4 matrix) — simulates colour depth
//   3. Uniform colour quantization — snaps each channel to N discrete levels
//
// The result resembles output from 8-bit systems (NES, CGA, etc.) where
// limited colour palettes and hardware dithering created a distinctive
// aesthetic.
//
// Algorithm:
//   1. Compute block average colour (box filter, same as pixel-art.wgsl).
//   2. Look up the 4×4 Bayer dither threshold for this fragment position.
//   3. Add dither offset: avg + (bayerValue - 0.5) * strength / levels.
//   4. Quantize: floor(colour * levels) / levels.
//   5. Clamp to [0, 1].
//
// The Bayer matrix is the standard 4×4 ordered dither pattern (Bayer,
// 1973, "An Optimum Method for Two-Level Rendition of Continuous-Tone
// Pictures").  Normalised to [0, 1] and centred at 0 for symmetric
// dithering around the true colour value.
//
// Reference:
//   Bayer, B. E. "An Optimum Method for Two-Level Rendition of
//   Continuous-Tone Pictures." ICC 1973.
//   Ulichney, R. "Digital Halftoning." MIT Press, 1987 — §4.3
//   ordered dithering with threshold matrices.
//
// Pairs with fullscreen-triangle.wgsl (vertex shader).

// ─── Uniforms ───────────────────────────────────────────────────────

struct Params {
    blockSize:      f32,  // block size in texels (e.g. 6.0)
    texelW:         f32,  // 1.0 / textureWidth
    texelH:         f32,  // 1.0 / textureHeight
    colorLevels:    f32,  // quantisation levels per channel (e.g. 4.0 = 64 colours)
    ditherStrength: f32,  // dither amplitude [0..1] (0 = no dither, 1 = full)
}

// ─── Constants ──────────────────────────────────────────────────────

const MAX_BLOCK: i32 = 32;

/// Standard 4×4 Bayer ordered dither matrix, normalised to [0, 1].
/// Index as: BAYER[row * 4 + col] where row = y % 4, col = x % 4.
const BAYER: array<f32, 16> = array<f32, 16>(
     0.0 / 16.0,  8.0 / 16.0,  2.0 / 16.0, 10.0 / 16.0,
    12.0 / 16.0,  4.0 / 16.0, 14.0 / 16.0,  6.0 / 16.0,
     3.0 / 16.0, 11.0 / 16.0,  1.0 / 16.0,  9.0 / 16.0,
    15.0 / 16.0,  7.0 / 16.0, 13.0 / 16.0,  5.0 / 16.0
);

// ─── Bindings ───────────────────────────────────────────────────────

@group(0) @binding(0) var inputTexture : texture_2d<f32>;
@group(0) @binding(1) var texSampler   : sampler;
@group(0) @binding(2) var<uniform> params : Params;

// ─── Vertex → Fragment interface ────────────────────────────────────

struct VertexOutput {
    @builtin(position) position: vec4f,
    @location(0) uv: vec2f,
}

// ─── Fragment shader ────────────────────────────────────────────────

@fragment
fn fs(in: VertexOutput) -> @location(0) vec4f {
    let texW = 1.0 / params.texelW;
    let texH = 1.0 / params.texelH;
    let block = max(params.blockSize, 1.0);
    let blockI = i32(block);

    // Resolve defaults (0 means "use default").
    let levels = select(params.colorLevels, 4.0, params.colorLevels <= 0.0);
    let strength = select(params.ditherStrength, 0.5, params.ditherStrength <= 0.0);

    // ── Step 1: Block averaging (identical to pixel-art.wgsl) ──────

    let texelCoord = in.uv * vec2f(texW, texH);
    let blockOriginF = floor(texelCoord / block) * block;
    let blockEndX = min(i32(blockOriginF.x) + blockI, i32(texW));
    let blockEndY = min(i32(blockOriginF.y) + blockI, i32(texH));

    var acc = vec4f(0.0);
    var count = 0.0;
    for (var by = 0; by < MAX_BLOCK; by++) {
        let py = i32(blockOriginF.y) + by;
        if (py >= blockEndY) { break; }
        for (var bx = 0; bx < MAX_BLOCK; bx++) {
            let px = i32(blockOriginF.x) + bx;
            if (px >= blockEndX) { break; }
            let uv = vec2f(f32(px) + 0.5, f32(py) + 0.5) * vec2f(params.texelW, params.texelH);
            acc += textureSampleLevel(inputTexture, texSampler, uv, 0.0);
            count += 1.0;
        }
    }
    let avg = acc / max(count, 1.0);

    // ── Step 2: Ordered Bayer dithering ────────────────────────────

    // Use fragment position for stable dither pattern across output.
    let pixel = vec2i(in.position.xy);
    let bayerIdx = (pixel.y % 4) * 4 + (pixel.x % 4);
    let bayerValue = BAYER[bayerIdx] - 0.5;  // centre around 0

    // Scale dither offset by strength and quantisation step size.
    let dithered = avg.rgb + vec3f(bayerValue * strength / levels);

    // ── Step 3: Uniform colour quantisation ────────────────────────

    let quantized = floor(clamp(dithered, vec3f(0.0), vec3f(1.0)) * levels) / levels;

    return vec4f(quantized, avg.a);
}
`,ki=`// postfx-crt.wgsl — CRT (cathode ray tube) display emulation.
//
// Simulates the visual characteristics of a CRT monitor:
//   1. **Barrel distortion** — the characteristic curved screen shape,
//      implemented via radial coordinate warping from the UV centre.
//   2. **Scanlines** — horizontal dark bands caused by the electron beam
//      scanning rows of phosphor dots, modulated by vertical position.
//   3. **RGB phosphor mask** — the sub-pixel colour pattern visible on
//      close inspection, emulated as a repeating 3-column tint.
//   4. **Vignette** — brightness fall-off toward the screen edges, a
//      natural consequence of the electron beam's curvature.
//   5. **Edge shadow** — hard black border outside the curved viewport
//      (pixels beyond the warped UV range are clamped to black).
//
// The effect combines these elements in a single fragment shader pass.
//
// References:
//   - Lottes, T. "CRT Shader" (public domain) — scanline + mask model.
//   - Themaister / RetroArch CRT-Geom shader — barrel distortion model.
//   - Gonzalez & Woods, "Digital Image Processing", §2.4 — CRT physics.
//
// Pairs with fullscreen-triangle.wgsl (vertex shader).

// ─── Uniforms ───────────────────────────────────────────────────────

struct Params {
    texelW:             f32,  // 1.0 / textureWidth
    texelH:             f32,  // 1.0 / textureHeight
    curvature:          f32,  // barrel distortion strength (0 = flat, 0.25 = moderate)
    scanlineIntensity:  f32,  // scanline darkness (0 = none, 0.4 = visible, 1 = full black)
    scanlineCount:      f32,  // approx number of visible scanlines (controls spacing)
    vignetteStrength:   f32,  // edge darkening (0 = none, 1 = heavy)
    brightness:         f32,  // overall brightness boost (compensates for scanline darkening)
}

// ─── Bindings ───────────────────────────────────────────────────────

@group(0) @binding(0) var inputTexture : texture_2d<f32>;
@group(0) @binding(1) var texSampler   : sampler;
@group(0) @binding(2) var<uniform> params : Params;

// ─── Vertex → Fragment interface ────────────────────────────────────

struct VertexOutput {
    @builtin(position) position: vec4f,
    @location(0) uv: vec2f,
}

// ─── Helpers ────────────────────────────────────────────────────────

/// Apply barrel distortion to UV coordinates.
/// Maps flat screen UVs to curved CRT-like coordinates by displacing
/// pixels radially outward from the centre.  Based on the radial
/// distortion model: uv' = uv + uv * r² * k, where r is the distance
/// from centre and k is the curvature strength.
fn barrelDistort(uv: vec2f, k: f32) -> vec2f {
    // Centre at (0, 0) for radial math.
    let centred = uv - 0.5;
    let r2 = dot(centred, centred);
    let distorted = centred * (1.0 + k * r2);
    return distorted + 0.5;
}

// ─── Fragment shader ────────────────────────────────────────────────

@fragment
fn fs(in: VertexOutput) -> @location(0) vec4f {
    let texH = 1.0 / params.texelH;

    // Resolve defaults (0 means "use default").
    let curv     = select(params.curvature,         0.25,  params.curvature <= 0.0);
    let scanInt  = select(params.scanlineIntensity,  0.35,  params.scanlineIntensity <= 0.0);
    let scanCnt  = select(params.scanlineCount,      texH * 0.5, params.scanlineCount <= 0.0);
    let vigStr   = select(params.vignetteStrength,   0.6,   params.vignetteStrength <= 0.0);
    let bright   = select(params.brightness,         1.3,   params.brightness <= 0.0);

    // ── 1. Barrel distortion ───────────────────────────────────────
    let warpedUV = barrelDistort(in.uv, curv);

    // Pixels outside the curved viewport → hard black border.
    if (warpedUV.x < 0.0 || warpedUV.x > 1.0 || warpedUV.y < 0.0 || warpedUV.y > 1.0) {
        return vec4f(0.0, 0.0, 0.0, 1.0);
    }

    var color = textureSampleLevel(inputTexture, texSampler, warpedUV, 0.0).rgb;

    // ── 2. Scanlines ───────────────────────────────────────────────
    // Sine-based scanline pattern: dark bands at regular vertical intervals.
    // The sin() produces values in [-1, 1]; we remap to a darkening factor.
    let scanY = warpedUV.y * scanCnt * 3.14159265;
    let scanline = 1.0 - scanInt * (0.5 + 0.5 * sin(scanY));
    color *= scanline;

    // ── 3. RGB phosphor sub-pixel mask ─────────────────────────────
    // Every 3 horizontal pixels emphasise one of R, G, B — simulating
    // the shadow mask / aperture grille of a real CRT.
    let pixelX = i32(in.position.x) % 3;
    var mask = vec3f(0.8);
    if (pixelX == 0) { mask.r = 1.0; }
    else if (pixelX == 1) { mask.g = 1.0; }
    else { mask.b = 1.0; }
    color *= mask;

    // ── 4. Brightness boost ────────────────────────────────────────
    // Compensate for the overall darkening from scanlines + mask.
    color *= bright;

    // ── 5. Vignette ────────────────────────────────────────────────
    // Smooth radial darkening from centre to edges.
    let centred = warpedUV - 0.5;
    let dist = length(centred) * 2.0;  // 0 at centre, ~1.41 at corners
    let vignette = 1.0 - vigStr * dist * dist;
    color *= max(vignette, 0.0);

    return vec4f(clamp(color, vec3f(0.0), vec3f(1.0)), 1.0);
}
`,Ii=`// postfx-rain-glass.wgsl — Refraction through a rainy glass pane.
//
// WGSL port of the rain-drop refraction in BigWings' "Heartfelt"
// (https://www.shadertoy.com/view/ldSBWW, Martijn Steinrucken 2017,
// CC BY-NC-SA 3.0).  Only the cycling rain-drop layer is kept — the
// original's 102 s "story" path (zoom-out, heart silhouette, fade-out)
// is intentionally removed so the post-processing pass behaves like a
// stationary, continuously animated overlay.
//
// The shader samples the scene texture (the previous compositor frame)
// through a per-pixel UV displacement derived from a noise field of
// "drops + trails".  A small disc-blur approximates the original's
// \`textureLod(iChannel0, uv, focus)\` background defocus — our ping-pong
// textures have no mipmaps, so we fake it with eight equally-weighted
// taps on a ring whose radius scales with \`focus\`.
//
// References
// ----------
//   - Steinrucken, M. "Heartfelt" (Shadertoy, 2017) — original GLSL.
//   - Hoskins, D. "Hash without Sine" (2014) — N13 hash basis.
//   - Quilez, I. "Distance functions" — Saw / smoothstep idioms.
//
// Pairs with fullscreen-triangle.wgsl (vertex shader).

// ─── Uniforms ───────────────────────────────────────────────────────

struct Params {
    time:       f32,   // accumulated seconds; demo pumps this per rAF tick
    rainAmount: f32,   // 0..1 = manual; <0 = auto sine (0.4..1.0 range)
    resW:       f32,   // canvas width  in pixels (aspect + blur scaling)
    resH:       f32,   // canvas height in pixels (aspect + blur scaling)
}

// ─── Bindings ───────────────────────────────────────────────────────

@group(0) @binding(0) var inputTexture : texture_2d<f32>;
@group(0) @binding(1) var texSampler   : sampler;
@group(0) @binding(2) var<uniform> params : Params;

// ─── Vertex → Fragment interface ────────────────────────────────────

struct VertexOutput {
    @builtin(position) position: vec4f,
    @location(0) uv: vec2f,
}

// ─── Hashes (Dave Hoskins) ──────────────────────────────────────────

fn N13(p: f32) -> vec3f {
    var p3 = fract(vec3f(p) * vec3f(0.1031, 0.11369, 0.13787));
    p3 = p3 + dot(p3, p3.yzx + 19.19);
    return fract(vec3f(
        (p3.x + p3.y) * p3.z,
        (p3.x + p3.z) * p3.y,
        (p3.y + p3.z) * p3.x,
    ));
}

fn N1(t: f32) -> f32 {
    return fract(sin(t * 12345.564) * 7658.76);
}

// Triangular ramp peaking at \`b\`: rises 0→1 over [0, b], falls 1→0 over [b, 1].
fn Saw(b: f32, t: f32) -> f32 {
    return smoothstep(0.0, b, t) * smoothstep(1.0, b, t);
}

// ─── Drop layers ────────────────────────────────────────────────────

// A column of moving drops + downward trails.  Returns vec2(mask, trail).
fn DropLayer2(uv_in: vec2f, t: f32) -> vec2f {
    let UV = uv_in;
    var uv = uv_in;

    uv.y = uv.y + t * 0.75;
    let a = vec2f(6.0, 1.0);
    let grid = a * 2.0;
    var id = floor(uv * grid);

    let colShift = N1(id.x);
    uv.y = uv.y + colShift;

    id = floor(uv * grid);
    let n = N13(id.x * 35.2 + id.y * 2376.1);
    let st = fract(uv * grid) - vec2f(0.5, 0.0);

    var x = n.x - 0.5;

    var y = UV.y * 20.0;
    let wiggle = sin(y + sin(y));
    x = x + wiggle * (0.5 - abs(x)) * (n.z - 0.5);
    x = x * 0.7;
    let ti = fract(t + n.z);
    y = (Saw(0.85, ti) - 0.5) * 0.9 + 0.5;
    let p = vec2f(x, y);

    let d = length((st - p) * a.yx);

    let mainDrop = smoothstep(0.4, 0.0, d);

    let r = sqrt(smoothstep(1.0, y, st.y));
    let cd = abs(st.x - x);
    let trail = smoothstep(0.23 * r, 0.15 * r * r, cd)
              * smoothstep(-0.02, 0.02, st.y - y)
              * r * r;
    let trailFront = smoothstep(-0.02, 0.02, st.y - y);

    // Per-trail droplets that march down in regular intervals.
    let yt = fract(UV.y * 10.0) + (st.y - 0.5);
    let dd = length(st - vec2f(x, yt));
    let droplets = smoothstep(0.3, 0.0, dd);
    let m = mainDrop + droplets * r * trailFront;

    return vec2f(m, trail);
}

// Static droplets clinging to the glass (sub-pixel jitter via \`Saw\`).
fn StaticDrops(uv_in: vec2f, t: f32) -> f32 {
    let uv2 = uv_in * 40.0;
    let id = floor(uv2);
    let uv = fract(uv2) - 0.5;
    let n = N13(id.x * 107.45 + id.y * 3543.654);
    let p = (n.xy - 0.5) * 0.7;
    let d = length(uv - p);

    let fade = Saw(0.025, fract(t + n.z));
    return smoothstep(0.3, 0.0, d) * fract(n.z * 10.0) * fade;
}

// Composite the three drop layers; returns vec2(refraction mask, trail).
fn Drops(uv: vec2f, t: f32, l0: f32, l1: f32, l2: f32) -> vec2f {
    let s = StaticDrops(uv, t) * l0;
    let m1 = DropLayer2(uv, t) * l1;
    let m2 = DropLayer2(uv * 1.85, t) * l2;

    var c = s + m1.x + m2.x;
    c = smoothstep(0.3, 1.0, c);

    return vec2f(c, max(m1.y * l0, m2.y * l1));
}

// ─── Background sampling (mipmap-free approximation) ────────────────
//
// Shadertoy's \`textureLod(tex, uv, focus)\` relies on mipmaps; our
// ping-pong textures don't have any, so we average eight taps arranged
// on a unit ring whose radius is \`focus\` texels (with texel size
// 1 / resH).  At focus≈0 we fall back to the centre tap so droplet
// interiors remain sharp.
fn sampleBlurred(uv: vec2f, focus: f32) -> vec3f {
    // \`textureSampleLevel(..., 0.0)\` rather than \`textureSample\` so this
    // function is legal under non-uniform control flow.  The caller passes
    // \`focus\` derived from per-pixel drop-mask values (line 225), and the
    // early-return below would otherwise make the loop's sample fall foul of
    // WGSL's uniformity rule for implicit-LOD texture ops.  Our ping-pong
    // textures have no mipmaps, so explicit LOD 0 is the same result.
    let centreUV = clamp(uv, vec2f(0.0), vec2f(1.0));
    let centre = textureSampleLevel(inputTexture, texSampler, centreUV, 0.0).rgb;

    let f = max(focus, 0.0);
    let weight = smoothstep(0.0, 1.5, f);
    if (weight <= 0.001) {
        return centre;
    }

    // 8-tap unit ring.  \`s\` is sin(45°) = cos(45°).
    let s = 0.7071067812;
    let offsets = array<vec2f, 8>(
        vec2f( 1.0,  0.0),
        vec2f(-1.0,  0.0),
        vec2f( 0.0,  1.0),
        vec2f( 0.0, -1.0),
        vec2f(   s,    s),
        vec2f(  -s,    s),
        vec2f(   s,   -s),
        vec2f(  -s,   -s),
    );

    let r = f / max(params.resH, 1.0);
    var acc = vec3f(0.0);
    for (var i: i32 = 0; i < 8; i = i + 1) {
        let suv = clamp(uv + offsets[i] * r, vec2f(0.0), vec2f(1.0));
        acc = acc + textureSampleLevel(inputTexture, texSampler, suv, 0.0).rgb;
    }
    return mix(centre, acc / 8.0, weight);
}

// ─── Fragment shader ────────────────────────────────────────────────

@fragment
fn fs(in: VertexOutput) -> @location(0) vec4f {
    let res = vec2f(max(params.resW, 1.0), max(params.resH, 1.0));

    // Shadertoy convention: uv ∈ [-aspect/2, aspect/2] × [-0.5, 0.5],
    // y-axis pointing up.  Our fullscreen-triangle gives in.uv ∈ [0, 1]
    // with origin top-left, so we flip Y and recentre.
    var uv = vec2f((in.uv.x - 0.5) * (res.x / res.y), 0.5 - in.uv.y);
    var UV = vec2f(in.uv.x, 1.0 - in.uv.y);

    let T = params.time;
    let t = T * 0.2;

    // Manual override if rainAmount ≥ 0, otherwise the original auto-cycle.
    var rainAmount: f32;
    if (params.rainAmount < 0.0) {
        rainAmount = sin(T * 0.05) * 0.3 + 0.7;
    } else {
        rainAmount = clamp(params.rainAmount, 0.0, 1.0);
    }

    let maxBlur = mix(3.0, 6.0, rainAmount);
    let minBlur = 2.0;

    // Static framing — the heart story is removed, so we lock the
    // subtle pulse the original drove with cos(T*.2) to a neutral 0.
    let zoom = 0.0;
    uv = uv * (0.7 + zoom * 0.3);
    UV = (UV - 0.5) * (0.9 + zoom * 0.1) + 0.5;

    let staticDrops = smoothstep(-0.5, 1.0, rainAmount) * 2.0;
    let layer1      = smoothstep(0.25, 0.75, rainAmount);
    let layer2      = smoothstep(0.0,  0.5,  rainAmount);

    // Drop refraction mask + normal-like gradient from finite differences.
    let c  = Drops(uv,       t, staticDrops, layer1, layer2);
    let e  = vec2f(0.001, 0.0);
    let cx = Drops(uv + e,        t, staticDrops, layer1, layer2).x;
    let cy = Drops(uv + e.yx,     t, staticDrops, layer1, layer2).x;
    let n  = vec2f(cx - c.x, cy - c.x);

    // Focus blur: high outside drops, low inside; trail dampens overall blur.
    let focus = mix(maxBlur - c.y, minBlur, smoothstep(0.1, 0.2, c.x));
    var col = sampleBlurred(UV + n, focus);

    // ── USE_POST_PROCESSING block from the original ────────────────
    let tp = (T + 3.0) * 0.5;
    let colFade = sin(tp * 0.2) * 0.5 + 0.5;
    col = col * mix(vec3f(1.0), vec3f(0.8, 0.9, 1.3), vec3f(colFade));

    let fadeIn = smoothstep(0.0, 10.0, T);   // ramp in over the first 10 s
    var lightning = sin(tp * sin(tp * 10.0));
    lightning = lightning * pow(max(0.0, sin(tp + sin(tp))), 10.0);
    col = col * (1.0 + lightning * fadeIn);

    // Soft radial vignette around the (post-recentred) UV.
    let centred = UV - 0.5;
    col = col * (1.0 - dot(centred, centred));

    // Apply only the fade-in; never fade out — the effect should cycle
    // indefinitely instead of ending like the original 102 s story.
    col = col * fadeIn;

    return vec4f(col, 1.0);
}
`,is=`// postfx-star-nest.wgsl — Volumetric "Star Nest" fractal background.
//
// WGSL port of "Star Nest" by Pablo Roman Andrioli (Kali / "ar00n"),
// originally published on Shadertoy (https://www.shadertoy.com/view/XlfGRj,
// 2013, CC BY-NC-SA 3.0). The algorithm marches a small number of rays
// through a tiled iterated-function-system whose attractor is the
// Apollonian-like map \`p := |p|/dot(p,p) - c\`. Each ray accumulates the
// absolute change in radius across the iterations to produce a
// star/nebula density that is then colour-graded by depth.
//
// This shader is procedural: it ignores \`inputTexture\` and \`texSampler\`
// but keeps them in the binding set so the file is drop-in compatible
// with the existing post-processing pipeline (same \`@group(0)\` layout
// as every other \`postfx-*.wgsl\`). It can be used in two ways:
//
//   1. As a regular post-processing effect through \`PostProcessPipeline\`
//      — registered under the name \`star-nest\`; the previous frame is
//      replaced by the procedural starfield (good for a "go to hyperspace"
//      transition).
//   2. As a stand-alone full-screen background through \`BackgroundShader\`
//      — the runtime that mounts a self-contained canvas behind any DOM
//      element (used by the Z32 title screen).
//
// The mouse-driven camera rotation in the original is preserved but
// exposed as plain numeric parameters (\`mouseX\`, \`mouseY\` ∈ [0..1]) so
// callers can keep the camera static, animate it on a clock, or wire it
// to pointer input as they please.
//
// References
// ----------
//   - Roman Andrioli, P. "Star Nest" (Shadertoy, 2013) — original GLSL.
//   - Quilez, I. "Distance functions / Iterated Function Systems" —
//     https://iquilezles.org/articles/distfunctions/
//   - Hart, J. C. "Sphere tracing: a geometric method for the antialiased
//     ray tracing of implicit surfaces" (1996) — volumetric ray marching.
//
// Pairs with fullscreen-triangle.wgsl (vertex shader).

// ─── Uniforms ───────────────────────────────────────────────────────

struct Params {
    time:   f32,   // accumulated seconds; pump this per rAF tick
    resW:   f32,   // canvas width  in pixels (for aspect correction)
    resH:   f32,   // canvas height in pixels (for aspect correction)
    mouseX: f32,   // normalised mouse / camera-yaw control (0..1)
    mouseY: f32,   // normalised mouse / camera-pitch control (0..1)
}

// ─── Bindings ───────────────────────────────────────────────────────
//
// Kept binding-compatible with the rest of the postfx family even
// though this effect is purely procedural; \`inputTexture\` /
// \`texSampler\` are unused.

@group(0) @binding(0) var inputTexture : texture_2d<f32>;
@group(0) @binding(1) var texSampler   : sampler;
@group(0) @binding(2) var<uniform> params : Params;

// ─── Vertex → Fragment interface ────────────────────────────────────

struct VertexOutput {
    @builtin(position) position: vec4f,
    @location(0) uv: vec2f,
}

// ─── Tunable constants (mirror the GLSL #defines verbatim) ──────────

const ITERATIONS : i32 = 17;
const FORMUPARAM : f32 = 0.53;
const VOLSTEPS   : i32 = 20;
const STEPSIZE   : f32 = 0.1;
const ZOOM       : f32 = 0.800;
const TILE       : f32 = 0.850;
const SPEED      : f32 = 0.010;
const BRIGHTNESS : f32 = 0.0015;
const DARKMATTER : f32 = 0.300;
const DISTFADING : f32 = 0.730;
const SATURATION : f32 = 0.850;

// ─── Helpers ────────────────────────────────────────────────────────

/// GLSL-style positive modulo: \`p - q * floor(p / q)\`.
/// WGSL's built-in \`%\` is C-style remainder, which returns negative
/// values for negative operands and so corrupts the tiling fold.
fn mod_vec3(p: vec3f, q: vec3f) -> vec3f {
    return p - q * floor(p / q);
}

/// Apply a 2D rotation by \`angle\` to the \`(x, y)\` lane of a 3-vector.
/// Used to keep the original \`dir.xz *= rot1; dir.xy *= rot2;\` idiom
/// readable without manual swizzle gymnastics. Sign convention matches
/// the GLSL \`vec * mat\` semantics of the original shader.
fn rotate_xz(v: vec3f, angle: f32) -> vec3f {
    let c = cos(angle);
    let s = sin(angle);
    return vec3f(v.x * c + v.z * s, v.y, -v.x * s + v.z * c);
}

fn rotate_xy(v: vec3f, angle: f32) -> vec3f {
    let c = cos(angle);
    let s = sin(angle);
    return vec3f(v.x * c + v.y * s, -v.x * s + v.y * c, v.z);
}

// ─── Fragment shader ────────────────────────────────────────────────

@fragment
fn fs(in: VertexOutput) -> @location(0) vec4f {
    // The fullscreen-triangle vertex shader hands us \`uv ∈ [0, 1]²\`
    // with Y already flipped for textures; reconstruct the original
    // shadertoy \`fragCoord/iResolution - 0.5\` mapping in screen space.
    var uv = in.uv - vec2f(0.5);
    // Preserve the original aspect-ratio compensation so the starfield
    // looks identical on wide and tall windows.
    uv.y = uv.y * (params.resH / params.resW);

    var dir = vec3f(uv * ZOOM, 1.0);
    let t = params.time * SPEED + 0.25;

    // Camera angles — match the GLSL formulation that biased the angles
    // by a small constant so the static "no mouse" view is already
    // interesting (rather than facing along an axis).
    let a1 = 0.5 + params.mouseX * 2.0;
    let a2 = 0.8 + params.mouseY * 2.0;

    dir = rotate_xz(dir, a1);
    dir = rotate_xy(dir, a2);

    // \`origin\` corresponds to the GLSL local \`from\`; renamed because
    // \`from\` is a reserved WGSL keyword (used by \`import\` syntax in
    // module-level constructs).
    var origin = vec3f(1.0, 0.5, 0.5);
    origin = origin + vec3f(t * 2.0, t, -2.0);
    origin = rotate_xz(origin, a1);
    origin = rotate_xy(origin, a2);

    // Volumetric ray-march: 20 steps × 17 IFS iterations = 340 work
    // units per pixel. Tweakable above if this is too heavy on a given
    // target — the GLSL defines map 1:1 to the const block above.
    var s = 0.1;
    var fade = 1.0;
    var v = vec3f(0.0);

    for (var r: i32 = 0; r < VOLSTEPS; r = r + 1) {
        var p = origin + s * dir * 0.5;
        // Tiling fold: reflect the position into a single tile so the
        // fractal repeats periodically through space.
        p = abs(vec3f(TILE) - mod_vec3(p, vec3f(TILE * 2.0)));

        var a: f32 = 0.0;
        var pa: f32 = 0.0;
        for (var i: i32 = 0; i < ITERATIONS; i = i + 1) {
            // The magic formula: a 3D Apollonian-like attractor map.
            p = abs(p) / dot(p, p) - FORMUPARAM;
            let len_p = length(p);
            a = a + abs(len_p - pa);
            pa = len_p;
        }

        let dm = max(0.0, DARKMATTER - a * a * 0.001);
        a = a * a * a; // boost contrast

        // After ~⅓ of the steps, the "dark matter" begins to occlude
        // farther samples so the volume reads as depth, not as a flat
        // colour wash.
        if (r > 6) {
            fade = fade * (1.0 - dm);
        }
        v = v + vec3f(fade);
        v = v + vec3f(s, s * s, s * s * s * s) * a * BRIGHTNESS * fade;
        fade = fade * DISTFADING;
        s = s + STEPSIZE;
    }

    // Desaturate towards luminance by \`1 - SATURATION\` so the starfield
    // stays mostly hue-driven but doesn't blow out to white in bright
    // regions.
    let luminance = length(v);
    v = mix(vec3f(luminance), v, SATURATION);

    return vec4f(v * 0.01, 1.0);
}
`,Ti=3,zr=64,as=[["passthrough",ci],["bloom",di],["blur",hi],["vignette",ui],["grayscale",pi],["sepia",gi],["invert",fi],["colorize",mi],["threshold",bi],["brighten",vi],["transparency",yi],["chromatic-aberration",wi],["noise",xi],["sharpen",_i],["sobel",Ei],["pixel-art",Si],["pixel-art-edges",Ci],["pixel-art-retro",Ai],["crt",ki],["rain-glass",Ii],["star-nest",is]],os={passthrough:[],bloom:["threshold","intensity"],blur:["radiusX","radiusY","texelW","texelH"],vignette:["radius","softness"],grayscale:["intensity"],sepia:["intensity"],invert:["intensity"],colorize:["r","g","b","intensity"],threshold:["level"],brighten:["amount"],transparency:["amount"],"chromatic-aberration":["offsetR","offsetB","texelW","texelH"],noise:["intensity","seed"],sharpen:["amount","texelW","texelH"],sobel:["texelW","texelH"],"pixel-art":["blockSize","texelW","texelH"],"pixel-art-edges":["blockSize","texelW","texelH","threshold","darknessFactor"],"pixel-art-retro":["blockSize","texelW","texelH","colorLevels","ditherStrength"],crt:["texelW","texelH","curvature","scanlineIntensity","scanlineCount","vignetteStrength","brightness"],"rain-glass":["time","rainAmount","resW","resH"],"star-nest":["time","resW","resH","mouseX","mouseY"]};class ls{ctx;device;shaderLoader;format;registry=new Map;vertexModule;sampler;textureA;textureB;viewA;viewB;width;height;chain=[];backgroundChain=[];_currentDescriptors=[];lastChainFingerprint="";lastBackgroundChainFingerprint="";filterCache=new Map;filterCompiling=new Map;sharedBindGroupLayout;sharedPipelineLayout;constructor(e,t,r,s,n,i,l,o,c,d,u){this.ctx=e,this.device=e.device,this.format=t,this.shaderLoader=r,this.vertexModule=s,this.sampler=n,this.textureA=i,this.textureB=l,this.viewA=i.createView({label:"postprocess-viewA"}),this.viewB=l.createView({label:"postprocess-viewB"}),this.sharedBindGroupLayout=o,this.sharedPipelineLayout=c,this.width=d,this.height=u;for(const[p,h]of as)this.registry.set(p,h)}static async create(e,t,r,s){const n=e.device,i=new ss(n),{module:l}=await i.compile(ns,"fullscreen-triangle-vs"),o=n.createSampler({magFilter:"linear",minFilter:"linear",addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge",label:"postprocess-sampler"}),c=ot(n,t,r,s,"postprocess-textureA"),d=ot(n,t,r,s,"postprocess-textureB"),u=n.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,texture:{sampleType:"float"}},{binding:1,visibility:GPUShaderStage.FRAGMENT,sampler:{type:"filtering"}},{binding:2,visibility:GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}}],label:"postprocess-shared-bgl"}),p=n.createPipelineLayout({bindGroupLayouts:[u],label:"postprocess-shared-layout"});return new ls(e,s,i,l,o,c,d,u,p,t,r)}registerEffect(e,t){this.registry.set(e,t)}resize(e,t){this.textureA.destroy(),this.textureB.destroy(),this.textureA=ot(this.device,e,t,this.format,"postprocess-textureA"),this.textureB=ot(this.device,e,t,this.format,"postprocess-textureB"),this.viewA=this.textureA.createView({label:"postprocess-viewA"}),this.viewB=this.textureB.createView({label:"postprocess-viewB"}),this.width=e,this.height=t}async setChain(e){const t=[],r=[];for(const i of e)i.isBackground?r.push(i):t.push(i);const[s,n]=await Promise.all([this.compilePartition(t,this.lastChainFingerprint,this.chain),this.compilePartition(r,this.lastBackgroundChainFingerprint,this.backgroundChain)]);s&&(this.destroyChainArray(this.chain),this.chain=s.compiled,this.lastChainFingerprint=s.fingerprint),n&&(this.destroyChainArray(this.backgroundChain),this.backgroundChain=n.compiled,this.lastBackgroundChainFingerprint=n.fingerprint),this._currentDescriptors=[...e]}async compilePartition(e,t,r){const s=e.map(i=>i.effect).join(",");if(s===t){for(let i=0;i<Math.min(e.length,r.length);i++)this.writeEffectUniforms(r[i].uniformBuffer,e[i]);return null}const n=[];for(const i of e){const l=this.registry.get(i.effect);if(!l)throw new Error(`PostProcessPipeline: unknown effect "${i.effect}". Registered effects: ${[...this.registry.keys()].join(", ")}`);n.push(await this.compileEffect(i.effect,l,i))}return{compiled:n,fingerprint:s}}apply(e,t){if(this.chain.length===0)return t;let r=t;for(let s=0;s<this.chain.length;s++){const n=s%2===0?this.viewA:this.viewB;this.recordPass(e,this.chain[s],r,n),r=n}if(this.chain.length%2===0){const s=this.filterCache.get("passthrough");if(!s)throw new Error("PostProcessPipeline: passthrough not compiled. Call ensurePassthroughCompiled() before apply().");this.recordPass(e,s,r,this.viewA),r=this.viewA}return r}applyBackground(e,t){const r=this.backgroundChain;if(r.length===0)return;let s=this.viewB;for(let n=0;n<r.length-1;n++){const i=n%2===0?this.viewA:this.viewB;this.recordPass(e,r[n],s,i),s=i}this.recordPass(e,r[r.length-1],s,t)}async applyFilter(e,t,r,s){const n=this.registry.get(r);if(!n)throw new Error(`PostProcessPipeline.applyFilter: unknown filter "${r}". Registered effects: ${[...this.registry.keys()].join(", ")}`);const i={effect:r,...s??{}};let l=this.filterCache.get(r);return l?this.writeEffectUniforms(l.uniformBuffer,i):l=await this.getOrCompileFilter(r,n,i),this.recordPass(e,l,t,this.viewA),this.viewA}async ensurePassthroughCompiled(){const e=this.registry.get("passthrough");e&&await this.getOrCompileFilter("passthrough",e,{effect:"passthrough"})}async blitToView(e,t){return this.blitSourceToView(e,this.viewA,t)}async blitSourceToView(e,t,r){let s=this.filterCache.get("passthrough");if(!s){const n=this.registry.get("passthrough");if(!n)throw new Error("PostProcessPipeline: passthrough shader not registered");s=await this.getOrCompileFilter("passthrough",n,{effect:"passthrough"})}this.recordPass(e,s,t,r)}async prewarmFilters(e){const t=e??[...this.registry.keys()];await Promise.all(t.filter(r=>!this.filterCache.has(r)).map(r=>{const s=this.registry.get(r);return s?this.getOrCompileFilter(r,s,{effect:r}):Promise.resolve()}))}get resultTexture(){return this.chain.length===0?this.textureA:this.textureA}get dimensions(){return{width:this.width,height:this.height}}get hasActiveChain(){return this.chain.length>0}get hasActiveBackgroundChain(){return this.backgroundChain.length>0}get currentDescriptors(){return[...this._currentDescriptors]}get sourceTexture(){return this.textureB}get sourceTextureView(){return this.viewB}destroy(){this.destroyChain();for(const e of this.filterCache.values())e.uniformBuffer.destroy();this.filterCache.clear(),this.filterCompiling.clear(),this.textureA.destroy(),this.textureB.destroy()}async getOrCompileFilter(e,t,r){const s=this.filterCache.get(e);if(s)return s;const n=this.filterCompiling.get(e);if(n)return n;const i=this.compileEffect(e,t,r).then(l=>(this.filterCache.set(e,l),this.filterCompiling.delete(e),l));return this.filterCompiling.set(e,i),i}async compileEffect(e,t,r){const{module:s}=await this.shaderLoader.compile(t,`postprocess-${e}-fs`),n=this.sharedBindGroupLayout,i=this.sharedPipelineLayout,l=await this.device.createRenderPipelineAsync({layout:i,vertex:{module:this.vertexModule,entryPoint:"vs"},fragment:{module:s,entryPoint:"fs",targets:[{format:this.format,writeMask:15}]},primitive:{topology:"triangle-list"},label:`postprocess-${e}-pipeline`}),o=this.device.createBuffer({size:zr,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST,label:`postprocess-${e}-uniforms`});return this.writeEffectUniforms(o,r),{pipeline:l,uniformBuffer:o,bindGroupLayout:n,name:e}}recordPass(e,t,r,s){const n=this.device.createBindGroup({layout:t.bindGroupLayout,entries:[{binding:0,resource:r},{binding:1,resource:this.sampler},{binding:2,resource:{buffer:t.uniformBuffer}}],label:`postprocess-${t.name}-bg`}),i=e.beginRenderPass({colorAttachments:[{view:s,loadOp:"clear",storeOp:"store",clearValue:{r:0,g:0,b:0,a:1}}],label:`postprocess-${t.name}-pass`});i.setPipeline(t.pipeline),i.setBindGroup(0,n),i.draw(Ti),i.end()}writeEffectUniforms(e,t){const r=new Float32Array(zr/4),s=os[t.effect];if(s){let n=0;for(const i of s){const l=t[i];typeof l=="number"&&n<r.length&&(r[n++]=l)}}else{let n=0;for(const[i,l]of Object.entries(t))i!=="effect"&&typeof l=="number"&&n<r.length&&(r[n++]=l)}this.device.queue.writeBuffer(e,0,r)}destroyChainArray(e){for(const t of e)t.uniformBuffer.destroy()}destroyChain(){this.destroyChainArray(this.chain),this.destroyChainArray(this.backgroundChain),this.chain=[],this.backgroundChain=[],this._currentDescriptors=[],this.lastChainFingerprint="",this.lastBackgroundChainFingerprint=""}}function ot(a,e,t,r,s){return a.createTexture({size:{width:e,height:t},format:r,usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_SRC|GPUTextureUsage.COPY_DST,label:s})}const kt={"star-nest":is},Ri={"star-nest":["time","resW","resH","mouseX","mouseY"]},It=new Map(as),Pi=3,Dr=64;class Li{static async mount(e,t={}){const r=Mi(t),s=r[0].effect;if(!(s in kt))throw new Error(`BackgroundShader: unknown shader "${s}". Registered procedural backgrounds: ${Object.keys(kt).join(", ")}`);for(let L=1;L<r.length;L++)if(!It.has(r[L].effect))throw new Error(`BackgroundShader: unknown effect "${r[L].effect}" at chain index ${L}. Registered foreground effects: ${[...It.keys()].join(", ")}`);const n=t.followMouse??!0,i=t.maxDevicePixelRatio??1.5,l=t.timeScale??1,o=document.createElement("canvas");o.style.position="absolute",o.style.inset="0",o.style.width="100%",o.style.height="100%",o.style.pointerEvents="none",o.style.zIndex="0",o.setAttribute("aria-hidden","true");const c=r.map(L=>L.effect).join("+");o.setAttribute("data-brainiac-background-shader",c),e.insertBefore(o,e.firstChild);const d=await st.create({powerPreference:"low-power"}),u=d.device,p=o.getContext("webgpu");if(!p)throw d.destroy(),e.removeChild(o),new Error("BackgroundShader: failed to get a WebGPU canvas context");const h=navigator.gpu.getPreferredCanvasFormat();p.configure({device:u,format:h,alphaMode:"premultiplied"});const g=u.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,texture:{sampleType:"float"}},{binding:1,visibility:GPUShaderStage.FRAGMENT,sampler:{type:"filtering"}},{binding:2,visibility:GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}}],label:"background-shader-bgl"}),f=u.createPipelineLayout({bindGroupLayouts:[g]}),m=new ss(u),{module:b}=await m.compile(ns,"background-shader-vs"),v=[];for(let L=0;L<r.length;L++){const S=r[L],H=L===0,F=H?kt[S.effect]:It.get(S.effect),{module:se}=await m.compile(F,`background-shader-${S.effect}-fs`),ne=await u.createRenderPipelineAsync({layout:f,vertex:{module:b,entryPoint:"vs"},fragment:{module:se,entryPoint:"fs",targets:[{format:h}]},primitive:{topology:"triangle-list"},label:`background-shader-${S.effect}-pipeline`}),ie=u.createBuffer({size:Dr,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST,label:`background-shader-${S.effect}-uniforms`}),He=H?Ri[S.effect]:os[S.effect]??[];v.push({name:S.effect,pipeline:ne,uniformBuffer:ie,isBackground:H,paramOrder:He,descriptor:S})}const w=u.createTexture({size:{width:1,height:1},format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST,label:"background-shader-dummy-texture"});u.queue.writeTexture({texture:w},new Uint8Array([0,0,0,255]),{bytesPerRow:4},{width:1,height:1});const x=w.createView({label:"background-shader-dummy-view"}),_=u.createSampler({magFilter:"linear",minFilter:"linear",addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge",label:"background-shader-sampler"}),E=v.length>1,A={textureA:null,textureB:null,viewA:null,viewB:null},I=(L,S)=>{A.textureA?.destroy(),A.textureB?.destroy(),A.textureA=u.createTexture({size:{width:L,height:S},format:h,usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING,label:"background-shader-textureA"}),A.textureB=u.createTexture({size:{width:L,height:S},format:h,usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING,label:"background-shader-textureB"}),A.viewA=A.textureA.createView({label:"background-shader-viewA"}),A.viewB=A.textureB.createView({label:"background-shader-viewB"})},C={width:0,height:0,mouseX:.5,mouseY:.5,startTime:performance.now(),disposed:!1,rafId:0},N=new Float32Array(Dr/4),T=(L,S)=>{const H={};for(const[F,se]of Object.entries(L.descriptor))F==="effect"||F==="isBackground"||typeof se=="number"&&(H[F]=se);Object.assign(H,S),N.fill(0);for(let F=0;F<L.paramOrder.length;F++)N[F]=H[L.paramOrder[F]]??0;u.queue.writeBuffer(L.uniformBuffer,0,N)},R=()=>{if(C.width<=0||C.height<=0)return;const L={resW:C.width,resH:C.height,texelW:1/C.width,texelH:1/C.height};for(let S=1;S<v.length;S++)T(v[S],L)},z=()=>{const L=e.getBoundingClientRect(),S=Math.min(window.devicePixelRatio||1,i),H=Math.max(1,Math.floor(L.width*S)),F=Math.max(1,Math.floor(L.height*S));H===C.width&&F===C.height||(o.width=H,o.height=F,C.width=H,C.height=F,E&&I(H,F),R())};z();const D=new ResizeObserver(z);D.observe(e);const $=L=>{const S=e.getBoundingClientRect();S.width<=0||S.height<=0||(C.mouseX=(L.clientX-S.left)/S.width,C.mouseY=(L.clientY-S.top)/S.height)};n&&e.addEventListener("pointermove",$,{passive:!0});const O=()=>{if(C.disposed)return;const L=(performance.now()-C.startTime)/1e3*l;T(v[0],{time:L,resW:C.width,resH:C.height,mouseX:C.mouseX,mouseY:C.mouseY});const S=u.createCommandEncoder({label:"background-shader-encoder"}),H=p.getCurrentTexture().createView();for(let F=0;F<v.length;F++){const se=v[F],ne=F===v.length-1,ie=F===0?x:(F-1)%2===0?A.viewA:A.viewB,He=ne?H:F%2===0?A.viewA:A.viewB,X=u.createBindGroup({layout:g,entries:[{binding:0,resource:ie},{binding:1,resource:_},{binding:2,resource:{buffer:se.uniformBuffer}}],label:`background-shader-${se.name}-bg`}),me=S.beginRenderPass({colorAttachments:[{view:He,loadOp:"clear",storeOp:"store",clearValue:{r:0,g:0,b:0,a:1}}],label:`background-shader-${se.name}-pass`});me.setPipeline(se.pipeline),me.setBindGroup(0,X),me.draw(Pi),me.end()}u.queue.submit([S.finish()]),C.rafId=requestAnimationFrame(O)};return C.rafId=requestAnimationFrame(O),{target:e,canvas:o,dispose:()=>{if(!C.disposed){C.disposed=!0,cancelAnimationFrame(C.rafId),D.disconnect(),n&&e.removeEventListener("pointermove",$);for(const L of v)L.uniformBuffer.destroy();A.textureA?.destroy(),A.textureB?.destroy(),w.destroy(),p.unconfigure(),d.destroy(),o.parentNode===e&&e.removeChild(o)}}}}}function Mi(a){if(a.effects&&a.effects.length>0){const t=a.effects[0];if(t.isBackground===!1)throw new Error(`BackgroundShader: the first effect in a chain must be a procedural background (set isBackground: true). Got "${t.effect}" with isBackground: false.`);return[{...t,isBackground:!0},...a.effects.slice(1).map(r=>({...r,isBackground:!1}))]}return[{effect:a.shader??"star-nest",isBackground:!0}]}class ft{static isEmpty=e=>Object.keys(e).length===0&&e.constructor===Object;static swapObjectKeysAndValues=e=>{var t={};for(var r in e)e.hasOwnProperty(r)&&(t[e[r]]=r);return t};static hasSameProperties(e,t){if(typeof e!="object"||typeof t!="object")return!1;const r=Object.keys(e),s=Object.values(t);if(r.length!==s.length)return!1;for(let n=0;n<r.length;n++){const i=r[n];if(typeof e[i]=="object"){if(!ft.hasSameProperties(e[i],t[i]))return!1}else if(!s.includes(e[i]))return!1}return!0}static extend(e,t){for(var r in t)try{t[r].constructor==Object?e[r]=ft.extend(e[r],t[r]):e[r]=t[r]}catch{e[r]=t[r]}return e}}class ze{static setCookie(e,t,r=1e4){var s=new Date;s.setTime(s.getTime()+r*24*60*60*1e3);var n="expires="+s.toUTCString();document.cookie=e+"="+t+"; "+n}static getCookie(e){e=e+"=";for(var t=document.cookie.split(";"),r=0;r<t.length;r++){for(var s=t[r];s.charAt(0)==" ";)s=s.substring(1);if(s.indexOf(e)===0)return s.substring(e.length,s.length)}return""}}class Wt extends HTMLElement{static get observedAttributes(){return["variant","size","disabled","loading","type"]}constructor(){super(),this.attachShadow({mode:"open",delegatesFocus:!0})}connectedCallback(){this.#e(),this.#t()}attributeChangedCallback(){this.shadowRoot&&this.#e()}get variant(){return this.getAttribute("variant")||"primary"}set variant(e){this.setAttribute("variant",e)}get size(){return this.getAttribute("size")||"md"}set size(e){this.setAttribute("size",e)}get disabled(){return this.hasAttribute("disabled")}set disabled(e){this.toggleAttribute("disabled",e)}get loading(){return this.hasAttribute("loading")}set loading(e){this.toggleAttribute("loading",e)}get type(){return this.getAttribute("type")||"button"}set type(e){this.setAttribute("type",e)}#e(){if(!this.shadowRoot)return;const e=this.variant,t=this.size,r=this.disabled,s=this.loading,n=this.type;this.shadowRoot.innerHTML=`
      <style>${Wt.#r()}</style>
      <button
        part="button"
        class="btn btn--${e} btn--${t}"
        type="${n}"
        ${r?"disabled":""}
        ${s?'aria-busy="true"':""}
        ${r?'aria-disabled="true"':""}
      >
        ${s?'<span class="spinner" aria-hidden="true"></span>':""}
        <slot name="prefix"></slot>
        <span class="label"><slot></slot></span>
        <slot name="suffix"></slot>
      </button>
    `}#t(){this.shadowRoot&&this.shadowRoot.addEventListener("click",e=>{if(this.disabled||this.loading){e.stopImmediatePropagation(),e.preventDefault();return}this.dispatchEvent(new CustomEvent("ars-button:click",{bubbles:!0,composed:!0,detail:{variant:this.variant}}))})}static#r(){return`
      :host {
        display: inline-block;
        font-family: var(--arswc-font-family-sans, system-ui, sans-serif);
      }

      :host([disabled]),
      :host([loading]) {
        pointer-events: none;
      }

      .btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: var(--arswc-spacing-sm, 8px);
        border: 1px solid transparent;
        border-radius: var(--arswc-radius-sm, 6px);
        cursor: pointer;
        font-family: inherit;
        font-weight: 600;
        line-height: 1;
        transition:
          background var(--arswc-transition-duration, 200ms) ease,
          border-color var(--arswc-transition-duration, 200ms) ease,
          box-shadow var(--arswc-transition-duration, 200ms) ease,
          transform 100ms ease;
        white-space: nowrap;
        user-select: none;
      }

      .btn:focus-visible {
        outline: none;
        box-shadow: var(--arswc-focus-ring, 0 0 0 3px rgba(37, 99, 235, 0.3));
      }

      .btn:active:not(:disabled) {
        transform: scale(0.97);
      }

      /* --- Sizes --- */
      .btn--sm {
        padding: var(--arswc-spacing-xs, 4px) var(--arswc-spacing-sm, 8px);
        font-size: var(--arswc-font-size-sm, 0.75rem);
      }

      .btn--md {
        padding: var(--arswc-spacing-sm, 8px) var(--arswc-spacing-md, 16px);
        font-size: var(--arswc-font-size-md, 0.875rem);
      }

      .btn--lg {
        padding: calc(var(--arswc-spacing-sm, 8px) + 4px) var(--arswc-spacing-lg, 24px);
        font-size: 1rem;
      }

      /* --- Variant: primary --- */
      .btn--primary {
        background: linear-gradient(
          180deg,
          var(--arswc-button-primary-bg-start, #3b82f6),
          var(--arswc-button-primary-bg-end, #2563eb)
        );
        border-color: var(--arswc-button-primary-border, #1d4ed8);
        color: var(--arswc-button-primary-color, #ffffff);
      }

      .btn--primary:hover:not(:disabled) {
        background: linear-gradient(
          180deg,
          var(--arswc-button-primary-hover-bg-start, #60a5fa),
          var(--arswc-button-primary-hover-bg-end, #3b82f6)
        );
      }

      /* --- Variant: secondary --- */
      .btn--secondary {
        background: var(--arswc-button-secondary-bg, #ffffff);
        border-color: var(--arswc-button-secondary-border, #93c5fd);
        color: var(--arswc-button-secondary-color, #1e3a8a);
      }

      .btn--secondary:hover:not(:disabled) {
        background: var(--arswc-button-secondary-hover-bg, #eff6ff);
        border-color: var(--arswc-button-secondary-hover-border, #3b82f6);
        color: var(--arswc-button-secondary-hover-color, #1d4ed8);
      }

      /* --- Variant: danger --- */
      .btn--danger {
        background: var(--arswc-color-danger, #dc2626);
        border-color: color-mix(in srgb, var(--arswc-color-danger, #dc2626) 80%, black);
        color: #ffffff;
      }

      .btn--danger:hover:not(:disabled) {
        background: color-mix(in srgb, var(--arswc-color-danger, #dc2626) 85%, black);
      }

      /* --- Variant: ghost --- */
      .btn--ghost {
        background: transparent;
        border-color: transparent;
        color: var(--arswc-color-text, #1b2430);
      }

      .btn--ghost:hover:not(:disabled) {
        background: var(--arswc-color-surface, #f6f8fb);
      }

      /* --- Disabled state --- */
      .btn:disabled {
        background: var(--arswc-color-disabled-bg, #f3f4f6);
        border-color: var(--arswc-color-disabled-bg, #f3f4f6);
        color: var(--arswc-color-disabled, #9ca3af);
        cursor: not-allowed;
      }

      /* --- Spinner --- */
      .spinner {
        display: inline-block;
        width: 1em;
        height: 1em;
        border: 2px solid currentColor;
        border-right-color: transparent;
        border-radius: 50%;
        animation: ars-btn-spin 600ms linear infinite;
      }

      @keyframes ars-btn-spin {
        to { transform: rotate(360deg); }
      }

      .label {
        display: inline-flex;
        align-items: center;
      }
    `}}const zi=a=>{try{return JSON.parse(a)}catch{return a}},Di=(a,e)=>new CustomEvent(a,{detail:e,bubbles:!0,composed:!0}),Bi=(a,e)=>e.filter(t=>!!a.getNamedItem(t)),Oi=(a,e,t)=>{const r={};return e.forEach(s=>{a.attributes.getNamedItem(s)||(r[s]=t(s))}),r},Fi=(a,e)=>{const t=a.indexOf(e);return t!==-1&&a.splice(t,1),a},$i=(a,e)=>e.split(".").reduce((t,r)=>{if(t==null)throw new Error(`Cannot resolve '${e}' from component.`);return t[r]},a),Ni=a=>{const t=a.trim().replace(/;$/,"").match(/^(?:this\.)?([A-Za-z_$][\w$]*)(?:\((.*)\))?$/);if(!t)throw new Error(`Unsupported event handler expression '${a}'. Use methodName(...) syntax.`);const[,r,s=""]=t,n=s.trim()?s.split(",").map(i=>i.trim()):[];return{methodName:r,args:n}},Ui=(a,e)=>{if(e.length){if(e==="this")return a;if(e.startsWith("this."))return $i(a,e.slice(5));if(e==="true")return!0;if(e==="false")return!1;if(e==="null")return null;if(/^-?\d+(\.\d+)?$/.test(e))return Number(e);if(e.startsWith('"')&&e.endsWith('"')||e.startsWith("'")&&e.endsWith("'"))return e.slice(1,-1);throw new Error(`Unsupported event handler argument '${e}'. Use primitives or component property paths.`)}},Hi=(a,e,t)=>r=>{const s=r.shadowRoot?.getElementById(a);if(!s)throw new Error(`Event connector element '${a}' does not exist.`);const{methodName:n,args:i}=Ni(t);s[e]=function(){const l=r[n];if(typeof l!="function")throw new Error(`Event connector method '${n}' does not exist.`);const o=i.map(c=>Ui(r,c));l.apply(r,o)}};class re extends HTMLElement{#e=!1;scheduleRepaint(){this.#e||(this.#e=!0,requestAnimationFrame(()=>{this.#e=!1,typeof this.paint=="function"&&this.paint()}))}arraysMatch(e,t,r){if(e.length!==t.length)return!1;if(e.length===0)return!0;const s=r?e[0]?.[r]:e[0],n=r?e[e.length-1]?.[r]:e[e.length-1],i=r?t[0]?.[r]:t[0],l=r?t[t.length-1]?.[r]:t[t.length-1];return s===i&&n===l}static get observedAttributes(){return[]}static defaultAttributeValue(e){return null}static parseAttributeValue(e,t){return zi(t??"")}constructor(){super(),this.alreadyMappedAttributes=!1,this._attributesMap={},this._waitingOnAttr=[];const e=this.constructor.observedAttributes||[];this._attributesMap=Oi(this,e,this.constructor.defaultAttributeValue.bind(this.constructor)),this._waitingOnAttr=Bi(this.attributes,e),this._waitingOnAttr.length===0&&setTimeout(()=>{this.allAttributesChangedCallback(this._attributesMap)},0)}connectedCallback(){}disconnectedCallback(){}attributeChangedCallback(e,t,r){this._attributesMap[e]=this.constructor.parseAttributeValue.call(this,e,r),this._waitingOnAttr.length&&Fi(this._waitingOnAttr,e),this._waitingOnAttr.length===0&&!this.alreadyMappedAttributes&&(this.allAttributesChangedCallback(this._attributesMap),this.alreadyMappedAttributes=!0)}emitEvent(e,t){this.dispatchEvent(Di(e,t))}allAttributesChangedCallback(e){}connectElementWithEvent(e,t,r){Hi(e,t,r)(this)}}const Gi=`
  :host {
    display: block;
    font-family: var(--arswc-font-family-sans, Arial, sans-serif);
    background: var(--ars-calendar-bg, var(--arswc-color-surface, white));
    border-radius: var(--ars-calendar-border-radius, var(--arswc-radius-md, 8px));
    box-shadow: var(--ars-calendar-shadow, var(--arswc-shadow-sm, 0 2px 10px rgba(0, 0, 0, 0.1)));
    overflow: hidden;
  }
  .calendar-header {
    background: var(--ars-calendar-header-bg, var(--arswc-color-accent, linear-gradient(135deg, #667eea 0%, #764ba2 100%)));
    color: var(--ars-calendar-header-color, var(--arswc-color-accent-contrast, white));
    padding: var(--ars-calendar-header-padding, 15px);
    text-align: center;
    position: relative;
  }
  .calendar-title {
    font-size: var(--ars-calendar-title-font-size, 1.2em);
    font-weight: bold;
    margin: 0;
    text-shadow: var(--ars-calendar-header-text-shadow, none);
  }
  .calendar-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0.2);
    border: none;
    color: var(--ars-calendar-header-color, var(--arswc-color-accent-contrast, white));
    padding: var(--ars-calendar-nav-padding, 8px 12px);
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.3s;
  }
  .calendar-nav:hover {
    background: var(--ars-calendar-button-hover-bg, color-mix(in srgb, var(--arswc-color-accent-contrast, #ffffff) 30%, transparent));
  }
  .calendar-nav.prev {
    left: var(--ars-calendar-nav-prev-left, 15px);
  }
  .calendar-nav.next {
    right: var(--ars-calendar-nav-next-right, 15px);
  }
  .calendar-nav.today {
    position: static;
    transform: none;
    margin: var(--ars-calendar-today-margin, 10px 5px 0 5px);
    font-size: var(--ars-calendar-today-font-size, 0.9em);
  }
  .calendar-weekdays {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    background: var(--ars-calendar-weekdays-bg, var(--arswc-color-surface, #f8f9fa));
    border-bottom: 1px solid #e9ecef;
  }
  .calendar-weekday {
    padding: var(--ars-calendar-weekday-padding, 10px);
    text-align: center;
    font-weight: bold;
    color: var(--ars-calendar-days-header-color, var(--arswc-color-muted, #6c757d));
    font-size: var(--ars-calendar-weekday-font-size, 0.9em);
  }
  .calendar-body {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 1px;
    background: var(--ars-calendar-body-bg, var(--arswc-color-border, #e9ecef));
  }
  .calendar-day {
    background-color: var(--ars-calendar-cell-bg, var(--arswc-color-bg, white));
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    color: var(--ars-calendar-cell-color, var(--arswc-color-text, inherit));
    padding: var(--ars-calendar-day-padding, 10px);
    text-align: center;
    cursor: pointer;
    transition: all 0.2s;
    position: relative;
    min-height: var(--ars-calendar-day-min-height, 40px);
    display: flex;
    align-items: center;
    justify-content: center;
    border: var(--ars-calendar-cell-border, none);
  }
  .calendar-day:hover {
    background-color: var(--ars-calendar-cell-hover-bg, var(--arswc-color-surface, #f8f9fa));
    transform: scale(var(--ars-calendar-day-hover-scale, 1.05));
    box-shadow: var(--ars-calendar-cell-hover-shadow, none);
  }
  .calendar-day.selected {
    background-color: var(--ars-calendar-selected-bg, var(--arswc-color-accent, #667eea));
    color: var(--ars-calendar-selected-color, var(--arswc-color-accent-contrast, white));
    font-weight: bold;
    box-shadow: var(--ars-calendar-selected-shadow, none);
  }
  .calendar-day.other-month {
    color: var(--ars-calendar-other-month-color, var(--arswc-color-muted, #adb5bd));
  }
  /* Collapse completely empty day cells (the trailing row when a month only
     needs five weeks) so the calendar doesn't reserve a blank sixth row. The
     grid gap keeps the row at 1px, so the layout remains stable when a month
     genuinely needs six rows. */
  .calendar-day:empty {
    min-height: 0;
    padding: 0;
  }
  /* "badge" event-mark style.
     Activated by setting attribute event-mark-style="badge" on the
     ars-calendar element (the component then clears the pie-chart
     background and stamps data-event-count onto each cell that has
     events). Shows a small count chip in the top-right corner via
     ::after, picking up the count from attr(data-event-count).
     The inset border that used to accompany the badge has been moved
     to .calendar-day.today so the current day is always highlighted.
     Both colors expose CSS-vars so host apps can theme without
     overriding the whole stylesheet. */
  .calendar-day.today {
    box-shadow: inset 0 0 0 var(
        --ars-calendar-today-border-width,
        var(--ars-calendar-event-border-width, 2px)
      )
      var(
        --ars-calendar-today-border-color,
        var(--ars-calendar-event-border-color, var(--arswc-color-accent, #54dfff))
      );
  }
  .calendar-day.has-events[data-event-count]::after {
    content: attr(data-event-count);
    position: absolute;
    top: var(--ars-calendar-event-badge-top, 4px);
    right: var(--ars-calendar-event-badge-right, 6px);
    min-width: var(--ars-calendar-event-badge-min-width, 16px);
    height: var(--ars-calendar-event-badge-height, 16px);
    padding: var(--ars-calendar-event-badge-padding, 0 4px);
    border-radius: 999px;
    background: var(
      --ars-calendar-event-badge-bg,
      var(--arswc-color-accent, #54dfff)
    );
    color: var(
      --ars-calendar-event-badge-color,
      var(--arswc-color-accent-contrast, #052236)
    );
    font-size: var(--ars-calendar-event-badge-font-size, 0.7em);
    font-weight: 700;
    line-height: var(--ars-calendar-event-badge-line-height, 16px);
    text-align: center;
    box-sizing: border-box;
  }
`;function Wi(a){const e=a.customCSS||a.defaultCSS,t=a.months[a.monthToShow],r=a.yearToShow;return`
    <style>${e}</style>
    <div class="calendar-header">
      <button id="prev" class="calendar-nav prev">‹</button>
      <h2 class="calendar-title">${t} ${r}</h2>
      <button id="next" class="calendar-nav next">›</button>
      <button id="today" class="calendar-nav today">${a.localizedToday}</button>
    </div>
    <div class="calendar-weekdays">
      ${a.localizedAbbreviatedDays.map(s=>`<div class="calendar-weekday">${s}</div>`).join("")}
    </div>
    <div class="calendar-body">
      ${Array.from({length:a.WEEKS_IN_MONTH*a.DAYS_IN_WEEK},(s,n)=>{const i=a.daySlots[n],l=i&&a.events.some(p=>p.day===i&&p.month===a.monthToShow&&p.year===a.yearToShow),o=!i||i<1||i>31,c=a.selectedDay===i&&a.selectedMonth===a.monthToShow&&a.selectedYear===a.yearToShow,d=i&&a.todayDay===i&&a.todayMonth===a.monthToShow&&a.todayYear===a.yearToShow;let u="calendar-day";return o&&(u+=" other-month"),c&&(u+=" selected"),d&&(u+=" today"),l&&(u+=" has-events"),`<div class="${u}">${i||""}</div>`}).join("")}
    </div>
  `}function qi(a,e){return new Date(e,a+1,0).getDate()}function Vi(a,e){return new Date(e,a).getDay()}function Br(a){return new Array(a).fill(null)}function cs(a,e,t,r){return a.filter(s=>s.day===e&&s.month===t&&s.year===r)}function Yi(a,e,t,r){return cs(a,e,t,r).map(s=>s.color)}function Or(a,e=null){if(!a)return null;try{const t=JSON.parse(a);return!Array.isArray(t)||e!==null&&t.length!==e?null:t.every(r=>typeof r=="string")?t:null}catch{return null}}function Xi(a){if(!a)return{};try{const e=JSON.parse(a);return e&&typeof e=="object"&&!Array.isArray(e)?e:{}}catch{return{}}}const ji=(a,e,t)=>{const r=document.createElement("canvas");r.width=a,r.height=e;const s=r.getContext("2d");if(!s||t.length===0)return r;const n=a/2,i=e/2,l=Math.min(a,e)/2-2,o=2*Math.PI/t.length;return t.forEach((c,d)=>{const u=d*o,p=u+o;s.beginPath(),s.moveTo(n,i),s.arc(n,i,l,u,p),s.closePath(),s.fillStyle=c,s.fill()}),r},Zi=re;class k extends Zi{static#e=["January","February","March","April","May","June","July","August","September","October","November","December"];static#t=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];static#r="Today";static#s=6;static#n=7;static#i(){const e=new Date;return{month:e.getMonth(),year:e.getFullYear(),day:e.getDate()}}static#a(e,t){return ft.hasSameProperties(e,t)}static#o(e,t,r,s){return e.find(n=>n.day===t&&n.month===r&&n.year===s)}static#c(e,t,r,s){return cs(e,t,r,s)}static#l(e,t){return e.filter(r=>r.text!==t.text||r.day!==t.day||r.month!==t.month||r.year!==t.year)}static#d(e,t,r,s,n){return new CustomEvent("ars-calendar:daySelected",{detail:{id:e,day:t,month:r,year:s,events:n},bubbles:!0,composed:!0})}static#h(e,t){return qi(e,t)}static#u(e,t){return Vi(e,t)}static#g(e,t){return e*k.#n+t}static#p(){return Br(k.#s*k.#n)}static#y(){return Br(k.#s*k.#n)}static#w(e,t,r,s){return Yi(e,t,r,s)}static#x(e,t,r){return e.length?ji(t,r,e):null}static#_(e,t){const r=e._cellWidth||30,s=e._cellHeight||30;return t&&t.offsetWidth>0&&(e._cellWidth=t.offsetWidth,e._cellHeight=t.offsetHeight),{width:e._cellWidth||r,height:e._cellHeight||s}}static#E(e){if(!e||Object.keys(e).length===0)return"";let t=`:host {
`;for(const[r,s]of Object.entries(e))t+=`  --${r}: ${s};
`;return t+=`}
`,t}static#C(e){return{prev:()=>e.previousMonth(),today:()=>e.setSelectedDateToToday(),next:()=>e.nextMonth()}}static#A(e,t,r,s,n,i){return e===s&&t===n&&r===i}static#k(e,t){return()=>{e.onDayClicked(t)}}static#S(e,t,r,s,n,i){for(let c=0;c<t.length;c++)t[c]=null,r[c]=null;const l=k.#u(s,n),o=k.#h(s,n);for(let c=l;c<o+l;c++){const d=c-l+1;t[c]=d;const u=k.#w(i,d,s,n),{width:p,height:h}=k.#_(e,null);r[c]=k.#x(u,p,h)}return{daySlots:t,daySlotsColors:r}}static#f(e){return()=>{e.id&&e.render()}}static#m(e){return t=>{t.detail.id===e.id&&e.clearAllData()}}static#b(e){return t=>{t.detail.id===e.id&&e.render()}}static#v(e,t){if(!t||!e)return;let r=e.querySelector("style.css-vars-style");r||(r=document.createElement("style"),r.className="css-vars-style",e.prepend(r)),r.textContent=k.#E(t)}static#I(e){const t=k.#i();return e.events=[],e.months=[...k.#e],e.localizedAbbreviatedDays=[...k.#t],e.localizedToday=k.#r,e.monthToShow=t.month,e.yearToShow=t.year,e.todayDay=t.day,e.todayMonth=t.month,e.todayYear=t.year,e.WEEKS_IN_MONTH=k.#s,e.DAYS_IN_WEEK=k.#n,e.daySlots=k.#p(),e.daySlotsColors=k.#y(),e.customTemplate=null,e.customCSS=null,e.cssVars={},e.defaultCSS=Gi,e.eventMarkStyle="pie",e._cellWidth=30,e._cellHeight=30,e._resizeHandler=k.#f(e),e._clearDataHandler=k.#m(e),e._refreshHandler=k.#b(e),k.#S(e,e.daySlots,e.daySlotsColors,e.monthToShow,e.yearToShow,e.events),e}static#T(e){return{addEvent:t=>{if(e.events.find(n=>k.#a(n,t)))return;const s=Object.assign({},t);e.events.push(s),e.selectDate(t.day,t.month,t.year)},removeEvent:t=>{t&&(e.events=k.#l(e.events,t),e.selectDate(t.day,t.month,t.year))},changeEvent:(t,r,s)=>{const n=k.#o(e.events,t.day,t.month,t.year);return n?(n.text=r||n.text,n.color=s||n.color,e.selectDate(n.day,n.month,n.year),!0):!1},selectDate:(t,r,s)=>{t===null||r===null||s===null||(e.selectedDay=t,e.selectedMonth=r,e.selectedYear=s,e.sendDaySelectedEvent(),e.render())},refresh:()=>e.render()}}getEventsByDate(e,t,r){return k.#c(this.events,e,t,r)}sendDaySelectedEvent(){const e=this.getEventsByDate(this.selectedDay,this.selectedMonth,this.selectedYear);this.dispatchEvent(k.#d(this.id,this.selectedDay,this.selectedMonth,this.selectedYear,e))}render(){if(this.shadowRoot)try{const e=new Date;this.todayDay=e.getDate(),this.todayMonth=e.getMonth(),this.todayYear=e.getFullYear(),k.#S(this,this.daySlots,this.daySlotsColors,this.monthToShow,this.yearToShow,this.events);const t=this.customTemplate?this.customTemplate(this):Wi(this);this.shadowRoot.innerHTML=t;const r=this.shadowRoot.querySelectorAll(".calendar-body > .calendar-day");for(let o=0;o<this.WEEKS_IN_MONTH;o++)for(let c=0;c<this.DAYS_IN_WEEK;c++){const d=k.#g(o,c),u=r[d];if(!u)continue;const p=this.daySlotsColors[d],h=this.daySlots[d];if(this.eventMarkStyle==="badge")if(u.style.backgroundImage="none",h){const m=k.#c(this.events,h,this.monthToShow,this.yearToShow).length;m>0?u.setAttribute("data-event-count",String(m)):u.removeAttribute("data-event-count")}else u.removeAttribute("data-event-count");else p?u.style.backgroundImage=`url(${p.toDataURL()})`:u.style.backgroundImage="none",u.removeAttribute("data-event-count");u.innerText=this.daySlots[d]||"",u.onclick=k.#k(this,d);const f=this.daySlots[d];this.selectedDay!==null&&this.selectedMonth!==null&&this.selectedYear!==null&&k.#A(f,this.monthToShow,this.yearToShow,this.selectedDay,this.selectedMonth,this.selectedYear)?u.classList.add("selected"):u.classList.remove("selected")}const s=k.#C(this),n=this.shadowRoot.getElementById("prev");n&&(n.onclick=s.prev);const i=this.shadowRoot.getElementById("today");i&&(i.onclick=s.today);const l=this.shadowRoot.getElementById("next");l&&(l.onclick=s.next),k.#v(this.shadowRoot,this.cssVars)}catch(e){console.error("ARS Calendar render error:",e)}}applyCSSVars(){k.#v(this.shadowRoot,this.cssVars)}constructor(){super(),k.#I(this);const e=k.#T(this);Object.assign(this,e),this.globalEventsEnabled=!0,this._resizeHandler=k.#f(this),this._clearDataHandler=k.#m(this),this._refreshHandler=k.#b(this),this._globalEventsBound=!1}connectedCallback(){super.connectedCallback(),this._bindGlobalEvents(),setTimeout(()=>{this.shadowRoot||this.attachShadow({mode:"open"}),this.render()},0)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("resize",this._resizeHandler),window.removeEventListener("ars-calendar:clearAllData",this._clearDataHandler),window.removeEventListener("ars-calendar:refresh",this._refreshHandler)}allAttributesChangedCallback(){this.shadowRoot||this.attachShadow({mode:"open"}),setTimeout(()=>{this.render()},0)}_getHostWindow(){return this.ownerDocument?.defaultView||null}_bindGlobalEvents(){if(this._globalEventsBound||this.globalEventsEnabled===!1)return;const e=this._getHostWindow();e&&(e.addEventListener("resize",this._resizeHandler),e.addEventListener("ars-calendar:clearAllData",this._clearDataHandler),e.addEventListener("ars-calendar:refresh",this._refreshHandler),this._globalEventsBound=!0)}_unbindGlobalEvents(){if(!this._globalEventsBound)return;const e=this._getHostWindow();e&&(e.removeEventListener("resize",this._resizeHandler),e.removeEventListener("ars-calendar:clearAllData",this._clearDataHandler),e.removeEventListener("ars-calendar:refresh",this._refreshHandler),this._globalEventsBound=!1)}clearAllData(){this.events=[],this.render()}clearSelectedDate(){this.selectedDay=null,this.selectedMonth=null,this.selectedYear=null}setSelectedDateToToday(){const e=new Date;this.monthToShow=e.getMonth(),this.yearToShow=e.getFullYear(),this.selectDate(e.getDate(),this.monthToShow,this.yearToShow)}static get observedAttributes(){return["localized_abbreviated_days","localized_months","localized_today","custom-css","css-vars","global-events-enabled","event-mark-style"]}attributeChangedCallback(e,t,r){if(super.attributeChangedCallback(e,t,r),e==="localized_abbreviated_days"){const s=Or(r,7);s&&(this.localizedAbbreviatedDays=s),this.render()}if(e==="localized_months"){const s=Or(r,12);s&&(this.months=s),this.render()}e==="localized_today"&&(this.localizedToday=r,this.render()),e==="custom-css"&&(this.customCSS=r,this.render()),e==="css-vars"&&(this.cssVars=Xi(r),k.#v(this.shadowRoot,this.cssVars),this.render()),e==="global-events-enabled"&&(this.globalEventsEnabled=r!=="false",this._unbindGlobalEvents(),this._bindGlobalEvents()),e==="event-mark-style"&&(this.eventMarkStyle=r==="badge"?"badge":"pie",this.render())}setCustomTemplate(e){this.customTemplate=e,this.render()}setCSSVars(e){this.cssVars={...e},this.applyCSSVars()}getCSSVars(){return{...this.cssVars}}monthToShowString(e){return this.months[e]}previousYear(){this.yearToShow--,this.clearSelectedDate(),this.render()}nextYear(){this.yearToShow++,this.clearSelectedDate(),this.render()}previousMonth(){this.monthToShow===0?(this.monthToShow=11,this.yearToShow--):this.monthToShow--,this.clearSelectedDate(),this.render()}nextMonth(){this.monthToShow===11?(this.monthToShow=0,this.yearToShow++):this.monthToShow++,this.clearSelectedDate(),this.render()}getColorCanvasFromDate(e,t,r){const s=k.#w(this.events,e,t,r),{width:n,height:i}=k.#_(this,null);return k.#x(s,n,i)}buildDayAndClassSlots(){this.daySlots=k.#p(),this.daySlotsColors=k.#y()}numDaysInMonth(e,t){return k.#h(e,t)}firstDaySlotInMonth(e,t){return k.#u(e,t)}onDayClicked(e){this.daySlots[e]&&this.selectDate(this.daySlots[e],this.monthToShow,this.yearToShow)}}class le extends HTMLElement{_value="";_eventsBound=!1;static get observedAttributes(){return["type","value","placeholder","label","error","disabled","readonly","clearable","min","max","step","pattern","required"]}constructor(){super(),this.attachShadow({mode:"open",delegatesFocus:!0})}connectedCallback(){this.#e(),this.#t()}attributeChangedCallback(e){if(e==="value"&&(this._value=this.getAttribute("value")??""),this.shadowRoot&&this._eventsBound){const t=this.shadowRoot.querySelector("input");t&&e!=="value"&&(this._value=t.value),this.#e()}}get value(){return this.shadowRoot?.querySelector("input")?.value??this._value}set value(e){this._value=e;const t=this.shadowRoot?.querySelector("input");t&&(t.value=e),this.setAttribute("value",e)}get validity(){return this.shadowRoot?.querySelector("input")?.validity}get inputType(){return this.getAttribute("type")||"text"}set inputType(e){this.setAttribute("type",e)}get disabled(){return this.hasAttribute("disabled")}set disabled(e){this.toggleAttribute("disabled",e)}get error(){return this.getAttribute("error")??""}set error(e){e?this.setAttribute("error",e):this.removeAttribute("error")}#e(){if(!this.shadowRoot)return;const e="ars-input-field",t="ars-input-error",r=this.getAttribute("label")??"",s=this.getAttribute("error")??"",n=this.getAttribute("placeholder")??"",i=this.hasAttribute("disabled"),l=this.hasAttribute("readonly"),o=this.hasAttribute("clearable"),c=this.hasAttribute("required"),d=this.inputType,u=s.length>0,p=this.getAttribute("min"),h=this.getAttribute("max"),g=this.getAttribute("step"),f=this.getAttribute("pattern"),m=[`type="${d}"`,`id="${e}"`,`class="input ${u?"input--error":""}"`,n?`placeholder="${le.#s(n)}"`:"",`value="${le.#s(this._value)}"`,i?"disabled":"",l?"readonly":"",c?"required":"",u?`aria-invalid="true" aria-describedby="${t}"`:"",p!==null?`min="${le.#s(p)}"`:"",h!==null?`max="${le.#s(h)}"`:"",g!==null?`step="${le.#s(g)}"`:"",f!==null?`pattern="${le.#s(f)}"`:""].filter(Boolean).join(" ");this.shadowRoot.innerHTML=`
      <style>${le.#n()}</style>
      <div class="wrapper">
        ${r?`<label for="${e}" class="label">${le.#r(r)}</label>`:""}
        <div class="input-row">
          <slot name="prefix"></slot>
          <input ${m}>
          ${o&&this._value?'<button type="button" class="clear-btn" aria-label="Clear" tabindex="-1">&times;</button>':""}
          <slot name="suffix"></slot>
        </div>
        ${u?`<div id="${t}" class="error-msg" role="alert">${le.#r(s)}</div>`:""}
      </div>
    `}#t(){!this.shadowRoot||this._eventsBound||(this._eventsBound=!0,this.shadowRoot.addEventListener("input",e=>{const t=e.target;t.tagName==="INPUT"&&(this._value=t.value,this.dispatchEvent(new CustomEvent("ars-input:input",{bubbles:!0,composed:!0,detail:{value:t.value}})),this.hasAttribute("clearable")&&this.#e())}),this.shadowRoot.addEventListener("change",e=>{const t=e.target;t.tagName==="INPUT"&&(this._value=t.value,this.dispatchEvent(new CustomEvent("ars-input:change",{bubbles:!0,composed:!0,detail:{value:t.value}})))}),this.shadowRoot.addEventListener("keydown",e=>{const t=e,r=t.target;r.tagName==="INPUT"&&t.key==="Enter"&&(this._value=r.value,this.dispatchEvent(new CustomEvent("ars-input:change",{bubbles:!0,composed:!0,detail:{value:r.value}})))}),this.shadowRoot.addEventListener("click",e=>{e.target.classList.contains("clear-btn")&&(this._value="",this.#e(),this.dispatchEvent(new CustomEvent("ars-input:clear",{bubbles:!0,composed:!0,detail:{previousValue:this._value}})),this.shadowRoot?.querySelector("input")?.focus())}))}static#r(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}static#s(e){return e.replaceAll('"',"&quot;").replaceAll("'","&#39;")}static#n(){return`
      :host {
        display: block;
        font-family: var(--arswc-font-family-sans, system-ui, sans-serif);
      }

      .wrapper {
        display: flex;
        flex-direction: column;
        gap: var(--arswc-spacing-xs, 4px);
      }

      .label {
        color: var(--arswc-color-text, #1b2430);
        font-size: var(--arswc-font-size-sm, 0.75rem);
        font-weight: 600;
      }

      .input-row {
        display: flex;
        align-items: center;
        gap: var(--arswc-spacing-xs, 4px);
        border: 1px solid var(--arswc-color-border, #d5dde8);
        border-radius: var(--arswc-radius-sm, 6px);
        background: var(--arswc-color-surface, #f6f8fb);
        padding: 0 var(--arswc-spacing-sm, 8px);
        transition: border-color var(--arswc-transition-duration, 200ms) ease,
                    box-shadow var(--arswc-transition-duration, 200ms) ease;
      }

      .input-row:focus-within {
        border-color: var(--arswc-color-accent, #2563eb);
        box-shadow: var(--arswc-focus-ring, 0 0 0 3px rgba(37, 99, 235, 0.3));
      }

      :host([disabled]) .input-row {
        background: var(--arswc-color-disabled-bg, #f3f4f6);
        opacity: 0.6;
      }

      .input {
        flex: 1;
        min-width: 0;
        border: none;
        background: transparent;
        color: var(--arswc-color-text, #1b2430);
        font-family: inherit;
        font-size: var(--arswc-font-size-md, 0.875rem);
        padding: var(--arswc-spacing-sm, 8px) 0;
        outline: none;
      }

      .input::placeholder {
        color: var(--arswc-color-muted, #64748b);
      }

      .input--error {
        color: var(--arswc-color-danger, #dc2626);
      }

      :host([error]) .input-row {
        border-color: var(--arswc-color-danger, #dc2626);
      }

      .error-msg {
        color: var(--arswc-color-danger, #dc2626);
        font-size: var(--arswc-font-size-sm, 0.75rem);
      }

      .clear-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 20px;
        height: 20px;
        border: none;
        background: transparent;
        color: var(--arswc-color-muted, #64748b);
        font-size: 1rem;
        cursor: pointer;
        border-radius: 50%;
        padding: 0;
        line-height: 1;
      }

      .clear-btn:hover {
        color: var(--arswc-color-text, #1b2430);
        background: var(--arswc-color-border, #d5dde8);
      }
    `}}const Ji=["#DC2626","#EF4444","#F87171","#EA580C","#F97316","#FB923C","#CA8A04","#EAB308","#FACC15","#16A34A","#22C55E","#4ADE80","#0D9488","#14B8A6","#2DD4BF","#0891B2","#06B6D4","#22D3EE","#2563EB","#3B82F6","#60A5FA","#4F46E5","#6366F1","#818CF8","#7C3AED","#8B5CF6","#A78BFA","#DB2777","#EC4899","#F472B6","#1F2937","#6B7280","#D1D5DB","#F9FAFB"];class mt extends HTMLElement{_palette=[...Ji];_scrollOffset=0;_selectedIdx=0;_eventsBound=!1;static get observedAttributes(){return["color","palette","swatch-size","disabled","visible-count"]}constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){const e=this.getAttribute("color");if(e){const t=this._palette.findIndex(r=>r.toLowerCase()===e.toLowerCase());t>=0&&(this._selectedIdx=t)}this.#n(),this.#i(),this.hasAttribute("tabindex")||this.setAttribute("tabindex","0")}attributeChangedCallback(e,t,r){if(e==="palette"&&r)try{this._palette=JSON.parse(r),this._selectedIdx=0,this._scrollOffset=0}catch{}if(e==="color"&&r&&t!==r){const s=t??"",n=this._palette.findIndex(i=>i.toLowerCase()===r.toLowerCase());n>=0&&(this._selectedIdx=n,this.#t()),this.dispatchEvent(new CustomEvent("ars-color-select:change",{bubbles:!0,composed:!0,detail:{id:this.id,color:r,previousColor:s}}))}this.shadowRoot&&this.#n()}get color(){return this.getAttribute("color")??this._palette[this._selectedIdx]??""}set color(e){this.setAttribute("color",e)}get palette(){return[...this._palette]}set palette(e){this._palette=[...e],this._selectedIdx=0,this._scrollOffset=0,this.setAttribute("palette",JSON.stringify(e))}get selectedIndex(){return this._selectedIdx}get swatchSize(){return this.getAttribute("swatch-size")||"md"}set swatchSize(e){this.setAttribute("swatch-size",e)}get visibleCount(){return parseInt(this.getAttribute("visible-count")??"7",10)}set visibleCount(e){this.setAttribute("visible-count",String(e))}get disabled(){return this.hasAttribute("disabled")}set disabled(e){this.toggleAttribute("disabled",e)}setBackgroundColor(e){this.color=e}toggleColorSelection(){}#e(e){if(this.disabled||e<0||e>=this._palette.length)return;const t=this.color;this._selectedIdx=e,this.setAttribute("color",this._palette[e]),this._palette[e].toLowerCase()===t.toLowerCase()&&this.#n()}#t(){const e=this.visibleCount;this._selectedIdx<this._scrollOffset?this._scrollOffset=this._selectedIdx:this._selectedIdx>=this._scrollOffset+e&&(this._scrollOffset=this._selectedIdx-e+1)}#r(){if(!this.shadowRoot)return;const e=this.#s(),t=8,r=this.visibleCount,s=-(this._scrollOffset*(e+t)),n=this._palette.length>r?this._scrollOffset/(this._palette.length-r):0,i=this.shadowRoot.querySelector(".strip");i&&(i.style.transform=`translateX(${s}px)`);const l=this.shadowRoot.querySelector(".track-marker");l&&(l.style.left=`${n*100}%`);const o=this.shadowRoot.querySelector(".nav-btn--prev"),c=this.shadowRoot.querySelector(".nav-btn--next");o&&(o.disabled=this._scrollOffset<=0),c&&(c.disabled=this._scrollOffset>=this._palette.length-r)}#s(){const e=this.swatchSize;return e==="sm"?28:e==="lg"?48:36}#n(){if(!this.shadowRoot)return;const e=this.#s(),t=8,r=this.visibleCount,s=r*(e+t)-t,n=Math.min(Math.ceil(e*.15+1),t-1),i=this._palette.length>r?this._scrollOffset/(this._palette.length-r):0,l=this._palette.map((c,d)=>{const u=d===this._selectedIdx;return`<div
          class="swatch ${u?"swatch--selected":""}"
          role="option"
          aria-selected="${String(u)}"
          aria-label="${mt.#a(c)}"
          data-index="${d}"
          style="background-color: ${c};"
          ${u?'tabindex="0"':'tabindex="-1"'}
        ></div>`}).join(""),o=-(this._scrollOffset*(e+t));this.shadowRoot.innerHTML=`
      <style>${mt.#o(e,t,s,n)}</style>
      <div class="carousel" role="listbox" aria-orientation="horizontal" aria-label="Color palette">
        <button class="nav-btn nav-btn--prev" aria-label="Previous colors"
                ${this._scrollOffset<=0?"disabled":""}>&lsaquo;</button>
        <div class="viewport">
          <div class="strip" style="transform: translateX(${o}px);">
            ${l}
          </div>
        </div>
        <button class="nav-btn nav-btn--next" aria-label="Next colors"
                ${this._scrollOffset>=this._palette.length-r?"disabled":""}>&rsaquo;</button>
      </div>
      <div class="track">
        <div class="track-marker" style="left: ${i*100}%;"></div>
      </div>
    `}#i(){!this.shadowRoot||this._eventsBound||(this._eventsBound=!0,this.shadowRoot.addEventListener("click",e=>{const t=e.target;if(t.classList.contains("swatch")){const r=parseInt(t.dataset.index??"0",10);this.#e(r)}t.classList.contains("nav-btn--prev")&&(this._scrollOffset=Math.max(0,this._scrollOffset-this.visibleCount),this.#r()),t.classList.contains("nav-btn--next")&&(this._scrollOffset=Math.min(this._palette.length-this.visibleCount,this._scrollOffset+this.visibleCount),this.#r())}),this.addEventListener("keydown",e=>{if(this.disabled)return;const t=e;switch(t.key){case"ArrowRight":case"ArrowDown":t.preventDefault(),this.#e(Math.min(this._selectedIdx+1,this._palette.length-1)),this.#t(),this.#r();break;case"ArrowLeft":case"ArrowUp":t.preventDefault(),this.#e(Math.max(this._selectedIdx-1,0)),this.#t(),this.#r();break;case"Home":t.preventDefault(),this.#e(0),this._scrollOffset=0,this.#r();break;case"End":t.preventDefault(),this.#e(this._palette.length-1),this.#t(),this.#r();break}}))}static#a(e){return e.replaceAll('"',"&quot;").replaceAll("'","&#39;")}static#o(e,t,r,s){return`
      :host {
        display: inline-block;
        font-family: var(--arswc-font-family-sans, system-ui, sans-serif);
      }

      :host([disabled]) {
        pointer-events: none;
        opacity: 0.5;
      }

      .carousel {
        display: flex;
        align-items: center;
        gap: var(--arswc-spacing-xs, 4px);
      }

      .viewport {
        width: ${r}px;
        overflow: hidden;
        flex-shrink: 0;
        /* Padding prevents clipping of the scaled/lifted selected swatch.
           Horizontal pad is capped to gap-1 so the next off-screen swatch stays hidden. */
        padding: ${Math.ceil(e*.2+4)}px ${s}px ${Math.ceil(e*.1)}px ${s}px;
      }

      .strip {
        display: flex;
        gap: ${t}px;
        transition: transform var(--ars-color-select-transition-duration, var(--arswc-transition-duration, 200ms)) ease-in-out;
      }

      @media (prefers-reduced-motion: reduce) {
        .strip { transition: none; }
      }

      .swatch {
        box-sizing: border-box;
        width: ${e}px;
        height: ${e}px;
        border-radius: var(--ars-color-select-swatch-radius, 50%);
        border: 2px solid transparent;
        cursor: pointer;
        flex-shrink: 0;
        transition:
          transform var(--arswc-transition-duration, 200ms) ease,
          box-shadow var(--arswc-transition-duration, 200ms) ease,
          border-color var(--arswc-transition-duration, 200ms) ease;
      }

      .swatch:hover {
        transform: scale(1.1) translateY(-2px);
      }

      .swatch--selected {
        transform: scale(var(--ars-color-select-selected-scale, 1.3)) translateY(-3px);
        border-color: #fff;
        box-shadow: var(--ars-color-select-selected-shadow, 0 4px 12px rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.06));
      }

      .swatch--selected:hover {
        transform: scale(var(--ars-color-select-selected-scale, 1.3)) translateY(-3px);
      }

      .swatch:focus-visible {
        outline: none;
        box-shadow: var(--arswc-focus-ring, 0 0 0 3px rgba(37, 99, 235, 0.3));
      }

      .nav-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
        border: 1px solid var(--arswc-color-border, #d5dde8);
        border-radius: 50%;
        background: var(--arswc-color-surface, #f6f8fb);
        color: var(--arswc-color-text, #1b2430);
        font-size: 1.2rem;
        cursor: pointer;
        flex-shrink: 0;
        transition: background var(--arswc-transition-duration, 200ms) ease;
        line-height: 1;
      }

      .nav-btn:hover:not(:disabled) {
        background: var(--arswc-color-border, #d5dde8);
      }

      .nav-btn:disabled {
        opacity: 0.3;
        cursor: default;
      }

      .track {
        position: relative;
        height: var(--ars-color-select-track-height, 3px);
        background: var(--ars-color-select-track-color, var(--arswc-color-border, #d5dde8));
        border-radius: 2px;
        margin-top: var(--arswc-spacing-sm, 8px);
      }

      .track-marker {
        position: absolute;
        top: -2px;
        width: 12px;
        height: 7px;
        border-radius: 4px;
        background: var(--ars-color-select-track-active-color, var(--arswc-color-accent, #2563eb));
        transform: translateX(-50%);
        transition: left var(--arswc-transition-duration, 200ms) ease;
      }
    `}}class Ke extends HTMLElement{static get observedAttributes(){return["value","label","open"]}constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.#t(),this.#r()}attributeChangedCallback(e,t,r){this.shadowRoot&&this.#t()}get value(){return this.getAttribute("value")??this.#e()}set value(e){this.setAttribute("value",e)}get label(){return this.getAttribute("label")??"Select date"}set label(e){this.setAttribute("label",e)}get isOpen(){return this.hasAttribute("open")}set isOpen(e){this.toggleAttribute("open",e)}open(){this.isOpen=!0,requestAnimationFrame(()=>{this.shadowRoot?.querySelector("input[type=date]")?.focus()})}close(){this.isOpen=!1}#e(){return new Date().toISOString().split("T")[0]}#t(){if(!this.shadowRoot)return;const e=this.isOpen?"block":"none";this.shadowRoot.innerHTML=`
      <style>${Ke.#i}</style>
      <div class="picker" style="display:${e}">
        <div class="header">${Ke.#s(this.label)}</div>
        <input
          type="date"
          class="date-input"
          value="${Ke.#n(this.value)}"
        />
        <div class="actions">
          <button type="button" class="btn btn--cancel">Cancel</button>
          <button type="button" class="btn btn--ok">OK</button>
        </div>
      </div>
    `}#r(){this.shadowRoot&&(this.shadowRoot.addEventListener("click",e=>{const t=e.target;if(t.classList.contains("btn--cancel")){this.dispatchEvent(new CustomEvent("ars-date-picker:cancel",{bubbles:!0,composed:!0}));return}if(t.classList.contains("btn--ok")){const s=this.shadowRoot?.querySelector("input[type=date]")?.value??this.value;this.dispatchEvent(new CustomEvent("ars-date-picker:select",{bubbles:!0,composed:!0,detail:{date:s}}));return}}),this.shadowRoot.addEventListener("keydown",e=>{const t=e.key;if(t==="Enter"){const s=this.shadowRoot?.querySelector("input[type=date]")?.value??this.value;this.dispatchEvent(new CustomEvent("ars-date-picker:select",{bubbles:!0,composed:!0,detail:{date:s}}))}else t==="Escape"&&this.dispatchEvent(new CustomEvent("ars-date-picker:cancel",{bubbles:!0,composed:!0}))}))}static#s(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;")}static#n(e){return e.replaceAll('"',"&quot;").replaceAll("'","&#39;")}static#i=`
    :host {
      display: inline-block;
      font-family: var(--arswc-font-family-sans, system-ui, sans-serif);
    }

    .picker {
      background: var(--ars-date-picker-bg, #1e1e2e);
      border: 1px solid var(--ars-date-picker-border-color, #333);
      border-radius: var(--ars-date-picker-radius, 8px);
      padding: 16px;
      box-shadow: var(--ars-date-picker-shadow, 0 8px 24px rgba(0,0,0,0.5));
      display: flex;
      flex-direction: column;
      gap: 12px;
      min-width: 220px;
    }

    .header {
      color: var(--ars-date-picker-header-color, #cdd6f4);
      font-size: 0.95rem;
      font-weight: 600;
    }

    .date-input {
      padding: 8px 10px;
      border-radius: 4px;
      border: 1px solid var(--ars-date-picker-input-border, #444);
      background: var(--ars-date-picker-input-bg, #11111b);
      color: var(--ars-date-picker-input-color, #cdd6f4);
      font-size: 0.9rem;
      outline: none;
      cursor: pointer;
    }

    .date-input:focus {
      border-color: var(--ars-date-picker-input-focus-border, #43a7ff);
      box-shadow: 0 0 0 2px var(--ars-date-picker-input-focus-ring, rgba(67,167,255,0.25));
    }

    /* Webkit calendar-picker-indicator theming for dark backgrounds */
    .date-input::-webkit-calendar-picker-indicator {
      filter: invert(0.8);
      cursor: pointer;
    }

    .actions {
      display: flex;
      gap: 8px;
      justify-content: flex-end;
    }

    .btn {
      padding: 6px 12px;
      border-radius: 4px;
      font-size: 0.85rem;
      cursor: pointer;
      transition: background 0.12s ease, transform 0.08s ease;
    }

    .btn:hover {
      transform: translateY(-1px);
    }

    .btn--cancel {
      border: 1px solid var(--ars-date-picker-cancel-border, #444);
      background: none;
      color: var(--ars-date-picker-cancel-color, #cdd6f4);
    }

    .btn--cancel:hover {
      background: var(--ars-date-picker-cancel-hover-bg, rgba(255,255,255,0.05));
    }

    .btn--ok {
      border: none;
      background: var(--ars-date-picker-ok-bg, #43a7ff);
      color: var(--ars-date-picker-ok-color, #07111d);
      font-weight: 600;
    }

    .btn--ok:hover {
      background: var(--ars-date-picker-ok-hover-bg, #66b8ff);
    }
  `}class Y extends re{static#e=3e3;static#t=500;static#r(e){if(typeof e=="string")return`<span class="param-value">${e}</span>`;if(typeof e=="object"&&e!==null&&"title"in e&&"value"in e){const t=e;return`<span class="param-value"><span class="param-label">${t.title}:</span><span class="param-value-content"> ${t.value}</span></span>`}else if(typeof e=="object"&&e!==null)return`<span class="param-value">${Object.entries(e).map(([t,r])=>`<span class='param-label'>${t}:</span><span class='param-value-content'> ${r}</span>`).join(" | ")}</span>`;return`<span class="param-value">${JSON.stringify(e)}</span>`}static#s(){return`
      <style>
        :host {
          display: block;
          width: 100%;
          height: 2.5em;
          perspective: 600px;
          pointer-events: none;
          background: var(--ars-roller-bg, var(--arswc-color-surface, transparent));
          border-radius: var(--ars-roller-radius, var(--arswc-radius-md, 8px));
        }
        .roller-container {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 2.5em;
          perspective: 600px;
          pointer-events: none;
        }
        .roller-item {
          position: absolute;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          pointer-events: none;
          color: var(--ars-roller-color, var(--arswc-color-text, inherit));
          font-size: var(--ars-roller-font-size, 1em);
        }
        .roller-item.animate-out {
          transform: translateY(-60%) rotateX(90deg);
          opacity: 0;
          transition: all 0.5s cubic-bezier(0.4, 0, 0, 1);
        }
        .roller-item.animate-in {
          transform: translateY(60%) rotateX(-90deg);
          opacity: 0;
          transition: none;
        }
        .roller-item.active {
          transform: translateY(0) rotateX(0);
          opacity: 1;
          transition: all 0.5s cubic-bezier(0, 0, 0.2, 1);
        }
        .param-value {
          font-size: inherit;
          font-weight: 500;
          color: inherit;
          white-space: nowrap;
          text-align: center;
          display: block;
          width: 100%;
          pointer-events: none;
        }
        .param-label {
          font-weight: 500;
          opacity: 0.85;
          pointer-events: none;
          color: var(--ars-roller-label-color, var(--arswc-color-accent, #2196f3));
        }
        .param-value-content {
          margin-left: 12px;
          pointer-events: none;
        }
      </style>
      <div class="roller-container">
        <div class="roller-item current" style="z-index:2; display:block;">
          <!-- Current item will be rendered here -->
        </div>
        <div class="roller-item next" style="z-index:1; display:none;">
          <!-- Next item will be rendered here -->
        </div>
      </div>
    `}static#n(e){try{return!e||e.trim()===""?[]:(y.assertIsValidJSON(e,"[ars-data-roller] data attribute is not valid JSON"),JSON.parse(e))}catch(t){return console.error("[ars-data-roller] Invalid JSON for data attribute:",e,t),[]}}static#i(e){const t=parseInt(e);return isNaN(t)?Y.#e:t}static#a(e){const t=parseInt(e);return isNaN(t)?Y.#t:t}#o(){this.shadowRoot||this.attachShadow({mode:"open"});const e=this.shadowRoot;e&&(e.innerHTML=Y.#s(),this.#c(),this.#l())}#c(){if(!this.shadowRoot)return;const e=this.shadowRoot.querySelector(".roller-item.current"),t=this.shadowRoot.querySelector(".roller-item.next");if(!e||!t)return;const r=this.data[this.currentIndex]||"",s=this.data[(this.currentIndex+1)%this.data.length]||"";e.innerHTML=Y.#r(r),t.innerHTML=Y.#r(s)}#l(){this.#d(),this.data.length>1&&(this.interval=setInterval(()=>this.#h(),this.intervalMs))}#d(){this.interval&&(clearInterval(this.interval),this.interval=null)}#h(){this.animating||this.data.length<2||(this.animating=!0,this.nextIndex=(this.currentIndex+1)%this.data.length,this.#u())}#u(){const e=this.shadowRoot;if(!e){this.animating=!1;return}const t=e.querySelector(".roller-item.current"),r=e.querySelector(".roller-item.next");if(!t||!r){this.animating=!1;return}t.style.transition="none",t.style.transform="translateY(0%) rotateX(0deg)",t.style.opacity="1",r.style.transition="none",r.style.transform="translateY(60%) rotateX(-90deg)",r.style.opacity="0",r.style.zIndex="2",r.style.display="block",setTimeout(()=>{t.style.transition=`transform ${this.animationDuration}ms cubic-bezier(0.4,0.2,0.2,1), opacity ${this.animationDuration}ms`,r.style.transition=`transform ${this.animationDuration}ms cubic-bezier(0.4,0.2,0.2,1), opacity ${this.animationDuration}ms`,t.style.transform="translateY(-60%) rotateX(90deg)",t.style.opacity="0",r.style.transform="translateY(0%) rotateX(0deg)",r.style.opacity="1",setTimeout(()=>{this.currentIndex=this.nextIndex,this.animating=!1,this.#c();const s=e.querySelector(".roller-item.current"),n=e.querySelector(".roller-item.next");s&&n&&(s.style.transition="none",s.style.transform="translateY(0%) rotateX(0deg)",s.style.opacity="1",n.style.transition="none",n.style.transform="translateY(60%) rotateX(-90deg)",n.style.opacity="0",n.style.zIndex="2",n.style.display="block")},this.animationDuration)},10)}constructor(){super(),this.currentIndex=0,this.interval=null,this.data=[],this.intervalMs=Y.#e,this.animationDuration=Y.#t,this.animating=!1,this.nextIndex=null}connectedCallback(){super.connectedCallback(),this.#o()}disconnectedCallback(){super.disconnectedCallback(),this.#d()}static get observedAttributes(){return["data","interval","animation-duration"]}static defaultAttributeValue(e){switch(e){case"data":return"[]";case"interval":return Y.#e.toString();case"animation-duration":return Y.#t.toString();default:return null}}static parseAttributeValue(e,t){switch(e){case"data":return Y.#n(t);case"interval":return Y.#i(t);case"animation-duration":return Y.#a(t);default:return super.parseAttributeValue(e,t)}}attributeChangedCallback(e,t,r){if(super.attributeChangedCallback(e,t,r),t===r)return;const s=this.shadowRoot&&this.shadowRoot.querySelector(".roller-item.current");switch(e){case"data":this.currentIndex=0,this.data=Y.#n(r??"[]"),s&&(this.#c(),this.#l());break;case"interval":this.intervalMs=Y.#i(r??"3000"),s&&this.#l();break;case"animation-duration":this.animationDuration=Y.#a(r??"500");break}}allAttributesChangedCallback(e){this.data=e.data||[],this.intervalMs=e.interval||Y.#e,this.animationDuration=e["animation-duration"]||Y.#t,this.currentIndex=0,this.shadowRoot&&this.shadowRoot.querySelector(".roller-item.current")&&(this.#c(),this.#l())}startRolling(){this.#l()}stopRolling(){this.#d()}restartRolling(){this.#d(),this.#l()}nextItem(){this.#h()}setData(e){const t=this.getAttribute("data"),r=JSON.stringify(e);t!==r&&this.setAttribute("data",r)}setInterval(e){this.setAttribute("interval",e.toString())}setAnimationDuration(e){this.setAttribute("animation-duration",e.toString())}}document.createElement("ars-data-roller").constructor;const Ki=`
  :host {
    display: block;
    font-family: var(--arswc-font-family-sans, "Helvetica Neue", Helvetica, Arial, sans-serif);
    font-size: 14px;
    line-height: 1.5;
  }

  .overlay {
    position: fixed;
    visibility: hidden;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--ars-dialog-overlay-bg, color-mix(in srgb, var(--arswc-color-text, #000) 35%, transparent));
    z-index: var(--ars-dialog-z-index, 1000);
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    backdrop-filter: var(--ars-dialog-backdrop-filter, none);
  }

  .body {
    position: relative;
    max-width: var(--ars-dialog-max-width, 80vw);
    min-width: var(--ars-dialog-min-width, 320px);
    min-height: var(--ars-dialog-min-height, 150px);
    max-height: var(--ars-dialog-max-height, 80vh);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: var(--ars-dialog-bg, var(--arswc-color-bg, #ffffff));
    border-radius: var(--ars-dialog-border-radius, var(--arswc-radius-md, 12px));
    box-shadow: var(--ars-dialog-shadow, var(--arswc-shadow-sm, 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)));
    border: var(--ars-dialog-border, none);
    cursor: default;
    transform: scale(0.95);
    opacity: 0;
    transition: all 0.2s ease-out;
    box-sizing: border-box;
    overflow: hidden;
  }

  .overlay[style*="visible"] .body {
    transform: scale(1);
    opacity: 1;
  }

  .dialog-close {
    position: absolute; top: 12px; right: 16px;
    background: none; border: none; cursor: pointer;
    color: var(--ars-dialog-close-color, var(--arswc-color-muted, #6b7280));
    font-size: 1.2rem; padding: 4px 8px; border-radius: 6px;
    line-height: 1; z-index: 1;
    transition: all 0.15s ease;
  }
  .dialog-close:hover {
    background: var(--ars-dialog-close-hover-bg, var(--arswc-color-surface-hover, #f3f4f6));
    color: var(--ars-dialog-close-hover-color, var(--arswc-color-text, #1f2937));
  }

  .title {
    width: 100%;
    padding: var(--ars-dialog-title-padding, 24px 24px 0 24px);
    font-size: var(--ars-dialog-title-font-size, 1.25rem);
    font-weight: var(--ars-dialog-title-font-weight, 600);
    color: var(--ars-dialog-title-color, var(--arswc-color-text, #1f2937));
    background: var(--ars-dialog-title-bg, transparent);
    border-bottom: var(--ars-dialog-title-border, none);
    border-radius: var(--ars-dialog-border-radius, var(--arswc-radius-md, 12px)) var(--ars-dialog-border-radius, var(--arswc-radius-md, 12px)) 0 0;
  }

  .content {
    flex: 1;
    width: 100%;
    max-width: 100%;
    padding: var(--ars-dialog-content-padding, 24px);
    overflow-y: auto;
    color: var(--ars-dialog-content-color, var(--arswc-color-muted, #4b5563));
    line-height: var(--ars-dialog-content-line-height, 1.6);
    box-sizing: border-box;
  }

  .footer {
    width: 100%;
    box-sizing: border-box;
    padding: var(--ars-dialog-footer-padding, 0 24px 24px 24px);
    display: flex;
    flex-wrap: wrap;
    justify-content: var(--ars-dialog-footer-justify, flex-end);
    align-items: center;
    gap: var(--ars-dialog-footer-gap, 12px);
    background: var(--ars-dialog-footer-bg, transparent);
    border-top: var(--ars-dialog-footer-border, none);
    border-radius: 0 0 var(--ars-dialog-border-radius, var(--arswc-radius-md, 12px)) var(--ars-dialog-border-radius, var(--arswc-radius-md, 12px));
    min-width: 0;
  }

  .footer button {
    min-width: var(--ars-dialog-button-min-width, 80px);
    padding: var(--ars-dialog-button-padding, 8px 16px);
    border-radius: var(--ars-dialog-button-border-radius, var(--arswc-radius-sm, 6px));
    font-size: var(--ars-dialog-button-font-size, 0.875rem);
    font-weight: var(--ars-dialog-button-font-weight, 500);
    cursor: pointer;
    transition: all 0.2s ease;
    border: none;
    outline: none;
  }

  .footer button:focus {
    box-shadow: var(--ars-dialog-button-focus-shadow, 0 0 0 3px color-mix(in srgb, var(--arswc-color-accent, #3b82f6) 50%, transparent));
  }

  /* Primary button (Yes/OK) */
  .footer button:first-child {
    background: var(--ars-dialog-primary-button-bg, var(--arswc-color-accent, #3b82f6));
    color: var(--ars-dialog-primary-button-color, var(--arswc-color-accent-contrast, #ffffff));
    border: var(--ars-dialog-primary-button-border, 1px solid var(--arswc-color-accent, #3b82f6));
  }

  .footer button:first-child:hover {
    background: var(--ars-dialog-primary-button-hover-bg, var(--arswc-color-accent, #2563eb));
    border-color: var(--ars-dialog-primary-button-hover-border, var(--arswc-color-accent, #2563eb));
    transform: translateY(-1px);
  }

  /* Secondary button (No/Cancel) */
  .footer button:last-child {
    background: var(--ars-dialog-secondary-button-bg, transparent);
    color: var(--ars-dialog-secondary-button-color, var(--arswc-color-muted, #6b7280));
    border: var(--ars-dialog-secondary-button-border, 1px solid var(--arswc-color-border, #d1d5db));
  }

  .footer button:last-child:hover {
    background: var(--ars-dialog-secondary-button-hover-bg, var(--arswc-color-surface, #f9fafb));
    border-color: var(--ars-dialog-secondary-button-hover-border, var(--arswc-color-border, #9ca3af));
    color: var(--ars-dialog-secondary-button-hover-color, var(--arswc-color-text, #374151));
  }

  /* Form elements styling */
  input,
  select,
  textarea {
    width: 100%;
    max-width: 100%;
    padding: var(--ars-dialog-input-padding, 8px 12px);
    margin: var(--ars-dialog-input-margin, 4px 0 8px 0);
    border: var(--ars-dialog-input-border, 1px solid var(--arswc-color-border, #d1d5db));
    border-radius: var(--ars-dialog-input-border-radius, var(--arswc-radius-sm, 6px));
    font-size: var(--ars-dialog-input-font-size, 0.875rem);
    font-family: inherit;
    background: var(--ars-dialog-input-bg, var(--arswc-color-bg, #ffffff));
    color: var(--ars-dialog-input-color, var(--arswc-color-text, #374151));
    box-sizing: border-box;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }

  input:focus,
  select:focus,
  textarea:focus {
    border-color: var(--ars-dialog-input-focus-border, var(--arswc-color-accent, #3b82f6));
    outline: none;
    box-shadow: var(--ars-dialog-input-focus-shadow, 0 0 0 3px color-mix(in srgb, var(--arswc-color-accent, #3b82f6) 15%, transparent));
  }

  textarea {
    min-height: var(--ars-dialog-textarea-min-height, 80px);
    max-height: var(--ars-dialog-textarea-max-height, 200px);
    resize: vertical;
    line-height: 1.4;
  }

  label {
    display: block;
    font-weight: var(--ars-dialog-label-font-weight, 500);
    font-size: var(--ars-dialog-label-font-size, 0.875rem);
    color: var(--ars-dialog-label-color, var(--arswc-color-text, #374151));
    margin: var(--ars-dialog-label-margin, 12px 0 4px 0);
  }

  label:first-child {
    margin-top: 0;
  }

  /* Range slider styling */
  input[type="range"] {
    width: 100%;
    height: 6px;
    border-radius: var(--ars-dialog-range-border-radius, var(--arswc-radius-sm, 3px));
    background: var(--ars-dialog-range-bg, var(--arswc-color-border, #e5e7eb));
    outline: none;
    padding: 0;
    margin: 8px 0;
  }

  input[type="range"]::-webkit-slider-thumb {
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--ars-dialog-range-thumb-bg, var(--arswc-color-accent, #3b82f6));
    cursor: pointer;
    border: 2px solid var(--arswc-color-bg, #ffffff);
    box-shadow: var(--ars-dialog-range-thumb-shadow, var(--arswc-shadow-sm, 0 2px 4px rgba(0, 0, 0, 0.1)));
  }

  input[type="range"]::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--ars-dialog-range-thumb-bg, var(--arswc-color-accent, #3b82f6));
    cursor: pointer;
    border: 2px solid var(--arswc-color-bg, #ffffff);
    box-shadow: var(--ars-dialog-range-thumb-shadow, var(--arswc-shadow-sm, 0 2px 4px rgba(0, 0, 0, 0.1)));
  }

  /* Form layout helpers */
  .form-row {
    display: flex;
    align-items: center;
    gap: var(--ars-dialog-form-gap, 12px);
    margin-bottom: var(--ars-dialog-form-row-margin, 8px);
  }

  .form-row label {
    margin: 0;
    min-width: auto;
    flex-shrink: 0;
  }

  .form-row input[type="range"] {
    flex: 1;
    margin: 0;
  }

  .form-row .range-value {
    font-weight: 600;
    color: var(--ars-dialog-range-value-color, var(--arswc-color-accent, #3b82f6));
    min-width: 30px;
    text-align: center;
  }

  /* Select dropdown styling */
  select {
    cursor: pointer;
    -webkit-appearance: none;
    appearance: none;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
    background-position: right 8px center;
    background-repeat: no-repeat;
    background-size: 16px;
    padding-right: 32px;
  }

  /* Checkboxes and other elements */
  ul {
    list-style: none;
    padding: 0;
    margin: 8px 0;
  }

  li {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 4px;
    font-size: 0.875rem;
  }

  /* Responsive design */
  @media (max-width: 640px) {
    .body {
      max-width: 95vw;
      min-width: 280px;
      margin: 20px;
    }

    .title,
    .content,
    .footer {
      padding-left: 16px;
      padding-right: 16px;
    }


    .footer button {
      width: 100%;
      min-width: auto;
    }
  }
`,Pe=(a=re)=>class extends a{constructor(...e){super(...e),this._hoverHandler=null,y.assert(this.constructor.name.endsWith("Mixin"),`Class name '${this.constructor.name}' must end with 'Mixin'`),y.assert(this.tagName&&this.tagName.toLowerCase().endsWith("-mixin"),`Custom element tag name '${this.tagName}' must end with '-mixin'`)}isMixin(e){return e?!!(e.tagName&&e.tagName.toLowerCase().endsWith("-mixin")||e.constructor&&e.constructor.name.endsWith("Mixin")):!1}findActualTargetComponent(){const e=t=>{if(!t||!t.children||t.children.length===0)return t===this?null:t;for(const r of t.children){if(!this.isMixin(r))return r;const s=e(r);if(s)return s}return t===this?null:t};return e(this)}injectIntoTarget(e,t,r=!1){e&&Object.entries(t).forEach(([s,n])=>{(r||typeof e[s]>"u")&&(e[s]=typeof n=="function"?n.bind(this):n)})}setupHoverListeners(e,t){!e||typeof t!="function"||(this.cleanupHoverListeners(),this._hoverHandler=t,e.addEventListener("mouseenter",t))}cleanupHoverListeners(){if(this._hoverHandler){const e=this.findActualTargetComponent();e&&e.removeEventListener("mouseenter",this._hoverHandler),this._hoverHandler=null}}};typeof module<"u"&&(module.exports={MixinBase:Pe});const Fr=700,Qi=100;class ea extends Pe(){static get observedAttributes(){return["pressed-class"]}constructor(){super(),this._pressedClass="pressed",this._isPressed=!1,this._pressTimer=null,this._target=null,this._origColorArr=[200,200,200],this._onDown=e=>{e.type==="mousedown"&&e.button!==0||this._startPress()},this._onUpCancel=()=>this._endPress()}connectedCallback(){super.connectedCallback&&super.connectedCallback();const e=this.getAttribute("pressed-class");e&&(this._pressedClass=e);const t=()=>{this._target=this.firstElementChild||this,this._addListeners()};if(this.firstElementChild)t();else{const r=new MutationObserver(()=>{this.firstElementChild&&(r.disconnect(),t())});r.observe(this,{childList:!0})}}disconnectedCallback(){this._removeListeners(),this._clearTimer(),super.disconnectedCallback&&super.disconnectedCallback()}attributeChangedCallback(e,t,r){super.attributeChangedCallback&&super.attributeChangedCallback(e,t,r),e==="pressed-class"&&r&&(this._pressedClass=r)}_addListeners(){if(!this._target)return;const e=this._target;e.addEventListener("mousedown",this._onDown),e.addEventListener("touchstart",this._onDown,{passive:!0}),e.addEventListener("pointerdown",this._onDown),e.addEventListener("mouseup",this._onUpCancel),e.addEventListener("touchend",this._onUpCancel),e.addEventListener("pointerup",this._onUpCancel),e.addEventListener("mouseleave",this._onUpCancel),e.addEventListener("touchcancel",this._onUpCancel)}_removeListeners(){if(!this._target)return;const e=this._target;e.removeEventListener("mousedown",this._onDown),e.removeEventListener("touchstart",this._onDown),e.removeEventListener("pointerdown",this._onDown),e.removeEventListener("mouseup",this._onUpCancel),e.removeEventListener("touchend",this._onUpCancel),e.removeEventListener("pointerup",this._onUpCancel),e.removeEventListener("mouseleave",this._onUpCancel),e.removeEventListener("touchcancel",this._onUpCancel)}_startPress(){this._isPressed||(this._isPressed=!0,this._target.classList.add(this._pressedClass),this._animate(Fr,Qi),this._clearTimer(),this._pressTimer=setTimeout(()=>this._endPress(),Fr+50))}_endPress(){this._isPressed&&(this._isPressed=!1,this._target.classList.remove(this._pressedClass),this._clearTimer(),this._restoreButtonColor())}_clearTimer(){this._pressTimer&&(clearTimeout(this._pressTimer),this._pressTimer=null)}_getRGBArrayFromBackgroundColor(e){return(getComputedStyle(e).backgroundColor.match(/\d+/g)||["200","200","200"]).slice(0,3).map(s=>parseInt(s,10))}_getOriginalButtonColor(){this._origColorArr=this._getRGBArrayFromBackgroundColor(this._target)}_restoreButtonColor(){const[e,t,r]=this._origColorArr;this._target.style.backgroundImage=`radial-gradient(rgb(${e},${t},${r}), rgb(${e},${t},${r}))`}_setButtonColorStep(e,t,r,s){this._target.style.backgroundImage=`
      radial-gradient(circle,
        rgba(255, 255, 255, 0.2) ${e}%,
        rgb(${t},${r},${s}) ${100-e}%
      )
    `}_animate(e,t){this._getOriginalButtonColor();const r=e/t;for(let s=0;s<t;s++)setTimeout(()=>{this._setButtonColorStep(100*s/t,...this._origColorArr)},r*s);setTimeout(()=>this._restoreButtonColor(),e)}}class B extends re{constructor(){super(),B.#T(this)}connectedCallback(){}#e(){return B.#_(this)}static get observedAttributes(){return["open","localizedOk","localizedCancel","localized-close","show-close-button","custom-css","css-vars"]}attributeChangedCallback(e,t,r){super.attributeChangedCallback(e,t,r),e==="open"&&r==="true"&&this.#r(),e==="custom-css"&&(this.customCSS=r,this.shadowRoot&&this.#t()),e==="css-vars"&&(this.cssVars=B.#h(r),B.#u(this.shadowRoot,this.cssVars))}#t(){const e=this.shadowRoot;e&&(e.innerHTML=this.#e(),B.#u(e,this.cssVars))}setCSSVars(e){this.cssVars={...e},B.#u(this.shadowRoot,this.cssVars)}getCSSVars(){return{...this.cssVars}}#r(){this.shadowRoot||this.attachShadow({mode:"open"}),this.#t(),B.#A(this),B.#C(this),this.dispatchEvent(new CustomEvent("dialog-activated",{bubbles:!0,detail:{dialogId:this.id}}))}#s(){B.#k(this)}#n(){return B.#S(this)}static notify(e="",t="!",r={},s="",n={}){return B.#v(e,t,s,r,n)}static dialog(e="",t="",r={},s="",n="Ok",i="Cancel",l={}){return B.#I(e,t,r,s,n,i,l)}static#i(e){return e.title||e.getAttribute("title")||""}static#a(e){return e.content||e.getAttribute("content")}static#o(e){return e.getAttribute("showConfirmButtons")==="true"}static#c(e){return e.localizedOk||"Ok"}static#l(e){return e.localizedCancel||"Cancel"}static#d(e){if(!e||Object.keys(e).length===0)return"";let t=`:host {
`;for(const[r,s]of Object.entries(e))t+=`  --${r}: ${s};
`;return t+=`}
`,t}static#h(e){if(!e)return{};try{const t=JSON.parse(e);return t&&typeof t=="object"&&!Array.isArray(t)?t:{}}catch{return{}}}static#u(e,t){if(!t||!e)return;let r=e.querySelector("style.css-vars-style");r||(r=document.createElement("style"),r.className="css-vars-style",e.prepend(r)),r.textContent=B.#d(t)}static#g(e){return`
      <pressed-effect-mixin>
        <button id="dialog_button_ok:${e.id}">
          ${B.#c(e)}
        </button>
      </pressed-effect-mixin>
      <pressed-effect-mixin>
        <button
          id="dialog_button_cancel:${e.id}"
          style="margin-left: 5px">
          ${B.#l(e)}
        </button>
      </pressed-effect-mixin>
    `}static#p(e){return`
      <pressed-effect-mixin>
        <button id="dialog_button_ok:${e.id}"> Ok </button>
      </pressed-effect-mixin>
    `}static#y(e){return B.#o(e)?B.#g(e):B.#p(e)}static#w(e){const t=e.getAttribute("show-close-button");return t===null||t!=="false"}static#x(e){return e.getAttribute("localized-close")||"✕"}static#_(e){const t=B.#w(e);return`
      <style>
        ${e.defaultCSS}
        ${e.customCSS||""}
      </style>
      <div id="overlay" class="overlay" style="visibility: hidden;">
        <div id="body" class="body">
          ${t?`<button id="dialog_close:${e.id}" class="dialog-close" title="Close">${B.#x(e)}</button>`:""}
          <div id="title" class="title">
            ${B.#i(e)}
          </div>
          <div id="content" class="content">
            ${B.#a(e)}
          </div>
          <div id="footer" class="footer">
          ${B.#y(e)}
          </div>
        </div>
      </div>
    `}static#E(e,t){return()=>{if(t==="ok"){const r=e.shadowRoot.getElementById("content");e.onbuttonclick&&e.onbuttonclick(r)}else t==="ok"?e.onbuttonclick&&e.onbuttonclick(!0):t==="cancel"&&e.onbuttonclick&&e.onbuttonclick(!1);e.#s()}}static#C(e){const t=e.shadowRoot,r=t.getElementById(`dialog_button_ok:${e.id}`);r&&(r.onclick=B.#E(e,"ok"));const s=t.getElementById(`dialog_button_cancel:${e.id}`);s&&(s.onclick=B.#E(e,"cancel"));const n=t.getElementById(`dialog_close:${e.id}`);n&&(n.onclick=()=>{e.onbuttonclick&&e.onbuttonclick(null),e.dispatchEvent(new CustomEvent("dialog:close",{bubbles:!0,composed:!0})),e.#s()})}static#A(e){e.shadowRoot.getElementById("overlay").style.visibility="visible"}static#k(e){const t=e.shadowRoot.getElementById("overlay");t&&(t.style.visibility="hidden")}static#S(e){return e.shadowRoot.getElementById("overlay").style.visibility==="visible"}static#f(e,t,r,s,n,i,l,o,c){const u=(c.targetDocument||document).createElement("ars-dialog");return u.id=e,l&&u.setAttribute("custom-css",l),Object.keys(o).length>0&&u.setAttribute("css-vars",JSON.stringify(o)),u.setAttribute("content",t),u.setAttribute("showConfirmButtons",String(s)),u.setAttribute("title",r),s&&(u.setAttribute("localizedOk",n??""),u.setAttribute("localizedCancel",i??"")),u}static#m(e){const t=e.targetDocument||document;return e.mountTarget||t.body}static#b(e,t){e.onbuttonclick=function(r){e.parentNode.removeChild(e),t(r)},e.setAttribute("open","true")}static#v(e,t,r,s,n){return new Promise(function(i){const l=B.#f("notification_dialog",e,t,!1,null,null,r,s,n);B.#m(n).appendChild(l),B.#b(l,i)})}static#I(e,t,r,s,n,i,l){return new Promise(function(o){const c=B.#f("notification_dialog",e,t,!0,n,i,s,r,l);B.#m(l).appendChild(c),B.#b(c,o)})}static#T(e){return e.cssVars={},e.customCSS=null,e.defaultCSS=Ki,e}}class qt extends HTMLElement{static get observedAttributes(){return["direction","gap"]}constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.#e()}attributeChangedCallback(){this.shadowRoot&&this.#e()}get direction(){return this.getAttribute("direction")||"column"}set direction(e){this.setAttribute("direction",e)}get gap(){return this.getAttribute("gap")||""}set gap(e){e?this.setAttribute("gap",e):this.removeAttribute("gap")}#e(){if(!this.shadowRoot)return;const e=this.direction,t=this.gap,r=e==="row"?"row":e==="none"?"initial":"column";this.shadowRoot.innerHTML=`
      <style>${qt.#t()}</style>
      <div class="group" part="group" style="flex-direction: ${r}; gap: ${t||"0"};">
        <slot></slot>
      </div>
    `}static#t(){return`
      :host { display: block; }
      .group {
        display: flex;
        align-items: stretch;
        width: 100%;
        height: 100%;
      }
    `}}class Vt extends HTMLElement{static get observedAttributes(){return["selectable"]}#e=-1;constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.#t(),this.#r()}attributeChangedCallback(){this.shadowRoot&&this.#t()}get selectable(){return this.hasAttribute("selectable")}set selectable(e){this.toggleAttribute("selectable",e)}get selectedIndex(){return this.#e}#t(){if(!this.shadowRoot)return;const e=this.selectable;this.shadowRoot.innerHTML=`
      <style>${Vt.#s()}</style>
      <div class="list${e?" list--selectable":""}" part="list" role="list">
        <slot></slot>
      </div>
    `}#r(){this.addEventListener("click",e=>{if(!this.selectable)return;const t=this.shadowRoot?.querySelector("slot");if(!t)return;const r=t.assignedElements(),s=e.target,n=s.closest("[slot]")??s,i=r.indexOf(n);i>=0&&(this.#e=i,this.dispatchEvent(new CustomEvent("ars-list:select",{bubbles:!0,composed:!0,detail:{index:i,item:n}})))})}static#s(){return`
      :host { display: block; }
      .list {
        display: flex;
        flex-direction: column;
        gap: var(--arsds-spacing-xs, 0.25rem);
        padding: var(--arsds-spacing-xs, 0.25rem) 0;
      }
      .list--selectable ::slotted(*) {
        cursor: pointer;
        user-select: none;
      }
      .list--selectable ::slotted(*:hover) {
        background: var(--arsds-color-surface-hover, rgba(0,0,0,0.04));
      }
    `}}class bt extends HTMLElement{static get observedAttributes(){return["source","mode"]}#e="";#t="view";constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.#r()}attributeChangedCallback(e,t,r){e==="source"&&r!==null&&(this.source=r),e==="mode"&&(this.mode=r==="edit"?"edit":"view")}get source(){return this.#e}set source(e){this.#e=e,this.shadowRoot&&this.#r()}get mode(){return this.#t}set mode(e){this.#t!==e&&(this.#t=e,this.shadowRoot&&this.#r())}#r(){if(this.shadowRoot)if(this.#t==="edit"){this.shadowRoot.innerHTML=`
        <style>${bt.#i()}</style>
        <textarea class="md-editor">${this.#s(this.#e)}</textarea>
      `;const e=this.shadowRoot.querySelector("textarea");e&&e.addEventListener("input",()=>{this.#e=e.value,this.dispatchEvent(new CustomEvent("ars-markdown:change",{detail:{source:this.#e},bubbles:!0,composed:!0}))})}else{this.shadowRoot.innerHTML=`
        <style>${bt.#a()}</style>
        <div class="markdown-body" part="markdown"></div>
      `;const e=this.shadowRoot.querySelector(".markdown-body");e&&(e.innerHTML=this.#n(this.#e))}}#s(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}#n(e){let t=e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");t=t.replace(/^(---+|===+|\*\*\*+)$/gm,"<hr>"),t=t.replace(/^###### (.*$)/gim,"<h6>$1</h6>"),t=t.replace(/^##### (.*$)/gim,"<h5>$1</h5>"),t=t.replace(/^#### (.*$)/gim,"<h4>$1</h4>"),t=t.replace(/^### (.*$)/gim,"<h3>$1</h3>"),t=t.replace(/^## (.*$)/gim,"<h2>$1</h2>"),t=t.replace(/^# (.*$)/gim,"<h1>$1</h1>"),t=t.replace(/\*\*\*(.*?)\*\*\*/g,"<strong><em>$1</em></strong>"),t=t.replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>"),t=t.replace(/\*(.*?)\*/g,"<em>$1</em>"),t=t.replace(/__(.*?)__/g,"<strong>$1</strong>"),t=t.replace(/_(.*?)_/g,"<em>$1</em>"),t=t.replace(/`([^`]+)`/g,"<code>$1</code>"),t=t.replace(/```[\s\S]*?```/g,c=>`<pre><code>${c.slice(3,-3).trim()}</code></pre>`),t=t.replace(/\[([^\]]+)\]\(([^)]+)\)/g,'<a href="$2" target="_blank" rel="noopener">$1</a>'),t=t.replace(/^(\s*)[-*+] (.+$)/gim,(c,d,u)=>(d.length,`${d}<li>${u}</li>`)),t=t.replace(/^(\s*)\d+\. (.+$)/gim,(c,d,u)=>`${d}<li>${u}</li>`);const r=t.split(`
`),s=[];let n=!1,i="";for(let c=0;c<r.length;c++){const d=r[c],u=d.match(/^(\s*)<li>(.+)<\/li>\s*$/);if(u){const p=u[1],g=(r[c-1]??"").match(/^(\s*)<li>(.+)<\/li>\s*$/),f=g?g[1].length:-1;if(!n||f!==p.length){n&&s.push(`</${i}>`);const m=e.split(`
`)[c]??"";i=/^\s*\d+\./.test(m)?"ol":"ul",s.push(`${p}<${i}>`),n=!0}s.push(d)}else n&&(s.push(`</${i}>`),n=!1),s.push(d)}n&&s.push(`</${i}>`),t=s.join(`
`);const l=["h1","h2","h3","h4","h5","h6","hr","ul","ol","li","pre","blockquote"],o=new RegExp(`^\\s*<(\\/?)(${l.join("|")})`,"i");return t=t.replace(/(.+\n?)+/g,c=>{const d=c.trim();return!d||o.test(d)?c:`<p>${d}</p>`}),t}static#i(){return`
      :host { display: block; }
      .md-editor {
        width: 100%;
        min-height: 6em;
        font-family: var(--arsds-font-family-mono, monospace);
        font-size: var(--arsds-font-size-md, 1rem);
        line-height: 1.6;
        padding: 0.5em;
        border: 1px solid var(--arsds-color-border, #ccc);
        border-radius: var(--arsds-radius-md, 6px);
        background: var(--arsds-color-surface, #fff);
        color: var(--arsds-color-text-primary, inherit);
        resize: vertical;
        box-sizing: border-box;
      }
      .md-editor:focus {
        outline: 2px solid var(--arsds-color-accent, #0066cc);
        outline-offset: -1px;
      }
    `}static#a(){return`
      :host { display: block; }
      .markdown-body {
        font-family: var(--arsds-font-family, system-ui, sans-serif);
        font-size: var(--arsds-font-size-md, 1rem);
        line-height: 1.6;
        color: var(--arsds-color-text-primary, inherit);
        /* Reset any inherited white-space (e.g. a consumer setting pre-wrap on
           the host) — the parser emits block HTML, so preserved whitespace from
           the template's indentation would otherwise render as blank lines. */
        white-space: normal;
      }
      .markdown-body h1, .markdown-body h2, .markdown-body h3,
      .markdown-body h4, .markdown-body h5, .markdown-body h6 {
        margin: 0.75em 0 0.5em;
        font-weight: 600;
      }
      .markdown-body h1 { font-size: 1.75em; }
      .markdown-body h2 { font-size: 1.5em; }
      .markdown-body h3 { font-size: 1.25em; }
      .markdown-body p { margin: 0.5em 0; }
      .markdown-body ul, .markdown-body ol { margin: 0.5em 0; padding-left: 1.5em; }
      .markdown-body li { margin: 0.25em 0; }
      .markdown-body code {
        background: var(--arsds-color-surface-elevated, rgba(0,0,0,0.05));
        padding: 0.15em 0.35em;
        border-radius: var(--arsds-radius-sm, 3px);
        font-family: var(--arsds-font-family-mono, monospace);
        font-size: 0.9em;
      }
      .markdown-body pre {
        background: var(--arsds-color-surface-elevated, rgba(0,0,0,0.05));
        padding: 0.75em;
        border-radius: var(--arsds-radius-md, 6px);
        overflow-x: auto;
      }
      .markdown-body pre code { background: none; padding: 0; }
      .markdown-body a { color: var(--arsds-color-accent, #0066cc); }
      .markdown-body hr { border: none; border-top: 1px solid var(--arsds-color-border, #ddd); margin: 1em 0; }
    `}}class ta extends re{constructor(){super(),this._targetPage=null,this._currentPage=null,this._availablePages=[],this._navClickHandler=this._onNavClick.bind(this),this._routerChangeHandler=this._handleRouterChange.bind(this),this._targetRouter=null}static get observedAttributes(){return["target-page"]}attributeChangedCallback(e,t,r){e==="target-page"&&r&&(this._targetPage=r,this._bindTargetRouterEvents(),this._refreshPageInfo())}connectedCallback(){this._targetPage=this.getAttribute("target-page")||this._targetPage,setTimeout(()=>{this._setupNavListeners(),this._bindTargetRouterEvents(),this._refreshPageInfo()},200)}disconnectedCallback(){this._removeNavListeners(),this._unbindTargetRouterEvents()}_handleRouterChange(){this._updateActiveState()}_resolveTargetElement(){if(!this._targetPage)return null;const e=this.getRootNode();if(e&&"getElementById"in e&&typeof e.getElementById=="function"){const t=e.getElementById(this._targetPage);if(t)return t}return this.ownerDocument.getElementById(this._targetPage)}_resolveRouter(){const e=this._resolveTargetElement();return e?e.tagName==="ARS-PAGE"?e:e.querySelector("ars-page"):null}_bindTargetRouterEvents(){this._unbindTargetRouterEvents();const e=this._resolveRouter();e&&(this._targetRouter=e,this._targetRouter.addEventListener("ars-page:page-changed",this._routerChangeHandler))}_unbindTargetRouterEvents(){this._targetRouter&&(this._targetRouter.removeEventListener("ars-page:page-changed",this._routerChangeHandler),this._targetRouter=null)}_setupNavListeners(){this._removeNavListeners(),this._navLinks=Array.from(this.querySelectorAll("[data-page], [data-route]")),this._navLinks.forEach(e=>{e.addEventListener("click",this._navClickHandler)}),this._setInitialActiveState()}_removeNavListeners(){this._navLinks&&this._navLinks.forEach(e=>{e.removeEventListener("click",this._navClickHandler)}),this._navLinks=[]}_onNavClick(e){e.preventDefault();const t=e.currentTarget,r=t.getAttribute("data-page"),s=t.getAttribute("data-route");if(r){this.navigateToPage(r),this._navLinks.forEach(i=>i.classList.remove("active")),t.classList.add("active");const n=new CustomEvent("nav-click",{detail:{pageId:r},bubbles:!0,composed:!0});this.dispatchEvent(n)}else s&&this.navigateToRoute(s)&&(this._navLinks.forEach(i=>i.classList.remove("active")),t.classList.add("active"))}_refreshPageInfo(){this._targetPage&&this._updateActiveState()}_updateActiveState(){this._navLinks?.forEach(e=>{const t=e.getAttribute("data-page"),r=e.getAttribute("data-route"),s=this._resolveRouter();if(s){const n=s._currentPage,i=s._currentRoute;t&&n===t||r&&i===r?e.classList.add("active"):e.classList.remove("active")}})}_setInitialActiveState(){const e=this.getCurrentPage(),t=this.getCurrentRoute();this._navLinks.forEach(r=>{const s=r.getAttribute("data-page"),n=r.getAttribute("data-route");s&&s===e||n&&n===t?r.classList.add("active"):r.classList.remove("active")})}navigateToPage(e){if(!this._targetPage)return!1;const t=this._resolveRouter();if(!t)return!1;const r=t.showPage(e);return r&&r.success?(this._navLinks.forEach(s=>{const n=s.getAttribute("data-page"),i=s.getAttribute("data-route");n===e||i&&r.route===i?s.classList.add("active"):s.classList.remove("active")}),!0):!1}navigateToRoute(e){if(!this._targetPage)return!1;const t=this._resolveRouter();if(!t)return!1;const r=t.navigateToRoute(e);return r&&r.success?(this._navLinks.forEach(s=>{const n=s.getAttribute("data-page"),i=s.getAttribute("data-route");n&&n===r.pageId||i===e?s.classList.add("active"):s.classList.remove("active")}),!0):!1}getCurrentPage(){if(this._targetPage){const e=this._resolveRouter();if(e)return e.getCurrentPage().currentPage}return null}getCurrentRoute(){if(this._targetPage){const e=this._resolveRouter();if(e)return e.getCurrentRoute().currentRoute}return null}reinitialize(){this._setupNavListeners(),this._setInitialActiveState()}_callRemote(e,t,...r){const s={targetId:e,method:t,args:r,timestamp:Date.now()},n=new CustomEvent("remote-call",{detail:s,bubbles:!0,composed:!0});this.ownerDocument.dispatchEvent(n)}}class ra extends re{constructor(){super(),this._targetPage=this.getAttribute("target-page")||""}connectedCallback(){const e=this.ownerDocument.createElement("ars-page-controller-internal");for(e.setAttribute("target-page",this.getAttribute("target-page")||"");this.firstChild;)e.appendChild(this.firstChild);this.innerHTML="",this.appendChild(e),this._forwardAttributes(),setTimeout(()=>{const t=this.querySelector("ars-page-controller-internal");t&&t.reinitialize()},500)}_forwardAttributes(){const e=this.querySelector("ars-page-controller-internal");e&&Array.from(this.attributes).forEach(t=>{t.name!=="target-page"&&e.setAttribute(t.name,t.value)})}getCurrentPage(){const e=this.querySelector("ars-page-controller-internal");return e?e.getCurrentPage():null}navigateToPage(e){const t=this.querySelector("ars-page-controller-internal");return t?t.navigateToPage(e):!1}setNavigationType(e){const t=this.querySelector("ars-page-controller-internal");t&&t.setNavigationType(e)}}class sa extends re{constructor(){super(),this._currentPage=null,this._pages=new Map,this._defaultPage=null,this._routes={},this._routeToPageMap=new Map,this._pageToRouteMap=new Map,this._currentRoute=null,this._routingMode="browser",this._popstateHandler=this._handlePopState.bind(this)}static get observedAttributes(){return["default-page","routes","base-path","routing-mode"]}static defaultAttributeValue(e){return e==="routes"?"{}":e==="routing-mode"?"browser":null}static parseAttributeValue(e,t){if(e==="routes")try{return JSON.parse(t)}catch(r){return console.error("Failed to parse routes attribute:",r),{}}return re.parseAttributeValue(e,t)}allAttributesChangedCallback(e){e.routes&&(this._routes=e.routes,this._buildRouteMaps()),e["default-page"]&&(this._defaultPage=e["default-page"]),this._basePath=e["base-path"]||"",this._routingMode=e["routing-mode"]||"browser"}connectedCallback(){super.connectedCallback(),this._usesBrowserRouting()&&this._getBrowserWindow()?.addEventListener("popstate",this._popstateHandler),this._initializePages(),this._buildRouteMaps();const e=this._usesBrowserRouting()?this._getBrowserWindow()?.location.pathname||null:this._currentRoute,t=e?this._getPageIdFromRoute(e):null;if(t&&this._pages.has(t))this.showPage(t);else if(this._defaultPage)this.showPage(this._defaultPage);else if(this._pages.size>0){const r=this._pages.keys().next().value;this.showPage(r)}}disconnectedCallback(){super.disconnectedCallback(),this._usesBrowserRouting()&&this._getBrowserWindow()?.removeEventListener("popstate",this._popstateHandler),this._pages.clear()}_getBrowserWindow(){return this.ownerDocument?.defaultView||null}_usesBrowserRouting(){return this._routingMode!=="internal"}_initializePages(){this._pages.clear(),Array.from(this.children).filter(t=>t.id).forEach(t=>{this._pages.set(t.id,t),t.style.display="none"})}_buildRouteMaps(){this._routeToPageMap.clear(),this._pageToRouteMap.clear();const e=(t,r=null)=>{Object.entries(t).forEach(([s,n])=>{if(typeof n=="string")this._routeToPageMap.set(n,s),this._pageToRouteMap.set(s,n);else if(typeof n=="object"&&n!==null){const i=r||s;this._routeToPageMap.has(`/${i}`)||(this._routeToPageMap.set(`/${i}`,i),this._pageToRouteMap.set(i,`/${i}`)),Object.entries(n).forEach(([l,o])=>{typeof o=="string"?this._routeToPageMap.set(o,i):typeof o=="object"&&o!==null&&e({[l]:o},i)})}})};e(this._routes)}_getPageIdFromRoute(e){const t=e.startsWith(this._basePath)?e.slice(this._basePath.length):e;if(this._routeToPageMap.has(t))return this._routeToPageMap.get(t);for(const[r,s]of this._routeToPageMap)if(t.startsWith(r))return s;return null}_getRouteFromPageId(e){const t=this._pageToRouteMap.get(e);return t?this._basePath+t:null}_isNestedRouteForPage(e,t){const r=this._getRouteFromPageId(t);if(!r)return!1;const s=r.replace(this._basePath,"");return e.startsWith(s)&&e!==s}_updateBrowserUrl(e){if(!e)return;if(!this._usesBrowserRouting()){this._currentRoute=e;return}const t=this._getBrowserWindow(),r=this._basePath+e;t&&r&&r!==t.location.pathname&&(t.history.pushState({pageId:this._currentPage},"",r),this._currentRoute=r)}_handlePopState(e){if(!this._usesBrowserRouting())return;const t=this._getBrowserWindow()?.location.pathname||"",r=this._getPageIdFromRoute(t);r&&this._pages.has(r)&&(this._currentRoute=t,this._showPage(r,!1))}_showPage(e,t=!0){if(!this._pages.has(e))return console.error(`ARS Page: Page with ID '${e}' not found`),!1;const r=this._currentPage;r&&this._pages.has(r)&&(this._pages.get(r).style.display="none");const s=this._pages.get(e);if(s.style.display="",this._currentPage=e,t){const n=this._usesBrowserRouting()?this._getBrowserWindow()?.location.pathname||"":this._currentRoute||"",i=this._getRouteFromPageId(e);this._isNestedRouteForPage(n,e)?this._updateBrowserUrl(n):this._updateBrowserUrl(i)}return this.dispatchEvent(new CustomEvent("ars-page:page-changed",{detail:{previousPage:r,currentPage:e,pageElement:s,route:this._currentRoute},bubbles:!0,composed:!0})),!0}_hidePage(e){if(!this._pages.has(e))return console.error(`ARS Page: Page with ID '${e}' not found`),!1;const t=this._pages.get(e);return t.style.display="none",this._currentPage===e&&(this._currentPage=null),!0}showPage(e){return{success:this._showPage(e),pageId:e,currentPage:this._currentPage,route:this._currentRoute}}hidePage(e){return{success:this._hidePage(e),pageId:e,currentPage:this._currentPage}}showAllPages(){return this._pages.forEach(e=>{e.style.display=""}),{success:!0,pagesShown:this._pages.size}}hideAllPages(){return this._pages.forEach(e=>{e.style.display="none"}),this._currentPage=null,{success:!0,pagesHidden:this._pages.size}}getCurrentPage(){return{currentPage:this._currentPage,availablePages:Array.from(this._pages.keys()),currentRoute:this._currentRoute}}getPageInfo(){return{currentPage:this._currentPage,availablePages:Array.from(this._pages.keys()),totalPages:this._pages.size,defaultPage:this._defaultPage,currentRoute:this._currentRoute,routes:this._routes}}navigateToRoute(e){const t=this._getPageIdFromRoute(e);return t?(this._currentRoute=e,this._showPage(t,!1)?(this._updateBrowserUrl(e),{success:!0,pageId:t,currentPage:this._currentPage,route:this._currentRoute}):{success:!1,pageId:t,currentPage:this._currentPage,route:this._currentRoute}):(console.error(`ARS Page: No page found for route '${e}'`),{success:!1,route:e,error:"Route not found"})}getCurrentRoute(){return{currentRoute:this._currentRoute,currentPage:this._currentPage,availableRoutes:Array.from(this._routeToPageMap.keys())}}}class Yt extends HTMLElement{static get observedAttributes(){return["padding","elevated"]}constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.#e()}attributeChangedCallback(){this.shadowRoot&&this.#e()}get padding(){return this.getAttribute("padding")||"md"}set padding(e){this.setAttribute("padding",e)}get elevated(){return this.hasAttribute("elevated")}set elevated(e){this.toggleAttribute("elevated",e)}#e(){if(!this.shadowRoot)return;const e=this.padding,t=this.elevated;this.shadowRoot.innerHTML=`
      <style>${Yt.#t()}</style>
      <div class="panel panel--padding-${e}${t?" panel--elevated":""}" part="panel">
        <slot></slot>
      </div>
    `}static#t(){return`
      :host { display: block; }
      .panel {
        box-sizing: border-box;
        background: var(--arsds-color-surface, #fff);
        border: 1px solid var(--arsds-color-border, #e0e0e0);
        border-radius: var(--arsds-radius-md, 8px);
        overflow: hidden;
      }
      .panel--padding-none { padding: 0; }
      .panel--padding-sm   { padding: var(--arsds-spacing-sm, 0.5rem); }
      .panel--padding-md   { padding: var(--arsds-spacing-md, 1rem); }
      .panel--padding-lg   { padding: var(--arsds-spacing-lg, 1.5rem); }
      .panel--padding-xl   { padding: var(--arsds-spacing-xl, 2rem); }
      .panel--elevated {
        box-shadow: var(--arsds-shadow-md, 0 4px 12px rgba(0,0,0,0.1));
      }
    `}}class K extends HTMLElement{_data={};_activationEventsBound=!1;_editAbortController=null;_scaleObserver=null;static get observedAttributes(){return["title","subtitle","selected","dragging","collapsed","editing","not-collapsible","accent-color","tile-id"]}constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.#o(),this.#g()}attributeChangedCallback(e,t,r){if(e==="selected"||e==="dragging"){this.#i();return}this.#o()}get data(){return{...this._data}}set data(e){const t={...e};JSON.stringify(this._data)!==JSON.stringify(t)&&(this._data=t,this.#o())}get selected(){return this.hasAttribute("selected")}set selected(e){this.setSelected(!!e)}setSelected(e){this.toggleAttribute("selected",e)}setDragging(e){this.toggleAttribute("dragging",e)}get collapsed(){return this.hasAttribute("collapsed")}set collapsed(e){this.setCollapsed(!!e)}setCollapsed(e){this.toggleAttribute("collapsed",e)}get editing(){return this.hasAttribute("editing")}set editing(e){this.toggleAttribute("editing",!!e)}setEditing(e){this.toggleAttribute("editing",e)}get collapsible(){return!this.hasAttribute("not-collapsible")}set collapsible(e){this.setCollapsible(!!e)}setCollapsible(e){this.toggleAttribute("not-collapsible",!e)}get opacity(){const e=this.style.getPropertyValue("opacity");if(e==="")return 1;const t=Number.parseFloat(e);return Number.isFinite(t)?t:1}set opacity(e){const t=Math.max(0,Math.min(1,Number(e)));!Number.isFinite(t)||t===1?this.style.removeProperty("opacity"):this.style.setProperty("opacity",String(t))}measureIntrinsicHeight(){if(!this.shadowRoot)return 0;const e=this.shadowRoot.querySelector(".card"),t=this.shadowRoot.querySelector(".header"),r=this.shadowRoot.querySelector(".content");if(!e||!t||!r)return 0;const s=getComputedStyle(e),n=Number.parseFloat(s.borderTopWidth||"0")||0,i=Number.parseFloat(s.borderBottomWidth||"0")||0;return Math.ceil(t.scrollHeight+r.scrollHeight+n+i)}static#e(e){return String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}static#t(e,t=[]){const s=Array.isArray(e)?e.map(i=>({key:String(i.key??""),value:String(i.value??"")})):e?Object.entries(e).map(([i,l])=>({key:i,value:String(l??"")})):[],n=i=>{const l=t.indexOf(i);return l===-1?Number.MAX_SAFE_INTEGER:l};return s.sort((i,l)=>{const o=n(i.key),c=n(l.key);return o===c?i.key.localeCompare(l.key):o-c}),s}#r(e){switch(e){case"email":return"email";case"date":return"date";case"time":return"time";case"datetime-local":return"datetime-local";case"number":return"number";case"url":return"url";case"tel":return"tel";default:return"text"}}#s(e){const t=e.match(/^(\d{4}-\d{2}-\d{2})[T ](\d{2}:\d{2})/);return t?`${t[1]}T${t[2]}`:e}#n(){const e=this._data.title??this.getAttribute("title")??this._data.id??this.getAttribute("tile-id")??"",t=this._data.accentColor??this.getAttribute("accent-color")??"var(--arswc-color-accent, #4cc2ff)",r=K.#t(this._data.properties,this._data.order??[]);return{id:this._data.id??this.getAttribute("tile-id")??"",title:e,subtitle:this._data.subtitle??this.getAttribute("subtitle")??"",accentColor:t,properties:r,types:this._data.types??{},hiddenKeys:this._data.hiddenKeys??[],displayValues:this._data.displayValues??{},isSelected:this.hasAttribute("selected"),isDragging:this.hasAttribute("dragging"),isCollapsed:this.hasAttribute("collapsed"),isCollapsible:!this.hasAttribute("not-collapsible"),isEditing:this.hasAttribute("editing")}}#i(){const e=this.shadowRoot?.querySelector(".card");e&&(e.setAttribute("data-selected",String(this.hasAttribute("selected"))),e.setAttribute("data-dragging",String(this.hasAttribute("dragging"))))}#a(e,t){const r=K.#e(e.key),s=K.#e(e.value),n=this.#r(t),i=n==="date"||n==="time"||n==="datetime-local"?' style="color-scheme:dark;"':"";let l;return n==="text"?l=`<textarea class="edit-input" rows="3"${i}>${s}</textarea>`:n==="datetime-local"?l=`<input type="datetime-local" value="${K.#e(this.#s(e.value))}" class="edit-input"${i}>`:l=`<input type="${n}" value="${s}" class="edit-input"${i}>`,`
      <div class="edit-row" data-prop-key="${r}">
        <label>${K.#e(r)}</label>
        ${l}
      </div>
    `}#o(){if(!this.shadowRoot)return;const e=this.#n();let t,r,s=!1;if(e.isEditing){const n=e.properties.map(i=>{const l=e.types[i.key];return this.#a(i,l)}).join("");t=`
        <div class="title-block">
          <h3 class="title">${K.#e(e.title)}</h3>
        </div>
        <button
          type="button"
          class="confirm-edit-btn"
          part="confirm-edit-btn"
          aria-label="Save changes"
          title="Save changes"
        ><span aria-hidden="true">✓</span></button>
      `,r=n}else{const n=e.subtitle,i=e.properties.filter(c=>c.value.trim()!==""&&!e.hiddenKeys.includes(c.key)),l=i.length>0;s=!l;const o=l?i.map(c=>{const d=e.displayValues[c.key]??c.value;return`
              <div class="property-row">
                <span class="property-key">${K.#e(c.key)}</span>
                <span class="property-value">${K.#e(d)}</span>
              </div>
            `}).join(""):"";t=`
        <div class="title-block">
          <h3 class="title">${K.#e(e.title)}</h3>
          ${n?`<div class="subtitle">${K.#e(n)}</div>`:""}
        </div>
        ${e.isCollapsible?`<button
          type="button"
          class="collapse-btn"
          part="collapse-btn"
          aria-pressed="${String(e.isCollapsed)}"
          aria-label="${e.isCollapsed?"Expand content":"Collapse content"}"
          title="${e.isCollapsed?"Expand content":"Collapse content"}"
        ><span class="caret" aria-hidden="true">▾</span></button>`:""}
      `,r=o,s=!l}this.shadowRoot.innerHTML=`
      <style>
        :host {
          display: block;
          width: 100%;
          min-width: 0;
          color: var(--arswc-color-text, #ecf3ff);
          font-family: var(--arswc-font-family-sans, system-ui, sans-serif);
        }

        .card {
          display: flex;
          flex-direction: column;
          min-height: 100%;
          height: 100%;
          box-sizing: border-box;
          overflow: hidden;
          user-select: none;
          -webkit-user-select: none;
          border: 1px solid color-mix(in srgb, var(--arswc-color-border, #3a4d69) 84%, transparent);
          border-radius: calc(var(--arswc-radius-md, 12px) + 2px);
          background:
            linear-gradient(180deg, color-mix(in srgb, var(--arswc-color-surface, #132033) 94%, white 6%), var(--arswc-color-surface, #132033));
          box-shadow: var(--arswc-shadow-sm, 0 8px 20px rgb(0 0 0 / 0.24));
          transition:
            transform 140ms ease,
            box-shadow 140ms ease,
            border-color 140ms ease;
        }

        .card[data-selected="true"] {
          border-color: ${e.accentColor};
          box-shadow:
            0 0 0 3px ${e.accentColor},
            0 14px 28px rgb(0 0 0 / 0.36);
        }

        .card[data-dragging="true"] {
          transform: rotate(-0.35deg) translateY(-2px);
          box-shadow:
            0 0 0 1px color-mix(in srgb, ${e.accentColor} 70%, transparent),
            0 18px 32px rgb(0 0 0 / 0.4);
        }

        .header {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          align-items: center;
          gap: 8px;
          padding: 14px 16px 12px;
          background:
            linear-gradient(90deg, color-mix(in srgb, ${e.accentColor} 22%, transparent), transparent 58%),
            color-mix(in srgb, var(--arswc-color-surface, #132033) 90%, black 10%);
          border-bottom: 1px solid color-mix(in srgb, var(--arswc-color-border, #3a4d69) 74%, transparent);
        }

        .title-block {
          text-align: center;
          min-width: 0;
        }

        .collapse-btn {
          all: unset;
          box-sizing: border-box;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 22px;
          height: 22px;
          border-radius: 6px;
          color: var(--arswc-color-muted, #95aac8);
          font-size: 0.9rem;
          line-height: 1;
          cursor: pointer;
          border: 1px solid color-mix(in srgb, var(--arswc-color-border, #3a4d69) 64%, transparent);
          background: color-mix(in srgb, var(--arswc-color-surface, #132033) 80%, black 6%);
          transition: background 120ms ease, color 120ms ease, transform 140ms ease;
        }

        .collapse-btn:hover {
          color: var(--arswc-color-text, #ecf3ff);
          background: color-mix(in srgb, ${e.accentColor} 22%, transparent);
        }

        .collapse-btn:focus-visible {
          outline: 2px solid ${e.accentColor};
          outline-offset: 2px;
        }

        .confirm-edit-btn {
          all: unset;
          box-sizing: border-box;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 22px;
          height: 22px;
          border-radius: 6px;
          color: #7df5b9;
          font-size: 0.9rem;
          line-height: 1;
          cursor: pointer;
          border: 1px solid color-mix(in srgb, var(--arswc-color-border, #3a4d69) 64%, transparent);
          background: color-mix(in srgb, #7df5b9 12%, transparent);
          transition: background 120ms ease, color 120ms ease, transform 140ms ease;
        }

        .confirm-edit-btn:hover {
          color: #fff;
          background: color-mix(in srgb, #7df5b9 30%, transparent);
        }

        .confirm-edit-btn:focus-visible {
          outline: 2px solid #7df5b9;
          outline-offset: 2px;
        }

        .collapse-btn .caret {
          display: inline-block;
          transition: transform 160ms ease;
          transform: rotate(0deg);
        }

        :host([collapsed]) .collapse-btn .caret {
          transform: rotate(-90deg);
        }

        .title {
          margin: 0;
          font-size: 0.98rem;
          font-weight: 700;
          line-height: 1.2;
          color: var(--arswc-color-text, #ecf3ff);
        }

        .subtitle {
          margin-top: 4px;
          font-size: 0.76rem;
          color: var(--arswc-color-muted, #95aac8);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .content {
          display: grid;
          gap: 10px;
          padding: 14px 16px 16px;
          flex: 1 1 auto;
          min-height: 0;
          overflow-y: auto;
        }

        .content--empty {
          padding: 0;
          flex: 0 0 auto;
          height: 0;
          overflow: hidden;
        }

        .property-row {
          display: grid;
          gap: 4px;
        }

        .node-name {
          text-align: center;
          font-size: 1.05rem;
          font-weight: 600;
          color: var(--arswc-color-text, #ecf3ff);
          line-height: 1.4;
          word-break: break-word;
        }

        .property-key {
          color: var(--arswc-color-muted, #95aac8);
          font-size: 0.72rem;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .property-value {
          color: var(--arswc-color-text, #ecf3ff);
          font-size: 0.88rem;
          line-height: 1.35;
          word-break: break-word;
        }

        /* Inline editing styles */
        .edit-actions {
          display: flex;
          gap: 6px;
          align-items: center;
        }

        .edit-btn {
          all: unset;
          box-sizing: border-box;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 26px;
          height: 26px;
          border-radius: 6px;
          font-size: 0.85rem;
          line-height: 1;
          cursor: pointer;
          border: 1px solid color-mix(in srgb, var(--arswc-color-border, #3a4d69) 64%, transparent);
          transition: background 120ms ease, color 120ms ease;
        }

        .edit-btn:hover {
          color: var(--arswc-color-text, #ecf3ff);
        }

        .save-btn {
          color: #7df5b9;
          background: color-mix(in srgb, #7df5b9 12%, transparent);
        }

        .save-btn:hover {
          background: color-mix(in srgb, #7df5b9 22%, transparent);
        }

        .cancel-btn {
          color: #ff7e88;
          background: color-mix(in srgb, #ff7e88 12%, transparent);
        }

        .cancel-btn:hover {
          background: color-mix(in srgb, #ff7e88 22%, transparent);
        }

        .edit-row {
          display: grid;
          gap: 4px;
          padding-right: 35px;
        }

        .edit-row label {
          color: var(--arswc-color-muted, #95aac8);
          font-size: 0.72rem;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .edit-row input,
        .edit-row textarea {
          width: 100%;
          box-sizing: border-box;
          min-width: 0;
          padding: 8px 10px;
          border: 1px solid var(--arswc-color-border, #3a4d69);
          user-select: text;
          -webkit-user-select: text;
          border-radius: 8px;
          background: color-mix(in srgb, var(--arswc-color-canvas, #07111d) 72%, white 2%);
          color: var(--arswc-color-text, #ecf3ff);
          font: inherit;
          font-size: 0.88rem;
        }

        .edit-row textarea {
          resize: vertical;
          min-height: 60px;
          field-sizing: content;
        }

        .edit-row input:focus-visible,
        .edit-row textarea:focus-visible {
          outline: none;
          border-color: var(--arswc-color-accent, #4cc2ff);
          box-shadow: 0 0 0 2px color-mix(in srgb, var(--arswc-color-accent, #4cc2ff) 30%, transparent);
        }

        /* ── Edit-mode zoom isolation ───────────────────────────────
         * When the camera zooms in the engine applies
         * transform: scale3d(S,S,1) to the tile.  That makes every
         * pixel inside the shadow DOM render S× larger — a 14 px font
         * becomes ~45 px and inputs look broken.
         *
         * Only .content is counter-scaled; .header (title bar) stays
         * zoomed so it remains prominent.  We enlarge .content's layout
         * box by S and scale it back down by 1/S with origin at the
         * top-left corner so the rendered box exactly fills .card
         * without overflowing outside it.
         *
         * --scene-scale and --counter-scale are written to the
         * :host inline style by #startCounterScale and updated
         * via a MutationObserver that watches the engine's transform
         * changes.
         */
        :host([editing]) .content {
          transform: scale(var(--counter-scale, 1));
          transform-origin: top left;
          flex: 0 0 auto;
          width: calc(100% * var(--scene-scale, 1));
        }
      </style>
      <article class="card" data-selected="${String(e.isSelected)}" data-dragging="${String(e.isDragging)}" data-collapsed="${String(e.isCollapsed)}" data-collapsible="${String(e.isCollapsible)}">
        <header class="header">
          ${t}
        </header>
        <section class="content${s?" content--empty":""}">
          ${r}
        </section>
      </article>
    `,e.isEditing?(this.#d(),this.#c()):(this._editAbortController?.abort(),this._editAbortController=null,this.#h(),this.#p())}#c(){if(!this.shadowRoot)return;this._editAbortController?.abort(),this._editAbortController=new AbortController;const{signal:e}=this._editAbortController;this.shadowRoot.addEventListener("keydown",r=>{const s=r,n=r.target;if(s.key==="Enter"){if(n.tagName==="TEXTAREA"&&!s.shiftKey&&!s.ctrlKey)return;r.preventDefault(),this.#l()}},{signal:e}),document.addEventListener("keydown",r=>{r.key==="Escape"&&(r.preventDefault(),this.#l())},{signal:e}),setTimeout(()=>{e.aborted||document.addEventListener("click",r=>{r.composedPath().includes(this)||this.#l()},{signal:e})},0);const t=this.shadowRoot.querySelector(".confirm-edit-btn");t&&(t.addEventListener("click",r=>{r.stopPropagation(),this.#l()},{signal:e}),t.addEventListener("dblclick",r=>{r.stopPropagation()},{signal:e})),this.shadowRoot.querySelector(".edit-input")?.focus()}#l(){if(!this.shadowRoot)return;this._editAbortController?.abort(),this._editAbortController=null;const e={};for(const t of Array.from(this.shadowRoot.querySelectorAll(".edit-row"))){const r=t.dataset.propKey??"",s=t.querySelector(".edit-input");if(s&&r){let n=s.value.trim();s.type==="datetime-local"&&/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(n)&&(n+=":00"),e[r]=n}}this.dispatchEvent(new CustomEvent("ars-info-tile:edit-save",{bubbles:!0,composed:!0,detail:{properties:e}}))}#d(){if(this._scaleObserver)return;const e=()=>{const t=this.getBoundingClientRect(),r=this.offsetWidth;if(r<=0)return;const s=t.width/r;s>0&&isFinite(s)&&(this.style.setProperty("--scene-scale",String(s)),this.style.setProperty("--counter-scale",String(1/s)))};e(),this._scaleObserver=new MutationObserver(e),this._scaleObserver.observe(this,{attributes:!0,attributeFilter:["style"]})}#h(){this._scaleObserver&&(this._scaleObserver.disconnect(),this._scaleObserver=null,this.style.removeProperty("--scene-scale"),this.style.removeProperty("--counter-scale"))}#u(){this.dispatchEvent(new CustomEvent("ars-info-tile:edit-cancel",{bubbles:!0,composed:!0}))}#g(){!this.shadowRoot||this._activationEventsBound||(this.shadowRoot.addEventListener("dblclick",e=>{e.stopPropagation(),this.dispatchEvent(new CustomEvent("ars-info-tile:activate",{bubbles:!0,composed:!0,detail:{originalEventType:e.type}}))}),this.addEventListener("contextmenu",e=>{if(e instanceof CustomEvent)return;const t=e;t.preventDefault(),t.stopPropagation(),this.dispatchEvent(new CustomEvent("contextmenu",{bubbles:!0,composed:!0,detail:{x:t.clientX,y:t.clientY}}))},!0),this._activationEventsBound=!0)}#p(){if(!this.shadowRoot)return;const e=this.shadowRoot.querySelector(".collapse-btn");e&&(e.addEventListener("click",t=>{t.stopPropagation();const r=!this.hasAttribute("collapsed");this.dispatchEvent(new CustomEvent("ars-info-tile:toggle-collapse",{bubbles:!0,composed:!0,detail:{collapsed:r}}))}),e.addEventListener("dblclick",t=>{t.stopPropagation()}))}}class ue extends HTMLElement{_options=[];_isOpen=!1;_searchTerm="";_highlightedIdx=-1;_eventsBound=!1;_outsideClickHandler=null;static get observedAttributes(){return["value","placeholder","label","disabled","searchable","multiple","error"]}constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.#s(),this.#n(),this.hasAttribute("tabindex")||this.setAttribute("tabindex","0")}disconnectedCallback(){this._outsideClickHandler&&(document.removeEventListener("click",this._outsideClickHandler),this._outsideClickHandler=null,this._eventsBound=!1)}attributeChangedCallback(){this.shadowRoot&&this.#s()}get options(){return[...this._options]}set options(e){this._options=[...e],this.#s()}get value(){if(this.multiple)try{return JSON.parse(this.getAttribute("value")??"[]")}catch{return[]}return this.getAttribute("value")??""}set value(e){const t=this.value;Array.isArray(e)?this.setAttribute("value",JSON.stringify(e)):this.setAttribute("value",e),this.dispatchEvent(new CustomEvent("ars-select:change",{bubbles:!0,composed:!0,detail:{value:e,previousValue:t}}))}get selectedOption(){if(this.multiple){const e=this.value;return this._options.filter(t=>e.includes(t.value))}return this._options.find(e=>e.value===this.value)}get placeholder(){return this.getAttribute("placeholder")??"Select..."}set placeholder(e){this.setAttribute("placeholder",e)}get disabled(){return this.hasAttribute("disabled")}set disabled(e){this.toggleAttribute("disabled",e)}get searchable(){return this.hasAttribute("searchable")}get multiple(){return this.hasAttribute("multiple")}get error(){return this.getAttribute("error")??""}set error(e){e?this.setAttribute("error",e):this.removeAttribute("error")}open(){this.disabled||this._isOpen||(this._isOpen=!0,this._searchTerm="",this._highlightedIdx=-1,this.#s(),this.dispatchEvent(new CustomEvent("ars-select:open",{bubbles:!0,composed:!0})),setTimeout(()=>{this.shadowRoot?.querySelector(".search-input")?.focus()},0))}close(){this._isOpen&&(this._isOpen=!1,this._searchTerm="",this.#s(),this.dispatchEvent(new CustomEvent("ars-select:close",{bubbles:!0,composed:!0})))}#e(){if(!this._searchTerm)return this._options;const e=this._searchTerm.toLowerCase();return this._options.filter(t=>t.label.toLowerCase().includes(e)||t.value.toLowerCase().includes(e))}#t(){if(this.multiple){const t=this.value;return t.length===0?this.placeholder:this._options.filter(s=>t.includes(s.value)).map(s=>s.label).join(", ")}return this._options.find(t=>t.value===this.value)?.label??this.placeholder}#r(e){if(!e.disabled)if(this.multiple){const t=[...this.value],r=t.indexOf(e.value);r>=0?t.splice(r,1):t.push(e.value),this.value=t}else this.value=e.value,this.close()}#s(){if(!this.shadowRoot)return;const e=this.getAttribute("label")??"",t=this.error,r=t.length>0,s=this._isOpen,n=this.#t(),i=this.#e(),l=this.value,o=this.multiple,c=this.searchable,d=p=>o?l.includes(p.value):l===p.value,u=i.map((p,h)=>`<div class="option ${d(p)?"option--selected":""} ${p.disabled?"option--disabled":""} ${h===this._highlightedIdx?"option--highlighted":""}"
          role="option"
          aria-selected="${String(d(p))}"
          data-value="${ue.#a(p.value)}"
          data-index="${h}">
          ${o&&d(p)?'<span class="check">&#10003;</span>':""}
          ${ue.#i(p.label)}
          ${p.group?`<span class="group-tag">${ue.#i(p.group)}</span>`:""}
        </div>`).join("");this.shadowRoot.innerHTML=`
      <style>${ue.#o()}</style>
      <div class="wrapper">
        ${e?`<label class="label">${ue.#i(e)}</label>`:""}
        <div class="trigger ${r?"trigger--error":""} ${s?"trigger--open":""}"
             role="combobox"
             aria-expanded="${String(s)}"
             aria-haspopup="listbox">
          <span class="display-value ${n===this.placeholder?"display-value--placeholder":""}">${ue.#i(n)}</span>
          <span class="chevron" aria-hidden="true">${s?"&#9650;":"&#9660;"}</span>
        </div>
        ${s?`
        <div class="dropdown" role="listbox">
          ${c?`<input class="search-input" type="text" placeholder="Search..." value="${ue.#a(this._searchTerm)}" aria-label="Filter options">`:""}
          <div class="options-list">
            ${u||'<div class="no-results">No matching options</div>'}
          </div>
        </div>
        `:""}
        ${r?`<div class="error-msg" role="alert">${ue.#i(t)}</div>`:""}
      </div>
    `}#n(){!this.shadowRoot||this._eventsBound||(this._eventsBound=!0,this.shadowRoot.addEventListener("click",e=>{const t=e.target;if(t.closest(".trigger")){this._isOpen?this.close():this.open();return}const r=t.closest("[data-value]");if(r){const s=r.dataset.value??"",n=this._options.find(i=>i.value===s);n&&this.#r(n)}}),this.shadowRoot.addEventListener("input",e=>{const t=e.target;t.classList.contains("search-input")&&(this._searchTerm=t.value,this._highlightedIdx=-1,this.#s(),setTimeout(()=>{const r=this.shadowRoot?.querySelector(".search-input");r&&(r.focus(),r.setSelectionRange(r.value.length,r.value.length))},0))}),this.addEventListener("keydown",e=>{const t=e;if(this.disabled)return;if(!this._isOpen){(t.key==="Enter"||t.key===" "||t.key==="ArrowDown")&&(t.preventDefault(),this.open());return}const r=this.#e();switch(t.key){case"ArrowDown":t.preventDefault(),this._highlightedIdx=Math.min(this._highlightedIdx+1,r.length-1),this.#s();break;case"ArrowUp":t.preventDefault(),this._highlightedIdx=Math.max(this._highlightedIdx-1,0),this.#s();break;case"Enter":t.preventDefault(),this._highlightedIdx>=0&&this._highlightedIdx<r.length&&this.#r(r[this._highlightedIdx]);break;case"Escape":t.preventDefault(),this.close();break;case"Home":t.preventDefault(),this._highlightedIdx=0,this.#s();break;case"End":t.preventDefault(),this._highlightedIdx=r.length-1,this.#s();break}}),this._outsideClickHandler=e=>{this._isOpen&&!this.contains(e.target)&&this.close()},document.addEventListener("click",this._outsideClickHandler))}static#i(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}static#a(e){return e.replaceAll('"',"&quot;").replaceAll("'","&#39;")}static#o(){return`
      :host {
        display: block;
        font-family: var(--arswc-font-family-sans, system-ui, sans-serif);
        position: relative;
      }

      :host([disabled]) {
        pointer-events: none;
        opacity: 0.6;
      }

      .wrapper {
        display: flex;
        flex-direction: column;
        gap: var(--arswc-spacing-xs, 4px);
      }

      .label {
        color: var(--arswc-color-text, #1b2430);
        font-size: var(--arswc-font-size-sm, 0.75rem);
        font-weight: 600;
      }

      .trigger {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--arswc-spacing-sm, 8px);
        padding: var(--arswc-spacing-sm, 8px) var(--arswc-spacing-md, 16px);
        border: 1px solid var(--arswc-color-border, #d5dde8);
        border-radius: var(--arswc-radius-sm, 6px);
        background: var(--arswc-color-surface, #f6f8fb);
        cursor: pointer;
        transition: border-color var(--arswc-transition-duration, 200ms) ease;
      }

      .trigger:hover {
        border-color: var(--arswc-color-accent, #2563eb);
      }

      .trigger--open {
        border-color: var(--arswc-color-accent, #2563eb);
        box-shadow: var(--arswc-focus-ring, 0 0 0 3px rgba(37, 99, 235, 0.3));
      }

      .trigger--error {
        border-color: var(--arswc-color-danger, #dc2626);
      }

      .display-value {
        color: var(--arswc-color-text, #1b2430);
        font-size: var(--arswc-font-size-md, 0.875rem);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .display-value--placeholder {
        color: var(--arswc-color-muted, #64748b);
      }

      .chevron {
        font-size: 0.6rem;
        color: var(--arswc-color-muted, #64748b);
        flex-shrink: 0;
      }

      .dropdown {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        z-index: 100;
        margin-top: 4px;
        border: 1px solid var(--arswc-color-border, #d5dde8);
        border-radius: var(--arswc-radius-sm, 6px);
        background: var(--arswc-color-surface, #f6f8fb);
        box-shadow: 0 4px 12px rgba(0,0,0,0.12);
        max-height: 240px;
        display: flex;
        flex-direction: column;
      }

      .search-input {
        margin: var(--arswc-spacing-sm, 8px);
        padding: var(--arswc-spacing-xs, 4px) var(--arswc-spacing-sm, 8px);
        border: 1px solid var(--arswc-color-border, #d5dde8);
        border-radius: var(--arswc-radius-sm, 6px);
        font-size: var(--arswc-font-size-md, 0.875rem);
        font-family: inherit;
        outline: none;
        background: var(--arswc-color-bg, #ffffff);
        color: var(--arswc-color-text, #1b2430);
      }

      .search-input:focus {
        border-color: var(--arswc-color-accent, #2563eb);
      }

      .options-list {
        overflow-y: auto;
        flex: 1;
      }

      .option {
        padding: var(--arswc-spacing-sm, 8px) var(--arswc-spacing-md, 16px);
        cursor: pointer;
        font-size: var(--arswc-font-size-md, 0.875rem);
        color: var(--arswc-color-text, #1b2430);
        display: flex;
        align-items: center;
        gap: var(--arswc-spacing-sm, 8px);
        transition: background var(--arswc-transition-duration, 200ms) ease;
      }

      .option:hover {
        background: var(--arswc-color-border, #d5dde8);
      }

      .option--selected {
        background: color-mix(in srgb, var(--arswc-color-accent, #2563eb) 10%, transparent);
        font-weight: 600;
      }

      .option--highlighted {
        background: var(--arswc-color-border, #d5dde8);
      }

      .option--disabled {
        color: var(--arswc-color-disabled, #9ca3af);
        cursor: not-allowed;
      }

      .check {
        color: var(--arswc-color-accent, #2563eb);
        font-weight: bold;
      }

      .group-tag {
        margin-left: auto;
        font-size: var(--arswc-font-size-sm, 0.75rem);
        color: var(--arswc-color-muted, #64748b);
      }

      .no-results {
        padding: var(--arswc-spacing-md, 16px);
        text-align: center;
        color: var(--arswc-color-muted, #64748b);
        font-size: var(--arswc-font-size-md, 0.875rem);
      }

      .error-msg {
        color: var(--arswc-color-danger, #dc2626);
        font-size: var(--arswc-font-size-sm, 0.75rem);
      }
    `}}class ke extends HTMLElement{_columns=[];_data=[];_selectedRows=new Set;_sortColumn="";_sortDirection="asc";_eventsBound=!1;_scrollStart=0;_visibleCount=50;static get observedAttributes(){return["selectable","sortable","striped","compact","virtual-scroll","auto-sort"]}constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.#s(),this.#n()}attributeChangedCallback(){this.shadowRoot&&this.#s()}get columns(){return[...this._columns]}set columns(e){this._columns=[...e],this.#s()}get data(){return[...this._data]}set data(e){this._data=[...e],this._selectedRows.clear(),this._scrollStart=0,this.#s()}get selectedRows(){return[...this._selectedRows]}get selectable(){return this.getAttribute("selectable")||"none"}set selectable(e){this.setAttribute("selectable",e)}get sortable(){return this.hasAttribute("sortable")}get striped(){return this.hasAttribute("striped")}get compact(){return this.hasAttribute("compact")}get virtualScroll(){return this.hasAttribute("virtual-scroll")}get autoSort(){return this.hasAttribute("auto-sort")}#e(){if(!this._sortColumn||!this.autoSort)return this._data;const e=this._sortColumn,t=this._sortDirection==="asc"?1:-1;return[...this._data].sort((r,s)=>{const n=String(r[e]??""),i=String(s[e]??"");return n.localeCompare(i,void 0,{numeric:!0})*t})}#t(e){this._sortColumn===e?this._sortDirection=this._sortDirection==="asc"?"desc":"asc":(this._sortColumn=e,this._sortDirection="asc"),this.dispatchEvent(new CustomEvent("ars-table:sort",{bubbles:!0,composed:!0,detail:{column:e,direction:this._sortDirection}})),this.#s()}#r(e){const t=this.selectable;if(t==="none")return;let r;t==="single"?this._selectedRows.has(e)?(this._selectedRows.clear(),r="deselect"):(this._selectedRows.clear(),this._selectedRows.add(e),r="select"):this._selectedRows.has(e)?(this._selectedRows.delete(e),r="deselect"):(this._selectedRows.add(e),r="select"),this.dispatchEvent(new CustomEvent("ars-table:select",{bubbles:!0,composed:!0,detail:{selectedRows:this.selectedRows,row:this._data[e],action:r}})),this.#s()}#s(){if(!this.shadowRoot)return;const e=this.#e(),t=e.length===0,r=this.virtualScroll&&e.length>this._visibleCount,s=r?e.slice(this._scrollStart,this._scrollStart+this._visibleCount):e,n=this.compact,i=this.striped,l=this.selectable,o=this.sortable;if(t){this.shadowRoot.innerHTML=`
        <style>${ke.#o(n)}</style>
        <div class="empty"><slot name="empty">No data</slot></div>
      `;return}const c=this._columns.map(u=>{const p=o&&u.sortable!==!1,h=this._sortColumn===u.key,g=h?this._sortDirection==="asc"?" &#9650;":" &#9660;":"";return`<th
          class="th ${p?"th--sortable":""}"
          role="columnheader"
          ${h?`aria-sort="${this._sortDirection==="asc"?"ascending":"descending"}"`:""}
          data-col="${ke.#a(u.key)}"
          style="${u.width?`width: ${u.width};`:""} ${u.align?`text-align: ${u.align};`:""}"
        >${ke.#i(u.label)}${g}</th>`}).join(""),d=s.map((u,p)=>{const h=r?this._scrollStart+p:p,g=this._selectedRows.has(h),f=this._columns.map(m=>{const b=u[m.key],v=m.render?m.render(b,u):ke.#i(String(b??""));return`<td class="td" role="gridcell" style="${m.align?`text-align: ${m.align};`:""}">${v}</td>`}).join("");return`<tr class="row ${g?"row--selected":""} ${i&&h%2===1?"row--striped":""}"
                    role="row"
                    data-row-idx="${h}">${l!=="none"?`<td class="td td--select"><input type="checkbox" ${g?"checked":""} aria-label="Select row"></td>`:""}${f}</tr>`}).join("");this.shadowRoot.innerHTML=`
      <style>${ke.#o(n)}</style>
      <div class="table-wrapper">
        ${r?`<div class="virtual-info">${e.length} rows (showing ${this._scrollStart+1}-${Math.min(this._scrollStart+this._visibleCount,e.length)})</div>`:""}
        <table class="table" role="grid">
          <thead>
            <tr role="row">${l!=="none"?'<th class="th th--select" role="columnheader"></th>':""}${c}</tr>
          </thead>
          <tbody>${d}</tbody>
        </table>
        ${r?`
        <div class="virtual-controls">
          <button class="nav-btn" data-scroll="prev" ${this._scrollStart<=0?"disabled":""}>&#9650; Previous</button>
          <button class="nav-btn" data-scroll="next" ${this._scrollStart+this._visibleCount>=e.length?"disabled":""}>&#9660; Next</button>
        </div>
        `:""}
      </div>
    `}#n(){!this.shadowRoot||this._eventsBound||(this._eventsBound=!0,this.shadowRoot.addEventListener("click",e=>{const t=e.target,r=t.closest(".th--sortable");if(r){const i=r.dataset.col??"";i&&this.#t(i);return}const s=t.closest("[data-row-idx]");if(s){const i=parseInt(s.dataset.rowIdx??"0",10);if(t.tagName==="INPUT"||t.closest(".td--select")){this.#r(i);return}this.dispatchEvent(new CustomEvent("ars-table:row-click",{bubbles:!0,composed:!0,detail:{row:this._data[i],index:i}})),this.selectable!=="none"&&this.#r(i)}const n=t.closest("[data-scroll]");if(n){const i=n.dataset.scroll,l=this.#e().length;i==="next"?this._scrollStart=Math.min(this._scrollStart+this._visibleCount,l-this._visibleCount):this._scrollStart=Math.max(0,this._scrollStart-this._visibleCount),this.#s()}}))}static#i(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}static#a(e){return e.replaceAll('"',"&quot;").replaceAll("'","&#39;")}static#o(e){const t=e?"4px 8px":"8px 12px";return`
      :host {
        display: block;
        font-family: var(--arswc-font-family-sans, system-ui, sans-serif);
      }

      .table-wrapper {
        overflow-x: auto;
      }

      .table {
        width: 100%;
        border-collapse: collapse;
        font-size: var(--arswc-font-size-md, 0.875rem);
      }

      .th {
        padding: ${t};
        text-align: start;
        font-size: var(--arswc-font-size-sm, 0.75rem);
        font-weight: 600;
        color: var(--arswc-color-muted, #64748b);
        border-bottom: 2px solid var(--arswc-color-border, #d5dde8);
        white-space: nowrap;
        user-select: none;
      }

      .th--sortable {
        cursor: pointer;
      }

      .th--sortable:hover {
        color: var(--arswc-color-text, #1b2430);
      }

      .th--select {
        width: 40px;
      }

      .td {
        padding: ${t};
        border-bottom: 1px solid var(--arswc-color-border, #d5dde8);
        color: var(--arswc-color-text, #1b2430);
      }

      .td--select {
        width: 40px;
        text-align: center;
      }

      .row {
        transition: background var(--arswc-transition-duration, 200ms) ease;
      }

      .row:hover {
        background: color-mix(in srgb, var(--arswc-color-accent, #2563eb) 5%, transparent);
      }

      .row--selected {
        background: color-mix(in srgb, var(--arswc-color-accent, #2563eb) 10%, transparent);
      }

      .row--striped {
        background: color-mix(in srgb, var(--arswc-color-surface, #f6f8fb) 80%, var(--arswc-color-border, #d5dde8) 20%);
      }

      .row--striped:hover {
        background: color-mix(in srgb, var(--arswc-color-accent, #2563eb) 8%, transparent);
      }

      .empty {
        padding: var(--arswc-spacing-xl, 32px);
        text-align: center;
        color: var(--arswc-color-muted, #64748b);
        font-size: var(--arswc-font-size-md, 0.875rem);
      }

      .virtual-info {
        padding: var(--arswc-spacing-xs, 4px) var(--arswc-spacing-sm, 8px);
        font-size: var(--arswc-font-size-sm, 0.75rem);
        color: var(--arswc-color-muted, #64748b);
      }

      .virtual-controls {
        display: flex;
        gap: var(--arswc-spacing-sm, 8px);
        padding: var(--arswc-spacing-sm, 8px);
        justify-content: center;
      }

      .nav-btn {
        padding: var(--arswc-spacing-xs, 4px) var(--arswc-spacing-md, 16px);
        border: 1px solid var(--arswc-color-border, #d5dde8);
        border-radius: var(--arswc-radius-sm, 6px);
        background: var(--arswc-color-surface, #f6f8fb);
        color: var(--arswc-color-text, #1b2430);
        cursor: pointer;
        font-size: var(--arswc-font-size-sm, 0.75rem);
      }

      .nav-btn:disabled {
        opacity: 0.4;
        cursor: default;
      }

      .nav-btn:hover:not(:disabled) {
        background: var(--arswc-color-border, #d5dde8);
      }

      input[type="checkbox"] {
        cursor: pointer;
      }
    `}}class na extends HTMLElement{static get observedAttributes(){return["tab-id","label","disabled"]}get tabId(){return this.getAttribute("tab-id")??""}set tabId(e){this.setAttribute("tab-id",e)}get label(){return this.getAttribute("label")??""}set label(e){this.setAttribute("label",e)}get disabled(){return this.hasAttribute("disabled")}set disabled(e){this.toggleAttribute("disabled",e)}attributeChangedCallback(){const e=this.closest("ars-tabs");e&&e.requestRender()}}class Fe extends HTMLElement{_activeTab="";_eventsBound=!1;_observer=null;static get observedAttributes(){return["active-tab","placement"]}constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){if(!this._activeTab){const e=this.querySelector("ars-tab-panel:not([disabled])");e&&(this._activeTab=e.tabId)}this.#r(),this.#s(),this.#t()}disconnectedCallback(){this._observer?.disconnect()}attributeChangedCallback(e,t,r){if(e==="active-tab"&&r!==null){const s=this._activeTab;this._activeTab=r,s!==r&&this.dispatchEvent(new CustomEvent("ars-tabs:change",{bubbles:!0,composed:!0,detail:{activeTab:r,previousTab:s}}))}this.shadowRoot&&this.#r()}get activeTab(){return this._activeTab}set activeTab(e){this.setAttribute("active-tab",e)}get placement(){return this.getAttribute("placement")||"top"}set placement(e){this.setAttribute("placement",e)}requestRender(){this.shadowRoot&&this.#r()}#e(){return Array.from(this.querySelectorAll("ars-tab-panel"))}#t(){this._observer=new MutationObserver(()=>this.#r()),this._observer.observe(this,{childList:!0})}#r(){if(!this.shadowRoot)return;const e=this.#e(),t=this.placement,r=t==="start"||t==="end",s=e.map(n=>{const i=n.tabId===this._activeTab,l=n.disabled;return`<button
          class="tab ${i?"tab--active":""}"
          role="tab"
          aria-selected="${String(i)}"
          aria-controls="panel-${Fe.#i(n.tabId)}"
          data-tab-id="${Fe.#i(n.tabId)}"
          ${l?"disabled":""}
          tabindex="${i?"0":"-1"}"
        >${Fe.#n(n.label)}</button>`}).join("");e.forEach(n=>{const i=n.tabId===this._activeTab;n.style.display=i?"flex":"none",n.style.flexDirection=i?"column":"",n.style.flex=i?"1":"",n.setAttribute("role","tabpanel"),n.setAttribute("id",`panel-${n.tabId}`),n.tabId===this._activeTab?n.removeAttribute("hidden"):n.setAttribute("hidden","")}),this.shadowRoot.innerHTML=`
      <style>${Fe.#a(r)}</style>
      <div class="tabs-container tabs-container--${t}">
        <div class="tablist" role="tablist" aria-orientation="${r?"vertical":"horizontal"}">
          ${s}
        </div>
        <div class="panels">
          <slot></slot>
        </div>
      </div>
    `}#s(){!this.shadowRoot||this._eventsBound||(this._eventsBound=!0,this.shadowRoot.addEventListener("click",e=>{const t=e.target.closest("[data-tab-id]");if(!t||t.hasAttribute("disabled"))return;const r=t.dataset.tabId??"";r&&(this.activeTab=r)}),this.shadowRoot.addEventListener("keydown",e=>{const t=e,r=t.target;if(!r.classList.contains("tab"))return;const s=Array.from(this.shadowRoot.querySelectorAll(".tab:not(:disabled)")),n=s.indexOf(r);if(n<0)return;let i=n;switch(t.key){case"ArrowRight":case"ArrowDown":t.preventDefault(),i=(n+1)%s.length;break;case"ArrowLeft":case"ArrowUp":t.preventDefault(),i=(n-1+s.length)%s.length;break;case"Home":t.preventDefault(),i=0;break;case"End":t.preventDefault(),i=s.length-1;break;default:return}s[i].focus();const l=s[i].dataset.tabId??"";l&&(this.activeTab=l)}))}static#n(e){return(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}static#i(e){return(e??"").replaceAll('"',"&quot;").replaceAll("'","&#39;")}static#a(e){return`
      :host {
        display: flex;
        flex-direction: column;
        font-family: var(--arswc-font-family-sans, system-ui, sans-serif);
      }

      .tabs-container {
        flex: 1;
        display: flex;
        min-height: 0;
        ${e?"":"flex-direction: column;"}
      }

      .tabs-container--bottom {
        flex-direction: column-reverse;
      }

      .tabs-container--end {
        flex-direction: row-reverse;
      }

      .tablist {
        display: flex;
        ${e?"flex-direction: column;":""}
        gap: 0;
        border-${e?"right":"bottom"}: 2px solid var(--arswc-color-border, #d5dde8);
        ${e?"min-width: 120px;":""}
      }

      .tabs-container--bottom .tablist {
        border-bottom: none;
        border-top: 2px solid var(--arswc-color-border, #d5dde8);
      }

      .tabs-container--end .tablist {
        border-right: none;
        border-left: 2px solid var(--arswc-color-border, #d5dde8);
      }

      .tab {
        padding: var(--arswc-spacing-sm, 8px) var(--arswc-spacing-md, 16px);
        border: none;
        background: transparent;
        color: var(--arswc-color-muted, #64748b);
        font-family: inherit;
        font-size: var(--arswc-font-size-md, 0.875rem);
        font-weight: 500;
        cursor: pointer;
        position: relative;
        transition: color var(--arswc-transition-duration, 200ms) ease;
        white-space: nowrap;
      }

      .tab:hover:not(:disabled) {
        color: var(--arswc-color-text, #1b2430);
      }

      .tab--active {
        color: var(--arswc-color-accent, #2563eb);
        font-weight: 600;
      }

      .tab--active::after {
        content: '';
        position: absolute;
        ${e?"top: 0; right: -2px; width: 2px; height: 100%;":"bottom: -2px; left: 0; height: 2px; width: 100%;"}
        background: var(--arswc-color-accent, #2563eb);
        transition: all var(--arswc-transition-duration, 200ms) ease;
      }

      .tabs-container--bottom .tab--active::after {
        bottom: auto;
        top: -2px;
      }

      .tabs-container--end .tab--active::after {
        right: auto;
        left: -2px;
      }

      .tab:disabled {
        color: var(--arswc-color-disabled, #9ca3af);
        cursor: not-allowed;
      }

      .tab:focus-visible {
        outline: none;
        box-shadow: var(--arswc-focus-ring, 0 0 0 3px rgba(37, 99, 235, 0.3));
        border-radius: 2px;
      }

      .panels {
        flex: 1;
        min-width: 0;
        min-height: 0;
        padding: var(--arswc-spacing-md, 16px);
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }

      .panels slot {
        display: flex;
        flex-direction: column;
        flex: 1;
        min-height: 0;
        overflow: hidden;
      }

      ::slotted(ars-tab-panel:not([hidden])) {
        flex: 1;
        display: flex !important;
        flex-direction: column;
        min-height: 0;
        overflow: hidden;
      }
    `}}const $r=new Map;function ia(a,e,t){const r=`${e}-${a.tagName??"BODY"}`;let s=$r.get(r);if(s&&s.isConnected)return s;s=t.createElement("div"),s.className=`ars-toast-container ars-toast-container--${e}`,s.setAttribute("aria-live","polite"),s.setAttribute("role","status");const n=e.startsWith("top"),i=e.endsWith("center"),l=e.endsWith("left");return Object.assign(s.style,{position:"fixed",zIndex:"9999",display:"flex",flexDirection:"column",gap:"8px",padding:"16px",pointerEvents:"none",maxWidth:"100%",...n?{top:"0"}:{bottom:"0"},...i?{left:"50%",transform:"translateX(-50%)"}:l?{left:"0"}:{right:"0"}}),a.appendChild(s),$r.set(r,s),s}class Qe extends HTMLElement{_timer=null;static get observedAttributes(){return["message","severity","duration","dismissible","progress","open"]}constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.#s(),this.#n(),this.hasAttribute("open")&&this.#e()}disconnectedCallback(){this.#r()}attributeChangedCallback(e){this.shadowRoot&&this.#s(),e==="open"&&(this.hasAttribute("open")?this.#e():this.#r())}get message(){return this.getAttribute("message")??""}set message(e){this.setAttribute("message",e)}get severity(){return this.getAttribute("severity")||"info"}set severity(e){this.setAttribute("severity",e)}get duration(){return parseInt(this.getAttribute("duration")??"5000",10)}set duration(e){this.setAttribute("duration",String(e))}get dismissible(){return this.hasAttribute("dismissible")}set dismissible(e){this.toggleAttribute("dismissible",e)}get progress(){return this.hasAttribute("progress")}set progress(e){this.toggleAttribute("progress",e)}get open(){return this.hasAttribute("open")}set open(e){this.toggleAttribute("open",e)}dismiss(e="programmatic"){this.#r(),this.dispatchEvent(new CustomEvent("ars-toast:dismiss",{bubbles:!0,composed:!0,detail:{reason:e}}));const t=this.shadowRoot?.querySelector(".toast");t?(t.classList.add("toast--exit"),t.addEventListener("animationend",()=>{this.remove()},{once:!0})):this.remove()}static show(e,t={}){const{severity:r="info",duration:s=5e3,dismissible:n=!0,position:i="top-right",progress:l=!1,mountTarget:o,targetDocument:c}=t,d=c??(typeof document<"u"?document:void 0);if(!d)throw new Error("ArsToast.show: no document available");const u=o??d.body,p=ia(u,i,d),h=d.createElement("ars-toast");return h.setAttribute("message",e),h.setAttribute("severity",r),h.setAttribute("duration",String(s)),n&&h.setAttribute("dismissible",""),l&&h.setAttribute("progress",""),h.setAttribute("open",""),h.style.pointerEvents="auto",p.appendChild(h),h}#e(){this.#r();const e=this.duration;e>0&&(this._timer=setTimeout(()=>this.dismiss("timeout"),e),this.#t(e))}#t(e){if(!this.progress)return;const t=this.shadowRoot?.querySelector(".progress-bar");t&&(t.style.transition="none",t.style.width="100%",t.offsetHeight,t.style.transition=`width ${e}ms linear`,t.style.width="0%")}#r(){this._timer!==null&&(clearTimeout(this._timer),this._timer=null)}#s(){if(!this.shadowRoot)return;const e=this.message,t=this.severity,r=this.dismissible,s=this.open,n=this.progress,i=Qe.#a(t);this.shadowRoot.innerHTML=`
      <style>${Qe.#o()}</style>
      ${s?`
      <div class="toast toast--${t}" role="alert">
        ${n?'<div class="progress-bar"></div>':""}
        <span class="icon" aria-hidden="true">${i}</span>
        <div class="content">
          <span class="message">${Qe.#i(e)}</span>
          <slot></slot>
        </div>
        <slot name="action"></slot>
        ${r?'<button class="close-btn" aria-label="Dismiss">&times;</button>':""}
      </div>
      `:""}
    `}#n(){this.shadowRoot&&this.shadowRoot.addEventListener("click",e=>{e.target.classList.contains("close-btn")&&this.dismiss("user")})}static#i(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}static#a(e){switch(e){case"success":return"&#10003;";case"warning":return"&#9888;";case"error":return"&#10007;";default:return"&#8505;"}}static#o(){return`
      :host {
        display: block;
        font-family: var(--arswc-font-family-sans, system-ui, sans-serif);
      }

      .toast {
        position: relative;
        overflow: hidden;
        display: flex;
        align-items: flex-start;
        gap: var(--arswc-spacing-sm, 8px);
        padding: var(--arswc-spacing-sm, 8px) var(--arswc-spacing-md, 16px);
        border-radius: var(--arswc-radius-sm, 6px);
        background: var(--arswc-color-surface, #f6f8fb);
        color: var(--arswc-color-text, #1b2430);
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        min-width: 280px;
        max-width: 420px;
        animation: ars-toast-enter 250ms ease forwards;
        border-left: 4px solid var(--arswc-color-accent, #2563eb);
      }

      .progress-bar {
        position: absolute;
        top: 0;
        left: 0;
        height: 3px;
        width: 100%;
        background: var(--arswc-color-accent, #2563eb);
        transition: width linear;
        z-index: 1;
      }

      .toast--info { border-left-color: var(--arswc-color-accent, #2563eb); }
      .toast--success { border-left-color: var(--arswc-color-success, #16a34a); }
      .toast--warning { border-left-color: var(--arswc-color-warning, #d97706); }
      .toast--error { border-left-color: var(--arswc-color-danger, #dc2626); }

      .toast--info .icon { color: var(--arswc-color-accent, #2563eb); }
      .toast--success .icon { color: var(--arswc-color-success, #16a34a); }
      .toast--warning .icon { color: var(--arswc-color-warning, #d97706); }
      .toast--error .icon { color: var(--arswc-color-danger, #dc2626); }

      .icon {
        font-size: 1.1rem;
        flex-shrink: 0;
        margin-top: 2px;
      }

      .content {
        flex: 1;
        min-width: 0;
      }

      .message {
        font-size: var(--arswc-font-size-md, 0.875rem);
        line-height: 1.4;
      }

      .close-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        border: none;
        background: transparent;
        color: var(--arswc-color-muted, #64748b);
        font-size: 1.2rem;
        cursor: pointer;
        border-radius: 50%;
        flex-shrink: 0;
        line-height: 1;
        padding: 0;
      }

      .close-btn:hover {
        background: var(--arswc-color-border, #d5dde8);
        color: var(--arswc-color-text, #1b2430);
      }

      ::slotted([slot="action"]) {
        flex-shrink: 0;
        padding: 6px 14px;
        border: 1px solid var(--arswc-color-accent, #2563eb);
        border-radius: var(--arswc-radius-sm, 4px);
        background: transparent;
        color: var(--arswc-color-accent, #2563eb);
        font-family: inherit;
        font-size: var(--arswc-font-size-sm, 0.75rem);
        font-weight: 600;
        cursor: pointer;
        transition: background 150ms ease, color 150ms ease;
      }

      ::slotted([slot="action"]:hover) {
        background: var(--arswc-color-accent, #2563eb);
        color: var(--arswc-color-surface, #ffffff);
      }

      ::slotted([slot="action"]:focus-visible) {
        outline: none;
        box-shadow: 0 0 0 2px var(--arswc-color-surface, #ffffff),
                    0 0 0 4px var(--arswc-color-accent, #2563eb);
      }

      .toast--exit {
        animation: ars-toast-exit 200ms ease forwards;
      }

      @keyframes ars-toast-enter {
        from {
          opacity: 0;
          transform: translateX(40px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      @keyframes ars-toast-exit {
        from {
          opacity: 1;
          transform: translateX(0);
        }
        to {
          opacity: 0;
          transform: translateX(40px);
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .toast, .toast--exit {
          animation: none;
        }
        .progress-bar {
          transition: none !important;
        }
      }
    `}}class Xt extends HTMLElement{static get observedAttributes(){return["checked","disabled","label","label-position"]}constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.#e(),this.#t()}attributeChangedCallback(){this.shadowRoot&&this.#e()}get checked(){return this.hasAttribute("checked")}set checked(e){this.toggleAttribute("checked",e)}get disabled(){return this.hasAttribute("disabled")}set disabled(e){this.toggleAttribute("disabled",e)}get label(){return this.getAttribute("label")??""}set label(e){this.setAttribute("label",e)}get labelPosition(){return this.getAttribute("label-position")||"end"}set labelPosition(e){this.setAttribute("label-position",e)}toggle(){this.disabled||(this.checked=!this.checked,this.dispatchEvent(new CustomEvent("ars-toggle:change",{bubbles:!0,composed:!0,detail:{checked:this.checked}})))}#e(){if(!this.shadowRoot)return;const e=this.checked,t=this.disabled,r=this.label,s=this.labelPosition;this.shadowRoot.innerHTML=`
      <style>${Xt.#r()}</style>
      <label class="toggle ${t?"toggle--disabled":""} toggle--label-${s}"
             role="switch"
             aria-checked="${String(e)}"
             ${t?'aria-disabled="true"':""}>
        <span class="label-text"><slot>${r}</slot></span>
        <span class="track ${e?"track--on":""}">
          <span class="thumb"></span>
        </span>
        <input type="checkbox" class="sr-only"
               ${e?"checked":""}
               ${t?"disabled":""}
               tabindex="-1"
               aria-hidden="true">
      </label>
    `}#t(){this.shadowRoot&&(this.shadowRoot.addEventListener("click",e=>{e.preventDefault(),this.toggle()}),this.shadowRoot.addEventListener("keydown",e=>{const t=e;(t.key===" "||t.key==="Enter")&&(t.preventDefault(),this.toggle())}),this.hasAttribute("tabindex")||this.setAttribute("tabindex","0"))}static#r(){return`
      :host {
        display: inline-block;
        font-family: var(--arswc-font-family-sans, system-ui, sans-serif);
      }

      :host([disabled]) {
        pointer-events: none;
        opacity: 0.6;
      }

      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0,0,0,0);
        white-space: nowrap;
        border: 0;
      }

      .toggle {
        display: inline-flex;
        align-items: center;
        gap: var(--arswc-spacing-sm, 8px);
        cursor: pointer;
        user-select: none;
      }

      .toggle--disabled {
        cursor: not-allowed;
      }

      .toggle--label-start {
        flex-direction: row;
      }

      .toggle--label-end {
        flex-direction: row-reverse;
      }

      .label-text {
        color: var(--arswc-color-text, #1b2430);
        font-size: var(--arswc-font-size-md, 0.875rem);
      }

      .track {
        position: relative;
        display: inline-flex;
        align-items: center;
        width: 40px;
        height: 22px;
        border-radius: 11px;
        background: var(--arswc-color-border, #d5dde8);
        transition: background var(--arswc-transition-duration, 200ms) ease;
        flex-shrink: 0;
      }

      .track--on {
        background: var(--arswc-color-accent, #2563eb);
      }

      .thumb {
        position: absolute;
        left: 2px;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: #ffffff;
        box-shadow: 0 1px 3px rgba(0,0,0,0.2);
        transition: transform var(--arswc-transition-duration, 200ms) ease;
      }

      .track--on .thumb {
        transform: translateX(18px);
      }

      :host(:focus-visible) .track {
        box-shadow: var(--arswc-focus-ring, 0 0 0 3px rgba(37, 99, 235, 0.3));
      }
    `}}class Z extends HTMLElement{_messages=[];_draftValue="";_expandTimeout=null;static get observedAttributes(){return["title","subtitle","placeholder","typing","collapsible","collapsed"]}constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.#e(),this.collapsed&&requestAnimationFrame(()=>this.#e())}disconnectedCallback(){this._expandTimeout&&(clearTimeout(this._expandTimeout),this._expandTimeout=null)}attributeChangedCallback(){this.shadowRoot&&this.#e()}get title(){return this.getAttribute("title")||"Chat"}set title(e){this.setAttribute("title",e)}get subtitle(){return this.getAttribute("subtitle")||""}set subtitle(e){this.setAttribute("subtitle",e)}get placeholder(){return this.getAttribute("placeholder")||"Type a message..."}set placeholder(e){this.setAttribute("placeholder",e)}get typing(){return this.hasAttribute("typing")}set typing(e){this.toggleAttribute("typing",e)}get collapsible(){return this.hasAttribute("collapsible")}set collapsible(e){this.toggleAttribute("collapsible",e)}get collapsed(){return this.hasAttribute("collapsed")}set collapsed(e){this.toggleAttribute("collapsed",e)}get messages(){return this._messages.map(e=>({...e}))}set messages(e){this._messages=Array.isArray(e)?e.map(t=>({...t})):[],this.shadowRoot&&this.#e()}#e(){if(!this.shadowRoot)return;const e=this._messages,t=this.typing;if(this.shadowRoot.querySelector(".panel")){const h=this.shadowRoot,g=h.querySelector(".messages"),f=h.querySelector("textarea"),m=h.querySelector("button.send"),b=h.querySelector(".typing"),v=h.querySelector("button.clear"),w=h.querySelector(".title"),x=h.querySelector(".subtitle"),_=h.querySelector(".panel"),E=h.querySelector(".collapse-toggle");if(E){if(E.style.display=this.collapsible?"":"none",E.classList.toggle("collapsed",this.collapsed),E.setAttribute("aria-label",this.collapsed?"Expand":"Collapse"),E.innerHTML=this.collapsed?Z.#i():Z.#n(),this.collapsed){this._expandTimeout&&(clearTimeout(this._expandTimeout),this._expandTimeout=null);const I=this.getBoundingClientRect();E.style.position="fixed",E.style.left="auto",E.style.right="0px",E.style.top=I.top+"px",E.style.zIndex="9999",E.style.width="56px",E.style.height="72px",E.style.borderRadius="10px 0 0 10px",E.style.background="var(--arswc-color-surface, #f6f8fb)",E.style.border="1px solid var(--arswc-color-border, #d5dde8)",E.style.borderRight="none",E.style.display="grid",E.style.placeItems="center",E.style.transition=""}else if(E.style.position==="fixed"&&E.style.right==="0px"){const I=this.getBoundingClientRect(),C=E.getBoundingClientRect(),N=I.left+8,T=I.top+12;E.style.left=C.left+"px",E.style.top=C.top+"px",E.style.right="auto",E.offsetHeight,E.style.transition="left 280ms cubic-bezier(0.4, 0, 0.2, 1), top 280ms cubic-bezier(0.4, 0, 0.2, 1), width 280ms cubic-bezier(0.4, 0, 0.2, 1), height 280ms cubic-bezier(0.4, 0, 0.2, 1), border-radius 280ms cubic-bezier(0.4, 0, 0.2, 1)",E.style.left=N+"px",E.style.top=T+"px",E.style.width="32px",E.style.height="32px",E.style.borderRadius="6px",this._expandTimeout=setTimeout(()=>{if(this._expandTimeout=null,this.shadowRoot){const R=this.shadowRoot.querySelector(".collapse-toggle");R&&!this.collapsed&&(R.style.position="",R.style.left="",R.style.right="",R.style.top="",R.style.zIndex="",R.style.width="",R.style.height="",R.style.borderRadius="",R.style.transition="",R.style.background="",R.style.border="",R.style.borderRight="",R.style.display="",R.style.placeItems="")}},300)}}const A=e.length?e.map(I=>`<div class="message message-${I.role}">${Z.#r(I.content)}</div>`).join(""):'<div class="message message-system">Send a message to start.</div>';if(g){const I=g.scrollHeight-g.scrollTop<=g.clientHeight+2;g.innerHTML=A,I&&(g.scrollTop=g.scrollHeight)}f&&(f.value!==this._draftValue&&(f.value=this._draftValue,this._draftValue||(f.style.height="auto")),f.disabled=t,f.getAttribute("placeholder")!==this.placeholder&&f.setAttribute("placeholder",this.placeholder)),m&&(m.disabled=t),b&&(b.textContent=t?"Typing...":""),v&&(v.disabled=t),w&&(w.textContent=this.title),x&&(x.textContent=this.subtitle,x.style.display=this.subtitle?"":"none"),_&&(_.classList.toggle("collapsed",this.collapsed),_.classList.toggle("has-collapse-toggle",this.collapsible));return}const r=e.length?e.map(h=>`<div class="message message-${h.role}">${Z.#r(h.content)}</div>`).join(""):'<div class="message message-system">Send a message to start.</div>',s=["panel",this.collapsible?"has-collapse-toggle":"",this.collapsed?"collapsed":""].filter(Boolean).join(" "),n=this.getBoundingClientRect(),i=this.collapsed?Math.round(n.top):0,l=this.collapsible?this.collapsed?`style="position:fixed;left:auto;right:0;top:${i}px;z-index:9999;width:56px;height:72px;border-radius:10px 0 0 10px;background:var(--arswc-color-surface,#f6f8fb);border:1px solid var(--arswc-color-border,#d5dde8);border-right:none;display:grid;place-items:center;"`:"":'style="display:none;"';this.shadowRoot.innerHTML=`
      <style>${Z.#a()}</style>
      <button type="button" class="collapse-toggle ${this.collapsed?"collapsed":""}" ${l} aria-label="${this.collapsed?"Expand":"Collapse"}">
        ${this.collapsed?Z.#i():Z.#n()}
      </button>
      <section class="${s}">
        <div class="header">
          <div>
            <div class="title">${Z.#r(this.title)}</div>
            <div class="subtitle" style="${this.subtitle?"":"display:none;"}">${Z.#r(this.subtitle)}</div>
          </div>
          <button type="button" class="clear" ${t?"disabled":""}>Clear</button>
        </div>
        <div class="messages">${r}</div>
        <div class="input-row">
          <textarea placeholder="${Z.#r(this.placeholder)}" rows="1" ${t?"disabled":""}>${Z.#r(this._draftValue)}</textarea>
          <button type="button" class="send" ${t?"disabled":""} aria-label="Send">
            ${Z.#s()}
          </button>
        </div>
        <div class="typing">${t?"Typing...":""}</div>
      </section>
    `;const o=this.shadowRoot.querySelector("textarea"),c=this.shadowRoot.querySelector("button.send"),d=this.shadowRoot.querySelector("button.clear"),u=this.shadowRoot.querySelector(".messages"),p=this.shadowRoot.querySelector(".collapse-toggle");u&&(u.scrollTop=u.scrollHeight),o?.addEventListener("input",()=>{this._draftValue=o.value,o.style.height="auto",o.style.height=Math.min(o.scrollHeight,120)+"px"}),o?.addEventListener("keydown",h=>{h.key!=="Enter"||h.shiftKey||this.typing||(h.preventDefault(),this.#t())}),c?.addEventListener("click",()=>{this.#t()}),d?.addEventListener("click",()=>{this.dispatchEvent(new CustomEvent("ars-chat-panel:clear",{bubbles:!0,composed:!0}))}),p?.addEventListener("click",()=>{this.collapsed=!this.collapsed})}#t(){const e=this._draftValue.trim();e&&(this.dispatchEvent(new CustomEvent("ars-chat-panel:send",{bubbles:!0,composed:!0,detail:{message:e}})),this._draftValue="",this.#e())}static#r(e){return String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}static#s(){return'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>'}static#n(){return'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>'}static#i(){return'<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>'}static#a(){return`
      :host {
        display: block;
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
        font-family: var(--arswc-font-family-sans, system-ui, sans-serif);
      }

      .panel {
        box-sizing: border-box;
        position: relative;
        display: grid;
        grid-template-rows: auto minmax(0, 1fr) auto auto;
        gap: var(--arswc-spacing-sm, 8px);
        width: 100%;
        height: 100%;
        padding: var(--arswc-spacing-md, 16px);
        border: 1px solid var(--arswc-color-border, #d5dde8);
        border-radius: var(--arswc-radius-md, 10px);
        background: var(--arswc-color-surface, #f6f8fb);
        color: var(--arswc-color-text, #1b2430);
        transition: transform 280ms cubic-bezier(0.4, 0, 0.2, 1);
      }

      .panel.collapsed {
        transform: translateX(100%);
        pointer-events: none;
      }

      .panel.has-collapse-toggle .header {
        padding-left: 36px;
      }

      .collapse-toggle {
        position: absolute;
        left: 8px;
        top: 12px;
        width: 32px;
        height: 32px;
        display: grid;
        place-items: center;
        border: none;
        border-radius: var(--arswc-radius-sm, 6px);
        background: color-mix(in srgb, var(--arswc-color-accent, #2563eb) 15%, transparent);
        color: var(--arswc-color-accent, #2563eb);
        cursor: pointer;
        pointer-events: auto;
        z-index: 1;
        box-sizing: border-box;
        transition: background 120ms ease, color 120ms ease, left 280ms cubic-bezier(0.4, 0, 0.2, 1);
      }

      .collapse-toggle:hover {
        background: color-mix(in srgb, var(--arswc-color-accent, #2563eb) 25%, transparent);
      }

      .collapse-toggle.collapsed {
        /* position, left/right/top are set via inline styles (position:fixed) */
        width: 56px;
        height: 72px;
        border-radius: 10px 0 0 10px;
        background: var(--arswc-color-surface, #f6f8fb);
        border: 1px solid var(--arswc-color-border, #d5dde8);
        border-right: none;
      }

      .header {
        display: flex;
        align-items: start;
        justify-content: space-between;
        gap: var(--arswc-spacing-sm, 8px);
      }

      .title {
        font-size: var(--arswc-font-size-md, 0.875rem);
        font-weight: 700;
      }

      .subtitle {
        margin-top: 4px;
        color: var(--arswc-color-muted, #64748b);
        font-size: var(--arswc-font-size-sm, 0.75rem);
        line-height: 1.35;
      }

      .clear {
        border: 1px solid var(--arswc-color-danger, #dc2626);
        border-radius: 999px;
        padding: var(--arswc-spacing-sm, 8px) var(--arswc-spacing-md, 16px);
        background: color-mix(in srgb, var(--arswc-color-danger, #dc2626) 10%, transparent);
        color: var(--arswc-color-danger, #dc2626);
        cursor: pointer;
        font: inherit;
        font-size: var(--arswc-font-size-sm, 0.75rem);
      }

      /* .clear:disabled intentionally unstyled — the component already
         sets disabled=true functionally; we keep the visual appearance
         unchanged so the UI doesn't flicker during agent typing. */

      .messages {
        overflow: auto;
        display: grid;
        align-content: start;
        gap: var(--arswc-spacing-sm, 8px);
        min-height: 0;
        padding-right: 4px;
      }

      .message {
        padding: var(--arswc-spacing-sm, 8px) var(--arswc-spacing-md, 16px);
        border-radius: var(--arswc-radius-md, 10px);
        line-height: 1.45;
        white-space: pre-wrap;
        word-break: break-word;
        border: 1px solid var(--arswc-color-border, #d5dde8);
      }

      .message-user {
        background: color-mix(in srgb, var(--arswc-color-accent, #2563eb) 15%, transparent);
        color: var(--arswc-color-accent, #2563eb);
        justify-self: end;
      }

      .message-assistant {
        background: var(--arswc-color-bg, #ffffff);
        color: var(--arswc-color-text, #1b2430);
      }

      .message-system {
        background: var(--arswc-color-surface, #f6f8fb);
        color: var(--arswc-color-muted, #64748b);
      }

      .input-row {
        position: relative;
        display: flex;
        align-items: flex-end;
      }

      textarea {
        box-sizing: border-box;
        width: 100%;
        min-height: 40px;
        max-height: 120px;
        padding: var(--arswc-spacing-sm, 8px) 44px var(--arswc-spacing-sm, 8px) var(--arswc-spacing-md, 16px);
        border: 1px solid var(--arswc-color-border, #d5dde8);
        border-radius: var(--arswc-radius-sm, 6px);
        background: var(--arswc-color-bg, #ffffff);
        color: var(--arswc-color-text, #1b2430);
        font: inherit;
        resize: none;
        outline: none;
        line-height: 1.4;
      }

      textarea:focus-visible {
        outline: none;
        border-color: var(--arswc-color-accent, #2563eb);
        box-shadow: var(--arswc-focus-ring, 0 0 0 3px rgba(37, 99, 235, 0.3));
      }

      /* textarea:disabled intentionally unstyled — the component already
         sets disabled=true functionally; we keep the visual appearance
         unchanged so the UI doesn't flicker during agent typing. */

      button.send {
        position: absolute;
        right: 6px;
        bottom: 6px;
        width: 28px;
        height: 28px;
        padding: 0;
        border: none;
        border-radius: 50%;
        background: linear-gradient(
          180deg,
          var(--arswc-button-primary-bg-start, #3b82f6),
          var(--arswc-button-primary-bg-end, #2563eb)
        );
        color: var(--arswc-button-primary-color, #ffffff);
        cursor: pointer;
        display: grid;
        place-items: center;
      }

      button.send:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .typing {
        color: var(--arswc-color-muted, #64748b);
        font-size: var(--arswc-font-size-sm, 0.75rem);
        min-height: 1.2em;
      }
    `}}class Ee extends HTMLElement{_items=[];static get observedAttributes(){return["title","subtitle","status","active-item"]}constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.#e()}attributeChangedCallback(){this.shadowRoot&&this.#e()}get title(){return this.getAttribute("title")||""}set title(e){this.setAttribute("title",e)}get subtitle(){return this.getAttribute("subtitle")||""}set subtitle(e){this.setAttribute("subtitle",e)}get status(){return this.getAttribute("status")||""}set status(e){this.setAttribute("status",e)}get activeItem(){return this.getAttribute("active-item")||""}set activeItem(e){this.setAttribute("active-item",e)}get items(){return this._items.map(e=>({...e}))}set items(e){this._items=Array.isArray(e)?e.map(t=>({...t})):[],this.shadowRoot&&this.#e()}#e(){if(!this.shadowRoot)return;const e=this._items,t=this.activeItem;this.shadowRoot.innerHTML=`
      <style>${Ee.#r()}</style>
      <section class="toolbar">
        <div class="brand">
          <div class="brand-mark"><slot name="brand-mark"></slot></div>
          <div>
            ${this.title?`<span class="brand-title">${Ee.#t(this.title)}</span>`:""}
            ${this.subtitle?`<span class="brand-subtitle">${Ee.#t(this.subtitle)}</span>`:""}
          </div>
        </div>
        <nav class="nav" aria-label="Toolbar navigation">
          ${e.map(r=>`<button type="button" class="nav-item" data-item-id="${Ee.#t(r.id)}" data-active="${String(r.id===t)}">${Ee.#t(r.label)}</button>`).join("")}
        </nav>
        <div class="trailing">
          ${this.status.trim()?`<div class="status"><slot name="status">${Ee.#t(this.status)}</slot></div>`:""}
          <div class="actions">
            <slot name="actions"></slot>
          </div>
        </div>
      </section>
    `;for(const r of Array.from(this.shadowRoot.querySelectorAll("button[data-item-id]")))r.addEventListener("click",()=>{const s=r.dataset.itemId;s&&this.dispatchEvent(new CustomEvent("ars-toolbar:navigate",{bubbles:!0,composed:!0,detail:{id:s}}))})}static#t(e){return String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}static#r(){return`
      :host {
        display: block;
        width: 100%;
        height: 100%;
        font-family: var(--arswc-font-family-sans, system-ui, sans-serif);
      }

      .toolbar {
        box-sizing: border-box;
        display: grid;
        grid-template-columns: auto 1fr auto;
        align-items: center;
        gap: var(--arswc-spacing-md, 16px);
        width: 100%;
        height: 100%;
        padding: 0 var(--arswc-spacing-md, 16px);
        border: 1px solid var(--arswc-color-border, #d5dde8);
        border-radius: var(--arswc-radius-md, 10px);
        background: var(--arswc-color-surface, #f6f8fb);
        color: var(--arswc-color-text, #1b2430);
      }

      .brand {
        display: flex;
        align-items: center;
        gap: var(--arswc-spacing-sm, 8px);
        min-width: 0;
      }

      .brand-mark {
        display: grid;
        place-items: center;
        flex: 0 0 auto;
      }

      .brand-mark:empty {
        display: none;
      }

      .brand-title {
        display: block;
        font-size: var(--arswc-font-size-md, 0.875rem);
        font-weight: 700;
      }

      .brand-subtitle {
        display: block;
        margin-top: 2px;
        color: var(--arswc-color-muted, #64748b);
        font-size: var(--arswc-font-size-sm, 0.75rem);
      }

      .nav {
        display: flex;
        justify-content: center;
        gap: var(--arswc-spacing-sm, 8px);
        flex-wrap: wrap;
      }

      .nav-item {
        border: 1px solid var(--arswc-color-border, #d5dde8);
        border-radius: 999px;
        padding: var(--arswc-spacing-sm, 8px) var(--arswc-spacing-md, 16px);
        background: var(--arswc-color-bg, #ffffff);
        color: var(--arswc-color-text, #1b2430);
        cursor: pointer;
        font: inherit;
        font-size: var(--arswc-font-size-sm, 0.75rem);
        transition: background var(--arswc-transition-duration, 200ms) ease,
                    border-color var(--arswc-transition-duration, 200ms) ease;
      }

      .nav-item:hover {
        background: var(--arswc-color-surface, #f6f8fb);
        border-color: var(--arswc-color-accent, #2563eb);
      }

      .nav-item[data-active="true"] {
        background: linear-gradient(
          180deg,
          var(--arswc-button-primary-bg-start, #3b82f6),
          var(--arswc-button-primary-bg-end, #2563eb)
        );
        color: var(--arswc-button-primary-color, #ffffff);
        border-color: transparent;
      }

      .trailing {
        display: flex;
        align-items: center;
        gap: var(--arswc-spacing-sm, 8px);
        justify-self: end;
      }

      .status {
        max-width: 240px;
        padding: var(--arswc-spacing-sm, 8px) var(--arswc-spacing-md, 16px);
        border: 1px solid var(--arswc-color-border, #d5dde8);
        border-radius: 999px;
        background: var(--arswc-color-bg, #ffffff);
        color: var(--arswc-color-muted, #64748b);
        font-size: var(--arswc-font-size-sm, 0.75rem);
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .actions {
        display: flex;
        align-items: center;
        gap: var(--arswc-spacing-xs, 4px);
      }

      .actions:empty {
        display: none;
      }

      @media (max-width: 900px) {
        .toolbar {
          grid-template-columns: 1fr;
          justify-items: start;
          align-content: center;
          padding: var(--arswc-spacing-sm, 8px) var(--arswc-spacing-md, 16px);
        }

        .nav {
          justify-content: flex-start;
        }

        .trailing {
          justify-self: stretch;
        }

        .status {
          max-width: none;
          flex: 1 1 auto;
        }
      }
    `}}class Ie extends HTMLElement{_properties={};static get observedAttributes(){return["readonly"]}constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.#e()}attributeChangedCallback(){this.shadowRoot&&this.#e()}get readonly(){return this.hasAttribute("readonly")}set readonly(e){this.toggleAttribute("readonly",e)}get properties(){return{...this._properties}}set properties(e){this._properties=e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{},this.shadowRoot&&this.#e()}addProperty(e="",t=""){const r=this.shadowRoot?.querySelector(".property-list");if(!r)return;const s=r.querySelector(".empty");s&&s.remove();const n=this.#r(e,t);r.appendChild(n),this.#s()}removeProperty(e){if(this.shadowRoot){for(const t of Array.from(this.shadowRoot.querySelectorAll(".property-row")))if(t.querySelector(".prop-key")?.value.trim()===e){t.remove();break}this.#s()}}#e(){if(!this.shadowRoot)return;const e=Object.entries(this._properties),t=this.readonly,r=e.length?e.map(([s,n])=>this.#t(s,n,t)).join(""):t?'<div class="empty">No properties.</div>':"";if(this.shadowRoot.innerHTML=`
      <style>${Ie.#a()}</style>
      <div class="editor">
        <div class="property-toolbar">
          <span class="toolbar-label">Properties</span>
          ${t?"":'<button type="button" class="add-btn">Add Property</button>'}
        </div>
        <div class="property-list">
          ${r}
        </div>
      </div>
    `,!t){this.shadowRoot.querySelector(".add-btn")?.addEventListener("click",()=>{const n=this.shadowRoot?.querySelector(".property-list");if(n){const i=n.querySelector(".empty");i&&i.remove();const l=this.#r("","");n.appendChild(l),this.#s()}});for(const n of Array.from(this.shadowRoot.querySelectorAll(".remove-property-btn")))n.addEventListener("click",()=>{n.closest(".property-row")?.remove(),this.#s()});for(const n of Array.from(this.shadowRoot.querySelectorAll(".prop-key, .prop-value")))n.addEventListener("input",()=>{this.#s()})}}#t(e,t,r){const s=Ie.#i(e),n=Ie.#i(t),i=this.#n("key",e,t),l=this.#n("value",e,t);return`
      <div class="property-row">
        <input id="${i}" type="text" class="prop-key" placeholder="Key" value="${s}" ${r?"readonly":""}>
        <input id="${l}" type="text" class="prop-value" placeholder="Value" value="${n}" ${r?"readonly":""}>
        ${r?"":'<button type="button" class="remove-property-btn" aria-label="Remove property">Remove</button>'}
      </div>
    `}#r(e,t){const r=document.createElement("div");r.className="property-row";const s=Ie.#i(e),n=Ie.#i(t),i=this.#n("key",e,t),l=this.#n("value",e,t),o=this.readonly?"readonly":"",c=this.readonly?"":'<button type="button" class="remove-property-btn" aria-label="Remove property">Remove</button>';if(r.innerHTML=`
      <input id="${i}" type="text" class="prop-key" placeholder="Key" value="${s}" ${o}>
      <input id="${l}" type="text" class="prop-value" placeholder="Value" value="${n}" ${o}>
      ${c}
    `,!this.readonly){r.querySelector(".remove-property-btn")?.addEventListener("click",()=>{r.remove(),this.#s()});for(const d of Array.from(r.querySelectorAll(".prop-key, .prop-value")))d.addEventListener("input",()=>{this.#s()})}return r}#s(){if(!this.shadowRoot)return;const e={};for(const t of Array.from(this.shadowRoot.querySelectorAll(".property-row"))){const r=t.querySelector(".prop-key")?.value.trim()||"",s=t.querySelector(".prop-value")?.value.trim()||"";r&&(e[r]=s)}this._properties=e,this.dispatchEvent(new CustomEvent("ars-property-editor:change",{bubbles:!0,composed:!0,detail:{properties:{...e}}}))}#n(e,t,r){return`${e}-${t}-${r}-${Math.random().toString(36).slice(2,7)}`.toLowerCase().replaceAll(/[^a-z0-9_-]+/g,"-").replaceAll(/-+/g,"-").replaceAll(/^-|-$/g,"")||`${e}-property`}static#i(e){return String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}static#a(){return`
      :host {
        display: block;
        font-family: var(--arswc-font-family-sans, system-ui, sans-serif);
      }

      .editor {
        display: grid;
        gap: var(--arswc-spacing-sm, 8px);
      }

      .property-toolbar {
        display: flex;
        justify-content: space-between;
        gap: var(--arswc-spacing-sm, 8px);
        align-items: center;
      }

      .toolbar-label {
        color: var(--arswc-color-muted, #64748b);
        font-size: var(--arswc-font-size-sm, 0.75rem);
        text-transform: uppercase;
        letter-spacing: 0.06em;
      }

      .property-list {
        display: grid;
        gap: var(--arswc-spacing-sm, 8px);
      }

      .property-row {
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) auto;
        gap: var(--arswc-spacing-sm, 8px);
        align-items: center;
      }

      input {
        min-width: 0;
        padding: var(--arswc-spacing-sm, 8px) var(--arswc-spacing-md, 16px);
        border: 1px solid var(--arswc-color-border, #d5dde8);
        border-radius: var(--arswc-radius-sm, 6px);
        background: var(--arswc-color-bg, #ffffff);
        color: var(--arswc-color-text, #1b2430);
        font: inherit;
      }

      input:focus-visible {
        outline: none;
        border-color: var(--arswc-color-accent, #2563eb);
        box-shadow: var(--arswc-focus-ring, 0 0 0 3px rgba(37, 99, 235, 0.3));
      }

      input:read-only {
        background: var(--arswc-color-disabled-bg, #f3f4f6);
        color: var(--arswc-color-disabled, #9ca3af);
      }

      .add-btn,
      .remove-property-btn {
        border: 1px solid var(--arswc-color-border, #d5dde8);
        border-radius: 999px;
        padding: var(--arswc-spacing-sm, 8px) var(--arswc-spacing-md, 16px);
        background: var(--arswc-color-surface, #f6f8fb);
        color: var(--arswc-color-text, #1b2430);
        cursor: pointer;
        font: inherit;
        font-size: var(--arswc-font-size-sm, 0.75rem);
      }

      .add-btn:hover,
      .remove-property-btn:hover {
        background: var(--arswc-color-bg, #ffffff);
        border-color: var(--arswc-color-accent, #2563eb);
      }

      .remove-property-btn {
        border-color: color-mix(in srgb, var(--arswc-color-danger, #dc2626) 40%, transparent);
        color: var(--arswc-color-danger, #dc2626);
      }

      .remove-property-btn:hover {
        background: color-mix(in srgb, var(--arswc-color-danger, #dc2626) 10%, transparent);
      }

      .empty {
        color: var(--arswc-color-muted, #64748b);
        font-size: var(--arswc-font-size-sm, 0.75rem);
        padding: var(--arswc-spacing-sm, 8px) 0;
      }
    `}}class $e extends HTMLElement{_properties={};_types={};static get observedAttributes(){return["readonly"]}constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.#e()}attributeChangedCallback(){this.shadowRoot&&this.#e()}get readonly(){return this.hasAttribute("readonly")}set readonly(e){this.toggleAttribute("readonly",!!e)}get properties(){return{...this._properties}}set properties(e){this._properties=e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{},this.shadowRoot&&this.#e()}get types(){return{...this._types}}set types(e){this._types=e&&typeof e=="object"&&!Array.isArray(e)?{...e}:{},this.shadowRoot&&this.#e()}#e(){if(!this.shadowRoot)return;const e=Object.entries(this._properties),t=this.readonly,r=e.length?e.map(([s,n])=>this.#t(s,n,t)).join(""):t?'<div class="empty">No properties.</div>':"";if(this.shadowRoot.innerHTML=`
      <style>${$e.#i()}</style>
      <div class="editor">
        <div class="property-list">
          ${r}
        </div>
      </div>
    `,!t)for(const s of Array.from(this.shadowRoot.querySelectorAll(".typed-input")))s.addEventListener("input",()=>{this.#r()})}#t(e,t,r){const s=$e.#n(e),n=$e.#n(t),i=this._types[e]??"string",l=this.#s(e,t);let o="text",c="";switch(i){case"email":o="email";break;case"date":o="date";break;case"time":o="time";break;case"number":o="number";break;case"url":o="url";break;case"tel":o="tel";break;default:o="text"}(o==="date"||o==="time")&&(c=' style="color-scheme:dark;"');const d=s.toLowerCase()==="has_name"?"Name":s;return`
      <div class="property-row" data-prop-key="${s}">
        <label for="${l}">${$e.#n(d)}</label>
        <input id="${l}" type="${o}" value="${n}" class="typed-input" ${r?"readonly":""}${c}>
      </div>
    `}#r(){if(!this.shadowRoot)return;const e={};for(const t of Array.from(this.shadowRoot.querySelectorAll(".property-row"))){const r=t.dataset.propKey??"",s=t.querySelector(".typed-input");r&&s&&(e[r]=s.value.trim())}this._properties=e,this.dispatchEvent(new CustomEvent("ars-typed-property-editor:change",{bubbles:!0,composed:!0,detail:{properties:{...e}}}))}#s(e,t){return`prop-${e}-${t}-${Math.random().toString(36).slice(2,7)}`.toLowerCase().replaceAll(/[^a-z0-9_-]+/g,"-").replaceAll(/-+/g,"-").replaceAll(/^-|-$/g,"")||"prop-field"}static#n(e){return String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}static#i(){return`
      :host {
        display: block;
        font-family: var(--arswc-font-family-sans, system-ui, sans-serif);
      }

      .editor {
        display: grid;
        gap: var(--arswc-spacing-md, 12px);
      }

      .property-list {
        display: grid;
        gap: var(--arswc-spacing-md, 12px);
      }

      .property-row {
        display: grid;
        gap: var(--arswc-spacing-xs, 4px);
      }

      label {
        color: var(--arswc-color-muted, #64748b);
        font-size: var(--arswc-font-size-sm, 0.75rem);
        text-transform: uppercase;
        letter-spacing: 0.06em;
      }

      input {
        width: 100%;
        box-sizing: border-box;
        min-width: 0;
        padding: var(--arswc-spacing-sm, 8px) var(--arswc-spacing-md, 16px);
        border: 1px solid var(--arswc-color-border, #d5dde8);
        border-radius: var(--arswc-radius-sm, 6px);
        background: var(--arswc-color-bg, #ffffff);
        color: var(--arswc-color-text, #1b2430);
        font: inherit;
      }

      input:focus-visible {
        outline: none;
        border-color: var(--arswc-color-accent, #2563eb);
        box-shadow: var(--arswc-focus-ring, 0 0 0 3px rgba(37, 99, 235, 0.3));
      }

      input:read-only {
        background: var(--arswc-color-disabled-bg, #f3f4f6);
        color: var(--arswc-color-disabled, #9ca3af);
      }

      .empty {
        color: var(--arswc-color-muted, #64748b);
        font-size: var(--arswc-font-size-sm, 0.75rem);
        padding: var(--arswc-spacing-sm, 8px) 0;
      }
    `}}class jt extends HTMLElement{static get observedAttributes(){return["variant","size","pill","dot"]}constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.#e()}attributeChangedCallback(){this.shadowRoot&&this.#e()}get variant(){return this.getAttribute("variant")||"neutral"}set variant(e){this.setAttribute("variant",e)}get size(){return this.getAttribute("size")||"md"}set size(e){this.setAttribute("size",e)}get pill(){return this.hasAttribute("pill")}set pill(e){this.toggleAttribute("pill",e)}get dot(){return this.hasAttribute("dot")}set dot(e){this.toggleAttribute("dot",e)}#e(){if(!this.shadowRoot)return;const e=this.variant,t=this.size,r=this.pill,s=this.dot;this.shadowRoot.innerHTML=`
      <style>${jt.#t()}</style>
      <span
        part="badge"
        class="badge badge--${e} badge--${t}${r?" badge--pill":""}${s?" badge--dot":""}"
        aria-hidden="${String(s)}"
      >
        ${s?"":"<slot></slot>"}
      </span>
    `}static#t(){return`
      :host {
        display: inline-flex;
        font-family: var(--arswc-font-family-sans, system-ui, sans-serif);
        vertical-align: middle;
      }

      .badge {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        line-height: 1;
        white-space: nowrap;
        user-select: none;
        border: 1px solid transparent;
      }

      /* --- Sizes --- */
      .badge--sm {
        padding: 2px 6px;
        font-size: 0.65rem;
        min-height: 16px;
      }

      .badge--md {
        padding: 3px 8px;
        font-size: 0.75rem;
        min-height: 20px;
      }

      .badge--lg {
        padding: 4px 10px;
        font-size: 0.875rem;
        min-height: 24px;
      }

      /* --- Pill --- */
      .badge--pill {
        border-radius: 9999px;
      }

      .badge:not(.badge--pill) {
        border-radius: var(--arswc-radius-sm, 6px);
      }

      /* --- Dot --- */
      .badge--dot {
        width: 8px;
        height: 8px;
        padding: 0;
        border-radius: 50%;
        min-height: auto;
      }

      .badge--dot.badge--sm { width: 6px; height: 6px; }
      .badge--dot.badge--lg { width: 10px; height: 10px; }

      /* --- Variants --- */
      .badge--primary {
        background: var(--arswc-color-accent, #2563eb);
        color: var(--arswc-accent-contrast, #ffffff);
      }

      .badge--secondary {
        background: var(--arswc-color-surface, #f6f8fb);
        border-color: var(--arswc-color-border, #d5dde8);
        color: var(--arswc-color-text, #1b2430);
      }

      .badge--success {
        background: #dcfce7;
        border-color: #86efac;
        color: #166534;
      }

      .badge--warning {
        background: #fef3c7;
        border-color: #fcd34d;
        color: #92400e;
      }

      .badge--danger {
        background: #fee2e2;
        border-color: #fca5a5;
        color: #991b1b;
      }

      .badge--info {
        background: #dbeafe;
        border-color: #93c5fd;
        color: #1e3a8a;
      }

      .badge--neutral {
        background: #f3f4f6;
        border-color: #e5e7eb;
        color: #374151;
      }
    `}}class Zt extends HTMLElement{static get observedAttributes(){return["width","height","point-size"]}#e=null;#t=null;constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.#r()}attributeChangedCallback(){this.shadowRoot&&(this.#r(),this.#s())}get width(){const e=this.getAttribute("width");return e?Number(e):100}set width(e){this.setAttribute("width",String(e))}get height(){const e=this.getAttribute("height");return e?Number(e):100}set height(e){this.setAttribute("height",String(e))}get pointSize(){const e=this.getAttribute("point-size");return e?Number(e):2}set pointSize(e){this.setAttribute("point-size",String(e))}setData(e){(!this.#t||!this.#e)&&this.#s();const t=this.#t,r=this.#e;if(!t||!r)return;const s=r.width,n=r.height;t.clearRect(0,0,s,n);for(const i of e)t.fillStyle=i.color,t.beginPath(),t.arc(i.x,i.y,this.pointSize,0,Math.PI*2),t.fill()}clear(){!this.#t||!this.#e||this.#t.clearRect(0,0,this.#e.width,this.#e.height)}#r(){if(!this.shadowRoot)return;const e=this.width,t=this.height;this.shadowRoot.innerHTML=`
      <style>${Zt.#n()}</style>
      <canvas
        part="canvas"
        class="minimap-canvas"
        width="${e}"
        height="${t}"
      ></canvas>
    `,this.#s()}#s(){this.shadowRoot&&(this.#e=this.shadowRoot.querySelector("canvas"),this.#t=this.#e?.getContext("2d")??null)}static#n(){return`
      :host {
        display: inline-block;
        font-family: var(--arswc-font-family-sans, system-ui, sans-serif);
      }
      .minimap-canvas {
        display: block;
        background: var(--arswc-color-surface, #0a0a0a);
        border: 1px solid var(--arswc-color-border, #333333);
        border-radius: var(--arswc-radius-sm, 6px);
      }
    `}}class Jt extends HTMLElement{static get observedAttributes(){return["max-entries","highlight-id"]}constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.#e()}attributeChangedCallback(){this.shadowRoot&&this.#e()}get maxEntries(){const e=this.getAttribute("max-entries");return e?Number(e):10}set maxEntries(e){this.setAttribute("max-entries",String(e))}get highlightId(){return this.getAttribute("highlight-id")??null}set highlightId(e){e===null?this.removeAttribute("highlight-id"):this.setAttribute("highlight-id",String(e))}setEntries(e){if(!this.shadowRoot)return;const r=[...e].sort((n,i)=>i.score-n.score).slice(0,this.maxEntries),s=this.shadowRoot.querySelector("tbody");s&&(s.innerHTML=r.map(n=>`
        <tr
          class="leaderboard__row${String(n.id)===String(this.highlightId)?" leaderboard__row--highlight":""}"
          data-id="${n.id}"
        >
          <td class="leaderboard__name">${this.#t(n.name)}</td>
          <td class="leaderboard__score">${n.score}</td>
          ${n.meta?`<td class="leaderboard__meta">${this.#t(n.meta)}</td>`:""}
        </tr>
      `).join(""))}#e(){this.shadowRoot&&(this.shadowRoot.innerHTML=`
      <style>${Jt.#r()}</style>
      <table part="table" class="leaderboard">
        <thead>
          <tr>
            <th class="leaderboard__header-name">Name</th>
            <th class="leaderboard__header-score">Score</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    `)}#t(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}static#r(){return`
      :host {
        display: block;
        font-family: var(--arswc-font-family-sans, system-ui, sans-serif);
      }

      .leaderboard {
        width: 100%;
        border-collapse: collapse;
        font-size: 0.875rem;
        color: var(--arswc-color-text, #1b2430);
      }

      .leaderboard thead {
        border-bottom: 1px solid var(--arswc-color-border, #d5dde8);
      }

      .leaderboard th {
        text-align: left;
        padding: 8px 12px;
        font-weight: 600;
        color: var(--arswc-color-text-secondary, #5a6a7a);
      }

      .leaderboard__header-score {
        text-align: right;
      }

      .leaderboard td {
        padding: 8px 12px;
        border-bottom: 1px solid var(--arswc-color-border, #f0f0f0);
      }

      .leaderboard__score {
        text-align: right;
        font-variant-numeric: tabular-nums;
        font-weight: 600;
      }

      .leaderboard__row--highlight {
        background: var(--arswc-color-accent-muted, #dbeafe);
      }

      .leaderboard__row--highlight .leaderboard__name {
        color: var(--arswc-color-accent, #2563eb);
        font-weight: 600;
      }
    `}}class Kt extends HTMLElement{static get observedAttributes(){return["src","alt","size","shape","fallback"]}constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.#e(),this.#t()}attributeChangedCallback(e){this.shadowRoot&&(e==="src"?(this.#e(),this.#t()):this.#e())}get src(){return this.getAttribute("src")??""}set src(e){this.setAttribute("src",e)}get alt(){return this.getAttribute("alt")??""}set alt(e){this.setAttribute("alt",e)}get size(){return this.getAttribute("size")||"md"}set size(e){this.setAttribute("size",e)}get shape(){return this.getAttribute("shape")||"circle"}set shape(e){this.setAttribute("shape",e)}get fallback(){return this.getAttribute("fallback")??""}set fallback(e){this.setAttribute("fallback",e)}#e(){if(!this.shadowRoot)return;const e=this.src,t=this.alt,r=this.size,s=this.shape,n=this.fallback,i=e.trim().length>0;this.shadowRoot.innerHTML=`
      <style>${Kt.#r()}</style>
      <div
        part="avatar"
        class="avatar avatar--${r} avatar--${s}"
        role="img"
        aria-label="${t||n||"avatar"}"
      >
        ${i?`<img class="avatar__image" src="${e}" alt="${t}" part="image">`:""}
        <div class="avatar__fallback" part="fallback">
          <slot name="icon"></slot>
          <slot>${n}</slot>
        </div>
      </div>
    `}#t(){if(!this.shadowRoot)return;const e=this.shadowRoot.querySelector("img");if(!e)return;const t=()=>{e.style.display="none";const s=this.shadowRoot?.querySelector(".avatar__fallback");s&&(s.style.display="flex"),this.dispatchEvent(new CustomEvent("ars-avatar:error",{bubbles:!0,composed:!0,detail:{src:this.src}}))},r=()=>{e.style.display="block";const s=this.shadowRoot?.querySelector(".avatar__fallback");s&&(s.style.display="none")};e.addEventListener("error",t),e.addEventListener("load",r),e.complete&&(e.naturalWidth===0?t():r())}static#r(){return`
      :host {
        display: inline-flex;
        font-family: var(--arswc-font-family-sans, system-ui, sans-serif);
      }

      .avatar {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        background: var(--arswc-color-surface, #f6f8fb);
        border: 1px solid var(--arswc-color-border, #d5dde8);
        color: var(--arswc-color-text, #1b2430);
        font-weight: 600;
        line-height: 1;
        user-select: none;
      }

      /* --- Sizes --- */
      .avatar--sm {
        width: 24px;
        height: 24px;
        font-size: 0.625rem;
      }

      .avatar--md {
        width: 40px;
        height: 40px;
        font-size: 0.875rem;
      }

      .avatar--lg {
        width: 56px;
        height: 56px;
        font-size: 1.125rem;
      }

      .avatar--xl {
        width: 80px;
        height: 80px;
        font-size: 1.5rem;
      }

      /* --- Shapes --- */
      .avatar--circle {
        border-radius: 50%;
      }

      .avatar--square {
        border-radius: var(--arswc-radius-sm, 6px);
      }

      .avatar--rounded {
        border-radius: var(--arswc-radius-md, 10px);
      }

      /* --- Image --- */
      .avatar__image {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: none;
      }

      /* --- Fallback --- */
      .avatar__fallback {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        text-transform: uppercase;
        letter-spacing: 0.02em;
      }
    `}}class Qt extends HTMLElement{static get observedAttributes(){return["variant","size","disabled","extended","position"]}constructor(){super(),this.attachShadow({mode:"open",delegatesFocus:!0})}connectedCallback(){this.#e(),this.#t()}attributeChangedCallback(){this.shadowRoot&&(this.#e(),this.#t())}get variant(){return this.getAttribute("variant")||"primary"}set variant(e){this.setAttribute("variant",e)}get size(){return this.getAttribute("size")||"md"}set size(e){this.setAttribute("size",e)}get disabled(){return this.hasAttribute("disabled")}set disabled(e){this.toggleAttribute("disabled",e)}get extended(){return this.hasAttribute("extended")}set extended(e){this.toggleAttribute("extended",e)}get position(){return this.getAttribute("position")||"inline"}set position(e){this.setAttribute("position",e)}#e(){if(!this.shadowRoot)return;const e=this.variant,t=this.size,r=this.disabled,s=this.extended,n=this.position;this.shadowRoot.innerHTML=`
      <style>${Qt.#r()}</style>
      <button
        part="fab"
        class="fab fab--${e} fab--${t}${s?" fab--extended":""} fab--${n}"
        type="button"
        ${r?"disabled":""}
        ${r?'aria-disabled="true"':""}
      >
        <span class="icon"><slot></slot></span>
        ${s?'<span class="label"><slot name="label"></slot></span>':""}
      </button>
    `}#t(){if(!this.shadowRoot)return;const e=this.shadowRoot.querySelector("button");e&&e.addEventListener("click",t=>{if(this.disabled){t.stopImmediatePropagation(),t.preventDefault();return}this.dispatchEvent(new CustomEvent("ars-fab:click",{bubbles:!0,composed:!0,detail:{variant:this.variant}}))})}static#r(){return`
      :host {
        display: inline-flex;
        font-family: var(--arswc-font-family-sans, system-ui, sans-serif);
      }

      :host([disabled]) {
        pointer-events: none;
      }

      .fab {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: var(--arswc-spacing-sm, 8px);
        border: none;
        cursor: pointer;
        font-family: inherit;
        font-weight: 600;
        line-height: 1;
        transition:
          background var(--arswc-transition-duration, 200ms) ease,
          box-shadow var(--arswc-transition-duration, 200ms) ease,
          transform 100ms ease;
        white-space: nowrap;
        user-select: none;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      }

      .fab:focus-visible {
        outline: none;
        box-shadow: var(--arswc-focus-ring, 0 0 0 3px rgba(37, 99, 235, 0.3)), 0 4px 12px rgba(0,0,0,0.15);
      }

      .fab:active:not(:disabled) {
        transform: scale(0.95);
      }

      /* --- Sizes --- */
      .fab--sm {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        font-size: 1rem;
      }

      .fab--sm.fab--extended {
        width: auto;
        padding: 0 14px;
        border-radius: 20px;
      }

      .fab--md {
        width: 56px;
        height: 56px;
        border-radius: 50%;
        font-size: 1.25rem;
      }

      .fab--md.fab--extended {
        width: auto;
        padding: 0 20px;
        border-radius: 28px;
      }

      .fab--lg {
        width: 72px;
        height: 72px;
        border-radius: 50%;
        font-size: 1.5rem;
      }

      .fab--lg.fab--extended {
        width: auto;
        padding: 0 28px;
        border-radius: 36px;
      }

      /* --- Variants --- */
      .fab--primary {
        background: linear-gradient(180deg, #3b82f6, #2563eb);
        color: #ffffff;
      }

      .fab--primary:hover:not(:disabled) {
        background: linear-gradient(180deg, #60a5fa, #3b82f6);
      }

      .fab--secondary {
        background: #ffffff;
        color: var(--arswc-color-text, #1b2430);
        border: 1px solid var(--arswc-color-border, #d5dde8);
      }

      .fab--secondary:hover:not(:disabled) {
        background: var(--arswc-color-surface, #f6f8fb);
      }

      .fab--danger {
        background: var(--arswc-color-danger, #dc2626);
        color: #ffffff;
      }

      .fab--danger:hover:not(:disabled) {
        background: color-mix(in srgb, var(--arswc-color-danger, #dc2626) 85%, black);
      }

      /* --- Disabled --- */
      .fab:disabled {
        background: var(--arswc-color-disabled-bg, #f3f4f6);
        color: var(--arswc-color-disabled, #9ca3af);
        cursor: not-allowed;
        box-shadow: none;
      }

      /* --- Fixed position --- */
      .fab--fixed {
        position: fixed;
        bottom: 24px;
        right: 24px;
        z-index: 100;
      }

      /* --- Icon / Label --- */
      .icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }

      .label {
        font-size: var(--arswc-font-size-md, 0.875rem);
      }
    `}}class er extends HTMLElement{static get observedAttributes(){return["variant","padding","interactive","href"]}constructor(){super(),this.attachShadow({mode:"open",delegatesFocus:!0})}connectedCallback(){this.#e(),this.#t()}attributeChangedCallback(){this.shadowRoot&&(this.#e(),this.#t())}get variant(){return this.getAttribute("variant")||"default"}set variant(e){this.setAttribute("variant",e)}get padding(){return this.getAttribute("padding")||"md"}set padding(e){this.setAttribute("padding",e)}get interactive(){return this.hasAttribute("interactive")}set interactive(e){this.toggleAttribute("interactive",e)}get href(){return this.getAttribute("href")??""}set href(e){this.setAttribute("href",e)}#e(){if(!this.shadowRoot)return;const e=this.variant,t=this.padding,r=this.interactive||this.href.length>0,s=this.href,n=s?"a":"div",i=s?`href="${s}"`:"";this.shadowRoot.innerHTML=`
      <style>${er.#r()}</style>
      <${n}
        part="card"
        class="card card--${e} card--padding-${t}${r?" card--interactive":""}"
        ${i}
      >
        <div class="card__header" part="header">
          <slot name="header"></slot>
        </div>
        <div class="card__media" part="media">
          <slot name="media"></slot>
        </div>
        <div class="card__body" part="body">
          <slot></slot>
        </div>
        <div class="card__actions" part="actions">
          <slot name="actions"></slot>
        </div>
        <div class="card__footer" part="footer">
          <slot name="footer"></slot>
        </div>
      </${n}>
    `}#t(){if(!this.shadowRoot)return;const e=this.shadowRoot.querySelector(".card");e&&e.addEventListener("click",t=>{(this.interactive||this.href)&&this.dispatchEvent(new CustomEvent("ars-card:click",{bubbles:!0,composed:!0,detail:{variant:this.variant,href:this.href}}))})}static#r(){return`
      :host {
        display: block;
        font-family: var(--arswc-font-family-sans, system-ui, sans-serif);
      }

      .card {
        display: flex;
        flex-direction: column;
        width: 100%;
        overflow: hidden;
        transition: box-shadow var(--arswc-transition-duration, 200ms) ease,
                    transform var(--arswc-transition-duration, 200ms) ease;
        text-decoration: none;
        color: inherit;
        background: var(--arswc-color-surface, #ffffff);
      }

      /* --- Variants --- */
      .card--default {
        border: none;
        border-radius: var(--arswc-radius-md, 10px);
        box-shadow: 0 1px 3px rgba(0,0,0,0.08);
      }

      .card--outlined {
        border: 1px solid var(--arswc-color-border, #d5dde8);
        border-radius: var(--arswc-radius-md, 10px);
        box-shadow: none;
      }

      .card--elevated {
        border: none;
        border-radius: var(--arswc-radius-lg, 14px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.10), 0 1px 3px rgba(0,0,0,0.06);
      }

      /* --- Interactive --- */
      .card--interactive {
        cursor: pointer;
      }

      .card--interactive:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(0,0,0,0.12), 0 1px 3px rgba(0,0,0,0.06);
      }

      .card--interactive:focus-visible {
        outline: none;
        box-shadow: var(--arswc-focus-ring, 0 0 0 3px rgba(37, 99, 235, 0.3)),
                    0 8px 24px rgba(0,0,0,0.12);
      }

      .card--interactive:active {
        transform: translateY(0);
      }

      /* --- Padding --- */
      .card--padding-sm .card__header,
      .card--padding-sm .card__body,
      .card--padding-sm .card__actions,
      .card--padding-sm .card__footer {
        padding: 12px;
      }

      .card--padding-md .card__header,
      .card--padding-md .card__body,
      .card--padding-md .card__actions,
      .card--padding-md .card__footer {
        padding: 16px;
      }

      .card--padding-lg .card__header,
      .card--padding-lg .card__body,
      .card--padding-lg .card__actions,
      .card--padding-lg .card__footer {
        padding: 24px;
      }

      .card--padding-none .card__header,
      .card--padding-none .card__body,
      .card--padding-none .card__actions,
      .card--padding-none .card__footer {
        padding: 0;
      }

      /* --- Sections --- */
      .card__header {
        font-weight: 700;
        font-size: 1.125rem;
        color: var(--arswc-color-text, #1b2430);
      }

      .card__header:empty,
      .card__media:empty,
      .card__actions:empty,
      .card__footer:empty {
        display: none;
      }

      .card__media {
        width: 100%;
        overflow: hidden;
        aspect-ratio: 16 / 9;
        background: var(--arswc-color-surface, #f6f8fb);
      }

      .card__media ::slotted(img) {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .card__body {
        flex: 1;
        color: var(--arswc-color-text-muted, #4d5563);
        font-size: var(--arswc-font-size-md, 0.875rem);
        line-height: 1.5;
      }

      .card__actions {
        display: flex;
        align-items: center;
        gap: var(--arswc-spacing-sm, 8px);
        border-top: 1px solid transparent;
      }

      .card__actions:not(:empty) {
        border-top-color: var(--arswc-color-border, #d5dde8);
      }

      .card__footer {
        font-size: var(--arswc-font-size-sm, 0.75rem);
        color: var(--arswc-color-text-muted, #4d5563);
      }
    `}}class tr extends HTMLElement{static get observedAttributes(){return["value"]}constructor(){super(),this.attachShadow({mode:"open",delegatesFocus:!0})}connectedCallback(){this.#e(),this.#t(),this.#r()}attributeChangedCallback(e,t,r){this.shadowRoot&&e==="value"&&(this.#r(),this.dispatchEvent(new CustomEvent("ars-bottom-nav:change",{bubbles:!0,composed:!0,detail:{value:r??""}})))}get value(){return this.getAttribute("value")??""}set value(e){this.setAttribute("value",e)}#e(){this.shadowRoot&&(this.shadowRoot.innerHTML=`
      <style>${tr.#s()}</style>
      <nav part="nav" class="nav" role="tablist" aria-orientation="horizontal">
        <slot></slot>
      </nav>
    `)}#t(){this.shadowRoot&&this.addEventListener("ars-bottom-nav-item:select",e=>{const t=e.detail?.value;t!==void 0&&(this.value=t)})}#r(){const e=this.value,t=Array.from(this.querySelectorAll("ars-bottom-nav-item"));for(const r of t)r.setAttribute("active",r.value===e?"":"false")}static#s(){return`
      :host {
        display: block;
        font-family: var(--arswc-font-family-sans, system-ui, sans-serif);
        position: relative;
      }

      .nav {
        display: flex;
        align-items: stretch;
        justify-content: space-around;
        width: 100%;
        background: var(--arswc-color-surface, #ffffff);
        border-top: 1px solid var(--arswc-color-border, #d5dde8);
        box-shadow: 0 -1px 4px rgba(0,0,0,0.04);
        height: 56px;
        padding: 0;
        margin: 0;
      }
    `}}class rr extends HTMLElement{static get observedAttributes(){return["value","active"]}constructor(){super(),this.attachShadow({mode:"open",delegatesFocus:!0})}connectedCallback(){this.#e(),this.#t()}attributeChangedCallback(){this.shadowRoot&&(this.#e(),this.#t())}get value(){return this.getAttribute("value")??""}set value(e){this.setAttribute("value",e)}get active(){return this.getAttribute("active")!=="false"&&this.hasAttribute("active")}set active(e){e?this.setAttribute("active",""):this.setAttribute("active","false")}#e(){if(!this.shadowRoot)return;const e=this.active;this.shadowRoot.innerHTML=`
      <style>${rr.#r()}</style>
      <button
        part="item"
        class="item${e?" item--active":""}"
        type="button"
        role="tab"
        aria-selected="${String(e)}"
      >
        <span class="icon" part="icon"><slot name="icon"></slot></span>
        <span class="label" part="label"><slot></slot></span>
      </button>
    `}#t(){if(!this.shadowRoot)return;const e=this.shadowRoot.querySelector("button");e&&e.addEventListener("click",()=>{this.dispatchEvent(new CustomEvent("ars-bottom-nav-item:select",{bubbles:!0,composed:!0,detail:{value:this.value}}))})}static#r(){return`
      :host {
        display: flex;
        flex: 1;
        font-family: inherit;
      }

      .item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 2px;
        width: 100%;
        height: 100%;
        border: none;
        background: transparent;
        cursor: pointer;
        font-family: inherit;
        padding: 4px 0;
        color: var(--arswc-color-text-muted, #4d5563);
        transition: color var(--arswc-transition-duration, 200ms) ease;
        position: relative;
      }

      .item:focus-visible {
        outline: none;
        background: var(--arswc-color-surface, #f6f8fb);
        border-radius: var(--arswc-radius-md, 10px);
      }

      .item:active {
        opacity: 0.7;
      }

      .item--active {
        color: var(--arswc-color-accent, #2563eb);
      }

      .item--active::after {
        content: "";
        position: absolute;
        bottom: 4px;
        width: 20px;
        height: 3px;
        border-radius: 2px;
        background: var(--arswc-color-accent, #2563eb);
      }

      .icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: 1.25rem;
        width: 24px;
        height: 24px;
      }

      .label {
        font-size: 0.7rem;
        font-weight: 600;
        line-height: 1;
      }
    `}}class sr extends HTMLElement{#e=[];#t;static get observedAttributes(){return["multiple","max-files","max-size","accept"]}constructor(){super(),this.attachShadow({mode:"open",delegatesFocus:!0})}connectedCallback(){this.#r(),this.#n()}attributeChangedCallback(){this.shadowRoot&&(this.#r(),this.#n())}get multiple(){return this.hasAttribute("multiple")}set multiple(e){this.toggleAttribute("multiple",e)}get maxFiles(){const e=this.getAttribute("max-files");return e?parseInt(e,10):1}set maxFiles(e){this.setAttribute("max-files",String(e))}get maxSize(){const e=this.getAttribute("max-size");return e?parseInt(e,10):5*1024*1024}set maxSize(e){this.setAttribute("max-size",String(e))}get accept(){return this.getAttribute("accept")??"image/*"}set accept(e){this.setAttribute("accept",e)}getFiles(){return[...this.#e]}clear(){this.#e=[],this.#t&&(this.#t.value=""),this.#r(),this.#n(),this.dispatchEvent(new CustomEvent("ars-image-upload:change",{bubbles:!0,composed:!0,detail:{files:this.getFiles()}}))}#r(){if(!this.shadowRoot)return;const e=this.#e.length>0;this.shadowRoot.innerHTML=`
      <style>${sr.#c()}</style>
      <div part="upload" class="upload">
        <div
          part="dropzone"
          class="dropzone"
          tabindex="0"
          role="button"
          aria-label="Upload images"
        >
          <input
            type="file"
            part="input"
            class="input"
            accept="${this.accept}"
            ${this.multiple?"multiple":""}
          />
          <div class="dropzone__content">
            <span class="dropzone__icon">+</span>
            <span class="dropzone__text"><slot>Drop images here or click to browse</slot></span>
            <span class="dropzone__hint"><slot name="hint">Max ${this.maxFiles} file${this.maxFiles>1?"s":""}, up to ${(this.maxSize/1024/1024).toFixed(0)}MB each</slot></span>
          </div>
        </div>
        ${e?`<div class="previews" part="previews">${this.#s()}</div>`:""}
      </div>
    `,this.#t=this.shadowRoot.querySelector('input[type="file"]')??void 0}#s(){return this.#e.map((e,t)=>`
          <div class="preview" part="preview" data-index="${t}">
            <img class="preview__img" alt="${e.name}" />
            <div class="preview__overlay">
              <button type="button" class="preview__remove" data-index="${t}" aria-label="Remove ${e.name}">
                ×
              </button>
            </div>
            <span class="preview__name">${e.name}</span>
          </div>
        `).join("")}#n(){if(!this.shadowRoot)return;const e=this.shadowRoot.querySelector(".dropzone"),t=this.shadowRoot.querySelector('input[type="file"]'),r=this.shadowRoot.querySelectorAll(".preview__remove"),s=o=>{o.target!==t&&t?.click()};e?.addEventListener("click",s),e?.addEventListener("keydown",o=>{o instanceof KeyboardEvent&&(o.key==="Enter"||o.key===" ")&&(o.preventDefault(),t?.click())});const n=o=>{o.preventDefault(),e?.classList.add("dropzone--dragover")},i=()=>{e?.classList.remove("dropzone--dragover")},l=o=>{o.preventDefault(),e?.classList.remove("dropzone--dragover"),o.dataTransfer?.files&&this.#i(o.dataTransfer.files)};e?.addEventListener("dragover",n),e?.addEventListener("dragleave",i),e?.addEventListener("drop",l),t?.addEventListener("change",o=>{const c=o.target;c.files&&this.#i(c.files)}),r.forEach(o=>{o.addEventListener("click",c=>{c.stopPropagation();const d=parseInt(o.dataset.index??"0",10);this.#a(d)})}),this.#o()}#i(e){const t=Array.from(e).filter(l=>this.accept.includes(l.type)||this.accept==="image/*"),r=this.multiple?this.maxFiles-this.#e.length:1-this.#e.length;if(r<=0){this.dispatchEvent(new CustomEvent("ars-image-upload:error",{bubbles:!0,composed:!0,detail:{reason:"max-files"}}));return}const s=t.slice(0,r),n=s.filter(l=>l.size>this.maxSize),i=s.filter(l=>l.size<=this.maxSize);n.length>0&&this.dispatchEvent(new CustomEvent("ars-image-upload:error",{bubbles:!0,composed:!0,detail:{reason:"max-size",file:n[0]}})),this.#e=this.multiple?[...this.#e,...i]:i,this.#r(),this.#n(),this.dispatchEvent(new CustomEvent("ars-image-upload:change",{bubbles:!0,composed:!0,detail:{files:this.getFiles()}}))}#a(e){const t=this.#e[e];this.#e.splice(e,1),this.#r(),this.#n(),this.dispatchEvent(new CustomEvent("ars-image-upload:remove",{bubbles:!0,composed:!0,detail:{file:t,index:e}})),this.dispatchEvent(new CustomEvent("ars-image-upload:change",{bubbles:!0,composed:!0,detail:{files:this.getFiles()}}))}#o(){if(!this.shadowRoot)return;this.shadowRoot.querySelectorAll(".preview__img").forEach((t,r)=>{const s=this.#e[r];if(!s)return;const n=URL.createObjectURL(s);t.src=n,t.onload=()=>URL.revokeObjectURL(n)})}static#c(){return`
      :host {
        display: block;
        font-family: var(--arswc-font-family-sans, system-ui, sans-serif);
      }

      .upload {
        display: flex;
        flex-direction: column;
        gap: var(--arswc-spacing-md, 16px);
      }

      /* --- Dropzone --- */
      .dropzone {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 24px;
        border: 2px dashed var(--arswc-color-border, #d5dde8);
        border-radius: var(--arswc-radius-md, 10px);
        background: var(--arswc-color-surface, #f6f8fb);
        cursor: pointer;
        transition: border-color var(--arswc-transition-duration, 200ms) ease,
                    background var(--arswc-transition-duration, 200ms) ease;
      }

      .dropzone:hover,
      .dropzone:focus-within {
        border-color: var(--arswc-color-accent, #2563eb);
        background: rgba(37, 99, 235, 0.04);
      }

      .dropzone--dragover {
        border-color: var(--arswc-color-accent, #2563eb);
        background: rgba(37, 99, 235, 0.08);
      }

      .dropzone:focus-visible {
        outline: none;
        box-shadow: var(--arswc-focus-ring, 0 0 0 3px rgba(37, 99, 235, 0.3));
      }

      .input {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        cursor: pointer;
      }

      .dropzone__content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 6px;
        pointer-events: none;
      }

      .dropzone__icon {
        font-size: 1.5rem;
        font-weight: 300;
        color: var(--arswc-color-text-muted, #4d5563);
      }

      .dropzone__text {
        font-size: var(--arswc-font-size-md, 0.875rem);
        font-weight: 500;
        color: var(--arswc-color-text, #1b2430);
      }

      .dropzone__hint {
        font-size: var(--arswc-font-size-sm, 0.75rem);
        color: var(--arswc-color-text-muted, #4d5563);
      }

      /* --- Previews --- */
      .previews {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(96px, 1fr));
        gap: var(--arswc-spacing-sm, 8px);
      }

      .preview {
        position: relative;
        aspect-ratio: 1;
        border-radius: var(--arswc-radius-sm, 6px);
        overflow: hidden;
        border: 1px solid var(--arswc-color-border, #d5dde8);
        background: var(--arswc-color-surface, #f6f8fb);
      }

      .preview__img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }

      .preview__overlay {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: flex-start;
        justify-content: flex-end;
        padding: 4px;
        opacity: 0;
        transition: opacity var(--arswc-transition-duration, 200ms) ease;
        background: linear-gradient(180deg, rgba(0,0,0,0.3) 0%, transparent 40%);
      }

      .preview:hover .preview__overlay {
        opacity: 1;
      }

      .preview__remove {
        width: 24px;
        height: 24px;
        border: none;
        border-radius: 50%;
        background: rgba(0,0,0,0.5);
        color: #fff;
        font-size: 1rem;
        line-height: 1;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-bottom: 2px;
        transition: background var(--arswc-transition-duration, 200ms) ease;
      }

      .preview__remove:hover {
        background: rgba(220, 38, 38, 0.8);
      }

      .preview__name {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 4px 6px;
        font-size: 0.625rem;
        font-weight: 500;
        color: var(--arswc-color-text, #1b2430);
        background: rgba(255,255,255,0.85);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    `}}let xe=null,De=null,Be=null;class vt{static async getShared(){if(De)return De;if(xe)return xe;if(Be)return Be;Be=vt._createDevice();try{return xe=await Be,xe}finally{Be=null}}static setDevice(e){De=e}static destroy(){xe&&!De&&xe.destroy(),xe=null,De=null,Be=null}static hasDevice(){return!!(De||xe)}static async _createDevice(){if(!navigator.gpu)throw new Error("ChartGPUContext: WebGPU is not supported in this browser.");const e=await navigator.gpu.requestAdapter();if(!e)throw new Error("ChartGPUContext: failed to obtain GPUAdapter.");return await e.requestDevice()}}const aa=`
struct Uniforms { ortho: mat4x4<f32>, }
struct RectInstance {
    posX: f32, posY: f32, sizeW: f32, sizeH: f32,
    colorR: f32, colorG: f32, colorB: f32, colorA: f32,
    shape: f32,
}
@group(0) @binding(0) var<storage, read> rects: array<RectInstance>;
@group(0) @binding(1) var<uniform> uniforms: Uniforms;
struct VertexOut {
    @builtin(position) pos: vec4<f32>,
    @location(0) color: vec4<f32>,
    @location(1) localUV: vec2<f32>,
    @location(2) shape: f32,
}
const QUAD = array<vec2<f32>, 6>(
    vec2(0.0, 0.0), vec2(1.0, 0.0), vec2(0.0, 1.0),
    vec2(1.0, 0.0), vec2(1.0, 1.0), vec2(0.0, 1.0),
);
@vertex
fn vs(@builtin(vertex_index) vid: u32, @builtin(instance_index) iid: u32) -> VertexOut {
    let r = rects[iid];
    let q = QUAD[vid];
    let pixelPos = vec2(r.posX + q.x * r.sizeW, r.posY + q.y * r.sizeH);
    var out: VertexOut;
    out.pos = uniforms.ortho * vec4(pixelPos, 0.0, 1.0);
    out.color = vec4(r.colorR, r.colorG, r.colorB, r.colorA);
    out.localUV = q;
    out.shape = r.shape;
    return out;
}
@fragment
fn fs(in: VertexOut) -> @location(0) vec4<f32> {
    if (in.shape > 0.5) {
        let d = distance(in.localUV, vec2(0.5, 0.5));
        if (d > 0.5) { discard; }
        let alpha = 1.0 - smoothstep(0.45, 0.5, d);
        return vec4(in.color.rgb, in.color.a * alpha);
    }
    return in.color;
}
`,lt=9,Tt=lt*4,oa=256;class nr{pipeline;bindGroupLayout;device;instanceBuffer;instanceCapacity;instanceData;instanceCount=0;constructor(e,t,r,s,n){this.device=e,this.pipeline=t,this.bindGroupLayout=r,this.instanceBuffer=s,this.instanceCapacity=n,this.instanceData=new Float32Array(n*lt)}static create(e,t,r){const s=e.createShaderModule({label:"chart-rect-shader",code:aa}),n=e.createBindGroupLayout({label:"chart-rect-bind-group-layout",entries:[{binding:0,visibility:GPUShaderStage.VERTEX,buffer:{type:"read-only-storage"}},{binding:1,visibility:GPUShaderStage.VERTEX,buffer:{type:"uniform"}}]}),i=e.createPipelineLayout({label:"chart-rect-pipeline-layout",bindGroupLayouts:[n]}),l=e.createRenderPipeline({label:"chart-rect-pipeline",layout:i,vertex:{module:s,entryPoint:"vs"},fragment:{module:s,entryPoint:"fs",targets:[{format:t,blend:{color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}}}]},primitive:{topology:"triangle-list"}}),o=oa,c=e.createBuffer({label:"chart-rect-instances",size:o*Tt,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST});return new nr(e,l,n,c,o)}reset(){this.instanceCount=0}pushRect(e,t,r,s,n,i,l,o){this._pushInstance(e,t,r,s,n,i,l,o,0)}pushCircle(e,t,r,s,n,i,l){const o=r*2;this._pushInstance(e-r,t-r,o,o,s,n,i,l,1)}flush(e){return this.instanceCount===0?null:(this._ensureCapacity(this.instanceCount),this.device.queue.writeBuffer(this.instanceBuffer,0,this.instanceData.buffer,0,this.instanceCount*Tt),{bindGroup:this.device.createBindGroup({label:"chart-rect-bind-group",layout:this.bindGroupLayout,entries:[{binding:0,resource:{buffer:this.instanceBuffer}},{binding:1,resource:{buffer:e}}]}),vertexCount:6,instanceCount:this.instanceCount})}destroy(){this.instanceBuffer.destroy()}_pushInstance(e,t,r,s,n,i,l,o,c){const d=this.instanceCount*lt;this._ensureCapacity(this.instanceCount+1),this.instanceData[d+0]=e,this.instanceData[d+1]=t,this.instanceData[d+2]=r,this.instanceData[d+3]=s,this.instanceData[d+4]=n,this.instanceData[d+5]=i,this.instanceData[d+6]=l,this.instanceData[d+7]=o,this.instanceData[d+8]=c,this.instanceCount++}_ensureCapacity(e){if(e<=this.instanceCapacity)return;let t=this.instanceCapacity;for(;t<e;)t*=2;const r=new Float32Array(t*lt);r.set(this.instanceData),this.instanceData=r,this.instanceBuffer.destroy(),this.instanceBuffer=this.device.createBuffer({label:"chart-rect-instances",size:t*Tt,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),this.instanceCapacity=t}}const la=`
struct Uniforms { ortho: mat4x4<f32>, }
struct LineInstance {
    x0: f32, y0: f32, x1: f32, y1: f32,
    colorR: f32, colorG: f32, colorB: f32, colorA: f32,
    width: f32, dashLen: f32, gapLen: f32, totalLen: f32,
}
@group(0) @binding(0) var<storage, read> lines: array<LineInstance>;
@group(0) @binding(1) var<uniform> uniforms: Uniforms;
struct VertexOut {
    @builtin(position) pos: vec4<f32>,
    @location(0) color: vec4<f32>,
    @location(1) lineProgress: f32,
    @location(2) dashLen: f32,
    @location(3) gapLen: f32,
}
const QUAD = array<vec2<f32>, 6>(
    vec2(0.0, -0.5), vec2(1.0, -0.5), vec2(0.0, 0.5),
    vec2(1.0, -0.5), vec2(1.0,  0.5), vec2(0.0, 0.5),
);
@vertex
fn vs(@builtin(vertex_index) vid: u32, @builtin(instance_index) iid: u32) -> VertexOut {
    let l = lines[iid];
    let q = QUAD[vid];
    let dir = vec2(l.x1 - l.x0, l.y1 - l.y0);
    let len = length(dir);
    let tangent = select(vec2(1.0, 0.0), dir / len, len > 0.001);
    let normal = vec2(-tangent.y, tangent.x);
    let pixelPos = vec2(l.x0, l.y0) + tangent * q.x * len + normal * q.y * l.width;
    var out: VertexOut;
    out.pos = uniforms.ortho * vec4(pixelPos, 0.0, 1.0);
    out.color = vec4(l.colorR, l.colorG, l.colorB, l.colorA);
    out.lineProgress = q.x * l.totalLen;
    out.dashLen = l.dashLen;
    out.gapLen = l.gapLen;
    return out;
}
@fragment
fn fs(in: VertexOut) -> @location(0) vec4<f32> {
    if (in.dashLen > 0.0) {
        let cycle = in.dashLen + in.gapLen;
        let t = in.lineProgress % cycle;
        if (t > in.dashLen) { discard; }
    }
    return in.color;
}
`,ct=12,Rt=ct*4,ca=256;class ir{pipeline;bindGroupLayout;device;instanceBuffer;instanceCapacity;instanceData;instanceCount=0;constructor(e,t,r,s,n){this.device=e,this.pipeline=t,this.bindGroupLayout=r,this.instanceBuffer=s,this.instanceCapacity=n,this.instanceData=new Float32Array(n*ct)}static create(e,t,r){const s=e.createShaderModule({label:"chart-line-shader",code:la}),n=e.createBindGroupLayout({label:"chart-line-bind-group-layout",entries:[{binding:0,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{type:"read-only-storage"}},{binding:1,visibility:GPUShaderStage.VERTEX,buffer:{type:"uniform"}}]}),i=e.createPipelineLayout({label:"chart-line-pipeline-layout",bindGroupLayouts:[n]}),l=e.createRenderPipeline({label:"chart-line-pipeline",layout:i,vertex:{module:s,entryPoint:"vs"},fragment:{module:s,entryPoint:"fs",targets:[{format:t,blend:{color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}}}]},primitive:{topology:"triangle-list"}}),o=ca,c=e.createBuffer({label:"chart-line-instances",size:o*Rt,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST});return new ir(e,l,n,c,o)}reset(){this.instanceCount=0}pushLine(e,t,r,s,n,i,l,o,c){const d=Math.sqrt((r-e)**2+(s-t)**2);this._pushInstance(e,t,r,s,n,i,l,o,c,0,0,d)}pushDashedLine(e,t,r,s,n,i,l,o,c,d,u){const p=Math.sqrt((r-e)**2+(s-t)**2);this._pushInstance(e,t,r,s,n,i,l,o,c,d,u,p)}flush(e){return this.instanceCount===0?null:(this._ensureCapacity(this.instanceCount),this.device.queue.writeBuffer(this.instanceBuffer,0,this.instanceData.buffer,0,this.instanceCount*Rt),{bindGroup:this.device.createBindGroup({label:"chart-line-bind-group",layout:this.bindGroupLayout,entries:[{binding:0,resource:{buffer:this.instanceBuffer}},{binding:1,resource:{buffer:e}}]}),vertexCount:6,instanceCount:this.instanceCount})}destroy(){this.instanceBuffer.destroy()}_pushInstance(e,t,r,s,n,i,l,o,c,d,u,p){const h=this.instanceCount*ct;this._ensureCapacity(this.instanceCount+1),this.instanceData[h+0]=e,this.instanceData[h+1]=t,this.instanceData[h+2]=r,this.instanceData[h+3]=s,this.instanceData[h+4]=n,this.instanceData[h+5]=i,this.instanceData[h+6]=l,this.instanceData[h+7]=o,this.instanceData[h+8]=c,this.instanceData[h+9]=d,this.instanceData[h+10]=u,this.instanceData[h+11]=p,this.instanceCount++}_ensureCapacity(e){if(e<=this.instanceCapacity)return;let t=this.instanceCapacity;for(;t<e;)t*=2;const r=new Float32Array(t*ct);r.set(this.instanceData),this.instanceData=r,this.instanceBuffer.destroy(),this.instanceBuffer=this.device.createBuffer({label:"chart-line-instances",size:t*Rt,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),this.instanceCapacity=t}}const da=`
struct Uniforms { ortho: mat4x4<f32>, }
struct GlyphInstance {
    posX: f32, posY: f32, sizeW: f32, sizeH: f32,
    u0: f32, v0: f32, u1: f32, v1: f32,
    colorR: f32, colorG: f32, colorB: f32, colorA: f32,
}
@group(0) @binding(0) var<storage, read> glyphs: array<GlyphInstance>;
@group(0) @binding(1) var<uniform> uniforms: Uniforms;
@group(0) @binding(2) var sdfAtlas: texture_2d<f32>;
@group(0) @binding(3) var sdfSampler: sampler;
struct VertexOut {
    @builtin(position) pos: vec4<f32>,
    @location(0) uv: vec2<f32>,
    @location(1) color: vec4<f32>,
}
const QUAD = array<vec2<f32>, 6>(
    vec2(0.0, 0.0), vec2(1.0, 0.0), vec2(0.0, 1.0),
    vec2(1.0, 0.0), vec2(1.0, 1.0), vec2(0.0, 1.0),
);
@vertex
fn vs(@builtin(vertex_index) vid: u32, @builtin(instance_index) iid: u32) -> VertexOut {
    let g = glyphs[iid];
    let q = QUAD[vid];
    let pixelPos = vec2(g.posX + q.x * g.sizeW, g.posY + q.y * g.sizeH);
    var out: VertexOut;
    out.pos = uniforms.ortho * vec4(pixelPos, 0.0, 1.0);
    out.uv = vec2(mix(g.u0, g.u1, q.x), mix(g.v0, g.v1, q.y));
    out.color = vec4(g.colorR, g.colorG, g.colorB, g.colorA);
    return out;
}
@fragment
fn fs(in: VertexOut) -> @location(0) vec4<f32> {
    let dist = textureSample(sdfAtlas, sdfSampler, in.uv).r;
    let edgeWidth = fwidth(dist) * 0.75;
    let alpha = smoothstep(0.5 - edgeWidth, 0.5 + edgeWidth, dist);
    let finalAlpha = alpha * in.color.a;
    if (finalAlpha < 0.01) { discard; }
    return vec4(in.color.rgb, finalAlpha);
}
`,Ne=24,dt=4,_e=512,Xe=1e20,ha="0123456789./-: abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ%+,",ht=12,Pt=ht*4,ua=512;class ar{constructor(e,t,r){this.device=e,this.texture=t,this.textureView=t.createView({label:"chart-glyph-atlas-view"}),this.sampler=r;const s=(Ne+dt*2)**2,n=Ne+dt*2;this.sdfOuterBuf=new Float64Array(s),this.sdfInnerBuf=new Float64Array(s),this.sdfFBuf=new Float64Array(n),this.sdfZBuf=new Float64Array(n+1),this.sdfVBuf=new Uint16Array(n)}texture;textureView;sampler;baseFontSize=Ne;entries=new Map;shelfX=0;shelfY=0;shelfHeight=0;sdfOuterBuf;sdfInnerBuf;sdfFBuf;sdfZBuf;sdfVBuf;static create(e,t="monospace"){const r=e.createTexture({label:"chart-glyph-sdf-atlas",size:{width:_e,height:_e},format:"r8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST}),s=e.createSampler({label:"chart-glyph-sampler",magFilter:"linear",minFilter:"linear"}),n=new ar(e,r,s);for(const i of ha)n._generateGlyph(i,t);return n}getEntry(e){return this.entries.get(e)}destroy(){this.texture.destroy()}_generateGlyph(e,t){const r=Ne,s=dt,n=document.createElement("canvas"),i=n.getContext("2d",{willReadFrequently:!0});if(!i)throw new Error("ChartGlyphAtlas: cannot create 2D scratch context");i.font=`${r}px ${t}`;const o=i.measureText(e).width,c=Math.ceil(o)+s*2,d=r+s*2;n.width=c,n.height=d,i.font=`${r}px ${t}`,i.fillStyle="#fff",i.textBaseline="alphabetic",i.textAlign="left",i.fillText(e,s,r+s*.5);const p=i.getImageData(0,0,c,d).data,h=c*d;this._ensureScratchBuffers(h,Math.max(c,d));const g=this.sdfOuterBuf,f=this.sdfInnerBuf;for(let x=0;x<h;x++){const _=p[x*4+3]/255;g[x]=_===0?Xe:_<1?(.5-_)**2:0,f[x]=_===1?Xe:_>0?(_-.5)**2:0}this._edt2d(g,c,d),this._edt2d(f,c,d);const m=new Uint8Array(h);for(let x=0;x<h;x++){const _=Math.sqrt(g[x])-Math.sqrt(f[x]);m[x]=Math.max(0,Math.min(255,Math.round(128-128*(_/s))))}if(this.shelfX+c>_e&&(this.shelfY+=this.shelfHeight,this.shelfX=0,this.shelfHeight=0),this.shelfY+d>_e)throw new Error(`ChartGlyphAtlas: atlas full — cannot fit "${e}".`);const b=this.shelfX,v=this.shelfY;this.shelfX+=c,d>this.shelfHeight&&(this.shelfHeight=d),this.device.queue.writeTexture({texture:this.texture,origin:{x:b,y:v}},m,{bytesPerRow:c,rowsPerImage:d},{width:c,height:d});const w={uv:[b/_e,v/_e,(b+c)/_e,(v+d)/_e],glyphWidth:c,glyphHeight:d,advance:o,bearingY:r+s*.5};this.entries.set(e,w)}_ensureScratchBuffers(e,t){this.sdfOuterBuf.length<e&&(this.sdfOuterBuf=new Float64Array(e),this.sdfInnerBuf=new Float64Array(e)),this.sdfFBuf.length<t&&(this.sdfFBuf=new Float64Array(t),this.sdfZBuf=new Float64Array(t+1),this.sdfVBuf=new Uint16Array(t))}_edt2d(e,t,r){for(let s=0;s<r;s++)this._edt1d(e,s*t,1,t);for(let s=0;s<t;s++)this._edt1d(e,s,t,r)}_edt1d(e,t,r,s){const n=this.sdfFBuf,i=this.sdfZBuf,l=this.sdfVBuf;for(let c=0;c<s;c++)n[c]=e[t+c*r];l[0]=0,i[0]=-Xe,i[1]=Xe;let o=0;for(let c=1;c<s;c++){let d;do{const u=l[o];if(d=(n[c]-n[u]+c*c-u*u)/(2*c-2*u),d>i[o])break;o--}while(o>=0);o++,l[o]=c,i[o]=d,i[o+1]=Xe}o=0;for(let c=0;c<s;c++){for(;i[o+1]<c;)o++;const d=l[o],u=c-d;e[t+c*r]=n[d]+u*u}}}class or{pipeline;bindGroupLayout;atlas;device;instanceBuffer;instanceCapacity;instanceData;instanceCount=0;constructor(e,t,r,s,n,i){this.device=e,this.pipeline=t,this.bindGroupLayout=r,this.instanceBuffer=s,this.instanceCapacity=n,this.instanceData=new Float32Array(n*ht),this.atlas=i}static create(e,t,r,s="monospace"){const n=ar.create(e,s),i=e.createShaderModule({label:"chart-text-shader",code:da}),l=e.createBindGroupLayout({label:"chart-text-bind-group-layout",entries:[{binding:0,visibility:GPUShaderStage.VERTEX,buffer:{type:"read-only-storage"}},{binding:1,visibility:GPUShaderStage.VERTEX,buffer:{type:"uniform"}},{binding:2,visibility:GPUShaderStage.FRAGMENT,texture:{sampleType:"float"}},{binding:3,visibility:GPUShaderStage.FRAGMENT,sampler:{}}]}),o=e.createPipelineLayout({label:"chart-text-pipeline-layout",bindGroupLayouts:[l]}),c=e.createRenderPipeline({label:"chart-text-pipeline",layout:o,vertex:{module:i,entryPoint:"vs"},fragment:{module:i,entryPoint:"fs",targets:[{format:t,blend:{color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}}}]},primitive:{topology:"triangle-list"}}),d=ua,u=e.createBuffer({label:"chart-text-instances",size:d*Pt,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST});return new or(e,c,l,u,d,n)}reset(){this.instanceCount=0}pushText(e,t,r,s,n,i,l,o,c,d){const u=o/Ne;let p=0;for(const m of e){const b=this.atlas.getEntry(m);b&&(p+=b.advance*u)}let h=t;c==="center"?h-=p/2:c==="right"&&(h-=p);const g=(Ne+dt*2)*u;let f=r;d==="top"?f=r:d==="middle"?f=r-g/2:d==="bottom"&&(f=r-g);for(const m of e){const b=this.atlas.getEntry(m);if(!b)continue;const v=b.glyphWidth*u,w=b.glyphHeight*u;this._pushGlyph(h,f,v,w,b.uv,s,n,i,l),h+=b.advance*u}}flush(e){return this.instanceCount===0?null:(this._ensureCapacity(this.instanceCount),this.device.queue.writeBuffer(this.instanceBuffer,0,this.instanceData.buffer,0,this.instanceCount*Pt),{bindGroup:this.device.createBindGroup({label:"chart-text-bind-group",layout:this.bindGroupLayout,entries:[{binding:0,resource:{buffer:this.instanceBuffer}},{binding:1,resource:{buffer:e}},{binding:2,resource:this.atlas.textureView},{binding:3,resource:this.atlas.sampler}]}),vertexCount:6,instanceCount:this.instanceCount})}destroy(){this.instanceBuffer.destroy(),this.atlas.destroy()}_pushGlyph(e,t,r,s,n,i,l,o,c){const d=this.instanceCount*ht;this._ensureCapacity(this.instanceCount+1),this.instanceData[d+0]=e,this.instanceData[d+1]=t,this.instanceData[d+2]=r,this.instanceData[d+3]=s,this.instanceData[d+4]=n[0],this.instanceData[d+5]=n[1],this.instanceData[d+6]=n[2],this.instanceData[d+7]=n[3],this.instanceData[d+8]=i,this.instanceData[d+9]=l,this.instanceData[d+10]=o,this.instanceData[d+11]=c,this.instanceCount++}_ensureCapacity(e){if(e<=this.instanceCapacity)return;let t=this.instanceCapacity;for(;t<e;)t*=2;const r=new Float32Array(t*ht);r.set(this.instanceData),this.instanceData=r,this.instanceBuffer.destroy(),this.instanceBuffer=this.device.createBuffer({label:"chart-text-instances",size:t*Pt,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),this.instanceCapacity=t}}const Nr=new Map,pa={transparent:[0,0,0,0],black:[0,0,0,1],white:[1,1,1,1],red:[1,0,0,1],green:[0,.502,0,1],blue:[0,0,1,1]};function Te(a){const e=Nr.get(a);if(e)return e;const t=ga(a.trim());return Nr.set(a,t),t}function ga(a){const e=pa[a.toLowerCase()];if(e)return e;if(a.startsWith("#"))return fa(a);if(a.startsWith("rgb"))return ma(a);throw new Error(`parseCssColor: unsupported color format "${a}"`)}function fa(a){const e=a.slice(1);if(e.length===3){const t=parseInt(e[0]+e[0],16)/255,r=parseInt(e[1]+e[1],16)/255,s=parseInt(e[2]+e[2],16)/255;return[t,r,s,1]}if(e.length===6){const t=parseInt(e.slice(0,2),16)/255,r=parseInt(e.slice(2,4),16)/255,s=parseInt(e.slice(4,6),16)/255;return[t,r,s,1]}if(e.length===8){const t=parseInt(e.slice(0,2),16)/255,r=parseInt(e.slice(2,4),16)/255,s=parseInt(e.slice(4,6),16)/255,n=parseInt(e.slice(6,8),16)/255;return[t,r,s,n]}throw new Error(`parseCssColor: invalid hex format "${a}"`)}function ma(a){const e=a.match(/rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*(?:,\s*([\d.]+)\s*)?\)/);if(!e)throw new Error(`parseCssColor: cannot parse "${a}"`);const t=Number(e[1])/255,r=Number(e[2])/255,s=Number(e[3])/255,n=e[4]!==void 0?Number(e[4]):1;return[t,r,s,n]}const ba=64;class lr{device;format;uniformBuffer;uniformData=new Float32Array(16);rectPipeline;linePipeline;textPipeline;_clearColor=[0,0,0,1];_width=0;_height=0;_inFrame=!1;constructor(e,t,r,s,n,i){this.device=e,this.format=t,this.uniformBuffer=r,this.rectPipeline=s,this.linePipeline=n,this.textPipeline=i}static create(e,t){const r=e.createBuffer({label:"chart-ortho-uniform",size:ba,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),s=nr.create(e,t,r),n=ir.create(e,t,r),i=or.create(e,t,r);return new lr(e,t,r,s,n,i)}beginFrame(e,t,r){this._width=e,this._height=t,this._clearColor=r,this._inFrame=!0,this.rectPipeline.reset(),this.linePipeline.reset(),this.textPipeline.reset();const s=this.uniformData;s.fill(0),s[0]=2/e,s[5]=-2/t,s[10]=1,s[12]=-1,s[13]=1,s[15]=1}pushRect(e,t,r,s,n){const[i,l,o,c]=Te(n);this.rectPipeline.pushRect(e,t,r,s,i,l,o,c)}pushCircle(e,t,r,s){const[n,i,l,o]=Te(s);this.rectPipeline.pushCircle(e,t,r,n,i,l,o)}pushLine(e,t,r,s,n,i){const[l,o,c,d]=Te(n);this.linePipeline.pushLine(e,t,r,s,l,o,c,d,i)}pushDashedLine(e,t,r,s,n,i,l,o){const[c,d,u,p]=Te(n);this.linePipeline.pushDashedLine(e,t,r,s,c,d,u,p,i,l,o)}pushText(e,t,r,s,n,i="left",l="top"){const[o,c,d,u]=Te(s);this.textPipeline.pushText(e,t,r,o,c,d,u,n,i,l)}endFrame(e){if(!this._inFrame)throw new Error("ChartGPURenderer.endFrame: no frame in progress.");this._inFrame=!1,this.device.queue.writeBuffer(this.uniformBuffer,0,this.uniformData);const t=this.rectPipeline.flush(this.uniformBuffer),r=this.linePipeline.flush(this.uniformBuffer),s=this.textPipeline.flush(this.uniformBuffer),n=this.device.createCommandEncoder({label:"chart-frame"}),[i,l,o,c]=this._clearColor,d=n.beginRenderPass({label:"chart-render-pass",colorAttachments:[{view:e,clearValue:{r:i,g:l,b:o,a:c},loadOp:"clear",storeOp:"store"}]});t&&(d.setPipeline(this.rectPipeline.pipeline),d.setBindGroup(0,t.bindGroup),d.draw(t.vertexCount,t.instanceCount)),r&&(d.setPipeline(this.linePipeline.pipeline),d.setBindGroup(0,r.bindGroup),d.draw(r.vertexCount,r.instanceCount)),s&&(d.setPipeline(this.textPipeline.pipeline),d.setBindGroup(0,s.bindGroup),d.draw(s.vertexCount,s.instanceCount)),d.end(),this.device.queue.submit([n.finish()])}destroy(){this.rectPipeline.destroy(),this.linePipeline.destroy(),this.textPipeline.destroy(),this.uniformBuffer.destroy()}}const va=a=>{try{return JSON.parse(a)}catch{return a}},pe=(a,e,t,r,s)=>t===e?(r+s)/2:r+(a-e)/(t-e)*(s-r),ds=(a,e,t)=>{if(t<2)return[a];const r=(e-a)/(t-1);return Array.from({length:t},(s,n)=>a+r*n)},ya=a=>Number.isInteger(a)?String(a):a.toFixed(2).replace(/\.?0+$/,""),wa=a=>{const e=new Date(a);return`${e.getMonth()+1}/${e.getDate()}`},xa={top:12,right:12,bottom:28,left:48};class yt extends re{gpuRenderer=null;_gpuCanvasCtx=null;_externalDevice=null;_gpuInitPromise=null;_gpuReady=!1;constructor(){super(),this.shadowRoot||this.attachShadow({mode:"open"})}set gpuDevice(e){this._externalDevice=e,e&&vt.setDevice(e)}get gpuDevice(){return this._externalDevice}static get observedAttributes(){return["width","height"]}attributeChangedCallback(e,t,r){this.scheduleRepaint()}connectedCallback(){this.scheduleRepaint()}getChartWidth(){const e=this.getAttribute("width");return e?Number(e):320}getChartHeight(){const e=this.getAttribute("height");return e?Number(e):180}getPadding(){return{...xa}}async initGPU(){if(!this._gpuReady){if(this._gpuInitPromise)return this._gpuInitPromise;this._gpuInitPromise=this._doInitGPU(),await this._gpuInitPromise,this._gpuInitPromise=null,this._gpuReady=!0}}async _doInitGPU(){const e=await vt.getShared(),t=this._ensureGPUCanvas();if(!t)throw new Error("ChartBase: cannot create canvas element");const r=t.getContext("webgpu");if(!r)throw new Error("ChartBase: cannot obtain WebGPU canvas context");const s=navigator.gpu.getPreferredCanvasFormat();r.configure({device:e,format:s,alphaMode:"premultiplied"}),this._gpuCanvasCtx=r,this.gpuRenderer=lr.create(e,s)}getTargetView(){return this._gpuCanvasCtx?this._gpuCanvasCtx.getCurrentTexture().createView():null}_ensureGPUCanvas(){if(!this.shadowRoot)return null;let e=this.shadowRoot.querySelector("canvas");if(!e){this.shadowRoot.innerHTML="";const s=document.createElement("style");s.textContent=":host { display: inline-block; } canvas { display: block; }",this.shadowRoot.appendChild(s),e=document.createElement("canvas"),this.shadowRoot.appendChild(e)}const t=this.getChartWidth(),r=this.getChartHeight();return e.width!==t&&(e.width=t),e.height!==r&&(e.height=r),e}cssVar(e,t){return getComputedStyle(this).getPropertyValue(e).trim()||t}gpuDrawBackground(e,t,r){this.gpuRenderer.pushRect(0,0,e,t,r)}gpuDrawHorizontalGrid(e,t,r,s,n){const i=t/(r-1);for(let l=0;l<r;l++){const o=Math.round(e.top+l*i)+.5;this.gpuRenderer.pushLine(e.left,o,n-e.right,o,s,1)}}gpuDrawYAxisLabels(e,t,r,s,n){for(let i=0;i<t.length;i++){const l=e.top+r-i/(t.length-1)*r;this.gpuRenderer.pushText(ya(t[i]),e.left-6,l,s,n,"right","middle")}}parseJsonAttribute(e,t){const r=this.getAttribute(e);if(r===null||r==="")return t;const s=va(r);return s!==r?s:t}}const _a={top:12,right:12,bottom:32,left:52};class Ea extends yt{#e=[];#t=[];#r=null;#s=null;static get observedAttributes(){return[...yt.observedAttributes,"data","markers","slot-align","line-color","background-color","grid-color","axis-color","grid-lines","show-dots"]}attributeChangedCallback(e,t,r){e==="data"?this.#e=this.parseJsonAttribute("data",[]):e==="markers"&&(this.#t=this.parseJsonAttribute("markers",[])),super.attributeChangedCallback(e,t,r)}get data(){return this.#e}set data(e){this.arraysMatch(e,this.#e)||(this.#e=e,this.#s=null,this.scheduleRepaint())}get dataBuffer(){return this.#s}set dataBuffer(e){this.#s=e,this.scheduleRepaint()}get markers(){return this.#t}set markers(e){this.arraysMatch(e,this.#t,"index")||(this.#t=e,this.scheduleRepaint())}get yDomain(){return this.#r}set yDomain(e){e?.[0]===this.#r?.[0]&&e?.[1]===this.#r?.[1]||(this.#r=e,this.scheduleRepaint())}#n=!1;get slotAlign(){return this.#n||this.getAttribute("slot-align")==="candlestick"}set slotAlign(e){e!==this.#n&&(this.#n=e,this.scheduleRepaint())}getPadding(){return this.slotAlign?{..._a}:super.getPadding()}paint(){if(!this.gpuRenderer){this.initGPU().then(()=>this.scheduleRepaint()).catch(x=>console.error("ArsLineChart: GPU init failed —",x));return}const e=this.gpuRenderer,t=this.getChartWidth(),r=this.getChartHeight(),s=this.getPadding(),n=t-s.left-s.right,i=r-s.top-s.bottom,l=this.getAttribute("background-color")??this.cssVar("--arswc-chart-bg","rgba(8, 12, 16, 0.9)"),o=this.getAttribute("line-color")??this.cssVar("--arswc-chart-line","#f6c453"),c=this.getAttribute("grid-color")??this.cssVar("--arswc-chart-grid","rgba(255, 255, 255, 0.08)"),d=this.getAttribute("axis-color")??this.cssVar("--arswc-chart-axis","rgba(255, 255, 255, 0.5)"),u=Number(this.getAttribute("grid-lines")??5),p=this.getAttribute("show-dots")!=="false",h=10,g=this.#s,f=this.#e,m=g?g.length:f.length,b=x=>g?g[x]:f[x],v=Te(l);if(e.beginFrame(t,r,v),this.gpuDrawBackground(t,r,l),m>0){let x,_;if(this.#r)x=this.#r[0],_=this.#r[1];else{let T=b(0),R=b(0);for(let D=1;D<m;D++){const $=b(D);$<T&&(T=$),$>R&&(R=$)}const z=(R-T)*.08||1;x=T-z,_=R+z}this.gpuDrawHorizontalGrid(s,i,u,c,t);const E=ds(x,_,u);this.gpuDrawYAxisLabels(s,E,i,d,h);const A=this.slotAlign&&m>1,I=T=>m===1?s.left+n/2:A?s.left+(T+.5)/m*n:s.left+T/(m-1)*n,C=Math.min(m,10),N=Math.max(1,Math.floor(m/C));for(let T=0;T<m;T+=N)e.pushText(String(T),I(T),r-s.bottom+6,d,h,"center","top");for(let T=1;T<m;T++){const R=I(T-1),z=s.top+i-pe(b(T-1),x,_,0,i),D=I(T),$=s.top+i-pe(b(T),x,_,0,i);e.pushLine(R,z,D,$,o,2)}if(p)for(let T=0;T<m;T++){const R=I(T),z=s.top+i-pe(b(T),x,_,0,i);e.pushCircle(R,z,3,o)}if(this.#t.length>0&&m>=2){const T=s.top,R=s.top+i;for(const z of this.#t){const D=Math.round(A?I(z.index):s.left+z.index/(m-1)*n)+.5;if(D<s.left||D>t-s.right)continue;const $=z.color??"rgba(92, 128, 196, 0.6)";e.pushDashedLine(D,T,D,R,$,1,4,3),z.label&&e.pushText(z.label,D,T-2,$,9,"center","bottom")}}}const w=this.getTargetView();w&&e.endFrame(w)}}const Sa=(a,e)=>{const t=parseInt(a.slice(1,3),16),r=parseInt(a.slice(3,5),16),s=parseInt(a.slice(5,7),16);return`rgba(${t}, ${r}, ${s}, ${e})`},Ce=6;class Ca extends yt{#e=[];#t=[];#r=[];#s=null;#n=0;#i=[];#a=null;#o=0;static get observedAttributes(){return[...yt.observedAttributes,"data","orders","markers","highlight-range","up-color","down-color","background-color","grid-color","axis-color","volume-opacity","volume-height-ratio","candle-gap","price-tick-count","date-tick-count","order-label-position"]}attributeChangedCallback(e,t,r){e==="data"&&(this.#e=this.parseJsonAttribute("data",[])),e==="orders"&&(this.#t=this.parseJsonAttribute("orders",[])),e==="markers"&&(this.#r=this.parseJsonAttribute("markers",[])),e==="highlight-range"&&(this.#s=this.parseJsonAttribute("highlight-range",null)),super.attributeChangedCallback(e,t,r)}get data(){return this.#e}set data(e){this.arraysMatch(e,this.#e,"time")||(this.#e=e,this.scheduleRepaint())}get orders(){return this.#t}set orders(e){this.arraysMatch(e,this.#t,"price")||(this.#t=e,this.scheduleRepaint())}get markers(){return this.#r}set markers(e){this.arraysMatch(e,this.#r,"index")||(this.#r=e,this.scheduleRepaint())}get highlightRange(){return this.#s}set highlightRange(e){e?.startIndex===this.#s?.startIndex&&e?.endIndex===this.#s?.endIndex||(this.#s=e,this.scheduleRepaint())}get orderStartIndex(){return this.#n}set orderStartIndex(e){e!==this.#n&&(this.#n=e,this.scheduleRepaint())}get indicators(){return this.#i}set indicators(e){this.#i=e,this.scheduleRepaint()}get dataBuffer(){return this.#a}set dataBuffer(e){this.#a=e,this.#o=e?e.length/Ce:0,this.scheduleRepaint()}getChartWidth(){const e=this.getAttribute("width");return e?Number(e):460}getChartHeight(){const e=this.getAttribute("height");return e?Number(e):220}getPadding(){return{top:12,right:12,bottom:32,left:52}}paint(){if(!this.gpuRenderer){this.initGPU().then(()=>this.scheduleRepaint()).catch(S=>console.error("ArsCandlestickChart: GPU init failed —",S));return}const e=this.gpuRenderer,t=this.getChartWidth(),r=this.getChartHeight(),s=this.getPadding(),n=this.getAttribute("background-color")??this.cssVar("--arswc-chart-bg","rgba(8, 12, 16, 0.92)"),i=this.getAttribute("up-color")??this.cssVar("--arswc-chart-up","#5ad68a"),l=this.getAttribute("down-color")??this.cssVar("--arswc-chart-down","#f06b63"),o=this.getAttribute("grid-color")??this.cssVar("--arswc-chart-grid","rgba(255, 255, 255, 0.06)"),c=this.getAttribute("axis-color")??this.cssVar("--arswc-chart-axis","rgba(255, 255, 255, 0.5)"),d=Number(this.getAttribute("volume-opacity")??.35),u=Number(this.getAttribute("volume-height-ratio")??.25),p=Number(this.getAttribute("candle-gap")??.28),h=Number(this.getAttribute("price-tick-count")??5),g=Number(this.getAttribute("date-tick-count")??5),f=10,m=this.#t,b=this.#r,v=this.#s,w=this.#a,x=w?this.#o:this.#e.length,_=this.#e,E=S=>w?w[S*Ce]:_[S].open,A=S=>w?w[S*Ce+1]:_[S].high,I=S=>w?w[S*Ce+2]:_[S].low,C=S=>w?w[S*Ce+3]:_[S].close,N=S=>w?w[S*Ce+4]:_[S].volume,T=S=>w?w[S*Ce+5]:_[S].time,R=t-s.left-s.right,z=r-s.top-s.bottom,D=z*u,$=4,O=z-D-$,fe=Te(n);if(e.beginFrame(t,r,fe),this.gpuDrawBackground(t,r,n),x>0){let S=I(0),H=A(0),F=0;for(let M=0;M<x;M++){const W=I(M),V=A(M),U=N(M);W<S&&(S=W),V>H&&(H=V),U>F&&(F=U)}for(const M of m)M.price<S&&(S=M.price),M.price>H&&(H=M.price);const se=(H-S)*.06||1,ne=S-se,ie=H+se;F=F||1,this.gpuDrawHorizontalGrid(s,O,h,o,t);const He=ds(ne,ie,h);this.gpuDrawYAxisLabels(s,He,O,c,f);const X=R/x,me=X*(1-p);if(v&&v.startIndex<x){const M=v.fillColor??"rgba(80, 140, 220, 0.25)",W=v.borderColor??"rgb(80, 180, 255)",V=s.left+v.startIndex*X,U=s.left+(v.endIndex+1)*X,j=s.top,de=s.top+O+$+D,J=Math.max(1,U-V),Se=Math.max(1,de-j);e.pushRect(V,j,J,Se,M),e.pushLine(V,j+.5,U,j+.5,W,1),e.pushLine(V,de-.5,U,de-.5,W,1)}for(let M=0;M<x;M++){const W=E(M),V=A(M),U=I(M),j=C(M),J=j>=W?i:l,ve=s.left+M*X+X/2,Le=s.top+O-pe(V,ne,ie,0,O),ps=s.top+O-pe(U,ne,ie,0,O),dr=s.top+O-pe(W,ne,ie,0,O),hr=s.top+O-pe(j,ne,ie,0,O);e.pushLine(ve,Le,ve,ps,J,1);const gs=Math.min(dr,hr),fs=Math.max(Math.abs(hr-dr),1);e.pushRect(ve-me/2,gs,me,fs,J)}const cr=Math.round(s.top+O+$/2)+.5;e.pushLine(s.left,cr,t-s.right,cr,o,1);const hs=s.top+O+$;for(let M=0;M<x;M++){const W=E(M),V=C(M),U=N(M),de=V>=W?i:l,J=U/F*D,ve=s.left+M*X+X/2;e.pushRect(ve-me/2,hs+D-J,me,J,Sa(de,d))}const us=Math.max(1,Math.floor(x/g));for(let M=0;M<x;M+=us){const W=s.left+M*X+X/2;e.pushText(wa(T(M)),W,r-s.bottom+6,c,f,"center","top")}if(b.length>0){const M=s.top,W=s.top+O+$+D;for(const V of b){const U=Math.round(s.left+V.index*X+X/2)+.5;if(U<s.left||U>t-s.right)continue;const j=V.color??"rgba(92, 128, 196, 0.6)";e.pushDashedLine(U,M,U,W,j,1,4,3),V.label&&e.pushText(V.label,U,M-2,j,f,"center","bottom")}}if(m.length>0){const M="rgba(255, 170, 70, 0.7)",W="rgba(90, 160, 255, 0.7)",V="rgba(230, 70, 70, 0.75)",U=s.top,j=s.top+O,de=this.#n>0?s.left+this.#n*X:s.left;for(const J of m){const Se=Math.round(s.top+O-pe(J.price,ne,ie,0,O))+.5,ve=Math.max(U,Math.min(j,Se));let Le;J.side==="buy"?Le=W:J.side==="stop_loss"?Le=V:Le=M,e.pushLine(de,ve,t-s.right,ve,Le,1)}}for(const M of this.#i){const W=M.data;if(W.length<2)continue;const V=M.color;for(let U=1;U<W.length&&U<x;U++){const j=s.left+(U-1)*X+X/2,de=s.top+O-pe(W[U-1],ne,ie,0,O),J=s.left+U*X+X/2,Se=s.top+O-pe(W[U],ne,ie,0,O);e.pushLine(j,de,J,Se,V,2)}}}const L=this.getTargetView();L&&e.endFrame(L)}}class Aa extends Pe(){static get observedAttributes(){return["locale","translations"]}constructor(){super(),this._locale="en",this._translations={},this._defaultTranslations={},this._originalTemplate=null}_isValidLocale(e){return typeof e=="string"&&e.trim().length>0}_isValidTranslations(e){return typeof e=="object"&&e!==null}_findTranslation(e,t=this._locale){const r=(i,l)=>{const o=e.split(".");let c=i[l];for(const d of o)if(c&&typeof c=="object")c=c[d];else return null;return c??null};let s=r(this._translations,t)??r(this._defaultTranslations,t);if(s!==null)return s;const n=t.split("-")[0];return n!==t&&(s=r(this._translations,n)??r(this._defaultTranslations,n),s!==null)?s:r(this._translations,"en")??r(this._defaultTranslations,"en")}_interpolate(e,t){return!e||typeof e!="string"||!t?e:e.replace(/\{(\w+)\}/g,(r,s)=>{const n=t[s];return n!==void 0?String(n):r})}setLocale(e){!e||!this._isValidLocale(e)||(this._locale=e,this._loadTranslations(),this._render())}getLocale(){return this._locale}addTranslations(e,t){return!this._isValidLocale(e)||!this._isValidTranslations(t)?!1:(this._translations[e]={...this._translations[e]||{},...t},!0)}setDefaultTranslations(e,t){this._isValidLocale(e)&&this._isValidTranslations(t)&&(this._defaultTranslations[e]={...t})}translate(e,t){const r=this._findTranslation(e);return r?this._interpolate(r,t):e}reloadTranslations(){return this._loadTranslations(),this._render(),!0}_loadTranslations(){this._translations={};const e=this.getAttribute("translations");if(e)try{const t=JSON.parse(e);Object.entries(t).forEach(([r,s])=>this.addTranslations(r,s));return}catch(t){console.error("Invalid translations JSON in attribute",t)}window.globalTranslations&&this._isValidTranslations(window.globalTranslations)&&Object.entries(window.globalTranslations).forEach(([t,r])=>this.addTranslations(t,r))}_render(){const e=this.firstElementChild;if(!e)return;this._originalTemplate||(this._originalTemplate=e.innerHTML);let t=this._originalTemplate;if(t=t.replace(/\[\[localization\.([^\]]+)\]\]/g,(r,s)=>this.translate(s)),e.innerHTML=t,e.hasAttribute&&e.hasAttribute("data-localize-map")){const r=e.getAttribute("data-localize-map");if(!r)return;let s;try{s=JSON.parse(r)}catch(n){console.error("Invalid data-localize-map JSON",n);return}Object.entries(s).forEach(([n,i])=>{let l;Array.isArray(i)?(l=i.map(o=>this.translate(o)),e.setAttribute(n,JSON.stringify(l))):typeof i=="string"&&(l=this.translate(i),e.setAttribute(n,l))})}}connectedCallback(){super.connectedCallback?.();const e=this.getAttribute("locale");this._isValidLocale(e)&&this.setLocale(e),this._loadTranslations();const t=()=>{setTimeout(()=>this._render())};if(this.firstElementChild)t();else{const r=new MutationObserver(()=>{this.firstElementChild&&(r.disconnect(),t())});r.observe(this,{childList:!0})}}disconnectedCallback(){super.disconnectedCallback?.()}attributeChangedCallback(e,t,r){if(super.attributeChangedCallback?.(e,t,r),e==="locale"&&r&&this.setLocale(r),e==="translations"&&(this._loadTranslations(),this._render()),e==="translations"&&r)try{const s=JSON.parse(r);Object.entries(s).forEach(([n,i])=>this.addTranslations(n,i))}catch(s){console.error("Invalid translations JSON",s)}}}class P{static _capturedPointers=new Map;static _redispatchedEvents=new WeakSet;static _scrollPreventionEnabled=!1;static capturePointer(e,t){const r=this._capturedPointers.get(t);if(r&&r!==e)return console.warn(`[PointerCoordinator] Pointer ${t} already captured by ${r.tagName}`),!1;try{return e.setPointerCapture(t),this._capturedPointers.set(t,e),this._preventScrolling(),!0}catch(s){return console.warn("[PointerCoordinator] setPointerCapture failed:",s),!1}}static releasePointer(e,t){if(this._capturedPointers.get(t)===e)try{e.releasePointerCapture(t),this._capturedPointers.delete(t),this._capturedPointers.size===0&&this._allowScrolling()}catch(r){console.warn("[PointerCoordinator] releasePointerCapture failed:",r)}}static isPointerCaptured(e){return this._capturedPointers.has(e)}static getCapturingElement(e){return this._capturedPointers.get(e)||null}static hasPointerCapture(e,t){return this._capturedPointers.get(t)===e}static isRedispatchedEvent(e){return this._redispatchedEvents.has(e)}static markAsRedispatched(e){this._redispatchedEvents.add(e)}static redispatchPointerEvent(e,t,r=null){if(this.isRedispatchedEvent(t))return;const s=new PointerEvent(r||t.type,{pointerId:t.pointerId,clientX:t.clientX,clientY:t.clientY,screenX:t.screenX,screenY:t.screenY,pressure:t.pressure,tiltX:t.tiltX,tiltY:t.tiltY,width:t.width,height:t.height,bubbles:!0,composed:!0,cancelable:!0});this.markAsRedispatched(s),e.dispatchEvent(s)}static _preventScrolling(){if(this._scrollPreventionEnabled)return;this._scrollPreventionEnabled=!0;const e=t=>{this._capturedPointers.size>0&&t.preventDefault()};this._scrollPreventionHandler=e,document.addEventListener("touchmove",e,{passive:!1}),document.addEventListener("wheel",e,{passive:!1})}static _allowScrolling(){this._scrollPreventionEnabled&&(this._scrollPreventionEnabled=!1,this._scrollPreventionEnabled&&(document.removeEventListener("touchmove",this._scrollPreventionEnabled),document.removeEventListener("wheel",this._scrollPreventionHandler),this._scrollPreventionHandler=null))}static clearAllCaptures(){this._capturedPointers.clear(),this._redispatchedEvents=new WeakSet,this._allowScrolling()}static isScrollPrevented(){return this._scrollPreventionEnabled&&this._capturedPointers.size>0}static shouldProcessGesture(e,t,r=10){return Math.sqrt(e*e+t*t)>=r}static setupEarlyGestureDetection(e,t,r){let s=0,n=0,i=!1;const l=d=>{P.isRedispatchedEvent(d)||(s=d.clientX,n=d.clientY,i=!0)},o=d=>{if(!i||P.isRedispatchedEvent(d))return;const u=d.clientX-s,p=d.clientY-n;this.shouldProcessGesture(u,p,t)&&(i=!1,r(d,{startX:s,startY:n,deltaX:u,deltaY:p}))},c=()=>{i=!1};return e.addEventListener("pointerdown",l),e.addEventListener("pointermove",o),e.addEventListener("pointerup",c),e.addEventListener("pointercancel",c),e.addEventListener("pointerleave",c),()=>{e.removeEventListener("pointerdown",l),e.removeEventListener("pointermove",o),e.removeEventListener("pointerup",c),e.removeEventListener("pointercancel",c),e.removeEventListener("pointerleave",c)}}static getDebugInfo(){return{capturedPointers:Array.from(this._capturedPointers.entries()).map(([e,t])=>({pointerId:e,elementTag:t.tagName,elementId:t.id||"no-id"})),totalCaptures:this._capturedPointers.size,scrollPreventionEnabled:this._scrollPreventionEnabled,isScrollPrevented:this.isScrollPrevented()}}}class ka extends Pe(re){static get observedAttributes(){return["drag-threshold"]}constructor(){super(),this._dragStartX=0,this._dragStartY=0,this._dragThreshold=5,this._isDragging=!1,this._dragDistance=0,this.attachShadow({mode:"open"});const e=this.shadowRoot;if(!e)throw new Error("Failed to attach shadow root");e.innerHTML=`
      <style>
        :host {
          display: flex;
          width: 100%;
          height: 100%;
        }
      </style>
      <slot></slot>`,this._pointerDown=!1,this._pointerId=null}_validateThreshold(e){const t=parseInt(e??"");return!isNaN(t)&&t>=0}_calculateDragDistance(e,t){const r=e-this._dragStartX,s=t-this._dragStartY;return Math.sqrt(r*r+s*s)}_determineDragDirection(e,t){const r=Math.abs(e),s=Math.abs(t);return r>s?e>0?"right":"left":t>0?"down":"up"}setDragThreshold(e){this._validateThreshold(e)&&(this._dragThreshold=parseInt(e??""))}onDragStart(e){this.dispatchEvent(new CustomEvent("dragstart",{detail:e,bubbles:!0,composed:!0}))}onDragMove(e){this.dispatchEvent(new CustomEvent("dragmove",{detail:e,bubbles:!0,composed:!0}))}onDragEnd(e){this.dispatchEvent(new CustomEvent("dragend",{detail:e,bubbles:!0,composed:!0}))}connectedCallback(){super.connectedCallback();const e=this.getAttribute("drag-threshold");this._validateThreshold(e)&&(this._dragThreshold=parseInt(e??"")),this.addEventListener("pointerdown",this._handlePointerDown),this.addEventListener("pointermove",this._handlePointerMove),this.addEventListener("pointerup",this._handlePointerUp),this.addEventListener("pointercancel",this._handlePointerUp),this.addEventListener("pointerleave",this._handlePointerUp)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("pointerdown",this._handlePointerDown),this.removeEventListener("pointermove",this._handlePointerMove),this.removeEventListener("pointerup",this._handlePointerUp),this.removeEventListener("pointercancel",this._handlePointerUp),this.removeEventListener("pointerleave",this._handlePointerUp)}attributeChangedCallback(e,t,r){super.attributeChangedCallback(e,t,r),e==="drag-threshold"&&this._validateThreshold(r)&&(this._dragThreshold=parseInt(r??""))}_handlePointerDown=e=>{if(!this._pointerDown){if(!P.isRedispatchedEvent(e)){if(!P.capturePointer(this,e.pointerId))return;P.redispatchPointerEvent(this,e)}if(P.isRedispatchedEvent(e)||P.hasPointerCapture(this,e.pointerId)){if(P.hasPointerCapture(this,e.pointerId)&&P.isRedispatchedEvent(e))return;this._pointerDown=!0,this._pointerId=e.pointerId,this._dragStartX=e.clientX,this._dragStartY=e.clientY,this._isDragging=!1,this._dragDistance=0}}};_handlePointerMove=e=>{if(!this._pointerDown||e.pointerId!==this._pointerId||!P.isRedispatchedEvent(e)&&!P.hasPointerCapture(this,e.pointerId)||P.hasPointerCapture(this,e.pointerId)&&P.isRedispatchedEvent(e))return;P.isRedispatchedEvent(e)||P.redispatchPointerEvent(this,e);const t=this._calculateDragDistance(e.clientX,e.clientY),r=e.clientX-this._dragStartX,s=e.clientY-this._dragStartY;P.shouldProcessGesture(r,s,this._dragThreshold)&&e.preventDefault(),!this._isDragging&&t>=this._dragThreshold&&(this._isDragging=!0,this.onDragStart({startX:this._dragStartX,startY:this._dragStartY,currentX:e.clientX,currentY:e.clientY,deltaX:r,deltaY:s,distance:t,direction:this._determineDragDirection(r,s)})),this._isDragging&&(this._dragDistance=t,this.onDragMove({startX:this._dragStartX,startY:this._dragStartY,currentX:e.clientX,currentY:e.clientY,deltaX:r,deltaY:s,distance:t,direction:this._determineDragDirection(r,s),isDragging:!0}))};_handlePointerUp=e=>{if(!this._pointerDown||e.pointerId!==this._pointerId||!P.isRedispatchedEvent(e)&&!P.hasPointerCapture(this,e.pointerId)||P.hasPointerCapture(this,e.pointerId)&&P.isRedispatchedEvent(e))return;P.isRedispatchedEvent(e)||P.redispatchPointerEvent(this,e),this._pointerDown=!1,P.releasePointer(this,this._pointerId);const t=this._calculateDragDistance(e.clientX,e.clientY),r=e.clientX-this._dragStartX,s=e.clientY-this._dragStartY;this._isDragging&&this.onDragEnd({startX:this._dragStartX,startY:this._dragStartY,endX:e.clientX,endY:e.clientY,deltaX:r,deltaY:s,distance:t,direction:this._determineDragDirection(r,s),wasDragging:!0}),this._isDragging=!1,this._dragDistance=0}}const Oe={TARGET:"target-id",METHOD:"method",LISTEN:"listen",ARGSMAP:"args-map"},Ia="remote-call";class $t extends Pe(){constructor(){super(),this._boundHandlers=[],this._isInitialized=!1}static get observedAttributes(){return Object.values(Oe)}connectedCallback(){super.connectedCallback(),this._isInitialized=!0,this._setupListeners()}disconnectedCallback(){super.disconnectedCallback&&super.disconnectedCallback(),this._removeListeners()}attributeChangedCallback(e,t,r){super.attributeChangedCallback&&super.attributeChangedCallback(e,t,r),this._isInitialized&&t!==r&&Object.values(Oe).includes(e)&&(this._removeListeners(),this._setupListeners())}_buildArgs(e){const t=this.getAttribute(Oe.ARGSMAP);if(!t)return[];let r;try{r=JSON.parse(t)}catch(n){return console.error("Invalid args-map JSON:",n),[]}const s=[];return Object.entries(r).forEach(([n,i])=>{s[i]=e.detail?e.detail[n]:void 0}),s}_setupListeners(){this._removeListeners();const e=(this.getAttribute(Oe.LISTEN)||"").split(",").map(s=>s.trim()).filter(Boolean);if(e.length===0)return;const t=this.findActualTargetComponent();if(!t){console.warn("RemoteCallCallerMixin: no inner target found");return}const r=s=>n=>{const i=this.getAttribute(Oe.TARGET),l=this.getAttribute(Oe.METHOD);if(!i||!l){console.warn("RemoteCallCallerMixin: target-id or method missing");return}const o=this._buildArgs(n);this._callRemote(i,l,...o)};e.forEach(s=>{const n=r();t.addEventListener(s,n),this._boundHandlers.push({evt:s,handler:n,target:t})})}_removeListeners(){this._boundHandlers.forEach(({evt:e,handler:t,target:r})=>{r.removeEventListener(e,t)}),this._boundHandlers=[]}_callRemote(e,t,...r){const s={targetId:e,method:t,args:r,timestamp:Date.now()},n=new CustomEvent(Ia,{detail:s,bubbles:!0,composed:!0});document.dispatchEvent(n)}callRemote(e,t,...r){this._callRemote(e,t,...r)}log(e,t="info"){console[t==="error"?"error":"log"]("[DemoCaller]",e)}}typeof module<"u"?module.exports={RemoteCallCallerMixin:$t}:typeof window<"u"&&(window.RemoteCallCallerMixin=$t);const Lt={ALLOW:"allow",DENY:"deny"},Ur="remote-call";class Ta extends Pe(){static get observedAttributes(){return["id",...Object.values(Lt)]}constructor(){super(),this._boundHandler=this._handleRemoteCall.bind(this)}connectedCallback(){super.connectedCallback&&super.connectedCallback(),document.addEventListener(Ur,this._boundHandler)}disconnectedCallback(){super.disconnectedCallback&&super.disconnectedCallback(),document.removeEventListener(Ur,this._boundHandler)}_parseList(e){const t=(this.getAttribute(e)||"").trim();return t?t.split(",").map(r=>r.trim()).filter(Boolean):null}_handleRemoteCall(e){const{targetId:t,method:r,args:s=[]}=e.detail||{};if(!t||t!==this.id)return;const n=this._parseList(Lt.ALLOW),i=this._parseList(Lt.DENY);if(r.startsWith("_")){console.error(`Cannot call private method: ${r}`);return}if(i&&i.includes(r)){console.warn(`Method ${r} is denied on ${this.id}`);return}if(n&&!n.includes(r)){console.warn(`Method ${r} not in allow list on ${this.id}`);return}const l=this.findActualTargetComponent();if(!l){console.error("RemoteCallReceiverMixin: no inner target");return}if(typeof l[r]!="function"){console.error(`Method ${r} does not exist on wrapped component of ${this.id}`);return}try{l[r](...s)}catch(o){console.error(`Error executing ${r} on wrapped component of ${this.id}:`,o)}}}class Ra extends re{static get observedAttributes(){return["roll-duration"]}constructor(){super(),this._isRolling=!1,this._rollDuration=1e3,this._hoverHandler=null,this._animationTimeout=null,this._cooldownTimeout=null,this._isInCooldown=!1,this.attachShadow({mode:"open"});const e=this.shadowRoot;if(!e)throw new Error("Failed to attach shadow root");e.innerHTML=`
      <style>:host{display:contents}</style><slot></slot>`}roll(){if(this._isRolling||this._isInCooldown)return;this._isRolling=!0,this.emitEvent("roll-started",{duration:this._rollDuration});const e=this.firstElementChild;e?this.triggerRollAnimation(e):this._isRolling=!1}getRollDuration(){const e=this.getAttribute("roll-duration"),t=Number(e);return t>0?t:this._rollDuration}setRollDuration(e){const t=Number(e)||1e3;if(t===this._rollDuration)return;this._rollDuration=t;const r=this.getAttribute("roll-duration");(!r||Number(r)!==t)&&this.setAttribute("roll-duration",String(t)),this.emitEvent("roll-duration-changed",{duration:this._rollDuration})}triggerRollAnimation(e){const t=this.getRollDuration();if(typeof e.animate=="function"){const l=e.animate([{transform:"rotate(0deg)"},{transform:"rotate(360deg)"}],{duration:t,easing:"ease-in-out"});this._animationTimeout&&clearTimeout(this._animationTimeout),l.finished.then(()=>{e.style.transform="",this._animationTimeout=null,this.startCooldown(),this._isRolling=!1,this.emitEvent("roll-completed",{duration:t})}),this._animationTimeout=1;return}const r=e.style.transform||"",s=e.style.transition||"",n=`${r} rotate(359deg)`,i=`transform ${t}ms ease-in-out`;e.style.transition=i,e.style.transform=n,this._animationTimeout&&clearTimeout(this._animationTimeout),this._animationTimeout=setTimeout(()=>{e.style.transform=r,e.style.transition=s,this.startCooldown(),this._isRolling=!1,this._animationTimeout=null,this.emitEvent("roll-completed",{duration:t})},t)}startCooldown(){this._isInCooldown=!0,this._cooldownTimeout&&clearTimeout(this._cooldownTimeout),this._cooldownTimeout=setTimeout(()=>{this._isInCooldown=!1,this._cooldownTimeout=null},500)}connectedCallback(){super.connectedCallback?.();const e=this.getAttribute("roll-duration");e!==null&&this.setRollDuration(e),setTimeout(()=>{this.setupHoverListeners()},0)}attributeChangedCallback(e,t,r){super.attributeChangedCallback?.(e,t,r),e==="roll-duration"&&r&&this.setRollDuration(r)}disconnectedCallback(){super.disconnectedCallback?.(),this.cleanupHoverListeners(),this._animationTimeout&&(clearTimeout(this._animationTimeout),this._animationTimeout=null),this._cooldownTimeout&&(clearTimeout(this._cooldownTimeout),this._cooldownTimeout=null)}setupHoverListeners(){const e=this.firstElementChild;e&&(this.cleanupHoverListeners(),this._hoverHandler=t=>{!this._isRolling&&!this._isInCooldown&&t.target===e&&this.roll()},e.addEventListener("mouseenter",this._hoverHandler))}cleanupHoverListeners(){const e=this.firstElementChild;e&&this._hoverHandler&&(e.removeEventListener("mouseenter",this._hoverHandler),this._hoverHandler=null)}}class Pa extends re{static get observedAttributes(){return["show-if-property"]}constructor(){super(),this._showProperty=null,this._originalDisplay=null,this.attachShadow({mode:"open"});const e=this.shadowRoot;if(!e)throw new Error("Failed to attach shadow root");e.innerHTML=`
      <style>:host{display:contents}</style><slot></slot>`}#e(e){return typeof e=="string"&&e.trim().length>0}#t(e){if(!this.#e(e))return!1;const t=this.firstElementChild;if(!t)return!1;if(e in t)return!!t[e];const r=t.getAttribute(`data-${e}`);if(r!==null)return r==="true"||r==="1";const s=t.getAttribute(e);return s!==null?s==="true"||s==="1":!1}#r(){if(this._originalDisplay===null){const e=this.firstElementChild;if(e){const t=window.getComputedStyle(e);this._originalDisplay=t.display}}}#s(){if(!this._showProperty)return;const e=this.firstElementChild;if(!e)return;this.#r();const t=this.#t(this._showProperty),r=this.hasAttribute("keep-space-when-hidden")||this.keepSpaceWhenHidden;t?(e.style.display=this._originalDisplay||"block",e.style.visibility=""):r?(e.style.display=this._originalDisplay||"block",e.style.visibility="hidden"):(e.style.display="none",e.style.visibility="")}setShowProperty(e){this.#e(e)&&(this._showProperty=e,this.setAttribute("show-if-property",e),this.#s())}getShowProperty(){return this._showProperty}refreshVisibility(){this.#s()}connectedCallback(){super.connectedCallback?.();const e=this.getAttribute("show-if-property");this.#e(e)&&(this._showProperty=e,setTimeout(()=>{this.#s()},0))}attributeChangedCallback(e,t,r){if(super.attributeChangedCallback?.(e,t,r),e==="show-if-property")if(this.#e(r))this._showProperty=r,this.#s();else{this._showProperty=null;const s=this.firstElementChild;s&&(s.style.display=this._originalDisplay||"")}}}class La extends Pe(re){static get observedAttributes(){return["min-swipe-distance","max-swipe-time"]}constructor(){super(),this._touchStartX=0,this._touchStartY=0,this._touchEndX=0,this._touchEndY=0,this._touchStartTime=0,this._minSwipeDistance=30,this._maxSwipeTime=800,this.attachShadow({mode:"open"});const e=this.shadowRoot;if(!e)throw new Error("Failed to attach shadow root");e.innerHTML=`
      <style>
        :host {
          display: flex;
          width: 100%;
          height: 100%;
        }
      </style>
      <slot></slot>`,this._pointerDown=!1,this._pointerId=null}_validateDistance(e){const t=parseInt(e??"");return!isNaN(t)&&t>0}_validateTime(e){const t=parseInt(e??"");return!isNaN(t)&&t>0}_getTouchCoordinates(e){if("touches"in e&&e.touches&&e.touches.length>0){const t=e.touches[0];return{x:t.clientX,y:t.clientY}}else if("changedTouches"in e&&e.changedTouches&&e.changedTouches.length>0){const t=e.changedTouches[0];return{x:t.clientX,y:t.clientY}}else return{x:e.clientX,y:e.clientY}}_calculateSwipeDistance(){const e=this._touchEndX-this._touchStartX,t=this._touchEndY-this._touchStartY;return{deltaX:e,deltaY:t,distance:Math.sqrt(e*e+t*t)}}_calculateSwipeTime(){return Date.now()-this._touchStartTime}_determineSwipeDirection(e,t){const r=Math.abs(e),s=Math.abs(t);return r>s?e>0?"right":"left":t>0?"down":"up"}_isValidSwipe(e,t){return e>=this._minSwipeDistance&&t<=this._maxSwipeTime}_handleTouchStart=e=>{e.preventDefault();const t=this._getTouchCoordinates(e);this._touchStartX=t.x,this._touchStartY=t.y,this._touchStartTime=Date.now()};_handleTouchMove=e=>{e.preventDefault()};_handleTouchEnd=e=>{e.preventDefault();const t=this._getTouchCoordinates(e);this._touchEndX=t.x,this._touchEndY=t.y;const{deltaX:r,deltaY:s,distance:n}=this._calculateSwipeDistance(),i=this._calculateSwipeTime();if(this._isValidSwipe(n,i)){const l=this._determineSwipeDirection(r,s);this.onSwipe(l,{deltaX:r,deltaY:s,distance:n,time:i})}};_handleMouseStart=e=>{const t=this._getTouchCoordinates(e);this._touchStartX=t.x,this._touchStartY=t.y,this._touchStartTime=Date.now()};_handleMouseEnd=e=>{const t=this._getTouchCoordinates(e);this._touchEndX=t.x,this._touchEndY=t.y;const{deltaX:r,deltaY:s,distance:n}=this._calculateSwipeDistance(),i=this._calculateSwipeTime();if(this._isValidSwipe(n,i)){const l=this._determineSwipeDirection(r,s);this.onSwipe(l,{deltaX:r,deltaY:s,distance:n,time:i})}};setMinSwipeDistance(e){this._validateDistance(e)&&(this._minSwipeDistance=parseInt(e))}setMaxSwipeTime(e){this._validateTime(e)&&(this._maxSwipeTime=parseInt(e))}onSwipe(e,t){this.dispatchEvent(new CustomEvent("swipe",{detail:{direction:e,...t},bubbles:!0,composed:!0}))}connectedCallback(){super.connectedCallback();const e=this.getAttribute("min-swipe-distance");this._validateDistance(e)&&(this._minSwipeDistance=parseInt(e??""));const t=this.getAttribute("max-swipe-time");this._validateTime(t)&&(this._maxSwipeTime=parseInt(t??"")),this.addEventListener("pointerdown",this._handlePointerDown),this.addEventListener("pointermove",this._handlePointerMove),this.addEventListener("pointerup",this._handlePointerUp),this.addEventListener("pointercancel",this._handlePointerUp),this.addEventListener("pointerleave",this._handlePointerUp)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("pointerdown",this._handlePointerDown),this.removeEventListener("pointermove",this._handlePointerMove),this.removeEventListener("pointerup",this._handlePointerUp),this.removeEventListener("pointercancel",this._handlePointerUp),this.removeEventListener("pointerleave",this._handlePointerUp)}attributeChangedCallback(e,t,r){super.attributeChangedCallback(e,t,r),e==="min-swipe-distance"&&this._validateDistance(r)?this._minSwipeDistance=parseInt(r??""):e==="max-swipe-time"&&this._validateTime(r)&&(this._maxSwipeTime=parseInt(r??""))}_handlePointerDown=e=>{if(!this._pointerDown){if(!P.isRedispatchedEvent(e)){if(!P.capturePointer(this,e.pointerId))return;P.redispatchPointerEvent(this,e)}if(P.isRedispatchedEvent(e)||P.hasPointerCapture(this,e.pointerId)){if(P.hasPointerCapture(this,e.pointerId)&&P.isRedispatchedEvent(e))return;this._pointerDown=!0,this._pointerId=e.pointerId,this._touchStartX=e.clientX,this._touchStartY=e.clientY,this._touchStartTime=Date.now()}}};_handlePointerMove=e=>{if(!this._pointerDown||e.pointerId!==this._pointerId||!P.isRedispatchedEvent(e)&&!P.hasPointerCapture(this,e.pointerId)||P.hasPointerCapture(this,e.pointerId)&&P.isRedispatchedEvent(e))return;P.isRedispatchedEvent(e)||P.redispatchPointerEvent(this,e);const t=e.clientX-this._touchStartX,r=e.clientY-this._touchStartY,s=Math.sqrt(t*t+r*r);P.shouldProcessGesture(t,r,this._minSwipeDistance/2)&&e.preventDefault(),this.dispatchEvent(new CustomEvent("drag",{detail:{deltaX:t,deltaY:r,distance:s,direction:Math.abs(t)>Math.abs(r)?t>0?"right":"left":r>0?"down":"up"},bubbles:!0,composed:!0}))};_handlePointerUp=e=>{if(!this._pointerDown||e.pointerId!==this._pointerId||!P.isRedispatchedEvent(e)&&!P.hasPointerCapture(this,e.pointerId)||P.hasPointerCapture(this,e.pointerId)&&P.isRedispatchedEvent(e))return;P.isRedispatchedEvent(e)||P.redispatchPointerEvent(this,e),this._pointerDown=!1,P.releasePointer(this,this._pointerId),this._touchEndX=e.clientX,this._touchEndY=e.clientY;const t=this._touchEndX-this._touchStartX,r=this._touchEndY-this._touchStartY,s=Math.sqrt(t*t+r*r),n=Date.now()-this._touchStartTime;if(s>=this._minSwipeDistance&&n<=this._maxSwipeTime){const i=Math.abs(t)>Math.abs(r)?t>0?"right":"left":r>0?"down":"up";this.onSwipe(i,{deltaX:t,deltaY:r,distance:s,time:n})}}}function Ma(){typeof customElements>"u"||(customElements.get("ars-avatar")||customElements.define("ars-avatar",Kt),customElements.get("ars-badge")||customElements.define("ars-badge",jt),customElements.get("ars-bottom-nav")||customElements.define("ars-bottom-nav",tr),customElements.get("ars-bottom-nav-item")||customElements.define("ars-bottom-nav-item",rr),customElements.get("ars-button")||customElements.define("ars-button",Wt),customElements.get("ars-calendar")||customElements.define("ars-calendar",k),customElements.get("ars-candlestick-chart")||customElements.define("ars-candlestick-chart",Ca),customElements.get("ars-card")||customElements.define("ars-card",er),customElements.get("ars-chat-panel")||customElements.define("ars-chat-panel",Z),customElements.get("ars-color-select")||customElements.define("ars-color-select",mt),customElements.get("ars-data-roller")||customElements.define("ars-data-roller",Y),customElements.get("ars-date-picker")||customElements.define("ars-date-picker",Ke),customElements.get("ars-dialog")||customElements.define("ars-dialog",B),customElements.get("ars-fab")||customElements.define("ars-fab",Qt),customElements.get("ars-group")||customElements.define("ars-group",qt),customElements.get("ars-image-upload")||customElements.define("ars-image-upload",sr),customElements.get("ars-info-tile")||customElements.define("ars-info-tile",K),customElements.get("ars-input")||customElements.define("ars-input",le),customElements.get("ars-leaderboard")||customElements.define("ars-leaderboard",Jt),customElements.get("ars-line-chart")||customElements.define("ars-line-chart",Ea),customElements.get("ars-list")||customElements.define("ars-list",Vt),customElements.get("ars-markdown")||customElements.define("ars-markdown",bt),customElements.get("ars-minimap")||customElements.define("ars-minimap",Zt),customElements.get("ars-page-controller")||customElements.define("ars-page-controller",ra),customElements.get("ars-page-controller-internal")||customElements.define("ars-page-controller-internal",ta),customElements.get("ars-page")||customElements.define("ars-page",sa),customElements.get("ars-relational-node")||customElements.define("ars-relational-node",class extends K{}),customElements.get("ars-panel")||customElements.define("ars-panel",Yt),customElements.get("ars-property-editor")||customElements.define("ars-property-editor",Ie),customElements.get("ars-select")||customElements.define("ars-select",ue),customElements.get("ars-table")||customElements.define("ars-table",ke),customElements.get("ars-tab-panel")||customElements.define("ars-tab-panel",na),customElements.get("ars-tabs")||customElements.define("ars-tabs",Fe),customElements.get("ars-toast")||customElements.define("ars-toast",Qe),customElements.get("ars-toggle")||customElements.define("ars-toggle",Xt),customElements.get("ars-toolbar")||customElements.define("ars-toolbar",Ee),customElements.get("ars-typed-property-editor")||customElements.define("ars-typed-property-editor",$e),customElements.get("draggable-mixin")||customElements.define("draggable-mixin",ka),customElements.get("localized-mixin")||customElements.define("localized-mixin",Aa),customElements.get("pressed-effect-mixin")||customElements.define("pressed-effect-mixin",ea),customElements.get("remote-call-caller-mixin")||customElements.define("remote-call-caller-mixin",$t),customElements.get("remote-call-receiver-mixin")||customElements.define("remote-call-receiver-mixin",Ta),customElements.get("roll-mixin")||customElements.define("roll-mixin",Ra),customElements.get("show-if-property-true-mixin")||customElements.define("show-if-property-true-mixin",Pa),customElements.get("swipeable-mixin")||customElements.define("swipeable-mixin",La))}const G={MINIMAP_WIDTH:100,MINIMAP_HEIGHT:100,USER_SHIP_IMAGE:"./game/media/user_ship.png",AI_SHIP_IMAGE:"./game/media/ai_ship.png",SPINNING_LASER_TRAP_IMAGE:"./game/media/spinning_laser_trap.png",LOL_IMAGE:"./game/media/lol.png",TRUMP_IMAGE:"./game/media/trump.png",BONUS_ENERGY_IMAGE:"./game/media/powerupBlue_bolt.png",BONUS_MINE_IMAGE:"whiteParticle.jpg",BONUS_MISSILE_IMAGE:"./game/media/powerupGreen_target.png",LASER_IMAGE:"redParticle.jpg",MINE_IMAGE:"redParticle.jpg",MISSILE_IMAGE:"rocket.jpg",LASER_SPLASH_IMAGE:"circle.jpg",MISSILE_SPLASH_IMAGE:"circle.jpg",MINE_SPLASH_IMAGE:"mineSplash.jpg",SHIP_SPLASH_IMAGE:"circle.jpg",SHIP_SPLASH_ANIMATION_IMAGE_1:"./game/media/animations/explosion/explosion-0.png",SHIP_SPLASH_ANIMATION_IMAGE_2:"./game/media/animations/explosion/explosion-1.png",SHIP_SPLASH_ANIMATION_IMAGE_3:"./game/media/animations/explosion/explosion-3.png",SHIP_SPLASH_ANIMATION_IMAGE_4:"./game/media/animations/explosion/explosion-4.png",SHIP_SPLASH_ANIMATION_IMAGE_5:"./game/media/animations/explosion/explosion-5.png",ALTERNATE_WEAPON_MAX_TIME:250};Object.freeze(G);const nt={ENERGY_BAR_HEIGHT:4,get AMMO_BAR_HEIGHT(){return nt.ENERGY_BAR_HEIGHT},MAX_PLAYERS_TO_SHOW_ON_LEADERBOARD:20,EFFECTS_DESCRIPTION:{images:[{newImageName:"ship.jpg",size:{x:100,y:100},opacity:.5,fillColor:"green",strokeColor:"black",effectsToApply:[{name:"Ship",parameters:{}}]},{newImageName:"aiShip.jpg",size:{x:100,y:100},opacity:.5,fillColor:"red",strokeColor:"black",effectsToApply:[{name:"Ship",parameters:{}}]},{newImageName:"bonusMineImage.jpg",size:{x:30,y:30},effectsToApply:[{name:"RadialGradient",parameters:{startColor:"rgb(255,100,100)",endColor:"black"}}]},{newImageName:"mineSplash.jpg",size:{x:100,y:100},fillColor:"red",strokeColor:"red",effectsToApply:[{name:"Circle",parameters:{}}]},{newImageName:"laserHit.jpg",size:{x:100,y:100},effectsToApply:[{name:"RadialGradient",parameters:{startColor:"yellow",endColor:"grey"}}]},{newImageName:"mineHit.jpg",size:{x:100,y:100},effectsToApply:[{name:"RadialGradient",parameters:{startColor:"yellow",endColor:"red"}}]},{newImageName:"spinningLaserTrap.jpg",size:{x:100,y:100},effectsToApply:[{name:"Star",parameters:{}},{name:"RadialGradient",parameters:{startColor:"white",endColor:"brown"},combineOption:"soft-light"}]},{newImageName:"rocket.jpg",size:{x:100,y:100},opacity:.5,fillColor:"rgb(255,0,0)",strokeColor:"grey",effectsToApply:[{name:"Triangle",parameters:{}},{name:"RadialGradient",parameters:{startColor:"white",endColor:"black"},combineOption:"luminosity"}]}]},LASER_POP_AUDIO_OBJECT_DESCRIPTION:{oldParams:!0,wave_type:3,p_env_attack:0,p_env_sustain:.08022436563863572,p_env_punch:0,p_env_decay:.23691279510391217,p_base_freq:.26585662188679615,p_freq_limit:0,p_freq_ramp:-.5863457047327679,p_freq_dramp:0,p_vib_strength:0,p_vib_speed:0,p_arp_mod:0,p_arp_speed:0,p_duty:0,p_duty_ramp:0,p_repeat_speed:0,p_pha_offset:0,p_pha_ramp:0,p_lpf_freq:1,p_lpf_ramp:0,p_lpf_resonance:0,p_hpf_freq:0,p_hpf_ramp:0,sound_vol:.25,sample_rate:44100,sample_size:8},WEAPON_PRODUCING_AUDIO_OBJECT_DESCRIPTION:{oldParams:!0,wave_type:2,p_env_attack:0,p_env_sustain:.14483694434771308,p_env_punch:0,p_env_decay:.35278586965548164,p_base_freq:.6817844792464577,p_freq_limit:.02040490635021667,p_freq_ramp:-.5091230405971355,p_freq_dramp:0,p_vib_strength:0,p_vib_speed:0,p_arp_mod:0,p_arp_speed:0,p_duty:.0845837320835679,p_duty_ramp:.012015135048022119,p_repeat_speed:0,p_pha_offset:0,p_pha_ramp:0,p_lpf_freq:1,p_lpf_ramp:0,p_lpf_resonance:0,p_hpf_freq:.02674451371380131,p_hpf_ramp:0,sound_vol:.25,sample_rate:44100,sample_size:8},MISSILE_POP_AUDIO_OBJECT_DESCRIPTION:{oldParams:!0,wave_type:3,p_env_attack:0,p_env_sustain:.08022436563863572,p_env_punch:0,p_env_decay:.23691279510391217,p_base_freq:.26585662188679615,p_freq_limit:0,p_freq_ramp:-.5863457047327679,p_freq_dramp:0,p_vib_strength:0,p_vib_speed:0,p_arp_mod:0,p_arp_speed:0,p_duty:0,p_duty_ramp:0,p_repeat_speed:0,p_pha_offset:0,p_pha_ramp:0,p_lpf_freq:1,p_lpf_ramp:0,p_lpf_resonance:0,p_hpf_freq:0,p_hpf_ramp:0,sound_vol:.25,sample_rate:44100,sample_size:8},MISSILE_PRODUCING_AUDIO_OBJECT_DESCRIPTION:{oldParams:!0,wave_type:3,p_env_attack:-.06873276042830324,p_env_sustain:.6909000400797908,p_env_punch:.07590851922922917,p_env_decay:-.23220017006992139,p_base_freq:.020985962373430894,p_freq_limit:0,p_freq_ramp:.19520989986158613,p_freq_dramp:-.02412353405811009,p_vib_strength:.1850887072141922,p_vib_speed:-.023940297090303986,p_arp_mod:-.8889458690122483,p_arp_speed:.8181566488394965,p_duty:-.39713803703321093,p_duty_ramp:.23471033137663327,p_repeat_speed:-.49777590351045053,p_pha_offset:-.279359053282235,p_pha_ramp:-.0412175755843398,p_lpf_freq:.5895989887125194,p_lpf_ramp:-.04407061088230585,p_lpf_resonance:.9030583987855754,p_hpf_freq:5072947087517981e-21,p_hpf_ramp:.6970345163119329,sound_vol:.25,sample_rate:44100,sample_size:8},MINE_POP_AUDIO_OBJECT_DESCRIPTION:{oldParams:!0,wave_type:3,p_env_attack:0,p_env_sustain:.08022436563863572,p_env_punch:0,p_env_decay:.23691279510391217,p_base_freq:.26585662188679615,p_freq_limit:0,p_freq_ramp:-.5863457047327679,p_freq_dramp:0,p_vib_strength:0,p_vib_speed:0,p_arp_mod:0,p_arp_speed:0,p_duty:0,p_duty_ramp:0,p_repeat_speed:0,p_pha_offset:0,p_pha_ramp:0,p_lpf_freq:1,p_lpf_ramp:0,p_lpf_resonance:0,p_hpf_freq:0,p_hpf_ramp:0,sound_vol:.25,sample_rate:44100,sample_size:8},SHIP_DIE_AUDIO_OBJECT_DESCRIPTION:{oldParams:!0,wave_type:3,p_env_attack:0,p_env_sustain:.39956346351767336,p_env_punch:.38814719177821233,p_env_decay:.3496511423767162,p_base_freq:.2363233644996943,p_freq_limit:0,p_freq_ramp:-.2685397376385981,p_freq_dramp:0,p_vib_strength:0,p_vib_speed:0,p_arp_mod:0,p_arp_speed:0,p_duty:0,p_duty_ramp:0,p_repeat_speed:0,p_pha_offset:0,p_pha_ramp:0,p_lpf_freq:1,p_lpf_ramp:0,p_lpf_resonance:0,p_hpf_freq:0,p_hpf_ramp:0,sound_vol:.25,sample_rate:44100,sample_size:8},BONUS_PICKUP_AUDIO_OBJECT_DESCRIPTION:{oldParams:!0,wave_type:2,p_env_attack:0,p_env_sustain:.35623633309423874,p_env_punch:0,p_env_decay:.15942141861536685,p_base_freq:.35404976726528825,p_freq_limit:0,p_freq_ramp:.13842497025364714,p_freq_dramp:0,p_vib_strength:0,p_vib_speed:0,p_arp_mod:0,p_arp_speed:0,p_duty:1,p_duty_ramp:0,p_repeat_speed:.4077185043998148,p_pha_offset:0,p_pha_ramp:0,p_lpf_freq:1,p_lpf_ramp:0,p_lpf_resonance:0,p_hpf_freq:0,p_hpf_ramp:0,sound_vol:.25,sample_rate:44100,sample_size:8}};Object.freeze(nt);const za={draw(a,e,t){if(!e)return;a.save(),a.fillStyle="white",a.textAlign="center";const r=t.getScreen().zoomOutFactor/2,s=e.filter(h=>!!h.name&&typeof h.userScore=="number"&&Number.isFinite(h.userScore)).map(h=>[h.userScore,h.name]);s.sort((h,g)=>g[0]-h[0]);const n=14/r,i=5,l=20,o=n,c=Math.min(s.length,nt.MAX_PLAYERS_TO_SHOW_ON_LEADERBOARD);a.textAlign="left",a.font=`${n}px Arial`,a.fillText("LeaderBoard",i,l);const d=l+o*2,p=`${12/r}px Arial`;for(let h=0;h<c;h++){const g=s[h][1],f=s[h][0];a.fillStyle="white",g===Ba.userName?(a.font="bold "+p,a.fillStyle="yellow"):a.font="normal "+p,a.fillText(`${g} - ${f}`,i,d+o*h)}a.stroke(),a.restore()}};Ma();class Da{beClient;name;userName;agentId;minimapCanvas;minimapIdToBonus;hudCache;constructor(){this.beClient=new ii,this.beClient.getScreen().renderDelayMs=40,this.name="z32",this.userName="",this.agentId=null,this.minimapCanvas=null,this.minimapIdToBonus={},this.hudCache=new Map,this.clearAllData()}clearAllData(){this.userName="",this.agentId=null,this.minimapCanvas=null,this.minimapIdToBonus={},this.hudCache.clear()}yourAgentId(e){this.agentId=e.agentId}hudUpdate(e){if(this.hudCache.clear(),!!e)for(const t of e)this.hudCache.set(t.id,t)}getMinimapData(){return this.minimapIdToBonus}createMinimapCanvas(){const e=this.beClient.getResourceStore();if(this.minimapCanvas=e.retrieveResourceObject(e.createNewImage(G.MINIMAP_WIDTH,G.MINIMAP_HEIGHT)),!this.minimapCanvas)return;const t=this.minimapCanvas.getContext("2d");t&&(t.save(),t.fillStyle="black",t.lineWidth=3,t.fillRect(0,0,G.MINIMAP_WIDTH,G.MINIMAP_HEIGHT),t.restore())}drawMinimapCanvasElement(e,t=!1){y.assert(e&&e.position,"Elements has no position.");const r=this.minimapCanvas?.getContext("2d");if(!r)return;r.save(),r.fillStyle=t?"black":e.color;const s=t?4:2;r.fillRect(e.position.x-s/2,e.position.y-s/2,s,s),r.stroke(),r.restore()}removeElementFromMinimapCanvas(e){this.drawMinimapCanvasElement(e,!0)}addElementToMinimapCanvas(e){this.drawMinimapCanvasElement(e,!1)}getMediaAssets(){return[G.USER_SHIP_IMAGE,G.AI_SHIP_IMAGE,G.SPINNING_LASER_TRAP_IMAGE,G.LOL_IMAGE,G.TRUMP_IMAGE,G.BONUS_ENERGY_IMAGE,G.BONUS_MISSILE_IMAGE,G.SHIP_SPLASH_ANIMATION_IMAGE_1,G.SHIP_SPLASH_ANIMATION_IMAGE_2,G.SHIP_SPLASH_ANIMATION_IMAGE_3,G.SHIP_SPLASH_ANIMATION_IMAGE_4,G.SHIP_SPLASH_ANIMATION_IMAGE_5]}showInitialScreenAndReturnUserName(e){return new Promise(t=>{const r=document.getElementById(e.gameContainerId);if(!r){console.error(`Presentation: Game container '${e.gameContainerId}' not found in HTML.`);const h=ze.getCookie("z32Name")||"Player";t(h);return}const s=e?.config?.version||"0.2.0",n=ze.getCookie("z32LastScore")||"",i=ze.getCookie("z32Name")||"",l=["🚀 Master your ship. Dominate the battlefield!","💥 Destroy enemy ships for massive score boosts!","⛽ Harvest energy from bonuses to power your victory!","🎯 Predict your enemy's moves!","🔋 Control the energy bonuses for long-term advantage!","🏃‍♂️ Stay mobile — a moving target is harder to hit!","⚖️ Balance movement, combat, and harvesting for high scores!","➕ Every point of energy spent brings you closer to the top!","🗺️ Zone control: Dominate key areas for victory!","🏆 Can you climb the leaderboard and become a legend?","👾 Welcome to Z32. Enter your name and play!"];r.innerHTML=`
        <div id="z32-title-screen" style="position:fixed;inset:0;z-index:20;overflow:hidden;background:#000;">
          <div id="highScores" class="topLeftCornerText"></div>
          <div id="versionAndBuild" class="bottomRightCornerText">Version: ${s}</div>
          <div id="formArea" class="centeredForm">
            <div id="logo" class="logo">
              <span id="logoZ" class="logo-z">Z</span>
              <span id="logo32" class="logo-32">32</span>
            </div>
            <div class="centerInputs">
              <input type="text" id="userNameInput" maxlength="20" placeholder="Name"
                autocomplete="off" data-1p-ignore data-lpignore="true" data-bwignore data-form-type="other"
                value="${i}">
              <button id="playButton">Play!</button>
            </div>
            <br>
            <div id="lastScoreArea" style="text-align:center">
              <label class="logo">Last score: ${n}</label>
              <br>
            </div>
            <div class="logo dataRollerText">
              <ars-data-roller id="data-roller" data=""
                interval="3000" animation-duration="500"
                style="display:inline-block;min-width:200px;">
              </ars-data-roller>
            </div>
          </div>
        </div>
      `;const o=document.getElementById("z32-title-screen");let c=null;o&&Li.mount(o,{effects:[{effect:"star-nest",isBackground:!0},{effect:"pixel-art",blockSize:8},{effect:"crt",curvature:.25,scanlineIntensity:.35,scanlineCount:0,vignetteStrength:.6,brightness:1.3}],followMouse:!1,timeScale:.5}).then(h=>{if(!o.isConnected){h.dispose();return}c=h}).catch(h=>{console.warn("Z32: title-screen background shader failed to mount",h)});const d=document.getElementById("data-roller");d&&d.setAttribute("data",JSON.stringify(l));const u=document.getElementById("userNameInput"),p=document.getElementById("playButton");if(u&&p)u.value=i,p.onclick=()=>{const h=u.value.trim()||"Player";ze.setCookie("z32Name",h),c&&(c.dispose(),c=null),r.innerHTML="",t(h)},u.focus();else{console.error("Presentation: Title screen elements not found!");const h=ze.getCookie("z32Name")||"Player";t(h)}})}getEffectsDescription(){return nt.EFFECTS_DESCRIPTION}_clearMinimapCanvas(){const e=this.minimapCanvas?.getContext("2d");e&&(e.save(),e.fillStyle="black",e.fillRect(0,0,G.MINIMAP_WIDTH,G.MINIMAP_HEIGHT),e.restore())}setMinimapData(e){this.minimapIdToBonus={},this._clearMinimapCanvas(),this.addMinimapData(e)}addMinimapData(e){if(!(!e||!e[0]))for(const t of e){const r=t.id,s=t.x,n=t.y,i=t.color,l={position:{x:s,y:n},color:i,getPosition(){return this.position}};if(this.minimapIdToBonus[r]){this.removeElementFromMinimapCanvas(this.minimapIdToBonus[r]),this.addElementToMinimapCanvas(l),this.minimapIdToBonus[r]=l;continue}this.addElementToMinimapCanvas(l),this.minimapIdToBonus[r]=l}}getSoundEffectDescription(e){return nt[e]}removeMinimapData(e){e.forEach(t=>{this.minimapIdToBonus[t]&&(this.removeElementFromMinimapCanvas(this.minimapIdToBonus[t]),delete this.minimapIdToBonus[t])})}getUserAgent(){return null}userIsDead(e){const t=e?.score??0;ze.setCookie("z32LastScore",String(t)),setTimeout(()=>{this.clearAllData(),this.beClient.connectToGameServer()},1e3)}drawMinimap(e){if(!this.minimapCanvas)return;this._clearMinimapCanvas(),Object.values(this.minimapIdToBonus).forEach(n=>{this.addElementToMinimapCanvas(n)});const t=this.getUserAgent();t&&this.addMinimapData([t]);const r=this.beClient.getScreen().getSize().x-G.MINIMAP_WIDTH,s=this.beClient.getScreen().getSize().y-G.MINIMAP_HEIGHT;e.drawImage(this.minimapCanvas,r,s),e.save(),e.strokeStyle="white",e.beginPath(),e.rect(r,s,G.MINIMAP_WIDTH,G.MINIMAP_HEIGHT),e.stroke(),e.restore()}onAfterDrawScreen(e){this.drawMinimap(e);const t=Array.from(this.hudCache.values()).map(s=>({name:s.name,userScore:s.score}));za.draw(e,t,this.beClient);const r=this.agentId!=null?this.hudCache.get(this.agentId):null;r&&(e.save(),e.fillStyle="white",e.textAlign="left",e.fillText(`score: ${r.score}`,15,e.canvas.height-2),e.restore())}onBeforeDrawAgent(e,t,r,s){}onAfterDrawAgent(e,t,r,s){}onConnectToServer(e,t){this.userName=e,this.createMinimapCanvas(),this.applyCrtPostProcessing()}applyCrtPostProcessing(){const e=this.beClient.getScreen(),t=e.getSize(),r=t.x,s=t.y;r<=0||s<=0||e.setPostProcessingChain([{effect:"crt",texelW:1/r,texelH:1/s,curvature:.25,scanlineIntensity:.35,scanlineCount:0,vignetteStrength:.6,brightness:1.3}])}}const Ba=new Da;export{Hr as B,st as G,ls as P,Mn as R,Gt as S,ei as U,oe as _,Dt as a,ss as b,Oa as c,Fa as d,jr as e,Na as f,q as g,$a as h,ms as i,Fn as w,Ba as z};

"use strict";let BrowserUtil={AudioIE9compatibility:function(){void 0===window.Audio&&(window.Audio=(()=>document.createElement("audio")))}};window.requestAnimFrame=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(e,n){return window.setTimeout(e,1e3/60)},window.cancelRequestAnimFrame=window.cancelAnimationFrame||window.webkitCancelRequestAnimationFrame||window.mozCancelRequestAnimationFrame||window.oCancelRequestAnimationFrame||window.msCancelRequestAnimationFrame||clearTimeout,BrowserUtil.fullScreen=function(){let e=window.document.documentElement;document.fullscreenElement||document.mozFullScreenElement||document.webkitFullscreenElement||document.msFullscreenElement||(e.requestFullscreen||e.mozRequestFullScreen||e.webkitRequestFullScreen||e.msRequestFullscreen).call(e)},BrowserUtil.lockOrientation=function(e){try{e=e||"landscape";let n=screen.lockOrientation||screen.mozLockOrientation||screen.msLockOrientation;return n&&n(e)}catch(e){return null}},BrowserUtil.AudioIE9compatibility(),window.URL=window.URL||window.webkitURL;export default BrowserUtil;
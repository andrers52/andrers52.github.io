"use strict";import EFunction from"../../../../libs/arslib/enhancements/e-function.js";import TimeToLive from"../TimeToLive.js";export default function Fade(t,i){const e=4*(t=(t=t||2e3)<1e3?1e3:t)/1e3,n=t/e;let s;this.opacity=1;let o=this;function c(){o.opacity-=1/e}this.startFading=function(){TimeToLive.call(this,t),!s&&(s=setInterval(c,n))},this.die=EFunction.sequence(function(){s&&clearInterval(s)},this.die,this),i&&this.startFading()};
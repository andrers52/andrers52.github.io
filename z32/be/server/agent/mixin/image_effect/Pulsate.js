"use strict";export default function Pulsate(t){let e,n,l=(t=t||2e3)/2,s=l/10,a=!0,i=1.1,r=this,c=null,u=!1;function o(){a?r.rectangle.grow(i):r.rectangle.shrink(i)}this.stopPulsate=function(){u&&(clearInterval(n),clearInterval(e),r.rectangle.size=c.clone(),u=!1)},this.startPulsate=function(){u||(c=this.rectangle.size.clone(),n=setInterval(function(){a=!a},l),e=setInterval(o,s),setTimeout(this.stopPulsate,t),u=!0)}};
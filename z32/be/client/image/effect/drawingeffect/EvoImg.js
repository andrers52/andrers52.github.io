"use strict";import Assert from"../../../../libs/arslib/util/assert.js";export default function EvoImg(e,t){let r=!0,l=1,o=["rectangle","circle","triangle"],i=["source-over","lighter","copy","xor","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light","soft-light","difference","exclusion","hue","saturation","color","luminosity"];function a(e,t){let a=e[2],s=e[3],n=e[4],c=e[5],g=e[6],u=e[7],f=e[8],h=e[9],b=e[10];switch(t.save(),t.translate(a,s),t.rotate(-h),t.fillStyle=t.strokeStyle=`rgba(${g}, ${u}, ${f}, 1)`,t.globalAlpha=b,t.globalCompositeOperation=i[e[1]],t.lineWidth=l,o[e[0]]){case"rectangle":r?t.fillRect(a-n/2,s-c/2,n,c):(t.rect(a-n/2,s-c/2,n,c),t.stroke());break;case"circle":t.beginPath(),t.arc(a,s,(n+c)/4,0,2*Math.PI),r?t.fill():t.stroke();break;case"triangle":t.beginPath(),t.moveTo(a,s-c/2),t.lineTo(a-n/2,s+c/2),t.lineTo(a+n/2,s+c/2),r?t.fill():t.stroke();break;default:Assert.assert(!1,"Instruction is flawed")}t.restore()}return function(e,t){for(let r=0;r<e.length;r++)a(e[r],t)}(t,e)};
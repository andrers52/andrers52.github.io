"use strict";export default function IncreaseTransparency(e){let t=e.data;for(let e=0,r=t.length;e<r;e+=4)t[e+3]>0&&(t[e+3]-=1);return e};
"use strict";export default function Sepia(t){let e=t.data;for(let t=0,l=e.length;t<l;t+=4){let l=.3*e[t]+.59*e[t+1]+.11*e[t+2];e[t]=l+100,e[t+1]=l+50,e[t+2]=l}return t};
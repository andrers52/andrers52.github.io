"use strict";export default function RadialGradient(a,t){var i=a.createRadialGradient(a.canvas.width/2,a.canvas.height/2,0,a.canvas.width/2,a.canvas.height/2,t.fillRect?Math.min(a.canvas.width,a.canvas.height):Math.min(a.canvas.width/2,a.canvas.height/2));i.addColorStop(0,t.startColor),i.addColorStop(1,t.endColor),a.globalCompositeOperation=t.combineOption,t.fillRect?a.fillRect(0,0,a.canvas.width,a.canvas.height):(a.beginPath(),a.arc(a.canvas.width/2,a.canvas.height/2,Math.min(a.canvas.width/2,a.canvas.height/2),0,2*Math.PI),a.closePath(),a.fillStyle=i,a.strokeStyle="black",a.stroke(),a.fill())};
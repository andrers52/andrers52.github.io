"use strict";import Assert from"../libs/arslib/util/assert.js";import Vector from"../common/geometry/Vector.js";import Rectangle,{rect}from"../common/geometry/Rectangle.js";import resourceStore from"./singleton/ResourceStore.js";var textImageCache={};let TextToImage={};function getFontToFitTextOnRectangle(e,t,r){let o,n=screen.getContext("2d"),a=300;do{o=`${--a}px ${t}`,n.font=o}while(n.measureText(e).width>=r.size.x||a>=r.size.y);return o}TextToImage.fontToFontFace=function(e="14px GoodDog"){return e.substring(e.indexOf(" "),e.lenght)},TextToImage.drawText=function(e,t,r,o,n){""===t&&(o="rgba(125, 125, 125, 0)");let a=resourceStore.retrieveResourceObject(e).getContext("2d");a.clearRect(0,0,a.canvas.width,a.canvas.height),o&&(a.beginPath(),a.rect(0,0,a.canvas.width,a.canvas.height),a.fillStyle=o,a.fill()),a.fillStyle=n,a.font=r,a.textBaseline="bottom",a.textAlign="center",a.fillText(t,a.canvas.width/2,a.canvas.height)},TextToImage.createRectangleFromTextAndFont=function(e,t){Assert.assert(e,"TextToImage#createRectangleFromTextAndFont Error: expecting font parameter to measure"),Assert.assertIsLiteralString(e,"TextToImage#createRectangleFromTextAndFont Error: font is not a string literal");let r=screen.getContext("2d");r.font=e;let o=parseInt(e.match(/\d+/)[0]),n=r.measureText(t).width||1;return new Rectangle(null,new Vector(n,o))},TextToImage.createImageFromText=function(e=rect(0,0,100,100),t="",r="GoodDog",o="rgba(125, 125, 125, 0)",n="black"){if(Assert.assertIsLiteralString(t,"BEClient.textToImagel Error: text is not a string literal"),""===t)return{imageName:null,font:null};if(textImageCache[t])return textImageCache[t];let a=rect(e.center.x,e.center.y,e.size.x,e.size.y);a.size.x*=2,a.size.y*=2;let i=resourceStore.createNewImage(a.size.x,a.size.y,!0),s=getFontToFitTextOnRectangle(t,r,a);TextToImage.drawText(i,t,s,o,n);let c={imageName:i,font:s};return textImageCache[t]=c,c};export default TextToImage;
"use strict";import Assert from"../util/assert.js";import Random from"../util/random.js";var EArray={lastIndex:r=>r.length-1,last:r=>r.length>=1?r[EArray.lastIndex(r)]:"undefined",first:r=>r.length>=1?r[0]:"undefined"};EArray.isLast=((r,e)=>e===this.last()),EArray.isFirst=((r,e)=>e===this.first()),EArray.flatten=((r,e=!0)=>{let t=e?[...r]:r;return t.concat.apply([],t)}),EArray.unflatten=((r,e,t=!0)=>{let a=t?JSON.parse(JSON.stringify(r)):r,n=[];for(;a.length>0;)n.push(a.splice(0,e));return n}),EArray.removeLast=(r=>(r.splice(-1,1),r)),EArray.clone=((r,e)=>e?r.map(function(r){return e(r)}):r.map(r=>Array.isArray(r)||r.clone?r.clone():"object"==typeof r?Object.assign({},r):r)),EArray.choiceWithProbabilities=((r,e)=>{Assert.assertIsArray(e),Assert.assert(e.length===r.length,"Probabilities size must be equal to array size");let t=e.map(r=>Math.random()*r);return r[EArray.indexOfGreaterValue(t)]}),EArray.choice=(r=>r[Random.randomInt(r.length)]),EArray.indexChoice=(r=>Random.randomInt(r.length)),EArray.indexOfGreaterValue=(r=>{let e=r[0],t=0;for(let a=1;a<r.length;a++)r[a]>e&&(e=r[a],t=a);return t});export default EArray;
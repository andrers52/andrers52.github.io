"use strict";import Assert from"../../../libs/arslib/util/assert.js";import EFunction from"../../../libs/arslib/enhancements/e-function.js";export default function HasBehavior(i){Assert.assert(i,"HasBehavior mixin needs a behavior"),this.aggregateBehavior=function(i){this.behavior=this.behavior?EFunction.sequence(i.bind(this),this.behavior,this):i},this.aggregateBehavior(i)};
"use strict";import Assert from"../../../libs/arslib/util/assert.js";import Vector from"../../../common/geometry/Vector.js";import{rect}from"../../../common/geometry/Rectangle.js";import environment from"../singleton/Environment.js";export default function SensingAgent(e=(()=>!1),n=100,t=250){Assert.assert(this.onSensingAgents||this.onSensingForwardAgents||this.onSensingUserAgent||this.onSensingMostForwardAgent,"Error: added SensingAgent to agent without implementing \n    'onSensingAgents' or 'onSensingForwardAgents' or \n    'onSensingUserAgent' or 'onSensingMostForwardAgent' event handler");let r=e.bind(this),s=rect(0,0,2*n,2*n),o=this;function g(){s.center=o.getPosition().clone();let e=environment.getNearbyAgents(o);if(!e.length)return null;let n=e.filter(e=>e.id!==o.id&&!e.isCamera&&e.isSolid&&r(e)&&e.rectangle&&s.checkHasCornerInside(e.rectangle));if(!n.length)return null;let t=n.map(e=>({vector:function(e){let n=e.getPosition().clone().subtract(o.getPosition()),t=n.getAngle(),r=n.size(),s=t-o.orientation;return Vector.makeFromAngleAndSize(s,r)}(e),agent:e}));return Assert.assertIsArray(t,"SensingAgent#getSensingAgents should return an array of objects"),Assert.assert(t[0].vector&&t[0].agent,"SensingAgent#getSensingAgents object seems mal-formed"),t}!function e(){o.isAlive&&setTimeout(e,t);let n=g();if(!n)return;o.onSensingAgents&&o.onSensingAgents(n);let r=function(e){let n=e.filter(e=>e.agent.isUserAgent());return n.length<1?null:n[0]}(n);if(o.onSensingUserAgent&&r&&o.onSensingUserAgent(r),o.onSensingForwardAgents||o.onSensingMostForwardAgent){let e=n.filter(e=>(function(e){let n=e.getAngle();return Math.abs(n)<=Math.PI/2})(e.vector));if(e.length>0&&(o.onSensingForwardAgents&&o.onSensingForwardAgents(e),o.onSensingMostForwardAgent)){let n=function(e){Assert.assert(e.length>=1);let n=e[0],t=Math.abs(n.vector.getAngle());return e.forEach(e=>{let r=Math.abs(e.vector.getAngle());r<t&&(n=e,t=r)}),n}(e);o.onSensingMostForwardAgent(n)}}}()};
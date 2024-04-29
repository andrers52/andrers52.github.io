"use strict";import Vector from"../../../../../be/common/geometry/Vector.js";import GameServerZ32Definitions from"../../../GameServerZ32Definitions.js";import GameCommonDefinitions from"../../../../common/GameCommonDefinitions.js";import SensingAgent from"../../../../../be/server/agent/mixin/SensingAgent.js";import createWeapon from"../Weapon.js";import createMissileSplash from"./MissileSplash.js";export default function createMissile(e,i){let n=GameServerZ32Definitions;let t=createWeapon({owner:e,createSplashFunction:createMissileSplash,pop_sound:"MISSILE_POP_AUDIO_OBJECT_DESCRIPTION",impactEnergyCost:n.MISSILE_IMPACT_ENERGY_COST,timeToLive:n.MISSILE_TIME_TO_LIVE,orientation:i,width:n.MISSILE_WIDTH,height:n.MISSILE_HEIGHT,image:GameCommonDefinitions.MISSILE_IMAGE,initialOrientationVariationMin:0,initialOrientationVariationMax:0,initialPositionRelativeToOwner:"front",initialSpeed:e.speed.clone(),behavior:function(){return function(){let e=t.speed.size()+n.MISSILE_THRUST,i=e<=n.MISSILE_MAX_SPEED?e:n.MISSILE_MAX_SPEED;return t.speed=Vector.makeFromAngleAndSize(t.orientation,i),t.move(t.speed)}()||t.die(),t}});var o;return t.onSensingMostForwardAgent=function(e){let i=e.vector;t.orientation+=i.getAngle()<0?-n.MISSILE_LATERAL_MOVEMENT_AMPLITUDE:n.MISSILE_LATERAL_MOVEMENT_AMPLITUDE},SensingAgent.call(t,i=>!(i.isBonus||i.id===e.id||i.isWeapon||e.isAI&&(i=i,Number.isInteger(i.userId)&&Number.isInteger(e.userId)||!Number.isInteger(i.userId)&&!Number.isInteger(e.userId))),500,200),t};
"use strict";import BECommonDefinitions from"../../be/common/BECommonDefinitions.js";import{vect}from"../../be/common/geometry/Vector.js";import Assert from"../../libs/arslib/util/assert.js";import Random from"../../libs/arslib/util/random.js";import BEServer from"../../be/server/singleton/BEServer.js";import environment from"../../be/server/agent/singleton/Environment.js";import createBonusEnergy from"./agent/bonuses/BonusEnergy.js";import createBonusMissile from"./agent/bonuses/BonusMissile.js";import createSpinningLaserTrap from"./agent/SpinningLaserTrap.js";import createAiShip from"./agent/AiShip.js";import createShip from"./agent/Ship.js";import BonusMine from"./agent/bonuses/BonusMine.js";import connector from"../../be/server/singleton/Connector.js";import GameServerZ32Definitions from"./GameServerZ32Definitions.js";export default function Z32Server(){let defs=GameServerZ32Definitions,updateClientInfoId,highScores={};const MAX_HIGH_SCORES=20;function updateHighScores(){for(Object.values(environment.getAgents()).forEach(e=>{e.isAI&&e.name&&(highScores[e.name]&&highScores[e.name]<e.userScore||!highScores[e.name])&&(highScores[e.name]=Math.round(e.userScore))}),connector.getUsers().forEach(e=>{(highScores[e.name]&&highScores[e.name]<e.agent.userScore||!highScores[e.name])&&(highScores[e.name]=Math.round(e.agent.userScore))});Object.keys(highScores).length>MAX_HIGH_SCORES;){let e,n=Number.MAX_SAFE_INTEGER;Object.keys(highScores).forEach(o=>{0!==highScores[o]?highScores[o]<n&&(n=highScores[o],e=o):delete highScores[o]}),delete highScores[e]}}function defineAgentRandomPosition(){let e=BECommonDefinitions.WORLD_WIDTH/2*.8,n=BECommonDefinitions.WORLD_HEIGHT/2*.8;return vect(Random.randomFromIntervalInclusive(-e,e),Random.randomFromIntervalInclusive(-n,n))}this.start=function(){BEServer.setBackgroundImageName(defs.WORLD_BACKGROUND_IMAGE),createInitialAgents()};var self=this;function createNewAgentAtRandomPosition(AgentType){Assert.assert(["BonusEnergy","BonusMissile","BonusMine","AiShip","SpinningLaserTrap"].includes(AgentType),"z32 client error: invalid agent type.");let Position=defineAgentRandomPosition();eval(`create${AgentType}`)(Position.x,Position.y)||setTimeout(self[`createNew${AgentType}AtRandomPosition`],defs.TIME_TO_RECREATE_BONUS)}function createInitialAgents(){for(let e=0;e<defs.NUMBER_OF_ENERGY_BONUSES;e++)self.createNewBonusEnergyAtRandomPosition();for(let e=0;e<defs.NUMBER_OF_MINE_BONUSES;e++)self.createNewBonusMineAtRandomPosition();for(let e=0;e<defs.NUMBER_OF_MISSILE_BONUSES;e++)self.createNewBonusMissileAtRandomPosition();for(let e=0;e<defs.NUMBER_OF_AI_ENEMIES;e++)self.createNewAiShipAtRandomPosition();for(var e=0;e<defs.NUMBER_OF_SPINNING_LASER_TRAPS;e++)self.createNewSpinningLaserTrapAtRandomPosition()}this.createNewBonusEnergyAtRandomPosition=function(){createNewAgentAtRandomPosition("BonusEnergy")},this.createNewBonusMissileAtRandomPosition=function(){createNewAgentAtRandomPosition("BonusMissile")},this.createNewBonusMineAtRandomPosition=function(){createNewAgentAtRandomPosition("BonusMine")},this.createNewAiShipAtRandomPosition=function(){createNewAgentAtRandomPosition("AiShip")},this.createNewSpinningLaserTrapAtRandomPosition=function(){createNewAgentAtRandomPosition("SpinningLaserTrap")},this.onUserConnected=function(e,n){console.log("user connection");let o=BECommonDefinitions.WORLD_WIDTH/2-n.x/2,t=BECommonDefinitions.WORLD_HEIGHT/2-n.y/2;for(;!(e.agent=createShip(e,n,Random.randomFromInterval(-o,o),Random.randomFromInterval(-t,t))););},this.onUserDead=function(e){e.agent&&(updateHighScores(),e.agent=null),e.camera&&(e.camera.die(),e.camera=null)},this.getHighScores=function(){let e=[];return Object.keys(highScores).forEach(n=>e.push([highScores[n],n])),e.sort((e,n)=>n[0]-e[0]),e.map(e=>`${e[1]} - ${e[0]}`)},this.sendInitialData=function(e){let n=[],o=environment.getAgents();for(let e in o)o[e].isBonus&&n.push(o[e]);n.length&&connector.messageToSingleGameClient(e.id,"addMinimapData",n)}};
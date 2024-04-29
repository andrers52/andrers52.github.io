"use strict";let GameClientDefinitions={ENERGY_BAR_HEIGHT:4};GameClientDefinitions.AMMO_BAR_HEIGHT=GameClientDefinitions.ENERGY_BAR_HEIGHT,GameClientDefinitions.MAX_PLAYERS_TO_SHOW_ON_LEADERBOARD=20,GameClientDefinitions.EFFECTS_DESCRIPTION={images:[{newImageName:"ship.jpg",size:{x:100,y:100},opacity:.5,fillColor:"green",strokeColor:"black",effectsToApply:[{name:"Ship",parameters:{}}]},{newImageName:"aiShip.jpg",size:{x:100,y:100},opacity:.5,fillColor:"red",strokeColor:"black",effectsToApply:[{name:"Ship",parameters:{}}]},{newImageName:"bonusMineImage.jpg",size:{x:30,y:30},effectsToApply:[{name:"RadialGradient",parameters:{startColor:"rgb(255,100,100)",endColor:"black"}}]},{newImageName:"mineSplash.jpg",size:{x:100,y:100},fillColor:"red",strokeColor:"red",effectsToApply:[{name:"Circle",parameters:{}}]},{newImageName:"laserHit.jpg",size:{x:100,y:100},effectsToApply:[{name:"RadialGradient",parameters:{startColor:"yellow",endColor:"grey"}}]},{newImageName:"mineHit.jpg",size:{x:100,y:100},effectsToApply:[{name:"RadialGradient",parameters:{startColor:"yellow",endColor:"red"}}]},{newImageName:"spinningLaserTrap.jpg",size:{x:100,y:100},effectsToApply:[{name:"Star",parameters:{}},{name:"RadialGradient",parameters:{startColor:"white",endColor:"brown"},combineOption:"soft-light"}]},{newImageName:"rocket.jpg",size:{x:100,y:100},opacity:.5,fillColor:"rgb(255,0,0)",strokeColor:"grey",effectsToApply:[{name:"Triangle",parameters:{}},{name:"RadialGradient",parameters:{startColor:"white",endColor:"black"},combineOption:"luminosity"}]}]},GameClientDefinitions.LASER_POP_AUDIO_OBJECT_DESCRIPTION={oldParams:!0,wave_type:3,p_env_attack:0,p_env_sustain:.08022436563863572,p_env_punch:0,p_env_decay:.23691279510391217,p_base_freq:.26585662188679615,p_freq_limit:0,p_freq_ramp:-.5863457047327679,p_freq_dramp:0,p_vib_strength:0,p_vib_speed:0,p_arp_mod:0,p_arp_speed:0,p_duty:0,p_duty_ramp:0,p_repeat_speed:0,p_pha_offset:0,p_pha_ramp:0,p_lpf_freq:1,p_lpf_ramp:0,p_lpf_resonance:0,p_hpf_freq:0,p_hpf_ramp:0,sound_vol:.25,sample_rate:44100,sample_size:8},GameClientDefinitions.WEAPON_PRODUCING_AUDIO_OBJECT_DESCRIPTION={oldParams:!0,wave_type:2,p_env_attack:0,p_env_sustain:.14483694434771308,p_env_punch:0,p_env_decay:.35278586965548164,p_base_freq:.6817844792464577,p_freq_limit:.02040490635021667,p_freq_ramp:-.5091230405971355,p_freq_dramp:0,p_vib_strength:0,p_vib_speed:0,p_arp_mod:0,p_arp_speed:0,p_duty:.0845837320835679,p_duty_ramp:.012015135048022119,p_repeat_speed:0,p_pha_offset:0,p_pha_ramp:0,p_lpf_freq:1,p_lpf_ramp:0,p_lpf_resonance:0,p_hpf_freq:.02674451371380131,p_hpf_ramp:0,sound_vol:.25,sample_rate:44100,sample_size:8},GameClientDefinitions.MISSILE_POP_AUDIO_OBJECT_DESCRIPTION={oldParams:!0,wave_type:3,p_env_attack:0,p_env_sustain:.08022436563863572,p_env_punch:0,p_env_decay:.23691279510391217,p_base_freq:.26585662188679615,p_freq_limit:0,p_freq_ramp:-.5863457047327679,p_freq_dramp:0,p_vib_strength:0,p_vib_speed:0,p_arp_mod:0,p_arp_speed:0,p_duty:0,p_duty_ramp:0,p_repeat_speed:0,p_pha_offset:0,p_pha_ramp:0,p_lpf_freq:1,p_lpf_ramp:0,p_lpf_resonance:0,p_hpf_freq:0,p_hpf_ramp:0,sound_vol:.25,sample_rate:44100,sample_size:8},GameClientDefinitions.MISSILE_PRODUCING_AUDIO_OBJECT_DESCRIPTION={oldParams:!0,wave_type:3,p_env_attack:-.06873276042830324,p_env_sustain:.6909000400797908,p_env_punch:.07590851922922917,p_env_decay:-.23220017006992139,p_base_freq:.020985962373430894,p_freq_limit:0,p_freq_ramp:.19520989986158613,p_freq_dramp:-.02412353405811009,p_vib_strength:.1850887072141922,p_vib_speed:-.023940297090303986,p_arp_mod:-.8889458690122483,p_arp_speed:.8181566488394965,p_duty:-.39713803703321093,p_duty_ramp:.23471033137663327,p_repeat_speed:-.49777590351045053,p_pha_offset:-.279359053282235,p_pha_ramp:-.0412175755843398,p_lpf_freq:.5895989887125194,p_lpf_ramp:-.04407061088230585,p_lpf_resonance:.9030583987855754,p_hpf_freq:5072947087517981e-21,p_hpf_ramp:.6970345163119329,sound_vol:.25,sample_rate:44100,sample_size:8},GameClientDefinitions.MINE_POP_AUDIO_OBJECT_DESCRIPTION={oldParams:!0,wave_type:3,p_env_attack:0,p_env_sustain:.08022436563863572,p_env_punch:0,p_env_decay:.23691279510391217,p_base_freq:.26585662188679615,p_freq_limit:0,p_freq_ramp:-.5863457047327679,p_freq_dramp:0,p_vib_strength:0,p_vib_speed:0,p_arp_mod:0,p_arp_speed:0,p_duty:0,p_duty_ramp:0,p_repeat_speed:0,p_pha_offset:0,p_pha_ramp:0,p_lpf_freq:1,p_lpf_ramp:0,p_lpf_resonance:0,p_hpf_freq:0,p_hpf_ramp:0,sound_vol:.25,sample_rate:44100,sample_size:8},GameClientDefinitions.SHIP_DIE_AUDIO_OBJECT_DESCRIPTION={oldParams:!0,wave_type:3,p_env_attack:0,p_env_sustain:.39956346351767336,p_env_punch:.38814719177821233,p_env_decay:.3496511423767162,p_base_freq:.2363233644996943,p_freq_limit:0,p_freq_ramp:-.2685397376385981,p_freq_dramp:0,p_vib_strength:0,p_vib_speed:0,p_arp_mod:0,p_arp_speed:0,p_duty:0,p_duty_ramp:0,p_repeat_speed:0,p_pha_offset:0,p_pha_ramp:0,p_lpf_freq:1,p_lpf_ramp:0,p_lpf_resonance:0,p_hpf_freq:0,p_hpf_ramp:0,sound_vol:.25,sample_rate:44100,sample_size:8},GameClientDefinitions.BONUS_PICKUP_AUDIO_OBJECT_DESCRIPTION={oldParams:!0,wave_type:2,p_env_attack:0,p_env_sustain:.35623633309423874,p_env_punch:0,p_env_decay:.15942141861536685,p_base_freq:.35404976726528825,p_freq_limit:0,p_freq_ramp:.13842497025364714,p_freq_dramp:0,p_vib_strength:0,p_vib_speed:0,p_arp_mod:0,p_arp_speed:0,p_duty:1,p_duty_ramp:0,p_repeat_speed:.4077185043998148,p_pha_offset:0,p_pha_ramp:0,p_lpf_freq:1,p_lpf_ramp:0,p_lpf_resonance:0,p_hpf_freq:0,p_hpf_ramp:0,sound_vol:.25,sample_rate:44100,sample_size:8},Object.freeze(GameClientDefinitions);export default GameClientDefinitions;
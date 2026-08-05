(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const o of a)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function n(a){const o={};return a.integrity&&(o.integrity=a.integrity),a.referrerPolicy&&(o.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?o.credentials="include":a.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(a){if(a.ep)return;a.ep=!0;const o=n(a);fetch(a.href,o)}})();const E={distanciaKm:3,duracaoMin:20},g={perfil:"cl_perfil",corridas:"cl_corridas",onboarded:"cl_onboarded",emCurso:"cl_em_curso",rascunho:"cl_rascunho"};function J(e,t){try{const n=localStorage.getItem(e);return n?JSON.parse(n):t}catch{return t}}function z(e,t){localStorage.setItem(e,JSON.stringify(t))}function Fe(){return Date.now().toString(36)+Math.random().toString(36).slice(2,6)}function se(){return J(g.perfil,null)}function _e(e){z(g.perfil,e),z(g.onboarded,!0)}function Ne(){return J(g.onboarded,!1)}function Re(){Object.values(g).forEach(e=>localStorage.removeItem(e))}function G(){return J(g.corridas,[])}function ze(e){z(g.corridas,[...G(),e])}function Be(){const e=J(g.emCurso,null);return e&&typeof e.inicio=="number"?e:null}function Ye(e){z(g.emCurso,e)}function Je(){localStorage.removeItem(g.emCurso)}function Ue(){const e=J(g.rascunho,null);return e&&typeof e.id=="string"&&typeof e.inicio=="string"?e:null}function Ve(e){z(g.rascunho,e)}function ke(){localStorage.removeItem(g.rascunho)}function We(e=G()){return new Set(e.map(t=>t.inicio.slice(0,10))).size}function le(e,t){return new Date(e,t,0).getDate()}function Se(e,t=new Date){const[n,i,a]=e.split("-").map(Number),o=t.getMonth()+1>i||t.getMonth()+1===i&&t.getDate()>=a;return t.getFullYear()-n-(o?0:1)}function ie(e){return e.nascimento?Se(e.nascimento):e.idade??40}function oe(e){const t=220-e;return{min:Math.round(t*.6),max:Math.round(t*.75)}}const ue=36;function O(e){const{min:t,max:n,step:i,fmt:a}=e.spec,o=[];for(let s=t;s<=n;s+=i)o.push(`<div class="picker-opt" data-v="${s}">${a?a(s):s}</div>`);return`
    <label class="field">
      <span>${e.label}</span>
      <div class="picker" data-key="${e.key}" tabindex="0" role="group" aria-label="${e.label}">
        <div class="picker-frame"></div>
        ${e.unit?`<span class="picker-unit">${e.unit}</span>`:""}
        <div class="picker-wheel">${o.join("")}</div>
      </div>
    </label>`}function P(e,t,n,i){const a=e.querySelector(`.picker[data-key="${t}"]`),o=a.querySelector(".picker-wheel"),s=Math.round((n.max-n.min)/n.step),l=d=>Math.min(s,Math.max(0,d)),v=()=>l(Math.round(o.scrollTop/ue)),c=(d,p=!1)=>{o.scrollTo({top:l(d)*ue,behavior:p?"smooth":"auto"})},m=d=>Math.round((d-n.min)/n.step),b=()=>c(m(n.def));b(),requestAnimationFrame(b);let $=l(m(n.def)),w=0;i&&o.addEventListener("scroll",()=>{w||(w=requestAnimationFrame(()=>{w=0;const d=v();d!==$&&($=d,i(n.min+d*n.step))}))},{passive:!0});let h=null,K=0,L=0,S=null,A=null;a.addEventListener("pointerdown",d=>{d.pointerType!=="touch"&&(h=d.clientY,K=0,L=0,S=d.target.closest(".picker-opt"),a.focus({preventScroll:!0}),A&&clearTimeout(A),o.style.scrollSnapType="none",a.classList.add("dragging"),a.setPointerCapture(d.pointerId),d.preventDefault())}),a.addEventListener("pointermove",d=>{if(h===null)return;const p=d.clientY-h;h=d.clientY,K+=Math.abs(p),L=p,o.scrollTop-=p});const D=d=>{if(h===null)return;h=null,a.classList.remove("dragging"),a.hasPointerCapture(d.pointerId)&&a.releasePointerCapture(d.pointerId);const p=Math.abs(L)>6?-Math.sign(L)*2:0;c(v()+p,!0),A=setTimeout(()=>{o.style.scrollSnapType=""},400)};a.addEventListener("pointerup",D),a.addEventListener("pointercancel",D),a.addEventListener("click",d=>{if(K>5)return;const p=d.target.closest(".picker-opt")??S;p&&c(m(Number(p.dataset.v)),!0)}),a.addEventListener("keydown",d=>{const p={ArrowUp:-1,ArrowDown:1,PageUp:-5,PageDown:5};let I;if(d.key in p)I=v()+p[d.key];else if(d.key==="Home")I=0;else if(d.key==="End")I=s;else return;d.preventDefault(),c(I,!0)});const F=()=>n.min+v()*n.step;return F.set=(d,p=!0)=>c(m(d),p),F}const Qe=["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"],me=e=>String(e).padStart(2,"0"),pe=(e,t,n)=>`${e}-${me(t)}-${me(n)}`;function Xe(e,t){const n=new Date().getFullYear(),i=[{key:"dia",label:"Dia",unit:"",spec:{min:1,max:31,step:1,def:1}},{key:"mes",label:"Mês",unit:"",spec:{min:1,max:12,step:1,def:1,fmt:c=>Qe[c-1]}},{key:"ano",label:"Ano",unit:"",spec:{min:n-100,max:n-5,step:1,def:n-40}}],a=[{key:"peso",label:"Peso",unit:"kg",spec:{min:30,max:150,step:1,def:70}},{key:"altura",label:"Altura",unit:"cm",spec:{min:120,max:210,step:1,def:165}}];e.innerHTML=`
    <section class="onboard">
      <div class="onboard-brand" aria-label="Leve corrida"><span>leve</span><small>corrida</small></div>
      <div class="onboard-body">
      <p class="lead">Qualquer um pode correr. Vamos começar leve.</p>
      <p class="muted">Primeiro, alguns dados seus — servem pra acompanhar sua evolução
        e avisar se a frequência cardíaca passa da zona confortável.</p>
      <form id="form-perfil" class="form">
        <label class="field">
          <span>Sexo</span>
          <div class="seg" id="seg-sexo">
            <button type="button" class="seg-btn" data-v="m">Masculino</button>
            <button type="button" class="seg-btn" data-v="f">Feminino</button>
          </div>
        </label>
        <div class="field">
          <span>Data de nascimento</span>
          <div class="picker-row">${i.map(O).join("")}</div>
          <p class="idade-calc">Idade: <strong id="idade-calc">—</strong></p>
        </div>
        ${a.map(O).join("")}
        <button type="submit" class="primary">Começar</button>
      </form>
      </div>
    </section>
  `;let o=null;e.querySelectorAll("#seg-sexo .seg-btn").forEach(c=>{c.addEventListener("click",()=>{e.querySelectorAll("#seg-sexo .seg-btn").forEach(m=>m.classList.remove("on")),c.classList.add("on"),o=c.dataset.v})});const s={},l=e.querySelector("#idade-calc"),v=()=>{const c=s.ano(),m=s.mes(),b=le(c,m);if(s.dia()>b){s.dia.set(b);return}const $=Se(pe(c,m,s.dia()));l.textContent=`${$} ${$===1?"ano":"anos"}`};i.forEach(c=>{s[c.key]=P(e,c.key,c.spec,v)}),a.forEach(c=>{s[c.key]=P(e,c.key,c.spec)}),v(),requestAnimationFrame(v),e.querySelector("#form-perfil").addEventListener("submit",c=>{if(c.preventDefault(),!o){alert("Selecione o sexo.");return}const m=s.ano(),b=s.mes(),$=Math.min(s.dia(),le(m,b));_e({sexo:o,nascimento:pe(m,b,$),peso:s.peso(),altura:s.altura()}),t.reload()})}function B(e){return new Date(e).toLocaleDateString("pt-BR",{weekday:"short",day:"2-digit",month:"2-digit"})}function Ze(e){const t=new Date(e);return`${B(e)} · ${t.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}`}function Ee(e){const t=Math.floor(e/1e3),n=Math.floor(t/60),i=t%60;return`${String(n).padStart(2,"0")}:${String(i).padStart(2,"0")}`}const X=20*60*1e3,H=Be(),W=Ue();let f=(H==null?void 0:H.inicio)??null,R=null,Q=null,q=W,ae="externo",we=null,Le=null,De=null,k=(H==null?void 0:H.meta)??(W==null?void 0:W.meta)??null,Te=null;function ee(){Q&&(clearInterval(Q),Q=null)}function qe(){return f!==null}function Ge(){f!==null&&Date.now()-f>=X&&Ae(f+X)}function re(e,t){if(t&&(R=t),ee(),q){Ce(e);return}if(f!==null){ve(e);return}const n=k==="distancia"?" on":"",i=k==="tempo"?" on":"";e.innerHTML=`
    <div class="center hero">
      <p class="muted">No objetivo de iniciante sua meta é chegar aos 3 km em 20m. No seu ritmo, no seu tempo.</p>
      <div class="goal-row">
        <button type="button" class="goal-opt${n}" data-v="distancia"><span class="gv">3 km</span><span class="gl">distância</span></button>
        <button type="button" class="goal-opt${i}" data-v="tempo"><span class="gv">20 min</span><span class="gl">tempo</span></button>
      </div>
      <p class="muted">Toque quando começar a correr. A gente anota o horário pra você.</p>
      <button id="comecei" class="primary big"${k?"":" disabled"}>Comecei</button>
    </div>
  `;const a=e.querySelector("#comecei");e.querySelectorAll(".goal-opt").forEach(o=>{o.addEventListener("click",()=>{e.querySelectorAll(".goal-opt").forEach(s=>s.classList.remove("on")),o.classList.add("on"),k=o.dataset.v,a.disabled=!1})}),a.addEventListener("click",()=>{k&&(f=Date.now(),Ye({inicio:f,meta:k}),R?R.reload():ve(e))})}function ve(e){e.innerHTML=`
    <div class="center hero">
      <div id="elapsed" class="timer">${Ee(Date.now()-f)}</div>
      <p class="muted">Correndo… vá no seu ritmo.</p>
      <button id="parei" class="primary big danger">Parei</button>
    </div>
  `,e.querySelector("#parei").addEventListener("click",()=>Ie(e,Date.now())),et(e)}function Ae(e){const t=f;ee(),f=null,Je(),q={id:Fe(),inicio:new Date(t).toISOString(),fim:new Date(e).toISOString(),duracaoMin:Math.max(1,Math.round((e-t)/6e4)),local:"externo",...k?{meta:k}:{}},Ve(q)}function Ie(e,t){Ae(t),R?R.reload():Ce(e)}function et(e){ee(),Q=setInterval(()=>{if(!f)return;const t=Date.now()-f;if(t>=X){Ie(e,f+X);return}const n=document.getElementById("elapsed");n&&(n.textContent=Ee(t))},1e3)}function Ce(e){var s;const t=q,n=se(),i=n?oe(ie(n)):null,a=i?Math.round((i.min+i.max)/2):120,o=((s=G().at(-1))==null?void 0:s.peso)??(n==null?void 0:n.peso)??70;e.innerHTML=`
    <div class="card form">
      <div class="row"><span class="muted">Duração</span><strong>${t.duracaoMin} min</strong></div>
      <div class="row"><span class="muted">Quando</span><strong>${Ze(t.inicio)}</strong></div>
      <div class="field">
        <span>Distância — opcional</span>
        <div class="picker-row">
          ${O({key:"d-km",label:"km",unit:"km",spec:{min:0,max:30,step:1,def:0}})}
          ${O({key:"d-m",label:"metros",unit:"m",spec:{min:0,max:900,step:100,def:0}})}
        </div>
      </div>
      ${O({key:"f-fc",label:`FC média (bpm)${i?` · zona leve ${i.min}–${i.max}`:""}`,unit:"bpm",spec:{min:40,max:200,step:1,def:a}})}
      <label class="field">
        <span>Onde</span>
        <div class="seg" id="seg-local">
          <button type="button" class="seg-btn on" data-v="externo">Externo</button>
          <button type="button" class="seg-btn" data-v="esteira">Esteira</button>
        </div>
      </label>
      ${O({key:"f-peso",label:"Peso. Somente se mudou",unit:"kg",spec:{min:30,max:150,step:1,def:o}})}
      <div class="actions">
        <button id="f-descartar" class="ghost">Descartar</button>
        <button id="f-salvar" class="primary">Salvar</button>
      </div>
    </div>
  `,ae="externo",e.querySelectorAll("#seg-local .seg-btn").forEach(l=>{l.addEventListener("click",()=>{e.querySelectorAll("#seg-local .seg-btn").forEach(v=>v.classList.remove("on")),l.classList.add("on"),ae=l.dataset.v})}),we=P(e,"d-km",{min:0,max:30,step:1,def:0}),Le=P(e,"d-m",{min:0,max:900,step:100,def:0}),De=P(e,"f-fc",{min:40,max:200,step:1,def:a}),Te=P(e,"f-peso",{min:30,max:150,step:1,def:o}),e.querySelector("#f-salvar").addEventListener("click",()=>tt(e)),e.querySelector("#f-descartar").addEventListener("click",()=>{q=null,k=null,ke(),re(e)})}function tt(e){const t=q,n=we()+Le()/1e3,i=De(),a={id:t.id,inicio:t.inicio,fim:t.fim,duracaoMin:t.duracaoMin,local:ae,peso:Te(),...t.meta?{meta:t.meta}:{},...n>0?{distanciaKm:Math.round(n*10)/10}:{},...i>0?{fcMedia:i}:{}};ze(a),q=null,k=null,ke();const o=se();let s="";if(a.fcMedia){const l=oe(ie(o));a.fcMedia>l.max&&(s=`Sua FC média (${a.fcMedia}) ficou acima da zona leve (${l.min}–${l.max} bpm). Tudo bem — na próxima, tente ir um pouco mais devagar. O coração agradece.`)}e.innerHTML=`
    <div class="center hero">
      <div class="ok">✅</div>
      <h2>Corrida registrada!</h2>
      <p class="muted">${a.duracaoMin} min${a.distanciaKm?` · ${a.distanciaKm} km`:""}${a.fcMedia?` · FC ${a.fcMedia}`:""}</p>
      ${s?`<div class="warn">${s}</div>`:""}
      <button id="ok-voltar" class="primary">Voltar</button>
    </div>
  `,e.querySelector("#ok-voltar").addEventListener("click",()=>re(e))}const at=["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"],nt={verao:"☀️",outono:"🍂",inverno:"❄️",primavera:"🌸"},x=30,fe=176,st=66,it=5,ot=22,ge=1;function V(e){const t=new Date(e);return t.setHours(0,0,0,0),t}function he(e,t){return Math.round((t.getTime()-e.getTime())/864e5)}function rt(e){return e===11||e===0||e===1?"verao":e>=2&&e<=4?"outono":e>=5&&e<=7?"inverno":"primavera"}function ct(e,t){const n=t-e,i=[1,2,3,4,6,12].find(o=>n/o<=5)??12,a=[];for(let o=Math.ceil(e/i)*i;o<=t;o+=i)a.push(o);return(a.length===0||a[0]-e>=i/2)&&a.unshift(e),t-a[a.length-1]>=i/2&&a.push(t),a}const Oe="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z",dt=`<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" stroke="none"><path d="${Oe}"/></svg>`,lt=`<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" stroke="none"><path d="${Oe}"/><rect x="2.5" y="20.2" width="19" height="3" rx="1.5"/></svg>`;function ut(e,t,n){const i=[...t].sort((r,u)=>r.inicio.localeCompare(u.inicio));if(i.length===0){e.innerHTML='<p class="muted">Sem corridas pra mostrar ainda.</p>',n==null||n(null);return}const a=V(i[0].inicio),o=V(i[i.length-1].inicio),s=V(new Date().toISOString()),l=o.getTime()>s.getTime()?o:s,v=he(a,l)+1,c=v*x,m=i.map(r=>{const u=new Date(r.inicio);return u.getHours()+u.getMinutes()/60}),b=Math.max(0,Math.min(it,Math.floor(Math.min(...m)-ge))),$=Math.min(24,Math.max(ot,Math.ceil(Math.max(...m)+ge))),w=r=>($-r)/($-b)*fe,h=[],K=i.map(r=>{const u=new Date(r.inicio),C=he(a,V(r.inicio)),U=u.getHours()+u.getMinutes()/60,y=C*x+x/2,M=w(U);h.push(y);const _=r.local==="esteira"?lt:dt,te=[B(r.inicio),`${r.duracaoMin} min`];r.distanciaKm&&te.push(`${r.distanciaKm} km`),r.fcMedia&&te.push(`FC ${r.fcMedia}`);const Ke=`<span class="pt-lab"><span class="pl tempo"><b>${r.duracaoMin}</b><i>min</i></span>${r.distanciaKm?`<span class="pl dist"><b>${r.distanciaKm.toFixed(1)}</b><i>km</i></span>`:""}</span>`;return`<div class="pt ${r.local==="esteira"?"esteira":"rua"}" style="left:${y}px;top:${M}px" title="${te.join(" · ")}">${_}${Ke}</div>`}).join(""),L=[],S=[];let A=-1;for(let r=0;r<v;r++){const u=new Date(a);u.setDate(a.getDate()+r),L.push(`<span class="dnum" style="left:${r*x}px;width:${x}px">${u.getDate()}</span>`);const C=u.getFullYear()*12+u.getMonth();C!==A?(S.push({mes:u.getMonth(),label:at[u.getMonth()],left:r*x,width:x}),A=C):S[S.length-1].width+=x}const D=[];let F="";for(const r of S){const u=rt(r.mes);u!==F?(D.push({emoji:nt[u],left:r.left,width:r.width}),F=u):D[D.length-1].width+=r.width}const d=ct(b,$);e.innerHTML=`
    <div class="prog">
      <div class="prog-y">
        ${d.map(r=>`<span style="top:${w(r)}px">${r}h</span>`).join("")}
      </div>
      <div class="prog-scroll">
        <div class="prog-canvas" style="width:${c}px">
          <div class="prog-grid">
            ${d.map(r=>`<div class="gline" style="top:${w(r)}px"></div>`).join("")}
          </div>
          <div class="prog-marca" style="width:${x}px;height:${fe+22}px"></div>
          <div class="prog-points">${K}</div>
          <div class="prog-axis" style="height:${st}px">
            <div class="ax dia">${L.join("")}</div>
            <div class="ax mes">${S.map(r=>`<span class="mband" style="left:${r.left}px;width:${r.width}px">${r.label}</span>`).join("")}</div>
            <div class="ax est">${D.map(r=>`<span class="eband" style="left:${r.left}px;width:${r.width}px">${r.emoji}</span>`).join("")}</div>
          </div>
        </div>
      </div>
    </div>
  `;const p=e.querySelector(".prog-scroll"),I=e.querySelector(".prog-marca"),He=Array.from(e.querySelectorAll(".pt"));let ce=-1;const de=()=>{const r=p.scrollLeft,u=p.clientWidth,C=Math.max(0,p.scrollWidth-u),U=[2*r,r+u/2,2*r-C+u].sort((M,_)=>M-_)[1];let y=0;for(let M=1;M<h.length;M++)Math.abs(h[M]-U)<Math.abs(h[y]-U)&&(y=M);y!==ce&&(ce=y,I.style.left=`${h[y]-x/2}px`,He.forEach((M,_)=>M.classList.toggle("sel",_===y)),n==null||n(i[y]))};p.addEventListener("scroll",de,{passive:!0}),de()}const N=108,j=N/2,Pe=45,je=31,be=2*Math.PI*Pe,$e=2*Math.PI*je;function ye(e,t){return!e||e<=0?0:Math.min(1,e/t)}function Me(e,t,n){return`
    <circle class="trilho" cx="${j}" cy="${j}" r="${t}"/>
    <circle class="faixa ${e}" cx="${j}" cy="${j}" r="${t}"
            stroke-dasharray="${n}" stroke-dashoffset="${n}"/>`}function mt(e){e.innerHTML=`
    <div class="aneis-dia">—</div>
    <div class="aneis-wrap">
      <svg class="aneis-svg" viewBox="0 0 ${N} ${N}" width="${N}" height="${N}" aria-hidden="true">
        <g transform="rotate(-90 ${j} ${j})">
          ${Me("tempo",Pe,be)}
          ${Me("dist",je,$e)}
        </g>
      </svg>
      <div class="aneis-val">
        <div class="av tempo"><b>—</b><i>min</i></div>
        <div class="av dist"><b>—</b><i>km</i></div>
      </div>
    </div>`;const t=e.querySelector(".aneis-dia"),n=e.querySelector(".faixa.tempo"),i=e.querySelector(".faixa.dist"),a=e.querySelector(".av.tempo b"),o=e.querySelector(".av.dist b");return s=>{t.textContent=s?B(s.inicio):"—";const l=ye(s==null?void 0:s.duracaoMin,E.duracaoMin),v=ye(s==null?void 0:s.distanciaKm,E.distanciaKm);n.style.strokeDashoffset=String(be*(1-l)),i.style.strokeDashoffset=String($e*(1-v)),a.textContent=s?String(s.duracaoMin):"—",o.textContent=s!=null&&s.distanciaKm?s.distanciaKm.toFixed(1):"—",e.title=s?`${B(s.inicio)} · ${s.duracaoMin} de ${E.duracaoMin} min · ${s.distanciaKm?s.distanciaKm.toFixed(1):"—"} de ${E.distanciaKm} km`:""}}function pt(e){let t=[...G()].sort((c,m)=>m.inicio.localeCompare(c.inicio));if(t.length===0){e.innerHTML=`
      <div class="center empty">
        <p class="muted">Nenhuma corrida ainda.</p>
        <p class="muted">Vá em <strong>Entradas</strong> e toque em <em>Comecei</em> quando sair pra correr.</p>
      </div>`;return}const n=We(t),i=t.length,a=Math.round(t.reduce((c,m)=>c+m.duracaoMin,0)/i),o=t.filter(c=>c.distanciaKm!=null),s=o.length?o.reduce((c,m)=>c+(m.distanciaKm??0),0)/o.length:null,l=t[0];e.innerHTML=`
    <div class="stat-rows">
      <div class="cards">
        <div class="card stat"><div class="big">${n}</div><div class="muted">dias treinados</div></div>
        <div class="card stat"><div class="big">${i}</div><div class="muted">corridas</div></div>
      </div>
      <div class="cards">
        <div class="card stat"><div class="big">${a}</div><div class="muted">min médio</div></div>
        <div class="card stat"><div class="big">${s?s.toFixed(1):"—"}</div><div class="muted">km médio</div></div>
      </div>
    </div>
    <div class="card"><div class="row"><strong>Meta: ${E.distanciaKm} km em ${E.duracaoMin} min</strong><span class="muted">por sessão</span></div></div>
    <h2 class="section">Última corrida</h2>
    <div class="card last-run">
      <div class="lr-top">
        <div class="lr-date">${B(l.inicio)}</div>
        <span class="tag">${l.local==="esteira"?"Esteira":"Externo"}</span>
      </div>
      <div class="lr-stats">
        <div><div class="big">${l.duracaoMin}</div><div class="muted">min</div></div>
        <div><div class="big">${l.distanciaKm?l.distanciaKm.toFixed(1):"—"}</div><div class="muted">km</div></div>
        <div><div class="big">${l.fcMedia??"—"}</div><div class="muted">bpm</div></div>
      </div>
    </div>
    <h2 class="section">Análise</h2>
    <div class="analise-head">
      <div class="analise-txt">
        <h3 class="chart-title">Frequência</h3>
        <p class="prog-hint">arraste para o lado →</p>
      </div>
      <div class="card aneis" id="aneis"></div>
    </div>
    <div id="prog"></div>
  `;const v=mt(e.querySelector("#aneis"));ut(e.querySelector("#prog"),t,v)}function vt(e,t){const n=se(),i=n?oe(ie(n)):null;e.innerHTML=`
    <div class="card ajuda">
      <h2 class="section">Como funciona</h2>
      <p>O objetivo desta fase: conseguir percorrer <strong>${E.distanciaKm} km em ${E.duracaoMin} minutos</strong>, no seu ritmo — intercalando corrida e caminhada enquanto não consegue.</p>
      <p><strong>1.</strong> Registre cada treino em <strong>Entradas</strong>: toque <em>Comecei</em> ao sair e <em>Parei</em> ao terminar. A hora e o dia ficam anotados sozinhos.</p>
      <p><strong>2.</strong> Acompanhe em <strong>Resultados</strong>: sequência de dias, total e histórico.</p>
      <h2 class="section">Dicas leves</h2>
      <ul>
        <li>O exercício mais natural do mundo: vá no seu ritmo.</li>
        <li>Intercale corrida e caminhada no começo — não tem problema.</li>
        <li>Constância vence intensidade. Melhor 3× por semana leve que 1× exaustiva.</li>
        ${i?`<li>Para você, a zona de FC confortável fica em <strong>${i.min}–${i.max} bpm</strong>. Passou muito? Diminua o ritmo.</li>`:""}
      </ul>
      <h2 class="section">Seus dados</h2>
      <p class="muted">Tudo fica só no seu aparelho. Nada é enviado a ninguém.</p>
      <button id="reset" class="ghost danger">Apagar tudo e recomeçar</button>
    </div>
  `,e.querySelector("#reset").addEventListener("click",()=>{confirm("Apagar perfil e corridas? Não dá pra desfazer.")&&(Re(),t.go("entradas"))})}const ne=document.getElementById("app");let T="entradas";const Y={go:e=>{T=e,Z()},reload:()=>Z()};function Z(){if(ee(),Ge(),!Ne()){Xe(ne,Y);return}ft()}document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&qe()&&Z()});function ft(){const t=qe()?" disabled":"";ne.innerHTML=`
    <header class="topbar">
      <div class="brand-lockup" aria-label="Leve corrida"><span>leve</span><small>corrida</small></div>
      <h1>${gt(T)}</h1>
      <button id="ajuda-btn" class="iconbtn ${T==="ajuda"?"on":""}" aria-label="Ajuda"${t}>?</button>
    </header>
    <main id="view" class="view"></main>
    <nav class="tabbar">
      ${xe("entradas","👟","Entradas",t)}
      ${xe("resultados","📊","Resultados",t)}
    </nav>
  `,ne.querySelectorAll(".tabbar button").forEach(n=>{n.addEventListener("click",()=>Y.go(n.dataset.tab))}),document.getElementById("ajuda-btn").addEventListener("click",()=>{Y.go(T==="ajuda"?"entradas":"ajuda")}),ht()}function xe(e,t,n,i){return`<button data-tab="${e}" class="${e===T?"on":""}"${i}><span class="ico">${t}</span><span class="lbl">${n}</span></button>`}function gt(e){return{entradas:"Entradas",resultados:"Resultados",ajuda:"Ajuda"}[e]}function ht(){const e=document.getElementById("view");T==="entradas"?re(e,Y):T==="resultados"?pt(e):vt(e,Y)}Z();

(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function a(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(t){if(t.ep)return;t.ep=!0;const o=a(t);fetch(t.href,o)}})();const d="petrescue.local-report-drafts.v1",u=`
  :root {
    color-scheme: light;
    --pr-ink: #202a24;
    --pr-muted: #68746c;
    --pr-paper: #fbfaf6;
    --pr-card: #ffffff;
    --pr-line: #e4e8df;
    --pr-green: #236b49;
    --pr-green-dark: #194d35;
    --pr-soft: #edf4eb;
    --pr-orange: #f1a66b;
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }
  * { box-sizing: border-box; }
  body { margin: 0; background: var(--pr-paper); color: var(--pr-ink); }
  button, input, select, textarea { font: inherit; }
  button, a { -webkit-tap-highlight-color: transparent; }
  a { color: inherit; }
  .pr-app { min-height: 100vh; }
  .pr-header {
    display: flex; align-items: center; justify-content: space-between; gap: 20px;
    max-width: 1120px; margin: 0 auto; padding: 22px 28px;
  }
  .pr-brand { display: inline-flex; gap: 10px; align-items: center; text-decoration: none; font-weight: 850; letter-spacing: -.04em; font-size: 1.25rem; }
  .pr-logo { display: grid; place-items: center; width: 38px; height: 38px; border-radius: 13px; color: white; background: var(--pr-green); font-size: 21px; }
  .pr-nav { display: flex; gap: 8px; align-items: center; }
  .pr-nav a { padding: 10px 13px; border-radius: 999px; text-decoration: none; color: var(--pr-muted); font-size: .92rem; font-weight: 650; }
  .pr-nav a:hover, .pr-nav a[aria-current="page"] { background: var(--pr-soft); color: var(--pr-green-dark); }
  .pr-main { max-width: 1120px; padding: 20px 28px 80px; margin: 0 auto; }
  .pr-hero { display: grid; grid-template-columns: 1.12fr .88fr; gap: 30px; align-items: center; padding: 38px 0 48px; }
  .pr-eyebrow { display: inline-flex; align-items: center; gap: 8px; color: var(--pr-green); font-size: .78rem; text-transform: uppercase; letter-spacing: .12em; font-weight: 800; }
  .pr-eyebrow:before { content: ""; width: 22px; height: 2px; background: var(--pr-orange); }
  h1, h2, h3, p { margin-top: 0; }
  h1 { font-size: clamp(2.5rem, 5vw, 4.5rem); line-height: 1.04; letter-spacing: -.065em; margin: 18px 0; max-width: 680px; }
  .pr-highlight { color: var(--pr-green); }
  .pr-lead { max-width: 560px; color: var(--pr-muted); font-size: 1.12rem; line-height: 1.75; }
  .pr-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 26px; }
  .pr-button { display: inline-flex; align-items: center; justify-content: center; gap: 8px; min-height: 46px; padding: 12px 18px; border: 1px solid transparent; border-radius: 12px; background: var(--pr-green); color: white; font-weight: 750; text-decoration: none; cursor: pointer; transition: background .15s, transform .15s; }
  .pr-button:hover { background: var(--pr-green-dark); transform: translateY(-1px); }
  .pr-button.secondary { color: var(--pr-green-dark); background: white; border-color: var(--pr-line); }
  .pr-button.secondary:hover { background: var(--pr-soft); }
  .pr-button.danger { background: #fff0ed; color: #9c3528; border-color: #f5d6d0; }
  .pr-button.small { min-height: 36px; padding: 8px 12px; font-size: .86rem; }
  .pr-illustration { min-height: 330px; display: grid; place-items: center; position: relative; overflow: hidden; border-radius: 30px; background: #e8f0e3; }
  .pr-sun { position: absolute; width: 90px; height: 90px; border-radius: 50%; background: #f2bd81; top: 35px; right: 44px; }
  .pr-hill { position: absolute; bottom: -80px; width: 360px; height: 210px; border-radius: 50%; background: #b8d0ad; transform: rotate(-12deg); }
  .pr-hill.back { width: 320px; height: 180px; bottom: -52px; left: -95px; background: #d1dfc7; transform: rotate(16deg); }
  .pr-pet { position: relative; z-index: 1; font-size: clamp(100px, 14vw, 160px); filter: drop-shadow(0 14px 8px #52724b25); transform: rotate(-5deg); }
  .pr-illustration-note { position: absolute; z-index: 2; left: 18px; bottom: 18px; padding: 10px 13px; background: #ffffffdf; border: 1px solid #ffffff; border-radius: 13px; font-size: .84rem; font-weight: 750; }
  .pr-section-heading { display: flex; justify-content: space-between; gap: 20px; align-items: end; margin: 8px 0 20px; }
  .pr-section-heading h2 { font-size: clamp(1.6rem, 3vw, 2.15rem); letter-spacing: -.04em; margin-bottom: 7px; }
  .pr-section-heading p { color: var(--pr-muted); margin-bottom: 0; line-height: 1.6; }
  .pr-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }
  .pr-card { background: var(--pr-card); border: 1px solid var(--pr-line); border-radius: 20px; padding: 23px; }
  .pr-card-icon { display: grid; place-items: center; width: 44px; height: 44px; background: var(--pr-soft); border-radius: 14px; font-size: 23px; margin-bottom: 18px; }
  .pr-card h3 { font-size: 1.07rem; margin-bottom: 9px; letter-spacing: -.02em; }
  .pr-card p { color: var(--pr-muted); line-height: 1.65; font-size: .94rem; margin-bottom: 0; }
  .pr-notice { margin-top: 22px; display: flex; gap: 12px; align-items: flex-start; padding: 16px 18px; border: 1px solid #e9dfc9; background: #faf4e8; border-radius: 15px; color: #65553b; font-size: .9rem; line-height: 1.6; }
  .pr-notice strong { color: #4c402d; }
  .pr-page-head { padding: 30px 0 24px; }
  .pr-page-head h1 { font-size: clamp(2.2rem, 4vw, 3.3rem); }
  .pr-page-head p { color: var(--pr-muted); line-height: 1.7; max-width: 650px; }
  .pr-form-layout { display: grid; grid-template-columns: minmax(0, 1fr) 300px; gap: 22px; align-items: start; }
  .pr-form { background: white; border: 1px solid var(--pr-line); border-radius: 20px; padding: clamp(20px, 4vw, 32px); }
  .pr-field { margin-bottom: 20px; }
  .pr-field label, .pr-label { display: block; font-weight: 750; font-size: .91rem; margin-bottom: 8px; }
  .pr-field small { display: block; margin-top: 6px; color: var(--pr-muted); line-height: 1.5; }
  .pr-field input, .pr-field select, .pr-field textarea { display: block; width: 100%; min-height: 46px; border: 1px solid #d7ded5; border-radius: 11px; background: white; color: var(--pr-ink); padding: 11px 12px; }
  .pr-field textarea { min-height: 120px; resize: vertical; line-height: 1.55; }
  .pr-field input:focus, .pr-field select:focus, .pr-field textarea:focus { outline: 3px solid #236b4925; border-color: var(--pr-green); }
  .pr-radio-row { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
  .pr-radio { display: flex; align-items: center; gap: 10px; border: 1px solid var(--pr-line); border-radius: 12px; padding: 13px; cursor: pointer; }
  .pr-radio:has(input:checked) { border-color: var(--pr-green); background: var(--pr-soft); }
  .pr-radio input { accent-color: var(--pr-green); width: 16px; height: 16px; min-height: auto; }
  .pr-form-actions { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 26px; }
  .pr-side-note { background: var(--pr-soft); border-radius: 18px; padding: 21px; color: #365b42; }
  .pr-side-note h3 { margin-bottom: 10px; }
  .pr-side-note p, .pr-side-note li { font-size: .91rem; line-height: 1.65; }
  .pr-side-note ul { padding-left: 19px; margin-bottom: 0; }
  .pr-drafts { display: grid; gap: 12px; }
  .pr-draft { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; background: white; border: 1px solid var(--pr-line); border-radius: 16px; padding: 19px; }
  .pr-draft h3 { margin-bottom: 6px; }
  .pr-draft p { color: var(--pr-muted); font-size: .9rem; line-height: 1.6; margin-bottom: 8px; white-space: pre-wrap; overflow-wrap: anywhere; }
  .pr-tag { display: inline-block; padding: 5px 9px; border-radius: 999px; background: var(--pr-soft); color: var(--pr-green-dark); font-size: .75rem; font-weight: 800; }
  .pr-empty { text-align: center; border: 1px dashed #cbd6c9; background: #ffffffa8; border-radius: 18px; padding: 34px 20px; }
  .pr-empty-icon { font-size: 36px; margin-bottom: 12px; }
  .pr-empty p { max-width: 470px; margin: 0 auto 20px; color: var(--pr-muted); line-height: 1.7; }
  .pr-footer { max-width: 1120px; margin: 0 auto; padding: 22px 28px 35px; color: var(--pr-muted); font-size: .84rem; border-top: 1px solid var(--pr-line); line-height: 1.6; }
  .pr-footer a { color: var(--pr-green); }
  .pr-status { margin: 16px 0 0; padding: 13px 15px; border-radius: 11px; background: var(--pr-soft); color: var(--pr-green-dark); line-height: 1.5; }
  .pr-status.error { background: #fff0ed; color: #9c3528; }
  .pr-sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
  @media (max-width: 760px) {
    .pr-header { padding: 15px 18px; flex-wrap: wrap; }
    .pr-nav { width: 100%; overflow-x: auto; }
    .pr-nav a { white-space: nowrap; padding: 9px 11px; }
    .pr-main { padding: 8px 18px 48px; }
    .pr-hero { grid-template-columns: 1fr; gap: 26px; padding: 26px 0 36px; }
    .pr-illustration { min-height: 245px; }
    .pr-grid { grid-template-columns: 1fr; }
    .pr-form-layout { grid-template-columns: 1fr; }
    .pr-side-note { order: -1; }
    .pr-section-heading { align-items: flex-start; flex-direction: column; }
    .pr-footer { padding: 22px 18px 30px; }
  }
  @media (max-width: 420px) {
    .pr-brand { font-size: 1.1rem; }
    .pr-radio-row { grid-template-columns: 1fr; }
    .pr-draft { flex-direction: column; }
    .pr-draft .pr-button { width: 100%; }
  }
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { scroll-behavior: auto !important; transition: none !important; animation: none !important; }
  }
`;function n(i){return String(i??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]??e)}function p(){try{const i=JSON.parse(localStorage.getItem(d)??"[]");return Array.isArray(i)?i.filter(e=>e!==null&&typeof e=="object"&&typeof e.id=="string"&&(e.kind==="lost"||e.kind==="found")&&typeof e.city=="string"&&typeof e.description=="string"):[]}catch{return[]}}function m(i){if(!i)return"Data não informada";const e=i.split("-").map(Number);return e.length!==3||e.some(Number.isNaN)?i:new Intl.DateTimeFormat("pt-BR",{dateStyle:"medium",timeZone:"UTC"}).format(new Date(Date.UTC(e[0],e[1]-1,e[2])))}const h="/petrescue/".replace(/\/$/,"");class g{root=null;onClick=e=>this.handleClick(e);onSubmit=e=>this.handleSubmit(e);onPopState=()=>this.render();mount(e){this.root=e;const a=document.createElement("style");a.id="petrescue-app-styles",a.textContent=u,document.getElementById(a.id)||document.head.appendChild(a),e.addEventListener("click",this.onClick),e.addEventListener("submit",this.onSubmit),window.addEventListener("popstate",this.onPopState),this.render()}unmount(){this.root?.removeEventListener("click",this.onClick),this.root?.removeEventListener("submit",this.onSubmit),window.removeEventListener("popstate",this.onPopState),this.root=null}routeUrl(e){return`${h}/#${e}`}navigate(e){const a=this.routeUrl(e);`${window.location.pathname}${window.location.hash}`!==a&&history.pushState({},"",a),this.render(),window.scrollTo({top:0,behavior:"auto"})}handleClick(e){const a=e.target;if(!(a instanceof Element))return;const r=a.closest("[data-route]");if(r){e.preventDefault(),this.navigate(r.dataset.route||"/");return}const t=a.closest("[data-delete-draft]");if(t){const o=t.dataset.deleteDraft,s=p().filter(c=>c.id!==o);try{localStorage.setItem(d,JSON.stringify(s)),this.render()}catch{this.showStatus("Não foi possível atualizar os rascunhos deste navegador.",!0)}}}handleSubmit(e){const a=e.target;if(!(a instanceof HTMLFormElement)||a.id!=="report-form")return;e.preventDefault();const r=new FormData(a),t={id:crypto.randomUUID?crypto.randomUUID():`${Date.now()}-${Math.random().toString(36).slice(2)}`,kind:r.get("kind")==="found"?"found":"lost",petName:String(r.get("petName")??"").trim(),species:String(r.get("species")??""),city:String(r.get("city")??"").trim(),neighborhood:String(r.get("neighborhood")??"").trim(),description:String(r.get("description")??"").trim(),seenOn:String(r.get("seenOn")??""),createdAt:new Date().toISOString()};if(!t.species||t.city.length<2||t.description.length<10||!t.seenOn){this.showStatus("Confira a espécie, a cidade, a data e a descrição (mínimo de 10 caracteres).",!0);return}const o=p();o.unshift(t);try{localStorage.setItem(d,JSON.stringify(o)),this.navigate("/me/rascunhos"),this.showStatus("Rascunho salvo neste navegador. Ele ainda não foi enviado nem compartilhado.")}catch{this.showStatus("O navegador não conseguiu guardar o rascunho. Verifique o espaço disponível e as permissões de armazenamento.",!0)}}showStatus(e,a=!1){const r=this.root?.querySelector("[data-status]");r&&(r.textContent=e,r.className=`pr-status${a?" error":""}`,r.hidden=!1,r.focus())}header(e){const a=[{href:"/",label:"Início"},{href:"/report",label:"Registrar animal"},{href:"/me/rascunhos",label:"Meus rascunhos"}];return`
      <header class="pr-header">
        <a class="pr-brand" href="${this.routeUrl("/")}" data-route="/" aria-label="PetRescue, início">
          <span class="pr-logo" aria-hidden="true">♥</span><span>PetRescue</span>
        </a>
        <nav class="pr-nav" aria-label="Navegação principal">
          ${a.map(r=>`<a href="${this.routeUrl(r.href)}" data-route="${r.href}"${e===r.href?' aria-current="page"':""}>${r.label}</a>`).join("")}
        </nav>
      </header>`}home(){return`
      <main class="pr-main">
        <section class="pr-hero" aria-labelledby="home-title">
          <div>
            <span class="pr-eyebrow">Cuidado que conecta</span>
            <h1 id="home-title">Nenhum animal deveria ficar <span class="pr-highlight">sozinho.</span></h1>
            <p class="pr-lead">Uma rede comunitária para aproximar quem vê, quem procura e quem protege animais. Cada observação pode ajudar a contar uma história — e encontrar um caminho de volta.</p>
            <div class="pr-actions">
              <a class="pr-button" href="${this.routeUrl("/report")}" data-route="/report">＋ Registrar animal</a>
              <a class="pr-button secondary" href="${this.routeUrl("/me/rascunhos")}" data-route="/me/rascunhos">Meus rascunhos</a>
            </div>
          </div>
          <div class="pr-illustration" role="img" aria-label="Ilustração de um cachorro em uma paisagem verde">
            <span class="pr-sun"></span><span class="pr-hill back"></span><span class="pr-hill"></span>
            <span class="pr-pet" aria-hidden="true">🐕</span>
            <span class="pr-illustration-note">Toda observação importa.</span>
          </div>
        </section>

        <section aria-labelledby="how-title">
          <div class="pr-section-heading">
            <div><span class="pr-eyebrow">Como podemos ajudar</span><h2 id="how-title">A comunidade faz a diferença</h2></div>
            <p>Comece com uma informação. A rede cresce com confiança.</p>
          </div>
          <div class="pr-grid">
            <article class="pr-card"><div class="pr-card-icon" aria-hidden="true">📍</div><h3>Registre uma observação</h3><p>Conte onde e quando viu um animal, com uma descrição que ajude outras pessoas a reconhecê-lo.</p></article>
            <article class="pr-card"><div class="pr-card-icon" aria-hidden="true">🔎</div><h3>Ajude a encontrar</h3><p>Informações locais podem aproximar relatos de animais perdidos e avistamentos, sempre com confirmação humana.</p></article>
            <article class="pr-card"><div class="pr-card-icon" aria-hidden="true">🤝</div><h3>Conecte quem protege</h3><p>Moradores, protetores independentes e organizações podem colaborar para que cada pista tenha um destino.</p></article>
          </div>
        </section>

        <div class="pr-notice" role="note"><span aria-hidden="true">ℹ️</span><div><strong>Versão inicial em desenvolvimento.</strong> O serviço de publicação e consulta comunitária ainda não está conectado. Por enquanto, você pode experimentar o cadastro e guardar rascunhos privados neste dispositivo. Nada será publicado ou enviado a outras pessoas.</div></div>
      </main>`}reportForm(){const e=new Date,a=`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`;return`
      <main class="pr-main">
        <div class="pr-page-head"><span class="pr-eyebrow">Compartilhe uma informação</span><h1>Registrar um animal</h1><p>Preencha o que você sabe. Não precisa conhecer a raça ou todos os detalhes. Este formulário guarda um rascunho privado; ainda não publica um alerta.</p></div>
        <div class="pr-form-layout">
          <form id="report-form" class="pr-form">
            <div class="pr-field"><span class="pr-label">Qual é a situação?</span><div class="pr-radio-row">
              <label class="pr-radio"><input type="radio" name="kind" value="lost" checked><span>🔍 Estou procurando</span></label>
              <label class="pr-radio"><input type="radio" name="kind" value="found"><span>🐾 Eu encontrei / avistei</span></label>
            </div></div>
            <div class="pr-field"><label for="petName">Nome do animal <span style="font-weight:400;color:var(--pr-muted)">(se souber)</span></label><input id="petName" name="petName" maxlength="100" placeholder="Ex.: Luna"></div>
            <div class="pr-field"><label for="species">Espécie *</label><select id="species" name="species" required><option value="">Selecione</option><option value="dog">Cachorro</option><option value="cat">Gato</option><option value="other">Outro / não sei</option></select></div>
            <div class="pr-field"><label for="city">Cidade *</label><input id="city" name="city" maxlength="100" autocomplete="address-level2" placeholder="Ex.: Porto Alegre" required minlength="2"></div>
            <div class="pr-field"><label for="neighborhood">Bairro ou região</label><input id="neighborhood" name="neighborhood" maxlength="100" placeholder="Ex.: Bom Fim"><small>Evite informar endereço residencial exato ou dados pessoais de terceiros.</small></div>
            <div class="pr-field"><label for="seenOn">Quando aconteceu? *</label><input id="seenOn" name="seenOn" type="date" max="${a}" value="${a}" required></div>
            <div class="pr-field"><label for="description">Descrição do que aconteceu *</label><textarea id="description" name="description" maxlength="1000" minlength="10" placeholder="Conte a aparência do animal, o que aconteceu e algum detalhe que possa ajudar..." required></textarea><small>De 10 a 1.000 caracteres. Não inclua informações privadas.</small></div>
            <div class="pr-form-actions"><button class="pr-button" type="submit">Guardar rascunho</button><a class="pr-button secondary" href="${this.routeUrl("/")}" data-route="/">Cancelar</a></div>
            <p class="pr-status" data-status role="status" aria-live="polite" tabindex="-1" hidden></p>
          </form>
          <aside class="pr-side-note"><h3>🐾 Algumas dicas</h3><p>Pequenos detalhes podem ajudar muito:</p><ul><li>Cor, porte e marcas visíveis.</li><li>Horário aproximado e região geral.</li><li>Comportamento ou direção em que o animal seguia.</li><li>Use apenas informações que você tem segurança em compartilhar.</li></ul><p><strong>Privacidade:</strong> o rascunho fica no armazenamento local deste navegador. Ele não é sincronizado nem enviado ao PetRescue.</p></aside>
        </div>
      </main>`}draftsPage(){const e=p();return`
      <main class="pr-main">
        <div class="pr-page-head"><span class="pr-eyebrow">Seus registros locais</span><h1>Meus rascunhos</h1><p>Revise ou exclua os registros guardados neste navegador. Eles não estão visíveis para protetores ou para outras pessoas.</p></div>
        <div class="pr-notice" role="note"><span aria-hidden="true">🔒</span><div><strong>Armazenamento local.</strong> Os rascunhos podem desaparecer se você limpar os dados do navegador. Eles não são um backup e ainda não podem ser publicados pelo aplicativo.</div></div>
        <div style="height:20px"></div>
        <p data-status role="status" aria-live="polite" tabindex="-1" hidden></p>
        ${e.length?`
      <div class="pr-drafts">${e.map(r=>`
        <article class="pr-draft">
          <div>
            <span class="pr-tag">${r.kind==="lost"?"Animal perdido":"Animal encontrado / avistado"}</span>
            <h3>${n(r.petName||"Animal sem nome informado")} · ${n({dog:"Cachorro",cat:"Gato",other:"Outro / não identificado"}[r.species]||r.species)}</h3>
            <p><strong>${n([r.neighborhood,r.city].filter(Boolean).join(" · "))}</strong><br>Data: ${n(m(r.seenOn))}<br>${n(r.description)}</p>
            <small style="color:var(--pr-muted)">Salvo em ${n(new Intl.DateTimeFormat("pt-BR",{dateStyle:"short",timeStyle:"short"}).format(new Date(r.createdAt)))}</small>
            <p><span class="pr-tag">Privado neste dispositivo · Não publicado</span></p>
          </div>
          <button type="button" class="pr-button danger small" data-delete-draft="${n(r.id)}" aria-label="Excluir rascunho de ${n(r.petName||"animal")}">Excluir rascunho</button>
        </article>`).join("")}</div>`:`
      <div class="pr-empty"><div class="pr-empty-icon" aria-hidden="true">📝</div><h2>Nenhum rascunho por aqui</h2><p>Quando você registrar um animal, poderá revisar suas informações aqui. Os rascunhos ficam somente neste navegador.</p><a class="pr-button" href="${this.routeUrl("/report")}" data-route="/report">Registrar um animal</a></div>`}
        <div class="pr-actions"><a class="pr-button" href="${this.routeUrl("/report")}" data-route="/report">＋ Novo registro</a><a class="pr-button secondary" href="${this.routeUrl("/")}" data-route="/">Voltar ao início</a></div>
      </main>`}render(){if(!this.root)return;const a=(window.location.hash.startsWith("#/")?window.location.hash.slice(1):"/").replace(/\/+$/,"")||"/";let r;a==="/report"?r=this.reportForm():a==="/me/rascunhos"?r=this.draftsPage():r=this.home(),this.root.innerHTML=`<div class="pr-app">${this.header(a)}${r}<footer class="pr-footer"><strong>PetRescue</strong> · Uma comunidade que cuida. <br>Versão inicial: registros locais de teste, sem publicação ou integração com serviços externos.</footer></div>`}}const l=document.getElementById("app");if(!l)throw new Error("PetRescue could not start: #app element was not found.");const f=new g;f.mount(l);"serviceWorker"in navigator&&navigator.serviceWorker.register("/petrescue/sw.js").catch(i=>console.error("Service worker registration failed:",i));
//# sourceMappingURL=main-DTDyzIgC.js.map

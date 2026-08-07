// Silver Studios — progressive enhancement: bilingual i18n (en/pt-BR), scroll
// reveals, and off-screen animation pausing. All motion itself lives in CSS.
// No dependencies.

// ---------- i18n ----------

// English is the source markup; every translatable element carries data-i18n
// (innerHTML) and/or data-i18n-alt (img alt). Both languages live here so a
// language switch is a pure re-render, and <title>/<meta description> follow
// the selected language too.
const LANG_KEY = "silver-studios-lang";

const I18N = {
  en: {
    "meta.title": "Silver Studios — crafting products that grow with people",
    "meta.description":
      "Silver Studios is a family studio crafting software, health experiences, and intelligent systems — products built with care, curiosity, and craftsmanship, designed to grow with people.",

    "nav.beliefs": "Beliefs",
    "nav.products": "Products",
    "nav.workshop": "Workshop",
    "nav.story": "Our Story",

    "hero.tagline": "Crafting products that grow with people.",
    "hero.subline":
      "We create software, health experiences, and intelligent systems with care, curiosity, and craftsmanship — designed to improve people's lives, today and for years to come.",
    "hero.cta": "Explore our work",

    "beliefs.title": "What We Believe",
    "beliefs.lede": "We believe great products are cultivated, not manufactured.",
    "beliefs.p1":
      "Technology should remove unnecessary effort. Health should be sustainable. Software should continuously improve.",
    "beliefs.p2":
      "The best products don't simply solve today's problems — they evolve alongside the people who use them.",

    "products.title": "Products",
    "products.intro":
      "Our philosophy, already at work. Try them right here — no installs, no accounts.",
    "products.cl.alt": "Corrida Leve app",
    "products.cl.desc":
      "A gentle running companion (em português) that takes anyone from the couch to their first light runs — adaptive plans, no pressure, no ads. Installable as a PWA.",
    "products.cl.btn": "Open Corrida Leve",
    "products.z32.alt": "Z32 gameplay",
    "products.z32.desc":
      "A high-performance game running on our Rust-native engine, compiled to WebAssembly and rendered in your browser. The first real-world validation of the workshop's interactive stack.",
    "products.z32.btn": "▶ Play Z32",

    "oss.title": "Open Source Libraries",
    "oss.intro": "The building blocks we share — free to use, inspect, and extend.",
    "oss.arslib.alt": "Robotic hands offering glowing seeds of light above a garden",
    "oss.arslib.desc":
      "The core TypeScript utility toolbelt. Zero-dependency, generic, comprehensive — math, data structures, testing, and unified persistent storage for browser and Node.",
    "oss.awc.alt": "Luminous modular components assembling into a structure",
    "oss.awc.desc":
      "Browser-native UI components, TypeScript-first. Shadow-DOM encapsulation and a mixin coordination system for gestures, pointers, and inter-component calls.",

    "workshop.title": "The Software Workshop",
    "workshop.lede":
      "Every craft has its workshop. Ours happens to include autonomous software collaborators.",
    "workshop.p":
      "We're building an environment where people and intelligent systems collaborate to design, build, test, and continuously improve software. Not to replace creativity — to amplify it.",
    "workshop.automation.alt":
      "Gardener robots harvesting glowing fruit in a sunlit vertical greenhouse",
    "workshop.automation.title": "Automation",
    "workshop.automation.p":
      "We automate implementation so people can focus on ideas. Build, test, and retry loops run autonomously — people define <em>what</em>, the workshop decides <em>how</em>. Humans approve specifications and validate behavior, not lines of code.",
    "workshop.foundations.alt":
      "A great tree whose glowing roots spread through the soil, nourishing terraced workshops across a sunlit hillside",
    "workshop.foundations.title": "Shared Foundations",
    "workshop.foundations.p":
      "Every project strengthens the next. Reusable logic always flows upstream into the shared foundation — from the utility toolbelt and UI components to the engine and the deployed product.",
    "workshop.craft.alt":
      "An organically grown studio house surrounded by a hand-tended garden",
    "workshop.craft.title": "Craftsmanship",
    "workshop.craft.p":
      "Automation helps us move faster. Craftsmanship helps us move in the right direction. Every product is refined through observation, iteration, and care — not rushed to market. We believe lasting quality comes from thoughtful design and continuous learning.",

    "story.title": "Our Story",
    "story.intro": "Two paths, one philosophy.",
    "story.lede": "We came from different worlds.",
    "story.p1":
      "One of us spent three decades building software systems. The other has spent years helping people build healthier lives through movement.",
    "story.p2":
      "At first glance those paths seem unrelated. To us, they lead to the same place: lasting progress comes from thoughtful systems — not unnecessary complexity.",
    "story.p3":
      "Silver Studios exists to explore that idea through the products we create.",
    "story.name.title": "Why &ldquo;Silver Studios&rdquo;?",
    "story.name.p1": "The name Silver Studios has a family origin.",
    "story.name.p2":
      "Years ago, our daughter imagined becoming an artist. She translated our family name, Silva, into Silver — and dreamed of one day creating a studio under that name.",
    "story.name.p3":
      "When we decided to begin this new chapter together, we asked if we could carry that dream forward.",
    "story.name.p4":
      "Today, Silver Studios represents more than software. It's a place where different forms of creativity meet.",

    "forward.title": "Looking Forward",
    "forward.lede":
      "We're building this company slowly. Independently. One product at a time.",
    "forward.p": "Because we believe meaningful things aren't rushed.",
    "forward.m1": "We believe technology should help people flourish.",
    "forward.m2": "We believe health should be sustainable.",
    "forward.m3": "We believe craftsmanship still matters.",
    "forward.m4": "We believe the best products grow over time.",

    "footer.tagline": "Software grown, not assembled.",
    "footer.openSource": "Open Source",
    "footer.backToTop": "Back to top",
    "footer.identity": "Built in Brazil. Crafted for everyone.",
    "footer.fine":
      "All imagery on this page was generated locally — no stock photos, no tracking.",
  },

  pt: {
    "meta.title": "Silver Studios — criando produtos que crescem com as pessoas",
    "meta.description":
      "Silver Studios é um estúdio familiar que cria software, experiências de saúde e sistemas inteligentes — produtos feitos com cuidado, curiosidade e artesanato, projetados para crescer com as pessoas.",

    "nav.beliefs": "Crenças",
    "nav.products": "Produtos",
    "nav.workshop": "Ateliê",
    "nav.story": "Nossa História",

    "hero.tagline": "Criando produtos que crescem com as pessoas.",
    "hero.subline":
      "Criamos software, experiências de saúde e sistemas inteligentes com cuidado, curiosidade e artesanato — projetados para melhorar a vida das pessoas, hoje e por muitos anos.",
    "hero.cta": "Explore nosso trabalho",

    "beliefs.title": "No Que Acreditamos",
    "beliefs.lede":
      "Acreditamos que grandes produtos são cultivados, não manufaturados.",
    "beliefs.p1":
      "Tecnologia deve remover esforço desnecessário. Saúde deve ser sustentável. Software deve melhorar continuamente.",
    "beliefs.p2":
      "Os melhores produtos não apenas resolvem os problemas de hoje — eles evoluem junto com as pessoas que os usam.",

    "products.title": "Produtos",
    "products.intro":
      "Nossa filosofia, já em ação. Experimente aqui mesmo — sem instalação, sem contas.",
    "products.cl.alt": "Aplicativo Corrida Leve",
    "products.cl.desc":
      "Um companheiro gentil de corrida que leva qualquer pessoa do sofá às suas primeiras corridas leves — planos adaptativos, sem pressão, sem anúncios. Instalável como PWA.",
    "products.cl.btn": "Abrir Corrida Leve",
    "products.z32.alt": "Gameplay de Z32",
    "products.z32.desc":
      "Um jogo de alta performance rodando em nossa engine nativa em Rust, compilada para WebAssembly e renderizada no seu navegador. A primeira validação em mundo real da stack interativa do ateliê.",
    "products.z32.btn": "▶ Jogar Z32",

    "oss.title": "Bibliotecas Open Source",
    "oss.intro":
      "Os blocos de construção que compartilhamos — livres para usar, inspecionar e estender.",
    "oss.arslib.alt": "Mãos robóticas oferecendo sementes de luz brilhantes sobre um jardim",
    "oss.arslib.desc":
      "O cinto de utilidades TypeScript essencial. Zero dependências, genérico, abrangente — matemática, estruturas de dados, testes e armazenamento persistente unificado para navegador e Node.",
    "oss.awc.alt": "Componentes modulares luminosos se montando em uma estrutura",
    "oss.awc.desc":
      "Componentes de UI nativos do navegador, com TypeScript em primeiro lugar. Encapsulamento via Shadow DOM e um sistema de coordenação por mixins para gestos, ponteiros e chamadas entre componentes.",

    "workshop.title": "O Ateliê de Software",
    "workshop.lede":
      "Todo ofício tem seu ateliê. O nosso, por acaso, inclui colaboradores de software autônomos.",
    "workshop.p":
      "Estamos construindo um ambiente onde pessoas e sistemas inteligentes colaboram para projetar, construir, testar e melhorar software continuamente. Não para substituir a criatividade — para amplificá-la.",
    "workshop.automation.alt":
      "Robôs jardineiros colhendo frutos brilhantes em uma estufa vertical ensolarada",
    "workshop.automation.title": "Automação",
    "workshop.automation.p":
      "Automatizamos a implementação para que as pessoas se concentrem nas ideias. Ciclos de construir, testar e tentar de novo rodam de forma autônoma — as pessoas definem <em>o quê</em>, o ateliê decide <em>como</em>. Humanos aprovam especificações e validam comportamento, não linhas de código.",
    "workshop.foundations.alt":
      "Uma grande árvore cujas raízes brilhantes se espalham pelo solo, nutrindo ateliês em terraços por uma encosta ensolarada",
    "workshop.foundations.title": "Fundamentos Compartilhados",
    "workshop.foundations.p":
      "Cada projeto fortalece o próximo. Lógica reutilizável sempre flui de volta para o fundamento compartilhado — do cinto de utilidades e componentes de UI até a engine e o produto em produção.",
    "workshop.craft.alt":
      "Uma casa-ateliê crescida organicamente, cercada por um jardim cuidado à mão",
    "workshop.craft.title": "Artesanato",
    "workshop.craft.p":
      "A automação nos ajuda a ir mais rápido. O artesanato nos ajuda a ir na direção certa. Cada produto é refinado por observação, iteração e cuidado — nunca apressado para o mercado. Acreditamos que qualidade duradoura vem de design criterioso e aprendizado contínuo.",

    "story.title": "Nossa História",
    "story.intro": "Dois caminhos, uma filosofia.",
    "story.lede": "Viemos de mundos diferentes.",
    "story.p1":
      "Um de nós passou três décadas construindo sistemas de software. O outro passou anos ajudando pessoas a construir vidas mais saudáveis por meio do movimento.",
    "story.p2":
      "À primeira vista, esses caminhos parecem sem relação. Para nós, levam ao mesmo lugar: progresso duradouro vem de sistemas bem pensados — não de complexidade desnecessária.",
    "story.p3":
      "A Silver Studios existe para explorar essa ideia por meio dos produtos que criamos.",
    "story.name.title": "Por que &ldquo;Silver Studios&rdquo;?",
    "story.name.p1": "O nome Silver Studios tem uma origem familiar.",
    "story.name.p2":
      "Anos atrás, nossa filha imaginou se tornar artista. Ela traduziu nosso nome de família, Silva, para Silver — e sonhou em um dia criar um estúdio com esse nome.",
    "story.name.p3":
      "Quando decidimos começar esse novo capítulo juntos, perguntamos se poderíamos levar esse sonho adiante.",
    "story.name.p4":
      "Hoje, Silver Studios representa mais do que software. É um lugar onde diferentes formas de criatividade se encontram.",

    "forward.title": "Olhando para o Futuro",
    "forward.lede":
      "Estamos construindo esta empresa devagar. De forma independente. Um produto de cada vez.",
    "forward.p": "Porque acreditamos que coisas significativas não têm pressa.",
    "forward.m1": "Acreditamos que tecnologia deve ajudar as pessoas a florescer.",
    "forward.m2": "Acreditamos que saúde deve ser sustentável.",
    "forward.m3": "Acreditamos que artesanato ainda importa.",
    "forward.m4": "Acreditamos que os melhores produtos crescem com o tempo.",

    "footer.tagline": "Software cultivado, não montado.",
    "footer.openSource": "Open Source",
    "footer.backToTop": "Voltar ao topo",
    "footer.identity": "Feito no Brasil. Criado para todos.",
    "footer.fine":
      "Todas as imagens desta página foram geradas localmente — sem bancos de imagem, sem rastreamento.",
  },
};

// Saved choice wins; otherwise Portuguese browsers get pt-BR, everything else
// gets English.
function detectLang() {
  const saved = localStorage.getItem(LANG_KEY);
  if (saved === "en" || saved === "pt") return saved;
  return (navigator.language || "").toLowerCase().startsWith("pt") ? "pt" : "en";
}

function applyLang(lang) {
  const t = I18N[lang];
  document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
  document.title = t["meta.title"];
  document
    .querySelector('meta[name="description"]')
    .setAttribute("content", t["meta.description"]);
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const text = t[el.dataset.i18n];
    if (text != null) el.innerHTML = text;
  });
  document.querySelectorAll("[data-i18n-alt]").forEach((el) => {
    const text = t[el.dataset.i18nAlt];
    if (text != null) el.setAttribute("alt", text);
  });
  document
    .querySelectorAll(".lang-btn")
    .forEach((btn) => btn.classList.toggle("active", btn.dataset.lang === lang));
}

function setLang(lang) {
  localStorage.setItem(LANG_KEY, lang);
  applyLang(lang);
}

document.querySelectorAll(".lang-btn").forEach((btn) => {
  btn.addEventListener("click", () => setLang(btn.dataset.lang));
});

applyLang(detectLang());

// Camera-motion stills keep animating even when scrolled away, which costs
// compositing work for nothing. Pause them until they are near the viewport.
const kbObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      entry.target.classList.toggle("kb-idle", !entry.isIntersecting);
    }
  },
  { rootMargin: "150px" }
);

document.querySelectorAll(".kb").forEach((el) => kbObserver.observe(el));

// Scroll reveal animations (skipped under reduced-motion via CSS).
const revealObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      }
    }
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

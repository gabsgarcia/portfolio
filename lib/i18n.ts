export type Lang = "pt" | "en";

export const EMAIL = "gabriella.rv.garcia@gmail.com";
export const LINKEDIN = "https://linkedin.com/in/gabriella-rv-garcia";
export const GITHUB = "https://github.com/gabsgarcia";

/** Where each page lives in each language, so the language switch keeps you on the same page. */
export function homePath(lang: Lang) {
  return lang === "pt" ? "/" : "/en";
}

export function projectPath(lang: Lang, slug: string) {
  return lang === "pt" ? `/projetos/${slug}` : `/en/projects/${slug}`;
}

export function labPath(lang: Lang) {
  return lang === "pt" ? "/lab" : "/en/lab";
}

export const dict = {
  pt: {
    metaTitle: "Gabi Garcia · Desenvolvedora full-stack",
    metaDescription:
      "Sites rápidos para pequenos negócios, produtos com IA e sistemas web. Desenvolvedora full-stack e professora na Le Wagon.",
    nav: { work: "Projetos", method: "Como trabalho", lab: "Lab", contact: "Contato", otherLang: "EN", otherLangLabel: "Read in English" },
    hero: {
      intro:
        "Desenvolvedora full-stack e professora na Le Wagon. Faço sites rápidos para pequenos negócios e produtos com IA que funcionam de verdade.",
      primary: "Ver projetos",
      accent: "Conversar comigo",
    },
    facts: "Me formei no bootcamp da Le Wagon em 2021 e hoje dou aula nele. Atendo em português e inglês, no Brasil e fora. Trabalho remoto, com entregas toda semana e um link para você acompanhar o site sendo construído.",
    work: { title: "Projetos", lead: "Produtos no ar, com código, decisões e o que cada um resolve.", caseLink: "Ver o case", liveLink: "Abrir o site", codeLink: "Ver o código" },
    services: {
      title: "O que eu faço",
      items: [
        { name: "Sites para pequenos negócios", text: "Rápidos, feitos para o celular, fáceis de achar no Google, com WhatsApp e contato à mão." },
        { name: "Produtos com IA", text: "Aplicações em que a IA faz um trabalho real e avisa quando não tem certeza." },
        { name: "Sistemas web", text: "Em Ruby on Rails ou Next.js, com login, banco de dados e deploy." },
        { name: "Dados", text: "Limpeza, modelagem e checagem de dados para que os números sejam confiáveis." },
      ],
    },
    method: {
      title: "Como eu trabalho",
      lead: "Uso IA para ir mais rápido. A direção, o gosto e a revisão são meus.",
      steps: [
        { name: "Entender antes de codar", text: "Começo com um resumo curto: para quem é, o que incomoda e qual é a menor versão útil." },
        { name: "Entregas pequenas e frequentes", text: "Cada mudança ganha um link de prévia. Você vê o progresso a cada poucos dias." },
        { name: "IA como ferramenta, não piloto automático", text: "Reviso, testo e assumo tudo o que vai ao ar. Nada de template genérico." },
        { name: "Checklist antes de publicar", text: "Funciona no celular, carrega rápido, é acessível e tem texto de verdade." },
        { name: "Você entende o que é seu", text: "Todo projeto termina com uma explicação clara de como funciona, como atualizar e quanto custa manter." },
      ],
    },
    teaching: {
      title: "O que dar aula me trouxe",
      items: [
        "Explicar tecnologia em palavras simples. Faço isso todo dia com alunos, então você sempre sabe o que está acontecendo e por quê.",
        "Ler e corrigir código dos outros rápido. Depurar dezenas de projetos de alunos ao mesmo tempo é um ótimo treino.",
        "Revisar código todos os dias, a habilidade que mais importa agora que a IA escreve tanto código.",
        "Aprender stacks novas rápido e organizar o trabalho para que outra pessoa consiga continuar.",
      ],
    },
    skills: { title: "Ferramentas" },
    contact: {
      title: "Tem um projeto em mente?",
      text: "Me conte o que você precisa. Respondo em português ou inglês.",
      button: "Mandar um e-mail",
    },
    avail: { long: "Disponível para freelas e vagas", short: "Disponível", button: "Conversar" },
    footer: "Feito com Next.js e revisado à mão.",
    back: "Voltar para o início",
    backToWork: "Voltar para os projetos",
    caseLabels: { problem: "O problema", solution: "O que eu construí", decisions: "Decisões que importam", stack: "Stack", links: "Links", codePrivate: "Código privado" },
  },
  en: {
    metaTitle: "Gabi Garcia · Full-stack developer",
    metaDescription:
      "Fast websites for small businesses, AI products and web apps. Full-stack developer and Le Wagon teacher.",
    nav: { work: "Work", method: "How I work", lab: "Lab", contact: "Contact", otherLang: "PT", otherLangLabel: "Ler em português" },
    hero: {
      intro:
        "Full-stack developer and Le Wagon teacher. I build fast websites for small businesses and AI products that actually work.",
      primary: "See my work",
      accent: "Let's talk",
    },
    facts: "I graduated from the Le Wagon bootcamp in 2021 and now teach it. I work in English and Portuguese, with clients in Brazil and abroad. I work remotely, ship every week and give you a preview link to watch your site take shape.",
    work: { title: "Work", lead: "Live products, with the code, the decisions and what each one solves.", caseLink: "Read the case study", liveLink: "Open the site", codeLink: "See the code" },
    services: {
      title: "What I build",
      items: [
        { name: "Websites for small businesses", text: "Fast, mobile-first, easy to find on Google, with WhatsApp and contact built in." },
        { name: "Products with AI inside", text: "Apps where the AI does real work and says when it isn't sure." },
        { name: "Web apps", text: "Ruby on Rails or Next.js, with auth, database and deploy." },
        { name: "Data", text: "Cleaning, modelling and checking data so the numbers can be trusted." },
      ],
    },
    method: {
      title: "How I work",
      lead: "I use AI to move faster. The direction, the taste and the review are mine.",
      steps: [
        { name: "Understand before coding", text: "I start with a short brief: who it is for, what hurts, what the smallest useful version is." },
        { name: "Ship small, ship often", text: "Every change gets a preview link, so you see progress every few days." },
        { name: "AI as a tool, not an autopilot", text: "I review, test and take responsibility for everything that ships. No generic templates." },
        { name: "A checklist before launch", text: "Works on a phone, loads fast, is accessible and has real copy." },
        { name: "You understand what you own", text: "Every project ends with a clear handover: how it works, how to update it, what it costs to run." },
      ],
    },
    teaching: {
      title: "What teaching brings",
      items: [
        "Explaining technical things in plain words. I do it every day with students, so you always know what is happening and why.",
        "Reading and fixing other people's code fast. Debugging dozens of student projects at once is great training.",
        "Reviewing code every day, the skill that matters most now that AI writes so much of it.",
        "Learning new stacks quickly and structuring work so someone else can pick it up.",
      ],
    },
    skills: { title: "Tools" },
    contact: {
      title: "Have a project in mind?",
      text: "Tell me what you need. I reply in English or Portuguese.",
      button: "Send me an email",
    },
    avail: { long: "Available for freelance and full-time roles", short: "Available", button: "Let's talk" },
    footer: "Built with Next.js and reviewed by hand.",
    back: "Back to home",
    backToWork: "Back to all work",
    caseLabels: { problem: "The problem", solution: "What I built", decisions: "Decisions that matter", stack: "Stack", links: "Links", codePrivate: "Private code" },
  },
} as const;

export type Dict = (typeof dict)[Lang];

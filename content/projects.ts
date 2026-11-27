// Every project in the portfolio lives here.
// To add one: copy an entry, fill both languages, and pick a cover
// (or add a new one in components/Cover.tsx). Projects with `caseStudy`
// get their own page; the others link straight to the site or the code.

import type { Lang } from "@/lib/i18n";

type T = Record<Lang, string>;

export type CoverKind = "rongalong" | "kissa" | "kanban" | "data";

export type Project = {
  slug: string;
  title: string;
  tag: T;
  summary: T;
  stack: string[];
  cover: CoverKind;
  live?: string;
  code?: string;
  caseStudy?: {
    lead: T;
    problem: Record<Lang, string[]>;
    solution: Record<Lang, string[]>;
    decisions: Record<Lang, { name: string; text: string }[]>;
  };
};

export const projects: Project[] = [
  {
    slug: "rongalong",
    title: "RongAlong",
    tag: { pt: "Produto com IA", en: "AI product" },
    summary: {
      pt: "Fãs cantam músicas tailandesas sem saber ler tailandês: romanização e tradução linha por linha, com aviso onde a IA não tem certeza.",
      en: "Fans sing Thai songs without reading Thai: line-by-line romanization and translation, with a warning where the AI isn't sure.",
    },
    stack: ["Next.js", "Supabase", "Claude API", "Vercel"],
    cover: "rongalong",
    live: "https://rongalong.vercel.app",
    caseStudy: {
      lead: {
        pt: "Cante músicas tailandesas no dia em que saem, mesmo sem ler tailandês.",
        en: "Sing Thai songs the day they come out, even if you can't read Thai.",
      },
      problem: {
        pt: [
          "Fãs latinos e europeus de séries e música tailandesa querem cantar as trilhas, mas não leem o alfabeto tailandês. Ficam presos a imitar o som de ouvido, numa língua muito diferente da sua.",
          "Romanizações feitas por fãs existem para as músicas mais famosas, demoram a sair e quase nunca dizem onde podem estar erradas.",
        ],
        en: [
          "Latin American and European fans of Thai series and music want to sing the soundtracks, but can't read the Thai alphabet. They end up copying the sound by ear, in a language very different from their own.",
          "Fan-made romanizations exist for the biggest hits, take a while to appear and rarely say where they might be wrong.",
        ],
      },
      solution: {
        pt: [
          "A fã cola a letra em tailandês. O app limpa a colagem, e a IA devolve cada linha com a romanização para cantar, a tradução e um nível de confiança.",
          "Linhas incertas aparecem com o aviso \"IA em dúvida\" e as palavras duvidosas destacadas. A fã corrige a linha, e cada correção fica salva no histórico.",
          "Um modo karaokê mostra uma linha por vez, junto do vídeo oficial do YouTube, com sincronia por toque.",
        ],
        en: [
          "A fan pastes the Thai lyrics. The app cleans the paste, and the AI returns each line with a romanization to sing, a translation and a confidence level.",
          "Uncertain lines get an \"AI unsure\" warning with the doubtful words highlighted. The fan fixes the line, and every correction is kept in the history.",
          "A karaoke mode shows one line at a time next to the official YouTube video, with tap-to-sync.",
        ],
      },
      decisions: {
        pt: [
          { name: "A IA diz quando não tem certeza", text: "O pior erro é uma romanização errada com cara de certa. Por isso cada linha traz um nível de confiança, e a correção pela fã é central no produto." },
          { name: "Guardrails antes de salvar", text: "A resposta da IA é conferida antes de entrar no banco, linhas repetidas vão uma vez só e linhas em inglês nem passam pela IA. Custo: cerca de US$ 0,08 por música." },
          { name: "Uma convenção própria de romanização", text: "\"RTGS para cantar\": vogais longas dobradas, hífen entre sílabas, sem marcas de tom, porque a melodia decide." },
          { name: "Direito autoral e privacidade", text: "Sem catálogo público de letras. Cada fã vê só as próprias músicas, garantido por Row Level Security no banco." },
          { name: "Acessibilidade desde o início", text: "Idioma declarado em cada camada, aviso com ícone e texto, tailandês com no mínimo 18px e contraste conferido por script." },
        ],
        en: [
          { name: "The AI says when it isn't sure", text: "The worst failure is a wrong romanization that looks right. So every line carries a confidence level, and fan corrections are central to the product." },
          { name: "Guardrails before saving", text: "The AI's answer is checked before it reaches the database, repeated lines go once, and English-only lines skip the AI. Cost: about US$0.08 per song." },
          { name: "Its own romanization convention", text: "\"RTGS for singing\": doubled long vowels, hyphens between syllables, no tone marks, because the melody decides." },
          { name: "Copyright and privacy", text: "No public lyrics catalogue. Each fan only sees their own songs, enforced by Row Level Security in the database." },
          { name: "Accessible from day one", text: "Language declared on every layer, warnings with icon and text, Thai at 18px minimum and contrast checked by a script." },
        ],
      },
    },
  },
  {
    slug: "kissa",
    title: "Kissa",
    tag: { pt: "Landing page", en: "Landing page" },
    summary: {
      pt: "Site de um café japonês de bairro, fictício, na Vila Mariana: cardápio na página, horário, como chegar e pedido pelo iFood, com identidade visual própria.",
      en: "Website for a fictional Japanese neighbourhood café in São Paulo: menu on the page, hours, directions and iFood ordering, with its own visual identity.",
    },
    stack: ["Next.js", "CSS", "Vercel"],
    cover: "kissa",
    live: "/demos/kissa",
    code: "https://github.com/gabsgarcia/portfolio/tree/main/components/kissa",
    caseStudy: {
      lead: {
        pt: "Um café de bairro com cara de lugar de verdade, não de template.",
        en: "A neighbourhood café that looks like a real place, not a template.",
      },
      problem: {
        pt: [
          "Os sites de cafeteria costumam ter os mesmos problemas: o cardápio é um PDF pesado e desatualizado, o horário não aparece na página inicial e o visual é o mesmo bege com caramelo de sempre.",
          "O Kissa é um café fictício, criado para mostrar o que eu entrego para um pequeno negócio de comida. Ele é um kissaten, o café de bairro japonês, com dois públicos: jovens que amam cultura japonesa e as famílias nikkeis da região, que reparam se algo é falso.",
        ],
        en: [
          "Café websites tend to share the same problems: the menu is a heavy, outdated PDF, the opening hours aren't on the home page, and the look is the same beige and caramel as everyone else's.",
          "Kissa is a fictional café, made to show what I deliver for a small food business. It is a kissaten, the Japanese neighbourhood café, with two audiences: young fans of Japanese culture and the local Japanese-Brazilian families, who notice when something is fake.",
        ],
      },
      solution: {
        pt: [
          "Uma página só, com o que o cliente procura: cardápio, horário com o dia de hoje marcado, \"aberto agora\" no horário de São Paulo, como chegar a partir do metrô e o botão do iFood sempre à mão no celular.",
          "A identidade vem do próprio assunto: verde matcha profundo, papel cru, tinta sumi e um carimbo hanko vermelho com 喫茶. O nome japonês vem explicado logo no topo e na prévia do link, para quem não lê japonês.",
        ],
        en: [
          "One page with what customers look for: the menu, opening hours with today highlighted, \"open now\" in São Paulo time, directions from the metro and the iFood button always within reach on a phone.",
          "The identity comes from the subject: deep matcha green, raw paper, sumi ink and a red hanko stamp reading 喫茶. The Japanese name is explained right at the top and in the link preview, for people who don't read Japanese.",
        ],
      },
      decisions: {
        pt: [
          { name: "Cardápio na página, não em PDF", text: "Carrega na hora no celular, o Google consegue ler e não existe o risco de dois PDFs diferentes no ar. Cada nome japonês tem uma linha dizendo o que é." },
          { name: "Um só momento de movimento", text: "O carimbo é \"carimbado\" ao abrir e a sombra de folhas balança devagar sobre a foto. O resto fica quieto, como um kissaten. Quem pede menos movimento vê tudo parado." },
          { name: "Cultura japonesa sem caricatura", text: "Nada de sakura ou samurai. Detalhes reais: escrita vertical, carimbo hanko, cortina noren, nomes do cardápio em japonês correto." },
          { name: "Fotos de detalhe, não do salão", text: "Fotos de perto, a 45 graus, com luz de janela. Detalhes do espaço no lugar de fotos do salão inteiro, que a IA costuma errar." },
          { name: "Pronto para crescer", text: "Os botões de pedido viram links reais no site de um cliente. O próximo passo é um cardápio que o dono edita sozinho, ou um sistema de pedidos próprio, sem a comissão do iFood." },
        ],
        en: [
          { name: "Menu on the page, not a PDF", text: "It loads at once on a phone, Google can read it, and there is no risk of two different PDFs online. Every Japanese name has a line saying what it is." },
          { name: "One moment of motion", text: "The stamp is pressed onto the page as it opens and a leaf shadow sways slowly over the photo. Everything else stays still, like a kissaten. Visitors who ask for less motion see it all static." },
          { name: "Japanese culture without caricature", text: "No cherry blossoms or samurai. Real details: vertical writing, a hanko stamp, a noren curtain, menu names in correct Japanese." },
          { name: "Detail shots, not the dining room", text: "Close photos at 45 degrees in window light. Details of the space instead of wide room shots, which AI tends to get wrong." },
          { name: "Ready to grow", text: "On a client's site the order buttons become real links. The next step is a menu the owner edits alone, or an ordering system of their own, without iFood's commission." },
        ],
      },
    },
  },
  {
    slug: "job-tracker",
    title: "Job Tracker",
    tag: { pt: "Ferramenta com IA", en: "AI tool" },
    summary: {
      pt: "Quadro Kanban para candidaturas de emprego, com cadastro rápido por IA a partir do link da vaga e estatísticas.",
      en: "Kanban board for job applications, with AI quick-add from a job link and stats.",
    },
    stack: ["Next.js", "TypeScript", "Supabase", "Claude API"],
    cover: "kanban",
    code: "https://github.com/gabsgarcia/job-tracker",
  },
  {
    slug: "airbnb-rio",
    title: "Airbnb Rio",
    tag: { pt: "Dados", en: "Data" },
    summary: {
      pt: "Engenharia de dados e checagem de qualidade no conjunto Inside Airbnb do Rio de Janeiro: anúncios, avaliações e calendário.",
      en: "Data engineering and quality checks on the Inside Airbnb dataset for Rio de Janeiro: listings, reviews and calendar.",
    },
    stack: ["Python", "SQL"],
    cover: "data",
    code: "https://github.com/gabsgarcia/analytics_engineering_project",
  },
];

/** A live link on this site gets the /en prefix in English; outside links stay as they are. */
export function liveHref(project: Project, lang: Lang) {
  const live = project.live;
  if (!live || !live.startsWith("/")) return live;
  return lang === "en" ? `/en${live}` : live;
}

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

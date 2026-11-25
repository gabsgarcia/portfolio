// Every project in the portfolio lives here.
// To add one: copy an entry, fill both languages, and pick a cover
// (or add a new one in components/Cover.tsx). Projects with `caseStudy`
// get their own page; the others link straight to the site or the code.

import type { Lang } from "@/lib/i18n";

type T = Record<Lang, string>;

export type CoverKind = "rongalong" | "kanban" | "data";

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
    stack: ["next.js", "supabase", "claude api", "vercel"],
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
    slug: "job-tracker",
    title: "Job Tracker",
    tag: { pt: "Ferramenta com IA", en: "AI tool" },
    summary: {
      pt: "Quadro Kanban para candidaturas de emprego, com cadastro rápido por IA a partir do link da vaga e estatísticas.",
      en: "Kanban board for job applications, with AI quick-add from a job link and stats.",
    },
    stack: ["next.js", "typescript", "supabase", "claude api"],
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
    stack: ["python", "sql"],
    cover: "data",
    code: "https://github.com/gabsgarcia/analytics_engineering_project",
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

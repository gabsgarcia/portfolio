// Kissa is a fictional café: a demo landing page for the portfolio.
// Everything the page says lives here, in both languages.
// Photos: drop the JPGs in public/demos/kissa/ with the names below and they replace
// the placeholders on the next build. Prompts to generate them are in the project's docs.

import type { Lang } from "@/lib/i18n";

type T = Record<Lang, string>;

export const kissaPath = (lang: Lang) => (lang === "pt" ? "/demos/kissa" : "/en/demos/kissa");

export type PhotoKey = "hero" | "matcha" | "sando" | "doces" | "balcao" | "noren" | "prateleira";

/** What each photo shows. Used as alt text and as the caption of the placeholder. */
export const photos: Record<PhotoKey, T> = {
  hero: {
    pt: "Matcha latte gelado num copo alto junto à janela, com sombra de folhas na parede.",
    en: "Iced matcha latte in a tall glass by the window, with leaf shadows on the wall.",
  },
  matcha: {
    pt: "Usucha recém-batido numa tigela de cerâmica escura, com o batedor de bambu ao lado.",
    en: "Freshly whisked usucha in a dark stoneware bowl, the bamboo whisk beside it.",
  },
  sando: {
    pt: "Tamago sando cortado ao meio, com o recheio cremoso de ovo à mostra.",
    en: "Tamago sando cut in half, showing the creamy egg filling.",
  },
  doces: {
    pt: "Purin, o pudim japonês dos kissatens, com calda de caramelo escorrendo num pratinho de cerâmica.",
    en: "Purin, the kissaten's custard pudding, with caramel running down onto a small ceramic plate.",
  },
  balcao: {
    pt: "Canto do balcão de madeira com chaleira de café coado e xícaras artesanais.",
    en: "Corner of the wooden counter with a pour-over kettle and handmade cups.",
  },
  noren: {
    pt: "Cortina noren de linho cru na porta, mexendo com o vento da manhã.",
    en: "Undyed linen noren curtain in the doorway, moving in the morning breeze.",
  },
  prateleira: {
    pt: "Prateleira com tigelas de matcha de esmaltes diferentes.",
    en: "Shelf of matcha bowls in different glazes.",
  },
};

export type MenuItem = { name: string; jp?: string; note: T; price: number };
export type MenuGroup = { id: string; title: T; photo?: PhotoKey; items: MenuItem[] };

export const menu: MenuGroup[] = [
  {
    id: "matcha",
    title: { pt: "Matcha", en: "Matcha" },
    photo: "matcha",
    items: [
      {
        name: "Matcha latte",
        jp: "抹茶ラテ",
        note: { pt: "Matcha batido na hora com leite, quente ou gelado.", en: "Matcha whisked to order with milk, hot or iced." },
        price: 22,
      },
      {
        name: "Usucha",
        jp: "薄茶",
        note: { pt: "O matcha tradicional, só com água. Leve e com espuma fina.", en: "Traditional matcha with water only. Light, with a fine foam." },
        price: 18,
      },
      {
        name: "Matcha tônica",
        jp: "抹茶トニック",
        note: { pt: "Matcha sobre água tônica e gelo, com casca de yuzu.", en: "Matcha over tonic water and ice, with yuzu peel." },
        price: 24,
      },
    ],
  },
  {
    id: "cafe",
    title: { pt: "Café", en: "Coffee" },
    items: [
      {
        name: "Coado",
        jp: "ハンドドリップ",
        note: { pt: "Grãos de pequenos produtores da Mantiqueira, passados na hora.", en: "Beans from small Mantiqueira farms, poured over to order." },
        price: 12,
      },
      {
        name: "Espresso",
        jp: "エスプレッソ",
        note: { pt: "Curto e encorpado.", en: "Short and full-bodied." },
        price: 8,
      },
      {
        name: "Latte",
        jp: "カフェラテ",
        note: { pt: "Espresso com leite vaporizado.", en: "Espresso with steamed milk." },
        price: 14,
      },
    ],
  },
  {
    id: "salgados",
    title: { pt: "Salgados", en: "Savoury" },
    photo: "sando",
    items: [
      {
        name: "Tamago sando",
        jp: "玉子サンド",
        note: { pt: "O clássico dos kissatens: pão de leite macio e salada de ovo cremosa.", en: "The kissaten classic: soft milk bread and creamy egg salad." },
        price: 28,
      },
      {
        name: "Katsu sando",
        jp: "カツサンド",
        note: { pt: "Filé suíno empanado, repolho fino e molho tonkatsu.", en: "Breaded pork cutlet, shredded cabbage and tonkatsu sauce." },
        price: 34,
      },
      {
        name: "Korokke sando",
        jp: "コロッケサンド",
        note: { pt: "Croquete de batata e repolho. A opção vegetariana.", en: "Potato croquette and cabbage. The vegetarian one." },
        price: 26,
      },
      {
        name: "Pão de queijo com missô",
        note: { pt: "A pontinha brasileira da casa: meia cura com um toque de missô.", en: "The house's Brazilian touch: Minas cheese with a hint of miso." },
        price: 9,
      },
    ],
  },
  {
    id: "doces",
    title: { pt: "Doces", en: "Sweets" },
    photo: "doces",
    items: [
      {
        name: "Purin",
        jp: "プリン",
        note: {
          pt: "O pudim dos kissatens: pequeno, firme e com calda de caramelo amargo. Primo japonês do nosso pudim.",
          en: "The kissaten pudding: small, firm, with a bitter caramel sauce. A cousin of Brazil's pudim.",
        },
        price: 16,
      },
      {
        name: "Brownie de matcha",
        jp: "抹茶ブラウニー",
        note: { pt: "Chocolate branco e matcha, úmido no meio.", en: "White chocolate and matcha, fudgy in the middle." },
        price: 14,
      },
    ],
  },
];

/** Opening hours. Day 0 is Sunday, like JavaScript's getDay(). Null means closed. */
export const hours: { days: number[]; open: number; close: number }[] = [
  { days: [2, 3, 4, 5], open: 8, close: 19 },
  { days: [6, 0], open: 9, close: 18 },
];

export const dayNames: Record<Lang, string[]> = {
  pt: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
  en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
};

export const copy = {
  pt: {
    metaTitle: "Kissa 喫茶 · café japonês na Vila Mariana",
    metaDescription:
      "喫茶 (kissa) é o café de bairro japonês, onde se senta sem pressa. Matcha batido na hora, sandos e café coado na Vila Mariana, São Paulo.",
    skip: "Pular para o conteúdo",
    nav: { menu: "Cardápio", visit: "Como chegar", order: "Pedir no iFood", lang: "English", langShort: "EN" },
    meaning: {
      word: "kissa",
      text: "o café de bairro japonês, onde se senta sem pressa.",
    },
    lead: "Matcha batido na hora, sandos de pão macio e café coado, a quatro minutos do metrô Ana Rosa.",
    vertical: "ゆっくり、一杯どうぞ。",
    verticalMeaning: "“Fique à vontade, tome um com calma.”",
    ctaVisit: "Como chegar",
    menuTitle: "Cardápio",
    menuLead: "Os nomes em japonês vêm com uma linha explicando o que são. Pergunte no balcão se quiser saber mais.",
    currency: "R$",
    placeTitle: "Um kissaten na Vila Mariana",
    placeText: [
      "No Japão, kissaten são os cafés de bairro que existem há décadas: balcão de madeira, pouca gente, ninguém com pressa. Você pede, senta e o tempo passa mais devagar.",
      "O Kissa trouxe essa ideia para perto da Liberdade. São doze lugares, uma janela grande e matcha de Uji batido na sua frente.",
    ],
    visitTitle: "Como chegar",
    address: "Vila Mariana, São Paulo",
    metro: "4 minutos a pé do metrô Ana Rosa (linhas 1 e 2)",
    hoursTitle: "Horário",
    closed: "Fechado",
    today: "hoje",
    openNow: "Aberto agora, até as {close}",
    closedNow: "Fechado agora",
    orderTitle: "Peça pelo iFood ou fale com a gente",
    whatsapp: "WhatsApp",
    instagram: "Instagram",
    mapLabel: "Mapa desenhado: o Kissa fica a quatro quarteirões da estação Ana Rosa.",
    mapStation: "Metrô Ana Rosa",
    mapWalk: "4 min a pé",
    demoToast: {
      ifood: "Esta é uma demo. No site de verdade, este botão abre o Kissa no iFood.",
      whatsapp: "Esta é uma demo. No site de verdade, abre uma conversa no WhatsApp do café.",
      instagram: "Esta é uma demo. No site de verdade, abre o Instagram do café.",
    },
    footerNote: "O Kissa é um café fictício, criado por Gabi Garcia como projeto de portfólio. As fotos foram geradas com IA.",
    footerLink: "Ver o case",
  },
  en: {
    metaTitle: "Kissa 喫茶 · Japanese café in Vila Mariana",
    metaDescription:
      "喫茶 (kissa) is the Japanese neighbourhood café, where nobody is in a hurry. Matcha whisked to order, sandos and pour-over coffee in Vila Mariana, São Paulo.",
    skip: "Skip to content",
    nav: { menu: "Menu", visit: "Find us", order: "Order on iFood", lang: "Português", langShort: "PT" },
    meaning: {
      word: "kissa",
      text: "the Japanese neighbourhood café, where nobody is in a hurry.",
    },
    lead: "Matcha whisked to order, soft-bread sandos and pour-over coffee, four minutes from Ana Rosa station.",
    vertical: "ゆっくり、一杯どうぞ。",
    verticalMeaning: "“Take your time, enjoy a cup.”",
    ctaVisit: "Find us",
    menuTitle: "Menu",
    menuLead: "Every Japanese name comes with a line on what it is. Ask at the counter if you want to know more.",
    currency: "R$",
    placeTitle: "A kissaten in Vila Mariana",
    placeText: [
      "In Japan, kissaten are neighbourhood cafés that have been around for decades: a wooden counter, a few regulars, nobody in a hurry. You order, sit down and time slows.",
      "Kissa brings that idea close to Liberdade, São Paulo's Japanese quarter. Twelve seats, one big window and Uji matcha whisked in front of you.",
    ],
    visitTitle: "Find us",
    address: "Vila Mariana, São Paulo",
    metro: "4 minutes on foot from Ana Rosa station (lines 1 and 2)",
    hoursTitle: "Opening hours",
    closed: "Closed",
    today: "today",
    openNow: "Open now, until {close}",
    closedNow: "Closed now",
    orderTitle: "Order on iFood or get in touch",
    whatsapp: "WhatsApp",
    instagram: "Instagram",
    mapLabel: "Hand-drawn map: Kissa is four blocks from Ana Rosa station.",
    mapStation: "Ana Rosa station",
    mapWalk: "4 min walk",
    demoToast: {
      ifood: "This is a demo. On a real site, this button opens Kissa on iFood.",
      whatsapp: "This is a demo. On a real site, this opens a WhatsApp chat with the café.",
      instagram: "This is a demo. On a real site, this opens the café's Instagram.",
    },
    footerNote: "Kissa is a fictional café, made by Gabi Garcia as a portfolio project. The photos were generated with AI.",
    footerLink: "See the case study",
  },
} satisfies Record<Lang, unknown>;

export type KissaCopy = (typeof copy)[Lang];

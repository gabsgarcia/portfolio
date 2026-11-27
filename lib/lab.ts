import type { Lang } from "./i18n";

/** Copy for the Lab page: motion experiments that show what Gabi can deliver beyond a simple site. */

type Experiment = {
  title: string;
  pitch: string;
  stack: string;
  howTitle: string;
  how: string[];
  /** Closing nudge under each experiment: invites the visitor to ask for it on their own site. */
  cta: { title: string; text: string; button: string; subject: string };
};

export type LabCopy = {
  metaTitle: string;
  metaDescription: string;
  title: string;
  lead: string;
  note: string;
  cafe: { brand: string; place: string; lines: string[]; cta: string; hint: string };
  gem: { kicker: string; title: string; text: string; hint: string; fallback: string };
  experiments: [Experiment, Experiment];
};

export const labCopy: Record<Lang, LabCopy> = {
  pt: {
    metaTitle: "Lab de movimento",
    metaDescription: "Experimentos de hero com rolagem, parallax e 3D, feitos com ferramentas gratuitas e pensados para rodar bem no celular.",
    title: "Quando o site pede mais movimento",
    lead: "A maioria dos pequenos negócios precisa de um site rápido e claro. Alguns lançamentos pedem mais. Estes experimentos mostram o que eu consigo entregar quando é o caso.",
    note: "Cada experimento tem a sua própria identidade visual, porque cada marca deveria ter a sua. Com \"reduzir movimento\" ligado no seu aparelho, tudo aparece parado e legível.",
    cafe: {
      brand: "Torra",
      place: "café de bairro, desde 2019",
      lines: ["Torrado aqui.", "Moído na hora.", "Servido sem pressa."],
      cta: "Ver o cardápio",
      hint: "Role para baixo",
    },
    gem: {
      kicker: "Ruby on Rails",
      title: "Ruby é o meu ofício.",
      text: "Uma gema lapidada no código, sem arquivo 3D. Mexa o mouse ou role a página para girar.",
      hint: "Arraste o mouse por cima",
      fallback: "Seu navegador não mostra 3D, então aqui fica uma versão parada da gema.",
    },
    experiments: [
      {
        title: "Uma rolagem que conta a história",
        pitch: "Hero de uma cafeteria fictícia. A seção fica presa na tela e a rolagem vira a linha do tempo: a xícara cresce, os grãos se espalham em profundidade e o fundo escurece como a torra.",
        stack: "GSAP, ScrollTrigger, CSS puro",
        howTitle: "Como funciona",
        how: [
          "Pin + scrub: o ScrollTrigger prende a seção e liga a animação à barra de rolagem. Rolar para cima volta a animação.",
          "Parallax por profundidade: cada grão tem um valor de profundidade. Os de longe andam menos, são menores e ficam desfocados.",
          "Só transform e opacity: a placa de vídeo move as camadas sem recalcular o layout, por isso fica liso no celular.",
          "gsap.matchMedia: com \"reduzir movimento\" ligado, nada é preso nem animado e a composição final aparece parada.",
          "Nenhuma imagem: a xícara e os grãos são CSS. A página carrega rápido e nada fica borrado em telas retina.",
        ],
        cta: {
          title: "Gostou? Dá para ter isso no seu site.",
          text: "A rolagem pode contar a história da sua marca, do seu produto ou do seu cardápio.",
          button: "Vamos conversar",
          subject: "Quero uma rolagem que conta a história no meu site",
        },
      },
      {
        title: "Um objeto 3D que responde a você",
        pitch: "Uma gema de rubi, porque Ruby é a linguagem que eu mais uso. Ela segue o mouse, gira com a rolagem e reflete um estúdio de luz criado dentro do navegador.",
        stack: "Three.js, React Three Fiber",
        howTitle: "Como funciona",
        how: [
          "Geometria no código: o LatheGeometry gira um perfil de 6 pontos em 8 lados e forma a lapidação. Nenhum modelo para baixar.",
          "Facetas e reflexos: flatShading deixa cada face plana, e o RoomEnvironment cria o reflexo de um estúdio sem arquivo HDR.",
          "Carrega só quando chega perto: o Three.js vem em um import dinâmico disparado por um IntersectionObserver, então não pesa quem não rolar até aqui.",
          "Para quando sai da tela: o loop de render desliga fora da tela. Com \"reduzir movimento\", renderiza um quadro só.",
          "Plano B: sem WebGL, aparece uma gema em CSS no lugar.",
        ],
        cta: {
          title: "Gostou? Seu produto pode girar assim.",
          text: "Uma joia, um tênis, uma embalagem: o cliente vira o produto com o mouse ou o dedo.",
          button: "Vamos conversar",
          subject: "Quero um objeto 3D no meu site",
        },
      },
    ],
  },
  en: {
    metaTitle: "Motion lab",
    metaDescription: "Hero experiments with scroll, parallax and 3D, built with free tools and made to run well on phones.",
    title: "When a site needs more motion",
    lead: "Most small businesses need a fast, clear website. Some launches need more. These experiments show what I can deliver when that is the case.",
    note: "Each experiment has its own visual identity, because each brand should have its own. With \"reduce motion\" turned on in your device, everything shows still and readable.",
    cafe: {
      brand: "Torra",
      place: "neighbourhood coffee, since 2019",
      lines: ["Roasted here.", "Ground to order.", "Served slowly."],
      cta: "See the menu",
      hint: "Scroll down",
    },
    gem: {
      kicker: "Ruby on Rails",
      title: "Ruby is my craft.",
      text: "A gem cut in code, with no 3D file. Move your mouse or scroll the page to turn it.",
      hint: "Move your mouse over it",
      fallback: "Your browser does not show 3D, so here is a still version of the gem.",
    },
    experiments: [
      {
        title: "A scroll that tells the story",
        pitch: "Hero for a made-up coffee shop. The section stays pinned and scrolling becomes the timeline: the cup grows, the beans spread out in depth and the background darkens like a roast.",
        stack: "GSAP, ScrollTrigger, plain CSS",
        howTitle: "How it works",
        how: [
          "Pin + scrub: ScrollTrigger pins the section and ties the animation to the scrollbar. Scrolling back up plays it backwards.",
          "Depth parallax: each bean has a depth value. Far ones move less, are smaller and are blurred.",
          "Only transform and opacity: the GPU moves the layers without recalculating layout, so it stays smooth on phones.",
          "gsap.matchMedia: with \"reduce motion\" on, nothing is pinned or animated and the final composition shows still.",
          "No images: the cup and beans are CSS. The page loads fast and nothing blurs on retina screens.",
        ],
        cta: {
          title: "Like it? Your site can have this.",
          text: "The scroll can tell the story of your brand, your product or your menu.",
          button: "Let’s talk",
          subject: "I want a scroll story on my site",
        },
      },
      {
        title: "A 3D object that answers you",
        pitch: "A ruby gem, because Ruby is the language I use most. It follows the mouse, turns as you scroll and reflects a light studio created inside the browser.",
        stack: "Three.js, React Three Fiber",
        howTitle: "How it works",
        how: [
          "Geometry in code: LatheGeometry spins a 6-point profile around 8 sides to make the cut. No model to download.",
          "Facets and reflections: flatShading keeps each face flat, and RoomEnvironment creates a studio reflection with no HDR file.",
          "Loads only when close: Three.js comes in a dynamic import fired by an IntersectionObserver, so visitors who never scroll here never pay for it.",
          "Stops when off screen: the render loop turns off outside the viewport. With \"reduce motion\", it renders a single frame.",
          "Plan B: without WebGL, a CSS gem shows instead.",
        ],
        cta: {
          title: "Like it? Your product can turn like this.",
          text: "A piece of jewellery, a sneaker, a package: customers turn your product with a mouse or a finger.",
          button: "Let’s talk",
          subject: "I want a 3D object on my site",
        },
      },
    ],
  },
};

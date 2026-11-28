// Prumo is a fictional clinical pilates studio: a demo landing page with an AI chat.
// Everything the page says lives here, in both languages. What the chat knows lives in
// content/prumoKnowledge.ts.
// Photos: drop the JPGs in public/demos/prumo/ with the names below and they replace
// the placeholders on the next build.

import type { Lang } from "@/lib/i18n";

type T = Record<Lang, string>;

export const prumoPath = (lang: Lang) => (lang === "pt" ? "/demos/prumo" : "/en/demos/prumo");

/** A real place near the fictional studio. On a client's site this is their own address. */
const mapQuery = encodeURIComponent("Praça Diogo de Vasconcelos, Savassi, Belo Horizonte");
export const mapEmbed = (lang: Lang) =>
  `https://www.google.com/maps?q=${mapQuery}&z=16&hl=${lang === "pt" ? "pt-BR" : "en"}&output=embed`;
export const mapLink = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

export type PhotoKey = "mola" | "reformer";

/** What each photo shows. Used as alt text and as the caption of the placeholder. */
export const photos: Record<PhotoKey, T> = {
  mola: {
    pt: "Mola de aço presa à barra de madeira do Reformer, com luz de lado.",
    en: "Steel spring hooked to the Reformer's wooden bar, lit from the side.",
  },
  reformer: {
    pt: "Carrinho do Reformer com as alças de couro em repouso, visto de perto.",
    en: "The Reformer carriage with its leather straps at rest, seen up close.",
  },
};

/** Monday = 1 … Sunday = 0, like Date.getDay(). */
export const hours: { days: number[]; open: number; close: number }[] = [
  { days: [1, 2, 3, 4, 5], open: 7, close: 20 },
  { days: [6], open: 8, close: 12 },
];

export const dayNames: Record<Lang, string[]> = {
  pt: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
  en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
};

export type Price = { name: T; note: T; value: number; per: T };

export const prices: Price[] = [
  {
    name: { pt: "Avaliação", en: "Assessment" },
    note: { pt: "Uma hora, sozinha com a fisioterapeuta. É por aqui que todo mundo começa.", en: "One hour, alone with the physiotherapist. Everyone starts here." },
    value: 120,
    per: { pt: "uma vez", en: "once" },
  },
  {
    name: { pt: "1 vez por semana", en: "Once a week" },
    note: { pt: "Para manter, depois que a dor passou.", en: "To keep going once the pain is gone." },
    value: 320,
    per: { pt: "por mês", en: "per month" },
  },
  {
    name: { pt: "2 vezes por semana", en: "Twice a week" },
    note: { pt: "O que a maioria faz no começo.", en: "What most people do at first." },
    value: 480,
    per: { pt: "por mês", en: "per month" },
  },
  {
    name: { pt: "Aula avulsa", en: "Single class" },
    note: { pt: "Para repor uma falta ou para quem está de passagem.", en: "To make up a missed class, or if you're only in town for a while." },
    value: 95,
    per: { pt: "por aula", en: "per class" },
  },
];

type Copy = {
  metaTitle: string;
  metaDescription: string;
  skip: string;
  nav: { firstClass: string; prices: string; visit: string; lang: string; langShort: string; book: string };
  title: string;
  lead: string;
  facts: string[];
  ctaBook: string;
  ctaAsk: string;
  plate: { caption: string; labels: { c7: string; t12: string; l5: string; line: string } };
  forTitle: string;
  forLead: string;
  forItems: { name: string; text: string }[];
  forAlso: string;
  stepsTitle: string;
  stepsLead: string;
  steps: { name: string; text: string; time: string }[];
  stepsWear: { title: string; text: string };
  stepsSpineLabel: string;
  mythsTitle: string;
  mythsLead: string;
  myths: { myth: string; truth: string }[];
  mythLabel: string;
  truthLabel: string;
  mythsAsk: string;
  physioTitle: string;
  physio: { name: string; role: string; text: string[] };
  pricesTitle: string;
  pricesLead: string;
  insuranceTitle: string;
  insurance: string;
  cancelTitle: string;
  cancel: string;
  currency: string;
  visitTitle: string;
  address: string;
  arrival: string[];
  hoursTitle: string;
  closed: string;
  today: string;
  openNow: string;
  closedNow: string;
  mapLoad: string;
  mapNote: string;
  mapOpen: string;
  mapTitle: string;
  formTitle: string;
  formLead: string;
  form: { name: string; phone: string; message: string; honeypot: string; send: string; sent: string; required: string };
  demoToast: { whatsapp: string; form: string };
  footerNote: string;
  footerLink: string;
  chat: {
    open: string;
    title: string;
    subtitle: string;
    close: string;
    greeting: string;
    suggestions: string[];
    placeholder: string;
    inputLabel: string;
    send: string;
    stop: string;
    thinking: string;
    you: string;
    bot: string;
    disclaimer: string;
    book: string;
    reception: string;
    errors: { network: string; limit: string; offline: string; busy: string; tooLong: string };
    left: string;
  };
};

export const copy: Record<Lang, Copy> = {
  pt: {
    metaTitle: "Prumo, pilates clínico em Funcionários, BH",
    metaDescription: "Pilates com fisioterapeuta para dor nas costas, reabilitação e gestação. Turmas de até 3 pessoas, avaliação antes de tudo. Projeto de portfólio.",
    skip: "Pular para o conteúdo",
    nav: { firstClass: "Primeira aula", prices: "Valores", visit: "Como chegar", lang: "Read in English", langShort: "EN", book: "Agendar avaliação" },
    title: "Pilates para voltar a se mexer sem medo.",
    lead: "Estúdio de pilates clínico em Funcionários, Belo Horizonte. Toda aula é dada por fisioterapeuta, para no máximo três pessoas, e tudo começa com uma avaliação só sua.",
    facts: ["Turmas de até 3 pessoas", "Fisioterapeuta em todas as aulas", "Recibo para reembolso do plano"],
    ctaBook: "Agendar minha avaliação",
    ctaAsk: "Tirar uma dúvida",
    plate: {
      caption: "Prancha 1. A coluna vista de lado, com o fio de prumo como referência de alinhamento.",
      labels: { c7: "C7, a vértebra que dá para sentir na nuca", t12: "T12", l5: "L5, onde mora a maioria das dores lombares", line: "fio de prumo" },
    },
    forTitle: "Para quem é",
    forLead: "A maioria das pessoas chega aqui por causa de uma dor ou de uma recomendação médica, e com algum receio. Faz sentido.",
    forItems: [
      { name: "Dor nas costas e no pescoço", text: "Lombar, cervical, hérnia de disco, postura de quem passa o dia no computador. O objetivo é diminuir a dor e entender o que a provoca." },
      { name: "Depois de lesão ou cirurgia", text: "Joelho, ombro, quadril, coluna. Seguimos o que o seu médico liberou e avançamos no seu ritmo." },
      { name: "Gestação e pós-parto", text: "A partir do segundo trimestre, com liberação do obstetra. Depois do parto, voltamos com calma, começando pelo assoalho pélvico." },
    ],
    forAlso: "Também atendemos adolescentes, idosos e quem só quer se mexer melhor.",
    stepsTitle: "Sua primeira aula, passo a passo",
    stepsLead: "Saber o que vai acontecer tira metade do nervosismo. A avaliação dura cerca de uma hora e você não precisa saber fazer nada.",
    steps: [
      { name: "Você chega", text: "A recepção te recebe, mostra o vestiário e a sala. Chegue 10 minutos antes para respirar com calma.", time: "10 min" },
      { name: "Uma conversa", text: "A fisioterapeuta pergunta sobre a sua dor, a sua rotina, cirurgias e remédios. Traga exames e o pedido médico, se tiver.", time: "15 min" },
      { name: "A avaliação postural", text: "Você fica de pé ao lado do fio de prumo, e ela observa como o seu corpo se alinha. Depois vêm testes simples de força e de movimento.", time: "15 min" },
      { name: "Os primeiros exercícios", text: "Você experimenta o aparelho com molas leves. Nada deve doer; se doer, você avisa e ela ajusta na hora.", time: "15 min" },
      { name: "O seu plano", text: "Vocês combinam quantas vezes por semana, os objetivos para os primeiros meses e o horário da turma.", time: "5 min" },
    ],
    stepsWear: { title: "O que vestir", text: "Roupa confortável que deixe ver o movimento, como legging e camiseta. As aulas são de meia ou descalço; temos meias antiderrapantes à venda se você esquecer." },
    stepsSpineLabel: "A coluna se alinha a cada passo",
    mythsTitle: "O que costumam nos perguntar",
    mythsLead: "Algumas ideias sobre pilates afastam justamente quem mais se beneficiaria dele.",
    myths: [
      { myth: "Pilates é só alongamento.", truth: "É fortalecimento com controle. As molas criam resistência, e o trabalho principal é dos músculos que seguram a coluna." },
      { myth: "Quem tem hérnia de disco não pode fazer.", truth: "Na maioria dos casos pode, e é dos tratamentos mais indicados. A avaliação define o que fazer e o que evitar no seu caso." },
      { myth: "Preciso ser flexível para começar.", truth: "Não. A flexibilidade melhora com as aulas; ninguém precisa chegar com ela." },
      { myth: "Se não doer, não está funcionando.", truth: "Pilates clínico não deve doer. Cansar, sim; dor é sinal para ajustar o exercício." },
    ],
    mythLabel: "O que se diz",
    truthLabel: "O que acontece",
    mythsAsk: "Tem outra dúvida? Pergunte ao assistente",
    physioTitle: "Quem dá as aulas",
    physio: {
      name: "Marina Lacerda",
      role: "Fisioterapeuta, registro no CREFITO-4",
      text: [
        "Formada pela UFMG, com especialização em fisioterapia traumato-ortopédica e formação em pilates clínico. Trabalhou oito anos em hospital antes de abrir o Prumo.",
        "Ela explica cada exercício: para que serve e o que você deve sentir. A ideia é que, com o tempo, você aprenda a se mexer bem também fora do estúdio.",
      ],
    },
    pricesTitle: "Valores",
    pricesLead: "Os planos são mensais e você pode trocar de frequência quando quiser.",
    insuranceTitle: "Plano de saúde",
    insurance: "Não atendemos por convênio direto. Damos recibo com o registro da fisioterapeuta para você pedir reembolso ao seu plano. Muitos planos devolvem parte do valor.",
    cancelTitle: "Faltas e remarcação",
    cancel: "Avise até 12 horas antes e a aula é remarcada dentro do mesmo mês.",
    currency: "R$",
    visitTitle: "Como chegar",
    address: "Funcionários, Belo Horizonte, a duas quadras da Praça da Savassi",
    arrival: [
      "O prédio tem portaria: diga que vai ao Prumo, sala 304. O elevador fica à direita.",
      "Há estacionamento rotativo na rua e um estacionamento pago a uma quadra.",
      "A sala é acessível para cadeira de rodas e o banheiro também.",
    ],
    hoursTitle: "Horários",
    closed: "Fechado",
    today: "hoje",
    openNow: "Aberto agora, até as {close}",
    closedNow: "Fechado agora",
    mapLoad: "Mostrar o mapa",
    mapNote: "O mapa só carrega se você pedir, para a página ficar leve. Como o Prumo é fictício, ele marca a Praça da Savassi.",
    mapOpen: "Abrir no Google Maps",
    mapTitle: "Mapa da região do Prumo, perto da Praça da Savassi",
    formTitle: "Prefere escrever?",
    formLead: "Deixe seu nome e WhatsApp que a recepção responde no mesmo dia útil.",
    form: { name: "Nome", phone: "WhatsApp", message: "Sua mensagem (opcional)", honeypot: "Não preencha este campo", send: "Enviar mensagem", sent: "Mensagem enviada", required: "obrigatório" },
    demoToast: {
      whatsapp: "Num site de verdade, este botão abre o WhatsApp da clínica com uma mensagem pronta para agendar.",
      form: "Num site de verdade, esta mensagem chega no e-mail ou no WhatsApp da recepção.",
    },
    footerNote: "O Prumo é um estúdio fictício, criado por Gabi Garcia como projeto de portfólio. As fotos foram geradas com IA.",
    footerLink: "Ver como foi feito",
    chat: {
      open: "Tire sua dúvida",
      title: "Dúvidas sobre o Prumo",
      subtitle: "Assistente com IA, treinado só com as informações do estúdio",
      close: "Fechar conversa",
      greeting: "Oi! Pode perguntar o que quiser sobre as aulas, valores, horários ou a primeira avaliação. Se eu não souber, te passo para a recepção.",
      suggestions: ["Tenho hérnia, posso fazer?", "Como é a primeira aula?", "Aceitam plano de saúde?"],
      placeholder: "Escreva sua dúvida",
      inputLabel: "Sua dúvida",
      send: "Enviar",
      stop: "Parar resposta",
      thinking: "Procurando a resposta…",
      you: "Você",
      bot: "Prumo",
      disclaimer: "Respostas gerais, não substituem a avaliação.",
      book: "Agendar minha avaliação",
      reception: "Falar com a recepção",
      errors: {
        network: "Não consegui me conectar. Confira sua internet e tente de novo.",
        limit: "Você chegou ao limite de perguntas de hoje. A recepção responde o resto pelo WhatsApp.",
        offline: "O assistente está desligado neste momento. A recepção responde pelo WhatsApp.",
        busy: "Muita gente perguntando ao mesmo tempo. Tente de novo em um minuto.",
        tooLong: "Sua pergunta ficou longa demais. Tente resumir em poucas frases.",
      },
      left: "{n} perguntas restantes hoje",
    },
  },
  en: {
    metaTitle: "Prumo, clinical pilates in Funcionários, Belo Horizonte",
    metaDescription: "Pilates with a physiotherapist for back pain, rehab and pregnancy. Classes of up to 3 people, an assessment first. Portfolio project.",
    skip: "Skip to content",
    nav: { firstClass: "First class", prices: "Prices", visit: "Getting here", lang: "Ler em português", langShort: "PT", book: "Book assessment" },
    title: "Pilates to move again without fear.",
    lead: "A clinical pilates studio in Funcionários, Belo Horizonte. Every class is taught by a physiotherapist, for three people at most, and it all starts with an assessment that is just yours.",
    facts: ["Classes of up to 3 people", "A physiotherapist in every class", "Receipts for health plan refunds"],
    ctaBook: "Book my assessment",
    ctaAsk: "Ask a question",
    plate: {
      caption: "Plate 1. The spine seen from the side, with the plumb line as the reference for alignment.",
      labels: { c7: "C7, the bone you can feel at the base of the neck", t12: "T12", l5: "L5, home of most lower back pain", line: "plumb line" },
    },
    forTitle: "Who it's for",
    forLead: "Most people come here because of pain or a doctor's advice, and a little afraid. That makes sense.",
    forItems: [
      { name: "Back and neck pain", text: "Lower back, neck, herniated discs, the posture of a day at the computer. The goal is less pain and knowing what causes it." },
      { name: "After an injury or surgery", text: "Knee, shoulder, hip, spine. We follow what your doctor has cleared and move at your pace." },
      { name: "Pregnancy and after birth", text: "From the second trimester, with your obstetrician's OK. After birth we come back slowly, starting with the pelvic floor." },
    ],
    forAlso: "We also see teenagers, older adults and anyone who simply wants to move better.",
    stepsTitle: "Your first class, step by step",
    stepsLead: "Knowing what will happen takes away half the nerves. The assessment takes about an hour and you don't need to know how to do anything.",
    steps: [
      { name: "You arrive", text: "Reception greets you and shows you the changing room and the studio. Come 10 minutes early so you can settle in.", time: "10 min" },
      { name: "A conversation", text: "The physiotherapist asks about your pain, your routine, surgeries and medication. Bring scans and a doctor's note if you have them.", time: "15 min" },
      { name: "The posture assessment", text: "You stand next to the plumb line while she looks at how your body lines up. Then come simple strength and movement tests.", time: "15 min" },
      { name: "Your first exercises", text: "You try the machine with light springs. Nothing should hurt; if it does, you say so and she adjusts it right away.", time: "15 min" },
      { name: "Your plan", text: "Together you agree how many times a week, goals for the first months and your class time.", time: "5 min" },
    ],
    stepsWear: { title: "What to wear", text: "Comfortable clothes that show how you move, like leggings and a T-shirt. Classes are in socks or barefoot; we sell grip socks if you forget yours." },
    stepsSpineLabel: "The spine lines up with each step",
    mythsTitle: "What people often ask us",
    mythsLead: "A few ideas about pilates keep away exactly the people who would gain the most from it.",
    myths: [
      { myth: "Pilates is just stretching.", truth: "It's strength with control. The springs add resistance, and the main work goes to the muscles that hold up your spine." },
      { myth: "You can't do it with a herniated disc.", truth: "In most cases you can, and it's one of the most recommended treatments. The assessment decides what to do and what to avoid in your case." },
      { myth: "I need to be flexible to start.", truth: "No. Flexibility improves with the classes; nobody needs to arrive with it." },
      { myth: "If it doesn't hurt, it isn't working.", truth: "Clinical pilates shouldn't hurt. Tired, yes; pain is a sign to adjust the exercise." },
    ],
    mythLabel: "What people say",
    truthLabel: "What actually happens",
    mythsAsk: "Another question? Ask the assistant",
    physioTitle: "Who teaches",
    physio: {
      name: "Marina Lacerda",
      role: "Physiotherapist, registered with CREFITO-4",
      text: [
        "She studied at UFMG, specialised in orthopaedic physiotherapy and trained in clinical pilates. She worked in a hospital for eight years before opening Prumo.",
        "She explains every exercise: what it's for and what you should feel. The idea is that, over time, you learn to move well outside the studio too.",
      ],
    },
    pricesTitle: "Prices",
    pricesLead: "Plans are monthly and you can change how often you come whenever you like.",
    insuranceTitle: "Health plans",
    insurance: "We don't bill health plans directly. We give you a receipt with the physiotherapist's registration so you can ask your plan for a refund. Many plans pay part of it back.",
    cancelTitle: "Missed classes",
    cancel: "Let us know up to 12 hours before and the class is moved to another day in the same month.",
    currency: "R$",
    visitTitle: "Getting here",
    address: "Funcionários, Belo Horizonte, two blocks from Savassi square",
    arrival: [
      "The building has a front desk: say you're going to Prumo, room 304. The lift is on the right.",
      "There is paid street parking and a car park one block away.",
      "The studio and the bathroom are wheelchair accessible.",
    ],
    hoursTitle: "Opening hours",
    closed: "Closed",
    today: "today",
    openNow: "Open now, until {close}",
    closedNow: "Closed now",
    mapLoad: "Show the map",
    mapNote: "The map only loads if you ask, so the page stays light. Prumo is fictional, so it marks Savassi square.",
    mapOpen: "Open in Google Maps",
    mapTitle: "Map of the area around Prumo, near Savassi square",
    formTitle: "Rather write?",
    formLead: "Leave your name and WhatsApp number and reception will reply the same working day.",
    form: { name: "Name", phone: "WhatsApp", message: "Your message (optional)", honeypot: "Leave this field empty", send: "Send message", sent: "Message sent", required: "required" },
    demoToast: {
      whatsapp: "On a real site, this button opens the studio's WhatsApp with a message ready to book.",
      form: "On a real site, this message goes to reception's email or WhatsApp.",
    },
    footerNote: "Prumo is a fictional studio, made by Gabi Garcia as a portfolio project. The photos were generated with AI.",
    footerLink: "See how it was made",
    chat: {
      open: "Ask a question",
      title: "Questions about Prumo",
      subtitle: "AI assistant that only knows what the studio told it",
      close: "Close chat",
      greeting: "Hi! Ask anything about the classes, prices, opening hours or the first assessment. If I don't know, I'll pass you to reception.",
      suggestions: ["I have a herniated disc, can I do it?", "What happens in the first class?", "Do you take health plans?"],
      placeholder: "Type your question",
      inputLabel: "Your question",
      send: "Send",
      stop: "Stop answer",
      thinking: "Looking for the answer…",
      you: "You",
      bot: "Prumo",
      disclaimer: "General answers, not a replacement for the assessment.",
      book: "Book my assessment",
      reception: "Talk to reception",
      errors: {
        network: "I couldn't connect. Check your internet and try again.",
        limit: "You've reached today's question limit. Reception can answer the rest on WhatsApp.",
        offline: "The assistant is switched off right now. Reception can answer on WhatsApp.",
        busy: "Lots of people asking at once. Try again in a minute.",
        tooLong: "Your question is too long. Try a few sentences.",
      },
      left: "{n} questions left today",
    },
  },
};

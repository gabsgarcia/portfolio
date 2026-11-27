// What the Prumo chat knows. Each entry is one question a patient might ask and the
// studio's answer, in the studio's own words. The chat answers only from this list.
//
// On a real client's site these rows live in Supabase (table prumo_knowledge, see
// supabase/prumo.sql), so the owner can edit an answer without touching the code.
// This file is the starting content and the fallback when Supabase isn't set up.

export type KnowledgeEntry = { topic: string; question: string; answer: string };

export const knowledge: KnowledgeEntry[] = [
  {
    topic: "primeira aula",
    question: "Como é a primeira aula?",
    answer:
      "A primeira vez é uma avaliação individual de cerca de uma hora com a fisioterapeuta Marina. São cinco partes: você chega e conhece o espaço (chegue 10 minutos antes); uma conversa sobre sua dor, rotina, cirurgias e remédios; uma avaliação postural ao lado do fio de prumo e testes simples de força e movimento; os primeiros exercícios no aparelho com molas leves; e por fim vocês combinam o plano (frequência, objetivos e horário da turma). Você não precisa saber fazer nada.",
  },
  {
    topic: "primeira aula",
    question: "Preciso de pedido médico?",
    answer:
      "Não é obrigatório para começar. Se você tem pedido médico, exames ou laudos, traga na avaliação, porque ajudam a fisioterapeuta. Para pedir reembolso ao plano de saúde, alguns planos exigem o pedido médico, então vale conferir com o seu.",
  },
  {
    topic: "primeira aula",
    question: "O que levar e o que vestir?",
    answer:
      "Roupa confortável que deixe ver o movimento, como legging ou bermuda de malha e camiseta. As aulas são de meia ou descalço; vendemos meias antiderrapantes na recepção (R$ 30) se você esquecer. Traga uma garrafinha de água e, se tiver, exames e pedido médico. Há vestiário com armário.",
  },
  {
    topic: "primeira aula",
    question: "Estou com medo, nunca fiz pilates. Vou conseguir?",
    answer:
      "Vai. A maioria das pessoas chega sem nunca ter feito e com algum receio. A avaliação existe justamente para a fisioterapeuta conhecer seu corpo antes de qualquer exercício, e tudo começa leve. Nada deve doer; se algo incomodar, você avisa e ela ajusta na hora.",
  },
  {
    topic: "como funciona",
    question: "Quantas pessoas por turma?",
    answer: "No máximo três pessoas por aula, sempre com a fisioterapeuta. Cada pessoa faz exercícios do seu próprio plano.",
  },
  {
    topic: "como funciona",
    question: "Quanto tempo dura cada aula?",
    answer: "As aulas duram 55 minutos. A avaliação inicial dura cerca de uma hora.",
  },
  {
    topic: "como funciona",
    question: "Quais aparelhos vocês usam?",
    answer:
      "Reformer, Cadillac, Chair, barrel e espaldar, além de exercícios no solo com bola, faixa elástica e rolo. A fisioterapeuta escolhe os aparelhos de acordo com o seu plano.",
  },
  {
    topic: "como funciona",
    question: "Quanto tempo até sentir diferença?",
    answer:
      "Varia de pessoa para pessoa. Muita gente sente menos dor e mais firmeza entre 4 e 8 semanas de aulas duas vezes por semana. A fisioterapeuta reavalia você a cada três meses para acompanhar a evolução.",
  },
  {
    topic: "condições",
    question: "Tenho hérnia de disco, posso fazer?",
    answer:
      "Na maioria dos casos, sim, e o pilates clínico é um dos tratamentos mais indicados para hérnia de disco. O que dá para fazer depende do seu caso, por isso a avaliação vem antes: a fisioterapeuta vê o que trabalhar e o que evitar. Se você está numa crise forte de dor agora, o ideal é falar com seu médico antes de começar.",
  },
  {
    topic: "condições",
    question: "Tenho dor lombar ou no pescoço. Pilates ajuda?",
    answer:
      "Ajuda em muitos casos. O pilates fortalece os músculos que sustentam a coluna e ensina você a se mexer sem sobrecarregar a lombar e a cervical. A avaliação mostra o que provoca a sua dor e o plano é montado a partir disso.",
  },
  {
    topic: "condições",
    question: "Fiz cirurgia recentemente. Quando posso começar?",
    answer:
      "Quando o seu médico liberar. Traga a liberação e o relatório da cirurgia na avaliação. Atendemos pós-operatório de joelho, ombro, quadril e coluna, seguindo o que o médico autorizou.",
  },
  {
    topic: "condições",
    question: "Estou grávida. Posso fazer?",
    answer:
      "Sim, a partir do segundo trimestre (por volta da 14ª semana) e com liberação do seu obstetra. As aulas são adaptadas a cada fase da gestação. No pós-parto, voltamos com calma a partir da liberação médica, em geral depois de 6 semanas no parto normal e um pouco mais na cesárea, começando pelo assoalho pélvico.",
  },
  {
    topic: "condições",
    question: "Tenho mais de 60 anos. Posso fazer?",
    answer:
      "Pode, e é muito comum. O pilates ajuda no equilíbrio, na força e na segurança para as tarefas do dia a dia. A avaliação adapta tudo ao seu corpo.",
  },
  {
    topic: "condições",
    question: "Atendem crianças e adolescentes?",
    answer: "Atendemos adolescentes a partir de 12 anos, com um responsável presente na avaliação. Não temos turmas para crianças menores.",
  },
  {
    topic: "condições",
    question: "Tenho fibromialgia, artrose, escoliose ou outra condição.",
    answer:
      "Muitas dessas condições podem ser trabalhadas no pilates clínico, mas a resposta certa depende do seu caso. Conte isso na avaliação e traga seus exames; a fisioterapeuta diz o que é possível.",
  },
  {
    topic: "valores",
    question: "Quanto custa?",
    answer:
      "Avaliação: R$ 120, uma vez. Plano de 1 vez por semana: R$ 320 por mês. Plano de 2 vezes por semana: R$ 480 por mês. Aula avulsa: R$ 95. Os planos são mensais e você pode trocar a frequência quando quiser.",
  },
  {
    topic: "valores",
    question: "Formas de pagamento",
    answer: "Pix, cartão de débito e crédito. Os planos são pagos no início de cada mês. Não há taxa de matrícula.",
  },
  {
    topic: "valores",
    question: "Aceitam plano de saúde ou convênio?",
    answer:
      "Não atendemos por convênio direto. Damos recibo com o registro da fisioterapeuta (CREFITO-4) para você pedir reembolso ao seu plano. Muitos planos devolvem parte do valor; confira as regras do seu, porque alguns pedem pedido médico.",
  },
  {
    topic: "valores",
    question: "Tem aula experimental grátis?",
    answer:
      "Não temos aula experimental grátis. A primeira vez é a avaliação (R$ 120), que já inclui os primeiros exercícios no aparelho, então você experimenta antes de decidir pelo plano.",
  },
  {
    topic: "regras",
    question: "E se eu faltar? Posso remarcar?",
    answer:
      "Pode. Avise até 12 horas antes e a aula é remarcada dentro do mesmo mês. Faltas sem aviso não são repostas.",
  },
  {
    topic: "regras",
    question: "Posso cancelar o plano?",
    answer: "Pode, sem multa. Basta avisar a recepção até o dia 25 para não renovar no mês seguinte.",
  },
  {
    topic: "horários e local",
    question: "Qual o horário de funcionamento?",
    answer: "Segunda a sexta, das 7h às 20h. Sábado, das 8h às 12h. Domingo fechado. As aulas são sempre com horário marcado.",
  },
  {
    topic: "horários e local",
    question: "Onde fica e como chego?",
    answer:
      "Fica em Funcionários, Belo Horizonte, a duas quadras da Praça da Savassi. O prédio tem portaria: diga que vai ao Prumo, sala 304; o elevador fica à direita. Há estacionamento rotativo na rua e um estacionamento pago a uma quadra. A sala e o banheiro são acessíveis para cadeira de rodas.",
  },
  {
    topic: "horários e local",
    question: "Como agendo a avaliação?",
    answer:
      "Pelo WhatsApp da recepção, no botão \"Agendar minha avaliação\" do site. A recepção responde no mesmo dia útil e oferece os horários livres da semana.",
  },
  {
    topic: "equipe",
    question: "Quem dá as aulas?",
    answer:
      "A fisioterapeuta Marina Lacerda, formada pela UFMG, com especialização em fisioterapia traumato-ortopédica e formação em pilates clínico. Trabalhou oito anos em hospital antes de abrir o Prumo. Todas as aulas são dadas por fisioterapeuta.",
  },
  {
    topic: "sobre pilates",
    question: "Pilates é só alongamento?",
    answer:
      "Não. É fortalecimento com controle. As molas dos aparelhos criam resistência e o trabalho principal é dos músculos que seguram a coluna. A flexibilidade melhora junto, mas não é preciso ser flexível para começar.",
  },
  {
    topic: "sobre pilates",
    question: "Qual a diferença entre pilates clínico e de academia?",
    answer:
      "No pilates clínico, quem dá a aula é fisioterapeuta, as turmas são pequenas (até três pessoas aqui) e cada pessoa segue um plano feito a partir da avaliação, pensando na sua dor ou recuperação. Em academia, as turmas costumam ser maiores e com exercícios iguais para todos.",
  },
];

/** The knowledge as plain text for the system prompt, one block per entry. */
export function knowledgeText(entries: KnowledgeEntry[]) {
  return entries.map((e) => `<entrada tema="${e.topic}">\nPergunta: ${e.question}\nResposta: ${e.answer}\n</entrada>`).join("\n\n");
}

-- Prumo demo: the chat's knowledge and its daily limits.
-- Run once in the Supabase SQL editor (Project > SQL Editor > New query > paste > Run).
-- Safe to run again: it replaces the answers with the ones below.

-- What the chat knows. The studio edits these rows in Table Editor; the site picks
-- up changes within five minutes, with no new deploy.
create table if not exists prumo_knowledge (
  id bigint generated always as identity primary key,
  position int not null default 0,
  topic text not null,
  question text not null,
  answer text not null,
  updated_at timestamptz not null default now()
);

-- How many questions each visitor asked per day. "visitor" is a one-way hash, never
-- an IP address, and the questions themselves are never stored.
create table if not exists prumo_chat_usage (
  visitor text not null,
  day date not null,
  count int not null default 0,
  primary key (visitor, day)
);

-- Only the server (service role key) reads and writes these tables.
alter table prumo_knowledge enable row level security;
alter table prumo_chat_usage enable row level security;

-- Counts one question for the visitor and for everyone together, in one step.
-- Returns how many the visitor has left today, or -1 when a limit is used up.
create or replace function prumo_take_question(p_visitor text, p_day date, p_limit int, p_all_limit int)
returns int
language plpgsql
security definer
set search_path = public
as $$
declare
  mine int;
  everyone int;
begin
  select coalesce((select count from prumo_chat_usage where visitor = p_visitor and day = p_day), 0) into mine;
  select coalesce((select count from prumo_chat_usage where visitor = '__all__' and day = p_day), 0) into everyone;
  if mine >= p_limit or everyone >= p_all_limit then
    return -1;
  end if;
  insert into prumo_chat_usage (visitor, day, count) values (p_visitor, p_day, 1), ('__all__', p_day, 1)
  on conflict (visitor, day) do update set count = prumo_chat_usage.count + 1;
  return p_limit - mine - 1;
end;
$$;

revoke all on function prumo_take_question(text, date, int, int) from public, anon, authenticated;

-- Old rows are only counters; keep a month.
delete from prumo_chat_usage where day < current_date - 30;

-- The starting answers (same as content/prumoKnowledge.ts).
delete from prumo_knowledge;
insert into prumo_knowledge (position, topic, question, answer) values
  (1, 'primeira aula', 'Como é a primeira aula?', 'A primeira vez é uma avaliação individual de cerca de uma hora com a fisioterapeuta Marina. São cinco partes: você chega e conhece o espaço (chegue 10 minutos antes); uma conversa sobre sua dor, rotina, cirurgias e remédios; uma avaliação postural ao lado do fio de prumo e testes simples de força e movimento; os primeiros exercícios no aparelho com molas leves; e por fim vocês combinam o plano (frequência, objetivos e horário da turma). Você não precisa saber fazer nada.'),
  (2, 'primeira aula', 'Preciso de pedido médico?', 'Não é obrigatório para começar. Se você tem pedido médico, exames ou laudos, traga na avaliação, porque ajudam a fisioterapeuta. Para pedir reembolso ao plano de saúde, alguns planos exigem o pedido médico, então vale conferir com o seu.'),
  (3, 'primeira aula', 'O que levar e o que vestir?', 'Roupa confortável que deixe ver o movimento, como legging ou bermuda de malha e camiseta. As aulas são de meia ou descalço; vendemos meias antiderrapantes na recepção (R$ 30) se você esquecer. Traga uma garrafinha de água e, se tiver, exames e pedido médico. Há vestiário com armário.'),
  (4, 'primeira aula', 'Estou com medo, nunca fiz pilates. Vou conseguir?', 'Vai. A maioria das pessoas chega sem nunca ter feito e com algum receio. A avaliação existe justamente para a fisioterapeuta conhecer seu corpo antes de qualquer exercício, e tudo começa leve. Nada deve doer; se algo incomodar, você avisa e ela ajusta na hora.'),
  (5, 'como funciona', 'Quantas pessoas por turma?', 'No máximo três pessoas por aula, sempre com a fisioterapeuta. Cada pessoa faz exercícios do seu próprio plano.'),
  (6, 'como funciona', 'Quanto tempo dura cada aula?', 'As aulas duram 55 minutos. A avaliação inicial dura cerca de uma hora.'),
  (7, 'como funciona', 'Quais aparelhos vocês usam?', 'Reformer, Cadillac, Chair, barrel e espaldar, além de exercícios no solo com bola, faixa elástica e rolo. A fisioterapeuta escolhe os aparelhos de acordo com o seu plano.'),
  (8, 'como funciona', 'Quanto tempo até sentir diferença?', 'Varia de pessoa para pessoa. Muita gente sente menos dor e mais firmeza entre 4 e 8 semanas de aulas duas vezes por semana. A fisioterapeuta reavalia você a cada três meses para acompanhar a evolução.'),
  (9, 'condições', 'Tenho hérnia de disco, posso fazer?', 'Na maioria dos casos, sim, e o pilates clínico é um dos tratamentos mais indicados para hérnia de disco. O que dá para fazer depende do seu caso, por isso a avaliação vem antes: a fisioterapeuta vê o que trabalhar e o que evitar. Se você está numa crise forte de dor agora, o ideal é falar com seu médico antes de começar.'),
  (10, 'condições', 'Tenho dor lombar ou no pescoço. Pilates ajuda?', 'Ajuda em muitos casos. O pilates fortalece os músculos que sustentam a coluna e ensina você a se mexer sem sobrecarregar a lombar e a cervical. A avaliação mostra o que provoca a sua dor e o plano é montado a partir disso.'),
  (11, 'condições', 'Fiz cirurgia recentemente. Quando posso começar?', 'Quando o seu médico liberar. Traga a liberação e o relatório da cirurgia na avaliação. Atendemos pós-operatório de joelho, ombro, quadril e coluna, seguindo o que o médico autorizou.'),
  (12, 'condições', 'Estou grávida. Posso fazer?', 'Sim, a partir do segundo trimestre (por volta da 14ª semana) e com liberação do seu obstetra. As aulas são adaptadas a cada fase da gestação. No pós-parto, voltamos com calma a partir da liberação médica, em geral depois de 6 semanas no parto normal e um pouco mais na cesárea, começando pelo assoalho pélvico.'),
  (13, 'condições', 'Tenho mais de 60 anos. Posso fazer?', 'Pode, e é muito comum. O pilates ajuda no equilíbrio, na força e na segurança para as tarefas do dia a dia. A avaliação adapta tudo ao seu corpo.'),
  (14, 'condições', 'Atendem crianças e adolescentes?', 'Atendemos adolescentes a partir de 12 anos, com um responsável presente na avaliação. Não temos turmas para crianças menores.'),
  (15, 'condições', 'Tenho fibromialgia, artrose, escoliose ou outra condição.', 'Muitas dessas condições podem ser trabalhadas no pilates clínico, mas a resposta certa depende do seu caso. Conte isso na avaliação e traga seus exames; a fisioterapeuta diz o que é possível.'),
  (16, 'valores', 'Quanto custa?', 'Avaliação: R$ 120, uma vez. Plano de 1 vez por semana: R$ 320 por mês. Plano de 2 vezes por semana: R$ 480 por mês. Aula avulsa: R$ 95. Os planos são mensais e você pode trocar a frequência quando quiser.'),
  (17, 'valores', 'Formas de pagamento', 'Pix, cartão de débito e crédito. Os planos são pagos no início de cada mês. Não há taxa de matrícula.'),
  (18, 'valores', 'Aceitam plano de saúde ou convênio?', 'Não atendemos por convênio direto. Damos recibo com o registro da fisioterapeuta (CREFITO-4) para você pedir reembolso ao seu plano. Muitos planos devolvem parte do valor; confira as regras do seu, porque alguns pedem pedido médico.'),
  (19, 'valores', 'Tem aula experimental grátis?', 'Não temos aula experimental grátis. A primeira vez é a avaliação (R$ 120), que já inclui os primeiros exercícios no aparelho, então você experimenta antes de decidir pelo plano.'),
  (20, 'regras', 'E se eu faltar? Posso remarcar?', 'Pode. Avise até 12 horas antes e a aula é remarcada dentro do mesmo mês. Faltas sem aviso não são repostas.'),
  (21, 'regras', 'Posso cancelar o plano?', 'Pode, sem multa. Basta avisar a recepção até o dia 25 para não renovar no mês seguinte.'),
  (22, 'horários e local', 'Qual o horário de funcionamento?', 'Segunda a sexta, das 7h às 20h. Sábado, das 8h às 12h. Domingo fechado. As aulas são sempre com horário marcado.'),
  (23, 'horários e local', 'Onde fica e como chego?', 'Fica em Funcionários, Belo Horizonte, a duas quadras da Praça da Savassi. O prédio tem portaria: diga que vai ao Prumo, sala 304; o elevador fica à direita. Há estacionamento rotativo na rua e um estacionamento pago a uma quadra. A sala e o banheiro são acessíveis para cadeira de rodas.'),
  (24, 'horários e local', 'Como agendo a avaliação?', 'Pelo WhatsApp da recepção, no botão "Agendar minha avaliação" do site. A recepção responde no mesmo dia útil e oferece os horários livres da semana.'),
  (25, 'equipe', 'Quem dá as aulas?', 'A fisioterapeuta Marina Lacerda, formada pela UFMG, com especialização em fisioterapia traumato-ortopédica e formação em pilates clínico. Trabalhou oito anos em hospital antes de abrir o Prumo. Todas as aulas são dadas por fisioterapeuta.'),
  (26, 'sobre pilates', 'Pilates é só alongamento?', 'Não. É fortalecimento com controle. As molas dos aparelhos criam resistência e o trabalho principal é dos músculos que seguram a coluna. A flexibilidade melhora junto, mas não é preciso ser flexível para começar.'),
  (27, 'sobre pilates', 'Qual a diferença entre pilates clínico e de academia?', 'No pilates clínico, quem dá a aula é fisioterapeuta, as turmas são pequenas (até três pessoas aqui) e cada pessoa segue um plano feito a partir da avaliação, pensando na sua dor ou recuperação. Em academia, as turmas costumam ser maiores e com exercícios iguais para todos.');

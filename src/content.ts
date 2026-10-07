export type QuizQuestion = {
  category: 'Estudos' | 'Cotidiano'
  prompt: string
  context: string
  options: string[]
  recommended: number
  feedback: string
}

export const questions: QuizQuestion[] = [
  {
    category: 'Estudos',
    prompt: 'Você recebeu um texto longo para estudar. Como a IA pode ajudar sem fazer o estudo por você?',
    context: 'A meta é compreender o assunto, não apenas terminar a tarefa.',
    options: [
      'Pedir um resumo e entregar o texto da IA como se fosse meu.',
      'Pedir uma explicação em linguagem simples, voltar ao texto original e explicar a ideia com minhas palavras.',
      'Pedir para a IA responder às perguntas sem ler o material.',
    ],
    recommended: 1,
    feedback: 'Uma explicação pode abrir caminho, mas comparar com o texto e reformular com suas palavras ajuda a praticar leitura e compreensão.',
  },
  {
    category: 'Estudos',
    prompt: 'Você precisa resolver um exercício e não sabe por onde começar. Qual pedido tende a apoiar melhor o aprendizado?',
    context: 'A resposta mais útil é aquela que ajuda você a continuar pensando.',
    options: [
      '“Resolva tudo e me mande apenas a resposta final.”',
      '“Dê uma pista para eu tentar o primeiro passo. Depois confira meu raciocínio.”',
      '“Faça uma resposta que pareça escrita por um estudante.”',
    ],
    recommended: 1,
    feedback: 'Pedir uma pista preserva espaço para você tentar. Depois, comparar seu raciocínio com a explicação ajuda a descobrir o que entendeu.',
  },
  {
    category: 'Estudos',
    prompt: 'A IA escreveu um parágrafo para um trabalho. O que fazer antes de aproveitar qualquer parte dele?',
    context: 'Uma resposta bem escrita também pode conter erros ou referências inventadas.',
    options: [
      'Copiar, porque a resposta parece convincente.',
      'Conferir as informações em fontes confiáveis e reescrever de modo que eu consiga explicar.',
      'Trocar algumas palavras para o texto não parecer igual.',
    ],
    recommended: 1,
    feedback: 'A IA pode errar mesmo quando escreve com confiança. Verificar fontes e conseguir explicar a ideia são partes importantes do aprendizado.',
  },
  {
    category: 'Estudos',
    prompt: 'Você estudou um conteúdo com ajuda da IA. Como verificar se aprendeu mesmo?',
    context: 'Conseguir fazer algo sem a ferramenta também é uma informação importante.',
    options: [
      'Refazer um exercício ou explicar o conteúdo sem consultar a resposta da IA.',
      'Guardar a conversa para consultar quando precisar entregar a tarefa.',
      'Ver se a resposta da IA ficou longa e detalhada.',
    ],
    recommended: 0,
    feedback: 'Tentar recuperar a ideia sem consultar a resposta ajuda a perceber o que já está claro e o que merece mais prática.',
  },
  {
    category: 'Cotidiano',
    prompt: 'Chegou uma mensagem dizendo que você precisa clicar em um link para resolver um problema urgente. Como agir?',
    context: 'Mensagens podem parecer oficiais sem realmente serem verdadeiras.',
    options: [
      'Clicar logo e pedir à IA para preencher qualquer dado solicitado.',
      'Conferir a mensagem em um canal oficial, sem compartilhar dados pessoais com a IA.',
      'Encaminhar a mensagem para mais pessoas antes de verificar.',
    ],
    recommended: 1,
    feedback: 'A IA pode ajudar a entender uma mensagem, mas não confirma que ela é verdadeira. Procure o canal oficial e proteja seus dados pessoais.',
  },
  {
    category: 'Cotidiano',
    prompt: 'Um formulário tem uma instrução difícil de entender. Qual uso da IA pode ajudar sem tirar sua autonomia?',
    context: 'Você continua responsável por conferir os dados e as escolhas antes de enviar.',
    options: [
      'Pedir que a IA explique a instrução em palavras simples e conferir cada campo antes de enviar.',
      'Enviar uma foto do documento inteiro e aceitar tudo que a IA preencher.',
      'Pedir para a IA inventar uma resposta para os campos que não entendeu.',
    ],
    recommended: 0,
    feedback: 'Pedir uma explicação pode facilitar a compreensão. Evite enviar documentos com dados pessoais e revise o formulário antes de concluir.',
  },
]

export const statistics = [
  {
    value: '29%',
    title: 'dos brasileiros de 15 a 64 anos',
    detail: 'foram classificados pelo Inaf 2024 como analfabetos funcionais: cerca de 40,8 milhões de pessoas. O quadro permaneceu praticamente estável desde 2018.',
    source: 'Inaf Brasil 2024',
    href: 'https://acaoeducativa.org.br/wp-content/uploads/2025/11/Relatorio-INAF-Brasil-2024-Alfabetismo-do-analogico-ao-digital_compressed.pdf',
  },
  {
    value: '16%',
    title: 'entre jovens de 15 a 29 anos',
    detail: 'estavam nos níveis considerados de analfabetismo funcional. O índice foi de 51% entre pessoas de 50 a 64 anos.',
    source: 'Inaf Brasil 2024',
    href: 'https://acaoeducativa.org.br/wp-content/uploads/2025/11/Relatorio-INAF-Brasil-2024-Alfabetismo-do-analogico-ao-digital_compressed.pdf',
  },
  {
    value: '+48%',
    title: 'nos exercícios com IA disponível',
    detail: 'Foi a diferença de desempenho do grupo com acesso irrestrito ao GPT-4 em relação ao grupo de controle, durante a prática de matemática.',
    source: 'Experimento publicado na PNAS, 2025',
    href: 'https://doi.org/10.1073/pnas.2422633122',
  },
  {
    value: '−17%',
    title: 'na prova sem acesso à IA',
    detail: 'O grupo com acesso irrestrito teve desempenho menor que o controle na avaliação individual posterior. O estudo ocorreu em uma escola na Turquia, com quase mil estudantes.',
    source: 'Experimento publicado na PNAS, 2025',
    href: 'https://doi.org/10.1073/pnas.2422633122',
  },
]

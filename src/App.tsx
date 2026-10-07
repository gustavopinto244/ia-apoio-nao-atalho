import { useEffect, useRef, useState } from 'react'
import { questions, statistics } from './content'
import { recordQuizEvent } from './analytics'

type View = 'home' | 'quiz' | 'guide'

function App() {
  const [view, setView] = useState<View>('home')
  const [questionIndex, setQuestionIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [finished, setFinished] = useState(false)
  const welcomeDialog = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = welcomeDialog.current
    if (!dialog) return

    if (view === 'home' && !dialog.open) dialog.showModal()
    if (view !== 'home' && dialog.open) dialog.close()
  }, [view])

  function openHome() {
    setView('home')
  }

  function startQuiz() {
    setQuestionIndex(0)
    setSelected(null)
    setFinished(false)
    recordQuizEvent('quiz_started')
    setView('quiz')
  }

  function openGuide() {
    setView('guide')
  }

  function chooseAnswer(index: number) {
    if (selected !== null) return
    setSelected(index)
    recordQuizEvent('question_answered')
  }

  function continueQuiz() {
    if (questionIndex === questions.length - 1) {
      setFinished(true)
      recordQuizEvent('quiz_completed')
      return
    }
    setQuestionIndex((current) => current + 1)
    setSelected(null)
  }

  const question = questions[questionIndex]
  const progress = finished ? 100 : ((questionIndex + (selected === null ? 0 : 1)) / questions.length) * 100

  return (
    <div className="app-shell">
      <header className="site-header">
        <button className="brand-button" onClick={openHome} aria-label="Voltar ao início">
          <span className="brand-symbol" aria-hidden="true">IA</span>
          <span className="brand-copy">
            <span className="brand-name">IA: Apoio, Não Atalho</span>
            <span className="brand-caption">Aprender com IA sem terceirizar o pensamento</span>
          </span>
        </button>
        <nav className="main-nav" aria-label="Navegação principal">
          <button className={view === 'home' ? 'nav-link active' : 'nav-link'} onClick={openHome}>Início</button>
          <button className={view === 'quiz' ? 'nav-link active' : 'nav-link'} onClick={startQuiz}>Quiz <span className="nav-count">06</span></button>
          <button className={view === 'guide' ? 'nav-link active' : 'nav-link'} onClick={openGuide}>Guia</button>
        </nav>
      </header>

      <main id="main-content">
        {view === 'home' && <Home onStart={startQuiz} onGuide={openGuide} />}
        {view === 'quiz' && (
          <section className="page-content quiz-page" aria-labelledby="quiz-heading">
            {!finished ? (
              <>
                <div className="eyebrow"><span className="eyebrow-dot" /> QUIZ INTERATIVO</div>
                <div className="quiz-heading-row">
                  <div>
                    <h1 id="quiz-heading">Aprender também é saber perguntar.</h1>
                    <p className="section-lead">Escolha a alternativa que mais ajuda a manter você no centro do aprendizado.</p>
                  </div>
                  <div className="question-counter"><strong>{String(questionIndex + 1).padStart(2, '0')}</strong><span>/ {String(questions.length).padStart(2, '0')}</span></div>
                </div>
                <div className="progress-track" role="progressbar" aria-label="Progresso do quiz" aria-valuemin={0} aria-valuemax={questions.length} aria-valuenow={questionIndex + (selected === null ? 0 : 1)}>
                  <span style={{ width: `${progress}%` }} />
                </div>
                <article className="question-card">
                  <div className="question-meta"><span className="pill">{question.category}</span><span>Uma pergunta de cada vez</span></div>
                  <p className="question-context">{question.context}</p>
                  <h2>{question.prompt}</h2>
                  <div className="answer-list">
                    {question.options.map((option, index) => {
                      const isSelected = selected === index
                      const isRecommended = question.recommended === index
                      return (
                        <button
                          className={`answer-option${isSelected ? ' chosen' : ''}${selected !== null && isRecommended ? ' recommended' : ''}`}
                          key={option}
                          onClick={() => chooseAnswer(index)}
                          disabled={selected !== null}
                        >
                          <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                          <span>{option}</span>
                          {selected !== null && isRecommended && <span className="option-check" aria-label="Alternativa recomendada">✓</span>}
                        </button>
                      )
                    })}
                  </div>
                  {selected !== null && (
                    <div className="feedback-panel" role="status" aria-live="polite">
                      <span className="feedback-icon" aria-hidden="true">✦</span>
                      <div><strong>Uma forma de manter o aprendizado ativo</strong><p>{question.feedback}</p></div>
                    </div>
                  )}
                  <div className="question-actions">
                    <span className="quiet-note">Este quiz é um convite à reflexão, não uma prova.</span>
                    <button className="button button-primary" onClick={continueQuiz} disabled={selected === null}>
                      {questionIndex === questions.length - 1 ? 'Ver minha síntese' : 'Próxima pergunta'} <span aria-hidden="true">→</span>
                    </button>
                  </div>
                </article>
              </>
            ) : (
              <section className="completion-card" aria-labelledby="completion-heading">
                <div className="completion-orbit" aria-hidden="true"><span>✦</span></div>
                <div className="eyebrow"><span className="eyebrow-dot" /> SEU PRÓXIMO PASSO</div>
                <h1 id="completion-heading">A IA pode ajudar. O aprendizado continua sendo seu.</h1>
                <p className="section-lead">Você percorreu seis situações de estudo e do cotidiano. Experimente este ciclo quando usar uma ferramenta de IA:</p>
                <div className="takeaway-grid">
                  <div><span>01</span><strong>Tente primeiro</strong><p>Ative o que você já sabe antes de pedir uma resposta pronta.</p></div>
                  <div><span>02</span><strong>Use como apoio</strong><p>Peça uma pista, uma explicação ou uma forma de conferir seu raciocínio.</p></div>
                  <div><span>03</span><strong>Confira e explique</strong><p>Verifique as informações e conte a ideia com suas próprias palavras.</p></div>
                </div>
                <div className="completion-actions">
                  <button className="button button-primary" onClick={openGuide}>Ler o guia <span aria-hidden="true">→</span></button>
                  <button className="button button-secondary" onClick={openHome}>Voltar ao início</button>
                </div>
              </section>
            )}
          </section>
        )}
        {view === 'guide' && <Guide onStart={startQuiz} />}
      </main>

      <footer className="site-footer">
        <span>Projeto de extensão · Unilasalle-RJ · Campo de São Bento</span>
        <span>Informação para apoiar escolhas conscientes no uso da IA.</span>
      </footer>

      <dialog ref={welcomeDialog} className="welcome-dialog" onCancel={(event) => event.preventDefault()} aria-labelledby="welcome-title" aria-describedby="welcome-description">
        <div className="dialog-glow" aria-hidden="true" />
        <div className="dialog-topline"><span className="dialog-mark">IA<span>✦</span></span><span className="dialog-context">UM CONVITE À REFLEXÃO</span></div>
        <div className="dialog-copy">
          <p className="eyebrow"><span className="eyebrow-dot" /> EDUCAÇÃO · TECNOLOGIA · AUTONOMIA</p>
          <h1 id="welcome-title">A IA pode ajudar você a aprender.<br /><em>Mas quem aprende é você.</em></h1>
          <p id="welcome-description">Este projeto conversa sobre como usar a inteligência artificial como apoio, sem deixar que ela faça todo o caminho por nós. Explore o quiz ou leia o guia — e leve suas próprias experiências para essa conversa.</p>
        </div>
        <div className="dialog-actions">
          <button className="button button-primary button-large" onClick={startQuiz}>Começar o quiz <span className="button-detail">6 perguntas</span><span aria-hidden="true">→</span></button>
          <button className="button button-secondary button-large" onClick={openGuide}>Ler o guia <span aria-hidden="true">↗</span></button>
        </div>
        <div className="dialog-footnote"><span className="footnote-star">✳</span> O quiz registra apenas contagens agregadas de início, respostas e conclusão; não salvamos suas respostas.</div>
      </dialog>
    </div>
  )
}

function Home({ onStart, onGuide }: { onStart: () => void; onGuide: () => void }) {
  return (
    <section className="home-page page-content">
      <div className="home-copy">
        <div className="eyebrow"><span className="eyebrow-dot" /> IA, APRENDIZADO E AUTONOMIA</div>
        <h1>Não é sobre parar de usar IA.<br /><span>É sobre continuar pensando.</span></h1>
        <p className="section-lead">Quando a inteligência artificial faz tudo por nós, podemos terminar mais rápido e aprender menos. Este espaço ajuda a descobrir maneiras de usar a tecnologia sem abrir mão da própria leitura, das ideias e da curiosidade.</p>
        <div className="home-actions">
          <button className="button button-primary" onClick={onStart}>Experimentar o quiz <span aria-hidden="true">→</span></button>
          <button className="text-button" onClick={onGuide}>Conhecer o guia <span aria-hidden="true">↗</span></button>
        </div>
        <div className="home-note"><span className="note-line" /> Uma iniciativa de escuta e troca no Campo de São Bento.</div>
      </div>
      <div className="home-art" aria-hidden="true">
        <div className="art-ring ring-one" /><div className="art-ring ring-two" /><div className="art-ring ring-three" />
        <div className="art-core"><span className="core-spark">✦</span><span className="core-label">PENSE<br />POR VOCÊ</span></div>
        <span className="orbit-label orbit-one">PERGUNTAR</span><span className="orbit-label orbit-two">CONFERIR</span><span className="orbit-label orbit-three">APRENDER</span>
      </div>
      <div className="home-stat-row">
        <span className="stat-accent">29%</span><p>dos brasileiros de 15 a 64 anos estão em níveis de analfabetismo funcional, segundo o Inaf 2024.</p>
        <button className="stat-link" onClick={onGuide}>Entenda os dados <span aria-hidden="true">↗</span></button>
      </div>
    </section>
  )
}

function Guide({ onStart }: { onStart: () => void }) {
  return (
    <article className="page-content guide-page">
      <div className="eyebrow"><span className="eyebrow-dot" /> UM GUIA RÁPIDO</div>
      <header className="guide-heading">
        <h1>O atalho que entrega a tarefa pode tirar a chance de aprender.</h1>
        <p className="section-lead">A IA pode explicar, dar pistas e ajudar a conferir uma ideia. Mas quando ela lê, interpreta e responde por você, diminui o espaço para praticar habilidades que servem para a escola e para a vida.</p>
      </header>

      <section className="statistics-section" aria-labelledby="statistics-heading">
        <div className="section-title-row"><div><p className="eyebrow">O QUE AS PESQUISAS MOSTRAM</p><h2 id="statistics-heading">Números para olhar de perto.</h2></div><span className="data-tag">DADOS COM CONTEXTO</span></div>
        <div className="statistics-grid">
          {statistics.map((stat, index) => (
            <article className="stat-card" key={stat.value}>
              <span className="stat-index">0{index + 1} / 04</span>
              <strong className="stat-value">{stat.value}</strong>
              <h3>{stat.title}</h3>
              <p>{stat.detail}</p>
              <a href={stat.href} target="_blank" rel="noreferrer">{stat.source} <span aria-hidden="true">↗</span></a>
            </article>
          ))}
        </div>
        <p className="research-caveat">O Inaf mede habilidades de leitura, escrita e matemática em situações cotidianas. O experimento sobre IA avaliou matemática em uma escola na Turquia; seus resultados ajudam a discutir riscos de uso sem orientação, mas não provam que a IA cause analfabetismo funcional no Brasil.</p>
      </section>

      <section className="guide-practice" aria-labelledby="practice-heading">
        <div className="practice-heading"><span className="practice-symbol" aria-hidden="true">✳</span><div><p className="eyebrow">UM CICLO PARA EXPERIMENTAR</p><h2 id="practice-heading">Use a IA sem sair do seu próprio caminho.</h2></div></div>
        <div className="practice-steps">
          <div><span>01</span><h3>Tente</h3><p>Leia, pense e registre o que já entendeu.</p></div>
          <div><span>02</span><h3>Peça apoio</h3><p>Solicite pistas, exemplos ou uma explicação mais simples.</p></div>
          <div><span>03</span><h3>Confira</h3><p>Verifique a resposta e explique a ideia com suas palavras.</p></div>
        </div>
      </section>

      <aside className="guide-cta"><div><p className="eyebrow">AGORA É COM VOCÊ</p><h2>Quer testar essas ideias?</h2><p>Seis situações para pensar em como a IA pode apoiar seu aprendizado.</p></div><button className="button button-primary" onClick={onStart}>Ir para o quiz <span aria-hidden="true">→</span></button></aside>
      <p className="sources-note">Fontes: <a href="https://acaoeducativa.org.br/wp-content/uploads/2025/11/Relatorio-INAF-Brasil-2024-Alfabetismo-do-analogico-ao-digital_compressed.pdf" target="_blank" rel="noreferrer">Relatório Inaf Brasil 2024</a>; Bastani et al., <a href="https://doi.org/10.1073/pnas.2422633122" target="_blank" rel="noreferrer">PNAS (2025)</a>.</p>
    </article>
  )
}

export default App

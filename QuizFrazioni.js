
const { useState } = React;

const API_URL = "https://quiz-api.basketnotes.workers.dev";

const QUESTIONS = [
  {
    question: "A quale frazione corrisponde il numero decimale 0,5?",
    options: ["1/3", "1/2", "1/4", "2/5"],
    correct: 1,
    explanation: "0,5 significa cinque decimi: 5/10, che si semplifica in 1/2."
  },
  {
    question: "Qual è la scrittura decimale della frazione 3/10?",
    options: ["0,03", "0,3", "3,10", "0,13"],
    correct: 1,
    explanation: "Tre decimi corrispondono a 0,3."
  },
  {
    question: "Quale frazione corrisponde a 0,25?",
    options: ["1/4", "1/5", "2/5", "3/4"],
    correct: 0,
    explanation: "0,25 = 25/100 = 1/4."
  },
  {
    question: "Quanto fa 0,4 + 0,3?",
    options: ["0,7", "0,12", "0,34", "0,6"],
    correct: 0,
    explanation: "Quattro decimi più tre decimi sono sette decimi: 0,7."
  },
  {
    question: "Quale frazione corrisponde a 0,75?",
    options: ["3/4", "1/4", "2/5", "1/2"],
    correct: 0,
    explanation: "0,75 = 75/100 = 3/4."
  },
  {
    question: "Quale frazione è maggiore?",
    options: ["2/3", "1/2", "1/3", "1/4"],
    correct: 0,
    explanation: "2/3 è maggiore di 1/2, 1/3 e 1/4."
  },
  {
    question: "Quanto vale (-2)³?",
    options: ["8", "-8", "-6", "6"],
    correct: 1,
    explanation: "(-2) · (-2) · (-2) = 4 · (-2) = -8."
  },
  {
    question: "Quanto fa 1/4 + 1/2?",
    options: ["3/4", "2/6", "1/6", "1/4"],
    correct: 0,
    explanation: "1/2 = 2/4, quindi 1/4 + 2/4 = 3/4."
  },
  {
    question: "Quanto fa 5/6 - 1/3?",
    options: ["4/3", "3/6", "4/6", "1/2"],
    correct: 1,
    explanation: "1/3 = 2/6, quindi 5/6 - 2/6 = 3/6."
  },
  {
    question: "Quanto fa 2/3 × 3/4?",
    options: ["1/2", "5/7", "6/7", "2/4"],
    correct: 0,
    explanation: "(2 · 3)/(3 · 4) = 6/12 = 1/2."
  }
];

const STYLES = `
  * { box-sizing: border-box; }
  body {
    margin: 0;
    background: #0b1020;
    color: #f4f6ff;
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, sans-serif;
  }
  button, input { font: inherit; }
  button { cursor: pointer; }
  button:disabled { cursor: not-allowed; opacity: .6; }
  .qf-app {
    min-height: 100vh;
    padding: 28px 16px 48px;
    background:
      radial-gradient(ellipse at 15% 0%, #243a70 0, transparent 38%),
      radial-gradient(ellipse at 100% 70%, #342052 0, transparent 35%),
      #0b1020;
  }
  .qf-wrap { max-width: 760px; margin: 0 auto; }
  .qf-top {
    display: flex; justify-content: space-between; align-items: center;
    gap: 12px; margin-bottom: 24px;
  }
  .qf-brand { font-size: 15px; font-weight: 800; letter-spacing: .08em; }
  .qf-tag {
    padding: 7px 12px; border: 1px solid #354363;
    border-radius: 999px; color: #c6d2f7; font-size: 12px;
  }
  .qf-card {
    background: rgba(19, 27, 49, .94);
    border: 1px solid #293653;
    border-radius: 24px; padding: clamp(20px, 5vw, 36px);
    box-shadow: 0 24px 80px rgba(0,0,0,.24);
  }
  .qf-kicker {
    color: #9baeff; font-size: 12px; font-weight: 800;
    text-transform: uppercase; letter-spacing: .12em;
  }
  .qf-title {
    font-size: clamp(28px, 5vw, 42px); line-height: 1.12;
    margin: 12px 0; letter-spacing: -.04em;
  }
  .qf-sub { color: #b8c2dc; line-height: 1.65; margin: 0 0 24px; }
  .qf-fields { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .qf-label { display: block; font-size: 13px; color: #cbd4ed; margin-bottom: 7px; }
  .qf-input {
    width: 100%; padding: 13px 14px; border-radius: 12px;
    background: #0e162b; border: 1px solid #394766;
    color: white; outline: none;
  }
  .qf-input:focus { border-color: #9aabff; box-shadow: 0 0 0 3px #7588ff20; }
  .qf-button {
    display: inline-flex; align-items: center; justify-content: center;
    gap: 8px; width: 100%; padding: 14px 18px; margin-top: 20px;
    border: 0; border-radius: 13px; color: #10152a;
    background: linear-gradient(100deg, #a8b8ff, #c7a8ff);
    font-weight: 800; transition: transform .15s, filter .15s;
  }
  .qf-button:hover:not(:disabled) { transform: translateY(-1px); filter: brightness(1.06); }
  .qf-button-secondary {
    background: #202c48; color: #eef1ff; border: 1px solid #3b4b70;
  }
  .qf-progress-head {
    display: flex; justify-content: space-between; gap: 12px;
    color: #b9c5e1; font-size: 13px; margin-bottom: 10px;
  }
  .qf-progress {
    height: 8px; border-radius: 99px; overflow: hidden;
    background: #27324d; margin-bottom: 28px;
  }
  .qf-progress-fill {
    height: 100%; border-radius: inherit;
    background: linear-gradient(90deg, #7c96ff, #d1a8ff);
    transition: width .3s ease;
  }
  .qf-question { font-size: clamp(22px, 4vw, 30px); line-height: 1.35; margin: 10px 0 24px; }
  .qf-options { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .qf-option {
    min-height: 62px; text-align: left; padding: 16px;
    border: 1px solid #354363; border-radius: 14px;
    background: #111a30; color: #f4f6ff;
    transition: border-color .15s, background .15s, transform .15s;
  }
  .qf-option:hover:not(:disabled) { border-color: #9baeff; transform: translateY(-1px); }
  .qf-option.qf-correct { border-color: #47d6a2; background: #123a35; }
  .qf-option.qf-wrong { border-color: #ff8798; background: #442534; }
  .qf-option:disabled { opacity: 1; }
  .qf-feedback {
    padding: 15px 16px; border-radius: 13px; margin-top: 18px;
    background: #0e162b; border: 1px solid #34415f; line-height: 1.6;
  }
  .qf-feedback strong { display: block; margin-bottom: 4px; }
  .qf-success { color: #70edbc; }
  .qf-error { color: #ffabb7; }
  .qf-muted { color: #b9c5e1; font-size: 13px; line-height: 1.6; }
  .qf-result { text-align: center; }
  .qf-score {
    width: 142px; height: 142px; margin: 24px auto;
    border: 7px solid #788eff; border-radius: 50%;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    background: #111a30; box-shadow: 0 0 50px #778cff25;
  }
  .qf-score-number { font-size: 42px; font-weight: 900; letter-spacing: -.05em; }
  .qf-badge {
    display: inline-block; padding: 9px 14px; margin: 5px;
    border: 1px solid #665c99; background: #282344; border-radius: 999px;
    color: #e0d4ff; font-size: 13px; font-weight: 800;
  }
  .qf-confetti {
    position: fixed; top: -20px; width: 9px; height: 13px;
    z-index: 5; pointer-events: none;
    animation: qf-fall 3.3s linear forwards;
  }
  @keyframes qf-fall {
    0% { transform: translateY(-10px) rotate(0deg); opacity: 1; }
    100% { transform: translateY(110vh) rotate(720deg); opacity: .1; }
  }
  .qf-footer { text-align: center; color: #8d9ab9; font-size: 12px; margin-top: 18px; }
  @media (max-width: 520px) {
    .qf-fields, .qf-options { grid-template-columns: 1fr; }
    .qf-top { align-items: flex-start; }
    .qf-tag { font-size: 11px; }
  }
`;

function QuizFrazioni() {
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [finished, setFinished] = useState(false);

  const total = QUESTIONS.length;
  const score = answers.reduce(
    (sum, answer, i) => sum + (answer === QUESTIONS[i].correct ? 1 : 0),
    0
  );
  const percent = Math.round((score / total) * 100);
  const current = QUESTIONS[index];
  const answered = answers[index] !== undefined;

  function chooseAnswer(optionIndex) {
    if (answered) return;
    setAnswers((previous) => {
      const next = [...previous];
      next[index] = optionIndex;
      return next;
    });
  }

  function nextQuestion() {
    if (index < total - 1) {
      setIndex((previous) => previous + 1);
    } else {
      setFinished(true);
    }
  }

  async function saveResult() {
    if (saving || saved) return;

    setSaving(true);
    setSaveError("");

    const fullName = `${nome.trim()} ${cognome.trim()}`.trim();

    try {
      const response = await fetch(`${API_URL}/risultati`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: fullName,
          punteggio: score,
          totale: total,
          percentuale: percent,
          data: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error(`Il server ha risposto con codice ${response.status}.`);
      }

      const result = await response.json();
      if (!result.success) {
        throw new Error("Il server non ha confermato il salvataggio.");
      }

      setSaved(true);
    } catch (error) {
      console.error("Errore nel salvataggio del quiz:", error);
      setSaveError(
        "Non siamo riusciti a salvare il risultato. Controlla la connessione e riprova."
      );
    } finally {
      setSaving(false);
    }
  }

  function restartQuiz() {
    setStarted(false);
    setIndex(0);
    setAnswers([]);
    setSaving(false);
    setSaved(false);
    setSaveError("");
    setFinished(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  React.useEffect(() => {
    if (!finished || saved || saving) return;

    // Il salvataggio parte quando viene mostrata la schermata finale.
    saveResult();
  }, [finished]);

  React.useEffect(() => {
    if (!finished || percent < 80) return;

    const colors = ["#9aabff", "#e3a7ff", "#65e8bd", "#ffd166", "#ff8fab"];
    const pieces = [];

    for (let i = 0; i < 75; i++) {
      const piece = document.createElement("span");
      piece.className = "qf-confetti";
      piece.style.left = `${Math.random() * 100}%`;
      piece.style.background = colors[i % colors.length];
      piece.style.animationDelay = `${Math.random() * 1.4}s`;
      piece.style.animationDuration = `${2.5 + Math.random() * 2}s`;
      document.body.appendChild(piece);
      pieces.push(piece);
    }

    const timeout = window.setTimeout(() => {
      pieces.forEach((piece) => piece.remove());
    }, 6000);

    return () => {
      window.clearTimeout(timeout);
      pieces.forEach((piece) => piece.remove());
    };
  }, [finished]);

  return (
    <>
      <style>{STYLES}</style>

      <main className="qf-app">
        <div className="qf-wrap">
          <header className="qf-top">
            <div className="qf-brand">✦ MISSIONE MATEMATICA</div>
            <div className="qf-tag">QUIZ · FRAZIONI</div>
          </header>

          {!started && !finished && (
            <section className="qf-card">
              <div className="qf-kicker">Pronto per la sfida?</div>
              <h1 className="qf-title">La matematica è una missione.</h1>
              <p className="qf-sub">
                Mettiti alla prova con 10 domande su frazioni, numeri decimali
                e potenze. Rispondi con attenzione e conquista il tuo badge!
              </p>

              <div className="qf-fields">
                <div>
                  <label className="qf-label" htmlFor="qf-nome">Nome</label>
                  <input
                    id="qf-nome"
                    className="qf-input"
                    autoComplete="given-name"
                    value={nome}
                    onChange={(event) => setNome(event.target.value)}
                    placeholder="Il tuo nome"
                    maxLength={60}
                  />
                </div>
                <div>
                  <label className="qf-label" htmlFor="qf-cognome">Cognome</label>
                  <input
                    id="qf-cognome"
                    className="qf-input"
                    autoComplete="family-name"
                    value={cognome}
                    onChange={(event) => setCognome(event.target.value)}
                    placeholder="Il tuo cognome"
                    maxLength={60}
                  />
                </div>
              </div>

              <button
                className="qf-button"
                disabled={!nome.trim() || !cognome.trim()}
                onClick={() => setStarted(true)}
              >
                Inizia il quiz <span aria-hidden="true">→</span>
              </button>

              <p className="qf-footer">
                10 domande · Una risposta per domanda · Risultato finale
              </p>
            </section>
          )}

          {started && !finished && (
            <section className="qf-card">
              <div className="qf-progress-head">
                <span>Domanda {index + 1} di {total}</span>
                <span>{Math.round(((index + 1) / total) * 100)}% completato</span>
              </div>
              <div
                className="qf-progress"
                role="progressbar"
                aria-valuenow={index + 1}
                aria-valuemin={1}
                aria-valuemax={total}
              >
                <div
                  className="qf-progress-fill"
                  style={{ width: `${((index + 1) / total) * 100}%` }}
                />
              </div>

              <div className="qf-kicker">La tua sfida</div>
              <h2 className="qf-question">{current.question}</h2>

              <div className="qf-options">
                {current.options.map((option, optionIndex) => {
                  let className = "qf-option";

                  if (answered && optionIndex === current.correct) {
                    className += " qf-correct";
                  } else if (
                    answered &&
                    optionIndex === answers[index]
                  ) {
                    className += " qf-wrong";
                  }

                  return (
                    <button
                      key={option}
                      className={className}
                      disabled={answered}
                      onClick={() => chooseAnswer(optionIndex)}
                    >
                      <strong>{String.fromCharCode(65 + optionIndex)}.</strong>{" "}
                      {option}
                    </button>
                  );
                })}
              </div>

              {answered && (
                <div className="qf-feedback" aria-live="polite">
                  <strong className={answers[index] === current.correct ? "qf-success" : "qf-error"}>
                    {answers[index] === current.correct
                      ? "✓ Risposta corretta!"
                      : "✗ Non è la risposta corretta."}
                  </strong>
                  <span>{current.explanation}</span>
                </div>
              )}

              <button
                className="qf-button"
                disabled={!answered}
                onClick={nextQuestion}
              >
                {index === total - 1 ? "Vedi il risultato" : "Prossima domanda →"}
              </button>
            </section>
          )}

          {finished && (
            <section className="qf-card qf-result">
              <div className="qf-kicker">Missione completata</div>
              <h1 className="qf-title">
                {percent >= 80
                  ? "Fantastico lavoro! 🎉"
                  : percent >= 60
                  ? "Buon lavoro!"
                  : "Continua ad allenarti!"}
              </h1>
              <p className="qf-sub">
                {nome.trim()} {cognome.trim()}, ecco il tuo risultato.
              </p>

              <div className="qf-score">
                <div className="qf-score-number">{percent}%</div>
                <div className="qf-muted">{score} su {total}</div>
              </div>

              <div>
                {percent >= 80 ? (
                  <span className="qf-badge">🏆 Badge: Campione</span>
                ) : percent >= 60 ? (
                  <span className="qf-badge">⭐ Badge: In crescita</span>
                ) : (
                  <span className="qf-badge">💪 Badge: Allenamento</span>
                )}
                {score === total && (
                  <span className="qf-badge">💎 Punteggio perfetto</span>
                )}
              </div>

              <p className="qf-sub" style={{ marginTop: 22 }}>
                Hai risposto correttamente a {score} domande su {total}.
                {percent >= 80
                  ? " Hai raggiunto almeno l'80%: obiettivo raggiunto!"
                  : " Ripassa gli argomenti e prova di nuovo."}
              </p>

              <div className="qf-feedback" aria-live="polite">
                {saving && <span>Salvataggio del risultato in corso…</span>}
                {saved && (
                  <span className="qf-success">
                    ✓ Risultato salvato correttamente.
                  </span>
                )}
                {saveError && (
                  <>
                    <strong className="qf-error">{saveError}</strong>
                    <button
                      className="qf-button"
                      onClick={saveResult}
                      disabled={saving}
                    >
                      Riprova il salvataggio
                    </button>
                  </>
                )}
              </div>

              <button className="qf-button qf-button-secondary" onClick={restartQuiz}>
                ↻ Riprova il quiz
              </button>
            </section>
          )}
        </div>
      </main>
    </>
  );
}

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<QuizFrazioni />);
}

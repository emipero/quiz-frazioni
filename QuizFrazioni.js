
export default function QuizFrazioni() {
  const domande = [
    {
      testo: "0,5 corrisponde a...",
      opzioni: ["1/4", "1/2", "3/4"],
      corretta: 1
    },
    {
      testo: "3/10 in forma decimale è...",
      opzioni: ["0,03", "0,3", "3"],
      corretta: 1
    },
    {
      testo: "0,25 corrisponde a...",
      opzioni: ["1/4", "1/2", "1/5"],
      corretta: 0
    },
    {
      testo: "0,4 + 0,3 = ...",
      opzioni: ["0,6", "0,7", "0,8"],
      corretta: 1
    },
    {
      testo: "0,75 corrisponde a...",
      opzioni: ["3/4", "1/4", "7/10"],
      corretta: 0
    },
    {
      testo: "Quale frazione è maggiore?",
      opzioni: ["2/3", "3/5", "Sono uguali"],
      corretta: 0
    },
    {
      testo: "Quanto vale (-2)³?",
      opzioni: ["8", "-8", "-6"],
      corretta: 1
    },
    {
      testo: "Quanto fa 1/4 + 1/2?",
      opzioni: ["3/4", "1/2", "2/6"],
      corretta: 0
    },
    {
      testo: "Quanto fa 5/6 - 1/3?",
      opzioni: ["2/6", "3/6", "4/6"],
      corretta: 1
    },
    {
      testo: "Quanto fa 2/3 × 3/4?",
      opzioni: ["1/2", "5/7", "6/12"],
      corretta: 0
    }
  ];

  const [nome, setNome] = React.useState("");
  const [risposte, setRisposte] = React.useState({});
  const [esito, setEsito] = React.useState(null);
  const [salvataggio, setSalvataggio] = React.useState(false);
  const [errore, setErrore] = React.useState("");

  const punteggio = Object.keys(risposte).reduce(
    (totale, indice) =>
      totale +
      (Number(risposte[indice]) === domande[indice].corretta
        ? 1
        : 0),
    0
  );

  const completate = Object.keys(risposte).length;
  const percentualeAvanzamento =
    (completate / domande.length) * 100;

  const selezionaRisposta = (domandaIndex, rispostaIndex) => {
    if (
      risposte[domandaIndex] !== undefined ||
      esito !== null ||
      salvataggio
    ) {
      return;
    }

    setRisposte((precedenti) => ({
      ...precedenti,
      [domandaIndex]: rispostaIndex
    }));
  };

  const invia = async () => {
    if (
      !nome.trim() ||
      completate !== domande.length ||
      salvataggio ||
      esito !== null
    ) {
      return;
    }

    setErrore("");
    setSalvataggio(true);

    const risultato = {
      nome: nome.trim(),
      punteggio,
      totale: domande.length,
      percentuale: Math.round(
        (punteggio / domande.length) * 100
      ),
      data: new Date().toISOString()
    };

    try {
      const response = await fetch(
        "https://quiz-api.basketnotes.workers.dev/risultati",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(risultato)
        }
      );

      if (!response.ok) {
        throw new Error(
          `Errore HTTP ${response.status}`
        );
      }

      const conferma = await response.json();

      if (!conferma.success) {
        throw new Error("Salvataggio non confermato");
      }

      setEsito(risultato);
    } catch (error) {
      console.error("Errore nel salvataggio:", error);

      setErrore(
        "Non siamo riusciti a salvare il risultato. " +
        "Controlla la connessione e riprova."
      );
    } finally {
      setSalvataggio(false);
    }
  };

  const ricomincia = () => {
    setRisposte({});
    setEsito(null);
    setErrore("");
    setSalvataggio(false);
    setNome("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const celebrato = esito !== null && esito.percentuale >= 80;

  const badge = esito
    ? esito.percentuale >= 90
      ? {
          icona: "🏆",
          titolo: "Campione delle frazioni",
          descrizione: "Prestazione eccellente!"
        }
      : esito.percentuale >= 80
        ? {
            icona: "🥇",
            titolo: "Maestro delle frazioni",
            descrizione: "Obiettivo raggiunto!"
          }
        : esito.percentuale >= 60
          ? {
              icona: "🥈",
              titolo: "Esploratore matematico",
              descrizione: "Buon lavoro, continua così!"
            }
          : {
              icona: "🌱",
              titolo: "Primi passi",
              descrizione: "Allenarsi è il modo per migliorare!"
            }
    : null;

  return (
    <div className="quiz-app min-h-screen px-4 py-6 sm:px-6 sm:py-10">
      <style>{`
        * {
          box-sizing: border-box;
        }

        .quiz-app {
          color: #f1f5f9;
          background:
            radial-gradient(ellipse at top left, #28365d 0%, transparent 45%),
            radial-gradient(ellipse at bottom right, #3b2458 0%, transparent 40%),
            #101827;
          font-family: Inter, system-ui, -apple-system, sans-serif;
        }

        .quiz-panel {
          background: rgba(25, 36, 56, 0.92);
          border: 1px solid rgba(148, 163, 184, 0.20);
          box-shadow: 0 18px 50px rgba(0, 0, 0, 0.18);
          backdrop-filter: blur(12px);
        }

        .quiz-option {
          width: 100%;
          min-height: 58px;
          padding: 12px 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          text-align: left;
          color: #e2e8f0;
          background: #202d43;
          border: 1px solid #3b4a63;
          border-radius: 14px;
          transition: background 160ms ease, border-color 160ms ease,
            transform 160ms ease;
        }

        .quiz-option:not(:disabled):hover {
          background: #2b3a55;
          border-color: #818cf8;
          transform: translateY(-1px);
        }

        .quiz-option:focus-visible,
        .quiz-primary:focus-visible {
          outline: 3px solid #a5b4fc;
          outline-offset: 3px;
        }

        .quiz-option:disabled {
          cursor: default;
        }

        .quiz-option.correct {
          background: #123d37;
          border-color: #34d399;
        }

        .quiz-option.wrong {
          background: #482733;
          border-color: #fb7185;
        }

        .quiz-primary {
          width: 100%;
          min-height: 52px;
          border-radius: 14px;
          padding: 13px 18px;
          font-weight: 750;
          color: #fff;
          background: linear-gradient(100deg, #6366f1, #8b5cf6);
          box-shadow: 0 8px 24px rgba(99, 102, 241, 0.24);
          transition: filter 160ms ease, transform 160ms ease;
        }

        .quiz-primary:not(:disabled):hover {
          filter: brightness(1.12);
          transform: translateY(-1px);
        }

        .quiz-primary:disabled {
          cursor: not-allowed;
          opacity: 0.45;
          box-shadow: none;
        }

        .quiz-input {
          width: 100%;
          min-height: 48px;
          padding: 12px 14px;
          border-radius: 12px;
          color: #f8fafc;
          background: #111c2e;
          border: 1px solid #475569;
        }

        .quiz-input:focus {
          outline: 2px solid #818cf8;
          outline-offset: 2px;
        }

        .quiz-progress {
          height: 9px;
          overflow: hidden;
          border-radius: 999px;
          background: #334155;
        }

        .quiz-progress-fill {
          height: 100%;
          border-radius: inherit;
          background: linear-gradient(90deg, #818cf8, #c084fc);
          transition: width 300ms ease;
        }

        .quiz-confetti {
          position: fixed;
          top: -20px;
          width: 9px;
          height: 14px;
          z-index: 50;
          pointer-events: none;
          animation: quiz-fall 2.8s ease-in forwards;
        }

        @keyframes quiz-fall {
          0% {
            transform: translate3d(0, -10px, 0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translate3d(35px, 105vh, 0) rotate(720deg);
            opacity: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            scroll-behavior: auto !important;
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      <div className="mx-auto max-w-3xl">
        <header className="mb-8 flex items-center justify-between gap-3">
          <div>
            <div className="mb-2 text-xs font-bold uppercase tracking-widest text-indigo-300">
              MATEMATICA · MISSIONE 01
            </div>
            <h1 className="text-2xl font-black tracking-tight sm:text-4xl">
              La sfida delle frazioni
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              Dieci domande per mettere alla prova le tue abilità.
            </p>
          </div>

          <div className="hidden rounded-2xl border border-amber-400/20 bg-amber-400/10 px-4 py-3 text-center sm:block">
            <div className="text-2xl">⚡</div>
            <div className="text-xs font-bold text-amber-200">
              QUIZ XP
            </div>
          </div>
        </header>

        {!esito && (
          <>
            <section className="quiz-panel mb-5 rounded-2xl p-5 sm:p-6">
              <label
                htmlFor="nome-studente"
                className="mb-2 block text-sm font-semibold text-slate-200"
              >
                Nome e cognome
              </label>

              <input
                id="nome-studente"
                className="quiz-input"
                type="text"
                autoComplete="name"
                maxLength={100}
                placeholder="Inserisci nome e cognome"
                value={nome}
                disabled={salvataggio}
                onChange={(e) => setNome(e.target.value)}
              />

              <div className="mt-5 flex items-center justify-between gap-3 text-sm">
                <span className="font-semibold text-slate-200">
                  Il tuo percorso
                </span>
                <span className="text-slate-400">
                  {completate} di {domande.length} completate
                </span>
              </div>

              <div
                className="quiz-progress mt-3"
                role="progressbar"
                aria-label="Avanzamento del quiz"
                aria-valuemin={0}
                aria-valuemax={domande.length}
                aria-valuenow={completate}
              >
                <div
                  className="quiz-progress-fill"
                  style={{ width: `${percentualeAvanzamento}%` }}
                />
              </div>
            </section>

            <div className="space-y-5">
              {domande.map((domanda, indice) => {
                const rispostaData = risposte[indice];
                const haRisposto = rispostaData !== undefined;

                return (
                  <section
                    key={indice}
                    className="quiz-panel rounded-2xl p-5 sm:p-6"
                  >
                    <div className="mb-4 flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500/20 font-black text-indigo-200">
                        {indice + 1}
                      </div>

                      <div className="flex-1 pt-1">
                        <div className="mb-1 text-xs font-bold uppercase tracking-wider text-slate-400">
                          DOMANDA {indice + 1}
                        </div>
                        <h2 className="text-lg font-bold leading-snug sm:text-xl">
                          {domanda.testo}
                        </h2>
                      </div>

                      {haRisposto && (
                        <span aria-hidden="true" className="text-xl">
                          {Number(rispostaData) === domanda.corretta
                            ? "✓"
                            : "×"}
                        </span>
                      )}
                    </div>

                    <div className="space-y-2">
                      {domanda.opzioni.map((opzione, opIndex) => {
                        const selezionata =
                          Number(rispostaData) === opIndex;
                        const corretta =
                          opIndex === domanda.corretta;

                        let className = "quiz-option";

                        if (haRisposto && corretta) {
                          className += " correct";
                        } else if (haRisposto && selezionata) {
                          className += " wrong";
                        }

                        return (
                          <button
                            key={opIndex}
                            type="button"
                            className={className}
                            disabled={haRisposto || salvataggio}
                            aria-pressed={selezionata}
                            onClick={() =>
                              selezionaRisposta(indice, opIndex)
                            }
                          >
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-700/70 text-sm font-bold">
                              {String.fromCharCode(65 + opIndex)}
                            </span>

                            <span className="flex-1 font-medium">
                              {opzione}
                            </span>

                            {haRisposto && corretta && (
                              <span className="text-sm font-bold text-emerald-300">
                                Corretta
                              </span>
                            )}

                            {haRisposto && selezionata && !corretta && (
                              <span className="text-sm font-bold text-rose-300">
                                Errata
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {haRisposto && (
                      <div
                        className={`mt-4 rounded-xl p-3 text-sm font-semibold ${
                          Number(rispostaData) === domanda.corretta
                            ? "bg-emerald-400/10 text-emerald-300"
                            : "bg-rose-400/10 text-rose-300"
                        }`}
                        aria-live="polite"
                      >
                        {Number(rispostaData) === domanda.corretta
                          ? "Ottimo! Risposta corretta."
                          : `La risposta corretta è: ${domanda.opzioni[domanda.corretta]}.`}
                      </div>
                    )}
                  </section>
                );
              })}
            </div>

            <section className="quiz-panel mt-5 rounded-2xl p-5 sm:p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className="text-sm text-slate-400">
                    Punteggio provvisorio
                  </div>
                  <div className="mt-1 text-3xl font-black">
                    {punteggio}
                    <span className="text-lg font-medium text-slate-500">
                      {" "}/ {domande.length}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm text-slate-400">
                    Completamento
                  </div>
                  <div className="mt-1 text-xl font-bold text-indigo-300">
                    {Math.round(percentualeAvanzamento)}%
                  </div>
                </div>
              </div>

              {errore && (
                <div
                  role="alert"
                  className="mb-4 rounded-xl border border-rose-400/30 bg-rose-400/10 p-3 text-sm text-rose-200"
                >
                  {errore}
                </div>
              )}

              <button
                type="button"
                className="quiz-primary"
                disabled={
                  salvataggio ||
                  !nome.trim() ||
                  completate !== domande.length
                }
                onClick={invia}
              >
                {salvataggio
                  ? "⏳ Salvataggio in corso..."
                  : completate !== domande.length
                    ? `Rispondi ancora a ${domande.length - completate} domande`
                    : "🚀 Consegna il quiz"}
              </button>

              <p className="mt-3 text-center text-xs text-slate-400">
                Il risultato viene confermato solo dopo il salvataggio.
              </p>
            </section>
          </>
        )}

        {esito && (
          <section className="quiz-panel relative overflow-hidden rounded-3xl p-6 text-center sm:p-10">
            {celebrato &&
              Array.from({ length: 60 }, (_, i) => (
                <span
                  key={i}
                  className="quiz-confetti"
                  aria-hidden="true"
                  style={{
                    left: `${(i * 37 + 7) % 100}%`,
                    backgroundColor: [
                      "#fbbf24",
                      "#34d399",
                      "#818cf8",
                      "#f472b6",
                      "#fb923c",
                      "#38bdf8"
                    ][i % 6],
                    animationDelay: `${(i % 15) * 0.09}s`,
                    transform: `rotate(${i * 23}deg)`
                  }}
                />
              ))}

            <div className="relative z-10">
              <div className="mb-4 text-6xl" aria-hidden="true">
                {badge.icona}
              </div>

              <div className="text-xs font-bold uppercase tracking-widest text-indigo-300">
                MISSIONE COMPLETATA
              </div>

              <h2 className="mt-3 text-3xl font-black sm:text-4xl">
                {badge.titolo}
              </h2>

              <p className="mt-3 text-slate-300">
                Complimenti, {esito.nome}!
              </p>

              <div className="my-7 rounded-2xl border border-white/10 bg-slate-950/30 p-6">
                <div className="text-sm text-slate-400">
                  Il tuo risultato
                </div>

                <div className="my-2 text-5xl font-black tracking-tight">
                  {esito.percentuale}%
                </div>

                <div className="text-slate-300">
                  {esito.punteggio} risposte corrette su {esito.totale}
                </div>

                <div className="quiz-progress mt-5">
                  <div
                    className="quiz-progress-fill"
                    style={{ width: `${esito.percentuale}%` }}
                  />
                </div>
              </div>

              <div className="rounded-xl bg-indigo-400/10 p-4 text-sm text-indigo-200">
                <div className="text-lg font-bold">
                  {badge.icona} {badge.titolo}
                </div>
                <p className="mt-1">{badge.descrizione}</p>
              </div>

              {celebrato && (
                <p className="mt-4 font-semibold text-amber-200">
                  🎉 Hai raggiunto almeno l'80%! Grande risultato!
                </p>
              )}

              <p className="mt-5 text-sm text-emerald-300">
                ✓ Risultato salvato correttamente.
              </p>

              <button
                type="button"
                className="quiz-primary mt-6"
                onClick={ricomincia}
              >
                🔄 Nuovo tentativo
              </button>
            </div>
          </section>
        )}

        <footer className="mt-8 text-center text-xs text-slate-500">
          Quiz Frazioni · Allenati, impara, migliora.
        </footer>
      </div>
    </div>
  );
}

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
      testo: "Quanto vale (-2)³ ?",
      opzioni: ["8", "-8", "-6"],
      corretta: 1
    },
    {
      testo: "Quanto fa 1/4 + 1/2 ?",
      opzioni: ["3/4", "1/2", "2/6"],
      corretta: 0
    },
    {
      testo: "Quanto fa 5/6 - 1/3 ?",
      opzioni: ["2/6", "3/6", "4/6"],
      corretta: 1
    },
    {
      testo: "Quanto fa 2/3 × 3/4 ?",
      opzioni: ["1/2", "5/7", "6/12"],
      corretta: 0
    }
  ];

  const [nome, setNome] = React.useState("");
  const [risposte, setRisposte] = React.useState({});
  const [esito, setEsito] = React.useState(null);

  const selezionaRisposta = (domandaIndex, rispostaIndex) => {
    if (risposte[domandaIndex] !== undefined) return;

    setRisposte({
      ...risposte,
      [domandaIndex]: rispostaIndex const punteggio = Object.keys(risposte).reduce((tot, indice) => {
    return (
      tot +
      (Number(risposte[indice]) === domande[indice].corretta
        ? 1
        : 0)
    );
  }, 0);

  const invia = () => {
    const risultato = {
      nome,
      punteggio,
      totale: domande.length,
      percentuale: Math.round(
        (punteggio / domande.length) * 100
      )
    };

    setEsito(risultato);
  };

  return (
    <div className="p-6">
      <h1>🎯 Quiz Frazioni e Decimali</h1>

      <div style={{ marginTop: "20px" }}>
        <label>Nome e Cognome</label>

        <br />

        <input
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
      </div>

      {domande.map((domanda, indice) => {
        const rispostaData = risposte[indice];

        return (
          <div
            key={indice}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginTop: "15px"
            }}
          >
            <h3>
              {indice + 1}. {domanda.testo}
            </h3>

            {domanda.opzioni.map((opzione, opIndex) => (
              <button
                key={opIndex}
                disabled={rispostaData !== undefined}
                onClick={() =>
                  selezionaRisposta(indice, opIndex)
                }
                style={{
                  display: "block",
                  marginTop: "8px"
                }}
              >
                {opzione}
              </button>
            ))}

            {rispostaData !== undefined && (
              <p>
                {Number(rispostaData) ===
                domanda.corretta
                  ? "✅ Corretto"
                  : "❌ Errato"}
              </p>
            )}
          </div>
        );
      })}

      <div style={{ marginTop: "20px" }}>
        ⭐ {punteggio}/{domande.length}
      </div>

      <button
        style={{ marginTop: "20px" }}
        disabled={
          !nome ||
          Object.keys(risposte).length !== domande.length
        }
        onClick={invia}
      >
        🚀 Consegna Quiz
      </button>

      {esito && (
        <div style={{ marginTop: "20px" }}>
          <h2>Quiz completato</h2>

          <p>{esito.nome}</p>

          <p>
            {esito.punteggio}/{esito.totale}
          </p>

          <p>{esito.percentuale}%</p>
        </div>
      )}
    </div>
  );
}

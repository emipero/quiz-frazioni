function QuizFrazioni() {
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
    }
  ];

  const [nome, setNome] = React.useState("");
  const [risposte, setRisposte] = React.useState({});
  const [esito, setEsito] = React.useState(null);

  const seleziona = (domandaIndex, opzioneIndex) => {
    setRisposte({
      ...risposte,
      [domandaIndex]: opzioneIndex
    });
  };

  const punteggio = Object.keys(risposte).reduce(
    (tot, indice) =>
      tot +
      (Number(risposte[indice]) ===
      domande[indice].corretta
        ? 1
        : 0),
    0
  );

  const invia = () => {
    setEsito({
      nome,
      punteggio,
      totale: domande.length,
      percentuale: Math.round(
        (punteggio / domande.length) * 100
      )
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">
        Quiz Frazioni e Decimali
      </h1>

      <input
        className="border p-2 w-full mb-4"
        placeholder="Nome e Cognome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />

      {domande.map((domanda, indice) => (
        <div
          key={indice}
          className="border rounded p-4 mb-4"
        >
          <h2 className="font-bold mb-3">
            {indice + 1}. {domanda.testo}
          </h2>

          {domanda.opzioni.map((opzione, opIndex) => (
            <button
              key={opIndex}
              className="block border rounded p-2 mb-2 w-full text-left"
              onClick={() =>
                seleziona(indice, opIndex)
              }
            >
              {opzione}
            </button>
          ))}
        </div>
      ))}

      <button
        onClick={invia}
        className="bg-blue-600 text-white px-6 py-3 rounded"
      >
        Consegna Quiz
      </button>

      {esito && (
        <div className="mt-6 border rounded p-4">
          <h2 className="text-xl font-bold">
            Quiz completato
          </h2>

          <p>{esito.nome}</p>

          <p>
            {esito.punteggio}/{esito.totale}
          </p>

          <p>
            {esito.percentuale}%
          </p>
        </div>
      )}
    </div>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(<QuizFrazioni />);

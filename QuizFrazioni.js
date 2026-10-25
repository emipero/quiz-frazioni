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
      testo: "0,4 + 0,3 =",
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

  const punteggio = Object.keys(risposte).reduce((tot, indice) => {
    return (
      tot +
      (Number(risposte[indice]) === domande[indice].corretta
        ? 1
        : 0)
    );
  }, 0);

  const seleziona = (domandaIndex, rispostaIndex) => {
    if (risposte[domandaIndex] !== undefined) {
      return;
    }

    setRisposte({
      ...risposte,
      [domandaIndex]: rispostaIndex
    });
  };

  const invia = async () => {
    const risultato = {
      nome,
      punteggio,
      totale: domande.length,
      percentuale: Math.round(
        (punteggio / domande.length) * 100
      ),
      data: new Date().toISOString()
    };

    try {
      await fetch(
        "https://quiz-api.basketnotes.workers.dev/risultati",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(risultato)
        }
      );

      setEsito(risultato);

    } catch (err) {

      console.error(err);

      alert(
        "Errore nel salvataggio dei risultati"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold text-center mb-6">
          🎯 Quiz Frazioni e Decimali
        </h1>

        <div className="bg-white rounded-xl p-4 mb-6">
          <label className="block text-black font-semibold mb-2">
            Nome e Cognome
          </label>

          <input
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full border rounded p-3 text-black"
          />
        </div>

        {domande.map((domanda, indice) => {
          const rispostaData = risposte[indice];

          return (
            <div
              key={indice}
              className="bg-white text-black rounded-xl p-5 mb-4"
            >
              <h2 className="font-bold mb-4">
                {indice + 1}. {domanda.testo}
              </h2>

              {domanda.opzioni.map((opzione, opIndex) => {

                let classe = "bg-slate-100 hover:bg-slate-200";

                if (rispostaData !== 

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
  const [es

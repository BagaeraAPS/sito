/* =====================================================================
   EVENTI: unica fonte dei dati del sito. Per aggiungere o modificare
   un evento chiedi a Claude. Campi:
     titolo    nome dell'evento
     data      "AAAA-MM-GG" se il giorno è certo  (oppure)
     mese      "AAAA-MM" se si conosce solo il mese
     fine      "AAAA-MM-GG" ultimo giorno, per eventi su più giorni
     ora, luogo, testo, tag
     tema      stile della card: pugno26, winter25, dolce25, winter24,
               summer24, paletto, cultura, aperitivo, serata
               (per un nuovo Fem Fest si crea un tema nuovo)
     img       immagine della card (cartella assets/img)
     imgTipo   "foto" (default), "locandina", "logo" oppure "pattern" (riquadro verde senza foto)
     link      pagina o sezione collegata (es. "fem-fest.html#pugno26")
     sottotitolo  tema dell'edizione, per i Fem Fest
   Prossimi e passati si separano da soli in base alla data di oggi.
   ===================================================================== */
const EVENTI = [
  { titolo: "Lurago Fem Fest Summer 2026", sottotitolo: "Per un pugno di Bagai", data: "2026-06-13", fine: "2026-06-14",
    luogo: "Lurago d'Erba", tag: "Fem Fest", tema: "pugno26", img: "ff/pugno26/01-t.webp", link: "fem-fest.html#pugno26",
    testo: "Edizione estiva a tema Far West: totem, tende indiane e una prigione in piazza." },
  { titolo: "Torneo Paletto Bagaera 2026", data: "2026-06-13", ora: "9:30 – 18:35", luogo: "Oratorio di Lurago d'Erba", tag: "Sport",
    tema: "paletto", img: "grafiche/paletto-logo.webp", imgTipo: "logo",
    testo: "12 squadre, 5 contro 5. Si segna colpendo il paletto avversario." },
  { titolo: "Sanremo in Ciabatta", mese: "2026-02", luogo: "Lurago d'Erba", tag: "Serata", tema: "serata", imgTipo: "pattern",
    testo: "La settimana del Festival si guarda insieme, in ciabatte, con food & drink." },
  { titolo: "Lurago Fem Fest Winter 2025", sottotitolo: "Olimpiadi a Cortina", data: "2025-12-20", luogo: "Lurago d'Erba", tag: "Fem Fest", tema: "winter25",
    img: "ff/winter25/02-t.webp", link: "fem-fest.html#winter25",
    testo: "La festa di Natale a tema Olimpiadi di Cortina, con la cabinovia in piazza." },
  { titolo: "Lurago Fem Fest 2025", sottotitolo: "la Dolce Vita", data: "2025-06-21", luogo: "Piazza Giovanni XXIII", tag: "Fem Fest",
    tema: "dolce25", img: "ff/dolce25/01-t.webp", link: "fem-fest.html#dolce25",
    testo: "Tema e dress code: La Dolce Vita, con la 500 in piazza e il merch dell'edizione." },
  { titolo: "IMPATTO", data: "2025-05-16", ora: "20:30", luogo: "Sala consiliare, piazza Giovanni XXIII", tag: "Cultura",
    tema: "cultura", img: "grafiche/locandina-impatto.webp", imgTipo: "locandina",
    testo: "Il documentario Storie di popoli in transizione con The Climate Route e una discussione sul clima. Per lo Z Festival." },
  { titolo: "Aperitivo inaugurale", data: "2025-04-30", ora: "18:30", luogo: "Caffetteria Mambretti, piazza Giovanni XXIII", tag: "Aperitivo",
    tema: "aperitivo", img: "grafiche/locandina-aperitivo.webp", imgTipo: "locandina",
    testo: "Bagaera è nata. La prima volta tutti insieme in piazza." },
  { titolo: "Lurago Fem Fest Winter 2024", sottotitolo: "Après-ski", data: "2024-12-21", luogo: "Lurago d'Erba", tag: "Fem Fest", tema: "winter24",
    img: "ff/winter24/01-t.webp", link: "fem-fest.html#winter24",
    testo: "La prima edizione invernale: maschere da sci, cappelli di pelo e piste in piazza." },
  { titolo: "Lurago Fem Fest 2024", sottotitolo: "La prima edizione", data: "2024-06-01", luogo: "Lurago d'Erba", tag: "Fem Fest",
    tema: "summer24", img: "ff/summer24/01-t.webp", link: "fem-fest.html#summer24",
    testo: "Band dal vivo e la piazza piena. Da qui è partito tutto." }
];

/* BAGAERA'S FRIENDS: una riga per attività. */
const FRIENDS = [
  { nome: "Caffetteria Mambretti", tipo: "Caffetteria", paese: "Lurago d'Erba", sconto: "Sconto sul primo spritz" },
  { nome: "Coccodè Cream", tipo: "Bar", paese: "Inverigo", sconto: "10% sulla prima consumazione" },
  { nome: "Gelateria Tomaselli Ice Dream", tipo: "Gelateria", paese: "Lurago d'Erba", sconto: "10% sulle vaschette" },
  { nome: "La Teglia", tipo: "Ristorazione", paese: "Lurago d'Erba", sconto: "10% con spesa minima di 10 €" },
  { nome: "Turkish Kebap Pizzeria", tipo: "Pizzeria e kebab", paese: "Inverigo", sconto: "" },
  { nome: "Age Parrucchieri Hair Design", tipo: "Parrucchiere", paese: "Lurago d'Erba", sconto: "10%" },
  { nome: "Age Verde Floral Design", tipo: "Fiorista", paese: "Lurago d'Erba", sconto: "10%" },
  { nome: "Barbiere Hair Stop35", tipo: "Barbiere", paese: "Giussano", sconto: "10% sui tagli uomo" },
  { nome: "Casa vinicola Nicolini", tipo: "Cantina", paese: "Lambrugo", sconto: "10%" },
  { nome: "Farmacia Castelli", tipo: "Farmacia", paese: "Lurago d'Erba", sconto: "10% sul parafarmaco" },
  { nome: "Ferramenta Conti Pierluigi", tipo: "Ferramenta", paese: "Lurago d'Erba", sconto: "10%" },
  { nome: "M.D. Ottica", tipo: "Ottica", paese: "Lurago d'Erba", sconto: "" },
  { nome: "Minas Morgul tattoo & art studio", tipo: "Tatuaggi", paese: "Lurago d'Erba", sconto: "10% sui tatuaggi" },
  { nome: "Molteni Imbottiti d'Arredamento", tipo: "Arredamento", paese: "Inverigo", sconto: "Dal 5% al 15% sui divani" },
  { nome: "Sorelle Molteni Profumeria Artistica", tipo: "Profumeria", paese: "Inverigo", sconto: "10% con spesa minima di 100 €" },
  { nome: "Tentation Calzature", tipo: "Calzature", paese: "Lurago d'Erba", sconto: "10%" }
];

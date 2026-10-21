/* =====================================================================
   EVENTI: unica fonte dei dati. Per aggiungere o modificare un evento
   chiedi a Claude. Campi:
     titolo   nome dell'evento
     data     "AAAA-MM-GG" se il giorno è certo  (oppure)
     mese     "AAAA-MM" se si conosce solo il mese
     fine     "AAAA-MM-GG" ultimo giorno, per eventi su più giorni
     etichetta testo al posto della data (es. "Estate"), opzionale
     ora, luogo, testo, tag
     serie    "femfest-estate" | "femfest-inverno" per comparire nella sezione Fem Fest
     tema     tema dell'edizione (solo Fem Fest)
   Prossimi e passati si separano da soli in base alla data di oggi.
   ===================================================================== */
const EVENTI = [
  { titolo: "Lurago Fem Fest Summer 2026", tema: "Per un pugno di Bagai", data: "2026-06-13", fine: "2026-06-14",
    luogo: "Lurago d'Erba", tag: "Fem Fest", serie: "femfest-estate",
    testo: "Edizione estiva a tema Far West: due giorni di festa in paese." },
  { titolo: "Torneo Paletto Bagaera 2026", data: "2026-06-13", ora: "9:30 – 18:35", luogo: "Oratorio di Lurago d'Erba", tag: "Sport",
    testo: "12 squadre, 5 contro 5. Si segna colpendo il paletto avversario. Coppe per le prime tre squadre e per il miglior giocatore." },
  { titolo: "Sanremo in Ciabatta", mese: "2026-02", luogo: "Lurago d'Erba", tag: "Serata",
    testo: "La settimana del Festival si guarda insieme, in ciabatte, con food & drink." },
  { titolo: "Lurago Fem Fest Winter 2025", mese: "2025-12", luogo: "Lurago d'Erba", tag: "Fem Fest", serie: "femfest-inverno",
    testo: "La festa di Natale di Bagaera." },
  { titolo: "Lurago Fem Fest 2025", tema: "La Dolce Vita", mese: "2025-06", luogo: "Piazza Giovanni XXIII", tag: "Fem Fest", serie: "femfest-estate",
    testo: "Seconda edizione estiva, in piazza. Tema e dress code: La Dolce Vita." },
  { titolo: "IMPATTO", data: "2025-05-16", ora: "20:30", luogo: "Sala consiliare, piazza Giovanni XXIII", tag: "Cultura",
    testo: "Proiezione del documentario Storie di popoli in transizione con The Climate Route e discussione sul clima. Per lo Z Festival." },
  { titolo: "Aperitivo inaugurale", data: "2025-04-30", ora: "18:30", luogo: "Caffetteria Mambretti, piazza Giovanni XXIII", tag: "Aperitivo",
    testo: "Bagaera è nata. La prima volta tutti insieme in piazza." },
  { titolo: "Lurago Fem Fest Winter Edition 2024", mese: "2024-12", etichetta: "Inverno", luogo: "Lurago d'Erba", tag: "Fem Fest", serie: "femfest-inverno",
    testo: "La prima edizione invernale." },
  { titolo: "Lurago Fem Fest 2024", mese: "2024-06", etichetta: "Estate", luogo: "Lurago d'Erba", tag: "Fem Fest", serie: "femfest-estate",
    testo: "La prima edizione. Da qui è partito tutto." }
];

/* BAGAERA'S FRIENDS: stesso principio, una riga per attività. */
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

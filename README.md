# bagaera.it

Sito statico di **Bagaera APS**, il gruppo giovani di Lurago d'Erba.
Pubblicato con GitHub Pages sul dominio `bagaera.it` (file `CNAME`).

## Cosa c'è dentro

| File | A cosa serve |
|---|---|
| `index.html` | la home, con tutte le sezioni |
| `assets/dati.js` | **eventi e Bagaera's friends**: è l'unico file da toccare per aggiornarli |
| `assets/sito.css` | grafica |
| `assets/sito.js` | comportamento (schede eventi, filtri, menu, copia email) |
| `assets/img/` | foto (WebP) e `og.jpg`, l'anteprima per WhatsApp e social |
| `assets/font/` | Archivo, font libero (OFL) usato al posto di LAPI bold |
| `logo/` | logo e pittogramma **ridisegnati dal manuale**: da sostituire con gli SVG originali |
| `404.html` | pagina per gli indirizzi sbagliati |
| `CNAME` | dice a GitHub Pages di rispondere su bagaera.it. Non cancellarlo |

## Aggiornare gli eventi

Chiedi a Claude, ad esempio: *"Aggiungi al sito il Fem Fest Winter 2026, 20 dicembre, piazza Giovanni XXIII"*.
Claude modifica `assets/dati.js` e ti dà il file aggiornato da caricare qui (oppure lo carica direttamente, se GitHub è collegato a Claude).

Gli eventi si dividono da soli in **prossimi** e **passati** in base alla data di oggi.
Quelli con `serie: "femfest-estate"` o `"femfest-inverno"` compaiono anche nella sezione Fem Fest.

Per caricare un file a mano: apri `assets/dati.js` su GitHub, icona della matita, incolla, *Commit changes*.
Il sito si aggiorna in circa un minuto.

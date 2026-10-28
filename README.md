# bagaera.it

Sito statico di **Bagaera APS**, il gruppo giovani di Lurago d'Erba.
Pubblicato con GitHub Pages sul dominio `bagaera.it` (file `CNAME`).

## Cosa c'è dentro

| File | A cosa serve |
|---|---|
| `index.html` | la home: sezioni brevi che portano alle pagine |
| `chi-siamo.html` | Mi son Bagaera |
| `eventi.html` | tutti gli eventi, prossimi e passati |
| `friends.html` | Bagaera's friends, con filtro per paese |
| `diventa-un-bagai.html` | socio e tesserato |
| `contatti.html` | email, PEC, Instagram |
| `fem-fest.html` | la pagina del Fem Fest: una sezione a tema e una galleria per ogni edizione |
| `assets/dati.js` | **eventi e Bagaera's friends**: è l'unico file da toccare per aggiornarli |
| `assets/sito.css` | grafica |
| `assets/sito.js` | comportamento (schede eventi, filtri, menu, copia email) |
| `assets/img/ff/` | foto delle edizioni del Fem Fest (una cartella per edizione) |
| `assets/img/grafiche/` | loghi Fem Fest e locandine |
| `assets/font/` | Archivo, font libero (OFL) usato al posto di LAPI bold |
| `logo/` | logo Bagaera originale (SVG) |
| `404.html` | pagina per gli indirizzi sbagliati |
| `CNAME` | dice a GitHub Pages di rispondere su bagaera.it. Non cancellarlo |

## Aggiornare gli eventi

Chiedi a Claude, ad esempio: *"Aggiungi al sito il Fem Fest Winter 2026, 20 dicembre, piazza Giovanni XXIII"*.
Claude modifica `assets/dati.js` e ti dà il file aggiornato da caricare qui (oppure lo carica direttamente, se GitHub è collegato a Claude).

Gli eventi si dividono da soli in **prossimi** e **passati** in base alla data di oggi.
Quelli con `serie: "femfest-estate"` o `"femfest-inverno"` compaiono anche nella sezione Fem Fest.

Per caricare un file a mano: apri `assets/dati.js` su GitHub, icona della matita, incolla, *Commit changes*.
Il sito si aggiorna in circa un minuto.

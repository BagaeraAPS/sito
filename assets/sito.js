(function () {
  const MESI = ["gen","feb","mar","apr","mag","giu","lug","ago","set","ott","nov","dic"];
  const pad = n => String(n).padStart(2, "0");
  const now = new Date();
  const oggi = now.getFullYear() + "-" + pad(now.getMonth() + 1) + "-" + pad(now.getDate());
  const meseOggi = oggi.slice(0, 7);
  const chiave = e => e.data || (e.mese + "-00");
  const finito = e => e.data ? (e.fine || e.data) < oggi : e.mese < meseOggi;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  const prossimi = EVENTI.filter(e => !finito(e)).sort((a, b) => chiave(a).localeCompare(chiave(b)));
  const passati = EVENTI.filter(finito).sort((a, b) => chiave(b).localeCompare(chiave(a)));
  document.getElementById("c-prossimi").textContent = prossimi.length;
  document.getElementById("c-passati").textContent = passati.length;
  document.getElementById("anno").textContent = now.getFullYear();

  function dataBox(e) {
    if (e.data) {
      const [y, m, d] = e.data.split("-");
      let giorno = String(+d);
      const range = e.fine && e.fine !== e.data;
      if (range) giorno += "–" + (+e.fine.split("-")[2]);
      return `<div class="event__date${range ? " is-range" : ""}"><span class="d">${giorno}</span><span class="m">${MESI[+m - 1]}</span><span class="y">${y}</span></div>`;
    }
    const [y, m] = e.mese.split("-");
    return `<div class="event__date is-month"><span class="d">${esc(e.etichetta || MESI[+m - 1])}</span><span class="y">${y}</span></div>`;
  }
  function card(e) {
    const meta = `<span class="event__tag">${esc(e.tag || "Evento")}</span>` + [e.ora, e.luogo].filter(Boolean).map(x => `<span>${esc(x)}</span>`).join("");
    return `<article class="event">${dataBox(e)}
      <div class="event__main">
        <h3>${esc(e.titolo)}${e.tema ? `<br><span class="green">${esc(e.tema)}</span>` : ""}</h3>
        <div class="event__meta label">${meta}</div></div>
      ${e.testo ? `<p class="event__text">${esc(e.testo)}</p>` : ""}</article>`;
  }
  const lista = document.getElementById("lista-eventi");
  const vuoto = `<div class="events-empty">
      <svg viewBox="0 0 127.5 126.2" aria-hidden="true"><use href="#s-o2"/></svg>
      <p class="display">Il prossimo lo stiamo preparando</p>
      <p>Le date nuove escono prima su Instagram. Seguici per non perderti il prossimo Fem Fest.</p>
      <a class="btn btn--verde" href="https://www.instagram.com/bagaeraa/" target="_blank" rel="noopener">Seguici su @bagaeraa</a></div>`;
  function mostra(quale) {
    const elenco = quale === "prossimi" ? prossimi : passati;
    lista.innerHTML = elenco.length ? `<div class="events">${elenco.map(card).join("")}</div>` : vuoto;
    lista.setAttribute("aria-labelledby", "tab-" + quale);
    ["prossimi", "passati"].forEach(k => document.getElementById("tab-" + k).setAttribute("aria-selected", String(k === quale)));
  }
  document.getElementById("tab-prossimi").addEventListener("click", () => mostra("prossimi"));
  document.getElementById("tab-passati").addEventListener("click", () => mostra("passati"));
  document.querySelector(".tabs").addEventListener("keydown", ev => {
    if (ev.key !== "ArrowLeft" && ev.key !== "ArrowRight") return;
    const altro = document.activeElement.id === "tab-prossimi" ? "passati" : "prossimi";
    mostra(altro); document.getElementById("tab-" + altro).focus();
  });
  mostra(prossimi.length ? "prossimi" : "passati");

  const chip = document.getElementById("next-chip-text");
  if (prossimi.length) chip.innerHTML = `Prossimo: <b>${esc(prossimi[0].titolo)}</b>`;
  else if (passati.length) chip.innerHTML = `Ultimo: <b>${esc(passati[0].titolo)}</b>`;

  /* edizioni Fem Fest dalla stessa lista, in ordine cronologico */
  const ed = EVENTI.filter(e => e.serie).sort((a, b) => chiave(a).localeCompare(chiave(b)));
  document.getElementById("editions").innerHTML = ed.map((e, i) => {
    const inverno = e.serie === "femfest-inverno";
    const anno = (e.data || e.mese).slice(0, 4);
    return `<article class="edition ${inverno ? "winter" : ""} ${i === ed.length - 1 ? "latest" : ""}">
      <span class="label stag">${inverno ? "Winter" : "Summer"} ${anno}</span>
      <h3>${esc(e.tema || (inverno ? "Edizione di Natale" : (i === 0 ? "Prima edizione" : "Edizione estiva")))}</h3>
      <p>${esc(e.testo)}</p></article>`;
  }).join("");

  /* friends + filtro per paese */
  const paesi = ["Tutti", ...Array.from(new Set(FRIENDS.map(f => f.paese)))];
  const ul = document.getElementById("friends-list"), filt = document.getElementById("filters");
  function friends(p) {
    ul.innerHTML = FRIENDS.filter(f => p === "Tutti" || f.paese === p).map(f => `<li class="friend">
      <h3>${esc(f.nome)}</h3><span class="where">${esc(f.tipo)} · ${esc(f.paese)}</span>
      <span class="perk ${f.sconto ? "" : "tbd"}">${esc(f.sconto || "Sconto in arrivo")}</span></li>`).join("");
    filt.querySelectorAll("button").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.p === p)));
  }
  filt.innerHTML = paesi.map((p, i) => `<button type="button" id="f-${i}" data-p="${esc(p)}" aria-pressed="false">${esc(p)}</button>`).join("");
  filt.addEventListener("click", ev => { const b = ev.target.closest("button"); if (b) friends(b.dataset.p); });
  friends("Tutti");

  /* menu mobile */
  const top = document.getElementById("top"), mb = document.getElementById("menu-btn");
  mb.addEventListener("click", () => { const o = top.classList.toggle("open"); mb.setAttribute("aria-expanded", String(o)); mb.textContent = o ? "Chiudi" : "Menu"; });
  document.getElementById("nav").addEventListener("click", ev => { if (ev.target.closest("a")) { top.classList.remove("open"); mb.setAttribute("aria-expanded", "false"); mb.textContent = "Menu"; } });

  /* pausa del nastro */
  const mq = document.getElementById("marquee"), mqb = document.getElementById("marquee-btn");
  mqb.addEventListener("click", () => { const p = mq.classList.toggle("paused"); mqb.setAttribute("aria-pressed", String(p)); mqb.setAttribute("aria-label", p ? "Fai ripartire lo scorrimento" : "Ferma lo scorrimento"); });

  /* copia indirizzi */
  document.querySelectorAll(".copy-btn").forEach(b => b.addEventListener("click", () => {
    const ok = () => { b.textContent = "Copiato"; b.classList.add("done"); setTimeout(() => { b.textContent = "Copia"; b.classList.remove("done"); }, 1800); };
    const sel = () => { const r = document.createRange(); r.selectNodeContents(b.previousElementSibling); const s = getSelection(); s.removeAllRanges(); s.addRange(r); b.textContent = "Selezionato"; };
    try { navigator.clipboard.writeText(b.dataset.copy).then(ok, sel); } catch (e) { sel(); }
  }));
})();

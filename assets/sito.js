(function () {
  const $ = id => document.getElementById(id);
  const MESI = ["gen","feb","mar","apr","mag","giu","lug","ago","set","ott","nov","dic"];
  const pad = n => String(n).padStart(2, "0");
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const now = new Date();
  const oggi = now.getFullYear() + "-" + pad(now.getMonth() + 1) + "-" + pad(now.getDate());
  if ($("anno")) $("anno").textContent = now.getFullYear();

  /* ---------- eventi (solo in home) ---------- */
  if (typeof EVENTI !== "undefined" && $("ev-grid")) {
    const chiave = e => e.data || (e.mese + "-00");
    const finito = e => e.data ? (e.fine || e.data) < oggi : e.mese < oggi.slice(0, 7);
    const prossimi = EVENTI.filter(e => !finito(e)).sort((a, b) => chiave(a).localeCompare(chiave(b)));
    const passati = EVENTI.filter(finito).sort((a, b) => chiave(b).localeCompare(chiave(a)));

    function dataBox(e) {
      if (e.data) {
        const [y, m, d] = e.data.split("-");
        let g = String(+d); if (e.fine && e.fine !== e.data) g += "–" + (+e.fine.split("-")[2]);
        return `<div class="ev-card__date"><span class="d">${g}</span><span class="m">${MESI[+m - 1]}</span><span class="y">${y}</span></div>`;
      }
      const [y, m] = e.mese.split("-");
      return `<div class="ev-card__date"><span class="d" style="font-size:1.2rem">${MESI[+m - 1].toUpperCase()}</span><span class="y">${y}</span></div>`;
    }
    function media(e) {
      const t = e.imgTipo || "foto";
      if (t === "pattern") return `<div class="ev-card__media is-pattern"><span>${esc(e.tag || "Evento")}</span>${dataBox(e)}</div>`;
      const cls = t === "locandina" ? " is-poster" : t === "logo" ? " is-logo" : "";
      return `<div class="ev-card__media${cls}"><img src="assets/img/${esc(e.img)}" alt="" loading="lazy" width="760" height="570">${dataBox(e)}</div>`;
    }
    function card(e) {
      const meta = [e.ora, e.luogo].filter(Boolean).map(x => `<span>${esc(x)}</span>`).join("");
      return `<li class="ev-card" data-tema="${esc(e.tema || "serata")}">${media(e)}
        <div class="ev-card__body">
          <div class="ev-card__meta"><b>${esc(e.tag || "Evento")}</b>${meta}</div>
          <h4 class="t-title">${esc(e.titolo)}</h4>
          ${e.sottotitolo ? `<span class="ev-card__tema">${esc(e.sottotitolo)}</span>` : ""}
          ${e.testo ? `<p class="ev-card__text">${esc(e.testo)}</p>` : ""}
          ${e.link ? `<a class="ev-card__link" href="${esc(e.link)}">Guarda le foto</a>` : ""}
        </div></li>`;
    }
    const next = $("ev-next");
    if (prossimi.length) {
      const p = prossimi[0];
      next.innerHTML = `<div class="ev-next ev-next--live"><svg viewBox="0 0 127.5 126.2" aria-hidden="true"><use href="#s-o2"/></svg>
        <div><span class="label green">Prossimo evento</span><p class="display">${esc(p.titolo)}</p><p>${esc([p.data || p.mese, p.ora, p.luogo].filter(Boolean).join(" · "))}</p></div>
        <a class="btn btn--verde" href="${esc(p.link || "#contatti")}">Scopri di più</a></div>`;
      $("ev-grid").innerHTML = prossimi.slice(1).concat(passati).map(card).join("");
    } else {
      next.innerHTML = `<div class="ev-next"><svg viewBox="0 0 127.5 126.2" aria-hidden="true"><use href="#s-o2"/></svg>
        <div><p class="display">Il prossimo lo stiamo preparando</p><p>Le date nuove escono prima su Instagram.</p></div>
        <a class="btn btn--verde" href="https://www.instagram.com/bagaeraa/" target="_blank" rel="noopener">Seguici su @bagaeraa</a></div>`;
      $("ev-grid").innerHTML = passati.map(card).join("");
    }
    $("ev-count").textContent = passati.length + " eventi dal 2024";
    const chip = $("next-chip-text");
    if (chip) chip.innerHTML = prossimi.length ? `Prossimo: <b>${esc(prossimi[0].titolo)}</b>` : `Ultimo: <b>${esc(passati[0].titolo)}</b>`;
  }

  /* ---------- friends ---------- */
  if (typeof FRIENDS !== "undefined" && $("friends-list")) {
    const paesi = ["Tutti", ...Array.from(new Set(FRIENDS.map(f => f.paese)))];
    const ul = $("friends-list"), filt = $("filters");
    const show = p => {
      ul.innerHTML = FRIENDS.filter(f => p === "Tutti" || f.paese === p).map(f => `<li class="friend">
        <h3>${esc(f.nome)}</h3><span class="where">${esc(f.tipo)} · ${esc(f.paese)}</span>
        <span class="perk ${f.sconto ? "" : "tbd"}">${esc(f.sconto || "Sconto in arrivo")}</span></li>`).join("");
      filt.querySelectorAll("button").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.p === p)));
    };
    filt.innerHTML = paesi.map((p, i) => `<button type="button" id="f-${i}" data-p="${esc(p)}" aria-pressed="false">${esc(p)}</button>`).join("");
    filt.addEventListener("click", ev => { const b = ev.target.closest("button"); if (b) show(b.dataset.p); });
    show("Tutti");
  }

  /* ---------- menu mobile ---------- */
  const top = $("top"), mb = $("menu-btn");
  if (mb) {
    mb.addEventListener("click", () => { const o = top.classList.toggle("open"); mb.setAttribute("aria-expanded", String(o)); mb.textContent = o ? "Chiudi" : "Menu"; });
    $("nav").addEventListener("click", ev => { if (ev.target.closest("a")) { top.classList.remove("open"); mb.setAttribute("aria-expanded", "false"); mb.textContent = "Menu"; } });
  }

  /* ---------- nastro ---------- */
  const mq = $("marquee"), mqb = $("marquee-btn");
  if (mqb) mqb.addEventListener("click", () => { const p = mq.classList.toggle("paused"); mqb.setAttribute("aria-pressed", String(p)); mqb.setAttribute("aria-label", p ? "Fai ripartire lo scorrimento" : "Ferma lo scorrimento"); });

  /* ---------- copia indirizzi ---------- */
  document.querySelectorAll(".copy-btn").forEach(b => b.addEventListener("click", () => {
    const ok = () => { b.textContent = "Copiato"; b.classList.add("done"); setTimeout(() => { b.textContent = "Copia"; b.classList.remove("done"); }, 1800); };
    const sel = () => { const r = document.createRange(); r.selectNodeContents(b.previousElementSibling); const s = getSelection(); s.removeAllRanges(); s.addRange(r); b.textContent = "Selezionato"; };
    try { navigator.clipboard.writeText(b.dataset.copy).then(ok, sel); } catch (e) { sel(); }
  }));

  /* ---------- galleria a schermo intero (pagina Fem Fest) ---------- */
  const lb = $("lb");
  if (lb && lb.showModal) {
    let list = [], i = 0;
    const img = $("lb-img"), count = $("lb-count");
    const show = k => { i = (k + list.length) % list.length; const a = list[i]; img.src = a.href; img.alt = a.querySelector("img").alt; count.textContent = (i + 1) + " / " + list.length; };
    document.querySelectorAll(".gal").forEach(g => g.addEventListener("click", ev => {
      const a = ev.target.closest("a"); if (!a) return;
      ev.preventDefault(); list = [...g.querySelectorAll("a")]; show(list.indexOf(a)); lb.showModal();
    }));
    $("lb-prev").addEventListener("click", () => show(i - 1));
    $("lb-next").addEventListener("click", () => show(i + 1));
    $("lb-close").addEventListener("click", () => lb.close());
    lb.addEventListener("click", ev => { if (ev.target === lb || ev.target.classList.contains("lb__in")) lb.close(); });
    lb.addEventListener("keydown", ev => { if (ev.key === "ArrowLeft") show(i - 1); if (ev.key === "ArrowRight") show(i + 1); });
  }
})();

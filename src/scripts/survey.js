/* ──────────────────────────────────────────────────────────
   ImmoSignal — Umfrage-Logik (1-Klick-Survey)

   Aktuell: reine Frontend-Simulation. baseCount-Werte kommen
   aus content.json und werden bei Klick um 1 erhöht, um eine
   "Live-Ergebnis"-Optik zu erzeugen.

   TODO für produktiven Einsatz:
   - Klick-Event an echtes Backend senden (z.B. fetch() an
     einen Endpoint, der in Airtable/Google Sheets/Mailchimp
     schreibt)
   - Ergebnisse aus echtem Datenspeicher laden statt baseCount
   - Mehrfach-Abstimmung verhindern (z.B. via Token in der
     E-Mail-URL, nicht via Cookies, da E-Mail-Clients diese
     oft blockieren)
   ────────────────────────────────────────────────────────── */

function initSurvey(surveyData) {
  const optionsContainer = document.getElementById('surveyOptions');
  const resultContainer = document.getElementById('surveyResult');
  const resultText = document.getElementById('surveyResultText');
  const barResultContainer = document.getElementById('barResult');

  if (!optionsContainer || !surveyData) return;

  // Render buttons dynamically from data
  optionsContainer.innerHTML = '';
  surveyData.options.forEach((opt) => {
    const btn = document.createElement('button');
    btn.className = 'survey-btn';
    btn.innerHTML = `<span class="btn-icon">${opt.id}</span>${opt.label}`;
    btn.addEventListener('click', () => submitSurvey(opt, surveyData));
    optionsContainer.appendChild(btn);
  });

  function submitSurvey(selectedOption, data) {
    // Build running totals (in-memory only; resets on page reload)
    const totals = {};
    data.options.forEach((o) => { totals[o.id] = o.baseCount; });
    totals[selectedOption.id] += 1;

    const total = Object.values(totals).reduce((a, b) => a + b, 0);

    optionsContainer.style.display = 'none';
    resultContainer.style.display = 'block';
    resultText.innerHTML = `Du hast gewählt: <strong>${selectedOption.shortLabel}</strong> — danke! So haben bisher andere Leserinnen und Leser geantwortet:`;

    barResultContainer.innerHTML = '';
    data.options.forEach((opt, i) => {
      const pct = Math.round((totals[opt.id] / total) * 100);
      const isMine = opt.id === selectedOption.id;

      const item = document.createElement('div');
      item.className = 'bar-item';
      item.innerHTML = `
        <div class="bar-label-row">
          <span style="color:${isMine ? '#fff' : '#ccc'};font-weight:${isMine ? '600' : '400'}">${isMine ? '▶ ' : ''}${opt.shortLabel}</span>
          <span style="color:${isMine ? '#fff' : '#aaa'}">${pct} %</span>
        </div>
        <div class="bar-track">
          <div class="bar-fill${isMine ? ' mine' : ''}" id="bar${i}"></div>
        </div>`;
      barResultContainer.appendChild(item);
    });

    // Animate bar widths after DOM insertion
    requestAnimationFrame(() => {
      setTimeout(() => {
        data.options.forEach((opt, i) => {
          const pct = Math.round((totals[opt.id] / total) * 100);
          const el = document.getElementById('bar' + i);
          if (el) el.style.width = pct + '%';
        });
      }, 80);
    });
  }
}

// Auto-init if content data is available globally (set by index.html)
if (typeof window !== 'undefined' && window.IMMOSIGNAL_CONTENT) {
  document.addEventListener('DOMContentLoaded', () => {
    initSurvey(window.IMMOSIGNAL_CONTENT.survey);
  });
}

/* ──────────────────────────────────────────────────────────
   ImmoSignal — Renderer

   Lädt src/data/content.json und baut daraus das Newsletter-
   DOM in #newsletterRoot. Trennt Inhalt (JSON) von Markup
   (dieses Script) von Design (tokens.css + index.html <style>).

   Beim Weiterbauen in Claude Code:
   - Neue Content-Felder zuerst in content.json ergänzen,
     dann hier die passende render*-Funktion erweitern.
   - Für die E-Mail-Build-Version (dist/) wird dieses Script
     NICHT verwendet — dort muss serverseitig/build-seitig
     statisches, inline-styled HTML erzeugt werden (siehe
     README "Offene nächste Schritte").
   ────────────────────────────────────────────────────────── */

async function loadContent() {
  const res = await fetch('data/content.json');
  if (!res.ok) throw new Error('content.json konnte nicht geladen werden');
  return res.json();
}

function renderRegionRow(regionIds, regionLabels) {
  if (!regionIds || !regionIds.length) return '';
  const badges = regionIds
    .map((id) => `<span class="region-badge active">${regionLabels[id] || id}</span>`)
    .join('');
  return `<div class="region-row">${badges}</div>`;
}

function renderStats(stats) {
  if (!stats || !stats.length) return '';
  const pills = stats
    .map(
      (s) => `
      <div class="stat-pill">
        <span class="val ${s.direction === 'up' || s.direction === 'down' ? s.direction : ''}">${s.value}</span>
        ${s.label}
      </div>`
    )
    .join('');
  return `<div class="stat-row">${pills}</div>`;
}

function renderHighlight(highlight) {
  if (!highlight) return '';
  return `
    <div class="highlight ${highlight.type}">
      <strong>${highlight.label}</strong> ${highlight.text}
    </div>`;
}

function renderRegionalBoxes(boxes) {
  if (!boxes || !boxes.length) return '';
  return boxes
    .map(
      (b) => `
      <div class="highlight ${b.type}">
        <strong>${b.label}</strong> ${b.text}
      </div>`
    )
    .join('');
}

function renderTagNote(tagNote) {
  if (!tagNote) return '';
  return `<p><span class="tag ${tagNote.tagStyle}">${tagNote.tag}</span> ${tagNote.text}</p>`;
}

function renderInsiderTip(tip) {
  if (!tip) return '';
  return `
    <div class="insider-tip">
      <div class="tip-badge">${tip.badge}</div>
      <p>${tip.title ? `<strong>${tip.title}</strong> ` : ''}${tip.text}</p>
    </div>`;
}

function renderNewsCard(item, regionLabels) {
  const paragraphs = (item.paragraphs || []).map((p) => `<p>${p}</p>`).join('');
  const closing = item.closingParagraph ? `<p>${item.closingParagraph}</p>` : '';

  return `
    <div class="section-label"><span>${item.sectionLabel}</span></div>
    <div class="news-card accent-${item.accent}">
      <div class="eyebrow">${item.eyebrow}</div>
      <h2>${item.headline}</h2>
      ${renderStats(item.stats)}
      ${renderRegionRow(item.regions, regionLabels)}
      ${paragraphs}
      ${renderHighlight(item.highlight)}
      ${renderRegionalBoxes(item.regionalBoxes)}
      ${renderTagNote(item.tagNote)}
      ${closing}
      ${renderInsiderTip(item.insiderTip)}
    </div>`;
}

function renderSubjectStrip(subjectLines) {
  const options = subjectLines
    .map(
      (s) => `
      <div class="subject-option ${s.recommended ? 'active' : ''}">
        <span class="emoji">${s.emoji}</span>
        ${s.text}
      </div>`
    )
    .join('');
  return `
    <div class="subject-strip">
      <p class="label">📬 Betreffzeilen — A/B-Test Vorschläge</p>
      ${options}
    </div>`;
}

function renderFooter(footer) {
  const links = footer.links
    .map((l, i) => `<a href="${l.url}">${l.label}</a>${i < footer.links.length - 1 ? ' &nbsp;·&nbsp; ' : ''}`)
    .join('');
  return `
    <div class="footer">
      <p>
        ${footer.unsubscribeText}<br>
        ${links}<br><br>
        ${footer.company}<br>
        ${footer.disclaimer}
      </p>
    </div>`;
}

function render(content) {
  const root = document.getElementById('newsletterRoot');

  const newsHtml = content.newsItems
    .map((item) => renderNewsCard(item, content.regionLabels))
    .join('');

  root.innerHTML = `
    <div class="masthead">
      <div class="masthead-brand">Immo<span>Signal</span></div>
      <div class="masthead-meta">
        Ausgabe ${content.issue.title}<br>
        Für ${content.issue.audience}
      </div>
    </div>

    ${renderSubjectStrip(content.subjectLines)}

    <div class="content">
      <h1 class="greeting">
        ${content.greeting.headlinePlain}<br>
        <em>${content.greeting.headlineEmphasis}</em><br>
        ${content.greeting.headlineSuffix}
      </h1>
      <p class="intro">${content.greeting.intro}</p>

      ${newsHtml}

      <hr class="divider">

      <div class="survey-box" id="surveyBox">
        <h3>${content.survey.title}</h3>
        <p>${content.survey.subtitle}</p>
        <div class="survey-options" id="surveyOptions"></div>
        <div class="survey-result" id="surveyResult">
          <span class="checkmark">✅</span>
          <p id="surveyResultText"></p>
          <div class="bar-result" id="barResult"></div>
        </div>
      </div>

      <div class="cta-block">
        <h3>${content.cta.headline}</h3>
        <p>${content.cta.text}</p>
        <a href="${content.cta.buttonUrl}" class="cta-btn">${content.cta.buttonLabel}</a>
        <div class="cta-note">${content.cta.note}</div>
      </div>
    </div>

    ${renderFooter(content.footer)}
  `;

  // Make content globally available for survey.js
  window.IMMOSIGNAL_CONTENT = content;
  // survey.js listens for DOMContentLoaded, which already fired by the
  // time this async render completes — so initialize it directly here too.
  if (typeof initSurvey === 'function') {
    initSurvey(content.survey);
  }
}

loadContent()
  .then(render)
  .catch((err) => {
    const root = document.getElementById('newsletterRoot');
    root.innerHTML = `<p style="padding:40px;color:#b83333;">Fehler beim Laden: ${err.message}. Läuft die Seite über einen lokalen Server (nicht file://)?</p>`;
    console.error(err);
  });

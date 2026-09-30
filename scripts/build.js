#!/usr/bin/env node
/**
 * ImmoSignal — E-Mail Build Script
 *
 * Liest src/data/content.json und erzeugt eine E-Mail-kompatible,
 * table-basierte HTML-Datei mit vollständig inline-gestellten Styles
 * in dist/newsletter-{issue.id}.html (und dist/newsletter-latest.html).
 *
 * Keine externen Abhängigkeiten — nur Node.js built-ins.
 * CSS-Variablen aus tokens.css sind hier hartcodiert aufgelöst.
 */

'use strict';

const fs   = require('fs');
const path = require('path');

// ── Design Tokens (aufgelöst aus src/styles/tokens.css) ──────────────────────
const T = {
  ink:     '#141210',
  paper:   '#faf9f6',
  cream:   '#f2efe8',
  rule:    '#d8d3c8',
  gold:    '#b8922a',
  goldLt:  '#f5ead0',
  green:   '#1e5c3a',
  greenLt: '#e0ede5',
  red:     '#b83333',
  redLt:   '#fdeaea',
  muted:   '#7a7367',
  serif:   'Georgia, "Times New Roman", serif',
  sans:    'Arial, Helvetica, sans-serif',
};

const ACCENT = {
  gold:  { border: T.gold,  eyebrow: T.gold  },
  red:   { border: T.red,   eyebrow: T.red   },
  green: { border: T.green, eyebrow: T.green },
};

const HIGHLIGHT_STYLE = {
  gold:  { bg: T.goldLt,  border: '#e0c97a', color: '#4a3a10' },
  green: { bg: T.greenLt, border: '#a8c9b6', color: '#153d28' },
  red:   { bg: T.redLt,   border: '#e8b0b0', color: '#5a1a1a' },
};

const TAG_STYLE = {
  gold:  { bg: T.goldLt,  color: '#7a5f10', border: '#d4a84a' },
  green: { bg: T.greenLt, color: T.green,   border: '#a8c9b6' },
  red:   { bg: T.redLt,   color: T.red,     border: '#e0a0a0' },
};

// ── Hilfsfunktionen ───────────────────────────────────────────────────────────

function wrap(content) {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="de-CH">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <!--[if !mso]><!-->
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <!--<![endif]-->
  <title>ImmoSignal Newsletter</title>
  <style type="text/css">
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }
    body { margin: 0 !important; padding: 0 !important; background-color: ${T.cream}; }
    a { color: ${T.gold}; }
    @media only screen and (max-width: 640px) {
      .wrapper { width: 100% !important; max-width: 100% !important; }
      .content-pad { padding-left: 20px !important; padding-right: 20px !important; }
      .stat-cell { display: block !important; width: 100% !important; margin-bottom: 6px !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:${T.cream};">
  <!-- Outer wrapper -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
         style="background-color:${T.cream};min-width:100%;">
    <tr>
      <td align="center" style="padding:24px 16px;">
        <!-- Inner 640px container -->
        <table role="presentation" class="wrapper" width="640" cellpadding="0" cellspacing="0" border="0"
               style="max-width:640px;width:100%;background-color:${T.paper};border:1px solid ${T.rule};">
          ${content}
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function masthead(issue) {
  return `
          <!-- MASTHEAD -->
          <tr>
            <td bgcolor="${T.ink}" style="background-color:${T.ink};padding:28px 40px 0 40px;border-bottom:3px solid ${T.gold};">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="vertical-align:bottom;">
                    <span style="font-family:${T.serif};font-size:28px;color:#ffffff;letter-spacing:-0.3px;line-height:1;">Immo<span style="color:${T.gold};">Signal</span></span>
                  </td>
                  <td align="right" style="vertical-align:bottom;padding-bottom:4px;">
                    <span style="font-family:${T.sans};font-size:10px;font-weight:bold;color:#999999;letter-spacing:0.7px;text-transform:uppercase;line-height:1.5;white-space:nowrap;">
                      Ausgabe ${issue.title}<br>
                      F&uuml;r ${issue.audience}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>`;
}

function subjectStrip(subjectLines) {
  const lines = subjectLines.map((s) => {
    const badge = s.recommended
      ? ` &nbsp;<span style="font-family:${T.sans};font-size:10px;font-weight:bold;color:${T.gold};background-color:${T.goldLt};border:1px solid ${T.gold};padding:1px 7px;border-radius:100px;">&#8592; Empfohlen</span>`
      : '';
    return `<p style="margin:2px 0;font-family:${T.sans};font-size:13px;color:${T.ink};font-weight:${s.recommended ? 'bold' : 'normal'};">${s.emoji} ${s.text}${badge}</p>`;
  }).join('');

  return `
          <!-- SUBJECT STRIP -->
          <tr>
            <td bgcolor="${T.goldLt}" style="background-color:${T.goldLt};padding:10px 40px;border-bottom:1px solid ${T.rule};">
              <p style="margin:0 0 4px 0;font-family:${T.sans};font-size:11px;font-weight:bold;color:${T.gold};letter-spacing:0.6px;text-transform:uppercase;">&#128236; Betreffzeilen &mdash; A/B-Test Vorschl&auml;ge</p>
              ${lines}
            </td>
          </tr>`;
}

function statPills(stats) {
  if (!stats || !stats.length) return '';
  const pills = stats.map((s) => {
    const valColor = s.direction === 'up' ? T.red : s.direction === 'down' ? T.green : T.gold;
    return `<td class="stat-cell" style="padding:0 8px 8px 0;vertical-align:top;">
              <table role="presentation" cellpadding="6" cellspacing="0" border="0"
                     style="background-color:${T.cream};border:1px solid ${T.rule};border-radius:6px;">
                <tr>
                  <td style="font-family:${T.sans};font-size:12px;color:${T.ink};line-height:1.3;white-space:nowrap;">
                    <span style="display:block;font-family:${T.serif};font-size:18px;line-height:1.1;color:${valColor};">${s.value}</span>
                    ${s.label}
                  </td>
                </tr>
              </table>
            </td>`;
  }).join('');
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:10px 0 12px;"><tr>${pills}</tr></table>`;
}

function regionRow(regionIds, regionLabels) {
  if (!regionIds || !regionIds.length) return '';
  const badges = regionIds.map((id) =>
    `<td style="padding:0 6px 6px 0;">
       <span style="font-family:${T.sans};font-size:11px;font-weight:bold;padding:3px 10px;border-radius:100px;border:1px solid ${T.ink};background-color:${T.ink};color:#ffffff;white-space:nowrap;">${regionLabels[id] || id}</span>
     </td>`
  ).join('');
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:10px 0 14px;"><tr>${badges}</tr></table>`;
}

function highlightBox(h) {
  if (!h) return '';
  const st = HIGHLIGHT_STYLE[h.type] || HIGHLIGHT_STYLE.gold;
  return `<table role="presentation" width="100%" cellpadding="12" cellspacing="0" border="0"
           style="background-color:${st.bg};border:1px solid ${st.border};border-radius:6px;margin:12px 0;">
            <tr>
              <td style="font-family:${T.sans};font-size:13px;line-height:1.6;color:${st.color};">
                <strong>${h.label}</strong> ${h.text}
              </td>
            </tr>
          </table>`;
}

function tagNote(tn) {
  if (!tn) return '';
  const st = TAG_STYLE[tn.tagStyle] || TAG_STYLE.gold;
  return `<p style="margin:10px 0 0;font-family:${T.sans};font-size:14px;color:#3d3830;line-height:1.7;">
            <span style="font-family:${T.sans};font-size:10px;font-weight:bold;letter-spacing:0.5px;text-transform:uppercase;padding:2px 8px;border-radius:100px;background-color:${st.bg};color:${st.color};border:1px solid ${st.border};">${tn.tag}</span>
            &nbsp;${tn.text}
          </p>`;
}

function insiderTip(tip) {
  if (!tip) return '';
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:14px 0 0;">
            <tr>
              <td style="border:1.5px dashed ${T.gold};border-radius:8px;padding:18px 20px;position:relative;">
                <p style="margin:0 0 6px;font-family:${T.sans};font-size:10px;font-weight:bold;letter-spacing:0.7px;text-transform:uppercase;color:#ffffff;background-color:${T.gold};padding:2px 10px;border-radius:100px;display:inline-block;">&#128161; ${tip.badge}</p>
                <p style="margin:0;font-family:${T.sans};font-size:13px;color:#3d3525;line-height:1.65;">
                  ${tip.title ? `<strong style="color:${T.ink};">${tip.title}</strong> ` : ''}${tip.text}
                </p>
              </td>
            </tr>
          </table>`;
}

function newsCard(item, regionLabels) {
  const ac = ACCENT[item.accent] || ACCENT.gold;
  const paragraphs = (item.paragraphs || [])
    .map((p) => `<p style="margin:0 0 10px;font-family:${T.sans};font-size:14px;color:#3d3830;line-height:1.7;">${p}</p>`)
    .join('');
  const closing = item.closingParagraph
    ? `<p style="margin:0 0 10px;font-family:${T.sans};font-size:14px;color:#3d3830;line-height:1.7;">${item.closingParagraph}</p>`
    : '';
  const regionalBoxes = (item.regionalBoxes || []).map(highlightBox).join('');

  return `
          <!-- SECTION LABEL -->
          <tr>
            <td style="padding:28px 40px 0;" class="content-pad">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="vertical-align:middle;padding-right:10px;white-space:nowrap;">
                    <span style="font-family:${T.sans};font-size:10px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;color:${T.muted};">${item.sectionLabel}</span>
                  </td>
                  <td width="100%" style="border-top:1px solid ${T.rule};">&nbsp;</td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- NEWS CARD -->
          <tr>
            <td style="padding:16px 40px 0;" class="content-pad">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <!-- Farbiger linker Balken -->
                  <td width="3" bgcolor="${ac.border}" style="background-color:${ac.border};border-radius:2px;">&nbsp;</td>
                  <td style="padding-left:18px;padding-bottom:24px;vertical-align:top;">
                    <p style="margin:0 0 5px;font-family:${T.sans};font-size:10px;font-weight:bold;letter-spacing:0.8px;text-transform:uppercase;color:${ac.eyebrow};">${item.eyebrow}</p>
                    <h2 style="margin:0 0 10px;font-family:${T.serif};font-size:19px;font-weight:normal;line-height:1.3;color:${T.ink};">${item.headline}</h2>
                    ${statPills(item.stats)}
                    ${regionRow(item.regions, regionLabels)}
                    ${paragraphs}
                    ${highlightBox(item.highlight)}
                    ${regionalBoxes}
                    ${tagNote(item.tagNote)}
                    ${closing}
                    ${insiderTip(item.insiderTip)}
                  </td>
                </tr>
              </table>
            </td>
          </tr>`;
}

function greeting(g) {
  return `
          <!-- GREETING -->
          <tr>
            <td style="padding:36px 40px 0;" class="content-pad">
              <h1 style="margin:0 0 14px;font-family:${T.serif};font-size:26px;font-weight:normal;color:${T.ink};line-height:1.25;letter-spacing:-0.2px;">
                ${g.headlinePlain}<br>
                <em style="font-style:italic;color:${T.gold};">${g.headlineEmphasis}</em><br>
                ${g.headlineSuffix}
              </h1>
              <p style="margin:0 0 20px;font-family:${T.sans};font-size:14px;color:#3a3630;line-height:1.7;padding-bottom:20px;border-bottom:1px solid ${T.rule};">${g.intro}</p>
            </td>
          </tr>`;
}

function surveyBlock(survey) {
  const options = survey.options.map((o) =>
    `<tr>
       <td style="padding:0 0 9px;">
         <table role="presentation" width="100%" cellpadding="11" cellspacing="0" border="0"
                style="background-color:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.18);border-radius:6px;">
           <tr>
             <td style="font-family:${T.sans};font-size:13px;font-weight:bold;color:#e8e5df;">
               <span style="display:inline-block;width:22px;height:22px;border-radius:50%;border:1.5px solid rgba(255,255,255,0.3);text-align:center;line-height:22px;font-size:11px;margin-right:10px;vertical-align:middle;">${o.id}</span>
               ${o.label}
             </td>
           </tr>
         </table>
       </td>
     </tr>`
  ).join('');

  return `
          <!-- DIVIDER -->
          <tr>
            <td style="padding:0 40px;" class="content-pad">
              <hr style="border:none;border-top:1px solid ${T.rule};margin:28px 0;">
            </td>
          </tr>
          <!-- SURVEY -->
          <tr>
            <td style="padding:0 40px;" class="content-pad">
              <table role="presentation" width="100%" cellpadding="28" cellspacing="0" border="0"
                     bgcolor="${T.ink}" style="background-color:${T.ink};border-radius:8px;margin:0 0 28px;">
                <tr>
                  <td style="padding:28px 30px;">
                    <h3 style="margin:0 0 6px;font-family:${T.serif};font-size:20px;color:#ffffff;font-weight:normal;line-height:1.3;">${survey.title}</h3>
                    <p style="margin:0 0 14px;font-family:${T.sans};font-size:13px;color:#aaaaaa;">${survey.subtitle}</p>
                    <p style="margin:0 0 18px;font-family:${T.sans};font-size:14px;color:#e8e5df;font-weight:bold;">${survey.question}</p>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      ${options}
                    </table>
                    <p style="margin:14px 0 0;font-family:${T.sans};font-size:11px;color:#666666;text-align:center;">Klicke auf deine Antwort im E-Mail-Client oder &ouml;ffne die Web-Version f&uuml;r das interaktive Ergebnis.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>`;
}

function ctaBlock(cta) {
  return `
          <!-- CTA -->
          <tr>
            <td style="padding:0 40px 28px;" class="content-pad">
              <table role="presentation" width="100%" cellpadding="30" cellspacing="0" border="0"
                     bgcolor="${T.green}" style="background-color:${T.green};border-radius:8px;text-align:center;">
                <tr>
                  <td style="padding:30px;text-align:center;">
                    <h3 style="margin:0 0 8px;font-family:${T.serif};font-size:22px;color:#ffffff;font-weight:normal;line-height:1.3;">${cta.headline}</h3>
                    <p style="margin:0 0 20px;font-family:${T.sans};font-size:13px;color:rgba(255,255,255,0.8);line-height:1.6;">${cta.text}</p>
                    <a href="${cta.buttonUrl}"
                       style="display:inline-block;background-color:#ffffff;color:${T.green};font-family:${T.sans};font-size:14px;font-weight:bold;padding:13px 30px;border-radius:6px;text-decoration:none;letter-spacing:0.2px;">${cta.buttonLabel}</a>
                    <p style="margin:10px 0 0;font-family:${T.sans};font-size:11px;color:rgba(255,255,255,0.55);">${cta.note}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>`;
}

function footer(f) {
  const links = f.links
    .map((l, i) => `<a href="${l.url}" style="color:${T.gold};text-decoration:none;font-weight:bold;">${l.label}</a>${i < f.links.length - 1 ? ' &nbsp;&middot;&nbsp; ' : ''}`)
    .join('');
  return `
          <!-- FOOTER -->
          <tr>
            <td bgcolor="${T.cream}" style="background-color:${T.cream};border-top:1px solid ${T.rule};padding:20px 40px;text-align:center;" class="content-pad">
              <p style="margin:0;font-family:${T.sans};font-size:11px;color:${T.muted};line-height:1.7;">
                ${f.unsubscribeText}<br>
                ${links}<br><br>
                ${f.company}<br>
                ${f.disclaimer}
              </p>
            </td>
          </tr>`;
}

// ── Haupt-Build-Funktion ──────────────────────────────────────────────────────

function build(content) {
  const sections = [
    masthead(content.issue),
    subjectStrip(content.subjectLines),
    greeting(content.greeting),
    ...content.newsItems.map((item) => newsCard(item, content.regionLabels)),
    surveyBlock(content.survey),
    ctaBlock(content.cta),
    footer(content.footer),
  ].join('\n');

  return wrap(sections);
}

// ── Dateipfade ────────────────────────────────────────────────────────────────

const ROOT      = path.resolve(__dirname, '..');
const SRC_DATA  = path.join(ROOT, 'src', 'data', 'content.json');
const DIST_DIR  = path.join(ROOT, 'dist');

const content = JSON.parse(fs.readFileSync(SRC_DATA, 'utf8'));
const html    = build(content);

fs.mkdirSync(DIST_DIR, { recursive: true });

const outFile  = path.join(DIST_DIR, `newsletter-${content.issue.id}.html`);
const latestFile = path.join(DIST_DIR, 'newsletter-latest.html');

fs.writeFileSync(outFile, html, 'utf8');
fs.writeFileSync(latestFile, html, 'utf8');

console.log(`✓ Gebaut: dist/newsletter-${content.issue.id}.html`);
console.log(`✓ Kopiert: dist/newsletter-latest.html`);
console.log(`  ${html.length.toLocaleString('de-CH')} Zeichen`);

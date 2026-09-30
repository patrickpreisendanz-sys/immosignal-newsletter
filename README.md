# ImmoSignal Newsletter

Interaktiver HTML-E-Mail-Newsletter für Schweizer Immobilieninvestoren. Dieses Repo ist die Arbeitsgrundlage zum Weiterbauen in Claude Code.

## Kontext & Zielgruppe

- **Zielgruppe:** Immobilieninvestoren in der Schweiz (Rendite & Portfolio-Fokus)
- **Tonfall:** Du-Stil mit Schweizer Charme — locker, aber kompetent
- **Sprache:** Schweizer Hochdeutsch (kein "ß", immer "ss"; Schweizer Begriffe wie Liegenschaft, Stockwerkeigentum, Besichtigungstermin)
- **Regionen im Fokus:** Zürich & Zürichsee, Genf & Genfersee, Bern & Mittelland, Basel & Nordwestschweiz, sowie gesamtschweizerische Trends
- **Format:** Muss in gängigen E-Mail-Clients funktionieren (Outlook, Apple Mail, Gmail) — das bedeutet inline-styled, tabellenbasiertes Layout für den Versand, aber eine moderne CSS-Version für die Web-/Vorschau-Variante

## Was bereits existiert

Ein erster funktionsfähiger Prototyp (`reference/newsletter_v1.html`) mit:

1. Masthead mit Branding (ImmoSignal)
2. A/B-Betreffzeilen-Vorschau-Strip
3. Drei Themenkarten (Zinsen, Preise, Politik/Regulierung) mit Stat-Pills, Highlight-Boxen und Insider-Tipps
4. Interaktive 1-Klick-Umfrage mit animierten Ergebnis-Balken (reine Frontend-Simulation, kein Backend)
5. CTA-Block für Besichtigungstermin/Erstberatung
6. Footer mit Abmeldelink-Platzhaltern

Designsprache: dunkle Masthead-Leiste, Goldakzent (`#b8922a`), Serif-Headlines (DM Serif Display), Sans-Body (Inter), farbcodierte Themenkarten (Gold = Zinsen, Rot = Preise, Grün = Regulierung).

## Projektstruktur

```
immosignal-newsletter/
├── README.md                  ← diese Datei
├── reference/
│   └── newsletter_v1.html     ← Original-Prototyp (nicht verändern, als Referenz behalten)
├── src/
│   ├── data/
│   │   └── content.json       ← alle Texte, News-Items, Stats, Umfrage-Optionen (zentral editierbar)
│   ├── styles/
│   │   └── tokens.css         ← Design-Tokens (Farben, Fonts, Spacing) als CSS-Variablen
│   ├── templates/
│   │   └── (Platz für Partials, falls ihr auf einen Template-Ansatz wechselt, z.B. Handlebars/Eta)
│   ├── scripts/
│   │   └── survey.js          ← Umfrage-Logik, ausgelagert aus dem HTML
│   └── index.html             ← Web-/Vorschau-Version (modernes CSS, responsive)
├── dist/                       ← Build-Output (E-Mail-kompatible Version landet hier)
├── docs/
│   └── content-briefing.md    ← Briefing-Vorgaben (Zielgruppe, Tonfall, Rechtschreibung) als Nachschlagewerk
└── assets/                     ← Platz für Logos, Bilder etc.
```

## Offene nächste Schritte (Vorschläge für Claude Code)

1. **Inline-CSS-Build-Schritt** einbauen, der aus `src/index.html` + `src/styles/tokens.css` eine E-Mail-kompatible Version mit Tabellen-Layout in `dist/` erzeugt (z. B. mit einem Tool wie `mjml` oder `juice`).
2. **Content-Datei** (`src/data/content.json`) als Single Source of Truth nutzen, damit neue Newsletter-Ausgaben nur Daten ändern müssen, nicht HTML.
3. **Umfrage-Backend** anbinden (z. B. einfacher Webhook zu Airtable/Google Sheets oder Mailchimp-Integration) statt der aktuellen reinen Frontend-Simulation.
4. **Versionierung pro Ausgabe**: z. B. `content/2026-06.json`, `content/2026-07.json` für monatliche Ausgaben.
5. **Tests/Vorschau**: Ein einfaches lokales Script (`npm run preview`) für schnelle Browser-Vorschau beim Editieren.

## Design-Tokens (Kurzreferenz)

| Token | Wert | Verwendung |
|---|---|---|
| `--ink` | `#141210` | Haupttext, Masthead-Hintergrund |
| `--paper` | `#faf9f6` | Content-Hintergrund |
| `--cream` | `#f2efe8` | Seiten-/Footer-Hintergrund |
| `--gold` | `#b8922a` | Akzent: Zinsen-Thema, CTA-Highlights |
| `--green` | `#1e5c3a` | Akzent: Regulierung-Thema, CTA-Button |
| `--red` | `#b83333` | Akzent: Preise/Risiko-Thema |
| Serif | `DM Serif Display` | Headlines |
| Sans | `Inter` | Fliesstext, UI |

## Rechtschreibung & Stil-Regeln (verbindlich)

- Kein "ß" — immer "ss"
- Schweizer Fachbegriffe verwenden: Liegenschaft, Stockwerkeigentum, Besichtigungstermin, Estrich, Referenzzinssatz
- Du-Anrede, aber kompetent — keine Umgangssprache, die unseriös wirkt
- Zahlen/Daten immer mit Quelle versehen (SNB, UBS, Wüest Partner, etc.), auch wenn nur intern dokumentiert

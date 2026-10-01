# Memory

## Me

Patrick Preisendanz, Einzelunternehmer in Gründung, Untersiggenthal AG (Schweiz).
Baut zwei eigene Produkte rund um Schweizer Immobilien — Feingrund als Software,
ImmoSignal als Newsletter. Arbeitet allein, ohne Team.

## Preferences

- **Sprache: immer Deutsch**, Schweizer Rechtschreibung (ss statt ß). Gilt auch
  für Code-Reviews, Befunde und Zusammenfassungen.
- **Fachbegriffe schweizerisch:** Liegenschaft, Stockwerkeigentum, Massnahme.
- Möchte wissen, *warum* etwas so gebaut ist — Kommentare im Code erklären
  Gründe, nicht Mechanik.
- Will bei Entscheidungen gefragt werden, statt vor vollendete Tatsachen
  gestellt zu werden.
- **Entscheidungen immer als Auswahlfenster stellen**, nicht als Fliesstext
  mit Varianten A/B. Gilt grundsätzlich, auch bei nur zwei Möglichkeiten.
- Prüft Schritte gern anhand von Screenshots; erwartet dann genaue Angaben,
  welches Feld welchen Wert bekommt.

## Projects

| Name | Was |
|------|-----|
| **Feingrund** | PWA für Immobilieneigentümer in CH/DE/AT. Anlagenregister, Massnahmenplanung, Marktwert, Dokumente. Live seit 27.09.2026. |
| **feingrund-web** | Landingpage und Rechtstexte, getrennte Ablage vom App-Code |
| **ImmoSignal** | HTML-E-Mail-Newsletter für Schweizer Immobilieninvestoren |

## Terms

| Begriff | Bedeutung |
|---------|-----------|
| Immobilie | Ein Objekt im Bestand (Haus oder Wohnung). Seit 28.09.2026 der Begriff im Produkt |
| Liegenschaft | Abgelöst durch „Immobilie". Lebt in Datenbank-Bezeichnern weiter (`max_liegenschaften`) |
| Anlage | Bauteil mit Lebensdauer: Heizung, Dach, Fenster |
| Nutzungsdauer | Wie lange eine Anlage hält, je Kategorie |
| Ersatzkosten | Was der Ersatz einer Anlage kostet |
| werterhaltend | Instandhaltung, steuerlich abzugsfähig |
| wertvermehrend | Verbesserung, nicht abzugsfähig |
| Massnahmenplan | 10-Jahres-Plan der fälligen Investitionen |
| stillgelegt | Immobilie/Anlage nur lesbar, weil der Tarif zu klein ist |
| Tarif "keiner" | Kein Tarif gebucht — Konto lesbar, nicht beschreibbar |
| Wohneigentum | Mittlere Tarifstufe, 9 CHF. Hiess bis 01.10.2026 „Essential"; der Enum-Wert in der Datenbank ist weiterhin `essential` |

## Tools

| Dienst | Wofür |
|--------|-------|
| Supabase | Datenbank, Anmeldung, Dateien — Projekt in **Zürich** |
| Hostpoint | Domains, DNS, Webhosting **und** Auslieferung beider Websites — Server in der Schweiz |
| GitHub Actions | Baut die App und lädt per rsync auf Hostpoint |
| Resend | Automatischer Mailversand ab send.feingrund.ch |
| GitHub | `patrickpreisendanz-sys`, beide Ablagen privat |

## Working agreements

- Nach jedem Arbeitsschritt `git push` — sonst liegt der Stand nur auf dem Mac.
- `VITE_`-Variablen stehen versioniert im GitHub-Ablauf, nicht in einer Oberfläche.
- Auslieferung nur bei Änderungen an ausgelieferten Dateien (`paths`-Filter).
- Passwörter, Bestätigungscodes und OAuth-Anmeldungen macht er selbst.
- Geheimnisse gehen über die Zwischenablage, nicht durch den Chat.

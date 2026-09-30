# ImmoSignal Newsletter

Interaktiver HTML-E-Mail-Newsletter für Schweizer Immobilieninvestoren.
Ablage: `~/Documents/04_Newsletter/immosignal-newsletter`

- **Zielgruppe:** Investoren mit Rendite- und Portfolio-Fokus
- **Tonfall:** Du-Stil, Schweizer Hochdeutsch
- **Format:** tabellenbasiert und inline-gestylt für den Versand, moderne
  CSS-Fassung für die Webansicht

## Offene Baustellen (Stand Code-Review 27.09.2026)

- Zwei Build-Skripte, `scripts/build.js` und `scripts/build.py`, die
  auseinandergelaufen sind. `npm run build` verschluckt Node-Fehler und nimmt
  still das Python-Skript.
- Der interne Betreffzeilen-A/B-Test landet in der Mail an alle Empfänger.
- Die Umfrage im Mailteil hat keine Links, sammelt also nichts.
- Abmelde-, Einstellungs- und Datenschutzlinks zeigen auf `#`.
- Kein Git-Repository — keine Versionsgeschichte.

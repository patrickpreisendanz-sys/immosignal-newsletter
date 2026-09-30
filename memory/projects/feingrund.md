# Feingrund

PWA für Eigentümerinnen und Eigentümer von Immobilien in der Schweiz,
Deutschland und Österreich. Live seit 27.09.2026.

- **App:** https://app.feingrund.ch — Ablage `~/Documents/05_Hausakte/feingrund`
- **Website:** https://feingrund.ch — Ablage `~/Documents/05_Hausakte/feingrund-web`
- **Slogan:** Jede Anlage. Jede Massnahme. Jeder Termin. Jedes Dokument.
- **Checkliste bis zum Start:** `CHECKLISTE.md` im App-Projekt

## Technik

React 19, Vite 8, TypeScript, Tailwind. Supabase für Datenbank, Anmeldung und
Dateien (Rechenzentrum Zürich). Netlify liefert aus und baut bei jedem Push.

Mengengrenzen werden **in der Datenbank per Trigger** durchgesetzt, nicht im
Frontend — die Anwendung läuft im Browser und der Schlüssel liegt offen.

## Gestaltung

Richtung "Hausbank": hell, ruhig, Markengrün `#1C3829`, Gold `#B8780E`.
Schrift Atkinson Hyperlegible. Wortmarke in Versalien, Textblock bündig zu den
Kanten der Bildmarke. Zusatzzeile "Die Immobilienplattform".

## Wichtige Eigenheiten

- Die Investor-Ansicht liegt fertig unter `pages/Investor`, hat aber bewusst
  keine Route — Phase 2.
- Auth-Rückleitungen müssen in Supabase freigegeben sein, sonst scheitern
  Magic Link und Passwort-Reset.
- `supabase config push` überträgt die **gesamte** config.toml und kennt keinen
  Probelauf. Auth-Einstellungen deshalb im Dashboard ändern.

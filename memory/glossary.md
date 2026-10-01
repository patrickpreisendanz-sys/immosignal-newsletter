# Glossar

## Immobilien-Fachbegriffe (Schweiz)

| Begriff | Bedeutung |
|---------|-----------|
| Immobilie | Ein Objekt im Bestand. In Feingrund die oberste Einheit; Anlagen und Dokumente hängen daran. Seit dem 28.09.2026 heisst sie überall so. |
| Liegenschaft | Derselbe Begriff, im Produkt abgelöst durch „Immobilie". Lebt in Bezeichnern der Datenbank weiter: `max_liegenschaften`, `pruefe_liegenschaft_nutzbar`. Beim Suchen und Ersetzen daran denken. |
| Anlage | Bauteil mit begrenzter Lebensdauer: Heizung, Dach, Fenster, Photovoltaik. |
| Nutzungsdauer | Erwartete Lebensdauer einer Anlage, Standardwert je Kategorie, pro Anlage anpassbar. |
| Ersatzkosten | Kosten für den Ersatz einer Anlage. Grundlage des Massnahmenplans. |
| werterhaltend | Instandhaltung, die den Zustand bewahrt. In der Schweiz steuerlich abzugsfähig. |
| wertvermehrend | Investition, die den Wert steigert. Nicht abzugsfähig. |
| Massnahmenplan | Plan der fälligen Investitionen über zehn Jahre, samt empfohlener Monatsrücklage. |
| Monatsrücklage | Gleichmässige Verteilung der Zehnjahreskosten, ohne Verzinsung und Teuerung. |
| Stockwerkeigentum | Schweizer Form des Wohnungseigentums. |

## Feingrund-eigene Begriffe

| Begriff | Bedeutung |
|---------|-----------|
| stillgelegt | Immobilie oder Anlage bleibt sichtbar und exportierbar, aber nicht bearbeitbar. Greift, wenn mehr aktiv ist, als der Tarif erlaubt. |
| Tarif "keiner" | Zustand ohne gebuchten Tarif. Alle Mengengrenzen stehen auf 0, dadurch weisen die bestehenden Trigger jeden neuen Eintrag und jede Änderung ab. Löschen bleibt möglich. |
| effektiver_tarif | Datenbankfunktion: der höhere Wert aus gebuchtem Tarif und Beta-Schenkung. |
| Beta-Schenkung | `beta_essential_bis` in der Tabelle `abonnements`. Schenkt Wohneigentum bis 31.03.2027 (verlängert am 01.10.2026, vorher 31.12.2026). Das Datum steht zudem als Rückfallwert in `effektiver_tarif` und in den AGB. |
| Tarifstufen | keiner → Starter (3 CHF) → **Wohneigentum** (9) → Investor (19) → Individuell. Der Enum-Wert der mittleren Stufe heisst in der Datenbank weiterhin `essential`; umbenannt wurde am 01.10.2026 nur der Anzeigename. |

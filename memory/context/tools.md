# Werkzeuge und Zugänge

| Dienst | Wofür | Bekannte Eigenheiten |
|--------|-------|----------------------|
| **Supabase** | Datenbank, Anmeldung, Dateien | Projekt `scjgyjlrnstmnxcrhcdv`, Region `eu-central-2` (Zürich) |
| **Hostpoint** | Domains, DNS, Mail **und Webhosting** | Seit 01.10.2026 laufen beide Websites hier, Server in der Schweiz. DNS-Editor sammelt Änderungen; erst "JETZT AUSFÜHREN" schaltet scharf |
| **GitHub Actions** | Baut die App und lädt per rsync auf Hostpoint | Prüft Typen und Tests, bevor es ausliefert |
| ~~Netlify~~ | abgelöst am 01.10.2026 | Kontingent aufgebraucht: 300 Credits für 20 Auslieferungen, je 15 |
| **Resend** | Automatischer Mailversand | Absenderdomäne `send.feingrund.ch`, Region Irland |
| **GitHub** | Versionierung | Konto `patrickpreisendanz-sys`, Zugang per SSH-Schlüssel |

## Domains

`feingrund.ch` (aktiv), `feingrund.com` und `feingrund.de` (registriert, ungenutzt).
E-Mail läuft über Hostpoint; der SPF-Eintrag der Hauptdomäne nutzt `redirect=`
und darf nicht umgebaut werden — deshalb die Unterdomäne für Resend.

## Fallstricke aus der Praxis

- **Maskierte Werte kopieren:** Ein Schlüssel wurde zweimal als Anzeigetext
  eingefügt (`eyJhbGci` plus Aufzählungspunkte). Werte immer über die
  Kopier-Schaltfläche holen und danach die letzten Zeichen prüfen.
- **AAAA-Einträge nicht vergessen:** Beim Umzug einer Domain zeigt sonst
  IPv6 weiterhin zum alten Anbieter — der Fehler zeigt sich nur bei manchen
  Besuchern.
- **Homebrew auf diesem Intel-Mac** baut viele Pakete aus dem Quellcode.
  `gh` hätte eine halbe Stunde gebraucht; SSH war der schnellere Weg.

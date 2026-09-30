# Werkzeuge und Zugänge

| Dienst | Wofür | Bekannte Eigenheiten |
|--------|-------|----------------------|
| **Supabase** | Datenbank, Anmeldung, Dateien | Projekt `scjgyjlrnstmnxcrhcdv`, Region `eu-central-2` (Zürich) |
| **Netlify** | Auslieferung beider Websites | Baut aus GitHub. Variablen der Oberfläche übersteuern `netlify.toml` |
| **Hostpoint** | Domains, DNS, Mail | DNS-Editor sammelt Änderungen; erst "JETZT AUSFÜHREN" schaltet scharf |
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

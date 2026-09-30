# Tasks

## Active

> **Als Nächstes (Entscheid vom 30.09.2026):** Beta-Ende absichern und
> Wartungserinnerungen scharf schalten. Beide hängen zusammen — es sind die
> zwei Stellen, an denen die Anwendung etwas zusagt, das sie heute nicht
> einlöst.


- [ ] **Einzelunternehmen gründen und AHV anmelden** - vor dem ersten eingenommenen Franken
  - Sobald Geld fliesst, liegt selbständige Erwerbstätigkeit vor, unabhängig von der Anmeldung
  - Danach Impressum nachführen; Handelsregister und MWST erst ab 100'000 Franken Jahresumsatz

- [ ] **Zahlungsabwicklung wählen und anbinden** - Voraussetzung dafür, dass überhaupt jemand einen Tarif buchen kann
  - Aktuell gibt es keinen Weg, Starter/Essential/Investor zu buchen — weder Knopf noch Anbieter
  - Blockiert zusammen mit dem Beta-Ende den regulären Betrieb ab 2027

- [ ] **Beta-Ende 31.12.2026 absichern** - harte Kante, betrifft ausnahmslos alle Konten
  - Danach fällt jedes Konto auf "keiner", also Lesezugriff. Früher war der Rückfall "starter" und weiter nutzbar
  - Entweder Zahlung bis dahin fertig, oder `beta_essential_bis` in der Tabelle `abonnements` verlängern
  - Die AGB versprechen eine Vorwarnung per E-Mail — dieser Versand existiert nicht
  - **Prüfung 30.09.2026:** `effektiver_tarif()` nimmt `greatest(gebuchter Tarif,
    Beta-Schenkung)`. Am 01.01.2027 ist die Schenkung `keiner`, und weil es keine
    Zahlungsabwicklung gibt, hat niemand etwas gebucht — es trifft also jedes Konto
    gleichzeitig, ohne Ausweichmöglichkeit für die Betroffenen.
  - Es gibt keinen Code, der auf `beta_essential_bis` reagiert, bevor das Datum
    erreicht ist. Die Grenze schlägt ohne Ankündigung zu.

- [ ] **Auth-Mails auf Deutsch und eigenes Branding** - Supabase Dashboard > Authentication > Email Templates
  - Registrierung, Passwort-Reset und Magic Link kommen als englische Standardvorlage von noreply@mail.app.supabase.io
  - Bei einem Passwort-Reset wirkt das auf Nutzer wie Phishing
  - Absender über Resend auf send.feingrund.ch umstellen; Gestaltung analog zur Wartungsmail

- [ ] **Wartungserinnerungen scharf schalten** - Mailversand steht, Zeitplan fehlt
  - Die Funktion `wartungserinnerung` ist ausgeliefert und aktiv, ruft aber niemand auf
  - Cron-Job anlegen wie bei der Wartelisten-Übersicht; Achtung: verify_jwt steht dort noch auf an
  - **Prüfung 30.09.2026:** Die Funktion antwortet mit 401, ist also ausgerollt und
    korrekt per `x-cron-secret` abgesichert. Es fehlt ausschliesslich der Auslöser.
  - Das ist keine Kleinigkeit: Die Website verkauft die Funktion wörtlich
    ("Feingrund meldet sich per E-Mail, bevor etwas fällig wird") und der Tarif
    Wohneigentum führt "Wartungsplanung inkl. Erinnerung" als Leistung auf.
    Solange kein Zeitplan läuft, wird eine bezahlte Zusage nicht erfüllt.

- [ ] **Bestätigungsmail für Zitate in den Rückmeldungen** - schriftliches Einverständnis einholen
  - Alex J. hat den Wortlaut am 28.09.2026 telefonisch bestätigt — schriftlich noch nicht
  - Kurze Mail mit dem veröffentlichten Wortlaut, seine Antwort aufbewahren
  - Gleiches gilt für die übrigen Stimmen auf der Landingpage
  - Kurze Mail mit dem genauen Zitat, Antwort aufbewahren

- [ ] **Bestätigungsmail für die Warteliste (Double Opt-in)** - wer sich einträgt, bekommt aktuell nichts
  - Gestern hat sich jemand eingetragen und keinerlei Rückmeldung erhalten
  - Bestätigt gleichzeitig, dass die Adresse stimmt und dem Eintrag zugestimmt wurde
  - Der Mailversand über send.feingrund.ch steht bereits

- [ ] **Zeitpläne in die Versionierung holen** - aus dem Code nicht nachvollziehbar
  - Keine Migration legt einen Cron-Job an. Ob in der Datenbank welche laufen,
    lässt sich von aussen nicht prüfen — die Wartelisten-Übersicht wurde am
    27.09.2026 über die Supabase-Oberfläche eingerichtet, nicht im Code.
  - Folge: Bei einem Neuaufbau der Datenbank fehlen sie stillschweigend, und
    niemand sieht dem Projekt an, was wann laufen sollte.
  - Als Migration mit `cron.schedule()` nachziehen, sobald pg_cron aktiv ist

- [ ] **Verwaiste Dateien im Speicher verhindern** - wächst unbemerkt
  - `useDocuments.ts` lädt erst die Datei hoch, legt dann die Zeile in `documents`
    an. Scheitert der zweite Schritt, wird die Datei sauber entfernt — bricht aber
    der Browser dazwischen ab (Tab zu, Verbindung weg), bleibt sie liegen.
  - Solche Dateien sind für den Nutzer unsichtbar und zählen nicht gegen die
    Quote, weil die aus `documents` gerechnet wird. Sie verbrauchen Speicher,
    den du bezahlst.
  - Zweiter, verwandter Punkt: Die Speicherregel prüft nur das Pfadpräfix
    (`{user_id}/…`). Wer die Storage-API direkt anspricht, kann beliebig viel in
    den eigenen Ordner laden, ohne je eine `documents`-Zeile anzulegen. Setzt
    Absicht voraus, ist aber derselbe blinde Fleck.
  - Lösungsrichtung: eine wiederkehrende Aufräumung, die Objekte ohne passende
    `documents`-Zeile nach einer Schonfrist entfernt

- [ ] **Tarif-Logik testen** - `src/lib/tarif.ts` ist ungetestet
  - Von 11'215 Zeilen Anwendungscode ist genau ein Modul durch Tests gedeckt:
    `calculations.ts` (353 Zeilen Code, 393 Zeilen Test — gut gemacht).
  - Ungetestet sind unter anderem `tarif.ts`, `format.ts`, `labels.ts`,
    `bewertung.ts` und `standardanlagen.ts`.
  - `tarif.ts` zuerst: Es entscheidet, was ein Konto darf, und wird nach der
    Umbenennung auf Wohneigentum und der Einführung von "keiner" von mehreren
    Stellen gelesen. Ein Fehler dort ist teuer und fällt spät auf.

## Waiting On

- [ ] **Rechtstexte fachlich gegenlesen lassen** - Anwalt oder Rechtsberatung
  - Alle 25 Platzhalter sind ausgefüllt und live, aber von mir, nicht von einem Juristen
  - Kritische Stellen: Haftung, Gerichtsstand, Widerrufsrecht
  - Spätestens vor dem ersten zahlenden Kunden

## Someday
- [ ] **Veralteten Kommentar zur Speichergrenze berichtigen** -
  `20260812120000_tarife.sql:38` sagt, die Speichersumme sei "rein informativ"
  und werde nicht durchgesetzt. Seit `20260812150000` prüft der Trigger sie
  sehr wohl. Wer den Kommentar liest, zieht den falschen Schluss.

- [ ] **DSGVO und DSG nebeneinander nennen** - die App schreibt "DSGVO-konform".
  Für ein Schweizer Angebot ist das revidierte DSG die nähere Referenz, für
  Kundschaft in DE/AT die DSGVO. Beides zu nennen wäre genauer als eines davon.

- [ ] **Massnahmenplan mit echten Daten durchklicken** - bisher nur mit Testdaten geprüft

- [ ] **Investor-Ansicht** - Cashflow, Belehnung, Renditen; bewusst für Phase 2 zurückgestellt
  - Code liegt unter `pages/Investor`, die Route fehlt absichtlich

## Done

- [x] **info@feingrund.ch eingerichtet** (30.09.2026) - Postfach, Weiterleitung
  an Gmail und Versand ueber "Senden als" stehen und sind geprueft. Die Sperre
  der Cloud Office-Gruppe, an der es am 28.09. scheiterte, hat sich mit dem
  Umzug auf das Hostpoint-Webhosting von selbst erledigt; das Support-Ticket
  ist gegenstandslos. Damit nennt das Impressum eine Adresse, die es gibt.
  - Zwei Stolpersteine fuers naechste Mal: Gmail schlaegt als SMTP-Server den
    MX-Eintrag vor (`mx2.mail.hostpoint.ch`), der auf Port 587 gar nicht
    antwortet -- richtig ist `asmtp.mail.hostpoint.ch`, Nutzername die
    vollstaendige Adresse.
  - Eine Weiterleitung laesst sich nicht testen, indem man aus dem Zielkonto
    an die weitergeleitete Adresse schreibt: Gmail erkennt die zurueckkommende
    Kopie an der gleichen Message-ID und verwirft sie stillschweigend.

- [x] **Manifest-Beschreibung korrigiert** (30.09.2026) - sagt jetzt
  "Immobilieneigentümer/innen in der Schweiz, Deutschland und Österreich"
  statt "Häusern und Wohnungen"; live im Manifest geprüft
- [x] **Umzug von Netlify auf Hostpoint** (30.09.2026) - ausgelöst durch das
  aufgebrauchte Netlify-Kontingent (300 Credits für 20 Auslieferungen, neuer
  Zyklus erst am 22.10.). Beide Adressen laufen jetzt auf Schweizer Servern mit
  eigenem Let's-Encrypt-Zertifikat. Dadurch darf "Server in der Schweiz" wieder
  auf die Seite; die Datenschutzerklärung nennt Hostpoint statt Netlify.
  Die GitHub-Abläufe liegen bereit, brauchen aber noch die Secrets.

- [x] ~~Beide Projekte privat bei GitHub sichern~~ (27.09.2026)
- [x] ~~feingrund.ch und app.feingrund.ch live mit SSL~~ (27.09.2026)
- [x] ~~Alle 25 Platzhalter in den Rechtstexten ersetzen~~ (27.09.2026)
- [x] ~~Tarifumstellung: kein Gratis-Tarif mehr, Stufe "keiner"~~ (27.09.2026)
- [x] ~~Tägliche Übersicht der Wartelisten-Anmeldungen~~ (27.09.2026)
- [x] ~~Anmeldung bei Supabase auf die neue Domain freischalten~~ (27.09.2026)

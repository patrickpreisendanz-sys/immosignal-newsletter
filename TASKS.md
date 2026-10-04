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

- [ ] **Vorwarnung vor dem Beta-Ende bauen** - Zusage aus den AGB
  - Frist steht seit 01.10.2026 auf dem 31.03.2027, das Datum allein löst es nicht
  - Die AGB versprechen: "Wir informieren dich rechtzeitig vor dem Ende der
    kostenlosen Phase per E-Mail." Diesen Versand gibt es nicht.
  - Zu bauen: Edge Function, die Konten findet, deren `beta_essential_bis` in
    30 Tagen abläuft, plus Mailvorlage und Zeitplan. Das Gerüst steht jetzt —
    `public.edge_function_ausloesen()` und die Migration für Zeitpläne.
  - Spätestens Ende Februar 2027 scharf, besser früher

- [ ] **Tarif für nach der Beta vormerken lassen** - Absicht statt Buchung
  - `effektiver_tarif()` nimmt `greatest(gebuchter Tarif, Beta-Schenkung)`.
    Während der Beta hat jeder Wohneigentum geschenkt: Starter wäre weniger,
    Wohneigentum dasselbe zum Preis von 9 Franken. Eine Buchung während der
    Beta ergibt für niemanden Sinn.
  - Deshalb kein Buchen, sondern ein **Vormerken**: Der Nutzer wählt in den
    Einstellungen, welcher Tarif ab dem 01.04.2027 gelten soll. Keine Zahlung,
    keine Abrechnung, nur eine Absichtserklärung.
  - Bringt drei Dinge:
    - Die Vorwarnung vor dem Beta-Ende wird konkret: "Du hast Wohneigentum
      vorgemerkt, ab dem 1. April 9 Franken monatlich" statt einer allgemeinen
      Ankündigung
    - Du weisst vor dem Umsatzstart, womit zu rechnen ist
    - Es braucht keine Zahlungsabwicklung — eine Spalte und eine Auswahl
  - Vorarbeit vorhanden: Die Landingpage erfasst beim Eintragen auf die
    Warteliste bereits einen Tarifwunsch in `beta_anmeldungen.interesse`.
    Für bestehende Konten in der App fehlt das Gegenstück.
  - Hängt mit der Vorwarnung zusammen, am besten zusammen bauen

- [ ] **Kurzbeschreibung je Tarif** - wofür die Stufe gedacht ist, nicht nur was sie kann
  - Die Tarifkarten listen heute Merkmale (Anzahl Immobilien, Anlagen, Dokumente),
    sagen aber nicht, für welche Lebenslage die Stufe gemacht ist. Wer selbst in
    seinem Haus wohnt, muss aus der Merkmalsliste erraten, dass "Wohneigentum"
    ihn meint.
  - Gewollte Aussage je Stufe:
    - **Starter** - zum Einsteigen und sich einen Überblick verschaffen
    - **Wohneigentum** - selbstgenutzte Immobilien, Wohnung und/oder Haus
    - **Investor** - vermietete Häuser und/oder Wohnungen
  - An zwei Stellen nötig: Tarifkarten auf der Landingpage und die Tarifauswahl
    in der App. Hängt mit dem Vormerken nach der Beta zusammen — dort muss der
    Nutzer ja wissen, was er wählt.

- [ ] **Haus und Wohnung unterscheiden** - zwei Ebenen statt einer
  - Heute ist eine Immobilie eine flache Einheit. Künftig soll das Haus die
    oberste Ebene sein und die Wohnung eine mögliche Ebene darunter.
  - Der Zweck sind die Anlagen: Eine Heizung gehört dem Haus, ein Badumbau der
    Wohnung. Ohne die zweite Ebene lässt sich das nicht sauber zuordnen, und bei
    einem Mehrfamilienhaus landen alle Anlagen im selben Topf.
  - Besonders für **Investor** relevant: Wer ein Haus mit mehreren vermieteten
    Wohnungen hält, braucht die Kosten je Wohnung und zugleich die gemeinsamen
    Anlagen des Hauses.
  - Berührt Datenmodell, Tariflimiten (zählt eine Wohnung als eigene Immobilie?),
    Massnahmenplan und Marktwert. **Am besten vor dem ersten echten Datenbestand** —
    nachträglich bedeutet es, bestehende Immobilien und Anlagen umzuhängen.

- [ ] **Auth-Mails auf Deutsch und eigenes Branding** - Supabase Dashboard > Authentication > Email Templates
  - Registrierung, Passwort-Reset und Magic Link kommen als englische Standardvorlage von noreply@mail.app.supabase.io
  - Bei einem Passwort-Reset wirkt das auf Nutzer wie Phishing
  - Absender über Resend auf send.feingrund.ch umstellen; Gestaltung analog zur Wartungsmail

- [ ] **Bestätigungsmail für Zitate in den Rückmeldungen** - schriftliches Einverständnis einholen
  - Alex J. hat den Wortlaut am 28.09.2026 telefonisch bestätigt — schriftlich noch nicht
  - Kurze Mail mit dem veröffentlichten Wortlaut, seine Antwort aufbewahren
  - Gleiches gilt für die übrigen Stimmen auf der Landingpage
  - Kurze Mail mit dem genauen Zitat, Antwort aufbewahren

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

- [x] **Double Opt-in für die Warteliste** (04.10.2026) - wer sich eintrug,
  bekam bisher nichts zurück. Jetzt: Bestätigungsmail mit Einmallink,
  Bestätigungsseite auf feingrund.ch, und die Eintragung läuft über
  `warteliste-eintragen` statt direkt über die REST-Schnittstelle. Dadurch
  fiel die INSERT-Regel für `anon` weg — bisher konnte jeder mit dem
  Schlüssel aus dem Seitenquelltext beliebig viele Zeilen anlegen. Geprüft:
  direkter Schreibzugriff wird mit 42501 abgewiesen, Drosselung greift ab der
  sechsten Anfrage, Honigtopf und Mail-Deckel ebenso.
  - Zwei eigene Fehler, beide beim ersten Durchlauf aufgefallen: Das Alter des
    Links wurde an der Eintragung gemessen statt am Versand der Mail — eine
    Adresse, die seit August auf der Liste stand, bekam einen Link, der schon
    tot war. Und die Aufräumung hätte in derselben Nacht alle unbestätigten
    Eintragungen von vor dem 4. September gelöscht, auch die von echten
    Interessenten, die nie eine Bestätigungsmail bekommen konnten.
  - **Offen:** `warteliste-nachfassen` ist gebaut und ausgeliefert, aber noch
    nicht im Zeitplan. Die Migration dafür liegt als
    `20261004184000_zeitplan_nachfassen.sql` bereit. Vorher den Altbestand
    ohne Versandvermerk durchsehen und Testeinträge löschen.

- [x] **Seite „Bis die Beta öffnet"** (04.10.2026) - feingrund.ch/vorbereiten
  mit den Nutzungsdauern als Balken und einer Checkliste der Unterlagen.
  Bewusst eine eigene Seite statt ein Anbau an die Bestätigungsseite: Die
  steht auf noindex, ist nur mit Token erreichbar und wird einmal gesehen.
  Verlinkt aus Bestätigungsseite, Bestätigungsmail und Landingpage.

- [x] **Beta-Start im Dezember 2026 benannt** (04.10.2026) - stand vorher
  nirgends. Die Konstante `BETA_START` nennt in ihrem Kommentar alle drei
  weiteren Stellen mit derselben Aussage, damit eine Verschiebung keine
  Suchaktion wird: Fussnote der Landingpage, Bestätigungsseite,
  Vorbereitungsseite.

- [x] **Wartungserinnerungen scharf geschaltet** (01.10.2026) - Zeitplan taeglich
  07:00 UTC. Der Aufruf scheiterte zunaechst an verify_jwt: Supabases Gateway
  wies ihn mit UNAUTHORIZED_NO_AUTH_HEADER ab, bevor die Funktion startete.
  Die Einstellung steht jetzt in config.toml statt nur im Dashboard.
  Geprueft: 200, ein Empfaenger, zwei Wartungen gebuendelt, kein Fehlschlag.
- [x] **Zeitplaene versioniert** (01.10.2026) - beide Jobs als Migration, das
  Geheimnis ueber den Vault statt im Klartext in cron.job.command. Dabei zwei
  Befunde behoben: Die Wartelisten-Uebersicht pruefte das Geheimnis nur, wenn
  es gesetzt war — ohne Variable haette jeder Aufruf aus dem Netz die
  Adressliste ausgeloest. Und der Timeout von 1000 ms sorgte dafuer, dass
  Antworten nie erfasst wurden und ein Fehlschlag unsichtbar geblieben waere.
- [x] **Beta-Frist auf 31.03.2027** (01.10.2026) - das Datum stand an sieben
  Stellen: Standardwert der Spalte, beide bestehenden Konten, Rueckfallwert in
  effektiver_tarif, AGB, Hero, Preis-Legende und Formular-Fussnote.
- [x] **Auslieferung ueber GitHub Actions** (01.10.2026) - beide Ablagen bauen
  und laden selbst hoch, mit Typpruefung und Tests als Schranke davor. Der
  erste Auslieferungsschluessel war versehentlich in einem Screenshot sichtbar
  und wurde ersetzt; der alte ist bei Hostpoint geloescht und gegengeprueft
  abgewiesen.

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

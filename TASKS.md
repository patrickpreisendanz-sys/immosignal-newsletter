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

- [ ] **Auth-Mails auf Deutsch und eigenes Branding** - Supabase Dashboard > Authentication > Email Templates
  - Registrierung, Passwort-Reset und Magic Link kommen als englische Standardvorlage von noreply@mail.app.supabase.io
  - Bei einem Passwort-Reset wirkt das auf Nutzer wie Phishing
  - Absender über Resend auf send.feingrund.ch umstellen; Gestaltung analog zur Wartungsmail

- [ ] **Bestätigungsmail für Zitate in den Rückmeldungen** - schriftliches Einverständnis einholen
  - Alex J. hat den Wortlaut am 28.09.2026 telefonisch bestätigt — schriftlich noch nicht
  - Kurze Mail mit dem veröffentlichten Wortlaut, seine Antwort aufbewahren
  - Gleiches gilt für die übrigen Stimmen auf der Landingpage
  - Kurze Mail mit dem genauen Zitat, Antwort aufbewahren

## Waiting On

- [ ] **Rechtstexte fachlich gegenlesen lassen** - Anwalt oder Rechtsberatung
  - Alle 25 Platzhalter sind ausgefüllt und live, aber von mir, nicht von einem Juristen
  - Kritische Stellen: Haftung, Gerichtsstand, Widerrufsrecht
  - Spätestens vor dem ersten zahlenden Kunden

  **Ausdrücklich mitprüfen lassen (Stand 05.10.2026):**

  - [ ] **Entscheid gegen ein Einwilligungsbanner.** Vier Dinge liegen auf dem
    Gerät des Nutzers: das Sitzungsmerkmal der Anmeldung, der Zwischenspeicher
    der installierbaren App, ein Merker für den weggeklickten
    Installationshinweis und die abgehakten Punkte der Unterlagen-Checkliste
    auf `/vorbereiten`.
    - Begründung für die Einwilligungsfreiheit: § 25 Abs. 2 Nr. 2 TDDDG,
      Art. 5 Abs. 3 ePrivacy-Richtlinie, Art. 45c FMG — gespeichert wird
      allein, was der Nutzer selbst angeklickt hat, lokal, ohne Kennung, ohne
      Übertragung.
    - Die offene Frage: Beim Sitzungsmerkmal ist die Ausnahme unstrittig. Bei
      den **dauerhaften** Einträgen (Installationshinweis, Checkliste) stützt
      sie sich auf die Fallgruppen „Nutzereingabe" und
      „Oberflächenanpassung" — die Arbeitsgruppe 29 nennt dort Sitzungsdauer
      oder eine begrenzte Dauer. Unsere laufen unbegrenzt.
    - Mögliche Entschärfung, falls der Anwalt es enger sieht: ein Verfallsdatum
      auf diesen beiden Einträgen statt eines Banners.
    - Das Argument gegen einen Banner bleibt: Fragt man nach Einwilligung für
      etwas Einwilligungsfreies und jemand lehnt ab, muss man es befolgen —
      sonst entsteht ein Verstoss, wo vorher keiner war.

  - [ ] **Abschnitt 4 der Datenschutzerklärung** - zählt die vier Einträge seit
    dem 05.10.2026 vollständig auf. Vorher fehlten drei davon.

  - [ ] **AGB 2.1 und die Zusage zur Vorwarnung** - am 05.10.2026 angepasst:
    Mengengrenzen nennen jetzt Häuser und Wohnungen je Haus statt einer Zahl
    an Immobilien, und die Vorwarnung vor dem Beta-Ende nennt den Rhythmus
    („in der Regel 30 Tage und nochmals 7 Tage vorher"). Beides beschreibend
    gemeint, aber die Fristangabe bindet.

  - [ ] **„DSG und DSGVO" als Vertrauensaussage** - steht seit dem 05.10.2026
    auf Landingpage und Anmeldefenster. Gedeckt durch Abschnitt 11 der
    Datenschutzerklärung; ob die Kurzform so stehen darf, ist die Frage.

## Someday
- [ ] **Zwei Zeitpläne scharf stellen** - `beta-vorwarnung` und
  `speicher-aufraeumen` sind gebaut und ausgeliefert, laufen aber nicht von
  selbst. Beide verschicken Mails beziehungsweise löschen Dateien; die
  Anweisungen stehen im README der jeweiligen Funktion. Beim Aufräumlauf
  vorher einen Probelauf ansehen.

- [ ] **Vorlage der Wartelisten-Übersicht auslagern** - sie steht in
  derselben Datei wie `Deno.serve`, ein Import würde also einen Server
  starten. Dadurch ist sie als einzige Mailvorlage ungetestet.

- [ ] **Massnahmenplan mit echten Daten durchklicken** - bisher nur mit Testdaten geprüft

- [ ] **Investor-Ansicht** - Cashflow, Belehnung, Renditen; bewusst für Phase 2 zurückgestellt
  - Code liegt unter `pages/Investor`, die Route fehlt absichtlich

## Done

- [x] **Vorwarnung vor dem Beta-Ende** (05.10.2026) - zwei Stufen, 30 und 7
  Tage vorher. Merkliste je Konto **und** Stufe, sonst hätte die zweite
  Warnung die erste unterdrückt. Gewarnt wird nur, wer beim Beta-Ende etwas
  verliert. **Zeitplan nicht eingerichtet** — Anweisung im README der
  Funktion.

- [x] **Verwaiste Dateien aufräumen** (05.10.2026) - Suche in der Datenbank
  über `storage.objects` gegen `documents` und `properties`, Schonfrist 24
  Stunden. **Probelauf ist die Voreinstellung**; ohne `{"loeschen": true}`
  wird nur berichtet. **Zeitplan nicht eingerichtet.**

- [x] **Stilllegen über zwei Ebenen geprüft** (05.10.2026) - vier Befunde:
  Löschdialog verschwieg die Wohnungen, die Fehlermeldung versprach eine
  Auswahl die es nicht gab, gesperrte Wohnungen sahen aktiv aus, und die
  Zwölfmonatssperre liess nur eine Aktivierung je Tarifwechsel zu. Alle
  behoben.

- [x] **Mailvorlagen geprüft** (05.10.2026) - 48 Tests für Wartungs-,
  Bestätigungs- und Vorwarnungsmail. Offen: `wartelisten-uebersicht`, deren
  Vorlage in derselben Datei steht wie `Deno.serve`.

- [x] **Oberflächentests eingeführt** (05.10.2026) - jsdom und Testing
  Library. Geprüft ist zuerst die Fokusführung im Dialog und die
  Tastaturbedienung der Tabellen — beides hatte ich ohne Ansicht gebaut.

- [x] **DSG neben der DSGVO** (05.10.2026) - in App und Website. Am
  Rechtstext war nichts zu tun: Abschnitt 11 der Datenschutzerklärung nannte
  beide Rechtsordnungen schon.

- [x] **Veralteter Kommentar zur Speichergrenze** (05.10.2026) - erledigt
  ohne Änderung. Die Spalte wurde am 12.08. zu `max_speicher_mb` umbenannt und
  bekam dabei einen neuen, zutreffenden Kommentar. Der stehengebliebene Text
  steht nur in der älteren Migration und beschreibt den damaligen Stand.

- [x] **Ein Monatsname für alle drei Länder** (05.10.2026) - „Januar" auch für
  österreichische Konten, als Regel mit Begründung statt als Zufall. Die
  Entscheidung ging gegen die landesübliche Form: Ein Konto kann Objekte in
  mehreren Ländern führen, und zwei Namen für denselben Monat verwirren mehr,
  als „Jänner" nützt.

- [x] **Rechtsbegriffe für DACH zusammengezogen** (05.10.2026) - Stockwerk-
  oder Wohnungseigentum, Wertquote beziehungsweise Miteigentumsanteil,
  Erneuerungsfonds mit Instandhaltungsrücklage daneben. In App und Website.

- [x] **bildVerkleinern geprüft** (05.10.2026) - 15 Tests ohne neue
  Abhängigkeit. jsdom samt nativer Canvas-Implementierung hätte am Ende die
  Nachbildung geprüft statt den Code; stattdessen kommen die Browser-Bausteine
  als optionales Argument herein, der Produktivpfad ist unverändert. Die
  wichtigste Prüfung: dass auch ein bereits kleines Bild neu kodiert wird —
  daran hängt die Zusage, dass die GPS-Koordinaten der Aufnahme das Gerät
  nicht verlassen.

- [x] **Zugänglichkeit durchgegangen** (05.10.2026) - Dialoge nehmen den
  Fokus auf, halten ihn und geben ihn zurück; die Leertaste löst in den
  Tabellen aus wie überall sonst; `prefers-reduced-motion` wird respektiert.
  Ohne Befund: Schaltflächennamen, `lang`, Feldbeschriftungen, Ladeanzeige.

- [x] **Länderkontrolle CH/DE/AT** (05.10.2026) - keine fest verdrahtete
  Währung in der Oberfläche, keine Zahlenformate von Hand. Zwei Befunde
  stehen unter Someday, weil sie eine Entscheidung brauchen.

- [x] **Ungetestete Module abgedeckt** (05.10.2026) - von 68 auf 136 Tests,
  sieben neue Dateien: `format`, `bewertung`, `labels`, `standardanlagen`,
  `mappers`, `karte`, `rechtslinks`. Damit ist auch der Punkt aus dem
  Code-Review vom 30.09. erledigt, dass `tarif.ts` ungetestet war.
  - Geprüft wurde nicht Zeilenabdeckung, sondern was teuer bräche: dass
    „unbekannt" nicht als Beurteilung zählt, dass der Formatierer-Speicher
    die Länder nicht vermischt, dass jede Kategorie ihre Nutzungsdauer hat,
    und dass `toBundle` die übergebene Liste nicht umsortiert.
  - **Offen:** `bildVerkleinern` ist weiterhin ungetestet. Es entfernt die
    EXIF-Daten aus Handyfotos, also auch die GPS-Koordinaten der Aufnahme.
    Prüfen liesse sich das nur mit Canvas in einer Browserumgebung — ein
    eigener Schritt, an dem ein Datenschutzversprechen hängt.

- [x] **Haus und Wohnung unterscheiden** (04.10.2026) - zwei Ebenen statt
  einer, umgesetzt als Selbstbezug `eltern_id` in `properties`. Eine Wohnung
  braucht ein Haus, ein Haus braucht keine Wohnung. Grenzen je Ebene:
  Starter 1/1, Wohneigentum 1/2, Investor 3 Häuser mit je 6 Wohnungen.
  - Dazu die Wertquote `anteil_promille` am Haus: Beim Stockwerkeigentum
    gehört das Gebäude der Gemeinschaft, der Massnahmenplan rechnet die
    Hausanlagen anteilig. Ohne sie stünde ein Heizungsersatz für 80'000
    Franken voll in der Rücklage eines Eigentümers, den davon 6'800 treffen.
  - Nach dem ersten Test umgebaut: Die Wohnung stand als gleichrangiger Typ
    in der Auswahl, verlangte aber ein Haus, das es noch nicht gab. Jetzt in
    der Reihenfolge der Wirklichkeit — erst das Gebäude, dann die Frage nach
    den Wohnungen. Dazu eine Objektzeile über den Reitern, das Anlagenregister
    des Hauses zeigt die Wohnungen mit, und die Massnahmenplanung des Hauses
    rechnet sie ein (Hausanlagen anteilig, Wohnungsanlagen voll).
  - Noch nicht am Umbau beteiligt: Der Marktwert bleibt je Objekt und wird
    nicht über Haus und Wohnungen zusammengezogen. Für eine Hausansicht, die
    ihre Wohnungen aufsummiert, fehlt bisher die Oberfläche.

- [x] **Kurzbeschreibung je Tarif** (04.10.2026) - die Karten listeten Mengen,
  sagten aber nicht, wen die Stufe meint. Jetzt steht zwischen Preis und
  Merkmalsliste ein Satz je Stufe, auf der Landingpage und in der Tarifkarte
  der Einstellungen. Die Sätze liegen in `tarifZweck` in `src/lib/tarif.ts`,
  damit sie bei der kommenden Tarifauswahl schon bereitstehen; die
  Landingpage führt sie nochmals, weil sie eine getrennte Ablage ist.
  - Beim Ausrichten der Karten kam ein älterer Versatz heraus: Bei
    Wohneigentum bricht „pro Monat · in der Beta kostenlos" im Vierspalter um
    und verschob die Karte um 24 px. Mit behoben.

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
  - `warteliste-nachfassen` läuft stündlich zur Minute 20. Der Altbestand
    wurde vorher durchgesehen: zwei echte Eintragungen ohne Versandvermerk,
    keine Testadressen.
  - Zum Nachschlagen, wo die Beta-Frist steht: Die Konstante `BETA_START` in
    `_shared/warteliste-bestaetigung.ts` nennt in ihrem Kommentar die drei
    weiteren Stellen.

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

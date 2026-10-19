# Plan neue Website pauldienste.de

Stand 19.10.2026 (2. Fassung nach Rücksprache Dietrich). Logo und Slogan noch nicht freigegeben, Website wird trotzdem gebaut (Logo als austauschbare Komponente, Slogan als eine Variable).

Auftrag (25.09.2026): Astro, ohne Cookies, SEO, bis 20 Unterseiten, neue Leistungen (Fliegengitter, Bodenverlegung, Möbel- und Küchenmontage), Verkaufsbereich Premium-Bodenbeläge und Farben, 2 Korrekturschleifen. Design: **Gebäudereinigung hell, Handwerk dunkel**.

## 0. Festgelegt (Dietrich, 19.10.2026)

- **Schädlingsbekämpfung entfällt**, Paul kann sie nicht mehr anbieten.
- **Fassadenreinigung und Steinreinigung** bekommen je eine eigene Seite.
- **Grundreinigung und Bauendreinigung** bekommen je eine eigene Seite.
- **Bodenbeläge:** Paul arbeitet mit hochwertigen Lieferanten, Ausstellung in Kassel (Hackestraße …, genaue Adresse folgt).
- **Keine Festnetznummer**, Telefon bleibt 0155 66028476.
- **Einsatzgebiet:** 30 km um Kassel, größere Aufträge bis 50 km.
- **fensterputzerpaul.de** ist bereits auf pauldienste.de weitergeleitet.
- **domunova.de** (Fliegengitter, Plissees) zieht komplett in pauldienste.de um, mit Inhalten und Fotos.

## 1. Befund alte Seite pauldienste.de (WordPress/Divi, Rank Math, Borlabs)

| Problem | Folge |
|---|---|
| 3 Seiten für dasselbe Thema: Fensterreinigung Privat, Fensterreinigung Gewerbe, Glasreinigung Gewerbe | Seiten machen sich gegenseitig Konkurrenz, keine wird stark |
| Büroreinigung und Unterhaltsreinigung getrennt, fast gleicher Inhalt | dasselbe |
| Alle Titel enden auf „Fensterputzer Kassel“ | jede Seite zielt auf denselben Begriff |
| 6 von 9 Meta-Beschreibungen lauten nur „In Kassel & Umgebung“ | schwache Klickrate in Google |
| H1 doppelt (Desktop- und Mobilversion im Code) | unsauber für Google |
| Gleiche Blöcke auf jeder Seite („Ehrlich / Vertrauenswürdig / Zuverlässig“, „Regional / Zuverlässig / Faire Preise“) als H2/H3 | Textbausteine statt Inhalt, Überschriften ohne Suchbegriff |
| „Steinreinigung“ im Leistungsraster, aber keine Seite | toter Platz |
| Schema nur „Organization“, kein LocalBusiness, keine FAQ, kein Service | kein Ortsbezug für Google |
| Verlinkung nur über Menü, keine Links im Text zwischen den Leistungen | Seiten stützen sich nicht gegenseitig |
| Vorteile allgemein („faire Preise“), nichts Prüfbares | austauschbar mit jeder Reinigungsfirma |

## 1a. Befund domunova.de (WordPress, 4 Seiten)

- Startseite = Fliegengitter/Insektenschutz (Fenster, Türen, Dachfenster, Drehrahmen, Spannrahmen, Schiebetür, Pendeltür, Plissee-Tür, Pollenschutz, Haustiergewebe), Unterseite `/plissees/` (Plissees, Sonnenschutz). Ablauf: Anfrage → Beratung & Aufmaß → Festpreisangebot → Montage.
- Search Console (16 Monate): 83 Klicks. **„fliegengitter kassel“ Platz 3,1** (12 % Klickrate), „plissee kassel“ Platz 11, „insektenschutz kassel“ Platz 34, „sonnenschutz kassel“ Platz 41–56.
- Gleiche Schwächen wie pauldienste (H1 doppelt, Bausteine „Regional / Zuverlässig / Faire Preise“).
- **Bilder:** `AdobeStock_331309624_Preview.jpeg` ist eine Adobe-Stock-**Vorschau** (ohne Lizenz, Wasserzeichen möglich) → nicht übernehmen. Die übrigen Fotos (fliegengitter-montage, fliegengitter-plissee-montage, insektenschutz-fliegengitter-experte) übernehmen, wenn sie von Paul stammen (fragen).
- Kundenbewertungen auf der Seite: Herkunft klären (eigenes Google-Profil Domunova?).

## 2. Suchvolumen Kassel (DataForSEO, 19.10.2026, Monatsschnitt)

| Begriff | Suchen/Monat |
|---|---|
| gebäudereinigung kassel / kassel gebäudereinigung | 480 (gleiche Suche, zwei Schreibweisen) |
| reinigungsfirma kassel | 260 |
| fensterputzer kassel (+ preise 20, privat 20, und umgebung 10) | 90 (+50) |
| fensterreinigung kassel | 70 |
| glasreinigung kassel | 50 |
| bodenleger kassel | 50 |
| büroreinigung kassel | 20 (Klickpreis 5,56 €, wertvoll) |
| fliegengitter kassel | 20 |
| gebäudereinigung privathaushalt kassel | 20 |
| möbelmontage kassel | 10 |

Lesart: Kleine Zahlen sind bei lokalen Suchen normal, dazu kommen „in der Nähe“-Suchen und Maps ohne Ortsnamen. Für Kassel sind die Search-Console-Impressionen (unten) verlässlicher.

## 2a. Search Console pauldienste.de (24.06.2025 bis 17.10.2026)

751 Klicks, 85.000 Impressionen. **Über die Hälfte der Klicks ist die Marke** („paul gebäudedienste“ 124 Klicks, Platz 1,4). Ohne Markensuche kommt kaum etwas an.

| Suche | Impr. | Klicks | Pos. | Bedeutung |
|---|---|---|---|---|
| gebäudereinigung kassel (+ kassel gebäudereinigung, gebäudereiniger, -firma) | ~5.800 | 3 | 28–40 | größte Chance → Startseite gezielt darauf |
| fensterputzer in der nähe | 3.216 | 10 | 15,8 | Nähe-Suchen, hängt am Google-Profil + Fensterseite |
| büroreinigung kassel (+ kassel büroreinigung) | 2.800 | 8 | 17–20 | knapp hinter Seite 1 |
| fensterputzer kassel | 1.772 | 35 | **10,0** | Seitenrand 1, Zusammenlegen gibt den Schub |
| glasreinigung kassel | 1.664 | 3 | 34 | auf 3 Seiten verteilt (Pos. 36 / 49 / 91) = Kannibalisierung |
| unterhaltsreinigung kassel | 1.453 | 0 | 24 | gehört auf die Büroseite |
| fassadenreinigung kassel | 1.068 | 0 | 34 | **neue Seite** |
| fensterreinigung kassel | 1.008 | 12 | 10,2 | auf 3 Seiten verteilt |
| grundreinigung kassel | 989 | 0 | 68 | **neue Seite** |
| praxisreinigung kassel | ~1.000 | 0 | 33–55 | Abschnitt auf Büroseite |
| bauendreinigung / baureinigung kassel | 279 | 0 | 59 | **neue Seite** |
| fensterputzer kassel privat / preise | 435 | 12 | 6–8 | Preis- und Privat-Abschnitt auf Fensterseite |
| kammerjäger kassel + Nachbarorte | ~3.700 | ~17 | 12–20 | entfällt (Leistung eingestellt) |

Folgerungen:
- Zusammenlegung der Fensterseiten ist durch Daten gedeckt: „glasreinigung kassel“ und „fensterreinigung kassel“ verteilen sich heute auf drei Seiten, keine kommt über Platz 10.
- Viele Impressionen, kaum Klicks: Titles und Descriptions sind der schnellste Hebel.
- Kammerjäger-Sichtbarkeit fällt weg. Bewusst in Kauf nehmen, die Seite brachte ohnehin kaum Klicks (rund 17 in 16 Monaten).

## 3. Grundsatz: eine Seite je Suchabsicht, nicht je Keyword

Synonyme und Varianten mit gleicher Absicht kommen auf **eine** Seite: ein Hauptbegriff in Title, H1 und URL, die Varianten in H2, Zwischentexten, FAQ und Bildtexten, natürlich formuliert. Privat und Gewerbe werden **Abschnitte** einer Seite, keine eigenen Seiten.

Eigene Seite nur, wenn sich **Leistung, Ort am Haus oder Anlass** wirklich unterscheidet. Deshalb getrennt:
- **Fassadenreinigung** (senkrecht: Hauswand, Putz, Klinker, Algen, Grünbelag) und **Steinreinigung** (waagerecht: Pflaster, Terrasse, Einfahrt, Treppe, Naturstein, Fugen, Imprägnierung).
- **Grundreinigung** (genutzte Räume intensiv: vor Einzug, nach Auszug, Frühjahrsputz, Böden, Küche, Bad) und **Bauendreinigung** (nach Bau oder Renovierung: Baustaub, Farb- und Mörtelreste, Aufkleber, Grob- und Feinreinigung, Übergabe).
Jedes Paar verlinkt sich gegenseitig mit einem Satz „Sie suchen eher …?“, damit Google und Kunden die Abgrenzung sehen.

## 4. Seitenstruktur (17 Seiten + Recht, Rahmen 20)

### Startseite `/` (hell, mit dunklem Handwerk-Block)
- **Hauptbegriffe:** Gebäudereinigung Kassel, Reinigungsfirma Kassel, Reinigungsservice/Putzfirma Kassel
- Title-Vorschlag: `Gebäudereinigung Kassel | Reinigungsfirma Paul Gebäudedienste`
- Begründung: größte Suchgruppe, Reinigung ist Pauls Kerngeschäft seit 2013, die Startseite hat die meiste Kraft. Eine extra Seite /gebaeudereinigung-kassel/ würde mit der Startseite konkurrieren.
- Inhalt: Hero Reinigung, Leistungskacheln hell, ein klar abgesetzter dunkler Block „Renovieren, Montieren, Insektenschutz“ mit Link zum Handwerk-Bereich, Vorteile, Ablauf, Bewertungen, FAQ, Einsatzgebiet, Anfrage.

### Bereich Gebäudereinigung (hell), 7 Seiten
| URL | Hauptbegriff | Varianten auf derselben Seite | ersetzt (301) |
|---|---|---|---|
| `/fensterreinigung-kassel/` | Fensterputzer Kassel | Fensterreinigung, Glasreinigung, Fenster putzen lassen, Fenster reinigen lassen, privat, Gewerbe, Schaufenster, Glasfassade, Preise | fensterreinigung-privat, fensterreinigung-gewerbe, glasreinigung-gewerbe |
| `/wintergartenreinigung-kassel/` | Wintergartenreinigung Kassel | Wintergarten reinigen lassen, Glasdach reinigen, Terrassenüberdachung | wintergartenreinigung |
| `/bueroreinigung-kassel/` | Büroreinigung Kassel | Unterhaltsreinigung, Praxisreinigung, Treppenhausreinigung, Büro reinigen lassen | bueroreinigung, unterhaltsreinigung |
| `/grundreinigung-kassel/` | Grundreinigung Kassel | Wohnung/Haus grundreinigen lassen, Endreinigung Auszug, Einzugsreinigung, Hausreinigung | neu |
| `/bauendreinigung-kassel/` | Bauendreinigung Kassel | Baureinigung, Baufeinreinigung, Reinigung nach Renovierung | neu, Brücke zum Handwerk |
| `/fassadenreinigung-kassel/` | Fassadenreinigung Kassel | Hauswand reinigen, Algen und Grünbelag entfernen, Klinker, Putz | neu |
| `/steinreinigung-kassel/` | Steinreinigung Kassel | Pflasterreinigung, Terrassenreinigung, Einfahrt, Naturstein, Fugen, Imprägnierung | neu (ersetzt totes Raster-Element) |

### Bereich Handwerk (dunkel), 6 Seiten
| URL | Hauptbegriff | Varianten | ersetzt (301) |
|---|---|---|---|
| `/renovierung-montage-kassel/` (Übersicht) | Renovierung & Montage Kassel | Innenausbau, Handwerker Kassel, alles aus einer Hand | – |
| `/bodenverlegung-kassel/` | Bodenleger Kassel | Boden verlegen lassen, Laminat, Vinyl, Parkett, Designboden | – |
| `/moebel-kuechenmontage-kassel/` | Küchenmontage Kassel | Möbelmontage, Küche aufbauen lassen, Möbel aufbauen, Schrankmontage | – |
| `/fliegengitter-kassel/` | Fliegengitter Kassel | Insektenschutz Kassel, nach Maß inkl. Montage, Fenster, Türen, Dachfenster, Schiebetür, Pendeltür, Drehrahmen, Spannrahmen, Pollenschutz, Haustiergewebe | domunova.de/ |
| `/plissees-kassel/` | Plissee Kassel | Plissees nach Maß, Sonnenschutz Kassel, Sichtschutz, Montage | domunova.de/plissees/ |
| `/bodenbelaege-farben-kassel/` | Bodenbeläge Kassel | Premium-Bodenbeläge, Farben, Ausstellung Hackestraße, Beratung, Muster, Lieferung + Verlegung | – |

### Sonstige
`/ueber-uns/` (bleibt), `/kontakt/` mit mehrstufigem Anfrageformular (Leistung → Objekt → Termin → Kontakt), `/impressum/`, `/datenschutz/`.

### Entfällt
`/schaedlingsbekaempfung/` → **410 Gone** (Leistung gibt es nicht mehr). Kein 301 auf die Startseite: Google wertet das als Soft-404, und Besucher, die einen Kammerjäger suchen, landen enttäuscht bei der Reinigung. Falls Paul einen Partner empfehlen möchte, alternativ eine kurze Hinweisseite mit Empfehlung (Paul fragen).

**Keine Ortsseiten** zum Start. Einsatzgebiet als Abschnitt auf jeder Seite (siehe 4a). Ortsseiten erst, wenn Search Console Nachfrage zeigt und echter Ortsinhalt (Referenzen vor Ort) da ist, sonst Doorway-Risiko.

## 4a. Einsatzgebiet

- Standard **30 km um Kassel**, größere Aufträge (Gewerbe, Fassade, Bauendreinigung, Bodenverlegung) **bis 50 km**.
- Textbaustein je Seite, unterschiedlich formuliert, mit Orten im 30-km-Kreis, z. B. Baunatal, Vellmar, Kaufungen, Lohfelden, Niestetal, Fuldatal, Fuldabrück, Ahnatal, Calden, Schauenburg, Espenau, Söhrewald, Hann. Münden, Hofgeismar. Für größere Aufträge ausdrücklich: „auch darüber hinaus bis ca. 50 km“, z. B. Melsungen, Wolfhagen, Fritzlar, Witzenhausen, Göttingen. Orte vor Veröffentlichung per Entfernung prüfen.
- Schema `areaServed`: GeoCircle 30 km um den Standort. Karte als statisches Bild (keine Google-Maps-Einbettung, sonst Cookies).

## 5. Aufbau jeder Leistungsseite

1. H1 mit Hauptbegriff + Kassel, ein Satz Nutzen, Anruf- und Anfrageknopf
2. **Ihre Vorteile**: 4 konkrete, prüfbare Punkte (siehe 7.)
3. Was genau gemacht wird (Leistungsumfang als Liste)
4. Für wen: Abschnitte Privat und Gewerbe (Varianten-Keywords hier)
5. Ablauf in 3–4 Schritten (Fliegengitter/Plissees wie bei domunova: Anfrage → Beratung & Aufmaß → Festpreis → Montage)
6. Was kostet …? Preisrahmen oder „wovon der Preis abhängt“ (fängt „Preise“-Suchen)
7. Passende Leistungen: 2–3 Kacheln zu Schwesterseiten
8. FAQ (5–7 echte Fragen, mit FAQ-Schema), Antworten verlinken weiter
9. Einsatzgebiet + Anfrage

Kein gemeinsamer Textblock über 2–3 Sätze auf mehreren Seiten.

## 6. Interne Verlinkung

- **Zentrale Linkdatenbank** (Skill `lokale-dienstleister-website`): jede Seite mit Titel, Hauptbegriff, Bereich, verwandten Seiten. Build bricht ab bei totem Link oder Seite ohne eingehende Links.
- Jede Leistungsseite: Breadcrumb (Start → Bereich → Seite), 2–3 Textlinks im Fließtext, Kachelblock „Passt dazu“.
- **Abgrenzungs-Links** innerhalb der Paare: Fassade ↔ Stein, Grundreinigung ↔ Bauendreinigung, Fensterreinigung ↔ Wintergarten.
- **Brücken zwischen hell und dunkel** (der Verkaufshebel „alles aus einer Hand“):
  - Fensterreinigung → Fliegengitter („beim Fensterputzen gleich ausmessen“) und Plissees
  - Bodenverlegung / Küchenmontage → Bauendreinigung
  - Bodenbeläge & Farben → Bodenverlegung → Bauendreinigung (Kauf, Verlegung, sauber übergeben)
  - Grundreinigung (Einzug) → Möbel- und Küchenmontage
  - Wintergarten → Plissees (Sonnenschutz), Fliegengitter
  - Steinreinigung → Fassadenreinigung, Wintergarten
  - Büroreinigung → Fensterreinigung (Gewerbe-Abschnitt), Grundreinigung
- Linktexte beschreibend und abwechselnd („Fliegengitter nach Maß“, „unsere Fensterreinigung“), keine immer gleichen Keyword-Anker. Footer: Leistungen mit Namen, nicht „Fensterputzer Kassel günstig“.
- Startseite verlinkt alle Leistungsseiten direkt, jede Leistungsseite verlinkt zurück auf Startseite und Bereichsübersicht.

## 7. Vorteile für Kunden (von Paul bestätigen lassen, nichts erfinden)

Statt „Ehrlich, zuverlässig, faire Preise“ prüfbare Aussagen, zum Beispiel:
- Festpreis vorab nach Foto oder Besichtigung, keine Überraschung auf der Rechnung
- Rahmen und Fensterbänke inklusive
- Nachbesserung kostenlos, wenn etwas streift (falls Paul das so handhabt)
- Termine früh, abends oder am Wochenende für Gewerbe, ohne Betriebsunterbrechung
- Fester Ansprechpartner: Paul selbst, seit 2013 in Kassel
- Versichert (Betriebshaftpflicht)
- Alles aus einer Hand: Boden aussuchen, verlegen lassen, Küche montieren, danach sauber übergeben
- Feste Intervalle (z. B. alle 8 Wochen) ohne erneutes Nachfragen
- Fliegengitter/Plissees: Aufmaß vor Ort, maßgefertigt, Montage inklusive, Pollenschutz- und Haustiergewebe (aus domunova)
- Bodenbeläge: Ausstellung zum Anfassen in Kassel, ausgewählte Qualitätslieferanten

## 8. Technik-SEO

- Astro statisch, keine Cookies, kein Banner, Plausible (cookiefrei), lokale Schriften
- Je Seite eigener Title (max. ~60 Zeichen) und Description mit Nutzen + Handlungsaufforderung, genau eine H1
- Schema: LocalBusiness (Typ CleaningService + HomeAndConstructionBusiness) mit Adresse, Telefon (Mobil), Öffnungszeiten, `areaServed` 30 km, `sameAs` Google-Profil; je Seite Service + BreadcrumbList + FAQPage. Ausstellung ggf. als eigener `location`/Store-Eintrag, wenn sie eine eigene Adresse mit Öffnungszeiten hat
- Bilder: echte Fotos von Paul (Einsätze, Team, Fahrzeug, Ausstellung, Fliegengitter-Montagen aus domunova) mit beschreibenden Dateinamen und Alt-Texten, WebP/AVIF. Keine Stock-Vorschaubilder.
- Sitemap, robots.txt, OG-Bilder, Core Web Vitals grün, Telefonlink sichtbar mobil
- NAP (Name, Adresse, Telefon) überall gleich wie im Google-Profil

## 8a. Umzug domunova.de und Weiterleitungen

| Alt | Neu | Art |
|---|---|---|
| pauldienste.de/fensterreinigung-privat/, /fensterreinigung-gewerbe/, /glasreinigung-gewerbe/ | /fensterreinigung-kassel/ | 301 |
| pauldienste.de/wintergartenreinigung/ | /wintergartenreinigung-kassel/ | 301 |
| pauldienste.de/bueroreinigung/, /unterhaltsreinigung/ | /bueroreinigung-kassel/ | 301 |
| pauldienste.de/schaedlingsbekaempfung/ | – | 410 |
| pauldienste.de/home/ | / | 301 |
| domunova.de/ (+ www) | pauldienste.de/fliegengitter-kassel/ | 301 seitengenau |
| domunova.de/plissees/ | pauldienste.de/plissees-kassel/ | 301 |
| domunova.de/impressum/, /datenschutz/ | pauldienste.de/impressum/, /datenschutz/ | 301 |
| domunova.de/alles andere | pauldienste.de/fliegengitter-kassel/ | 301 |
| fensterputzerpaul.de | besteht schon. Nach Livegang prüfen, dass keine Kette über alte URLs entsteht, Ziel direkt `/fensterreinigung-kassel/` oder `/` | 301 |

- domunova.de bleibt registriert (Weiterleitung mindestens 1 Jahr, besser dauerhaft), Hosting nur noch mit `.htaccess`.
- Search Console: Property domunova.de behalten, nach Umzug **Adressänderung** auf pauldienste.de melden, Weiterleitungen mit URL-Prüfung testen.
- Gute Inhalte aus domunova (Gewebearten, Rahmenarten, Ablauf mit Aufmaß) neu formuliert übernehmen, Bewertungen nur mit klarer Quelle.
- Auf der Fliegengitter-Seite ein Satz „früher domunova.de“ für wiederkehrende Kunden.
- Google-Profil Domunova (falls vorhanden): mit Paul klären, ob zusammenlegen oder als „dauerhaft geschlossen“ markieren, ohne Bewertungen zu verlieren. Nicht auf eigene Faust.

## 9. Außerhalb der Website (gehört zum Ranking dazu)

- Google-Profil: Hauptkategorie prüfen (Gebäudereinigung vs. Fensterreinigungsdienst), alle Leistungen inkl. Fliegengitter, Plissees, Bodenverlegung als Dienstleistungen eintragen, Links auf die passenden Unterseiten, Fotos, Einzugsgebiet 30 km
- Ausstellung: prüfen, ob ein eigener Profileintrag sinnvoll ist (nur mit festen Öffnungszeiten und Personal vor Ort, sonst Ärger mit den Google-Richtlinien)
- Bewertungen systematisch sammeln (Bewertungsflow von d1ma anbieten)
- Verzeichnisse mit gleicher NAP, alte Einträge mit domunova.de auf pauldienste.de umstellen

## 10. Ablauf

1. **Daten** (erledigt: Search Console pauldienste + domunova, Seitenanalyse). Offen: Vorher-Messung `seo projekt neu pauldienste` + `seo ranking` (wenige Cent) und Grid 7×7 für „Gebäudereinigung Kassel“ und „Fensterputzer Kassel“ (98 Abfragen, Kosten vorher nennen)
2. **Fragen an Paul** (siehe 11.), Fotos anfordern
3. **Inhalte sichern:** Texte und Originalfotos von pauldienste.de und domunova.de in `alt/` ablegen (vor Abschaltung)
4. **Texte** Startseite + Fensterreinigung als Muster (Skill `website-texte`), Freigabe durch Dietrich, dann restliche Seiten
5. **Bau** Astro mit hell/dunkel-Bereichen, Logo als Platzhalter-Komponente
6. **Designfreigabe** durch Paul = Rate 2 (laut Paul Oktober)
7. **Livegang** (November, Rate 3): 301/410 testen (pauldienste, domunova, fensterputzerpaul), Search Console Sitemap + Adressänderung domunova, Google-Profil-Links, Messung nach 4 und 8 Wochen gegen Vorher-Wert

## 11. Offene Fragen an Paul

- Ausstellung: genaue Adresse (Hackestraße …), Öffnungszeiten bzw. nur nach Termin?
- Bodenbeläge und Farben: welche Lieferanten/Marken dürfen genannt werden, welche Produktgruppen (Vinyl, Parkett, Teppich, Farben für innen/außen)?
- Fassadenreinigung: welche Fassaden (Putz, Klinker, Holz), mit Hebebühne? Imprägnierung/Algenschutz danach?
- Steinreinigung: Pflaster, Terrasse, Naturstein, Fugen neu verfüllen, Imprägnierung?
- Grundreinigung und Bauendreinigung: Umfang, für privat und Gewerbe?
- Schädlingsbekämpfung: Gibt es einen Partner, den er empfehlen möchte? (sonst 410)
- Welche Vorteile aus Abschnitt 7 stimmen, was fehlt?
- Preisrahmen, die genannt werden dürfen (z. B. ab … € je Fenster, je m² Pflaster)?
- Öffnungs- bzw. Erreichbarkeitszeiten
- domunova: Gibt es ein eigenes Google-Profil? Woher stammen die Bewertungen auf der Seite? Sind die Montagefotos von ihm?
- Fotos: echte Einsätze, Team, Fahrzeug, Ausstellung, Vorher/Nachher (Fassade, Stein, Bauendreinigung eignen sich besonders)

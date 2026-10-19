# Plan neue Website pauldienste.de

Stand 19.10.2026. Logo und Slogan noch nicht freigegeben, Website wird trotzdem gebaut (Logo als austauschbare Komponente, Slogan als eine Variable).

Auftrag (25.09.2026): Astro, ohne Cookies, SEO, bis 20 Unterseiten, neue Leistungen (Fliegengitter, Bodenverlegung, Möbel- und Küchenmontage), Verkaufsbereich Premium-Bodenbeläge und Farben, 2 Korrekturschleifen. Design: **Gebäudereinigung hell, Handwerk dunkel**.

## 1. Befund alte Seite (WordPress/Divi, Rank Math, Borlabs)

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

Lesart: Kleine Zahlen sind bei lokalen Suchen normal, dazu kommen „in der Nähe“-Suchen und Maps ohne Ortsnamen. Die Gruppe Gebäudereinigung/Reinigungsfirma ist mit Abstand die größte (über 700), Fenster zusammen rund 260.

## 2a. Search Console (Property `https://www.pauldienste.de/`, 24.06.2025 bis 17.10.2026)

751 Klicks, 85.000 Impressionen. **Über die Hälfte der Klicks ist die Marke** („paul gebäudedienste“ 124 Klicks, Platz 1,4). Ohne Markensuche kommt kaum etwas an.

| Suche | Impr. | Klicks | Pos. | Bedeutung |
|---|---|---|---|---|
| gebäudereinigung kassel (+ kassel gebäudereinigung, gebäudereiniger, -firma) | ~5.800 | 3 | 28–40 | größte Chance, Seite 3 → Startseite gezielt darauf |
| fensterputzer in der nähe | 3.216 | 10 | 15,8 | Nähe-Suchen, hängt am Google-Profil + Fensterseite |
| büroreinigung kassel (+ kassel büroreinigung) | 2.800 | 8 | 17–20 | knapp hinter Seite 1 |
| fensterputzer kassel | 1.772 | 35 | **10,0** | Seitenrand 1, Zusammenlegen gibt den Schub |
| glasreinigung kassel | 1.664 | 3 | 34 | auf 3 Seiten verteilt (Pos. 36 / 49 / 91) = Kannibalisierung |
| unterhaltsreinigung kassel | 1.453 | 0 | 24 | gehört auf die Büroseite |
| fassadenreinigung kassel | 1.068 | 0 | 34 | keine Seite dafür, Paul fragen |
| fensterreinigung kassel | 1.008 | 12 | 10,2 | auf 3 Seiten verteilt |
| grundreinigung kassel | 989 | 0 | 68 | keine Seite dafür, Paul fragen |
| kammerjäger kassel + 9 Nachbarorte (Staufenberg, Lohfelden, Vellmar, Baunatal, Niestetal, Fuldatal …) | ~3.700 | 1 | 12–20 | stark, aber kaum Klicks: Title/Description schwach |
| praxisreinigung kassel | ~1.000 | 0 | 33–55 | Abschnitt auf Büroseite |
| bauendreinigung / baureinigung kassel | 279 | 0 | 59 | bestätigt Vorschlag Bauendreinigung |
| fensterputzer kassel privat / preise | 435 | 12 | 6–8 | Preis- und Privat-Abschnitt auf Fensterseite |

Folgerungen:
- Die Zusammenlegung der Fensterseiten ist durch Daten gedeckt: „glasreinigung kassel“ und „fensterreinigung kassel“ verteilen sich heute auf drei Seiten, keine kommt über Platz 10.
- Die Search-Console-Impressionen liegen deutlich über den DataForSEO-Schätzungen (Gebäudereinigung). Für Kassel ist GSC die verlässlichere Zahl.
- Kammerjäger rankt in vielen Nachbarorten auf Seite 1–2. Seite unbedingt erhalten (URL per 301), Einsatzorte als Abschnitt nennen.
- Viele Impressionen, kaum Klicks: Titles und Descriptions sind der schnellste Hebel.

## 3. Grundsatz: eine Seite je Suchabsicht, nicht je Keyword

Synonyme und Varianten mit gleicher Absicht kommen auf **eine** Seite: ein Hauptbegriff in Title, H1 und URL, die Varianten in H2, Zwischentexten, FAQ und Bildtexten, natürlich formuliert. Privat und Gewerbe werden **Abschnitte** einer Seite, keine eigenen Seiten. Eigene Seite nur, wenn sich Leistung oder Kunde wirklich unterscheidet (Wintergarten, Schädlinge).

## 4. Seitenstruktur (15 Seiten + Recht, Rahmen 20)

### Startseite `/` (hell, mit dunklem Handwerk-Block)
- **Hauptbegriffe:** Gebäudereinigung Kassel, Reinigungsfirma Kassel, Reinigungsservice/Putzfirma Kassel
- Title-Vorschlag: `Gebäudereinigung Kassel | Reinigungsfirma Paul Gebäudedienste`
- Begründung: größte Suchgruppe, Reinigung ist Pauls Kerngeschäft seit 2013, die Startseite hat die meiste Kraft. Eine extra Seite /gebaeudereinigung-kassel/ würde mit der Startseite konkurrieren.
- Inhalt: Hero Reinigung, Leistungskacheln hell, ein klar abgesetzter dunkler Block „Renovieren & Montieren“ mit Link zum Handwerk-Bereich, Vorteile, Ablauf, Bewertungen, FAQ, Einsatzgebiet, Anfrage.

### Bereich Gebäudereinigung (hell)
| URL | Hauptbegriff | Varianten auf derselben Seite | ersetzt (301) |
|---|---|---|---|
| `/fensterreinigung-kassel/` | Fensterputzer Kassel | Fensterreinigung, Glasreinigung, Fenster putzen lassen, Fenster reinigen lassen, Fensterputzer privat, Fensterreinigung Gewerbe, Schaufenster, Glasfassade, Preise | fensterreinigung-privat, fensterreinigung-gewerbe, glasreinigung-gewerbe |
| `/wintergartenreinigung-kassel/` | Wintergartenreinigung Kassel | Wintergarten reinigen lassen, Glasdach reinigen, Terrassenüberdachung | wintergartenreinigung |
| `/bueroreinigung-kassel/` | Büroreinigung Kassel | Unterhaltsreinigung, Praxisreinigung, Treppenhausreinigung, Büro reinigen lassen | bueroreinigung, unterhaltsreinigung |
| `/schaedlingsbekaempfung-kassel/` | Kammerjäger Kassel | Schädlingsbekämpfung, Ratten, Wespen, Bettwanzen, HACCP | schaedlingsbekaempfung |
| `/fassadenreinigung-kassel/` *(nur wenn Paul das macht)* | Fassadenreinigung Kassel (1.068 Impr.) | Steinreinigung, Pflaster, Terrasse, Hofeinfahrt | neu, ersetzt das tote „Steinreinigung“ |
| `/grundreinigung-kassel/` *(Paul fragen)* | Grundreinigung Kassel (989 Impr.) | Bauendreinigung, Baureinigung, Endreinigung nach Renovierung oder Auszug, Hausreinigung | neu, Brücke zum Handwerk |

### Bereich Handwerk (dunkel)
| URL | Hauptbegriff | Varianten |
|---|---|---|
| `/renovierung-montage-kassel/` (Übersicht) | Renovierung & Montage Kassel | Innenausbau, Handwerker Kassel, alles aus einer Hand |
| `/bodenverlegung-kassel/` | Bodenleger Kassel | Boden verlegen lassen, Laminat, Vinyl, Parkett, Designboden |
| `/moebel-kuechenmontage-kassel/` | Küchenmontage Kassel | Möbelmontage, Küche aufbauen lassen, Möbel aufbauen, Schrankmontage |
| `/fliegengitter-kassel/` | Fliegengitter Kassel | Insektenschutz nach Maß, Fliegengitter Tür, Dachfenster, Schiebetür |
| `/bodenbelaege-farben/` | Bodenbeläge kaufen Kassel | Premium-Bodenbeläge, Farben, Beratung, Muster (Verkaufsbereich) |

### Sonstige
`/ueber-uns/` (bleibt), `/kontakt/` mit mehrstufigem Anfrageformular (Leistung → Objekt → Termin → Kontakt), `/impressum/`, `/datenschutz/`.

**Keine Ortsseiten** (Baunatal, Vellmar …) zum Start. Einsatzgebiet als Abschnitt auf jeder Seite. Ortsseiten erst, wenn Search Console Nachfrage zeigt und echter Ortsinhalt (Referenzen vor Ort) da ist, sonst Doorway-Risiko.

## 5. Aufbau jeder Leistungsseite

1. H1 mit Hauptbegriff + Kassel, ein Satz Nutzen, Anruf- und Anfrageknopf
2. **Ihre Vorteile**: 4 konkrete, prüfbare Punkte (siehe 7.)
3. Was genau gemacht wird (Leistungsumfang als Liste)
4. Für wen: Abschnitte Privat und Gewerbe (Varianten-Keywords hier)
5. Ablauf in 3 Schritten (Anfrage → Festpreis → Termin)
6. Was kostet …? Preisrahmen oder „wovon der Preis abhängt“ (fängt „Preise“-Suchen)
7. Passende Leistungen: 2–3 Kacheln zu Schwesterseiten
8. FAQ (5–7 echte Fragen, mit FAQ-Schema), Antworten verlinken weiter
9. Einsatzgebiet + Anfrage

Kein gemeinsamer Textblock über 2–3 Sätze auf mehreren Seiten.

## 6. Interne Verlinkung

- **Zentrale Linkdatenbank** (Skill `lokale-dienstleister-website`): jede Seite mit Titel, Hauptbegriff, Bereich, verwandten Seiten. Build bricht ab bei totem Link oder Seite ohne eingehende Links.
- Jede Leistungsseite: Breadcrumb (Start → Bereich → Seite), 2–3 Textlinks im Fließtext, Kachelblock „Passt dazu“.
- **Brücken zwischen hell und dunkel** (das ist der Verkaufshebel „alles aus einer Hand“):
  - Fensterreinigung → Fliegengitter („beim Fensterputzen gleich ausmessen“)
  - Bodenverlegung / Küchenmontage → Grund- und Bauendreinigung
  - Wintergarten → Fliegengitter, Fensterreinigung
  - Büroreinigung → Fensterreinigung Gewerbe-Abschnitt, Schädlingsbekämpfung (HACCP)
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
- Alles aus einer Hand: Boden verlegen, Küche montieren, danach sauber übergeben
- Feste Intervalle (z. B. alle 8 Wochen) ohne erneutes Nachfragen

## 8. Technik-SEO

- Astro statisch, keine Cookies, kein Banner, Plausible (cookiefrei), lokale Schriften
- Je Seite eigener Title (max. ~60 Zeichen) und Description mit Nutzen + Handlungsaufforderung, genau eine H1
- Schema: LocalBusiness (Typ CleaningService + HomeAndConstructionBusiness) mit Adresse, Telefon, Öffnungszeiten, Einsatzgebiet, `sameAs` Google-Profil; je Seite Service + BreadcrumbList + FAQPage
- 301-Liste für alle alten URLs (siehe Tabelle 4), alte www-URLs auf neue Form
- Bilder: echte Fotos von Paul (Einsätze, Team, Fahrzeug) mit beschreibenden Dateinamen und Alt-Texten, WebP/AVIF
- Sitemap, robots.txt, OG-Bilder, Core Web Vitals grün, Telefonlink sichtbar mobil
- Kassel-Festnetznummer prüfen (bisher nur Mobil 0155…), NAP überall gleich wie im Google-Profil
- fensterputzerpaul.de: klären, ob eigene Seite läuft. Wenn ja, nach Livegang per 301 auf `/fensterreinigung-kassel/`

## 9. Außerhalb der Website (gehört zum Ranking dazu)

- Google-Profil: Hauptkategorie prüfen (Gebäudereinigung vs. Fensterreinigungsdienst), alle Leistungen als Dienstleistungen eintragen, Links auf die passenden Unterseiten, Fotos
- Bewertungen systematisch sammeln (Bewertungsflow anbieten, siehe unten)
- Verzeichnisse mit gleicher NAP

## 10. Ablauf

1. **Daten** (jetzt): Search Console auswerten, Vorher-Messung `seo projekt neu pauldienste` + `seo ranking` (wenige Cent) und Grid 7×7 für „Gebäudereinigung Kassel“ und „Fensterputzer Kassel“ (98 Abfragen, Kosten vorher nennen)
2. **Fragen an Paul** (siehe 11.), Fotos anfordern
3. **Texte** Startseite + Fensterreinigung als Muster (Skill `website-texte`), Freigabe durch Dietrich
4. **Bau** Astro mit hell/dunkel-Bereichen, Logo als Platzhalter-Komponente, restliche Seiten
5. **Designfreigabe** durch Paul = Rate 2 (laut Paul Oktober)
6. **Livegang** (November, Rate 3): 301 testen, Search Console Sitemap, Google-Profil-Links, Messung nach 4 und 8 Wochen gegen Vorher-Wert

## 11. Offene Fragen an Paul

- Fassaden- und Steinreinigung: machst du das? Was genau (Fassade, Pflaster, Terrasse)?
- Grundreinigung, Bauend- und Umzugsreinigung: anbieten?
- Schädlingsbekämpfung: selbst oder mit Partner? Gebiet auch Göttingen?
- Welche Vorteile aus Abschnitt 7 stimmen, was fehlt?
- Preisrahmen, die genannt werden dürfen (z. B. ab … € je Fenster)?
- Bodenbeläge und Farben: Ausstellung/Lager mit Adresse, Marken, Bestellung nur auf Anfrage?
- Festnetznummer, Öffnungszeiten, Einsatzradius
- Was passiert mit fensterputzerpaul.de?
- Fotos: echte Einsätze, Team, Fahrzeug, Vorher/Nachher

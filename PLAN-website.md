# Plan neue Website pauldienste.de

Stand 19.10.2026 (4. Fassung nach Rücksprache Dietrich). Logo und Slogan noch nicht freigegeben, Website wird trotzdem gebaut (Logo als austauschbare Komponente, Slogan als eine Variable).

Auftrag (25.09.2026): Astro, ohne Cookies, SEO, bis 20 Unterseiten, neue Leistungen (Fliegengitter, Bodenverlegung, Möbel- und Küchenmontage), Verkaufsbereich Premium-Bodenbeläge und Farben, 2 Korrekturschleifen. Design: **Gebäudereinigung hell, Handwerk dunkel**.

## 0. Festgelegt (Dietrich, 19.10.2026)

- **Startseite = Übersicht über beide Bereiche** (Gebäudereinigung und Handwerk). Gebäudereinigung bekommt eine eigene Unterseite (siehe 4).
- **Schädlingsbekämpfung entfällt**, Paul kann sie nicht mehr anbieten.
- **Fassadenreinigung und Steinreinigung** bekommen je eine eigene Seite.
- **Grundreinigung und Bauendreinigung** bekommen je eine eigene Seite.
- **Typische Hausmeister- und Renovierungsleistungen** gehören dazu (Laminat verlegen, Wohnung streichen usw.).
- **Winterdienst** kommt fest rein, im hellen Bereich Gebäudereinigung/Gebäudedienste.
- **Paul ist kein Maler:** nie „Maler“, „Malerbetrieb“ oder „Malerarbeiten“ als Begriff, kein Ziel „Maler Kassel“.
- **Bilder mit „lahr“ im Namen bleiben draußen.**
- **Alle Leistungen für Privat und Gewerbe.**
- **Öffnungszeiten:** Montag bis Freitag 8 bis 17 Uhr.
- **Keine Festnetznummer**, Telefon bleibt 0155 66028476.
- **Einsatzgebiet:** 30 km um Kassel, größere Aufträge bis 50 km.
- **Keine Preise auf der Website.** Alles individuell, **Besichtigung kostenlos**, danach Festpreis.
- **Bodenbeläge und Farben:** hochwertige Lieferanten, Sortiment Vinyl, Parkett, Teppich, Farben für innen. **Ausstellung in Kassel nur nach Termin** (Adresse liefert Dietrich).
- **Vorteile** aus Abschnitt 7 stimmen ungefähr.
- **Vorhandene Fotos inkl. Stockfotos** von pauldienste.de und domunova.de übernehmen, soweit die Lizenz es erlaubt (siehe 8b).
- **fensterputzerpaul.de** ist bereits auf pauldienste.de weitergeleitet.
- **domunova.de** (Fliegengitter, Plissees) zieht komplett in pauldienste.de um.

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
- Kundenbewertungen auf der Seite: Herkunft klären (eigenes Google-Profil Domunova?).

## 2. Suchvolumen (DataForSEO, 19.10.2026, Monatsschnitt)

### Reinigung, Kassel
| Begriff | Suchen/Monat |
|---|---|
| gebäudereinigung kassel / kassel gebäudereinigung | 480 (gleiche Suche, zwei Schreibweisen) |
| reinigungsfirma kassel | 260 |
| fensterputzer kassel (+ preise 20, privat 20, und umgebung 10) | 90 (+50) |
| fensterreinigung kassel | 70 |
| glasreinigung kassel | 50 |
| büroreinigung kassel | 20 (Klickpreis 5,56 €, wertvoll) |
| gebäudereinigung privathaushalt kassel | 20 |

### Hausmeister, Handwerk, Kassel
| Begriff | Suchen/Monat |
|---|---|
| maler kassel / kassel maler / maler in kassel | 320 / 390 / 70 (**kein Ziel**, Paul ist kein Maler, siehe 4b) |
| entrümpelung kassel | 320 (Klickpreis 12 €, sehr wertvoll) |
| winterdienst kassel | 140 |
| hausmeisterservice kassel | 110 |
| handwerker kassel | 90 |
| gartenpflege kassel | 90 |
| bodenleger kassel | 50 |
| renovierung kassel | 20 |
| fliegengitter kassel | 20 |
| möbelmontage kassel | 10 |

### Handwerk bundesweit (die „lassen“-Suchen sind meist ohne Ort, Google zeigt trotzdem lokale Anbieter)
| Begriff | Suchen/Monat | dazu „… kosten“ |
|---|---|---|
| ikea küche aufbauen lassen (alle Schreibweisen) | 590 | 110 |
| laminat verlegen lassen | 260 | 320 + 320 |
| möbel aufbauen lassen / ikea möbel aufbauen lassen | 260 / 260 | 30 / 50 |
| küche aufbauen lassen | 210 | 210 |
| vinylboden verlegen lassen | 210 | 110 + 110 |
| teppichboden verlegen lassen (+ in der nähe 110) | 170 | 70 |
| wohnung renovieren lassen | 140 | 30 |
| parkett verlegen lassen | 110 | 90 + 90 |
| wohnung streichen lassen | 90 | 480 + 480 + qm-Varianten ~1.000 |
| tapezieren lassen / wohnung tapezieren lassen | 50 / 40 | 110 + 90 |

Lesart:
- Bei Handwerk wird **massiv nach Kosten** gesucht. Ohne Preise auf der Seite fangen wir das mit einem Abschnitt „Was kostet … ? Wovon der Preis abhängt“ + „Besichtigung kostenlos, danach Festpreis“ ab. Das beantwortet die Suche ehrlich und führt zur Anfrage.
- „IKEA-Küche aufbauen lassen“ ist der stärkste Montagebegriff. Auf der Montageseite als Abschnitt („auch IKEA-, Poco-, Möbelhaus-Küchen“) erwähnen, beschreibend, nicht als Marke im Title.
- Für Kassel sind die Search-Console-Impressionen (unten) verlässlicher als die Schätzungen.

## 2a. Search Console pauldienste.de (24.06.2025 bis 17.10.2026)

751 Klicks, 85.000 Impressionen. **Über die Hälfte der Klicks ist die Marke** („paul gebäudedienste“ 124 Klicks, Platz 1,4). Ohne Markensuche kommt kaum etwas an.

| Suche | Impr. | Klicks | Pos. | Bedeutung |
|---|---|---|---|---|
| gebäudereinigung kassel (+ kassel gebäudereinigung, gebäudereiniger, -firma) | ~5.800 | 3 | 28–40 | größte Chance → eigene Gebäudereinigungsseite |
| fensterputzer in der nähe | 3.216 | 10 | 15,8 | Nähe-Suchen, hängt am Google-Profil + Fensterseite |
| büroreinigung kassel (+ kassel büroreinigung) | 2.800 | 8 | 17–20 | knapp hinter Seite 1 |
| fensterputzer kassel | 1.772 | 35 | **10,0** | Seitenrand 1, Zusammenlegen gibt den Schub |
| glasreinigung kassel | 1.664 | 3 | 34 | auf 3 Seiten verteilt (Pos. 36 / 49 / 91) = Kannibalisierung |
| unterhaltsreinigung kassel | 1.453 | 0 | 24 | gehört auf die Büroseite |
| fassadenreinigung kassel | 1.068 | 0 | 34 | **neue Seite** |
| fensterreinigung kassel | 1.008 | 12 | 10,2 | auf 3 Seiten verteilt |
| grundreinigung kassel | 989 | 0 | 68 | **neue Seite** |
| gebäudeservice kassel (+ gebäudedienst kassel 184) | 848 | 0 | 50 | **Startseite** (Dachbegriff) |
| praxisreinigung kassel | ~1.000 | 0 | 33–55 | Abschnitt auf Büroseite |
| bauendreinigung / baureinigung kassel | 279 | 0 | 59 | **neue Seite** |
| fensterputzer kassel privat / preise | 435 | 12 | 6–8 | Privat- und Kosten-Abschnitt auf Fensterseite |
| kammerjäger kassel + Nachbarorte | ~3.700 | ~17 | 12–20 | entfällt (Leistung eingestellt) |

Folgerungen:
- Zusammenlegung der Fensterseiten ist durch Daten gedeckt: „glasreinigung kassel“ und „fensterreinigung kassel“ verteilen sich heute auf drei Seiten, keine kommt über Platz 10.
- Viele Impressionen, kaum Klicks: Titles und Descriptions sind der schnellste Hebel.
- Kammerjäger-Sichtbarkeit fällt weg, die Seite brachte ohnehin kaum Klicks (rund 17 in 16 Monaten).

## 3. Grundsatz: eine Seite je Suchabsicht, nicht je Keyword

Synonyme und Varianten mit gleicher Absicht kommen auf **eine** Seite: ein Hauptbegriff in Title, H1 und URL, die Varianten in H2, Zwischentexten, FAQ und Bildtexten, natürlich formuliert. Privat und Gewerbe werden **Abschnitte** einer Seite, keine eigenen Seiten.

Eigene Seite nur, wenn sich **Leistung, Ort am Haus oder Anlass** wirklich unterscheidet. Deshalb getrennt:
- **Fassadenreinigung** (senkrecht: Hauswand, Putz, Klinker, Algen, Grünbelag) und **Steinreinigung** (waagerecht: Pflaster, Terrasse, Einfahrt, Treppe, Naturstein, Fugen, Imprägnierung).
- **Grundreinigung** (genutzte Räume intensiv: vor Einzug, nach Auszug, Frühjahrsputz, Böden, Küche, Bad) und **Bauendreinigung** (nach Bau oder Renovierung: Baustaub, Farb- und Mörtelreste, Aufkleber, Grob- und Feinreinigung, Übergabe).
Jedes Paar verlinkt sich gegenseitig mit einem Satz „Sie suchen eher …?“, damit Google und Kunden die Abgrenzung sehen.

Bodenarten (Laminat, Vinyl, Parkett, Teppich) starten als **Abschnitte einer** Bodenseite mit eigenen H2 und je einer Kostenfrage. Zeigt die Search Console nach 2–3 Monaten für eine Bodenart deutlich eigene Nachfrage, wird sie ausgegliedert (Nachtrag).

## 4. Seitenstruktur

### Startseite `/`: Übersicht und Dach
- **Rolle:** Visitenkarte und Weiche zu beiden Bereichen, halb hell (Reinigung), halb dunkel (Handwerk).
- **Hauptbegriffe:** Marke „Paul Gebäudedienste“, **Gebäudeservice / Gebäudedienste Kassel** (848 + 184 Impressionen), **Hausmeisterservice Kassel** (110). Das sind die Dachbegriffe, die genau „Reinigung + Handwerk aus einer Hand“ meinen.
- Title-Vorschlag: `Paul Gebäudedienste Kassel | Reinigung, Renovierung & Hausmeisterservice`
- **Nicht** „Gebäudereinigung Kassel“ in Title oder H1, sonst Konkurrenz zur Gebäudereinigungsseite. Der Begriff steht auf der Startseite nur als prominenter Link dorthin.
- Inhalt: Hero mit beiden Bereichen, je Bereich Kacheln zu allen Leistungen, „Alles aus einer Hand“ (Beispiel Auszug: renovieren, streichen, Boden, Endreinigung), Vorteile, Ablauf (kostenlose Besichtigung → Festpreis → Ausführung), Bewertungen, FAQ, Einsatzgebiet, Anfrage.

**Warum nicht die Startseite auf Gebäudereinigung?** Eine Startseite, die zur Hälfte über Böden und Montage spricht, ist für Google keine klare Gebäudereinigungsseite. Eine eigene Seite kann zu 100 % beim Thema bleiben und bekommt die Kraft der Startseite über den Link direkt im ersten Bildschirm. Verlust gibt es kaum: Die Startseite steht heute für „gebäudereinigung kassel“ nur auf Platz 28–40.

### Bereich Gebäudereinigung und Gebäudedienste (hell)
| URL | Hauptbegriff | Varianten auf derselben Seite | ersetzt (301) |
|---|---|---|---|
| `/gebaeudereinigung-kassel/` (Bereichsseite) | Gebäudereinigung Kassel | Reinigungsfirma Kassel, Reinigungsservice, Putzfirma, Gebäudereiniger, Privathaushalt und Gewerbe, Überblick aller Reinigungsleistungen | neu |
| `/fensterreinigung-kassel/` | Fensterputzer Kassel | Fensterreinigung, Glasreinigung, Fenster putzen lassen, Fenster reinigen lassen, privat, Gewerbe, Schaufenster, Glasfassade, Kosten | fensterreinigung-privat, fensterreinigung-gewerbe, glasreinigung-gewerbe |
| `/wintergartenreinigung-kassel/` | Wintergartenreinigung Kassel | Wintergarten reinigen lassen, Glasdach reinigen, Terrassenüberdachung | wintergartenreinigung |
| `/bueroreinigung-kassel/` | Büroreinigung Kassel | Unterhaltsreinigung, Praxisreinigung, Treppenhausreinigung, Büro reinigen lassen | bueroreinigung, unterhaltsreinigung |
| `/grundreinigung-kassel/` | Grundreinigung Kassel | Wohnung/Haus grundreinigen lassen, Endreinigung Auszug, Einzugsreinigung, Hausreinigung | neu |
| `/bauendreinigung-kassel/` | Bauendreinigung Kassel | Baureinigung, Baufeinreinigung, Reinigung nach Renovierung | neu, Brücke zum Handwerk |
| `/fassadenreinigung-kassel/` | Fassadenreinigung Kassel | Hauswand reinigen, Algen und Grünbelag entfernen, Klinker, Putz | neu |
| `/steinreinigung-kassel/` | Steinreinigung Kassel | Pflasterreinigung, Terrassenreinigung, Einfahrt, Naturstein, Fugen, Imprägnierung | neu |
| `/winterdienst-kassel/` | Winterdienst Kassel (140/Monat) | Schneeräumen, Streudienst, Räum- und Streupflicht für Vermieter, Hausverwaltungen und Gewerbe, Kosten | neu |

### Bereich Handwerk (dunkel)
| URL | Hauptbegriff | Varianten | ersetzt (301) |
|---|---|---|---|
| `/handwerker-kassel/` (Bereichsseite) | Handwerker Kassel | Renovierung Kassel, Wohnung renovieren lassen, Innenausbau, alles aus einer Hand, Überblick | neu |
| `/boden-verlegen-kassel/` | Boden verlegen lassen Kassel | Bodenleger Kassel, Laminat verlegen lassen, Vinylboden verlegen lassen, Parkett verlegen lassen, Teppichboden verlegen lassen, je mit Kostenfrage | neu |
| `/streichen-tapezieren-kassel/` | Wohnung streichen lassen Kassel | Wände streichen, Decke streichen, tapezieren lassen, Renovierung bei Auszug, Kosten je m² (Faktoren statt Preise) | neu (siehe 4b) |
| `/kuechenmontage-moebelmontage-kassel/` | Küchenmontage Kassel | Küche aufbauen lassen, IKEA-Küche aufbauen lassen, Möbel aufbauen lassen, Möbelmontage, Schrankmontage, Küche ab- und aufbauen | neu |
| `/fliegengitter-kassel/` | Fliegengitter Kassel | Insektenschutz Kassel, nach Maß inkl. Montage, Fenster, Türen, Dachfenster, Schiebetür, Pendeltür, Drehrahmen, Spannrahmen, Pollenschutz, Haustiergewebe | domunova.de/ |
| `/plissees-kassel/` | Plissee Kassel | Plissees nach Maß, Sonnenschutz Kassel, Sichtschutz, Montage | domunova.de/plissees/ |
| `/bodenbelaege-farben-kassel/` | Bodenbeläge Kassel | Vinyl, Parkett, Teppich kaufen, Farben für innen, Ausstellung nach Termin, Beratung, Muster, „kaufen und verlegen lassen“ | neu |

### Hausmeister-Ergänzungen (nur, wenn Paul sie anbietet)
| URL | Hauptbegriff | Suchen/Monat Kassel | Bereich |
|---|---|---|---|
| `/entruempelung-kassel/` | Entrümpelung Kassel | 320 (Klickpreis 12 €) | hell (Brücke zu Grundreinigung) |
| `/gartenpflege-kassel/` | Gartenpflege Kassel | 90 | hell |

### Sonstige
`/ueber-uns/` (bleibt), `/kontakt/` mit mehrstufigem Anfrageformular (Bereich → Leistung → Objekt → Wunschtermin für kostenlose Besichtigung → Kontakt), `/impressum/`, `/datenschutz/`.

### Seitenzahl und Auftrag
Kern: 9 Reinigung/Gebäudedienste (inkl. Winterdienst) + 7 Handwerk + Über uns + Kontakt = **18 Unterseiten** (+ Startseite, Impressum, Datenschutz). Mit Entrümpelung und Gartenpflege sind es **20**, der Rahmen ist dann voll. Jede weitere Seite (z. B. ausgegliederte Bodenarten, Ortsseiten) als **Nachtrag** anbieten.

### Entfällt
`/schaedlingsbekaempfung/` → **410 Gone** (Leistung gibt es nicht mehr). Kein 301 auf die Startseite: Google wertet das als Soft-404, und Kammerjäger-Suchende landen enttäuscht bei der Reinigung. Falls Paul einen Partner empfehlen möchte, alternativ eine kurze Hinweisseite (Paul fragen).

**Keine Ortsseiten** zum Start. Einsatzgebiet als Abschnitt auf jeder Seite (siehe 4a). Ortsseiten erst, wenn Search Console Nachfrage zeigt und echter Ortsinhalt da ist, sonst Doorway-Risiko.

## 4a. Einsatzgebiet

- Standard **30 km um Kassel**, größere Aufträge (Gewerbe, Fassade, Bauendreinigung, Bodenverlegung, Renovierung) **bis 50 km**.
- Textbaustein je Seite, unterschiedlich formuliert, mit Orten im 30-km-Kreis, z. B. Baunatal, Vellmar, Kaufungen, Lohfelden, Niestetal, Fuldatal, Fuldabrück, Ahnatal, Calden, Schauenburg, Espenau, Söhrewald, Hann. Münden, Hofgeismar. Für größere Aufträge ausdrücklich: „auch darüber hinaus bis ca. 50 km“, z. B. Melsungen, Wolfhagen, Fritzlar, Witzenhausen, Göttingen. Orte vor Veröffentlichung per Entfernung prüfen.
- Schema `areaServed`: GeoCircle 30 km um den Standort. Karte als statisches Bild (keine Google-Maps-Einbettung, sonst Cookies).

## 4b. Vorsicht Meisterpflicht (vor dem Texten mit Paul klären)

Einige Handwerke sind in Deutschland zulassungspflichtig (Anlage A HwO), u. a. **Maler und Lackierer** und seit 2020 wieder **Parkettleger, Raumausstatter** (Bodenbeläge) sowie **Rollladen- und Sonnenschutztechniker**. Wer damit wirbt („Malerbetrieb“, „Maler Kassel“, „Parkettleger“), ohne in der Handwerksrolle eingetragen zu sein, riskiert Abmahnung und Ärger mit der Handwerkskammer.

Deshalb:
- Paul fragen, welche Tätigkeiten in seiner Gewerbeanmeldung bzw. Handwerksrolle stehen.
- **Paul ist kein Maler (Dietrich, 19.10.2026).** Also nie „Maler“, „Malerbetrieb“, „Malerarbeiten“ oder „Malermeister“, auch nicht in Title, Alt-Texten oder Schema. „Maler Kassel“ ist kein Ziel.
- Formulierungen nur als Dienstleistung („Wohnung streichen lassen“, „Wände und Decken streichen“, „Laminat und Vinyl verlegen“), nicht als Berufsbezeichnung („Parkettleger“, „Bodenleger“ nur, wenn Paul eingetragen ist).
- Ob einfaches Streichen und Tapezieren als Hausmeister-Leistung zulässig ist, klärt Paul vor Livegang. Bis dahin wird die Seite `/streichen-tapezieren-kassel/` vorbereitet, aber erst nach seiner Bestätigung veröffentlicht.
- Keine Rechtsberatung von uns. Im Zweifel klärt Paul das kurz mit der Handwerkskammer Kassel.

## 5. Aufbau jeder Leistungsseite

1. H1 mit Hauptbegriff + Kassel, ein Satz Nutzen, Anruf- und Anfrageknopf
2. **Ihre Vorteile**: 4 konkrete Punkte (siehe 7.)
3. Was genau gemacht wird (Leistungsumfang als Liste)
4. Für Privat und Gewerbe (Varianten-Keywords hier)
5. Ablauf: Anfrage → **kostenlose Besichtigung** (bzw. Aufmaß) → Festpreisangebot → Ausführung
6. **Was kostet … ?** Keine Preise, sondern: wovon der Preis abhängt (Fläche, Zustand, Material, Zugang, Höhe), warum ein Festpreis nach Besichtigung fairer ist, Knopf „Kostenlose Besichtigung anfragen“. Fängt die vielen „… kosten“-Suchen ab.
7. Passende Leistungen: 2–3 Kacheln zu Schwesterseiten
8. FAQ (5–7 echte Fragen, mit FAQ-Schema), Antworten verlinken weiter
9. Einsatzgebiet + Anfrage

Kein gemeinsamer Textblock über 2–3 Sätze auf mehreren Seiten.

## 6. Interne Verlinkung

- **Zentrale Linkdatenbank** (Skill `lokale-dienstleister-website`): jede Seite mit Titel, Hauptbegriff, Bereich, verwandten Seiten. Build bricht ab bei totem Link oder Seite ohne eingehende Links.
- **Drei Ebenen:** Startseite → Bereichsseite (Gebäudereinigung / Handwerker) → Leistungsseite. Breadcrumb auf jeder Seite.
- Startseite verlinkt beide Bereichsseiten prominent und alle Leistungsseiten über Kacheln. Bereichsseiten verlinken alle Leistungen ihres Bereichs mit kurzer Beschreibung. Jede Leistungsseite verlinkt zurück auf ihre Bereichsseite.
- Jede Leistungsseite: 2–3 Textlinks im Fließtext, Kachelblock „Passt dazu“.
- **Abgrenzungs-Links** innerhalb der Paare: Fassade ↔ Stein, Grundreinigung ↔ Bauendreinigung, Fensterreinigung ↔ Wintergarten, Bodenbeläge kaufen ↔ Boden verlegen.
- **Brücken zwischen hell und dunkel** (der Verkaufshebel „alles aus einer Hand“):
  - Fensterreinigung → Fliegengitter („beim Fensterputzen gleich ausmessen“) und Plissees
  - Streichen / Boden verlegen / Küchenmontage → Bauendreinigung
  - Bodenbeläge & Farben → Boden verlegen + Streichen → Bauendreinigung (aussuchen, verlegen, streichen, sauber übergeben)
  - Grundreinigung (Auszug) → Streichen & Tapezieren, Entrümpelung
  - Grundreinigung (Einzug) → Küchen- und Möbelmontage
  - Wintergarten → Plissees (Sonnenschutz), Fliegengitter
  - Steinreinigung → Fassadenreinigung, Gartenpflege, Winterdienst (Einfahrt und Wege das ganze Jahr)
  - Büroreinigung → Fensterreinigung (Gewerbe-Abschnitt), Grundreinigung, Winterdienst
- Linktexte beschreibend und abwechselnd („Fliegengitter nach Maß“, „unsere Fensterreinigung“), keine immer gleichen Keyword-Anker. Footer: Leistungen mit Namen, nicht „Fensterputzer Kassel günstig“.

## 7. Vorteile für Kunden (laut Dietrich ungefähr richtig, Feinschliff mit Paul)

- **Kostenlose Besichtigung**, danach Festpreis, keine Überraschung auf der Rechnung
- Rahmen und Fensterbänke inklusive
- Nachbesserung kostenlos, wenn etwas streift (Paul bestätigen)
- Termine früh, abends oder am Wochenende für Gewerbe, ohne Betriebsunterbrechung
- Fester Ansprechpartner: Paul selbst, seit 2013 in Kassel
- Versichert (Betriebshaftpflicht)
- **Alles aus einer Hand**: Boden aussuchen, verlegen, streichen, Küche montieren, danach sauber übergeben. Ein Ansprechpartner statt vier Firmen
- Feste Intervalle (z. B. alle 8 Wochen) ohne erneutes Nachfragen
- Für Privat und Gewerbe
- Fliegengitter/Plissees: Aufmaß vor Ort, maßgefertigt, Montage inklusive, Pollenschutz- und Haustiergewebe
- Bodenbeläge: Ausstellung in Kassel zum Anfassen, persönlich nach Termin, ausgewählte Qualitätslieferanten

## 8. Technik-SEO

- Astro statisch, keine Cookies, kein Banner, Plausible (cookiefrei), lokale Schriften
- Je Seite eigener Title (max. ~60 Zeichen) und Description mit Nutzen + Handlungsaufforderung („kostenlose Besichtigung“), genau eine H1
- Schema: LocalBusiness (Typ CleaningService + HomeAndConstructionBusiness) mit Adresse, Telefon (Mobil), Öffnungszeiten **Mo–Fr 08:00–17:00**, `areaServed` 30 km, `sameAs` Google-Profil; je Seite Service + BreadcrumbList + FAQPage. Ausstellung im Text mit Adresse und „nur nach Terminvereinbarung“, kein eigenes Öffnungszeiten-Schema
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

## 8b. Bilder (Dietrich: alle vorhandenen Fotos inkl. Stock übernehmen)

Bestand auf beiden alten Seiten (ohne Logos, Icons, Borlabs-Grafiken):

| Datei | Herkunft (vermutet) | Übernehmen? |
|---|---|---|
| domunova: fliegengitter-montage, fliegengitter-plissee-montage, insektenschutz-fliegengitter-experte, plisees, plissees-nach-mass | eigene oder Lieferantenfotos | ja (bei Lieferantenbildern: Nutzung erlaubt?) |
| domunova: `AdobeStock_331309624_Preview.jpeg` | **Adobe-Stock-Vorschau ohne Lizenz** | **nur wenn gekaufte Lizenz vorliegt**, sonst gleiches Motiv lizenzieren oder ersetzen |
| pauldienste: architecture-2256489_1920, dining-room-3108037_1280 | Pixabay (freie Lizenz) | ja |
| pauldienste: 2149345516, 2149374451, 2150358973 | Dateinamen wie Freepik-Downloads | ja, wenn Premium-Lizenz; bei freier Freepik-Lizenz Quellenangabe nötig |
| pauldienste: grundreinigung-**lahr**-1, unterhaltsreinigung-**lahr**-1 | Name deutet auf eine **fremde Firma in Lahr** | **nein**, bleiben draußen (Dietrich, 19.10.2026) |
| pauldienste: fensterputzer-kassel1, steinreinigung-kassel, wintergartenreinigung-kassel | vermutlich eigene | ja |
| pauldienste: kammerjaeger-kassel-industrie | – | entfällt mit der Leistung |
| pauldienste: 1.png, 2-1.png, 3.png usw. (2025/01) | Grafiken/Icons der Divi-Seite | ansehen, meist durch neues Design ersetzt |

- Alle Bilder aus beiden WordPress-Mediatheken in voller Auflösung sichern (`alt/bilder/`, nicht nur die angezeigten Größen), umbenennen nach Inhalt (z. B. `fliegengitter-tuer-montage-kassel.webp`), Alt-Texte neu.
- Für Fassade, Stein, Bauendreinigung, Boden, Streichen und Ausstellung fehlen eigene Bilder: echte Fotos von Paul anfordern, bis dahin lizenzierte Stockfotos.

## 9. Außerhalb der Website (gehört zum Ranking dazu)

- Google-Profil: Hauptkategorie prüfen (Gebäudereinigung vs. Fensterreinigungsdienst), alle Leistungen inkl. Fliegengitter, Plissees, Boden, Streichen als Dienstleistungen eintragen, Links auf die passenden Unterseiten, Öffnungszeiten Mo–Fr 8–17, Einzugsgebiet 30 km, Fotos
- Ausstellung: kein eigener Profileintrag (nur nach Termin, kein Personal zu festen Zeiten → verstößt gegen Google-Richtlinien)
- Bewertungen systematisch sammeln (Bewertungsflow von d1ma anbieten)
- Verzeichnisse mit gleicher NAP, alte Einträge mit domunova.de auf pauldienste.de umstellen

## 10. Ablauf

1. **Daten** (erledigt: Search Console pauldienste + domunova, Seitenanalyse, Suchvolumen Reinigung + Handwerk). Offen: Vorher-Messung `seo projekt neu pauldienste` + `seo ranking` (wenige Cent) und Grid 7×7 für „Gebäudereinigung Kassel“ und „Fensterputzer Kassel“ (98 Abfragen, Kosten vorher nennen)
2. **Fragen an Paul** (siehe 11.), Dietrich liefert nach und nach
3. **Inhalte sichern:** Texte und alle Bilder von pauldienste.de und domunova.de in `alt/` ablegen
4. **Texte** Startseite + Fensterreinigung als Muster (Skill `website-texte`), Freigabe durch Dietrich, dann restliche Seiten
5. **Bau** Astro mit hell/dunkel-Bereichen, Logo als Platzhalter-Komponente
6. **Designfreigabe** durch Paul = Rate 2 (laut Paul Oktober)
7. **Livegang** (November, Rate 3): 301/410 testen (pauldienste, domunova, fensterputzerpaul), Search Console Sitemap + Adressänderung domunova, Google-Profil-Links, Messung nach 4 und 8 Wochen gegen Vorher-Wert

## 11. Offene Fragen an Paul (Dietrich beantwortet nach und nach)

- [ ] Ausstellung: genaue Adresse (Hackestraße …)
- [ ] Bodenbeläge und Farben: welche Lieferanten/Marken dürfen genannt werden?
- [ ] **Meisterpflicht (4b):** Welche Tätigkeiten stehen in Gewerbeanmeldung bzw. Handwerksrolle? Darf er Streichen/Tapezieren anbieten? Parkett, Teppich, Sonnenschutz?
- [ ] Hausmeister-Ergänzungen: Entrümpelung, Gartenpflege, Kleinreparaturen. Was davon?
- [ ] Fassadenreinigung: welche Fassaden (Putz, Klinker, Holz), mit Hebebühne? Imprägnierung/Algenschutz danach?
- [ ] Steinreinigung: Pflaster, Terrasse, Naturstein, Fugen neu verfüllen, Imprägnierung?
- [ ] Grundreinigung und Bauendreinigung: Umfang
- [ ] Schädlingsbekämpfung: Gibt es einen Partner zum Empfehlen? (sonst 410)
- [ ] Vorteile: Nachbesserung kostenlos? Versichert? Wochenend-Termine für Gewerbe?
- [ ] domunova: Gibt es ein eigenes Google-Profil? Woher stammen die Bewertungen auf der Seite?
- [ ] Bilder: Lizenz für das Adobe-Stock-Bild? Freepik Premium?
- [ ] Neue Fotos: echte Einsätze, Team, Fahrzeug, Ausstellung, Vorher/Nachher (Fassade, Stein, Bauendreinigung, Boden)
- [x] Öffnungszeiten: Mo–Fr 8–17 Uhr
- [x] Ausstellung: nur nach Termin
- [x] Privat und Gewerbe: alle Leistungen
- [x] Sortiment: Vinyl, Parkett, Teppich, Farben für innen
- [x] Preise: keine, Besichtigung kostenlos
- [x] Festnetz: keins
- [x] Einsatzgebiet: 30 km, größere Aufträge 50 km
- [x] Winterdienst: ja, eigene Seite im hellen Bereich
- [x] Maler: nein, Paul ist kein Maler
- [x] „lahr“-Bilder: raus

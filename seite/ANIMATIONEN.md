# Animationen Startseite pauldienste.de

Auftrag: Die Startseite (`src/pages/index.astro`) ist fertig gebaut und gestaltet. Jetzt kommt die Bewegungsschicht. Sie soll hochwertig und eigenständig wirken, aber ruhig bleiben (Handwerk und Reinigung, keine Agentur-Show).

## Marke
- Gold `#B99B63` auf Graphit `#1C1E21`, Kalkweiß `#F5F5F3`. Hell = Gebäudereinigung, dunkel = Handwerk.
- Markenzeichen ist der **Nagel mit Gewinde** (`/logo/zeichen-*.svg`, Logo `/logo/quer-*.svg`). Gute Anker: Nagel, der sich in die Seite "einschlägt" oder dreht; Glanz, der über Gold wischt; Wischer, der eine Fläche sauber macht.
- Hell und dunkel sollen sich spürbar unterscheiden: Reinigung = klar, frisch, gleitend (Streifen, Glanz). Handwerk = kraftvoll, präzise (Einrasten, Maßlinien, Gewinde).

## Haken im Markup (`data-anim="…"`) und Signatur
Signatur der Startseite ist der **Aufmaß-Grundriss** (`src/components/Aufmass.astro`): gezeichneter Hausplan, links hell (Reinigung), rechts dunkel (Handwerk), Leistungen als Link-Chips an den Bauteilen. Der Plan ist ein SVG `#plan-g`, zweimal per `<use>` mit Clip eingesetzt (Graphit links, Gold rechts). Zonen `#z-*` leuchten per `:has()` beim Hover der Chips.

Haken: `aufmass` (Wrapper), `chip` (13 Chips), `hero`, `hero-title`, `areas`, `area` (3 Bereichskarten), `vorteile`, `kette`, `kette-schritt`, `ablauf`, `ablauf-schritt`, `radius`.

Ideen: Plan zeichnet sich (stroke-dashoffset) von der Trennlinie aus, Chips fahren gestaffelt ein, Schraffur (Boden) wird beim Scrollen gezogen, Bereichskarten heben sich. Megamenü (`Header.astro`) hat bereits Hover und Fokus, nur dezente Feinheiten.

## Regeln (hart)
1. Nur `transform` und `opacity` (Ausnahme: SVG `stroke-dashoffset`, `clip-path`). Kein Layout-Reflow.
2. `prefers-reduced-motion: reduce`: alles sofort im Endzustand, nichts versteckt. Ohne JS bleibt der Inhalt sichtbar (Klasse `html.js` wie in `motion.css`).
3. Kein Inhalt darf von einer Animation abhängen. Texte nie unlesbar oder verzögert lesbar (max. 600 ms bis lesbar).
4. Kein Cookie, keine Drittanbieter-Requests, Skripte lokal. Bibliotheken nur wenn nötig und dann lokal gebündelt (npm, kein CDN). Reines CSS (Scroll-Driven Animations, mit Fallback) bevorzugt, kleines Vanilla-JS erlaubt. Gesamtzuwachs JS unter 15 KB.
5. Kein Bounce, kein Elastic (siehe `src/styles/motion.css`: Ease-out-Kurven). Bewegung mit Grund.
6. Core Web Vitals grün: kein CLS, Hero-Text sofort sichtbar (LCP).
7. Mobil (375 px) gleichwertig, Touch hat kein Hover. Kein horizontales Scrollen.
8. Hinweise aus der Skill beachten: kein `overflow: hidden` bei Scroll-Timelines (`overflow: clip`), `animation`-Kurzschreibweise nicht mit `var()` (Longhands), Scroll-Zielen gegen den gebauten Stand prüfen (`npm run build`, dann `dist/` ausliefern).

## Wunschliste (Reihenfolge nach Wirkung)
1. **Hero**: Einstieg mit Nagel-Motiv und Titel (Wortweise oder Zeilen-Reveal, kurz). Die zwei Bereichs-Flächen (hell/dunkel) trennen sich beim Laden mit einer gezeichneten Linie oder fahren versetzt ein. Hover auf den Flächen: ruhiger Glanzdurchlauf.
2. **Scroll-Übergang hell zu dunkel**: Der Wechsel von Gebäudereinigung (hell) zu Handwerk (dunkel) soll ein Moment sein (z. B. Fläche, die sich beim Scrollen zuzieht).
3. **Kacheln**: gestaffeltes Einblenden je Zeile, dezentes Hover (Glanzkante, Pfeil).
4. **Kette „Ein Auszug, ein Ansprechpartner“**: verbindende Linie, die beim Scrollen von Schritt 1 bis 4 gezeichnet wird, Zahlen rasten ein.
5. **Ablauf**: Schritte nacheinander aktiv schalten.
6. **Einsatzgebiet**: Radiuskreise zeichnen sich von Kassel aus (30 km, dann 50 km), Punkt pulsiert einmal.
7. **Zähler/Trust-Leiste** oder anderer kleiner Akzent nur, wenn er etwas erklärt.
8. Mikro-Interaktion: Buttons (Gold) mit Glanz beim Hover, Nagel-Cursor-Effekt nur wenn es nicht kitschig wirkt.

## Ablage
- Neue Dateien: `src/styles/anim.css` (importiert aus `global.css`), `src/scripts/anim.ts` bzw. Inline-Skript in `Base.astro` nur falls nötig.
- Änderungen an `index.astro` nur für Haken und kleine Markup-Ergänzungen (SVG-Elemente), Texte und Struktur nicht verändern.
- Nach Abschluss: `npm run build` muss grün sein, Screenshots Desktop und Mobil, kurze Beschreibung der Effekte unten in dieser Datei ergänzen.

# Schriften

Hier gehören die WOFF2-Dateien der Projektschrift hinein. **Lokal ausliefern,
nicht über Google Fonts** – ein Google-Fonts-Request baut bei jedem
Seitenaufruf eine Verbindung zu Google auf und ist in Deutschland ein
Datenschutzthema.

## Einrichten

1. Schrift wählen und die benötigten Schnitte als WOFF2 hier ablegen.
   In der Regel reichen drei: Normal (400), Medium (500), Fett (700).
   Dateinamen frei wählbar, Konvention: `<familie>-<gewicht>.woff2`.

2. Die `@font-face`-Blöcke in `src/styles/global.css` an Dateinamen und
   Familiennamen anpassen.

3. `--font-heading` und `--font-body` in `src/styles/tokens.css` auf die
   Familie setzen.

4. Den `<link rel="preload">` in `src/layouts/Base.astro` auf den Schnitt
   zeigen lassen, der über der Falz sichtbar ist – meist der fette für die
   Überschrift.

## Fallstrick

Ein Preload auf eine **nicht vorhandene** Datei erzeugt bei jedem Seitenaufruf
einen 404, und die Seite rendert still in der Systemschrift. Das fällt optisch
kaum auf und bleibt deshalb gern monatelang unbemerkt.

Prüfen lässt sich das nach dem Build so:

```bash
ls dist/fonts/
grep -o 'preload"[^>]*fonts[^>]*' dist/index.html
```

Beides muss zusammenpassen.

## Lizenz

Vor dem Ausliefern die Lizenz der Schrift prüfen. Freie Schriften (SIL OFL,
Apache) dürfen selbst gehostet werden; kommerzielle Schriften brauchen meist
eine Webfont-Lizenz.

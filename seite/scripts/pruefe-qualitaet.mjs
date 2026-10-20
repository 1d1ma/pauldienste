/**
 * Qualitaetspruefung – findet die Fehlerklassen, die im Browser gut aussehen
 * und trotzdem falsch sind.
 *
 *   node scripts/pruefe-qualitaet.mjs        (nach `npm run build`)
 *
 * WARUM ES DAS GIBT: Jeder einzelne Check hier steht fuer einen Fehler, der
 * in einem echten Projekt durchgerutscht ist – an einem Design-Review vorbei,
 * durch `astro check` hindurch, ohne Konsolenmeldung. Die Gemeinsamkeit: Sie
 * scheitern LAUTLOS. Ein vergessenes Token macht keine Fehlermeldung, es
 * loescht nur die ganze CSS-Regel.
 *
 * Exit-Code 1 bei FEHLERN, 0 bei blossen Hinweisen. Der Build soll an einem
 * kaputten Token scheitern, nicht an einer Geschmacksfrage.
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const WURZEL = process.cwd();
const fehler = [];
const hinweise = [];

/* ------------------------------------------------------------------ *
 * Dateien einsammeln
 * ------------------------------------------------------------------ */

function dateien(verzeichnis, endung, treffer = []) {
  if (!existsSync(verzeichnis)) return treffer;
  for (const name of readdirSync(verzeichnis)) {
    const pfad = join(verzeichnis, name);
    if (statSync(pfad).isDirectory()) dateien(pfad, endung, treffer);
    else if (name.endsWith(endung)) treffer.push(pfad);
  }
  return treffer;
}

const astroDateien = [
  ...dateien(join(WURZEL, 'src/pages'), '.astro'),
  ...dateien(join(WURZEL, 'src/components'), '.astro'),
  ...dateien(join(WURZEL, 'src/layouts'), '.astro'),
];
const cssDateien = dateien(join(WURZEL, 'src/styles'), '.css');
const htmlDateien = dateien(join(WURZEL, 'dist'), '.html');

const kurz = (p) => relative(WURZEL, p);

/* ------------------------------------------------------------------ *
 * 1. Nicht existierende Custom Properties
 *
 * Der teuerste stille Fehler ueberhaupt. `margin: var(--space-2) 0
 * var(--space-5)` sieht richtig aus – gibt es --space-5 nicht, verwirft der
 * Browser die KOMPLETTE margin-Deklaration. Nicht nur den einen Wert. Der
 * Abstand fehlt dann ersatzlos, ohne jede Meldung.
 * ------------------------------------------------------------------ */

const definiert = new Set();
for (const datei of [...cssDateien, ...astroDateien]) {
  const inhalt = readFileSync(datei, 'utf8');
  // In einem Regelblock definiert
  for (const m of inhalt.matchAll(/^\s*(--[\w-]+)\s*:/gm)) definiert.add(m[1]);
  // Per style-Attribut gesetzt (`style={`--vn-pos:${x}%`}`) – voellig
  // legitim und der uebliche Weg, JavaScript-Werte an CSS zu reichen.
  for (const m of inhalt.matchAll(/(--[\w-]+)\s*:/g)) definiert.add(m[1]);
}

for (const datei of [...cssDateien, ...astroDateien]) {
  const inhalt = readFileSync(datei, 'utf8');
  inhalt.split('\n').forEach((zeile, i) => {
    for (const m of zeile.matchAll(/var\(\s*(--[\w-]+)\s*([,)])/g)) {
      const [, name, weiter] = m;
      if (definiert.has(name)) continue;
      // Mit Fallback (`var(--x, 1rem)`) bricht nichts, es ist aber ein
      // Hinweis darauf, dass ein Token fehlt oder falsch heisst.
      const ziel = weiter === ',' ? hinweise : fehler;
      ziel.push(
        `${kurz(datei)}:${i + 1}  unbekanntes Token ${name}` +
          (weiter === ',' ? ' (Fallback greift, Token fehlt trotzdem)' : '  ← Regel faellt komplett aus'),
      );
    }
  });
}

/* ------------------------------------------------------------------ *
 * 2. Kontrast aller Textfarben gegen alle Flaechen
 *
 * Der uebliche Fehler ist nicht, den Kontrast zu vergessen, sondern ihn nur
 * gegen Weiss zu rechnen. Sobald es eine zweite Flaeche gibt (abwechselnde
 * Sektionen), muss jede Textfarbe gegen BEIDE bestehen.
 * ------------------------------------------------------------------ */

const tokenWert = {};
for (const datei of cssDateien) {
  for (const m of readFileSync(datei, 'utf8').matchAll(/(--[\w-]+)\s*:\s*(#[0-9a-fA-F]{3,8})\s*;/g)) {
    tokenWert[m[1]] = m[2];
  }
}

const kanal = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
function leuchtdichte(hex) {
  let h = hex.replace('#', '');
  if (h.length === 3) h = h.split('').map((z) => z + z).join('');
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
  return 0.2126 * kanal(r) + 0.7152 * kanal(g) + 0.0722 * kanal(b);
}
function verhaeltnis(a, b) {
  const [x, y] = [leuchtdichte(a), leuchtdichte(b)];
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
}

const textTokens = Object.keys(tokenWert).filter((t) => /text|heading|primary-text/.test(t));
const flaechen = Object.keys(tokenWert).filter((t) => /^--color-bg/.test(t));

for (const text of textTokens) {
  for (const flaeche of flaechen) {
    const v = verhaeltnis(tokenWert[text], tokenWert[flaeche]);
    if (v < 4.5) {
      fehler.push(
        `Kontrast ${text} (${tokenWert[text]}) auf ${flaeche} (${tokenWert[flaeche]}) = ${v.toFixed(2)}:1  ← unter AA (4,5:1)`,
      );
    }
  }
}

/* ------------------------------------------------------------------ *
 * 3. Gescopte Regeln, die kein Element treffen
 *
 * Astro haengt den Scope-Hash einer Datei an die Elemente IHRES Templates.
 * Bei Klassen, die an eine Komponente uebergeben werden, klappt das meistens,
 * aber nicht immer – und wenn nicht, faellt die Regel lautlos aus: Das
 * Element ist da, nur ohne die Gestaltung.
 *
 * Statt das aus dem Quelltext zu raten, wird es hier im GEBAUTEN HTML
 * nachgesehen. Aus dem CSS kommt jedes Paar `.klasse[data-astro-cid-xyz]`,
 * und dann muss mindestens ein Element mit dieser Klasse auch dieses
 * Attribut tragen. Kein Treffer heisst: tote Regel.
 * ------------------------------------------------------------------ */

const gebautesCss = dateien(join(WURZEL, 'dist/_astro'), '.css')
  .map((f) => readFileSync(f, 'utf8'))
  .join('\n');
const allesHtml = htmlDateien.map((f) => readFileSync(f, 'utf8')).join('\n');

const paare = new Map();
for (const m of gebautesCss.matchAll(/\.([\w-]+)\[(data-astro-cid-[\w-]+)\]/g)) {
  paare.set(`${m[1]}|${m[2]}`, [m[1], m[2]]);
}

for (const [klasse, attribut] of paare.values()) {
  // Jedes Element, das die Klasse traegt – hat eines davon das Attribut?
  const elemente = allesHtml.match(new RegExp(`<[^>]*\\bclass="[^"]*\\b${klasse}\\b[^"]*"[^>]*>`, 'g'));
  if (!elemente) continue; // Klasse kommt im Build nicht vor, anderes Thema
  if (elemente.some((e) => e.includes(attribut))) continue;
  fehler.push(
    `CSS-Regel .${klasse}[${attribut}] trifft kein einziges Element  ← Klasse an eine Komponente uebergeben, :global() fehlt`,
  );
}

/* ------------------------------------------------------------------ *
 * 4. Hintergrund-Rhythmus im gebauten HTML
 *
 * Zwei gleiche Flaechen hintereinander lesen sich als eine Sektion. Der
 * Fehler entsteht typischerweise beim nachtraeglichen Einschieben.
 * ------------------------------------------------------------------ */

for (const datei of htmlDateien) {
  const html = readFileSync(datei, 'utf8');
  const bg = [...html.matchAll(/class="section section--bg-([a-z-]+)/g)].map((m) => m[1]);
  bg.forEach((a, i) => {
    if (i && bg[i - 1] === a) {
      hinweise.push(`${kurz(datei)}  zwei Sektionen "${a}" hintereinander (Position ${i})`);
    }
  });
}

/* ------------------------------------------------------------------ *
 * 5. Schriftgroessen-Ausreisser
 *
 * 0.95rem neben 0.9375rem ist optisch derselbe Wert, aber eine zweite Stufe
 * in der Skala. Solche Paare entstehen beim Kopieren und lassen die
 * Hierarchie flach wirken.
 * ------------------------------------------------------------------ */

const groessen = new Map();
for (const datei of [...astroDateien, ...cssDateien]) {
  for (const m of readFileSync(datei, 'utf8').matchAll(/font-size:\s*([\d.]+)rem/g)) {
    const v = parseFloat(m[1]);
    groessen.set(v, (groessen.get(v) ?? 0) + 1);
  }
}
const sortiert = [...groessen.entries()].sort((a, b) => a[0] - b[0]);
for (let i = 1; i < sortiert.length; i++) {
  const [klein, nKlein] = sortiert[i - 1];
  const [gross, nGross] = sortiert[i];
  if (gross / klein < 1.04) {
    const [selten, haeufig] = nKlein < nGross ? [klein, gross] : [gross, klein];
    hinweise.push(
      `Schriftgroessen ${klein}rem und ${gross}rem liegen unter 4 % auseinander  ← ${selten}rem auf ${haeufig}rem vereinheitlichen`,
    );
  }
}

/* ------------------------------------------------------------------ *
 * 6. auto-fit-Raster, die Waisen erzeugen koennen
 *
 * `repeat(auto-fit, minmax(...))` bricht bei 5 oder 7 Elementen fast immer
 * so um, dass in der letzten Zeile eines allein steht. Das sieht aus wie ein
 * Fehler, nicht wie Gestaltung.
 * ------------------------------------------------------------------ */

for (const datei of astroDateien) {
  // Kommentare vorher entfernen: Eine Notiz wie "vorher stand hier auto-fit"
  // ist kein auto-fit. Ohne das meldet der Check ausgerechnet die Stellen,
  // an denen das Problem schon behoben und dokumentiert wurde.
  const inhalt = readFileSync(datei, 'utf8')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/^\s*\/\/.*$/gm, '');
  if (!/repeat\(\s*auto-fit/.test(inhalt)) continue;
  // Datenlisten im Frontmatter zaehlen (grobe Heuristik, absichtlich)
  for (const m of inhalt.matchAll(/const (\w+)\s*=\s*\[([\s\S]*?)\n\];/g)) {
    const anzahl = (m[2].match(/^\s{2}\{/gm) || []).length;
    if (anzahl === 5 || anzahl === 7) {
      hinweise.push(
        `${kurz(datei)}  Liste "${m[1]}" hat ${anzahl} Eintraege und die Datei nutzt auto-fit  ← auf Waise in der letzten Zeile pruefen`,
      );
    }
  }
}

/* ------------------------------------------------------------------ *
 * 7. Deklarierte Links, die es im HTML nicht gibt
 *
 * `linksTo` in pages.ts ist eine ABSICHTSERKLAERUNG. Die Linkpruefung
 * kontrolliert, ob das Ziel existiert – aber nicht, ob der Link auch
 * gerendert wird. Genau da klaffte eine Luecke: Die Ortsseiten standen im
 * linksTo der Fenster-Seite, im gebauten HTML gab es keinen einzigen
 * Verweis, und sie haetten als verwaiste Seiten live gehen koennen.
 *
 * Die Pruefung laeuft nur fuer LIVE-Ziele: Auf eine geplante Seite darf man
 * zeigen wollen, ohne schon zu verlinken.
 * ------------------------------------------------------------------ */

const pagesQuelle = join(WURZEL, 'src/data/pages.ts');
if (existsSync(pagesQuelle)) {
  const { pages: seitenDb } = await import(pagesQuelle);
  for (const [slug, seite] of Object.entries(seitenDb)) {
    const gebaut = join(WURZEL, 'dist', slug === '/' ? '' : slug.slice(1), 'index.html');
    if (!existsSync(gebaut)) continue;
    const html = readFileSync(gebaut, 'utf8');
    for (const ziel of seite.linksTo ?? []) {
      if (seitenDb[ziel]?.status !== 'live') continue;
      if (html.includes(`href="${ziel}"`)) continue;
      fehler.push(
        `${slug}  deklariert linksTo "${ziel}", rendert den Link aber nicht  ` +
          `← Absichtserklaerung ohne Umsetzung`,
      );
    }
  }
}

/* ------------------------------------------------------------------ *
 * 8. Fremde Bilder ohne Herkunftsnachweis
 *
 * Fremde Motive brauchen eine sichtbare Kennzeichnung: "Symbolbild" wegen
 * § 5 UWG, zusaetzlich "KI-generiert" wegen Artikel 50 der KI-Verordnung.
 * Erzeugt wird sie aus src/data/bildherkunft.ts – aber nur fuer Bilder, die
 * dort auch eingetragen sind.
 *
 * Die Pruefung haengt an der Namenskonvention: Wer eine Datei "stock-…" oder
 * "symbolbild-…" nennt, hat die Herkunft schon erkannt. Der haeufige Fehler
 * ist nicht das Umbenennen, sondern das Vergessen des Eintrags.
 * ------------------------------------------------------------------ */

const herkunftDatei = join(WURZEL, 'src/data/bildherkunft.ts');
if (existsSync(herkunftDatei)) {
  const eingetragen = readFileSync(herkunftDatei, 'utf8');
  const bilderVerzeichnis = join(WURZEL, 'src/assets/images');
  const fremdePraefixe = /^(stock|produkt|symbolbild|ki)-/;

  for (const datei of readdirSync(bilderVerzeichnis)) {
    if (!/\.(jpe?g|png|webp|avif)$/i.test(datei)) continue;
    if (!fremdePraefixe.test(datei)) continue;
    if (eingetragen.includes(datei)) continue;
    fehler.push(
      `${datei}  ist nach dem Namen ein fremdes Motiv, steht aber nicht in ` +
        `src/data/bildherkunft.ts  ← ohne Eintrag keine Kennzeichnung`,
    );
  }
}

/* ------------------------------------------------------------------ *
 * 9. Seitenkopf: eine H1, Title-Laenge, Bilder mit alt
 * ------------------------------------------------------------------ */

for (const datei of htmlDateien) {
  const html = readFileSync(datei, 'utf8');
  const name = kurz(datei);

  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) fehler.push(`${name}  ${h1} H1-Ueberschriften (genau eine erwartet)`);

  const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '';
  if (!title) fehler.push(`${name}  kein <title>`);
  else if (title.length > 62) {
    // Kein Fehler: Bei einer Migration werden Titles bewusst im Wortlaut
    // uebernommen, auch lange. Sie tragen das Ranking, und Google kuerzt
    // ohnehin nur die Anzeige, nicht die Bewertung.
    hinweise.push(
      `${name}  Title ${title.length} Zeichen  ← wird in der Suche gekuerzt (bei uebernommenen Titles so lassen)`,
    );
  }

  // Meta-Description: ueber 150 Zeichen kappt Google, auf dem Handy schon bei
  // ~120. Regel im Skill website-texte, references/seitenstruktur.md. Hinweis,
  // kein Fehler: uebernommene Descriptions bleiben im Wortlaut.
  const desc = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i)?.[1] ?? '';
  const descKlar = desc.replace(/&amp;/g, '&').replace(/&[a-z]+;|&#\d+;/gi, '_');
  if (descKlar.length > 150) {
    hinweise.push(
      `${name}  Description ${descKlar.length} Zeichen  ← ueber 150, wird gekuerzt (Kernaussage in die ersten ~120)`,
    );
  }

  for (const m of html.matchAll(/<img\b[^>]*>/g)) {
    const tag = m[0];
    // `alt=""` wird beim Minifizieren zu einem nackten `alt`. Das ist
    // gueltiges HTML und die korrekte Auszeichnung fuer ein Schmuckbild.
    if (!/\balt(=|[\s/>])/.test(tag)) fehler.push(`${name}  <img> ohne alt-Attribut`);
    if (!/\bsrc=/.test(tag)) fehler.push(`${name}  <img> ohne src  ← kaputtes Bild`);
  }
}

/* ------------------------------------------------------------------ *
 * Ausgabe
 * ------------------------------------------------------------------ */

const einmalig = (liste) => [...new Set(liste)];

console.log(
  `Qualitaetspruefung: ${astroDateien.length} Astro-Dateien, ${htmlDateien.length} gebaute Seiten.`,
);

/* ------------------------------------------------------------------
 * 12. Aufzaehlungszeichen als Textzeichen im <li>
 *
 * "<li>• Text</li>" ist fuer den Browser EIN Textblock. Bricht er um,
 * beginnt die Folgezeile unter dem Zeichen statt unter dem Wort. Faellt
 * nur in schmalen Spalten auf, also spaet. Zeichen und Text gehoeren in
 * zwei Elemente (haengender Einzug), oder list-disc/list-outside nutzen.
 * ------------------------------------------------------------------ */

const ZEICHEN = /^\s*(?:&bull;|&#8226;|[\u2022\u00b7\u2023\u25aa\u25cf\u25e6\u2013\u2014])\s/;
for (const datei of astroDateien) {
  const inhalt = readFileSync(datei, 'utf8');
  for (const m of inhalt.matchAll(/<li\b[^>]*>([\s\S]{0,40})/g)) {
    if (ZEICHEN.test(m[1])) {
      fehler.push(
        `${kurz(datei)}  <li> beginnt mit einem Aufzaehlungszeichen als Text  ← Folgezeilen brechen unter das Zeichen statt unter den Text; Zeichen und Text in zwei Elemente trennen`,
      );
      break;
    }
  }
}

const h = einmalig(hinweise);
if (h.length) {
  console.warn(`\n⚠️  ${h.length} Hinweis(e):`);
  h.forEach((x) => console.warn(`   • ${x}`));
}

const f = einmalig(fehler);
if (f.length) {
  console.error(`\n❌ ${f.length} Fehler:`);
  f.forEach((x) => console.error(`   ✗ ${x}`));
  process.exit(1);
}

console.log('\n✅ Keine Fehler.');

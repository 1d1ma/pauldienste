/**
 * Verhindert Preis-Drift zwischen Texten und der zentralen Preisquelle.
 *
 * Hintergrund: In gewachsenen Seiten stehen Preise in Titles, Descriptions und
 * FAQ, die zur Referenztabelle laengst nicht mehr passen – und in Google
 * sichtbar sind. Dieses Skript faengt das beim Build ab.
 *
 * Geprueft wird: Jeder Betrag der Form "ab 1.234 €" in Title, Description und
 * H1 der Artikel-Datenbank muss einem real hinterlegten Preis entsprechen.
 *
 *   node scripts/validate-prices.mjs
 *
 * OPTIONAL: Fuehrt das Projekt keine zentrale Preisdatei, beendet sich das
 * Skript sauber mit Hinweis. Eine Vorlage liegt in examples/preise.json.
 */
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { pages } from '../src/data/pages.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PREIS_DATEI = resolve(__dirname, '../src/data/preise.json');

if (!existsSync(PREIS_DATEI)) {
  console.log(
    'Preis-Konsistenz: uebersprungen – keine src/data/preise.json vorhanden.\n' +
      '  Vorlage: examples/preise.json, falls Preise zentral gefuehrt werden sollen.',
  );
  process.exit(0);
}

const preise = (await import('../src/data/preise.json', { with: { type: 'json' } })).default;

// Alle gueltigen Betraege einsammeln
const valid = new Set();
for (const gruppe of Object.values(preise.materialien ?? {})) {
  for (const [key, value] of Object.entries(gruppe)) {
    if (/^\d+m$/.test(key) && typeof value === 'number') valid.add(value);
  }
}
if (preise.montage) {
  valid.add(preise.montage.min);
  valid.add(preise.montage.max);
}

// "ab 2.940 €" / "2.940 €" → 2940
const PRICE_RE = /(\d{1,3}(?:\.\d{3})+|\d{4,})\s*€/g;
const parse = (s) => Number(s.replace(/\./g, ''));

const errors = [];
let checked = 0;

for (const [slug, page] of Object.entries(pages)) {
  for (const field of ['title', 'description', 'h1']) {
    const text = page[field];
    if (typeof text !== 'string') continue;

    for (const match of text.matchAll(PRICE_RE)) {
      const value = parse(match[1]);
      checked++;
      if (!valid.has(value)) {
        errors.push(
          `${slug} → ${field}: "${match[0]}" kommt in preise.json nicht vor.\n` +
            `      Text: ${text}`,
        );
      }
    }
  }
}

console.log(`Preis-Konsistenz: ${checked} Betrag/Betraege in der Artikel-Datenbank geprueft.`);

if (errors.length) {
  console.error(`\n❌ ${errors.length} Preis(e) weichen von preise.json ab:`);
  errors.forEach((e) => console.error(`   ✗ ${e}`));
  console.error('\n   → Entweder den Text anpassen oder den Preis in preise.json korrigieren.');
  process.exit(1);
}

console.log('✅ Alle genannten Preise decken sich mit preise.json.');

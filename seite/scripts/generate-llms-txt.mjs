/**
 * Erzeugt public/llms.txt aus der Artikel-Datenbank.
 *
 * llms.txt (llmstxt.org) gibt KI-Systemen einen kompakten Ueberblick: was der
 * Betrieb macht, wo er taetig ist, und welche Seiten welche Frage beantworten.
 * Das ersetzt keine gute Seitenstruktur, macht sie aber maschinell zugaenglich.
 *
 *   node scripts/generate-llms-txt.mjs
 *
 * Wichtig: Die Datei wird generiert, NICHT von Hand gepflegt. Sie zieht ihre
 * Inhalte aus pages.ts und site.ts und kann damit nicht veralten.
 *
 * Hinweis zur Einordnung: Google sagt ausdruecklich, dass fuer AI Overviews
 * keine Sonderdateien noetig sind. Fuer ChatGPT, Claude und Perplexity ist
 * eine maschinenlesbare Uebersicht aber hilfreich – und sie schadet nie.
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { pages } from '../src/data/pages.ts';
import { site } from '../src/data/site.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ZIEL = resolve(__dirname, '../public/llms.txt');

const live = Object.values(pages).filter((p) => p.status === 'live');

/** Cluster in eine lesbare Reihenfolge bringen, Rechtliches ans Ende. */
const REIHENFOLGE = [
  'startseite', 'leistung', 'produkt', 'ratgeber',
  'referenzen', 'ueber-uns', 'kontakt', 'rechtliches',
];
const TITEL = {
  startseite: 'Einstieg',
  leistung: 'Leistungen',
  produkt: 'Produkte',
  ratgeber: 'Ratgeber und Hintergrund',
  referenzen: 'Referenzen',
  'ueber-uns': 'Über den Betrieb',
  kontakt: 'Kontakt',
  rechtliches: 'Rechtliches',
};

const gruppen = REIHENFOLGE
  .map((c) => ({ cluster: c, items: live.filter((p) => p.cluster === c) }))
  .filter((g) => g.items.length > 0);

// Cluster, die nicht in REIHENFOLGE stehen, hinten anhaengen
for (const p of live) {
  if (!REIHENFOLGE.includes(p.cluster) && !gruppen.some((g) => g.cluster === p.cluster)) {
    gruppen.push({ cluster: p.cluster, items: live.filter((x) => x.cluster === p.cluster) });
  }
}

const zeile = (p) => {
  const beschreibung = p.description ?? p.h1 ?? '';
  const kurz = beschreibung.length > 150 ? `${beschreibung.slice(0, 147)}…` : beschreibung;
  return `- [${p.h1 ?? p.title}](${site.url}${p.slug})${kurz ? `: ${kurz}` : ''}`;
};

const inhalt = `# ${site.name}

> ${site.kurzbeschreibung}

Standort: ${site.kontakt.plz} ${site.kontakt.ort}, ${site.kontakt.land}
Vor Ort tätig in: ${site.vorOrtGebiet}
Kontakt: ${site.kontakt.email}, ${site.kontakt.telefonAnzeige}

${gruppen
  .map((g) => `## ${TITEL[g.cluster] ?? g.cluster}\n\n${g.items.map(zeile).join('\n')}`)
  .join('\n\n')}
`;

mkdirSync(dirname(ZIEL), { recursive: true });
writeFileSync(ZIEL, inhalt, 'utf8');

console.log(`✅ public/llms.txt erzeugt – ${live.length} Seiten in ${gruppen.length} Gruppen.`);

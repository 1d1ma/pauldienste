/**
 * Doorway-Test für Ortsseiten.
 *
 *   node scripts/pruefe-orte.mjs        (nach `npm run build`)
 *
 * WARUM ES DAS GIBT: Ortsseiten entstehen aus einer Vorlage, und eine Vorlage
 * zieht Text an, der auf jeder Seite gleich ist. Google wertet Seiten, die
 * sich nur im Ortsnamen unterscheiden, als Doorway-Pages ab, und das kann auf
 * die ganze Domain durchschlagen.
 *
 * Beim Wettbewerber, der die Vorlage dieses Projekts inspiriert hat, waren
 * zwei Ortsseiten nach Neutralisierung des Ortsnamens zu 100,0 % identisch.
 * Die erste Fassung hier lag bei 65 %. Nach dem Umbau (generische Bloecke
 * raus, ortsspezifische ausgebaut) bei 20 bis 24 %.
 *
 * DAS VERFAHREN: Ortsnamen, Stadtteile und Flurnamen aus dem gebauten HTML
 * entfernen, dann paarweise vergleichen. Was uebrig bleibt, ist der Teil, der
 * WIRKLICH auf jeder Seite gleich ist.
 *
 * DIE SCHWELLE ist eine Setzung, keine Google-Vorgabe. 45 % heisst: Mehr als
 * die Haelfte der Seite muss ortsspezifisch sein. Wer darunter bleibt, hat
 * eine Seite gebaut, die ein Bauherr aus dem Ort wiedererkennt.
 *
 * Exit-Code 1 ueber der Schwelle. Das ist Absicht: Eine Ortsseite, die den
 * Test nicht besteht, schadet mehr als sie nuetzt.
 */
import { readFileSync, existsSync } from 'node:fs';
import { orte } from '../src/data/orte.ts';

const SCHWELLE = 0.45;

/** Zusaetzliche Eigennamen, die kein Ortsname sind, aber genauso wirken. */
const WEITERE_EIGENNAMEN = [
  'Eifel',
  'Osteifel',
  'Rheintal',
  'Rhein',
  'Raiffeisenbrücke',
  'B9',
  'A48',
];

function seitentext(pfad) {
  const roh = readFileSync(pfad, 'utf8');
  return roh
    // Kopf, Fuss und Navigation zaehlen nicht mit: Die sind auf JEDER Seite
    // der Website gleich, das ist kein Doorway-Problem.
    .replace(/<(script|style|nav|header|footer)[^>]*>[\s\S]*?<\/\1>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;|&#\d+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Ortsnamen und Flurnamen durch einen Platzhalter ersetzen. */
function neutralisieren(text) {
  const namen = [
    ...orte.map((o) => o.name),
    ...orte.flatMap((o) => o.stadtteile),
    ...WEITERE_EIGENNAMEN,
  ].sort((a, b) => b.length - a.length); // laengste zuerst, sonst bleiben Reste

  let t = text;
  for (const n of namen) t = t.split(n).join('ORT');
  return t;
}

/**
 * Aehnlichkeit ueber Wort-Vierlinge (Shingles).
 *
 * Ein reiner Wortvergleich wuerde zu hoch ausschlagen, weil zwei deutsche
 * Fachtexte zwangslaeufig dieselben Woerter benutzen. Vierlinge messen, ob
 * ganze FORMULIERUNGEN wiederholt werden, und genau darum geht es.
 */
function aehnlichkeit(a, b) {
  const shingles = (t) => {
    const w = t.toLowerCase().match(/[\wäöüß]+/g) ?? [];
    const s = new Set();
    for (let i = 0; i + 4 <= w.length; i++) s.add(w.slice(i, i + 4).join(' '));
    return s;
  };
  const sa = shingles(a);
  const sb = shingles(b);
  if (!sa.size || !sb.size) return 0;
  let gemeinsam = 0;
  for (const x of sa) if (sb.has(x)) gemeinsam++;
  // Jaccard waere strenger, aber hier interessiert: Wie viel von der
  // KLEINEREN Seite steht wortgleich auch auf der anderen?
  return gemeinsam / Math.min(sa.size, sb.size);
}

const seiten = orte
  .map((o) => ({ ort: o, pfad: `dist/fensterbauer-${o.slug}/index.html` }))
  .filter((s) => existsSync(s.pfad))
  .map((s) => ({ ...s, text: neutralisieren(seitentext(s.pfad)) }));

if (seiten.length < 2) {
  console.log('Doorway-Test: weniger als zwei Ortsseiten gebaut, nichts zu vergleichen.');
  process.exit(0);
}

console.log(`Doorway-Test: ${seiten.length} Ortsseiten, Schwelle ${(SCHWELLE * 100).toFixed(0)} %.\n`);

const zuAehnlich = [];
for (let i = 0; i < seiten.length; i++) {
  for (let j = i + 1; j < seiten.length; j++) {
    const q = aehnlichkeit(seiten[i].text, seiten[j].text);
    const zeile = `${seiten[i].ort.name} ↔ ${seiten[j].ort.name}`;
    const wert = `${(q * 100).toFixed(1).padStart(5)} %`;
    if (q > SCHWELLE) {
      zuAehnlich.push(`${zeile}  ${wert}`);
      console.error(`   ✗ ${zeile.padEnd(28)} ${wert}`);
    } else {
      console.log(`   • ${zeile.padEnd(28)} ${wert}`);
    }
  }
}

/* Dünne Seiten sind das zweite Doorway-Merkmal: Wer 300 Wörter schreibt,
   von denen 200 aus der Vorlage kommen, besteht den Ähnlichkeitstest und hat
   trotzdem keine Seite. */
const MINDESTWOERTER = 500;
const duenn = seiten
  .map((s) => ({ name: s.ort.name, n: (s.text.match(/[\wäöüß]+/g) ?? []).length }))
  .filter((s) => s.n < MINDESTWOERTER);

if (duenn.length) {
  console.error(`\n❌ Zu wenig Inhalt (unter ${MINDESTWOERTER} Wörtern):`);
  duenn.forEach((d) => console.error(`   ✗ ${d.name}: ${d.n} Wörter`));
}

if (zuAehnlich.length || duenn.length) {
  console.error(
    '\nEine Ortsseite, die diesen Test nicht besteht, schadet mehr als sie nützt.\n' +
      'Was hilft: generische Blöcke auf die Leistungsseite verlagern und dafür\n' +
      'ortsspezifische Substanz ergänzen – Bausubstanz, Baustoffe, Vorschriften,\n' +
      'echte Referenzprojekte. Details in src/data/orte.ts.',
  );
  process.exit(1);
}

console.log('\n✅ Alle Ortsseiten unterscheiden sich ausreichend.');

/**
 * Floskel-Waechter – meldet betulichen Fuelltext im gebauten HTML.
 *
 *   node scripts/pruefe-floskeln.mjs        (nach `npm run build`)
 *
 * WAS ER KANN UND WAS NICHT. Prosa-Qualitaet ist Geschmack, und Geschmack
 * laesst sich nicht mit einem Regex pruefen. Dieser Waechter faengt nur die
 * groben, wiederkehrenden MUSTER, die in diesem Projekt tatsaechlich mehrfach
 * durchgerutscht sind. Er ersetzt nicht das Lesen, er erinnert daran.
 *
 * Deshalb sind alle Treffer HINWEISE, keine Fehler: Der Build bricht nicht ab.
 * Ein Regex kann nicht wissen, ob eine rhetorische Frage in einer FAQ steht
 * (dort richtig) oder als CTA-Anmoderation (dort falsch). Die Entscheidung
 * bleibt beim Menschen.
 *
 * Die Regeln dahinter stehen im Skill `website-texte`:
 *   - Grundprinzip 9 "Die Weglassprobe"
 *   - references/sprachregeln.md ("Erklaerte Selbstverstaendlichkeiten",
 *     "Rhetorische Fragen als Vorspann")
 *   - references/hero-und-cta.md ("Begleittext gegen Unsicherheit")
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const WURZEL = process.cwd();

function htmlDateien(verzeichnis, treffer = []) {
  if (!existsSync(verzeichnis)) return treffer;
  for (const name of readdirSync(verzeichnis)) {
    const pfad = join(verzeichnis, name);
    if (statSync(pfad).isDirectory()) htmlDateien(pfad, treffer);
    else if (name.endsWith('.html')) treffer.push(pfad);
  }
  return treffer;
}

/** Sichtbaren Text extrahieren; Skripte, Stile und Tags raus. */
function sichtbar(html) {
  return html
    .replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;|&#\d+;/gi, ' ')
    .replace(/\s+/g, ' ');
}

/**
 * Die Muster. Jedes steht fuer einen echten Befund aus diesem Projekt.
 * `pruef` bekommt den bereinigten Satz und gibt true, wenn es ein Treffer ist.
 */
const MUSTER = [
  {
    name: 'erklaerter Ablauf',
    hinweis: 'erklaert einen Ablauf, den niemand angezweifelt hat (Weglassprobe)',
    re: /erst wenn (es|der|das) (passt|stimmt).{0,40}(aufma[ßss]|vorbei|zu ihnen)/i,
  },
  {
    name: 'begruendete Selbstverstaendlichkeit',
    hinweis: '"genuegen/genuegt" verlagert die Aufmerksamkeit auf eine Huerde – im CTA lieber direkt auffordern',
    re: /grobe ma[ßss]e gen[üu]g(en|t)|ma[ßss]e gen[üu]gen (uns|f[üu]r)/i,
  },
  {
    name: 'rhetorische Anmoderation',
    hinweis: 'rhetorische Frage als Vorspann – Aussage oder Aufforderung ist staerker',
    re: /\bSie (wissen|haben|kennen|suchen)[^.?!]{5,60}\?/i,
  },
  {
    name: 'nachgereichter Uebergang',
    hinweis: 'begruendet einen Uebergang, der sich selbst traegt',
    re: /\b(da|jetzt,? da|nachdem) sie (jetzt |nun )?wissen,? wie/i,
  },
];

const funde = [];
for (const datei of htmlDateien(join(WURZEL, 'dist'))) {
  const text = sichtbar(readFileSync(datei, 'utf8'));
  // In grobe Saetze zerlegen, damit der Treffer zitierbar ist.
  for (const satz of text.split(/(?<=[.?!])\s+/)) {
    for (const m of MUSTER) {
      if (m.re.test(satz)) {
        funde.push({ datei: relative(WURZEL, datei), muster: m, satz: satz.trim().slice(0, 100) });
      }
    }
  }
}

console.log(`Floskel-Waechter: ${htmlDateien(join(WURZEL, 'dist')).length} Seiten geprueft.`);

if (!funde.length) {
  console.log('\n✅ Keine bekannten Floskel-Muster gefunden.');
  process.exit(0);
}

// Nach Muster gruppieren, damit ein wiederkehrender Fehler als einer erscheint.
const nachMuster = new Map();
for (const f of funde) {
  const liste = nachMuster.get(f.muster.name) ?? [];
  liste.push(f);
  nachMuster.set(f.muster.name, liste);
}

console.warn(`\n⚠️  ${funde.length} moegliche Floskel(n). Kein Build-Abbruch – bitte selbst pruefen:`);
for (const [name, liste] of nachMuster) {
  console.warn(`\n   ${name} – ${liste[0].muster.hinweis}`);
  for (const f of liste) {
    console.warn(`     • ${f.datei}: „${f.satz}${f.satz.length >= 100 ? '…' : ''}"`);
  }
}
console.warn('\nRegeln dazu im Skill website-texte (Grundprinzip 9, references/sprachregeln.md).');

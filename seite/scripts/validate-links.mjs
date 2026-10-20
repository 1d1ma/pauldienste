/**
 * Validiert die Artikel-Datenbank: prüft, dass jedes linksTo-Ziel im Register
 * existiert, meldet Selbstverweise und Links auf noch nicht live gestellte Seiten.
 *
 *   node scripts/validate-links.mjs
 *
 * Exit-Code 1 bei Fehlern → stoppt `npm run build` und damit das Deployment.
 *
 * Hinweis: importiert pages.ts direkt (Node ≥ 22 strippt TypeScript-Typen),
 * statt die Quelle mit Regex zu parsen – das ist die einzig verlässliche Variante.
 */
import { pages, registry } from '../src/data/pages.ts';

const errors = [];
const warnings = [];

for (const [slug, page] of Object.entries(pages)) {
  if (page.slug !== slug) {
    errors.push(`${slug}: Feld "slug" ist "${page.slug}" – Schlüssel und slug müssen übereinstimmen.`);
  }

  for (const target of page.linksTo ?? []) {
    if (!(target in registry)) {
      errors.push(`${slug} → ${target}  (Ziel existiert nicht im Register)`);
      continue;
    }
    if (target === slug) {
      errors.push(`${slug} → ${target}  (Selbstverweis)`);
      continue;
    }
    if (registry[target].status !== 'live') {
      warnings.push(`${slug} → ${target}  (Ziel ist "${registry[target].status}", noch nicht live)`);
    }
  }
}

// Verwaiste Seiten: live, aber von keiner anderen Seite verlinkt.
// Ausgenommen: Startseite sowie Cluster, die global im Header/Footer stehen
// (Rechtliches, Kontakt) – die werden aus pagesByCluster() gerendert, nicht über linksTo.
const GLOBAL_LINKED_CLUSTERS = new Set(['rechtliches', 'kontakt']);
const linked = new Set(Object.values(pages).flatMap((p) => p.linksTo ?? []));
const orphans = Object.values(pages)
  .filter(
    (p) =>
      p.status === 'live' &&
      p.slug !== '/' &&
      !GLOBAL_LINKED_CLUSTERS.has(p.cluster) &&
      !linked.has(p.slug),
  )
  .map((p) => p.slug);

const liveCount = Object.values(pages).filter((p) => p.status === 'live').length;
console.log(`Artikel-Datenbank: ${liveCount} Live-Seiten, ${Object.keys(registry).length} Slugs gesamt.`);

if (orphans.length) {
  console.warn(`\n⚠️  ${orphans.length} verwaiste Seite(n) (intern nirgends verlinkt):`);
  orphans.forEach((o) => console.warn(`   • ${o}`));
}

if (warnings.length) {
  console.warn(`\n⚠️  ${warnings.length} Link(s) auf nicht-live Seiten:`);
  warnings.forEach((w) => console.warn(`   • ${w}`));
}

if (errors.length) {
  console.error(`\n❌ ${errors.length} toter/ungültiger interner Link:`);
  errors.forEach((e) => console.error(`   ✗ ${e}`));
  process.exit(1);
}

console.log('\n✅ Alle internen Links lösen sich auf.');

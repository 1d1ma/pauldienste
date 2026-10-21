/**
 * ZENTRALE ARTIKEL-DATENBANK — Quelle der Wahrheit für alle Seiten.
 *
 * Zweck: interne SEO-Verlinkung. Jede neue Seite bekommt HIER einen Eintrag.
 * Interne Links werden ausschliesslich über <InternalLink> gesetzt — damit
 * faellt jeder tote Link beim Build auf (scripts/validate-links.mjs).
 *
 * Header und Footer leiten ihre Navigation aus diesem Register ab: neue Seite
 * eintragen → erscheint automatisch im Menue. Kein zweiter Pflegeort.
 *
 * Konventionen:
 * - `slug` immer mit fuehrendem UND abschliessendem Slash ("/leistungen/").
 * - `status`: "live" | "draft" | "geplant". Geplante Seiten duerfen als
 *   Link-Ziel referenziert werden, ohne den Build zu brechen.
 * - `linksTo`: kuratierte interne Ziele (Silo-Struktur).
 * - `migrationNote`: bekannte To-dos direkt am Eintrag statt in einer
 *   separaten Liste, die niemand liest.
 */

/** Cluster an den jeweiligen Betrieb anpassen. */
export type Cluster =
  | 'startseite'
  | 'reinigung'
  | 'hausmeister'
  | 'handwerk'
  | 'leistung'
  | 'produkt'
  | 'ratgeber'
  | 'referenzen'
  | 'ueber-uns'
  | 'kontakt'
  | 'rechtliches';

export type PageStatus = 'live' | 'draft' | 'geplant';

export interface Page {
  slug: string;
  title: string;
  /** Kurzform fuer Menue, Footer und Kacheln */
  label?: string;
  description?: string;
  h1?: string;
  cluster: Cluster;
  primaryKeyword?: string;
  secondaryKeywords?: string[];
  linksTo?: string[];
  status: PageStatus;
  migrationNote?: string;
}

/* ------------------------------------------------------------------ *
 * SEITEN – Beispieleintraege. Ersetzen, nicht ergaenzen.
 * ------------------------------------------------------------------ */

export const pages: Record<string, Page> = {
  '/': {
    slug: '/',
    title: 'Paul Gebäudedienste Kassel | Reinigung & Innenausbau',
    description:
      'Gebäudereinigung, Renovierung und Hausmeisterservice in Kassel aus einer Hand. Kostenlose Besichtigung, danach Festpreis. Für Privat und Gewerbe.',
    h1: 'Reinigung und Innenausbau aus einer Hand in Kassel',
    cluster: 'startseite',
    primaryKeyword: 'gebäudeservice kassel',
    secondaryKeywords: ['gebäudedienste kassel', 'hausmeisterservice kassel'],
    linksTo: ['/gebaeudereinigung-kassel/', '/handwerker-kassel/', '/hausmeisterservice-kassel/', '/kontakt/'],
    status: 'live',
  },

  /* Bereichsseiten: Kopf, Raster aller Leistungen, die anderen Bereiche */
  '/gebaeudereinigung-kassel/': {
    slug: '/gebaeudereinigung-kassel/',
    title: 'Gebäudereinigung Kassel | Paul Gebäudedienste',
    label: 'Gebäudereinigung',
    description:
      'Gebäudereinigung in Kassel: Fenster, Büro, Grund- und Bauendreinigung, Fassade und Stein. Kostenlose Besichtigung, danach Festpreis.',
    h1: 'Gebäudereinigung in Kassel',
    cluster: 'reinigung',
    primaryKeyword: 'gebäudereinigung kassel',
    linksTo: ['/fensterreinigung-kassel/', '/bueroreinigung-kassel/', '/grundreinigung-kassel/', '/handwerker-kassel/', '/hausmeisterservice-kassel/'],
    status: 'live',
  },
  '/handwerker-kassel/': {
    slug: '/handwerker-kassel/',
    title: 'Innenausbau und Renovierung Kassel | Paul Gebäudedienste',
    label: 'Innenausbau',
    description:
      'Innenausbau in Kassel: Boden verlegen, Streichen, Küchenmontage, Fliegengitter und Plissees nach Maß. Festpreis nach kostenloser Besichtigung.',
    h1: 'Innenausbau und Renovierung in Kassel',
    cluster: 'handwerk',
    primaryKeyword: 'handwerker kassel',
    secondaryKeywords: ['innenausbau kassel', 'renovierung kassel'],
    linksTo: ['/boden-verlegen-kassel/', '/streichen-tapezieren-kassel/', '/gebaeudereinigung-kassel/', '/hausmeisterservice-kassel/'],
    status: 'live',
  },
  '/hausmeisterservice-kassel/': {
    slug: '/hausmeisterservice-kassel/',
    title: 'Hausmeisterservice Kassel | Paul Gebäudedienste',
    label: 'Hausmeisterservice',
    description:
      'Hausmeisterservice in Kassel: Winterdienst, Gartenpflege und Entrümpelung für Privat, Vermieter und Gewerbe. Besichtigung kostenlos, dann Festpreis.',
    h1: 'Hausmeisterservice in Kassel',
    cluster: 'hausmeister',
    primaryKeyword: 'hausmeisterservice kassel',
    linksTo: ['/winterdienst-kassel/', '/gartenpflege-kassel/', '/gebaeudereinigung-kassel/', '/handwerker-kassel/'],
    status: 'live',
  },

  '/kontakt/': {
    slug: '/kontakt/',
    title: 'Kostenlose Besichtigung anfragen',
    label: 'Kontakt',
    cluster: 'kontakt',
    linksTo: [],
    status: 'live',
  },
  '/impressum/': { slug: '/impressum/', title: 'Impressum', cluster: 'rechtliches', linksTo: [], status: 'live' },
  '/datenschutz/': { slug: '/datenschutz/', title: 'Datenschutzerklärung', label: 'Datenschutz', cluster: 'rechtliches', linksTo: [], status: 'live' },
};

/* ------------------------------------------------------------------ *
 * GEPLANTE SEITEN – Leistungsseiten laut PLAN-website.md (Abschnitt 4).
 * Als Link-Ziel erlaubt, noch nicht live. Beim Schreiben der Seite den
 * Eintrag nach `pages` verschieben und status auf 'live' setzen.
 * ------------------------------------------------------------------ */

const geplant = (
  slug: string,
  label: string,
  cluster: Cluster,
  primaryKeyword: string,
  title = label,
): [string, Page] => [slug, { slug, title, label, cluster, primaryKeyword, status: 'geplant' }];

export const plannedPages: Record<string, Page> = Object.fromEntries([
  geplant('/fensterreinigung-kassel/', 'Fensterreinigung', 'reinigung', 'fensterputzer kassel'),
  geplant('/wintergartenreinigung-kassel/', 'Wintergartenreinigung', 'reinigung', 'wintergartenreinigung kassel'),
  geplant('/bueroreinigung-kassel/', 'Büro- und Unterhaltsreinigung', 'reinigung', 'büroreinigung kassel'),
  geplant('/grundreinigung-kassel/', 'Grundreinigung', 'reinigung', 'grundreinigung kassel'),
  geplant('/bauendreinigung-kassel/', 'Bauendreinigung', 'reinigung', 'bauendreinigung kassel'),
  geplant('/fassadenreinigung-kassel/', 'Fassadenreinigung', 'reinigung', 'fassadenreinigung kassel'),
  geplant('/steinreinigung-kassel/', 'Steinreinigung', 'reinigung', 'steinreinigung kassel'),
  geplant('/reinigungsroboter-gewerbe/', 'Reinigungsroboter', 'reinigung', 'reinigungsroboter gewerbe'),
  geplant('/winterdienst-kassel/', 'Winterdienst', 'hausmeister', 'winterdienst kassel'),
  geplant('/entruempelung-kassel/', 'Entrümpelung', 'hausmeister', 'entrümpelung kassel'),
  geplant('/gartenpflege-kassel/', 'Gartenpflege', 'hausmeister', 'gartenpflege kassel'),

  geplant('/boden-verlegen-kassel/', 'Boden verlegen', 'handwerk', 'boden verlegen lassen kassel'),
  geplant('/streichen-tapezieren-kassel/', 'Streichen und Tapezieren', 'handwerk', 'wohnung streichen lassen kassel'),
  geplant('/kuechenmontage-moebelmontage-kassel/', 'Küchen- und Möbelmontage', 'handwerk', 'küchenmontage kassel'),
  geplant('/fliegengitter-kassel/', 'Fliegengitter nach Maß', 'handwerk', 'fliegengitter kassel'),
  geplant('/plissees-kassel/', 'Plissees nach Maß', 'handwerk', 'plissee kassel'),
  geplant('/bodenbelaege-farben-kassel/', 'Bodenbeläge und Farben', 'handwerk', 'bodenbeläge kassel'),

  geplant('/ueber-uns/', 'Über uns', 'ueber-uns', 'paul gebäudedienste'),
]);

/* ------------------------------------------------------------------ *
 * Register + Helper – in der Regel unveraendert uebernehmen.
 * ------------------------------------------------------------------ */

export const registry: Record<string, Page> = { ...pages, ...plannedPages };

/** Navigation darf auch geplante Seiten zeigen (Vorschau vor Livegang). */
export function navByCluster(cluster: Cluster): Page[] {
  return Object.values(registry).filter((p) => p.cluster === cluster);
}

export const ALL_SLUGS = Object.keys(registry);
export const LIVE_SLUGS = Object.keys(pages).filter((s) => pages[s].status === 'live');

export function isKnownSlug(slug: string): boolean {
  return slug in registry;
}

/** Seite holen oder Fehler werfen – der Build bricht bei Tippfehlern ab. */
export function getPage(slug: string): Page {
  const page = registry[slug];
  if (!page) {
    throw new Error(
      `[pages] Unbekannter Slug "${slug}". Neue Seite? Erst in src/data/pages.ts eintragen.`,
    );
  }
  return page;
}

/** href + Titel für einen internen Link. Wirft bei unbekanntem Slug. */
export function internalLink(slug: string): { href: string; title: string; planned: boolean } {
  const page = getPage(slug);
  return { href: page.slug, title: page.title, planned: page.status !== 'live' };
}

/** Seiten eines Clusters (nur live) – z. B. für Navigations-Dropdowns. */
export function pagesByCluster(cluster: Cluster): Page[] {
  return LIVE_SLUGS.map((s) => pages[s]).filter((p) => p.cluster === cluster);
}

/** Kuratierte verwandte Seiten (nur live) für "Passende Themen"-Blöcke. */
export function relatedPages(slug: string): Page[] {
  const page = getPage(slug);
  return (page.linksTo ?? [])
    .filter((s) => registry[s]?.status === 'live')
    .map((s) => registry[s]);
}

/** Keyword → Slug: Vorschläge für interne Anker beim Schreiben neuer Texte. */
export function keywordIndex(): Array<{ keyword: string; slug: string }> {
  const out: Array<{ keyword: string; slug: string }> = [];
  for (const p of Object.values(pages)) {
    if (p.primaryKeyword) out.push({ keyword: p.primaryKeyword.toLowerCase(), slug: p.slug });
    for (const kw of p.secondaryKeywords ?? []) out.push({ keyword: kw.toLowerCase(), slug: p.slug });
  }
  return out;
}

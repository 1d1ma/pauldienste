/**
 * BILDHERKUNFT – wo jedes Motiv herkommt und wie es gekennzeichnet wird.
 *
 * Zweck, in dieser Reihenfolge:
 *
 *  1. NACHWEIS. Im Streitfall ist eine gepflegte Liste der Unterschied
 *     zwischen "wir haben ein System" und "keine Ahnung, ist gewachsen".
 *  2. AUTOMATIK. Die sichtbare Kennzeichnung wird aus der Herkunft
 *     ABGELEITET, nicht von Hand gesetzt. Wer ein fremdes Bild einbaut und
 *     hier einträgt, bekommt das Label geschenkt; wer es vergisst, wird von
 *     `scripts/pruefe-qualitaet.mjs` daran erinnert.
 *
 * WARUM ZWEI RECHTSGRUENDE, die nicht dasselbe sind:
 *
 *  - § 5 UWG (gilt seit jeher): Ein Bild, das der Besucher fuer eine eigene
 *    Arbeit haelt, obwohl es keine ist, taeuscht ueber ein wesentliches
 *    Merkmal. Das trifft Stockfotos genauso wie KI-Bilder. Antwort:
 *    "Symbolbild".
 *  - KI-VO Art. 50 Abs. 4 (anwendbar ab 2. August 2026): Fotorealistische
 *    KI-Inhalte, die wirklichen Personen, Gegenstaenden oder ORTEN aehneln
 *    und als echt durchgehen wuerden, sind als kuenstlich erzeugt
 *    offenzulegen. Antwort: der Zusatz "KI-generiert".
 *
 * Die Kennzeichnung folgt also der HERKUNFT, nicht der Technik.
 *
 * FAUSTREGEL fuer die Frage, ob ueberhaupt gekennzeichnet werden muss: Nicht
 * "wurde KI benutzt", sondern "behauptet das Bild eine Tatsache, die nicht
 * stimmt". Ein Portraet mit generiertem Studiohintergrund behauptet nur
 * "so sehe ich aus", und das stimmt. Firmenfahrzeuge vor einem erkennbaren
 * Wahrzeichen behaupten "wir waren dort", und das stimmt nicht.
 */
import type { ImageMetadata } from 'astro';

// TODO: Nur die FREMDEN Bilder importieren. Eigene Aufnahmen kommen hier
// nicht vor – was fehlt, gilt als eigenes Motiv.
// import stockMonteur from '../assets/images/stock-monteur.jpg';
// import symbolbildHaus from '../assets/images/symbolbild-haus.png';

export type Herkunft =
  /** Eigene Aufnahme des Betriebs. Braucht keine Kennzeichnung. */
  | 'eigen'
  /** Gekauftes oder lizenziertes Stockfoto. Zeigt fremde Arbeit. */
  | 'stock'
  /** Produktabbildung eines Herstellers oder Lieferanten. */
  | 'hersteller'
  /** Ganz oder teilweise von einer KI erzeugt. */
  | 'ki';

export interface Bildnachweis {
  herkunft: Herkunft;
  /** Anbieter, Lieferant oder Werkzeug. Fuer den Nachweis, nicht fuer die Seite. */
  quelle?: string;
  /** ISO-Datum der Erzeugung oder Lizenzierung. */
  stand?: string;
  /**
   * Sichtbaren Hinweis unterdruecken.
   *
   * Nur fuer Motive, bei denen das Bild keine Tatsache ueber den Betrieb
   * behauptet. Der Eintrag bleibt in der Liste, damit der Nachweis
   * vollstaendig ist – nur das Label am Bild entfaellt.
   */
  ohneHinweis?: true;
  notiz?: string;
}

/**
 * NUR DIE AUSNAHMEN. Alles, was hier nicht steht, gilt als eigene Aufnahme.
 *
 * Der Schluessel ist das importierte Bild selbst, nicht sein Dateiname:
 * So faellt beim Umbenennen der Build auf, statt dass die Kennzeichnung
 * still verschwindet.
 *
 * NAMENSKONVENTION fuer fremde Dateien, damit die Pruefung greift:
 *   stock-*      gekauftes Stockfoto
 *   produkt-*    Herstellerabbildung
 *   symbolbild-* / ki-*   KI-erzeugt
 */
export const bildherkunft = new Map<ImageMetadata, Bildnachweis>([
  // [stockMonteur, { herkunft: 'stock', quelle: 'TODO Anbieter' }],
  // [symbolbildHaus, { herkunft: 'ki', stand: 'TODO JJJJ-MM-TT', quelle: 'TODO Werkzeug' }],
]);

/** Wortlaut je Herkunft. Jeder einzelne ist woertlich zutreffend. */
const HINWEIS: Record<Herkunft, string | null> = {
  eigen: null,
  stock: 'Symbolbild',
  hersteller: 'Herstellerabbildung',
  ki: 'Symbolbild, KI-generiert',
};

/**
 * Der sichtbare Hinweis zu einem Bild, oder `undefined`.
 *
 * Komponenten rufen das SELBST auf, statt den Hinweis als Prop zu erwarten.
 * Eine Kennzeichnung, an die man denken muss, wird irgendwann vergessen.
 */
export function bildHinweis(bild?: ImageMetadata): string | undefined {
  if (!bild) return undefined;
  const nachweis = bildherkunft.get(bild);
  if (!nachweis || nachweis.ohneHinweis) return undefined;
  return HINWEIS[nachweis.herkunft] ?? undefined;
}

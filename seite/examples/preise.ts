/**
 * Typisierter Zugriff auf preise.json. ALLE Preisausgaben laufen hierüber –
 * Tabellen wie Fließtext. Keine Zahl darf im Content hartkodiert werden.
 */
import data from './preise.json';

export type MaterialKey = 'kunststoff' | 'aluminium' | 'holz' | 'holz_alu';
export type WidthKey = '2m' | '3m' | '4m' | '5m' | '6m';

export const WIDTHS: WidthKey[] = ['2m', '3m', '4m', '5m', '6m'];

export const MATERIAL_LABELS: Record<MaterialKey, string> = {
  kunststoff: 'Kunststoff',
  aluminium: 'Aluminium',
  holz: 'Holz',
  holz_alu: 'Holz-Alu',
};

export const WIDTH_LABELS: Record<WidthKey, string> = {
  '2m': '2 m',
  '3m': '3 m',
  '4m': '4 m',
  '5m': '5 m',
  '6m': '6 m',
};

const euro = new Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
});

/** Formatiert einen Betrag als "3.560 €". */
export function formatPrice(value: number): string {
  return euro.format(value);
}

/** Preis oder null, wenn diese Kombination nicht angeboten wird. */
export function getPrice(material: MaterialKey, width: WidthKey): number | null {
  const m = data.materialien[material] as Record<string, unknown>;
  const v = m?.[width];
  return typeof v === 'number' ? v : null;
}

/** "ab 3.560 €" – oder null, wenn kein Preis hinterlegt ist. */
export function abPrice(material: MaterialKey, width: WidthKey): string | null {
  const v = getPrice(material, width);
  return v === null ? null : `ab ${formatPrice(v)}`;
}

/** Günstigster Preis einer Breite über alle Materialien (für "ab"-Anker). */
export function cheapestForWidth(width: WidthKey): { material: MaterialKey; price: number } | null {
  let best: { material: MaterialKey; price: number } | null = null;
  for (const material of Object.keys(MATERIAL_LABELS) as MaterialKey[]) {
    const p = getPrice(material, width);
    if (p !== null && (best === null || p < best.price)) best = { material, price: p };
  }
  return best;
}

/**
 * Günstigste Kombination über ALLE Materialien und Breiten.
 * Grundlage für jeden "ab"-Preis auf der Seite: Ein "ab"-Preis muss dem
 * niedrigsten tatsächlich erhältlichen Preis entsprechen – sonst ist die
 * Angabe irreführend. Sobald eine kleinere Breite (2 m) hinterlegt wird,
 * zieht der Anker automatisch nach.
 */
export function cheapestOverall(): { material: MaterialKey; width: WidthKey; price: number } | null {
  let best: { material: MaterialKey; width: WidthKey; price: number } | null = null;
  for (const material of Object.keys(MATERIAL_LABELS) as MaterialKey[]) {
    for (const width of WIDTHS) {
      const p = getPrice(material, width);
      if (p !== null && (best === null || p < best.price)) best = { material, width, price: p };
    }
  }
  return best;
}

/** Breiten, für die ein Material überhaupt lieferbar ist. */
export function availableWidths(material: MaterialKey): WidthKey[] {
  return WIDTHS.filter((w) => getPrice(material, w) !== null);
}

/** Materialhinweis (z. B. "max. ~5510 mm – kein 6-m-Format"). */
export function materialHint(material: MaterialKey): string | null {
  const m = data.materialien[material] as Record<string, unknown>;
  return typeof m?.hinweis === 'string' ? m.hinweis : null;
}

export const montage = data.montage;
export const preisMeta = data._meta;

/** Montagespanne als Text: "800 – 1.400 €". */
export function montageRange(): string {
  return `${formatPrice(montage.min)} – ${formatPrice(montage.max)}`;
}

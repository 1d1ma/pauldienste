/**
 * Gravur: Helfer fuer die Kupferstich-Zeichnungen (Footer-Panorama,
 * Bereichs-Vignetten). Alles wird beim Build berechnet, im Browser landet
 * nur fertiges SVG. Zufall ist geseedet, damit jeder Build gleich aussieht.
 */

/** Geseedeter Zufall (mulberry32). */
export function zufall(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Zahl auf eine Nachkommastelle, haelt die Pfade klein. */
export const n = (v: number) => Math.round(v * 10) / 10;

/** Weiche Welle aus drei Sinus-Anteilen, fuer handgezogene Linien. */
export function welle(r: () => number, amp = 1) {
  const p = [r() * 6.28, r() * 6.28, r() * 6.28];
  return (x: number) =>
    amp * (Math.sin(x * 0.013 + p[0]) + 0.5 * Math.sin(x * 0.041 + p[1]) + 0.25 * Math.sin(x * 0.11 + p[2]));
}

/** Punktliste als offener Pfad. */
export function linie(pts: Array<[number, number]>): string {
  if (pts.length < 2) return '';
  return 'M' + pts.map(([x, y]) => `${n(x)} ${n(y)}`).join('L');
}

/**
 * Parallele Schraffur ueber ein Rechteck, im Winkel `grad` (0 = waagerecht).
 * Die Form selbst schneidet ein clipPath zu. `zittern` versetzt jede Linie
 * leicht, damit es nicht nach Lineal aussieht.
 */
export function schraffur(
  x: number, y: number, w: number, h: number,
  abstand: number, grad = 45, r?: () => number, zittern = 0,
): string {
  const rad = (grad * Math.PI) / 180;
  const cx = x + w / 2, cy = y + h / 2;
  const len = Math.hypot(w, h);
  const dx = Math.cos(rad), dy = Math.sin(rad);
  const nx = -dy, ny = dx;
  const out: string[] = [];
  for (let o = -len / 2; o <= len / 2; o += abstand) {
    const j = r ? (r() - 0.5) * zittern : 0;
    const ox = cx + nx * (o + j), oy = cy + ny * (o + j);
    out.push(`M${n(ox - dx * len / 2)} ${n(oy - dy * len / 2)}L${n(ox + dx * len / 2)} ${n(oy + dy * len / 2)}`);
  }
  return out.join('');
}

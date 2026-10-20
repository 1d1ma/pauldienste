/**
 * funnelTracking – Schritt-Tracking für mehrstufige Anfrageformulare.
 *
 * ZWECK: sichtbar machen, wie weit Besucher im Funnel kommen und wo sie
 * abbrechen. Die Abbruchquote ergibt sich aus der Differenz aufeinander
 * folgender Schritt-Ereignisse (Schritt 1: 400, Schritt 2: 310 → 23 % Absprung).
 *
 * WARUM EIN MODUL MIT AUSTAUSCHBAREN ZIELEN ("sinks"):
 * Die Arbeit steckt im Instrumentieren, nicht im Backend. Dieselben Ereignisse
 * gehen heute an Plausible und später zusätzlich an ein eigenes Cockpit, ohne
 * dass das Formular angefasst werden muss. Damit ist das Modul auch in anderen
 * Projekten wiederverwendbar.
 *
 * DATENSCHUTZ: Der Plausible-Weg ist cookiefrei und speichert nichts im
 * Browser – deshalb kein Consent-Banner nötig. Erst der optionale
 * `endpointSink` (eigenes Cockpit) erzeugt eine Sitzungskennung und braucht
 * eine eigene datenschutzrechtliche Bewertung.
 *
 *   const track = initFunnelTracking({ steps: ['Projekt', 'Material', ...] });
 *   track.step(0);        // beim Anzeigen eines Schritts (0-basiert)
 *   track.conversion();   // beim erfolgreichen Absenden
 */

/** Ein Ziel, an das Ereignisse gemeldet werden. */
export interface FunnelSink {
  /** Schritt erreicht. `index` ist 0-basiert, `label` der Klarname. */
  step(index: number, label: string, eventName: string): void;
  /** Formular erfolgreich abgesendet. */
  conversion(eventName: string): void;
}

export interface FunnelTrackingOptions {
  /** Klarnamen der Schritte in Reihenfolge, z. B. ['Projekt', 'Material']. */
  steps: string[];
  /**
   * Präfix der Ereignisnamen. Ergibt z. B. "Funnel Schritt 1 Projekt".
   * In Plausible müssen die Namen als Ziele angelegt werden (siehe README
   * bzw. `goalNames()`).
   */
  prefix?: string;
  /** Name des Conversion-Ziels. Muss zum bereits angelegten Ziel passen. */
  conversionEvent?: string;
  /** Ziele. Standard: nur Plausible. */
  sinks?: FunnelSink[];
}

export interface FunnelTracker {
  step(index: number): void;
  conversion(): void;
  /** Alle Ereignisnamen – praktisch zum Anlegen der Ziele in Plausible. */
  goalNames(): string[];
}

/** Plausible-Ziel: feuert benannte Custom Events, ohne Custom Properties. */
export function plausibleSink(): FunnelSink {
  // Bewusst OHNE `props`: Custom Properties sind in der Plausible Community
  // Edition nicht verfügbar. Reine Ereignisnamen funktionieren überall.
  const feuere = (name: string) => {
    (window as unknown as { plausible?: (n: string) => void }).plausible?.(name);
  };
  return {
    step: (_i, _l, eventName) => feuere(eventName),
    conversion: (eventName) => feuere(eventName),
  };
}

/**
 * Eigenes Ziel für das spätere Cockpit: schickt die Ereignisse an einen
 * Endpunkt (nur schreibend). Erzeugt eine Sitzungskennung, damit einzelne
 * Journeys rekonstruierbar sind – deshalb erst mit Datenschutz-Prüfung
 * einsetzen.
 *
 * NOCH NICHT AKTIV: erst einschalten, wenn der Cockpit-Endpunkt steht.
 */
export function endpointSink(url: string): FunnelSink {
  const sid = sitzungsId();
  const senden = (nutzlast: Record<string, unknown>) => {
    const body = JSON.stringify({ sid, ts: Date.now(), ...nutzlast });
    // sendBeacon überlebt den Seitenwechsel; fetch als Rückfallebene.
    if (navigator.sendBeacon) {
      navigator.sendBeacon(url, new Blob([body], { type: 'application/json' }));
    } else {
      fetch(url, { method: 'POST', body, keepalive: true }).catch(() => {});
    }
  };
  return {
    step: (index, label) => senden({ typ: 'step', index, label }),
    conversion: () => senden({ typ: 'conversion' }),
  };
}

function sitzungsId(): string {
  const key = 'funnel_sid';
  try {
    let v = sessionStorage.getItem(key);
    if (!v) {
      v = (crypto?.randomUUID?.() ?? String(Math.random()).slice(2)) as string;
      sessionStorage.setItem(key, v);
    }
    return v;
  } catch {
    // Privater Modus / Storage gesperrt: ohne Kennung weitermachen.
    return 'ohne-sitzung';
  }
}

export function initFunnelTracking(opts: FunnelTrackingOptions): FunnelTracker {
  const {
    steps,
    prefix = 'Funnel Schritt',
    conversionEvent = 'Anfrage abgesendet',
    sinks = [plausibleSink()],
  } = opts;

  const eventName = (i: number) => `${prefix} ${i + 1} ${steps[i] ?? ''}`.trim();

  // Jeder Schritt zählt nur EINMAL pro Seitenaufruf. Ohne diese Sperre würde
  // Zurück-und-wieder-vor die Zahlen aufblähen und die Abbruchquote verfälschen.
  const gefeuert = new Set<number>();
  let konvertiert = false;

  return {
    step(index: number) {
      if (index < 0 || index >= steps.length || gefeuert.has(index)) return;
      gefeuert.add(index);
      const name = eventName(index);
      for (const s of sinks) {
        try {
          s.step(index, steps[index], name);
        } catch {
          /* Tracking darf das Formular nie blockieren. */
        }
      }
    },
    conversion() {
      if (konvertiert) return;
      konvertiert = true;
      for (const s of sinks) {
        try {
          s.conversion(conversionEvent);
        } catch {
          /* siehe oben */
        }
      }
    },
    goalNames() {
      return [...steps.map((_, i) => eventName(i)), conversionEvent];
    },
  };
}

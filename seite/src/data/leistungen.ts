/**
 * Leistungen und Bereiche: eine Quelle fuer Megamenue, Startseite und
 * Grundriss. Slugs muessen in pages.ts stehen (der Build bricht sonst).
 */
import type { IconName } from '../lib/icons';

export interface Leistung {
  slug: string;
  icon: IconName;
  kurz: string;
}

export const leistung: Record<string, Leistung> = Object.fromEntries(
  (
    [
      ['/fensterreinigung-kassel/', 'squares-four', 'Fenster, Glas und Rahmen, privat und gewerblich.'],
      ['/wintergartenreinigung-kassel/', 'sun-horizon', 'Glasdach, Rahmen und Dichtungen.'],
      ['/bueroreinigung-kassel/', 'building-office', 'Regelmäßig für Büros, Praxen und Treppenhäuser.'],
      ['/grundreinigung-kassel/', 'broom', 'Vor dem Einzug, nach dem Auszug, zum Frühjahrsputz.'],
      ['/bauendreinigung-kassel/', 'sparkle', 'Baustaub und Farbreste weg vor der Übergabe.'],
      ['/reinigungsroboter-gewerbe/', 'robot', 'Für große Bodenflächen im Gewerbe.'],
      ['/entruempelung-kassel/', 'trash', 'Wohnung, Keller und Garage räumen.'],
      ['/fassadenreinigung-kassel/', 'house-line', 'Algen und Grünbelag von Putz und Klinker.'],
      ['/steinreinigung-kassel/', 'checkerboard', 'Pflaster, Terrasse und Einfahrt.'],
      ['/winterdienst-kassel/', 'snowflake', 'Schneeräumen und Streuen für Vermieter und Gewerbe.'],
      ['/gartenpflege-kassel/', 'plant', 'Gartenarbeiten rund ums Haus.'],
      ['/boden-verlegen-kassel/', 'rows', 'Laminat, Vinyl und Teppich.'],
      ['/streichen-tapezieren-kassel/', 'paint-roller', 'Wände und Decken bei Renovierung und Auszug.'],
      ['/bodenbelaege-farben-kassel/', 'stack', 'Vinyl, Teppich und Farben. Ausstellung nach Termin.'],
      ['/kuechenmontage-moebelmontage-kassel/', 'cooking-pot', 'Küchen und Möbel aufbauen, auch aus dem Möbelhaus.'],
      ['/fliegengitter-kassel/', 'grid-four', 'Nach Maß mit Aufmaß und Montage.'],
      ['/plissees-kassel/', 'columns', 'Sicht- und Sonnenschutz nach Maß.'],
    ] as const
  ).map(([slug, icon, kurz]) => [slug, { slug, icon, kurz }]),
);

export interface Bereich {
  id: 'reinigung' | 'handwerk' | 'hausmeister';
  icon: IconName;
  kurz: string;
  label: string;
  start: string;
  intro: string;
  gruppen: Array<{ titel: string; slugs: string[] }>;
}

export const bereiche: Bereich[] = [
  {
    id: 'reinigung',
    label: 'Gebäudereinigung',
    icon: 'sparkle',
    kurz: 'Fenster, Büro, Grund- und Bauendreinigung, Fassade, Stein',
    start: '/gebaeudereinigung-kassel/',
    intro: 'Sauber von der Fensterscheibe bis zur Fassade, für Haushalte, Büros und Hausverwaltungen.',
    gruppen: [
      { titel: 'Fenster und Glas', slugs: ['/fensterreinigung-kassel/', '/wintergartenreinigung-kassel/'] },
      {
        titel: 'Räume und Gebäude',
        slugs: ['/bueroreinigung-kassel/', '/grundreinigung-kassel/', '/bauendreinigung-kassel/', '/reinigungsroboter-gewerbe/'],
      },
      { titel: 'Außen', slugs: ['/fassadenreinigung-kassel/', '/steinreinigung-kassel/'] },
    ],
  },
  {
    id: 'handwerk',
    label: 'Innenausbau',
    icon: 'paint-roller',
    kurz: 'Boden, Streichen, Küchenmontage, Fliegengitter, Plissees',
    start: '/handwerker-kassel/',
    intro: 'Böden verlegen, Wände streichen, Küchen aufbauen: Wir machen Ihre Räume fertig.',
    gruppen: [
      {
        titel: 'Boden und Wand',
        slugs: ['/boden-verlegen-kassel/', '/streichen-tapezieren-kassel/', '/bodenbelaege-farben-kassel/'],
      },
      {
        titel: 'Montage und Sonnenschutz',
        slugs: ['/kuechenmontage-moebelmontage-kassel/', '/fliegengitter-kassel/', '/plissees-kassel/'],
      },
    ],
  },
  {
    id: 'hausmeister',
    label: 'Hausmeisterservice',
    icon: 'key',
    kurz: 'Winterdienst, Gartenpflege, Entrümpelung',
    start: '/hausmeisterservice-kassel/',
    intro: 'Alles rund ums Objekt: Wir räumen, pflegen und halten Haus und Grundstück in Schuss.',
    gruppen: [
      {
        titel: 'Haus und Grundstück',
        slugs: ['/winterdienst-kassel/', '/gartenpflege-kassel/', '/entruempelung-kassel/'],
      },
    ],
  },
];

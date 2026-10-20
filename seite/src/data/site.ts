/**
 * Seitenweite Konstanten. Alles, was an mehreren Stellen auftaucht, steht
 * HIER – nicht verstreut in Komponenten. Wechselt der Betrieb Rufnummer,
 * Anbieter oder Firmierung, ist das genau eine Datei.
 *
 * NEUES PROJEKT: diese Datei zuerst ausfuellen, alle TODO ersetzen.
 */

/**
 * Branche → schema.org-Typ.
 * Der Typ entscheidet, wie Suchmaschinen und KI-Systeme den Betrieb einordnen.
 * Alle Werte sind Unterklassen von LocalBusiness.
 * Weitere Typen: https://schema.org/LocalBusiness
 */
export const BRANCHEN_SCHEMA = {
  handwerk: 'HomeAndConstructionBusiness',
  dachdecker: 'RoofingContractor',
  elektriker: 'Electrician',
  sanitaer: 'Plumber',
  maler: 'HousePainter',
  garten: 'Landscaper',
  umzug: 'MovingCompany',

  // Gesundheit – VOR dem Texten references/branchen.md lesen
  // (Heilmittelwerbegesetz, YMYL/E-E-A-T)
  physiotherapie: 'Physiotherapy',
  zahnarzt: 'Dentist',
  arztpraxis: 'MedicalClinic',
  heilpraktiker: 'MedicalBusiness',
  apotheke: 'Pharmacy',

  // Beratung
  kanzlei: 'Attorney',
  steuerberatung: 'AccountingService',
  versicherung: 'InsuranceAgency',
  immobilien: 'RealEstateAgent',

  // Persoenliche Dienstleistung
  friseur: 'HairSalon',
  kosmetik: 'BeautySalon',
  fitness: 'HealthClub',
  fahrschule: 'DrivingSchool',
  restaurant: 'Restaurant',
} as const;

export type Branche = keyof typeof BRANCHEN_SCHEMA;

export const site = {
  name: 'Paul Gebäudedienste',
  legalName: 'Paul Nagel (Einzelunternehmer)',
  url: 'https://pauldienste.de',
  branche: 'handwerk' as Branche,
  kurzbeschreibung:
    'Paul Gebäudedienste in Kassel: Gebäudereinigung, Hausmeisterservice und Handwerk aus einer Hand, für Privat und Gewerbe.',

  angebotUrl: '/kontakt/',
  ctaLabel: 'Kostenlose Besichtigung anfragen',

  /** Slogan: noch nicht freigegeben, eine Variable. */
  slogan: 'Reinigung und Handwerk aus einer Hand',

  plausibleDomain: 'pauldienste.de',
  plausibleSrc: '',

  kontakt: {
    telefon: '+4915566028476',
    telefonAnzeige: '0155 66028476',
    email: 'info@pauldienste.de',
    strasse: 'Kasseler Str. 5',
    plz: '34355',
    ort: 'Staufenberg',
    land: 'DE',
  },

  einzugsgebiet: ['DE'] as string[],
  vorOrtGebiet: '30 km um Kassel, größere Aufträge bis 50 km',

  oeffnungszeiten: [
    { tage: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], von: '08:00', bis: '17:00' },
  ] as Array<{ tage: string[]; von: string; bis: string }>,
} as const;

/** schema.org-Typ des Betriebs, abgeleitet aus `branche`. */
export const schemaTyp = BRANCHEN_SCHEMA[site.branche];

/**
 * Bewertungs-Widget (optional, z. B. BewertungsFlow, Provenexpert, Trustindex).
 * Laedt ein Script eines Drittanbieters und uebertraegt damit die Besucher-IP
 * → gehoert in die Datenschutzerklaerung.
 * Leer lassen = Reviews.astro zeigt eine statische Rueckfallebene.
 */
export const bewertungen = {
  scriptUrl: '',
  token: '',
  theme: 'light',
} as const;

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
 * Google-Bewertungen, woertlich aus dem Google-Unternehmensprofil uebernommen
 * (Stand 20.10.2026: 22 Bewertungen, 4,9 von 5). Namen gekuerzt (Vorname und
 * Initial). Einzelne Sterne stehen nicht dabei, weil sie nicht vorliegen.
 * `echt: false` nimmt Leiste und Badge aus dem Build.
 * profilUrl: Link zum Google-Profil, sobald bekannt.
 */
export const bewertungen = {
  echt: true,
  schnitt: 4.9,
  anzahl: 22,
  profilUrl: '',
  liste: [
    { name: 'Pauline B.', text: 'Herr Nagel hat bei uns im Haus heute die Fenster geputzt. Wir sind mit seiner Arbeit sehr zufrieden. Er war pünktlich, hat alles sauber hinterlassen und war preislich super fair. Die Fenster sehen wieder perfekt aus, und all das super flink ausgeführt.' },
    { name: 'Bettina S.', text: 'Sehr zuverlässig, sympathisch und gründlich. Wintergarten, Fenster und Vordach funkeln. Wir sind sehr zufrieden.' },
    { name: 'Steffanie R.', text: 'Alles immer super ordentlich, sauber, absolut zuverlässig und wirklich nett. Immer wieder gern :)' },
    { name: 'Alex', text: 'Tolle Arbeit, super Preise. Die Termine wurden eingehalten. Herr Nagel ist sehr kompetent und freundlich. Nochmal vielen Dank.' },
    { name: 'Agnes M.', text: 'Von der ersten Kontaktaufnahme über die Erstellung des Kostenvoranschlags bis zum ersten Termin zur Grundreinigung: Ich bin sehr zufrieden mit Paul Gebäudedienste. Die Reinigung von Fenstern und Balkontüren geschah gründlich und flink. Glänzend saubere Fenster waren das Resultat.' },
    { name: 'Sabine F.', text: 'Wir waren und sind immer sehr zufrieden mit dem Service von Paul! Zuverlässig, pünktlich, und immer sehr freundlich!' },
    { name: 'Heike S.', text: 'Sehr zuverlässig, schnell und vor allem sauber und ordentlich- perfekt!' },
    { name: 'Buffy B.', text: 'Sehr gute Leistung, endlich wieder klare Sicht! Wird in Zukunft wieder gerne beauftragt.' },
    { name: 'Gudrun S.', text: 'Die Mitarbeiter waren pünktlich, sehr freundlich und haben sehr gute Arbeit abgeliefert.' },
    { name: 'Michael H.', text: 'Sehr gute Arbeit ein sehr zuverlässiger und super Service, kann ich nur empfehlen. Top / Danke' },
  ],
};

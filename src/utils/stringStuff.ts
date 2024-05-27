const STATES = [
  'AL',
  'AK',
  'AZ',
  'AR',
  'CA',
  'CO',
  'CT',
  'DE',
  'FL',
  'GA',
  'HI',
  'ID',
  'IL',
  'IN',
  'IA',
  'KS',
  'KY',
  'LA',
  'ME',
  'MD',
  'MA',
  'MI',
  'MN',
  'MS',
  'MO',
  'MT',
  'NE',
  'NV',
  'NH',
  'NJ',
  'NM',
  'NY',
  'NC',
  'ND',
  'OH',
  'OK',
  'OR',
  'PA',
  'PR',
  'RI',
  'SC',
  'SD',
  'TN',
  'TX',
  'UT',
  'VT',
  'VA',
  'VI',
  'WA',
  'WV',
  'WI',
  'WY',
] as const;

type STATE = (typeof STATES)[number];

export function capitalize(str: string): string {
  str = str
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
  return str;
}

export function formatLocationStr(location: string): string {
  const segments = location.split(',');
  const city = capitalize(segments[0]);

  if (segments.length < 2) {
    return city;
  }

  const state = segments[1].replace(' ', '').toUpperCase();

  if (STATES.includes(state as STATE)) {
    return `${city},${state},us`;
  }

  return `${city},${state}`;
}

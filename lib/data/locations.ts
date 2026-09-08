/**
 * Standard Locations & Areas Served Data
 * Main Location: Nairobi, Kenya
 * Full Coverage: Kenya (all 47 Counties), USA (top states), UK (cities & counties)
 * Primary Title: Website Developer & SEO Expert
 */

export const MAIN_LOCATION = 'Nairobi, Kenya'
export const PROFESSION_TITLE = 'Website Developer & SEO Expert'

// All 47 Counties of the Republic of Kenya
export const KENYA_COUNTIES = [
  'Mombasa',
  'Kwale',
  'Kilifi',
  'Tana River',
  'Lamu',
  'Taita-Taveta',
  'Garissa',
  'Wajir',
  'Mandera',
  'Marsabit',
  'Isiolo',
  'Meru',
  'Tharaka-Nithi',
  'Embu',
  'Kitui',
  'Machakos',
  'Makueni',
  'Nyandarua',
  'Nyeri',
  'Kirinyaga',
  "Murang'a",
  'Kiambu',
  'Turkana',
  'West Pokot',
  'Samburu',
  'Trans-Nzoia',
  'Uasin Gishu',
  'Elgeyo-Marakwet',
  'Nandi',
  'Baringo',
  'Laikipia',
  'Nakuru',
  'Narok',
  'Kajiado',
  'Kericho',
  'Bomet',
  'Kakamega',
  'Vihiga',
  'Bungoma',
  'Busia',
  'Siaya',
  'Kisumu',
  'Homa Bay',
  'Migori',
  'Kisii',
  'Nyamira',
  'Nairobi',
] as const

// Top States and Major Metros in the United States
export const USA_TOP_STATES = [
  'California',
  'New York',
  'Texas',
  'Florida',
  'Washington',
  'Illinois',
  'Massachusetts',
  'Colorado',
  'Georgia',
  'North Carolina',
  'Virginia',
  'Pennsylvania',
  'Ohio',
  'Michigan',
  'New Jersey',
  'Arizona',
  'Oregon',
  'Utah',
  'Nevada',
  'Maryland',
  'Minnesota',
  'Tennessee',
  'Indiana',
  'District of Columbia',
] as const

// Top Cities & Counties in the United Kingdom
export const UK_CITIES_AND_COUNTIES = [
  'London',
  'Manchester',
  'Birmingham',
  'Leeds',
  'Glasgow',
  'Edinburgh',
  'Bristol',
  'Liverpool',
  'Newcastle upon Tyne',
  'Sheffield',
  'Cambridge',
  'Oxford',
  'Cardiff',
  'Belfast',
  'Nottingham',
  'Southampton',
  'Brighton',
  'Greater London',
  'Greater Manchester',
  'West Midlands',
  'West Yorkshire',
  'Surrey',
  'Hampshire',
  'Kent',
  'Essex',
  'Cambridgeshire',
  'Oxfordshire',
] as const

// Schema.org areaServed entities format for Google and search crawlers
export function getSchemaAreasServed() {
  return [
    {
      '@type': 'City',
      name: 'Nairobi',
      containedInPlace: {
        '@type': 'Country',
        name: 'Kenya',
      },
    },
    {
      '@type': 'Country',
      name: 'Kenya',
      description: 'Nationwide coverage across all 47 counties of Kenya',
    },
    ...KENYA_COUNTIES.map((county) => ({
      '@type': 'AdministrativeArea',
      name: `${county} County`,
      containedInPlace: {
        '@type': 'Country',
        name: 'Kenya',
      },
    })),
    {
      '@type': 'Country',
      name: 'United States',
      alternateName: 'USA',
    },
    ...USA_TOP_STATES.map((state) => ({
      '@type': 'AdministrativeArea',
      name: state,
      containedInPlace: {
        '@type': 'Country',
        name: 'United States',
      },
    })),
    {
      '@type': 'Country',
      name: 'United Kingdom',
      alternateName: 'UK',
    },
    ...UK_CITIES_AND_COUNTIES.map((loc) => ({
      '@type': 'AdministrativeArea',
      name: loc,
      containedInPlace: {
        '@type': 'Country',
        name: 'United Kingdom',
      },
    })),
  ]
}

// Compact string summary of all locations
export const ALL_AREAS_SERVED_SUMMARY = [
  'Nairobi, Kenya (Headquarters)',
  'Kenya (All 47 Counties)',
  'United States (Nationwide & Top Tech Hubs)',
  'United Kingdom (London & Major Cities)',
  'Worldwide (Remote Engineering & Consulting)',
]

// Keywords formatted for high-ranking local & international SEO
export const LOCAL_SEO_KEYWORDS = [
  'Website Developer Nairobi',
  'SEO Expert Nairobi Kenya',
  'Web Developer Kenya 47 Counties',
  'Website Designer Nairobi',
  'Next.js Developer Kenya',
  'Full Stack Engineer Nairobi',
  'Website Developer USA',
  'SEO Expert USA',
  'Website Developer UK',
  'SEO Consultant London',
  'WordPress to Next.js Migration Kenya',
  'E-commerce Developer Kenya USA UK',
].join(', ')

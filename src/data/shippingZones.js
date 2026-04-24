// src/data/shippingZones.js

export const SHIPPING_ZONES = [
  {
    name: 'Texas & Nearby',
    zipPrefixes: [
      '75','76','77','78','79', // TX
      '73','74',               // OK
      '87','88',               // NM
      '66','67'                // KS
    ],
    rate: 6.99
  },
  {
    name: 'Central US',
    zipPrefixes: [
      '60','61','62','63','64','65', // IL / MO
      '50','51','52','53',           // IA
      '68','69',                     // NE
      '70','71','72'                 // AR / LA
    ],
    rate: 7.99
  },
  {
    name: 'East & West Coast',
    zipPrefixes: [
      '90','91','92','93','94','95','96', // CA
      '97','98',                           // WA / OR
      '10','11','12','13','14','15','16','17','18','19', // East Coast
      '20','21','22','23','24','25','26','27'
    ],
    rate: 8.99
  },
  {
    name: 'Alaska & Hawaii',
    zipPrefixes: ['99','96'],
    rate: 9.99
  }
]

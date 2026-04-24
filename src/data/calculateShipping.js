// src/data/calculateShipping.js
import { SHIPPING_ZONES } from './shippingZones'

export function calculateShippingFromZip(zip) {
  if (!zip || zip.length < 2) return 0

  const prefix = zip.substring(0, 2)

  const zone = SHIPPING_ZONES.find(zone =>
    zone.zipPrefixes.includes(prefix)
  )

  return zone ? zone.rate : 20 // fallback
}

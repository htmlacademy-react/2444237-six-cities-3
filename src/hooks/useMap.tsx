import { MutableRefObject, useEffect, useRef, useState } from 'react'
import { OfferCity } from '../types/offers'
import { Map, TileLayer } from 'leaflet'
import { TILE_ATTRIBUTION, TILE_URL_PATTERN } from '@/const'

function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  city: OfferCity,
): Map | null {
  const [map, setMap] = useState<Map | null>(null)
  const isRenderedRef = useRef<boolean>(false)

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: city.location.latitude,
          lng: city.location.longitude,
        },
        zoom: city.location.zoom,
      })

      const layer = new TileLayer(TILE_URL_PATTERN, {
        attribution: TILE_ATTRIBUTION,
      })

      instance.addLayer(layer)

      setMap(instance)
      isRenderedRef.current = true
    }
  }, [mapRef, city])

  return map
}

export default useMap

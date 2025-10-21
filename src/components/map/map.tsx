import useMap from '@/hooks/useMap'
import { Offer, OfferCity } from '@/types/offers'
import cn from 'classnames'
import { Icon, Marker, layerGroup } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useRef } from 'react'
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from './const'
type MapProps = {
  className: string
  city: OfferCity
  offers: Offer[]
  activeOfferId: string | null
}

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 39],
})

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 39],
})

const Map = ({ className, city, offers, activeOfferId }: MapProps) => {
  const mapRef = useRef(null)
  const map = useMap(mapRef, city)

  useEffect(() => {
    if (!map) return

    const markerLayer = layerGroup()

    offers.forEach((offer) => {
      const marker = new Marker({
        lat: offer.location.latitude,
        lng: offer.location.longitude,
      })

      marker
        .setIcon(
          activeOfferId && offer.id === activeOfferId
            ? currentCustomIcon
            : defaultCustomIcon,
        )
        .addTo(markerLayer)
    })

    markerLayer.addTo(map)

    return () => {
      map.removeLayer(markerLayer)
    }
  }, [map, offers, activeOfferId])
  return <section ref={mapRef} className={cn(className, 'map')}></section>
}
export default Map

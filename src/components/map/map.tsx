import { Offer } from '@/types/offers'
import cn from 'classnames'
import { Icon, Marker, layerGroup } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useRef } from 'react'
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from './const'
import useMap from '@/hooks/use-map'

type MapProps = {
  className: string
  offers: Offer[]
  activeOfferId: string | null
}

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
})

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
})

const Map = ({ className, offers, activeOfferId }: MapProps) => {
  const mapRef = useRef(null)
  const city = offers[0].city
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

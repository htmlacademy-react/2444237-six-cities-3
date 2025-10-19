import { useState } from 'react'
import { Offer } from '@/types/offers'
import Card from '@/components/card/card'
import { ClassNames } from '@/const'
import { getRatingPercent } from '@/utils'

type OffersListProps = {
  listOffers: Offer[]
  onMouseEnter: (id: string) => void
}

const OffersList = ({ listOffers, onMouseEnter }: OffersListProps) => {
  const [, setActiveOfferId] = useState<string | null>(null)

  const handleMouseEnter = (id: string) => {
    onMouseEnter(id)
  }

  const handleMouseLeave = () => {
    setActiveOfferId(null)
    // eslint-disable-next-line no-console
    // console.log(activeOfferId)
  }
  return listOffers.map((item) => (
    <Card
      key={item.id}
      image={item.previewImage}
      price={item.price}
      rating={getRatingPercent(item.rating)}
      name={item.title}
      width="260"
      height="200"
      type={item.type}
      className={ClassNames.list}
      onMouseEnter={() => handleMouseEnter(item.id)}
      onMouseLeave={handleMouseLeave}
      view="list"
    />
  ))
}

export default OffersList

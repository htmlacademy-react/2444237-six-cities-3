import { useState } from 'react'
import { Offer } from '../../types/offers'
import Card from '../card/card'

type OffersListProps = {
  listOffers: Offer[]
}

const OffersList = ({ listOffers }: OffersListProps) => {
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null)

  const handleMouseEnter = (id: string) => {
    setActiveOfferId(id)
  }

  const handleMouseLeave = () => {
    setActiveOfferId(null)
    // eslint-disable-next-line no-console
    console.log(activeOfferId)
  }
  return listOffers.map((item) => (
    <Card
      key={item.id}
      image={item.previewImage}
      value={item.price}
      width={(item.rating * 100) / 5}
      name={item.title}
      type={item.type}
      onMouseEnter={() => handleMouseEnter(item.id)}
      onMouseLeave={handleMouseLeave}
    />
  ))
}

export default OffersList

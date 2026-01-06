import { Offer } from '@/types/offers'
import Card from '@/components/card/card'
import { OfferCardClassNames } from '@/const'
import { getRatingPercent } from '@/pages/offer/utils'
import { memo } from 'react'

type CardListProps = {
  listOffers: Offer[]
  onCardAction: (id: string | null) => void
}

const CardList = memo(({ listOffers, onCardAction }: CardListProps) => {
  return listOffers.map((item) => (
    <Card
      key={item.id}
      id={item.id}
      image={item.previewImage}
      price={item.price}
      rating={getRatingPercent(item.rating)}
      name={item.title}
      width="260"
      height="200"
      type={item.type}
      isPremium={item.isPremium}
      className={OfferCardClassNames.list}
      onCardAction={onCardAction}
      view="list"
    />
  ))
})

export default CardList

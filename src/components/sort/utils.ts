import { Offer } from '@/types/offers'
import { SORT_TYPES } from './const'

const sortOffersByPriceLowToHigh = (offers: Offer[]) => {
  return [...offers].sort((a, b) => a.price - b.price)
}

const sortOffersByPriceHighToLow = (offers: Offer[]) => {
  return [...offers].sort((a, b) => b.price - a.price)
}

const sortOffersByRating = (offers: Offer[]) => {
  return [...offers].sort((a, b) => b.rating - a.rating)
}

export const sortOffers = (offers: Offer[], sortType: string | null) => {
  switch (sortType) {
    case SORT_TYPES[1]:
      return sortOffersByPriceLowToHigh(offers)
    case SORT_TYPES[2]:
      return sortOffersByPriceHighToLow(offers)
    case SORT_TYPES[3]:
      return sortOffersByRating(offers)
    default:
      return offers
  }
}

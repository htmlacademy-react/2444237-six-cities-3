import { Offer, OfferCity } from '@/types/offers'
import { SORT_TYPES } from './const'

export const sortOffers = (offers: Offer[], sortType: string | null) => {
  switch (sortType) {
    case SORT_TYPES.Popular:
      return offers
    case SORT_TYPES.PriceLowToHigh:
      return [...offers].sort((a, b) => a.price - b.price)
    case SORT_TYPES.PriceHighToLow:
      return [...offers].sort((a, b) => b.price - a.price)
    case SORT_TYPES.TopRatedFirst:
      return [...offers].sort((a, b) => b.rating - a.rating)
    default:
      throw new Error('Unknown sort type')
  }
}

export const getOffersByCity = (offers: Offer[], city: string) => {
  return offers.filter((offer) => offer.city.name === city)
}

export const prepareOffers = (
  offers: Offer[],
  city: string,
  sortType: string,
): Offer[] => {
  const filteredOffers = getOffersByCity(offers, city)
  return sortOffers(filteredOffers, sortType)
}

export const getCityByName = (
  offers: Offer[],
  cityName: string,
): OfferCity | undefined => {
  return offers.find((offer) => offer.city.name === cityName)?.city
}

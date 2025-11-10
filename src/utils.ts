import { Offer, OfferCity } from '@/types/offers'
import { sortOffers } from './components/sort/utils'

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

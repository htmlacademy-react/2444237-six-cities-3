import { Offer, OfferCity } from '@/types/offers'

export const getOffersByCity = (offers: Offer[], city: string) => {
  return offers.filter((offer) => offer.city.name === city)
}

export const getCityByName = (
  offers: Offer[],
  cityName: string,
): OfferCity | undefined => {
  return offers.find((offer) => offer.city.name === cityName)?.city
}

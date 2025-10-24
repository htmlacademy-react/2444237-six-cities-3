import { Offer } from '@/types/offers'
import { offers } from '@/mocks/offers'

const MAX_NEAR_OFFERS = 3

export const getNearOffers = (offer: Offer): Offer[] => {
  const nearOffers: Offer[] = []
  for (let i = 0; i < offers.length; i++) {
    if (offers[i].id !== offer.id && offers[i].city.name === offer.city.name) {
      nearOffers.push(offers[i])
    }
    if (nearOffers.length >= MAX_NEAR_OFFERS) {
      break
    }
  }
  return nearOffers
}

export function getRatingPercent(rating: number): number {
  return (rating / 5) * 100
}

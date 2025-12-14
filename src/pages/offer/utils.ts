import { Offer } from '@/types/offers'

const MAX_NEAR_OFFERS = 3

export const getNearOffers = (offers: Offer[]): Offer[] => {
  const nearOffers: Offer[] = []
  for (let i = 0; i < offers.length; i++) {
    nearOffers.push(offers[i])
    if (nearOffers.length >= MAX_NEAR_OFFERS) {
      break
    }
  }
  return nearOffers
}

export const getFormatedDate = (date: string) => {
  const formatedDate = new Date(date).toLocaleDateString('ru-RU')
  return formatedDate
}

export function getRatingPercent(rating: number): number {
  return (rating / 5) * 100
}

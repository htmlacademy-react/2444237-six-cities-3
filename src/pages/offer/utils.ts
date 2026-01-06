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

export const getFormateDate = (date: string): string => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString('en-US', {
    month: 'long',  
    year: 'numeric', 
  });
};

export function getRatingPercent(rating: number): number {
  return Math.round((rating / 5) * 100);
}

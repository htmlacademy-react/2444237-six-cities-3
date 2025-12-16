import { OfferHost } from './offer-details'

export type OfferComment = {
  id: string
  date: string
  user: OfferHost
  comment: string
  rating: number
}

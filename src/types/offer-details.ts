import { OfferCity, OfferLocation } from './offers'

export type OfferDetails = {
  id: string
  title: string
  type: string
  price: number
  city: OfferCity
  location: OfferLocation
  isFavorite: boolean
  isPremium: boolean
  rating: number
  description: string
  bedrooms: number
  goods: string[]
  host: OfferHost
  images: string[]
  maxAdults: number
}

export type OfferHost = {
  name: string
  avatarUrl: string
  isPro: boolean
}

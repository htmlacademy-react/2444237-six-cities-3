import { Offer } from '@/types/offers'
import { createReducer } from '@reduxjs/toolkit'
import { setCity, setOffers } from './action'
import { offers } from '@/mocks/offers'
import { getOffersByCity } from '@/components/tabs/utils'

type initialState = {
  city: string
  offers: Offer[]
}

export const initialState = {
  city: 'Paris',
  offers: offers,
}

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      const city = action.payload
      state.city = city
      state.offers = getOffersByCity(offers, state.city)
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload
    })
})

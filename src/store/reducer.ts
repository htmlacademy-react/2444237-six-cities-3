import { Offer } from '@/types/offers'
import { createReducer } from '@reduxjs/toolkit'
import { setCity } from './action'
import { offers } from '@/mocks/offers'
import { CITY_NAMES, City } from '@/const'

type initialState = {
  city: City
  offers: Offer[]
}

export const initialState: initialState = {
  city: CITY_NAMES[0],
  offers: offers,
}

export const reducer = createReducer(initialState, (builder) => {
  builder.addCase(setCity, (state, action) => {
    const city = action.payload
    state.city = city
  })
})

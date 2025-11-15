import { Offer } from '@/types/offers'
import { createReducer } from '@reduxjs/toolkit'
import { setCity, setSortType } from './action'
import { offers } from '@/mocks/offers'
import { CITY_NAMES, City, SortKeys } from '@/const'

type initialState = {
  city: City
  offers: Offer[]
  sortType: SortKeys
}

export const initialState: initialState = {
  city: CITY_NAMES[0],
  offers: offers,
  sortType: 'Popular',
}

export const reducer = createReducer(initialState, (builder) => {
  builder.addCase(setCity, (state, action) => {
    const city = action.payload
    state.city = city
  })

  builder.addCase(setSortType, (state, action) => {
    const sortType = action.payload
    state.sortType = sortType
  })
})

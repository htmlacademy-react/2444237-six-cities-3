import { Offer } from '@/types/offers'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CITY_NAMES, City, SortKeys } from '@/const'
import { Favorite } from '@/types/favorite'

type initialState = {
  city: City
  offers: Offer[]
  sortType: SortKeys
  isLoading: boolean
  favoriteOffers: Favorite[]
}

const initialState: initialState = {
  city: CITY_NAMES[0],
  offers: [],
  sortType: 'Popular',
  isLoading: false,
  favoriteOffers: [],
}

export const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    setCity(state, action: PayloadAction<City>) {
      state.city = action.payload
    },

    loadOffers(state, action: PayloadAction<Offer[]>) {
      state.offers = action.payload
    },

    setSortType(state, action: PayloadAction<SortKeys>) {
      state.sortType = action.payload
    },

    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload
    },

    loadFavoriteOffers(state, action: PayloadAction<Favorite[]>) {
      state.favoriteOffers = action.payload
    },
  },
})

export const {
  setCity,
  loadOffers,
  loadFavoriteOffers,
  setLoading,
  setSortType,
} = offersSlice.actions

export default offersSlice.reducer

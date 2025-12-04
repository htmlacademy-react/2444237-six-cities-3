import { City, CITY_NAMES, SortKeys } from '@/const'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type initialState = {
  sortType: SortKeys
  city: City
}

const initialState: initialState = {
  sortType: 'Popular',
  city: CITY_NAMES[0],
}

export const appSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    setSortType(state, action: PayloadAction<SortKeys>) {
      state.sortType = action.payload
    },

    setCity(state, action: PayloadAction<City>) {
      state.city = action.payload
    },
  },
})

export const { setSortType, setCity } = appSlice.actions
export default appSlice.reducer

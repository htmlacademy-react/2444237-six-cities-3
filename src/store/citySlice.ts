import { City, CITY_NAMES } from '@/const'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type initialState = {
  city: City
}

const initialState: initialState = {
  city: CITY_NAMES[0],
}

export const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    setCity(state, action: PayloadAction<City>) {
      state.city = action.payload
    },
  },
})

export const { setCity } = citySlice.actions
export default citySlice.reducer

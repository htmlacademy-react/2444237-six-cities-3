import { Offer } from '@/types/offers'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Favorite } from '@/types/favorite'
import { fetchOffersAction } from './api-actions'

type initialState = {
  offers: Offer[]
  isLoading: boolean
  error: string | null
  favoriteOffers: Favorite[]
}

const initialState: initialState = {
  offers: [],
  error: null,
  isLoading: false,
  favoriteOffers: [],
}

export const offersSlice = createSlice({
  name: 'offer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(
        fetchOffersAction.fulfilled,
        (state, action: PayloadAction<Offer[]>) => {
          state.isLoading = false
          state.offers = action.payload
        },
      )
      .addCase(fetchOffersAction.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message ?? 'Unknown error'
      })
  },
})

export default offersSlice.reducer

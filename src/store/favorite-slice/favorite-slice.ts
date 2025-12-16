import { Offer } from '@/types/offers'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { loadFavoriteOffers } from './api-actions'

type initialState = {
  favoriteOffers: Offer[]
  isLoading: boolean
  error: string | null
}
const initialState: initialState = {
  favoriteOffers: [],
  isLoading: false,
  error: null,
}

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadFavoriteOffers.pending, (state) => {
        state.isLoading = true
        state.favoriteOffers = []
      })
      .addCase(
        loadFavoriteOffers.fulfilled,
        (state, action: PayloadAction<Offer[]>) => {
          state.favoriteOffers = action.payload
          state.isLoading = false
        },
      )
      .addCase(loadFavoriteOffers.rejected, (state) => {
        state.favoriteOffers = []
        state.error = 'Unknown error'
      })
  },
})

export default favoriteSlice.reducer

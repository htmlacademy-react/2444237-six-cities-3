import { Offer } from '@/types/offers'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { updateFavoriteOfferStatus, loadFavoriteOffers } from './api-actions'

type initialState = {
  favoriteOffers: Offer[]
  isLoading: boolean
  error: string | null
  count: number
}
const initialState: initialState = {
  favoriteOffers: [],
  isLoading: false,
  error: null,
  count: 0,
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
          state.count = action.payload.length
        },
      )
      .addCase(loadFavoriteOffers.rejected, (state) => {
        state.favoriteOffers = []
        state.error = 'Unknown error'
      })
      .addCase(
        updateFavoriteOfferStatus.fulfilled,
        (state, action: PayloadAction<Offer>) => {
          if (action.payload.isFavorite) {
            state.favoriteOffers.push(action.payload)
            state.count += 1
          } else {
            state.favoriteOffers = state.favoriteOffers.filter(
              (offer) => offer.id !== action.payload.id,
            )
            state.count -= 1
          }
        },
      )
  },
})

export default favoriteSlice.reducer

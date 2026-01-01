import { Offer } from '@/types/offers'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { updateFavoriteOfferStatus, loadFavoriteOffers } from './api-actions'



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
  reducers: {
    clearFavoriteOffers: (state) => {
      state.favoriteOffers = []
    }
  },

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
      .addCase(
        updateFavoriteOfferStatus.fulfilled,
        (state, action: PayloadAction<Offer>) => {
          if (action.payload.isFavorite) {
            state.favoriteOffers.push(action.payload)
          } else {
            state.favoriteOffers = state.favoriteOffers.filter(
              (offer) => offer.id !== action.payload.id,
            )
          }
        },
      )
  },
})

export const { clearFavoriteOffers } = favoriteSlice.actions
export default favoriteSlice.reducer

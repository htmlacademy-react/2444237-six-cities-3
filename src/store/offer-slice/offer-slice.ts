import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { loadNearOffers, loadOfferInfo } from './api-actions'
import { OfferDetails } from '@/types/offer-details'
import { Offer } from '@/types/offers'

type initialState = {
  offer: OfferDetails | null
  nearOffers: Offer[]
  isLoading: boolean
  error: string | null
}
const initialState: initialState = {
  offer: null,
  nearOffers: [],
  isLoading: false,
  error: null,
}

export const offerSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadOfferInfo.pending, (state) => {
        state.isLoading = true
      })
      .addCase(
        loadOfferInfo.fulfilled,
        (state, action: PayloadAction<OfferDetails>) => {
          state.offer = action.payload
          state.isLoading = false
        },
      )
      .addCase(loadOfferInfo.rejected, (state) => {
        state.error = 'Unknown error'
      })
      .addCase(
        loadNearOffers.fulfilled,
        (state, action: PayloadAction<Offer[]>) => {
          state.nearOffers = action.payload
        },
      )
      .addCase(loadNearOffers.rejected, (state) => {
        state.error = 'Unknown error'
      })
  },
})

export default offerSlice.reducer

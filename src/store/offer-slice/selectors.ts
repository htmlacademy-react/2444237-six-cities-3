import { RootState } from '..'

export const selectOffer = (state: RootState) => state.offer.offer

export const selectNearOffers = (state: RootState) => state.offer.nearOffers

export const selectOfferError = (state: RootState) => state.offer.error

export const selectOfferLoading = (state: RootState) => state.offer.isLoading

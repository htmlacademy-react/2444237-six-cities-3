import { RootState } from '..'

export const selectOffer = (state: RootState) => state.offer.offer

export const selectNearOffers = (state: RootState) => state.offer.nearOffers

import { RootState } from '..'

export const selectOffers = (state: RootState) => state.offers.offers

export const selectIsLoading = (state: RootState) => state.offers.isLoading

export const selectError = (state: RootState) => state.offers.error

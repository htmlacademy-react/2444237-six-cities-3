import { RootState } from '.'

export const selectCurrentCity = (state: RootState) => state.city.city

export const selectOffers = (state: RootState) => state.offers.offers

export const selectCurrentSortType = (state: RootState) => state.sort.sortType

export const selectIsLoading = (state: RootState) => state.offers.isLoading

export const selectError = (state: RootState) => state.offers.error

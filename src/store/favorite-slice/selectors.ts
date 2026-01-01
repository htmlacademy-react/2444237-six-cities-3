import { RootState } from '..'

export const selectFavoriteOffers = (state: RootState) =>
  state.favorite.favoriteOffers

export const selectFavoriteOffersCount = (state: RootState) =>
  state.favorite.favoriteOffers.length

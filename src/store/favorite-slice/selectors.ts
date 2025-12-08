import { RootState } from '..'

export const selectFavoriteOffers = (state: RootState) =>
  state.favorite.favoriteOffers

export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id',
  NotFound = '*',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum OfferCardClassNames {
  list = 'cities__card',
  favorites = 'favorites__card',
  near = 'near-places__card',
}

export const reviewFormRating = [
  { id: '5-stars', title: 'perfect', value: 5 },
  { id: '4-stars', title: 'good', value: 4 },
  { id: '3-stars', title: 'not bad', value: 3 },
  { id: '2-stars', title: 'badly', value: 2 },
  { id: '1-star', title: 'terribly', value: 1 },
]

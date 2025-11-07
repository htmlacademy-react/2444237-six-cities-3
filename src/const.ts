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

export const CITY_NAMES = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
] as const

export type City = (typeof CITY_NAMES)[number]

export enum OfferCardClassNames {
  list = 'cities__card',
  favorites = 'favorites__card',
  near = 'near-places__card',
}

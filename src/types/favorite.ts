export type Favorite = {
  id: string
  title: string
  type: string
  price: number
  city: FavoriteCity
  location: FavoriteLocation
  isFavorite: boolean
  isPremium: boolean
  rating: number
  previewImage: string
}

export type FavoriteCity = {
  name: string
  location: FavoriteLocation
}

export type FavoriteLocation = {
  latitude: number
  longitude: number
  zoom: number
}

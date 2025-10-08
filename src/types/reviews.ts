export type Review = {
  id: string
  date: string
  user: ReviewUserInfo
  comment: string
  rating: number
}

export type ReviewUserInfo = {
  name: string
  avatarUrl: string
  isPro: boolean
}

import { createBrowserRouter } from 'react-router-dom'
import { lazy } from 'react'

import Main from '@/pages/main/main'
import { AppRoute } from '@/const'
import { offers } from '@/mocks/offers'
import { reviews } from '@/mocks/reviews'

const Login = lazy(() => import('@/pages/login/login'))
const NotFound = lazy(() => import('@/components/not-found/not-found'))
const Favorites = lazy(() => import('@/pages/favorites/favorites'))
const Offer = lazy(() => import('@/pages/offer/offer'))

const router = createBrowserRouter([
  {
    path: AppRoute.Main,
    element: <Main />,
  },
  {
    path: AppRoute.Login,
    element: <Login />,
  },
  {
    path: AppRoute.Favorites,
    element: <Favorites items={offers} />,
  },
  {
    path: AppRoute.NotFound,
    element: <NotFound />,
  },
  {
    path: AppRoute.Offer,
    element: <Offer reviews={reviews} offers={offers} />,
  },
])

export default router

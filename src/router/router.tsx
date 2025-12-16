import { createBrowserRouter } from 'react-router-dom'
import { lazy } from 'react'

import Main from '@/pages/main/main'
import { AppRoute } from '@/const'
import PrivateRoute from '@/components/private-route/private-route'

const Login = lazy(() => import('@/pages/login/login'))
const NotFound = lazy(() => import('@/components/not-found/not-found'))
const Favorites = lazy(() => import('@/pages/favorites/favorites'))
const Offer = lazy(() => import('@/pages/offer/offer'))

export const router = createBrowserRouter([
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

    element: (
      <PrivateRoute>
        <Favorites />
      </PrivateRoute>
    ),
  },
  {
    path: AppRoute.NotFound,
    element: <NotFound />,
  },
  {
    path: AppRoute.Offer,
    element: <Offer />,
  },
])

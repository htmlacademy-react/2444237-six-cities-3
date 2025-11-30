import { createAsyncThunk } from '@reduxjs/toolkit'
import { AppDispatch, RootState, store } from '.'
import { AxiosInstance } from 'axios'
import { Offer } from '@/types/offers'
import { APIRoute } from '@/const'

import { AuthData, AuthInfo } from '@/types/auth'
import { UserData } from '@/types/user-data'
import { dropToken, saveToken } from '@/services/token'
import { loadUserInfo, setError } from './auth/auth-slice'
import { TIMEOUT_SHOW_ERROR } from './const'
import { router } from '@/router/router'

export type ThunkExtraArguments = {
  api: AxiosInstance
  router: typeof router
}

type ThunkConfig = {
  dispatch: AppDispatch
  state: RootState
  extra: ThunkExtraArguments
}

export const fetchOffersAction = createAsyncThunk<
  Offer[],
  undefined,
  ThunkConfig
>('offers/loadOffers', async (_arg, { extra: { api } }) => {
  const { data } = await api.get<Offer[]>(APIRoute.Offers)
  return data
})

export const loginAction = createAsyncThunk<void, AuthData, ThunkConfig>(
  'user/login',
  async ({ email, password }, { extra: { api } }) => {
    const {
      data: { token },
    } = await api.post<UserData>(APIRoute.Login, {
      email,
      password,
    })
    saveToken(token)
  },
)

export const checkAuthAction = createAsyncThunk<void, undefined, ThunkConfig>(
  'user/checkAuth',
  async (_arg, { dispatch, extra: { api } }) => {
    const response = await api.get<AuthInfo>(APIRoute.Login)
    dispatch(loadUserInfo(response.data))
  },
)

export const clearErrorAction = createAsyncThunk('user/clearError', () => {
  setTimeout(() => {
    store.dispatch(setError(null))
  }, TIMEOUT_SHOW_ERROR)
})

export const logoutAction = createAsyncThunk<void, undefined, ThunkConfig>(
  'user/logout',
  async (_arg, { extra: { api } }) => {
    await api.delete(APIRoute.Logout)
    dropToken()
  },
)

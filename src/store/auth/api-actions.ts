import { createAsyncThunk } from '@reduxjs/toolkit'
import { APIRoute, AppRoute } from '@/const'
import { AuthData, AuthInfo } from '@/types/auth'
import { dropToken, saveToken } from '@/services/token'
import { ThunkConfig } from '@/types/thunk'
import { loadFavoriteOffers } from '../favorite-slice/api-actions'
import { displayErrorMessage } from '../notify-slice/notify-slice'

export const loginAction = createAsyncThunk<AuthInfo, AuthData, ThunkConfig>(
  'user/login',
  async ({ email, password }, { dispatch, extra: { api, router } }) => {
    try {
      const { data } = await api.post<AuthInfo>(APIRoute.Login, {
        email,
        password,
      })
      saveToken(data.token)
      dispatch(loadFavoriteOffers())
      router.navigate(AppRoute.Main)

      return data
    } catch (error) {
      dispatch(displayErrorMessage('Произошла ошибка'))
      throw error
    }
  },
)

export const checkAuthAction = createAsyncThunk<
  AuthInfo,
  undefined,
  ThunkConfig
>('user/checkAuth', async (_arg, { dispatch, extra: { api } }) => {
  const { data } = await api.get<AuthInfo>(APIRoute.Login)
  dispatch(loadFavoriteOffers())

  return data
})

export const logoutAction = createAsyncThunk<void, undefined, ThunkConfig>(
  'user/logout',
  async (_arg, { extra: { api, router } }) => {
    await api.delete(APIRoute.Logout)
    dropToken()
    router.navigate(AppRoute.Main)
  },
)

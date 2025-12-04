import { createAsyncThunk } from '@reduxjs/toolkit'
import { APIRoute, AppRoute } from '@/const'
import { AuthData, AuthInfo } from '@/types/auth'
import { dropToken, saveToken } from '@/services/token'
import { setError } from './auth-slice'
import { TIMEOUT_SHOW_ERROR } from '../const'
import { ThunkConfig } from '@/types/thunk'

export const loginAction = createAsyncThunk<AuthInfo, AuthData, ThunkConfig>(
  'user/login',
  async ({ email, password }, { extra: { api } }) => {
    const { data } = await api.post<AuthInfo>(APIRoute.Login, {
      email,
      password,
    })
    saveToken(data.token)
    return data
  },
)

export const checkAuthAction = createAsyncThunk<
  AuthInfo,
  undefined,
  ThunkConfig
>('user/checkAuth', async (_arg, { extra: { api } }) => {
  const { data } = await api.get<AuthInfo>(APIRoute.Login)

  return data
})

export const clearErrorAction = createAsyncThunk(
  'user/clearError',
  (_arg, { dispatch }) => {
    setTimeout(() => {
      dispatch(setError(null))
    }, TIMEOUT_SHOW_ERROR)
  },
)

export const logoutAction = createAsyncThunk<void, undefined, ThunkConfig>(
  'user/logout',
  async (_arg, { extra: { api, router } }) => {
    await api.delete(APIRoute.Logout)
    dropToken()
    router.navigate(AppRoute.Main)
  },
)

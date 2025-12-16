import { AuthorizationStatus } from '@/const'
import { checkAuthAction, loginAction, logoutAction } from './api-actions'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthInfo } from '@/types/auth'

type AuthState = {
  authorizationStatus: AuthorizationStatus
  userInfo: AuthInfo | null
  error: string | null
  loginStatus: 'idle' | 'loading' | 'succeeded' | 'error'
}

const initialState: AuthState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userInfo: null,
  error: null,
  loginStatus: 'idle',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAction.pending, (state) => {
        state.loginStatus = 'loading'
      })
      .addCase(
        loginAction.fulfilled,
        (state, action: PayloadAction<AuthInfo>) => {
          state.authorizationStatus = AuthorizationStatus.Auth
          state.userInfo = action.payload
        },
      )
      .addCase(loginAction.rejected, (state) => {
        state.loginStatus = 'error'
      })
      .addCase(
        checkAuthAction.fulfilled,
        (state, action: PayloadAction<AuthInfo>) => {
          state.authorizationStatus = AuthorizationStatus.Auth
          state.userInfo = action.payload
        },
      )
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth
      })
      .addCase(logoutAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.Unknown
      })
  },
})

export const { setError } = authSlice.actions
export default authSlice.reducer

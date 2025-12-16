import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '..'

export const selectAuthorizationStatus = (state: RootState) =>
  state.auth.authorizationStatus

export const selectUserInfo = (state: RootState) => state.auth.userInfo

export const selectError = (state: RootState) => state.auth.error

export const selectStatus = (state: RootState) => state.auth.loginStatus

export const selectLoginStatus = createSelector([selectStatus], (status) => ({
  isLoading: status === 'loading',
  isSucceeded: status === 'succeeded',
  isError: status === 'error',
}))

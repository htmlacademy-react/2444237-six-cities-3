import { RootState } from '..'

export const selectAuthorizationStatus = (state: RootState) =>
  state.auth.authorizationStatus

export const selectUserInfo = (state: RootState) => state.auth.userInfo

export const selectError = (state: RootState) => state.auth.error

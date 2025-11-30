import { offersSlice } from './offers-slice/offers-slice'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { createApi } from '@/services/api'
import { appSlice } from './app-slice/app-slice'
import { authSlice } from './auth/auth-slice'
import { router } from '@/router/router'

const api = createApi()

const rootSlice = combineReducers({
  offers: offersSlice.reducer,
  app: appSlice.reducer,
  auth: authSlice.reducer,
})

export const store = configureStore({
  reducer: rootSlice,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: { api, router },
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

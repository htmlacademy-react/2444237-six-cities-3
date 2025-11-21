import { offersSlice } from './offers-slice'
import { configureStore } from '@reduxjs/toolkit'
import { createApi } from '@/services/api'

const api = createApi()

export const store = configureStore({
  reducer: {
    offers: offersSlice.reducer,
  },

  middleware: (getDefualtMiddleware) =>
    getDefualtMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

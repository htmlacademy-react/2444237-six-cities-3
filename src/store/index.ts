import { offersSlice } from './offers-slice'
import { configureStore } from '@reduxjs/toolkit'
import { createApi } from '@/services/api'
import router from '@/router/router'
import { citySlice } from './citySlice'
import { sortSlice } from './sortSlice'

const api = createApi()

export const store = configureStore({
  reducer: {
    offers: offersSlice.reducer,
    city: citySlice.reducer,
    sort: sortSlice.reducer,
  },

  middleware: (getDefualtMiddleware) =>
    getDefualtMiddleware({
      thunk: {
        extraArgument: { api, router },
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

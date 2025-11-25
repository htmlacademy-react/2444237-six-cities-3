import { createAsyncThunk } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from '.'
import { AxiosInstance } from 'axios'
import { Offer } from '@/types/offers'
import { APIRoute } from '@/const'

import router from '@/router/router'

export type ThunkExtraArguments = {
  api: AxiosInstance
  router: typeof router
}

export const fetchOffersAction = createAsyncThunk<
  Offer[],
  undefined,
  {
    dispatch: AppDispatch
    state: RootState
    extra: ThunkExtraArguments
  }
>('offers/loadOffers', async (_arg, { extra: { api } }) => {
  const { data } = await api.get<Offer[]>(APIRoute.Offers)
  return data
})

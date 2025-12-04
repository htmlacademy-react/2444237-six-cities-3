import { APIRoute } from '@/const'
import { Offer } from '@/types/offers'
import { ThunkConfig } from '@/types/thunk'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchOffersAction = createAsyncThunk<
  Offer[],
  undefined,
  ThunkConfig
>('offers/loadOffers', async (_arg, { extra: { api } }) => {
  const { data } = await api.get<Offer[]>(APIRoute.Offers)
  return data
})

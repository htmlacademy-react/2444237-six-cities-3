import { ThunkExtraArguments } from '@/types/thunk'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from '..'
import { Offer } from '@/types/offers'
import { APIRoute } from '@/const'

type ThunkConfig = {
  dispatch: AppDispatch
  state: RootState
  extra: ThunkExtraArguments
}

export const loadFavoriteOffers = createAsyncThunk<
  Offer[],
  undefined,
  ThunkConfig
>('favorite/loadFavoriteOffers', async (_arg, { extra: { api } }) => {
  const { data } = await api.get<Offer[]>(APIRoute.Favorite)
  return data
})

import { createAsyncThunk } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from '.'
import { AxiosInstance } from 'axios'
import { Offer } from '@/types/offers'
import { loadOffers, setLoading } from './offers-slice'
import { APIRoute } from '@/const'

export const fetchOffersAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch
    state: RootState
    extra: AxiosInstance
  }
>('offers/loadOffers', async (_arg, { dispatch, extra: api }) => {
  dispatch(setLoading(true))
  try {
    const { data } = await api.get<Offer[]>(APIRoute.Offers)
    dispatch(loadOffers(data))
  } catch (error) {
    throw new Error('Failed to load offers')
  } finally {
    dispatch(setLoading(false))
  }
})

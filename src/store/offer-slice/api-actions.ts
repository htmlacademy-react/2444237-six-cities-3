import { APIRoute, AppRoute } from '@/const'
import { OfferDetails } from '@/types/offer-details'
import { Offer } from '@/types/offers'
import { ThunkConfig } from '@/types/thunk'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

export const loadOfferInfo = createAsyncThunk<
  OfferDetails,
  string,
  ThunkConfig
>('offer/loadOffer', async (offerId, { extra: { api, router } }) => {
  try {
    const { data } = await api.get<OfferDetails>(`${APIRoute.Offer}/${offerId}`)
    return data
  } catch (error) {
    const axiosError = error as AxiosError

    if (axiosError.response?.status === 404) {
      router.navigate(AppRoute.NotFound)
    }
    toast.error('Произошла ошибка при загрузке данных оффера')
    throw error
  }
})

export const loadNearOffers = createAsyncThunk<Offer[], string, ThunkConfig>(
  'offer/loadNearOffers',
  async (offerId, { extra: { api } }) => {
    try {
      const { data } = await api.get<Offer[]>(
        `${APIRoute.Offer}/${offerId}/nearby`,
      )
      return data
    } catch (error) {
      toast.error('Произошла ошибка при загрузке похожих офферов')
      throw error
    }
  },
)

import { APIRoute, AppRoute } from '@/const'
import { OfferDetails } from '@/types/offer-details'
import { Offer } from '@/types/offers'
import { ThunkConfig } from '@/types/thunk'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { isAxiosError } from 'axios'
import { displayErrorMessage } from '../notify-slice/notify-slice'

export const loadOfferInfo = createAsyncThunk<
  OfferDetails,
  string,
  ThunkConfig
>('offer/loadOffer', async (offerId, { dispatch, extra: { api, router } }) => {
  try {
    const { data } = await api.get<OfferDetails>(`${APIRoute.Offer}/${offerId}`)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 404) {
      router.navigate(AppRoute.NotFound)
    }
    dispatch(displayErrorMessage('Произошла ошибка при загрузке оффера'))
    throw error
  }
})

export const loadNearOffers = createAsyncThunk<Offer[], string, ThunkConfig>(
  'offer/loadNearOffers',
  async (offerId, { dispatch, extra: { api } }) => {
    try {
      const { data } = await api.get<Offer[]>(
        `${APIRoute.Offer}/${offerId}/nearby`,
      )
      return data
    } catch (error) {
      dispatch(
        displayErrorMessage('Произошла ошибка при загрузке похожих офферов'),
      )
      throw error
    }
  },
)

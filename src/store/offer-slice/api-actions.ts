import { APIRoute, AppRoute } from '@/const'
import { OfferDetails } from '@/types/offer-details'
import { Offer } from '@/types/offers'
import { ThunkConfig } from '@/types/thunk'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const loadOfferInfo = createAsyncThunk<
  OfferDetails,
  string,
  ThunkConfig
>('offer/loadOffer', async (offerId, { extra: { api, router } }) => {
  try {
    const { data } = await api.get<OfferDetails>(`${APIRoute.Offer}${offerId}`)
    return data
  } catch (error) {
    router.navigate(AppRoute.NotFound)
    throw error
  }
})

export const loadNearOffers = createAsyncThunk<Offer[], string, ThunkConfig>(
  'offer/loadNearOffers',
  async (offerId, { extra: { api } }) => {
    const { data } = await api.get<Offer[]>(
      `${APIRoute.Offer}${offerId}/nearby`,
    )
    return data
  },
)

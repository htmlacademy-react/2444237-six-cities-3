import { ThunkExtraArguments } from '@/types/thunk'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from '..'
import { Offer } from '@/types/offers'
import { APIRoute } from '@/const'
import {
  displaySuccessMessage,
} from '../notify-slice/notify-slice'

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

export const updateFavoriteOfferStatus = createAsyncThunk<
  Offer,
  string,
  ThunkConfig
>(
  'favorite/updateFavoriteOfferStatus',
  async (offerId, { dispatch, getState, extra: { api } }) => {
    const state = getState()

    const offer = state.favorite.favoriteOffers.some(
      (favOffer) => favOffer.id === offerId,
    )

    const actionType = offer ? 0 : 1

    try {
      const { data } = await api.post<Offer>(
        `${APIRoute.Favorite}/${offerId}/${actionType}`,
      )
      dispatch(
        displaySuccessMessage(
          offer ? 'Deleted from favorites' : 'Added to favorites',
        ),
      )

      return data
    } catch (error) {
      throw error
    }
  },
)

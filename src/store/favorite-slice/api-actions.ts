import { ThunkExtraArguments } from '@/types/thunk'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from '..'
import { Offer } from '@/types/offers'
import { APIRoute } from '@/const'
import {
  displaySuccessMessage,
  displayErrorMessage,
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
          offer ? 'Удалено из избранного' : 'Добавлено в избранное',
        ),
      )

      return data
    } catch (error) {
      dispatch(
        displayErrorMessage('Произошла ошибка при добавлении в избранное'),
      )
      throw error
    }
  },
)

import { APIRoute } from '@/const'
import { OfferComment } from '@/types/comment'
import { SaveCommentPayload, ThunkConfig } from '@/types/thunk'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { displayErrorMessage } from '../notify-slice/notify-slice'

export const loadOfferComments = createAsyncThunk<
  OfferComment[],
  string,
  ThunkConfig
>('offer/loadOfferComments', async (offerId, { dispatch, extra: { api } }) => {
  try {
    const { data } = await api.get<OfferComment[]>(
      `${APIRoute.Comments}/${offerId}`,
    )
    return data
  } catch (error) {
    dispatch(displayErrorMessage('Произошла ошибка при загрузке комментариев'))
    throw error
  }
})

export const sentOfferComment = createAsyncThunk<
  OfferComment,
  SaveCommentPayload,
  ThunkConfig
>(
  'offer/saveOfferComments',
  async ({ offerId, comment }, { dispatch, extra: { api } }) => {
    try {
      const { data } = await api.post<OfferComment>(
        `${APIRoute.Comments}/${offerId}`,
        comment,
      )
      return data
    } catch (error) {
       dispatch(
        displayErrorMessage('Произошла ошибка при отправке комментария'),
      ) 
      throw error
    }
  },
)

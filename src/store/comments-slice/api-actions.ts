import { APIRoute } from '@/const'
import { OfferComment } from '@/types/comment'
import { SaveCommentPayload, ThunkConfig } from '@/types/thunk'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

export const loadOfferComments = createAsyncThunk<
  OfferComment[],
  string,
  ThunkConfig
>('offer/loadOfferComments', async (offerId, { extra: { api } }) => {
  try {
    const { data } = await api.get<OfferComment[]>(
      `${APIRoute.Comments}/${offerId}`,
    )
    return data
  } catch (error) {
    toast.error('Произошла ошибка при загрузке комментариев')
    throw error
  }
})

export const sentOfferComment = createAsyncThunk<
  OfferComment,
  SaveCommentPayload,
  ThunkConfig
>(
  'offer/saveOfferComments',
  async ({ offerId, comment }, { extra: { api } }) => {
    try {
      const { data } = await api.post<OfferComment>(
        `${APIRoute.Comments}/${offerId}`,
        comment,
      )
      return data
    } catch (error) {
      toast.error('Произошла ошибка при отправке комментария')
      throw error
    }
  },
)

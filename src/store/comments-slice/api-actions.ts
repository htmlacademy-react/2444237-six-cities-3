import { APIRoute } from '@/const'
import { OfferComment } from '@/types/comment'
import { SaveCommentPayload, ThunkConfig } from '@/types/thunk'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const loadOfferComments = createAsyncThunk<
  OfferComment[],
  string,
  ThunkConfig
>('offer/loadOfferComments', async (offerId, { extra: { api } }) => {
  const { data } = await api.get<OfferComment[]>(
    `${APIRoute.Comments}${offerId}`,
  )
  return data
})

export const sentOfferComment = createAsyncThunk<
  OfferComment,
  SaveCommentPayload,
  ThunkConfig
>(
  'offer/saveOfferComments',
  async ({ offerId, comment }, { extra: { api } }) => {
    const { data } = await api.post<OfferComment>(
      `${APIRoute.Comments}${offerId}`,
      comment,
    )
    return data
  },
)

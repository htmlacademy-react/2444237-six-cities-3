import { OfferComment } from '@/types/comment'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { loadOfferComments, sentOfferComment } from './api-actions'

type initialState = {
  comments: OfferComment[]
  error: string | null
}

const initialState: initialState = {
  comments: [],
  error: null,
}

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        loadOfferComments.fulfilled,
        (state, action: PayloadAction<OfferComment[]>) => {
          state.comments = action.payload
        },
      )
      .addCase(loadOfferComments.rejected, (state) => {
        state.comments = []
        state.error = 'Unknown error'
      })
      .addCase(
        sentOfferComment.fulfilled,
        (state, action: PayloadAction<OfferComment>) => {
          state.comments.push(action.payload)
        },
      )
      .addCase(sentOfferComment.rejected, (state) => {
        state.error = 'Unknown error'
      })
  },
})

export default commentsSlice.reducer

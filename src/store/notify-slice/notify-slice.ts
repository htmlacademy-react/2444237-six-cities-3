import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

type NotifyState = {
  message: string
}

const initialState: NotifyState = {
  message: '',
}
export const notifySlice = createSlice({
  name: 'notify',
  initialState,
  reducers: {
    displaySuccessMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload
      toast.success(action.payload)
    },
    displayErrorMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload
      toast.error(action.payload)
    },
  },
})

export const { displaySuccessMessage, displayErrorMessage } =
  notifySlice.actions
export default notifySlice.reducer

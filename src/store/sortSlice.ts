import { SortKeys } from '@/const'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type initialState = {
  sortType: SortKeys
}

const initialState: initialState = {
  sortType: 'Popular',
}

export const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    setSortType(state, action: PayloadAction<SortKeys>) {
      state.sortType = action.payload
    },
  },
})

export const { setSortType } = sortSlice.actions
export default sortSlice.reducer

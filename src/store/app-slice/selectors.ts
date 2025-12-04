import { RootState } from '..'

export const selectCurrentCity = (state: RootState) => state.app.city

export const selectCurrentSortType = (state: RootState) => state.app.sortType

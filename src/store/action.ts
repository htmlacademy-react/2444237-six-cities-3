import { City, SortKeys } from '@/const'
import { Offer } from '@/types/offers'
import { createAction } from '@reduxjs/toolkit'

export const setCity = createAction<City>('setCity')

export const setOffers = createAction<Offer[]>('setOffers')

export const setSortType = createAction<SortKeys>('setSortType')

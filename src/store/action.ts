import { Offer } from '@/types/offers'
import { createAction } from '@reduxjs/toolkit'

export const setCity = createAction<string>('setCity')

export const setOffers = createAction<Offer[]>('setOffers')

import { router } from '@/router/router'
import { AppDispatch, RootState } from '@/store'
import { AxiosInstance } from 'axios'

export type ThunkExtraArguments = {
  api: AxiosInstance
  router: typeof router
}

export type ThunkConfig = {
  dispatch: AppDispatch
  state: RootState
  extra: ThunkExtraArguments
}

import { store } from '@/store'
import { clearErrorAction } from '@/store/auth/api-actions'
import { setError } from '@/store/auth/auth-slice'

export const processErrorHandle = (message: string) => {
  store.dispatch(setError(message))
  store.dispatch(clearErrorAction())
}

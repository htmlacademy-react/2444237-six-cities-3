import { store } from '@/store'
import { clearErrorAction } from '@/store/api-actions'
import { setError } from '@/store/auth/auth-slice'

export const processErrorHandle = (message: string) => {
  console.log(message)
  store.dispatch(setError(message))
  store.dispatch(clearErrorAction())
}

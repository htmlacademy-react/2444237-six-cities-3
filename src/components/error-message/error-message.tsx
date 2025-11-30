import { useAppSelector } from '@/hooks'
import { selectError } from '@/store/auth/selectors'
import styles from './error-message.module.css'

const ErrorMessage = () => {
  const error = useAppSelector(selectError)

  return error ? (
    <div className={styles.error}>
      <p>{error}</p>
    </div>
  ) : null
}

export default ErrorMessage

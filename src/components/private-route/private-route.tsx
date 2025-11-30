import { Navigate } from 'react-router-dom'
import { AppRoute, AuthorizationStatus } from '@/const'
import { useAppSelector } from '@/hooks'
import { selectAuthorizationStatus } from '@/store/auth/selectors'

type PrivateRouteProps = {
  children: JSX.Element
}

function PrivateRoute({ children }: PrivateRouteProps): JSX.Element {
  const authStatus = useAppSelector(selectAuthorizationStatus)

  if (authStatus === AuthorizationStatus.Unknown) {
    return <div className="loader">Проверка авторизации...</div>
  }

  return authStatus === AuthorizationStatus.Auth ? (
    children
  ) : (
    <Navigate to={AppRoute.Login} />
  )
}

export default PrivateRoute

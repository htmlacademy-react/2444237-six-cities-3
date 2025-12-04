import { AppRoute, AuthorizationStatus } from '@/const'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { logoutAction } from '@/store/auth/api-actions'
import {
  selectAuthorizationStatus,
  selectUserInfo,
} from '@/store/auth/selectors'
import { Link } from 'react-router-dom'

const UserNav = () => {
  const dispatch = useAppDispatch()
  const authStatus = useAppSelector(selectAuthorizationStatus)
  const userInfo = useAppSelector(selectUserInfo)

  const handleLogout = () => {
    dispatch(logoutAction())
  }

  const renderContent = () => {
    if (authStatus === AuthorizationStatus.Auth) {
      return (
        <>
          <li className="header__nav-item user">
            <a href="" className="header__nav-link header__nav-link--profile">
              <div className="header__avatar-wrapper user__avatar-wrapper"></div>
              <span className="header__user-name user__name">
                {userInfo?.email}
              </span>
              <span className="header__favorite-count">3</span>
            </a>
          </li>
          <li className="header__nav-item">
            <a
              href=""
              className="header__nav-link"
              onClick={(e) => {
                e.preventDefault()
                handleLogout()
              }}
            >
              <span className="header__signout">Sign out</span>
            </a>
          </li>
        </>
      )
    }

    return (
      <li className="header__nav-item user">
        <div className="header__avatar-wrapper user__avatar-wrapper"></div>
        <Link
          to={AppRoute.Login}
          className="header__nav-link header__nav-link--profile"
        >
          <span className="header__login">Sign in</span>
        </Link>
      </li>
    )
  }

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">{renderContent()}</ul>
    </nav>
  )
}

export default UserNav

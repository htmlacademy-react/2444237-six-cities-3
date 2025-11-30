import { Link } from 'react-router-dom'
import { AppRoute, AuthorizationStatus } from '@/const'
import Logo from '../logo/logo'
import { useAppSelector } from '@/hooks'
import {
  selectAuthorizationStatus,
  selectUserInfo,
} from '@/store/auth/selectors'

const Header = (): JSX.Element => {
  const authStatus = useAppSelector(selectAuthorizationStatus)
  const { email } = useAppSelector(selectUserInfo)

  const renderContent = () => {
    if (authStatus === AuthorizationStatus.Auth) {
      return (
        <>
          <li className="header__nav-item user">
            <a href="" className="header__nav-link header__nav-link--profile">
              <div className="header__avatar-wrapper user__avatar-wrapper"></div>
              <span className="header__user-name user__name">{email}</span>
              <span className="header__favorite-count">3</span>
            </a>
          </li>
          <li className="header__nav-item">
            <Link to={AppRoute.Login} className="header__nav-link">
              <span className="header__signout">Sign out</span>
            </Link>
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
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo type="header" />
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">{renderContent()}</ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header

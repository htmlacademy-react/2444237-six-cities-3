import UserNav from '../user-nav/user-nav'
import Logo from '../logo/logo'

type HeaderProps = {
  withUserNav: boolean
}
const Header = ({ withUserNav }: HeaderProps): JSX.Element => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo type="header" />
          </div>
          {withUserNav && <UserNav />}
        </div>
      </div>
    </header>
  )
}

export default Header

import { AppRoute } from '@/const'
import { Link } from 'react-router-dom'
const sizes = {
  header: {
    width: 81,
    height: 41,
  },
  footer: {
    width: 64,
    height: 33,
  },
}

type LogoType = {
  type: 'header' | 'footer'
}
const Logo = ({ type }: LogoType) => {
  const { width, height } = sizes[type]

  return (
    <Link className={`${type}__logo-link`} to={AppRoute.Main}>
      <img
        className={`${type}__logo`}
        src="img/logo.svg"
        alt="6 cities logo"
        width={width}
        height={height}
      />
    </Link>
  )
}

export default Logo

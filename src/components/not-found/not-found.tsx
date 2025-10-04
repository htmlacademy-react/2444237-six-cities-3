import { Link } from 'react-router-dom'
import Header from '../header/header'
import styles from './not-found.module.css'
import { AppRoute } from '../../const'

const NotFound = (): JSX.Element => (
  <>
    <Header />
    <h1 className={styles.title}>404</h1>
    <p className={styles.text}>Page not found</p>
    <button className={styles.button}>
      <Link to={AppRoute.Main}>Go to main page</Link>
    </button>
  </>
)

export default NotFound

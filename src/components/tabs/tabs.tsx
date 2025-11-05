import { useAppDispatch, useAppSelector } from '@/hooks'
import { setCity } from '@/store/action'
import { City, CITY_NAMES } from './const'
import clsx from 'clsx'

const Tabs = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const city = useAppSelector((state) => state.city)

  const handleClick = (cityName: City) => {
    dispatch(setCity(cityName))
  }

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {CITY_NAMES.map((cityName) => (
            <li key={cityName}>
              <a
                className={clsx(
                  'locations__item-link',
                  'tabs__item',
                  cityName === city ? 'tabs__item--active' : '',
                )}
                href="#"
                onClick={() => handleClick(cityName)}
              >
                <span>{cityName}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default Tabs

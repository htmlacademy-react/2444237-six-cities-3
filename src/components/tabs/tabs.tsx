import { CITY_NAMES } from '@/const'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { setCity } from '@/store/offers-slice'
import cn from 'classnames'

const Tabs = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const city = useAppSelector((state) => state.offers.city)

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {CITY_NAMES.map((cityName) => (
            <li className="locations__item" key={cityName}>
              <a
                className={cn('locations__item-link', 'tabs__item', {
                  'tabs__item--active': city === cityName,
                })}
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  dispatch(setCity(cityName))
                }}
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

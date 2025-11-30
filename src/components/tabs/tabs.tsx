import { CITY_NAMES } from '@/const'
import { useAppDispatch, useAppSelector } from '@/hooks'
import cn from 'classnames'
import { setCity } from '@/store/app-slice/app-slice'
import { selectCurrentCity } from '@/store/app-slice/selectors'

const Tabs = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const city = useAppSelector(selectCurrentCity)

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

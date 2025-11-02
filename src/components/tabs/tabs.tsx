import { useAppDispatch, useAppSelector } from '@/hooks'
import { setCity } from '@/store/action'
import { cityNames } from './const'

const Tabs = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const city = useAppSelector((state) => state.city)
  const handleClick = (evt: React.MouseEvent<HTMLAnchorElement>) => {
    dispatch(setCity(evt.currentTarget.dataset.city as string))
  }
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cityNames.map((cityName) => (
            <li key={cityName}>
              <a
                className={`locations__item-link tabs__item ${cityName === city ? 'tabs__item--active' : ''}`}
                href="#"
                onClick={handleClick}
                data-city={cityName}
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

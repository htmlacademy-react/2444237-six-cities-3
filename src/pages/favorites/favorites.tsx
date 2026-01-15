import Card from '@/components/card/card'
import Footer from '@/components/footer/footer'
import Header from '@/components/header/header'
import { Offer } from '@/types/offers'
import { OfferCardClassNames } from '@/const'
import { getRatingPercent } from '../offer/utils'
import { useAppSelector } from '@/hooks'
import { selectFavoriteOffers } from '@/store/favorite-slice/selectors'

const Favorites = (): JSX.Element => {
  const items = useAppSelector(selectFavoriteOffers)

  const favoritesByCity = items
    .filter((item) => item.isFavorite)
    .reduce<Record<string, Offer[]>>((acc, offer) => {
      const city = offer.city.name
      if (acc[city]) {
        acc[city].push(offer)
      } else {
        acc[city] = [offer]
      }
      return acc
    }, {})

  return (
    <div className="page page--favorites-empty">
      <Header withUserNav />
      {items.length === 0 ? (
        <main className="page__main page__main--favorites page__main--favorites-empty">
          <div className="page__favorites-container container">
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">
                  Save properties to narrow down search or plan your future
                  trips.
                </p>
              </div>
            </section>
          </div>
        </main>
      ) : (
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {Object.entries(favoritesByCity).map(([city, cityOrders]) => (
                  <li className="favorites__locations-items" key={city}>
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <a className="locations__item-link" href="#">
                          <span>{city}</span>
                        </a>
                      </div>
                    </div>
                    <div className="favorites__places">
                      {cityOrders.map((item) => (
                        <Card
                          key={item.id}
                          id={item.id}
                          image={item.previewImage}
                          price={item.price}
                          rating={getRatingPercent(item.rating)}
                          name={item.title}
                          width="150"
                          height="110"
                          type={item.type}
                          className={OfferCardClassNames.favorites}
                          isPremium={item.isPremium}
                          view="favorites"
                        />
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </main>
      )}
      <Footer />
    </div>
  )
}

export default Favorites

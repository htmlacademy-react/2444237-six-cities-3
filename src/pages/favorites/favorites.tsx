import Card from '@/components/card/card'
import Footer from '@/components/footer/footer'
import Header from '@/components/header/header'
import { Offer } from '@/types/offers'
import { OfferCardClassNames } from '@/const'
import { getRatingPercent } from '../offer/utils'

type FavoritesProps = {
  items: Offer[]
}

const Favorites = ({ items }: FavoritesProps): JSX.Element => {
  const favoriteByCity = items
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
    <div className="page">
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {Object.entries(favoriteByCity).map(([city, cityOrders]) => (
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
      <Footer />
    </div>
  )
}

export default Favorites

import Footer from '../../components/footer/footer'
import Header from '../../components/header/header'
import { Offer } from '../../types/offers'

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
                      <article
                        className="favorites__card place-card"
                        key={item.id}
                      >
                        <div className="place-card__mark">
                          <span>{item.isPremium ? 'Premium' : ''}</span>
                        </div>
                        <div className="favorites__image-wrapper place-card__image-wrapper">
                          <a href="#">
                            <img
                              className="place-card__image"
                              src={item.previewImage}
                              width={150}
                              height={110}
                              alt="Place image"
                            />
                          </a>
                        </div>
                        <div className="favorites__card-info place-card__info">
                          <div className="place-card__price-wrapper">
                            <div className="place-card__price">
                              <b className="place-card__price-value">
                                {item.price}
                              </b>
                              <span className="place-card__price-text">
                                /&nbsp;night
                              </span>
                            </div>
                            <button
                              className="place-card__bookmark-button place-card__bookmark-button--active button"
                              type="button"
                            >
                              <svg
                                className="place-card__bookmark-icon"
                                width={18}
                                height={19}
                              >
                                <use xlinkHref="#icon-bookmark" />
                              </svg>
                              <span className="visually-hidden">
                                In bookmarks
                              </span>
                            </button>
                          </div>
                          <div className="place-card__rating rating">
                            <div className="place-card__stars rating__stars">
                              <span
                                style={{
                                  width: `${(item.rating * 100) / 5}%`,
                                }}
                              />
                              <span className="visually-hidden">Rating</span>
                            </div>
                          </div>
                          <h2 className="place-card__name">
                            <a href="#">{item.title}</a>
                          </h2>
                          <p className="place-card__type">{item.type}</p>
                        </div>
                      </article>
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

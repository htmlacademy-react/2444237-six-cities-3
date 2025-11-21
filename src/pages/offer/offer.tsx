import { useParams } from 'react-router-dom'
import ReviewForm from '@/components/review-form/review-form'
import { Review } from '@/types/reviews'
import Card from '@/components/card/card'
import { OfferCardClassNames } from '@/const'
import Map from '@/components/map/map'

import { getNearOffers, getRatingPercent } from './utils'
import { useAppSelector } from '@/hooks'

type OfferProps = {
  reviews: Review[]
}
const Offer = ({ reviews }: OfferProps) => {
  const { id } = useParams<{ id: string }>()
  const offers = useAppSelector((state) => state.offers.offers)
  const offer = offers.find((item) => item.id === id)
  if (!offer) return null
  const nearOffers = getNearOffers(offer, offers)
  const nearOffersPlusCurrent = [...nearOffers, offer]

  const reviewsForOffers = reviews.filter((review) => review.id === id)
  return (
    <main className="page__main page__main--offer">
      <section className="offer">
        <div className="offer__gallery-container container">
          <div className="offer__gallery">
            <div className="offer__image-wrapper">
              <img
                className="offer__image"
                src="img/room.jpg"
                alt="Photo studio"
              />
            </div>
            <div className="offer__image-wrapper">
              <img
                className="offer__image"
                src="img/apartment-01.jpg"
                alt="Photo studio"
              />
            </div>
            <div className="offer__image-wrapper">
              <img
                className="offer__image"
                src="img/apartment-02.jpg"
                alt="Photo studio"
              />
            </div>
            <div className="offer__image-wrapper">
              <img
                className="offer__image"
                src="img/apartment-03.jpg"
                alt="Photo studio"
              />
            </div>
            <div className="offer__image-wrapper">
              <img
                className="offer__image"
                src="img/studio-01.jpg"
                alt="Photo studio"
              />
            </div>
            <div className="offer__image-wrapper">
              <img
                className="offer__image"
                src="img/apartment-01.jpg"
                alt="Photo studio"
              />
            </div>
          </div>
        </div>
        <div className="offer__container container">
          <div className="offer__wrapper">
            <div className="offer__mark">
              <span>Premium</span>
            </div>
            <div className="offer__name-wrapper">
              {offer && <h1 className="offer__name">{offer.title}</h1>}
              <button className="offer__bookmark-button button" type="button">
                <svg className="offer__bookmark-icon" width={31} height={33}>
                  <use xlinkHref="#icon-bookmark" />
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button>
            </div>
            <div className="offer__rating rating">
              <div className="offer__stars rating__stars">
                <span style={{ width: '80%' }} />
                <span className="visually-hidden">Rating</span>
              </div>
              {offer && (
                <span className="offer__rating-value rating__value">
                  {offer.rating}
                </span>
              )}
            </div>
            <ul className="offer__features">
              {offer && offer.type && (
                <li className="offer__feature offer__feature--entire">
                  {offer.type}
                </li>
              )}

              <li className="offer__feature offer__feature--bedrooms">
                3 Bedrooms
              </li>
              <li className="offer__feature offer__feature--adults">
                Max 4 adults
              </li>
            </ul>
            <div className="offer__price">
              {offer && <b className="offer__price-value">€{offer.price}</b>}
              <span className="offer__price-text">&nbsp;night</span>
            </div>
            <div className="offer__inside">
              <h2 className="offer__inside-title">What&apos;s inside</h2>
              <ul className="offer__inside-list">
                <li className="offer__inside-item">Wi-Fi</li>
                <li className="offer__inside-item">Washing machine</li>
                <li className="offer__inside-item">Towels</li>
                <li className="offer__inside-item">Heating</li>
                <li className="offer__inside-item">Coffee machine</li>
                <li className="offer__inside-item">Baby seat</li>
                <li className="offer__inside-item">Kitchen</li>
                <li className="offer__inside-item">Dishwasher</li>
                <li className="offer__inside-item">Cabel TV</li>
                <li className="offer__inside-item">Fridge</li>
              </ul>
            </div>
            <div className="offer__host">
              <h2 className="offer__host-title">Meet the host</h2>
              <div className="offer__host-user user">
                <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                  <img
                    className="offer__avatar user__avatar"
                    src="img/avatar-angelina.jpg"
                    width={74}
                    height={74}
                    alt="Host avatar"
                  />
                </div>
                <span className="offer__user-name">Angelina</span>
                <span className="offer__user-status">Pro</span>
              </div>
              <div className="offer__description">
                <p className="offer__text">
                  A quiet cozy and picturesque that hides behind a a river by
                  the unique lightness of Amsterdam. The building is green and
                  from 18th century.
                </p>
                <p className="offer__text">
                  An independent House, strategically located between Rembrand
                  Square and National Opera, but where the bustle of the city
                  comes to rest in this alley flowery and colorful.
                </p>
              </div>
            </div>
            <section className="offer__reviews reviews">
              <h2 className="reviews__title">
                Reviews ·{' '}
                <span className="reviews__amount">
                  {reviewsForOffers.length}
                </span>
              </h2>
              <ul className="reviews__list">
                {reviewsForOffers.map((review) => (
                  <li
                    key={review.date + review.user.name}
                    className="reviews__item"
                  >
                    <div className="reviews__user user">
                      <div className="reviews__avatar-wrapper user__avatar-wrapper">
                        <img
                          className="reviews__avatar user__avatar"
                          src="img/avatar-max.jpg"
                          width={54}
                          height={54}
                          alt="Reviews avatar"
                        />
                      </div>
                      <span className="reviews__user-name">
                        {review.user.name}
                      </span>
                    </div>
                    <div className="reviews__info">
                      <div className="reviews__rating rating">
                        <div className="reviews__stars rating__stars">
                          <span
                            style={{ width: `${(review.rating * 100) / 5}%` }}
                          />
                          <span className="visually-hidden">Rating</span>
                        </div>
                      </div>
                      <p className="reviews__text">{review.comment}</p>
                      <time className="reviews__time" dateTime="2019-04-24">
                        {review.date}
                      </time>
                    </div>
                  </li>
                ))}
              </ul>
              <ReviewForm />
            </section>
          </div>
        </div>
        <Map
          className="offer__map map"
          offers={nearOffersPlusCurrent}
          activeOfferId={offer?.id}
        />
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">
            Other places in the neighbourhood
          </h2>
          <div className="near-places__list places__list">
            {nearOffers.map((item) => (
              <Card
                key={item.id}
                id={item.id}
                image={item.previewImage}
                price={item.price}
                rating={getRatingPercent(item.rating)}
                name={item.title}
                type={item.type}
                className={OfferCardClassNames.near}
                width="260"
                height="200"
                view="near"
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

export default Offer

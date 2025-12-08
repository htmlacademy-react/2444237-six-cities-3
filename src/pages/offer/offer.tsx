import { useParams } from 'react-router-dom'
import ReviewForm from '@/components/review-form/review-form'
import Card from '@/components/card/card'
import { AuthorizationStatus, OfferCardClassNames } from '@/const'
import Map from '@/components/map/map'
import type { Offer } from '@/types/offers'

import { getRatingPercent } from './utils'
import { useAppDispatch, useAppSelector } from '@/hooks'
import Header from '@/components/header/header'
import { useEffect } from 'react'
import { loadNearOffers, loadOfferInfo } from '@/store/offer-slice/api-actions'
import { selectNearOffers, selectOffer } from '@/store/offer-slice/selectors'
import { loadOfferComments } from '@/store/comments-slice/api-actions'
import { selectComments } from '@/store/comments-slice/selectors'
import { selectAuthorizationStatus } from '@/store/auth/selectors'

const Offer = () => {
  const { id } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()
  const offer = useAppSelector(selectOffer)
  const nearOffers = useAppSelector(selectNearOffers)
  const comments = useAppSelector(selectComments)
  const authorizationStatus = useAppSelector(selectAuthorizationStatus)

  useEffect(() => {
    if (id) {
      dispatch(loadOfferInfo(id))
      dispatch(loadNearOffers(id))
      dispatch(loadOfferComments(id))
    }
  }, [dispatch, id])

  const nearOffersWithCurrentOffer = [...nearOffers, offer]

  if (!offer) return null

  return (
    <>
      <Header withUserNav />
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {offer.images.map((image) => (
                <div className="offer__image-wrapper" key={image}>
                  <img className="offer__image" src={image} alt="Studio" />
                </div>
              ))}
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
                  <span
                    style={{ width: `${(offer.rating * 100) / 5}%` }}
                  ></span>
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
                  {offer.bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  {offer.maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                {offer && <b className="offer__price-value">€{offer.price}</b>}
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {offer.goods.map((good) => (
                    <li key={good} className="offer__inside-item">
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className="offer__avatar user__avatar"
                      src={offer.host.avatarUrl}
                      width={74}
                      height={74}
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">{offer.host.name}</span>
                  {offer.host.isPro && (
                    <span className="offer__user-status">Pro</span>
                  )}
                </div>
                <div className="offer__description">
                  <p className="offer__text">{offer.description}</p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">
                  Reviews ·{' '}
                  <span className="reviews__amount">{comments.length}</span>
                </h2>
                <ul className="reviews__list">
                  {comments.map((comment) => (
                    <li
                      key={comment.date + comment.user.name}
                      className="reviews__item"
                    >
                      <div className="reviews__user user">
                        <div className="reviews__avatar-wrapper user__avatar-wrapper">
                          <img
                            className="reviews__avatar user__avatar"
                            src={comment.user.avatarUrl}
                            width={54}
                            height={54}
                            alt="Reviews avatar"
                          />
                        </div>
                        <span className="reviews__user-name">
                          {comment.user.name}
                        </span>
                      </div>
                      <div className="reviews__info">
                        <div className="reviews__rating rating">
                          <div className="reviews__stars rating__stars">
                            <span
                              style={{
                                width: `${(comment.rating * 100) / 5}%`,
                              }}
                            />
                            <span className="visually-hidden">Rating</span>
                          </div>
                        </div>
                        <p className="reviews__text">{comment.comment}</p>
                        <time className="reviews__time" dateTime="2019-04-24">
                          {comment.date}
                        </time>
                      </div>
                    </li>
                  ))}
                </ul>
                {authorizationStatus === AuthorizationStatus.Auth && (
                  <ReviewForm offerId={id} />
                )}
              </section>
            </div>
          </div>
          <Map
            className="offer__map map"
            offers={nearOffersWithCurrentOffer as Offer[]}
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
    </>
  )
}

export default Offer

import { useParams } from 'react-router-dom'
import Card from '@/components/card/card'
import { OfferCardClassNames } from '@/const'
import Map from '@/components/map/map'
import type { Offer } from '@/types/offers'

import { getNearOffers, getRatingPercent } from './utils'
import { useAppDispatch, useAppSelector } from '@/hooks'
import Header from '@/components/header/header'
import { useEffect } from 'react'
import { loadNearOffers, loadOfferInfo } from '@/store/offer-slice/api-actions'
import {
  selectNearOffers,
  selectOffer,
  selectOfferLoading,
} from '@/store/offer-slice/selectors'
import { loadOfferComments } from '@/store/comments-slice/api-actions'
import FullPageError from '@/components/full-page-error/full-page-error'
import Spinner from '@/components/spinner/spinner'
import OfferGallery from '@/components/offer-gallery/offer-gallery'
import OfferInside from '@/offer-inside/offer-inside'
import OfferReviews from '@/components/offer-reviews/offer-reviews'
import FavoriteButton from '@/components/favorite-button/favorite-button'

const Offer = () => {
  const { id } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()
  const offer = useAppSelector(selectOffer)
  const nearsOffers = getNearOffers(useAppSelector(selectNearOffers))
  const isLoading = useAppSelector(selectOfferLoading)

  useEffect(() => {
    if (id) {
      dispatch(loadOfferInfo(id))
      dispatch(loadNearOffers(id))
      dispatch(loadOfferComments(id))
    }
  }, [dispatch, id])

  const nearOffersWithCurrentOffer = [...nearsOffers, offer]

  if (isLoading) {
    return <Spinner />
  }

  if (!offer) {
    return <FullPageError />
  }

  return (
    <>
      <Header />
      <main className="page__main page__main--offer">
        <section className="offer">
          <OfferGallery images={offer.images} />
          <div className="offer__container container">
            <div className="offer__wrapper">
              {offer.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{offer.title}</h1>
                <FavoriteButton id={offer.id} type="offer" />
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars" style={{ width: '146px' }}>
                  <span
                    style={{ width: `${getRatingPercent(offer.rating)}%` }}
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
                  {offer.maxAdults > 1 ? `${offer.maxAdults} adults` : `${offer.maxAdults} adult`}
                </li>
              </ul>
              <div className="offer__price">
                {offer && <b className="offer__price-value">€{offer.price}</b>}
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <OfferInside goods={offer.goods} />
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className="offer__avatar user__avatar"
                      src={offer?.host.avatarUrl}
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
              <OfferReviews offerId={id} />
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
              {nearsOffers.map((item) => (
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

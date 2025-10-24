import Header from '@/components/header/header'
import Tabs from '@/components/tabs/tabs'
import Sort from '@/components/sort/sort'
import { Offer, OfferCity } from '@/types/offers'
import CardList from '@/components/card-list/card-list'
import Map from '@/components/map/map'
import { useState } from 'react'

type MainProps = {
  offers: Offer[]
}

const Main = ({ offers }: MainProps): JSX.Element => {
  const [selectedOfferId, setSelectedOfferId] = useState<string | null>(null)
  const city = offers.find((offer) => offer.city.name === 'Amsterdam')?.city

  const handleOfferListHover = (listOfferItemId: string | null) => {
    setSelectedOfferId(listOfferItemId)
  }

  return (
    <div className="page page--gray page--main">
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <Tabs />
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">312 places to stay in Amsterdam</b>
              <Sort />
              <div className="cities__places-list places__list tabs__content">
                <CardList
                  listOffers={offers}
                  onCardAction={handleOfferListHover}
                />
              </div>
            </section>
            <div className="cities__right-section">
              <Map
                className={'cities__map'}
                city={city as OfferCity}
                offers={offers}
                activeOfferId={selectedOfferId}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Main

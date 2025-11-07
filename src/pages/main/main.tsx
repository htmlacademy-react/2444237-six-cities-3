import Header from '@/components/header/header'
import Tabs from '@/components/tabs/tabs'
import Sort from '@/components/sort/sort'
import CardList from '@/components/card-list/card-list'
import Map from '@/components/map/map'
import { useState } from 'react'
import { useAppSelector } from '@/hooks'
import { getOffersByCity } from '@/utils'
import MainEmpty from '@/components/main-empty/main-empty'

const Main = (): JSX.Element => {
  const [selectedOfferId, setSelectedOfferId] = useState<string | null>(null)
  const offers = useAppSelector((state) => state.offers)
  const city = useAppSelector((state) => state.city)
  const filteredOffers = getOffersByCity(offers, city)

  const isEmpty = filteredOffers.length === 0

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
          {isEmpty ? (
            <MainEmpty />
          ) : (
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">
                  {filteredOffers.length} places to stay in {city}
                </b>
                <Sort />
                <div className="cities__places-list places__list tabs__content">
                  <CardList
                    listOffers={filteredOffers}
                    onCardAction={handleOfferListHover}
                  />
                </div>
              </section>
              <div className="cities__right-section">
                <Map
                  className={'cities__map'}
                  offers={filteredOffers}
                  activeOfferId={selectedOfferId}
                />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default Main

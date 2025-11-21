import Header from '@/components/header/header'
import Tabs from '@/components/tabs/tabs'
import Sort from '@/components/sort/sort'
import CardList from '@/components/card-list/card-list'
import Map from '@/components/map/map'
import { useState } from 'react'
import { useAppSelector } from '@/hooks'
import { prepareOffers } from '@/utils'
import MainEmpty from '@/components/main-empty/main-empty'
import Loading from '@/components/loading/loading'

const Main = (): JSX.Element => {
  const [selectedOfferId, setSelectedOfferId] = useState<string | null>(null)

  const offers = useAppSelector((state) => state.offers.offers)
  const city = useAppSelector((state) => state.offers.city)
  const sortType = useAppSelector((state) => state.offers.sortType)
  const isLoading = useAppSelector((state) => state.offers.isLoading)

  const offersList = prepareOffers(offers, city, sortType)

  const isEmpty = offersList.length === 0

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
          {isEmpty && !isLoading ? (
            <MainEmpty />
          ) : (
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">
                  {offersList.length} places to stay in {city}
                </b>
                <Sort activeSortType={sortType} />
                <div className="cities__places-list places__list tabs__content">
                  {isLoading && <Loading />}
                  <CardList
                    listOffers={offersList}
                    onCardAction={handleOfferListHover}
                  />
                </div>
              </section>
              <div className="cities__right-section">
                {!isLoading && !isEmpty && (
                  <Map
                    className={'cities__map'}
                    offers={offersList}
                    activeOfferId={selectedOfferId}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default Main

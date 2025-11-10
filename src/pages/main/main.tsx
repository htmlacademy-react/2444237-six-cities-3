import Header from '@/components/header/header'
import Tabs from '@/components/tabs/tabs'
import Sort from '@/components/sort/sort'
import CardList from '@/components/card-list/card-list'
import Map from '@/components/map/map'
import { useState } from 'react'
import { useAppSelector } from '@/hooks'
import { prepareOffers } from '@/utils'
import MainEmpty from '@/components/main-empty/main-empty'
import { SORT_TYPES } from '@/components/sort/const'

const Main = (): JSX.Element => {
  const [selectedOfferId, setSelectedOfferId] = useState<string | null>(null)
  const [activeSortType, setActiveSortType] = useState<string>(SORT_TYPES[0])

  const offers = useAppSelector((state) => state.offers)
  const city = useAppSelector((state) => state.city)
  const offersList = prepareOffers(offers, city, activeSortType)

  const isEmpty = offersList.length === 0

  const handleOfferListHover = (listOfferItemId: string | null) => {
    setSelectedOfferId(listOfferItemId)
  }

  const handleSortChange = (sortType: string) => {
    setActiveSortType(sortType)
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
                  {offersList.length} places to stay in {city}
                </b>
                <Sort
                  onSortChange={handleSortChange}
                  activeSortType={activeSortType}
                />
                <div className="cities__places-list places__list tabs__content">
                  <CardList
                    listOffers={offersList}
                    onCardAction={handleOfferListHover}
                  />
                </div>
              </section>
              <div className="cities__right-section">
                <Map
                  className={'cities__map'}
                  offers={offersList}
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

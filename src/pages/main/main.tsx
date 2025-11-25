import Header from '@/components/header/header'
import Tabs from '@/components/tabs/tabs'
import Sort from '@/components/sort/sort'
import CardList from '@/components/card-list/card-list'
import Map from '@/components/map/map'
import { useState } from 'react'
import { useAppSelector } from '@/hooks'
import { prepareOffers } from '@/utils'
import MainEmpty from '@/components/main-empty/main-empty'
import Spinner from '@/components/spinner/spinner'
import {
  selectCurrentCity,
  selectCurrentSortType,
  selectError,
  selectIsLoading,
  selectOffers,
} from '@/store/selectors'
import FullPageError from '@/components/full-page-error/full-page-error'

const Main = (): JSX.Element => {
  const [selectedOfferId, setSelectedOfferId] = useState<string | null>(null)

  const offers = useAppSelector(selectOffers)
  const city = useAppSelector(selectCurrentCity)
  const sortType = useAppSelector(selectCurrentSortType)
  const isLoading = useAppSelector(selectIsLoading)
  const error = useAppSelector(selectError)

  const offersList = prepareOffers(offers, city, sortType)

  const isEmpty = offersList.length === 0

  const handleOfferListHover = (listOfferItemId: string | null) => {
    setSelectedOfferId(listOfferItemId)
  }
  const renderMap = () => {
    return (
      <Map
        className={'cities__map'}
        offers={offersList}
        activeOfferId={selectedOfferId}
      />
    )
  }
  const renderContent = () => {
    if (isLoading) return <Spinner />
    if (error) return <FullPageError />
    if (isEmpty) return <MainEmpty />
    return (
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">
            {offersList.length} places to stay in {city}
          </b>
          <Sort activeSortType={sortType} />
          <div className="cities__places-list places__list tabs__content">
            <CardList
              listOffers={offersList}
              onCardAction={handleOfferListHover}
            />
          </div>
        </section>
        <div className="cities__right-section">{renderMap()}</div>
      </div>
    )
  }

  return (
    <div className="page page--gray page--main">
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <Tabs />
        <div className="cities">{renderContent()}</div>
      </main>
    </div>
  )
}

export default Main

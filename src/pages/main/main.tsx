import Header from '../../components/header/header';
import Card from '../../components/card/card';
import Tabs from '../../components/tabs/tabs';
import Sort from '../../components/sort/sort';

const Main = () : JSX.Element => (
  <div className="page page--gray page--main">
    <Header/>
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <Tabs/>
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">312 places to stay in Amsterdam</b>
            <Sort/>
            <div className="cities__places-list places__list tabs__content">
              <Card image="img/apartment-01.jpg" value={120} width={80} name="Beautiful &amp; luxurious apartment at great location" type="Apartment" />
              <Card image="img/room.jpg" value={80} width={80} name="Wood and stone place" type="Room" />
              <Card image="img/apartment-02.jpg" value={132} width={80} name="Canal View Prinsengracht" type="Apartment" />
              <Card image="img/apartment-03.jpg" value={180} width={100} name="Nice, cozy, warm big bed apartment" type="Apartment" />
              <Card image="img/room.jpg" value={80} width={80} name="Wood and stone place" type="Room" />
            </div>
          </section>
          <div className="cities__right-section">
            <section className="cities__map map"></section>
          </div>
        </div>
      </div>
    </main>
  </div>);


export default Main;

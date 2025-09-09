import MainComponent from '../pages/main/main';
import Card from '../components/card/card';
import Header from '../components/header/header';

const App = () : JSX.Element => (
  <>
    <Header />
    <MainComponent>
      <Card image="img/apartment-01.jpg" value={120} width={80} name="Beautiful &amp; luxurious apartment at great location" type="Apartment" />
      <Card image="img/room.jpg" value={80} width={80} name="Wood and stone place" type="Room" />
      <Card image="img/apartment-02.jpg" value={132} width={80} name="Canal View Prinsengracht" type="Apartment" />
      <Card image="img/apartment-03.jpg" value={180} width={100} name="Nice, cozy, warm big bed apartment" type="Apartment" />
      <Card image="img/room.jpg" value={80} width={80} name="Wood and stone place" type="Room" />
    </MainComponent>
  </>
);

export default App;

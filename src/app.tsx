import NotFound from './components/not-found/not-found';
import Favorites from './pages/favorites/favorites';
import Login from './pages/login/login';
import Main from './pages/main/main';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Offer from './pages/offer/offer';
import { AppRoute } from './const';
import PrivateRoute from './components/private-route/private-route';
import { AuthorizationStatus } from './const';

const App = () : JSX.Element => (
  <BrowserRouter>
    <Routes>
      <Route index element={<Main />}/>
      <Route path={AppRoute.Login} element={<Login/>}/>
      <Route path={AppRoute.Favorites} element={
        <PrivateRoute authStatus={AuthorizationStatus.NoAuth}>
          <Favorites/>
        </PrivateRoute>
      }
      >
      </Route>
      <Route path={AppRoute.Offer} element={<Offer/>}/>

      <Route path={AppRoute.NotFound} element={<NotFound/>}/>
    </Routes>
  </BrowserRouter>
);

export default App;

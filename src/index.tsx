import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app'
import { Provider } from 'react-redux'
import { store } from './store'
import ErrorMessage from './components/error-message/error-message'
import { fetchOffersAction } from './store/offers-slice/api-actions'
import { checkAuthAction } from './store/auth/api-actions'

store.dispatch(fetchOffersAction())
store.dispatch(checkAuthAction())

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorMessage />
      <App />
    </Provider>
  </React.StrictMode>,
)

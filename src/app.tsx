import { RouterProvider } from 'react-router-dom'
import { router } from './router/router'
import { Suspense } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = (): JSX.Element => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
      <ToastContainer position="top-right" autoClose={5000} />
    </Suspense>
  )
}

export default App

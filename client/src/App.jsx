import React from 'react'
import { useRoutes } from 'react-router-dom'
import Navigation from './components/Navigation'
import ViewCars from './pages/ViewCars'
import EditCar from './pages/EditCar'
import CreateCar from './pages/CreateCar'
import CarDetails from './pages/CarDetails'
import './App.css'

const App = () => {
  const element = useRoutes([
    {
      path: '/',
      element: <ViewCars title='BOLT BUCKET | Custom Cars' />
    },
     {
    path: '/customcars',  // <--- match the URL
    element: <ViewCars title='BOLT BUCKET | Custom Cars' />
  },
    {
      path: '/viewcars',
      element: <ViewCars title='BOLT BUCKET | Custom Cars' />
    },
    {
      path: '/createcar',
      element: <CreateCar title='BOLT BUCKET | Customize' />
    },
    {
      path: '/cardetails/:id',
      element: <CarDetails title='BOLT BUCKET | View' />
    },
    {
      path: '/edit/:id',
      element: <EditCar title='BOLT BUCKET | Edit' />
    }
  ])

  return (
    <div className='app'>
      <Navigation />
      {element}
    </div>
  )
}

export default App
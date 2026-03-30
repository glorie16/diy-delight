// client/src/pages/ViewCars.jsx
import { useEffect, useState } from 'react'
import { getAllCars, deleteCar } from '../services/CarsAPI'
import { Link } from 'react-router-dom'
import CarCard from '../components/CarCard'

export default function ViewCars() {
  const [cars, setCars] = useState([])

  useEffect(() => {
    fetchCars()
  }, [])

  const fetchCars = async () => {
    try {
      const data = await getAllCars()
      setCars(data)
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteCar(id)
      setCars(cars.filter(car => car.id !== id))
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh', padding: '20px' }}>
      <h1 style={{ color: '#fff' }}>All Cars</h1>
      <Link to="/createcar" style={{ color: '#ff5252', textDecoration: 'underline', marginBottom: '20px', display: 'inline-block' }}>
        Add New Car
      </Link>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        {cars.map(car => (
          <CarCard key={car.id} car={car} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  )
}
// client/src/pages/CarDetails.jsx
import { useEffect, useState } from 'react'
import { getCar, deleteCar } from '../services/CarsAPI'
import { useParams, useNavigate } from 'react-router-dom'

export default function CarDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [car, setCar] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const data = await getCar(id)
        setCar(data)
      } catch (err) {
        console.error(err)
        setError('Failed to load car details.')
      }
    }
    fetchCar()
  }, [id])

  const handleDelete = async () => {
    try {
      await deleteCar(id)
      navigate('/viewcars')
    } catch (err) {
      console.error(err)
      setError('Failed to delete car.')
    }
  }

  if (!car) return <p style={{ color: '#fff' }}>{error || 'Loading...'}</p>

  return (
    <div style={{ color: '#fff', backgroundColor: '#000', padding: '20px', minHeight: '100vh' }}>
      <h1>{car.name}</h1>
      {/* <img src={`/images/red-standard.png`}></img> */}
      <img
        src={`/images/${car.exterior.toLowerCase()}-${car.wheels.toLowerCase()}.png`}
        alt="Car Preview"
        style={{ width: '100%', maxWidth: '500px', borderRadius: '10px', marginBottom: '15px' }}
        onError={(e) => {
        e.target.onerror = null; // prevent infinite loop
        e.target.src = `/images/${car.exterior.toLowerCase()}-${car.wheels.toLowerCase()}.jpg`;
    }}
      />
      <p>Base Price: ${car.base_price.toLocaleString()}</p>
      <p>Exterior: {car.exterior}</p>
      <p>Wheels: {car.wheels}</p>
      <p>Total Price: ${car.total_price.toLocaleString()}</p>
      <button onClick={handleDelete} style={{ padding: '10px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '5px' }}>
        Delete Car
      </button>
    </div>
  )
}
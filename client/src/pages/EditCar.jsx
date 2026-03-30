// client/src/pages/EditCar.jsx
import { useState, useEffect } from 'react'
import { getCar, updateCar } from '../services/CarsAPI'
import { useNavigate, useParams } from 'react-router-dom'

export default function EditCar() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [basePrice, setBasePrice] = useState(50000)
  const [exterior, setExterior] = useState('Red')
  const [wheels, setWheels] = useState('Standard')
  const [error, setError] = useState('')

  const exteriorPrices = { Red: 1000, Blue: 1200, Black: 1500, Purple: 1800 }
  const wheelsPrices = { Standard: 0, Sport: 2000, Premium: 4000 }

  const totalPrice =
    Number(basePrice) +
    Number(exteriorPrices[exterior] || 0) +
    Number(wheelsPrices[wheels] || 0)

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const data = await getCar(id)
        setName(data.name)
        setBasePrice(Number(data.base_price))
        setExterior(data.exterior)
        setWheels(data.wheels)
      } catch (err) {
        console.error(err)
        setError('Failed to load car.')
      }
    }
    fetchCar()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Impossible combo rule
    if (exterior === 'Purple' && wheels === 'Standard') {
      alert('Impossible combo: Purple cars cannot have Standard wheels!')
      return
    }

    try {
      await updateCar(id, {
        name,
        base_price: Number(basePrice),
        total_price: totalPrice,
        exterior,
        wheels,
      })
      navigate('/viewcars')
    } catch (err) {
      console.error(err)
      setError('Failed to update car.')
    }
  }

  return (
    <div style={{ color: '#fff', backgroundColor: '#000', padding: '20px', minHeight: '100vh' }}>
      <h1>Edit Custom Car</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '500px' }}>
        
        <label>
          Name:
          <input type="text" value={name} onChange={e => setName(e.target.value)} required />
        </label>

        <label>
          Base Price:
          <input type="number" value={basePrice} onChange={e => setBasePrice(Number(e.target.value))} />
        </label>

        {/* EXTERIOR OPTIONS */}
        <div>
          <h3>Choose Exterior:</h3>
          <div style={styles.options}>
            {['Red', 'Blue', 'Black', 'Purple'].map(color => (
              <div
                key={color}
                onClick={() => setExterior(color)}
                style={{
                  ...styles.optionCard,
                  border: exterior === color ? '2px solid #ff5252' : '2px solid transparent'
                }}
              >
                <img
                  src={`/images/${color.toLowerCase()}.png`}
                  alt={color}
                  style={styles.optionImage}
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = `/images/${color.toLowerCase()}.jpg`
                  }}
                />
                <p>{color}</p>
              </div>
            ))}
          </div>
        </div>

        {/* WHEELS OPTIONS */}
        <div>
          <h3>Choose Wheels:</h3>
          <div style={styles.options}>
            {['Standard', 'Sport', 'Premium'].map(type => (
              <div
                key={type}
                onClick={() => setWheels(type)}
                style={{
                  ...styles.optionCard,
                  border: wheels === type ? '2px solid #ff5252' : '2px solid transparent'
                }}
              >
                <img
                  src={`/images/${type.toLowerCase()}.png`}
                  alt={type}
                  style={styles.optionImage}
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = `/images/${type.toLowerCase()}.jpg`
                  }}
                />
                <p>{type}</p>
              </div>
            ))}
          </div>
        </div>

        {/* LIVE PREVIEW */}
        <div>
          <h3>Preview:</h3>
          <img
            src={`/images/${exterior.toLowerCase()}-${wheels.toLowerCase()}.png`}
            alt={`${exterior} car with ${wheels} wheels`}
            style={{ width: '100%', maxWidth: '400px', borderRadius: '10px' }}
            onError={(e) => {
              e.target.onerror = null
              e.target.src = `/images/${exterior.toLowerCase()}-${wheels.toLowerCase()}.jpg`
            }}
          />
        </div>

        <p>Total Price: ${totalPrice.toLocaleString()}</p>

        <button
          type="submit"
          style={{
            padding: '10px',
            backgroundColor: '#2196f3',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
          }}
        >
          Update Car
        </button>
      </form>
    </div>
  )
}

// STYLES
const styles = {
  options: {
    display: 'flex',
    gap: '15px',
    flexWrap: 'wrap',
  },
  optionCard: {
    cursor: 'pointer',
    padding: '10px',
    borderRadius: '10px',
    backgroundColor: '#111',
    textAlign: 'center',
    transition: '0.2s',
  },
  optionImage: {
    width: '80px',
    height: '60px',
    objectFit: 'cover',
    borderRadius: '5px',
  }
}
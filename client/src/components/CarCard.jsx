// client/src/components/CarCard.jsx
import React from 'react'
import { Link } from 'react-router-dom'

export default function CarCard({ car, onDelete }) {
  return (
    <div style={styles.card}>
      <img
        src={`/images/${car.exterior.toLowerCase()}-${car.wheels.toLowerCase()}.png`}
        alt="Car Preview"
        style={{ width: '100%', borderRadius: '10px', marginBottom: '10px' }}
        onError={(e) => {
          e.target.onerror = null
          e.target.src = `/images/${car.exterior.toLowerCase()}-${car.wheels.toLowerCase()}.jpg`
        }}
      />
      <h2 style={styles.title}>{car.name}</h2>
      <p style={styles.price}>${car.total_price.toLocaleString()}</p>
      <div style={styles.actions}>
        <Link to={`/cardetails/${car.id}`} style={styles.button}>View</Link>
        <Link to={`/edit/${car.id}`} style={{ ...styles.button, backgroundColor: '#4caf50' }}>Edit</Link>
        <button onClick={() => onDelete(car.id)} style={{ ...styles.button, backgroundColor: '#f44336' }}>Delete</button>
      </div>
    </div>
  )
}

const styles = {
  card: {
    border: '1px solid #333',
    borderRadius: '10px',
    padding: '15px',
    marginBottom: '15px',
    backgroundColor: '#111',
    boxShadow: '0 4px 8px rgba(0,0,0,0.5)',
  },
  title: {
    margin: '0 0 10px',
  },
  price: {
    margin: '0 0 10px',
    fontWeight: 'bold',
  },
  actions: {
    display: 'flex',
    gap: '10px',
  },
  button: {
    padding: '8px 12px',
    border: 'none',
    borderRadius: '5px',
    color: 'white',
    cursor: 'pointer',
    textDecoration: 'none',
    backgroundColor: '#2196f3',
  },
}
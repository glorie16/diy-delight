// client/src/services/CarsAPI.jsx
const API_URL = '/api/items'  // matches your backend route

// GET all cars/items
export const getAllCars = async () => {
  const response = await fetch(API_URL)
  if (!response.ok) throw new Error('Failed to fetch items')
  return response.json()
}

// GET one car/item by ID
export const getCar = async (id) => {
  const response = await fetch(`${API_URL}/${id}`)
  if (!response.ok) throw new Error('Failed to fetch item')
  return response.json()
}

// CREATE a new car/item
export const createCar = async (carData) => {
  /*
    carData should be an object like:
    {
      name: 'Tesla Model S',
      base_price: 79999,
      total_price: 81999,
      exterior: 'Red',
      wheels: 'Sport'
    }
  */
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(carData)
  })
  if (!response.ok) throw new Error('Failed to create item')
  return response.json()
}

// UPDATE a car/item
export const updateCar = async (id, carData) => {
  /*
    carData can include updated fields:
    name, base_price, total_price, exterior, wheels
  */
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(carData)
  })
  if (!response.ok) throw new Error('Failed to update item')
  return response.json()
}

// DELETE a car/item
export const deleteCar = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
  if (!response.ok) throw new Error('Failed to delete item')
  return response.json()
}
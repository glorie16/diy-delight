import { pool } from '../config/database.js'

// GET all items
export const getItems = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM items ORDER BY id ASC')
    res.json(result.rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
}

// GET one item
export const getItemById = async (req, res) => {
  const { id } = req.params
  try {
    const result = await pool.query(
      'SELECT * FROM items WHERE id = $1',
      [id]
    )
    res.json(result.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
}

// CREATE item
export const createItem = async (req, res) => {
  const { name, base_price, total_price, exterior, wheels } = req.body

  try {
    const result = await pool.query(
      'INSERT INTO items (name, base_price, total_price, exterior, wheels) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, base_price, total_price, exterior, wheels]
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    console.error('Create item error:', err)
    res.status(500).json({ error: 'Failed to create item' })
  }
}

// UPDATE item
export const updateItem = async (req, res) => {
  const { id } = req.params
  const { name, base_price, total_price, exterior, wheels } = req.body

  try {
    const result = await pool.query(
      'UPDATE items SET name = $1, base_price = $2, total_price = $3, exterior = $4, wheels = $5 WHERE id = $6 RETURNING *',
      [name, base_price, total_price, exterior, wheels, id]
    )
    res.json(result.rows[0])
  } catch (err) {
    console.error('Update item error:', err)
    res.status(500).json({ error: 'Failed to update item' })
  }
}

// DELETE item
export const deleteItem = async (req, res) => {
  const { id } = req.params

  try {
    await pool.query('DELETE FROM items WHERE id = $1', [id])
    res.json({ message: 'Item deleted' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
}
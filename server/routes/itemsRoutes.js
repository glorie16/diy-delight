import express from 'express'

// import controller for custom items
import {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem
} from '../controllers/itemsController.js'

const router = express.Router()

// define routes to get, create, edit, and delete items

// GET all items
router.get('/items', getItems)

// GET one item
router.get('/items/:id', getItemById)

// CREATE item
router.post('/items', createItem)

// UPDATE item
router.put('/items/:id', updateItem)

// DELETE item
router.delete('/items/:id', deleteItem)

export default router
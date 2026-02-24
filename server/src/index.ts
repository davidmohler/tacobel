import express from 'express'
import cors from 'cors'
import { v4 as uuidv4 } from 'uuid'
import menu from './data/menu.json'
import { createOrder, getOrder, markOrderPaid, OrderItem, getMenuItems, createMenuItem, updateMenuItem, deleteMenuItem } from './db'

const app = express()
app.use(cors())
app.use(express.json())

app.get('/menu', (req, res) => {
  const items = getMenuItems()
  if (items.length === 0) {
    // Fallback: load from bundled menu.json if DB is empty
    res.json(menu)
  } else {
    res.json({ items })
  }
})

app.post('/orders', (req, res) => {
  const { items } = req.body
  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Invalid order payload' })
  }
  const total = items.reduce((s: number, i: any) => s + (i.price || 0) * (i.qty || 1), 0)
  const id = uuidv4()
  // Map incoming items to OrderItem shape
  const mapped: OrderItem[] = items.map((i: any) => ({ item_id: i.id || i.item_id || '', name: i.name, price: i.price, qty: i.qty }))
  const order = createOrder(id, mapped, total)
  res.status(201).json(order)
})

app.get('/orders/:id', (req, res) => {
  const order = getOrder(req.params.id)
  if (!order) return res.status(404).json({ error: 'Order not found' })
  res.json(order)
})

app.post('/orders/:id/checkout', (req, res) => {
  const order = markOrderPaid(req.params.id)
  if (!order) return res.status(404).json({ error: 'Order not found' })
  // Real payment processing should be integrated here
  res.json({ success: true, order })
})

// Menu CRUD endpoints
app.post('/menu', (req, res) => {
  const { name, description, price, image } = req.body
  if (!name || typeof price !== 'number') {
    return res.status(400).json({ error: 'Missing or invalid name/price' })
  }
  const id = uuidv4()
  const item = createMenuItem(id, name, description || '', price, image)
  res.status(201).json(item)
})

app.put('/menu/:id', (req, res) => {
  const { name, description, price, image } = req.body
  const item = updateMenuItem(req.params.id, name, description, price, image)
  if (!item) return res.status(404).json({ error: 'Menu item not found' })
  res.json(item)
})

app.delete('/menu/:id', (req, res) => {
  const found = deleteMenuItem(req.params.id)
  if (!found) return res.status(404).json({ error: 'Menu item not found' })
  res.json({ success: true })
})

const port = process.env.PORT || 4000
app.listen(port, () => console.log(`Taco Bel API listening on http://localhost:${port}`))

import fs from 'fs'
import path from 'path'

const dataDir = path.resolve(__dirname, '..', 'data')
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true })
const dbPath = path.join(dataDir, 'orders.json')

export type OrderItem = { item_id: string; name: string; price: number; qty: number }
export type Order = { id: string; items: OrderItem[]; total: number; status: string; createdAt: string }

function loadOrders(): Record<string, Order> {
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify({}))
    return {}
  }
  try {
    const data = fs.readFileSync(dbPath, 'utf-8')
    return JSON.parse(data)
  } catch {
    return {}
  }
}

function saveOrders(orders: Record<string, Order>) {
  fs.writeFileSync(dbPath, JSON.stringify(orders, null, 2))
}

export function createOrder(id: string, items: OrderItem[], total: number): Order {
  const orders = loadOrders()
  const createdAt = new Date().toISOString()
  const order: Order = { id, items, total, status: 'pending', createdAt }
  orders[id] = order
  saveOrders(orders)
  return order
}

export function getOrder(id: string): Order | null {
  const orders = loadOrders()
  return orders[id] || null
}

export function markOrderPaid(id: string): Order | null {
  const orders = loadOrders()
  if (!orders[id]) return null
  orders[id].status = 'paid'
  saveOrders(orders)
  return orders[id]
}

export type MenuItem = { id: string; name: string; description: string; price: number; image?: string }

const menuPath = path.join(dataDir, 'menu.json')

function loadMenu(): { items: MenuItem[] } {
  if (!fs.existsSync(menuPath)) {
    const defaultMenu = { items: [] }
    fs.writeFileSync(menuPath, JSON.stringify(defaultMenu, null, 2))
    return defaultMenu
  }
  try {
    const data = fs.readFileSync(menuPath, 'utf-8')
    return JSON.parse(data)
  } catch {
    return { items: [] }
  }
}

function saveMenu(menu: { items: MenuItem[] }) {
  fs.writeFileSync(menuPath, JSON.stringify(menu, null, 2))
}

export function getMenuItems(): MenuItem[] {
  return loadMenu().items
}

export function createMenuItem(id: string, name: string, description: string, price: number, image?: string): MenuItem {
  const menu = loadMenu()
  const item: MenuItem = { id, name, description, price, image }
  menu.items.push(item)
  saveMenu(menu)
  return item
}

export function updateMenuItem(id: string, name?: string, description?: string, price?: number, image?: string): MenuItem | null {
  const menu = loadMenu()
  const item = menu.items.find((i) => i.id === id)
  if (!item) return null
  if (name) item.name = name
  if (description) item.description = description
  if (price !== undefined) item.price = price
  if (image !== undefined) item.image = image
  saveMenu(menu)
  return item
}

export function deleteMenuItem(id: string): boolean {
  const menu = loadMenu()
  const idx = menu.items.findIndex((i) => i.id === id)
  if (idx === -1) return false
  menu.items.splice(idx, 1)
  saveMenu(menu)
  return true
}

import React, { useState } from 'react'
import Menu from './components/Menu'
import Order from './components/Order'
import Hours from './components/Hours'

export default function App() {
  // API base used by frontend to call the backend server
  const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000'
  const [view, setView] = useState('menu')
  const [cart, setCart] = useState([])
  const [darkMode, setDarkMode] = useState(false)

  const addToCart = (item) => {
    setCart((prev) => {
      const found = prev.find((i) => i.id === item.id)
      if (found) {
        return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i))
      }
      return [...prev, { ...item, qty: 1 }]
    })
  }

  const updateQty = (id, qty) => {
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)).filter((i) => i.qty > 0))
  }

  const clearCart = () => setCart([])

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <header className="header">
        <div className="logo">🌮</div>
        <h1>Taco Bel</h1>
        <nav className="nav">
          <button onClick={() => setView('menu')}>Menu</button>
          <button onClick={() => setView('order')}>Order ({cart.reduce((s, i) => s + i.qty, 0)})</button>
          <button onClick={() => setView('hours')}>Hours</button>
        </nav>
      </header>
      <main className="container">
        {view === 'menu' && <Menu apiBase={API_BASE} onAdd={addToCart} />}
        {view === 'order' && <Order apiBase={API_BASE} cart={cart} updateQty={updateQty} clearCart={clearCart} />}
        {view === 'hours' && <Hours />}
      </main>
      <footer className="footer">
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </footer>
    </div>
  )
}

import React, { useEffect, useState } from 'react'
import fallbackMenu from '../data/menu.json'

export default function Menu({ apiBase, onAdd }) {
  const [menu, setMenu] = useState(fallbackMenu)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const url = `${apiBase.replace(/\/$/, '')}/menu`
    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error('Network error')
        return r.json()
      })
      .then((data) => {
        // Handle both { items: [...] } and [...] formats
        const items = data.items || data
        setMenu({ items: Array.isArray(items) ? items : [] })
      })
      .catch(() => setMenu(fallbackMenu))
      .finally(() => setLoading(false))
  }, [apiBase])

  return (
    <div className="menu">
      <h2>Menu</h2>
      {loading ? (
        <p className="muted">Loading...</p>
      ) : (
        <ul>
          {menu.items.map((item) => (
            <li key={item.id} className="menu-item">
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '6px', marginRight: '1rem' }}
                />
              )}
              <div className="menu-meta">
                <strong>{item.name}</strong>
                <p className="muted">{item.description}</p>
              </div>
              <div className="menu-actions">
                <span className="price">${item.price.toFixed(2)}</span>
                <button onClick={() => onAdd(item)}>Add</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

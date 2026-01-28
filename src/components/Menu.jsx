import React from 'react'
import menu from '../data/menu.json'

export default function Menu({ onAdd }) {
  return (
    <div className="menu">
      <h2>Menu</h2>
      <ul>
        {menu.items.map((item) => (
          <li key={item.id} className="menu-item">
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
    </div>
  )
}

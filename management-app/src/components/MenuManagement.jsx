import React, { useState, useEffect } from 'react'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000'

export default function MenuManagement() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
  })

  // Load menu items from backend
  useEffect(() => {
    fetchMenuItems()
  }, [])

  const fetchMenuItems = async () => {
    try {
      const res = await fetch(`${API_BASE}/menu`)
      const data = await res.json()
      // Handle both { items: [...] } and [...] formats
      const menuItems = data.items || data
      setItems(Array.isArray(menuItems) ? menuItems : [])
      setLoading(false)
    } catch (err) {
      console.error('Failed to load menu:', err)
      setLoading(false)
    }
  }

  const handleAddNew = () => {
    setEditingId('new')
    setFormData({ name: '', price: '', description: '', image: '' })
  }

  const handleEdit = (item) => {
    setEditingId(item.id)
    setFormData({
      name: item.name,
      price: item.price,
      description: item.description,
      image: item.image || '',
    })
  }

  const handleSave = async () => {
    if (!formData.name || !formData.price) {
      alert('Please fill in all fields')
      return
    }

    try {
      if (editingId === 'new') {
        // Create new item
        const res = await fetch(`${API_BASE}/menu`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            price: parseFloat(formData.price),
            image: formData.image,
          }),
        })
        if (res.ok) {
          await fetchMenuItems()
        }
      } else {
        // Update existing item
        const res = await fetch(`${API_BASE}/menu/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            price: parseFloat(formData.price),
            description: formData.description,
            image: formData.image,
          }),
        })
        if (res.ok) {
          await fetchMenuItems()
        }
      }

      setEditingId(null)
      setFormData({ name: '', price: '', description: '', image: '' })
    } catch (err) {
      console.error('Failed to save item:', err)
      alert('Failed to save item')
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setFormData({ name: '', price: '', description: '', image: '' })
  }

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this item?')) {
      try {
        const res = await fetch(`${API_BASE}/menu/${id}`, {
          method: 'DELETE',
        })
        if (res.ok) {
          await fetchMenuItems()
        }
      } catch (err) {
        console.error('Failed to delete item:', err)
        alert('Failed to delete item')
      }
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h3>Menu Items</h3>
        {!editingId && (
          <button onClick={handleAddNew}>
            + Add New Item
          </button>
        )}
      </div>

      {loading && <p>Loading menu items...</p>}

      {editingId && (
        <div style={{ background: '#f9f9f9', padding: '1.5rem', borderRadius: '6px', marginBottom: '2rem' }}>
          <h4>{editingId === 'new' ? 'Add New Menu Item' : 'Edit Menu Item'}</h4>
          <div className="item-form">
            <div className="form-row">
              <div className="form-group">
                <label>Item Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Beef Taco"
                />
              </div>
              <div className="form-group">
                <label>Price</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="e.g., 3.99"
                  step="0.01"
                />
              </div>
            </div>
            <div className="form-group form-row full">
              <label>Description</label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Brief description of the item"
              />
            </div>
            <div className="form-group form-row full">
              <label>Image URL</label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button onClick={handleSave}>Save Item</button>
              <button onClick={handleCancel} className="secondary">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <ul className="item-list">
        {items.map((item) => (
          <li key={item.id}>
            <div className="item-card">
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }}
                />
              )}
              <div className="item-info" style={{ flex: 1 }}>
                <h4>{item.name}</h4>
                <p>{item.description}</p>
                <p style={{ fontWeight: 'bold', color: '#c94a2a' }}>
                  ${typeof item.price === 'number' ? item.price.toFixed(2) : item.price}
                </p>
              </div>
              <div className="item-actions">
                <button onClick={() => handleEdit(item)} className="small">
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="small danger"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {items.length === 0 && (
        <p style={{ textAlign: 'center', color: '#666', marginTop: '2rem' }}>
          No menu items yet. Click "Add New Item" to get started.
        </p>
      )}
    </div>
  )
}

import React, { useState } from 'react'

export default function Order({ apiBase, cart, updateQty, clearCart }) {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0)
  const [loading, setLoading] = useState(false)
  const [orderResult, setOrderResult] = useState(null)

  const handleCheckout = async () => {
    if (cart.length === 0) return
    setLoading(true)
    try {
      const payload = { items: cart.map((i) => ({ id: i.id, name: i.name, price: i.price, qty: i.qty })) }
      const createRes = await fetch(`${apiBase.replace(/\/$/, '')}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!createRes.ok) throw new Error('Failed to create order')
      const created = await createRes.json()
      // simulate immediate checkout
      const checkoutRes = await fetch(`${apiBase.replace(/\/$/, '')}/orders/${created.id}/checkout`, {
        method: 'POST',
      })
      if (!checkoutRes.ok) throw new Error('Checkout failed')
      const checkoutResult = await checkoutRes.json()
      setOrderResult(checkoutResult.order || created)
      clearCart()
    } catch (err) {
      console.error(err)
      alert('There was a problem placing your order. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="order">
      <h2>Your Order</h2>
      {cart.length === 0 ? (
        <p>Cart is empty.</p>
      ) : (
        <>
          <ul>
            {cart.map((i) => (
              <li key={i.id} className="order-item">
                <div>
                  <strong>{i.name}</strong>
                </div>
                <div className="order-controls">
                  <button onClick={() => updateQty(i.id, i.qty - 1)}>-</button>
                  <span className="qty">{i.qty}</span>
                  <button onClick={() => updateQty(i.id, i.qty + 1)}>+</button>
                  <span className="line-price">${(i.price * i.qty).toFixed(2)}</span>
                </div>
              </li>
            ))}
          </ul>
          <div className="order-summary">
            <strong>Total: ${total.toFixed(2)}</strong>
            <div className="order-actions">
              <button onClick={handleCheckout} disabled={loading}>{loading ? 'Placing...' : 'Checkout'}</button>
              <button onClick={clearCart} disabled={loading}>Clear</button>
            </div>
          </div>
        </>
      )}

      {orderResult && (
        <div className="order-result">
          <h3>Order Placed</h3>
          <p>Order ID: {orderResult.id}</p>
          <p>Status: {orderResult.status}</p>
        </div>
      )}
    </div>
  )
}

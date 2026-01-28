import React from 'react'

export default function Order({ cart, updateQty, clearCart }) {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0)

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
              <button onClick={() => alert('Checkout placeholder — integrate payment/backend here')}>Checkout</button>
              <button onClick={clearCart}>Clear</button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

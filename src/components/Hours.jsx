import React from 'react'

export default function Hours() {
  return (
    <div className="hours">
      <h2>Hours</h2>
      <ul>
        <li>Mon-Fri: 11:00 AM - 9:00 PM</li>
        <li>Sat: 12:00 PM - 10:00 PM</li>
        <li>Sun: 12:00 PM - 8:00 PM</li>
      </ul>
      <p className="muted">Holiday hours may vary — call to confirm.</p>
    </div>
  )
}

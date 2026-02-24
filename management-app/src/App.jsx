import React, { useState } from 'react'
import Login from './components/Login'
import Dashboard from './components/Dashboard'

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)

  const handleLogin = (username) => {
    setUser(username)
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setUser(null)
    setIsLoggedIn(false)
  }

  return (
    <div className="app">
      <header className="header">
        <h1>🌮 Taco Bel Management</h1>
        {isLoggedIn && <p style={{ margin: 0, color: '#666' }}>Logged in as: {user}</p>}
      </header>
      <div className="container">
        {!isLoggedIn ? (
          <Login onLogin={handleLogin} />
        ) : (
          <Dashboard user={user} onLogout={handleLogout} />
        )}
      </div>
    </div>
  )
}

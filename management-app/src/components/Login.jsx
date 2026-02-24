import React, { useState } from 'react'

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Simple login validation (in production, this would call an API)
    if (username === 'admin' && password === 'password') {
      setError('')
      onLogin(username)
    } else {
      setError('Invalid credentials. Try admin/password')
    }
  }

  return (
    <div className="login-form">
      <h2>Manager Login</h2>
      {error && <div style={{ color: '#d32f2f', marginBottom: '1rem' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>
        <button type="submit" style={{ width: '100%' }}>
          Login
        </button>
      </form>
    </div>
  )
}

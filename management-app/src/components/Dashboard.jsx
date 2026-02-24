import React, { useState } from 'react'
import MenuManagement from './MenuManagement'

export default function Dashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('menu')

  return (
    <div>
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h2>Dashboard</h2>
          <p style={{ color: '#666' }}>Manage your restaurant content and menu items</p>
        </div>
        <button onClick={onLogout} className="secondary">
          Logout
        </button>
      </div>

      <div className="dashboard">
        <div className="sidebar">
          <h3>Management</h3>
          <ul className="menu-list">
            <li
              className={`menu-item ${activeTab === 'menu' ? 'active' : ''}`}
              onClick={() => setActiveTab('menu')}
            >
              📋 Menu Items
            </li>
            <li
              className={`menu-item ${activeTab === 'pages' ? 'active' : ''}`}
              onClick={() => setActiveTab('pages')}
            >
              📄 Pages
            </li>
            <li
              className={`menu-item ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              ⚙️ Settings
            </li>
          </ul>
        </div>

        <div className="main-content">
          {activeTab === 'menu' && <MenuManagement />}
          {activeTab === 'pages' && (
            <div>
              <h3>Page Content Management</h3>
              <p>Manage Hours, About, and other page content here.</p>
              <div style={{ marginTop: '1.5rem' }}>
                <div className="item-card">
                  <div className="item-info">
                    <h4>Hours</h4>
                    <p>Monday - Friday: 10am - 10pm</p>
                    <p>Saturday - Sunday: 11am - 11pm</p>
                  </div>
                  <button className="small">Edit</button>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'settings' && (
            <div>
              <h3>Settings</h3>
              <p>Restaurant settings and configurations.</p>
              <div className="form-group">
                <label>Restaurant Name</label>
                <input type="text" placeholder="Taco Bel" defaultValue="Taco Bel" />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="contact@tacobell.com" />
              </div>
              <button>Save Settings</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Dashboard.css'

function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  // Sample data for dashboard
  const stats = [
    { title: 'Total Users', value: '1,234', change: '+12%', trend: 'up' },
    { title: 'Revenue', value: '$45,678', change: '+8%', trend: 'up' },
    { title: 'Orders', value: '567', change: '-3%', trend: 'down' },
    { title: 'Products', value: '89', change: '+5%', trend: 'up' }
  ]

  const recentActivities = [
    { id: 1, action: 'New user registered', user: 'John Doe', time: '2 minutes ago' },
    { id: 2, action: 'Order completed', user: 'Jane Smith', time: '5 minutes ago' },
    { id: 3, action: 'Product updated', user: 'Admin', time: '10 minutes ago' },
    { id: 4, action: 'Payment received', user: 'Mike Johnson', time: '15 minutes ago' }
  ]

  const quickActions = [
    { title: 'Add User', icon: '👤', color: 'blue' },
    { title: 'New Order', icon: '📦', color: 'green' },
    { title: 'Add Product', icon: '🛍️', color: 'purple' },
    { title: 'View Reports', icon: '📊', color: 'orange' }
  ]

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <h1>Dashboard</h1>
          <p>Welcome back! Here's what's happening today.</p>
        </div>
        <div className="header-right">
          <div className="user-profile">
            <span className="user-avatar">👨‍💼</span>
            <span className="user-name">Admin User</span>
          </div>
          <Link to="/login" className="logout-btn">Logout</Link>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="dashboard-nav">
        <button 
          className={activeTab === 'overview' ? 'nav-btn active' : 'nav-btn'}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={activeTab === 'users' ? 'nav-btn active' : 'nav-btn'}
          onClick={() => setActiveTab('users')}
        >
          Users
        </button>
        <button 
          className={activeTab === 'products' ? 'nav-btn active' : 'nav-btn'}
          onClick={() => setActiveTab('products')}
        >
          Products
        </button>
        <button 
          className={activeTab === 'orders' ? 'nav-btn active' : 'nav-btn'}
          onClick={() => setActiveTab('orders')}
        >
          Orders
        </button>
      </nav>

      {/* Main Content */}
      <main className="dashboard-main">
        {activeTab === 'overview' && (
          <div className="overview-content">
            {/* Stats Cards */}
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <div className="stat-content">
                    <h3 className="stat-value">{stat.value}</h3>
                    <p className="stat-title">{stat.title}</p>
                    <span className={`stat-change ${stat.trend}`}>
                      {stat.change}
                    </span>
                  </div>
                  <div className="stat-icon">
                    {stat.trend === 'up' ? '📈' : '📉'}
                  </div>
                </div>
              ))}
            </div>

            {/* Content Grid */}
            <div className="content-grid">
              {/* Recent Activities */}
              <div className="content-card">
                <h3>Recent Activities</h3>
                <div className="activities-list">
                  {recentActivities.map(activity => (
                    <div key={activity.id} className="activity-item">
                      <div className="activity-icon">🔔</div>
                      <div className="activity-content">
                        <p className="activity-action">{activity.action}</p>
                        <p className="activity-user">{activity.user}</p>
                      </div>
                      <span className="activity-time">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="content-card">
                <h3>Quick Actions</h3>
                <div className="quick-actions">
                  {quickActions.map((action, index) => (
                    <button key={index} className={`action-btn ${action.color}`}>
                      <span className="action-icon">{action.icon}</span>
                      <span className="action-title">{action.title}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Chart Placeholder */}
              <div className="content-card chart-card">
                <h3>Sales Overview</h3>
                <div className="chart-placeholder">
                  <div className="chart-bars">
                    <div className="bar" style={{height: '60%'}}></div>
                    <div className="bar" style={{height: '80%'}}></div>
                    <div className="bar" style={{height: '45%'}}></div>
                    <div className="bar" style={{height: '90%'}}></div>
                    <div className="bar" style={{height: '70%'}}></div>
                    <div className="bar" style={{height: '85%'}}></div>
                    <div className="bar" style={{height: '55%'}}></div>
                  </div>
                  <p className="chart-label">Last 7 days</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="tab-content">
            <h2>Users Management</h2>
            <p>User management functionality will be implemented here.</p>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="tab-content">
            <h2>Products Management</h2>
            <p>Product management functionality will be implemented here.</p>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="tab-content">
            <h2>Orders Management</h2>
            <p>Order management functionality will be implemented here.</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default Dashboard

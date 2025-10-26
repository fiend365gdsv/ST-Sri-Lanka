import React from 'react';
import './admindashboard.css';
import { Link, useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const navigate = useNavigate();
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Smart Public Bus Management System</h1>

      {/* Navigation Tabs */}
      <div className="tabs">
        <button className="tab active">Admin Dashboard</button>
        <button className="tab">Staff Interface</button>
        <button className="tab">Passenger Portal</button>
      </div>

      {/* Dashboard Sections */}
      <div className="dashboard-grid">
        {/* Admin Overview */}
        <div className="card">
          <div className="card-header">📊 Admin Dashboard - Overview</div>
          <div className="card-body">
            <div className="stats-grid">
              <div className="stat-item">
                <h2>45</h2>
                <p>Active Buses</p>
              </div>
              <div className="stat-item">
                <h2>1,234</h2>
                <p>Daily Passengers</p>
              </div>
              <div className="stat-item">
                <h2>97%</h2>
                <p>On-Time Rate</p>
              </div>
            </div>
            <div className="button-group">
              <div className="row-buttons">
                <button onClick={() => navigate("/route_and_schedule")}>Schedule</button>
                <button onClick={() => navigate("/add_depot")}>Depot</button>
              </div>

              <button onClick={() => navigate("/admin_send_alert")}>Send Alert</button>
              <button onClick={() => navigate("/view_analytics")}>View Analytics</button>
              <button onClick={() => navigate("/profit_management")}>Profit Management</button>
              {/* ✅ Newly Added Button */}
              <button onClick={() => navigate("/view_feedback")}>View Feedback</button>
            </div>
          </div>
        </div>

        {/* Fleet Management */}
        <div className="card">
          <div className="card-header">🚌 Fleet Management</div>
          <div className="card-body">
            {[
              { route: 'Route 138 - Colombo to Kandy', driver: 'John Perera', status: 'Active', update: '2 min ago', passengers: '28/40' },
              { route: 'Route 245 - Galle to Matara', driver: 'Sunil Silva', status: 'Delayed (15min)', update: '5 min ago', passengers: '35/45' },
              { route: 'Route 177 - Negombo to Airport', driver: 'Kamal Fernando', status: 'En Route', update: '1 min ago', passengers: '12/30' }
            ].map((bus, i) => (
              <div key={i} className="bus-item">
                <p className="route-name">{bus.route}</p>
                <p>Driver: {bus.driver} | Status: {bus.status}</p>
                <p className="update-info">Last Update: {bus.update} | Passengers: {bus.passengers}</p>
              </div>
            ))}
            <button className="full-button" onClick={() => navigate("/view_buses_on_map")}>View All Buses on Map</button>
          </div>
        </div>

        {/* Staff Management */}
        <div className="card">
          <div className="card-header">👥 Staff Management</div>
          <div className="card-body">
            <div className="stats-grid">
              <div className="stat-item">
                <h2>85</h2>
                <p>Total Drivers</p>
              </div>
              <div className="stat-item">
                <h2>78</h2>
                <p>On Duty</p>
              </div>
              <div className="stat-item">
                <h2>7</h2>
                <p>Unavailable</p>
              </div>
            </div>
            <div className="staff-item">
              <p className="staff-name">John Perera - Route 138</p>
              <p>Shift: 06:00 - 14:00 | Rating: 4.8/5</p>
            </div>
            <div className="staff-item">
              <p className="staff-name">Sunil Silva - Route 245</p>
              <p>Shift: 14:00 - 22:00 | Status: Absent</p>
            </div>
            <button className="full-button" onClick={() => navigate("/driverregister")}>Register Staff</button>
          </div>
        </div>
      </div>
    </div>
  );
}

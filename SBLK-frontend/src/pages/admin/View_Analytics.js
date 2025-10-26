import React, { useState } from 'react';
import './view_analytics.css';
import { Link, useNavigate } from 'react-router-dom';

const ViewAnalytics = () => {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState('last30');
  const [route, setRoute] = useState('route138');
  const [busNumber, setBusNumber] = useState('all');
  const [fromDate, setFromDate] = useState('2025-09-18');
  const [toDate, setToDate] = useState('2025-09-25');
  const [activeTab, setActiveTab] = useState('admin');

  const stats = [
    {
      value: '1,847',
      label: 'Total Trip Count',
      change: '↗ +12.5% from last week',
      isPositive: true
    },
    {
      value: '23min',
      label: 'Average Delay',
      change: '↗ +3min from last week',
      isPositive: false
    },
    {
      value: 'Rs7.1M',
      label: 'Weekly Collection',
      change: '↗ +8.3% from last week',
      isPositive: true
    },
    {
      value: '89.3%',
      label: 'On-Time Performance',
      change: '↘ 2.1% from last week',
      isPositive: true
    }
  ];

  const routePerformance = [
    { route: 'Route 138 - Colombo to Kandy', trips: '342 trips', collected: 'Rs485,200 collected', delay: 'Low Delay', delayClass: 'low' },
    { route: 'Route 245 - Galle to Matara', trips: '287 trips', collected: 'Rs321,600 collected', delay: 'Medium Delay', delayClass: 'medium' },
    { route: 'Route 177 - Negombo to Airport', trips: '199 trips', collected: 'Rs296,500 collected', delay: 'High Delay', delayClass: 'high' },
    { route: 'Route 101 - Kandy to Matale', trips: '156 trips', collected: 'Rs188,400 collected', delay: 'Low Delay', delayClass: 'low' }
  ];

  const driverPerformance = [
    { name: 'John Perera', route: 'Route 138', trips: '45 trips completed', rate: '94%' },
    { name: 'Sunil Silva', route: 'Route 245', trips: '38 trips completed', rate: '87%' },
    { name: 'Kamal Fernando', route: 'Route 177', trips: '42 trips completed', rate: '91%' },
    { name: 'Priyantha Dias', route: 'Route 101', trips: '36 trips completed', rate: '96%' }
  ];

  return (
    <div className="dashboard1">
      {/* Header */}
      <h1 className="dashboard-title">Smart Public Bus Management System</h1>

      {/* Navigation Tabs */}
      <div className="tabs">
        <button className="tab active">Admin Dashboard</button>
        <button className="tab">Staff Interface</button>
        <button className="tab">Passenger Portal</button>
      </div>

      {/* Analytics Header */}
      <div className="analytics-header">
        <h2>View Analytics</h2>
        <button className="btn-back" onClick={()=>navigate("/admindashboard")}>Back to Dashboard</button>
      </div>

      {/* Filters */}
      <div className="filters-container">
        <div className="filter-group">
          <label>Date Range</label>
          <select value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
            <option value="last30">Last 30 Days</option>
            <option value="last7">Last 7 Days</option>
            <option value="last90">Last 90 Days</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Route</label>
          <select value={route} onChange={(e) => setRoute(e.target.value)}>
            <option value="route138">Route 138 - Colombo to Kandy</option>
            <option value="route245">Route 245 - Galle to Matara</option>
            <option value="route177">Route 177 - Negombo to Airport</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Bus Number</label>
          <select value={busNumber} onChange={(e) => setBusNumber(e.target.value)}>
            <option value="all">All Buses</option>
            <option value="bus1">Bus 001</option>
            <option value="bus2">Bus 002</option>
          </select>
        </div>

        <div className="filter-group">
          <label>From Date</label>
          <input 
            type="date" 
            value={fromDate} 
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label>To Date</label>
          <input 
            type="date" 
            value={toDate} 
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>

        <button className="btn-apply">Apply Filters</button>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
            <div className={`stat-change ${stat.isPositive ? 'positive' : 'negative'}`}>
              {stat.change}
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="charts-row">
        <div className="chart-card large-chart">
          <div className="chart-header">
            <span className="chart-icon">📊</span>
            <h3>Daily Trip Analysis</h3>
          </div>
          <div className="chart-placeholder">
            Interactive Line Chart - Daily Trips & Collections
          </div>
        </div>

        <div className="chart-card small-chart">
          <div className="chart-header">
            <span className="chart-icon">🥧</span>
            <h3>Route Distribution</h3>
          </div>
          <div className="chart-placeholder">
            Pie Chart - Trips by Route
          </div>
        </div>
      </div>

      {/* Performance Tables */}
      <div className="tables-row">
        <div className="table-card">
          <div className="table-header">
            <span className="chart-icon">📊</span>
            <h3>Route Performance</h3>
          </div>
          <div className="table-content">
            {routePerformance.map((item, index) => (
              <div key={index} className="table-row">
                <div className="route-info">
                  <div className="route-name">{item.route}</div>
                  <div className="route-details">{item.trips} · {item.collected}</div>
                </div>
                <span className={`badge badge-${item.delayClass}`}>
                  {item.delay}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="table-card">
          <div className="table-header">
            <span className="chart-icon">👤</span>
            <h3>Driver Performance</h3>
          </div>
          <div className="table-content">
            {driverPerformance.map((driver, index) => (
              <div key={index} className="table-row">
                <div className="driver-info">
                  <div className="driver-name">{driver.name}</div>
                  <div className="driver-details">{driver.route} · {driver.trips}</div>
                </div>
                <div className="performance-rate">
                  <div className="rate-value">{driver.rate}</div>
                  <div className="rate-label">On-time rate</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAnalytics;
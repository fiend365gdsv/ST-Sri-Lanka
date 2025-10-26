import React, { useState, useEffect } from 'react';
import './profit_management.css';
import { Link, useNavigate } from 'react-router-dom';

const AdminProfitManagement = () => {
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedDepot, setSelectedDepot] = useState('');
  const [selectedBus, setSelectedBus] = useState('');
  const [totalCollection, setTotalCollection] = useState('');
  const [fuelExpenses, setFuelExpenses] = useState('');
  const [otherExpenses, setOtherExpenses] = useState('');

  const [busNumbers, setBusNumbers] = useState([]);
  const [allEntries, setAllEntries] = useState([]);

  // ✅ new state for profit overview
  const [dailyProfit, setDailyProfit] = useState(0);
  const [monthlyProfit, setMonthlyProfit] = useState(0);
  const [annualProfit, setAnnualProfit] = useState(0);

  const API_BASE = "http://localhost:8080/api/profit";

  // ✅ Fetch bus numbers when depot changes
  useEffect(() => {
    if (selectedDepot) {
      fetch(`${API_BASE}/busNumbers/${selectedDepot}`)
        .then(res => res.json())
        .then(data => {
          setBusNumbers(data || []);
        })
        .catch(err => console.error('Error fetching bus numbers:', err));
    } else {
      setBusNumbers([]);
    }
  }, [selectedDepot]);

  // Fetch all profit entries
  const fetchAllEntries = () => {
    fetch(`${API_BASE}/all`)
      .then(res => res.json())
      .then(data => setAllEntries(data))
      .catch(err => console.error('Error fetching all entries:', err));
  };

  useEffect(() => {
    fetchAllEntries();
  }, []);

  // ✅ Fetch summary when bus changes
  useEffect(() => {
    if (selectedBus) {
      fetch(`${API_BASE}/summary/${selectedBus}`)
        .then(res => res.json())
        .then(data => {
          setDailyProfit(data.dailyProfit || 0);
          setMonthlyProfit(data.monthlyProfit || 0);
          setAnnualProfit(data.annualProfit || 0);
        })
        .catch(err => console.error("Error fetching summary:", err));
    } else {
      setDailyProfit(0);
      setMonthlyProfit(0);
      setAnnualProfit(0);
    }
  }, [selectedBus]);

  // ✅ Add new profit entry
  const handleSubmit = async () => {
    if (!selectedDepot || !selectedBus || !totalCollection) {
      alert("Please fill in all required fields");
      return;
    }

    const newEntry = {
      date: selectedDate ? new Date(selectedDate) : new Date(),
      depotName: selectedDepot,
      busNumber: selectedBus,
      totalCollection: parseFloat(totalCollection),
      fuelExpenses: parseFloat(fuelExpenses) || 0,
      otherExpenses: parseFloat(otherExpenses) || 0
    };

    try {
      const response = await fetch(`${API_BASE}/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEntry)
      });

      if (response.ok) {
        const result = await response.json();
        alert("✅ Collection entry added successfully!");
        fetchAllEntries();
        setTotalCollection('');
        setFuelExpenses('');
        setOtherExpenses('');
      } else {
        alert("❌ Failed to add entry");
      }
    } catch (error) {
      console.error("Error adding entry:", error);
      alert("❌ Something went wrong!");
    }
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Smart Public Bus Management System</h1>

      {/* Navigation Tabs */}
      <div className="tabs">
        <button className="tab active">Admin Dashboard</button>
        <button className="tab">Staff Dashboard</button>
        <button className="tab">Passenger Portal</button>
      </div>

      {/* Profit Management Bar */}
      <div className="profit-bar">
        <span className="profit-label">Profit Management</span>
        <button className="back-btn" onClick={() => navigate("/admin/dashboard")}>Back to Dashboard</button>
      </div>

      <div className="main-content">
        {/* Left Column */}
        <div className="left-column">
          {/* Profit Overview */}
          <div className="card1">
            <div className="card-header">
              <span className="icon">💰</span>
              <h2>Profit Overview</h2>
            </div>
            <div className="profit-cards">
              <div className="profit-card pink">
                <h3>Rs{monthlyProfit.toLocaleString()}</h3>
                <p>Monthly Profit</p>
                <span className="trend">+8.2% from last month</span>
              </div>
              <div className="profit-card cyan">
                <h3>Rs{annualProfit.toLocaleString()}</h3>
                <p>Annual Profit</p>
                <span className="trend">+12.5% from last year</span>
              </div>
            </div>
            <div className="metrics">
              <div className="metric-item">
                <div className="metric-icon">📊</div>
                <div className="metric-value">Rs{dailyProfit.toLocaleString()}</div>
                <div className="metric-label">Daily Profit</div>
              </div>
              <div className="metric-item">
                <div className="metric-icon">💵</div>
                <div className="metric-value">Rs{monthlyProfit.toLocaleString()}</div>
                <div className="metric-label">Monthly Profit</div>
              </div>
              <div className="metric-item">
                <div className="metric-icon">📈</div>
                <div className="metric-value">Rs{annualProfit.toLocaleString()}</div>
                <div className="metric-label">Annual Profit</div>
              </div>
            </div>
          </div>

          {/* Daily Collection by Bus */}
          <div className="card1">
            <div className="card-header">
              <span className="icon">🚌</span>
              <h2>Daily Collection by Bus</h2>
            </div>
            <div className="bus-collection-grid">
              {allEntries.length > 0 ? (
                allEntries.map((entry) => (
                  <div key={entry.id} className="bus-card blue">
                    <h4>{entry.busNumber}</h4>
                    <p className="route">{entry.depotName}</p>
                    <p className="passengers">Total Collection: Rs{entry.totalCollection}</p>
                    <div className="collection-amount">Profit: Rs{entry.profit}</div>
                  </div>
                ))
              ) : (
                <p style={{ textAlign: 'center' }}>No collection data yet.</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="right-column">
          {/* Daily Collection Input */}
          <div className="card1">
            <div className="card-header">
              <span className="icon">📅</span>
              <h2>Daily Collection Input</h2>
            </div>
            <div className="collection-form">
              <div className="form-group">
                <label>Date</label>
                <div className="input-wrapper">
                  <input 
                    type="date" 
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                  <span className="calendar-icon">📅</span>
                </div>
              </div>
              
              <div className="form-group">
                <label>Depot Name</label>
                <select 
                  value={selectedDepot}
                  onChange={(e) => setSelectedDepot(e.target.value)}
                >
          
                  <option value="Colombo" selected>Colombo</option>
                  <option value="Kandy">Kandy</option>
                  <option value="Galle">Galle</option>
                  <option value="Horana">Horana</option>
                  <option value="Matara">Matara</option>
                </select>
              </div>

              <div className="form-group">
                <label>Bus Number</label>
                <select 
                  value={selectedBus}
                  onChange={(e) => setSelectedBus(e.target.value)}
                  disabled={!busNumbers.length}
                >
                  <option value="">Select Bus</option>
                  {busNumbers.map((bus, index) => (
                    <option key={index} value={bus}>{bus}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Total Collection (Rs)</label>
                <input 
                  type="text" 
                  value={totalCollection}
                  onChange={(e) => setTotalCollection(e.target.value)}
                  placeholder="Enter amount"
                />
              </div>

              <div className="form-group">
                <label>Fuel Expenses (Rs)</label>
                <input 
                  type="text" 
                  value={fuelExpenses}
                  onChange={(e) => setFuelExpenses(e.target.value)}
                  placeholder="Enter fuel expenses"
                />
              </div>

              <div className="form-group">
                <label>Other Expenses (Rs)</label>
                <input 
                  type="text" 
                  value={otherExpenses}
                  onChange={(e) => setOtherExpenses(e.target.value)}
                  placeholder="Maintenance, tolls, etc."
                />
              </div>

              <button onClick={handleSubmit} className="submit-btn">
                + Add Collection Entry
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfitManagement;

import React, { useState } from 'react';
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import { Search } from 'lucide-react';
import './view_buses_on_map.css';
import { useNavigate } from 'react-router-dom';

const containerStyle = {
  width: '100%',
  height: '100%',
};

// Sri Lanka center
const center = {
  lat: 7.8731,
  lng: 80.7718,
};

const ViewBusesonMap = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBus, setSelectedBus] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 'AIzaSyB8v-bRoV3LBtY1R52azm_dDvGr9BiPdm4',
  });

  const routes = [
    {
      id: 1,
      name: 'Route 138 - Colombo to Kandy',
      driver: 'John Perera',
      passengers: '28/40',
      lastUpdate: '2 min ago',
      nextStop: 'Pettah',
      status: 'ACTIVE',
      position: { lat: 6.9271, lng: 79.8612 },
    },
    {
      id: 2,
      name: 'Route 245 - Galle to Matara',
      driver: 'Sunil Silva',
      passengers: '35/45',
      lastUpdate: '5 min ago',
      nextStop: 'Hikkaduwa',
      status: 'DELAYED',
      position: { lat: 6.0535, lng: 80.221 },
    },
    {
      id: 3,
      name: 'Route 177 - Negombo to Airport',
      driver: 'Kamal Fernando',
      passengers: '12/30',
      lastUpdate: '1 min ago',
      nextStop: 'Katunayake',
      status: 'ACTIVE',
      position: { lat: 7.2008, lng: 79.8737 },
    },
  ];

  const filteredRoutes = routes.filter((route) => {
    const matchesFilter =
      activeFilter === 'All' || route.status === activeFilter.toUpperCase();
    const matchesSearch =
      route.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.driver.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="dashboard-container">
      <h1 className="main-title">Smart Public Bus Management System</h1>

      <div className="tabs">
        <button className="tab active">Admin Dashboard</button>
        <button className="tab">Driver Interface</button>
        <button className="tab">Passenger Portal</button>
      </div>

      <div className="dashboard-header">
        <button className="back-btn" onClick={() => navigate("/admindashboard")}>Back</button>
        <div className="header-content">
          <span className="header-icon">🚌</span>
          <h2 className="page-title">Fleet Management - Live Tracking</h2>
        </div>
      </div>

      <div className="main-content">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search routes or buses..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="search-icon" size={20} />
          </div>

          <div className="filter-buttons">
            {['All', 'Active', 'Delayed', 'Maintenance'].map((filter) => (
              <button
                key={filter}
                className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="routes-list">
            {filteredRoutes.map((route) => (
              <div
                key={route.id}
                className={`route-card ${route.status.toLowerCase()}`}
                onClick={() => setSelectedBus(route)}
              >
                <div className="route-header">
                  <h3 className="route-name">{route.name}</h3>
                  <span className={`status-badge ${route.status.toLowerCase()}`}>
                    {route.status}
                  </span>
                </div>
                <div className="route-details">
                  <div className="detail-row">
                    <span className="detail-label">Driver</span>
                    <span className="detail-value">{route.driver}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Passengers</span>
                    <span className="detail-value">{route.passengers}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ✅ Google Maps Integration */}
        <div className="map-container">
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={8}
            >
              {filteredRoutes.map((route) => (
                <Marker
                  key={route.id}
                  position={route.position}
                  icon={{
                    url: 'https://cdn-icons-png.flaticon.com/512/61/61088.png',
                    scaledSize: new window.google.maps.Size(32, 32),
                  }}
                  onClick={() => setSelectedBus(route)}
                />
              ))}

              {selectedBus && (
                <InfoWindow
                  position={selectedBus.position}
                  onCloseClick={() => setSelectedBus(null)}
                >
                  <div>
                    <strong>{selectedBus.name}</strong> <br />
                    Driver: {selectedBus.driver} <br />
                    Passengers: {selectedBus.passengers} <br />
                    Next Stop: {selectedBus.nextStop} <br />
                    Status: {selectedBus.status}
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          ) : (
            <p style={{ textAlign: 'center', marginTop: '100px' }}>Loading map...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewBusesonMap;

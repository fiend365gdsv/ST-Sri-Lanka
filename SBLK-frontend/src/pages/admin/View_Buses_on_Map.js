import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, DirectionsRenderer, useJsApiLoader, InfoBox } from '@react-google-maps/api';
import { Search } from 'lucide-react';
import './view_buses_on_map.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const containerStyle = { width: '100%', height: '100%' };
const center = { lat: 7.8731, lng: 80.7718 };
const busIcon = 'https://cdn-icons-png.flaticon.com/512/61/61088.png';

const ViewBusesonMap = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBus, setSelectedBus] = useState(null);
  const [buses, setBuses] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [mergedBuses, setMergedBuses] = useState([]);
  const [directions, setDirections] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  // Fetch GPS locations
  const fetchBuses = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/location/active');
      setBuses(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch schedule details
  const fetchSchedules = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/schedules');
      setSchedules(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Merge GPS and schedule, including fromLocation & destination
  useEffect(() => {
    const merged = schedules.map(schedule => {
      const gps = buses.find(bus => bus.busNumber === schedule.busNumber);

      let fromLocation = '';
      let destination = '';
      if (schedule.route && schedule.route.includes('→')) {
        [fromLocation, destination] = schedule.route.split('→').map(s => s.trim());
      }

      return {
        ...schedule,
        latitude: gps?.latitude || null,
        longitude: gps?.longitude || null,
        status: gps?.latitude && gps?.longitude ? 'Active' : 'Inactive',
        fromLocation,
        destination
      };
    });

    setMergedBuses(merged);
  }, [buses, schedules]);

  // Initial fetch + polling every 5s
  useEffect(() => {
    fetchBuses();
    fetchSchedules();
    const interval = setInterval(() => {
      fetchBuses();
      fetchSchedules();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Directions for selected bus
  useEffect(() => {
    if (selectedBus && selectedBus.fromLocation && selectedBus.destination) {
      const service = new window.google.maps.DirectionsService();
      service.route(
        {
          origin: selectedBus.fromLocation,
          destination: selectedBus.destination,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);
          } else {
            setDirections(null);
          }
        }
      );
    } else {
      setDirections(null);
    }
  }, [selectedBus]);

  const filteredBuses = mergedBuses
    .filter(bus => activeFilter === 'All' || bus.status?.toUpperCase() === activeFilter.toUpperCase())
    .filter(bus =>
      bus.busNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (bus.driverName && bus.driverName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (bus.conductorName && bus.conductorName.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  return (
    <div className="dashboard-container">
      <h1 className="main-title">Smart Public Bus Management System</h1>
      <div className="tabs">
        <button className="tab active">Admin Dashboard</button>
        <button className="tab">Driver Interface</button>
        <button className="tab">Passenger Portal</button>
      </div>

      <div className="dashboard-header">
        <button className="back-btn" onClick={() => navigate("/admin/dashboard")}>Back</button>
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
              placeholder="Search buses, drivers, or conductors..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="search-icon" size={20} />
          </div>

          <div className="filter-buttons">
            {['All', 'Active', 'Inactive'].map(filter => (
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
            {filteredBuses.map(bus => (
              <div
                key={bus.busNumber}
                className={`route-card ${bus.status?.toLowerCase()}`}
                onClick={() => setSelectedBus(bus)}
              >
                <div className="route-header">
                  <h3 className="route-name">{bus.busNumber}</h3>
                  <span className={`status-badge ${bus.status?.toLowerCase()}`}>
                    {bus.status || 'UNKNOWN'}
                  </span>
                </div>
                <div className="route-details">
                  <div className="detail-row">
                    <span className="detail-label">Driver</span>
                    <span className="detail-value">{bus.driverName || 'N/A'}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Conductor</span>
                    <span className="detail-value">{bus.conductorName || 'N/A'}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Route</span>
                    <span className="detail-value">{bus.route || 'N/A'}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Shift</span>
                    <span className="detail-value">{bus.shiftTime || 'N/A'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Map */}
        <div className="map-container">
          {isLoaded ? (
            <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={8}>
              {filteredBuses.map(bus => (
                bus.latitude && bus.longitude && (
                  <Marker
                    key={bus.busNumber}
                    position={{ lat: bus.latitude, lng: bus.longitude }}
                    icon={{ url: busIcon, scaledSize: new window.google.maps.Size(40, 40) }}
                    onClick={() => setSelectedBus(bus)}
                  />
                )
              ))}

              {selectedBus && selectedBus.latitude && selectedBus.longitude && (
                <InfoBox
                  position={{ lat: selectedBus.latitude, lng: selectedBus.longitude }}
                  options={{
                    closeBoxURL: "",
                    enableEventPropagation: true,
                    pixelOffset: new window.google.maps.Size(-100, -55),
                  }}
                >
                  <div
                    style={{
                      background: "linear-gradient(135deg, #0072ff, #00c6ff)",
                      color: "#fff",
                      padding: "12px 16px",
                      borderRadius: "12px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                      fontFamily: "Poppins, sans-serif",
                      textAlign: "center",
                      minWidth: "200px",
                      position: "relative",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        top: "6px",
                        right: "8px",
                        cursor: "pointer",
                        fontWeight: "bold",
                        fontSize: "14px",
                      }}
                      onClick={() => setSelectedBus(null)}
                    >
                      ×
                    </span>
                    <h4 style={{ margin: "0 0 6px", fontSize: "15px", fontWeight: "600" }}>🚌 Live Bus</h4>
                    <p style={{ margin: "2px 0", fontSize: "13px" }}>
                      <strong>Route:</strong> {selectedBus.route || 'N/A'}
                    </p>
                    <p style={{ margin: "2px 0", fontSize: "12px" }}>
                      📍 {selectedBus.latitude.toFixed(5)}, {selectedBus.longitude.toFixed(5)}
                    </p>
                    <p style={{ margin: "2px 0", fontSize: "12px" }}>
                      ⏱ {new Date().toLocaleTimeString()}
                    </p>
                  </div>
                </InfoBox>
              )}

              {directions && (
                <DirectionsRenderer
                  directions={directions}
                  options={{ polylineOptions: { strokeColor: '#FF5733', strokeWeight: 6 } }}
                />
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

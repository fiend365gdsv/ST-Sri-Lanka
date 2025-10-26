import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, Marker, useJsApiLoader, InfoWindow } from '@react-google-maps/api';
import './passengerdashboard.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const containerStyle = {
  width: '100%',
  height: '300px',
  borderRadius: '10px',
};

const center = {
  lat: 6.9271,
  lng: 79.8612,
};

const PassengerDashboard = () => {
  const navigate = useNavigate();

  // Depot search state
  const [fromLocation, setFromLocation] = useState('Current Location');
  const [toDestination, setToDestination] = useState('');
  const [availableDepots, setAvailableDepots] = useState([]);

  // Booking search state
  const [bookingFrom, setBookingFrom] = useState('Galle');
  const [bookingTo, setBookingTo] = useState('Colombo');
  const [boardingPoint, setBoardingPoint] = useState('Rathgama');
  const [travelDate, setTravelDate] = useState('2025-09-29');
  const [availableBuses, setAvailableBuses] = useState([]);

  const [selectedBus, setSelectedBus] = useState(null);
  const [userLocation, setUserLocation] = useState(center);

  // Profile states
  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [profileError, setProfileError] = useState('');

  const username = localStorage.getItem('username');

  // Dummy buses (replace with real-time from backend if available)
  const buses = [
    { id: 1, lat: 6.9271, lng: 79.8612, name: 'Bus 138A', busNumber: '138A' },
    { id: 2, lat: 6.9301, lng: 79.8702, name: 'Bus 138B', busNumber: '138B' },
  ];

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const audioRef = useRef(null);

  // Fetch passenger profile
  useEffect(() => {
    if (!username) return;
    const fetchProfile = async () => {
      try {
        setLoadingProfile(true);
        const res = await axios.get(`http://localhost:8080/api/passenger/profile/${username}`);
        setProfile(res.data);
        setProfileError('');
      } catch (err) {
        console.error('Error fetching profile:', err);
        setProfileError('Failed to load profile');
      } finally {
        setLoadingProfile(false);
      }
    };
    fetchProfile();
  }, [username]);

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (err) => console.error('Geolocation error:', err)
      );
    }
  }, []);

  // Depot search
  const handleFindBusSearch = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/depots/search', {
        params: { fromLocation, destination: toDestination },
      });
      setAvailableDepots(res.data);
    } catch (err) {
      console.error('Error searching depots:', err);
      alert('❌ Failed to fetch depots. Please check backend connection.');
    }
  };

  // Booking search
  const handleSearchBuses = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/bookings/search`, {
        params: { from: bookingFrom, to: bookingTo, date: travelDate },
      });
      setAvailableBuses(res.data);
    } catch (err) {
      console.error('Error fetching available buses:', err);
      alert('❌ Failed to search buses. Check backend connection.');
    }
  };

  // Book a ticket
  const handleBookTicket = async (busNumber) => {
    try {
      await axios.post(`http://localhost:8080/api/bookings/book`, {
        username,
        busNumber,
        fromLocation: bookingFrom,
        destination: bookingTo,
        boardingPoint,
        travelDate,
      });
      alert(`🎫 Ticket booked successfully for Bus ${busNumber}!`);
    } catch (err) {
      console.error('Error booking ticket:', err);
      alert('❌ Booking failed. Please try again.');
    }
  };

  // Calculate distance (km) between two coordinates
  const getDistanceKm = (lat1, lng1, lat2, lng2) => {
    const toRad = (v) => (v * Math.PI) / 180;
    const R = 6371; // Earth radius
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Alert if bus is within 1 km
  const handleSetAlert = (bus) => {
    const distance = getDistanceKm(userLocation.lat, userLocation.lng, bus.lat, bus.lng);
    if (distance <= 1) {
      if (audioRef.current) audioRef.current.play();
      alert(`🚨 Bus ${bus.name} is ${distance.toFixed(2)} km away from you!`);
    } else {
      alert(`Bus ${bus.name} is ${distance.toFixed(2)} km away. Alert will trigger when within 1 km.`);
    }
  };

  return (
    <div className="bus-portal">
      <h1 className="dashboard-title">Smart Public Bus Management System</h1>

      <div className="tabs">
        <button className="tab">Admin Dashboard</button>
        <button className="tab">Staff Interface</button>
        <button className="tab active">Passenger Portal</button>
      </div>

      <div className="content-grid">
        {/* Find Your Bus Section */}
        <div className="card find-bus-card">
          <div className="card-header">
            <span className="icon">🔍</span>
            <h2>Find Your Bus</h2>
          </div>
          <div className="card-body0">
            <div className="input-group">
              <input
                type="text"
                className="input-field"
                value={fromLocation}
                onChange={(e) => setFromLocation(e.target.value)}
                placeholder="From: Enter Departure Location"
              />
            </div>
            <div className="input-group-inline">
              <input
                type="text"
                className="input-field"
                value={toDestination}
                onChange={(e) => setToDestination(e.target.value)}
                placeholder="To: Enter Destination"
              />
              <button className="btn-search" onClick={handleFindBusSearch}>Search</button>
            </div>

            {availableDepots.length > 0 ? (
              <div className="bus-results-grid">
                {availableDepots.map((bus, index) => (
                  <div key={index} className="bus-tile">
                    <h3>{bus.busNumber}</h3>
                    <p><strong>From:</strong> {bus.fromLocation}</p>
                    <p><strong>To:</strong> {bus.destination}</p>
                    <button onClick={() => setSelectedBus(bus)}>Track</button>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: 'white', marginTop: '10px' }}>No buses found for this route.</p>
            )}
          </div>
        </div>

        {/* Book Your Ticket Section */}
        <div className="card book-ticket-card">
          <div className="card-header">
            <span className="icon">🎫</span>
            <h2>Book Your Ticket</h2>
          </div>
          <div className="card-body">
            <div className="form-group">
              <label>FROM:</label>
              <input
                type="text"
                className="input-field-booking"
                value={bookingFrom}
                onChange={(e) => setBookingFrom(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>TO:</label>
              <input
                type="text"
                className="input-field-booking"
                value={bookingTo}
                onChange={(e) => setBookingTo(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Boarding Point:</label>
              <input
                type="text"
                className="input-field-booking"
                value={boardingPoint}
                onChange={(e) => setBoardingPoint(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Travel Date:</label>
              <input
                type="date"
                className="input-field-booking"
                value={travelDate}
                onChange={(e) => setTravelDate(e.target.value)}
              />
            </div>
            <button className="btn-search-buses" onClick={handleSearchBuses}>Search Buses</button>

            {availableBuses.length > 0 && (
              <div className="available-bus-list">
                <h3>Available Buses</h3>
                {availableBuses.map((bus) => (
                  <div key={bus.id} className="bus-result">
                    <p><strong>Bus Number:</strong> {bus.busNumber}</p>
                    <p><strong>Route:</strong> {bus.route}</p>
                    <p><strong>Date:</strong> {bus.startDate}</p>
                    <button className="btn-book" onClick={() => handleBookTicket(bus.busNumber)}>
                      Book Ticket
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Live Bus Tracking Section */}
        <div className="card tracking-card">
          <div className="card-header">
            <span className="icon">📍</span>
            <h2>Live Bus Tracking</h2>
          </div>
          <div className="card-body tracking-body">
            <div className="live-badge">LIVE</div>
            <div className="map-placeholder">
              {isLoaded ? (
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={selectedBus ? { lat: selectedBus.lat, lng: selectedBus.lng } : userLocation}
                  zoom={selectedBus ? 15 : 13}
                >
                  {/* Show all buses */}
                  {buses.map((bus) => (
                    <Marker
                      key={bus.id}
                      position={{ lat: bus.lat, lng: bus.lng }}
                      onClick={() => setSelectedBus(bus)}
                      icon={{ url: 'https://cdn-icons-png.flaticon.com/512/61/61088.png', scaledSize: new window.google.maps.Size(35, 35) }}
                    />
                  ))}

                  {/* InfoWindow only if selectedBus exists and has coordinates */}
                  {selectedBus && selectedBus.lat && selectedBus.lng && (
                    <InfoWindow
                      position={{ lat: selectedBus.lat, lng: selectedBus.lng }}
                      onCloseClick={() => setSelectedBus(null)}
                    >
                      <div>{selectedBus.busNumber || selectedBus.name}</div>
                    </InfoWindow>
                  )}
                </GoogleMap>
              ) : (
                <p>Loading map...</p>
              )}

              {selectedBus && (
                <div className="eta-box">
                  <p className="eta-label">ETA: ~8 minutes</p>
                  <button className="btn-alert" onClick={() => handleSetAlert(selectedBus)}>
                    Set Alert (1km away)
                  </button>
                </div>
              )}
              {!selectedBus && <p style={{ color: 'white' }}>Click "Track" on a bus to view its live location.</p>}
            </div>
          </div>
        </div>

        {/* My Profile Section */}
        <div className="card profile-card">
          <div className="card-header">
            <span className="icon">👤</span>
            <h2>My Profile</h2>
          </div>
          <div className="card-body10">
            {loadingProfile ? (
              <p>Loading profile...</p>
            ) : profileError ? (
              <p className="error">{profileError}</p>
            ) : profile ? (
              <div className="profile-info">
                <div className="profile-item">
                  <span className="profile-icon">👤</span>
                  <span>{profile.firstName} {profile.lastName}</span>
                </div>
                <div className="profile-item">
                  <span className="profile-icon">📧</span>
                  <span>{profile.email}</span>
                </div>
                <div className="profile-item">
                  <span className="profile-icon">📱</span>
                  <span>{profile.mobileNumber}</span>
                </div>
              </div>
            ) : (
              <p>No profile data</p>
            )}
            <button className="btn-edit-profile" onClick={() => navigate("/passenger_edit_profile")}>
              Edit Profile
            </button>
            <div className="profile-actions">
              <button className="btn-action" onClick={() => navigate("/passenger_feedback")}>
                Submit Feedback
              </button>
              <button className="btn-action" onClick={() => navigate("/passenger_help_support")}>
                Help & Support
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Audio for alert */}
      <audio ref={audioRef} src="/alert_sound.mp3" preload="auto" />
    </div>
  );
};

export default PassengerDashboard;

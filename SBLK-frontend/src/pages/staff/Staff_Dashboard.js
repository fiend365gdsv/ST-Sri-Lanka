import React, { useState, useRef, useEffect } from 'react';
import './staff_dashboard.css';
import { useNavigate } from 'react-router-dom';
import { GoogleMap, Marker, Polyline, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import axios from 'axios';

const containerStyle = {
  width: '100%',
  height: '500px',
  borderRadius: '10px',
};

const center = { lat: 7.0015, lng: 79.9225 };

const RecenterMap = ({ lat, lon, mapRef }) => {
  useEffect(() => {
    if (lat && lon && mapRef.current) {
      mapRef.current.panTo({ lat, lng: lon });
    }
  }, [lat, lon, mapRef]);
  return null;
};

const StaffDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('staff');

  const [isGpsActive, setIsGpsActive] = useState(false);
  const [currentLat, setCurrentLat] = useState(7.0015);
  const [currentLon, setCurrentLon] = useState(79.9225);
  const watchIdRef = useRef(null);

  const busNumber = '138';
  const LOCATION_UPDATE_ENDPOINT = 'http://localhost:8080/api/location/update';

  // ✅ Staff Profile
  const [staffProfile, setStaffProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
  });
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [profileError, setProfileError] = useState('');

  // ✅ Get username from localStorage
  const username = localStorage.getItem('username');

  const formatCoord = (num) => (num === null || num === undefined ? null : Number(num).toFixed(5));

  // Fetch staff profile
  useEffect(() => {
    if (!username) return;
    const fetchProfile = async () => {
      try {
        setLoadingProfile(true);
        const res = await axios.get(`http://localhost:8080/api/staff/profile/${username}`);
        setStaffProfile(res.data);
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

  // ✅ GPS Functions
  const handleStartGps = () => {
    if (!navigator.geolocation) return alert('Geolocation not supported.');
    if (isGpsActive) return;

    const success = async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      setCurrentLat(lat);
      setCurrentLon(lon);

      try {
        const url = `${LOCATION_UPDATE_ENDPOINT}?busNumber=${encodeURIComponent(
          busNumber
        )}&latitude=${encodeURIComponent(lat)}&longitude=${encodeURIComponent(lon)}`;
        fetch(url, { method: 'POST' }).catch(console.error);
      } catch (err) {
        console.error('Error sending location:', err);
      }
    };

    const error = (err) => {
      console.error('Geolocation error:', err);
      alert('Error obtaining location: ' + (err.message || err.code));
      handleStopGps();
    };

    const watchId = navigator.geolocation.watchPosition(success, error, {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 10000,
    });

    watchIdRef.current = watchId;
    setIsGpsActive(true);
  };

  const handleStopGps = () => {
    if (watchIdRef.current !== null) navigator.geolocation.clearWatch(watchIdRef.current);
    watchIdRef.current = null;
    setIsGpsActive(false);
  };

  const routePath = [
    { lat: 6.9271, lng: 79.8612 },
    { lat: 7.0020, lng: 79.9580 },
    { lat: 7.0891, lng: 80.0099 },
    { lat: 7.2916, lng: 80.6350 },
  ];

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const mapRef = useRef(null);

  return (
    <div className="container">
      <h1 className="dashboard-title">Smart Public Bus Management System</h1>

      <div className="tabs">
        <button className="tab">Admin Dashboard</button>
        <button className="tab active">Staff Interface</button>
        <button className="tab">Passenger Portal</button>
      </div>

      <div className="main-content">
        <div className="dashboard-section">
          <div className="section-header">
            <span className="icon">🚌</span>
            <h2>Staff Dashboard</h2>
          </div>

          <div className="status-card">
            <div className="status-header">
              <span className="status-indicator"></span>
              <strong>Status: On Duty</strong>
            </div>
            <p>Shift: 06:00 - 14:00 | Route: 138 Colombo-Kandy</p>
            <p>GPS: {isGpsActive ? 'Active' : 'Inactive'} | Logs: Updated: Just now</p>
          </div>

          <div className="trip-info">
            <h3>Current Trip</h3>
            <p className="route">
              Colombo → Kandy <span className="next-stop">Next Stop: Kadawatha (5 min)</span>
            </p>
            <p>Passengers: 28/50 | Trip Progress: 45%</p>
          </div>

          <div className="button-grid">
            <button className="btn btn-primary" onClick={handleStartGps}>Start GPS Sharing</button>
            <button className="btn btn-danger" onClick={handleStopGps}>Stop GPS Sharing</button>
            <button className="btn btn-primary">Mark Attendance</button>
            <button className="btn btn-danger">Notify Unavailability</button>
          </div>

          <button className="btn btn-emergency">🆘 SOS Emergency Alert</button>
        </div>

        <div className="navigation-section">
          <div className="section-header">
            <span className="icon">🗺️</span>
            <h2>Navigation & Controls</h2>
          </div>

          <div className="bus-number">
            <span className="bus-label">138</span>
            <span className="you-label">You</span>
          </div>

          <div className="map-container">
            <div className="map-header">
              <span className="map-icon">🗺️</span>
              <strong>Live Route Map</strong>
            </div>

            {isLoaded ? (
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={{ lat: currentLat, lng: currentLon }}
                zoom={12}
                onLoad={(map) => (mapRef.current = map)}
              >
                <Marker
                  position={{ lat: currentLat, lng: currentLon }}
                  icon={{
                    url: 'https://cdn-icons-png.flaticon.com/512/61/61205.png',
                    scaledSize: new window.google.maps.Size(35, 35),
                    anchor: new window.google.maps.Point(17, 34),
                  }}
                />
                <InfoWindow position={{ lat: currentLat, lng: currentLon }}>
                  <div>
                    Current Bus Location<br />
                    {formatCoord(currentLat)}, {formatCoord(currentLon)}
                  </div>
                </InfoWindow>
                <Polyline
                  path={routePath}
                  options={{ strokeColor: 'blue', strokeOpacity: 0.7, strokeWeight: 4 }}
                />
                <RecenterMap lat={currentLat} lon={currentLon} mapRef={mapRef} />
              </GoogleMap>
            ) : (
              <p style={{ textAlign: 'center', marginTop: '50px' }}>Loading map...</p>
            )}

            <div className="map-content">
              <p>
                Current Location:{' '}
                {currentLat && currentLon ? `${formatCoord(currentLat)}, ${formatCoord(currentLon)}` : 'Fetching...'}
              </p>
              <p>Next Stop: Kiribathgoda (3.2 km)</p>
            </div>

            <div className="map-footer">
              <p>Speed: 45 km/h</p>
              <p>ETA Colombo: 2h 15min</p>
            </div>
          </div>
        </div>

        {/* ✅ Dynamic Staff Profile */}
        <div className="profile-section" style={{ marginTop: '20px' }}>
          <div className="section-header">
            <span className="icon">👤</span>
            <h2>Staff Profile</h2>
          </div>

          <div className="profile-card">
            {loadingProfile ? (
              <p>Loading profile...</p>
            ) : profileError ? (
              <p className="error">{profileError}</p>
            ) : (
              <div className="profile-info">
                <p><span className="profile-icon">👤</span> <strong>{staffProfile.firstName} {staffProfile.lastName}</strong></p>
                <p><span className="profile-icon">📧</span> {staffProfile.email}</p>
                <p><span className="profile-icon">📱</span> {staffProfile.mobileNumber}</p>
              </div>
            )}
          </div>

          <button className="btn btn-edit" onClick={() => navigate('/edit_staff_profile')}>Edit Profile</button>

          <div className="profile-actions">
            <button className="btn btn-secondary" onClick={() => navigate('/staff_feedback')}>Submit Feedback</button>
            <button className="btn btn-secondary" onClick={() => navigate('/staff_help_support')}>Help & Support</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;

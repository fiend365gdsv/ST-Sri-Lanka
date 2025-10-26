import React, { useState, useRef, useEffect } from 'react';
import './staff_dashboard.css';
import { useNavigate } from 'react-router-dom';
import { GoogleMap, Marker, InfoWindow, DirectionsRenderer, useJsApiLoader } from '@react-google-maps/api';
import axios from 'axios';
import { InfoBox } from "@react-google-maps/api";


const containerStyle = {
  width: '100%',
  height: '500px',
  borderRadius: '10px',
};

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
  const [nextStop, setNextStop] = useState('Kadawatha');
  const [trackingActive, setTrackingActive] = useState(true);
  const watchIdRef = useRef(null);

  const LOCATION_UPDATE_ENDPOINT = 'http://localhost:8080/api/location';

  // ✅ Staff Profile
  const [staffProfile, setStaffProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
  });
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [profileError, setProfileError] = useState('');

  // ✅ Current Trip
  const [currentTrip, setCurrentTrip] = useState(null);

  // ✅ Bus Data and Directions
  const [busData, setBusData] = useState(null);
  const [directions, setDirections] = useState(null);

  // ✅ Get username from localStorage
  const username = localStorage.getItem('username');

  const formatCoord = (num) => (num === null || num === undefined ? null : Number(num).toFixed(5));

  const mapRef = useRef(null);

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

  // Fetch current trip
  useEffect(() => {
    if (!username) return;
    const fetchCurrentTrip = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/schedules/current/${username}`);
        setCurrentTrip(res.data);
      } catch (err) {
        console.error('Error fetching current trip:', err);
      }
    };
    fetchCurrentTrip();
  }, [username]);

  // ✅ Fetch bus data and live route
  useEffect(() => {
    if (!currentTrip?.busNumber) return;
    const fetchBusData = async () => {
      try {
        const res = await axios.get(`${LOCATION_UPDATE_ENDPOINT}/${currentTrip.busNumber}`);
        const data = res.data;
        setBusData(data);

        if (data.trackingActive === false) {
          setTrackingActive(false);
          setIsGpsActive(false);
          setDirections(null);
          return;
        } else {
          setTrackingActive(true);
        }

        setCurrentLat(data.latitude);
        setCurrentLon(data.longitude);

        // ✅ Fetch route directions from Google Maps API
        if (window.google && data.fromLocation && data.destination) {
          const directionsService = new window.google.maps.DirectionsService();
          directionsService.route(
            {
              origin: data.fromLocation,
              destination: data.destination,
              travelMode: window.google.maps.TravelMode.DRIVING,
            },
            (result, status) => {
              if (status === 'OK') {
                setDirections(result);
              } else {
                console.error('Error fetching directions:', status);
              }
            }
          );
        }
      } catch (err) {
        console.error('Error fetching bus data:', err);
      }
    };

    fetchBusData();
    const interval = setInterval(fetchBusData, 8000); // auto-refresh every 8s
    return () => clearInterval(interval);
  }, [currentTrip]);

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
        const busNumber = currentTrip?.busNumber || '';
        await axios.post(`${LOCATION_UPDATE_ENDPOINT}/update`, null, {
          params: { busNumber, latitude: lat, longitude: lon },
        });
        setTrackingActive(true);
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

  const handleStopGps = async () => {
    if (watchIdRef.current !== null) navigator.geolocation.clearWatch(watchIdRef.current);
    watchIdRef.current = null;
    setIsGpsActive(false);
    setTrackingActive(false);

    try {
      const busNumber = currentTrip?.busNumber || '';
      await axios.post(`${LOCATION_UPDATE_ENDPOINT}/stop`, null, {
        params: { busNumber },
      });
    } catch (err) {
      console.error('Error stopping GPS:', err);
    }

    setDirections(null);
    setBusData(null);
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  // ✅ Periodically update next stop even if GPS not moving
  useEffect(() => {
    if (!currentTrip?.busNumber) return;
    const interval = setInterval(async () => {
      try {
        const res = await axios.get(`${LOCATION_UPDATE_ENDPOINT}/${currentTrip.busNumber}`);
        if (res.data?.nextStop) setNextStop(res.data.nextStop);
      } catch (err) {
        console.error('Error fetching next stop:', err);
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [currentTrip]);

  const handleMarkAttendance = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login again");
        return;
      }

      const res = await axios.post(
        "http://localhost:8080/api/staff/mark-attendance",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to mark attendance");
    }
  };


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
              <span className={`status-indicator ${isGpsActive ? 'active' : 'inactive'}`}></span>
              <strong>Status: On Duty</strong>
            </div>
            <p>
              Shift: {currentTrip?.shiftTime || '06:00 - 14:00'} | Route:{' '}
              {currentTrip?.route || '138 Colombo-Kandy'}
            </p>
            <p>GPS: {isGpsActive ? 'Active' : 'Inactive'} | Logs: Updated: Just now</p>
          </div>

          <div className="trip-info">
            <h3>Current Trip</h3>
            <p className="route">
              {currentTrip
                ? `${currentTrip?.depotName} → ${currentTrip?.route.split(' → ')[1]}`
                : 'Colombo → Kandy'}{' '}
              <span className="next-stop">Next Stop: {nextStop}</span>
            </p>
            <p>Passengers: 28/50 | Trip Progress: 45%</p>
          </div>

          <div className="button-grid">
            <button className="btn btn-primary" onClick={handleStartGps}>
              Start GPS Sharing
            </button>
            <button className="btn btn-danger" onClick={handleStopGps}>
              Stop GPS Sharing
            </button>
            <button className="btn btn-primary" onClick={handleMarkAttendance}>Mark Attendance</button>
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
            <span className="bus-label">{currentTrip?.busNumber || '138'}</span>
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
                {trackingActive && (
                  <>
                    {/* ✅ Current Bus Marker */}
                    <Marker
                      position={{ lat: currentLat, lng: currentLon }}
                      icon={{
                        url: 'https://cdn-icons-png.flaticon.com/512/61/61205.png',
                        scaledSize: new window.google.maps.Size(35, 35),
                        anchor: new window.google.maps.Point(17, 34),
                      }}
                    />

                    <InfoBox
                        position={{ lat: currentLat, lng: currentLon }}
                                options={{ closeBoxURL: "",
                                  enableEventPropagation: true,
                             pixelOffset: new window.google.maps.Size(-100, -40),
                                  }}>
    <div
      style={{
        background: "linear-gradient(135deg, #0072ff, #00c6ff)",
        color: "#fff",
        padding: "10px 15px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        fontFamily: "Poppins, sans-serif",
        textAlign: "center",
        minWidth: "180px",
      }}
    >
    <h4 style={{ margin: "0", fontSize: "15px", fontWeight: "600" }}>🚌 Live Bus</h4>
    <p style={{ margin: "4px 0", fontSize: "13px" }}>
      <strong>Route:</strong> {busData?.fromLocation} → {busData?.destination}
    </p>
    <p style={{ margin: "2px 0", fontSize: "12px" }}>
      📍 {formatCoord(currentLat)}, {formatCoord(currentLon)}
    </p>
    <p style={{ margin: "0", fontSize: "12px" }}>
      ⏱ {new Date().toLocaleTimeString()}
    </p>
  </div>
</InfoBox>


                    {directions && <DirectionsRenderer directions={directions} />}
                  </>
                )}

                <RecenterMap lat={currentLat} lon={currentLon} mapRef={mapRef} />
              </GoogleMap>
            ) : (
              <p style={{ textAlign: 'center', marginTop: '50px' }}>Loading map...</p>
            )}

            <div className="map-content">
              <p>
                Current Location:{' '}
                {currentLat && currentLon
                  ? `${formatCoord(currentLat)}, ${formatCoord(currentLon)}`
                  : 'Fetching...'}
              </p>
              <p>Next Stop: {nextStop}</p>
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
                <p>
                  <span className="profile-icon">👤</span>{' '}
                  <strong>
                    {staffProfile.firstName} {staffProfile.lastName}
                  </strong>
                </p>
                <p>
                  <span className="profile-icon">📧</span> {staffProfile.email}
                </p>
                <p>
                  <span className="profile-icon">📱</span> {staffProfile.mobileNumber}
                </p>
              </div>
            )}
          </div>

          <button className="btn btn-edit" onClick={() => navigate('/edit_staff_profile')}>
            Edit Profile
          </button>

          <div className="profile-actions">
            <button className="btn btn-secondary" onClick={() => navigate('/staff_feedback')}>
              Submit Feedback
            </button>
            <button className="btn btn-secondary" onClick={() => navigate('/staff_help_support')}>
              Help & Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;

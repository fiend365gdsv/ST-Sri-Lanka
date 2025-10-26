import React, { useState, useEffect } from 'react';
import './route_and_schedule.css';
import { Link, useNavigate } from 'react-router-dom';

const AddSchedule = () => {
  const navigate = useNavigate();

  // Updated field names to match backend DTO
  const [formData, setFormData] = useState({
    depotName: '',
    busNumber: '',
    route: '',
    driverName: '',
    conductorName: '',
    shiftTime: '',
    startDate: '',
  });

  const [busNumbers, setBusNumbers] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [conductors, setConductors] = useState([]);

  const [activeTab, setActiveTab] = useState('admin');

  // Fetch dropdown options when depot changes
  useEffect(() => {
    if (!formData.depotName) return;

    const depot = formData.depotName;
    const BASE_URL = "http://localhost:8080/api/schedules/depot";

    const fetchDropdownData = async () => {
      try {
        const [busRes, routeRes, driverRes, conductorRes] = await Promise.all([
          fetch(`${BASE_URL}/${depot}/bus-numbers`),
          fetch(`${BASE_URL}/${depot}/routes`),
          fetch(`${BASE_URL}/${depot}/drivers`),
          fetch(`${BASE_URL}/${depot}/conductors`)
        ]);

        if (!busRes.ok || !routeRes.ok || !driverRes.ok || !conductorRes.ok) {
          throw new Error("Failed to fetch dropdown data");
        }

        const [busData, routeData, driverData, conductorData] = await Promise.all([
          busRes.json(),
          routeRes.json(),
          driverRes.json(),
          conductorRes.json()
        ]);

        setBusNumbers(busData);
        setRoutes(routeData);
        setDrivers(driverData);
        setConductors(conductorData);
      } catch (error) {
        console.error("Error fetching depot data:", error);
        alert("⚠️ Failed to load depot data");
      }
    };

    fetchDropdownData();
  }, [formData.depotName]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle Add Schedule
  const handleAddSchedule = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/schedules", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        alert("✅ Schedule added successfully!");
        console.log("Added Schedule:", data);
        navigate("/admin/dashboard");
      } else {
        const errorText = await response.text();
        alert("❌ Failed to add schedule: " + errorText);
      }
    } catch (error) {
      alert("⚠️ Error adding schedule: " + error.message);
    }
  };

  return (
    <div className="bus-container">
      <h1 className="bus-title">Smart Public Bus Management System</h1>

      {/* Navigation Tabs */}
      <div className="tabs1">
        <div className="tabs">
          <button className="tab active">Admin Dashboard</button>
          <button className="tab">Staff Interface</button>
          <button className="tab">Passenger Portal</button>
        </div>
      </div>

      <div className="form-container-schedule">
        <div className="form-header-schedule">
          <h2 className="form-title">Bus Schedule</h2>
        </div>

        <div className="form-content-schedule">
          <div className="row">
            <div className="form-group-schedule">
              <label className="l-schedule">Select the Depot:</label>
              <select
                className="input-color-schedule"
                name="depotName"
                value={formData.depotName}
                onChange={handleChange}
              >
                <option value="">Select Depot</option>
                <option>Horana</option>
                <option>Galle</option>
                <option>Colombo</option>
                <option>Mathara</option>
              </select>
            </div>
          </div>

          <div className="row">
            <div className="form-group-schedule">
              <label className="l-schedule">Bus Route:</label>
              <select
                className="input-color-schedule"
                name="route"
                value={formData.route}
                onChange={handleChange}
              >
                <option value="">Select Route</option>
                {routes.map((r, i) => (
                  <option key={i} value={r}>{r}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="row">
            <div className="form-group-schedule">
              <label className="l-schedule">Bus Number:</label>
              <select
                className="input-color-schedule"
                name="busNumber"
                value={formData.busNumber}
                onChange={handleChange}
              >
                <option value="">Select Bus</option>
                {busNumbers.map((b, i) => (
                  <option key={i} value={b}>{b}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="row">
            <div className="form-group-schedule">
              <label className="l-schedule">Driver:</label>
              <select
                className="input-color-schedule"
                name="driverName"
                value={formData.driverName}
                onChange={handleChange}
              >
                <option value="">Select Driver</option>
                {drivers.map((d, i) => (
                  <option key={i} value={d}>{d}</option>
                ))}
              </select>
            </div>
            <div className="form-group-schedule">
              <label className="l-schedule">Conductor:</label>
              <select
                className="input-color-schedule"
                name="conductorName"
                value={formData.conductorName}
                onChange={handleChange}
              >
                <option value="">Select Conductor</option>
                {conductors.map((c, i) => (
                  <option key={i} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="row">
            <div className="form-group-schedule">
              <label className="l-schedule">Shift Time:</label>
              <input
                className="input-color-schedule"
                type="text"
                name="shiftTime"
                placeholder="Shift Time"
                value={formData.shiftTime}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="form-group-schedule">
              <label className="l-schedule">Start Date:</label>
              <input
                className="input-color-schedule"
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="button-container">
            <button className="back-button" onClick={() => navigate("/admin/dashboard")}>
              Back
            </button>
            <button className="register-button" onClick={handleAddSchedule}>
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSchedule;

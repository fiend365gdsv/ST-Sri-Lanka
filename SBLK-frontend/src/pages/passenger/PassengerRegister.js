import React, { useState } from 'react';
import './passengerregister.css';
import { Link, useNavigate } from 'react-router-dom';

const PassengerRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobileNumber: '',
    email: '',
    addressLine1: '',
    addressLine2: '',
    dateOfBirth: '',
    gender: '',
    district: '',
    city: '',
    username: '',
    password: '',
    retypePassword: '',
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle registration submit (connect to backend)
  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.retypePassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/passenger/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const message = await response.text();
        alert("✅ " + message);
        navigate("/passenger/dashboard");
      } else {
        const error = await response.text();
        alert("❌ Registration failed: " + error);
      }
    } catch (error) {
      alert("⚠️ Error connecting to backend: " + error.message);
    }
  };

  // Reset form
  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="bus-container">
      <h1 className="bus-title">Smart Public Bus Management System</h1>

      <div className="form-container-p-register">
        <div className="form-header">
          <h2 className="form-title">Register Passenger</h2>
        </div>

        <div className="form-content-p-register">
          <div className="row">
            <div className="form-group-p-reg">
              <label className="l-p-register">Full Name:</label>
              <input className="input-color-p-reg"
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group-p-reg">
              <label className="l-p-register">&nbsp;</label>
              <input className="input-color-p-reg"
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="form-group-p-reg">
              <label className="l-p-register">Mobile Number:</label>
              <input className="input-color-p-reg"
                type="tel"
                name="mobileNumber"
                placeholder="Number"
                value={formData.mobileNumber}
                onChange={handleChange}
              />
            </div>
            <div className="form-group-p-reg">
              <label className="l-p-register">Email:</label>
              <input className="input-color-p-reg"
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="form-group-p-reg">
              <label className="l-p-register">Address:</label>
              <input className="input-color-p-reg"
                type="text"
                name="addressLine1"
                placeholder="Line 1"
                value={formData.addressLine1}
                onChange={handleChange}
              />
            </div>
            <div className="form-group-p-reg">
              <label className="l-p-register">&nbsp;</label>
              <input className="input-color-p-reg"
                type="text"
                name="addressLine2"
                placeholder="Line 2"
                value={formData.addressLine2}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="form-group-p-reg">
              <label className="l-p-register">Date of Birth:</label>
              <input className="input-color-p-reg"
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="form-group-p-reg">
              <label className="l-p-register">Gender:</label>
              <select className="input-color-p-reg"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>

          <div className="row">
            <div className="form-group-p-reg">
              <label className="l-p-register">District:</label>
              <input className="input-color-p-reg"
                type="text"
                name="district"
                placeholder="District"
                value={formData.district}
                onChange={handleChange}
              />
            </div>
            <div className="form-group-p-reg">
              <label className="l-p-register">City:</label>
              <input className="input-color-p-reg"
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="form-group-p-reg">
              <label className="l-p-register">Username:</label>
              <input className="input-color-p-reg"
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="form-group-p-reg">
              <label className="l-p-register">Password:</label>
              <input className="input-color-p-reg"
                type="password"
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="form-group-p-reg">
              <label className="l-p-register">Re-Password:</label>
              <input className="input-color-p-reg"
                type="password"
                name="retypePassword"
                placeholder="Re-Enter Password"
                value={formData.retypePassword}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="button-container">
            <button className="back-button" onClick={handleBack}>
              Back
            </button>
            <button className="register-button" onClick={handleRegister}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassengerRegister;

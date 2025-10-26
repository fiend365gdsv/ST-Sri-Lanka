import React, { useState } from 'react';
import './driverregister.css';
import { Link, useNavigate } from 'react-router-dom';

const DriverRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
    addressLine1: '',
    addressLine2: '',
    dob: '',
    staffType: 'Driver',
    gender: '',
    city: '',
    district: '',
    nic: '',
    licenseNumber: '',
    licenseExpiry: '',
    experience: '',
    previousEmployment: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (name === 'staffType' && value === 'Driver') {
      navigate('/driverregister');
    }
    if (name === 'staffType' && value === 'Conductor') {
      navigate('/conductorregister');
    }
    if (name === 'staffType' && value === 'Admin') {
      navigate('/adminregister');
    }
    if (name === 'staffType' && value === 'Officer') {
      navigate('/officerregister');
    }
  };

  const handleRegister = async () => {
    setLoading(true);
    try {
      // Prepare data object matching DriverRegisterRequestDto (extends StaffBaseRequestDto)
      const dataObject = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        mobileNumber: formData.mobile,
        email: formData.email,
        addressLine1: formData.addressLine1,
        addressLine2: formData.addressLine2,
        dateOfBirth: formData.dob,
        gender: formData.gender,
        district: formData.district,
        city: formData.city,
        nic: formData.nic,
        experienceYears: parseInt(formData.experience) || 0,
        previousEmploymentDetails: formData.previousEmployment,
        driverLicenseNumber: formData.licenseNumber,
        driverLicenseExpiryDate: formData.licenseExpiry
      };

      // Backend expects: @RequestParam String role, @RequestBody String jsonData
      const response = await fetch('http://localhost:8080/api/staff/register?role=DRIVER', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataObject),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Driver registered successfully! Credentials sent to email.');
        console.log('Registration data:', result);
        navigate("/staff/dashboard");
      } else {
        alert('Registration failed: ' + (result.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error registering driver:', error);
      alert('Error registering driver: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/admindashboard");
  };

  return (
    <div className="driver-container">
      <h1 className="driver-title">Smart Public Bus Management System</h1>

      <div className="driver-form-container">
        <div className="form-header">
          <h2 className="form-title">Register Staff</h2>
        </div>

        <div className="driver-form-content">

          <div className="driver-row">
            <div className="driver-form-group">
              <label className="driver-label">Staff Type:</label>
              <select
                name="staffType"
                value={formData.staffType}
                onChange={handleChange}
              >
                <option>Driver</option>
                <option>Conductor</option>
                <option>Admin</option>
                <option>Officer</option>
              </select>
            </div>
          </div>

          <div className="driver-row">
            <div className="driver-form-group">
              <label className="driver-label">Full Name:</label>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="driver-form-group">
              <label className="driver-label">&nbsp;</label>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="driver-row">
            <div className="driver-form-group">
              <label className="driver-label">Mobile Number:</label>
              <input
                type="tel"
                name="mobile"
                placeholder="Number"
                value={formData.mobile}
                onChange={handleChange}
              />
            </div>
            <div className="driver-form-group">
              <label className="driver-label">Email:</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="driver-row">
            <div className="driver-form-group">
              <label className="driver-label">Address:</label>
              <input
                type="text"
                name="addressLine1"
                placeholder="Line 1"
                value={formData.addressLine1}
                onChange={handleChange}
              />
            </div>
            <div className="driver-form-group">
              <label className="driver-label">&nbsp;</label>
              <input
                type="text"
                name="addressLine2"
                placeholder="Line 2"
                value={formData.addressLine2}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="driver-row">
            <div className="driver-form-group">
              <label className="driver-label">Date of Birth:</label>
              <input
                type="text"
                name="dob"
                placeholder="MM-DD-YYYY"
                value={formData.dob}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="driver-row">
            <div className="driver-form-group">
              <label className="driver-label">Gender:</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
                <option>Prefer not to tell</option>
              </select>
            </div>
          </div>

          <div className="driver-row">
            <div className="driver-form-group">
              <label className="driver-label">District: </label>
              <input
                type="text"
                name="district"
                placeholder="District"
                value={formData.district}
                onChange={handleChange}
              />
            </div>
            <div className="driver-form-group">
              <label className="driver-label">City: </label>
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="driver-row">
            <div className="driver-form-group">
              <label className="driver-label">NIC: </label>
              <input
                type="text"
                name="nic"
                placeholder="NIC"
                value={formData.nic}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="driver-row">
            <div className="driver-form-group">
              <label className="driver-label">Driver's License Number:</label>
              <input
                type="text"
                name="licenseNumber"
                placeholder="Number"
                value={formData.licenseNumber}
                onChange={handleChange}
              />
            </div>
            <div className="driver-form-group">
              <label className="driver-label">Driver's License Expiration Date:</label>
              <input
                type="text"
                name="licenseExpiry"
                placeholder="MM-DD-YYYY"
                value={formData.licenseExpiry}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="driver-row">
            <div className="driver-form-group">
              <label className="driver-label">How Many Years of Experience:</label>
              <input
                type="number"
                name="experience"
                placeholder="Number"
                value={formData.experience}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="full-width">
            <div className="driver-form-group">
              <label className="driver-label">Please provide details about your previous employment:</label>
              <textarea
                name="previousEmployment"
                value={formData.previousEmployment}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="button-container">
            <button className="back-button" onClick={handleBack}>
              Back
            </button>
            <button className="register-button" onClick={handleRegister} disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverRegister;
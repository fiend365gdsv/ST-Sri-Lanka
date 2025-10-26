import React, { useState } from 'react';
import './adminregister.css';
import { Link, useNavigate } from 'react-router-dom';

const AdminRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
    addressLine1: '',
    addressLine2: '',
    dob: '',
    staffType: 'Admin',
    gender: '',
    city: '',
    district: '',
    nic: '',
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
      // Prepare data object matching GenericStaffRegisterRequestDto (extends StaffBaseRequestDto)
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
        previousEmploymentDetails: formData.previousEmployment
      };

      // Backend expects: @RequestParam String role, @RequestBody String jsonData
      const response = await fetch('http://localhost:8080/api/staff/register?role=ADMIN', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataObject),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Admin registered successfully! Credentials sent to email.');
        console.log('Registration data:', result);
        navigate("/loginpage");
      } else {
        alert('Registration failed: ' + (result.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error registering admin:', error);
      alert('Error registering admin: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/admindashboard");
  };

  return (
    <div className="bus-container">
      <h1 className="bus-title">Smart Public Bus Management System</h1>

      <div className="form-container">
        <div className="form-header">
          <h2 className="form-title">Register Staff</h2>
        </div>

        <div className="form-content">

          <div className="row">
            <div className="admin-form-group">
              <label className="admin-label">Staff Type:</label>
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

          <div className="row">
            <div className="conductor-form-group">
              <label className="conductor-label">Full Name:</label>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="conductor-form-group">
              <label className="conductor-label">&nbsp;</label>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="conductor-form-group">
              <label className="conductor-label">Mobile Number:</label>
              <input
                type="tel"
                name="mobile"
                placeholder="Number"
                value={formData.mobile}
                onChange={handleChange}
              />
            </div>
            <div className="conductor-form-group">
              <label className="conductor-label">Email:</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="conductor-form-group">
              <label className="conductor-label">Address:</label>
              <input
                type="text"
                name="addressLine1"
                placeholder="Line 1"
                value={formData.addressLine1}
                onChange={handleChange}
              />
            </div>
            <div className="conductor-form-group">
              <label className="conductor-label">&nbsp;</label>
              <input
                type="text"
                name="addressLine2"
                placeholder="Line 2"
                value={formData.addressLine2}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="conductor-form-group">
              <label className="conductor-label">Date of Birth:</label>
              <input
                type="text"
                name="dob"
                placeholder="MM-DD-YYYY"
                value={formData.dob}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="conductor-form-group">
              <label className="conductor-label">Gender:</label>
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

          <div className="row">
            <div className="conductor-form-group">
              <label className="conductor-label">District: </label>
              <input
                type="text"
                name="district"
                placeholder="District"
                value={formData.district}
                onChange={handleChange}
              />
            </div>
            <div className="conductor-form-group">
              <label className="conductor-label">City: </label>
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="conductor-form-group">
              <label className="conductor-label">NIC: </label>
              <input
                type="text"
                name="nic"
                placeholder="NIC"
                value={formData.nic}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="conductor-form-group">
              <label className="conductor-label">How Many Years of Experience:</label>
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
            <div className="admin-form-group">
              <label className="admin-label">Please provide details about your previous employment:</label>
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

export default AdminRegister;
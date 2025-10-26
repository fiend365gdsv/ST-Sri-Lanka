import React, { useState, useEffect } from 'react';
import './passenger_edit_profile.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PassengerEditProfile = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username'); // get logged-in user

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
    addressLine1: '',
    addressLine2: '',
    dob: '',
    gender: '',
    city: '',
    district: '',
    username: '',
    password: '',
    repassword: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch current user profile on component mount
  useEffect(() => {
    if (!username) return;
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:8080/api/passenger/profile/${username}`);
        const data = res.data;
        setFormData({
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          mobile: data.mobileNumber || '',
          email: data.email || '',
          addressLine1: data.addressLine1 || '',
          addressLine2: data.addressLine2 || '',
          dob: data.dateOfBirth || '',
          gender: data.gender || '',
          city: data.city || '',
          district: data.district || '',
          username: data.username || '',
          password: '',
          repassword: '',
        });
        setError('');
      } catch (err) {
        console.error('Error loading profile:', err);
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [username]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle profile update
  const handleUpdate = async () => {
    if (formData.password !== formData.repassword) {
      alert('Passwords do not match!');
      return;
    }
    try {
      const updateData = { ...formData };
      delete updateData.repassword; // remove repassword field before sending
      await axios.put(`http://localhost:8080/api/passenger/profile/update/${username}`, updateData);
      alert('Profile updated successfully!');
      navigate('/passengerdashboard');
    } catch (err) {
      console.error('Error updating profile:', err);
      alert('Failed to update profile!');
    }
  };

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="bus-container">
      <h1 className="bus-title">Smart Public Bus Management System</h1>

      <div className="form-container-p-register">
        <div className="form-header">
          <h2 className="form-title">Edit Profile</h2>
        </div>

        <div className="form-content-p-register">
          <div className="row">
            <div className="form-group-p-reg">
              <label className="l-p-register">First Name:</label>
              <input
                className="input-color-p-reg"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group-p-reg">
              <label className="l-p-register">Last Name:</label>
              <input
                className="input-color-p-reg"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="form-group-p-reg">
              <label className="l-p-register">Mobile Number:</label>
              <input
                className="input-color-p-reg"
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
              />
            </div>
            <div className="form-group-p-reg">
              <label className="l-p-register">Email:</label>
              <input
                className="input-color-p-reg"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="form-group-p-reg">
              <label className="l-p-register">Address Line 1:</label>
              <input
                className="input-color-p-reg"
                type="text"
                name="addressLine1"
                value={formData.addressLine1}
                onChange={handleChange}
              />
            </div>
            <div className="form-group-p-reg">
              <label className="l-p-register">Address Line 2:</label>
              <input
                className="input-color-p-reg"
                type="text"
                name="addressLine2"
                value={formData.addressLine2}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="form-group-p-reg">
              <label className="l-p-register">Date of Birth:</label>
              <input
                className="input-color-p-reg"
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
              />
            </div>
            <div className="form-group-p-reg">
              <label className="l-p-register">Gender:</label>
              <select name="gender" value={formData.gender} onChange={handleChange} className="input-color-p-reg">
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>

          <div className="row">
            <div className="form-group-p-reg">
              <label className="l-p-register">District:</label>
              <input
                className="input-color-p-reg"
                type="text"
                name="district"
                value={formData.district}
                onChange={handleChange}
              />
            </div>
            <div className="form-group-p-reg">
              <label className="l-p-register">City:</label>
              <input
                className="input-color-p-reg"
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="form-group-p-reg">
              <label className="l-p-register">Username:</label>
              <input
                className="input-color-p-reg"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                disabled // prevent changing username
              />
            </div>
          </div>

          <div className="row">
            <div className="form-group-p-reg">
              <label className="l-p-register">Password:</label>
              <input
                className="input-color-p-reg"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="form-group-p-reg">
              <label className="l-p-register">Re-Password:</label>
              <input
                className="input-color-p-reg"
                type="password"
                name="repassword"
                value={formData.repassword}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="button-container">
            <button className="back-button" onClick={() => navigate('/passengerdashboard')}>
              Back
            </button>
            <button className="register-button" onClick={handleUpdate}>
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassengerEditProfile;

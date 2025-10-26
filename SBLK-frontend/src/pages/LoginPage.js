import React, { useState } from 'react';
import './LoginPage.css';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
  e.preventDefault();
  if (!username || !password) {
    alert("⚠️ Please enter both username and password.");
    return;
  }

  setLoading(true);

  try {
    const response = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // ✅ Store JWT token in localStorage
      if (data.token) {
        localStorage.setItem("token", data.token);
      } else {
        console.warn("No token found in response:", data);
      }

      // ✅ Store user info
      localStorage.setItem("userRole", data.role);
      localStorage.setItem("username", username);

      // ✅ Redirect based on role or redirectUrl
      if (data.redirectUrl) {
        navigate(data.redirectUrl);
      } else {
        switch (data.role?.toUpperCase()) {
          case "ADMIN":
          case "OFFICER":
            navigate("/admin/dashboard");
            break;
          case "DRIVER":
          case "CONDUCTOR":
            navigate("/staff/dashboard");
            break;
          case "PASSENGER":
            navigate("/passenger/dashboard");
            break;
          default:
            alert("⚠️ Unknown role: " + data.role);
            console.log("Login response:", data);
        }
      }
    } else {
      alert("❌ Login failed: " + (data.message || data));
    }
  } catch (error) {
    alert("⚠️ Network error: " + error.message);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login to SmartBus</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="switch-link">
          Don’t have an account? <Link to="/passengerregister"><u>Sign up</u></Link>
        </p>
      </div>
    </div>
  );
}

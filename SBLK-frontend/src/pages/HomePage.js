
import React, { useRef } from "react";
import "./HomePage.css";
import { Link, useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  // Refs for smooth scrolling
  const featuresRef = useRef(null);
  const rolesRef = useRef(null);
  const aboutRef = useRef(null);
  //const contactRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="homepage">
      {/* Header */}
      <header className="header">
        <div className="logo">🚌 SmartBus</div>
        <nav>
          <ul>
            <li onClick={() => scrollToSection(featuresRef)}>Features</li>
            <li onClick={() => scrollToSection(rolesRef)}>User Roles</li>
            <li onClick={() => scrollToSection(aboutRef)}>About</li>
            <li onClick={() => scrollToSection(aboutRef)}>Contact</li>
            <li><button className="btn signin" onClick={()=>navigate("/loginpage")}>Sign In</button></li>
            <li><button className="btn signup" onClick={()=>navigate("/passengerregister")}>Sign Up</button></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-text">
          <h1>Smart Public Bus Management System</h1>
          <p>
            Revolutionizing public transport in Sri Lanka with real-time tracking,
            online booking, and intelligent management for passengers, drivers,
            and administrators.
          </p>
          <div className="hero-buttons">
            <button className="btn get-started" onClick={()=>navigate("/loginpage")}>Get Started</button>
            <button className="btn learn-more" onClick={() => scrollToSection(aboutRef)}>Learn More</button>
          </div>
        </div>
        <div className="hero-image">
          <img src="/images/bus2.jpg" alt="Bus Illustration" />
        </div>
      </section>

      {/* Features */}
      <section className="features" ref={featuresRef}>
        <div className="features-bg">
          <h2>Powerful Features</h2>
          <p>Everything you need to manage public transportation efficiently</p>
          <div className="feature-grid">
            <div className="feature-card">🚍 <h3>Real-Time Tracking</h3><p>Track bus locations with GPS and receive live status updates.</p></div>
            <div className="feature-card">💻 <h3>Online Booking</h3><p>Reserve bus seats, view schedules, and manage your trips online.</p></div>
            <div className="feature-card">👨‍✈️ <h3>Staff Management</h3><p>Efficiently manage drivers, conductors, and schedules.</p></div>
            <div className="feature-card">🚨 <h3>Emergency SOS</h3><p>Instant alerts for drivers and passengers to ensure safety.</p></div>
            <div className="feature-card">📊 <h3>Analytics Dashboard</h3><p>Get insights on trip logs, delays, and passenger analytics.</p></div>
            <div className="feature-card">🔔 <h3>Smart Notifications</h3><p>Stay informed about delays, route changes, and messages.</p></div>
          </div>
        </div>
      </section>

      {/* User Roles */}
      <section className="roles" ref={rolesRef}>
        <h2>Built for Everyone</h2>
        <p>Tailored experience for administrators, drivers, and passengers</p>
        <div className="role-grid">
          <div className="role-card">
            <h3>Admin / Transport Officers</h3>
            <ul>
              <li>Manage bus routes and drivers</li>
              <li>Real-time fleet monitoring</li>
              <li>Staff management</li>
              <li>Analytics and reporting</li>
              <li>Emergency management</li>
            </ul>
          </div>
          <div className="role-card">
            <h3>Drivers & Conductors</h3>
            <ul>
              <li>View assigned schedules</li>
              <li>GPS location sharing</li>
              <li>Attendance marking</li>
              <li>Emergency SOS alert</li>
              <li>Notify unavailability</li>
            </ul>
          </div>
          <div className="role-card">
            <h3>Passengers</h3>
            <ul>
              <li>Online seat booking</li>
              <li>Route planning and search</li>
              <li>Custom journey alerts</li>
              <li>Feedback and complaints</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" ref={aboutRef}>
        <div className="footer-columns">
          <div>
            <h3>SmartBus</h3>
            <p>Smart bus transportation with modern technology and innovative solutions.</p>
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul>
              <li onClick={() => scrollToSection(featuresRef)}>Features</li>
              <li onClick={() => scrollToSection(rolesRef)}>User Guide</li>
              <li onClick={() => scrollToSection(aboutRef)}>Support</li>
              <li onClick={() => scrollToSection(aboutRef)}>Contact</li>
            </ul>
          </div>
          <div>
            <h4>User Access</h4>
            <ul>
              <li>Admin Login</li>
              <li>Driver Login</li>
              <li>Passenger Login</li>
              <li>Register</li>
            </ul>
          </div>
          <div>
            <h4>Contact Info</h4>
            <p>📧 info@smartbus.lk</p>
            <p>📞 +94 11 123 4567</p>
            <p>📍 Colombo 07, Sri Lanka</p>
          </div>
        </div>
        <div className="footer-bottom">
          © 2025 SmartBus Management System. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default HomePage;

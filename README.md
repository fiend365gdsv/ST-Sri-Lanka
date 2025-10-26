1. 🧩 Introduction

1.1 🎯 Purpose

The Smart Public Bus Management & Tracking System aims to modernize public transportation in Sri Lanka by introducing real-time tracking, digital staff coordination, online ticket booking, and automated alerts.
It enhances efficiency, transparency, and passenger satisfaction across the national bus transport network.

1.2 🌐 Scope

The system is a web-based platform designed for three main user types:

🧑‍💼 Admins / Transport Officers – Manage buses, routes, and staff.

🧑‍✈️ Drivers & Conductors – Share live GPS locations and manage daily operations.

🧍‍♂️ Passengers – Track buses, book tickets, and receive notifications.

Core Capabilities:

Real-time GPS tracking of buses

Online ticket booking

Staff attendance and assignment

Alerts for delays, emergencies, or updates

Automated reporting and analytics

1.3 🔁 Lifecycle Model

The system follows the Agile Software Development Life Cycle (SDLC):

📝 Planning & Requirement Analysis

🧠 Design & Prototyping

💻 Development

🧪 Testing

🚀 Deployment

🔧 Maintenance & Iteration

This ensures flexibility, stakeholder feedback, and rapid iteration for improvement.

2. 🏗️ Overall Description
2.1 🌍 Product Perspective

The system is modular and scalable, designed to integrate with:

GPS & Map APIs

Online payment gateways

Government transport databases (e.g., SLTB system

2.2 👥 User Roles & Permissions
🧑‍💼 Admin / Transport Officers

Manage routes, schedules, and staff

Monitor buses in real time

View reports (daily collection, trip counts, delays, etc.)

Push alerts for emergencies or announcements

Track profit (monthly, annual)

🧑‍✈️ Drivers & Conductors

Secure login access

Start/stop GPS tracking

Mark attendance/unavailability

Trigger SOS alerts

🧍‍♂️ Passengers

Register/login

Browse buses by route/time

Track buses live on map

Receive alerts when bus nears location

Book tickets & view trip history

Submit complaints or feedback

2.3 ⚙️ Operating Environment

| Component            | Technology                                                                      |
| -------------------- | ------------------------------------------------------------------------------- |
| **Frontend**         | React.js, Axios, Tailwind CSS                                                   |
| **Backend**          | Spring Boot (Java), REST API                                                    |
| **Authentication**   | Spring Security + JWT                                                           |
| **Realtime Updates** | Firebase Realtime Database                                                      |
| **Database**         | MySQL, MongoDB                                                                  |
| **Map & Location**   | Leaflet.js + OpenStreetMap API                                                  |
| **Notifications**    | Firebase Cloud Messaging / Push.js                                              |
| **Hosting**          | Vercel (Frontend), Render/Railway (Backend), MongoDB Atlas, PlanetScale (MySQL) |


3. 🚦 System Features

| No   | Feature                  | Description                          | User Role        |
| ---- | ------------------------ | ------------------------------------ | ---------------- |
| i    | **Route Management**     | Define and update routes/schedules   | Admin            |
| ii   | **Staff Assignment**     | Assign drivers & conductors to buses | Admin            |
| iii  | **Real-Time Tracking**   | GPS-based live tracking              | Admin, Passenger |
| iv   | **Location Sharing**     | Drivers share current GPS location   | Driver           |
| v    | **Ticket Booking**       | Passengers reserve seats online      | Passenger        |
| vi   | **Notifications**        | Send alerts & updates                | All Users        |
| vii  | **SOS Function**         | Emergency alert to control center    | Driver           |
| viii | **Analytics Dashboard**  | View operational insights            | Admin            |
| ix   | **Feedback & Reporting** | Submit complaints/suggestions        | Passenger        |


4. ⚙️ Functional Requirements
🧑‍💼 Admin Panel

Add/Edit/Delete routes

Assign staff to buses

View real-time locations

Push emergency alerts

🧑‍✈️ Driver / Conductor Panel

Login to view schedule

Start GPS tracking

Mark attendance/unavailability

Send SOS alert

🧍‍♂️ Passenger Module

Register/login

Search buses & book tickets

Track bus in real-time

Receive proximity alerts

Submit feedback

5. 🧠 Non-Functional Requirements

| Aspect           | Description                                        |
| ---------------- | -------------------------------------------------- |
| **Performance**  | Support 100+ concurrent users with minimal latency |
| **Security**     | HTTPS, JWT authentication, encrypted APIs          |
| **Scalability**  | Modular microservice-based architecture            |
| **Usability**    | Intuitive, mobile-responsive UI                    |
| **Availability** | 99.5% uptime with automatic backups                |


6. ⚖️ Assumptions & Constraints

All buses have GPS-enabled devices.

Continuous internet connectivity required for live tracking.

SLTB collaboration necessary for staff & route data.



7. 🚀 Future Enhancements

📱 Android & iOS mobile apps

🧾 QR-based ticket validation

🤖 AI-driven route optimization (traffic-aware rerouting)

🏛 Integration with National Transport APIs

📊 Predictive analytics and passenger flow forecasts



💻 Technology Stack Summary

| Layer               | Tools & Frameworks                        |
| ------------------- | ----------------------------------------- |
| **Frontend**        | React.js, Tailwind CSS, Axios, Leaflet.js |
| **Backend**         | Spring Boot, REST API, Spring Security    |
| **Database**        | MySQL, MongoDB                            |
| **Realtime**        | Firebase Realtime Database                |
| **Deployment**      | Vercel, Render, Railway                   |
| **Version Control** | Git & GitHub                              |



👨‍💼 Developed By

Senura Vinodya - Full Stack Developer


🏁 License

This project is developed as part of the Higher National Diploma in Software Engineering (HNDSE) final project and is open for academic reference.
© 2025 National Institute of Business Management (NIBM), Colombo 07



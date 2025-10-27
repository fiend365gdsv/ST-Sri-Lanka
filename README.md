<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&text=Welcome%20to%20My%20Project!&color=gradient&height=100&fontSize=40" />
</div>

<h1 align="center">
  <img src="https://user-images.githubusercontent.com/74038190/213844263-a8897a51-32f4-4b3b-b5c2-e1528b89f6f3.png" width="50px" /> Smart Transport Sri Lanka
</h1>

<p align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=24&pause=1000&width=600&lines=Modern+Public+Transport+in+Sri+Lanka;Real-Time+Bus+Tracking;Online+Ticket+Booking;Digital+Staff+Management;Automated+Alerts" />
</p>

<div align="center">

### 🌟 Turning Ideas into Smarter, Digital Transportation Solutions 🌟

<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="700" />

<!-- Social Media Links with Animated Badges -->
<p>
<a href="https://github.com/fiend365gdsv"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white&color=black"/></a>
<a href="https://www.linkedin.com/in/senura-vinodya-170462371"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white"/></a>
<a href="mailto:senuravinodya2002@gmail.com"><img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white"/></a>
<a href="#"><img src="https://img.shields.io/badge/Portfolio-FF5722?style=for-the-badge&logo=google-chrome&logoColor=white"/></a>
</p>

</div>

---

## 📖 Introduction

### 🎯 Purpose
The **Smart Public Bus Management & Tracking System** modernizes public transportation in Sri Lanka with:

- Real-time GPS tracking of buses  
- Online ticket booking  
- Staff rotes and schedules  
- Alerts for delays, emergencies, or updates  
 

### 🌐 Scope
The system is designed for three main users:

- 🧑‍💼 **Admins / Transport Officers** – Manage buses, routes, and staff  
- 🧑‍✈️ **Drivers & Conductors** – Share live GPS locations and manage daily operations  
- 🧍‍♂️ **Passengers** – Track buses, book tickets, and receive notifications  

---

## 🏗️ Overall Description

### 🌍 Product Perspective
Modular and scalable system, integrated with:

- GPS & Map APIs  
- Online payment gateways  
- Government transport databases (SLTB)

### 👥 User Roles & Permissions

| Role | Capabilities |
| ---- | ------------ |
| **Admin / Transport Officers** | Manage routes, schedules, staff; monitor buses in real-time; push alerts; view reports |
| **Drivers & Conductors** | Secure login; start/stop GPS tracking; mark attendance/unavailability; trigger SOS alerts |
| **Passengers** | Register/login; browse buses; track buses live; receive proximity alerts; book tickets; submit feedback |

### ⚙️ Operating Environment

| Component            | Technology                                                                      |
| -------------------- | ------------------------------------------------------------------------------- |
| **Frontend**         | React.js, Axios, Tailwind CSS                                                   |
| **Backend**          | Spring Boot (Java), REST API                                                    |
| **Authentication**   | Spring Security + JWT                                                           |
| **Realtime Updates** | Firebase Realtime Database                                                      |
| **Database**         | MySQL, MongoDB                                                                  |
| **Map & Location**   | Google Map API                                                                  |
| **Notifications**    | Firebase Cloud Messaging / Push.js                                              |
| **Hosting**          | Vercel (Frontend), Render/Railway (Backend), MongoDB Atlas, PlanetScale (MySQL) |

---

## 🚦 System Features

| Feature                  | Description                          | User Role        |
| ------------------------ | ------------------------------------ | ---------------- |
| **Route Management**     | Define & update routes/schedules     | Admin            |
| **Staff Assignment**     | Assign drivers & conductors to buses | Admin            |
| **Real-Time Tracking**   | GPS-based live tracking               | Admin, Passenger |
| **Location Sharing**     | Drivers share current GPS location   | Driver           |
| **Ticket Booking**       | Passengers reserve seats online      | Passenger        |
| **Notifications**        | Send alerts & updates                | All Users        |
| **SOS Function**         | Emergency alert to control center    | Driver           |
| **Analytics Dashboard**  | View operational insights            | Admin            |
| **Feedback & Reporting** | Submit complaints/suggestions        | Passenger        |

---

## ⚙️ Functional Requirements

### 🧑‍💼 Admin Panel
- Add/Edit/Delete routes  
- Assign staff to buses  
- View real-time locations  
- Push emergency alerts  

### 🧑‍✈️ Driver / Conductor Panel
- Login to view schedule  
- Start GPS tracking  
- Mark attendance/unavailability  
- Send SOS alert  

### 🧍‍♂️ Passenger Module
- Register/login  
- Search buses & book tickets  
- Track bus in real-time  
- Receive proximity alerts  
- Submit feedback  

---

## 🧠 Non-Functional Requirements

| Aspect           | Description                                        |
| ---------------- | -------------------------------------------------- |
| **Performance**  | Support 100+ concurrent users with minimal latency |
| **Security**     | HTTPS, JWT authentication, encrypted APIs          |
| **Scalability**  | Modular microservice-based architecture            |
| **Usability**    | Intuitive, mobile-responsive UI                    |
| **Availability** | 99.5% uptime with automatic backups                |

---

## ⚖️ Assumptions & Constraints
- All buses have GPS-enabled devices.  
- Continuous internet connectivity required for live tracking.  
- SLTB collaboration necessary for staff & route data.  

---

## 🚀 Future Enhancements
- 📱 Android & iOS mobile apps  
- 🧾 QR-based ticket validation  
- 🤖 AI-driven route optimization (traffic-aware rerouting)  
- 🏛 Integration with National Transport APIs  
- 📊 Predictive analytics and passenger flow forecasts  

---

## 💻 Technology Stack

| Layer               | Tools & Frameworks                        |
| ------------------- | ----------------------------------------- |
| **Frontend**        | React.js, Tailwind CSS, Axios, Leaflet.js |
| **Backend**         | Spring Boot, REST API, Spring Security    |
| **Database**        | MySQL, MongoDB                            |
| **Realtime**        | Firebase Realtime Database                |
| **Deployment**      | Vercel, Render, Railway                   |
| **Version Control** | Git & GitHub                              |

---

## 👨‍💼 Developed By
**Senura Vinodya** – Full Stack Developer  

---

## 🏁 License
This project is part of the **Higher National Diploma in Software Engineering (HNDSE)** final project at NIBM, Colombo 07. Open for academic reference. © 2025
y
import logo from './logo.svg';
import 'leaflet/dist/leaflet.css';
import AdminDashboard from './pages/admin/AdminDashboard';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import DriverRegister from './pages/admin/staffregister/DriverRegister';
import ConductorRegister from './pages/admin/staffregister/ConductorRegister';
import AdminRegister from './pages/admin/staffregister/AdminRegister';
import OfficerRegister from './pages/admin/staffregister/OfficerRegister';
import PassengerRegister from './pages/passenger/PassengerRegister';
import PassengerDashboard from './pages/passenger/PassengerDashboard';
import View_Buses_on_Map from './pages/admin/View_Buses_on_Map';
import Route_and_Schedule from './pages/admin/Route_and_Schedule';
import Admin_Send_Alert from './pages/admin/Admin_Send_Alert';
import View_Analytics from './pages/admin/View_Analytics';
import Profit_Management from './pages/admin/Profit_Management';
import Add_Depot from './pages/admin/Add_Depot';

import Staff_Dashboard from './pages/staff/Staff_Dashboard';
import Edit_Staff_Profiles from './pages/staff/Edit_Staff_Profiles';
import Staff_Help_Support from './pages/staff/Staff_Help_Support';
import Staff_Feedback from './pages/staff/Staff_Feedback';

import Passenger_Edit_Profile from './pages/passenger/Passenger_Edit_Profile';
import Passenger_Feedback from './pages/passenger/Passenger_Feedback';
import Passenger_Help_Support from './pages/passenger/Passenger_Help_Support';

import ViewFeedback from './pages/admin/ViewFeedback';

import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/loginpage" element={<LoginPage />} />
        <Route path="/driverregister" element={<DriverRegister />} />
        <Route path="/conductorregister" element={<ConductorRegister />} />
        <Route path="/adminregister" element={<AdminRegister/>} />
        <Route path="/officerregister" element={<OfficerRegister/>} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/passengerregister" element={<PassengerRegister />} />
        <Route path="/passenger/dashboard" element={<PassengerDashboard />} />
        <Route path="/view_buses_on_map" element={<View_Buses_on_Map />} />
        <Route path="/route_and_schedule" element={<Route_and_Schedule />} />
        <Route path="/admin_send_alert" element={<Admin_Send_Alert />} />
        <Route path="/view_analytics" element={<View_Analytics />} />
        <Route path="/profit_management" element={<Profit_Management />} />
        <Route path="/staff/dashboard" element={<Staff_Dashboard />} />
        <Route path="/add_depot" element={<Add_Depot />} />

        <Route path="/edit_staff_profile" element={<Edit_Staff_Profiles />} />
        <Route path="/staff_help_support" element={<Staff_Help_Support />} />
        <Route path="/staff_feedback" element={<Staff_Feedback />} />
        
        <Route path="/passenger_edit_profile" element={<Passenger_Edit_Profile />} />
        <Route path="/passenger_feedback" element={<Passenger_Feedback />} />
        <Route path="/passenger_help_support" element={<Passenger_Help_Support />} />

        <Route path="/view_feedback" element={<ViewFeedback />} />

      </Routes>
    </Router>
  );
}

export default App;

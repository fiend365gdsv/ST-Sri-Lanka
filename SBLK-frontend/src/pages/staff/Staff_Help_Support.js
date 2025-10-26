import React from "react";
import "./staff_help_support.css";
import { Link, useNavigate } from 'react-router-dom';

const StaffHelpSupport = () => {
  const navigate = useNavigate();
  return (
    <div className="dashboard-containerrrr">
      <h1 className="title">Smart Public Bus Management System</h1>

      <div className="tab-container">
        <button className="tab">Admin Dashboard</button>
        <button className="tab active">Staff Interface</button>
        <button className="tab">Passenger Portal</button>
      </div>

      <div className="content-box">
        <div className="help-header">Help & Support</div>

        <div className="form-box">
          <label>Subject:</label>
          <input type="text" className="input-field" placeholder="Enter subject" />

          <label>Help/Support:</label>
          <textarea className="textarea-field" placeholder="Enter Your Help & Support"></textarea>

          <div className="button-row">
            <button className="btn cancel" onClick={()=>navigate("/staff_dashboard")}>Cancel</button>
            <button className="btn send">Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffHelpSupport;
import React, { useState } from "react";
import "./admin_send_alert.css";
import { useNavigate } from 'react-router-dom';

const AdminSendAlert = () => {
  const navigate = useNavigate();
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!subject || !description) {
      alert("⚠️ Please fill in both fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/alert/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject: subject,
          description: description,
        }),
      });

      const data = await response.text();

      if (response.ok) {
        alert("✅ Alert sent successfully!");
        setSubject("");
        setDescription("");
      } else {
        alert("❌ Failed: " + data);
      }
    } catch (error) {
      alert("⚠️ Network error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-containerr">
      <h1 className="title">Smart Public Bus Management System</h1>

      <div className="tab-container">
        <button className="tab active">Admin Dashboard</button>
        <button className="tab">Driver Interface</button>
        <button className="tab">Passenger Portal</button>
      </div>

      <div className="content-box">
        <div className="help-header">Send Alerts</div>

        <div className="form-box">
          <label>Subject:</label>
          <input
            type="text"
            className="input-field"
            placeholder="Enter subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />

          <label>Alert:</label>
          <textarea
            className="textarea-field"
            placeholder="Enter alert message"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <div className="button-row">
            <button className="btn cancel" onClick={() => navigate("/admin/dashboard")}>
              Cancel
            </button>
            <button className="btn send" onClick={handleSend} disabled={loading}>
              {loading ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSendAlert;

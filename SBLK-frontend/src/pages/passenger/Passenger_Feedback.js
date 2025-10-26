import React, { useState } from "react";
import "./passenger_feedback.css";
import { useNavigate } from 'react-router-dom';

const PassengerFeedback = () => {
  const navigate = useNavigate();

  // ✅ new: states for subject & feedback
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ get logged username (assuming stored after login)
  const username = localStorage.getItem("username");

  const handleSubmit = async () => {
    if (!subject || !description) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    if (!username) {
      alert("User not logged in! Please log in again.");
      navigate("/login");
      return;
    }

    const feedbackData = {
      username: username,
      subject: subject,
      description: description
    };

    try {
      setLoading(true);
      const response = await fetch("http://localhost:8080/api/feedback/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(feedbackData)
      });

      if (response.ok) {
        alert("✅ Feedback submitted successfully!");
        navigate("/passengerdashboard");
      } else {
        alert("❌ Failed to submit feedback.");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("An error occurred while submitting feedback.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container-p-feedback">
      <h1 className="title">Smart Public Bus Management System</h1>

      <div className="tab-container">
        <button className="tab">Admin Dashboard</button>
        <button className="tab">Staff Interface</button>
        <button className="tab active">Passenger Portal</button>
      </div>

      <div className="content-box">
        <div className="help-header">Submit Feedback</div>

        <div className="form-box">
          <label>Subject:</label>
          <input
            type="text"
            className="input-field"
            placeholder="Enter subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />

          <label>Feedback:</label>
          <textarea
            className="textarea-field"
            placeholder="Enter Feedback"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <div className="button-row">
            <button
              className="btn cancel"
              onClick={() => navigate("/passenger/dashboard")}
            >
              Cancel
            </button>
            <button
              className="btn send"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassengerFeedback;

import React, { useState } from "react";
import "./staff_feedback.css";
import { useNavigate } from "react-router-dom";

const StaffFeedback = () => {
  const navigate = useNavigate();

  // ✅ States for subject, feedback, and loading
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Get logged username (from localStorage after login)
  const username = localStorage.getItem("username");

  // ✅ Handle Submit
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
      description: description,
    };

    try {
      setLoading(true);
      const response = await fetch("http://localhost:8080/api/feedback/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(feedbackData),
      });

      if (response.ok) {
        alert("✅ Feedback submitted successfully!");
        navigate("/staff/dashboard");
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
    <div className="dashboard-containerrr">
      <h1 className="title">Smart Public Bus Management System</h1>

      <div className="tab-container">
        <button className="tab">Admin Dashboard</button>
        <button className="tab active">Staff Interface</button>
        <button className="tab">Passenger Portal</button>
      </div>

      <div className="content-box">
        <div className="help-header">Give Feedback</div>

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
              onClick={() => navigate("/staff/dashboard")}
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

export default StaffFeedback;

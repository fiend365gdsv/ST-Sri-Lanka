import React, { useEffect, useState } from 'react';
import './viewfeedback.css';
import { useNavigate } from 'react-router-dom';

export default function ViewFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Correct backend endpoint
    fetch("http://localhost:8080/api/feedback/all")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch feedbacks");
        }
        return res.json();
      })
      .then((data) => setFeedbacks(data))
      .catch((err) => console.error("Error fetching feedbacks:", err));
  }, []);

  return (
    <div className="feedback-container">
      <h1 className="feedback-title">📩 Passenger Feedback</h1>
      <p className="feedback-subtitle">View all feedbacks submitted by Passengers.</p>

      <div className="feedback-table-container">
        <table className="feedback-table">
          <thead>
            <tr>
              <th>Feedback ID</th>
              <th>UserName</th>
              <th>Subject</th>
              <th>Description</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.length > 0 ? (
              feedbacks.map((fb) => (
                <tr key={fb.id}>
                  {/* ✅ Field names match backend model */}
                  <td>{fb.id}</td>
                  <td>{fb.username}</td>
                  <td>{fb.subject}</td>
                  <td>{fb.description}</td>
                  <td>{new Date(fb.submittedAt).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-data">
                  No feedbacks found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <button className="back-btn" onClick={() => navigate("/admin/dashboard")}>
        ⬅ Back to Dashboard
      </button>
    </div>
  );
}

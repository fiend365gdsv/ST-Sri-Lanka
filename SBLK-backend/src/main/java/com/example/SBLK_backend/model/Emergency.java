package com.example.SBLK_backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "emergencies")
public class Emergency {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String busNumber;
    private String message;
    private LocalDateTime timestamp;
    private String reportedBy; // staff username

    // Constructors
    public Emergency() {}
    public Emergency(String busNumber, String message, String reportedBy) {
        this.busNumber = busNumber;
        this.message = message;
        this.reportedBy = reportedBy;
        this.timestamp = LocalDateTime.now();
    }

    // Getters & Setters
    public Long getId() { return id; }
    public String getBusNumber() { return busNumber; }
    public void setBusNumber(String busNumber) { this.busNumber = busNumber; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
    public String getReportedBy() { return reportedBy; }
    public void setReportedBy(String reportedBy) { this.reportedBy = reportedBy; }
}

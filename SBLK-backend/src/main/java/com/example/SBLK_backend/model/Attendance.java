package com.example.SBLK_backend.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "attendances", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"staff_id", "date"})
})
public class Attendance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // store staff id foreign key
    @Column(name = "staff_id", nullable = false)
    private Long staffId;

    @Column(name = "staff_name", nullable = false)
    private String staffName;

    @Column(name = "staff_email", nullable = false)
    private String staffEmail;

    @Column(name = "staff_mobile", nullable = false)
    private String staffMobile;

    // separate date for quick unique-per-day check
    @Column(name = "date", nullable = false)
    private LocalDate date;

    // full timestamp
    @Column(name = "marked_at", nullable = false)
    private LocalDateTime markedAt;

    public Attendance() {}

    public Attendance(Long staffId, String staffName, String staffEmail, String staffMobile, LocalDate date, LocalDateTime markedAt) {
        this.staffId = staffId;
        this.staffName = staffName;
        this.staffEmail = staffEmail;
        this.staffMobile = staffMobile;
        this.date = date;
        this.markedAt = markedAt;
    }

    // --- getters & setters ---
    public Long getId() { return id; }
    public Long getStaffId() { return staffId; }
    public void setStaffId(Long staffId) { this.staffId = staffId; }
    public String getStaffName() { return staffName; }
    public void setStaffName(String staffName) { this.staffName = staffName; }
    public String getStaffEmail() { return staffEmail; }
    public void setStaffEmail(String staffEmail) { this.staffEmail = staffEmail; }
    public String getStaffMobile() { return staffMobile; }
    public void setStaffMobile(String staffMobile) { this.staffMobile = staffMobile; }
    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }
    public LocalDateTime getMarkedAt() { return markedAt; }
    public void setMarkedAt(LocalDateTime markedAt) { this.markedAt = markedAt; }
}

package com.example.SBLK_backend.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "attendance", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"staff_email", "attendance_date"})
})
public class Attendance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String staffName;
    private String staffMobile;
    private String staffEmail;
    private LocalDate attendanceDate;
    private LocalTime attendanceTime;

    public Attendance() {}

    public Attendance(String staffName, String staffMobile, String staffEmail,
                      LocalDate attendanceDate, LocalTime attendanceTime) {
        this.staffName = staffName;
        this.staffMobile = staffMobile;
        this.staffEmail = staffEmail;
        this.attendanceDate = attendanceDate;
        this.attendanceTime = attendanceTime;
    }

    // Getters and Setters
    public Long getId() { return id; }

    public String getStaffName() { return staffName; }
    public void setStaffName(String staffName) { this.staffName = staffName; }

    public String getStaffMobile() { return staffMobile; }
    public void setStaffMobile(String staffMobile) { this.staffMobile = staffMobile; }

    public String getStaffEmail() { return staffEmail; }
    public void setStaffEmail(String staffEmail) { this.staffEmail = staffEmail; }

    public LocalDate getAttendanceDate() { return attendanceDate; }
    public void setAttendanceDate(LocalDate attendanceDate) { this.attendanceDate = attendanceDate; }

    public LocalTime getAttendanceTime() { return attendanceTime; }
    public void setAttendanceTime(LocalTime attendanceTime) { this.attendanceTime = attendanceTime; }
}

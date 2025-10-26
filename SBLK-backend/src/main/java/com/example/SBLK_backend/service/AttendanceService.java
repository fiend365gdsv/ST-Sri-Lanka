package com.example.SBLK_backend.service;

import com.example.SBLK_backend.model.Attendance;
import com.example.SBLK_backend.model.Staff;
import com.example.SBLK_backend.repository.AttendanceRepository;
import com.example.SBLK_backend.repository.StaffRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final StaffRepository staffRepository;

    public AttendanceService(AttendanceRepository attendanceRepository, StaffRepository staffRepository) {
        this.attendanceRepository = attendanceRepository;
        this.staffRepository = staffRepository;
    }

    @Transactional
    public Attendance markAttendanceForUsername(String username) {
        Staff staff = staffRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("Staff not found for username: " + username));

        Long staffId = staff.getId();
        LocalDate today = LocalDate.now();

        if (attendanceRepository.existsByStaffIdAndDate(staffId, today)) {
            throw new IllegalStateException("Attendance already marked for today.");
        }

        String fullName = (staff.getFirstName() != null ? staff.getFirstName() : "") +
                (staff.getLastName() != null ? " " + staff.getLastName() : "");

        Attendance attendance = new Attendance(
                staffId,
                fullName.trim(),
                staff.getEmail(),
                staff.getMobileNumber(),
                today,
                LocalDateTime.now()
        );

        return attendanceRepository.save(attendance);
    }
}

package com.example.SBLK_backend.service;

import com.example.SBLK_backend.model.Attendance;
import com.example.SBLK_backend.repository.AttendanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Optional;

@Service
public class AttendanceService {

    @Autowired
    private AttendanceRepository attendanceRepository;

    public String markAttendance(String name, String mobile, String email) {
        LocalDate today = LocalDate.now();

        Optional<Attendance> existing = attendanceRepository.findByStaffEmailAndAttendanceDate(email, today);
        if (existing.isPresent()) {
            return "Attendance already marked for today";
        }

        Attendance attendance = new Attendance(
                name,
                mobile,
                email,
                today,
                LocalTime.now()
        );

        attendanceRepository.save(attendance);
        return "Attendance marked successfully";
    }
}

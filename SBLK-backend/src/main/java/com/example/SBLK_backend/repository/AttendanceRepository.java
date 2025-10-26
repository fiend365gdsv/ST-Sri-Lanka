package com.example.SBLK_backend.repository;

import com.example.SBLK_backend.model.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    Optional<Attendance> findByStaffEmailAndAttendanceDate(String staffEmail, LocalDate attendanceDate);
}

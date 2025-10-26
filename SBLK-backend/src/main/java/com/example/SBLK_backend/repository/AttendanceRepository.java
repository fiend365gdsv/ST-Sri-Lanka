package com.example.SBLK_backend.repository;

import com.example.SBLK_backend.model.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    boolean existsByStaffIdAndDate(Long staffId, LocalDate date);
}

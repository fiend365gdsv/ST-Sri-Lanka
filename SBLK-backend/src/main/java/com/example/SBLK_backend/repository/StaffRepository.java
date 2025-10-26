package com.example.SBLK_backend.repository;

import com.example.SBLK_backend.model.Staff;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StaffRepository extends JpaRepository<Staff, Long> {
    boolean existsByEmail(String email);
    boolean existsByUsername(String username);
    Optional<Staff> findByEmail(String email);
    Optional<Staff> findByUsername(String username);



}

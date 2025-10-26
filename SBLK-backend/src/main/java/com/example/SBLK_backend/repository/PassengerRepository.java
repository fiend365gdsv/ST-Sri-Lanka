package com.example.SBLK_backend.repository;

import com.example.SBLK_backend.model.Passenger;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PassengerRepository extends JpaRepository<Passenger, Long> {
    Optional<Passenger> findByUsername(String username);
    Optional<Passenger> findByEmail(String email);
}

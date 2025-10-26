package com.example.SBLK_backend.repository;

import com.example.SBLK_backend.model.PassengerDeviceToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PassengerDeviceTokenRepository extends JpaRepository<PassengerDeviceToken, Long> {
    Optional<PassengerDeviceToken> findByDeviceToken(String token);
}

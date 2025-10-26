package com.example.SBLK_backend.service;

import com.example.SBLK_backend.dto.LoginRequestDto;
import com.example.SBLK_backend.dto.LoginResponseDto;
import com.example.SBLK_backend.model.Passenger;
import com.example.SBLK_backend.model.Staff;
import com.example.SBLK_backend.repository.PassengerRepository;
import com.example.SBLK_backend.repository.StaffRepository;
import com.example.SBLK_backend.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private PassengerRepository passengerRepository;

    @Autowired
    private StaffRepository staffRepository;

    @Autowired
    private JwtUtil jwtUtil;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public LoginResponseDto login(LoginRequestDto request) {

        // 🔹 Check Passenger Login
        Passenger passenger = passengerRepository.findByUsername(request.getUsername()).orElse(null);
        if (passenger != null) {
            if (passwordEncoder.matches(request.getPassword(), passenger.getPassword())) {
                String token = jwtUtil.generateToken(passenger.getUsername(), "PASSENGER");
                return LoginResponseDto.builder()
                        .message("Passenger login successful!")
                        .role("PASSENGER")
                        .redirectUrl("/passenger/dashboard")
                        .token(token)
                        .build();
            } else {
                throw new RuntimeException("Invalid password for passenger account!");
            }
        }

        // 🔹 Check Staff Login
        Staff staff = staffRepository.findByUsername(request.getUsername()).orElse(null);
        if (staff != null) {
            if (passwordEncoder.matches(request.getPassword(), staff.getPassword())) {
                String role = staff.getRole().toUpperCase();

                String redirectUrl;
                switch (role) {
                    case "ADMIN":
                    case "OFFICER":
                        redirectUrl = "/admin/dashboard";
                        break;
                    case "DRIVER":
                    case "CONDUCTOR":
                        redirectUrl = "/staff/dashboard";
                        break;
                    default:
                        redirectUrl = "/unknown";
                }

                String token = jwtUtil.generateToken(staff.getUsername(), role);

                return LoginResponseDto.builder()
                        .message(role + " login successful!")
                        .role(role)
                        .redirectUrl(redirectUrl)
                        .token(token)
                        .build();
            } else {
                throw new RuntimeException("Invalid password for staff account!");
            }
        }

        throw new RuntimeException("No account found with that username!");
    }
}

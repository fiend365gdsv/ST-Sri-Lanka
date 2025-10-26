package com.example.SBLK_backend.service;

import com.example.SBLK_backend.dto.PassengerRegisterDto;
import com.example.SBLK_backend.model.Passenger;
import com.example.SBLK_backend.repository.PassengerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class PassengerRegisterService {

    @Autowired
    private PassengerRepository passengerRepository;

    @Autowired
    private JavaMailSender mailSender;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public String registerPassenger(PassengerRegisterDto dto) {

        if (!dto.getPassword().equals(dto.getRetypePassword())) {
            throw new RuntimeException("Passwords do not match!");
        }

        if (passengerRepository.findByUsername(dto.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists!");
        }

        if (passengerRepository.findByEmail(dto.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered!");
        }

        Passenger passenger = new Passenger();
        passenger.setFirstName(dto.getFirstName());
        passenger.setLastName(dto.getLastName());
        passenger.setMobileNumber(dto.getMobileNumber());
        passenger.setEmail(dto.getEmail());
        passenger.setAddressLine1(dto.getAddressLine1());
        passenger.setAddressLine2(dto.getAddressLine2());
        passenger.setDateOfBirth(dto.getDateOfBirth());
        passenger.setGender(dto.getGender());
        passenger.setDistrict(dto.getDistrict());
        passenger.setCity(dto.getCity());
        passenger.setUsername(dto.getUsername());
        passenger.setPassword(passwordEncoder.encode(dto.getPassword()));

        passengerRepository.save(passenger);

        // Send username & password to email
        sendEmail(dto.getEmail(), dto.getUsername(), dto.getPassword());

        return "Passenger registered successfully! Check email for credentials.";
    }

    private void sendEmail(String to, String username, String password) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Your Passenger Account Credentials");
        message.setText("Username: " + username + "\nPassword: " + password);
        mailSender.send(message);
    }
}

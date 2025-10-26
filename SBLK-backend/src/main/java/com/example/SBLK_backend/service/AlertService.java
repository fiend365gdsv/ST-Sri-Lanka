package com.example.SBLK_backend.service;

import com.example.SBLK_backend.dto.AlertRequestDto;
import com.example.SBLK_backend.model.Passenger;
import com.example.SBLK_backend.model.Staff;
import com.example.SBLK_backend.repository.PassengerRepository;
import com.example.SBLK_backend.repository.StaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AlertService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private PassengerRepository passengerRepository;

    @Autowired
    private StaffRepository staffRepository;

    public String sendAlert(AlertRequestDto alertRequest) {
        // Get all passenger and staff emails
        List<String> passengerEmails = passengerRepository.findAll()
                .stream()
                .map(Passenger::getEmail)
                .collect(Collectors.toList());

        List<String> staffEmails = staffRepository.findAll()
                .stream()
                .map(Staff::getEmail)
                .collect(Collectors.toList());

        // Merge both lists
        passengerEmails.addAll(staffEmails);

        if (passengerEmails.isEmpty()) {
            throw new RuntimeException("No recipients found in database.");
        }

        // Send email to each
        for (String email : passengerEmails) {
            sendEmail(email, alertRequest.getSubject(), alertRequest.getDescription());
        }

        return "✅ Alert sent to " + passengerEmails.size() + " recipients successfully.";
    }

    private void sendEmail(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        mailSender.send(message);
    }
}

package com.example.SBLK_backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;
    @Value("${spring.mail.username}")
    private String from;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendCredentialsEmail(String to, String username, String plainPassword) {
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(to);
        msg.setFrom(from);
        msg.setSubject("Your SmartBus account credentials");
        String body = "Hello,\n\n"
                + "Your account has been created on Smart Public Bus Management System\n\n"
                + "Username: " + username + "\n"
                + "Password: " + plainPassword + "\n\n"
                + "Please log in and also you can change your username and password.\n\n"
                + "Regards,\nSmartBus Admin";
        msg.setText(body);
        mailSender.send(msg);
    }
}

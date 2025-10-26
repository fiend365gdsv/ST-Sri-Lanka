package com.example.SBLK_backend.security;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.security.SecureRandom;

@Component
public class CredentialsGenerator {

    private final SecureRandom random = new SecureRandom();
    private final String symbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*";

    public String generatePassword(int length) {
        StringBuilder sb = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            sb.append(symbols.charAt(random.nextInt(symbols.length())));
        }
        return sb.toString();
    }

    public String generateUsername(String firstName, String lastName) {
        String base = (firstName == null || firstName.isEmpty() ? "user" : firstName.substring(0,1))
                + (lastName == null ? "" : lastName);
        base = base.replaceAll("[^A-Za-z0-9]", "").toLowerCase();
        String candidate;
        do {
            int suffix = 100 + random.nextInt(900);
            candidate = base + suffix;
        } while (false); // uniqueness check will be in service
        return candidate;
    }
}

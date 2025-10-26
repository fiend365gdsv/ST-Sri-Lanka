package com.example.SBLK_backend.controller;

import com.example.SBLK_backend.security.JwtUtil;
import com.example.SBLK_backend.model.Attendance;
import com.example.SBLK_backend.service.AttendanceService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/staff")
public class AttendanceController {

    private final AttendanceService attendanceService;
    private final JwtUtil jwtUtil;

    public AttendanceController(AttendanceService attendanceService, JwtUtil jwtUtil) {
        this.attendanceService = attendanceService;
        this.jwtUtil = jwtUtil;
    }

    private String extractTokenFromHeader(String header) {
        if (header == null || !header.startsWith("Bearer ")) {
            return null;
        }
        return header.substring(7);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/mark-attendance")
    public ResponseEntity<?> markAttendance(@RequestHeader(name = "Authorization", required = false) String authHeader) {
        try {
            String token = extractTokenFromHeader(authHeader);
            if (token == null || !jwtUtil.validateToken(token)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or missing token");
            }

            String username = jwtUtil.extractUsername(token);

            Attendance saved = attendanceService.markAttendanceForUsername(username);

            return ResponseEntity.ok("Attendance marked at " + saved.getMarkedAt().toString());
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        } catch (IllegalStateException ex) {
            // already marked for today
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        } catch (Exception ex) {
            ex.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to mark attendance");
        }
    }
}

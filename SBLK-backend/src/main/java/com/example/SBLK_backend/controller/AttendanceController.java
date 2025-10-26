package com.example.SBLK_backend.controller;

import com.example.SBLK_backend.model.Staff;
import com.example.SBLK_backend.security.JwtUtil;
import com.example.SBLK_backend.service.AttendanceService;
import com.example.SBLK_backend.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/staff")
@CrossOrigin(origins = "http://localhost:3000")
public class AttendanceController {

    @Autowired
    private AttendanceService attendanceService;

    @Autowired
    private StaffService staffService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/mark-attendance")
    public ResponseEntity<?> markAttendance(@RequestHeader("Authorization") String token) {
        try {
            if (token.startsWith("Bearer ")) {
                token = token.substring(7);
            }

            if (!jwtUtil.validateToken(token)) {
                return ResponseEntity.status(401).body("Invalid or expired token");
            }

            String username = jwtUtil.extractUsername(token);
            Staff staff = staffService.getStaffByUsername(username);

            if (staff == null) {
                return ResponseEntity.status(404).body("Staff not found");
            }

            String result = attendanceService.markAttendance(
                    staff.getFirstName() + " " + staff.getLastName(),
                    staff.getMobileNumber(),
                    staff.getEmail()
            );

            return ResponseEntity.ok(result);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Error marking attendance");
        }
    }
}

package com.example.SBLK_backend.controller;

import com.example.SBLK_backend.dto.*;
import com.example.SBLK_backend.model.Staff;
import com.example.SBLK_backend.service.StaffService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/staff")
@CrossOrigin(origins = "*")
public class StaffController {

    private final StaffService staffService;
    private final ObjectMapper mapper = new ObjectMapper();

    public StaffController(StaffService staffService) {
        this.staffService = staffService;
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteStaff(@PathVariable Long id) {
        try {
            String result = staffService.deleteStaff(id);
            return ResponseEntity.ok(Map.of("message", result));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", ex.getMessage()));
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateStaff(@PathVariable Long id, @RequestBody Staff updatedData) {
        try {
            Staff updated = staffService.updateStaff(id, updatedData);
            return ResponseEntity.ok(updated);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", ex.getMessage()));
        }
    }
    @GetMapping("/profile/{username}")
    public ResponseEntity<?> getStaffProfile(@PathVariable String username) {
        try {
            Staff staff = staffService.getStaffByUsername(username);
            if (staff == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Staff not found"));
            }
            return ResponseEntity.ok(staff);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", ex.getMessage()));
        }
    }


    @PostMapping("/register")
    public ResponseEntity<?> registerStaff(@RequestParam String role, @RequestBody String jsonData) {
        try {
            StaffRegisterResponseDto response;
            switch (role.toUpperCase()) {
                case "ADMIN", "OFFICER", "CONDUCTOR" -> {
                    GenericStaffRegisterRequestDto dto = mapper.readValue(jsonData, GenericStaffRegisterRequestDto.class);
                    response = staffService.registerGenericStaff(dto, role.toUpperCase());
                }
                case "DRIVER" -> {
                    DriverRegisterRequestDto dto = mapper.readValue(jsonData, DriverRegisterRequestDto.class);
                    response = staffService.registerDriver(dto);
                }
                default -> throw new IllegalArgumentException("Invalid role: " + role);
            }

            return ResponseEntity.ok(response);

        } catch (Exception ex) {
            ex.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", ex.getMessage()));
        }
    }
}

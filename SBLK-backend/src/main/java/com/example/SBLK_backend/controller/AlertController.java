package com.example.SBLK_backend.controller;

import com.example.SBLK_backend.dto.AlertRequestDto;
import com.example.SBLK_backend.service.AlertService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/alert")
@CrossOrigin(origins = "*")
public class AlertController {

    private final AlertService alertService;

    public AlertController(AlertService alertService) {
        this.alertService = alertService;
    }

    @PostMapping("/send")
    public ResponseEntity<?> sendAlert(@RequestBody AlertRequestDto alertRequest) {
        try {
            String message = alertService.sendAlert(alertRequest);
            return ResponseEntity.ok(message);
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body("❌ Error: " + ex.getMessage());
        }
    }
}

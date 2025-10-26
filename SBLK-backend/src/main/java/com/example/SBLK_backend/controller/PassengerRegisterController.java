package com.example.SBLK_backend.controller;

import com.example.SBLK_backend.dto.PassengerRegisterDto;
import com.example.SBLK_backend.service.PassengerRegisterService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/passenger/register")
@CrossOrigin(origins = "*")
public class PassengerRegisterController {

    private final PassengerRegisterService passengerRegisterService;

    public PassengerRegisterController(PassengerRegisterService passengerRegisterService) {
        this.passengerRegisterService = passengerRegisterService;
    }

    @PostMapping
    public ResponseEntity<?> register(@RequestBody PassengerRegisterDto dto) {
        try {
            String message = passengerRegisterService.registerPassenger(dto);
            return ResponseEntity.ok().body(message);
        } catch (Exception ex) {
            return ResponseEntity.status(400).body(ex.getMessage());
        }
    }
}

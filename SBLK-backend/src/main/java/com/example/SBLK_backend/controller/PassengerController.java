package com.example.SBLK_backend.controller;

import com.example.SBLK_backend.dto.*;
import com.example.SBLK_backend.service.PassengerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/passenger")
@CrossOrigin(origins = "*")
public class PassengerController {

    private final PassengerService passengerService;

    public PassengerController(PassengerService passengerService) {
        this.passengerService = passengerService;
    }

    @PostMapping("/search")
    public ResponseEntity<?> searchBuses(@RequestBody PassengerSearchRequestDto req) {
        try {
            List<BusLiveInfoDto> buses = passengerService.searchBuses(req);
            return ResponseEntity.ok(buses);
        } catch (Exception ex) {
            ex.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("error", ex.getMessage()));
        }
    }

    @PostMapping("/device/register")
    public ResponseEntity<?> registerDevice(@RequestBody DeviceTokenRequestDto req) {
        try {
            passengerService.saveDeviceToken(req.getPassengerId(), req.getDeviceToken());
            return ResponseEntity.ok(Map.of("message", "token saved"));
        } catch (Exception ex) {
            ex.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("error", ex.getMessage()));
        }
    }

    @PostMapping("/check-and-notify")
    public ResponseEntity<?> checkAndNotify(@RequestBody Map<String,Object> body) {
        try {
            String from = (String) body.get("fromLocation");
            String to = (String) body.get("toLocation");
            Double lat = body.get("passengerLat") == null ? null : Double.valueOf(body.get("passengerLat").toString());
            Double lng = body.get("passengerLng") == null ? null : Double.valueOf(body.get("passengerLng").toString());
            Double threshold = body.get("thresholdMeters") == null ? 1000.0 : Double.valueOf(body.get("thresholdMeters").toString());

            if (lat == null || lng == null) return ResponseEntity.badRequest().body(Map.of("error","passengerLat and passengerLng required"));

            PassengerSearchRequestDto req = new PassengerSearchRequestDto();
            req.setFromLocation(from);
            req.setToLocation(to);
            req.setPassengerLat(lat);
            req.setPassengerLng(lng);

            List<BusLiveInfoDto> buses = passengerService.searchBuses(req);
            passengerService.checkAndNotifyNearby(buses, lat, lng, threshold, "Bus nearing", "A bus is approaching your location.");
            return ResponseEntity.ok(Map.of("message","checked and notifications sent if any"));
        } catch (Exception ex) {
            ex.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("error", ex.getMessage()));
        }
    }

    @GetMapping("/profile/{username}")
    public ResponseEntity<?> getPassengerProfile(@PathVariable String username) {
        try {
            var passenger = passengerService.getPassengerByUsername(username);
            if (passenger == null) {
                return ResponseEntity.status(404).body(Map.of("error", "Passenger not found"));
            }
            return ResponseEntity.ok(passenger);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }

}

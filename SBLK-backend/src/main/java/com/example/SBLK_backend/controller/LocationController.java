package com.example.SBLK_backend.controller;

import com.example.SBLK_backend.model.Location;
import com.example.SBLK_backend.service.LocationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/location")
@CrossOrigin(origins = "*")
public class LocationController {

    private final LocationService locationService;

    public LocationController(LocationService locationService) {
        this.locationService = locationService;
    }

    @PostMapping("/update")
    public ResponseEntity<?> updateLocation(@RequestParam String busNumber,
                                            @RequestParam double latitude,
                                            @RequestParam double longitude) {
        Location location = locationService.updateLocation(busNumber, latitude, longitude);
        return ResponseEntity.ok(location);
    }

    @GetMapping("/{busNumber}")
    public ResponseEntity<?> getLatestLocation(@PathVariable String busNumber) {
        return locationService.getLatestLocation(busNumber)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}

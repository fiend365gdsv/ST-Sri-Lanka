package com.example.SBLK_backend.controller;

import com.example.SBLK_backend.model.Location;
import com.example.SBLK_backend.service.LocationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/location")
@CrossOrigin(origins = "*")
public class BusLocationController {

    private final LocationService locationService;

    public BusLocationController(LocationService locationService) {
        this.locationService = locationService;
    }

    // ✅ Update live location
    @PostMapping("/update")
    public ResponseEntity<String> updateLocation(
            @RequestParam String busNumber,
            @RequestParam double latitude,
            @RequestParam double longitude
    ) {
        locationService.updateLocation(busNumber, latitude, longitude);
        return ResponseEntity.ok("Location updated");
    }

    // ✅ Get current bus location + route
    @GetMapping("/{busNumber}")
    public ResponseEntity<?> getBusLocation(@PathVariable String busNumber) {
        return locationService.getLatestLocation(busNumber)
                .map(location -> ResponseEntity.ok(Map.of(
                        "busNumber", location.getBusNumber(),
                        "latitude", location.getLatitude(),
                        "longitude", location.getLongitude(),
                        "fromLocation", location.getFromLocation(),
                        "destination", location.getDestination(),
                        "updatedAt", location.getUpdatedAt()
                )))
                .orElse(ResponseEntity.notFound().build());
    }
    @PostMapping("/stop")
    public ResponseEntity<String> stopGPS(@RequestParam String busNumber) {
        locationService.stopTracking(busNumber);
        return ResponseEntity.ok("GPS tracking stopped for bus " + busNumber);
    }
    // Get all buses currently tracking GPS
    @GetMapping("/active")
    public ResponseEntity<?> getAllActiveBuses() {
        return ResponseEntity.ok(locationService.getAllActiveBuses());
    }


}

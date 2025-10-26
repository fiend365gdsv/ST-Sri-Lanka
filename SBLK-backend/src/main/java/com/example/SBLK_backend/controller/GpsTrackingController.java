package com.example.SBLK_backend.controller;

import com.example.SBLK_backend.model.BusLocation;
import com.example.SBLK_backend.service.FirebaseTrackingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/gps")
@CrossOrigin(origins = "*")
public class GpsTrackingController {

    @Autowired
    private FirebaseTrackingService trackingService;

    @PostMapping("/start")
    public String startGps(@RequestBody BusLocation location) {
        trackingService.startGpsSharing(location.getBusNumber(), location);
        return "GPS sharing started for bus: " + location.getBusNumber();
    }

    @PostMapping("/update")
    public String updateLocation(@RequestParam String busNumber,
                                 @RequestParam double latitude,
                                 @RequestParam double longitude) {
        trackingService.updateGpsLocation(busNumber, latitude, longitude);
        return "Location updated for bus: " + busNumber;
    }

    @PostMapping("/stop/{busNumber}")
    public String stopGps(@PathVariable String busNumber) {
        trackingService.stopGpsSharing(busNumber);
        return "GPS sharing stopped for bus: " + busNumber;
    }
}

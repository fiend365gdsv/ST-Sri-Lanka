package com.example.SBLK_backend.service;

import com.example.SBLK_backend.model.Depot;
import com.example.SBLK_backend.model.Location;
import com.example.SBLK_backend.repository.DepotRepository;
import com.example.SBLK_backend.repository.LocationRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

import java.util.List;

@Service
public class LocationService {

    private final LocationRepository locationRepository;
    private final DepotRepository depotRepository;

    public LocationService(LocationRepository locationRepository, DepotRepository depotRepository) {
        this.locationRepository = locationRepository;
        this.depotRepository = depotRepository;
    }
    public List<Location> getAllActiveBuses() {
        return locationRepository.findAll().stream()
                .filter(Location::isTrackingActive)
                .toList();
    }

    public Location updateLocation(String busNumber, double latitude, double longitude) {
        Location location = new Location();
        location.setBusNumber(busNumber);
        location.setLatitude(latitude);
        location.setLongitude(longitude);
        location.setUpdatedAt(LocalDateTime.now());

        // get route info from Depot table
        depotRepository.findByBusNumber(busNumber).ifPresent(depot -> {
            location.setFromLocation(depot.getFromLocation());
            location.setDestination(depot.getDestination());
        });

        return locationRepository.save(location);
    }

    public Optional<Location> getLatestLocation(String busNumber) {
        return locationRepository.findTopByBusNumberOrderByUpdatedAtDesc(busNumber);
    }
    public void stopTracking(String busNumber) {
        locationRepository.findTopByBusNumberOrderByUpdatedAtDesc(busNumber)
                .ifPresent(location -> {
                    location.setTrackingActive(false);
                    locationRepository.save(location);
                });
    }

}

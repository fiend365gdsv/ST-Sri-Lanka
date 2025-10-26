package com.example.SBLK_backend.service;

import com.example.SBLK_backend.model.BusLocation;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class BusLocationService {

    private final Map<String, BusLocation> busLocations = new ConcurrentHashMap<>();

    public void registerBus(String busNumber, String route, String[] stops) {
        busLocations.put(busNumber, new BusLocation(busNumber, route, stops));
    }

    public void updateLocation(String busNumber, double latitude, double longitude) {
        BusLocation bus = busLocations.get(busNumber);
        if (bus != null) {
            bus.setLatitude(latitude);
            bus.setLongitude(longitude);
        }
    }

    public BusLocation getBusLocation(String busNumber) {
        return busLocations.get(busNumber);
    }

    public void moveToNextStop(String busNumber) {
        BusLocation bus = busLocations.get(busNumber);
        if (bus != null) {
            bus.moveToNextStop();
        }
    }
}

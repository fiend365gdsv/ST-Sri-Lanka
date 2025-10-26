package com.example.SBLK_backend.service;

import com.example.SBLK_backend.model.BusLocation;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import org.springframework.stereotype.Service;

@Service
public class FirebaseTrackingService {

    private final DatabaseReference locationRef =
            FirebaseDatabase.getInstance().getReference("bus_locations");

    public void startGpsSharing(String busNumber, BusLocation location) {
        location.setActive(true);
        locationRef.child(busNumber).setValueAsync(location);
    }

    public void updateGpsLocation(String busNumber, double lat, double lng) {
        locationRef.child(busNumber).child("latitude").setValueAsync(lat);
        locationRef.child(busNumber).child("longitude").setValueAsync(lng);
    }

    public void stopGpsSharing(String busNumber) {
        locationRef.child(busNumber).child("active").setValueAsync(false);
    }
}

package com.example.SBLK_backend.service;

import com.example.SBLK_backend.dto.BusLiveInfoDto;
import com.example.SBLK_backend.dto.PassengerSearchRequestDto;
import com.example.SBLK_backend.model.Depot;
import com.example.SBLK_backend.model.PassengerDeviceToken;
import com.example.SBLK_backend.repository.DepotRepository;
import com.example.SBLK_backend.repository.PassengerDeviceTokenRepository;
import com.example.SBLK_backend.util.GeoUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PassengerService {

    private final DepotRepository depotRepository;
    private final FirebaseRealtimeService firebaseRealtimeService;
    private final PassengerDeviceTokenRepository tokenRepo;
    private static final double DEFAULT_SPEED_KMH = 40.0;

    public PassengerService(DepotRepository depotRepository,
                            FirebaseRealtimeService firebaseRealtimeService,
                            PassengerDeviceTokenRepository tokenRepo) {
        this.depotRepository = depotRepository;
        this.firebaseRealtimeService = firebaseRealtimeService;
        this.tokenRepo = tokenRepo;
    }

    public List<BusLiveInfoDto> searchBuses(PassengerSearchRequestDto req) {
        String from = req.getFromLocation();
        String to = req.getToLocation();

        List<Depot> all = depotRepository.findAll();
        List<Depot> matched = new ArrayList<>();
        for (Depot d : all) {
            boolean matches = false;
            if (from != null && to != null) {
                if (from.equalsIgnoreCase(d.getFromLocation()) && to.equalsIgnoreCase(d.getDestination())) matches = true;
            }
            if (!matches && d.getRoute() != null && from != null && to != null) {
                String routeLower = d.getRoute().toLowerCase();
                if (routeLower.contains(from.toLowerCase()) && routeLower.contains(to.toLowerCase())) matches = true;
            }
            if (matches) matched.add(d);
        }

        List<BusLiveInfoDto> result = new ArrayList<>();
        for (Depot d : matched) {
            String busNumber = d.getBusNumber();
            Double[] loc = firebaseRealtimeService.getLiveLocationForBus(busNumber);
            BusLiveInfoDto info = new BusLiveInfoDto();
            info.setDepotName(d.getDepotName());
            info.setBusNumber(busNumber);
            info.setRoute(d.getRoute());
            if (loc != null && loc[0] != null && loc[1] != null) {
                info.setLatitude(loc[0]);
                info.setLongitude(loc[1]);
                if (req.getPassengerLat() != null && req.getPassengerLng() != null) {
                    double distanceMeters = GeoUtil.haversineMeters(req.getPassengerLat(), req.getPassengerLng(), loc[0], loc[1]);
                    info.setDistanceMeters(distanceMeters);
                    info.setEtaSeconds(GeoUtil.estimateSeconds(distanceMeters, DEFAULT_SPEED_KMH));
                }
            }
            result.add(info);
        }
        return result;
    }

    public void saveDeviceToken(Long passengerId, String token) {
        Optional<PassengerDeviceToken> existing = tokenRepo.findByDeviceToken(token);
        if (existing.isEmpty()) {
            PassengerDeviceToken ent = new PassengerDeviceToken();
            ent.setPassengerId(passengerId);
            ent.setDeviceToken(token);
            tokenRepo.save(ent);
        } else {
            existing.ifPresent(e -> {
                if (passengerId != null && !passengerId.equals(e.getPassengerId())) {
                    e.setPassengerId(passengerId);
                    tokenRepo.save(e);
                }
            });
        }
    }

    public void checkAndNotifyNearby(List<BusLiveInfoDto> buses, double passengerLat, double passengerLng, double thresholdMeters, String title, String body) {
        for (BusLiveInfoDto b : buses) {
            if (b.getLatitude() == null || b.getLongitude() == null) continue;
            double dist = GeoUtil.haversineMeters(passengerLat, passengerLng, b.getLatitude(), b.getLongitude());
            if (dist <= thresholdMeters) {
                tokenRepo.findAll().forEach(tokenEntity -> {
                    firebaseRealtimeService.sendPushToToken(tokenEntity.getDeviceToken(), title, body + " Bus " + b.getBusNumber() + " is " + Math.round(dist) + "m away.");
                });
            }
        }
    }

    @Autowired
    private com.example.SBLK_backend.repository.PassengerRepository passengerRepository;

    public com.example.SBLK_backend.model.Passenger getPassengerByUsername(String username) {
        return passengerRepository.findByUsername(username).orElse(null);
    }

}

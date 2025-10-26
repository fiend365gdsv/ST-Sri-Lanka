package com.example.SBLK_backend.util;

public class GeoUtil {
    public static double haversineMeters(double lat1, double lon1, double lat2, double lon2) {
        int R = 6371000;
        double dLat = Math.toRadians(lat2 - lat1);
        double dLon = Math.toRadians(lon2 - lon1);
        double a = Math.sin(dLat/2) * Math.sin(dLat/2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(dLon/2) * Math.sin(dLon/2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    }

    public static long estimateSeconds(double distanceMeters, double speedKmH) {
        if (distanceMeters < 0) return -1;
        double speed = speedKmH <= 0 ? 40.0 : speedKmH;
        double hours = (distanceMeters/1000.0) / speed;
        return (long)(hours * 3600);
    }
}

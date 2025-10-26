package com.example.SBLK_backend.model;

public class BusLocation {
    private String busNumber;
    private double latitude;
    private double longitude;
    private String route; // e.g., "Colombo → Kandy"
    private int nextStopIndex = 0; // index of next stop in route
    private String[] stops; // ordered list of stops

    public BusLocation() {}

    public BusLocation(String busNumber, String route, String[] stops) {
        this.busNumber = busNumber;
        this.route = route;
        this.stops = stops;
    }

    public String getBusNumber() { return busNumber; }
    public void setBusNumber(String busNumber) { this.busNumber = busNumber; }

    public double getLatitude() { return latitude; }
    public void setLatitude(double latitude) { this.latitude = latitude; }

    public double getLongitude() { return longitude; }
    public void setLongitude(double longitude) { this.longitude = longitude; }

    public String getRoute() { return route; }
    public void setRoute(String route) { this.route = route; }

    public int getNextStopIndex() { return nextStopIndex; }
    public void setNextStopIndex(int nextStopIndex) { this.nextStopIndex = nextStopIndex; }

    public String[] getStops() { return stops; }
    public void setStops(String[] stops) { this.stops = stops; }

    public String getNextStop() {
        if (stops != null && nextStopIndex < stops.length) return stops[nextStopIndex];
        return null;
    }

    public void moveToNextStop() {
        if (stops != null && nextStopIndex < stops.length - 1) nextStopIndex++;
    }
}

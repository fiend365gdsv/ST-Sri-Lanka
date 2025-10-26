package com.example.SBLK_backend.dto;

public class BusLiveInfoDto {
    private String depotName;
    private String busNumber;
    private String route;
    private Double latitude;
    private Double longitude;
    private Double distanceMeters;
    private Long etaSeconds;

    public String getDepotName() { return depotName; }
    public void setDepotName(String depotName) { this.depotName = depotName; }
    public String getBusNumber() { return busNumber; }
    public void setBusNumber(String busNumber) { this.busNumber = busNumber; }
    public String getRoute() { return route; }
    public void setRoute(String route) { this.route = route; }
    public Double getLatitude() { return latitude; }
    public void setLatitude(Double latitude) { this.latitude = latitude; }
    public Double getLongitude() { return longitude; }
    public void setLongitude(Double longitude) { this.longitude = longitude; }
    public Double getDistanceMeters() { return distanceMeters; }
    public void setDistanceMeters(Double distanceMeters) { this.distanceMeters = distanceMeters; }
    public Long getEtaSeconds() { return etaSeconds; }
    public void setEtaSeconds(Long etaSeconds) { this.etaSeconds = etaSeconds; }
}

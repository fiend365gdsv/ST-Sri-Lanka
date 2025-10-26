package com.example.SBLK_backend.dto;

import java.time.LocalDateTime;

public class DepotResponseDto {
    private Long id;
    private String depotName;
    private String busNumber;
    private String route;
    private String fromLocation;
    private String destination;
    private LocalDateTime createdAt;

    // getters & setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getDepotName() { return depotName; }
    public void setDepotName(String depotName) { this.depotName = depotName; }

    public String getBusNumber() { return busNumber; }
    public void setBusNumber(String busNumber) { this.busNumber = busNumber; }

    public String getRoute() { return route; }
    public void setRoute(String route) { this.route = route; }

    public String getFromLocation() { return fromLocation; }
    public void setFromLocation(String fromLocation) { this.fromLocation = fromLocation; }

    public String getDestination() { return destination; }
    public void setDestination(String destination) { this.destination = destination; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}

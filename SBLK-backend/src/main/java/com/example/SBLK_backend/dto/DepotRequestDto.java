package com.example.SBLK_backend.dto;

import jakarta.validation.constraints.NotBlank;

public class DepotRequestDto {

    @NotBlank(message = "Depot name is required")
    private String depotName;

    private String busNumber;
    private String route;
    private String fromLocation;
    private String destination;

    // getters & setters
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
}

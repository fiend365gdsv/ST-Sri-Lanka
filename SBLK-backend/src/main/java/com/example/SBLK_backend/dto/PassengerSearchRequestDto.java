package com.example.SBLK_backend.dto;

public class PassengerSearchRequestDto {
    private String fromLocation;
    private String toLocation;
    private Double passengerLat; // optional
    private Double passengerLng; // optional

    public String getFromLocation() { return fromLocation; }
    public void setFromLocation(String fromLocation) { this.fromLocation = fromLocation; }
    public String getToLocation() { return toLocation; }
    public void setToLocation(String toLocation) { this.toLocation = toLocation; }
    public Double getPassengerLat() { return passengerLat; }
    public void setPassengerLat(Double passengerLat) { this.passengerLat = passengerLat; }
    public Double getPassengerLng() { return passengerLng; }
    public void setPassengerLng(Double passengerLng) { this.passengerLng = passengerLng; }
}

package com.example.SBLK_backend.dto;

public class DeviceTokenRequestDto {
    private Long passengerId; // optional
    private String deviceToken;

    public Long getPassengerId() { return passengerId; }
    public void setPassengerId(Long passengerId) { this.passengerId = passengerId; }
    public String getDeviceToken() { return deviceToken; }
    public void setDeviceToken(String deviceToken) { this.deviceToken = deviceToken; }
}

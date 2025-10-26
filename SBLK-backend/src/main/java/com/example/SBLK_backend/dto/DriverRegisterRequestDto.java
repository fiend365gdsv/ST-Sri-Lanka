package com.example.SBLK_backend.dto;

public class DriverRegisterRequestDto extends StaffBaseRequestDto {
    private String driverLicenseNumber;
    private String driverLicenseExpiryDate;

    public String getDriverLicenseNumber() { return driverLicenseNumber; }
    public void setDriverLicenseNumber(String driverLicenseNumber) { this.driverLicenseNumber = driverLicenseNumber; }

    public String getDriverLicenseExpiryDate() { return driverLicenseExpiryDate; }
    public void setDriverLicenseExpiryDate(String driverLicenseExpiryDate) { this.driverLicenseExpiryDate = driverLicenseExpiryDate; }
}
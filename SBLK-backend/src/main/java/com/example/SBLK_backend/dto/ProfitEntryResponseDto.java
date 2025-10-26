package com.example.SBLK_backend.dto;

import java.time.LocalDate;

public class ProfitEntryResponseDto {
    private Long id;
    private LocalDate date;
    private String depotName;
    private String busNumber;
    private double totalCollection;
    private double fuelExpenses;
    private double otherExpenses;
    private double profit;

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public String getDepotName() { return depotName; }
    public void setDepotName(String depotName) { this.depotName = depotName; }

    public String getBusNumber() { return busNumber; }
    public void setBusNumber(String busNumber) { this.busNumber = busNumber; }

    public double getTotalCollection() { return totalCollection; }
    public void setTotalCollection(double totalCollection) { this.totalCollection = totalCollection; }

    public double getFuelExpenses() { return fuelExpenses; }
    public void setFuelExpenses(double fuelExpenses) { this.fuelExpenses = fuelExpenses; }

    public double getOtherExpenses() { return otherExpenses; }
    public void setOtherExpenses(double otherExpenses) { this.otherExpenses = otherExpenses; }

    public double getProfit() { return profit; }
    public void setProfit(double profit) { this.profit = profit; }
}

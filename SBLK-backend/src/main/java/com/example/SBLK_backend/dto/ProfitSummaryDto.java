package com.example.SBLK_backend.dto;

public class ProfitSummaryDto {
    private String busNumber;
    private double dailyProfit;
    private double monthlyProfit;
    private double annualProfit;
    private double totalExpenses;

    // Getters & Setters
    public String getBusNumber() { return busNumber; }
    public void setBusNumber(String busNumber) { this.busNumber = busNumber; }

    public double getDailyProfit() { return dailyProfit; }
    public void setDailyProfit(double dailyProfit) { this.dailyProfit = dailyProfit; }

    public double getMonthlyProfit() { return monthlyProfit; }
    public void setMonthlyProfit(double monthlyProfit) { this.monthlyProfit = monthlyProfit; }

    public double getAnnualProfit() { return annualProfit; }
    public void setAnnualProfit(double annualProfit) { this.annualProfit = annualProfit; }

    public double getTotalExpenses() { return totalExpenses; }
    public void setTotalExpenses(double totalExpenses) { this.totalExpenses = totalExpenses; }
}

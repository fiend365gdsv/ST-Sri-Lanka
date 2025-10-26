package com.example.SBLK_backend.service;

import com.example.SBLK_backend.dto.*;
import com.example.SBLK_backend.model.ProfitEntry;
import com.example.SBLK_backend.repository.ProfitRepository;
import com.example.SBLK_backend.repository.DepotRepository;
import com.example.SBLK_backend.model.Depot;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;

import java.time.LocalDate;
import java.time.Month;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ProfitService {

    private final ProfitRepository profitRepository;
    private final DepotRepository depotRepository;

    public ProfitService(ProfitRepository profitRepository, DepotRepository depotRepository) {
        this.profitRepository = profitRepository;
        this.depotRepository = depotRepository;
    }

    @Transactional
    public ProfitEntryResponseDto addProfitEntry(ProfitEntryRequestDto dto) {
        ProfitEntry entry = new ProfitEntry();
        BeanUtils.copyProperties(dto, entry);
        entry.setProfit(dto.getTotalCollection() - (dto.getFuelExpenses() + dto.getOtherExpenses()));
        ProfitEntry saved = profitRepository.save(entry);

        ProfitEntryResponseDto response = new ProfitEntryResponseDto();
        BeanUtils.copyProperties(saved, response);
        return response;
    }

    public List<String> getBusNumbersByDepot(String depotName) {
        return depotRepository.findAll().stream()
                .filter(d -> d.getDepotName().equalsIgnoreCase(depotName))
                .map(Depot::getBusNumber)
                .collect(Collectors.toList());
    }

    public ProfitSummaryDto getProfitSummary(String busNumber) {
        List<ProfitEntry> entries = profitRepository.findAll()
                .stream().filter(e -> e.getBusNumber().equalsIgnoreCase(busNumber))
                .toList();

        double totalProfit = entries.stream().mapToDouble(ProfitEntry::getProfit).sum();
        double totalExpenses = entries.stream().mapToDouble(e -> e.getFuelExpenses() + e.getOtherExpenses()).sum();

        ProfitSummaryDto summary = new ProfitSummaryDto();
        summary.setBusNumber(busNumber);
        summary.setDailyProfit(entries.stream().filter(e -> e.getDate().equals(LocalDate.now()))
                .mapToDouble(ProfitEntry::getProfit).sum());
        summary.setMonthlyProfit(entries.stream()
                .filter(e -> e.getDate().getMonth() == LocalDate.now().getMonth())
                .mapToDouble(ProfitEntry::getProfit).sum());
        summary.setAnnualProfit(entries.stream()
                .filter(e -> e.getDate().getYear() == LocalDate.now().getYear())
                .mapToDouble(ProfitEntry::getProfit).sum());
        summary.setTotalExpenses(totalExpenses);
        return summary;
    }

    public List<ProfitEntryResponseDto> getAllEntries() {
        return profitRepository.findAll().stream().map(e -> {
            ProfitEntryResponseDto dto = new ProfitEntryResponseDto();
            BeanUtils.copyProperties(e, dto);
            return dto;
        }).collect(Collectors.toList());
    }
}

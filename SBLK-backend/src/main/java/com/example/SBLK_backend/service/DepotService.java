package com.example.SBLK_backend.service;

import com.example.SBLK_backend.dto.DepotRequestDto;
import com.example.SBLK_backend.dto.DepotResponseDto;
import com.example.SBLK_backend.model.Depot;
import com.example.SBLK_backend.repository.DepotRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DepotService {

    private final DepotRepository depotRepository;

    public DepotService(DepotRepository depotRepository) {
        this.depotRepository = depotRepository;
    }

    @Transactional
    public DepotResponseDto createDepot(DepotRequestDto dto) {
        Depot depot = new Depot();
        BeanUtils.copyProperties(dto, depot);
        Depot saved = depotRepository.save(depot);
        return mapToDto(saved);
    }

    public DepotResponseDto getDepotById(Long id) {
        Depot depot = depotRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Depot not found with id: " + id));
        return mapToDto(depot);
    }
    public List<DepotResponseDto> searchDepots(String fromLocation, String destination) {
        return depotRepository.findByFromLocationIgnoreCaseAndDestinationIgnoreCase(fromLocation, destination)
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }


    public List<DepotResponseDto> getAllDepots() {
        return depotRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public DepotResponseDto updateDepot(Long id, DepotRequestDto dto) {
        Depot depot = depotRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Depot not found with id: " + id));
        depot.setDepotName(dto.getDepotName());
        depot.setBusNumber(dto.getBusNumber());
        depot.setRoute(dto.getRoute());
        depot.setFromLocation(dto.getFromLocation());
        depot.setDestination(dto.getDestination());
        Depot updated = depotRepository.save(depot);
        return mapToDto(updated);
    }

    @Transactional
    public void deleteDepot(Long id) {
        if (!depotRepository.existsById(id)) {
            throw new IllegalArgumentException("Depot not found with id: " + id);
        }
        depotRepository.deleteById(id);
    }

    private DepotResponseDto mapToDto(Depot depot) {
        DepotResponseDto dto = new DepotResponseDto();
        BeanUtils.copyProperties(depot, dto);
        return dto;
    }
}

package com.example.SBLK_backend.service;

import com.example.SBLK_backend.dto.ScheduleRequestDto;
import com.example.SBLK_backend.dto.ScheduleResponseDto;
import com.example.SBLK_backend.model.Depot;
import com.example.SBLK_backend.model.Schedule;
import com.example.SBLK_backend.model.Staff;
import com.example.SBLK_backend.repository.DepotRepository;
import com.example.SBLK_backend.repository.ScheduleRepository;
import com.example.SBLK_backend.repository.StaffRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ScheduleService {

    private final ScheduleRepository scheduleRepository;
    private final DepotRepository depotRepository;
    private final StaffRepository staffRepository;

    public ScheduleService(ScheduleRepository scheduleRepository, DepotRepository depotRepository, StaffRepository staffRepository) {
        this.scheduleRepository = scheduleRepository;
        this.depotRepository = depotRepository;
        this.staffRepository = staffRepository;
    }

    @Transactional
    public ScheduleResponseDto addSchedule(ScheduleRequestDto dto) {
        Schedule schedule = new Schedule();
        BeanUtils.copyProperties(dto, schedule);
        Schedule saved = scheduleRepository.save(schedule);
        ScheduleResponseDto response = new ScheduleResponseDto();
        BeanUtils.copyProperties(saved, response);
        return response;
    }

    public List<ScheduleResponseDto> getAllSchedules() {
        return scheduleRepository.findAll().stream().map(schedule -> {
            ScheduleResponseDto dto = new ScheduleResponseDto();
            BeanUtils.copyProperties(schedule, dto);
            return dto;
        }).collect(Collectors.toList());
    }

    // when selecting depot dropdown
    public List<String> getBusNumbersByDepot(String depotName) {
        return depotRepository.findAll().stream()
                .filter(d -> d.getDepotName().equalsIgnoreCase(depotName))
                .map(Depot::getBusNumber)
                .distinct()
                .collect(Collectors.toList());
    }

    public List<String> getRoutesByDepot(String depotName) {
        return depotRepository.findAll().stream()
                .filter(d -> d.getDepotName().equalsIgnoreCase(depotName))
                .map(Depot::getRoute)
                .distinct()
                .collect(Collectors.toList());
    }

    public List<String> getDriversByDepot(String depotName) {
        return staffRepository.findAll().stream()
                .filter(s -> s.getRole().equalsIgnoreCase("DRIVER") && depotName.equalsIgnoreCase(s.getCity()))
                .map(s -> s.getFirstName() + " " + s.getLastName())
                .collect(Collectors.toList());
    }

    public List<String> getConductorsByDepot(String depotName) {
        return staffRepository.findAll().stream()
                .filter(s -> s.getRole().equalsIgnoreCase("CONDUCTOR") && depotName.equalsIgnoreCase(s.getCity()))
                .map(s -> s.getFirstName() + " " + s.getLastName())
                .collect(Collectors.toList());
    }
}

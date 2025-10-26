package com.example.SBLK_backend.controller;

import com.example.SBLK_backend.dto.ScheduleRequestDto;
import com.example.SBLK_backend.dto.ScheduleResponseDto;
import com.example.SBLK_backend.service.ScheduleService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/schedules")
@CrossOrigin(origins = "*")
public class ScheduleController {

    private final ScheduleService scheduleService;

    public ScheduleController(ScheduleService scheduleService) {
        this.scheduleService = scheduleService;
    }

    @PostMapping
    public ResponseEntity<ScheduleResponseDto> addSchedule(@RequestBody ScheduleRequestDto dto) {
        return ResponseEntity.ok(scheduleService.addSchedule(dto));

    }

    @GetMapping
    public ResponseEntity<List<ScheduleResponseDto>> getAllSchedules() {
        return ResponseEntity.ok(scheduleService.getAllSchedules());
    }

    // --- dynamic dropdown APIs ---
    @GetMapping("/depot/{depotName}/bus-numbers")
    public ResponseEntity<List<String>> getBusNumbers(@PathVariable String depotName) {
        return ResponseEntity.ok(scheduleService.getBusNumbersByDepot(depotName));
    }

    @GetMapping("/depot/{depotName}/routes")
    public ResponseEntity<List<String>> getRoutes(@PathVariable String depotName) {
        return ResponseEntity.ok(scheduleService.getRoutesByDepot(depotName));
    }

    @GetMapping("/depot/{depotName}/drivers")
    public ResponseEntity<List<String>> getDrivers(@PathVariable String depotName) {
        return ResponseEntity.ok(scheduleService.getDriversByDepot(depotName));
    }

    @GetMapping("/depot/{depotName}/conductors")
    public ResponseEntity<List<String>> getConductors(@PathVariable String depotName) {
        return ResponseEntity.ok(scheduleService.getConductorsByDepot(depotName));
    }
}

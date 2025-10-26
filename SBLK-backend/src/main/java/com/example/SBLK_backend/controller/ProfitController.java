package com.example.SBLK_backend.controller;

import com.example.SBLK_backend.dto.*;
import com.example.SBLK_backend.service.ProfitService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/profit")
@CrossOrigin(origins = "*")
public class ProfitController {

    private final ProfitService profitService;

    public ProfitController(ProfitService profitService) {
        this.profitService = profitService;
    }

    @PostMapping("/add")
    public ResponseEntity<ProfitEntryResponseDto> addEntry(@RequestBody ProfitEntryRequestDto dto) {
        return ResponseEntity.ok(profitService.addProfitEntry(dto));
    }

    @GetMapping("/busNumbers/{depotName}")
    public ResponseEntity<List<String>> getBusNumbers(@PathVariable String depotName) {
        return ResponseEntity.ok(profitService.getBusNumbersByDepot(depotName));
    }

    @GetMapping("/summary/{busNumber}")
    public ResponseEntity<ProfitSummaryDto> getSummary(@PathVariable String busNumber) {
        return ResponseEntity.ok(profitService.getProfitSummary(busNumber));
    }

    @GetMapping("/all")
    public ResponseEntity<List<ProfitEntryResponseDto>> getAllEntries() {
        return ResponseEntity.ok(profitService.getAllEntries());
    }
}

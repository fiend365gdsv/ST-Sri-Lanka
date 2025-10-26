package com.example.SBLK_backend.controller;

import com.example.SBLK_backend.dto.DepotRequestDto;
import com.example.SBLK_backend.dto.DepotResponseDto;
import com.example.SBLK_backend.service.DepotService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/depots")
@CrossOrigin(origins = "*")
public class DepotController {

    private final DepotService depotService;

    public DepotController(DepotService depotService) {
        this.depotService = depotService;
    }

    // Create depot (Admin/Officer)
    @PostMapping
    public ResponseEntity<?> createDepot(@Valid @RequestBody DepotRequestDto dto) {
        try {
            DepotResponseDto created = depotService.createDepot(dto);
            return ResponseEntity.ok(created);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(Map.of("error", ex.getMessage()));
        } catch (Exception ex) {
            return ResponseEntity.status(500).body(Map.of("error", "Could not create depot"));
        }
    }
    // Search depots by fromLocation and destination
    @GetMapping("/search")
    public ResponseEntity<List<DepotResponseDto>> searchDepots(
            @RequestParam String fromLocation,
            @RequestParam String destination) {
        List<DepotResponseDto> depots = depotService.searchDepots(fromLocation, destination);
        return ResponseEntity.ok(depots);
    }


    // Get all depots
    @GetMapping
    public ResponseEntity<List<DepotResponseDto>> getAllDepots() {
        return ResponseEntity.ok(depotService.getAllDepots());
    }

    // Get single depot
    @GetMapping("/{id}")
    public ResponseEntity<?> getDepot(@PathVariable Long id) {
        try {
            DepotResponseDto dto = depotService.getDepotById(id);
            return ResponseEntity.ok(dto);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(404).body(Map.of("error", ex.getMessage()));
        }
    }

    // Update depot
    @PutMapping("/{id}")
    public ResponseEntity<?> updateDepot(@PathVariable Long id, @Valid @RequestBody DepotRequestDto dto) {
        try {
            DepotResponseDto updated = depotService.updateDepot(id, dto);
            return ResponseEntity.ok(updated);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(Map.of("error", ex.getMessage()));
        }
    }

    // Delete depot
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDepot(@PathVariable Long id) {
        try {
            depotService.deleteDepot(id);
            return ResponseEntity.ok(Map.of("message", "Depot Details deleted"));
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(404).body(Map.of("error", ex.getMessage()));
        }
    }
}

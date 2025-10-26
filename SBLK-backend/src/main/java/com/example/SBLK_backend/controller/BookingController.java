package com.example.SBLK_backend.controller;

import com.example.SBLK_backend.model.Booking;
import com.example.SBLK_backend.model.Schedule;
import com.example.SBLK_backend.service.BookingService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    // 🔍 Search buses by from/to/date
    @GetMapping("/search")
    public ResponseEntity<List<Schedule>> searchBuses(
            @RequestParam String from,
            @RequestParam String to,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date
    ) {
        List<Schedule> result = bookingService.searchAvailableBuses(from, to, date);
        return ResponseEntity.ok(result);
    }

    // 🎫 Book a ticket
    @PostMapping("/book")
    public ResponseEntity<Booking> bookTicket(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String busNumber = body.get("busNumber");
        String from = body.get("fromLocation");
        String to = body.get("destination");
        String boardingPoint = body.get("boardingPoint");
        LocalDate date = LocalDate.parse(body.get("travelDate"));

        Booking booking = bookingService.bookTicket(username, busNumber, from, to, date, boardingPoint);
        return ResponseEntity.ok(booking);
    }

    // 📋 Get all bookings for a user
    @GetMapping("/user/{username}")
    public ResponseEntity<List<Booking>> getUserBookings(@PathVariable String username) {
        return ResponseEntity.ok(bookingService.getUserBookings(username));
    }
}

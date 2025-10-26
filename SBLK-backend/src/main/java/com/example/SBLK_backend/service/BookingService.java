package com.example.SBLK_backend.service;

import com.example.SBLK_backend.model.Booking;
import com.example.SBLK_backend.model.Depot;
import com.example.SBLK_backend.model.Schedule;
import com.example.SBLK_backend.repository.BookingRepository;
import com.example.SBLK_backend.repository.DepotRepository;
import com.example.SBLK_backend.repository.ScheduleRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final DepotRepository depotRepository;
    private final ScheduleRepository scheduleRepository;

    public BookingService(BookingRepository bookingRepository, DepotRepository depotRepository, ScheduleRepository scheduleRepository) {
        this.bookingRepository = bookingRepository;
        this.depotRepository = depotRepository;
        this.scheduleRepository = scheduleRepository;
    }

    // 🔍 Search available buses
    public List<Schedule> searchAvailableBuses(String from, String to, LocalDate date) {
        List<Depot> depots = depotRepository.findAll();
        List<Schedule> schedules = scheduleRepository.findAll();

        return schedules.stream()
                .filter(s -> depots.stream().anyMatch(
                        d -> d.getBusNumber().equals(s.getBusNumber())
                                && d.getFromLocation().equalsIgnoreCase(from)
                                && d.getDestination().equalsIgnoreCase(to)
                ))
                .filter(s -> s.getStartDate().equals(date))
                .collect(Collectors.toList());
    }

    // 🎫 Book a ticket
    public Booking bookTicket(String username, String busNumber, String from, String to, LocalDate date, String boardingPoint) {
        Booking booking = new Booking();
        booking.setUsername(username);
        booking.setBusNumber(busNumber);
        booking.setFromLocation(from);
        booking.setDestination(to);
        booking.setTravelDate(date);
        booking.setBoardingPoint(boardingPoint);
        booking.setStatus("CONFIRMED");
        return bookingRepository.save(booking);
    }

    // 📋 View bookings by username
    public List<Booking> getUserBookings(String username) {
        return bookingRepository.findByUsername(username);
    }
}

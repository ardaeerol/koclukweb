package com.example.YKSPlatform.controller;

import com.example.YKSPlatform.entity.Booking;
import com.example.YKSPlatform.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingService.getAllBookings();
    }

    @GetMapping("/{id}")
    public Booking getBookingById(@PathVariable Long id) {
        return bookingService.getBookingById(id).orElse(null);
    }

    @GetMapping("/student/{studentId}")
    public List<Booking> getBookingsByStudentId(@PathVariable Long studentId) {
        return bookingService.getBookingsByStudentId(studentId);
    }

    @GetMapping("/coach/{coachId}")
    public List<Booking> getBookingsByCoachId(@PathVariable Long coachId) {
        return bookingService.getBookingsByCoachId(coachId);
    }

    @PostMapping
    public Booking createBooking(@RequestBody Booking booking) {
        return bookingService.createBooking(booking);
    }

    @DeleteMapping("/{id}")
    public void deleteBooking(@PathVariable Long id) {
        bookingService.deleteBooking(id);
    }
}

package com.example.YKSPlatform.service;

import com.example.YKSPlatform.entity.Booking;
import com.example.YKSPlatform.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public Optional<Booking> getBookingById(Long id) {
        return bookingRepository.findById(id);
    }

    public List<Booking> getBookingsByStudentId(Long studentId) {
        return bookingRepository.findByStudentStudentId(studentId);
    }

    public List<Booking> getBookingsByCoachId(Long coachId) {
        return bookingRepository.findByCoachCoachId(coachId);
    }

    public Booking createBooking(Booking booking) {
        return bookingRepository.save(booking);
    }

    public void deleteBooking(Long id) {
        bookingRepository.deleteById(id);
    }
}

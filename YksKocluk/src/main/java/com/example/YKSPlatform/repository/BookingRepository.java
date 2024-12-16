package com.example.YKSPlatform.repository;

import com.example.YKSPlatform.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByStudentStudentId(Long studentId);

    List<Booking> findByCoachCoachId(Long coachId);
}

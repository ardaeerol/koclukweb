package com.example.YKSPlatform.repository;

import com.example.YKSPlatform.entity.Chat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatRepository extends JpaRepository<Chat, Long> {
    List<Chat> findByBookingBookingId(Long bookingId);
}

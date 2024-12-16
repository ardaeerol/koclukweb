package com.example.YKSPlatform.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "chats") // Tablo adı eşleştirildi
public class Chat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ChatID") // Veritabanındaki sütun adı
    private Long chatId;

    @ManyToOne
    @JoinColumn(name = "BookingID", nullable = false) // Veritabanındaki sütun adı
    private Booking booking;

    @ManyToOne
    @JoinColumn(name = "SenderID", nullable = false) // Veritabanındaki sütun adı
    private User sender;

    @Column(name = "Message", columnDefinition = "TEXT", nullable = false) // Mesaj alanı
    private String message;

    @Column(name = "SentAt", nullable = false)
    private LocalDateTime sentAt;

    @PrePersist
    public void prePersist() {
        this.sentAt = LocalDateTime.now();
    }
}

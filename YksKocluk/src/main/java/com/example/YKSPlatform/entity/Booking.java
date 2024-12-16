package com.example.YKSPlatform.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "bookings") // Tablo adı eşleştirildi
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "BookingID") // Veritabanındaki sütun adı
    private Long bookingId;

    @ManyToOne
    @JoinColumn(name = "StudentID", nullable = false) // Veritabanındaki sütun adı
    private Student student;

    @ManyToOne
    @JoinColumn(name = "CoachID", nullable = false) // Veritabanındaki sütun adı
    private Coach coach;

    @Column(name = "BookingDate", nullable = false)
    private LocalDateTime bookingDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "Status", nullable = false)
    private BookingStatus status;

    public enum BookingStatus {
        PENDING, CONFIRMED, CANCELLED
    }

    @PrePersist
    public void prePersist() {
        if (this.bookingDate == null) {
            this.bookingDate = LocalDateTime.now();
        }
        if (this.status == null) {
            this.status = BookingStatus.PENDING;
        }
    }
}

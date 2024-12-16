package com.example.YKSPlatform.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "contentManagement") // Tablo adı doğru şekilde belirtildi
public class ContentManagement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ContentID") // Sütun adı eşleştirildi
    private Long contentId;

    @ManyToOne
    @JoinColumn(name = "AdminID", nullable = false) // Sütun adı eşleştirildi
    private User admin;

    @Enumerated(EnumType.STRING)
    @Column(name = "ContentType", nullable = false) // Enum sütunu eşleştirildi
    private ContentType contentType;

    @Column(name = "ContentDetails", columnDefinition = "TEXT", nullable = false) // Text sütunu eşleştirildi
    private String contentDetails;

    @Column(name = "CreatedAt", columnDefinition = "TIMESTAMP")
    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }

    public enum ContentType {
        ANNOUNCEMENT, RESOURCE
    }
}

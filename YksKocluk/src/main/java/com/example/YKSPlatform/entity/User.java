package com.example.YKSPlatform.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users") // Veritabanındaki tablo adı
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "UserID") // Veritabanındaki sütun adı
    private Long userId;

    @Column(name = "Username", nullable = false, unique = true, length = 50) // Veritabanındaki sütun adı
    private String username;

    @Column(name = "Password", nullable = false) // Veritabanındaki sütun adı
    private String password;

    @Column(name = "Email", nullable = false, unique = true, length = 100) // Veritabanındaki sütun adı
    private String email;

    @Column(name = "Role", nullable = false) // Veritabanındaki sütun adı
    private String role;

    @Column(name = "FullName", length = 100) // Veritabanındaki sütun adı
    private String fullName;

    @Column(name = "PhoneNumber", length = 15) // Veritabanındaki sütun adı
    private String phoneNumber;

    @Column(name = "CreatedAt", columnDefinition = "TIMESTAMP") // Veritabanındaki sütun adı
    private LocalDateTime createdAt;

    // Getter ve Setter metotları
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}

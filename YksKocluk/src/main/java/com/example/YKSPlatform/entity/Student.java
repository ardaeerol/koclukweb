package com.example.YKSPlatform.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "students") // Veritabanındaki tablo adı
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "StudentID") // Veritabanındaki sütun adı
    private Long studentId;

    @OneToOne
    @JoinColumn(name = "UserID", nullable = false) // Veritabanındaki sütun adı
    private User user;

    @Column(name = "StudySchedule", columnDefinition = "TEXT") // Veritabanındaki sütun adı
    private String studySchedule;

    // Getter ve Setter metotları
    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getStudySchedule() {
        return studySchedule;
    }

    public void setStudySchedule(String studySchedule) {
        this.studySchedule = studySchedule;
    }
}

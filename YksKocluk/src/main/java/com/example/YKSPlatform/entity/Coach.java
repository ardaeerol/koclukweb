package com.example.YKSPlatform.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "coaches") // Tablo adı eşleştirildi
public class Coach {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CoachID") // Veritabanındaki sütun adı
    private Long coachId;

    @OneToOne
    @JoinColumn(name = "UserID", nullable = false) // Veritabanındaki sütun adı
    private User user;

    @Column(name = "Biography", columnDefinition = "TEXT")
    private String biography;

    @Column(name = "EducationDetails", columnDefinition = "TEXT")
    private String educationDetails;

    @Column(name = "Expertise", length = 255)
    private String expertise;

    @Column(name = "Availability", columnDefinition = "TEXT")
    private String availability;

    @Column(name = "Rating")
    private float rating;

    // Getter ve Setter metotları

    public Long getCoachId() {
        return coachId;
    }

    public void setCoachId(Long coachId) {
        this.coachId = coachId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getBiography() {
        return biography;
    }

    public void setBiography(String biography) {
        this.biography = biography;
    }

    public String getEducationDetails() {
        return educationDetails;
    }

    public void setEducationDetails(String educationDetails) {
        this.educationDetails = educationDetails;
    }

    public String getExpertise() {
        return expertise;
    }

    public void setExpertise(String expertise) {
        this.expertise = expertise;
    }

    public String getAvailability() {
        return availability;
    }

    public void setAvailability(String availability) {
        this.availability = availability;
    }

    public float getRating() {
        return rating;
    }

    public void setRating(float rating) {
        this.rating = rating;
    }
}

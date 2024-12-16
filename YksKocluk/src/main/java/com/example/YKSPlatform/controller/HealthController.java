package com.example.YKSPlatform.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

/**
 * This class is an example of how end points can be created.
 **/
@RestController
@RequestMapping("/ykskocluk")
public class HealthController {

    /// [ADMIN HEALTH TEST](http://localhost:8080/ykskocluk/admin_health)
    @GetMapping("/admin_health")
    public ResponseEntity<String> adminHealth() {
        String message = "Admin is healthy! Current server time: " + getFormattedTime();
        return ResponseEntity.ok(message);
    }

    /// [ADMIN HEALTH 2 TEST](http://localhost:8080/ykskocluk/admin_health2)
    @GetMapping("/admin_health2")
    public ResponseEntity<String> adminHealth2() {
        String message = "Admin is healthy 2! Current server time: " + getFormattedTime();
        return ResponseEntity.ok(message);
    }

    /// [COACH HEALTH TEST](http://localhost:8080/ykskocluk/coach_health)
    @GetMapping("/coach_health")
    public ResponseEntity<String> coachHealth() {
        String message = "Coach is healthy! Current server time: " + getFormattedTime();
        return ResponseEntity.ok(message);
    }

    /// [HOME HEALTH TEST](http://localhost:8080/ykskocluk/home_health)
    @GetMapping("/home_health")
    public ResponseEntity<String> homeHealth() {
        String message = "Home is healthy! Current server time: " + getFormattedTime();
        return ResponseEntity.ok(message);
    }

    /// [STUDENT HEALTH TEST](http://localhost:8080/ykskocluk/student_health)
    @GetMapping("/student_health")
    public ResponseEntity<String> studentHealth() {
        String message = "Student is healthy! Current server time: " + getFormattedTime();
        return ResponseEntity.ok(message);
    }


    private String getFormattedTime() {
        LocalTime time = LocalTime.now();
        return time.format(DateTimeFormatter.ofPattern("HH:mm:ss"));
    }
}

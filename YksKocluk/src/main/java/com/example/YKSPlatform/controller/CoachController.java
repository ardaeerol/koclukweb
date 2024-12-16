package com.example.YKSPlatform.controller;

import com.example.YKSPlatform.entity.Coach;
import com.example.YKSPlatform.service.CoachService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/coaches")
public class CoachController {

    @Autowired
    private CoachService coachService;

    @GetMapping
    public List<Coach> getAllCoaches() {
        return coachService.getAllCoaches();
    }

    @GetMapping("/{id}")
    public Coach getCoachById(@PathVariable Long id) {
        return coachService.getCoachById(id).orElse(null);
    }

    @PostMapping
    public Coach createCoach(@RequestBody Coach coach) {
        return coachService.createCoach(coach);
    }

    @PutMapping("/{id}")
    public Coach updateCoach(@PathVariable Long id, @RequestBody Coach coach) {
        return coachService.updateCoach(id, coach);
    }

    @DeleteMapping("/{id}")
    public void deleteCoach(@PathVariable Long id) {
        coachService.deleteCoach(id);
    }
}

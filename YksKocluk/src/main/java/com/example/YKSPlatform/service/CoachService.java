package com.example.YKSPlatform.service;

import com.example.YKSPlatform.entity.Coach;
import com.example.YKSPlatform.repository.CoachRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CoachService {

    @Autowired
    private CoachRepository coachRepository;

    public List<Coach> getAllCoaches() {
        return coachRepository.findAll();
    }

    public Optional<Coach> getCoachById(Long id) {
        return coachRepository.findById(id);
    }

    public Coach createCoach(Coach coach) {
        return coachRepository.save(coach);
    }

    public Coach updateCoach(Long id, Coach updatedCoach) {
        Optional<Coach> existingCoach = coachRepository.findById(id);
        if (existingCoach.isPresent()) {
            Coach coach = existingCoach.get();
            coach.setBiography(updatedCoach.getBiography());
            coach.setEducationDetails(updatedCoach.getEducationDetails());
            coach.setExpertise(updatedCoach.getExpertise());
            coach.setAvailability(updatedCoach.getAvailability());
            coach.setRating(updatedCoach.getRating());
            return coachRepository.save(coach);
        }
        return null;
    }

    public void deleteCoach(Long id) {
        coachRepository.deleteById(id);
    }
}

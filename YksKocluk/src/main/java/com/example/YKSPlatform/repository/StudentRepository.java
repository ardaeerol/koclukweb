package com.example.YKSPlatform.repository;

import com.example.YKSPlatform.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Long> {
}

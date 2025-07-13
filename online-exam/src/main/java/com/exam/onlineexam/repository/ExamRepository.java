package com.exam.onlineexam.repository;

import com.exam.onlineexam.model.Exam;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ExamRepository extends MongoRepository<Exam, String> {

    // Query to find exams by title (for example)
    List<Exam> findByTitleContaining(String title);

    // Add any additional query methods here as needed
}

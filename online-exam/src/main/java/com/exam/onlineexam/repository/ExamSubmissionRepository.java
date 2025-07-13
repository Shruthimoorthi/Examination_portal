package com.exam.onlineexam.repository;

import com.exam.onlineexam.model.ExamSubmission;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExamSubmissionRepository extends MongoRepository<ExamSubmission, String> {

    // Find submissions by student email
    List<ExamSubmission> findByStudentEmail(String studentEmail);

    // Find submissions by exam ID
    List<ExamSubmission> findByExamId(String examId);

    // Find submissions for a specific student on a specific exam
    List<ExamSubmission> findByStudentEmailAndExamId(String studentEmail, String examId);
}

package com.exam.onlineexam.controller;

import com.exam.onlineexam.model.ExamSubmission;
import com.exam.onlineexam.repository.ExamSubmissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/submissions")
@CrossOrigin(origins = "http://localhost:3000")
public class ExamSubmissionController {

    @Autowired
    private ExamSubmissionRepository submissionRepo;

    // ✅ Get all submissions (for AdminPage.jsx)
    @GetMapping
    public List<ExamSubmission> getAllSubmissions() {
        return submissionRepo.findAll();
    }
}

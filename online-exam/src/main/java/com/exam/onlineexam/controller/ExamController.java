package com.exam.onlineexam.controller;

import com.exam.onlineexam.model.Exam;
import com.exam.onlineexam.model.ExamSubmission;
import com.exam.onlineexam.repository.ExamSubmissionRepository;
import com.exam.onlineexam.service.ExamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/exams")
@CrossOrigin(origins = "http://localhost:3000")
public class ExamController {

    @Autowired
    private ExamService examService;

    @Autowired
    private ExamSubmissionRepository submissionRepo;

    // ✅ Create exam
    @PostMapping
    public Exam createExam(@RequestBody Exam exam) {
        return examService.createExam(exam);
    }

    // ✅ Get all exams
    @GetMapping
    public List<Exam> getAllExams() {
        return examService.getAllExams();
    }

    // ✅ Submit exam answers and get score
    @PostMapping("/{id}/submit")
    public Map<String, Object> submitExam(
            @PathVariable String id,
            @RequestBody Map<String, String> answers) {

        Exam exam = examService.getExamById(id);
        int total = exam.getQuestions().size();
        int correct = 0;

        for (int i = 0; i < total; i++) {
            String qKey = "q" + i;
            String submitted = answers.get(qKey);
            String correctAnswer = exam.getQuestions().get(i).getCorrectAnswer();
            if (submitted != null && submitted.equalsIgnoreCase(correctAnswer)) {
                correct++;
            }
        }

        Map<String, Object> result = new HashMap<>();
        result.put("total", total);
        result.put("score", correct);
        result.put("passed", correct >= (total / 2)); // Pass if 50% or more

        return result;
    }

    // ✅ Generate certificate and store submission info
    @PostMapping("/{id}/certificate")
    public Map<String, Object> generateCertificate(
            @PathVariable String id,
            @RequestBody Map<String, String> request) {

        String studentName = request.get("name");
        String studentEmail = request.get("email"); // 🔥 Make sure this is sent from frontend!

        Map<String, Object> scoreResult = submitExam(id, request);
        int score = (int) scoreResult.get("score");
        int total = (int) scoreResult.get("total");
        boolean passed = (boolean) scoreResult.get("passed");

        Exam exam = examService.getExamById(id);
        String title = exam.getTitle();

        // 🔄 Check if this is a retest
        boolean isRetest = !submissionRepo.findByStudentEmail(studentEmail).isEmpty();

        // 💾 Save the submission
        ExamSubmission submission = new ExamSubmission(
                studentName,
                studentEmail,
                id,
                title,
                score,
                total,
                passed,
                isRetest);
        submissionRepo.save(submission);

        // 🏆 Calculate reward
        String reward;
        double percent = (score * 100.0) / total;
        if (percent >= 90)
            reward = "Elite";
        else if (percent >= 75)
            reward = "Gold";
        else if (percent >= 50)
            reward = "Silver";
        else
            reward = "None";

        Map<String, Object> certificate = new HashMap<>();
        certificate.put("name", studentName);
        certificate.put("examTitle", title);
        certificate.put("score", score);
        certificate.put("total", total);
        certificate.put("reward", reward);
        certificate.put("signedBy", "Admin");
        certificate.put("passed", passed);

        return certificate;
    }
}

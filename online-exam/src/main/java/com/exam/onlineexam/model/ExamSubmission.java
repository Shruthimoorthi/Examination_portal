package com.exam.onlineexam.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;

import java.util.Date;

@Document(collection = "submissions")
public class ExamSubmission {

    @Id
    private String id;

    private String studentName;

    @Indexed // Indexing for better performance when querying by email
    private String studentEmail;

    private String examId;
    private String examTitle;
    private int score;
    private int total;
    private boolean passed;
    private boolean retest; // Optional

    private Date submittedAt;

    // Default constructor
    public ExamSubmission() {
        this.submittedAt = new Date();
    }

    // Parameterized constructor
    public ExamSubmission(String studentName, String studentEmail, String examId,
            String examTitle, int score, int total, boolean passed, boolean retest) {
        this.studentName = studentName;
        this.studentEmail = studentEmail;
        this.examId = examId;
        this.examTitle = examTitle;
        this.score = score;
        this.total = total;
        this.passed = passed;
        this.retest = retest;
        this.submittedAt = new Date();
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getStudentEmail() {
        return studentEmail;
    }

    public void setStudentEmail(String studentEmail) {
        this.studentEmail = studentEmail;
    }

    public String getExamId() {
        return examId;
    }

    public void setExamId(String examId) {
        this.examId = examId;
    }

    public String getExamTitle() {
        return examTitle;
    }

    public void setExamTitle(String examTitle) {
        this.examTitle = examTitle;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public boolean isPassed() {
        return passed;
    }

    public void setPassed(boolean passed) {
        this.passed = passed;
    }

    public boolean isRetest() {
        return retest;
    }

    public void setRetest(boolean retest) {
        this.retest = retest;
    }

    public Date getSubmittedAt() {
        return submittedAt;
    }

    public void setSubmittedAt(Date submittedAt) {
        this.submittedAt = submittedAt;
    }
}

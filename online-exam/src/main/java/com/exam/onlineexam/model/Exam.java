package com.exam.onlineexam.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Document(collection = "exams")
public class Exam {

    @Id
    private String id;

    private String title;
    private List<Question> questions;
    private Date createdAt;
    private String createdBy; // ✅ NEW: Stores teacher's email

    // Default constructor
    public Exam() {
        this.createdAt = new Date();
    }

    // Constructor with title, questions, and createdBy
    public Exam(String title, List<Question> questions, String createdBy) {
        this.title = title;
        this.questions = questions;
        this.createdAt = new Date();
        this.createdBy = createdBy;
    }

    // --- Getters and Setters ---
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<Question> getQuestions() {
        return questions;
    }

    public void setQuestions(List<Question> questions) {
        this.questions = questions;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }
}

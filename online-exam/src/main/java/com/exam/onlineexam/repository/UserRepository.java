package com.exam.onlineexam.repository;

import com.exam.onlineexam.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    User findByEmail(String email); // Find user by email (for login)
}

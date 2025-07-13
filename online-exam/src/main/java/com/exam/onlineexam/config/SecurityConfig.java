package com.exam.onlineexam.config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain; //its a class

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.disable()) // Enable CORS with default config
                .csrf(csrf -> csrf.disable()) // Disable CSRF
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().permitAll() // ✅ Allow all requests (for dev)
                )

                .formLogin(login -> login.disable()) // Disable form login
                .httpBasic(basic -> basic.disable()); // Disable basic auth

        return http.build();
    }
}

/*Imagine this flow:

You open your React app (localhost:3000)

You fill out the registration form:

Name: Shruthi

Email: shruthi@gmail.com

Password: abc123

Role: student

You click "Register", and React sends a POST request to your backend:

bash
Copy code
POST http://localhost:8080/api/register
❌ What happens without SecurityConfig.java?
If you didn’t have this file, Spring Boot would:

Block the request

Show an error like 403 Forbidden

Sometimes even show a login popup from the browser asking for a username/password

That’s because Spring Boot's default security thinks:

“This backend is private. No one should access it unless they log in.” */
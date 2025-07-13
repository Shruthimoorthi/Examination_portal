package com.exam.onlineexam;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class OnlineExamApplication {

	public static void main(String[] args) {
		SpringApplication.run(OnlineExamApplication.class, args);
	}
	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/api/**")
						.allowedOrigins("http://localhost:3000") // Allow frontend
						.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
						.allowedHeaders("*")
						.allowCredentials(true);  //allow cookies or tokens to be snt with the request
			}
		};
	}
}


//bean class retunrs a object fr us and result of public WebMvcConfigurer corsConfigurer() is the object return new WebMvcConfigurer()
// WebMvcConfigurer()
//This is the interface we’re creating an object of.

//We’re using a special technique called an anonymous inner class:

//This means: “I’m making a WebMvcConfigurer, and right here, I’ll define how it behaves.”

//Even though WebMvcConfigurer is just an interface (which normally has no body), we are using { ... } after it to provide its implementation
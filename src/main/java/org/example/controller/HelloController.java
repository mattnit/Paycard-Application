package org.example.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import org.example.model.User;

@RestController
@CrossOrigin(origins = "http://localhost:8000")
public class HelloController {

    @GetMapping("/hello")
    public String hello() {
        return "Hello from Spring Boot REST API";
    }

    @GetMapping("/api/hello")
    public String APIhello() {
        return "Hello from Java backend!";
    }

    @GetMapping("/api/public")
    public String publicEndpoint() {
        return "Public endpoint works!";
    }
}
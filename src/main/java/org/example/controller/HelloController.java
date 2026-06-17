package org.example.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import org.example.model.User;

@RestController
public class HelloController {

    @GetMapping("/hello")
    public String hello() {
        return "Hello from Spring Boot REST API";
    }

    @GetMapping("/user")
    public User getUser() {
        return new User(1, "Matthew");
    }
}
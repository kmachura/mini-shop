package com.microservices.minishop.users.model;

public record SignUpDto(
        String login,
        String password,
        UserRole role) {
}

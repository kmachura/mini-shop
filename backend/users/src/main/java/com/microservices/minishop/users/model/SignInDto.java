package com.microservices.minishop.users.model;

public record SignInDto(
        String login,
        String password) {
}

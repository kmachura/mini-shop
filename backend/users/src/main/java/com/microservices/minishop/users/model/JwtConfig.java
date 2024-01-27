package com.microservices.minishop.users.model;

public class JwtConfig {

    private String secretKey = "your-secret-key";
    private long validityInMilliseconds = 3600000; // 1 hour
    private String prefix = "Bearer";
    private String header = "Authorization";

    public String getSecretKey() {
        return secretKey;
    }

    public long getValidityInMilliseconds() {
        return validityInMilliseconds;
    }

    public String getPrefix() {
        return prefix;
    }

    public String getHeader() {
        return header;
    }
}

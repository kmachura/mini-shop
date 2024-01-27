package com.microservices.minishop.users.service;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
public interface UserForDetailsService {
    UserDetailsService userDetailsService();
}

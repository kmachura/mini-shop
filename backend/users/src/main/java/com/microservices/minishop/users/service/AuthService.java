package com.microservices.minishop.users.service;

import com.microservices.minishop.users.model.InvalidJwtException;
import com.microservices.minishop.users.model.SignUpDto;
import com.microservices.minishop.users.model.User;
import com.microservices.minishop.users.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService implements UserDetailsService {

    @Autowired
    UserRepository repository;

    @Override
    public UserDetails loadUserByUsername(String username) {
        return repository.findByEmail(username);
    }

    public UserDetails signUp(SignUpDto data) throws InvalidJwtException {
        if (repository.findByEmail(data.login()) != null) {
            throw new InvalidJwtException("Username already exists");
        }
        String encryptedPassword = new BCryptPasswordEncoder().encode(data.password());
        User newUser = new User(data.login(), encryptedPassword, data.role());
        return repository.save(newUser);
    }
}

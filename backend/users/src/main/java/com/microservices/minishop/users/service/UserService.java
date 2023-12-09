package com.microservices.minishop.users.service;

import com.microservices.minishop.users.model.User;
import com.microservices.minishop.users.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository repository;

    public List<User> findAll() {
        return repository.findAll();
    }

    public User createUser(User user) {
        return repository.save(user);
    }

    public User findUserById(UUID userId) {
        return repository.findById(userId).orElseThrow(() -> new EntityNotFoundException("Nie znaleziono takiego użytkownika, uuid: " + userId));
    }

    public User updateUser(UUID userId, User userDetails) {
        User updateUser = repository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("Nie znaleziono takiego użytkownika, uuid: " + userId));

        updateUser.setEmail(userDetails.getEmail());
        updateUser.setLastName(userDetails.getLastName());

        return repository.save(updateUser);
    }

    public void deleteUser(UUID userId) {
        User user = repository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("Nie znaleziono takiego użytkownika, uuid: " + userId));

        repository.delete(user);
    }
}

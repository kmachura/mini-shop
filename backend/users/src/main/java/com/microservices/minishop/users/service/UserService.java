package com.microservices.minishop.users.service;

import com.microservices.minishop.users.model.User;
import com.microservices.minishop.users.model.UserRequest;
import com.microservices.minishop.users.repository.UserRepository;
import com.microservices.minishop.users.repository.UserRoleRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import static com.microservices.minishop.users.model.UserRole.createUserRole;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository repository;
    private final UserRoleRepository roleRepository;

    public List<User> findAll() {
        return repository.findAll();
    }

    public User createUser(UserRequest userRequest) {
        User user = new User();
        user.setId(UUID.randomUUID());
        user.setEmail(userRequest.getEmail());
        user.setFirstName(userRequest.getFirstName());
        user.setLastName(userRequest.getLastName());
        user.setGender(userRequest.getGender());
        user.setUsername(userRequest.getUsername());
        user.setRoles(userRequest.getRoles().stream().map(x -> createUserRole(UUID.randomUUID(), x.getRole())).collect(Collectors.toSet()));

        roleRepository.saveAll(user.getRoles());
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

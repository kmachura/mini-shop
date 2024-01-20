package com.microservices.minishop.users.service;

import com.microservices.minishop.users.model.User;
import com.microservices.minishop.users.model.UserRequest;
import com.microservices.minishop.users.model.UserRole;
import com.microservices.minishop.users.repository.UserRepository;
import com.microservices.minishop.users.repository.UserRoleRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
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
        user.setEmail(userRequest.getEmail());
        user.setFirstName(userRequest.getFirstName());
        user.setLastName(userRequest.getLastName());
        user.setGender(userRequest.getGender());
        user.setUsername(userRequest.getUsername());
        user.setRoles(userRequest.getRoles().stream().map(x -> createUserRole(UUID.randomUUID().toString(), x.getRole())).collect(Collectors.toSet()));

        roleRepository.saveAll(user.getRoles());
        return repository.save(user);
    }

    public User findUserById(String userId) {
        return repository.findById(userId).orElseThrow(() -> new EntityNotFoundException("Nie znaleziono takiego użytkownika, id: " + userId));
    }

    public User updateUser(String userId, User userDetails) {
        User updateUser = repository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("Nie znaleziono takiego użytkownika, id: " + userId));

        updateUser.setEmail(userDetails.getEmail());
        updateUser.setUsername(userDetails.getUsername());
        updateUser.setLastName(userDetails.getLastName());
        updateUser.setGender(userDetails.getGender());
        updateUser.setPassword(userDetails.getPassword());
        updateUser.setPhone(userDetails.getPhone());
        updateUser.setAdrress(userDetails.getAdrress());

        userDetails.getRoles().stream().forEach(role -> {
            Optional<UserRole> userRole = roleRepository.findById(role.getId());
            if (userRole.isPresent()) {
                userRole.get().setId(role.getId());
                updateUser.addUserRole(userRole.get());
            }
        });

        return repository.save(updateUser);
    }

    public void deleteUser(String userId) {
        User user = repository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("Nie znaleziono takiego użytkownika, id: " + userId));

        repository.delete(user);
    }

    public Long getUserCount() {
        return repository.count();
    }
}

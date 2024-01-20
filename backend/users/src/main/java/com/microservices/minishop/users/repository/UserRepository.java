package com.microservices.minishop.users.repository;

import com.microservices.minishop.users.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    Optional<Object> findByEmail(String username);
}


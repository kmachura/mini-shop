package com.microservices.minishop.users.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;
import java.util.UUID;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id
    private UUID id;
    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private String gender;
    @OneToMany
    private Set<UserRole> roles;

}

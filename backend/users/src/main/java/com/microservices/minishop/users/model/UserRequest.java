package com.microservices.minishop.users.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserRequest {

    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private String gender;
    private Set<UserRoleRequest> roles;

}

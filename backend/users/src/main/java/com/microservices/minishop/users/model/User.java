package com.microservices.minishop.users.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.boot.autoconfigure.amqp.RabbitConnectionDetails;

import java.util.Set;
import java.util.UUID;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name="users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private String gender;
    @OneToMany(cascade = CascadeType.ALL)
    @JsonIgnoreProperties("users")
    private Set<UserRole> roles;
    private String password;
    private Long phone;
    @OneToOne
    private Address adrress;

    public void addUserRole(UserRole role) {
        this.roles.add(role);
        role.getUsers().add(this);
    }
}

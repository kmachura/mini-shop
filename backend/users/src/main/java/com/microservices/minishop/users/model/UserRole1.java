//package com.microservices.minishop.users.model;
//
//import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
//import jakarta.persistence.CascadeType;
//import jakarta.persistence.Entity;
//import jakarta.persistence.GeneratedValue;
//import jakarta.persistence.GenerationType;
//import jakarta.persistence.Id;
//import jakarta.persistence.ManyToMany;
//import lombok.AllArgsConstructor;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//
//import java.util.Set;
//
//@Entity
//@Getter
//@Setter
//@AllArgsConstructor
//@NoArgsConstructor
//public class UserRole {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.UUID)
//    private String id;
//    private String role;
//    @ManyToMany
//    @JsonIgnoreProperties("roles")
//    private Set<User> users;
//
//    public static UserRole createUserRole(String id, String role) {
//        return new UserRole(id, role, null);
//    }
//}

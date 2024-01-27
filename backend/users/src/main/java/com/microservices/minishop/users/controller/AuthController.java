//package com.microservices.minishop.users.controller;
//
//import com.microservices.minishop.users.model.JwtDto;
//import com.microservices.minishop.users.model.SignInDto;
//import com.microservices.minishop.users.model.SignUpDto;
//import com.microservices.minishop.users.model.User;
//import com.microservices.minishop.users.service.AuthService;
//import jakarta.validation.Valid;
//import lombok.AllArgsConstructor;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//@RequestMapping("/auth")
//@AllArgsConstructor
//public class AuthController {
//    @Autowired
//    private AuthenticationManager authenticationManager;
//    @Autowired
//    private AuthService service;
//    @Autowired
//    private TokenProvider tokenService;
//
//    @PostMapping("/signup")
//    public ResponseEntity<?> signUp(@RequestBody @Valid SignUpDto data) {
//        service.signUp(data);
//        return ResponseEntity.status(HttpStatus.CREATED).build();
//    }
//
//    @PostMapping("/signin")
//    public ResponseEntity<JwtDto> signIn(@RequestBody @Valid SignInDto data) {
//        var usernamePassword = new UsernamePasswordAuthenticationToken(data.login(), data.password());
//        var authUser = authenticationManager.authenticate(usernamePassword);
//        var accessToken = tokenService.generateAccessToken((User) authUser.getPrincipal());
//        return ResponseEntity.ok(new JwtDto(accessToken));
//    }
//}

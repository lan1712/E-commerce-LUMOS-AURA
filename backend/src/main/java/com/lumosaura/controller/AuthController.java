package com.lumosaura.controller;

import com.lumosaura.dto.*;
import com.lumosaura.model.User;
import com.lumosaura.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest req) {
        try {
            return ResponseEntity.ok(authService.register(req));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest req) {
        try {
            return ResponseEntity.ok(authService.login(req));
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(Principal principal) {
        User user = authService.getCurrentUser(principal.getName());
        return ResponseEntity.ok(Map.of(
                "email", user.getEmail(),
                "firstName", user.getFirstName() != null ? user.getFirstName() : "",
                "lastName", user.getLastName() != null ? user.getLastName() : "",
                "phone", user.getPhone() != null ? user.getPhone() : "",
                "role", user.getRole()
        ));
    }

    @PutMapping("/me")
    public ResponseEntity<?> updateMe(Principal principal, @RequestBody RegisterRequest req) {
        User updated = authService.updateProfile(principal.getName(), req);
        return ResponseEntity.ok(Map.of(
                "email", updated.getEmail(),
                "firstName", updated.getFirstName() != null ? updated.getFirstName() : "",
                "lastName", updated.getLastName() != null ? updated.getLastName() : ""
        ));
    }
}

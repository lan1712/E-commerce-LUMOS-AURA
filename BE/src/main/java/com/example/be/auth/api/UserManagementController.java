package com.example.be.auth.api;

import com.example.be.auth.domain.User;
import com.example.be.auth.domain.UserRepository;
import com.example.be.auth.domain.UserRole;
import com.example.be.auth.domain.UserStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin/users")
public class UserManagementController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserManagementController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        List<UserDTO> users = userRepository.findAll().stream()
                .map(UserDTO::from)
                .collect(Collectors.toList());
        return ResponseEntity.ok(users);
    }

    @PostMapping
    public ResponseEntity<UserDTO> createUser(@RequestBody CreateUserRequest request) {
        if (userRepository.findByEmail(request.email()).isPresent()) {
            throw new IllegalArgumentException("Email already in use");
        }
        User user = new User();
        user.setEmail(request.email());
        user.setFirstName(request.firstName());
        user.setLastName(request.lastName());
        user.setRole(request.role() != null ? request.role() : UserRole.USER);
        user.setPasswordHash(passwordEncoder.encode(request.password() != null ? request.password() : "P@ssw0rd123"));
        
        User saved = userRepository.save(user);
        return ResponseEntity.ok(UserDTO.from(saved));
    }

    @PutMapping("/{id}/role")
    public ResponseEntity<UserDTO> updateRole(@PathVariable Long id, @RequestParam UserRole role) {
        User user = userRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("User not found"));
        user.setRole(role);
        return ResponseEntity.ok(UserDTO.from(userRepository.save(user)));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<UserDTO> updateStatus(@PathVariable Long id, @RequestParam UserStatus status) {
        User user = userRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("User not found"));
        user.setStatus(status);
        return ResponseEntity.ok(UserDTO.from(userRepository.save(user)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    public record CreateUserRequest(
        String email,
        String firstName,
        String lastName,
        UserRole role,
        String password
    ) {}
}

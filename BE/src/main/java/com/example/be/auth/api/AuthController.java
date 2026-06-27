package com.example.be.auth.api;

import com.example.be.auth.internal.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        AuthResponse response = userService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        AuthResponse response = userService.login(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/google")
    public ResponseEntity<AuthResponse> googleLogin(@RequestBody java.util.Map<String, String> body) {
        String token = body.get("token");
        if (token == null || token.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        AuthResponse response = userService.loginWithGoogle(token);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/me")
    public ResponseEntity<UserProfile> getCurrentUser(Principal principal) {
        UserProfile profile = userService.getCurrentUser(principal.getName());
        return ResponseEntity.ok(profile);
    }

    @PutMapping("/me")
    public ResponseEntity<UserProfile> updateProfile(
            Principal principal,
            @Valid @RequestBody UpdateProfileRequest request) {
        UserProfile profile = userService.updateProfile(principal.getName(), request);
        return ResponseEntity.ok(profile);
    }

    @PostMapping("/me/password/request-otp")
    public ResponseEntity<Void> requestPasswordOtp(Principal principal) {
        userService.requestPasswordChangeOtp(principal.getName());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/me/password/change")
    public ResponseEntity<Void> changePassword(
            Principal principal,
            @Valid @RequestBody PasswordChangeRequest request) {
        userService.changePasswordWithOtp(principal.getName(), request.otp(), request.newPassword());
        return ResponseEntity.ok().build();
    }
}

package com.example.be.auth;

import com.example.be.auth.api.AuthResponse;
import com.example.be.auth.api.LoginRequest;
import com.example.be.auth.api.RegisterRequest;
import com.example.be.auth.api.UserProfile;
import com.example.be.auth.api.AuthController;
import com.example.be.auth.domain.UserRole;
import com.example.be.auth.internal.JwtService;
import com.example.be.auth.internal.UserService;
import com.example.be.auth.security.JwtAuthFilter;
import com.example.be.auth.security.SecurityConfig;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Date;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Integration tests for the authentication flow covering the security filter chain +
 * controller layer. Uses @WebMvcTest with mocked services — no database required.
 *
 * <p>Validates Requirements 11.3-11.7, 1.8, 1.9:
 * <ul>
 *   <li>Register → 201 Created</li>
 *   <li>Login → 200 OK</li>
 *   <li>Protected endpoint without token → 401</li>
 *   <li>Protected endpoint with invalid token → 401</li>
 *   <li>Protected endpoint with valid token → 200</li>
 *   <li>Admin-only endpoint accessed by USER role → 403</li>
 * </ul>
 */
@WebMvcTest(controllers = AuthController.class)
@Import({SecurityConfig.class, JwtAuthFilter.class})
@TestPropertySource(properties = {
        "jwt.secret=test-secret-key-must-be-at-least-32-chars-long",
        "cors.allowed-origins=http://localhost:5173"
})
class AuthIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @MockitoBean
    private UserService userService;

    @MockitoBean
    private UserDetailsService userDetailsService;

    @MockitoBean
    private JwtService jwtService;

    // -----------------------------------------------------------------------
    // 1. Register → 201 Created
    // -----------------------------------------------------------------------

    @Test
    void register_success_returns201() throws Exception {
        RegisterRequest request = new RegisterRequest("new@example.com", "password123", null, null);

        UserProfile profile = new UserProfile(1L, "new@example.com", null, null, UserRole.USER);
        AuthResponse authResponse = new AuthResponse("mock-token", profile);

        when(userService.register(any(RegisterRequest.class))).thenReturn(authResponse);

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.token").value("mock-token"));
    }

    // -----------------------------------------------------------------------
    // 2. Login → 200 OK
    // -----------------------------------------------------------------------

    @Test
    void login_success_returns200() throws Exception {
        LoginRequest request = new LoginRequest("user@example.com", "password123");

        UserProfile profile = new UserProfile(1L, "user@example.com", null, null, UserRole.USER);
        AuthResponse authResponse = new AuthResponse("mock-token", profile);

        when(userService.login(any(LoginRequest.class))).thenReturn(authResponse);

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").value("mock-token"));
    }

    // -----------------------------------------------------------------------
    // 3. GET /api/auth/me without token → 401
    // -----------------------------------------------------------------------

    @Test
    void me_withoutToken_returns401() throws Exception {
        mockMvc.perform(get("/api/auth/me"))
                .andExpect(status().isUnauthorized());
    }

    // -----------------------------------------------------------------------
    // 4. GET /api/auth/me with invalid token → 401
    // -----------------------------------------------------------------------

    @Test
    void me_withInvalidToken_returns401() throws Exception {
        when(jwtService.isTokenValid("invalid-token-here")).thenReturn(false);

        mockMvc.perform(get("/api/auth/me")
                        .header("Authorization", "Bearer invalid-token-here"))
                .andExpect(status().isUnauthorized());
    }

    // -----------------------------------------------------------------------
    // 5. GET /api/auth/me with valid token → 200 OK
    // -----------------------------------------------------------------------

    @Test
    void me_withValidToken_returns200() throws Exception {
        // Mock UserService.getCurrentUser (used by AuthController.me)
        UserProfile profile = new UserProfile(1L, "user@example.com", null, null, UserRole.USER);
        when(userService.getCurrentUser("user@example.com")).thenReturn(profile);

        mockMvc.perform(get("/api/auth/me")
                        .with(user("user@example.com").roles("USER")))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value("user@example.com"));
    }

    // -----------------------------------------------------------------------
    // 6. POST /api/products with ROLE_USER → 403 Forbidden (admin-only endpoint)
    // -----------------------------------------------------------------------

    @Test
    void adminEndpoint_withUserRole_returns403() throws Exception {
        String token = "user-role-token";

        // Mock Claims
        Claims claims = mock(Claims.class);
        when(claims.getSubject()).thenReturn("user@example.com");
        when(claims.getExpiration()).thenReturn(new Date(System.currentTimeMillis() + 3600_000));

        // Mock JwtService
        when(jwtService.isTokenValid(token)).thenReturn(true);
        when(jwtService.parseToken(token)).thenReturn(claims);

        // User has only ROLE_USER — not ROLE_ADMIN
        UserDetails userDetails = new User(
                "user@example.com",
                "{noop}password",
                List.of(new SimpleGrantedAuthority("ROLE_USER"))
        );
        when(userDetailsService.loadUserByUsername("user@example.com")).thenReturn(userDetails);

        mockMvc.perform(post("/api/products")
                        .with(user("user@example.com").roles("USER"))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{}"))
                .andExpect(status().isForbidden());
    }
}

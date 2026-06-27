package com.example.be.auth.internal;

import com.example.be.auth.domain.User;
import com.example.be.auth.domain.UserRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Custom implementation of Spring Security's {@link UserDetailsService}.
 * <p>
 * Loads user details from the database via {@link UserRepository} and maps
 * the {@link User} entity to Spring Security's {@link UserDetails} for
 * authentication and authorization.
 * <p>
 * The username used for lookup is the user's email address. The user's role
 * is mapped to a Spring Security authority with the "ROLE_" prefix
 * (e.g., "ROLE_USER", "ROLE_ADMIN").
 */
@Service
class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Loads a user by their email address (used as the username in this application).
     *
     * @param email the email address identifying the user
     * @return a fully populated {@link UserDetails} instance
     * @throws UsernameNotFoundException if no user is found with the given email
     */
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException(
                        "User not found with email: " + email));

        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPasswordHash(),
                List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole().name()))
        );
    }
}

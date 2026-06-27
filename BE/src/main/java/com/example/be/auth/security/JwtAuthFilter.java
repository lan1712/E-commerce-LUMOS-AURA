package com.example.be.auth.security;

import com.example.be.auth.internal.JwtService;
import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * JWT authentication filter that intercepts every HTTP request and validates
 * the Bearer token in the {@code Authorization} header.
 *
 * <p>When a valid token is found:
 * <ol>
 *   <li>The email (subject) and role claims are extracted via {@link JwtService}.</li>
 *   <li>{@link UserDetailsService} loads the matching user from the database.</li>
 *   <li>A {@link UsernamePasswordAuthenticationToken} is placed in the
 *       {@link SecurityContextHolder}, granting the request its authorities.</li>
 * </ol>
 *
 * <p>When the token is absent, malformed, or expired the filter simply continues
 * the chain without setting authentication, allowing Spring Security to return
 * {@code 401 Unauthorized} for protected endpoints.
 */
@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    public JwtAuthFilter(JwtService jwtService, UserDetailsService userDetailsService) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        // No Bearer token → skip; public endpoints remain accessible
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = authHeader.substring(7); // strip "Bearer "

        try {
            if (jwtService.isTokenValid(token)) {
                Claims claims = jwtService.parseToken(token);
                String email = claims.getSubject();

                // Only populate SecurityContext if not already authenticated
                if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                    UserDetails userDetails = userDetailsService.loadUserByUsername(email);

                    UsernamePasswordAuthenticationToken authToken =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails,
                                    null,
                                    userDetails.getAuthorities()
                            );
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            }
        } catch (Exception e) {
            // Invalid / expired token — continue without setting authentication.
            // The SecurityContext stays empty; Spring Security will return 401
            // for any endpoint that requires authentication.
        }

        filterChain.doFilter(request, response);
    }
}

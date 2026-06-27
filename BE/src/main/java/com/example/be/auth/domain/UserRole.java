package com.example.be.auth.domain;

/**
 * Enum representing the roles a user can have in the system.
 * <p>
 * New users are assigned the {@link #USER} role by default upon registration.
 * The {@link #ADMIN} role grants elevated privileges for managing products,
 * promotional codes, and accessing all orders.
 */
public enum UserRole {
    USER,
    ADMIN
}

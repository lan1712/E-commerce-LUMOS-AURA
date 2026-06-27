/**
 * Order Management module.
 * Handles order creation, retrieval, and order history management.
 */
@org.springframework.modulith.ApplicationModule(
    allowedDependencies = { "product", "promo", "auth" }
)
package com.example.be.order;

# Requirements Document

## Introduction

This document specifies the requirements for the LUMOS-AURA backend REST API and PostgreSQL database. The backend supports the existing React/TypeScript storefront for a luxury candle e-commerce experience by replacing mock data with durable data, authenticated user accounts, product catalog APIs, checkout order creation, promotional code validation, saved addresses, wishlist persistence, and administrative catalog operations.

The system is implemented as a Spring Boot 4.1.0 modular monolith using Spring Security, Spring Data JPA, Flyway, JWT authentication, and PostgreSQL 16+. Requirements are written in EARS-style acceptance criteria so they can be traced into design, tasks, and tests.

## Scope

### In Scope

- JWT-based customer and admin authentication
- User profile and password updates
- Product catalog browsing, search, filtering, and admin maintenance
- Guest and authenticated order creation
- Authenticated order history and order detail retrieval
- Promotional code validation and admin promo management
- Saved address CRUD for authenticated users
- Wishlist persistence for authenticated users
- PostgreSQL schema, migrations, indexes, and referential integrity
- Consistent API error, validation, security, and response formatting
- Environment-based configuration for local development and deployment

### Out of Scope for Initial Backend

- Payment processor integration and payment webhooks
- Email delivery
- Product inventory reservation and stock decrementing
- Product reviews moderation workflows
- Full admin dashboard analytics
- Media upload/storage
- Multi-currency, tax, and shipping-rate calculation

## Glossary

- **System**: The LUMOS-AURA backend REST API server.
- **Customer**: A registered user with role USER.
- **Admin**: A registered user with role ADMIN.
- **Guest**: An unauthenticated shopper who can browse products and create an order.
- **User**: A persisted account record used for authentication and ownership.
- **Product**: A candle item in the catalog with price, category, imagery, tags, and scent details.
- **Order**: A purchase record containing purchaser contact details, shipping details, items, totals, and status.
- **Order_Item**: A purchased product snapshot associated with an Order.
- **Promo_Code**: A discount code that may be applied during checkout.
- **Address**: A saved customer shipping address.
- **Wishlist_Item**: A saved relationship between a User and Product.
- **JWT_Token**: A signed bearer token used for stateless authentication.
- **Slug**: A URL-friendly unique product identifier derived from the product name.
- **Order_Number**: A unique customer-facing order identifier.
- **Database**: PostgreSQL 16+ relational database storing persistent data.
- **BCrypt_Hash**: A one-way password hash produced by BCrypt with strength 12; the BCrypt algorithm silently truncates input at 72 bytes.

## Requirements

### Requirement 1: User Registration and Authentication

**User Story:** As a customer, I want to register and sign in securely, so that I can manage my account and purchases.

#### Acceptance Criteria

1. WHEN a registration request with a valid email and password is submitted, THE System SHALL create a User with a BCrypt_Hash password using strength 12.
2. WHEN a registration request contains an email that already exists in the Database case-insensitively, THE System SHALL return HTTP 400 with message "Email already registered".
3. WHEN registration succeeds, THE System SHALL assign role USER to the new User by default.
4. WHEN registration succeeds, THE System SHALL return an AuthResponse containing a JWT_Token and the registered User profile.
5. WHEN a login request with valid credentials is submitted, THE System SHALL return an AuthResponse containing a JWT_Token valid for exactly 24 hours from the time of issue and the User profile.
6. WHEN a login request contains credentials that do not match a stored User, THE System SHALL return HTTP 401 with message "Invalid email or password".
7. THE System SHALL hash all stored passwords using BCrypt with strength 12 before persisting them.
8. THE System SHALL validate the JWT_Token signature and expiration for every authenticated request.
9. WHEN an expired, malformed, or invalid JWT_Token is provided, THE System SHALL return HTTP 401 Unauthorized.
10. THE System SHALL never expose password hashes in any API response.
11. THE System SHALL store User email addresses in lowercase to enforce case-insensitive uniqueness at the database level.

### Requirement 2: User Profile Management

**User Story:** As a logged-in customer, I want to view and update my profile, so that my account information stays current.

#### Acceptance Criteria

1. WHEN an authenticated User requests their profile, THE System SHALL return the User's id, email, firstName, lastName, and role.
2. WHEN an authenticated User submits a profile update with a non-null firstName or lastName, THE System SHALL persist those fields and leave any omitted fields unchanged.
3. WHEN an authenticated User changes email to a valid, unused email address, THE System SHALL persist the new email and return the updated profile.
4. WHEN an authenticated User attempts to change email to one already in use case-insensitively, THE System SHALL return HTTP 400 with message "Email already in use".
5. WHEN an authenticated User submits a non-null, non-blank password in a profile update, THE System SHALL hash the new password using BCrypt strength 12 before storage.
6. THE System SHALL validate password length is between 8 and 100 characters inclusive.
7. THE System SHALL validate firstName and lastName are at most 100 characters each when provided.

### Requirement 3: Product Catalog Browsing

**User Story:** As a shopper, I want to browse and search products, so that I can find candles I want to purchase.

#### Acceptance Criteria

1. WHEN a product list request is received, THE System SHALL return only active products.
2. THE product list response SHALL include id, slug, name, price, category, tags, scentNotes, description, image, burnTime, burnHours, size, and active for each product.
3. WHEN a category query parameter is provided, THE System SHALL return only active products whose category matches the parameter case-insensitively.
4. WHEN a search query parameter is provided, THE System SHALL return only active products where the query term appears case-insensitively in the product's name, description, tags, or scentNotes.
5. WHEN a product detail request by slug is received, THE System SHALL return full product details including the details field and the thumbnails array.
6. WHEN a requested product slug does not exist or the product is inactive, THE System SHALL return HTTP 404 with message "Product not found".
7. THE System SHALL store monetary prices as DECIMAL(10,2) values with exactly 2 decimal places of precision.
8. THE System SHALL ensure each Product slug is unique across the entire products table.
9. WHEN no products match a list or search query, THE System SHALL return an empty JSON array.

### Requirement 4: Admin Product Management

**User Story:** As an admin, I want to create and maintain products, so that the storefront catalog can be managed without changing frontend code.

#### Acceptance Criteria

1. WHEN an Admin creates a product with valid data, THE System SHALL store the Product and return HTTP 201 with the created Product.
2. WHEN a non-Admin attempts to create, update, or delete a product, THE System SHALL return HTTP 403 Forbidden.
3. WHEN an Admin updates an existing Product, THE System SHALL modify only the submitted non-null fields and return the updated Product.
4. WHEN an Admin deletes a Product, THE System SHALL set the product's active flag to false rather than physically removing the row.
5. THE System SHALL validate product names are between 1 and 200 characters inclusive.
6. THE System SHALL validate product prices are greater than 0.
7. THE System SHALL validate slugs contain only lowercase letters, numbers, and hyphens.
8. WHEN an Admin creates or updates a Product without providing a slug, THE System SHALL generate a slug from the product name by converting to lowercase and replacing spaces and non-alphanumeric characters with hyphens.
9. WHEN a generated or submitted slug collides with an existing product slug, THE System SHALL append an incrementing numeric suffix (e.g., "-2", "-3") to produce a unique slug.

### Requirement 5: Order Creation

**User Story:** As a shopper, I want to place an order with cart items and shipping details, so that I can buy products.

#### Acceptance Criteria

1. WHEN a valid order request with items, email, and shipping details is received, THE System SHALL create an Order with a unique Order_Number and return HTTP 201.
2. WHEN an authenticated User creates an order, THE System SHALL associate the Order's userId field with that User's id.
3. WHEN a Guest creates an order, THE System SHALL store the Order with a null userId while preserving the submitted email address.
4. WHEN an order request includes a valid Promo_Code, THE System SHALL apply the computed discount amount to the order.
5. WHEN an order request contains a product slug that does not exist or belongs to an inactive product, THE System SHALL return HTTP 400 with message "Product not found: {slug}".
6. WHEN an order request contains an item quantity less than 1, THE System SHALL return HTTP 400 with message "Invalid quantity".
7. THE System SHALL calculate subtotal by summing product price multiplied by quantity for every Order_Item.
8. THE System SHALL calculate final total as subtotal minus discount amount, and the total SHALL never be less than 0.
9. THE System SHALL generate Order_Number in the format "LUM-{YYYYMMDD}-{XXXX}" where YYYYMMDD is the creation date and XXXX is 4 random alphanumeric characters in uppercase.
10. THE System SHALL store the order creation timestamp as a value that includes timezone information.
11. WHEN an order is created, THE System SHALL set the initial order status to PENDING.
12. THE System SHALL validate that shipName, shipAddress, shipCity, and shipZip are not blank; shipState is optional.
13. THE System SHALL copy productName and productPrice from the Product into each Order_Item at creation time to preserve order history if Product data changes later.

### Requirement 6: Order Retrieval and History

**User Story:** As a customer, I want to view my order history and order details, so that I can track past purchases.

#### Acceptance Criteria

1. WHEN an authenticated User requests their order list, THE System SHALL return all Orders associated with that User ordered by creation date descending.
2. WHEN an authenticated User requests an Order by Order_Number, THE System SHALL return the Order only if it belongs to that User.
3. WHEN a User requests an Order that does not belong to them, THE System SHALL return HTTP 403 Forbidden.
4. WHEN an Admin requests any Order by Order_Number, THE System SHALL return the Order regardless of ownership.
5. THE System SHALL include Order_Item details with productName, productPrice, quantity, and lineTotal in order detail responses.
6. THE System SHALL include subtotal, discount, total, status, promoCode, shipping details, and createdAt in order detail responses.
7. WHEN an Order_Number does not exist, THE System SHALL return HTTP 404 with message "Order not found".

### Requirement 7: Promotional Code Validation

**User Story:** As a shopper, I want to apply promotional codes, so that I can receive valid discounts.

#### Acceptance Criteria

1. WHEN a promo validation request is received, THE System SHALL normalize the code to uppercase before performing the lookup.
2. WHEN a valid active Promo_Code is provided, THE System SHALL return valid true, discountType, discountValue, and discountAmount when a subtotal is supplied.
3. WHEN an invalid Promo_Code is provided, THE System SHALL return HTTP 400 with message "Invalid promo code".
4. WHEN a Promo_Code's expiryDate is in the past, THE System SHALL return HTTP 400 with message "Promo code has expired".
5. WHEN a Promo_Code's startDate is in the future, THE System SHALL return HTTP 400 with message "Promo code not yet active".
6. THE System SHALL validate percentage-type discounts are between 1 and 100 inclusive.
7. THE System SHALL validate fixed-type discounts are greater than 0.
8. WHEN a fixed discount exceeds the order subtotal, THE System SHALL cap the discount at the subtotal so the total is 0 rather than negative.

### Requirement 8: Admin Promotional Code Management

**User Story:** As an admin, I want to manage promotional codes, so that marketing campaigns can be configured.

#### Acceptance Criteria

1. WHEN an Admin creates a Promo_Code with valid data, THE System SHALL store it after normalizing the code to uppercase.
2. WHEN a non-Admin attempts to create, update, or delete a Promo_Code, THE System SHALL return HTTP 403 Forbidden.
3. WHEN an Admin creates a Promo_Code whose code value already exists case-insensitively, THE System SHALL return HTTP 400 with message "Promo code already exists".
4. WHEN an Admin updates a Promo_Code, THE System SHALL modify only the submitted non-null fields.
5. WHEN an Admin deletes a Promo_Code, THE System SHALL mark it inactive rather than physically removing the row.
6. THE System SHALL enforce Promo_Code strings are between 3 and 50 characters inclusive.
7. THE System SHALL enforce that expiryDate is after startDate when both are provided.

### Requirement 9: User Address Management

**User Story:** As a customer, I want to save and manage shipping addresses, so that checkout is faster.

#### Acceptance Criteria

1. WHEN an authenticated User creates an Address, THE System SHALL store it associated with that User.
2. WHEN an authenticated User requests their address list, THE System SHALL return all Addresses for that User.
3. WHEN an authenticated User updates one of their Addresses, THE System SHALL persist the submitted changes.
4. WHEN an authenticated User deletes one of their Addresses, THE System SHALL remove the Address record.
5. WHEN a User attempts to modify or delete an Address that does not belong to them, THE System SHALL return HTTP 403 Forbidden.
6. WHEN a User marks an Address as default, THE System SHALL set isDefault to false for all other Addresses belonging to that User.
7. THE System SHALL validate that the address label is at most 50 characters when provided; label is optional.
8. WHEN an Address has country "US", THE System SHALL validate that the zip code matches either the 5-digit format (e.g., "12345") or the 5+4 format (e.g., "12345-6789").
9. THE System SHALL validate that name, line1, city, country, and zip are not blank.

### Requirement 10: Wishlist Management

**User Story:** As a customer, I want to save products to a wishlist, so that I can revisit products I am interested in.

#### Acceptance Criteria

1. WHEN an authenticated User adds an active Product to their wishlist, THE System SHALL persist a Wishlist_Item for that User and Product.
2. WHEN a User adds a Product that is already in their wishlist, THE System SHALL leave the single existing Wishlist_Item unchanged and return a successful response.
3. WHEN an authenticated User requests their wishlist, THE System SHALL return active wishlist Products with the same summary fields as the product list response.
4. WHEN an authenticated User removes a Product from their wishlist, THE System SHALL delete the corresponding Wishlist_Item.
5. WHEN a User attempts to remove a wishlist item that does not belong to them, THE System SHALL return HTTP 403 Forbidden without exposing another User's data.
6. WHEN a Product is marked inactive, THE System SHALL omit that product from all wishlist responses.

### Requirement 11: Database Schema and Data Integrity

**User Story:** As a system administrator, I want a durable relational schema, so that application data remains consistent.

#### Acceptance Criteria

1. THE Database SHALL store users with id, email, password_hash, first_name, last_name, role, created_at, and updated_at.
2. THE Database SHALL store products with id, slug, name, price, category, scent_notes, description, details, image, burn_time, burn_hours, size, active, created_at, and updated_at, plus separate product_tags and product_thumbnails tables joined by product_id.
3. THE Database SHALL store orders with id, order_number, user_id (nullable for guest checkout), email, ship_name, ship_address, ship_city, ship_state, ship_zip, ship_country, subtotal, discount, total, status, promo_code, created_at, and updated_at.
4. THE Database SHALL store order_items with id, order_id, product_id, product_name, product_price, quantity, and line_total.
5. THE Database SHALL store addresses with id, user_id, label, name, line1, line2, city, country, zip, is_default, created_at, and updated_at.
6. THE Database SHALL store promo_codes with id, code, discount_type, discount_value, start_date, expiry_date, active, created_at, and updated_at.
7. THE Database SHALL store wishlist_items with id, user_id, product_id, and created_at, with a unique constraint on the combination of user_id and product_id.
8. THE Database SHALL preserve Order and Order_Item rows when Products are marked inactive.
9. THE Database SHALL enforce foreign key constraints for user_id, product_id, and order_id relationships.
10. THE Database SHALL create indexes on users.email, products.slug, products.category, products.active, orders.order_number, orders.user_id, orders.created_at, addresses.user_id, promo_codes.code, and wishlist_items.user_id.
11. THE Database SHALL enforce check constraints for positive product price, positive order_item quantity, and valid discount values.

### Requirement 12: API Security and CORS Configuration

**User Story:** As a system architect, I want secure API access, so that the frontend can communicate safely.

#### Acceptance Criteria

1. THE System SHALL accept CORS requests only from origins listed in the configured CORS_ORIGINS value.
2. THE System SHALL allow CORS preflight OPTIONS requests from configured allowed origins.
3. THE System SHALL allow unauthenticated access to POST /api/auth/register, POST /api/auth/login, GET /api/products, GET /api/products/{slug}, POST /api/promo/validate, and POST /api/orders.
4. THE System SHALL require JWT authentication for GET /api/auth/me, PUT /api/auth/me, GET /api/orders, GET /api/orders/{orderNumber}, GET /api/addresses, POST /api/addresses, PUT /api/addresses/{id}, DELETE /api/addresses/{id}, GET /api/wishlist, POST /api/wishlist/{productId}, and DELETE /api/wishlist/{productId}.
5. THE System SHALL require Admin role for POST /api/products, PUT /api/products/{id}, DELETE /api/products/{id}, POST /api/promo, PUT /api/promo/{id}, and DELETE /api/promo/{id}.
6. WHEN authentication is missing or invalid for a protected endpoint, THE System SHALL return HTTP 401 Unauthorized.
7. WHEN an authenticated User lacks the required role for an endpoint, THE System SHALL return HTTP 403 Forbidden.
8. THE System SHALL use parameterized database access through JPA repositories.
9. THE System SHALL validate request bodies using Jakarta Bean Validation before processing.
10. THE System SHALL use stateless session management with no server-side session state.

### Requirement 13: Error Handling and Validation

**User Story:** As a frontend developer, I want consistent errors, so that user-facing messages can be handled predictably.

#### Acceptance Criteria

1. WHEN validation fails, THE System SHALL return HTTP 400 with JSON body `{"error":"Validation failed","details":{"fieldName":"error message"},"status":400}`.
2. WHEN a resource is not found, THE System SHALL return HTTP 404 with JSON body containing a descriptive error message and status 404.
3. WHEN authentication fails, THE System SHALL return HTTP 401 with message "Authentication required" or "Invalid email or password".
4. WHEN authorization fails, THE System SHALL return HTTP 403 with message "Access denied".
5. WHEN an unhandled server error occurs, THE System SHALL return HTTP 500 with message "An unexpected error occurred".
6. THE System SHALL log errors with timestamp, request path, HTTP method, status code, and exception details.
7. THE System SHALL validate email format using Jakarta Bean Validation @Email annotation.
8. THE System SHALL validate required string fields are not empty or whitespace-only.
9. WHILE in prod profile, THE System SHALL suppress stack traces and internal implementation details from all error responses.

### Requirement 14: Application Configuration and Environment Management

**User Story:** As a developer or operator, I want environment-based configuration, so that the same code can run locally and in production.

#### Acceptance Criteria

1. THE System SHALL read database connection details from environment variables DB_HOST, DB_PORT, DB_NAME, DB_USER, and DB_PASSWORD.
2. THE System SHALL read the JWT signing secret from environment variable JWT_SECRET.
3. WHEN JWT_SECRET is missing or shorter than 32 characters, THE System SHALL fail startup with message "JWT_SECRET must be at least 32 characters".
4. THE System SHALL read CORS allowed origins from environment variable CORS_ORIGINS.
5. THE System SHALL default the HTTP port to 8080 and allow override through environment variable PORT.
6. THE System SHALL support Spring profiles named dev, test, and prod.
7. WHILE in dev profile, THE System SHALL enable detailed application and SQL logging suitable for local debugging.
8. WHILE in prod profile, THE System SHALL suppress debug logging and internal error details.

### Requirement 15: API Response Format

**User Story:** As a frontend developer, I want consistent response shapes, so that client code stays simple.

#### Acceptance Criteria

1. THE System SHALL return successful retrieval responses with HTTP 200 and a JSON body.
2. THE System SHALL return created resource responses with HTTP 201 and a JSON body.
3. THE System SHALL return successful deletion responses with HTTP 204 and no response body.
4. THE System SHALL format datetime values in ISO 8601 format including timezone offset (e.g., "2024-01-15T10:30:00Z").
5. THE System SHALL format monetary values (price, subtotal, discount, total, lineTotal) with exactly 2 decimal places.
6. THE System SHALL use camelCase JSON property names for all response fields.
7. WHEN a collection response contains no items, THE System SHALL return `[]` rather than null.
8. THE System SHALL return AuthResponse with a token field and a user object containing id, email, firstName, lastName, and role.

### Requirement 16: Database Migrations and Seed Data

**User Story:** As a developer, I want repeatable database migrations and seed data, so that setup is reliable.

#### Acceptance Criteria

1. THE System SHALL use Flyway to manage all database schema migrations.
2. THE System SHALL apply pending migrations automatically on startup in dev and test profiles.
3. WHEN a migration fails, THE System SHALL prevent application startup and log the failure reason.
4. THE System SHALL record migration history in the Flyway schema_history table in the Database.
5. THE System SHALL name migration files with the pattern V{version}__{description}.sql.
6. THE System SHALL execute migrations in ascending version order.
7. THE System SHOULD provide development seed data for initial products and demo promo codes.
8. THE System SHALL avoid inserting seed data in a way that overwrites or duplicates existing user, order, address, or wishlist records.

## Notes

### Endpoint Summary

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `PUT /api/auth/me`
- `GET /api/products`
- `GET /api/products/{slug}`
- `POST /api/products`
- `PUT /api/products/{id}`
- `DELETE /api/products/{id}`
- `POST /api/orders`
- `GET /api/orders`
- `GET /api/orders/{orderNumber}`
- `POST /api/promo/validate`
- `POST /api/promo`
- `PUT /api/promo/{id}`
- `DELETE /api/promo/{id}`
- `GET /api/addresses`
- `POST /api/addresses`
- `PUT /api/addresses/{id}`
- `DELETE /api/addresses/{id}`
- `GET /api/wishlist`
- `POST /api/wishlist/{productId}`
- `DELETE /api/wishlist/{productId}`

### Testing Expectations

- Unit tests for service-level edge cases using JUnit 5 and Mockito.
- Integration tests for auth, products, orders, promos, addresses, wishlist, and security rules using Spring Boot Test and TestContainers.
- Property-based tests (jqwik) for password hashing, JWT validity, default role assignment, slug uniqueness, price precision, order total calculations, promo discount bounds, default address exclusivity, US zip code format, datetime formatting, decimal formatting, and DTO JSON round-trips.
- Migration tests verifying schema against a PostgreSQL-compatible in-process database.

### Implementation Notes

- BCrypt silently truncates input at 72 bytes. The System accepts passwords up to 100 characters but BCrypt effectively hashes only the first 72 bytes of any password longer than that. This is acceptable given the character set constraint (printable ASCII) used at registration.
- The System uses Spring Modulith 2.1.0; modules communicate via Spring ApplicationEvents and must not make direct cross-module service calls.
- Wishlist module follows the same domain/api/internal package pattern as other modules.

### Future Enhancements

- Stripe or PayPal payment integration
- Order confirmation and shipping emails
- Inventory management
- Product reviews and ratings
- Admin user management
- Admin analytics dashboard
- Image upload and CDN-backed media management
- Advanced search and faceted filters

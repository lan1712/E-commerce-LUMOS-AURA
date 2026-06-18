# Implementation Plan: Backend and Database Implementation

## Overview

This implementation plan covers the development of a Spring Boot 4.1.0 backend REST API with PostgreSQL database for the LUMOS-AURA luxury candle e-commerce platform. The system implements authentication with JWT, product catalog management, order processing, promotional codes, and address management following Spring Modulith architecture patterns.

The implementation follows a modular approach with five logical modules (auth, product, order, promo, address), uses JPA entities with proper relationships, implements stateless JWT authentication, and includes comprehensive property-based testing using jqwik to verify 27 correctness properties defined in the design document.

## Tasks

- [x] 1. Set up project infrastructure and dependencies
  - Configure build.gradle with Spring Boot 4.1.0, Spring Modulith 2.1.0, PostgreSQL driver, JWT dependencies (jjwt 0.12.3), Flyway, Spring Security, and jqwik for property-based testing
  - Create Spring Modulith module structure: auth, product, order, promo, address modules with domain, api, and internal packages
  - Configure application.properties with database connection, JWT settings, CORS configuration, and Flyway migration settings
  - Create Docker compose.yaml with PostgreSQL 16 container for development
  - _Requirements: 1.1-1.9, 10.1-10.10, 13.1-13.8, 15.1-15.7_

- [ ] 2. Implement database schema with Flyway migrations
  - [x] 2.1 Create users table migration (V1__create_users_table.sql)
    - Create users table with columns: id (bigserial), email (varchar 255 unique), password_hash (varchar 60), first_name, last_name, role (varchar 20 default 'USER'), created_at, updated_at
    - Add index on email column
    - _Requirements: 10.1, 1.1, 1.5_

  - [x] 2.2 Create products table migration (V2__create_products_table.sql)
    - Create products table with columns: id, slug (varchar 200 unique), name, price (decimal 10,2), category, scent_notes (text), description, details, image, burn_time, burn_hours, size, active (boolean default true), created_at, updated_at
    - Create product_tags and product_thumbnails junction tables
    - Add indexes on slug, category, and active columns
    - Add CHECK constraint for price > 0
    - _Requirements: 10.2, 3.1-3.7, 4.6_

  - [x] 2.3 Create orders and order_items tables migration (V3__create_orders_table.sql)
    - Create orders table with columns: id, order_number (varchar 50 unique), user_id (FK to users), email, ship_name, ship_address, ship_city, ship_state, ship_zip, ship_country (default 'US'), subtotal, discount (default 0), total, status (default 'PENDING'), promo_code, created_at, updated_at
    - Create order_items table with columns: id, order_id (FK to orders CASCADE), product_id (FK to products), product_name, product_price, quantity, line_total
    - Add indexes on order_number, user_id, and created_at
    - Add CHECK constraint for quantity > 0
    - _Requirements: 10.3, 10.4, 5.1-5.10, 10.7_

  - [x] 2.4 Create addresses table migration (V4__create_addresses_table.sql)
    - Create addresses table with columns: id, user_id (FK to users), label, name, line1, line2, city, country (default 'US'), zip, is_default (boolean default false), created_at, updated_at
    - Add index on user_id column
    - _Requirements: 10.5, 9.1-9.8_

  - [x] 2.5 Create promo_codes table migration (V5__create_promo_codes_table.sql)
    - Create promo_codes table with columns: id, code (varchar 50 unique), discount_type (varchar 20 CHECK IN 'PERCENTAGE', 'FIXED'), discount_value (decimal 10,2), start_date, expiry_date, active (boolean default true), created_at, updated_at
    - Add CHECK constraints for discount_value > 0 and expiry_date > start_date
    - Add index on code column
    - _Requirements: 10.6, 7.1-7.7, 8.1-8.7_


- [ ] 3. Implement Auth module - domain layer
  - [x] 3.1 Create User entity with JPA annotations
    - Define User entity with fields: id, email, passwordHash, firstName, lastName, role (UserRole enum)
    - Add timestamps createdAt and updatedAt with @PrePersist and @PreUpdate callbacks
    - Add @Table annotation with indexes on email column
    - Add validation constraints: @Column(nullable = false, unique = true) for email
    - _Requirements: 10.1, 1.1, 1.6, 2.1_

  - [x] 3.2 Create UserRole enum and UserRepository interface
    - Define UserRole enum with values: USER, ADMIN
    - Create UserRepository interface extending JpaRepository with method findByEmail(String email)
    - _Requirements: 1.7, 1.1_

  - [x] 3.3 Implement JwtService for token generation and validation
    - Create JwtService with methods: generateToken(String email, UserRole role), parseToken(String token), isTokenValid(String token)
    - Configure SecretKey from application property jwt.secret
    - Set token expiration to 24 hours (86400000 milliseconds)
    - Include role claim in JWT payload
    - _Requirements: 1.3, 1.8, 1.9, 13.2_

  - [x] 3.4 Write property test for JWT Token Expiration Correctness
    - **Property 2: JWT Token Expiration Correctness**
    - **Validates: Requirements 1.3**
    - Generate arbitrary valid email and role combinations
    - Generate JWT tokens and verify expiration time is exactly 24 hours from issued time
    - Test with at least 100 iterations

  - [x] 3.5 Write property test for JWT Validation Consistency
    - **Property 4: JWT Validation Consistency**
    - **Validates: Requirements 1.8**
    - Generate arbitrary valid and invalid (expired, malformed) JWT tokens
    - Verify that parseToken and isTokenValid agree on token validity
    - Test with at least 100 iterations

- [ ] 4. Implement Auth module - service and API layer
  - [x] 4.1 Create UserDetailsService implementation
    - Implement CustomUserDetailsService that loads users from UserRepository
    - Map User entity to Spring Security UserDetails
    - Include role with "ROLE_" prefix for Spring Security authorities
    - _Requirements: 1.1, 1.3, 1.8_

  - [x] 4.2 Implement UserService with authentication methods
    - Create UserService with methods: register(RegisterRequest), login(LoginRequest), getCurrentUser(String email), updateProfile(String email, UpdateProfileRequest)
    - Implement password hashing using BCryptPasswordEncoder with strength 12
    - Generate JWT token after successful login
    - Validate email uniqueness during registration and profile updates
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 2.1, 2.2, 2.3, 2.5_

  - [x] 4.3 Write property test for Password Hashing Preserves Verification
    - **Property 1: Password Hashing Preserves Verification**
    - **Validates: Requirements 1.1, 2.5**
    - Generate arbitrary valid password strings (8-100 characters)
    - Hash passwords using BCrypt and verify they match original passwords
    - Test with at least 100 iterations

  - [x] 4.4 Write property test for Default Role Assignment
    - **Property 3: Default Role Assignment**
    - **Validates: Requirements 1.7**
    - Generate arbitrary registration requests
    - Verify created users have role USER by default
    - Test with at least 100 iterations

  - [-] 4.5 Write property test for Password Hash Never Exposed
    - **Property 6: Password Hash Never Exposed**
    - **Validates: Requirements 2.4**
    - Generate arbitrary user entities and serialize to JSON
    - Verify resulting JSON does not contain passwordHash field or value
    - Test with at least 100 iterations


  - [~] 4.6 Create Auth DTOs and AuthController endpoints
    - Define record DTOs: RegisterRequest, LoginRequest, AuthResponse, UserProfile, UpdateProfileRequest with validation annotations
    - Create AuthController with endpoints: POST /api/auth/register, POST /api/auth/login, GET /api/auth/me, PUT /api/auth/me
    - Implement endpoint logic delegating to UserService
    - Return appropriate HTTP status codes (200, 201, 400, 401, 403)
    - _Requirements: 1.1-1.9, 2.1-2.5, 11.3, 11.5, 12.1-12.4_

  - [~] 4.7 Write property test for User Profile Round-Trip
    - **Property 5: User Profile Round-Trip**
    - **Validates: Requirements 2.1, 2.2**
    - Generate arbitrary user profile updates (firstName, lastName)
    - Update profile and retrieve, verify updated values are returned
    - Test with at least 100 iterations

  - [~] 4.8 Write unit tests for auth service edge cases
    - Test duplicate email registration returns "Email already registered"
    - Test invalid credentials login returns "Invalid email or password"
    - Test profile update with existing email returns "Email already in use"
    - _Requirements: 1.2, 1.4, 2.3_

- [ ] 5. Implement Security configuration
  - [~] 5.1 Create JwtAuthFilter for token validation
    - Implement OncePerRequestFilter that extracts JWT from Authorization header
    - Parse and validate token using JwtService
    - Extract email and role claims, load UserDetails, set SecurityContext
    - Handle invalid tokens gracefully (continue without authentication)
    - _Requirements: 1.8, 1.9, 11.6_

  - [~] 5.2 Configure SecurityFilterChain with endpoint authorization rules
    - Create SecurityConfig with @EnableWebSecurity and @EnableMethodSecurity
    - Configure public endpoints: POST /api/auth/login, POST /api/auth/register, GET /api/products*, POST /api/promo/validate, POST /api/orders
    - Configure authenticated endpoints: GET /api/auth/me, PUT /api/auth/me, GET /api/orders*, GET /api/addresses*, POST/PUT/DELETE /api/addresses*
    - Configure admin endpoints: POST/PUT/DELETE /api/products*, POST/PUT/DELETE /api/promo*
    - Set session management to STATELESS
    - Add JwtAuthFilter before UsernamePasswordAuthenticationFilter
    - _Requirements: 11.1-11.7, 1.8, 4.2_

  - [~] 5.3 Configure CORS and password encoder beans
    - Create CorsConfigurationSource bean reading allowed origins from cors.allowed-origins property
    - Allow methods: GET, POST, PUT, DELETE, OPTIONS
    - Create BCryptPasswordEncoder bean with strength 12
    - _Requirements: 11.1, 11.2, 1.5, 13.3_

  - [~] 5.4 Write integration tests for authentication flow
    - Test register → login → access protected endpoint flow
    - Test invalid token returns 401 Unauthorized
    - Test missing authorization for protected endpoint returns 401
    - Test non-admin accessing admin endpoint returns 403 Forbidden
    - _Requirements: 11.3-11.7, 1.8, 1.9_

- [ ] 6. Implement Product module - domain and service layer
  - [~] 6.1 Create Product entity with JPA annotations
    - Define Product entity with fields: id, slug, name, price, category, tags (@ElementCollection), scentNotes, description, details, image, thumbnails (@ElementCollection), burnTime, burnHours, size, active, createdAt, updatedAt
    - Add @Table annotation with indexes on slug, category, and active
    - Add validation constraints and CHECK constraint for price > 0 in migration
    - _Requirements: 10.2, 3.1, 3.6, 3.7, 4.6_

  - [~] 6.2 Create ProductRepository with query methods
    - Create ProductRepository extending JpaRepository
    - Add query methods: findBySlug(String slug), findByActiveTrue(), findByCategoryAndActiveTrue(String category), findBySlugIn(List<String> slugs)
    - Add custom query for search functionality matching name, description, or scentNotes (case-insensitive)
    - _Requirements: 3.1-3.5_


  - [~] 6.3 Implement ProductService with CRUD and query methods
    - Create ProductService with methods: getAllProducts(String category, String search), getProductBySlug(String slug), createProduct(CreateProductRequest), updateProduct(Long id, UpdateProductRequest), deleteProduct(Long id)
    - Implement slug generation from product name (lowercase, replace spaces with hyphens)
    - Implement soft delete by setting active=false
    - Validate product data (name length 1-200, price > 0, slug format)
    - _Requirements: 3.1-3.7, 4.1-4.8_

  - [~] 6.4 Write property test for Product List Contains Required Fields
    - **Property 7: Product List Contains Required Fields**
    - **Validates: Requirements 3.1**
    - Generate arbitrary products and retrieve product list
    - Verify each product contains all required fields: id, name, price, category, tags, scentNotes, description, image, burnTime, burnHours, size
    - Test with at least 100 iterations

  - [~] 6.5 Write property test for Category Filter Accuracy
    - **Property 8: Category Filter Accuracy**
    - **Validates: Requirements 3.2**
    - Generate arbitrary products with various categories
    - Filter by category and verify results only contain matching products (case-insensitive)
    - Test with at least 100 iterations

  - [~] 6.6 Write property test for Search Query Matching
    - **Property 9: Search Query Matching**
    - **Validates: Requirements 3.3**
    - Generate arbitrary products and search queries
    - Verify search results only contain products where query appears in name, description, or scentNotes (case-insensitive)
    - Test with at least 100 iterations

  - [~] 6.7 Write property test for Slug Uniqueness
    - **Property 11: Slug Uniqueness**
    - **Validates: Requirements 3.6**
    - Generate arbitrary sets of products
    - Verify no two products have identical slug values
    - Test with at least 100 iterations

  - [~] 6.8 Write property test for Price Precision Round-Trip
    - **Property 12: Price Precision Round-Trip**
    - **Validates: Requirements 3.7**
    - Generate arbitrary product prices (decimal values)
    - Store and retrieve prices, verify exactly 2 decimal places maintained
    - Test with at least 100 iterations

- [ ] 7. Implement Product module - API layer
  - [~] 7.1 Create Product DTOs and validation
    - Define record DTOs: ProductListDto, ProductDetailDto, CreateProductRequest, UpdateProductRequest
    - Add validation annotations: @NotBlank, @Size, @Min for price, @Pattern for slug
    - Implement mapping methods between Product entity and DTOs
    - _Requirements: 3.1-3.7, 4.1-4.8, 12.1, 12.8_

  - [~] 7.2 Create ProductController with REST endpoints
    - Create ProductController with endpoints: GET /api/products, GET /api/products/{slug}, POST /api/products, PUT /api/products/{id}, DELETE /api/products/{id}
    - Add @PreAuthorize("hasRole('ADMIN')") for create, update, delete endpoints
    - Implement query parameter handling for category and search filters
    - Return appropriate HTTP status codes (200, 201, 404, 403)
    - _Requirements: 3.1-3.5, 4.1-4.8, 11.4, 11.5_

  - [~] 7.3 Write property test for Product Retrieval by Slug
    - **Property 10: Product Retrieval by Slug**
    - **Validates: Requirements 3.4**
    - Generate arbitrary products with slugs
    - Retrieve products by slug and verify complete details including thumbnails array are returned
    - Test with at least 100 iterations

  - [~] 7.4 Write integration tests for product CRUD operations
    - Test admin can create product with valid data
    - Test non-admin cannot create product (403 Forbidden)
    - Test product not found returns 404
    - Test delete marks product as inactive
    - _Requirements: 3.5, 4.1-4.4, 11.4_


- [~] 8. Checkpoint - Verify authentication and product modules
  - Ensure all tests pass, verify JWT authentication works correctly
  - Verify product CRUD operations function properly with authorization
  - Test database migrations applied successfully
  - Ask the user if questions arise.

- [ ] 9. Implement Promo module - domain and service layer
  - [~] 9.1 Create PromoCode entity and DiscountType enum
    - Define PromoCode entity with fields: id, code, discountType (enum), discountValue, startDate, expiryDate, active, createdAt, updatedAt
    - Define DiscountType enum with values: PERCENTAGE, FIXED
    - Add @Table annotation with index on code column
    - Add validation constraints for discount_value > 0
    - _Requirements: 10.6, 7.1-7.7, 8.1-8.7_

  - [~] 9.2 Create PromoCodeRepository interface
    - Create PromoCodeRepository extending JpaRepository
    - Add query method: findByCodeIgnoreCaseAndActiveTrue(String code)
    - _Requirements: 7.1, 8.1_

  - [~] 9.3 Implement PromoService with validation logic
    - Create PromoService with methods: validatePromoCode(String code), createPromoCode(CreatePromoRequest), updatePromoCode(Long id, UpdatePromoRequest), deletePromoCode(Long id)
    - Implement validation: check if code exists, is active, not expired, has started
    - Normalize promo codes to uppercase
    - Validate percentage discounts between 1-100, fixed discounts > 0
    - Implement soft delete by setting active=false
    - _Requirements: 7.1-7.7, 8.1-8.7_

  - [~] 9.4 Write property test for Percentage Discount Bounds
    - **Property 21: Percentage Discount Bounds**
    - **Validates: Requirements 7.6**
    - Generate arbitrary percentage-based promo codes
    - Verify discount value is between 1 and 100 (inclusive)
    - Test with at least 100 iterations

  - [~] 9.5 Write property test for Fixed Discount Positivity
    - **Property 22: Fixed Discount Positivity**
    - **Validates: Requirements 7.7**
    - Generate arbitrary fixed-amount promo codes
    - Verify discount value is greater than 0
    - Test with at least 100 iterations

- [ ] 10. Implement Promo module - API layer
  - [~] 10.1 Create Promo DTOs and PromoController endpoints
    - Define record DTOs: PromoCodeDto, ValidatePromoRequest, PromoValidationResponse, CreatePromoRequest, UpdatePromoRequest
    - Create PromoController with endpoints: POST /api/promo/validate, POST /api/promo, PUT /api/promo/{id}, DELETE /api/promo/{id}
    - Add @PreAuthorize("hasRole('ADMIN')") for create, update, delete endpoints
    - Return appropriate error messages for invalid, expired, or not-yet-active codes
    - _Requirements: 7.1-7.7, 8.1-8.7, 11.4, 11.5_

  - [~] 10.2 Write unit tests for promo validation edge cases
    - Test invalid promo code returns "Invalid promo code"
    - Test expired promo code returns "Promo code has expired"
    - Test not-yet-active promo code returns "Promo code not yet active"
    - Test duplicate code creation returns "Promo code already exists"
    - _Requirements: 7.3, 7.4, 7.5, 8.3_

- [ ] 11. Implement Order module - domain layer
  - [~] 11.1 Create Order and OrderItem entities
    - Define Order entity with fields: id, orderNumber, userId, email, ship_name, ship_address, ship_city, ship_state, ship_zip, ship_country, subtotal, discount, total, status (OrderStatus enum), promoCode, items (@OneToMany), createdAt, updatedAt
    - Define OrderItem entity with fields: id, order (@ManyToOne), productId, productName, productPrice, quantity, lineTotal
    - Define OrderStatus enum with values: PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED
    - Add @Table annotations with indexes on orderNumber, userId, createdAt
    - Add cascade=CascadeType.ALL for order-items relationship
    - _Requirements: 10.3, 10.4, 5.1-5.10_


  - [~] 11.2 Create OrderRepository and OrderItemRepository interfaces
    - Create OrderRepository extending JpaRepository with methods: findByOrderNumber(String orderNumber), findByUserIdOrderByCreatedAtDesc(Long userId)
    - Create OrderItemRepository extending JpaRepository
    - _Requirements: 5.1, 6.1, 6.2_

  - [~] 11.3 Implement order number generation utility
    - Create utility method generateOrderNumber() that returns format "LUM-{YYYYMMDD}-{XXXX}"
    - Use current date for timestamp portion
    - Generate 4 random alphanumeric characters for unique identifier
    - _Requirements: 5.7_

  - [~] 11.4 Write property test for Order Number Format Compliance
    - **Property 17: Order Number Format Compliance**
    - **Validates: Requirements 5.7**
    - Generate arbitrary orders with order numbers
    - Verify each order number matches pattern "LUM-{YYYYMMDD}-{XXXX}"
    - Test with at least 100 iterations

  - [~] 11.5 Write property test for Order Number Uniqueness
    - **Property 13: Order Number Uniqueness**
    - **Validates: Requirements 5.1**
    - Generate arbitrary sets of created orders
    - Verify all order numbers are unique across entire set
    - Test with at least 100 iterations

  - [~] 11.6 Write property test for Initial Order Status
    - **Property 19: Initial Order Status**
    - **Validates: Requirements 5.9**
    - Generate arbitrary newly created orders
    - Verify order status is set to "PENDING"
    - Test with at least 100 iterations

- [ ] 12. Implement Order module - service layer with calculations
  - [~] 12.1 Implement OrderService with order creation logic
    - Create OrderService with method createOrder(CreateOrderRequest, Long userId)
    - Validate products exist by calling ProductService.findBySlugIn()
    - Validate promo code if provided by calling PromoService.validatePromoCode()
    - Generate unique order number using utility method
    - Create Order and OrderItem entities from request
    - Calculate subtotal by summing (price × quantity) for all items
    - Calculate discount based on promo code type and value
    - Calculate total as subtotal minus discount
    - Set initial status to PENDING and store with timestamp
    - _Requirements: 5.1-5.10_

  - [~] 12.2 Write property test for Subtotal Calculation Accuracy
    - **Property 15: Subtotal Calculation Accuracy**
    - **Validates: Requirements 5.5**
    - Generate arbitrary orders with line items
    - Verify order subtotal equals sum of (product price × quantity) for all items
    - Test with at least 100 iterations

  - [~] 12.3 Write property test for Total Calculation Accuracy
    - **Property 16: Total Calculation Accuracy**
    - **Validates: Requirements 5.6**
    - Generate arbitrary orders with discounts applied
    - Verify final total equals subtotal minus discount amount
    - Test with at least 100 iterations

  - [~] 12.4 Write property test for Discount Application Correctness
    - **Property 14: Discount Application Correctness**
    - **Validates: Requirements 5.2**
    - Generate arbitrary orders with valid promo codes (PERCENTAGE and FIXED types)
    - Verify discount amount correctly calculated based on promo type and applied to subtotal
    - Test with at least 100 iterations

  - [~] 12.5 Write property test for Order Timestamp Timezone Preservation
    - **Property 18: Order Timestamp Timezone Preservation**
    - **Validates: Requirements 5.8**
    - Generate arbitrary orders with creation timestamps
    - Verify stored timestamp includes timezone information (UTC offset)
    - Test with at least 100 iterations


  - [~] 12.6 Write property test for Shipping Field Validation
    - **Property 20: Shipping Field Validation**
    - **Validates: Requirements 5.10**
    - Generate arbitrary order requests with empty or whitespace-only shipping fields
    - Verify order creation is rejected with validation error
    - Test with at least 100 iterations

  - [~] 12.7 Implement order retrieval methods in OrderService
    - Add methods: getUserOrders(Long userId), getOrderByNumber(String orderNumber, Long userId, UserRole role)
    - Implement authorization check: users can only view their own orders unless admin
    - Return orders sorted by createdAt descending
    - _Requirements: 6.1-6.5_

  - [~] 12.8 Publish OrderCreatedEvent after successful order creation
    - Define OrderCreatedEvent as public event class in order module events package
    - Publish event using ApplicationEventPublisher after order is saved
    - _Requirements: 5.1_

- [ ] 13. Implement Order module - API layer
  - [~] 13.1 Create Order DTOs
    - Define record DTOs: CreateOrderRequest, OrderItemRequest, OrderResponseDto, OrderListDto, OrderDetailDto
    - Add validation annotations: @NotEmpty for items, @Email for email, @NotBlank for shipping fields, @Min(1) for quantity
    - Implement mapping methods between Order entity and DTOs
    - _Requirements: 5.1-5.10, 6.1-6.6, 12.1, 12.8_

  - [~] 13.2 Create OrderController with REST endpoints
    - Create OrderController with endpoints: POST /api/orders, GET /api/orders, GET /api/orders/{orderNumber}
    - Extract authenticated user from Principal for authorization
    - Return appropriate HTTP status codes (201, 200, 403, 404)
    - Implement authorization check for order access (user owns order or is admin)
    - _Requirements: 5.1-5.10, 6.1-6.6, 11.3, 11.5_

  - [~] 13.3 Write integration tests for order creation flow
    - Test create order with valid products and calculate totals correctly
    - Test create order with valid promo code applies discount
    - Test create order with invalid product slug returns error "Product not found: {slug}"
    - Test create order with quantity < 1 returns "Invalid quantity"
    - Test user can view their own orders
    - Test user cannot view other user's orders (403 Forbidden)
    - _Requirements: 5.1-5.10, 6.1-6.6_

- [ ] 14. Implement Address module - domain and service layer
  - [~] 14.1 Create Address entity
    - Define Address entity with fields: id, userId, label, name, line1, line2, city, country, zip, isDefault, createdAt, updatedAt
    - Add @Table annotation with index on userId column
    - Add validation constraints for required fields
    - _Requirements: 10.5, 9.1-9.8_

  - [~] 14.2 Create AddressRepository interface
    - Create AddressRepository extending JpaRepository
    - Add query methods: findByUserId(Long userId), findByIdAndUserId(Long id, Long userId)
    - _Requirements: 9.1-9.4_

  - [~] 14.3 Implement AddressService with CRUD operations
    - Create AddressService with methods: getUserAddresses(Long userId), createAddress(CreateAddressRequest, Long userId), updateAddress(Long id, UpdateAddressRequest, Long userId), deleteAddress(Long id, Long userId)
    - Implement default address logic: when marking address as default, set isDefault=false for all other user addresses
    - Validate address ownership before updates and deletes
    - Validate US zip code format (5 digits or 5+4 format) when country is "US"
    - _Requirements: 9.1-9.8_


  - [~] 14.4 Write property test for Default Address Exclusivity
    - **Property 23: Default Address Exclusivity**
    - **Validates: Requirements 9.6**
    - Generate arbitrary users with multiple addresses
    - Mark one address as default and verify all other addresses have isDefault=false
    - Test with at least 100 iterations

  - [~] 14.5 Write property test for US Zip Code Format Validation
    - **Property 24: US Zip Code Format Validation**
    - **Validates: Requirements 9.8**
    - Generate arbitrary addresses with country "US"
    - Verify zip code matches 5-digit format (e.g., "12345") or 5+4 format (e.g., "12345-6789")
    - Test with at least 100 iterations

- [ ] 15. Implement Address module - API layer
  - [~] 15.1 Create Address DTOs and AddressController endpoints
    - Define record DTOs: AddressDto, CreateAddressRequest, UpdateAddressRequest
    - Create AddressController with endpoints: GET /api/addresses, POST /api/addresses, PUT /api/addresses/{id}, DELETE /api/addresses/{id}
    - All endpoints require authentication, extract userId from Principal
    - Return appropriate HTTP status codes (200, 201, 204, 403, 404)
    - _Requirements: 9.1-9.8, 11.3, 11.5_

  - [~] 15.2 Write integration tests for address CRUD operations
    - Test authenticated user can create, read, update, and delete their addresses
    - Test user cannot modify address belonging to another user (403 Forbidden)
    - Test setting default address sets isDefault=false for other addresses
    - _Requirements: 9.1-9.6_

- [~] 16. Checkpoint - Verify order, promo, and address modules
  - Ensure all tests pass, verify order creation with promo codes works correctly
  - Verify address management and default address logic functions properly
  - Test database relationships and constraints
  - Ask the user if questions arise.

- [ ] 17. Implement global error handling and validation
  - [~] 17.1 Create custom exception classes
    - Define custom exceptions: ResourceNotFoundException, InvalidCredentialsException, UnauthorizedException
    - _Requirements: 12.2, 12.3, 12.4_

  - [~] 17.2 Implement GlobalExceptionHandler
    - Create @RestControllerAdvice class with exception handlers for: MethodArgumentNotValidException, ResourceNotFoundException, AuthenticationException, AccessDeniedException, generic Exception
    - Return consistent ErrorResponse DTO with fields: error (message), details (field errors map), status (HTTP code)
    - Log all errors with timestamps and stack traces for debugging
    - In production profile, exclude internal error details and stack traces
    - _Requirements: 12.1-12.9, 13.7_

  - [~] 17.3 Implement input validation and sanitization
    - Add validation annotations to all DTOs: @NotBlank, @Email, @Size, @Min, @Max, @Pattern
    - Implement email format validation using RFC 5322 pattern
    - Validate required string fields are not empty or whitespace-only
    - Use parameterized queries for all database operations (JPA handles this by default)
    - _Requirements: 11.8, 11.9, 12.7, 12.8_

  - [~] 17.4 Write unit tests for error handling
    - Test validation error returns 400 with field-specific messages
    - Test resource not found returns 404 with descriptive message
    - Test authentication failure returns 401
    - Test authorization failure returns 403
    - Test server error returns 500 with generic message (no stack trace in prod)
    - _Requirements: 12.1-12.6_


- [ ] 18. Implement API response formatting and serialization
  - [~] 18.1 Configure Jackson ObjectMapper for consistent JSON formatting
    - Configure datetime serialization to ISO 8601 format with timezone (e.g., "2024-01-15T10:30:00Z")
    - Configure BigDecimal serialization to always show exactly 2 decimal places for monetary values
    - Configure camelCase property naming strategy
    - Configure to return empty arrays [] instead of null for collections
    - _Requirements: 14.1-14.8_

  - [~] 18.2 Write property test for DateTime ISO 8601 Format
    - **Property 25: DateTime ISO 8601 Format**
    - **Validates: Requirements 14.4**
    - Generate arbitrary datetime values in API responses
    - Verify datetime formatted in ISO 8601 with timezone information
    - Test with at least 100 iterations

  - [~] 18.3 Write property test for Decimal Two-Place Formatting
    - **Property 26: Decimal Two-Place Formatting**
    - **Validates: Requirements 14.5**
    - Generate arbitrary decimal values (price, total, subtotal, discount)
    - Serialize to JSON and verify formatted with exactly 2 decimal places
    - Test with at least 100 iterations

  - [~] 18.4 Write property test for DTO JSON Round-Trip
    - **Property 27: DTO JSON Round-Trip**
    - **Validates: General serialization correctness**
    - Generate arbitrary DTOs (ProductDto, OrderDto, UserProfile, etc.)
    - Serialize to JSON and deserialize back, verify all field values preserved
    - Test with at least 100 iterations

- [ ] 19. Implement configuration management and environment setup
  - [~] 19.1 Create application.properties with environment variable placeholders
    - Configure datasource URL, username, password from DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD
    - Configure JWT secret from JWT_SECRET (validate minimum 32 characters)
    - Configure CORS origins from CORS_ORIGINS (comma-separated)
    - Configure server port from PORT (default 8080)
    - Enable Flyway with baseline-on-migrate=true
    - Set JPA ddl-auto to validate (Flyway handles migrations)
    - _Requirements: 13.1-13.8, 15.1-15.7_

  - [~] 19.2 Create profile-specific configuration files
    - Create application-dev.properties with debug logging, SQL logging enabled, show-sql=true
    - Create application-prod.properties with WARN logging, SQL logging disabled, security headers configured, error details hidden
    - _Requirements: 13.6-13.8_

  - [~] 19.3 Add JWT secret validation at startup
    - Create @Component with @PostConstruct method that validates JWT_SECRET exists and is at least 32 characters
    - Throw clear exception if validation fails: "JWT_SECRET must be at least 32 characters"
    - _Requirements: 13.2, 13.5_

- [ ] 20. Implement Spring Modulith verification
  - [~] 20.1 Create ModulithStructureTest to verify module boundaries
    - Create test class that uses ApplicationModules.of() to load module structure
    - Call verify() to ensure no illegal dependencies between modules
    - Verify modules follow package naming conventions (domain, api, internal)
    - _Requirements: Architecture section of design document_

  - [~] 20.2 Write integration test for module event publishing
    - Test OrderCreatedEvent is properly published when order is created
    - Verify event contains order details in payload
    - _Requirements: 5.1, Order module architecture_


- [ ] 21. Final integration testing and verification
  - [~] 21.1 Write comprehensive end-to-end integration tests
    - Test complete user journey: register → login → browse products → create order → view order history
    - Test admin workflow: create product → create promo code → verify in order
    - Test with TestContainers for isolated PostgreSQL instance
    - Verify all database constraints enforced correctly
    - _Requirements: All requirement sections_

  - [~] 21.2 Write security integration tests
    - Test CORS configuration allows requests from configured origins
    - Test CORS blocks requests from unauthorized origins
    - Test SQL injection prevention with malicious input
    - Test input sanitization for XSS attempts
    - _Requirements: 11.1-11.11_

  - [~] 21.3 Verify all 27 property-based tests are implemented and passing
    - Run all jqwik property tests with 100+ iterations each
    - Verify each property test references its design document property number
    - Ensure all correctness properties from design are covered
    - _Requirements: Correctness Properties section of design document_

- [~] 22. Final checkpoint - Complete system verification
  - Ensure all unit tests, property tests, and integration tests pass
  - Verify application starts successfully with required environment variables
  - Verify Flyway migrations apply correctly to fresh database
  - Test complete workflows end-to-end with Postman or similar tool
  - Ask the user if questions arise or if deployment guidance is needed.

## Notes

### Testing Strategy

This implementation includes **comprehensive property-based testing** using jqwik to verify 27 correctness properties defined in the design document. Property tests are marked with "*" suffix as optional tasks but are crucial for ensuring system correctness.

**Property Test Distribution:**
- Authentication properties: 6 tests (Properties 1-6)
- Product properties: 6 tests (Properties 7-12)
- Order properties: 8 tests (Properties 13-20)
- Promo properties: 2 tests (Properties 21-22)
- Address properties: 2 tests (Properties 23-24)
- Response format properties: 3 tests (Properties 25-27)

Each property test must:
- Run at least 100 iterations (configurable via `@Property(tries = 100)`)
- Include comment tag referencing design property number
- Use arbitrary data generators to test across input space
- Verify universal invariants hold for all valid inputs

### Spring Modulith Architecture

The codebase is organized into five logical modules following Spring Modulith patterns:
- **auth**: User authentication, JWT token management, security configuration
- **product**: Product catalog CRUD, search, and filtering
- **order**: Order creation, calculation, and retrieval with event publishing
- **promo**: Promotional code validation and management
- **address**: User shipping address management

Each module has clear boundaries with public APIs (controllers, domain entities, events) and internal implementations (services, repositories). Modules communicate via application events rather than direct service calls.

### Database Migrations

Flyway migrations create the complete schema with proper constraints, indexes, and foreign keys:
- V1: users table with email index
- V2: products, product_tags, product_thumbnails with slug, category, active indexes
- V3: orders, order_items with order_number, user_id, created_at indexes
- V4: addresses with user_id index
- V5: promo_codes with code index

### Key Implementation Patterns

- **Password Security**: BCrypt with strength 12
- **JWT Authentication**: 24-hour expiration, stateless, role-based authorization
- **Soft Deletes**: Products and promo codes marked inactive instead of deleted
- **Order Number Generation**: "LUM-{YYYYMMDD}-{XXXX}" format with uniqueness guarantee
- **Default Address Logic**: Exclusive default flag per user with automatic updates
- **Error Handling**: Consistent JSON error responses with field-level validation details
- **Input Validation**: Jakarta Bean Validation annotations on all DTOs
- **CORS Configuration**: Environment-driven allowed origins
- **Profile-Specific Config**: Dev (debug logging, SQL) vs Prod (minimal logging, no stack traces)

### Execution Recommendations

1. **Start with infrastructure** (task 1): Ensure build configuration and dependencies are correct
2. **Implement modules incrementally**: Auth → Product → Promo → Order → Address
3. **Write tests alongside implementation**: Property tests validate correctness, integration tests verify workflows
4. **Use checkpoints** (tasks 8, 16, 22): Verify system state before proceeding
5. **Test with real database**: Use Docker Compose PostgreSQL for development testing
6. **Verify module boundaries**: Run ModulithStructureTest to ensure clean architecture

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1", "2.1", "2.2", "2.3", "2.4", "2.5"] },
    { "id": 1, "tasks": ["3.1", "3.2"] },
    { "id": 2, "tasks": ["3.3", "3.4", "3.5", "4.1"] },
    { "id": 3, "tasks": ["4.2", "4.3", "4.4", "4.5"] },
    { "id": 4, "tasks": ["4.6", "4.7", "4.8"] },
    { "id": 5, "tasks": ["5.1", "5.2", "5.3"] },
    { "id": 6, "tasks": ["5.4", "6.1", "6.2"] },
    { "id": 7, "tasks": ["6.3", "6.4", "6.5", "6.6", "6.7", "6.8"] },
    { "id": 8, "tasks": ["7.1"] },
    { "id": 9, "tasks": ["7.2", "7.3", "7.4"] },
    { "id": 10, "tasks": ["9.1", "9.2"] },
    { "id": 11, "tasks": ["9.3", "9.4", "9.5"] },
    { "id": 12, "tasks": ["10.1", "10.2"] },
    { "id": 13, "tasks": ["11.1", "11.2", "11.3"] },
    { "id": 14, "tasks": ["11.4", "11.5", "11.6"] },
    { "id": 15, "tasks": ["12.1"] },
    { "id": 16, "tasks": ["12.2", "12.3", "12.4", "12.5", "12.6"] },
    { "id": 17, "tasks": ["12.7", "12.8"] },
    { "id": 18, "tasks": ["13.1"] },
    { "id": 19, "tasks": ["13.2", "13.3"] },
    { "id": 20, "tasks": ["14.1", "14.2"] },
    { "id": 21, "tasks": ["14.3", "14.4", "14.5"] },
    { "id": 22, "tasks": ["15.1", "15.2"] },
    { "id": 23, "tasks": ["17.1", "17.2", "17.3", "17.4"] },
    { "id": 24, "tasks": ["18.1", "18.2", "18.3", "18.4"] },
    { "id": 25, "tasks": ["19.1", "19.2", "19.3"] },
    { "id": 26, "tasks": ["20.1", "20.2"] },
    { "id": 27, "tasks": ["21.1", "21.2", "21.3"] }
  ]
}
```

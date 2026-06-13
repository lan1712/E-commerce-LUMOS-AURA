# Lumos Aura — Backend Integration Plan (Spring Boot + PostgreSQL)

## Context

FE React hoàn chỉnh (~100%), toàn bộ dữ liệu đang hardcode (10 sản phẩm, đơn hàng giả, auth giả). Mục tiêu: xây dựng Spring Boot backend + PostgreSQL để thay thế toàn bộ mock data, bật tính năng auth thật, orders thật, và thanh toán thật.

Stack: **Spring Boot 3** · **PostgreSQL** · **JWT Auth** · **JPA/Hibernate** · **Maven**

---

## FE đã xong chưa?

**Khoảng 85% hoàn chỉnh.** Core flow hoạt động tốt, UI đẹp. Còn một số chỗ nhỏ chưa nối:

### ✅ Đã hoàn chỉnh
- 12 trang đầy đủ: Home, Shop, Product Detail, Cart, Checkout, Orders, Account, Sign In, Policies, Contact, About, Gift Collection
- Flow mua hàng hoàn chỉnh: Add to cart → Cart → Checkout → Confirmation
- Navigation: Navbar, Footer, routing qua context

### ⚠️ FE còn thiếu (nhỏ)
| Vấn đề | File | Việc cần làm |
|--------|------|-------------|
| Search icon không hoạt động | `Navbar.tsx:79` | Thêm trang Search hoặc filter ngay trên ShopPage |
| Nút "Read Our Story" không có link | `HomePage.tsx:302` | Nối sang `/about` |
| Tab Wishlist trong Account không làm gì | `AccountSettingsPage.tsx` | Tạo WishlistPage hoặc ẩn tab |
| Tab Addresses trong Account không làm gì | `AccountSettingsPage.tsx` | Tạo AddressesPage hoặc ẩn tab |
| Promo code không có logic | `CartPage.tsx`, `CheckoutPage.tsx` | Cần BE để validate, hoặc hardcode vài mã test |
| "Change password" không làm gì | `AccountSettingsPage.tsx:327` | Cần auth flow |

---

## Backend & Database — Cần làm gì?

Hiện tại **100% static data**, không có backend. Để thành website bán hàng thật sự cần:

### 🔴 Ưu tiên cao (bắt buộc để bán hàng)

#### 1. Authentication (Đăng nhập / Đăng ký)
- **Tool gợi ý:** Supabase Auth
- SignInPage UI đã có, chỉ cần nối API
- Cần: đăng ký, đăng nhập, quên mật khẩu, session persistence
- Ảnh hưởng: `SignInPage.tsx`, `context.tsx`, `AccountSettingsPage.tsx`

#### 2. Database sản phẩm
- **Tool gợi ý:** Supabase PostgreSQL
- Hiện có 10 sản phẩm hardcode trong `data.ts`
- Cần bảng: `products`, `categories`, `product_images`
- Cho phép thêm/sửa/xoá sản phẩm mà không cần sửa code

#### 3. Đơn hàng & Giỏ hàng persistence
- Giỏ hàng hiện mất khi refresh trình duyệt
- Cần bảng: `orders`, `order_items`, `cart_sessions`
- Nối với user account để xem lại lịch sử đơn hàng thật

#### 4. Thanh toán
- **Tool gợi ý:** Stripe
- Checkout UI đã có, chỉ cần nối Stripe Elements
- Cần: tạo PaymentIntent, webhook xác nhận đơn

### 🟡 Ưu tiên trung bình

#### 5. Email thông báo
- **Tool gợi ý:** Resend hoặc SendGrid
- Gửi email xác nhận đơn hàng sau khi checkout thành công
- Gửi email khi đơn được ship

#### 6. Quản lý tồn kho
- Thêm cột `stock_quantity` vào bảng products
- Hiển thị "Còn X sản phẩm" hoặc "Hết hàng" trên ProductDetailPage

#### 7. Promo codes
- Bảng `discount_codes` với % hoặc số tiền giảm
- Validate khi user nhập mã ở Cart/Checkout

### 🟢 Ưu tiên thấp (nice to have)

- Product reviews & ratings
- Wishlist được lưu theo user
- Admin dashboard để quản lý đơn hàng

---

## Đề xuất thứ tự thực hiện

```
1. Hoàn thiện FE còn thiếu (1-2 ngày)
   → Fix các nút chưa nối, Wishlist page, Search

2. Setup Supabase (database + auth) (2-3 ngày)
   → Tạo DB schema, migrate product data, nối Auth

3. Nối Auth vào FE (1-2 ngày)
   → SignInPage hoạt động thật, Account lưu user thật

4. Nối Orders & Cart vào DB (2 ngày)
   → Đơn hàng được lưu, lịch sử đơn hàng thật

5. Tích hợp Stripe (2-3 ngày)
   → Thanh toán thật

6. Email notifications (1 ngày)
   → Xác nhận đơn qua email
```

---

---

## Kế hoạch Backend (Spring Boot + PostgreSQL)

### Cấu trúc thư mục

```
/workspaces/default/
├── code/                          # FE React (hiện tại)
└── backend/                       # NEW — Spring Boot project
    ├── pom.xml
    └── src/main/java/com/lumosaura/
        ├── LumosAuraApplication.java
        ├── config/
        │   ├── SecurityConfig.java        # JWT + CORS config
        │   └── CorsConfig.java
        ├── controller/
        │   ├── AuthController.java        # /api/auth/*
        │   ├── ProductController.java     # /api/products/*
        │   ├── OrderController.java       # /api/orders/*
        │   ├── CartController.java        # /api/cart/*
        │   └── PromoController.java       # /api/promo/*
        ├── service/
        │   ├── AuthService.java
        │   ├── ProductService.java
        │   ├── OrderService.java
        │   └── PromoService.java
        ├── repository/
        │   ├── UserRepository.java
        │   ├── ProductRepository.java
        │   ├── OrderRepository.java
        │   └── PromoCodeRepository.java
        ├── model/
        │   ├── User.java
        │   ├── Product.java
        │   ├── Order.java
        │   ├── OrderItem.java
        │   ├── CartItem.java
        │   └── PromoCode.java
        ├── dto/
        │   ├── LoginRequest.java / RegisterRequest.java
        │   ├── ProductDTO.java
        │   ├── OrderDTO.java / CreateOrderRequest.java
        │   └── PromoValidateRequest.java
        └── security/
            ├── JwtUtil.java
            └── JwtFilter.java
```

---

### Database Schema (PostgreSQL)

```sql
-- Users
CREATE TABLE users (
  id          BIGSERIAL PRIMARY KEY,
  email       VARCHAR(255) UNIQUE NOT NULL,
  password    VARCHAR(255) NOT NULL,         -- BCrypt hashed
  first_name  VARCHAR(100),
  last_name   VARCHAR(100),
  phone       VARCHAR(50),
  role        VARCHAR(20) DEFAULT 'CUSTOMER',
  created_at  TIMESTAMP DEFAULT NOW()
);

-- Products
CREATE TABLE products (
  id          BIGSERIAL PRIMARY KEY,
  slug        VARCHAR(100) UNIQUE NOT NULL,  -- "sandalwood-moonstone"
  name        VARCHAR(255) NOT NULL,
  price       NUMERIC(10,2) NOT NULL,
  category    VARCHAR(100),
  tags        TEXT[],
  scent_notes VARCHAR(500),
  description TEXT,
  details     TEXT,
  burn_time   VARCHAR(50),
  burn_hours  INTEGER,
  size        VARCHAR(100),
  image_url   VARCHAR(500),
  stock       INTEGER DEFAULT 100,
  created_at  TIMESTAMP DEFAULT NOW()
);

-- Orders
CREATE TABLE orders (
  id             BIGSERIAL PRIMARY KEY,
  order_number   VARCHAR(20) UNIQUE NOT NULL,  -- "LA-123456"
  user_id        BIGINT REFERENCES users(id),
  email          VARCHAR(255),                  -- guest checkout
  status         VARCHAR(50) DEFAULT 'PENDING',
  subtotal       NUMERIC(10,2),
  shipping       NUMERIC(10,2),
  tax            NUMERIC(10,2),
  discount       NUMERIC(10,2) DEFAULT 0,
  total          NUMERIC(10,2),
  promo_code     VARCHAR(50),
  -- Shipping address
  ship_name      VARCHAR(200),
  ship_address   VARCHAR(500),
  ship_city      VARCHAR(100),
  ship_state     VARCHAR(100),
  ship_zip       VARCHAR(20),
  ship_country   VARCHAR(100),
  created_at     TIMESTAMP DEFAULT NOW()
);

-- Order Items
CREATE TABLE order_items (
  id          BIGSERIAL PRIMARY KEY,
  order_id    BIGINT REFERENCES orders(id),
  product_id  BIGINT REFERENCES products(id),
  product_name VARCHAR(255),
  price       NUMERIC(10,2),
  quantity    INTEGER
);

-- Promo Codes
CREATE TABLE promo_codes (
  id          BIGSERIAL PRIMARY KEY,
  code        VARCHAR(50) UNIQUE NOT NULL,
  type        VARCHAR(20) NOT NULL,    -- 'PERCENT' | 'FIXED'
  value       NUMERIC(10,2) NOT NULL,
  active      BOOLEAN DEFAULT TRUE,
  expires_at  TIMESTAMP
);

-- Addresses (saved)
CREATE TABLE addresses (
  id          BIGSERIAL PRIMARY KEY,
  user_id     BIGINT REFERENCES users(id),
  label       VARCHAR(100),
  name        VARCHAR(200),
  line1       VARCHAR(300),
  line2       VARCHAR(300),
  city        VARCHAR(100),
  country     VARCHAR(100),
  zip         VARCHAR(20),
  is_default  BOOLEAN DEFAULT FALSE
);
```

---

### REST API Endpoints

| Method | Endpoint | Mô tả | Auth |
|--------|----------|-------|------|
| POST | `/api/auth/register` | Đăng ký tài khoản | Public |
| POST | `/api/auth/login` | Đăng nhập → trả JWT | Public |
| GET | `/api/auth/me` | Thông tin user hiện tại | JWT |
| PUT | `/api/auth/me` | Cập nhật profile | JWT |
| GET | `/api/products` | Danh sách sản phẩm (filter, sort, page) | Public |
| GET | `/api/products/{slug}` | Chi tiết sản phẩm | Public |
| POST | `/api/orders` | Tạo đơn hàng mới | Public (guest OK) |
| GET | `/api/orders` | Lịch sử đơn hàng của user | JWT |
| GET | `/api/orders/{orderNumber}` | Chi tiết đơn hàng | JWT |
| POST | `/api/promo/validate` | Kiểm tra mã giảm giá | Public |
| GET | `/api/addresses` | Danh sách địa chỉ đã lưu | JWT |
| POST | `/api/addresses` | Thêm địa chỉ mới | JWT |
| PUT | `/api/addresses/{id}` | Sửa địa chỉ | JWT |
| DELETE | `/api/addresses/{id}` | Xoá địa chỉ | JWT |

---

### pom.xml dependencies chính

```xml
<dependencies>
  <dependency>spring-boot-starter-web</dependency>
  <dependency>spring-boot-starter-data-jpa</dependency>
  <dependency>spring-boot-starter-security</dependency>
  <dependency>spring-boot-starter-validation</dependency>
  <dependency>postgresql</dependency>
  <dependency>jjwt-api + jjwt-impl + jjwt-jackson</dependency>  <!-- JWT -->
  <dependency>lombok</dependency>
</dependencies>
```

---

### application.properties

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/lumosaura
spring.datasource.username=postgres
spring.datasource.password=YOUR_PASSWORD
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
jwt.secret=YOUR_JWT_SECRET_KEY
jwt.expiration=86400000   # 24 giờ
server.port=8080
```

---

### FE thay đổi cần làm sau khi có BE

1. **`context.tsx`** — thêm `authToken` state, `user` state, `login()`/`logout()` vào NavContext
2. **`data.ts`** — thay hardcode bằng `fetch('/api/products')` trong ShopPage, HomePage
3. **`SignInPage.tsx`** — gọi `POST /api/auth/login` hoặc `/register`, lưu JWT vào localStorage
4. **`CheckoutPage.tsx`** — gọi `POST /api/orders` khi Place Order
5. **`OrdersPage.tsx`** — gọi `GET /api/orders` để lấy đơn thật
6. **`CartPage.tsx`** — gọi `POST /api/promo/validate` thay hardcode
7. **`AddressesPage.tsx`** — gọi CRUD `/api/addresses`
8. Tạo `src/app/api.ts` — file tập trung `BASE_URL` và helper `authFetch()`

---

### Thứ tự thực hiện

```
Phase 1: Setup BE project
  1. Khởi tạo Spring Boot project (Maven, Java 17+)
  2. Setup PostgreSQL + application.properties
  3. Tạo entities + repositories
  4. Data migration: seed 10 products từ data.ts vào DB

Phase 2: API cốt lõi (không cần auth)
  5. GET /api/products + /api/products/{slug}
  6. POST /api/promo/validate
  7. POST /api/orders (guest checkout)

Phase 3: Authentication
  8. POST /api/auth/register + /login
  9. JWT filter + SecurityConfig
  10. GET/PUT /api/auth/me

Phase 4: Secured endpoints
  11. GET /api/orders (user orders)
  12. CRUD /api/addresses

Phase 5: Nối FE vào BE
  13. Tạo src/app/api.ts
  14. Thay hardcode từng trang
  15. Test end-to-end
```

---

### Verification

- `GET /api/products` trả đúng 10 sản phẩm từ DB
- `POST /api/auth/login` trả JWT, FE lưu và gửi kèm Authorization header
- `POST /api/orders` tạo đơn hàng thật trong DB, trả orderNumber
- `POST /api/promo/validate` với code "LUMOS10" trả `{ valid: true, type: "PERCENT", value: 10 }`
- Refresh trang → cart vẫn còn (sau khi thêm localStorage sync)

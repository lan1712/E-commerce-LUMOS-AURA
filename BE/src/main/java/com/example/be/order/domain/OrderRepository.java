package com.example.be.order.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {

    @Query("SELECT o FROM Order o WHERE o.user.email = :email ORDER BY o.createdAt DESC")
    List<Order> findByUserEmailOrderByCreatedAtDesc(@Param("email") String email);

    Optional<Order> findByOrderNumber(String orderNumber);

    @Query("SELECT o FROM Order o WHERE o.orderNumber = :orderNumber AND o.user.email = :email")
    Optional<Order> findByOrderNumberAndUserEmail(@Param("orderNumber") String orderNumber,
                                                   @Param("email") String email);

    @Query("SELECT COUNT(o) FROM Order o WHERE o.createdAt >= :startDate AND o.createdAt < :endDate")
    long countOrdersBetween(@Param("startDate") java.time.LocalDateTime startDate, @Param("endDate") java.time.LocalDateTime endDate);

    @Query("SELECT COALESCE(SUM(o.total), 0) FROM Order o WHERE o.createdAt >= :startDate AND o.createdAt < :endDate")
    java.math.BigDecimal sumRevenueBetween(@Param("startDate") java.time.LocalDateTime startDate, @Param("endDate") java.time.LocalDateTime endDate);

    @Query("SELECT EXTRACT(MONTH FROM o.createdAt) as month, SUM(o.total) as revenue FROM Order o WHERE EXTRACT(YEAR FROM o.createdAt) = :year GROUP BY EXTRACT(MONTH FROM o.createdAt) ORDER BY month")
    List<Object[]> getMonthlyRevenue(@Param("year") int year);

    List<Order> findTop5ByOrderByCreatedAtDesc();

    List<Order> findByStatusAndPaymentMethodAndCreatedAtBefore(String status, String paymentMethod, java.time.LocalDateTime time);
}

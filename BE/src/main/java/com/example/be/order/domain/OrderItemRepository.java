package com.example.be.order.domain;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

    @Query("SELECT oi.productName, SUM(oi.quantity) as totalQty FROM OrderItem oi GROUP BY oi.productName ORDER BY totalQty DESC")
    List<Object[]> findTopSellingProducts(Pageable pageable);
}

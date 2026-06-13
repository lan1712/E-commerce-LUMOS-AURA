package com.lumosaura.repository;

import com.lumosaura.model.Order;
import com.lumosaura.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {
    Optional<Order> findByOrderNumber(String orderNumber);
    List<Order> findByUserOrderByCreatedAtDesc(User user);
    List<Order> findByEmailOrderByCreatedAtDesc(String email);
}

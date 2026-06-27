package com.example.be.address.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface AddressRepository extends JpaRepository<Address, Long> {

    List<Address> findByUserEmailOrderByIsDefaultDescCreatedAtDesc(String email);

    Optional<Address> findByIdAndUserEmail(Long id, String email);

    @Modifying
    @Query("UPDATE Address a SET a.isDefault = false WHERE a.user.email = :email AND a.id <> :excludeId")
    void clearDefaultsExcept(@Param("email") String email, @Param("excludeId") Long excludeId);
}

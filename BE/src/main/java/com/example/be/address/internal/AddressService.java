package com.example.be.address.internal;

import com.example.be.address.api.AddressDTO;
import com.example.be.address.api.AddressRequest;
import com.example.be.address.domain.Address;
import com.example.be.address.domain.AddressRepository;
import com.example.be.auth.domain.User;
import com.example.be.auth.domain.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * CRUD operations for user-owned addresses.
 */
@Service
public class AddressService {

    private final AddressRepository addressRepository;
    private final UserRepository userRepository;

    public AddressService(AddressRepository addressRepository, UserRepository userRepository) {
        this.addressRepository = addressRepository;
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public List<AddressDTO> listAddresses(String userEmail) {
        return addressRepository.findByUserEmailOrderByIsDefaultDescCreatedAtDesc(userEmail)
                .stream().map(this::toDTO).toList();
    }

    @Transactional
    public AddressDTO createAddress(String userEmail, AddressRequest request) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        Address address = new Address();
        address.setUser(user);
        applyRequest(address, request);

        // If this is the new default, clear other defaults
        if (Boolean.TRUE.equals(request.isDefault())) {
            addressRepository.clearDefaultsExcept(userEmail, -1L);
        }

        return toDTO(addressRepository.save(address));
    }

    @Transactional
    public AddressDTO updateAddress(String userEmail, Long id, AddressRequest request) {
        Address address = addressRepository.findByIdAndUserEmail(id, userEmail)
                .orElseThrow(() -> new EntityNotFoundException("Address not found"));

        applyRequest(address, request);

        if (Boolean.TRUE.equals(request.isDefault())) {
            addressRepository.clearDefaultsExcept(userEmail, id);
        }

        return toDTO(addressRepository.save(address));
    }

    @Transactional
    public void deleteAddress(String userEmail, Long id) {
        Address address = addressRepository.findByIdAndUserEmail(id, userEmail)
                .orElseThrow(() -> new EntityNotFoundException("Address not found"));
        addressRepository.delete(address);
    }

    // ── Helpers ───────────────────────────────────────────────────────────────

    private void applyRequest(Address address, AddressRequest request) {
        address.setLabel(request.label());
        address.setName(request.name());
        address.setLine1(request.line1());
        address.setLine2(request.line2());
        address.setCity(request.city());
        address.setCountry(request.country() != null ? request.country() : "US");
        address.setZip(request.zip());
        address.setIsDefault(Boolean.TRUE.equals(request.isDefault()));
    }

    private AddressDTO toDTO(Address a) {
        return new AddressDTO(
                a.getId(),
                a.getLabel(),
                a.getName(),
                a.getLine1(),
                a.getLine2(),
                a.getCity(),
                a.getCountry(),
                a.getZip(),
                a.getIsDefault()
        );
    }
}

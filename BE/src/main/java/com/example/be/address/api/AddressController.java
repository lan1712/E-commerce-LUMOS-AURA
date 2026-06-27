package com.example.be.address.api;

import com.example.be.address.internal.AddressService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

/**
 * REST controller for managing user-owned shipping addresses.
 * All endpoints require JWT authentication.
 */
@RestController
@RequestMapping("/api/addresses")
public class AddressController {

    private final AddressService addressService;

    public AddressController(AddressService addressService) {
        this.addressService = addressService;
    }

    @GetMapping
    public ResponseEntity<List<AddressDTO>> listAddresses(Principal principal) {
        return ResponseEntity.ok(addressService.listAddresses(principal.getName()));
    }

    @PostMapping
    public ResponseEntity<AddressDTO> createAddress(
            Principal principal,
            @Valid @RequestBody AddressRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(addressService.createAddress(principal.getName(), request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AddressDTO> updateAddress(
            Principal principal,
            @PathVariable Long id,
            @Valid @RequestBody AddressRequest request) {
        return ResponseEntity.ok(addressService.updateAddress(principal.getName(), id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAddress(Principal principal, @PathVariable Long id) {
        addressService.deleteAddress(principal.getName(), id);
        return ResponseEntity.noContent().build();
    }
}

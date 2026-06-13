package com.lumosaura.controller;

import com.lumosaura.dto.AddressDTO;
import com.lumosaura.service.AddressService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Map;

@RestController
@RequestMapping("/api/addresses")
@RequiredArgsConstructor
public class AddressController {

    private final AddressService addressService;

    @GetMapping
    public ResponseEntity<?> list(Principal principal) {
        return ResponseEntity.ok(addressService.getAll(principal.getName()));
    }

    @PostMapping
    public ResponseEntity<?> create(Principal principal, @RequestBody AddressDTO dto) {
        return ResponseEntity.ok(addressService.create(principal.getName(), dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(Principal principal, @PathVariable Long id, @RequestBody AddressDTO dto) {
        try {
            return ResponseEntity.ok(addressService.update(principal.getName(), id, dto));
        } catch (RuntimeException e) {
            return ResponseEntity.status(403).body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(Principal principal, @PathVariable Long id) {
        try {
            addressService.delete(principal.getName(), id);
            return ResponseEntity.ok(Map.of("success", true));
        } catch (RuntimeException e) {
            return ResponseEntity.status(403).body(Map.of("error", e.getMessage()));
        }
    }
}

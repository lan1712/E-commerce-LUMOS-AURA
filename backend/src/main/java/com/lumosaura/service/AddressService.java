package com.lumosaura.service;

import com.lumosaura.dto.AddressDTO;
import com.lumosaura.model.Address;
import com.lumosaura.model.User;
import com.lumosaura.repository.AddressRepository;
import com.lumosaura.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AddressService {

    private final AddressRepository addressRepository;
    private final UserRepository userRepository;

    private User getUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public List<AddressDTO> getAll(String email) {
        return addressRepository.findByUser(getUser(email)).stream()
                .map(AddressDTO::from).collect(Collectors.toList());
    }

    @Transactional
    public AddressDTO create(String email, AddressDTO dto) {
        User user = getUser(email);
        if (Boolean.TRUE.equals(dto.getIsDefault())) {
            addressRepository.clearDefaultForUser(user);
        }
        Address address = Address.builder()
                .user(user)
                .label(dto.getLabel())
                .name(dto.getName())
                .line1(dto.getLine1())
                .line2(dto.getLine2())
                .city(dto.getCity())
                .country(dto.getCountry())
                .zip(dto.getZip())
                .isDefault(Boolean.TRUE.equals(dto.getIsDefault()))
                .build();
        return AddressDTO.from(addressRepository.save(address));
    }

    @Transactional
    public AddressDTO update(String email, Long id, AddressDTO dto) {
        User user = getUser(email);
        Address address = addressRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Address not found"));
        if (!address.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Access denied");
        }
        if (Boolean.TRUE.equals(dto.getIsDefault())) {
            addressRepository.clearDefaultForUser(user);
        }
        address.setLabel(dto.getLabel());
        address.setName(dto.getName());
        address.setLine1(dto.getLine1());
        address.setLine2(dto.getLine2());
        address.setCity(dto.getCity());
        address.setCountry(dto.getCountry());
        address.setZip(dto.getZip());
        address.setIsDefault(Boolean.TRUE.equals(dto.getIsDefault()));
        return AddressDTO.from(addressRepository.save(address));
    }

    public void delete(String email, Long id) {
        User user = getUser(email);
        Address address = addressRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Address not found"));
        if (!address.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Access denied");
        }
        addressRepository.delete(address);
    }
}

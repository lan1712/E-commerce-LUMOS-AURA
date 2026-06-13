package com.lumosaura.dto;

import com.lumosaura.model.Address;
import lombok.Data;

@Data
public class AddressDTO {
    private Long id;
    private String label;
    private String name;
    private String line1;
    private String line2;
    private String city;
    private String country;
    private String zip;
    private Boolean isDefault;

    public static AddressDTO from(Address a) {
        AddressDTO dto = new AddressDTO();
        dto.setId(a.getId());
        dto.setLabel(a.getLabel());
        dto.setName(a.getName());
        dto.setLine1(a.getLine1());
        dto.setLine2(a.getLine2());
        dto.setCity(a.getCity());
        dto.setCountry(a.getCountry());
        dto.setZip(a.getZip());
        dto.setIsDefault(a.getIsDefault());
        return dto;
    }
}

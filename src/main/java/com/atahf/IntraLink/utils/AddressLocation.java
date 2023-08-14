package com.atahf.IntraLink.utils;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.StringTokenizer;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AddressLocation {
    private String district;
    private String street;
    private String number;
    private String postalCode;
    private String city;
    private String country;

    public AddressLocation(String addressString) {
        StringTokenizer tokenizer = new StringTokenizer(addressString, ",");

        String[] components = new String[6];
        int index = 0;
        while (tokenizer.hasMoreTokens() && index < 6) {
            components[index++] = tokenizer.nextToken().trim();
        }

        district = (components[0] != null) ? components[0] : "";
        street = (components[1] != null) ? components[1] : "";
        number = (components[2] != null) ? components[2] : "";
        postalCode = (components[3] != null) ? components[3] : "";
        city = (components[4] != null) ? components[4] : "";
        country = (components[5] != null) ? components[5] : "";
    }

    @Override
    public String toString() {
        return district + ", " + street + ", " + number + ", " + postalCode + ", " + city + ", " + country;
    }
}

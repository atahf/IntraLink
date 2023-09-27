package com.atahf.IntraLink.user.UserDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class EditUser {
    private String username;
    private String firstName;
    private String lastName;
    private LocalDate birthdate;
    private String phoneNumber;
    private String address;
}

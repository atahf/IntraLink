package com.atahf.IntraLink.user.UserDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class NewUser {
    private String username;
    private String role;
    private String firstName;
    private String lastName;
    private String email;
    private String department;
    private String title;
    private LocalDate birthdate;
    private String gender;
    private String phoneNumber;
    private String address;
}

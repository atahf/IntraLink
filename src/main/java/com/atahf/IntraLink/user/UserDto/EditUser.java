package com.atahf.IntraLink.user.UserDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class EditUser {
    private String username;
    private String role;
    private String department;
    private String title;
    private String phoneNumber;
    private String address;
}

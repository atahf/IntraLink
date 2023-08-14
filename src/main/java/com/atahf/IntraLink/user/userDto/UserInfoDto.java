package com.atahf.IntraLink.user.userDto;

import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserInfoDto {

    private String firstName;
    private String lastName;
    private String email;
    private String department;
    private String title;
    private Integer age;
    private LocalDate birthdate;
    private String gender;
    private String phoneNumber;
    private String address;
    @Lob
    private byte[] profilePicture;
    private Boolean active;
    private Boolean passwordIsSet;
    private String password;
    private LocalDateTime passwordValid;
    private String permissions;
}

package com.atahf.IntraLink.user.UserDto;

import com.atahf.IntraLink.user.User;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserInfo {
    private String username;
    private String role;
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
    private String profilePicture;

    public UserInfo(User user) {
        this.username = user.getUsername();
        this.role = user.getRole();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.email = user.getEmail();
        this.department = user.getDepartment();
        this.title = user.getTitle();
        this.age = user.getAge();
        this.birthdate = user.getBirthdate();
        this.gender = user.getGender();
        this.phoneNumber = user.getPhoneNumber();
        this.address = user.getAddress();
        this.profilePicture = user.getProfilePicture();
    }
}

package com.atahf.IntraLink.user;

import com.atahf.IntraLink.user.userDto.UserInfoDto;

import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
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

    public User(UserInfoDto userInfoDto) {
        this.firstName = userInfoDto.getFirstName();
        this.lastName = userInfoDto.getLastName();
        this.email = userInfoDto.getEmail();
        this.department = userInfoDto.getDepartment();
        this.title = userInfoDto.getTitle();
        this.age = userInfoDto.getAge();
        this.birthdate = userInfoDto.getBirthdate();
        this.gender = userInfoDto.getGender();
        this.phoneNumber = userInfoDto.getPhoneNumber();
        this.address = userInfoDto.getAddress();
        this.profilePicture = userInfoDto.getProfilePicture();
        this.active = userInfoDto.getActive();
        this.passwordIsSet = userInfoDto.getPasswordIsSet();
        this.password = userInfoDto.getPassword();
        this.passwordValid = userInfoDto.getPasswordValid();
        this.permissions = userInfoDto.getPermissions();
    }
}

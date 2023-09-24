package com.atahf.IntraLink.user.UserDto;

import lombok.Getter;

import java.time.LocalDate;

@Getter
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

    public void setUsername(String username) {
        System.out.println("username setter!");
        this.username = username;
    }

    public void setRole(String role) {
        System.out.println("role setter!");
        this.role = role;
    }

    public void setFirstName(String firstName) {
        System.out.println("firstName setter!");
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        System.out.println("lastName setter!");
        this.lastName = lastName;
    }

    public void setEmail(String email) {
        System.out.println("email setter!");
        this.email = email;
    }

    public void setDepartment(String department) {
        System.out.println("department setter!");
        this.department = department;
    }

    public void setTitle(String title) {
        System.out.println("title setter!");
        this.title = title;
    }

    public void setBirthdate(LocalDate birthdate) {
        System.out.println("birthdate setter!");
        this.birthdate = birthdate;
    }

    public void setGender(String gender) {
        System.out.println("gender setter!");
        this.gender = gender;
    }

    public void setPhoneNumber(String phoneNumber) {
        System.out.println("phoneNumber setter!");
        this.phoneNumber = phoneNumber;
    }

    public void setAddress(String address) {
        System.out.println("address setter!");
        this.address = address;
    }
}

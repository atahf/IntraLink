package com.atahf.IntraLink.user;

import com.atahf.IntraLink.security.UserRole;

import com.atahf.IntraLink.user.UserDto.NewUser;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Collection;

@Entity
@Table(name = "users")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class User implements UserDetails {

    @Id
    private String username;
    private String password;
    private String role;
    private Boolean isAccountNonExpired;
    private Boolean isAccountNonLocked;
    private Boolean isCredentialsNonExpired;
    private Boolean isEnabled;
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
    private LocalDateTime credentialsExpiration;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return UserRole.valueOf(role).getGrantedAuthorities();
    }

    @Override
    public boolean isAccountNonExpired() {
        return isAccountNonExpired;
    }

    @Override
    public boolean isAccountNonLocked() {
        return isAccountNonLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return isCredentialsNonExpired;
    }

    @Override
    public boolean isEnabled() {
        return isEnabled;
    }

    public User(NewUser newUser) {
        this.username = newUser.getUsername();
        this.password = "";
        this.role = newUser.getRole();
        this.isAccountNonExpired = true;
        this.isAccountNonLocked = true;
        this.isCredentialsNonExpired = true;
        this.isEnabled = false;
        this.firstName = getFirstName();
        this.lastName = newUser.getLastName();
        this.email = newUser.getEmail();
        this.department = newUser.getDepartment();
        this.title = newUser.getTitle();
        this.age = (int)ChronoUnit.YEARS.between(newUser.getBirthdate(), LocalDateTime.now());
        this.birthdate = newUser.getBirthdate();
        this.gender = newUser.getGender();
        this.phoneNumber = newUser.getPhoneNumber();
        this.address = newUser.getAddress();
        this.profilePicture = null;
        this.credentialsExpiration = null;
    }
}

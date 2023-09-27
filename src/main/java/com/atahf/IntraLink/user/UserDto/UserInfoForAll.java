package com.atahf.IntraLink.user.UserDto;

import com.atahf.IntraLink.user.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserInfoForAll {
    String username;
    String firstName;
    String lastName;
    String email;

    public UserInfoForAll(User user) {
        this.username = user.getUsername();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.email = user.getEmail();
    }
}

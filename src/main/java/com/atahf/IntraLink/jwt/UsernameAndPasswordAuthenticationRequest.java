package com.atahf.IntraLink.jwt;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UsernameAndPasswordAuthenticationRequest {
    private String username;
    private String password;
}

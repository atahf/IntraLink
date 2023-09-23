package com.atahf.IntraLink.user.ConfirmationToken.ConfirmationTokenDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ConfirmationTokenDto {
    private String mail;
    private String link;
    private String tmpPass;
}

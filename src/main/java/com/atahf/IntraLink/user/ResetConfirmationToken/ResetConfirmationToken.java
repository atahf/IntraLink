package com.atahf.IntraLink.user.ResetConfirmationToken;

import com.atahf.IntraLink.user.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ResetConfirmationToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String token;

    private String tmpPass;

    private LocalDateTime expiresAt;

    private boolean isConfirmed;

    @OneToOne
    @JoinColumn(name = "username")
    private User user;


    public ResetConfirmationToken(User user, String tmpPass){
        this.isConfirmed = false;
        this.expiresAt = LocalDateTime.now().plusMinutes(15);
        this.token = UUID.randomUUID().toString();
        this.tmpPass = tmpPass;
        this.user = user;
    }
}

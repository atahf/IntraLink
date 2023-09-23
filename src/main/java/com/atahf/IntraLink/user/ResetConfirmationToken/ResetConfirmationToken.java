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
    @JoinColumn(name = "user_id")
    private User user;


    public ResetConfirmationToken(User user){
        this.isConfirmed = false;
        this.expiresAt = LocalDateTime.now().plusMinutes(15);
        this.token = UUID.randomUUID().toString();
        String tmp = UUID.randomUUID().toString().replace("-", "");
        this.tmpPass = tmp.substring(0, 9);
        this.user = user;
    }
}

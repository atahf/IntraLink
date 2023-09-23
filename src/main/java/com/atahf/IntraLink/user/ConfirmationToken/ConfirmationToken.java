package com.atahf.IntraLink.user.ConfirmationToken;

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
public class ConfirmationToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String token;

    private LocalDateTime expiresAt;

    private boolean isConfirmed;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;


    public ConfirmationToken(User user){
        this.isConfirmed = false;
        this.expiresAt = LocalDateTime.now().plusMinutes(15);
        this.token = UUID.randomUUID().toString();
        this.user = user;
    }
}

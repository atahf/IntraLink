package com.atahf.IntraLink.user.ConfirmationToken;

import com.atahf.IntraLink.user.User;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;

@Service
public class ConfirmationTokenService {

    private final ConfirmationTokenDao confirmationTokenDao;

    public ConfirmationTokenService(ConfirmationTokenDao confirmationTokenDao) {
        this.confirmationTokenDao = confirmationTokenDao;
    }

    @Transactional
    public void mailConfirmation(String confirmationToken) {
        ConfirmationToken token = confirmationTokenDao.findConfirmationTokenByToken(confirmationToken);

        if(token == null) throw new IllegalStateException("TOKEN NOT FOUND!");
        if(token.isConfirmed()) throw new IllegalStateException("TOKEN ALREADY CONFIRMED!");
        if(token.getExpiresAt().isBefore(LocalDateTime.now())) throw new IllegalStateException("TOKEN EXPIRED!");

        token.setConfirmed(true);
        User user = token.getUser();
        user.setIsEnabled(true);
    }
}

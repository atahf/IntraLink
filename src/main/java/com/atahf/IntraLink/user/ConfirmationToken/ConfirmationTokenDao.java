package com.atahf.IntraLink.user.ConfirmationToken;

import com.atahf.IntraLink.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConfirmationTokenDao extends JpaRepository<ConfirmationToken,Long> {

    ConfirmationToken findConfirmationTokenByToken(String token);

    ConfirmationToken findConfirmationTokenByUser(User user);
}

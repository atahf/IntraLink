package com.atahf.IntraLink.user.ResetConfirmationToken;

import com.atahf.IntraLink.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResetConfirmationTokenDao extends JpaRepository<ResetConfirmationToken,Long> {

    ResetConfirmationToken findConfirmationTokenByToken(String token);

    boolean existsByUser(User user);

    ResetConfirmationToken findResetConfirmationTokenByUser(User user);
}

package com.atahf.IntraLink.message;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageDao extends JpaRepository<Message,Long> {
    @Query(value = "SELECT * FROM messages WHERE (sender = ?1 AND receiver = ?2) OR (sender = ?2 AND receiver = ?1) ORDER BY date", nativeQuery = true)
    List<Message> findAllMessagesBetween(String username1, String username2);
}

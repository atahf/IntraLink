package com.atahf.IntraLink.message;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageDao extends JpaRepository<Message,Long> {

    Message findMessageById(Long id);

    List<Message> findAllByRoomIdOrderBySentDate(Long roomId);

    List<Message> findAllByUsername1AndUsername2(String username1, String username2);
}

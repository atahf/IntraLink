package com.atahf.IntraLink.message;

import com.atahf.IntraLink.user.UserDao;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MessageService {
    private final MessageDao messageDao;
    private final UserDao userDao;

    public MessageService(MessageDao messageDao, UserDao userDao) {
        this.messageDao = messageDao;
        this.userDao = userDao;
    }

    @Transactional
    public void add(String username1, String username2, String body) {
        Message newMsg;
        Long roomId = findRoomId(username1, username2);
        if(roomId == null) {
            newMsg = new Message(username1, username2, body, LocalDateTime.now());
        }
        else{
            newMsg = new Message(roomId, username1, username2, body, LocalDateTime.now());
        }
        messageDao.save(newMsg);
    }

    public Long findRoomId(String username1, String username2) {
        List<Message> roomFinder1 = messageDao.findAllByUsername1AndUsername2(username1, username2);
        if(roomFinder1 != null) {
            return roomFinder1.get(0).getRoomId();
        }

        List<Message> roomFinder2 = messageDao.findAllByUsername1AndUsername2(username2, username1);
        if(roomFinder2 != null) {
            return roomFinder2.get(0).getRoomId();
        }

        return null;
    }

    public List<Message> getAll(Long roomId) {
        return messageDao.findAllByRoomIdOrderBySentDate(roomId);
    }

    public Message get(Long msgId) {
        return messageDao.findMessageById(msgId);
    }
}

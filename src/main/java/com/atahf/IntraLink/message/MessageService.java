package com.atahf.IntraLink.message;

import com.atahf.IntraLink.message.MessageDto.MessageDto;
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
    public void addMessage(MessageDto messageDto) throws Exception {
        if(userDao.findUserByUsername(messageDto.getSender()) == null) throw new Exception("Sender Does Not Exist!");
        if(userDao.findUserByUsername(messageDto.getReceiver()) == null) throw new Exception("Receiver Does Not Exist!");

        Message newMsg = new Message(messageDto);
        messageDao.save(newMsg);
    }

    public List<Message> getAllMessages(String receiver) {
        return messageDao.findAllMessagesBetween(receiver);
    }
}

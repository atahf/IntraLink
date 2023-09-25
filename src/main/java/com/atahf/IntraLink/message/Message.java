package com.atahf.IntraLink.message;

import javax.persistence.*;

import com.atahf.IntraLink.message.MessageDto.MessageDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "messages")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String sender;
    private String receiver;
    private String body;
    private LocalDateTime date;

    public Message(MessageDto messageDto) {
        this.sender = messageDto.getSender();
        this.receiver = messageDto.getReceiver();
        this.body = messageDto.getBody();
        this.date = messageDto.getDate();
    }
}


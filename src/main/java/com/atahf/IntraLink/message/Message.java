package com.atahf.IntraLink.message;

import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "messages")
@Getter
@Setter
@NoArgsConstructor
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roomId;
    private String username1;
    private String username2;
    private String body;
    private LocalDateTime sentDate;

    public Message(String username1, String username2, String body, LocalDateTime sentDate) {
        this.username1 = username1;
        this.username2 = username2;
        this.body = body;
        this.sentDate = sentDate;
    }
    public Message(Long roomId, String username1, String username2, String body, LocalDateTime sentDate) {
        this.roomId = roomId;
        this.username1 = username1;
        this.username2 = username2;
        this.body = body;
        this.sentDate = sentDate;
    }
}


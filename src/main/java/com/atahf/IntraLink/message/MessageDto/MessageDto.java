package com.atahf.IntraLink.message.MessageDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MessageDto {
    private String sender;
    private String receiver;
    private String body;
    private LocalDateTime date;
}

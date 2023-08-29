package com.atahf.IntraLink.ticket.ticketDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class NewTicketDto {
    private String username;
    private String subject;
    private String description;
    private LocalDateTime submission_date;
}

package com.atahf.IntraLink.ticket.ticketDto;

import com.atahf.IntraLink.ticket.Ticket;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TicketDto {
    private String username;
    private String subject;
    private String description;
    private LocalDateTime submission_date;
    private boolean handled;

    public TicketDto(Ticket ticket) {
        this.username = ticket.getUsername();
        this.subject = ticket.getSubject();
        this.description = ticket.getDescription();
        this.submission_date = ticket.getSubmission_date();
        this.handled = ticket.isHandled();
    }
}

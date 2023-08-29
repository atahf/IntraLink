package com.atahf.IntraLink.ticket;

import javax.persistence.*;

import com.atahf.IntraLink.ticket.ticketDto.NewTicketDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "tickets")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String subject;
    private String description;
    private LocalDateTime submission_date;
    private boolean handled;

    public Ticket(NewTicketDto newTicketDto) {
        this.username = newTicketDto.getUsername();
        this.subject = newTicketDto.getSubject();
        this.description = newTicketDto.getDescription();
        this.submission_date = newTicketDto.getSubmission_date();
        this.handled = false;
    }
}

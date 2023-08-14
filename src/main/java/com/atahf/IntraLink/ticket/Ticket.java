package com.atahf.IntraLink.ticket;

import com.atahf.IntraLink.ticket.ticketDto.NewAnonTicketDto;

import jakarta.persistence.*;

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

    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String email;
    private String subject;
    private String description;
    private LocalDateTime submission_date;

    Ticket(NewAnonTicketDto newAnonTicketDto) {
        this.firstName = newAnonTicketDto.getFirstName();
        this.lastName = newAnonTicketDto.getLastName();
        this.phoneNumber = newAnonTicketDto.getPhoneNumber();
        this.email = newAnonTicketDto.getEmail();
        this.subject = newAnonTicketDto.getSubject();
        this.description = newAnonTicketDto.getDescription();
        this.submission_date = newAnonTicketDto.getSubmission_date();
    }
}

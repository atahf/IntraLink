package com.atahf.IntraLink.ticket.ticketDto;

import com.atahf.IntraLink.user.User;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class NewAnonTicketDto {

    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String email;
    private String subject;
    private String description;
    private LocalDateTime submission_date;

    public NewAnonTicketDto(NewTicketDto newTicketDto, User user) {
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.phoneNumber = user.getPhoneNumber();
        this.email = user.getEmail();
        this.subject = newTicketDto.getSubject();
        this.description = newTicketDto.getDescription();
        this.submission_date = newTicketDto.getSubmission_date();
    }
}

package com.atahf.IntraLink.ticket;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TicketDao extends JpaRepository<Ticket,Long> {

    Ticket findTicketById(Long id);

    Ticket findTicketBySubjectAndAndDescriptionAndUsername(String subject, String description, String username);
}
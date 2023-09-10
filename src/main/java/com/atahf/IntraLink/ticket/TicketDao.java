package com.atahf.IntraLink.ticket;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TicketDao extends JpaRepository<Ticket,Long> {

    Ticket findTicketById(Long id);

    List<Ticket> findAllByOrderBySubmission_date();

    Ticket findTicketBySubjectAndAndDescriptionAndUsername(String subject, String description, String username);
}
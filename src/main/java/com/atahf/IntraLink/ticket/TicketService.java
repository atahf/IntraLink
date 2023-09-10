package com.atahf.IntraLink.ticket;

import com.atahf.IntraLink.ticket.ticketDto.NewTicketDto;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class TicketService {

    private final TicketDao ticketDao;

    public TicketService(TicketDao ticketDao) {
        this.ticketDao = ticketDao;
    }

    @Transactional
    public Long addTicket(NewTicketDto newTicketDto) throws Exception {
        Ticket newTicket = new Ticket(newTicketDto);

        Ticket dup = ticketDao.findTicketBySubjectAndAndDescriptionAndUsername(
                newTicket.getSubject(),
                newTicket.getDescription(),
                newTicket.getUsername());
        if(dup != null) throw new Exception("This Ticket Already Exists!");

        ticketDao.save(newTicket);
        return newTicket.getId();
    }

    @Transactional
    public void handleTicket(Long ticketID) throws Exception {
        Ticket ticket = ticketDao.findTicketById(ticketID);

        if(ticket == null) throw new Exception("Ticket Not Found!");

        ticket.setHandled(true);
    }

    @Transactional
    public void removeTicket(Long ticketID) throws Exception {
        Ticket ticket = ticketDao.findTicketById(ticketID);

        if(ticket == null) throw new Exception("Ticket Not Found!");

        ticketDao.delete(ticket);
    }

    public Ticket getTicket(Long ticketID) throws Exception {
        Ticket ticket = ticketDao.findTicketById(ticketID);

        if(ticket == null) throw new Exception("Ticket Not Found!");

        return ticket;
    }

    public List<Ticket> getTickets() throws Exception {
        return ticketDao.findAllByOrderBySubmission_date();
    }

}

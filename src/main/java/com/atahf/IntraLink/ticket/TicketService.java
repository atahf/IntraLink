package com.atahf.IntraLink.ticket;

import com.atahf.IntraLink.ticket.ticketDto.NewTicketDto;

import com.atahf.IntraLink.ticket.ticketDto.TicketDto;
import com.atahf.IntraLink.user.UserDao;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TicketService {

    private final TicketDao ticketDao;
    private final UserDao userDao;

    public TicketService(TicketDao ticketDao, UserDao userDao) {
        this.ticketDao = ticketDao;
        this.userDao = userDao;
    }

    @Transactional
    public void addTicket(NewTicketDto newTicketDto) throws Exception {
        Ticket newTicket = new Ticket(newTicketDto);

        Ticket dup = ticketDao.findTicketBySubjectAndAndDescriptionAndUsername(
                newTicket.getSubject(),
                newTicket.getDescription(),
                newTicket.getUsername());
        if(dup != null) throw new Exception("This Ticket Already Exists!");

        ticketDao.save(newTicket);
    }

    @Transactional
    public void removeTicket(Long ticketID) throws Exception {
        Ticket ticket = ticketDao.findTicketById(ticketID);

        if(ticket == null) throw new Exception("Ticket Not Found!");

        ticketDao.delete(ticket);
    }

    public TicketDto getTicket(Long ticketID) throws Exception {
        Ticket ticket = ticketDao.findTicketById(ticketID);

        if(ticket == null) throw new Exception("Ticket Not Found!");

        return new TicketDto(ticket);
    }

}

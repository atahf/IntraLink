package com.atahf.IntraLink.ticket;

import com.atahf.IntraLink.ticket.ticketDto.NewAnonTicketDto;
import com.atahf.IntraLink.ticket.ticketDto.NewTicketDto;

import com.atahf.IntraLink.user.User;
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
    public void newAnonTicket(NewAnonTicketDto newAnonTicketDto) {
        Ticket newUser = new Ticket(newAnonTicketDto);
        ticketDao.save(newUser);
    }

    @Transactional
    public void newTicket(NewTicketDto newTicketDto) throws Exception {
        User user = userDao.findUserById(newTicketDto.getUserID());

        if(user == null) throw new Exception("User Does Not Exist!");

        NewAnonTicketDto newTicket = new NewAnonTicketDto(newTicketDto, user);
        Ticket newUser = new Ticket(newTicket);
        ticketDao.save(newUser);
    }

    @Transactional
    public void remove_ticket(Long ticketID) throws Exception {
        Ticket ticket = ticketDao.findTicketById(ticketID);

        if(ticket == null) throw new Exception("Ticket Not Found!");

        ticketDao.delete(ticket);
    }

}

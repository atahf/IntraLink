package com.atahf.IntraLink.ticket;

import com.atahf.IntraLink.utils.GeneralHttpResponse;

import com.atahf.IntraLink.ticket.ticketDto.NewAnonTicketDto;
import com.atahf.IntraLink.ticket.ticketDto.NewTicketDto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("api/v1/ticket")
public class TicketController {

    private final TicketService ticketService;

    @Autowired
    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @PostMapping("/anon_ticket")
    public GeneralHttpResponse<String> submitAnonTicket(@RequestBody NewAnonTicketDto newAnonTicketDto) {
        GeneralHttpResponse<String> response = new GeneralHttpResponse<>("200", "Successfully Submitted new Ticket!");
        try {
            ticketService.newAnonTicket(newAnonTicketDto);
        }
        catch (Exception e) {
            response.setStatus("400");
            response.setReturnObject(e.getMessage());
        }
        return response;
    }

    @PostMapping("/ticket")
    public GeneralHttpResponse<String> submitAnonTicket(@RequestBody NewTicketDto newTicketDto) {
        GeneralHttpResponse<String> response = new GeneralHttpResponse<>("200", "Successfully Submitted new Ticket!");
        try {
            ticketService.newTicket(newTicketDto);
        }
        catch (Exception e) {
            response.setStatus("400");
            response.setReturnObject(e.getMessage());
        }
        return response;
    }

    @PostMapping("/rem_ticket")
    public GeneralHttpResponse<String> removeTicket(@RequestBody Long userID) {
        GeneralHttpResponse<String> response = new GeneralHttpResponse<>("200", "Successfully Removed the Ticket!");
        try {
            ticketService.remove_ticket(userID);
        }
        catch (Exception e) {
            response.setStatus("400");
            response.setReturnObject(e.getMessage());
        }
        return response;
    }
}

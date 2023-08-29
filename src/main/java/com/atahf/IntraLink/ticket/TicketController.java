package com.atahf.IntraLink.ticket;

import com.atahf.IntraLink.ticket.ticketDto.TicketDto;
import com.atahf.IntraLink.utils.GeneralHttpResponse;

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

    @GetMapping("{ticketId}")
    public GeneralHttpResponse<TicketDto> getTicket(@PathVariable Long ticketId) {
        GeneralHttpResponse<TicketDto> response = new GeneralHttpResponse<>("200", null);
        try {
            response.setReturnObject(ticketService.getTicket(ticketId));
        }
        catch (Exception e) {
            response.setStatus("400: " + e.getMessage());
        }
        return response;
    }

    @PostMapping("submit")
    public GeneralHttpResponse<String> submitTicket(@RequestBody NewTicketDto newTicketDto) {
        GeneralHttpResponse<String> response = new GeneralHttpResponse<>("200", null);
        try {
            ticketService.addTicket(newTicketDto);
            response.setReturnObject("Successfully Submitted new Ticket!");
        }
        catch (Exception e) {
            response.setStatus("400");
            response.setReturnObject(e.getMessage());
        }
        return response;
    }
}

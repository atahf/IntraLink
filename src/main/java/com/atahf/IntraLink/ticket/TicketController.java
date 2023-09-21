package com.atahf.IntraLink.ticket;

import com.atahf.IntraLink.userLogs.LogService;
import com.atahf.IntraLink.user.UserService;
import com.atahf.IntraLink.utils.GeneralHttpResponse;
import org.springframework.security.core.Authentication;

import com.atahf.IntraLink.ticket.ticketDto.NewTicketDto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("api/v1/ticket")
public class TicketController {

    private final TicketService ticketService;
    private final UserService userService;
    private final LogService logService;

    @Autowired
    public TicketController(TicketService ticketService, UserService userService, LogService logService) {
        this.ticketService = ticketService;
        this.userService = userService;
        this.logService = logService;
    }

    @GetMapping("/all")
    public GeneralHttpResponse<List<Ticket>> getTickets(Authentication authentication) {
        GeneralHttpResponse<List<Ticket>> response = new GeneralHttpResponse<>("200", null);
        try {
            if(!userService.hasPermission(authentication.getName(), "ticket:read")) throw new Exception("User Does Not Have Permission!");

            response.setReturnObject(ticketService.getTickets());
        }
        catch (Exception e) {
            response.setStatus("400: " + e.getMessage());
        }
        return response;
    }

    @GetMapping("{ticketId}")
    public GeneralHttpResponse<Ticket> getTicket(@PathVariable Long ticketId, Authentication authentication) {
        GeneralHttpResponse<Ticket> response = new GeneralHttpResponse<>("200", null);
        try {
            if(!userService.hasPermission(authentication.getName(), "ticket:read")) throw new Exception("User Does Not Have Permission!");

            response.setReturnObject(ticketService.getTicket(ticketId));
        }
        catch (Exception e) {
            response.setStatus("400: " + e.getMessage());
        }
        return response;
    }

    @PostMapping("submit")
    public GeneralHttpResponse<String> submitTicket(@RequestBody NewTicketDto newTicketDto, Authentication authentication) {
        GeneralHttpResponse<String> response = new GeneralHttpResponse<>("200", null);
        try {
            if(!newTicketDto.getUsername().equals(authentication.getName())) throw new Exception("User Not Authenticated!");

            if(!userService.hasPermission(authentication.getName(), "ticket:add")) throw new Exception("User Does Not Have Permission!");

            if(!userService.userExist(newTicketDto.getUsername())) throw new Exception("User Does Not Exist!");

            Long ticketId = ticketService.addTicket(newTicketDto);
            response.setReturnObject("Successfully Submitted new Ticket!");

            logService.addLog(authentication.getName(), "created Ticket with ID of " + ticketId.toString());
        }
        catch (Exception e) {
            response.setStatus("400");
            response.setReturnObject(e.getMessage());
        }
        return response;
    }

    @PostMapping("handle")
    public GeneralHttpResponse<String> handleTicket(@RequestBody Long ticketId, Authentication authentication) {
        GeneralHttpResponse<String> response = new GeneralHttpResponse<>("200", null);
        try {
            if(!userService.hasPermission(authentication.getName(), "ticket:handle")) throw new Exception("User Does Not Have Permission!");

            ticketService.handleTicket(ticketId);
            response.setReturnObject("Successfully Handled Ticket with ID of " + ticketId.toString() + "!");

            logService.addLog(authentication.getName(), "handled Ticket with ID of " + ticketId.toString());
        }
        catch (Exception e) {
            response.setStatus("400");
            response.setReturnObject(e.getMessage());
        }
        return response;
    }

    @PostMapping("remove")
    public GeneralHttpResponse<String> removeTicket(@RequestBody Long ticketId, Authentication authentication) {
        GeneralHttpResponse<String> response = new GeneralHttpResponse<>("200", null);
        try {
            if(!userService.hasPermission(authentication.getName(), "ticket:remove")) throw new Exception("User Does Not Have Permission!");

            ticketService.removeTicket(ticketId);
            response.setReturnObject("Successfully Removed Ticket with ID of " + ticketId.toString() + "!");

            logService.addLog(authentication.getName(), "removed Ticket with ID of " + ticketId.toString());
        }
        catch (Exception e) {
            response.setStatus("400");
            response.setReturnObject(e.getMessage());
        }
        return response;
    }
}

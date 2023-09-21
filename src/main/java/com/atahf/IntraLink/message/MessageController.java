package com.atahf.IntraLink.message;

import com.atahf.IntraLink.ticket.Ticket;
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
@RequestMapping("api/v1/message")
public class MessageController {
    private final MessageService messageService;

    @Autowired
    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @GetMapping("/{username2}")
    public GeneralHttpResponse<List<Message>> getMessages(Authentication authentication, @PathVariable String username2) {
        GeneralHttpResponse<List<Message>> response = new GeneralHttpResponse<>("200", null);
        try {
            Long roomId = messageService.findRoomId(authentication.getName(), username2);

            response.setReturnObject(messageService.getAll(roomId));
        }
        catch (Exception e) {
            response.setStatus("400: " + e.getMessage());
        }
        return response;
    }

    @PostMapping("/{username2}")
    public GeneralHttpResponse<String> sendMessage(Authentication authentication, @PathVariable String username2, @RequestBody String body) {
        GeneralHttpResponse<String> response = new GeneralHttpResponse<>("200", null);
        try {
            messageService.add(authentication.getName(), username2, body);

            response.setReturnObject("Message Successfully Sent!");
        }
        catch (Exception e) {
            response.setStatus("400: " + e.getMessage());
        }
        return response;
    }
}

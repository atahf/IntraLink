package com.atahf.IntraLink.message;

import com.atahf.IntraLink.utils.GeneralHttpResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/message")
public class MessageController {
    private final MessageService messageService;

    @Autowired
    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    // TODO: a function that will send a message and also save that message at DB



    @GetMapping("{username2}")
    public GeneralHttpResponse<List<Message>> getAllMessages(@PathVariable String username2, Authentication authentication) {
        GeneralHttpResponse<List<Message>> response = new GeneralHttpResponse<>("200", null);
        try{
            response.setReturnObject(messageService.getAllMessages(authentication.getName(), username2));
        }
        catch (Exception e) {
            response.setStatus("400: " + e.getMessage());
        }
        return response;
    }
}

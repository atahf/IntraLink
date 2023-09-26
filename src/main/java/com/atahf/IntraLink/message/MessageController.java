package com.atahf.IntraLink.message;

import com.atahf.IntraLink.message.MessageDto.MessageDto;
import com.atahf.IntraLink.rabbitMQ.MessageProducer;
import com.atahf.IntraLink.rabbitMQ.RabbitMQConfig;
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
    private final MessageProducer messageProducer;

    @Autowired
    public MessageController(MessageService messageService, MessageProducer messageProducer) {
        this.messageService = messageService;
        this.messageProducer = messageProducer;
    }

    // TODO: a function that will send a message and also save that message at DB

    @PostMapping("send")
    public GeneralHttpResponse<String> sendMessage(@RequestBody MessageDto messageDto, Authentication authentication) {
        GeneralHttpResponse<String> response = new GeneralHttpResponse<>("200", null);
        try {
            messageService.addMessage(messageDto);

            messageProducer.sendMessage(RabbitMQConfig.DIRECT_EXCHANGE_NAME, RabbitMQConfig.ROUTING_KEY, messageDto);

            response.setReturnObject("Message Successfully Sent!");
        } catch (Exception e) {
            response.setStatus("400");
            response.setReturnObject(e.getMessage());
        }
        return response;
    }

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

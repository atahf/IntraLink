package com.atahf.IntraLink.message;

import com.atahf.IntraLink.message.MessageDto.ChatMessage;

import org.springframework.security.core.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import java.util.List;

@CrossOrigin
@RestController
public class MessageController {
    private final MessageService messageService;
    private final SimpMessagingTemplate messagingTemplate;

    @Autowired
    public MessageController(MessageService messageService, SimpMessagingTemplate messagingTemplate) {
        this.messageService = messageService;
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping("/chat")
    public void sendMessageToUser(ChatMessage message) {
        // Save the message to the database
        messageService.add(message.getUsername1(), message.getUsername2(), message.getBody());

        // Send the message to the user's WebSocket session
        messagingTemplate.convertAndSendToUser(
                message.getUsername2(),
                "/queue/messages",
                message
        );
    }

    @MessageMapping("/history")
    public void sendChatHistory(Authentication authentication, ChatMessage message) {
        Long roomId = messageService.findRoomId(authentication.getName(), message.getUsername2());
        List<Message> chatHistory = messageService.getAll(roomId);

        // Send the chat history to the user's WebSocket session
        messagingTemplate.convertAndSendToUser(
                authentication.getName(),
                "/queue/history",
                chatHistory
        );
    }

    /*@GetMapping("/{username2}")
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
    }*/
}

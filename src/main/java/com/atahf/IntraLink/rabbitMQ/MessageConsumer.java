package com.atahf.IntraLink.rabbitMQ;

import com.atahf.IntraLink.message.MessageDto.MessageDto;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class MessageConsumer {

    @RabbitListener(queues = RabbitMQConfig.QUEUE_NAME)
    public void handleMessage(MessageDto messageDto) {
        // Process the received message
        // You can save it to the database or take any other actions
        System.out.println("A message sent by: " + messageDto.getSender() + " to: " + messageDto.getReceiver() + "\nwith content of: " + messageDto.getBody());
    }
}

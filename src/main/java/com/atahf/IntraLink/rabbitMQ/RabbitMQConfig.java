package com.atahf.IntraLink.rabbitMQ;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {
    public static final String DIRECT_EXCHANGE_NAME = "direct-exchange";
    public static final String QUEUE_NAME = "message-queue";
    public static final String ROUTING_KEY = "message-routing-key";

    @Bean
    public DirectExchange directExchange() {
        return new DirectExchange(DIRECT_EXCHANGE_NAME);
    }

    @Bean
    public Queue messageQueue() {
        return new Queue(QUEUE_NAME);
    }

    @Bean
    public Binding binding() {
        return BindingBuilder.bind(messageQueue()).to(directExchange()).with(ROUTING_KEY);
    }
}

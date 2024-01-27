package com.microservices.minishop.deliveries.controller;

import org.springframework.jms.annotation.JmsListener;
import org.springframework.stereotype.Component;

@Component
public class DeliveryController {

    @JmsListener(destination = "ordersQueue")
    public void receiveOrder(String order) {
        System.out.println("Received Order: " + order);
        System.out.println("Perform delivery for order: " + order);
    }
}

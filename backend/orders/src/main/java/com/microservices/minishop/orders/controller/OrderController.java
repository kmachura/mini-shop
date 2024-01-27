package com.microservices.minishop.orders.controller;

import com.microservices.minishop.orders.model.CheckoutSessionResponse;
import com.microservices.minishop.orders.model.Order;
import com.microservices.minishop.orders.model.OrderItem;
import com.microservices.minishop.orders.service.OrderService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@AllArgsConstructor
@CrossOrigin
public class OrderController {

    private final OrderService service;

    @GetMapping
    public List<Order> getAllOrders() {
        return service.findAll();
    }

    @GetMapping("/all")
    public String getOrders() {
        return "Orders: " + service.findAll().stream().map(Order::getId).toList();
    }

    @PostMapping
    public Order createOrder(@RequestBody Order order) {
        return service.createOrder(order);
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getOrderById(@PathVariable String orderId) {
        return ResponseEntity.ok(service.findOrderById(orderId));
    }

    @PutMapping("/editOrder/{orderId}")
    public ResponseEntity<Order> updateOrder(@PathVariable String orderId, @RequestBody Order order) {
        return ResponseEntity.ok(service.updateOrder(orderId, order));
    }

    @DeleteMapping("/{orderId}")
    public ResponseEntity<HttpStatus> deleteOrder(@PathVariable String orderId) {
        service.deleteOrder(orderId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/get/count")
    public ResponseEntity<Long> getOrderCount() {
        return ResponseEntity.ok(service.getOrderCount());
    }

    @GetMapping("/get/totalsales")
    public ResponseEntity<Long> getTotalSales() {
        return ResponseEntity.ok(service.getTotalSales());
    }

    @PostMapping("/create-checkout-session")
    public ResponseEntity<CheckoutSessionResponse> createOrder(@RequestBody List<OrderItem> orderItems) {
        return ResponseEntity.ok(service.getCheckoutSessionResponse(orderItems));
    }

}


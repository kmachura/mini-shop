package com.microservices.minishop.orders.service;

import com.microservices.minishop.orders.model.CheckoutSessionResponse;
import com.microservices.minishop.orders.model.Order;
import com.microservices.minishop.orders.model.OrderItem;
import com.microservices.minishop.orders.repository.OrderItemRepository;
import com.microservices.minishop.orders.repository.OrderRepository;
import jakarta.jms.ObjectMessage;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.random.RandomGenerator;

@Service
@AllArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final JmsTemplate jmsTemplate;


    public List<Order> findAll() {
        return orderRepository.findAll();
    }

    public Order createOrder(Order order) {
        Order created = orderRepository.save(order);
        placeOrder(created);
        return created;
    }

    public Order findOrderById(String orderId) {
        return orderRepository.findById(orderId).orElseThrow(() -> new EntityNotFoundException("Nie znaleziono takiego zamówienia, id: " + orderId));
    }

    public Order updateOrder(String orderId, Order orderDetails) {
        Order updateOrder = orderRepository.findById(orderId)
                .orElseThrow(() -> new EntityNotFoundException("Nie znaleziono takiego zamówienia, id: " + orderId));

        updateOrder.setShippingAddress1(orderDetails.getShippingAddress1());
        updateOrder.setShippingAddress2(orderDetails.getShippingAddress2());
        updateOrder.setCity(orderDetails.getCity());
        updateOrder.setZip(orderDetails.getZip());
        updateOrder.setCountry(orderDetails.getCountry());
        updateOrder.setPhone(orderDetails.getPhone());
        updateOrder.setStatus(orderDetails.getStatus());
        updateOrder.setTotalPrice(orderDetails.getTotalPrice());
        updateOrder.setUserId(orderDetails.getUserId());
        updateOrder.setDateOrdered(orderDetails.getDateOrdered());
        orderDetails.getOrderItems().stream().forEach(orderItem -> {
            Optional<OrderItem> item = orderItemRepository.findById(orderItem.getId());
            if (item.isPresent()) {
                item.get().setId(orderItem.getId());
                updateOrder.addOrderItem(item.get());
            }
        });

        return orderRepository.save(updateOrder);
    }

    public void deleteOrder(String orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new EntityNotFoundException("Nie znaleziono takiego zamówienia, id: " + orderId));

        orderRepository.delete(order);
    }

    public Long getOrderCount() {
        return orderRepository.count();
    }

    public Long getTotalSales() {
        return orderRepository.findAll().stream().mapToLong(x -> Long.parseLong(x.getTotalPrice())).sum();
    }

    public CheckoutSessionResponse getCheckoutSessionResponse(List<OrderItem> orderItems) {
        String id = String.valueOf(RandomGenerator.getDefault().nextLong());
        CheckoutSessionResponse sessionResponse = new CheckoutSessionResponse();
        sessionResponse.setId(id);
        return sessionResponse;
    }

    public String placeOrder(Order order) {

        jmsTemplate.convertAndSend("ordersQueue", "New Order:" + order.getId());

        return "Order placed successfully!";
    }
}


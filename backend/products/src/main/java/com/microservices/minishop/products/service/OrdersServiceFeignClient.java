package com.microservices.minishop.products.service;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

@FeignClient(name = "orders-api")
public interface OrdersServiceFeignClient {

    @GetMapping("/api/orders/all")
    String getOrders();
}

package com.microservices.minishop.products.controller;

import com.microservices.minishop.products.model.Product;
import com.microservices.minishop.products.service.OrdersServiceFeignClient;
import com.microservices.minishop.products.service.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@AllArgsConstructor
@CrossOrigin
public class ProductController {

    private final ProductService service;
    private final OrdersServiceFeignClient ordersServiceFeignClient;

    @GetMapping
    public List<Product> getAllProducts(@RequestParam(required = false) List<Long> categoryFilters) {
        return service.findAll(categoryFilters);
    }

    @GetMapping("/orders")
    public ResponseEntity<String> getAllOrders() {
        String orders = ordersServiceFeignClient.getOrders();
        return ResponseEntity.ok("Orders: " + orders);
    }


    @PostMapping
    public Product createProduct(@RequestBody Product product) {
        return service.createProduct(product);
    }

    @GetMapping("/{productId}")
    public ResponseEntity<Product> getProductById(@PathVariable String productId) {
        return ResponseEntity.ok(service.findProductById(productId));
    }

    @PutMapping("/editProduct/{productId}")
    public ResponseEntity<Product> updateProduct(@PathVariable String productId, @RequestBody Product productDetails) {
        return ResponseEntity.ok(service.updateProduct(productId, productDetails));
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<HttpStatus> deleteProduct(@PathVariable String productId) {
        service.deleteProduct(productId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/get/count")
    public ResponseEntity<Long> getProductCount() {
        return ResponseEntity.ok(service.getProductCount());
    }

    @GetMapping("/get/featured/{count}")
    public ResponseEntity<List<Product>> getFeaturedProducts(@PathVariable Long count) {
        return ResponseEntity.ok(service.getFeaturedProducts(count));
    }
}


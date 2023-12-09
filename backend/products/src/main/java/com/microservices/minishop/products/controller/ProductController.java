package com.microservices.minishop.products.controller;

import java.util.List;
import java.util.UUID;

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
import org.springframework.web.bind.annotation.RestController;

import com.microservices.minishop.products.model.Product;
import com.microservices.minishop.products.service.ProductService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/products")
@AllArgsConstructor
@CrossOrigin
public class ProductController {

    private final ProductService service;

    @GetMapping
    public List<Product> getAllProducts() {
        return service.findAll();
    }

    @PostMapping
    public Product createProduct(@RequestBody Product product) {
        return service.createProduct(product);
    }

    @GetMapping("/{productId}")
    public ResponseEntity<Product> getProductById(@PathVariable UUID productId) {
        return ResponseEntity.ok(service.findProductById(productId));
    }

    @PutMapping("/editProduct/{productId}")
    public ResponseEntity<Product> updateProduct(@PathVariable UUID productId, @RequestBody Product productDetails) {
        return ResponseEntity.ok(service.updateProduct(productId, productDetails));
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<HttpStatus> deleteProduct(@PathVariable UUID productId) {
        service.deleteProduct(productId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}


package com.microservices.minishop.products.controller;

import com.microservices.minishop.products.model.Category;
import com.microservices.minishop.products.service.CategoryService;
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
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/categories")
@AllArgsConstructor
@CrossOrigin
public class CategoryController {

    private final CategoryService service;

    @GetMapping
    public List<Category> getAllCategories() {
        return service.findAll();
    }

    @PostMapping
    public Category createCategory(@RequestBody Category category) {
        return service.createCategory(category);
    }

    @GetMapping("/{categoryId}")
    public ResponseEntity<Category> getCategoryById(@PathVariable Long categoryId) {
        return ResponseEntity.ok(service.findCategoryById(categoryId));
    }

    @PutMapping("/editCategory/{categoryId}")
    public ResponseEntity<Category> updateCategory(@PathVariable Long categoryId, @RequestBody Category categoryDetails) {
        return ResponseEntity.ok(service.updateCategory(categoryId, categoryDetails));
    }

    @DeleteMapping("/{categoryId}")
    public ResponseEntity<HttpStatus> deleteCategory(@PathVariable Long categoryId) {
        service.deleteCategory(categoryId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}


package com.microservices.minishop.products.service;

import com.microservices.minishop.products.model.Category;
import com.microservices.minishop.products.model.Product;
import com.microservices.minishop.products.repository.CategoryRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@Service
@AllArgsConstructor
public class CategoryService {

    private final CategoryRepository repository;

    public List<Category> findAll() {
        return repository.findAll();
    }

    public Category createCategory(Category category) {
        return repository.save(category);
    }

    public Category findCategoryById(UUID categoryId) {
        return repository.findById(categoryId).orElseThrow(() -> new EntityNotFoundException("Nie znaleziono takiej kategorii, uuid: " + categoryId));
    }

    public Category updateCategory(UUID categoryId, Category categoryDetails) {
        Category updateCategory = repository.findById(categoryId)
                .orElseThrow(() -> new EntityNotFoundException("Nie znaleziono takiej kategorii, uuid: " + categoryId));

        updateCategory.setName(categoryDetails.getName());
        updateCategory.setDescription(categoryDetails.getDescription());
        Set<Product> products = categoryDetails.getProducts();
        products.addAll(categoryDetails.getProducts());
        updateCategory.setProducts(products);

        return repository.save(updateCategory);
    }

    public void deleteCategory(UUID categoryId) {
        Category category = repository.findById(categoryId)
                .orElseThrow(() -> new EntityNotFoundException("Nie znaleziono takiej kategorii, uuid: " + categoryId));

        repository.delete(category);
    }
}

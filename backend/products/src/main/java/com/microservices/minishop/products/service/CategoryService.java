package com.microservices.minishop.products.service;

import com.microservices.minishop.products.model.Category;
import com.microservices.minishop.products.model.Product;
import com.microservices.minishop.products.repository.CategoryRepository;
import com.microservices.minishop.products.repository.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@Service
@AllArgsConstructor
public class CategoryService {

    private final CategoryRepository repository;
    private final ProductRepository productRepository;

    public List<Category> findAll() {
        return repository.findAll();
    }

    public Category createCategory(Category category) {
        return repository.save(category);
    }

    public Category findCategoryById(Long categoryId) {
        return repository.findById(categoryId).orElseThrow(() -> new EntityNotFoundException("Nie znaleziono takiej kategorii, id: " + categoryId));
    }

    public Category updateCategory(Long categoryId, Category categoryDetails) {
        Category updateCategory = repository.findById(categoryId)
                .orElseThrow(() -> new EntityNotFoundException("Nie znaleziono takiej kategorii, id: " + categoryId));

        updateCategory.setName(categoryDetails.getName());
        updateCategory.setDescription(categoryDetails.getDescription());
        updateCategory.setSelected(categoryDetails.getSelected());
        categoryDetails.getProducts().stream().forEach(product -> {
            Optional<Product> productOpt = productRepository.findById(product.getId());
            if (productOpt.isPresent()) {
                productOpt.get().setId(product.getId());
                updateCategory.addProduct(productOpt.get());
            }
        });

        return repository.save(updateCategory);
    }

    public void deleteCategory(Long categoryId) {
        Category category = repository.findById(categoryId)
                .orElseThrow(() -> new EntityNotFoundException("Nie znaleziono takiej kategorii, id: " + categoryId));

        repository.delete(category);
    }
}

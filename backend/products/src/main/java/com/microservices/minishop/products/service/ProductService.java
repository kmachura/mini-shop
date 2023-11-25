package com.microservices.minishop.products.service;

import com.microservices.minishop.products.model.Category;
import com.microservices.minishop.products.model.Product;
import com.microservices.minishop.products.repository.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@Service
@AllArgsConstructor
public class ProductService {

    private final ProductRepository repository;

    public List<Product> findAll() {
        return repository.findAll();
    }

    public Product createProduct(Product product) {
        return repository.save(product);
    }

    public Product findProductById(UUID productId) {
        return repository.findById(productId).orElseThrow(() -> new EntityNotFoundException("Nie znaleziono takiej kategorii, uuid: " + productId));
    }

    public Product updateProduct(UUID productId, Product productDetails) {
        Product updateProduct = repository.findById(productId)
                .orElseThrow(() -> new EntityNotFoundException("Nie znaleziono takiej kategorii, uuid: " + productId));

        updateProduct.setName(productDetails.getName());
        updateProduct.setDescription(productDetails.getDescription());
        updateProduct.setPrice(productDetails.getPrice());
        Set<Category> categories = updateProduct.getCategories();
        categories.addAll(productDetails.getCategories());
        updateProduct.setCategories(categories);

        return repository.save(updateProduct);
    }

    public void deleteProduct(UUID productId) {
        Product product = repository.findById(productId)
                .orElseThrow(() -> new EntityNotFoundException("Nie znaleziono takiej kategorii, uuid: " + productId));

        repository.delete(product);
    }
}

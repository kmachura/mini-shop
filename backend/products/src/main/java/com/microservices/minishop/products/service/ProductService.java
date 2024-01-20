package com.microservices.minishop.products.service;

import com.microservices.minishop.products.model.Category;
import com.microservices.minishop.products.model.Product;
import com.microservices.minishop.products.repository.CategoryRepository;
import com.microservices.minishop.products.repository.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;

@Service
@AllArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public List<Product> findAll(List<Long> categoryFilters) {
        List<Product> allProducts = productRepository.findAll();
        if (Objects.isNull(categoryFilters)) {
            return allProducts;
        } else {
            List<Product> filteredProducts = new ArrayList<>();
            for (long categoryId : categoryFilters) {
                Optional<Category> filteredOpt = categoryRepository.findById(categoryId);
                filteredOpt.ifPresent(category -> filteredProducts.addAll(category.getProducts()));
            }

            if (filteredProducts.isEmpty()) {
                throw new EntityNotFoundException("Nie znaleziono takich produktów pasujących do kategorii: " + categoryFilters);
            }

            return filteredProducts;
        }
    }

    public Product createProduct(Product productRequest) {
        Set<Category> forUpdate = new HashSet<>();
        for (Category updateCategory : productRequest.getCategories()) {
            updateCategory = categoryRepository.findById(updateCategory.getId()).orElseThrow(() -> new EntityNotFoundException("Nie znaleziono takiej kategorii"));
            Set<Product> productList = updateCategory.getProducts();
            productList.add(productRequest);
            updateCategory.setProducts(productList);
            forUpdate.add(updateCategory);
        }
        productRequest.setCategories(forUpdate);
        return productRepository.save(productRequest);
    }

    public Product findProductById(String productId) {
        return productRepository.findById(productId).orElseThrow(() -> new EntityNotFoundException("Nie znaleziono takiego produktu, id: " + productId));
    }

    public Product updateProduct(String productId, Product productDetails) {
        Product updateProduct = productRepository.findById(productId)
                .orElseThrow(() -> new EntityNotFoundException("Nie znaleziono takiego produktu, id: " + productId));

        updateProduct.setName(productDetails.getName());
        updateProduct.setDescription(productDetails.getDescription());
        updateProduct.setPrice(productDetails.getPrice());
        productDetails.getCategories().stream().forEach(category -> {
            Optional<Category> cat = categoryRepository.findById(category.getId());
            if (cat.isEmpty()) {
                cat = Optional.of(new Category());
            } else {
                cat.get().setId(category.getId());
                updateProduct.addCategory(cat.get());
            }
        });

        return productRepository.save(updateProduct);
    }

    public void deleteProduct(String productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new EntityNotFoundException("Nie znaleziono takiego produktu, id: " + productId));

        productRepository.delete(product);
    }

    public Long getProductCount() {
        return productRepository.count();
    }

    public List<Product> getFeaturedProducts(Long count) {
        return productRepository.findAllByIsFeatured(Boolean.TRUE).stream().limit(count).toList();
    }
}

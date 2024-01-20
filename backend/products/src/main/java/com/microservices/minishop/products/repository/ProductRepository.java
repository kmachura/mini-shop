package com.microservices.minishop.products.repository;

import com.microservices.minishop.products.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ProductRepository extends JpaRepository<Product, String> {
    List<Product> findByCategoriesId(Long categoryFilter);

    List<Product> findAllByIsFeatured(Boolean aTrue);
}



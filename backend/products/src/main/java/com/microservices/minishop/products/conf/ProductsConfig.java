package com.microservices.minishop.products.conf;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan(basePackages = {"com.microservices.minishop.products"})
public class ProductsConfig {
}

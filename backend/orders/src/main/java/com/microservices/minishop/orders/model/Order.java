package com.microservices.minishop.orders.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name="Orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    @OneToMany(cascade = CascadeType.ALL)
    private Set<OrderItem> orderItems;
    private String shippingAddress1;
    private String shippingAddress2;
    private String city;
    private String zip;
    private String country;
    private String phone;
    private Integer status;
    private String totalPrice;
    private String userId;
    private String dateOrdered;

    public void addOrderItem(OrderItem orderItem) {
        this.orderItems.add(orderItem);
    }

}

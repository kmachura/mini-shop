import { Component, OnInit } from '@angular/core';
import { OrdersService } from '@mini-shop/orders';
import { ProductsService } from '@mini-shop/products';
import { UsersService } from '@mini-shop/users';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'mini-shop-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  statistics = [];
  constructor(
    private userService: UsersService,
    private productService: ProductsService,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.ordersService.getOrdersCount(),
      this.productService.getProductsCount(),
      this.userService.getUsersCount(),
      this.ordersService.getTotalSales()
    ]).subscribe((values) => {
      this.statistics = values;
    });
  }
}

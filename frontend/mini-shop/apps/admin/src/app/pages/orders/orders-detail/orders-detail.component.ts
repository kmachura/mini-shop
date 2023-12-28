import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Order, OrdersService } from '@mini-shop/orders';
import { ORDER_STATUS } from '../order.constants';

@Component({
  selector: 'mini-shop-orders-detail',
  templateUrl: './orders-detail.component.html',
})
export class OrdersDetailComponent implements OnInit {
  order: Order;
  orderStatues = [];
  selectedStatus;

  constructor(private ordersService: OrdersService, private route: ActivatedRoute, private _snackBar: MatSnackBar) {
    this._getOrder();
  }
  ngOnInit(): void {
    this._mapOrderStatus();
    this._getOrder();
  }

  _mapOrderStatus() {
    this.orderStatues = Object.keys(ORDER_STATUS).map(key => {
      return {
        id: key,
        name: ORDER_STATUS[key].name
      }
    });
  }

  _getOrder() {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.ordersService.getOrderById(params.id).subscribe(order => {
          this.order = order;
          this.selectedStatus = order.status;
        })
      }
    })
  }

  onStatusChange(event) {
    this.ordersService.updateOrder({status: event.value.id}, this.order.id).subscribe(() => {
      this._snackBar.open('This order status has been saved.', '', {
        duration: 3000
      })
    });
  }
}

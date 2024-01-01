import { Component, Input, OnInit } from '@angular/core';
import { Subject, take, takeUntil } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'orders-order-summary',
  templateUrl: './order-summary.component.html',
})
export class OrderSummaryComponent implements OnInit {
  @Input() cartItems!: any;

  productsPrice: number = 0;

  totalPrice: number = 0;

  shippingPrice: number = 0;

  endSubs$: Subject<void> = new Subject();

  constructor(private cartService: CartService, private ordersService: OrdersService) {}

  ngOnInit(): void {
    this._getOrderSummary();
  }

  private _getOrderSummary() {
    this.cartService.cart$.pipe(takeUntil(this.endSubs$)).subscribe(cart => {
      this.productsPrice = 0;

      if (cart && cart.items) {
        cart.items.map((item) => {
          if (item.productId)
          this.ordersService.getProductById(item.productId).pipe(take(1)).subscribe((product: any) => {
            this.productsPrice += product.price * item.quantity;
          });
        })
      }
    })
  }


}

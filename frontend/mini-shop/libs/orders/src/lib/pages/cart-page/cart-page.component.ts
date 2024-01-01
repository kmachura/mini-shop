import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem, CartItemDetail } from '../../models/cart';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'orders-cart-page',
  templateUrl: './cart-page.component.html',
})
export class CartPageComponent implements OnInit, OnDestroy {

  cartItems: CartItemDetail[] = [];

  endSubs$: Subject<void> = new Subject();
  item: any;

  constructor(private cartService: CartService, private ordersService: OrdersService) {}
  ngOnDestroy(): void {
    this.endSubs$.next();
    this.endSubs$.complete();
  }

  ngOnInit() {
    this._getCartDetails();
  }

  private _getCartDetails() {
    this.cartService.cart$.pipe().subscribe(cart => {
      cart.items?.forEach((cartItem: CartItem) => {
        if (cartItem.productId) {
          this.cartItems = [];

          this.ordersService.getProductById(cartItem.productId).subscribe(product => {
            this.cartItems.push({
              product: product,
              quantity: cartItem.quantity
            })
          });
        }
      })
    });
  }

  addQuantity(item: any) {
    this.item.quantity++;
  }

  reduceQuantity(item: any) {
    if (this.item.quantity == 1) return;

    this.cartService.setCartItem({
      productId: item.product.id,
      quantity: item.quantity
    }, true);
  }

  updateCartItemQuantity(event: any, cartItem: CartItemDetail) {
    if (event.target.value) {
      this.cartService.setCartItem({
        productId: cartItem.product.id,
        quantity: parseInt(event.target.value)
      }, true);
    }
  }

  deleteItemFromCart(cartItem: CartItemDetail) {
    this.cartService.deleteCartItem(cartItem.product.id);
  }
}

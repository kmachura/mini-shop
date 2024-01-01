import { Component, Input } from '@angular/core';
import { CartItem, CartService } from '@mini-shop/orders';
import { Product } from '../../models/product.model';


@Component({
  selector: 'mini-shop-product-item',
  templateUrl: './product-item.component.html',
})
export class ProductItemComponent {
  @Input()
  product!: Product;
  @Input() img = 'https://i.postimg.cc/XqBnTJBL/pink-sweater-front.jpg';

  constructor(private cartService: CartService) { }

  addProductToCart() {
    const cartItem: CartItem = {
      productId: this.product.id,
      quantity: 1,
    };

    this.cartService.setCartItem(cartItem);
  }
}

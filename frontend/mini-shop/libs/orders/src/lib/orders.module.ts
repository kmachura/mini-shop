import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CartService } from './services/cart.service';

@NgModule({
  imports: [CommonModule],
})
export class OrdersModule {
  constructor(cartService: CartService) {
    cartService.initCartLocalStorage();
  }
}

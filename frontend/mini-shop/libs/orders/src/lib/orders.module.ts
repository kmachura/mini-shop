import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@mini-shop/users';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';
import { CartService } from './services/cart.service';

const routes: Routes = [
    {
      path: 'cart',
      component: CartPageComponent
    },
    {
      path: 'checkout',
      canActivate: [AuthGuard],
      component: CheckoutPageComponent
    },
    {
      path: 'success',
      component: ThankYouComponent
    },
];

@NgModule({
  imports: [CommonModule, MatBadgeModule, RouterModule.forChild(routes), ReactiveFormsModule, FormsModule],
  declarations: [
    CartIconComponent,
    CartPageComponent,
    OrderSummaryComponent,
    CheckoutPageComponent,
    ThankYouComponent
  ],
  exports: [
    CartIconComponent,
    CartPageComponent,
    OrderSummaryComponent,
    CheckoutPageComponent,
    ThankYouComponent
  ],
})
export class OrdersModule {
  constructor(cartService: CartService) {
    cartService.initCartLocalStorage();
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../models/cart';

export const CART_KEY = "cart";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart$: BehaviorSubject<Cart> = new BehaviorSubject(this.getCart());

  constructor() { }

  initCartLocalStorage() {
    const cart = this.getCart();

    if (!cart) {
      const initialCart = {
        items: []
      }

      localStorage.setItem(CART_KEY, JSON.stringify(initialCart));
    } else {
      this.cart$.next(cart);
    }
  }

  emptyCart() {
    const initialCart  = {
      items: [],
    };

    localStorage.setItem(CART_KEY, JSON.stringify(initialCart));
    this.cart$.next(initialCart);
  }

  getCart(): Cart {
    return JSON.parse(localStorage.getItem(CART_KEY) || '{ "items": [] }');
  }

  setCartItem(cartItem: CartItem, updateCartItem?: boolean): Cart {
    const cart = this.getCart();

    const cartItemExist = cart.items?.find(item => {
      return item.productId === cartItem.productId
    });

    if (cartItemExist) {
      cart.items?.map(item => {
        console.log(item);
        if (item.productId == cartItem.productId) {

          if (updateCartItem) {
            item.quantity = cartItem.quantity;
          } else {
            item.quantity += cartItem.quantity;
          }
        }
      })
    } else {
      cart.items?.push(cartItem);
    }

    localStorage.setItem(CART_KEY, JSON.stringify(cart));

    this.cart$.next(cart);

    return cart;
  }

  deleteCartItem(productId: string) {
    const cart = this.getCart();

    const newCart = cart.items?.filter(item => item.productId !== productId);

    cart.items = newCart;

    localStorage.setItem(CART_KEY, JSON.stringify(cart));

    this.cart$.next(cart);
  }
}

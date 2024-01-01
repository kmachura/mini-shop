export interface Cart {
  items: CartItem[];
}

export interface CartItem {
  productId?: string;
  quantity: number;
}

export interface CartItemDetail {
  product: any;
  quantity: number;
}

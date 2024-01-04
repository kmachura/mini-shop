import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StripeService } from 'ngx-stripe';
import { Observable, map, switchMap } from 'rxjs';
import { Order } from '../models/order';
import { OrderItem } from '../models/order-item';

interface CheckoutSessionResponse {
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  apiUrl = 'api/orders';
  apiProductsUrl = 'api/products';

  constructor(private http: HttpClient, private stripeService: StripeService) { }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`http://localhost:8083/${this.apiUrl}`);
  }

  getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(`http://localhost:8083/${this.apiUrl}/${id}`);
  }

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`http://localhost:8083/${this.apiUrl}`, order);
  }

  updateOrder(orderStatus: { status: string }, orderId: number): Observable<Order> {
    return this.http.put<Order>(`http://localhost:8083/editOrder/${this.apiUrl}/${orderId}`, orderStatus);
  }

  deleteOrder(id: number) {
    return this.http.delete(`http://localhost:8083/${this.apiUrl}/${id}`);
  }

  getOrdersCount(): Observable<number> {
    return this.http
      .get<number>(`http://localhost:8083/${this.apiUrl}/get/count`)
      .pipe(map((objectValue: any) => objectValue.orderCount));
  }

  getTotalSales(): Observable<number> {
    return this.http
      .get<number>(`http://localhost:8083/${this.apiUrl}/get/totalsales`)
      .pipe(map((objectValue: any) => objectValue.totalsales));
  }
  // todo
  getProductById(id: string): Observable<any> {
    return this.http.get<any>(`http://localhost:8083/${this.apiProductsUrl}/${id}`);
  }


  createCheckoutSession(orderItem: OrderItem[]) {
    return this.http.post<CheckoutSessionResponse>(`${this.apiUrl}/create-checkout-session`, orderItem).pipe(
      switchMap((session) => {
        return this.stripeService.redirectToCheckout({ sessionId: session.id });
      })
    );
  }

  cacheOrderData(order: Order) {
    localStorage.setItem('orderData', JSON.stringify(order));
  }

  getCachedOrderData(): Order {
    const orderDataJson = localStorage.getItem('orderData');

    if (orderDataJson !== null) {
      const orderData = JSON.parse(orderDataJson);
      return orderData;
    }

    return {} as Order;
  }

  removeCachedOrderData() {
    localStorage.removeItem('orderData');
  }
}

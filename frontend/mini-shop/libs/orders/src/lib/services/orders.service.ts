import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  apiUrl = 'api/orders';

  constructor(private http: HttpClient) { }

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
      .get<number>(`${this.apiUrl}/get/count`)
      .pipe(map((objectValue: any) => objectValue.orderCount));
  }

  getTotalSales(): Observable<number> {
    return this.http
      .get<number>(`${this.apiUrl}/get/totalsales`)
      .pipe(map((objectValue: any) => objectValue.totalsales));
  }
}

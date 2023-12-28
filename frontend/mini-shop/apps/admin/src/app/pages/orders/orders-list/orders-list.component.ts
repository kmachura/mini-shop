import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Order, OrdersService } from '@mini-shop/orders';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { DeleteOrderComponent } from '../dialogs/delete-order/delete-order.component';
import { ORDER_STATUS } from '../order.constants';

@Component({
  selector: 'mini-shop-orders-list',
  templateUrl: './orders-list.component.html',
  styles: [`
  :host {
    @apply w-full;
  }
`]
})
export class OrdersListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'user', 'totalPrice', 'dateOrdered', 'status', 'actions'];
  orders$: Observable<Order[]>;
  refreshOrders$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  orderStatus = ORDER_STATUS;

  constructor(private ordersService: OrdersService, private router: Router, private dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.orders$ = this.refreshOrders$.pipe(
      switchMap(() => this.ordersService.getOrders())
    );
  }

  showOrder(id) {
    this.router.navigateByUrl(`orders/${id}`)
  }

  deleteOrder(order: Order) {
    const refDialog = this.dialog.open(DeleteOrderComponent, {
      data: order,
    });

    refDialog.afterClosed().subscribe(() => {
      this.refreshOrders$.next(true);
    });
  }

  getStatusClasses(status: number): string[] {
    const color = ORDER_STATUS[status].color;
    return ['bg-' + color + '-100', 'text-' + color + '-800', 'text-xs', 'font-medium', 'me-2', 'px-2.5', 'py-0.5', 'rounded', 'dark:bg-' + color + '-900', 'dark:text-' + color + '-300'];
  }
}

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Order, OrdersService } from '@mini-shop/orders';

@Component({
  selector: 'mini-shop-delete-order',
  templateUrl: './delete-order.component.html',
})
export class DeleteOrderComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Order,
    private ordersService: OrdersService, private _snackBar: MatSnackBar
  ) {}

  deleteOrder() {
    this.ordersService.deleteOrder(this.data.id).subscribe(() => {
      this._snackBar.open('This order has been deleted.', '', { duration: 3000 });

      this.dialogRef.close();
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

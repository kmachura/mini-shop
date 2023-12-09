import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product, ProductsService } from '@mini-shop/products';

@Component({
  selector: 'mini-shop-delete-product',
  templateUrl: './delete-product.component.html',
})
export class DeleteProductComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product,
    private productsService: ProductsService, private _snackBar: MatSnackBar
  ) {}

  deleteProduct() {
    this.productsService.deleteProduct(this.data.id).subscribe(() => {
      this._snackBar.open('This product has been deleted.', '', { duration: 3000 });

      this.dialogRef.close();
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

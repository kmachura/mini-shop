import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoriesService, Category } from '@mini-shop/products';

@Component({
  selector: 'mini-shop-delete-item',
  templateUrl: './delete-item.component.html',
})
export class DeleteItemComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Category,
    private categoriesService: CategoriesService, private _snackBar: MatSnackBar
  ) {}

  deleteCategory() {
    this.categoriesService.deleteCategory(this.data.id).subscribe(() => {
      this._snackBar.open('This category has been deleted.', '', { duration: 3000 });

      this.dialogRef.close();
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

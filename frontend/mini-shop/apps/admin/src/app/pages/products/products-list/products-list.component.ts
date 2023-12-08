import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Product, ProductsService } from '@mini-shop/products';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { DeleteProductComponent } from '../dialogs/delete-item/delete-product.component';

@Component({
  selector: 'mini-shop-products-list',
  templateUrl: './products-list.component.html',
  styles: [`
    :host {
      @apply w-full;
    }
  `]
})
export class ProductsListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];
  products$: Observable<Product[]>;
  refreshProducts$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);


  constructor(private productsService: ProductsService, private dialog: MatDialog, private router: Router) {
  }

  ngOnInit(): void {
    this.products$ = this.refreshProducts$.pipe(
      switchMap(() => this.productsService.getProducts())
    );
  }

  editProduct(id: number) {
    this.router.navigateByUrl(`products/form/${id}`);
  }

  deleteProduct(product: Product) {
    const refDialog = this.dialog.open(DeleteProductComponent, {
      data: product,
    });

    refDialog.afterClosed().subscribe(() => {
      this.refreshProducts$.next(true);
    });
  }

}

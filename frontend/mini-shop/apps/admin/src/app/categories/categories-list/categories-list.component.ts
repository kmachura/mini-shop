import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CategoriesService, Category } from '@mini-shop/products';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { DeleteItemComponent } from '../../dialogs/delete-item/delete-item.component';


@Component({
  selector: 'mini-shop-categories-list',
  templateUrl: './categories-list.component.html',
  styles: [`
    :host {
      @apply w-full;
    }
  `]
})
export class CategoriesListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];
  categories$: Observable<Category[]>;
  refreshCategories$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);


  constructor(private categoriesService: CategoriesService, private dialog: MatDialog, private router: Router) {
  }

  ngOnInit(): void {
    this.categories$ = this.refreshCategories$.pipe(
      switchMap(() => this.categoriesService.getCategories())
    );
  }

  editCategory(id: number) {
    this.router.navigateByUrl(`categories/form/${id}`);
  }

  deleteCategory(category: Category) {
    const refDialog = this.dialog.open(DeleteItemComponent, {
      data: category,
    });

    refDialog.afterClosed().subscribe(() => {
      this.refreshCategories$.next(true);
    });
  }

}

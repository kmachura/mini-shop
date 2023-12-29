import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Category } from '../../models/category.model';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'mini-shop-categories-banner',
  templateUrl: './categories-banner.component.html',
})
export class CategoriesBannerComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  endSubs$: Subject<void> = new Subject();

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
   this.categoriesService.getCategories().pipe(takeUntil(this.endSubs$)).subscribe((categories: Category[]) => {
    console.log(categories);
    this.categories = categories;
   });
  }

  ngOnDestroy(): void {
    this.endSubs$.next();
    this.endSubs$.complete();
  }
}

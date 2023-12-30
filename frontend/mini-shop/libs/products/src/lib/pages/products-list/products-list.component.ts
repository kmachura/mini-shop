import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Category } from '../../models/category.model';
import { Product } from '../../models/product.model';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'mini-shop-products-list',
  templateUrl: './products-list.component.html',
})
export class ProductsListComponent implements OnInit, OnDestroy {
  products: Product[] | null = [
    {
      id: 1,
      name: 'Product 1',
      price: 49,
      description: 'Desc 1',
      categories: [],
    },
    {
      id: 2,
      name: 'Product 2',
      price: 49,
      description: 'Desc 2',
      categories: [],
    },
    {
      id: 3,
      name: 'Product 3',
      price: 49,
      description: 'Desc 3',
      categories: [],
    },
    {
      id: 4,
      name: 'Product 4',
      price: 49,
      description: 'Desc 4',
      categories: [],
    },
  ];

  categories: Category[] = [];
  endSubs$: Subject<void> = new Subject();
  isCategoryPage: boolean = false;

  constructor(private productsService: ProductsService, private categoriesService: CategoriesService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      params['categoryid'] ? this._getProducts([params['categoryid']]) : this._getProducts();
      params['categoryid'] ? (this.isCategoryPage = true) : (this.isCategoryPage = false);
   });

    this._getCategories();
  }

  private _getProducts(categoriesFilter?: (number|undefined)[]) {
    this.productsService.getProducts(categoriesFilter).pipe(takeUntil(this.endSubs$)).subscribe(products => {
      this.products = products;
    })
  }

  private _getCategories() {
    this.categoriesService.getCategories().pipe(takeUntil(this.endSubs$)).subscribe(categories => {
      this.categories = categories;
      console.log(categories)
    })
  }

  categoryFilter() {
    const selectedCategories = this.categories.filter(category => category.selected).map(category => category.id);

    this._getProducts(selectedCategories);
  }

  ngOnDestroy(): void {
    this.endSubs$.next();
    this.endSubs$.complete();
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'mini-shop-featured-product',
  templateUrl: './featured-product.component.html',
})
export class FeaturedProductComponent implements OnInit, OnDestroy {
  featuredProducts: Product[] | null = [
    {
      id: '1',
      name: 'Product 1',
      price: 49,
      description: 'Desc 1',
      categories: [],
    },
    {
      id: '2',
      name: 'Product 2',
      price: 49,
      description: 'Desc 2',
      categories: [],
    },
    {
      id: '3',
      name: 'Product 3',
      price: 49,
      description: 'Desc 3',
      categories: [],
    },
    {
      id: '4',
      name: 'Product 4',
      price: 49,
      description: 'Desc 4',
      categories: [],
    },
  ];

  endSubs$: Subject<void> = new Subject();

  constructor(private productsService: ProductsService) {

  }
  ngOnInit(): void {
    this.productsService.getFeaturedProducts(4).pipe(takeUntil(this.endSubs$)).subscribe(products => {
      this.featuredProducts = products;
    })
  }

  ngOnDestroy(): void {
    this.endSubs$.next();
    this.endSubs$.complete();
  }
}

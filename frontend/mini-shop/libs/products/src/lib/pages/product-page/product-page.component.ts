import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'mini-shop-product-page',
  templateUrl: './product-page.component.html',
})
export class ProductPageComponent implements OnInit, OnDestroy {
  product!: Product;
  endSubs$: Subject<void> = new Subject();
  rating = 0;
  ratingCount = 5;
  quantity = 1;

  constructor(private productsService: ProductsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['productid']) {
        this._getProduct(params['productid'])
      }
    })
  }

  private _getProduct(_id: number) {
    this.productsService.getProductById(_id).pipe(takeUntil(this.endSubs$)).subscribe((product: Product) => {
      this.product = product;
    });
  }

  getRating() {
    const ratingArray = [];

    for(let i=0; i < this.ratingCount; i++) {
      ratingArray.push((i <= this.rating) ? true : false)
    }

    return ratingArray;
  }

  changeRating(rating: number) {
    this.rating = rating;
  }

  addProductToCart() {

  }

  addQuantity() {
    this.quantity++;
  }

  reduceQuantity() {
    if (this.quantity == 1) return;

    this.quantity--;
  }

  addProductToWishlist() {

  }

  buyNow() {

  }

  ngOnDestroy(): void {
    this.endSubs$.next();
    this.endSubs$.complete();
  }
}

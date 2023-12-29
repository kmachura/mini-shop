import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';
import { ProductsSearchComponent } from './components/products-search/products-search.component';
import { CategoriesService } from './services/categories.service';
import { ProductsService } from './services/products.service';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { FeaturedProductComponent } from './components/featured-product/featured-product.component';

@NgModule({
  providers: [CategoriesService, ProductsService],
  imports: [CommonModule, RouterModule],
  declarations: [
    ProductsSearchComponent,
    CategoriesBannerComponent,
    ProductItemComponent,
    FeaturedProductComponent
  ],
  exports: [
    ProductsSearchComponent,
    CategoriesBannerComponent,
    ProductItemComponent,
    FeaturedProductComponent
  ]
})
export class ProductsModule {}

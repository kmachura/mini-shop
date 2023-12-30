import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';
import { FeaturedProductComponent } from './components/featured-product/featured-product.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { ProductsSearchComponent } from './components/products-search/products-search.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { CategoriesService } from './services/categories.service';
import { ProductsService } from './services/products.service';

const routes: Routes = [
  {
    path: 'products',
    component: ProductsListComponent
  },
  {
    path: 'products/:id',
    component: ProductPageComponent
  },
  {
    path: 'category/:categoryid',
    component: ProductsListComponent
  },
];

@NgModule({
  providers: [CategoriesService, ProductsService],
  imports: [CommonModule, RouterModule.forChild(routes), ReactiveFormsModule, FormsModule],
  declarations: [
    ProductsSearchComponent,
    CategoriesBannerComponent,
    ProductItemComponent,
    FeaturedProductComponent,
    ProductsListComponent,
    ProductPageComponent
  ],
  exports: [
    ProductsSearchComponent,
    CategoriesBannerComponent,
    ProductItemComponent,
    FeaturedProductComponent,
    ProductsListComponent,
    ProductPageComponent
  ]
})
export class ProductsModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProductsSearchComponent } from './components/products-search/products-search.component';
import { CategoriesService } from './services/categories.service';
import { ProductsService } from './services/products.service';

@NgModule({
  providers: [CategoriesService, ProductsService],
  imports: [CommonModule],
  declarations: [
    ProductsSearchComponent
  ],
  exports: [
    ProductsSearchComponent
  ]
})
export class ProductsModule {}

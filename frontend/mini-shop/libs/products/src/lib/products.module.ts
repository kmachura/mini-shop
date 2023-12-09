import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CategoriesService } from './services/categories.service';
import { ProductsService } from './services/products.service';

@NgModule({
  providers: [CategoriesService, ProductsService],
  imports: [CommonModule],
})
export class ProductsModule {}

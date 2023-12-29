import { Component, Input } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'mini-shop-product-item',
  templateUrl: './product-item.component.html',
})
export class ProductItemComponent {
  @Input()
  product!: Product;
  @Input() img = 'https://i.postimg.cc/XqBnTJBL/pink-sweater-front.jpg';
}

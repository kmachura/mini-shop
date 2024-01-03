import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Category, Product, ProductsService } from '@mini-shop/products';
import { shareReplay, timer } from 'rxjs';

@Component({
  selector: 'mini-shop-products-form',
  templateUrl: './products-form.component.html',
  styles: [`
  :host {
    @apply w-full;
  }

  .example-spacer {
  flex: 1 1 auto;
  }
  [multiple] {
    background-color: transparent;
    border-radius: 0;
    border-width: 0;
    padding: auto;
  }
  `]
})
export class ProductsFormComponent {
  form: FormGroup;
  formSubmitted: boolean = false;
  editMode: boolean = false;
  currentProductId: string;
  categories: Category[];
  selectedCategories: Category[] = new Array<Category>();

  constructor(private formBuilder: FormBuilder, private productsService: ProductsService, private categoriesService: CategoriesService, private _snackBar: MatSnackBar, private location: Location, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, Validators.required],
      categories: [[], Validators.required]
    });

    this.categoriesService.getCategories().pipe(shareReplay()).subscribe((categories: Category[]) => {
      this.categories = categories;
    });

    this._checkEditMode();
  }

  saveProduct() {
    this.formSubmitted = true;

    if (this.form.valid) {
      const id = this.form.controls.id;

      const categories = this.form.get('categories')?.value || [];

      const product: Product = {
        ...(id !== null && id !== undefined ? { id: id.value } : {}),
        name: this.form.controls.name.value,
        description: this.form.controls.description.value,
        price: this.form.controls.price.value,
        categories: categories
      }


      if (this.editMode) {
        this._updateProduct(product);
      } else {
        this._createProduct(product);
      }
    } else {
      this._snackBar.open('Invalid form.', '', {
        duration: 3000
      });
    }
  }

  private _createProduct(product: Product) {
    this.productsService.createProduct(product).subscribe(() => {
      this._snackBar.open('This product has been saved.', '', {
        duration: 3000
      });

      timer(4000).toPromise().then(() => {
        this.location.back();
      });
    });
  }

  private _updateProduct(product: Product) {
    this.productsService.updateProduct(product, this.currentProductId).subscribe(() => {
      this._snackBar.open('This product has been updated.', '', {
        duration: 3000
      });

      timer(4000).toPromise().then(() => {
        this.location.back();
      });
    });
  }

  private _checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.editMode = true;
        this.currentProductId = params.id;
        this.productsService.getProductById(params.id).subscribe((product) => {
          this.productForm.name.setValue(product.name);
          this.productForm.description.setValue(product.description);
          this.productForm.price.setValue(product.price);
          this.productForm.categories.setValue(product.categories);
        })
      }
    });
  }

  get productForm() {
    return this.form.controls;
  }
}

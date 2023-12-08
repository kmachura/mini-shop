import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Category, Product, ProductsService } from '@mini-shop/products';
import { Observable, map, startWith, timer } from 'rxjs';

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
  currentProductId: number;
  categories: Category[];
  selectedCategories: Category[] = new Array<Category>();

  filteredCategories: Observable<Category[]>;
  lastFilter: string = '';

  constructor(private formBuilder: FormBuilder, private productsService: ProductsService, private categoriesService: CategoriesService, private _snackBar: MatSnackBar, private location: Location, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, Validators.required],
      categories: [[], Validators.required]
    });

    this.categoriesService.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories;

      this.filteredCategories = this.form.get('categories').valueChanges.pipe(
        startWith<string | Category[]>(''),
        map(value => typeof value === 'string' ? value : this.lastFilter),
        map(filter => this.filter(filter))
      );
    });

    this._checkEditMode();
  }

  filter(filter: string): Category[] {
    this.lastFilter = filter;
    if (filter) {
      return this.categories.filter(option => {
        return option.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0;
      })
    } else {
      return this.categories.slice();
    }
  }

  displayFn(value: Category[] | string): string | undefined {
    let displayValue: string;
    if (Array.isArray(value)) {
      value.forEach((user, index) => {
        if (index === 0) {
          displayValue = user.name;
        } else {
          displayValue += ', ' + user.name;
        }
      });
    } else {
      displayValue = value;
    }
    return displayValue;
  }

  optionClicked(event: Event, category: Category) {
    event.stopPropagation();
    this.toggleSelection(category);
  }

  toggleSelection(category) {
    console.log(category.selected);
    if (category.selected === undefined) category.selected = false;

    category.selected = !category.selected;
    if (category.selected) {
      this.selectedCategories.push(category);
    } else {
      const i = this.selectedCategories.findIndex(value => value.name === category.name);
      console.log('fdfsdfd', i);
      this.selectedCategories.splice(i, 1);
    }

    this.form.get('categories').setValue(this.selectedCategories);
    console.log(this.form.get('categories'))
  }

  saveProduct() {
    this.formSubmitted = true;

    if (this.form.valid) {
      const product: Product = {
        id: null,
        name: this.form.controls.name.value,
        description: this.form.controls.description.value,
        price: this.form.controls.price.value,
        categories: []
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
        })
      }
    });
  }

  get productForm() {
    return this.form.controls;
  }
}

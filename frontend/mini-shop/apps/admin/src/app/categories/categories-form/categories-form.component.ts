import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Category } from '@mini-shop/products';
import { timer } from 'rxjs';

@Component({
  selector: 'mini-shop-categories-form',
  templateUrl: './categories-form.component.html',
  styles: [`
  :host {
    @apply w-full;
  }

  .example-spacer {
    flex: 1 1 auto;
  }`]
})
export class CategoriesFormComponent implements OnInit {
  form: FormGroup;
  formSubmitted: boolean = false;
  editMode: boolean = false;
  currentCategoryId: number;

  constructor(private formBuilder: FormBuilder, private categoriesService: CategoriesService, private _snackBar: MatSnackBar, private location: Location, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });

    this._checkEditMode();
  }

  saveCategory() {
    this.formSubmitted = true;

    if (this.form.valid) {
      const id = this.form.controls.id;

      const category: Category = {
        ...(id !== null && id !== undefined ? { id: id.value } : {}),
        name: this.form.controls.name.value,
        description: this.form.controls.description.value,
        products: []
      }

      if (this.editMode) {
        this._updateCategory(category);
      } else {
        this._createCategory(category);
      }
    } else {
      this._snackBar.open('Invalid form.', '', {
        duration: 3000
      });
    }
  }

  private _createCategory(category: Category) {
    this.categoriesService.createCategory(category).subscribe(() => {
      this._snackBar.open('This category has been saved.', '', {
        duration: 3000
      });

      timer(4000).toPromise().then(() => {
        this.location.back();
      });
    });
  }

  private _updateCategory(category: Category) {
    this.categoriesService.updateCategory(category, this.currentCategoryId).subscribe(() => {
      this._snackBar.open('This category has been updated.', '', {
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
        this.currentCategoryId = params.id;
        this.categoriesService.getCategoryById(params.id).subscribe((category) => {
          this.categoryForm.name.setValue(category.name);
          this.categoryForm.description.setValue(category.description);
        })
      }
    });
  }

  get categoryForm() {
    return this.form.controls;
  }
}

import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { User, UsersService } from '@mini-shop/users';
import * as countriesLib from 'i18n-iso-countries';
import { Observable, map, startWith, timer } from 'rxjs';

declare const require;

@Component({
  selector: 'mini-shop-users-form',
  templateUrl: './users-form.component.html',
  styles: [`
  :host {
    @apply w-full;
  }

  .example-spacer {
  flex: 1 1 auto;
  }`]
})
export class UsersFormComponent implements OnInit {
  form: FormGroup;
  formSubmitted: boolean = false;
  editMode: boolean = false;
  currentUserId: string;
  filteredCountriesOptions: Observable<{ id: string; name: string; }[]>;
  countries = [];

  constructor(private formBuilder: FormBuilder, private usersService: UsersService, private _snackBar: MatSnackBar, private location: Location, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this._getCountries();

    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      gender: ['male', Validators.required],
      isAdmin: [false],
      password: ['', [Validators.required]],
      address: this.formBuilder.group({
        street: [''],
        apartment: [''],
        postalCode: ['', Validators.pattern(/^[0-9]{2}(-)?[0-9]{3}$/)],
        city: [''],
        country: [{}],
      }),
      phone: [null, [Validators.required, Validators.pattern(/^[0-9]{9}$/)]]
    });

    console.log(this.form)
    this.filteredCountriesOptions = this.form.get('address').get('country').valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.countries.slice();
      }),
    );

    this._checkEditMode();
  }

  private _getCountries() {
    countriesLib.registerLocale(require("i18n-iso-countries/langs/en.json"))

    this.countries = Object.entries(countriesLib.getNames("en", {select: "official"})).map(entry => {
      return {
        id: entry[0],
        name: entry[1]
      }
    });
  }

  displayFn(country): string {
    return country && country.name ? country.name : '';
  }

  private _filter(name: string) {
    const filterValue = name.toLowerCase();

    return this.countries.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  saveUser() {
    this.formSubmitted = true;

    if (this.form.valid) {
      const user: User = {
        id: this.form.controls.id.value ?? null,
        username: this.form.controls.username.value,
        firstName: this.form.controls.firstName.value,
        lastName: this.form.controls.lastName.value,
        email: this.form.controls.email.value,
        gender: this.form.controls.gender.value,
        roles: this.form.controls.isAdmin.value ? [{id: '0', role: 'admin'}, {id:'1', role: 'client'}]: [{id:'1', role: 'client'}],
        password: this.form.controls.password.value,
        phone: this.form.controls.phone.value,
        address: this.form.controls.address.value ?? {}
      }

      if (this.editMode) {
        this._updateUser(user);
      } else {
        this._createUser(user);
      }
    } else {
      this._snackBar.open('Invalid form.', '', {
        duration: 3000
      });
    }
  }

  private _createUser(user: User) {
    this.usersService.createUser(user).subscribe(() => {
      this._snackBar.open('This user has been saved.', '', {
        duration: 3000
      });

      timer(4000).toPromise().then(() => {
        this.location.back();
      });
    });
  }

  private _updateUser(user: User) {
    this.usersService.updateUser(user, this.currentUserId).subscribe(() => {
      this._snackBar.open('This user has been updated.', '', {
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
        this.currentUserId = params.id;
        this.usersService.getUserById(params.id).subscribe((user) => {
          this.userForm.username.setValue(user.username);
          this.userForm.firstName.setValue(user.firstName);
          this.userForm.lastName.setValue(user.lastName);
          this.userForm.email.setValue(user.email);
          this.userForm.gender.setValue(user.gender);
          this.userForm.roles.setValue(user.roles);

          this.userForm.password.setValidators([]);
          this.userForm.password.updateValueAndValidity();
        })
      }
    });
  }

  get userForm() {
    return this.form.controls;
  }
}

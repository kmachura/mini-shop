import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '@mini-shop/users';
import * as countriesLib from 'i18n-iso-countries';
import { Observable, Subject, map, of, startWith, takeUntil } from 'rxjs';
import { Cart } from '../../models/cart';
import { Order } from '../../models/order';
import { OrderItem } from '../../models/order-item';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';

declare const require: any;

@Component({
  selector: 'orders-checkout-page',
  templateUrl: './checkout-page.component.html',
})
export class CheckoutPageComponent implements OnInit, OnDestroy {
  checkoutFormGroup!: FormGroup;
  isSubmitted = false;
  orderItems: OrderItem[] = [];
  userId!: string | undefined;
  countries!: { id: string; name: string; }[];
  filteredCountriesOptions!: Observable<{ id: string; name: string; }[]>;
  endSubs$: Subject<void> = new Subject();
  constructor(private formBuilder: FormBuilder, private cartService: CartService, private ordersService: OrdersService, private router: Router, private usersService: UsersService) {}

  ngOnInit() {
    this._initCheckoutForm();
    // this._autoFillUserData();
    this._getCartItems();
    this._getCountries();

    this.filteredCountriesOptions = this.checkoutFormGroup?.get('address')?.get('country')?.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.countries.slice();
      }),
    ) || of([]);
  }

  private _autoFillUserData() {
    this.usersService.observeCurrentUser().pipe(takeUntil(this.endSubs$)).subscribe((user) => {
      if (user) {
        this.userId = user.id;
        this.checkoutForm['firstName'].setValue(user?.firstName);
        this.checkoutForm['lastName'].setValue(user?.lastName);
        this.checkoutFormGroup.get('address')?.get('postalCode')?.setValue(user.address?.postalCode);
        this.checkoutForm['phone'].setValue(user?.phone);
        this.checkoutFormGroup.get('address')?.get('city')?.setValue(user.address?.city);
        this.checkoutFormGroup.get('address')?.get('country')?.setValue(user.address?.country);
      }
    });
  }

  private _getCartItems() {
    const cart: Cart = this.cartService.getCart();

    this.orderItems = cart.items.map(item => {
      return {
        product: item.productId,
        quantity: item.quantity
      }
    })
  }

  private _initCheckoutForm() {
    this.checkoutFormGroup = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      address: this.formBuilder.group({
        street: ['', Validators.required],
        postalCode: ['', [Validators.required, Validators.pattern(/^[0-9]{2}(-)?[0-9]{3}$/)]],
        city: ['', Validators.required],
        country: [{}, Validators.required],
        state: ['', Validators.required],
      }),
      cardNumber: ['', Validators.required],
      cardExpiry: ['', Validators.required],
      phone: [null, [Validators.required, Validators.pattern(/^[0-9]{9}$/)]]
    })
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

  displayFn(country: any): string {
    return country && country.name ? country.name : '';
  }

  private _filter(name: string) {
    const filterValue = name.toLowerCase();

    return this.countries.filter((option: any) => option.name.toLowerCase().includes(filterValue));
  }

  placeOrder() {
    this.isSubmitted = true;

    if(this.checkoutFormGroup.invalid) return;


    const order: Order = {
      orderItems: this.orderItems,
      shippingAddress1: this.checkoutFormGroup.get('address')?.get('street')?.value,
      city: this.checkoutFormGroup.get('address')?.get('city')?.value,
      zip: this.checkoutFormGroup.get('address')?.get('postalCode')?.value,
      country: this.checkoutFormGroup.get('address')?.get('country')?.value,
      phone: this.checkoutFormGroup.get('phone')?.value,
      user: this.userId,
      status: 0,
      dateOrdered: `${Date.now()}`
    };

    this.ordersService.createOrder(order).subscribe(() => {
      this.router.navigate(['/success']);
      this.cartService.emptyCart();
    }, () => {
      // TODO display error
    })
  }

  get checkoutForm() {
    return this.checkoutFormGroup.controls;
  }

  ngOnDestroy(): void {
    this.endSubs$.next();
    this.endSubs$.complete();
  }
}

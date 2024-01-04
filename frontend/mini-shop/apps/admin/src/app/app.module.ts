import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { CategoriesService, ProductsModule } from '@mini-shop/products';
import { JwtInterceptor, UsersModule } from '@mini-shop/users';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgxStripeModule } from 'ngx-stripe';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { CategoriesFormComponent } from './categories/categories-form/categories-form.component';
import { CategoriesListComponent } from './categories/categories-list/categories-list.component';
import { DeleteItemComponent } from './dialogs/delete-item/delete-item.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { OrdersDetailComponent } from './pages/orders/orders-detail/orders-detail.component';
import { OrdersListComponent } from './pages/orders/orders-list/orders-list.component';
import { DeleteProductComponent } from './pages/products/dialogs/delete-item/delete-product.component';
import { ProductsFormComponent } from './pages/products/products-form/products-form.component';
import { ProductsListComponent } from './pages/products/products-list/products-list.component';
import { DeleteUserComponent } from './pages/users/dialogs/delete-user/delete-user.component';
import { UsersFormComponent } from './pages/users/users-form/users-form.component';
import { UsersListComponent } from './pages/users/users-list/users-list.component';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    SidebarComponent,
    ShellComponent,
    DashboardComponent,
    CategoriesFormComponent,
    DeleteItemComponent,
    DeleteProductComponent,
    CategoriesListComponent,
    ProductsListComponent,
    ProductsFormComponent,
    UsersListComponent,
    UsersFormComponent,
    DeleteUserComponent,
    OrdersListComponent,
    OrdersDetailComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    UsersModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatTableModule,
    ProductsModule,
    HttpClientModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatListModule,
    MatSelectModule,
    MatFormFieldModule,
    MatRadioModule,
    MatCheckboxModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    NgxStripeModule.forRoot('pk_test_51OUWVMAGcWmmOfbaDlK4bcnEtB6c4hipQQH79Qcet64nXjhmD9jZKGmvdJudhavdQTeZQWSHyQPh1FREDM4FfheA00WjFfTmQC'),
  ],
  providers: [CategoriesService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

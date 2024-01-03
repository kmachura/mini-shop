import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  apiUrl = 'http://localhost:8083/api/products';

  constructor(private http: HttpClient) { }

  getProducts(categoriesFilter?: (number|undefined)[]): Observable<Product[]> {
    let params = new HttpParams();

    if (categoriesFilter) {
      params = params.append('categories', categoriesFilter.join(','));
    }

    return this.http.get<Product[]>(`${this.apiUrl}`, { params });
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}`, product);
  }

  updateProduct(product: Product, id: string): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/editProduct/${id}`, product);
  }

  deleteProduct(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getProductsCount(): Observable<number> {
    return this.http
      .get<number>(`${this.apiUrl}/get/count`)
      .pipe(map((objectValue: any) => objectValue.productCount));
  }

  getFeaturedProducts(count: number): Observable<Product[]> {
    return this.http
      .get<Product[]>(`${this.apiUrl}/get/featured/${count}/`);
  }
}

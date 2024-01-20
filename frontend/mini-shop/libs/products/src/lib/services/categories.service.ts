import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  apiUrl = 'api/categories';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`http://localhost:8083/${this.apiUrl}`);
  }

  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`http://localhost:8083/${this.apiUrl}/${id}`);
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`http://localhost:8083/${this.apiUrl}`, category);
  }

  updateCategory(category: Category, id: number): Observable<Category> {
    return this.http.put<Category>(`http://localhost:8083/${this.apiUrl}/editCategory/${id}`, category);
  }

  deleteCategory(id: number) {
    return this.http.delete(`http://localhost:8083/${this.apiUrl}/${id}`);
  }
}

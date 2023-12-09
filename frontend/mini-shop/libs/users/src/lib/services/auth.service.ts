import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = 'http://localhost:8084/api/users'
  constructor(private http: HttpClient, private token: LocalstorageService, private router: Router) { }

  //zwraca na endpoincie users/login - user: 'email' i token

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, { email, password})
  }

  logout() {
    this.token.removeToken();
    this.router.navigate(['/login']);
  }
}

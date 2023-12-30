import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
const TOKEN = 'jwtToken';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  setToken(data: User) {
    localStorage.setItem(TOKEN, JSON.stringify(data));
  }

  getToken(): string| null{
    return localStorage.getItem(TOKEN);
  }

  removeToken() {
    localStorage.removeItem(TOKEN);
  }
}

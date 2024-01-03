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

  isValidToken() {
    const token = this.getToken();

    if (token) {
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));

      if (!this._tokenExpired(tokenDecode.exp)) return true;
    }

    return false;
  }

  private _tokenExpired(expiration: number): boolean {
    return Math.floor(new Date().getTime() / 1000) >= expiration;
  }

  getUserIdFromToken() {
    const token = this.getToken();

    if (token) {
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));

      if (!tokenDecode) return null;

      return tokenDecode.userId;
    } else {
      return null;
    }
  }
}

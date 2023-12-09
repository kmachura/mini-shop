import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private localStorage: LocalstorageService) { }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const token = this.localStorage.getToken();

    if (token) {
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));

      if (tokenDecode.isAdmin && !this._tokenExpired(tokenDecode.exp)) return true;
    }
    this.router.navigate(['/login']);

    return false;
  }

  private _tokenExpired(expiration: number): boolean {
    return Math.floor(new Date().getTime() / 1000) >= expiration;
  }
}

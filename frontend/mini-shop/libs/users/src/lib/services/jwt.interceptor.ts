import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalstorageService } from './localstorage.service';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private localStorage: LocalstorageService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  intercept(_request: HttpRequest<unknown>, _next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.localStorage.getToken();
    const isAPIUrl = _request.url.startsWith('http://localhost:8084/api');

    if (token && isAPIUrl) {
      _request = _request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
    }

    return _next.handle(_request);
  }
}

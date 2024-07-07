// token-interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap((event) => {
        // console.log(event);
        if (event instanceof HttpResponse) {
          // console.log(localStorage.getItem('token'));
          const bearerToken = event.body.token;
          if (bearerToken) {
            const token = bearerToken.split(' ')[1];
            localStorage.setItem('token', token);
          }
        }
      })
    );
  }
}
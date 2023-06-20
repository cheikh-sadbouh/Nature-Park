import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth-service.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(private _authService : AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this._authService.token
    if (!token) {
      return next.handle(request);

    }else{

      return next.handle(request.clone({
        setHeaders:{
         
            "authorization":"bearer "+token
          }
        }))

      }
    }
}

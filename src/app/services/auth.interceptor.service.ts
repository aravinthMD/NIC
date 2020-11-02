import { Injectable } from '@angular/core';

import {
  HttpInterceptor,
  HttpRequest,
  HttpEvent,
  HttpHandler,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    return next.handle(req)
  }
}

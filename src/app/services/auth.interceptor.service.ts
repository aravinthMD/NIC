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

import { map, tap, first, catchError } from 'rxjs/operators';
import { ToasterService } from '@services/toaster.service'

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(private toasterService: ToasterService) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    console.log(req.method)
    const httpMethod = req.method
    if (httpMethod == 'POST') {
      if (req.url.includes('appiyo')) {
      req = req.clone({
        setHeaders: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'authentication-token': true
            ? 'VMd1yqKF03FzCdLZLZu2KfU4l6UmRshL1Kb4mFdvjVUfXZJCEMLuKFgxM9RtZPcl'
            : '',
        },
      });
    }

    let authReq;
    if (req.url.includes('appiyo')) {
      authReq = req.clone({
        headers: req.headers.set(
          'authentication-token',
          true ? 'VMd1yqKF03FzCdLZLZu2KfU4l6UmRshL1Kb4mFdvjVUfXZJCEMLuKFgxM9RtZPcl' : ''
        ),
        //     .set('X-AUTH-SESSIONID',
        //      localStorage.getItem('X-AUTH-SESSIONID') ?
        //      localStorage.getItem('X-AUTH-SESSIONID').trim() : '')
      });

      
    } else {
      authReq = req;
    }

    return next.handle(authReq).pipe(
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status != 200) {
            console.log('httpErr', err);
           
            if (err.status != 401 && err.status != 500) {
              if (err.status === 0) {
                this.toasterService.showError(`Connection not available! Please try again later.`, 'Technical error..');
              } else {
                this.toasterService.showError(`${err.status}: ${err.statusText}`, 'Technical error..');
              }
            }
          }
        }
        return throwError(err);
      }),
      map(
        (event: HttpEvent<any>) => {
          let res;
          if (event instanceof HttpResponse) {
            if (event.headers.get('content-type') == 'text/plain') {
              event = event.clone({
                body: JSON.parse(String(event)),
              });
              res = event.body;
            } else {
              if (
                event.headers.get('content-type') != 'text/plain' &&
                typeof event.body != 'object'
              ) {
                res = JSON.parse(event.body);
              }
             
            }
            console.log('after Encryption: ', event.body);

            if (res && res['Error'] === '1') {
              alert(res['ErrorMessage']);
            }
            // this.ngxUiLoaderService.stop();
           
            return event;
          } else {
            // this.ngxUiLoaderService.stop();
            console.log('authenticateErrorevent', event);
          }
        },
        (err: any) => {
          console.log('authenticateError', err);
          
        }
      )

    );

      }
    }
}

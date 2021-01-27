
// import { Injectable } from '@angular/core';
// import {
//   HttpInterceptor,
//   HttpRequest,
//   HttpEvent,
//   HttpHandler,
//   HttpResponse,
//   HttpErrorResponse,
// } from '@angular/common/http';
// import { EncryptService } from './encrypt.service';
// import { environment } from '../../environments/environment';
// import { Observable, throwError } from 'rxjs';
// import { map, tap, first, catchError } from 'rxjs/operators';
// import { NgxUiLoaderService } from 'ngx-ui-loader';
// import { ToastrService } from 'ngx-toastr';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthInterceptor implements HttpInterceptor {
//   apiCount: number = 0;

//   constructor(
//     private encrytionService: EncryptService,
//     private ngxUiLoaderService: NgxUiLoaderService,
//     private toasterService: ToastrService,
//   ) { }

//   intercept(
//     req: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     this.ngxUiLoaderService.start();
//     this.apiCount++;
//     let httpMethod = req.method;
//     console.log('Before Encryption', req.body);
//     console.log('req', req);

//     if (httpMethod == 'POST') {
//       if (req.url.includes('appiyo')) {
//         if (environment.encryptionType == true) {
//           const encryption = this.encrytionService.encrypt(
//             JSON.stringify(req.body),
//             environment.aesPublicKey
//           );
//           req = req.clone({
//             setHeaders: encryption.headers,
//             body: encryption.rawPayload,
//             responseType: 'text',
//           });
//         }
//       }
//     } else {
//       req = req.clone({
//         setHeaders: {
//           'Content-Type': 'application/x-www-form-urlencoded',
//           'authentication-token': localStorage.getItem('token')
//           ? localStorage.getItem('token')
//             : '',
//         },
//       });
//     }

//     let authReq;
//     if (req.url.includes('appiyo')) {
//       authReq = req.clone({
//         headers: req.headers.set(
//           'authentication-token',
//           localStorage.getItem('token')
//           ? localStorage.getItem('token') : ''
//         ),
//         //     .set('X-AUTH-SESSIONID',
//         //      localStorage.getItem('X-AUTH-SESSIONID') ?
//         //      localStorage.getItem('X-AUTH-SESSIONID').trim() : '')
//       });
//     } else {
//       authReq = req;
//     }
//     console.log('authReq', req);
//     return next.handle(authReq).pipe(
//       catchError((err: any) => {
//         if (err instanceof HttpErrorResponse) {
//           if (err.status != 200) {
//             console.log('httpErr', err);
//             this.ngxUiLoaderService.stop();
//             if (err.status != 401 && err.status != 500) {
//               if (err.status === 0) {
//                 this.toasterService.error(`${err.status}: Connection not available! Please try again later.`, 'Technical error..');
//               } else {
//                 this.toasterService.error(`${err.status}: ${err.statusText}`, 'Technical error..');
//               }
//             }
//           }
//         }
//         return throwError(err);
//       }),
//       map(
//         (event: HttpEvent<any>) => {
//           let res;
//           this.apiCount--;
//           if (event instanceof HttpResponse) {
//             if (event.headers.get('content-type') == 'text/plain') {
//               event = event.clone({
//                 body: JSON.parse(this.encrytionService.decryptResponse(event)),
//               });
//               res = event.body;
//             } else {
//               if (
//                 event.headers.get('content-type') != 'text/plain' &&
//                 typeof event.body != 'object'
//               ) {
//                 res = JSON.parse(event.body);
//               }
//               if (res && res['login_required']) {
//                 // this.utilityService.logOut();
//                 // this.utilityService.removeAllLocalStorage();
//               }
//             }
//             console.log('after Encryption: ', event.body);

//             if (res && res['Error'] === '1') {
//               alert(res['ErrorMessage']);
//             }
//             // this.ngxUiLoaderService.stop();
//             this.checkApiCount();
//             return event;
//           } else {
//             // this.ngxUiLoaderService.stop();
//             console.log('authenticateErrorevent', event);
//           }
//         },
//         (err: any) => {
//           console.log('authenticateError', err);
//           this.checkApiCount();
//         }
//       )

//     );


//   }

//   checkApiCount() {
//     if (this.apiCount <= 0) {
//       console.log('this.apiCount', this.apiCount)
//       this.ngxUiLoaderService.stop();
//     }
//   }
// }

























































import { Injectable } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';

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
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  apiCount: number = 0;

  url = environment.appiyoDrive

  constructor(private toasterService: ToasterService,private ngxUiLoaderService:NgxUiLoaderService) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    this.ngxUiLoaderService.start();
    this.apiCount++;


    console.log("request ",req);
    const httpMethod = req.method
    // if (httpMethod == 'POST') {
      if (req.url.includes('appiyo') && !req.url.includes(this.url) ) {
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
            this.ngxUiLoaderService.stop();
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
          this.apiCount--;
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
            this.checkApiCount();
           
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

      // }
    }

    checkApiCount() {
      if (this.apiCount <= 0) {
        console.log('this.apiCount', this.apiCount)
        this.ngxUiLoaderService.stop();
      }
    }
}

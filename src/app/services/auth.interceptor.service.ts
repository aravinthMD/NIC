import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpEvent,
  HttpHandler,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { EncryptService } from './encrypt.service';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { map, tap, first, catchError } from 'rxjs/operators';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToasterService } from './toaster.service';
import { UtilityService } from './utility.service';
// import { UtilityService } from './utility.service';
// import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  apiCount: number = 0;

  constructor(
    private encrytionService: EncryptService,
    private ngxUiLoaderService: NgxUiLoaderService,
    private toasterService: ToasterService,
    private utilityService: UtilityService
  ) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.ngxUiLoaderService.start();
    this.apiCount++;
    let httpMethod = req.method;
    const reqBody = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;   
     
    console.log("********************************************");  
    console.log('Before Encryption', req.body);  
    console.log("********************************************");
    let token = '';

    if (reqBody && reqBody.headers !== undefined) {
      token = reqBody.headers;
    } else if (reqBody) {
      token = localStorage.getItem('token')
        ? localStorage.getItem('token')
        : ''
    }


    let uri = environment.host + environment.appiyoDrive;
    if (!req.headers.has('Content-Type') && req.url !== uri) {
    if (httpMethod == 'POST' || httpMethod == 'PUT') {
      if (req.url.includes('appiyo')) {
        if (environment.encryptionType == true) {
          const encryption = this.encrytionService.encrypt(
            JSON.stringify(req.body),
            environment.aesPublicKey
          );
          req = req.clone({
            setHeaders: encryption.headers,
            body: encryption.rawPayload,
            responseType: 'text',
          });
        }
      }
    } else {
      req = req.clone({
        setHeaders: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'authentication-token': localStorage.getItem('token')
          ? localStorage.getItem('token')
            : '',
        },
      });
    }
  }

    let authReq;
    if (req.url.includes('appiyo')) {
      authReq = req.clone({
        headers: req.headers.set(
          'authentication-token',
          req.headers.get('authentication-token') ? req.headers.get('authentication-token'):
          localStorage.getItem('token')
          ? localStorage.getItem('token') : ''
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
          this.apiCount--;
          if (err.status != 200) {
            console.log('httpErr', err);
            this.ngxUiLoaderService.stop();
            if (err.status != 401 && err.status != 500 && err.status != 415) {
              if (err.status === 0) {
                this.toasterService.showError(`Connection not available! Please try again later.`, 'Technical error..');
              } else {
                this.toasterService.showError(`${err.statusText}`, 'Technical error..');
              }
            }else if(err.status == 401){
              this.toasterService.showError(`invalid user`,'');
            }
          }
          this.checkApiCount();
        }
        return throwError(err);
      }),
      map(
        (event: HttpEvent<any>) => {         
          let res;
          
          if (event instanceof HttpResponse) {
            this.apiCount--;
            if (event.headers.get('content-type') == 'text/plain') {
              event = event.clone({
                body: JSON.parse(this.encrytionService.decryptResponse(event)),
              });
              res = event.body;
            } else {
              if (
                event.headers.get('content-type') != 'text/plain' && 
                event.headers.get('content-type')!="text/html" &&
                typeof event.body != 'object' 
              ) {
                res = JSON.parse(event.body);
              }
              if (res && res['login_required']) {
                this.toasterService.showError('Session Expired.Please Login Again','');
                this.utilityService.logOut();
                // this.utilityService.removeAllLocalStorage();
              }
            }
            console.log("********************************************");
            console.log('after Encryption: ', event.body);
            console.log("********************************************");

            if (res && res['Error'] === '1') {
              alert(res['ErrorMessage']);
            }
            // this.ngxUiLoaderService.stop();
            this.checkApiCount();
            return event;
          } else {          
            //
            // this.apiCount--;
            this.checkApiCount();
            console.log('authenticateErrorevent', event);
          }
        },
        (err: any) => {
          console.log('authenticateError', err);
          this.checkApiCount();
        }
      )

    );


  }

  checkApiCount() {
    if (this.apiCount <= 0) {
      console.log('this.apiCount', this.apiCount)
      this.ngxUiLoaderService.stop();
      this.apiCount = 0;
    }
  }
}







  
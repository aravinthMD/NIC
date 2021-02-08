import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
import { ToasterService } from './toaster.service';
import { UtilityService } from './utility.service';

@Injectable()
export class AuthguardService  implements CanActivate{
private loginStatus: boolean = false
  constructor(private loginService: LoginService,
              private utilityService: UtilityService,
              private toasterService: ToasterService) {
                this.utilityService.logDataStatus$.subscribe(val =>
                  this.loginStatus = val)
                  console.log('loginStatus',this.loginStatus)
               }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (localStorage.getItem('token')) {
      return new Observable<boolean>((observer) => {       
          const data = { username:localStorage.getItem('userName') };          
          if (!this.loginStatus){
          this.loginService.getLogin(data).subscribe((res: any) => {
            const response = res;
            if (response.Error == '0' && response.ProcessVariables.error.code == 0) { 
              this.utilityService.setLoginDetail(
                response.ProcessVariables
              );
              observer.next(true);
            }else {
              this.toasterService.showError(response.ProcessVariables.error,'message')
            }
          });
          }else{
            return  observer.next(true);
          }
      });
    } else {
      this.utilityService.logOut();
      return false;
    }
  }
}

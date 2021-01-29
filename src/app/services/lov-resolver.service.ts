import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from './admin.service';

@Injectable({
  providedIn: 'root'
})
export class LovResolverService implements Resolve<any> {

  constructor(private adminService : AdminService) { }
  
  resolve(rout  : ActivatedRouteSnapshot ,state  : RouterStateSnapshot  )  : Observable<any> | Promise<any> | null{
        return this.adminService.getAllLov("73");
  }
}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(private httpService: HttpService,
              private router: Router) { }

  logOut() {
    
    this.httpService.logOut().subscribe(
      (res) => {       
        this.removeAllLocalStorage();
      },
      (error) => {      
        this.removeAllLocalStorage();
      }
    );   

  }

  removeAllLocalStorage() {
    localStorage.clear();    
    this.router.navigateByUrl('/login');   
    
  }
}

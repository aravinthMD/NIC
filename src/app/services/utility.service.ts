import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
private userData: any;
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

  setUserDetail(data){
  this.userData =  data;
  console.log("set user data ",data)
  }
  getUserData(){
    return this.userData;
  }
}

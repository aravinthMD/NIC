import { Injectable } from '@angular/core';
import { NativeDateModule } from '@angular/material';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: "root",
})
export class UtilityService {
  private userData: any;
  private loginData: any;
  private settingsDataList = {};
  private notificationList = [];
  constructor(private httpService: HttpService, private router: Router) {}

  logDataStatus$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

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
    sessionStorage.clear();
    this.router.navigateByUrl("/login");
  }

  setUserDetail(data) {
    this.userData = data;
    console.log("set user data ", data);
  }
  getUserData() {
    return this.userData;
  }
  setLoginDetail(data) {
    if (data) {
      (data.settingsDataList || []).forEach((value) => {
        this.settingsDataList[value.ScreenName] = value;
      });
      this.loginData = data;
      this.setLogStatus(true);
    } else {
      this.setLogStatus(false);
    }
  }

  getSettingsDataList(screenName: string) {
    return this.settingsDataList[screenName] || {};
 }

  getLoginDetail() {
    return this.loginData;
  }

  setLogStatus(data) {
    this.logDataStatus$.next(data);
  }

  setNotifications(Value){
      this.notificationList = Value;
  }

  getNotifications(){
      return this.notificationList;
  }

  changeDateFormat(date) {

    const splitDate = date.split('/');

    return `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}`

   }
   checkFileName(name:string){
     let inputNameString: string = name;
     if (inputNameString.includes('(')){
      inputNameString = inputNameString.replace('(',' ');
       }
       if(inputNameString.includes(')')){
        inputNameString = inputNameString.replace(')',' ');
       }
       inputNameString = inputNameString.replace(/(\r\n\s|\n|\r|\s)/gm, '');
       return inputNameString.trim()
   }
}

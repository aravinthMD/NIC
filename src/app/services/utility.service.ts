import { Injectable } from '@angular/core';
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
}

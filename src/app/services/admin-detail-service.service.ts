import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminDetailServiceService {

  private adminUserId : string;

  constructor() { }

  setAdminUserId(id){
      this.adminUserId = id;
  }

  getAdminUserId(){
      return this.adminUserId
  }

}

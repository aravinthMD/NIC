import { Component, OnInit,OnChanges, Input } from '@angular/core';
import { Location } from '@angular/common';

import { UtilService } from '../../services/util.service'


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit,OnChanges {

  isLocation: string;

  constructor(private location: Location,private utilService: UtilService) { }

  ngOnInit() {

    this.utilService.detectSidNav$.subscribe((user)=> {
      console.log('DETECT SIDE NAV ********',user)
      if(user == 'newuser') {
        this.isLocation = '1'
      }else if(user == 'dashboard') {
        this.isLocation = '0'
      }
    })


    let path = this.location.path()

    if(path.includes('users/Dashboard')){
      this.isLocation = '0'
    }else if(path.includes('users/userInfo')) {
      this.isLocation = '1'
    }else if(path.includes('users/reports')){
      this.isLocation = '3'
    }else if(path.includes('users/email')) {
      this.isLocation = '4'
    }else if(path.includes('account/manageUser')) {
      this.isLocation = '2.1';
    }else if(path.includes('account/manageAdmin')) {
      this.isLocation = '2.2';
    }

   
    
  }

  ngOnChanges(){

    

  }

  navigation(route: string) {
  this.isLocation = route;
  }

}

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

  parentLocation: string;

  accountInfoNav: string;

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
    }else if(path.includes('users/proformaInvoice')){
      this.isLocation = '1.2'
    }else if(path.includes('users/projectExecution')){
      this.isLocation = '1.3'
    }else if(path.includes('users/purchaseOrder')){
      this.isLocation = '1.4'
    }else if(path.includes('users/taxInvoice')){
      this.isLocation = '1.5'
    }else if(path.includes('users/techAdmin')){
      this.accountInfoNav = '1.1'
      this.isLocation = '1.1.2'
    }else if(path.includes('users/billingAdmin')){
      this.accountInfoNav = '1.1'
      this.isLocation = '1.1.3'
    }else if(path.includes('users/smsCredit')){
      this.accountInfoNav = '1.1'
      this.isLocation = '1.1.4'
    }else if(path.includes('users/reports')){
      this.isLocation = '3'
    }else if(path.includes('users/email')) {
      this.isLocation = '4'
    }else if(path.includes('admin/manageUser')) {
      this.isLocation = '2.1';
    }else if(path.includes('admin/manageAccount')) {
      this.isLocation = '2.2';
    }

    if(path.includes('users/')) {
      this.parentLocation = '1'
    }else if(path.includes('admin/')) {
      this.parentLocation = '2'
    }else {
      this.parentLocation = ''
    }

   
    
  }

  ngOnChanges(){

    

  }

  navigation(route: string) {
  this.isLocation = route;

  if(route.includes('1.1.')){
    this.accountInfoNav = '1.1'
  }else {
    this.accountInfoNav = ''
  }

  if(route.includes('2.')) {
      this.parentLocation = '2'
  }else if(route.includes('1.')){
    this.parentLocation = '1'
  }else {
    this.parentLocation = ''
  }

  }

}

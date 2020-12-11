import { Component, OnInit,OnChanges, Input } from '@angular/core';
import { Location } from '@angular/common';

import { UtilService } from '../../services/util.service'

import { environment } from '../../../environments/environment';

import { Router } from '@angular/router'
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit,OnChanges {

  isLocation: string;

  parentLocation: string;

  accountInfoNav: string;

  version: string;

  isExistingUser: boolean;

  constructor(private location: Location,private utilService: UtilService,private router: Router) { 

    this.version = environment.version;

  }

  ngOnInit() {

    this.utilService.detectSidNav$.subscribe((user)=> {
      console.log('DETECT SIDE NAV ********',user)

      if(user == 'newuser') {
        this.isLocation = '1'
      }else if(user == 'dashboard') {
        this.parentLocation= ''
        this.isLocation = '0'
      }else if(user.includes('users/customerDetails')){
        this.parentLocation= '1'
        this.accountInfoNav = '1.1'
        this.isLocation = '1.1.1'
      }else if(user.includes('users/techAdmin')){
        this.accountInfoNav = '1.1'
        this.isLocation = '1.1.2'
      }else if(user.includes('users/billingAdmin')){
        this.accountInfoNav = '1.1'
        this.isLocation = '1.1.3'
      }else if(user.includes('users/smsCredit')){
        this.accountInfoNav = '1.1'
        this.isLocation = '1.1.4'
      }else if(user.includes('users/projectExecution')){
        this.accountInfoNav = '1.1'
        this.isLocation = '1.3'
      }
    })


    let path = this.location.path()

    if(path.includes('users/Dashboard')){
      this.isLocation = '0'
    }else if(path.includes('users/proformaInvoice')){
      this.accountInfoNav = '1.1'
      this.isLocation = '1.2'
    }else if(path.includes('users/projectExecution')){
      this.accountInfoNav = '1.1'
      this.isLocation = '1.3'
    }else if(path.includes('users/purchaseOrder')){
      this.accountInfoNav = '1.1'
      this.isLocation = '1.4'
    }else if(path.includes('users/taxInvoice')){
      this.accountInfoNav = '1.1'
      this.isLocation = '1.5'
    }else if(path.includes('users/customerDetails')){
      this.accountInfoNav = '1.1'
      this.isLocation = '1.1.1'
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
    }else if(path.includes('users/sendemail')) {
      this.parentLocation='4'
      this.isLocation = '4.1'
    }else if(path.includes('users/managegroup')) {
      this.parentLocation='4'
        this.isLocation = '4.2'
    }else if(path.includes('admin/manageUser')) {
      this.isLocation = '2.1';
    }else if(path.includes('admin/manageAccount')) {
      this.isLocation = '2.2';
    }

    if(path.includes('users/') && !path.includes('users/Dashboard') && !path.includes('users/reports') &&!path.includes('users/sendemail') &&!path.includes('users/managegroup')) {
      this.parentLocation = '1'
    }else if(path.includes('admin/')) {
      this.parentLocation = '2' 
    }else if(path.includes('/sendemail')||path.includes('/managegroup')){
        this.parentLocation = '4'
    }else {
      this.parentLocation = ''
    }

    if(path.includes('users/proformaInvoice') || path.includes('users/projectExecution') || path.includes('users/purchaseOrder') || path.includes('users/taxInvoice') || path.includes('users/smsCredit')) {

      this.accountInfoNav = '1.1'
      this.isLocation = '1.1.1'
      this.router.navigate(['/users/customerDetails'])

    }

    this.utilService.projectNumber$.subscribe((pno)=> {
      if(pno){
        this.isExistingUser = true
      }else {
        this.isExistingUser = false
      }
  })
   
    
  }

  ngOnChanges(){

    

  }

  navigateRoute(route: string) {

    let projectNo = ''
      this.utilService.projectNumber$.subscribe((pno)=> {
          projectNo = pno;
      })
      if(projectNo) {
        this.router.navigate([`${route}/${projectNo}`])
      }else{
      this.router.navigate([route])
      }
    
  }

  navigation(route: string) {
  this.isLocation = route;

  if(route.includes('1.')){
    this.accountInfoNav = '1.1'
  }else {
    this.utilService.setProjectNumber(null)
    this.accountInfoNav = ''
  }

  if(route.includes('2.')) {
      this.parentLocation = '2'
  }else if(route.includes('1.')){
    this.parentLocation = '1'
  }else if(route.includes('4.')){
    this.parentLocation='4'
  }else {
    this.parentLocation = ''
  }
  

  }

}

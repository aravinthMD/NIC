import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import {UtilService} from '@services/util.service';
import { UtilityService } from '@services/utility.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToggleSideMenuService } from '@services/toggle-sidemenu.service';


@Component({
  selector: 'app-protected',
  templateUrl: './protected.component.html',
  styleUrls: ['./protected.component.scss']
})
export class ProtectedComponent implements OnInit {


  userName : string;
  userType: string;
  constructor(private router :Router,
              private utilService:UtilService,
              private ngxUiLoaderService: NgxUiLoaderService,
              private utilityService: UtilityService,
              private toggleSideMenuService: ToggleSideMenuService,
              private activatedRoute: ActivatedRoute) { 

    this.userName = localStorage.getItem('userName') || 'Admin User'
    const lovData =   this.activatedRoute.snapshot.data;
    this.utilService.setLovData( lovData['listOfValue']['ProcessVariables']);
    // this.utilService.setUserDetails(lovData['customerResolver']['ProcessVariables']);
    // this.utilService.setCustomerDetails(lovData['customerResolver']['ProcessVariables']);
   

  }

  ngOnInit() {
    this.userType = localStorage.getItem('roleName');
    this.bodyClickListener()
  }

  bodyClickListener() {
       document.addEventListener('click', (event: any) => {
            console.log('body click', event.target.id);
            const id = event.target.id;
            if (id !== 'menu' && id !== 'sidebarToggleTop' && id !== 'toggleSide' && id !== 'forarrow') {
               this.toggleSideMenuService.toggle(false);
            }
       });
  }

  newUserMethod(){
    // this.ngxUiLoaderService.start();

    this.utilService.setProjectNumber(null)
    this.utilService.setCurrentUrl('users/customerDetails');
    this.router.navigate(['/users/customerDetails']);
    // this.ngxUiLoaderService.stop()
  }

  navigateToEmail(){
    this.utilService.setCurrentUrl('users/sendemail');
    this.router.navigate(['/users/sendemail']);
  }

  logOut(){
    this.utilityService.logOut()
  }

}

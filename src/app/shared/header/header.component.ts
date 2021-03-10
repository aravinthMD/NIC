import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilService } from '@services/util.service';
import { UtilityService } from '@services/utility.service';
import { ToggleSideMenuService } from '@services/toggle-sidemenu.service';

@Component({
  selector: 'nav-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userName : string;
  userType : string;
  notificationList = [];
  notificationCount ;

  isCustomerModuleMapped  = true;
  isMailMapped  = true

  constructor(private utilityService: UtilityService,
              private utilService : UtilService,
              private router : Router,
              private toggleSideMenuService: ToggleSideMenuService) {

    this.userName = localStorage.getItem('sessionId') || 'Admin User'
    this.userType = localStorage.getItem('roleName') || 'Admin' ;

               }

  ngOnInit() {
    this.notificationList = this.utilityService.getNotifications();
    this.notificationCount  = this.notificationList ? this.notificationList.length : 0;
    this.isCustomerModuleMapped = this.utilService.getCustomerModuleFlag();
    const isMailMapped = this.utilityService.getSettingsDataList("EmailOperations");
    this.isMailMapped = isMailMapped.isMapping;
  }

  onToggle() {
    this.toggleSideMenuService.toggle(true);
  }
  newUserMethod(){
    this.utilService.setProjectNumber(null)
    this.utilService.setCurrentUrl('users/customerDetails');
    this.router.navigate(['/users/customerDetails']);
  }

  navigateToEmail(){
    this.utilService.setCurrentUrl('users/sendemail');
    this.router.navigate(['/users/sendemail']);
  }

  logOut(){
    this.utilityService.logOut()
  }

}

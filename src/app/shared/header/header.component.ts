import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilService } from '@services/util.service';
import { UtilityService } from '@services/utility.service';

@Component({
  selector: 'nav-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userName : string;
  userType : string;

  constructor(private utilityService: UtilityService,
              private utilService : UtilService,
              private router : Router) {

    this.userName = localStorage.getItem('userName') || 'Admin User'
    this.userType = localStorage.getItem('roleName') || 'Admin' ;

               }

  ngOnInit() {
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

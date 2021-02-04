import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilService } from '@services/util.service';
import { UtilityService } from '@services/utility.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private utilityService: UtilityService,
              private utilService : UtilService,
              private router : Router) { }

  ngOnInit() {
  }

  logOut(){
    this.utilityService.logOut()
  }

  navigateToEmail(){
    this.utilService.setCurrentUrl('users/sendemail');
    this.router.navigate(['/users/sendemail']);
  }

}

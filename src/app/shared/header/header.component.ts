import { Component, OnInit } from '@angular/core';
import { UtilityService } from '@services/utility.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private utilityService: UtilityService) { }

  ngOnInit() {
  }

  logOut(){
    this.utilityService.logOut()
  }

}

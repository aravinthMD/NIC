import { Component, OnInit,OnChanges, Input } from '@angular/core';
import { Location } from '@angular/common';


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit,OnChanges {

  isLocation: string;

  constructor(private location: Location) { }

  ngOnInit() {
    let path = this.location.path()
    if(path.includes('admin/manageAdmin')) {
      this.isLocation = '2'
    }else if(path.includes('users/reports')){
      this.isLocation = '3'
    }else if(path.includes('users/userInfo')) {
      this.isLocation = '1'
    }else if(path.includes('users/Dashboard')){
      this.isLocation = '0'
    }else if(path.includes('users/email')) {
      this.isLocation = '4'
    }
    
  }

  ngOnChanges(){

    

  }

  navigation(route: string) {
  this.isLocation = route;
  }

}

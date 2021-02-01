import { Component, OnInit,Input,OnChanges } from '@angular/core';

@Component({
  selector: 'app-view-info',
  templateUrl: './view-info.component.html',
  styleUrls: ['./view-info.component.scss']
})


export class ViewInfoComponent implements OnInit,OnChanges {


  @Input() userDetails: any; 

  @Input() techAdminUserDetails: any;

  @Input() billAdminUserDetails: any;

  
  Math: any;
 
  constructor() { }

  ngOnInit() {

    this.Math = Math;
    console.log(this.userDetails)
    console.log(this.techAdminUserDetails)
    console.log(this.billAdminUserDetails)
  }

  ngOnChanges() {
    console.log('Changes',this.userDetails)
  }

}

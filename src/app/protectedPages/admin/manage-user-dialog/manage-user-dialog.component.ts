import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-user-dialog',
  templateUrl: './manage-user-dialog.component.html',
  styleUrls: ['./manage-user-dialog.component.scss']
})
export class ManageUserDialogComponent implements OnInit {

  buttonName : any = 'Edit'
  enableflag :boolean = true

  deparmentList : any[] = [{key:'Admin User',value:0},{key:'Operation user',value:1},{key:'Finance User',value:2}];



today: any;

  constructor() { }

  ngOnInit() {

    
  }

  OnUpdate(){
    if(this.buttonName == 'Edit') {
      this.enableflag = false
      this.buttonName = 'Update';
    }else {
      this.enableflag = true
      this.buttonName = 'Edit';
    }
    
    
  }

}

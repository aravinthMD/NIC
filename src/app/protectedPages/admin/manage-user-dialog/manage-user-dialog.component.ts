import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-user-dialog',
  templateUrl: './manage-user-dialog.component.html',
  styleUrls: ['./manage-user-dialog.component.scss']
})
export class ManageUserDialogComponent implements OnInit {

  buttonName : any = 'Edit'
  enableflag :boolean = true

  deparmentList : any[] = [{key:'Department of Sainik Welfare',value:0},{key:'Minstry of minority affairs',value:1},{key:'Vishakhapatnam port Trust',value:2},
  {key:'minstry of trible affairs',value:2},{key:'Bureasu of Naviks.Mumbai',value:3}
];


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

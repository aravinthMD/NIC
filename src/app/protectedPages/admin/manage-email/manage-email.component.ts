import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'manage-email',
  templateUrl: './manage-email.component.html',
  styleUrls: ['./manage-email.component.scss']
})
export class ManageEmailComponent implements OnInit {

  displayedColumns : string[] = ["screen","status","action"]

  emailValue : any

  showModal : boolean = false;

  constructor() { }

  ngOnInit() {

  }

  dataList = [
    { screen :  "Customer Details", status  : "Enabled" },
    { screen  :  "Technical Admin Details",status :  "Disabled" },
    { screen  : "Reports",status  : "Enabled" },
    { screen :  "Proforma Invoice",status :  "Disabled" },
    { screen  : "Project Execution",status :  "Enabled" },
    { screen  :  "Email" , status :  "Disabled" }
  ]

  dataSource  = this.dataList;


  OnEdit(){
    this.showModal = true
  }

  submitDialog(flag : boolean){

    if(flag)
    this.showModal = false

    
  }

}

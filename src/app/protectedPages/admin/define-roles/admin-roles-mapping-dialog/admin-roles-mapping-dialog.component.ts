import { Component, Inject, OnInit,EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-roles-mapping-dialog',
  templateUrl: './admin-roles-mapping-dialog.component.html',
  styleUrls: ['./admin-roles-mapping-dialog.component.scss']
})
export class AdminRolesMappingDialogComponent implements OnInit {

  checked  :boolean;
  read : boolean;
  write : boolean;
  delete : boolean;
  emailEnable : boolean
  screenName : string;

  emiiter = new EventEmitter<any>();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { 
    this.checked = this.data.isMapping;
    this.read = this.data.isRead;
    this.write = this.data.isWrite;
    this.emailEnable = this.data.isEnableEmail;
    this.screenName = this.data.screenName;

  }

  update(){

    const data = {
        isMapping : this.checked,
        isRead : this.read,
        write :  this.write,
        isEnableEmail  : this.emailEnable,
        screenName : this.screenName
    }

    this.emiiter.emit(data);
  }

  ngOnInit() {
  }

}

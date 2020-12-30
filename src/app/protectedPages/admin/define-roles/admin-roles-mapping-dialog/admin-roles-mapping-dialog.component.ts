import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

}

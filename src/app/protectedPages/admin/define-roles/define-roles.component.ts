import { Component, OnInit,ViewChild } from '@angular/core';

import { AdminService } from '@services/admin.service';
import { FormControl, FormGroup } from '@angular/forms';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import { AdminRolesMappingDialogComponent } from './admin-roles-mapping-dialog/admin-roles-mapping-dialog.component';

@Component({
  selector: 'app-define-roles',
  templateUrl: './define-roles.component.html',
  styleUrls: ['./define-roles.component.scss']
})
export class DefineRolesComponent implements OnInit {

  @ViewChild(MatPaginator,{static : true}) paginator : MatPaginator;


  roleList = [

    {
      role: 'Finance User',
      screenName: 'Customer Details',
      mappingStatus : 'mapped',
      status : 'read/write',
      emailFlag  : 'enabled'
    },
    {
      role: 'Finance User',
      screenName: 'Technical Admin',
      mappingStatus : "mapped",
      status : 'read/write/delete',
      emailFlag : 'disabled'
    },
    {
      role: 'Finance User',
      screenName: 'Billing Admin',
      mappingStatus  :"not Mapped",
      status : 'read',
      emailFlag  : 'disabled'
    },
    {
      role: 'Finance User',
      screenName: 'Proforma Invoice',
      mappingStatus : "Mapped",
      status  : 'read',
      emailFlag  : 'enabled'

    },
    {
      role: 'Finance User',
      screenName: 'Reports',
      mappingStatus : "Mapped",
      status  : 'read/write',
      emailFlag :  'disabled'
    }
  ]
  dataSource = new MatTableDataSource<any>(this.roleList);

  constructor(
    private adminService: AdminService,
    private dialog: MatDialog
    ) { }

  rolesList: any;

  rolesControl: FormGroup;

  // displayedColumns : string[] = ['Role','ScreenName','showMode','emailMode']
  displayedColumns  :string[] = ['ScreenName','Mapping','Modify','status','email']

  subtasks = []


  async ngOnInit() {

    this.rolesControl=new FormGroup({
      rolesList:new FormControl(''),
    })

    let roleData = []

    await this.adminService.getLovSubMenuList("5").subscribe((response)=> {


      const rolesList = response['ProcessVariables']['Lovitems'];
      rolesList.forEach(element => {
        roleData.push({key:element.key,value:element.name})
      });
    })

    this.rolesList = roleData
  }

  onChangeRole(event) {

  }

  enableMode() {

    this.subtasks = [  {
      name: 'read'
    },
    {
      name: 'write'
    },
    {
      name: 'delete'
    }]
  }


  mappingMethod(){

    this.dialog.open(AdminRolesMappingDialogComponent,{
      width : '500px',
      height  :'400px'
    });


  }

  submitData() {
    
  }

}

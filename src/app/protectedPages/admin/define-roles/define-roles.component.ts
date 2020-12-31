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
      mappingStatus : 'Mapped',
      status : 'Read/Write',
      emailFlag  : 'Enabled'
    },
    {
      role: 'Finance User',
      screenName: 'Technical Admin',
      mappingStatus : "Mapped",
      status : 'Read/Write/Delete',
      emailFlag : 'Disabled'
    },
    {
      role: 'Finance User',
      screenName: 'Billing Admin',
      mappingStatus  :"Not Mapped",
      status : 'Read',
      emailFlag  : 'Disabled'
    },
   
    {
      role  :'Finance User',
      screenName : 'SMS Credit Allocation',
      mappingStatus : "Not Mapped",
      status  : 'Read/Write',
      emailFlag  : 'Enabled'
    },
    {
      role: 'Finance User',
      screenName: 'Proforma Invoice',
      mappingStatus : "Mapped",
      status  : 'Read',
      emailFlag  : 'Enabled'

    },
    {
      role  : 'Finance User',
      screenName  : 'Project Execution',
      mappingStatus : "Mapped",
      status  : 'Read',
      emailFlag :  'Enabled'
    },
    {
      role  : 'Finance User',
      screenName  :  'Purchase Order',
      mappingStatus :  'Not Mapped',
      status  : 'Read/Write',
      emailFlag  : 'Enabled'
    },
    {
      role :  'Financial User',
      screenName  : 'Tax Invoice',
      mappingStatus  : 'Mapped',
      status : 'Read/Write',
      emailFlag  :'Enabled'
    },
    
    {
      role: 'Finance User',
      screenName: 'Reports',
      mappingStatus : "Mapped",
      status  : 'Read/Write',
      emailFlag :  'Disabled'
    },

    {
      role  : 'Finance User',
      screenName  : 'Email',
      mappingStatus :  "Mapped",
      status  : 'Read',
      emailFlag : 'Disabled'
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

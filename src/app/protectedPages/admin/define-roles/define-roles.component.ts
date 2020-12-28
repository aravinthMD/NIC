import { Component, OnInit,ViewChild } from '@angular/core';

import { AdminService } from '@services/admin.service';
import { FormControl, FormGroup } from '@angular/forms';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';

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
      screenName: 'Customer Details'
    },
    {
      role: 'Finance User',
      screenName: 'Technical Admin'
    },
    {
      role: 'Finance User',
      screenName: 'Billing Admin'
    },
    {
      role: 'Finance User',
      screenName: 'Customer Details'
    },
    {
      role: 'Finance User',
      screenName: 'Customer Details'
    }
  ]
  dataSource = new MatTableDataSource<any>(this.roleList);

  constructor(private adminService: AdminService,private dialog: MatDialog) { }

  rolesList: any;

  rolesControl: FormGroup;

  displayedColumns : string[] = ['Role','ScreenName','showMode','emailMode']

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

  submitData() {
    
  }

}

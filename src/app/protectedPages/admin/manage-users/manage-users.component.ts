import { Component, OnInit,AfterViewInit,ViewChild,Input } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import { ManageUserDialogComponent } from '../manage-user-dialog/manage-user-dialog.component';
import { LoginService} from "src/app/services/login.service";


@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit ,AfterViewInit {

  @Input('userObj') user : any;


  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  displayedColumns: string[] = ['S.NO', 'userId', 'UserName','EmployeeCode','Department','Role', 'CreatedOn','Action']; 

  userList : any[] = [
    {username : "Suchita.auth",name : "Suchita",email : "suchita.patel@nic.com",mobile_no : "7689549827",role:"Admin User",createdOn:"28/10/2020"},
    {username : "Abhijeet.auth",name : "Abhijeet",email : "abhijeet.parate@nic.com",mobile_no : "7709865489",role : "Operation User",createdOn : "10/09/2020"},
    {username : "Kumar.auth",name : "Kumar",email : "kumar.raja@nic.com",mobile_no : "9889546389",role : "Admin User",createdOn : "14/08/2020"},
    {username  :"Rajesh.auth",name : "Rajesh",email : "rajesh.gaud@nic.com",mobile_no : "8754678956",role : "Operation User",createdOn : "10/07/2020"},
    {username : "Guruprasad.auth",name : "Guru",email : "guru.prasad@nic.com",mobile_no : "8754895678",role : "Finance User",createdOn  : "18/06/2020"},
    {username : "Ranjith.auth",name : "Ranjith",email : "rankth@nic.com",mobile_no : "8754893365",role : "Admin User",createdOn : "10/06/2020"},
    {username : "Ankit.auth",name : "Ankit",email : "ankit@nic.com",mobile_no : "8754890954",role : "Finance User",createdOn : "10/05/2020"},
    {username :  "Rajesh.auth",name : "Rajesh",email : "rajesh.prasanth@nic.com",mobile_no : "8645789065",role : "Operation User",createdOn : "09/04/2020"},
    {username  : "Ajay.auth",name : "Ajay",email : "ajay.gonnade@nic.com",mobile_no : "8876490346",role : "Admin User",createdOn:"07/03/2020"},
    {username  : "Ram.auth",name : "Ram",email : "ram.guru@nic.com",mobile_no : "9876348956",role : "Operation User",createdOn : "04/02/2020"},
    {username :  "Krishna.auth",name : "Krishna",email  :"krishna.kumar@nic.com",mobile_no : "9845785438",role : "Admin User",createdOn  :"16/01/2020"},
    {username : "Reshmi.auth",name : "Reshmi",email : "reshmi.vargese@nic.com",mobile_no : "9865789456",role : "Admin User", createdOn : "02/01/2020"}
  ]
  

  dataSource = new MatTableDataSource<any>(this.userList);

  constructor(private dialog: MatDialog,private loginService : LoginService) {

   }

  ngOnInit() {
    // this.fetchManageUsers();
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
  }

  edit(element) {

    console.log(element)
    const dialogRef = this.dialog.open(ManageUserDialogComponent,{
      data: element
    });
  }

  fetchManageUsers(){
    this.loginService.fetchManageUsers().subscribe((response) => {
        this.dataSource = new MatTableDataSource<any>(response['ProcessVariables']['allUser']);
        this.dataSource.paginator = this.paginator;
    })
  }


  

}

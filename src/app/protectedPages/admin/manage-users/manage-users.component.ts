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

  // userList : any[] = []
  

  dataSource = new MatTableDataSource<any>();

  constructor(private dialog: MatDialog,private loginService : LoginService) {

   }

  ngOnInit() {
    this.fetchManageUsers();
  }

  ngAfterViewInit(){
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

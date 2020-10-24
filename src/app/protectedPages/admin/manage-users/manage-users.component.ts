import { Component, OnInit,AfterViewInit,ViewChild,Input } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import { ManageUserDialogComponent } from '../manage-user-dialog/manage-user-dialog.component'


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
    {userId : 'RK',userName:'Rajesh Kumar',employeeCode:'NIC001234',role:'Admin',createdOn : '10-10-2019',department:'Admin User'},
    {userId : 'JK',userName:'Jain Sharma',employeeCode:'NIC004567',role:'Operation',createdOn : '13-05-2020',department:'Operation User'},
    {userId : 'MR',userName:'Mani Ramesh',employeeCode:'NIC007666',role:'Finance',createdOn : '12-6-2018',department:'Finance User'},
    {userId : 'RP',userName:'Rajesh Patel',employeeCode:'NIC007655',role:'Operation',createdOn : '10-10-2019',department:'Operation User'},
    {userId : 'TP',userName:'Tushar Pandey',employeeCode:'NIC004356',role:'Admin',createdOn : '10-10-2019',department:'Admin User'},
    {userId : 'Giri',userName:'Giritharan',employeeCode:'NIC007888',role:'Finance',createdOn : '10-10-2019',department:'Finance User'},
    {userId : 'Ajay',userName:'AjaySathya',employeeCode:'NIC005555',role:'Operation',createdOn : '10-10-2019',department:'Operation User'},
    {userId : 'KC',userName:'Kalpana Chawla',employeeCode:'NIC003434',role:'Finance',createdOn : '10-10-2019',department:'Finance User'},
    {userId : 'SM',userName:'Selvan Murugan',employeeCode:'NIC003332',role:'Admin',createdOn : '10-10-2019',department:'Admin User'},
    {userId : 'Tamil',userName:'Tamil',employeeCode:'NIC004344',role:'Operation',createdOn : '10-10-2019',department:'Operation User'},
    {userId : 'Ketan',userName:'Ketan',employeeCode:'NIC004322',role:'Finance',createdOn : '10-10-2019',department:'Finance User'},
    {userId : 'Ridan',userName:'Ridan',employeeCode:'NIC004444',role:'Operation',createdOn : '10-10-2019',department:'Operation User'},
    {userId : 'RA',userName:'Rizwan Azar',employeeCode:'NIC006666',role:'Operation',createdOn : '10-10-2019',department:'Operation User'},
    {userId : 'Patel',userName:'Patel',employeeCode:'NIC004333',role:'Operation',createdOn : '10-10-2019',department:'Operation User'},
    {userId : 'kumar',userName:'Kumar',employeeCode:'NIC002223',role:'Finance',createdOn : '10-10-2019',department:'Finance User'},
    {userId : 'Ankit',userName:'Ankit',employeeCode:'NIC007654',role:'Admin',createdOn : '10-10-2019',department:'Admin User'},
    {userId : 'RM',userName:'Radhe Muna',employeeCode:'NIC002221',role:'Admin',createdOn : '10-10-2019',department:'Admin User'},
    {userId : 'GF',userName:'Gujjar Fazil',employeeCode:'NIC001221',role:'Finance',createdOn : '10-10-2019',department:'Finance User'},
    {userId : 'Kini',userName:'Kini',employeeCode:'NIC002123',role:'Operation',createdOn : '10-10-2019',department:'Operation User'},
    {userId : 'Rajesh',userName:'Rajesh',employeeCode:'NIC008675',role:'Finance',createdOn : '10-10-2019',department:'Finance User'},

  ]

  dataSource = new MatTableDataSource<any>(this.userList);

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;

  }

  edit() {
    const dialogRef = this.dialog.open(ManageUserDialogComponent);
  }

}

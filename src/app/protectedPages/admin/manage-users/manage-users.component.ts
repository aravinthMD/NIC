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
    {userId : 'ankit.auth',userName:'Ankit',employeeCode:'NIC001234',role:'User',createdOn : '10-10-2019',department:'Department of Sainik Welfare'},
    {userId : 'jain.auth',userName:'Jain',employeeCode:'NIC004567',role:'User',createdOn : '13-05-2020',department:'Minstry of minority affairs'},
    {userId : 'mani.auth',userName:'Mani',employeeCode:'NIC007666',role:'User',createdOn : '12-6-2018',department:'Department of Sainik Welfare'},
    {userId : 'rajesh.auth',userName:'Rajesh',employeeCode:'NIC007655',role:'User',createdOn : '10-10-2019',department:'Minstry of minority affairs'},
    {userId : 'tushar.auth',userName:'Tushar',employeeCode:'NIC004356',role:'User',createdOn : '10-10-2019',department:'Minstry of minority affairs'},
    {userId : 'giri.auth',userName:'Giri',employeeCode:'NIC007888',role:'User',createdOn : '10-10-2019',department:'Department of Sainik Welfare'},
    {userId : 'ajay.auth',userName:'Ajay',employeeCode:'NIC005555',role:'User',createdOn : '10-10-2019',department:'Vishakhapatnam port Trust'},
    {userId : 'kalpana.auth',userName:'Kalpana',employeeCode:'NIC003434',role:'User',createdOn : '10-10-2019',department:'Department of Sainik Welfare'},
    {userId : 'selvan.auth',userName:'Selvan',employeeCode:'NIC003332',role:'User',createdOn : '10-10-2019',department:'Minstry of minority affairs'},
    {userId : 'tamil.auth',userName:'Tamil',employeeCode:'NIC004344',role:'User',createdOn : '10-10-2019',department:'Vishakhapatnam port Trust'},
    {userId : 'ketan.auth',userName:'Ketan',employeeCode:'NIC004322',role:'User',createdOn : '10-10-2019',department:'Department of Sainik Welfare'},
    {userId : 'ridan.auth',userName:'Ridan',employeeCode:'NIC004444',role:'User',createdOn : '10-10-2019',department:'Vishakhapatnam port Trust'},
    {userId : 'rizwan.auth',userName:'Rizwan',employeeCode:'NIC006666',role:'User',createdOn : '10-10-2019',department:'Vishakhapatnam port Trust'},
    {userId : 'patel.auth',userName:'Patel',employeeCode:'NIC004333',role:'User',createdOn : '10-10-2019',department:'Vishakhapatnam port Trust'},
    {userId : 'kumar.auth',userName:'Kumar',employeeCode:'NIC002223',role:'User',createdOn : '10-10-2019',department:'Department of Sainik Welfare'},
    {userId : 'ankit.auth',userName:'Ankit',employeeCode:'NIC007654',role:'User',createdOn : '10-10-2019',department:'Minstry of minority affairs'},
    {userId : 'radhe.auth',userName:'Radhe',employeeCode:'NIC002221',role:'User',createdOn : '10-10-2019',department:'Minstry of minority affairs'},
    {userId : 'gujjar.auth',userName:'Gujjar',employeeCode:'NIC001221',role:'User',createdOn : '10-10-2019',department:'Department of Sainik Welfare'},
    {userId : 'kini.auth',userName:'Kini',employeeCode:'NIC002123',role:'User',createdOn : '10-10-2019',department:'Vishakhapatnam port Trust'},
    {userId : 'rajesh.auth',userName:'Rajesh',employeeCode:'NIC008675',role:'User',createdOn : '10-10-2019',department:'Department of Sainik Welfare'},

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

import { Component, OnInit,AfterViewInit,ViewChild,Input } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';



@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit ,AfterViewInit {

  @Input('userObj') user : any;


  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  displayedColumns: string[] = ['S.NO', 'userId', 'Role', 'CreatedOn','Action']; 

  userList : any[] = [
    {userId : 'ankit.auth',role:'User',createdOn : '10-10-2019',department:''},
    {userId : 'jain.auth',role:'User',createdOn : '13-05-2020',department:''},
    {userId : 'mani.auth',role:'User',createdOn : '12-6-2018',department:''},
    {userId : 'rajesh.auth',role:'User',createdOn : '10-10-2019',department:''},
    {userId : 'tushar.auth',role:'User',createdOn : '10-10-2019',department:''},
    {userId : 'giri.auth',role:'User',createdOn : '10-10-2019',department:''},
    {userId : 'ajay.auth',role:'User',createdOn : '10-10-2019',department:''},
    {userId : 'kalpana.auth',role:'User',createdOn : '10-10-2019',department:''},
    {userId : 'selvan.auth',role:'User',createdOn : '10-10-2019',department:''},
    {userId : 'tamil.auth',role:'User',createdOn : '10-10-2019',department:''},
    {userId : 'ketan.auth',role:'User',createdOn : '10-10-2019',department:''},
    {userId : 'ridan.auth',role:'User',createdOn : '10-10-2019',department:''},
    {userId : 'rizwan.auth',role:'User',createdOn : '10-10-2019',department:''},
    {userId : 'patel.auth',role:'User',createdOn : '10-10-2019',department:''},
    {userId : 'kumar.auth',role:'User',createdOn : '10-10-2019',department:''},
    {userId : 'ankit.auth',role:'User',createdOn : '10-10-2019',department:''},
    {userId : 'radhe.auth',role:'User',createdOn : '10-10-2019',department:''},
    {userId : 'gujjar.auth',role:'User',createdOn : '10-10-2019',department:''},
    {userId : 'kini.auth',role:'User',createdOn : '10-10-2019',department:''},
    {userId : 'rajesh.auth',role:'User',createdOn : '10-10-2019',department:''},

  ]

  dataSource = new MatTableDataSource<any>(this.userList);

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;

  }

}

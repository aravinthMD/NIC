import { AfterViewInit, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
@Component({
  selector: 'app-account-manage',
  templateUrl: './account-manage.component.html',
  styleUrls: ['./account-manage.component.scss']
})
export class AccountManageComponent implements OnInit,AfterViewInit {

  isChecked = true;

  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;

  displayedColumns:any[]=['s.no','userId','department','action','status']

  buttonName='Active';

  modalMsg: string;

  userList  = [
    {userId : "arul.auth",department : "Finance Department Uttarakhand",status :"Active"},
    {userId : "kumar.auth",department : "Department of School Education",status :"InActive"},
    {userId : "Jain.auth",department : "Election Department , Manipur",status :"InActive"},
    {userId : "Jain.auth",department : "Director of emloyment and ceo",status :"Active"},
    {userId : "Jain.auth",department : "revenue Department, tripura ",status :"Active"},
    {userId : "Jain.auth",department : "Land records and settlement ",status :"Active"},
    {userId : "Jain.auth",department : "Land records and settlement ",status :"Active"},
    {userId : "Jain.auth",department : "Land records and settlement ",status :"Active"},
    {userId : "Jain.auth",department : "Land records and settlement ",status :"Active"},
    {userId : "Jain.auth",department : "Land records and settlement ",status :"Active"},
    {userId : "Jain.auth",department : "Land records and settlement ",status :"Active"},
    {userId : "Jain.auth",department : "Land records and settlement ",status :"Active"},
  ]
  showModal:boolean=false;
  constructor() { }
    dataSource = new MatTableDataSource<any>(this.userList);
  ngOnInit() {

  }
ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
  }
  status(index,value){
    if(value == 'InActive') {
      this.modalMsg = 'Are you sure you want to activate this user ?'
    }else {
      this.modalMsg = 'Are you sure you want to deactivate this user ?'
    }
    this.showModal = true;
  }
  onCancel() {
    this.showModal = false;
  }

}

import { AfterViewInit, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import {PageEvent} from '@angular/material/paginator';

import {MatSort} from '@angular/material/sort';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';

import {HttpClient} from '@angular/common/http';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-account-manage',
  templateUrl: './account-manage.component.html',
  styleUrls: ['./account-manage.component.scss']
})
export class AccountManageComponent implements OnInit,AfterViewInit {

  isChecked = true;

  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;

  @ViewChild(MatSort,{static:true}) sort: MatSort;

  displayedColumns:any[]=['s.no','userId','department','action','status']

  buttonName='Active';

  modalMsg: string;

  // resultsLength = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  // MatPaginator Output
  pageEvent: PageEvent;

  pageNo: any = 10;

  tempList = [
    {userId : "arul.auth",department : "Finance Department Uttarakhand",status :"Active"},
    {userId : "kumar.auth",department : "Department of School Education",status :"InActive"},
    {userId : "Jain.auth",department : "Election Department , Manipur",status :"InActive"},
    {userId : "Jain.auth",department : "Director of emloyment and ceo",status :"Active"},
    {userId : "Jain.auth",department : "revenue Department, tripura ",status :"Active"},
    {userId : "Jain.auth",department : "Land records and settlement ",status :"Active"},
    {userId : "Jain.auth",department : "Land records and settlement ",status :"Active"},
    {userId : "Jain.auth",department : "Land records and settlement ",status :"Active"},
    {userId : "Jain.auth",department : "Land records and settlement ",status :"Active"},
    {userId : "Jain.auth",department : "Land records and settlement ",status :"Active"}
  ]

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
    {userId : "Jain.auth",department : "Land records and settlement ",status :"Active"}
  ]
  showModal:boolean=false;

  resultsLength = 52;
  isLoadingResults = true;
  isRateLimitReached = false;


  constructor(private ngxUiLoaderService: NgxUiLoaderService) { }
    data = new MatTableDataSource<any>(this.userList);

    
  ngOnInit() {
   
    console.log(this.sort)
    
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }
  
 
ngAfterViewInit(){
    

  }

  searchAccount(event) {

    let dataVal = event.target.value;

    let result = []
    this.ngxUiLoaderService.start()

    if(dataVal == '') {
      result = this.userList

      this.resultsLength = 52;

    }else{

       result = this.userList.filter((val)=> {

        return (val.status.includes(dataVal) || val.userId.includes(dataVal) || val.department.includes(dataVal) || val.userId.includes(dataVal))
      })
  
      this.resultsLength = result.length

    }
    
    this.data = new MatTableDataSource<any>([]);

    this.data = new MatTableDataSource<any>(result);
    this.ngxUiLoaderService.stop()
  }

  status(index,value){
    if(value == 'InActive') {
      this.modalMsg = 'Are you sure you want to activate this user ?'
    }else {
      this.modalMsg = 'Are you sure you want to inactivate this user ?'
    }
    this.showModal = true;
  }
  onCancel() {
    this.showModal = false;
  }

  pageEventData(event) {

    this.ngxUiLoaderService.start()
    console.log('page index',event.pageIndex)

    if(event.pageIndex == 0) {
      this.userList  = [
        {userId : "first.auth",department : "Finance Department Uttarakhand",status :"Active"},
    {userId : "kumar.auth",department : "Department of School Education",status :"InActive"},
    {userId : "Jain.auth",department : "Election Department , Manipur",status :"InActive"},
    {userId : "Jain.auth",department : "Director of emloyment and ceo",status :"Active"},
    {userId : "Jain.auth",department : "revenue Department, tripura ",status :"Active"},
    {userId : "Jain.auth",department : "Land records and settlement ",status :"Active"},
    {userId : "Jain.auth",department : "Land records and settlement ",status :"Active"},
    {userId : "Jain.auth",department : "Land records and settlement ",status :"Active"},
    {userId : "Jain.auth",department : "Land records and settlement ",status :"Active"},
    {userId : "Jain.auth",department : "Land records and settlement ",status :"Active"},
      ]
      
    }else if(event.pageIndex == 1) {

      this.userList  = [
        {userId : "second.auth",department : "Finance Department Uttarakhand",status :"Active"},
      {userId : "raj.auth",department : "Department of School Education",status :"InActive"},
      {userId : "vel.auth",department : "Election Department , Manipur",status :"InActive"},
      {userId : "mari.auth",department : "Director of emloyment and ceo",status :"Active"},
      {userId : "john.auth",department : "revenue Department, tripura ",status :"Active"},
      {userId : "fize.auth",department : "Land records and settlement ",status :"Active"},
      {userId : "sear.auth",department : "Land records and settlement ",status :"Active"},
      {userId : "hoor.auth",department : "Land records and settlement ",status :"Active"},
      {userId : "jain.auth",department : "Land records and settlement ",status :"Active"},
      {userId : "jj.auth",department : "Land records and settlement ",status :"Active"},
      ]
      // this.resultsLength = 30
    } else if(event.pageIndex == 2) {

      this.userList  = [
        {userId : "third.auth",department : "Finance Department Uttarakhand",status :"Active"},
      {userId : "raj.auth",department : "Department of School Education",status :"InActive"},
      {userId : "vel.auth",department : "Election Department , Manipur",status :"InActive"},
      {userId : "mari.auth",department : "Director of emloyment and ceo",status :"Active"},
      {userId : "john.auth",department : "revenue Department, tripura ",status :"Active"},
      {userId : "fize.auth",department : "Land records and settlement ",status :"Active"},
      {userId : "sear.auth",department : "Land records and settlement ",status :"Active"},
      {userId : "hoor.auth",department : "Land records and settlement ",status :"Active"},
      {userId : "jain.auth",department : "Land records and settlement ",status :"Active"},
      {userId : "jj.auth",department : "Land records and settlement ",status :"Active"},
      ]
    } else if(event.pageIndex == 3) {

      this.userList  = [
        {userId : "fourth.auth",department : "Finance Department Uttarakhand",status :"Active"},
      {userId : "raj.auth",department : "Department of School Education",status :"InActive"},
      {userId : "vel.auth",department : "Election Department , Manipur",status :"InActive"},
      {userId : "mari.auth",department : "Director of emloyment and ceo",status :"Active"},
      {userId : "john.auth",department : "revenue Department, tripura ",status :"Active"},
      {userId : "fize.auth",department : "Land records and settlement ",status :"Active"},
      {userId : "sear.auth",department : "Land records and settlement ",status :"Active"},
      {userId : "hoor.auth",department : "Land records and settlement ",status :"Active"},
      {userId : "jain.auth",department : "Land records and settlement ",status :"Active"},
      {userId : "jj.auth",department : "Land records and settlement ",status :"Active"},
      ]
    } else if(event.pageIndex == 4) {

      this.userList  = [
        {userId : "fivith.auth",department : "Finance Department Uttarakhand",status :"Active"},
      {userId : "raj.auth",department : "Department of School Education",status :"InActive"},
      {userId : "vel.auth",department : "Election Department , Manipur",status :"InActive"},
      {userId : "mari.auth",department : "Director of emloyment and ceo",status :"Active"},
      {userId : "john.auth",department : "revenue Department, tripura ",status :"Active"},
      {userId : "fize.auth",department : "Land records and settlement ",status :"Active"},
      {userId : "sear.auth",department : "Land records and settlement ",status :"Active"},
      {userId : "hoor.auth",department : "Land records and settlement ",status :"Active"},
      {userId : "jain.auth",department : "Land records and settlement ",status :"Active"},
      {userId : "jj.auth",department : "Land records and settlement ",status :"Active"},
      ]
    }else if(event.pageIndex == 5) {

      this.userList  = [
        {userId : "fivith.auth",department : "Finance Department Uttarakhand",status :"Active"},
      {userId : "raj.auth",department : "Department of School Education",status :"InActive"}
      ]

      this.pageNo = this.userList.length;
    }

    // this.data = this.userList;
    this.data = new MatTableDataSource<any>(this.userList);
    this.ngxUiLoaderService.stop()
  }

}



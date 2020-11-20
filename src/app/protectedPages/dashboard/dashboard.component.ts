import { Component, OnInit,AfterViewInit,ViewChild } from '@angular/core';
import { Router} from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit ,AfterViewInit{

  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  displayedColumns: string[] = ['UserID','projectNo', 'Department', 'State', 'Status']; 

  userList : any[] = [
    {userId : "arul.auth",projectNo: '4535',department : "Finance Department Uttarakhand",state : "Uttarakhand",status :"Active",id:1},
    {userId : "kumar.auth",projectNo: '6534',department : "Department of School Education",state : "Delhi",status :"InActive",id:2},
    {userId : "Jain.auth",projectNo: '7644',department : "Election Department , Manipur",state : "Manipur",status :"InActive",id:3},
    {userId : "Jain.auth",projectNo: '6454',department : "Director of emloyment and ceo",state : "Delhi",status :"Active",id:3},
    {userId : "Jain.auth",projectNo: '3432',department : "revenue Department, tripura ",state : "tripura",status :"Active",id:3},
    {userId : "Jain.auth",projectNo: '6433',department : "Land records and settlement ",state : "delhi",status :"Active",id:3},
  ]

  dataSource = new MatTableDataSource<any>(this.userList);

  constructor(private route:Router,private utilService: UtilService) { }
  
  ngOnInit() {
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;

  }


  addUser(){
    this.utilService.setCurrentUrl('newuser')
    this.route.navigate(['/users/userInfo']);

  }

  navigateToUser(element) {

    this.utilService.setProjectNumber(element.projectNo);

    this.utilService.setUserDetails(element);

    this.utilService.setCurrentUrl('users/customerDetails')
    this.route.navigate(['/users/customerDetails/'+element.id])
  }

}

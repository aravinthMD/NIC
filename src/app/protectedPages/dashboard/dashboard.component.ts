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
    {userId : "Mani.auth",projectNo: '6454',department : "Director of emloyment and ceo",state : "Delhi",status :"Active",id:4},
    {userId : "Saran.auth",projectNo: '3432',department : "Revenue Department, Tripura ",state : "Tripura",status :"Active",id:5},
    {userId : "Karthi.auth",projectNo: '8799',department : "Finance Department Jaipur",state : "Jaipur",status :"Active",id:6},
    {userId : "Josh.auth",projectNo: '9876',department : "Land records and settlement ",state : "Delhi",status :"Active",id:7},
    {userId : "Salim.auth",projectNo: '5423',department : "Finance Department Mumbai",state : "Mumbai",status :"Active",id:8},
    {userId : "Prakash.auth",projectNo: '7565',department : "Revenue Department, nagpur",state : "Nagpur",status :"Active",id:9},
    {userId : "Raja.auth",projectNo: '3544',department : "Election Department , Bangalore",state : "Bangalore",status :"Active",id:10},
    {userId : "Suresh.auth",projectNo: '2333',department : "Land records and settlement ",state : "Delhi",status :"Active",id:11},
    {userId : "Jain.auth",projectNo: '7644',department : "Election Department , Manipur",state : "Manipur",status :"InActive",id:12},
    {userId : "Mani.auth",projectNo: '5655',department : "Director of emloyment and ceo",state : "Delhi",status :"Active",id:13},
    {userId : "Saran.auth",projectNo: '3332',department : "Revenue Department, Tripura ",state : "Tripura",status :"Active",id:14},
    {userId : "Karthi.auth",projectNo: '4343',department : "Finance Department Jaipur",state : "Jaipur",status :"Active",id:15}
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

import { createAotUrlResolver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit() {
  }

  userList : any[] = [
    {userId : "arul.auth",department : "Finance Department Uttarakhnad",state : "Uttarakhnad",status :"Active",id:1},
    {userId : "kumar.auth",department : "Department of School Education",state : "Delhi",status :"InActive",id:2},
    {userId : "Jain.auth",department : "Election Department , Manipur",state : "Manipur",status :"InActive",id:3},
    {userId : "Jain.auth",department : "Director of emloyment and ceo",state : "Delhi",status :"Active",id:3},
    {userId : "Jain.auth",department : "revenue Department, tripura ",state : "tripura",status :"Active",id:3},
    {userId : "Jain.auth",department : "Land records and settlement ",state : "delhi",status :"Active",id:3},


  ]


  addUser(){
    this.route.navigate(['/users/userInfo']);

  }

}

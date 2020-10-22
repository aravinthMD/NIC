import { AfterViewInit, Component, OnInit,ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatAccordion} from '@angular/material/expansion';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit,AfterViewInit {

  filterTabButtonName :  string  = null

  @ViewChild(MatAccordion,{static:true}) accordion: MatAccordion;

  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  displayedColumns: string[] = ['UserID', 'Department', 'po', 'pi','invoiceRaised','paymentStatus']; 

  userList : any[] = [
    {userId : "arul.auth",department : "Finance Department Uttarakhnad",state : "Uttarakhnad",status :"Active",id:1,po:'Raised',pi:'Pending',invoiceRaised:'True',paymentStatus:'Approved'},
    {userId : "kumar.auth",department : "Department of School Education",state : "Delhi",status :"InActive",id:2,po:'Raised',pi:'Approved',invoiceRaised:'True',paymentStatus:'Approved'},
    {userId : "Jain.auth",department : "Election Department , Manipur",state : "Manipur",status :"InActive",id:3,po:'Raised',pi:'',invoiceRaised:'True',paymentStatus:'Approved'},
    {userId : "Jain.auth",department : "Director of emloyment and ceo",state : "Delhi",status :"Active",id:3,po:'Raised',pi:'pending',invoiceRaised:'True',paymentStatus:'Approved'},
    {userId : "Jain.auth",department : "revenue Department, tripura ",state : "tripura",status :"Active",id:3,po:'Raised',pi:'Pending',invoiceRaised:'True',paymentStatus:'Approved'},
    {userId : "Jain.auth",department : "Land records and settlement ",state : "delhi",status :"Active",id:3,po:'Raised',pi:'Approved',invoiceRaised:'True',paymentStatus:'Approved'},
  ]

  dataSource = new MatTableDataSource<any>(this.userList);


  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
  }



  OnFilter(){
    this.filterTabButtonName = "Filter Applied";
    this.accordion.closeAll
  }

}

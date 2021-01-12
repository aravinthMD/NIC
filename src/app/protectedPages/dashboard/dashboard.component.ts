import { Component, OnInit,AfterViewInit,ViewChild } from '@angular/core';
import { Router} from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { UtilService } from '../../services/util.service';
import { SearchService } from '../../services/search.service';
import {ApiService} from '../../services/api.service';
import { ToasterService } from '@services/toaster.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit ,AfterViewInit{

  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;

  displayedColumns: string[] = ['UserID','projectNo', 'Department', 'State', 'Status']; 

  userList : any[] = [
    {userId : "Arul.auth",projectNo: '4535',department : "Finance Department Uttarakhand",state : "Uttarakhand",status :"Active",id:1},
    {userId : "Kumar.auth",projectNo: '6534',department : "Department of School Education",state : "Delhi",status :"Inactive",id:2},
    {userId : "Jain.auth",projectNo: '7644',department : "Election Department, Manipur",state : "Manipur",status :"Inactive",id:3},
    {userId : "Mani.auth",projectNo: '6454',department : "Director of Emloyment and CEO",state : "Delhi",status :"Active",id:4},
    {userId : "Saran.auth",projectNo: '3432',department : "Revenue Department, Tripura ",state : "Tripura",status :"Active",id:5},
    {userId : "Karthi.auth",projectNo: '8799',department : "Finance Department Jaipur",state : "Jaipur",status :"Active",id:6},
    {userId : "Josh.auth",projectNo: '9876',department : "Land Records and Settlement ",state : "Delhi",status :"Active",id:7},
    {userId : "Salim.auth",projectNo: '5423',department : "Finance Department Mumbai",state : "Mumbai",status :"Active",id:8},
    {userId : "Prakash.auth",projectNo: '7565',department : "Revenue Department, Nagpur",state : "Nagpur",status :"Active",id:9},
    {userId : "Raja.auth",projectNo: '3544',department : "Election Department, Bangalore",state : "Bangalore",status :"Active",id:10},
    {userId : "Suresh.auth",projectNo: '2333',department : "Land Records and Settlement ",state : "Delhi",status :"Active",id:11},
    {userId : "Jain.auth",projectNo: '7644',department : "Election Department, Manipur",state : "Manipur",status :"Inactive",id:12},
    {userId : "Mani.auth",projectNo: '5655',department : "Director of Emloyment and CEO",state : "Delhi",status :"Active",id:13},
    {userId : "Saran.auth",projectNo: '3332',department : "Revenue Department, Tripura ",state : "Tripura",status :"Active",id:14},
    {userId : "Karthi.auth",projectNo: '4343',department : "Finance Department Jaipur",state : "Jaipur",status :"Active",id:15}
  ]

  dataSource = new MatTableDataSource<any>(this.userList);

  constructor(
    private route:Router,
    private utilService: UtilService,
    private searchService: SearchService,
    private apiService:ApiService,
    private toasterService: ToasterService) { }
  
  ngOnInit() {
    this.onSearch();
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
    this.route.navigate(['/users/customerDetails/'+element.projectNo])
  }
  onSearch(mySearch?)
  {
    const keyword=mySearch.value
   console.log('Search Value',keyword);
   const data = this.apiService.api.getAllCustomerDetails;

  const params = {
     searchKeyword:keyword
      // fromDate: this.searchForm.get('searchFrom').value,//"2020-12-27T18:30:00.000Z",
      // toDate: this.searchForm.get('searchTo').value//"2021-01-05T18:30:00.000Z"
  }

    this.searchService
        .searchProjectExecution(data,params).subscribe((resp) => {
          console.log('Response', resp);
         
          const respError=resp["ProcessVariables"]["error" ];

          if(respError.code=="600")
          {
            const result=resp["ProcessVariables"]["customerList" ];
            this.dataSource = new MatTableDataSource<any>(result);
          console.log('result',result);
          const DashboardList:any[]=[];
          result.forEach(obj => {
            DashboardList.push(
              {
                userId : obj.applicantName,
                projectNo: obj.projectNumber,
                department : obj.departmentName,
                state : obj.state,
                status :"Active",
                id:obj.userId
              });          
        });

          console.log('DashboardList',DashboardList);
          this.dataSource = new MatTableDataSource<any>(DashboardList);
      }
      else 
      { 
        this.toasterService.showError(`${respError.code}: ${respError.message}`, 'Technical error..');
      }
        })
      

  }

}

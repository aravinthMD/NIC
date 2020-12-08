import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-audit-trail-dialog',
  templateUrl: './audit-trail-dialog.component.html',
  styleUrls: ['./audit-trail-dialog.component.scss']
})
export class AuditTrailDialogComponent implements OnInit,AfterViewInit {


  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;


  displayedColumns: string[] = ['module','dataFeild', 'oldValue','newValue','changedBy','timestamp','remarks']; 

  userList : any[] = [
    {module : "Customer Details",dataFeild : "Project Number",oldValue : "8776",newValue : "9569",changedBy : "Selvakumar",timestamp : "13/10/2020 17:08:21",remarks : "Customer Details Project Number Update"},


    {module : "Technical Admin Details",dataFeild : "Employee Code",oldValue : "23232",newValue : "29099",changedBy : "Ajay Gonnade",timestamp : "05/08/2020 02:10:10",remarks : "Employee code update"},
    {module  :"Technical Admin Details",dataFeild : "Official Address Line 1",changedBy : "Santhosh",oldValue : "Bhandup nagar,Mumbai",newValue:"MaharanaPratap Nagar,Mumbai",timestamp : "10/07/2020 14:10:32",remarks : "Address Update"},


    {module : "Billing Admin Detail",dataFeild : "Email Address",oldValue :"test@gmail.com",changedBy :"Robin karan",newValue :"nandhan156@yahoo.in",timestamp : "20/06/2020 11:30:45",remarks  :"Email Id Updated"},


    {module : "SMS Credit Allocation",dataFeild : "Credit",oldValue : "2000",newValue : "300",changedBy : "Raja Ragunath",timestamp : "07/05/2020 15:31:28",remarks : "Credit Update"},
    {module : "SMS Credit Allocation",dataFeild : "Credit",oldValue : "1000",newValue : "200",changedBy : "Imran Khan",timestamp : "10/04/2020 13:02:43",remarks : "Credit Allocation"},
    {module : "SMS Credit Allocation",dataFeild : "Status",oldValue : "Raised",newValue : "Approved",changedBy : "Ankit Chavan",timestamp : "11/03/2020 13:10:56",remarks : "Sms allocation Credit Update"},
    {module : "SMS Credt Alloction",dataFeild : "Status",oldValue : "Approved",newValue : "Reject",changedBy : "Ketan Parek", timestamp : "15/02/2020 16:00:00",remarks : "Status Updated"},
    


    {module : "Project Execution",dataFeild : "NICSI Project Number",oldValue : "6785",newValue : "6081",changedBy : "RajeshWari",timestamp : "15/01/2020 17:25:34",remarks : "NICI Project Number Update"},
    {module : "Project Execution",dataFeild : "PI Paid",oldValue : "Partial Payment",newValue : "Full Payment",changedBy :"Abjieet",timestamp : "16/12/2019 12:20:30",remarks : "PI amount Paid Updated"},



    {module : "Proforma Invoice",dataFeild : "Proforma Invoice Number",oldValue : "4355",newValue : "8945",changedBy : "Akshaya",timestamp : "02/11/2019 13:01:55",remarks : "Testing"},
    {module : "Proforma Invoice",dataFeild : "Amount",oldValue : "20000",newValue : "35000",changedBy : "Arun Kumar",timestamp : "10/10/2019 12:10:50",remarks : "Annual Log"},


    {module : "Puchase Order",dataFeild : "Payment status",oldValue : "pending",newValue : "recieved",changedBy : "Ruguram Patil",timestamp :"12/09/2019 16:00:00",remarks : "Payment update"},
    {module : "Purchase Order",dataFeild : "Staus",oldValue : "Pending",newValue : "Received",changedBy:"Moin Ahmed",timestamp : "18/08/2019 10:27:56",remarks : "Status Upadated to Recieved"},


    {module : "Tax Invoice",dataFeild : "Penalty",oldValue : "2000",newValue : "2500",changedBy : "Raja Priyan",timestamp : "25/07/2019 08:10:10",remarks : "Penalty Applied"},
    {module : "Tax Invoice",dataFeild : "Invoice Amount Paid",oldValue : "23029",newValue : "25000",changedBy : "Natarajan Kandaswamy", timestamp  :"10/06/2019 16:00:10",remarks : "Invoice Amount Paid"},
    
    
   
    
    
  ]
  
  dataSource = new MatTableDataSource<any>(this.userList);


  constructor() { }

  ngOnInit() {

    // const dataList = this.userList;
    // dataList.sort((a: any,b: any)=>{
    //   // Turn your strings into dates, and then subtract them
    //   // to get a value that is either negative, positive, or zero.

    //   let aSplitData = a.timestamp.split('/');
    //   let bSplitData = b.timestamp.split('/');

    //   let aValue = `${aSplitData[1]}/${aSplitData[0]}/${aSplitData[2]}`;
    //   let bValue = `${bSplitData[1]}/${bSplitData[0]}/${bSplitData[2]}`;

    //   console.log('A==',aValue,'b==',bValue)

    //   return new Date(b.timestamp).valueOf() - new Date(a.timestamp).valueOf();
    // });

  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator
  }


}

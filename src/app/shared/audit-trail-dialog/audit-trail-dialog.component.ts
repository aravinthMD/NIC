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
    {module : "Proforma Invoice",dataFeild : "Proforma Invoice Number",oldValue : "4355",newValue : "8945",changedBy : "Abhijeet.parate",timestamp : "02/01/2020 13:01:55",remarks : "testing"},
    {module : "Proforma Invoice",dataFeild : "Amount",oldValue : "20000",newValue : "35000",changedBy : "Arun.kumar",timestamp : "10/01/2020 12:10:50",remarks : "annual log"},
    {module : "Puchase Order",dataFeild : "Payment status",oldValue : "pending",newValue : "recieved",changedBy : "Ruguram.Patil",timestamp :"12/01/2020 16:00:00",remarks : "Payment update"},
    {module : "Tax Invoice",dataFeild : "Penalty",oldValue : "0",newValue : "2500",changedBy : "Raja.Priyan",timestamp : "25/02.2020 08:10:10",remarks : "Penalty Applied"},
    {module : "Technical Admin Details",dataFeild : "Employee Code",oldValue : "23232",newValue : "29099",changedBy : "Ajay.Gonnade",timestamp : "05/03/2020 02:10:10",remarks : "Employee code update"},
    {module : "SMS Credit Allocation",dataFeild : "Credit",oldValue : "2000",newValue : "300",changedBy : "Raja.Ragunath",timestamp : "07/04/2020 15:31:28",remarks : "Credit Update"},
    {module : "SMS Credit Allocation",dataFeild : "Credit",oldValue : "1000",newValue : "200",changedBy : "Imran.Khan",timestamp : "10/04/2020 13:02:43",remarks : "Credit Allocation"},
    {module  :"Technical Admin Details",dataFeild : "Official Address Line 2",changedBy : "Santhosh.Reddy",oldValue : "Bhandup nagar,mumbai",newValue:"MaharanaPratap Nagar,mumbai",timestamp : "10/05/2020 14:10:32",remarks : "Address Update"},
    {module : "Tax Invoice",dataFeild : "Invoice Amount Paid",oldValue : "23029",newValue : "25000",changedBy : "Natarajan.Kandaswamy", timestamp  :"10/06/2020 16:00:10",remarks : "Invoice Amount Paid"},
    {module : "SMS Credit Allocation",dataFeild : "Status",oldValue : "Raised",newValue : "Approved",changedBy : "Ankit.Chavan",timestamp : "11/06/2020 13:10:56",remarks : "Sms allocation Credit Update"},
    {module : "SMS Credt Alloction",dataFeild : "Remark",oldValue : "Credit updated",newValue : "Status Updated",changedBy : "Ketan.Parek", timestamp : "15/06/2020 16:00:00",remarks : "Status Updated"},
    {module : "Customer Details",dataFeild : "Project Number",oldValue : "8776",newValue : "9569",changedBy : "SelvaKumar.Mani",timestamp : "13/08/2020 17:08:21",remarks : "Customer Details Project Number Update"},
    {module : "Project Execution",dataFeild : "NICSI Project Number",oldValue : "6785",newValue : "6081",changedBy : "RajeshWari",timestamp : "15/09/2020 17:25:34",remarks : "NICI Project Number Update"},
    {module : "Project Execution",dataFeild : "PI Paid",oldValue : "Partial Payment",newValue : "Full Payment",changedBy :"Abjieet.parate",timestamp : "16/10/2020 12:20:30",remarks : "PI amount Paid Updated"},
    {module : "Purchase Order",dataFeild : "Staus",oldValue : "Pending",newValue : "Received",changedBy:"Moin.ahmed",timestamp : "18/11/2020 10:27:56",remarks : "Status Upadated to Recieved"},
    {module : "Billing Admin Detail",dataFeild : "Email Address",oldValue :"test@gmail.com",changedBy :"Robin.karan",newValue :"nandhan156@yahoo.in",timestamp : "20/11/2020",remarks  :"Email Id Updated"}
  ]
  
  dataSource = new MatTableDataSource<any>(this.userList);


  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator
  }


}

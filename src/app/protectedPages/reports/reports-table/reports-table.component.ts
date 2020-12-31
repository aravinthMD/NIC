import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-reports-table',
  templateUrl: './reports-table.component.html',
  styleUrls: ['./reports-table.component.scss']
})
export class ReportsTableComponent implements OnInit,OnChanges {


  @Input('id') id : number;
  @Input('dataList') userList : any[] = [];
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;


  dataSource = new MatTableDataSource<any>(this.userList);
  displayedColumns: string[] = ['UserID', 'Department', 'state','projectNumber', 'piNumber','piDate']; 

  defaultColumns :  string[] =  ['UserID', 'Department', 'state','projectNumber', 'piNumber','piDate'];

  paymentsTrackingColumns :  string[] = ['UserName','projectNumber','InvoiceNo','InvoiceAmount','InvoiceDate'];

  payMentsRecievedColums : string[] = ['InvoiceNo','InvoiceAmount','ActualPayment','ShortPay'];

  // shortColumns : string[] = ['DocNo','PayBMade','Diff','DocRecDate','PaymentRecDate','WithTdS'];

  shortColumns : string[] = ['InvoiceNo','InvoiceAmount','ShortPay'];

  paidColumns: string[] = ['UserName','projectNumber','InvoiceNo','InvoiceAmount','InvoicePaid','InvoiceUnpaid']

  smsColumns: string[] = ['smsMatrix','Credits','Date','Status']
  constructor(private ngxUiLoaderService : NgxUiLoaderService) {
   }

  ngOnInit() {
  }

  ngOnChanges(){



    this.dataSource = new MatTableDataSource<any>(this.userList);
    this.dataSource.paginator = this.paginator

    if(this.id >= 1 && this.id <= 5){
        this.displayedColumns = this.defaultColumns;

    }
    if(this.id == 6){
      this.ngxUiLoaderService.start();
      this.displayedColumns = this.paymentsTrackingColumns

    }


    if(this.id == 7){
      this.ngxUiLoaderService.start();
      this.displayedColumns = this.payMentsRecievedColums

    }
    
    if(this.id == 8){
      this.ngxUiLoaderService.start();
    this.displayedColumns = this.shortColumns;
    
  }

  if(this.id == 9){
    this.ngxUiLoaderService.start();
  this.displayedColumns = this.paidColumns;
  
}

  if(this.id == 10) {
    this.ngxUiLoaderService.start();
    this.displayedColumns = this.smsColumns;
  }

  this.ngxUiLoaderService.stop();

  }

}

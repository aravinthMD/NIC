import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { UtilService } from '@services/util.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

import { ClientDetailsService } from '@services/client-details.service';

@Component({
  selector: 'app-reports-table',
  templateUrl: './reports-table.component.html',
  styleUrls: ['./reports-table.component.scss']
})
export class ReportsTableComponent implements OnInit, OnChanges {


  @Input() reportsId: string;
  @Input() gridValues: any[] = [];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  dataSource = new MatTableDataSource<any>(this.gridValues);
  displayedColumns: string[] = ['UserID', 'Department', 'state','projectNumber', 'piNumber','piDate']; 

  defaultColumns: string[] =  ['UserID', 'Department', 'state','projectNumber', 'piNumber','piDate'];

  PAYMENT_TRACKING_COLUMNS  = ['projectNumber', 'InvoiceNo', 'InvoicePaid', 'InvoiceDate'];

  PAYMENT_RECEIVED_COLUMNS = ['InvoiceNo', 'InvoicePaid', 'ActualPayment', 'ShortPay'];

  // shortColumns : string[] = ['DocNo','PayBMade','Diff','DocRecDate','PaymentRecDate','WithTdS'];

  PAYMENT_SHORT_PAY_COLUMNS = ['InvoiceNo', 'InvoicePaid', 'ShortPay'];

  PAID_UNPAID_COLUMNS = ['UserName', 'projectNumber', 'InvoiceNo', 'InvoiceAmount', 'InvoicePaid', 'InvoiceUnpaid'];
  SMS_CREDIT_ALLOCATION = ['smsMatrix', 'DateOfRequest', 'Credits', 'Status'];
  PROFORMA_INVOICE = ['piNumber', 'piAmount', 'piDate'];
  PURCHASE_ORDER_RAISED = ['piNumber', 'poNumber', 'poDate', 'projectNumber'];
  INVOICE_RAISED = ['projectNumber', 'poNumber', 'poDate', 'InvoiceNo', 'InvoiceDate'];

  smsColumns: string[] = ['smsMatrix','Credits','Date','Status','Navigate']
  constructor(
    private ngxUiLoaderService: NgxUiLoaderService,
    private utilService: UtilService,
    private router: Router,
    private clientDetailService: ClientDetailsService
    ) {
   }

  ngOnInit() {
  }

  ngOnChanges() {


    if (this.reportsId === '0') {
        this.displayedColumns = this.PAYMENT_TRACKING_COLUMNS;
    } else if (this.reportsId === '1') {
       this.displayedColumns = this.PAYMENT_RECEIVED_COLUMNS;
    } else if (this.reportsId === '2') {
      this.displayedColumns = this.PAYMENT_SHORT_PAY_COLUMNS;
    } else if (this.reportsId === '3') {
      this.displayedColumns = this.PAID_UNPAID_COLUMNS;
    } else if (this.reportsId === '4') {
      this.displayedColumns = this.SMS_CREDIT_ALLOCATION;
    } else if (this.reportsId === '5') {
      this.displayedColumns = this.PROFORMA_INVOICE;
    } else if (this.reportsId === '6') {
      this.displayedColumns = this.PURCHASE_ORDER_RAISED;
    } else if (this.reportsId === '7') {
      this.displayedColumns = this.INVOICE_RAISED;
    }






    this.dataSource = new MatTableDataSource<any>(this.gridValues);
    this.dataSource.paginator = this.paginator;

//     if(this.id >= 1 && this.id <= 5){
//         this.displayedColumns = this.defaultColumns;

//     }
//     if(this.id == 6){
//       this.ngxUiLoaderService.start();
//       this.displayedColumns = this.paymentsTrackingColumns

//     }


//     if(this.id == 7){
//       this.ngxUiLoaderService.start();
//       this.displayedColumns = this.payMentsRecievedColums

//     }
    
//     if(this.id == 8){
//       this.ngxUiLoaderService.start();
//     this.displayedColumns = this.shortColumns;
    
//   }

//   if(this.id == 9){
//     this.ngxUiLoaderService.start();
//   this.displayedColumns = this.paidColumns;
  
// }

//   if(this.id == 10) {
//     this.ngxUiLoaderService.start();
//     this.displayedColumns = this.smsColumns;
//   }

//   this.ngxUiLoaderService.stop();

  }

  navigate(obj: any) {

    const id = obj.smsCreditId;

   // this.utilService.setProjectNumber(projectNo);

    this.clientDetailService.setClientId(id);

    this.utilService.setCurrentUrl('users/smsCredit');

    this.router.navigate([`/users/smsCredit/${id}`]);

  }

}

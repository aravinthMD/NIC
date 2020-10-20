import { Component, OnInit,Input,ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-tax-invoice',
  templateUrl: './tax-invoice.component.html',
  styleUrls: ['./tax-invoice.component.scss']
})
export class TaxInvoiceComponent implements OnInit {

  @ViewChild(MatPaginator,{static : true}) paginator : MatPaginator;

  @Input('userObj') user : any;

  displayedColumns : string[] = ['InvoiceNo','projectNo','piAmt','remarks']

  userList : any[] =   [
   
    {invoiceNo : 1343,projectNumber : 4355,piAmt:24250,remarks:''},
    {invoiceNo : 5464,projectNumber : 5655,piAmt:35000,remarks:''},
    {invoiceNo : 7687,projectNumber : 3424,piAmt:23450,remarks:''}

  ];

  dataSource = new MatTableDataSource<any>(this.userList);


  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;

  }

}

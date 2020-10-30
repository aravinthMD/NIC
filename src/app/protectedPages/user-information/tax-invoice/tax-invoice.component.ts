import { Component, OnInit,Input,ViewChild,AfterViewInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Validators, FormBuilder, FormGroup,FormControl } from "@angular/forms";
import { LabelsService } from 'src/app/services/labels.service';
import {DatePipe} from '@angular/common';

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
  taxInvoiceForm:FormGroup
  labels: any ={};


  constructor(private labelsService: LabelsService,
    private Datepipe:DatePipe) { }

  ngOnInit() {
    this.labelsService.getLabelsData().subscribe((values)=> {
      this.labels = values;
    });
    this.taxInvoiceForm=new FormGroup({
      taxIN:new FormControl(null),
      invoiceDate:new FormControl(null),
      projectNo:new FormControl(null),
      poNumber:new FormControl(null),
      poDate:new FormControl(null),
      fromDate:new FormControl(null),
      toDate:new FormControl(null),
      invoiceAmount:new FormControl(null),
      remark:new FormControl(null),
      billClaim:new FormControl(null),
      uploadDoc:new FormControl(null),
    })
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;

  }
  taxInForm(){
    this.taxInvoiceForm.value['fromDate']=this.Datepipe.transform(this.taxInvoiceForm.value['fromDate'],'dd/MM/yyyy')
    this.taxInvoiceForm.value['toDate']=this.Datepipe.transform(this.taxInvoiceForm.value['toDate'],'dd/MM/yyyy')
    this.taxInvoiceForm.value['poDate']=this.Datepipe.transform(this.taxInvoiceForm.value['poDate'],'dd/MM/yyyy')
    this.taxInvoiceForm.value['invoiceDate']=this.Datepipe.transform(this.taxInvoiceForm.value['invoiceDate'],'dd/MM/yyyy')
    console.log(this.taxInvoiceForm.value)
    this.taxInvoiceForm.reset()
  }

}

import { Component, OnInit,Input,ViewChild,AfterViewInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Validators, FormBuilder, FormGroup,FormControl } from "@angular/forms";
import { LabelsService } from 'src/app/services/labels.service';
import {DatePipe} from '@angular/common';
import { ActivatedRoute } from '@angular/router'
import { MatDialog } from '@angular/material';
import { TaxInvoiceDialogComponent } from './tax-invoice-dialog/tax-invoice-dialog.component';


@Component({
  selector: 'app-tax-invoice',
  templateUrl: './tax-invoice.component.html',
  styleUrls: ['./tax-invoice.component.scss']
})
export class TaxInvoiceComponent implements OnInit {

  @ViewChild(MatPaginator,{static : true}) paginator : MatPaginator;

  @Input('userObj') user : any;

  displayedColumns : string[] = ['InvoiceNo','projectNo','piAmt','remarks','Active']

  userList : any[] =   [
   
    {invoiceNo : 1343,projectNumber : 4535,piAmt:24250,remarks:''},
    {invoiceNo : 5464,projectNumber : 4535,piAmt:35000,remarks:''},
    {invoiceNo : 7687,projectNumber : 4535,piAmt:23450,remarks:''}

  ];
  paymentStatus: any[] = [
    { key: 0, value: 'Pending' },
    { key: 1, value: 'Received' },
    { key: 2, value: 'On Hold' }]

    invoiceStatusList :  any[] = [
      {key : 0,value : 'Pending'},
      {key : 1,value : 'Paid'},
      {key : 2,value : 'Partially Paid'},
      {kwy : 3,value : 'Return by NICSI'}
    ]

  dataSource = new MatTableDataSource<any>(this.userList);
  taxInvoiceForm:FormGroup;
  searchForm : FormGroup;
  labels: any ={};
  isDirty: boolean;
  toDate =new Date();
  accountName: string;

  status: string;

  constructor(private labelsService: LabelsService,
    private Datepipe:DatePipe,private activatedRoute: ActivatedRoute,
    private dialog : MatDialog) { }

  ngOnInit() {
    this.labelsService.getLabelsData().subscribe((values)=> {
      this.labels = values;

    });
    this.taxInvoiceForm=new FormGroup({
      userName: new FormControl(null),
      taxIN:new FormControl(null),
      invoiceDate:new FormControl(null),
      projectNo:new FormControl(null),
      poNumber:new FormControl(null),
      poDate:new FormControl(null),
      fromDate:new FormControl(null),
      toDate:new FormControl(null),
      invoiceAmount:new FormControl(null),
      remark:new FormControl(null),
      uploadDoc:new FormControl(null),
      paymentStatus:new FormControl(null),
      invoiceStatus : new FormControl(null),
      invoiceAmountPaid : new FormControl(null),
      tds :  new FormControl(null),
      penalty :  new FormControl(null),
      shortPay : new FormControl(null),
      submittedOn : new FormControl(null),
      poBillable : new FormControl(null)
    })

    this.searchForm = new FormGroup({
      searchData: new FormControl(null),
      searchFrom: new FormControl(null),
      searchTo: new FormControl(null)
    })

    this.activatedRoute.params.subscribe((value)=> {

      this.userList =   [
   
        {invoiceNo : 1343,projectNumber : value.projectNo || 4535,piAmt:24250,remarks:''},
        {invoiceNo : 5464,projectNumber : value.projectNo || 4535,piAmt:35000,remarks:''},
        {invoiceNo : 7687,projectNumber : value.projectNo || 4535,piAmt:23450,remarks:''},
        {invoiceNo : 9867,projectNumber : value.projectNo || 4535,piAmt:13000,remarks:''},
        {invoiceNo : 6563,projectNumber : value.projectNo || 4535,piAmt:1000,remarks:''},
        {invoiceNo : 5535,projectNumber : value.projectNo || 4535,piAmt:9000,remarks:''},
        {invoiceNo : 5435,projectNumber : value.projectNo || 4535,piAmt:6600,remarks:''},
        {invoiceNo : 8887,projectNumber : value.projectNo || 4535,piAmt:6767,remarks:''},
        {invoiceNo : 6555,projectNumber : value.projectNo || 4535,piAmt:6774,remarks:''},
        {invoiceNo : 5445,projectNumber : value.projectNo || 4535,piAmt:5666,remarks:''},
        {invoiceNo : 7766,projectNumber : value.projectNo || 4535,piAmt:8787,remarks:''},
        {invoiceNo : 5443,projectNumber : value.projectNo || 4535,piAmt:5465,remarks:''},
        {invoiceNo : 9088,projectNumber : value.projectNo || 4535,piAmt:6566,remarks:''},
        {invoiceNo : 7756,projectNumber : value.projectNo || 4535,piAmt:5566,remarks:''},
        {invoiceNo : 9787,projectNumber : value.projectNo || 4535,piAmt:6555,remarks:''}
    
      ];

    })

    this.dataSource = new MatTableDataSource<any>(this.userList);

  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;

  }
  taxInForm(){
    if(this.taxInvoiceForm.invalid) {
     
      this.isDirty = true;

      return
    }
    this.taxInvoiceForm.value['fromDate']=this.Datepipe.transform(this.taxInvoiceForm.value['fromDate'],'dd/MM/yyyy')
    this.taxInvoiceForm.value['toDate']=this.Datepipe.transform(this.taxInvoiceForm.value['toDate'],'dd/MM/yyyy')
    this.taxInvoiceForm.value['poDate']=this.Datepipe.transform(this.taxInvoiceForm.value['poDate'],'dd/MM/yyyy')
    this.taxInvoiceForm.value['invoiceDate']=this.Datepipe.transform(this.taxInvoiceForm.value['invoiceDate'],'dd/MM/yyyy')
    this.taxInvoiceForm.value['submittedOn'] = this.Datepipe.transform(this.taxInvoiceForm.value['submittedOn'],'dd/MM/yyyy')
    console.log(this.taxInvoiceForm.value)
    this.taxInvoiceForm.reset()
  }

  onSearch() {

    console.log(this.searchForm.value)
  }

  clear() {

    this.searchForm.patchValue({
      searchData: null,
      searchFrom:null,
      searchTo:null
    })
  }

  OnEdit(fromObj :  any){
    const dialogRef = this.dialog.open(TaxInvoiceDialogComponent, {
      data : {
        value : 'testing'
      }
    })

    dialogRef.afterClosed().subscribe((result) =>{
      console.log('The dialog was closed', result);

    })
  }

}

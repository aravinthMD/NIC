import { AfterViewInit, Component, OnInit,ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormGroup,FormControl } from "@angular/forms";
import {LabelsService} from '../../../services/labels.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-purchase-entry',
  templateUrl: './purchase-entry.component.html',
  styleUrls: ['./purchase-entry.component.scss']
})
export class PurchaseEntryComponent implements OnInit,AfterViewInit {

  @ViewChild(MatPaginator,{static : true}) paginator : MatPaginator;


  displayedColumns : string[] = ['purchaseNo','projectNo','piAmt','remarks','remainder']


  userList : any[] =   [
    {purchaseNo : 114,projectNumber : 5345,piAmt:24250,remarks:''},
    {purchaseNo : 197,projectNumber : 5465,piAmt:25000,remarks:''},
    {purchaseNo : 767,projectNumber : 2344,piAmt:45000,remarks:''},
    {purchaseNo : 678,projectNumber : 2367,piAmt:24250,remarks:''},
    {purchaseNo : 114,projectNumber : 5654,piAmt:28000,remarks:''},
    {purchaseNo : 114,projectNumber : 5345,piAmt:34000,remarks:''},
  ];


  dataSource = new MatTableDataSource<any>(this.userList);


  PurchaseEntryForm : FormGroup;
  isDirty: boolean;
  labels :  any;


  modeOfPaymentList = [
    {key : 0 ,value : 'DD'},
    {key : 1 ,value : "Chq"},
    {key : 2 , value : "RTGS"},
    {key : 3 ,value : "NEFT"}
  ]


  constructor(private labelsService : LabelsService) { }

  ngOnInit() {

    this.labelsService.getLabelsData().subscribe((value) => {
      this.labels = value;

    });

    this.PurchaseEntryForm = new FormGroup({
      userName : new FormControl(null),
      piNumber : new FormControl(null),
      piDate : new FormControl(null),
      piAmount : new FormControl(null),
      modeOfPayment : new FormControl(null),
      documentNo :  new FormControl(null),
      dateOfTransaction :  new FormControl(null),
      bankName : new FormControl(null),
      amountGiven : new FormControl(null),
      tds : new FormControl(null),
      NICSIProjectNo : new FormControl(null),
      invoiceDate :  new FormControl(null),
      transactionDate : new FormControl(null)
    });
  }

  PEForm(){
    if(this.PurchaseEntryForm.invalid){
      this.isDirty = true;
      return
    }

    this.PurchaseEntryForm.reset();

  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;

  }



  }




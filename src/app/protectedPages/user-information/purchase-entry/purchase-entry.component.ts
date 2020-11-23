import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup,FormControl } from "@angular/forms";
import { from } from 'rxjs';
import {LabelsService} from '../../../services/labels.service';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-purchase-entry',
  templateUrl: './purchase-entry.component.html',
  styleUrls: ['./purchase-entry.component.scss']
})
export class PurchaseEntryComponent implements OnInit {


  PurchaseEntryForm : FormGroup;
  isDirty: boolean;
  labels :  any;

  piPaidValues = [
    {
    key: 0, 
    value: 'Full Payment'
  },
  {
    key: 1, 
    value: 'Partial Payment'
  }]


  modeOfPaymentList = [
    {key : 0 ,value : 'DD'},
    {key : 1 ,value : "Cheque"},
    {key : 2 , value : "RTGS"},
    {key : 3 ,value : "IMPS"}
  ]

  userList : any[] =   [
    {projectNo:4535, invoiceNumber: 4355, invoiceDate: '12/04/2017', amount: 50000},
    {projectNo:4535, invoiceNumber: 2313, invoiceDate: '15/06/2018', amount: 45900},
    {projectNo:4535, invoiceNumber: 6574, invoiceDate: '21/08/2019', amount: 23000}

  ]

  dataSource = new MatTableDataSource<any>(this.userList);

  displayedColumns : string[] = ["ProjectNo","InvoiceNo","InvoiceDate","Amount"]

  searchForm: FormGroup;


  constructor(private labelsService : LabelsService) { 


    this.searchForm = new FormGroup({
      searchData: new FormControl(null),
      searchFrom: new FormControl(null),
      searchTo: new FormControl(null)
    })


  }

  ngOnInit() {

    this.labelsService.getLabelsData().subscribe((value) => {
      this.labels = value;

    });

    this.PurchaseEntryForm = new FormGroup({
      userName : new FormControl(null),
      piNumber : new FormControl(null),
      piDate : new FormControl(null),
      piAmount : new FormControl(null),
      modeOfPayment : new FormControl(''),
      documentNo :  new FormControl(null),
      dateOfTransaction :  new FormControl(null),
      bankName : new FormControl(null),
      amountReceived : new FormControl(null),
      tds : new FormControl(null),
      NICSIProjectNo : new FormControl(null),
      invoiceDate :  new FormControl(null),
      transactionDate : new FormControl(null),
      piPaid: new FormControl('')
    });


    this.dataSource = new MatTableDataSource<any>(this.userList);
  }

  PEForm(){
    if(this.PurchaseEntryForm.invalid){
      this.isDirty = true;
      return
    }

    this.PurchaseEntryForm.reset();

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

  }




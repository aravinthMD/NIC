import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup,FormControl } from "@angular/forms";
import { from } from 'rxjs';
import {LabelsService} from '../../../services/labels.service';

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
  }

  PEForm(){
    if(this.PurchaseEntryForm.invalid){
      this.isDirty = true;
      return
    }

    this.PurchaseEntryForm.reset();

  }

  }




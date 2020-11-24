import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import {LabelsService} from '../../../../services/labels.service'

@Component({
  selector: 'app-tax-invoice-dialog',
  templateUrl: './tax-invoice-dialog.component.html',
  styleUrls: ['./tax-invoice-dialog.component.scss']
})
export class TaxInvoiceDialogComponent implements OnInit {

  labels :  any;
  buttonName : string = 'Edit';
  taxInvoiceForm : FormGroup;
  enableFlag : boolean = true;
  isDirty : boolean;

  

  constructor(private formBuilder : FormBuilder,private dialogRef : MatDialogRef<TaxInvoiceDialogComponent>,
    private labelService : LabelsService) {

    this.taxInvoiceForm = this.formBuilder.group({
      userName : ['Arun'],
      taxIN : ['7867'],
      invoiceDate : new Date(),
      projectNo : ['6878'],
      poNumber : ['2002'],
      poDate : new Date(),
      fromDate : new Date(),
      toDate : new Date(),
      invoiceAmount : ['10000'],
      remark : ['Testing'],
      uploadDoc : [''],
      paymentStatus : ['2'],
      invoiceStatus : ['1'],
      invoiceAmountPaid : ['10000'],
      tds : ['10000'],
      penalty : ['10000'],
      shortPay : ['2000'],
      submittedOn : new Date(),
      poBillable : ['1000']
    })
   }

   invoiceStatusList :  any[] = [
    {key : 0,value : 'Pending'},
    {key : 1,value : 'Paid'},
    {key : 2,value : 'Partially Paid'},
    {kwy : 3,value : 'Return by NICSI'}
  ]

  paymentStatus: any[] = [
    { key: 0, value: 'Pending' },
    { key: 1, value: 'Received' },
    { key: 2, value: 'On Hold' }]

  ngOnInit() {
    this.labelService.getLabelsData().subscribe((value) => {
      this.labels = value;
    })
  }

  OnUpdate(){
    this.buttonName  = 'Update';
    this.enableFlag = false;

    if(this.taxInvoiceForm.invalid){
      this.isDirty = true;
    }
  }

  closeDialog(){
    this.dialogRef.close({event : 'close',data : 'returnvalue'});
  }

}

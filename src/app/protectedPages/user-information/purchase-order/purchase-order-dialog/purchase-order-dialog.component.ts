import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import {LabelsService } from '../../../../services/labels.service'

@Component({
  selector: 'app-purchase-order-dialog',
  templateUrl: './purchase-order-dialog.component.html',
  styleUrls: ['./purchase-order-dialog.component.scss']
})
export class PurchaseOrderDialogComponent implements OnInit {

  labels : any;
  buttonName : string = 'Edit';
  PurchaseOrderForm :  FormGroup;
  enableFlag : boolean = true;
  isDirty : boolean;
  poStatus: any[] = [
    { key :0, value: 'Received' },
    { key :1,value : 'Not Received'},
    { key :2,value : 'Raised'},
    { key: 3, value: 'Pending' },
    { key: 4, value: 'Rejected' },
    { key: 5, value: 'On Hold' }]

    departmentListData = [
      {key:0,value:'Department of Sainik Welfare'},
      {key:1,value:'Minstry of minority affairs'},
      {key:2,value:'Vishakhapatnam port Trust'},
      {key:3,value:'Ministry of trible affairs'},
      {key:4,value:'Bureasu of Naviks.Mumbai'}
  ];

  paymentStatus: any[] = [
    { key: 0, value: 'Pending' },
    { key: 1, value: 'Received' },
    { key: 2, value: 'On Hold' }]

  constructor(private labelService :  LabelsService,private formBuilder : FormBuilder,
    private dialogRef : MatDialogRef<PurchaseOrderDialogComponent>) {

    this.PurchaseOrderForm = this.formBuilder.group({
      userName : ['Kumaran'],
      piNumber : ['35000'],
      poNumber : ['45000'],
      smsApproved : ['2000'],
      projectName : ['STNIC'],
      date : new Date(),
      withoutTax : ['2400'],
      poStatus : ['3'],
      startDate : new Date(),
      endDate : new Date(),
      userEmail : ['mathur@nic.com'],
      poManagerEmail : ['kumar@nicadmin.com'],
      projectNo : ['3400'],
      poAmountWithTax : [5000],
      departmentName : ['2'],
      paymentStatus : ['1'],
      uploadDoc : ['']
    })

   }

  ngOnInit() {
    this.labelService.getLabelsData().subscribe((value) =>{
    this.labels = value;
    })
  }

  OnUpdate(){
    this.buttonName = 'Update';
    this.enableFlag = false;

    if(this.PurchaseOrderForm.invalid)
      this.isDirty = true;

  }


  closeDialog(){
    this.dialogRef.close({event : 'close',data : 'returnvalue'})
  }

}

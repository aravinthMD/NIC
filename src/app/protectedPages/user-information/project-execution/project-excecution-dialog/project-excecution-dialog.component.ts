import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup,FormControl } from "@angular/forms";
import {LabelsService} from '../../../../services/labels.service';
import { MatDialogRef ,MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-project-excecution-dialog',
  templateUrl: './project-excecution-dialog.component.html',
  styleUrls: ['./project-excecution-dialog.component.scss']
})
export class ProjectExcecutionDialogComponent implements OnInit {

  ProjectExcecutionForm :  FormGroup ;
  isDirty: boolean;
  labels :  any;
  buttonName : any = 'Edit';
  enableflag :boolean = true;

  modeOfPaymentList = [
    {key : 0 ,value : 'DD'},
    {key : 1 ,value : "Cheque"},
    {key : 2 , value : "RTGS"},
    {key : 3 ,value : "IMPS"}
  ]

  departmentListData = [
    {key:0,value:'Department of Sainik Welfare'},
    {key:1,value:'Minstry of minority affairs'},
    {key:2,value:'Vishakhapatnam port Trust'},
    {key:3,value:'Ministry of trible affairs'},
    {key:4,value:'Bureasu of Naviks.Mumbai'}
];

  piPaidValues = [
    {
    key: 0, 
    value: 'Full Payment'
  },
  {
    key: 1, 
    value: 'Partial Payment'
  }]



  constructor(private labelsService : LabelsService,private dialogRef : MatDialogRef<ProjectExcecutionDialogComponent> ,private formBuilder :  FormBuilder) { 

    // this.ProjectExcecutionForm = new FormGroup({
    //   userName : new FormControl(null),
    //   piNumber : new FormControl(null),
    //   piDate : new FormControl(null),
    //   piAmount : new FormControl(null),
    //   modeOfPayment : new FormControl(''),
    //   documentNo :  new FormControl(null),
    //   dateOfTransaction :  new FormControl(null),
    //   bankName : new FormControl(null),
    //   amountReceived : new FormControl(null),
    //   tds : new FormControl(null),
    //   NICSIProjectNo : new FormControl(null),
    //   invoiceDate :  new FormControl(null),
    //   transactionDate : new FormControl(null),
    //   piPaid: new FormControl('')
    // });

    this.ProjectExcecutionForm = this.formBuilder.group({
      userName : ['Suchita'],
      piNumber : ['4355'],
      piDate : new Date(),
      piAmount : ['50000'],
      modeOfPayment : ['2'],
      documentNo : ['3000'],
      dateOfTransaction : new Date(),
      bankName : ['SBI'],
      amountReceived : ['30000'],
      tds : ['2500'],
      NICSIProjectNo: ['6785'],
      invoiceDate : new Date(),
      transactionDate : new Date(),
      piPaid : ['1']
    })

  }

  ngOnInit() {

    this.labelsService.getLabelsData().subscribe((value) => {
      this.labels = value;
    })

  }

  OnUpdate(){
    this.buttonName = 'Update';
    this.enableflag = false;

    if(this.ProjectExcecutionForm.invalid){
      this.isDirty = true;
    }

  }


  closeDialog(){
    this.dialogRef.close({ event : 'close' ,data : 'returnvalue'});
  }

  


}

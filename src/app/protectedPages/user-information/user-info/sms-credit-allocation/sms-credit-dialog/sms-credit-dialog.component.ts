import { Component, OnInit } from '@angular/core';
import { Validators,FormBuilder, FormGroup,FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { DatePipe } from '@angular/common';
import { LabelsService } from '@services/labels.service';

import { ToasterService } from '@services/toaster.service';

import { UtilService } from '@services/util.service';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sms-credit-dialog',
  templateUrl: './sms-credit-dialog.component.html',
  styleUrls: ['./sms-credit-dialog.component.scss']
})
export class SmsCreditDialogComponent implements OnInit {

  smsCreditAllocation : FormGroup;

  currentDate:any;

  labels: any = {};

  propertyFlag: boolean;

  isDirty: boolean = false;

  isDisabledInp=true;

  showDataSaveModal: boolean;

  dataValue: {
    title: string;
    message: string
  }


  statusList=[
    {key:0,value:'Approved'},
    {key:1,value:'Rejected'},
    {key:2,value:'Pending'}
];

smsQuotaMetrix:any[]=[
  {key:0,value:'arpita.burman@nic.in'},
  {key:1,value:'dureja.sk@nic.in'},
  {key:2,value:'sshanker@nic.in'},
  {key:3,value:'pradeep.garg@nic.in'}
];

  constructor(private dialogRef : MatDialogRef<SmsCreditDialogComponent>,private datePipe: DatePipe,private labelsService :LabelsService,private toasterService: ToasterService,private formBuilder:FormBuilder,  private utilService:UtilService,
    private router:Router,) {

    this.currentDate=this.datePipe.transform(new Date(), 'MMM d, y, h:mm:ss a	')
    this.smsCreditAllocation =this.formBuilder.group({
      smsQuotaMetrix: [''],
      credit:[null,Validators.pattern("^[0-9]{0,12}$")],
      date : [null],
      status : [''],
      onApprovalOf : [null],
      remark : [null],
      statusChangedBy : ['Akshaya'],
      timeStamp: [this.currentDate]

    })

   }

  ngOnInit() {

    

    this.labelsService.getLabelsData().subscribe((values)=> {
      this.labels = values;
    });


   
    
  }

  closeDialog(){
    this.dialogRef.close({event : 'close'});
  }

  onSubmit() {
   
    if(this.smsCreditAllocation.invalid) {
      this.isDirty = true;
      // this.toasterService.showError('Please fill all the mandatory fields','')
      return
    }

    this.toasterService.showSuccess('Data Saved Successfully','')

    this.showDataSaveModal = true;
    this.dataValue= {
      title: 'SMS Credit Saved Successfully',
      message: 'Are you sure you want to proceed proforma invoice page?'
    }

  }

  detectDateKeyAction(event,type) {

    console.log(event)
  
    if(type == 'date') {

      this.smsCreditAllocation.patchValue({
        date: ''
      })
      this.toasterService.showError('Please click the date icon to select date','');
    }
    
  }

  saveYes() {
    this.utilService.setCurrentUrl('users/proformaInvoice')
    let pno = '';
    this.utilService.projectNumber$.subscribe((val)=> {
      pno = val;
    })

    this. closeDialog()
    this.router.navigate(['/users/proformaInvoice/'+pno])
  }

  saveCancel() {
    this.showDataSaveModal = false;
    this. closeDialog()
  }

  

}

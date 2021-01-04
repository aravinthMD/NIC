import { Component, OnInit,Optional,Inject } from '@angular/core';
import { Validators,FormBuilder, FormGroup,FormControl } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
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

showView: boolean = true;

viewInfoData: any;


  constructor(private dialogRef : MatDialogRef<SmsCreditDialogComponent>,private datePipe: DatePipe,private labelsService :LabelsService,private toasterService: ToasterService,private formBuilder:FormBuilder,  private utilService:UtilService,
    private router:Router,@Optional() @Inject(MAT_DIALOG_DATA) public data: any) {

    this.currentDate=this.datePipe.transform(new Date(), 'MMM d, y, h:mm:ss a	')
    this.smsCreditAllocation =this.formBuilder.group({
      smsQuotaMetrix: [''],
      credit:[null,Validators.pattern("^[0-9]{0,12}$")],
      smsTraffic:[null],
      availableCredit:[null],
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


    this.viewInfoData = [
      {
        key: this.labels.smsQuotaMatrix,
        value:'pradeep.garg@nic.in'
      },
      {
        key: this.labels.dateOfRequest,
        value:'02/12/2020'
      },
      {
        key: this.labels.credit,
        value:this.data.credit
      },
      {
        key: this.labels.smsTraffic,
        value:'1000'
      },
      {
        key: this.labels.availableCredit,
        value:(Number(this.data.credit) - 1000)
      },
      {
        key: this.labels.status,
        value:'Approved'
      },
      {
        key: this.labels.onApprovalOf,
        value:'pradeep.garg@nic.in'
      },
      {
        key: this.labels.remark,
        value:'Changes in all fields'
      },
      {
        key: this.labels.statusChangedBy,
        value:'Akshaya'
      },
      {
        key :  "",
        value :  ""
      },
      {
        key : "",
        value :  ""
      },
      {
        key :  "",
        value :  ""
      },
      {
        key  : "",
        value  : ""
      }
     
   ]
    
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

  onEdit() {

    this.showView = false;

    this.smsCreditAllocation.patchValue({
      smsQuotaMetrix: '3',
      credit:this.data.credit,
      smsTraffic: '1000',
      availableCredit: (Number(this.data.credit) - 1000),
      date : new Date('2020-12-02'),
      status : '1',
      onApprovalOf : 'pradeep.garg@nic.in',
      remark : 'Changes in fields',
      statusChangedBy : 'Akshaya',
      timeStamp: this.currentDate

    })


  }

  

}

import { Component, OnInit,Optional, Inject } from '@angular/core';
import { Validators, FormBuilder, FormGroup,FormControl } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LabelsService } from '../../../../services/labels.service';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-proforma-invoice-dialog-form',
  templateUrl: './proforma-invoice-dialog-form.component.html',
  styleUrls: ['./proforma-invoice-dialog-form.component.scss']
})
export class ProformaInvoiceDialogFormComponent implements OnInit {

  buttonName : any = 'Edit'
  enableflag :boolean = true;

  

  labels: any;

  form : FormGroup;

  isDirty: boolean;

  piStatusData = [{key:0,value:'Received'},{key:1,value:'Approved'},{key:2,value:'Pending'},{key:3,value:'Rejected'},{key:4,value:'On hold'}]

  paymentStatusData = [{key:0,value:'Received'},{key:1,value:'Pending'},{key:2,value:'On hold'}]


  nicsiData = [
    {
      key: '1',
      value: 'ukjena@nic.in'
    },
    {
      key: '2',
      value: 'vinod.agrawal@nic.in'
    },
    {
      key: '3',
      value: 'rk.raina@nic.in'
    },
    {
      key: '4',
      value: 'sshanker@nic.in'
    },
    {
      key: '5',
      value: 'Deepak.saxena@nic.in'
    }
  ]
  
  constructor( public dialogRef: MatDialogRef<ProformaInvoiceDialogFormComponent>,
    
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,private labelsService: LabelsService,private formBuilder : FormBuilder,private datePipe: DatePipe) { 

    console.log(data)

    this.form =this.formBuilder.group({
    
      accountName: ['Suresh'],
      invoiceNumber : ['3456'],
      refNumber: ['43434'],
      piTraffic: ['5678'],
      piOwner: ['Raja'],
      date: new Date(),
      nicsiManager: ['2'],
      piAmount: ['50000'],
      startDate:new Date(),
      endDate:new Date(),
      piStatus: ['2'],
      paymentStatus:['2']

    })
  }

  ngOnInit() {

    this.labelsService.getLabelsData().subscribe((values)=> {
      this.labels = values;
    })

  }

  OnUpdate(){
    this.buttonName = 'Update';
    this.enableflag = false;

    if(this.form.invalid) {
      this.isDirty = true;
    }

    this.form.value['fromDate'] = this.datePipe.transform(this.form.value['fromDate'], 'dd/MM/yyyy')
    this.form.value['toDate'] = this.datePipe.transform(this.form.value['toDate'], 'dd/MM/yyyy')
    this.form.value['invoiceDate'] = this.datePipe.transform(this.form.value['invoiceDate'], 'dd/MM/yyyy')
    this.form.value['poDate'] = this.datePipe.transform(this.form.value['poDate'], 'dd/MM/yyyy')

    console.log(this.form.value)

  }

  formDateFunc(event) {
    
  }

  closeDialog() {
    this.dialogRef.close({ event: 'close', data: 'returnvalue' });
  }

}

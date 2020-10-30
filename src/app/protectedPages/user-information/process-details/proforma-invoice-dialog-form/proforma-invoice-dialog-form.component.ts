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


  constructor( public dialogRef: MatDialogRef<ProformaInvoiceDialogFormComponent>,
    
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,private labelsService: LabelsService,private formBuilder : FormBuilder,private datePipe: DatePipe) { 

    console.log(data)

    this.form =this.formBuilder.group({
      invoiceNumber : ['3456'],
      projectNumber : ['4568'],
      poNumber: ['5678'],
      piAmount: ['54500'],
      emailAddress: ['guru.auth@nic.com'],
      remark: ['remarks'],
      piBillable: ['pibillable'],
      fromDate : new Date(),
      toDate : new Date(),
      invoiceDate : new Date(),
      poDate : new Date(),
      piStatus: '1',
      paymentStatus:'1'

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

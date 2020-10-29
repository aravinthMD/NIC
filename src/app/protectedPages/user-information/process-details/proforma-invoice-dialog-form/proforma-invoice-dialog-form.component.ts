import { Component, OnInit,Optional, Inject } from '@angular/core';
import { Validators, FormBuilder, FormGroup,FormControl } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LabelsService } from '../../../../services/labels.service';

@Component({
  selector: 'app-proforma-invoice-dialog-form',
  templateUrl: './proforma-invoice-dialog-form.component.html',
  styleUrls: ['./proforma-invoice-dialog-form.component.scss']
})
export class ProformaInvoiceDialogFormComponent implements OnInit {

  buttonName : any = 'Edit'
  enableflag :boolean = true;

  fromDate = new FormControl(new Date());
  toDate = new FormControl(new Date());
  invoiceDate = new FormControl(new Date());
  poDate = new FormControl(new Date());

  labels: any;

  form : FormGroup

  constructor( public dialogRef: MatDialogRef<ProformaInvoiceDialogFormComponent>,
    
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,private labelsService: LabelsService,private formBuilder : FormBuilder) { 

    console.log(data)

    this.form =this.formBuilder.group({
      invoiceNumber : ['3456'],
      projectNumber : ['4568'],
      poNumber: ['5678'],
      piAmount: ['54500'],
      emailAddress: ['guru.auth@nic.com'],
      remark: ['remarks'],
      piBillable: ['pibillable']
    })
  }

  ngOnInit() {

    this.labelsService.getLabelsData().subscribe((values)=> {
      this.labels = values;
    })

  }

  OnUpdate(){
    this.buttonName = 'Update';
    this.enableflag = false
  }

  formDateFunc(event) {
    
  }

  closeDialog() {
    this.dialogRef.close({ event: 'close', data: 'returnvalue' });
  }

}

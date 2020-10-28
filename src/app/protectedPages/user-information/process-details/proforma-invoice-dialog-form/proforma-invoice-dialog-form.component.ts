import { Component, OnInit,Optional, Inject } from '@angular/core';
import { Validators, FormBuilder, FormGroup,FormControl } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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


  constructor( public dialogRef: MatDialogRef<ProformaInvoiceDialogFormComponent>,
    
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) { 

    console.log(data)
  }

  ngOnInit() {
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

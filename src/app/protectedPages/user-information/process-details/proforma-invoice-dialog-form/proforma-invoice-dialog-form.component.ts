import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-proforma-invoice-dialog-form',
  templateUrl: './proforma-invoice-dialog-form.component.html',
  styleUrls: ['./proforma-invoice-dialog-form.component.scss']
})
export class ProformaInvoiceDialogFormComponent implements OnInit {

  buttonName : any = 'Edit'
  enableflag :boolean = true
  constructor() { }

  ngOnInit() {
  }

  OnUpdate(){
    this.buttonName = 'Update';
    this.enableflag = false
  }

}

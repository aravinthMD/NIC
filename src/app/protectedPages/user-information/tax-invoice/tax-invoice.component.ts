import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-tax-invoice',
  templateUrl: './tax-invoice.component.html',
  styleUrls: ['./tax-invoice.component.scss']
})
export class TaxInvoiceComponent implements OnInit {

  @Input('userObj') user : any;

  constructor() { }

  ngOnInit() {
  }

}

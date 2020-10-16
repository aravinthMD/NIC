import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.scss']
})
export class PurchaseOrderComponent implements OnInit {

  @Input('userObj') user : any

  constructor() { }

  ngOnInit() {
  }

}

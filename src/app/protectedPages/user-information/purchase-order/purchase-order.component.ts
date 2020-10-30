import { Component, OnInit, Input, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Validators, FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { LabelsService } from '../../../services/labels.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.scss']
})
export class PurchaseOrderComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  @Input('userObj') user: any

  displayedColumns: string[] = ['purchaseNo', 'projectNo', 'piAmt', 'remarks']
  poStatus: any[] = [
    { key: 0, value: 'Received' },
    { key: 1, value: 'Pending' },
    { key: 2, value: 'Approved' },
    { key: 3, value: 'Rejected' },
    { key: 4, value: 'On Hold' }]
  piStatus: any[] = [
    { key: 0, value: 'Received' },
    { key: 1, value: 'Pending' },
    { key: 2, value: 'Approved' },
    { key: 3, value: 'Rejected' },
    { key: 4, value: 'On Hold' }]

  piReceivedIn: any[] = [
    { key: 0, value: 'Full' },
    { key: 1, value: 'Partial' }]

  paymentStatus: any[] = [
    { key: 0, value: 'Pending' },
    { key: 1, value: 'Received' },
    { key: 2, value: 'On Hold' }]
    
  userList: any[] = [
    { purchaseNo: 114, projectNumber: 5345, piAmt: 24250, remarks: '' },
    { purchaseNo: 197, projectNumber: 5465, piAmt: 25000, remarks: '' },
    { purchaseNo: 767, projectNumber: 2344, piAmt: 45000, remarks: '' },
    { purchaseNo: 678, projectNumber: 2367, piAmt: 24250, remarks: '' },
    { purchaseNo: 114, projectNumber: 5654, piAmt: 28000, remarks: '' },
    { purchaseNo: 114, projectNumber: 5345, piAmt: 34000, remarks: '' },
  ];
  dataSource = new MatTableDataSource<any>(this.userList);

  date = new FormControl();
  PurchaseOrderForm: FormGroup;
  labels: any = {};

  constructor(
    private labelsService: LabelsService,
    private DatePipe: DatePipe
  ) { }

  ngOnInit() {

    this.labelsService.getLabelsData().subscribe((values) => {
      this.labels = values;
      console.log('label', this.labels)
    })
    this.PurchaseOrderForm = new FormGroup({
      purchaseON: new FormControl(null),
      projectNo: new FormControl(null),
      projectName: new FormControl(null),
      userId: new FormControl(null),
      date: new FormControl(null),
      poAmount: new FormControl(null),
      poStatus: new FormControl(null),
      piStatus: new FormControl(null),
      piReceivedIn: new FormControl(null),
      paymentStatus: new FormControl(null),
      remark: new FormControl(null),
      piBillable: new FormControl(null),
      poBillable: new FormControl(null),
      uploadDoc: new FormControl(null),

    })

  }
  POForm() {
    this.PurchaseOrderForm.value['date'] = this.DatePipe.transform(this.PurchaseOrderForm.value['date'], 'dd/MM/yyyy')
    console.log(this.PurchaseOrderForm.value)
    this.PurchaseOrderForm.reset();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

  }

}

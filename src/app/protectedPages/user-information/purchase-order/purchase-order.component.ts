import { Component, OnInit,Input, AfterViewInit,ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Validators, FormBuilder, FormGroup,FormControl } from "@angular/forms";
import { LabelsService } from '../../../services/labels.service';


@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.scss']
})
export class PurchaseOrderComponent implements OnInit,AfterViewInit {

  @ViewChild(MatPaginator,{static : true}) paginator : MatPaginator;

  @Input('userObj') user : any

  displayedColumns : string[] = ['purchaseNo','projectNo','piAmt','remarks']

  userList : any[] =   [
    {purchaseNo : 114,projectNumber : 5345,piAmt:24250,remarks:''},
    {purchaseNo : 197,projectNumber : 5465,piAmt:25000,remarks:''},
    {purchaseNo : 767,projectNumber : 2344,piAmt:45000,remarks:''},
    {purchaseNo : 678,projectNumber : 2367,piAmt:24250,remarks:''},
    {purchaseNo : 114,projectNumber : 5654,piAmt:28000,remarks:''},
    {purchaseNo : 114,projectNumber : 5345,piAmt:34000,remarks:''},
  ];
  dataSource = new MatTableDataSource<any>(this.userList);

  date = new FormControl();

  labels: any = {};

  constructor(private labelsService: LabelsService) { }

  ngOnInit() {

    this.labelsService.getLabelsData().subscribe((values)=> {
      this.labels = values;
    })
    
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;

  }

  formDateFunc(event) {
    
  }

}

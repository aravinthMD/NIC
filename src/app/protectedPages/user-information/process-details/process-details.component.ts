import { Component, OnInit,ViewChild ,Input,AfterViewInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {ProformaInvoiceDialogFormComponent} from './proforma-invoice-dialog-form/proforma-invoice-dialog-form.component'
import { Validators, FormBuilder, FormGroup,FormControl } from "@angular/forms";
import { LabelsService } from '../../../services/labels.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-process-details',
  templateUrl: './process-details.component.html',
  styleUrls: ['./process-details.component.scss'],
  
})
export class ProcessDetailsComponent implements OnInit,AfterViewInit {

  @ViewChild(MatPaginator,{static : true}) paginator : MatPaginator;
  @Input('userObj') user : any;

  displayedColumns : string[] = ['InvoiceNo','projectNo','piAmt','Action',"remainder"]


  userList : any[] =   [
    {invoiceNo : 4355,projectNumber : 4534,piAmt:25000,remarks:'credited'},
    {invoiceNo : 2313,projectNumber : 6756,piAmt:56000,remarks:'credited'},
    {invoiceNo : 6574,projectNumber : 3453,piAmt:25000,remarks:'credited'}
  ];

  piStatusData = [{key:0,value:'Received'},{key:1,value:'Approved'},{key:2,value:'Pending'},{key:3,value:'Rejected'},{key:4,value:'On hold'}]

  paymentStatusData = [{key:0,value:'Received'},{key:1,value:'Pending'},{key:2,value:'On hold'}]

  dataSource = new MatTableDataSource<any>(this.userList);


  labels: any;

  form : FormGroup;

  isDirty: boolean;

  constructor(private dialog: MatDialog,private labelsService: LabelsService,private formBuilder : FormBuilder,private datePipe: DatePipe) { 


    this.form =this.formBuilder.group({
      invoiceNumber : [null],
      projectNumber : [null],
      poNumber: [null],
      piAmount: [null],
      emailAddress: [null],
      remark: [null],
      piBillable: [null],
      fromDate:[null],
      toDate:[null],
      invoiceDate:[null],
      poDate:[null],
      piStatus: [''],
      paymentStatus:['']

    })


  }

  ngOnInit() {

    this.labelsService.getLabelsData().subscribe((values)=> {
      this.labels = values;
    })

  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;

  }

  OnEdit(formObj : any){
    const dialogRef = this.dialog.open(ProformaInvoiceDialogFormComponent,{
      data: {
        value:'testing'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });

  }

  onSubmit() {

    // this.userList.push({invoiceNo : 8787,projectNumber : 4552,piAmt:50000,remarks:'credited'})

    // this.dataSource = new MatTableDataSource<any>(this.userList);

    // this.dataSource.paginator = this.paginator;

    if(this.form.invalid) {
      this.isDirty = true;
    }


    this.form.value['fromDate'] = this.datePipe.transform(this.form.value['fromDate'], 'dd/MM/yyyy')
    this.form.value['toDate'] = this.datePipe.transform(this.form.value['toDate'], 'dd/MM/yyyy')
    this.form.value['invoiceDate'] = this.datePipe.transform(this.form.value['invoiceDate'], 'dd/MM/yyyy')
    this.form.value['poDate'] = this.datePipe.transform(this.form.value['poDate'], 'dd/MM/yyyy')

    console.log(this.form.value)


  }


}

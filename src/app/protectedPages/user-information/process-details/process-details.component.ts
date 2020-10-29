import { Component, OnInit,ViewChild ,Input,AfterViewInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {ProformaInvoiceDialogFormComponent} from './proforma-invoice-dialog-form/proforma-invoice-dialog-form.component'
import { Validators, FormBuilder, FormGroup,FormControl } from "@angular/forms";
import { LabelsService } from '../../../services/labels.service';

@Component({
  selector: 'app-process-details',
  templateUrl: './process-details.component.html',
  styleUrls: ['./process-details.component.scss'],
  
})
export class ProcessDetailsComponent implements OnInit,AfterViewInit {

  @ViewChild(MatPaginator,{static : true}) paginator : MatPaginator;
  @Input('userObj') user : any;

  displayedColumns : string[] = ['InvoiceNo','projectNo','piAmt','Action']


  userList : any[] =   [
    {invoiceNo : 4355,projectNumber : 4534,piAmt:25000,remarks:'credited'},
    {invoiceNo : 2313,projectNumber : 6756,piAmt:56000,remarks:'credited'},
    {invoiceNo : 6574,projectNumber : 3453,piAmt:25000,remarks:'credited'}
  ];

  dataSource = new MatTableDataSource<any>(this.userList);

  fromDate = new FormControl();
  toDate = new FormControl();
  invoiceDate = new FormControl();
  poDate = new FormControl();

  labels: any;

  constructor(private dialog: MatDialog,private labelsService: LabelsService) { }

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



  }

  formDateFunc(event) {
    
  }


}

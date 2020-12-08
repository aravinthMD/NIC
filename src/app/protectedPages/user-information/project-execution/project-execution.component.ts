import { Component, OnInit,AfterViewInit,ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { Validators, FormBuilder, FormGroup,FormControl } from "@angular/forms";
import { from } from 'rxjs';
import {LabelsService} from '../../../services/labels.service';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material';
import { ProjectExcecutionDialogComponent } from './project-excecution-dialog/project-excecution-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { UtilService } from '@services/util.service'

@Component({
  selector: 'app-project-execution',
  templateUrl: './project-execution.component.html',
  styleUrls: ['./project-execution.component.scss']
})
export class ProjectExecutionComponent implements OnInit,AfterViewInit {


  PurchaseEntryForm : FormGroup;
  isDirty: boolean;
  labels :  any;

  piPaidValues = [
    {
    key: 0, 
    value: 'Full Payment'
  },
  {
    key: 1, 
    value: 'Partial Payment'
  }]


  modeOfPaymentList = [
    {key : 0 ,value : 'DD'},
    {key : 1 ,value : "Cheque"},
    {key : 2 , value : "RTGS"},
    {key : 3 ,value : "IMPS"}
  ]

  userList : any[] =   [
    {projectNo:4535, invoiceNumber: 4355, invoiceDate: '12/04/2017', amount: 50000},
    {projectNo:4535, invoiceNumber: 2313, invoiceDate: '15/06/2018', amount: 45900},
    {projectNo:4535, invoiceNumber: 6574, invoiceDate: '21/08/2019', amount: 23000},
    {projectNo:4535, invoiceNumber: 7454, invoiceDate: '07/04/2016', amount: 56000},
    {projectNo:4535, invoiceNumber: 5667, invoiceDate: '05/05/2017', amount: 45000},
    {projectNo:4535, invoiceNumber: 5663, invoiceDate: '11/08/2019', amount: 24000},
    {projectNo:4535, invoiceNumber: 5889, invoiceDate: '04/07/2018', amount: 53000},
    {projectNo:4535, invoiceNumber: 4500, invoiceDate: '09/09/2019', amount: 12000},
    {projectNo:4535, invoiceNumber: 7800, invoiceDate: '15/02/2019', amount: 14000},
    {projectNo:4535, invoiceNumber: 7688, invoiceDate: '02/05/2019', amount: 15000},
    {projectNo:4535, invoiceNumber: 5322, invoiceDate: '04/08/2018', amount: 12000},
    {projectNo:4535, invoiceNumber: 5454, invoiceDate: '07/09/2019', amount: 17000},
    {projectNo:4535, invoiceNumber: 6543, invoiceDate: '18/03/2017', amount: 18000},
    {projectNo:4535, invoiceNumber: 3445, invoiceDate: '26/05/2016', amount: 67000},
    {projectNo:4535, invoiceNumber: 7908, invoiceDate: '25/04/2019', amount: 43000}

  ]

  @ViewChild(MatPaginator,{static : true}) paginator : MatPaginator;

  dataSource = new MatTableDataSource<any>(this.userList);

  displayedColumns : string[] = ["ProjectNo","InvoiceNo","InvoiceDate","Amount","Action"]

  searchForm: FormGroup;

  accountName: string;
  status: string;

  propertyFlag: boolean;

  constructor(private labelsService : LabelsService,private dialog : MatDialog,
    private activatedRoute: ActivatedRoute,private utilService: UtilService) { 


    this.searchForm = new FormGroup({
      searchData: new FormControl(null),
      searchFrom: new FormControl(null),
      searchTo: new FormControl(null)
    })


  }

  ngOnInit() {

    this.labelsService.getLabelsData().subscribe((value) => {
      this.labels = value;

    });

    this.PurchaseEntryForm = new FormGroup({
      userName : new FormControl(null),
      piNumber : new FormControl(null),
      piDate : new FormControl(null),
      piAmount : new FormControl(null),
      modeOfPayment : new FormControl(''),
      documentNo :  new FormControl(null),
      dateOfTransaction :  new FormControl(null),
      bankName : new FormControl(null),
      amountReceived : new FormControl(null),
      tds : new FormControl(null),
      NICSIProjectNo : new FormControl(null),
      invoiceDate :  new FormControl(null),
      transactionDate : new FormControl(null),
      piPaid: new FormControl(''),
      remark:new FormControl('')
    });

    this.utilService.userDetails$.subscribe((val)=> {

      this.accountName = val['userId'] || '';
      this.status = val['status'] || '';
    })

    this.activatedRoute.params.subscribe((value)=> {

      this.userList =   [
        {projectNo:value.projectNo || 4535, invoiceNumber: 4355, invoiceDate: '12/04/2017', amount: 50000},
        {projectNo:value.projectNo || 4535, invoiceNumber: 2313, invoiceDate: '15/06/2018', amount: 45900},
        {projectNo:value.projectNo || 4535, invoiceNumber: 6574, invoiceDate: '21/08/2019', amount: 23000},
        {projectNo:value.projectNo || 4535, invoiceNumber: 7454, invoiceDate: '07/04/2016', amount: 56000},
        {projectNo:value.projectNo || 4535, invoiceNumber: 5667, invoiceDate: '05/05/2017', amount: 45000},
        {projectNo:value.projectNo || 4535, invoiceNumber: 5663, invoiceDate: '11/08/2019', amount: 24000},
        {projectNo:value.projectNo || 4535, invoiceNumber: 5889, invoiceDate: '04/07/2018', amount: 53000},
        {projectNo:value.projectNo || 4535, invoiceNumber: 4500, invoiceDate: '09/09/2019', amount: 12000},
        {projectNo:value.projectNo || 4535, invoiceNumber: 7800, invoiceDate: '15/02/2019', amount: 14000},
        {projectNo:value.projectNo || 4535, invoiceNumber: 7688, invoiceDate: '02/05/2019', amount: 15000},
        {projectNo:value.projectNo || 4535, invoiceNumber: 5322, invoiceDate: '04/08/2018', amount: 12000},
        {projectNo:value.projectNo || 4535, invoiceNumber: 5454, invoiceDate: '07/09/2019', amount: 17000},
        {projectNo:value.projectNo || 4535, invoiceNumber: 6543, invoiceDate: '18/03/2017', amount: 18000},
        {projectNo:value.projectNo || 4535, invoiceNumber: 3445, invoiceDate: '26/05/2016', amount: 67000},
        {projectNo:value.projectNo || 4535, invoiceNumber: 7908, invoiceDate: '25/04/2019', amount: 43000}
    
      ]

    })

    this.dataSource = new MatTableDataSource<any>(this.userList);
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;

  }

  PEForm(){
    if(this.PurchaseEntryForm.invalid){
      this.isDirty = true;
      return
    }

    this.PurchaseEntryForm.reset();

  }

  onSearch() {

    console.log(this.searchForm.value)
  }

  clear() {

    this.searchForm.patchValue({
      searchData: null,
      searchFrom:null,
      searchTo:null
    })
  }


  OnEdit(formObj : any){
    const dialogRef = this.dialog.open(ProjectExcecutionDialogComponent,{
      data : {
        value : 'testing'
      }
    })

    dialogRef.afterClosed().subscribe(result =>{
      console.log('The dialog was Closed',result);
    })
  }

  getDownloadXls(){
    this.utilService.getDownloadXlsFile(this.userList);
  }
  }




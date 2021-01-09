import { Component, OnInit,AfterViewInit,ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { Validators, FormBuilder, FormGroup,FormControl } from "@angular/forms";
import {DatePipe} from '@angular/common';
import {LabelsService} from '../../../services/labels.service';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material';
import { ProjectExcecutionDialogComponent } from './project-excecution-dialog/project-excecution-dialog.component';
import { Router,ActivatedRoute } from '@angular/router';
import { UtilService } from '@services/util.service';
import { ToasterService } from '@services/toaster.service';
import { InvoiceService } from '@services/invoice.service';
import { ProjectExecutionService } from './services/project-execution.service';


@Component({
  selector: 'app-project-execution',
  templateUrl: './project-execution.component.html',
  styleUrls: ['./project-execution.component.scss'],
  providers: [ ProjectExecutionService]
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

  dataSource = new MatTableDataSource<any>([]);

  displayedColumns : string[] = ["ProjectNo","InvoiceNo","InvoiceDate","Amount","Action"]

  searchForm: FormGroup;

  accountName: string;
  status: string;

  propertyFlag: boolean;

  storeProjectNo: string;

  showDataSaveModal: boolean;

dataValue: {
  title: string;
  message: string
}

  constructor(
              private labelsService : LabelsService,
              private dialog : MatDialog,
              private activatedRoute: ActivatedRoute,
              private utilService: UtilService,
              private toasterService: ToasterService,
              private router: Router,
              private invoiceService : InvoiceService,
              private datePipe:DatePipe,
              private projectExecutionService: ProjectExecutionService
              ) { 
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

      this.storeProjectNo = value.projectNo || 4535
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

    // this.dataSource = new MatTableDataSource<any>(this.userList);

    this.getProjectExecutionDetails();     //Getting the Projet Execution details API

    // this.getProjectExecutionDetailById();

  //  this.deleteProjectExecution();
  }



  searchProjectExecution() {
      const data = {
        searchKeyword: this.searchForm.get('searchData').value,
        fromDate: this.searchForm.get('searchFrom').value,//"2020-12-27T18:30:00.000Z",
        toDate: this.searchForm.get('searchTo').value//"2021-01-05T18:30:00.000Z"
      }
      this.projectExecutionService
          .searchProjectExecution(data).subscribe((value) => {
            console.log('value', value);
          })
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

    this.toasterService.showSuccess('Data Saved Successfully','')

  this.showDataSaveModal = true;
  this.dataValue= {
    title: 'Project Execution Saved Successfully',
    message: 'Are you sure you want to proceed purchase order invoice page?'
  }

  }

    //Create PE

    createProjectExecution(){
      
      // this.updateProjectExecutionDetail();
        const feildControls =   this.PurchaseEntryForm.controls;
        const userName  = feildControls.userName.value;
        const piNumber =  feildControls.piNumber.value;
        const piDate = feildControls.piDate.value;
        const piAmount = feildControls.piAmount.value;
        const modeOfPayment = feildControls.modeOfPayment.value;
        const documentNo = feildControls.documentNo.value;
        const dateOfTransaction = feildControls.dateOfTransaction.value;
        const bankName = feildControls.bankName.value;
        const amountReceived = feildControls.amountReceived.value;
        const tds = feildControls.tds.value;
        const NICSIProjectNo = feildControls.NICSIProjectNo.value;
        const invoiceDate = feildControls.invoiceDate.value;
        const transactionDate =  feildControls.transactionDate.value;
        const piPaid = feildControls.piPaid.value;
        const remark = feildControls.remark.value;
  
  
        const formattedProformaInvoiceDate = this.datePipe.transform(invoiceDate,'dd/MM/yyyy')
        const formattedDateOfTransaction = this.datePipe.transform(transactionDate,'dd/MM/yyyy')
 


        const Data = {
          userName,
          piNumber,
          piDate : formattedProformaInvoiceDate,
          piAmount,
          modeOfPayment,
          documentNo,
          dateOfTransaction : formattedDateOfTransaction,
          bankName,
          amountReceived,
          tds,
          NICSIProjectNo,
          piPaid,
          remark,
          uploadDocument : "file"
        }
  
        this.invoiceService.createProjectExecution(Data).subscribe(
          (response) => {
                console.log(response['ProcessVariables']); 
              if(response['ProcessVariables']){
                this.PurchaseEntryForm.reset();
                this.getProjectExecutionDetails();
                this.toasterService.showSuccess('Data Saved Successfully','')
            
              this.showDataSaveModal = true;
              this.dataValue= {
                title: 'Project Execution Saved Successfully',
                message: 'Are you sure you want to proceed purchase order invoice page?'         
                   } 
                  }
          },(error) => {
            console.log(error)
        })
  
    }



    getProjectExecutionDetails(){   //Fetch All Details

      this.invoiceService.getProjectExecutionDetails('INV123').subscribe((response) => {

        console.log(response);

      this.dataSource = new MatTableDataSource<any>(response["ProcessVariables"]["peList" ]);

      },(error) => {

        console.log(error)

      })


    }

    getProjectExecutionDetailById(){

      this.invoiceService.getProjectExecutionDetailbyId('').subscribe((response) => {

        console.log(response)

      },(error) => {

        console.log(error)

      })

    }


    updateProjectExecutionDetail(){


      const data = {
              "currentPEId":"26",
              "userName":"demouser",
              "invoiceNumber":"INV123",
              "amount":"2000",
              "invoiceDate":"17/12/2020",
              "paymentMode":"cash",
              "documentNumber":"PE1342343",
              "transactionDate":"16/12/2020",
              "branchName":"ABC",
              "receivedAmount":"200",
              "tds":"50",
              "nicsiProjectNumber":"97878978",
              "paidPI":"180",
              "remark":"Remarks",
              "uploadDocument":"Yes",
              "temp":"update"
            }



      this.invoiceService.updateProjectExecutionDetail(data).subscribe((resonse) => {


      },(error) => {


      })
    }


    deleteProjectExecution(){
      
      this.invoiceService.deleteProjectExecution("INV1234").subscribe((response) => {

        console.log(response)

      },(error) => {

        console.log(error)
      })

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
    this.utilService.getDownloadXlsFile(this.userList,'ProjectExecution');
  }


  detectDateKeyAction(event,type) {

    console.log(event)
    
    if(type == 'invoiceDate') {

      this.PurchaseEntryForm.patchValue({
        invoiceDate: ''
      })
      this.toasterService.showError('Please click the PI date icon to select date','');
    }else if(type == 'transactionDate') {

      this.PurchaseEntryForm.patchValue({
        transactionDate: ''
      })
      this.toasterService.showError('Please click the date of transaction icon to select date','');
    }else if(type == 'searchFrom') {
      this.searchForm.patchValue({
        searchFrom: ''
      })
      this.toasterService.showError('Please click the fromdate icon to select date','');
    }else if(type == 'searchTo') {
      this.searchForm.patchValue({
        searchTo: ''
      })
      this.toasterService.showError('Please click the todate icon to select date','');
    }
    
  }

  next() {

    this.utilService.setCurrentUrl('users/purchaseOrder')

    this.router.navigate([`/users/purchaseOrder/${this.storeProjectNo}`])

  }

  back() {
    this.utilService.setCurrentUrl('users/proformaInvoice')

    this.router.navigate([`/users/proformaInvoice/${this.storeProjectNo}`])
  }

  saveYes()
  {
 
   this.showDataSaveModal = false;
   
   this.next()
 
 
  }
 
  saveCancel() {
 
   this.showDataSaveModal = false;

  }


  }




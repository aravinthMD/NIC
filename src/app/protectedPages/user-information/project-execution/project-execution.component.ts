import { Component, OnInit,AfterViewInit,ViewChild } from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
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
import { SearchService } from '../../../services/search.service';
import {ApiService} from '../../../services/api.service';


@Component({
  selector: 'app-project-execution',
  templateUrl: './project-execution.component.html',
  styleUrls: ['./project-execution.component.scss'],
  //providers: [ SearchService]
})
export class ProjectExecutionComponent implements OnInit {

  PurchaseEntryForm : FormGroup;
  isDirty: boolean;
  labels :  any;

  length:number;
  pageSize:number;
  currentPage  = 1;

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



  dataSource = [];

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
              private searchService: SearchService,
              private apiService:ApiService
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
      remark:new FormControl('',Validators.required)
    });

    this.utilService.userDetails$.subscribe((val)=> {

      this.accountName = val['App_name'] || '';
      this.status = val['status'] || '';
    })

    this.activatedRoute.params.subscribe((value)=> {  

      this.storeProjectNo = value.projectNo || 4535
    })

    this.getProjectExecutionDetails(this.currentPage);    
  }



  searchProjectExecution() {

    const data = this.apiService.api.getProjectExecutionDetailsList;
      const params = {
        searchKeyword: this.searchForm.get('searchData').value,
        fromDate: this.searchForm.get('searchFrom').value,//"2020-12-27T18:30:00.000Z",
        toDate: this.searchForm.get('searchTo').value//"2021-01-05T18:30:00.000Z"
      }
      this.searchService
          .searchProjectExecution(data,params).subscribe((resp) => {
            console.log('value', resp);
            const respError=resp["ProcessVariables"]["error" ];
            if(respError.code=="0")
            {
            console.log('result',resp['ProcessVariables']);
            this.dataSource = resp["ProcessVariables"]["peList"];
        }
        else 
        { 
          this.toasterService.showError(`${respError.code}: ${respError.message}`, 'Technical error..');
        }
          })
  }
    //Create PE

    createProjectExecution(){

        if(this.PurchaseEntryForm.invalid){
          this.isDirty = true;
          return
        }

        const feildControls =   this.PurchaseEntryForm.controls;
        const userName  = feildControls.userName.value;
        const piNumber =  feildControls.piNumber.value;
        const piAmount = feildControls.piAmount.value;
        const modeOfPayment = feildControls.modeOfPayment.value;
        const documentNo = feildControls.documentNo.value;
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
                const { 
                  ProcessVariables  : { error : {
                    code,
                    message
                  }}
                } = response;
                
              if(code == '0'){
                this.PurchaseEntryForm.reset();
                this.PurchaseEntryForm.controls['modeOfPayment'].setValue("");
                this.PurchaseEntryForm.controls['piPaid'].setValue("");
                this.isDirty = false;
                this.getProjectExecutionDetails(this.currentPage);
                this.toasterService.showSuccess('Data Saved Successfully','')
                this.showDataSaveModal = true;
                this.dataValue= {
                title: 'Project Execution Saved Successfully',
                message: 'Are you sure you want to proceed purchase order invoice page?'         
                   } 
                  }else{
                this.toasterService.showError(message,'')
                  }
          },
         (error) => {
            console.log(error)
            this.toasterService.showError(error,'')
        })
    }

    getProjectExecutionDetails(currentPage:any){ 
      this.invoiceService.getProjectExecutionDetails(currentPage).subscribe((response) => {
        const { 
          ProcessVariables  : { error : {
            code,
            message
          }}
        } = response;
        console.log(response);
        if(code == "0"){

          const peList = (response["ProcessVariables"]["peList" ] || []).map((value) => {
                    return {
                      projectNumber : value.projectNumber,
                      invoiceNumber  :value.invoiceNumber,
                      invoiceDate  : value.invoiceDate,
                      Amount  : value.Amount,
                      id  : value.currentPEId
                    }
          });

          this.dataSource = peList;
          this.length = response["ProcessVariables"]["totalCount"];
          this.pageSize = response["ProcessVariables"]["dataPerPage"]
        }
        else {
          this.toasterService.showError(message,'')
        }
      },(error) => {
        console.log(error)
        this.toasterService.showError(error,'')
      })
    }

  onSearch() {
    console.log(this.searchForm.value);
  }

  clear() {
    this.searchForm.reset();
    this.getProjectExecutionDetails(this.currentPage);
  }


  OnEdit(Data : any){
    const dialogRef = this.dialog.open(ProjectExcecutionDialogComponent,{
      data : Data.id
    })

    dialogRef.afterClosed().subscribe(result =>{
      console.log('The dialog was Closed',result);
      this.getProjectExecutionDetails(this.currentPage);
    })
  }

  getDownloadXls(){
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


  getServerData(event?:PageEvent){
     let currentPageIndex  = Number(event.pageIndex) + 1;
      this.getProjectExecutionDetails(currentPageIndex);
  }

  }




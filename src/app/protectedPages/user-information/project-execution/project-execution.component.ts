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
import { ClientDetailsService } from '@services/client-details.service';
import { CsvDataService } from '@services/csv-data.service';
import { UtilityService } from '@services/utility.service';

import { ProjectExecutionService } from '@services/project-execution.service';


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

  file : any;
  documentUploadId : string = '';
  uploadedData : any = {}


  piPaidValues = [
    {
    key: 0, 
    value: 'Full Payment'
  },
  {
    key: 1, 
    value: 'Partial Payment'
  }]

  proformaInvoicesList = [];


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

  clientId: string = '';

dataValue: {
  title: string;
  message: string
}
isWrite = true;
isClientActive = true;
csvResponse: any;
lovData: any;
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
              private apiService:ApiService,
              private clientDetailService : ClientDetailsService,
              private utilityService: UtilityService,
              private projectExecutionService: ProjectExecutionService
              ) { 
    this.searchForm = new FormGroup({
      searchData: new FormControl(null),
      searchFrom: new FormControl(null),
      searchTo: new FormControl(null)
    })
this.lovData = this.utilService.getLovData();


  }

  ngOnInit() {
    this.modeOfPaymentList = this.lovData? this.lovData.paymentModeStatusList: null;
    this.piPaidValues = this.lovData? this.lovData.piPaidStatusList: null;
    // ProjectExecution
    this.isClientActive = this.clientDetailService.getClientStatus();
    const smsPage = this.utilityService.getSettingsDataList('ProjectExecution');
    this.isWrite = smsPage.isWrite;

    this.labelsService.getLabelsData().subscribe((value) => {
      this.labels = value;

    });

    // this.PurchaseEntryForm = new FormGroup({
    //   userName : new FormControl(null),
    //   piNumber : new FormControl('',Validators.required),
    //   piDate : new FormControl(null),
    //   piAmount : new FormControl(null),
    //   modeOfPayment : new FormControl(''),
    //   documentNo :  new FormControl(null),
    //   dateOfTransaction :  new FormControl(null),
    //   bankName : new FormControl(null),
    //   amountReceived : new FormControl(null),
    //   tds : new FormControl(null),
    //   NICSIProjectNo : new FormControl(null),
    //   invoiceDate :  new FormControl(null),
    //   transactionDate : new FormControl(null),
    //   piPaid: new FormControl(''),
    //   remark:new FormControl('',Validators.required),
    //   importFile : new FormControl(null)
    // });


    this.clientId = this.clientDetailService.getClientId();

    this.utilService.userDetails$.subscribe((val)=> {

      this.accountName = val ? val['App_name'] :'';
      this.status = val ? val['status'] :'';

      // this.PurchaseEntryForm.controls['userName'].setValue(this.accountName);
    })

    this.activatedRoute.params.subscribe((value)=> {  

      this.storeProjectNo = value.id 
    })

    this.getProjectExecutionDetails(this.currentPage,this.clientId);    
    // this.getPIAutoPopulate(this.clientId);


    // this.PurchaseEntryForm.controls['piNumber'].valueChanges.subscribe((value) => {
    //     if(!value)
    //       return
    //     this.getPIAutoPopulateonChange(value);
    // })

  }

  // displayFn(value)
  // {
  //   this.getPIAutoPopulateonChange(value);
  // }



  searchProjectExecution() {

    const data = this.apiService.api.getProjectExecutionDetailsList;
      const params = {
        selectedClientId: this.clientId,
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

    saveForm(type : string,data : any) {
      let feildControls: any = {};
      if (data) {
        feildControls = data;
      }

      const userName = feildControls.userName;
      const piNumber = feildControls.piNumber;
      const piAmount = feildControls.piAmount;
      const modeOfPayment = feildControls.modeOfPayment;
      const documentNo = feildControls.documentNo;
      const bankName = feildControls.bankName;
      const amountReceived = feildControls.amountReceived;
      const tds = feildControls.tds;
      const NICSIProjectNo = feildControls.NICSIProjectNo;
      const invoiceDate = feildControls.invoiceDate;
      const transactionDate = feildControls.transactionDate;
      const piPaid = feildControls.piPaid;
      const remark = feildControls.remark;

      const formattedProformaInvoiceDate = this.datePipe.transform(
        invoiceDate,
        "dd/MM/yyyy"
      );
      const formattedDateOfTransaction = this.datePipe.transform(
        transactionDate,
        "dd/MM/yyyy"
      );

      const Data: any = {
        userName,
        piNumber,
        piDate: formattedProformaInvoiceDate,
        piAmount,
        modeOfPayment,
        documentNo,
        dateOfTransaction: formattedDateOfTransaction,
        bankName,
        amountReceived,
        tds,
        NICSIProjectNo,
        piPaid,
        remark,
        upload_document: this.documentUploadId,
        userId: this.clientId ? Number(this.clientId) : 0,

      };

      if(type === 'update'){
        Data.id = data.id;
      }

      this.invoiceService
        .createProjectExecution(Data)
        .subscribe(
          (response: any) => {
            console.log(response["ProcessVariables"]);
            const {
              ProcessVariables: {
                error: { code, message },
              },
            } = response;

            if (code == "0") {
              this.PurchaseEntryForm.reset();
              this.PurchaseEntryForm.controls["modeOfPayment"].setValue("");
              this.PurchaseEntryForm.controls["piPaid"].setValue("");
              this.PurchaseEntryForm.controls["userName"].setValue(
                this.accountName
              );
              this.PurchaseEntryForm.controls["piAmount"].setValue("");
              this.PurchaseEntryForm.controls["piDate"].setValue("");
              this.documentUploadId = "";
              this.isDirty = false;
              this.getProjectExecutionDetails(this.currentPage, this.clientId);
              this.toasterService.showSuccess("Data Saved Successfully", "");
              // this.showDataSaveModal = true;
              this.dataValue = {
                title: "Project Execution Saved Successfully",
                message:
                  "Are you sure you want to proceed purchase order invoice page?",
              };
            } else {
              this.toasterService.showError(message, "");
            }
          },
          (error) => {
            console.log(error);
            this.toasterService.showError(error, "");
          }
        );
    }

    exportCsv() {
      const data = {
        selectedClientId: this.clientId
      };
      this.invoiceService.exportCsv(data).
      subscribe((res: any) => {
        const error = res.Error;
        const errorMessage = res.ErrorMessage;
        if (error !== '0') {
          return this.toasterService.showError(errorMessage, '');
        }
        const processVariables = res.ProcessVariables;
        const list = processVariables.peList;
        if (!list) {
          return  this.toasterService.showInfo('No data available for download', '');
        }
        CsvDataService.exportToCsv('Project_Execution.csv', list);
      });
    }

    getProjectExecutionDetails(currentPage:any,selectedClientId : string){ 
      this.invoiceService.getProjectExecutionDetails(currentPage,selectedClientId).
      subscribe((response: any) => {
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
    this.getProjectExecutionDetails(this.currentPage,this.clientId);
  }


  OnEdit(Data : any){
    const dialogRef = this.dialog.open(ProjectExcecutionDialogComponent,{
      data : Data.id
    });

    dialogRef.afterClosed().subscribe(result =>{
      console.log('The dialog was Closed',result);

      if(result === 'success')
      this.getProjectExecutionDetails(this.currentPage,this.clientId);

    })
  }

  detectDateKeyAction(event,type) {
    console.log(event)
     if(type == 'searchFrom') {
      this.searchForm.patchValue({
        searchFrom: ''
      })
      this.toasterService.showError('Please click the from date icon to select date','');
    }else if(type == 'searchTo') {
      this.searchForm.patchValue({
        searchTo: ''
      })
      this.toasterService.showError('Please click the to date icon to select date','');
    }
  }

  next() {

    // this.utilService.setCurrentUrl('users/purchaseOrder')

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
      this.getProjectExecutionDetails(currentPageIndex,this.clientId);
  }

  onUploadCsv(event) {
    console.log('event', event);
    const data = {
      ...event,
      currentClientId: this.clientId,
    };
 
    this.projectExecutionService.uploadCsv(data)
         .subscribe((res: any) => {
             console.log('res', res);
             const error = res.Error;
             const errorMessage = res.ErrorMessage;
             if (error !== '0') {
               return this.toasterService.showError(errorMessage, '');
             }
             const processVariables = res.ProcessVariables;
             const errorObj = processVariables.error;
             if (errorObj.code !== '0') {
               return this.toasterService.showError(errorObj.message, '');
             }
             this.getCsvDataWithValidationMessage();
         });
  }
 
  getCsvDataWithValidationMessage() {
 
     this.projectExecutionService.getCsvDataWithMessage({currentClientId: this.clientId})
         .subscribe((res: any) => {
              const error = res.Error;
              const errorMessage = res.ErrorMessage;
              if (error !== '0') {
                return this.toasterService.showError(errorMessage, '');
              }
 
              const processVariables = res.ProcessVariables;
 
              this.csvResponse = {
               screenName: 'PE',
               data: processVariables.PEDataLIst
             };
 
         });
 
  }
 
  onModalClose(event) {
   this.csvResponse = null;
   if (!event) {
      return;
   }
 
   if (event.length === 0) {
     return this.toasterService.showWarning('No valid records are available to upload', '');
   }
 
   this.projectExecutionService.uploadValidData({currentClientId: this.clientId})
       .subscribe((response: any) => {
         const error = response.Error;
         const errorMessage = response.ErrorMessage;
         if (error !== '0') {
           return this.toasterService.showError(errorMessage, '');
         }
         const processVariables = response.ProcessVariables;
         const errorObj = processVariables.error;
         if (errorObj.code !== '0') {
            return this.toasterService.showSuccess(errorObj.message, '');
         }
         this.toasterService.showSuccess(errorObj.message, '');
         this.getProjectExecutionDetails(1, this.clientId);
       });
   console.log('event', event);
  }

  }




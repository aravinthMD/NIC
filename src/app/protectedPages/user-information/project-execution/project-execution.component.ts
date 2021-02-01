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
              private clientDetailService : ClientDetailsService
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
      piNumber : new FormControl('',Validators.required),
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
      remark:new FormControl('',Validators.required),
      importFile : new FormControl(null)
    });


    this.clientId = this.clientDetailService.getClientId();

    this.utilService.userDetails$.subscribe((val)=> {

      this.accountName = val['App_name'] || '';
      this.status = val['status'] || '';

      this.PurchaseEntryForm.controls['userName'].setValue(this.accountName);
    })

    this.activatedRoute.params.subscribe((value)=> {  

      this.storeProjectNo = value.projectNo || 4535
    })

    this.getProjectExecutionDetails(this.currentPage,this.clientId);    
    this.getPIAutoPopulate(this.clientId);


    this.PurchaseEntryForm.controls['piNumber'].valueChanges.subscribe((value) => {
        if(!value)
          return
        this.getPIAutoPopulateonChange(value);
    })

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
          upload_document : this.documentUploadId,
          userId : this.clientId ?  Number(this.clientId) : 0
                }
  
        this.invoiceService.createProjectExecution(Data).subscribe(
          (response: any) => {
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
                this.PurchaseEntryForm.controls['userName'].setValue(this.accountName);
                this.PurchaseEntryForm.controls['piAmount'].setValue('');
                this.PurchaseEntryForm.controls['piDate'].setValue('');
                this.documentUploadId = '';
                this.isDirty = false;
                this.getProjectExecutionDetails(this.currentPage,this.clientId);
                this.toasterService.showSuccess('Data Saved Successfully','')
                // this.showDataSaveModal = true;
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
    })

    dialogRef.afterClosed().subscribe(result =>{
      console.log('The dialog was Closed',result);
      this.getProjectExecutionDetails(this.currentPage,this.clientId);
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


  getPIAutoPopulate(clientId : string){
        this.invoiceService.getPIAutoPopulationAPI(clientId).subscribe(
          (response) => {
            // const { 
            //   ProcessVariables  : { error : {
            //     code,
            //     message
            //   }}
            // } = response;

            console.log(`API Response for the Get PI Auto Populate ${response}`);
            if(true){
                this.proformaInvoicesList = response['ProcessVariables']['piList'] || [];
            }
        })
  }

  changeDateFormat(date) {

    const splitDate = date.split('/');

    return `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}`

   }

  getPIAutoPopulateonChange(piNumber : any){
      this.invoiceService.getProformaInvoiceOnChangeData(Number(piNumber)).subscribe(
        (response) =>{
          const date = response['ProcessVariables']['date'];
          const amount = response['ProcessVariables']['piAmount'];
          this.PurchaseEntryForm.controls['invoiceDate'].setValue(new Date(this.changeDateFormat(date)));
          this.PurchaseEntryForm.controls['piAmount'].setValue(amount || '')
        },(error) =>{
          console.log(`Failed to fetch data`);
          this.toasterService.showError('Failed to fetch data','');
        })
  }


  async uploadFile(files : FileList){
    this.file = files.item(0);
    if(this.file){
        const userId : string = this.clientDetailService.getClientId();
        const modifiedFile = Object.defineProperty(this.file, "name", {
          writable: true,
          value: this.file["name"]
        });
        modifiedFile["name"] = userId + "-" + new Date().getTime() + "-" + modifiedFile["name"];
        this.uploadedData = await this.utilService.uploadToAppiyoDrive(this.file);
        if(this.uploadedData['uploadStatus']){
          this.documentUploadId = this.uploadedData['documentUploadId'];
          this.toasterService.showSuccess('File upload Success','')
        }else { 
          this.toasterService.showError('File upload Failed','')
        }
    }

  }




  getServerData(event?:PageEvent){
     let currentPageIndex  = Number(event.pageIndex) + 1;
      this.getProjectExecutionDetails(currentPageIndex,this.clientId);
  }

  }




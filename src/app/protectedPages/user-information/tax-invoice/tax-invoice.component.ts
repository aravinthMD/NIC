import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Validators, FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { LabelsService } from 'src/app/services/labels.service';
import {DatePipe} from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router'
import { MatDialog } from '@angular/material';
import { TaxInvoiceDialogComponent } from './tax-invoice-dialog/tax-invoice-dialog.component';
import { UtilService } from '@services/util.service';
import { ToasterService } from '@services/toaster.service';
import { InvoiceService } from '@services/invoice.service';
import { SearchService } from '../../../services/search.service';
import {ApiService} from '../../../services/api.service'
import { AdminService } from '@services/admin.service';
import { TaxInvoice } from './tax-invoice.model';
import { TaxInvoiceService } from '@services/tax-invoice.service';
import { ClientDetailsService } from '@services/client-details.service';

import { CustomDateAdapter } from '@services/custom-date-adapter.service';
import { CsvDataService } from '@services/csv-data.service';
import { UtilityService } from '@services/utility.service';

@Component({
  selector: 'app-tax-invoice',
  templateUrl: './tax-invoice.component.html',
  styleUrls: ['./tax-invoice.component.scss']
})
export class TaxInvoiceComponent implements OnInit {

  @ViewChild(MatPaginator, {static : true}) paginator: MatPaginator;

  @Input('userObj') user : any; 

  proformaInvoicesList =  [];
  purchaseOrderNumberList  = [];

  file : any;
  uploadedData = {};
  documentUploadId : string = '';

  showEmailModal : boolean;
  data  : string = '';



//    monthList = [ "January", "February", "March", "April", "May", "June",
// "July", "August", "September", "October", "November", "December" ];

//  yearList = [ "2020", "2021", "2022", "2023", "2024", "2025",
// "2026", "2027", "2028", "2029", "2030", "2031" ];

  displayedColumns: string[] = ['InvoiceNo', 'projectNo', 'piAmt', 'remarks','reminder','Escalation', 'Active'];

  // csvSampleData:any[]=[
  //   {InvoiceNo:1111,projectNo:1111,piAmt:1000,remarks:'nill',Active:'Active'},
  //   {InvoiceNo:2222,projectNo:2222,piAmt:2000,remarks:'nill',Active:'deactive'},
  //   {InvoiceNo:3333,projectNo:3333,piAmt:3000,remarks:'nill',Active:'Active'},
  //   {InvoiceNo:4444,projectNo:4444,piAmt:4000,remarks:'nill',Active:'deactive'},
  //   {InvoiceNo:5555,projectNo:5555,piAmt:5000,remarks:'nill',Active:'Active'},
  //   {InvoiceNo:6666,projectNo:6666,piAmt:6000,remarks:'nill',Active:'deactive'},
  //   {InvoiceNo:7777,projectNo:7777,piAmt:7000,remarks:'nill',Active:'Active'},
  //   {InvoiceNo:8888,projectNo:8888,piAmt:8000,remarks:'nill',Active:'deactive'}]

  // userList : any[] =   [
   
  //   {invoiceNo : 1343,projectNumber : 4535,piAmt:24250,remarks:''},
  //   {invoiceNo : 5464,projectNumber : 4535,piAmt:35000,remarks:''},
  //   {invoiceNo : 7687,projectNumber : 4535,piAmt:23450,remarks:''}

  // ];
  paymentStatus: any[] = [];

    invoiceStatusList = [];

  dataSource = new MatTableDataSource<any>([]);
  taxInvoiceForm: FormGroup;
  searchForm: FormGroup;
  labels: any = {};
  isDirty: boolean;
  toDate = new Date();
  accountName: string;

  status: string;
  propertyFlag: boolean;

  storeProjectNo: string;

  resultsLength: number;
  pageEvent: PageEvent;

  datePerPage = 0;

  selectedClientId;
  taxInvoiceList: TaxInvoice[] = [];
  isWrite = true;
  isClientActive = true;

  constructor(
      private labelsService: LabelsService,
      private Datepipe: DatePipe,
      private activatedRoute: ActivatedRoute,
      private dialog: MatDialog,
      private utilService: UtilService,
      private toasterService: ToasterService,
      private router: Router,
      private invoiceService: InvoiceService,
      private adminService: AdminService,
      private taxInvoiceService: TaxInvoiceService,
      private clientDetailsService: ClientDetailsService,
      private customDateAdapter: CustomDateAdapter,
      private utilityService: UtilityService
      ) { }

  ngOnInit() {
    this.isClientActive = this.clientDetailsService.getClientStatus();
    const lov = this.activatedRoute.parent.snapshot.data || {};
    const listOfValues = lov.listOfValue || {};
    const processVariables = listOfValues.ProcessVariables || {};
    this.invoiceStatusList = processVariables.invoiceStatusList || [];
    this.taxInvoiceService.setInvoiceStatusList(this.invoiceStatusList);
    const taxInvoice = this.utilityService.getSettingsDataList('TaxInvoice');
    this.isWrite = taxInvoice.isWrite;
    this.selectedClientId = Number(this.clientDetailsService.getClientId());
    this.labelsService.getLabelsData().subscribe((values) => {
      this.labels = values;

    });
    this.taxInvoiceForm = new FormGroup({
      userName: new FormControl(null),
      projectNumber: new FormControl(null),
      poNumber: new FormControl(null,Validators.required),
      poDate: new FormControl(null),
      fromDate: new FormControl(null),
      toDate: new FormControl(null),
      billableAmount: new FormControl(null),
      invoiceAmount: new FormControl(null),
      taxInvoiceNumber: new FormControl(null),
      invoiceDate: new FormControl(null),
      submittedDate: new FormControl(null),
      invoiceStatus: new FormControl(''),
      invoicePaidAmount: new FormControl(null),
      tds:  new FormControl(null),
      penalty:  new FormControl(null),
      shortPay: new FormControl(null),
      paymentStatus: new FormControl(''),
      remark: new FormControl(null),
      uploadDocument: new FormControl(null),
      userEmail: new FormControl(null),
      totalSMS: new FormControl(null),
      counts1: new FormControl(null),
      baseAmount: new FormControl(null),
      tax: new FormControl(null),
      receiveDate: new FormControl(null),
      book:  new FormControl(null),
      dateEstimated:  new FormControl(null),
      invoiceAmount2: new FormControl(null),
      bankReceived: new FormControl(null),
      receiptDate:  new FormControl(null),
      month: new FormControl(null),
      year: new FormControl(null),
      mrnNumber: new FormControl(null),
      projectName: new FormControl(null),
      projectCoordinator: new FormControl(null), // not available in api
      amendOrderNo: new FormControl(null), // not available in api
      interestOnTds : new FormControl(null), // not available in api
      piNumber : new FormControl(null)
    });

    this.searchForm = new FormGroup({
      searchData: new FormControl(null),
      searchFrom: new FormControl(null),
      searchTo: new FormControl(null)
    });

    this.utilService.userDetails$.subscribe((val: any) => {
      if (!val) {
        return;
      }
      this.accountName = val.App_name || '';
      this.status = val.status || '';
      this.taxInvoiceForm.controls['userName'].setValue(this.accountName);
    });

    this.activatedRoute.params.subscribe((value)=> {
      this.storeProjectNo = value.projectNo || 4535;

      // this.userList =   [
   
      //   {invoiceNo : 1343,projectNumber : value.projectNo || 4535,piAmt:24250,remarks:''},
      //   {invoiceNo : 5464,projectNumber : value.projectNo || 4535,piAmt:35000,remarks:''},
      //   {invoiceNo : 7687,projectNumber : value.projectNo || 4535,piAmt:23450,remarks:''},
      //   {invoiceNo : 9867,projectNumber : value.projectNo || 4535,piAmt:13000,remarks:''},
      //   {invoiceNo : 6563,projectNumber : value.projectNo || 4535,piAmt:1000,remarks:''},
      //   {invoiceNo : 5535,projectNumber : value.projectNo || 4535,piAmt:9000,remarks:''},
      //   {invoiceNo : 5435,projectNumber : value.projectNo || 4535,piAmt:6600,remarks:''},
      //   {invoiceNo : 8887,projectNumber : value.projectNo || 4535,piAmt:6767,remarks:''},
      //   {invoiceNo : 6555,projectNumber : value.projectNo || 4535,piAmt:6774,remarks:''},
      //   {invoiceNo : 5445,projectNumber : value.projectNo || 4535,piAmt:5666,remarks:''},
      //   {invoiceNo : 7766,projectNumber : value.projectNo || 4535,piAmt:8787,remarks:''},
      //   {invoiceNo : 5443,projectNumber : value.projectNo || 4535,piAmt:5465,remarks:''},
      //   {invoiceNo : 9088,projectNumber : value.projectNo || 4535,piAmt:6566,remarks:''},
      //   {invoiceNo : 7756,projectNumber : value.projectNo || 4535,piAmt:5566,remarks:''},
      //   {invoiceNo : 9787,projectNumber : value.projectNo || 4535,piAmt:6555,remarks:''}
    
      // ];

    });

    this.getAutoPopulatePI(this.selectedClientId);

    this.getSubLovs();

    // this.dataSource = new MatTableDataSource<any>(this.userList);
    // this.getAllTaxInvoiceDetails();

    this.taxInvoiceForm.controls['piNumber'].valueChanges.subscribe((value) =>{
              if(!value)
                return
              this.getAutoPopulatePO(value,this.selectedClientId);
    })

    this.taxInvoiceForm.controls['poNumber'].valueChanges.subscribe((value) =>{
              if(!value)
              return
          this.getOnChangePO(value);
    })
  }

  getAllTaxInvoiceList(data = {}) {
    this.taxInvoiceService.getTaxInvoiceList(
      {
        selectedClientId: this.selectedClientId,
        ...data
      }
    ).subscribe((res: any) => {
      console.log('get list', res);
      const error = res.Error;
      const errorMsg = res.ErrorMessage;
      if (error !== '0') {
        return this.toasterService.showError(errorMsg, '');
      }
      const processVariables = res.ProcessVariables;
      this.taxInvoiceList = processVariables.TIList || [];
      this.dataSource = new MatTableDataSource<any>(this.taxInvoiceList);
      this.dataSource.paginator = this.paginator;
    });
  }

  // ngAfterViewInit(){
  //   this.dataSource.paginator = this.paginator;

  // }

  async getSubLovs() {

    // let listData = []

    await this.adminService.getLovSubMenuList('3')
    .subscribe((response: any) => {

     const paymentList = response.ProcessVariables.Lovitems;
     this.paymentStatus = paymentList.map((value) => {
       return {
         key: value.key,
         value: value.value
       };
     });
     this.taxInvoiceService.setPaymentList(this.paymentStatus);
     this.getAllTaxInvoiceList();

    //   const submenuList = response['ProcessVariables']['Lovitems'];
    //  submenuList.forEach(element => {

    //     listData.push({key:element.key,value:element.name})
    //   });
      });

    // this.paymentStatus = listData;

  }

  exportCsv() {
    this.taxInvoiceService.getTaxInvoiceList(
      {
        selectedClientId: this.selectedClientId,
        exportCsv: 'true'
      }
    ).subscribe((res: any) => {
      console.log('get list', res);
      const error = res.Error;
      const errorMsg = res.ErrorMessage;
      if (error !== '0') {
        return this.toasterService.showError(errorMsg, '');
      }
      const processVariables = res.ProcessVariables;
      const dataList = processVariables.list;
      if (!dataList) {
        return this.toasterService.showInfo('No data available for download', '');
      }
      CsvDataService.exportToCsv('Tax_Invoice.csv', dataList);
      // this.taxInvoiceList = processVariables.TIList || [];
      // this.dataSource = new MatTableDataSource<any>(this.taxInvoiceList);
      // this.dataSource.paginator = this.paginator;
    });
  }

  // getAllTaxInvoiceDetails(currentPage?: any){

  //   this.invoiceService.getTaxInvoiceDetails().subscribe((response) => {

  //     if(response['ProcessVariables']['error']['code'] == '0') {
  //       const DataTaxInvoiceList = response["ProcessVariables"]["TIList"];

  //       this.datePerPage = Number(response['ProcessVariables']['dataPerPage']);

  //       this.resultsLength = Number(response['ProcessVariables']['totalCount'])

  //       this.dataSource = new MatTableDataSource<any>([]);
  //       this.dataSource = new MatTableDataSource<any>(DataTaxInvoiceList);
  //     }else {
  //       this.toasterService.showError(response['ProcessVariables']['error']['message'],'')
  //     }
      
  //   },(error) =>{
  //     this.toasterService.showError(error,'')
  //   })

  // }

  onSubmit(value?: any) {
    let formValue;
    if (!value) {
       this.isDirty = true;
       if (!this.taxInvoiceForm.valid) {
         return this.toasterService.showError('Please fill all the fields', '');
       }
       formValue = this.taxInvoiceForm.value;
    } else {
      formValue = value;
    }
    const poDate = this.customDateAdapter.transform(formValue.poDate, 'dd/MM/yyyy');
    const fromDate = this.customDateAdapter.transform(formValue.fromDate, 'dd/MM/yyyy');
    const toDate = this.customDateAdapter.transform(formValue.toDate, 'dd/MM/yyyy');
    const submittedDate = this.customDateAdapter.transform(formValue.submittedDate, 'dd/MM/yyyy');
    const invoiceDate = this.customDateAdapter.transform(formValue.invoiceDate, 'dd/MM/yyyy');
    const receiveDate = this.customDateAdapter.transform(formValue.receiveDate, 'dd/MM/yyyy');
    const dateEstimated = this.customDateAdapter.transform(formValue.dateEstimated, 'dd/MM/yyyy');
    const receiptDate = this.customDateAdapter.transform(formValue.receiptDate, 'dd/MM/yyyy');
    const requestData = {
      ...formValue,
      poDate,
      fromDate,
      toDate,
      submittedDate,
      invoiceDate,
      receiveDate,
      dateEstimated,
      receiptDate,
      invoiceStatus: Number(formValue.invoiceStatus),
      taxInvoiceNumber: formValue.taxInvoiceNumber,
      baseAmount: Number(formValue.baseAmount) || '',
      counts1: Number(formValue.counts1) || '',
      paymentStatus: Number(formValue.paymentStatus),
      tax: Number(formValue.tax) || '',
      totalSMS: Number(formValue.totalSMS) || '',
      interestOnTds: Number(formValue.interestOnTds) || '',
      userId: this.selectedClientId,
      upload_document : this.documentUploadId
    };
    console.log('requestData', requestData);
    this.taxInvoiceService.saveOrUpdateTaxInvoiceDetails(requestData)
        .subscribe((res: any) => {
            console.log('res', res);
            const error = res.Error;
            const errorMsg = res.ErrorMessage;
            if (error !== '0') {
              return this.toasterService.showError(errorMsg, '');
            }
            this.isDirty = false;
            const taxInvoiceData: TaxInvoice = res.ProcessVariables;
            this.toasterService.showSuccess('Data Saved Sucessfully','');
            this.taxInvoiceForm.reset();
            this.documentUploadId = ''
            this.taxInvoiceForm.controls['userName'].setValue(this.accountName);
            this.taxInvoiceForm.controls['invoiceStatus'].setValue('');
            this.taxInvoiceForm.controls['paymentStatus'].setValue('');
            this.updateGrid(taxInvoiceData);
        });
  }

  updateGrid(taxInvoiceData: TaxInvoice) {
     const index = this.taxInvoiceList.findIndex((value) => {
       return value.id === taxInvoiceData.id;
     });
     if (index === -1) {
        this.taxInvoiceList.unshift(taxInvoiceData);
     } else {
        this.taxInvoiceList[index] = taxInvoiceData;
     }
     this.dataSource = new MatTableDataSource<any>(this.taxInvoiceList);
     this.dataSource.paginator = this.paginator;
  }


  // createTaxInvoice() {
  //   const feildControls = this.taxInvoiceForm.controls;
  //   const userName = feildControls.userName.value;
  //   const taxIN  = feildControls.taxIN.value;
  //   const invoiceDate = feildControls.invoiceDate.value;
  //   const projectNo = feildControls.projectNo.value;
  //   const poNumber = feildControls.poNumber.value;
  //   const poDate = feildControls.poDate.value;
  //   const fromDate = feildControls.fromDate.value;
  //   const toDate = feildControls.toDate.value;
  //   const invoiceAmount = feildControls.invoiceAmount.value;
  //   const remark = feildControls.remark.value;
  //   const uploadDoc = feildControls.uploadDoc.value;
  //   const paymentStatus = +feildControls.paymentStatus.value;
  //   const invoiceStatus = +feildControls.invoiceStatus.value;
  //   const invoiceAmountPaid = feildControls.invoiceAmountPaid.value;
  //   const tds = feildControls.tds.value;
  //   const penalty = feildControls.penalty.value;
  //   const shortPay = feildControls.shortPay.value;
  //   const submittedOn = feildControls.submittedOn.value;
  //   const poBillable = feildControls.poBillable.value;
  //   const projectName = feildControls.projectName.value;
  //   const projectCordinator = feildControls.projectCordinator.value;
  //   const PONoAmendOrder = +feildControls.PONoAmendOrder.value;
  //   const mail = +feildControls.mail.value;
  //   const totalSMS = Number(feildControls.totalSMS.value);
  //   const counts = feildControls.counts.value;
  //   const baseAmount = Number(feildControls.baseAmount.value);
  //   const tax = Number(feildControls.tax.value);
  //   const book = feildControls.book.value;
  //   const invoiceAmount2 = Number(feildControls.invoiceAmount2.value);
  //   const bankReceived = feildControls.bankReceived.value;
  //   const interestOnTDSotherDeduction = feildControls.interestOnTDSotherDeduction.value;
  //   const mrn = feildControls.mrn.value;
  //   const recvDate = feildControls.recvDate.value;
  //   const receiptDate = feildControls.receiptDate.value;
  //   const dateEstimated = feildControls.dateEstimated.value;

  //   const formattedRecvDate = this.Datepipe.transform(recvDate,'dd/MM/yyyy')
  //   const formattedReceiptDate = this.Datepipe.transform(receiptDate,'dd/MM/yyyy')
  //   const formattedDateEstimated = this.Datepipe.transform(dateEstimated,'dd/MM/yyyy')


  //   const formattedFromDate = this.Datepipe.transform(fromDate,'dd/MM/yyyy');
  //   const formattedToDate = this.Datepipe.transform(toDate,'dd/MM/yyyy');
  //   const formattedPoDate = this.Datepipe.transform(poDate,'dd/MM/yyyy');
  //   const formattedSubmitedOn = this.Datepipe.transform(submittedOn,'dd/MM/yyyy');

  //   const Data = {
  //     userName,
  //     projectNumber : projectNo,
  //     poNumber,
  //     poDate: formattedPoDate,
  //     fromDate: formattedFromDate,
  //     toDate : formattedToDate,
  //     billableAmount : poBillable,
  //     InvoiceAmount : invoiceAmount,
  //     TaxInvoiceNumber  : taxIN,
  //     submittedDate :  formattedSubmitedOn,
  //     InvoiceStatus  : invoiceStatus,
  //     InvoicePaidAmount : invoiceAmountPaid,
  //     tds,
  //     penalty,
  //     shortPay,
  //     paymentStatus,
  //     remark,
  //     projectName,
  //     projectCordinator,
  //     PONoAmendOrder,
  //     mail,
  //     totalSMS,
  //     counts,
  //     baseAmount,
  //     tax,
  //     book,
  //     invoiceAmount2,
  //     bankReceived,
  //     interestOnTDSotherDeduction,
  //     mrn,
  //     receiptDate : formattedReceiptDate,
  //     recvDate :formattedRecvDate,
  //     dateEstimated :formattedDateEstimated,
	// 	  uploadDocument  : "file"

  //   }

  //   this.invoiceService.createTaxInvoice(Data).subscribe((response) =>{

  //           console.log(response["ProcessVariables"])
  //           if(response["ProcessVariables"]['error']['code'] == '0'){
  //             this.isDirty = false;
  //             this.toasterService.showSuccess('Tax Invoice Form Submitted Sucessfully','');
  //             this.taxInvoiceForm.reset();
  //           }else {
  //             this.toasterService.showError(response["ProcessVariables"]['error']['message'],'');
  //           }

  //   },(error) => {
  //     console.log(error)

  //     this.toasterService.showError(error,'')
  //   })
    
  // }

  // taxInForm(){
  //   if(this.taxInvoiceForm.invalid) {
     
  //     this.isDirty = true;

  //     return
  //   }
  //   this.taxInvoiceForm.value['fromDate']=this.Datepipe.transform(this.taxInvoiceForm.value['fromDate'],'dd/MM/yyyy')
  //   this.taxInvoiceForm.value['toDate']=this.Datepipe.transform(this.taxInvoiceForm.value['toDate'],'dd/MM/yyyy')
  //   this.taxInvoiceForm.value['poDate']=this.Datepipe.transform(this.taxInvoiceForm.value['poDate'],'dd/MM/yyyy')
  //   this.taxInvoiceForm.value['invoiceDate']=this.Datepipe.transform(this.taxInvoiceForm.value['invoiceDate'],'dd/MM/yyyy')
  //   this.taxInvoiceForm.value['submittedOn'] = this.Datepipe.transform(this.taxInvoiceForm.value['submittedOn'],'dd/MM/yyyy')
  //   console.log(this.taxInvoiceForm.value)
  //   this.taxInvoiceForm.reset()
  // }

  onSearch() {
    const params = {
        searchKeyword: this.searchForm.get('searchData').value,
        fromDate: this.searchForm.get('searchFrom').value,
        toDate: this.searchForm.get('searchTo').value
    };
    this.getAllTaxInvoiceList(params);
  }

  clear() {

    this.searchForm.patchValue({
      searchData: null,
      searchFrom: null,
      searchTo: null
    });

    // this.getAllTaxInvoiceDetails();
  }

  onEdit(selectedTaxInvoice: TaxInvoice) {
    const dialogRef = this.dialog.open(TaxInvoiceDialogComponent, {
      data : selectedTaxInvoice
    });

    dialogRef.componentInstance.onFileUpload.subscribe((res: any) => {
        this.uploadFile(res);
    });

    dialogRef.componentInstance.updateEmitter.subscribe((value) => {
        console.log('updateEmitter', value);
        this.onSubmit(value);
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);

      // this.getAllTaxInvoiceDetails()

    });
  }
 getDownloadXls() {
   // this.utilService.getDownloadXlsFile(this.userList,"TaxInvoice");
 }

 detectDateKeyAction(event, type) {
  console.log(event);
  if (type === 'poDate') {
    this.taxInvoiceForm.patchValue({
      poDate: ''
    });
    this.toasterService.showError('Please click the PO date icon to select date','');
  } else if (type === 'fromDate') {

    this.taxInvoiceForm.patchValue({
      fromDate: ''
    });
    this.toasterService.showError('Please click the from date icon to select date','');
  } else if (type === 'toDate') {
    this.taxInvoiceForm.patchValue({
      toDate: ''
    });
    this.toasterService.showError('Please click the to date icon to select date','');
  } else if (type === 'submittedOn') {
    this.taxInvoiceForm.patchValue({
      submittedOn: ''
    });
    this.toasterService.showError('Please click the submitted on icon to select date','');
  } else if (type === 'searchFrom') {
    this.searchForm.patchValue({
      searchFrom: ''
    });
    this.toasterService.showError('Please click the from date icon to select date','');
  } else if (type === 'searchTo') {
    this.searchForm.patchValue({
      searchTo: ''
    });
    this.toasterService.showError('Please click the to date icon to select date','');
  }
}


getAutoPopulatePI(clientId  :string){
  this.invoiceService.getPIAutoPopulationAPI(clientId).subscribe(
    (response) =>{
      console.log(`API Response for the Get PI Auto Populate ${response}`);
      this.proformaInvoicesList = response['ProcessVariables']['piList'] || [];
  },(error) =>{
      console.log('Error');
      this.toasterService.showError('Failed to fetch data','');
  })
}

getAutoPopulatePO(piNumber : string,clientId : number){
  this.invoiceService.getTaxInvoiceOnLoad(clientId,piNumber).subscribe(
    (response) =>{
      this.purchaseOrderNumberList = response['ProcessVariables']['poNumberList']  ? response['ProcessVariables']['poNumberList'] :  [];
  },(error) =>{
      this.toasterService.showError('Failed to Fetch the Data','');
  })
}

getOnChangePO(poNumber : string){
  this.invoiceService.getTIOnChange(poNumber).subscribe(
    (response) =>{
      const projectName = response['ProcessVariables']['projectName'] ? response['ProcessVariables']['projectName'] : '';
      const purchaseOrderDate = response['ProcessVariables']['poDate'] ? response['ProcessVariables']['poDate'] : '';
      const fromDate = response['ProcessVariables']['fromDate'] ? response['ProcessVariables']['fromDate'] : '';
      const toDate = response['ProcessVariables']['toDate'] ? response['ProcessVariables']['toDate'] : '';
      const billableAmount = response['ProcessVariables']['billableAmount'] ? response['ProcessVariables']['billableAmount'] : '';
      const projectNumber = response['ProcessVariables']['projectNumber'];
      this.taxInvoiceForm.controls['poDate'].setValue(new Date(this.changeDateFormat(purchaseOrderDate)));
      this.taxInvoiceForm.controls['fromDate'].setValue(new Date(this.changeDateFormat(fromDate)));
      this.taxInvoiceForm.controls['toDate'].setValue((new Date(this.changeDateFormat(toDate))));
      this.taxInvoiceForm.controls['billableAmount'].setValue(billableAmount);
      this.taxInvoiceForm.controls['projectName'].setValue(projectName);
      this.taxInvoiceForm.controls['projectNumber'].setValue(projectNumber);
  },(error) =>{
      this.toasterService.showError('Failed to Fetch Data','');
  })
}

changeDateFormat(date) {

  const splitDate = date.split('/');

  return `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}`

 }


 async uploadFile(files : FileList){
  this.file = files.item(0);
  if(this.file){
      const userId : string = this.clientDetailsService.getClientId();
      const modifiedFile = Object.defineProperty(this.file, "name", {
        writable: true,
        value: this.file["name"]
      });
      modifiedFile["name"] = userId + "-" + new Date().getTime() + "-" + modifiedFile["name"];
      this.uploadedData = await this.utilService.uploadToAppiyoDrive(this.file);
      if(this.uploadedData['uploadStatus']){
        this.documentUploadId = this.uploadedData['documentUploadId'];
        this.toasterService.showSuccess('File Upload Success','')
      }else { 
        this.toasterService.showError('File Upload Failed','')
      }
  }

}

sendReminder(element){
  this.showEmailModal = true;
  this.data = 'Send Mail'
}


sendEscalation(element){
  this.showEmailModal = true;
  this.data = 'Send Escalation';
}


back() {

  this.utilService.setCurrentUrl('users/purchaseOrder')

  this.router.navigate([`/users/purchaseOrder/${this.storeProjectNo}`]);

}

pageEventData(event) {


  const currentPageIndex  = Number(event.pageIndex) + 1;

  // this.getAllTaxInvoiceDetails(currentPageIndex)
}


}

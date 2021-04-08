import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Validators, FormGroup, FormControl } from "@angular/forms";
import { LabelsService } from 'src/app/services/labels.service';
import { Router, ActivatedRoute } from '@angular/router'
import { MatDialog } from '@angular/material';
import { TaxInvoiceDialogComponent } from './tax-invoice-dialog/tax-invoice-dialog.component';
import { UtilService } from '@services/util.service';
import { ToasterService } from '@services/toaster.service';
import { InvoiceService } from '@services/invoice.service';
import { SearchService } from '../../../services/search.service';
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

  displayedColumns: string[] = ['InvoiceNo', 'projectNo', 'piAmt', 'remarks','status','reminder','Escalation', 'Active'];

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
  isEnableEmail = true;
  isClientActive = true;
  csvResponse: any;

  constructor(
      private labelsService: LabelsService,
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
    const taxInvoiceScrnData = this.utilityService.getSettingsDataList('TaxInvoice');
    this.isWrite = taxInvoiceScrnData.isWrite;
    this.isEnableEmail = taxInvoiceScrnData.isEnableEmail;
    this.selectedClientId = Number(this.clientDetailsService.getClientId());
    this.labelsService.getLabelsData().subscribe((values) => {
      this.labels = values;

    });
    // this.taxInvoiceForm = new FormGroup({
    //   userName: new FormControl(null),
    //   projectNumber: new FormControl(null),
    //   poNumber: new FormControl(null,Validators.required),
    //   poDate: new FormControl(null),
    //   fromDate: new FormControl(null),
    //   toDate: new FormControl(null),
    //   billableAmount: new FormControl(null),
    //   invoiceAmount: new FormControl(null),
    //   taxInvoiceNumber: new FormControl(null),
    //   invoiceDate: new FormControl(null),
    //   submittedDate: new FormControl(null),
    //   invoiceStatus: new FormControl(''),
    //   invoicePaidAmount: new FormControl(null),
    //   tds:  new FormControl(null),
    //   penalty:  new FormControl(null),
    //   shortPay: new FormControl(null),
    //   paymentStatus: new FormControl(''),
    //   remark: new FormControl(null),
    //   uploadDocument: new FormControl(null),
    //   userEmail: new FormControl(null),
    //   totalSMS: new FormControl(null),
    //   counts1: new FormControl(null),
    //   baseAmount: new FormControl(null),
    //   tax: new FormControl(null),
    //   receiveDate: new FormControl(null),
    //   book:  new FormControl(null),
    //   dateEstimated:  new FormControl(null),
    //   invoiceAmount2: new FormControl(null),
    //   bankReceived: new FormControl(null),
    //   receiptDate:  new FormControl(null),
    //   month: new FormControl(null),
    //   year: new FormControl(null),
    //   mrnNumber: new FormControl(null),
    //   projectName: new FormControl(null),
    //   projectCoordinator: new FormControl(null), // not available in api
    //   amendOrderNo: new FormControl(null), // not available in api
    //   interestOnTds : new FormControl(null), // not available in api
    //   piNumber : new FormControl(null)
    // });

    this.searchForm = new FormGroup({
      searchData: new FormControl(null),
      searchFrom: new FormControl(null),
      searchTo: new FormControl(null)
    });

    this.utilService.userDetails$.subscribe((val: any) => {
      if (!val) {
        return;
      }
      this.accountName = val? val.App_name : '';
      this.status = val ? val.status : '';
      // this.taxInvoiceForm.controls['userName'].setValue(this.accountName);
    });

    this.activatedRoute.params.subscribe((value)=> {
      this.storeProjectNo = value.projectNo || 4535;
    });

    // this.getAutoPopulatePI(this.selectedClientId);

    this.getSubLovs();

    // this.dataSource = new MatTableDataSource<any>(this.userList);
    // this.getAllTaxInvoiceDetails();


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

  // onSubmit(value?: any) {
  //   let formValue;
  //   if (!value) {
  //      this.isDirty = true;
  //      if (!this.taxInvoiceForm.valid) {
  //        return this.toasterService.showError('Please fill all the fields', '');
  //      }
  //      formValue = this.taxInvoiceForm.value;
  //   } else {
  //     formValue = value;
  //   }
  //   const poDate = this.customDateAdapter.transform(formValue.poDate, 'dd/MM/yyyy');
  //   const fromDate = this.customDateAdapter.transform(formValue.fromDate, 'dd/MM/yyyy');
  //   const toDate = this.customDateAdapter.transform(formValue.toDate, 'dd/MM/yyyy');
  //   const submittedDate = this.customDateAdapter.transform(formValue.submittedDate, 'dd/MM/yyyy');
  //   const invoiceDate = this.customDateAdapter.transform(formValue.invoiceDate, 'dd/MM/yyyy');
  //   const receiveDate = this.customDateAdapter.transform(formValue.receiveDate, 'dd/MM/yyyy');
  //   const dateEstimated = this.customDateAdapter.transform(formValue.dateEstimated, 'dd/MM/yyyy');
  //   const receiptDate = this.customDateAdapter.transform(formValue.receiptDate, 'dd/MM/yyyy');
  //   const requestData = {
  //     ...formValue,
  //     poDate,
  //     fromDate,
  //     toDate,
  //     submittedDate,
  //     invoiceDate,
  //     receiveDate,
  //     dateEstimated,
  //     receiptDate,
  //     invoiceStatus: Number(formValue.invoiceStatus),
  //     taxInvoiceNumber: formValue.taxInvoiceNumber,
  //     baseAmount: Number(formValue.baseAmount) || '',
  //     counts1: Number(formValue.counts1) || '',
  //     paymentStatus: Number(formValue.paymentStatus),
  //     tax: Number(formValue.tax) || '',
  //     totalSMS: Number(formValue.totalSMS) || '',
  //     interestOnTds: Number(formValue.interestOnTds) || '',
  //     userId: this.selectedClientId,
  //     upload_document : this.documentUploadId
  //   };
  //   console.log('requestData', requestData);
  //   this.taxInvoiceService.saveOrUpdateTaxInvoiceDetails(requestData)
  //       .subscribe((res: any) => {
  //           console.log('res', res);
  //           const error = res.Error;
  //           const errorMsg = res.ErrorMessage;
  //           if (error !== '0') {
  //             return this.toasterService.showError(errorMsg, '');
  //           }
  //           this.isDirty = false;
  //           const taxInvoiceData: TaxInvoice = res.ProcessVariables;
  //           this.toasterService.showSuccess('Data Saved Sucessfully','');
  //           this.taxInvoiceForm.reset();
  //           this.documentUploadId = ''
  //           this.taxInvoiceForm.controls['userName'].setValue(this.accountName);
  //           this.taxInvoiceForm.controls['invoiceStatus'].setValue('');
  //           this.taxInvoiceForm.controls['paymentStatus'].setValue('');
  //           this.updateGrid(taxInvoiceData);
  //       });
  // }

  updateGrid(taxInvoiceData: TaxInvoice) {
     const index = this.taxInvoiceList.findIndex((value) => {
       return value.id == taxInvoiceData.id;
     });
     if (index === -1) {
        this.taxInvoiceList.unshift(taxInvoiceData);
     } else {
        this.taxInvoiceList[index] = taxInvoiceData;
     }
     this.dataSource = new MatTableDataSource<any>(this.taxInvoiceList);
     this.dataSource.paginator = this.paginator;
  }


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

    const params = {
      searchKeyword: this.searchForm.get('searchData').value,
      fromDate: this.searchForm.get('searchFrom').value,
      toDate: this.searchForm.get('searchTo').value
  };

    this.getAllTaxInvoiceList(params);
  }

  onEdit(selectedTaxInvoice: TaxInvoice) {
    const dialogRef = this.dialog.open(TaxInvoiceDialogComponent, {
      data : selectedTaxInvoice
    });

    dialogRef.componentInstance.updateGrid.subscribe((val) =>{
        this.updateGrid(val);
    } )
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


//  async uploadFile(files : FileList){
//   this.file = files.item(0);
//   if(this.file){
//       const userId : string = this.clientDetailsService.getClientId();
//       const modifiedFile = Object.defineProperty(this.file, "name", {
//         writable: true,
//         value: this.file["name"]
//       });
//       modifiedFile["name"] = userId + "-" + new Date().getTime() + "-" + modifiedFile["name"];
//       this.uploadedData = await this.utilService.uploadToAppiyoDrive(this.file);
//       if(this.uploadedData['uploadStatus']){
//         this.documentUploadId = this.uploadedData['documentUploadId'];
//         this.toasterService.showSuccess('File Upload Success','')
//       }else { 
//         this.toasterService.showError('File Upload Failed','')
//       }
//   }

// }

sendReminder(element){
  if (element.paymentStatus === 6 || !this.isEnableEmail) {
    return;
  }
  this.showEmailModal = true;
  this.data = 'Send Mail'
}


sendEscalation(element){
  if (element.paymentStatus === 6 || !this.isEnableEmail) {
    return;
  }
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

onUploadCsv(event) {
  console.log('event', event);
  const data = {
    ...event,
    currentClientId: this.selectedClientId,
  };

  this.taxInvoiceService.uploadCsv(data)
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

   this.taxInvoiceService.getCsvDataWithMessage({currentClientId: this.selectedClientId})
       .subscribe((res: any) => {
            const error = res.Error;
            const errorMessage = res.ErrorMessage;
            if (error !== '0') {
              return this.toasterService.showError(errorMessage, '');
            }

            const processVariables = res.ProcessVariables;

            this.csvResponse = {
             screenName: 'PO',
             data: processVariables.TIDataLIst
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

 this.taxInvoiceService.uploadValidData({currentClientId: this.selectedClientId})
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
       this.getAllTaxInvoiceList();
     });
 console.log('event', event);
}


}

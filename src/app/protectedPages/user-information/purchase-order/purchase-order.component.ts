import { Component, OnInit, Input, AfterViewInit, ViewChild } from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Validators, FormGroup, FormControl, FormArray } from '@angular/forms';
import { LabelsService } from '../../../services/labels.service';
import {DatePipe} from '@angular/common';
import { ActivatedRoute, Router} from '@angular/router';
import { MatDialog } from '@angular/material';
import { PurchaseOrderDialogComponent } from './purchase-order-dialog/purchase-order-dialog.component';
import { UtilService } from '@services/util.service';
import { ToasterService } from '@services/toaster.service';
import { InvoiceService } from '@services/invoice.service';
import { AdminService } from '@services/admin.service';
import { SearchService } from '../../../services/search.service';
import {ApiService } from '../../../services/api.service';
import { BehaviourSubjectService } from '@services/behaviour-subject.service';
import { POService } from '@services/po-service';
import { ClientDetailsService } from '@services/client-details.service';
import { CsvDataService } from '@services/csv-data.service';



@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.scss']
})
export class PurchaseOrderComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  poNumber: any;
  smsapproved: any = 'Yes';

  @Input('userObj') user: any

  storeProjectNo: string;

  displayedColumns: string[] = ['purchaseNo', 'projectNo', 'piAmt', 'remarks', 'Action'];

  userList: any[] =   [];
  poStatus: any[] = [
    { key : 0, value: 'Received' },
    { key : 1, value : 'Not Received'},
    { key : 2, value : 'Raised'},
    { key: 3, value: 'Pending' },
    { key: 4, value: 'Rejected' },
    { key: 5, value: 'On Hold' }];
  piStatus: any[] = [];
  piReceivedIn: any[] = [];
  paymentStatus: any[] = [
      { key : '3', value : 'Received' }
  ];
  departmentListData = [];
  dataArray = [];
  dataSource = [];
  date = new FormControl();
  PurchaseOrderForm: FormGroup;
  formQuantity: FormGroup;
  labels: any = {};
  isDirty: boolean;

  searchForm: FormGroup;

  propertyFlag: boolean;

  accountName: string;

status: string;

showPOModal: boolean;

isQuantityDirty: boolean;

showDataSaveModal: boolean;

dataValue: {
  title: string;
  message: string
};

smsApprovedList: any[] = [
        {key: '0', value: 'No'},
        {key: '1', value: 'Yes'}
      ];
  // poNumber: string;
  // smsapproved: any;
 

  withoutTaxValidation: {
    rule?: any;
    msg?: string;
  }[];

  resultsLength: number;

  pageEvent: PageEvent;

  datePerPage = 0;

  clientId: string;
  proformaInvoicesList = [];
  purchaseOrderId: number;
  quantityIsDirty: boolean;


  file : any;

  documentUploadId : string = '';
  previewDocumentId : string = '';

  uploadedData : any = {}



  constructor(
    private labelsService: LabelsService,
    private DatePipe: DatePipe,
    private dialog: MatDialog,
    private utilService: UtilService,
    private toasterService: ToasterService,
    private router: Router,
    private invoiceService: InvoiceService,
    private adminService: AdminService,
    private searchService: SearchService,
    private apiService: ApiService,
    private beheSer: BehaviourSubjectService,
    private route: ActivatedRoute,
    private clientDetailService: ClientDetailsService,
    private poDataService: POService,
    ) {

      this.departmentListData = this.route.parent.snapshot.data.listOfValue['ProcessVariables']['departmentList'] || [];
      this.poDataService.setDepartmentList(this.departmentListData);
     }

  ngOnInit() {

    this.route.params.subscribe((param) => {
        if (!param) {
          return;
        }
        this.clientId = param.projectNo;
//        this.fetchPODetails();

    });

    this.labelsService.getLabelsData().subscribe((values) => {
      this.labels = values;
      console.log('label', this.labels);
    });
    this.initForm();
    this.utilService.userDetails$.subscribe((val: any) => {

      this.accountName = val.App_name || '';
      this.status = val.status || '';

      this.PurchaseOrderForm.get('userName').setValue(this.accountName);
    });

    this.beheSer.$poNumber.subscribe((res) => {
      this.poNumber = res;
      this.poNumber = this.poNumber;
    });

    this.beheSer.$smsapproved.subscribe((res) => {
      this.smsapproved = res;
      this.smsapproved = this.smsapproved;
    });

    this.fetchPODetails(this.clientId);


    this.getAutoPopulatePI(this.clientId);

  //  this.getSubLovs();

    this.dataArray.push(this.formQuantity);

    this.withoutTaxValidation = this.withoutTaxValidationCheck();

    this.PurchaseOrderForm.get('piNumber').valueChanges.subscribe((value) => {
     if (!value) {
      return;
     }
     this.getPIAutoPopulateonChange(value);
    });

  }



  withoutTaxValidationCheck() {

    const withouttax = [
      {
        rule: (val) => {

          return val;
        },
        msg: 'Amount should greater than without tax',
      }
    ];
    return withouttax;
  }



  // purchaseForm(){
  //   this.dataArray.push(this.formQuantity);
  // }

  // deleteRow(index){
  //   this.dataArray.splice(index);
  // }

  submit() {
    console.log(this.dataArray);
  }

  fetchPODetails(selectedClientId: string, currentPage?: any) {
    this.invoiceService.fetchAllPO(selectedClientId, currentPage || null).subscribe((response: any) => {
        const processVariables = response.ProcessVariables;
        this.userList = processVariables.purchaseData || [];
        console.log('response', response);
        this.datePerPage = Number(processVariables.dataPerPage || 0);
        this.resultsLength = Number(processVariables.totalCount || 0);
        this.dataSource = this.userList;
        // this.dataSource.paginator = this.paginator;
    });
  }

  async getSubLovs() {

    const paymentStatus = [];

    await this.adminService.getLovSubMenuList('3').subscribe((response: any) => {
      const processVariables = response.ProcessVariables;
      const paymentList = processVariables.Lovitems;
      paymentList.forEach(element => {
        paymentStatus.push({key: element.key, value: element.value});
      });
      this.poDataService.setPaymentList(paymentStatus);
      this.paymentStatus = paymentStatus;
    });


    // this.paymentStatus = paymentStatus


    const piReceivedData = [];

    await this.adminService.getLovSubMenuList('4').subscribe((response: any) => {

      const processVariables = response.ProcessVariables;

      const piRecList = processVariables.Lovitems;
      piRecList.forEach(element => {
        piReceivedData.push({key: element.key, value: element.name});
      });
    });

    this.piReceivedIn = piReceivedData;
  }

  initForm() {
    this.PurchaseOrderForm = new FormGroup({
      userName: new FormControl(null),
      piNumber: new FormControl(null),
      poNumber: new FormControl(null),
      uploadDocument  : new FormControl(null),
      smsApproved: new FormControl(null),
      projectName: new FormControl(null),
      date: new FormControl(null),
      withoutTax: new FormControl(null),
      poStatus: new FormControl(''),
      startDate: new FormControl(null),
      endDate: new FormControl(null),
      userEmail: new FormControl(null),
      poManagerEmail: new FormControl(null),
      projectNo: new FormControl(null),
      poAmountWithTax: new FormControl(null),
      departmentName: new FormControl(''),
      paymentStatus: new FormControl(''),
      uploadDoc: new FormControl(null),
      remark: new FormControl('')
    });
    this.searchForm = new FormGroup({
      searchData: new FormControl(null),
      searchTo: new FormControl(null),
      searchFrom: new FormControl(null)
    });
    this.formQuantity = new FormGroup({
      items: new FormArray([this.addFormQuantityFormControl()])
    });
  }

  addControlForQuantity() {
    const formArray = this.formQuantity.get('items') as FormArray;
    formArray.push(this.addFormQuantityFormControl());
  }

  removeControlFromQuantityForm(index: number) {
    const formArray = this.formQuantity.get('items') as FormArray;
    formArray.removeAt(index);
  }

  // onQuantityFormSubmit() {
  //   const formValue = this.formQuantity.get('items').value;

  // }

  addFormQuantityFormControl(): FormGroup {
    return new FormGroup({
      rate: new FormControl(null),
      quantity: new FormControl(null),
      description: new FormControl(null)
    });
  }

  POForm() {
    if (this.PurchaseOrderForm.invalid) {
      this.isDirty = true;
      return;
    }
    this.showPOModal = true;
  }
  ngAfterViewInit() {
//    this.dataSource.paginator = this.paginator;

  }

  onSearch() {
    const data = this.apiService.api.fetchPurchaseOrder;

    const params = {
        searchKeyword: this.searchForm.get('searchData').value,
        fromDate: this.searchForm.get('searchFrom').value,
        toDate: this.searchForm.get('searchTo').value
    };

    this.searchService
          .searchProjectExecution(data, params).subscribe((resp: any) => {
            const error = resp.Error;
            const errorMessage = resp.ErrorMessage;
            if (error !== '0') {
              return this.toasterService.showError(errorMessage, '');
            }
            const processVariables = resp.ProcessVariables;
            const errorObj = processVariables.error;
            if (errorObj.code !== '0') {
              return this.toasterService.showError(errorObj.message, '');
            }
            const purchaseData = processVariables.purchaseData || [];
            this.dataSource = purchaseData;
            this.datePerPage = Number(processVariables.dataPerPage || 0);
            this.resultsLength = Number(processVariables.totalCount || 0);

            if (purchaseData.length === 0) {
              this.toasterService.showError('No Records Found', 'Purchase Order');
            }
          });
  }

  getAutoPopulatePI(clientId: string) {
      this.invoiceService.getPIAutoPopulationAPI(clientId).subscribe(
        (response: any) => {
          console.log(`API Response for the Get PI Auto Populate ${response}`);
          const processVariables = response.ProcessVariables;
          this.proformaInvoicesList = processVariables.piList || [];
      }, (error) => {
          console.log('Error');
          this.toasterService.showError('Failed to fetch data', '');
      });
  }

  getPIAutoPopulateonChange(piNumber: any) {
    this.invoiceService.getProformaInvoiceOnChangeData(Number(piNumber)).subscribe(
      (response: any) => {
        const processVariables = response.ProcessVariables;
        const projectNumber = processVariables.projectNumber ||  '';
        const smsApproved = processVariables.traffic || '';
        this.PurchaseOrderForm.get('projectNo').setValue(projectNumber);
        this.PurchaseOrderForm.get('smsApproved').setValue(smsApproved);
    });
  }

  clear() {

    this.searchForm.patchValue({
      searchData: null,
      searchFrom: null,
      searchTo: null
    });

    this.fetchPODetails(this.clientId);
  }

  OnEdit(element: any) {

    const dialogRef = this.dialog.open(PurchaseOrderDialogComponent, {
      data : element,
      panelClass: 'full-width-dialog'
    });

    dialogRef.componentInstance.updateEmitter
             .subscribe((res: any) => {
                  console.log('updateEmitter', res);
                  this.submitFormData(res);
                  dialogRef.close();
             });

    // dialogRef.afterClosed().subscribe((result) => {
    //   console.log('The dialog was closed', result);

    //   this.fetchPODetails(this.clientId);

    // })

  }
  getDownloadXls() {
    this.utilService.getDownloadXlsFile(this.userList, 'PurchaseOrder');
  }

  async uploadFile(files : FileList){
      this.file = files.item(0);
      if (this.file) {
        const userId: string = this.clientDetailService.getClientId();
        const modifiedFile = Object.defineProperty(this.file, "name", {
          writable: true,
          value: this.file["name"],
        });
        modifiedFile["name"] =
          userId + "-" + new Date().getTime() + "-" + modifiedFile["name"];
        try {
          this.uploadedData = await this.utilService.uploadToAppiyoDrive(
            this.file
          );

          if (this.uploadedData["uploadStatus"]) {
            this.documentUploadId = this.uploadedData["documentUploadId"];
            this.toasterService.showSuccess("File upload Success", "");
          } else {
            this.toasterService.showError("File upload Failed", "");
          }
        } catch (e) {
          console.log("file error", e);
          const error = e.error;
          if (error && error.ok === false) {
            return this.toasterService.showError(error.message, "");
          }
        }
      }
  }

  detectDateKeyAction(event, type) {

    console.log(event);
    if (type === 'date') {

      this.PurchaseOrderForm.patchValue({
        date: ''
      });
      this.toasterService.showError('Please click the date icon to select date', '');
    } else if (type === 'startDate') {

      this.PurchaseOrderForm.patchValue({
        startDate: ''
      });
      this.toasterService.showError('Please click the valid from icon to select date', '');
    } else if (type === 'endDate') {

      this.PurchaseOrderForm.patchValue({
        endDate: ''
      });
      this.toasterService.showError('Please click the valid upto icon to select date', '');
    } else if (type === 'searchFrom') {
      this.searchForm.patchValue({
        searchFrom: ''
      });
      this.toasterService.showError('Please click the from date icon to select date', '');
    } else if (type === 'searchTo') {
      this.searchForm.patchValue({
        searchTo: ''
      });
      this.toasterService.showError('Please click the to date icon to select date', '');
    }
  }

next() {

    //  this.utilService.setCurrentUrl('users/taxInvoice')

    this.router.navigate([`/users/taxInvoice/${this.clientId}`]);

  }

  back() {

    this.utilService.setCurrentUrl('users/projectExecution');

    this.router.navigate([`/users/projectExecution/${this.clientId}`]);

  }

  onQuantityFormSubmit() {
    if (this.formQuantity.invalid) {
      this.quantityIsDirty = true;
      return this.toasterService.showError('Please fill the mandatory fields', '');
    }
    const formValue = this.formQuantity.get('items').value;
    console.log('submitPOData', formValue);
    const data = formValue.map((value) => {
      return {
        ...value,
        quantity: Number(value.quantity || 0),
        po_number: this.purchaseOrderId,
        user_id: Number(this.clientId)
      };
    });
    console.log('data', data);
    this.invoiceService.updatePopupModal(data)
        .subscribe((res: any) => {
          this.quantityIsDirty = false;
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
          this.showDataSaveModal = true;
          this.dataValue = {
            title: 'Details submitted successfully to ERP',
                message: 'Are you sure you want to proceed tax invoice page?'
          };

        });
  }

  submitFormData(formData?: any) {

    let formValue;

    if (formData) {
        formValue = formData;
    } else {

      if (this.PurchaseOrderForm.invalid) {
        this.isDirty = true;
        return;
      }

      formValue = this.PurchaseOrderForm.value;

    }

    formValue.date = this.DatePipe.transform(formValue.date, 'dd/MM/yyyy');

    formValue.startDate = this.DatePipe.transform(formValue.startDate, 'dd/MM/yyyy');

    formValue.endDate = this.DatePipe.transform(formValue.endDate, 'dd/MM/yyyy');

    const data = {
      poNumber: formValue.poNumber,
      projectNumber: formValue.projectNo,
      projectName: formValue.projectName,
      poDate: formValue.date,
      poStatus: Number(formValue.poStatus),
      piNumber: formValue.piNumber,
      smsApproved: formValue.smsApproved,
      validTo: formValue.endDate,
      userName: formValue.userName,
      remark: formValue.remark,
      withOutTax: formValue.withoutTax,
      userEmail: formValue.userEmail,
      managerEmail: formValue.poManagerEmail,
      validFrom: formValue.startDate,
      amountWithTax: formValue.poAmountWithTax,
      department: formValue.departmentName,
      paymentStatus: Number(formValue.paymentStatus),
      userId: Number(this.clientId),
      id: formValue.id,
      upload_document : this.documentUploadId
    };

    console.log('data', data);

    this.invoiceService.createPurchaseOrder(data).subscribe((response: any) => {
      const error = response.Error;
      const errorMessage = response.ErrorMessage;
      if (error !== '0') {
        return this.toasterService.showError(errorMessage, '');
      }
      const processVariables = response.ProcessVariables;
      const errorObj = processVariables.error;

      if (errorObj.code !== '0') {
        return this.toasterService.showError(errorObj.message, '');
      }


      this.showPOModal = false;

      this.isDirty = false;


      this.PurchaseOrderForm.reset();
      this.documentUploadId = '';
      this.PurchaseOrderForm.get('paymentStatus').setValue('');
      this.PurchaseOrderForm.get('departmentName').setValue('');
      this.PurchaseOrderForm.get('poStatus').setValue('');
      this.PurchaseOrderForm.get('userName').setValue(this.accountName);
      this.isDirty = false;
      this.formQuantity.reset();
      this.beheSer.setPoNumber(data.poNumber);
      this.beheSer.setSmsApproved(data.smsApproved);
      console.log('processVariables', processVariables);
      if (formData) {
        this.toasterService.showSuccess('Data updated Successfully', '');
        this.overrideGridData(processVariables);
      } else {
        this.toasterService.showSuccess('Data Saved Successfully', '');
        this.updateGridData(processVariables);
      }
      this.showPOModal = true;

      //     // this.fetchPODetails(this.clientId);

      //     // this.showDataSaveModal = true;
      //     this.dataValue= {
      //       title: 'Purchase Order Saved Successfully',
      //       message: 'Are you sure you want to proceed tax invoice page?'
      // };

    });

  }

  overrideGridData(data: any) {
    const index = this.userList.findIndex((value) => {
          return String(value.currentPOId || value.id) === String(data.id);
    });
    this.userList[index] = data;
    this.dataSource = this.userList;
  }

  updateGridData(data) {
    this.userList = this.userList || [];
    console.log('processVariables', data);
    this.purchaseOrderId = data.id;
    this.userList.unshift(data);
    this.dataSource = this.userList;
    this.resultsLength += 1;
  }

  pageEventData(event) {


    const currentPageIndex  = Number(event.pageIndex) + 1;

    this.fetchPODetails(this.clientId, currentPageIndex);
  }

  cancelPO() {
    this.showPOModal = false;
  }

  saveYes() {

  this.showDataSaveModal = false;
  this.showPOModal = false;

  this.utilService.setCurrentUrl('users/taxInvoice');

  this.router.navigate([`/users/taxInvoice/${this.storeProjectNo}`]);


 }

 saveCancel() {

  this.showDataSaveModal = false;
  this.showPOModal = false;
 }

 exportAsCsv() {
  const formValue = this.searchForm.value;
  const params = {
    searchKeyword: formValue.searchData,
    fromDate: formValue.searchFrom,
    toDate: formValue.searchTo,
    exportCsv: 'true',
    selectedClientId: Number(this.clientId)
  };
  this.poDataService.getCsvData(params)
      .subscribe((res: any) => {
        const error = res.Error;
        const errorMessage = res.ErrorMessage;
        if (error !== "0") {
          return this.toasterService.showError(errorMessage, '');
        }
        const processVariables = res.ProcessVariables;
        const list = processVariables.List;
        if (!list) {
          return this.toasterService.showInfo('No data available', '');
        }
        CsvDataService.exportToCsv('PURCHASER_ORDER.csv', list);
        //  console.log('res', res);
        //  const link = document.createElement('a');
        //  const csvContent = atob(res.ProcessVariables.exportCsv);
        //  const  blob = new Blob([csvContent], {type: "data:application/octet-stream;base64"});
        //  const url = URL.createObjectURL(blob);
        //  link.setAttribute('href', url);
        //  link.setAttribute('download', 'Filename.csv');
        //  link.style.visibility = 'hidden';
        //  document.body.appendChild(link);
        //  link.click();
        //  document.body.removeChild(link);
      });
 }
}

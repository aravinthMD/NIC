import { EventEmitter, OnChanges } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ClientDetailsService } from '@services/client-details.service';
import { CustomDateAdapter } from '@services/custom-date-adapter.service';
import { InvoiceService } from '@services/invoice.service';
import { TaxInvoiceService } from '@services/tax-invoice.service';
import { ToasterService } from '@services/toaster.service';
import { UtilService } from '@services/util.service';
import { environment } from 'src/environments/environment';
import label from '../../../assets/labels/labels.json';
import { PreviewPopupComponent } from '../preview-popup/preview-popup.component';
import {TaxInvoice} from '../tax-invoice-modal/tax-invoice-model';

@Component({
  selector: 'tax-invoice-form',
  templateUrl: './tax-invoice-form.component.html',
  styleUrls: ['./tax-invoice-form.component.scss']
})
export class TaxInvoiceFormComponent implements OnInit,OnChanges {

  TIForm : FormGroup;
  labels : any= label;
  isDirty : boolean;
  documentUploadId  : string;
  proformaInvoicesList = [];
  purchaseOrderNumberList  = [];
  clientId : string;
  paymentStatusList = [];
  invoiceStatusList = [];
  docAvailFlag : boolean;
  host  = environment.host;
  AppiyoDrive = environment.previewDocappiyoDrive;
  dropDownSettings : any = {};
  dropDownSettings1 : any = {};


  @Input() accountName : string;
  @Input() btnText : string;
  @Input() formData : any;
  @Input() piShowFlag =  true;

  @Output() updateGrid = new EventEmitter<any>();
  @Output() emitResult = new EventEmitter<string>()

  set userName(value){
      this.TIForm.controls['userName'].setValue(value);
  }

  set invoiceStatus(value){
      this.TIForm.controls['invoiceStatus'].setValue(value);
  }

  set paymentStatus(value){
      this.TIForm.controls['paymentStatus'].setValue(value);
  }

  set piNumber(value){
      this.TIForm.controls['piNumber'].setValue(value)
  }

  set poNumber(value){
      this.TIForm.controls['poNumber'].setValue(value);
  }

  constructor(private formBuilder : FormBuilder,
              private customDateAdapter : CustomDateAdapter,
              private taxInvoiceSevice : TaxInvoiceService,
              private toasterService : ToasterService,
              private invoiceService : InvoiceService,
              private utilService : UtilService,
              private clientDetailsService : ClientDetailsService,
              private dialog  : MatDialog) {
    this.dropDownSettings = this.utilService.getDropDownSetting();
    this.patchLov();
    this.initForm();

               }

  ngOnInit() {
    this.clientId = this.clientDetailsService.getClientId();
    this.getPIAutoPopulate(this.clientId);
  }

  ngOnChanges(){

    if(this.formData){
        this.setForm(this.formData);
    }
    this.userName = this.accountName;
  }

  patchLov(){
    let lovData = this.utilService.getLovData();
    this.paymentStatusList = lovData ? lovData.paymentStatusList : null;
    this.invoiceStatusList = lovData ? lovData.invoiceStatusList : null;
  }

  initForm(){
    this.TIForm = this.formBuilder.group({
        userName : [''],
        projectNumber : [''],
        poNumber : [''],
        poDate : [null],
        fromDate : [null],
        toDate : [null],
        billableAmount : [null],
        invoiceAmount : [null],
        taxInvoiceNumber : [null],
        invoiceDate : [null],
        submittedDate : [null],
        invoiceStatus : [''],
        invoicePaidAmount : [''],
        tds  : [''],
        penalty : [''],
        shortPay : [''],
        paymentStatus : [''],
        remark : [''],
        uploadDocument : [''],
        userEmail : [''],
        totalSMS :  [''],
        counts1 : [''],
        baseAmount : [''],
        tax : [''],
        receiveDate : [''],
        book : [''],
        dateEstimated : [''],
        invoiceAmount2 : [''],
        bankReceived : [''],
        receiptDate : [''],
        month : [''],
        year : [''],
        mrnNumber : [''],
        projectName : [''],
        projectCoordinator : [''],
        amendOrderNo : [''],
        interestOnTds : [''],
        piNumber : [''],
        id : [null]
    })
  }

  setForm(data){

    if(data){

      const selectedPoNumber : any[] = [
        { id : data && data['poNumber'] ? data['poNumber'] : "" ,
          name : data && data['poNumber'] ? data['poNumber'] : ""}
      ]

      const purchaseOrder = this.customDateAdapter.parseToDateObj(data.poDate);
      const fromDate = this.customDateAdapter.parseToDateObj(data.fromDate);
      const toDate = this.customDateAdapter.parseToDateObj(data.toDate);
      const invoiceDate = this.customDateAdapter.parseToDateObj(data.invoiceDate);
      const submittedDate = this.customDateAdapter.parseToDateObj(data.submittedDate);
      const receiveDate = this.customDateAdapter.parseToDateObj(data.receiveDate);
      const dateEstimated = this.customDateAdapter.parseToDateObj(data.dateEstimated);
      const receiptDate = this.customDateAdapter.parseToDateObj(data.receiptDate);

        this.TIForm.patchValue({
          userName: data.userName,
          projectNumber: data.projectNumber,
          poNumber: selectedPoNumber ? selectedPoNumber : [],
          poDate: purchaseOrder,
          billableAmount: data.billableAmount,
          invoiceAmount: data.invoiceAmount,
          taxInvoiceNumber: data.taxInvoiceNumber,
          invoiceStatus: data.invoiceStatus,
          invoicePaidAmount: data.invoicePaidAmount,
          tds: data.tds,
          penalty: data.penalty,
          shortPay: data.shortPay,
          paymentStatus: data.paymentStatus,
          remark: data.remark,
          userEmail: data.userEmail,
          totalSMS: data.totalSMS,
          counts1: data.counts1,
          baseAmount: data.baseAmount,
          tax: data.tax,
          book: data.book,
          invoiceAmount2: data.invoiceAmount2,
          bankReceived: data.bankReceived,
          mrnNumber: data.mrnNumber,
          projectName: data.projectName,
          amendOrderNo: data.amendOrderNo,
          interestOnTds: data.interestOnTds,
          projectCoordinator: data.projectCoordinator,
          id : Number(data.id),
          fromDate,
          toDate,
          invoiceDate,
          submittedDate,
          receiveDate,
          receiptDate,
          dateEstimated,
        })

        if(data && data.upload_document){
          this.docAvailFlag = true;
          this.documentUploadId = data.upload_document

        }
    }


  }

  getPIAutoPopulate(clientId : string){
    this.invoiceService.getPIAutoPopulationAPI(clientId).subscribe(
      (response) => {

        console.log(`API Response for the Get PI Auto Populate ${response}`);
        if(true){
            this.proformaInvoicesList = response['ProcessVariables']['piList'] || [];
        }
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
        this.TIForm.controls['poDate'].setValue(new Date(this.utilService.changeDateFormat(purchaseOrderDate)));
        this.TIForm.controls['fromDate'].setValue(new Date(this.utilService.changeDateFormat(fromDate)));
        this.TIForm.controls['toDate'].setValue((new Date(this.utilService.changeDateFormat(toDate))));
        this.TIForm.controls['billableAmount'].setValue(billableAmount);
        this.TIForm.controls['projectName'].setValue(projectName);
        this.TIForm.controls['projectNumber'].setValue(projectNumber);
    },(error) =>{
        this.toasterService.showError('Failed to Fetch Data','');
    })
  }

  onItemSelect(value){
    if(!(value && value.name))
      return
      this.getAutoPopulatePO(value.name,Number(this.clientId));
  }

  onPiDeSelect(value?:any){
    this.poNumber = null;
  }

  onPoSelect(value){
    if(!(value && value.name))
      return
      this.getOnChangePO(value.name)
  }

  onPoDeSelect(value?:any){
    this.TIForm.controls['projectName'].reset();
    this.TIForm.controls['projectNumber'].reset();
    this.TIForm.controls['billableAmount'].reset();
    this.TIForm.controls['toDate'].reset();
    this.TIForm.controls['fromDate'].reset();
    this.TIForm.controls['poDate'].reset();

  }

  saveForm(){

    if(this.TIForm.invalid){
      this.isDirty = true;
      return this.toasterService.showError('Please fill all the fields', '');
    }

    const formValue = this.TIForm.value;

    const piNumber = formValue.piNumber;
    const poNumber = formValue.poNumber;

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
      userId: Number(this.clientId),
      upload_document : this.documentUploadId
    };

    const piNumberConverted = piNumber && piNumber.length != 0 ? piNumber : [];
    requestData.piNumber = piNumberConverted.map(val => val.name ? val.name : "").toString();

    const poNumberConverted = poNumber && poNumber.length != 0 ? poNumber : [];
    requestData.poNumber = poNumberConverted.map(val => val.name ? val.name : "").toString();

    this.taxInvoiceSevice.saveOrUpdateTaxInvoiceDetails(requestData)
      .subscribe((res : any) => {
          const error = res  ? res.ProcessVariables.error : {};

          if(error.code !== '0')
            return this.toasterService.showError(error.message,'');

            this.isDirty = false;
            const taxInvoiceData: TaxInvoice = res.ProcessVariables;
            this.toasterService.showSuccess('Data Saved Sucessfully','');
            this.TIForm.reset();
            this.documentUploadId = '';
            this.userName = this.accountName;
            this.invoiceStatus = "";
            this.paymentStatus = "";

            this.updateGrid.emit(taxInvoiceData);

            this.emitResult.emit('success');
      },(error) =>{
          this.toasterService.showError(error.message,'');
      })

  }

  async uploadFile(file  : FileList){
    const uploadedData = await this.utilService.uploadToAppiyoDrive(file);
    if(uploadedData['uploadStatus'])
      this.documentUploadId = uploadedData['documentUploadId']
  }

  pidisplayFn(value){
    if(!value)
      return

      this.getAutoPopulatePO(value,Number(this.clientId));
      return value;
  }

  podisplayFn(value){
    if(!value)
      return

      this.getOnChangePO(value);
      return value;
  }

  preview(){
    const previewUrl  = `${this.host}${this.AppiyoDrive}${this.documentUploadId}`;
    const dialogRef = this.dialog.open(PreviewPopupComponent,{
      data : previewUrl,
      width : '800px',
      height : '560px'
    })
  }

  detectDateKeyAction(event, type) {
    console.log(event);
    if (type === 'poDate') {
      this.TIForm.patchValue({
        poDate: ''
      });
      this.toasterService.showError('Please click the PO date icon to select date','');
    } else if (type === 'fromDate') {
  
      this.TIForm.patchValue({
        fromDate: ''
      });
      this.toasterService.showError('Please click the from date icon to select date','');
    } else if (type === 'toDate') {
      this.TIForm.patchValue({
        toDate: ''
      });
      this.toasterService.showError('Please click the to date icon to select date','');
    } else if (type === 'submittedOn') {
      this.TIForm.patchValue({
        submittedOn: ''
      });
      this.toasterService.showError('Please click the submitted on icon to select date','');
    } else if (type === 'searchFrom') {
      this.TIForm.patchValue({
        searchFrom: ''
      });
      this.toasterService.showError('Please click the from date icon to select date','');
    } else if (type === 'searchTo') {
      this.TIForm.patchValue({
        searchTo: ''
      });
      this.toasterService.showError('Please click the to date icon to select date','');
    }
  }
  

}

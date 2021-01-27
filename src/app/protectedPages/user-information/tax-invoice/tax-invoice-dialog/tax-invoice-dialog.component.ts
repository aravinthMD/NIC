import { Component, Inject, OnInit, Optional, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {LabelsService} from '../../../../services/labels.service';
import {ToasterService} from '@services/toaster.service';
import { UtilService } from '@services/util.service';
import { Router, ActivatedRoute } from '@angular/router';
import { InvoiceService } from '@services/invoice.service';
import { TaxInvoice } from '../tax-invoice.model';

import { CustomDateAdapter } from '@services/custom-date-adapter.service';
import { TaxInvoiceService } from '@services/tax-invoice.service';
@Component({
  selector: 'app-tax-invoice-dialog',
  templateUrl: './tax-invoice-dialog.component.html',
  styleUrls: ['./tax-invoice-dialog.component.scss']
})
export class TaxInvoiceDialogComponent implements OnInit {

  labels :  any;
  buttonName : string = 'Edit';
  taxInvoiceForm : FormGroup;
  enableFlag : boolean = true;
  isDirty : boolean;

  dataForm  : any = {}
  currentTIId  : string = ''

  showUploadModal: boolean;

  imageUrl: string;
  fileSize: string = 'Size - 109.4 KB';
  fileName: string = 'invoice.pdf';;
  fileType: string;

  showPdfModal: boolean;

  showDeleteModal: boolean;

  showUpdate: boolean;

  showDataSaveModal: boolean;

  dataValue: {
    title: string;
    message: string
  }

  storeProjectNo: string;

  viewInfoData: any;

  showEdit: boolean;

  updateEmitter = new EventEmitter();

  constructor(
      private formBuilder: FormBuilder,
      private dialogRef: MatDialogRef<TaxInvoiceDialogComponent>,
      private labelService: LabelsService,
      private toasterService: ToasterService,
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private utilService: UtilService,
      private invoiceService: InvoiceService,
      private customDateAdapter: CustomDateAdapter,
      private taxInvoiceService: TaxInvoiceService,
      @Optional() @Inject(MAT_DIALOG_DATA) public data: TaxInvoice,
      ) {

        console.log('data', data);

    // this.taxInvoiceForm = this.formBuilder.group({
    //   userName : [''],
    //   taxIN : [''],
    //   invoiceDate : new Date(),
    //   projectNo : [''],
    //   poNumber : [''],
    //   poDate : new Date(),
    //   fromDate : new Date(),
    //   toDate : new Date(),
    //   invoiceAmount : [''],
    //   remark : [''],
    //   uploadDoc : [''],
    //   paymentStatus : [''],
    //   invoiceStatus : [''],
    //   invoiceAmountPaid : [''],
    //   tds : [''],
    //   penalty : [''],
    //   shortPay : [''],
    //   submittedOn : new Date(),
    //   poBillable : [''],
    //   projectName:[''],
    //   projectCordinator:[''],
    //   PONoAmendOrder:[''],
    //   mail:[''],
    //   totalSMS:[''],
    //   counts:[''],
    //   baseAmount : [''],
    //   tax:[''],
    //   recvDate : [''],
    //   book :  [''],
    //   dateEstimated :  [''],
    //   invoiceAmount2 : [''],
    //   bankReceived : [''],
    //   interestOnTDSotherDeduction : [''],
    //   receiptDate :  [''],
    //   month : [''],
    //   year : [''],
    //   mrn : ['']
    // })

    //this.detectAuditTrialObj=this.taxInvoiceForm.value
   }

   invoiceStatusList  = [
    {key : 0,value : 'Pending'},
    {key : 1,value : 'Paid'},
    {key : 2,value : 'Partially Paid'},
    {key : 3,value : 'Return by NICSI'}
  ]
  detectAuditTrialObj:any;
  remarkModal:boolean;
  paymentStatus: any[] = [];

  ngOnInit() {
    this.paymentStatus = this.taxInvoiceService.getPaymentList();
    this.labelService.getLabelsData().subscribe((value) => {
      this.labels = value;
      this.initForm();
      this.setValueForView();
      this.setFormValue();
    });




    // this.activatedRoute.params.subscribe((value)=> {

    //   this.storeProjectNo = value.projectNo || 4535;
    // });

    // var dateObj = new Date();
    // var month = dateObj.getUTCMonth() + 1; //months from 1-12
    // var day = dateObj.getUTCDate();
    // var year = dateObj.getUTCFullYear();


    // const psData = this.paymentStatus.filter((val)=> {

    //   return val.key == this.taxInvoiceForm.value.paymentStatus
    // })

    // const invoiceStatusList = this.invoiceStatusList.filter((val)=> {
    //   return val.key == this.taxInvoiceForm.value.invoiceStatus
    // })

    // this.viewInfoData = [
    //   {
    //     key: this.labels.userName,
    //     value:this.taxInvoiceForm.value.userName
    //   },
    //   {
    //     key: this.labels.projectNo,
    //     value:this.taxInvoiceForm.value.projectNo
    //   },
    //   {
    //     key: this.labels.poNumber,
    //     value:this.taxInvoiceForm.value.poNumber
    //   },
    //   {
    //     key: this.labels.poDate,
    //     value:`${day}/${month}/${year}`
    //   },
    //   {
    //     key: this.labels.fromDate,
    //     value:`${day}/${month}/${year}`
    //   },
    //   {
    //     key: this.labels.toDate,
    //     value:`${day}/${month}/${year}`
    //   },
    //   {
    //     key: this.labels.poBillable,
    //     value:this.taxInvoiceForm.value.poBillable
    //   },
    //   {
    //     key: this.labels.invoiceAmount,
    //     value:this.taxInvoiceForm.value.invoiceAmount
    //   },

    //   {
    //     key: this.labels.taxIN,
    //     value:this.taxInvoiceForm.value.taxIN
    //   },
    //   {
    //     key: this.labels.submittedDate,
    //     value:`${day}/${month}/${year}`
    //   },
    //   {
    //     key: this.labels.invoiceStatus,
    //     value:invoiceStatusList[0].value
    //   },
    //   {
    //     key: this.labels.invoiceAmountPaid,
    //     value:this.taxInvoiceForm.value.invoiceAmountPaid
    //   },
    //   {
    //     key: this.labels.tds,
    //     value:this.taxInvoiceForm.value.tds
    //   },
    //   {
    //     key: this.labels.penalty,
    //     value:this.taxInvoiceForm.value.penalty
    //   },
    //   {
    //     key: this.labels.shortPay,
    //     value:this.taxInvoiceForm.value.shortPay
    //   },
    //   {
    //     key: this.labels.paymentStatus,
    //     value:psData[0].value
    //   },
    //   {
    //     key: this.labels.remark,
    //     value:this.taxInvoiceForm.value.remark
    //   },
    //   {
    //     key: this.labels.projectName,
    //     value: ''
    //   },
    //   {
    //     key :  this.labels.projectCordinator,
    //     value  : ""
    //   },{
    //     key :  this.labels.PONoAmendOrder,
    //     value :  ""
    //   },
    //   {
    //     key :  this.labels.mail,
    //     value : ""
    //   },
    //   {
    //     key :  this.labels.totalSMS,
    //     value : ""
    //   },
    //   {
    //     key :  this.labels.projectCordinator,
    //     value : ""
    //   },
    //   {
    //     key :  this.labels.baseAmount,
    //     value : ""
    //   },
    //   {
    //     key :  this.labels.tax,
    //     value : ""
    //   },
    //   {
    //     key :  this.labels.recvDate,
    //     value : ""
    //   },
    //   {
    //     key :  this.labels.book,
    //     value : ""
    //   },
    //   {
    //     key :  this.labels.dateEstimated,
    //     value : ""
    //   },
    //   {
    //     key :  this.labels.invoiceAmount2,
    //     value : ""
    //   },
    //   {
    //     key :  this.labels.bankReceived,
    //     value : ""
    //   },
    //   {
    //     key :  this.labels.interestOnTDSotherDeduction,
    //     value : ""
    //   },
    //   {
    //     key :  this.labels.receiptDate,
    //     value : ""
    //   },
    //   {
    //     key :  this.labels.mrn,
    //     value : ""
    //   },
    //   {
    //     key :  "",
    //     value : ""
    //   },
    //   {
    //     key :  "",
    //     value : ""
    //   },
    //   {
    //     key :  "",
    //     value : ""
    //   }

    // ]   

    // this.getTaxInvoiceDetailById(this.data)
  }

  initForm() {
    this.taxInvoiceForm = new FormGroup({
      userName: new FormControl(null),
      projectNumber: new FormControl(null, Validators.pattern('^[0-9]{0,15}$')),
      poNumber: new FormControl(null),
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
    });
  }

  setValueForView() {
    const invoiceStatusDesc = this.invoiceStatusList.find((val) => {
        return val.key === this.data.invoiceStatus;
    });
    const paymentStatusDesc = this.paymentStatus.find((val) => {
      return Number(val.key) === Number(this.data.paymentStatus);
    });
    this.viewInfoData = [
      {
        key: this.labels.userName,
        value: this.data.userName
      },
      {
        key: this.labels.projectNo,
        value: this.data.projectNumber
      },
      {
        key: this.labels.poNumber,
        value: this.data.poNumber
      },
      {
        key: this.labels.poDate,
        value: this.data.poDate
      },
      {
        key: this.labels.fromDate,
        value: this.data.fromDate
      },
      {
        key: this.labels.toDate,
        value: this.data.toDate
      },
      {
        key: this.labels.poBillable,
        value: this.data.billableAmount
      },
      {
        key: this.labels.invoiceAmount,
        value: this.data.invoiceAmount
      },

      {
        key: this.labels.taxIN,
        value: this.data.taxInvoiceNumber
      },
      {
        key: this.labels.submittedDate,
        value: this.data.submittedDate
      },
      {
        key: this.labels.invoiceStatus,
        value: invoiceStatusDesc.value
      },
      {
        key: this.labels.invoiceAmountPaid,
        value: this.data.invoicePaidAmount
      },
      {
        key: this.labels.tds,
        value: this.data.tds
      },
      {
        key: this.labels.penalty,
        value: this.data.penalty
      },
      {
        key: this.labels.shortPay,
        value: this.data.shortPay
      },
      {
        key: this.labels.paymentStatus,
        value: paymentStatusDesc.value
      },
      {
        key: this.labels.remark,
        value: this.data.remark
      },
      {
        key: this.labels.projectName,
        value: this.data.projectName
      },
      {
        key :  this.labels.projectCordinator,
        value  : this.data.projectCoordinator
      },
      {
        key :  this.labels.PONoAmendOrder,
        value :  this.data.amendOrderNo
      },
      {
        key :  this.labels.mail,
        value : this.data.userEmail
      },
      {
        key :  this.labels.totalSMS,
        value : this.data.totalSMS
      },
      {
        key :  this.labels.counts,
        value : this.data.counts1
      },
      {
        key :  this.labels.baseAmount,
        value : this.data.baseAmount
      },
      {
        key :  this.labels.tax,
        value : this.data.tax
      },
      {
        key :  this.labels.recvDate,
        value : this.data.receiveDate
      },
      {
        key :  this.labels.book,
        value : this.data.book
      },
      {
        key :  this.labels.dateEstimated,
        value : this.data.dateEstimated
      },
      {
        key :  this.labels.invoiceAmount2,
        value : this.data.invoiceAmount2
      },
      {
        key :  this.labels.bankReceived,
        value : this.data.bankReceived
      },
      {
        key :  this.labels.interestOnTDSotherDeduction,
        value : this.data.interestOnTds
      },
      {
        key :  this.labels.receiptDate,
        value : this.data.receiptDate
      },
      {
        key :  this.labels.mrn,
        value : this.data.mrnNumber
      },
    ];
  }


  setFormValue() {
       const purchaseOrder = this.customDateAdapter.parseToDateObj(this.data.poDate);
       const fromDate = this.customDateAdapter.parseToDateObj(this.data.fromDate);
       const toDate = this.customDateAdapter.parseToDateObj(this.data.toDate);
       const invoiceDate = this.customDateAdapter.parseToDateObj(this.data.invoiceDate);
       const submittedDate = this.customDateAdapter.parseToDateObj(this.data.submittedDate);
       const receiveDate = this.customDateAdapter.parseToDateObj(this.data.receiveDate);
       const dateEstimated = this.customDateAdapter.parseToDateObj(this.data.dateEstimated);
       const receiptDate = this.customDateAdapter.parseToDateObj(this.data.receiptDate);

       this.taxInvoiceForm.patchValue({
        userName: this.data.userName,
        projectNumber: this.data.projectNumber,
        poNumber: this.data.poNumber,
        poDate: purchaseOrder,
        billableAmount: this.data.billableAmount,
        invoiceAmount: this.data.invoiceAmount,
        taxInvoiceNumber: this.data.taxInvoiceNumber,
        invoiceStatus: this.data.invoiceStatus,
        invoicePaidAmount: this.data.invoicePaidAmount,
        tds: this.data.tds,
        penalty: this.data.penalty,
        shortPay: this.data.shortPay,
        paymentStatus: this.data.paymentStatus,
        remark: this.data.remark,
        userEmail: this.data.userEmail,
        totalSMS: this.data.totalSMS,
        counts1: this.data.counts1,
        baseAmount: this.data.baseAmount,
        tax: this.data.tax,
        book: this.data.book,
        invoiceAmount2: this.data.invoiceAmount2,
        bankReceived: this.data.bankReceived,
        mrnNumber: this.data.mrnNumber,
        projectName: this.data.projectName,
        amendOrderNo: this.data.amendOrderNo,
        interestOnTds: this.data.interestOnTds,
        projectCoordinator: this.data.projectCoordinator,
        fromDate,
        toDate,
        invoiceDate,
        submittedDate,
        receiveDate,
        receiptDate,
        dateEstimated,
       });
  }

  getTaxInvoiceDetailById(currentTiId :  string){

    this.invoiceService.getTaxInvoiceDetailById(currentTiId).subscribe((response) => {
        console.log(response);
        this.dataForm = response['ProcessVariables'];
        this.currentTIId = response['ProcessVariables']['currentTiIds'];
        this.assignToForm(this.dataForm);
    },
    (error) => {
      this.toasterService.showError('Failed to Fetch the Tax Invoice Detail','')
    })

  }

  assignToForm(dataForm  :any){

    this.taxInvoiceForm.patchValue({

      userName : dataForm['userName'] || '',
      taxIN : dataForm["TaxInvoiceNumber"] || '',
      invoiceDate : dataForm["poDate"] || '',
      projectNo : dataForm["projectNumber"] || '',
      poNumber : dataForm["poNumber"] || '',
      poDate : dataForm["poDate"] || '',
      fromDate : dataForm["fromDate"] || '',
      toDate : dataForm["toDate"] || '',
      invoiceAmount : dataForm["InvoiceAmount"] || '',
      remark : dataForm["remark"] || '',
      // uploadDoc : [''],
      paymentStatus : dataForm['paymentStatus'] || '',
      invoiceStatus : dataForm['InvoiceStatus'] || '',
      invoiceAmountPaid : dataForm['InvoicePaidAmount'] || '',
      tds : dataForm['tds'] || '',
      penalty : dataForm['penalty'] || '',
      shortPay : dataForm['shortPay'] || '',
      submittedOn : dataForm['submittedDate'] || '',
      poBillable : dataForm['billableAmount'] || '',
      projectName:'',
      projectCordinator:'',
      PONoAmendOrder:'',
      mail:'',
      totalSMS:'',
      counts:'',
      baseAmount : '',
      tax:'',
      recvDate : '',
      book :  '',
      dateEstimated :  '',
      invoiceAmount2 : '',
      bankReceived : '',
      interestOnTDSotherDeduction : '',
      receiptDate :  '',
      month : '',
      year : '',
      mrn : ''


    })

  }



  OnEdit() {


    this.enableFlag = false;
    this.showUpdate = true;
    this.showEdit = true;
  }

  OnUpdate() {

    if (!this.taxInvoiceForm.valid) {
      this.isDirty = true;
      return this.toasterService.showError('Please fill all the fields', '');
    }
    this.updateEmitter.emit({
      id: Number(this.data.id),
      ...this.taxInvoiceForm.value
    });
    
    // this.detectFormChanges();
    

    // if(this.taxInvoiceForm.invalid){
    //   this.isDirty = true;
    //   return;
    // }

    // // {"userName":"TestUser01","projectNumber":"P1234","poDate":"24/12/2020","fromDate":"23/12/2020","toDate":"24/12/2020","billableAmount":"5000","InvoiceAmount":"3000","TaxInvoiceNumber":"INV3343","submittedDate":"24/12/2020","InvoiceStatus":2,"InvoicePaidAmount":"2000","tds":"100","penalty":"0","shortPay":"2500","paymentStatus":1,"remark":"Remark Column","uploadDocument":"files","temp":"update","selectedPIId":"16","poNumber":"5"}


    // // userName : [''],
    // // taxIN : [''],
    // // invoiceDate : new Date(),
    // // projectNo : [''],
    // // poNumber : [''],
    // // poDate : new Date(),
    // // fromDate : new Date(),
    // // toDate : new Date(),
    // // invoiceAmount : [''],
    // // remark : [''],
    // // uploadDoc : [''],
    // // paymentStatus : [''],
    // // invoiceStatus : [''],
    // // invoiceAmountPaid : [''],
    // // tds : [''],
    // // penalty : [''],
    // // shortPay : [''],
    // // submittedOn : new Date(),
    // // poBillable : [''],
    // // projectName:[''],
    // // projectCordinator:[''],
    // // PONoAmendOrder:[''],
    // // mail:[''],
    // // totalSMS:[''],
    // // counts:[''],
    // // baseAmount : [''],
    // // tax:[''],
    // // recvDate : [''],
    // // book :  [''],
    // // dateEstimated :  [''],
    // // invoiceAmount2 : [''],
    // // bankReceived : [''],
    // // interestOnTDSotherDeduction : [''],
    // // receiptDate :  [''],
    // // month : [''],
    // // year : [''],
    // // mrn : ['']
    // const taxData = {
    //   userName:this.taxInvoiceForm.value.userName,
    //   projectNumber:this.taxInvoiceForm.value.projectNo,
    //   poDate:this.taxInvoiceForm.value.poDate,
    //   fromDate:this.taxInvoiceForm.value,
    //   toDate:this.taxInvoiceForm.value,
    //   billableAmount:this.taxInvoiceForm.value,
    //   InvoiceAmount:this.taxInvoiceForm.value,
    //   TaxInvoiceNumber:this.taxInvoiceForm.value,
    //   submittedDate:this.taxInvoiceForm.value,
    //   InvoiceStatus:this.taxInvoiceForm.value,
    //   InvoicePaidAmount:this.taxInvoiceForm.value,
    //   tds:this.taxInvoiceForm.value,
    //   penalty:this.taxInvoiceForm.value,
    //   shortPay:this.taxInvoiceForm.value,
    //   paymentStatus:this.taxInvoiceForm.value,
    //   remark:this.taxInvoiceForm.value,
    //   uploadDocument:'files',
    //   temp:'update',
    //   selectedPIId:this.taxInvoiceForm.value,
    //   poNumber:this.taxInvoiceForm.value,
    //   projectName:this.taxInvoiceForm.value,
    //   projectCordinator:this.taxInvoiceForm.value,
    //   PONoAmendOrder:this.taxInvoiceForm.value,
    //   mail:this.taxInvoiceForm.value,
    //   totalSMS:this.taxInvoiceForm.value,
    //   counts:this.taxInvoiceForm.value,
    //   baseAmount : this.taxInvoiceForm.value,
    //   tax:this.taxInvoiceForm.value,
    //   recvDate : this.taxInvoiceForm.value,
    //   book :  this.taxInvoiceForm.value,
    //   dateEstimated :  this.taxInvoiceForm.value,
    //   invoiceAmount2 : this.taxInvoiceForm.value,
    //   bankReceived : this.taxInvoiceForm.value,
    //   interestOnTDSotherDeduction : this.taxInvoiceForm.value,
    //   receiptDate :  this.taxInvoiceForm.value,
    //   month : this.taxInvoiceForm.value,
    //   year : this.taxInvoiceForm.value,
    //   mrn : this.taxInvoiceForm.value
    // }

    // this.invoiceService.updateTaxInvoice(taxData).subscribe((response)=> {

    // })

  }

  closeDialog() {
    this.dialogRef.close({event : 'close',data : 'returnvalue'});
  }


  viewDoc() {

    this.showUploadModal = true;
  }

  download(){
  
  }
  detectFormChanges() {

    let iRemark = false;

    const formObject = this.taxInvoiceForm.value;

    const keyArr = Object.keys(formObject);

    const index = keyArr.findIndex((val)=> {
      return val == 'remark'
    })
    
    keyArr.splice(index,1)

    const found = keyArr.find((element) => {
              return formObject[element] != this.detectAuditTrialObj[element]
        
    });


    if(found && formObject['remark'] == this.detectAuditTrialObj['remark']){
      iRemark = true;
    // this.toasterService.showError('Please enter the remark','')
    this.remarkModal = true;
    this.taxInvoiceForm.patchValue({
      remark: ''
    })
    
    }else {

      // if(!found && !iRemark) {

      //   this.form.patchValue({
      //     remark: this.detectAuditTrialObj.remark
      //   })
      // }

      this.detectAuditTrialObj = this.taxInvoiceForm.value;
      this.toasterService.showSuccess('Data Saved Successfully','')
    }
  }

  remarkOkay() {
    this.remarkModal = false;
  }

  async onFileSelect(event) {

    // alert('Success')
    const files: File = event.target.files[0];


    if(files.type == 'application/pdf') {

      const reader = new FileReader();
      reader.readAsDataURL(files);
      reader.onload = ((e)=> {
        
        
        // this.selectedPdf = this.sanitizer.bypassSecurityTrustResourceUrl('data:application/pdf;base64,' + reader.result.toString())
        // target.files[0]

       // this.selectedPdf = ''
        this.fileSize = `Size - ${this.bytesToSize(files.size)}`
        this.fileName = files.name;  
        console.log('fileSize',this.fileSize)
        
      });

    }else {

      const base64: any = await this.toBase64(event);
      this.imageUrl = base64;
      this.fileSize = this.bytesToSize(files.size);
      this.fileName = files.name;

    }
   
  }


  toBase64(evt) {
    return new Promise((resolve, reject) => {
      // const reader = new FileReader();
      // reader.readAsDataURL(file);
      // reader.onload = (function(theFile) {
      //   return function(e) {
      //     const binaryData = e.target.result;
      //     const base64String = window.btoa(binaryData);
      //     console.log('base64String', base64String);
      //     resolve(base64String)
      //   };
      // })(file);
      var f = evt.target.files[0]; // FileList object
      var reader = new FileReader();
      // Closure to capture the file information.
      reader.onload = (function (theFile) {
        return function (e) {
          var binaryData = e.target.result;
          //Converting Binary Data to base 64
          var base64String = window.btoa(binaryData);
          console.log('base64String', base64String);
          resolve(base64String)
          //showing file converted to base64
          // document.getElementById('base64').value = base64String;
          // alert('File converted to base64 successfuly!\nCheck in Textarea');
        };
      })(f);
      // Read in the image file as a data URL.
      reader.readAsBinaryString(f);
      // Read in the image file as a data URL.
      // reader.readAsBinaryString(file);
      // reader.onloadend = () => {
      //   let result = '';

      //   if (this.fileType === 'jpeg' || this.fileType === 'png') {
      //     result = reader.result
      //       .toString()
      //       .replace(/^data:image\/[a-z]+;base64,/, '');
      //   } else if (this.fileType === 'pdf') {
      //     result = reader.result
      //       .toString()
      //       .replace(/^data:application\/[a-z]+;base64,/, '');
      //   } else if (this.fileType.includes('xls')) {
      //     result = reader.result.toString().split(',')[1];
      //   } else if (this.fileType === 'docx') {
      //     result = reader.result.toString().split(',')[1];
      //   } else {
      //     result = reader.result.toString();
      //   }
      //   resolve(result);
      // };

      // reader.onerror = (error) => reject(error);
    });
  }

  private bytesToSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) {
      return 'n/a';
    }
    const i = Number(Math.floor(Math.log(bytes) / Math.log(1024)));
    if (i === 0) {
      return bytes + ' ' + sizes[i];
    }
    return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
  }

  showPDF() {
    this.showUploadModal = false;
    this.showPdfModal = true;
  }


  detectDateKeyAction(event,type) {

    console.log(event)
    
    if(type == 'poDate') {
  
      this.taxInvoiceForm.patchValue({
        poDate: ''
      })
      this.toasterService.showError('Please click the PO date icon to select date','');
    }else if(type == 'fromDate') {
  
      this.taxInvoiceForm.patchValue({
        fromDate: ''
      })
      this.toasterService.showError('Please click the fromDate icon to select date','');
    }else if(type == 'toDate') {
  
      this.taxInvoiceForm.patchValue({
        toDate: ''
      })
      this.toasterService.showError('Please click the toDate icon to select date','');
    }else if(type == 'submittedOn') {
  
      this.taxInvoiceForm.patchValue({
        submittedOn: ''
      })
      this.toasterService.showError('Please click the submittedOn icon to select date','');
    }
    
  }

}

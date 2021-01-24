import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {LabelsService} from '../../../../services/labels.service';
import {ToasterService} from '@services/toaster.service';
import { UtilService } from '@services/util.service';
import { Router,ActivatedRoute } from '@angular/router'
import { InvoiceService } from '@services/invoice.service';
import { ClientDetailsService } from '@services/client-details.service';
import { DatePipe } from '@angular/common';
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

  monthValidation: {
    rule?: any;
    msg?: string;
  }[];

  yearValidation: {
    rule?: any;
    msg?: string;
  }[];

  constructor(
      private formBuilder : FormBuilder,
      private dialogRef : MatDialogRef<TaxInvoiceDialogComponent>,
      private labelService : LabelsService,
      private toasterService: ToasterService,
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private utilService: UtilService,
      private invoiceService : InvoiceService,
      @Optional() @Inject(MAT_DIALOG_DATA) public data: string,
      private clientDetailsService: ClientDetailsService,
      private Datepipe:DatePipe,
      ) {


        console.log('TI Data', data)
    this.taxInvoiceForm = this.formBuilder.group({
      userName : [''],
      taxIN : [''],
      invoiceDate : new Date(),
      projectNo : [''],
      poNumber : [''],
      poDate : new Date(),
      fromDate : new Date(),
      toDate : new Date(),
      invoiceAmount : [''],
      remark : [''],
      uploadDoc : [''],
      paymentStatus : [''],
      invoiceStatus : [''],
      invoiceAmountPaid : [''],
      tds : [''],
      penalty : [''],
      shortPay : [''],
      submittedOn : new Date(),
      poBillable : [''],
      projectName:[''],
      projectCordinator:[''],
      PONoAmendOrder:[''],
      mail:[''],
      totalSMS:[''],
      counts:[''],
      baseAmount : [''],
      tax:[''],
      recvDate : [''],
      book :  [''],
      dateEstimated :  [''],
      invoiceAmount2 : [''],
      bankReceived : [''],
      interestOnTDSotherDeduction : [''],
      receiptDate :  [''],
      month : [''],
      year : [''],
      mrn : [''],
      estimation: ['']
    })

    this.detectAuditTrialObj=this.taxInvoiceForm.value
   }

   invoiceStatusList :  any[] = [
    {key : 0,value : 'Pending'},
    {key : 1,value : 'Paid'},
    {key : 2,value : 'Partially Paid'},
    {key : 3,value : 'Return by NICSI'}
  ]
  detectAuditTrialObj:any;
  remarkModal:boolean;
  paymentStatus: any[] = [
    { key: 0, value: 'Pending' },
    { key: 1, value: 'Received' },
    { key: 2, value: 'On Hold' }]

  ngOnInit() {
    this.labelService.getLabelsData().subscribe((value) => {
      this.labels = value;
    })

    
    this.storeProjectNo = this.clientDetailsService.getClientId();
   
    this.monthValidation = this.monthValidationCheck();
    this.yearValidation = this.yearValidationCheck();

    this.getTaxInvoiceDetailById(this.data)
  }

  monthValidationCheck() {

    const month = [
      {
        rule: (val) => {

          

          return (val > 0 && val < 11) ? false: true;
        },
        msg: 'Please enter the month between range of 0 to 11',
      }
    ];
    return month;
  }

  yearValidationCheck() {

    const year = [
      {
        rule: (val) => {

          let year = val;
          var text = /^[0-9]+$/;
      if (year != 0) {
        if ((year != "") && (!text.test(year))) {
            return true;
        }

        if (year.length != 4) {
            return true;
        }
        var current_year=new Date().getFullYear();
        if((year < 1920) || (year > current_year))
            {
            return true;
            }
        return false;
          }
        },
        msg: 'Please enter the valid year',
      }
    ];
    return year;
  }

  getTaxInvoiceDetailById(currentTiId :  string){

    this.invoiceService.getTaxInvoiceDetailById(currentTiId).subscribe((response) => {
        console.log(response);

        if(response['ProcessVariables']['error']['code'] == '0') {
          this.dataForm = response['ProcessVariables'];
          this.currentTIId = response['ProcessVariables']['id'];
          this.assignToForm(this.dataForm);
          this.assignToViewData(this.dataForm);
        }else {
          this.toasterService.showError(response['ProcessVariables']['error']['message'],'')
        }
        
    },
    (error) => {
      this.toasterService.showError('Failed to Fetch the Tax Invoice Detail','')
    })

  }

  assignToViewData(dataForm) {

    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();


    const psData = this.paymentStatus.filter((val)=> {

      return val.key == this.taxInvoiceForm.value.paymentStatus
    })

    const invoiceStatusList = this.invoiceStatusList.filter((val)=> {
      return val.key == this.taxInvoiceForm.value.invoiceStatus
    })

    this.viewInfoData = [
      {
        key: this.labels.userName,
        value: dataForm['userName'] || ''
      },
      {
        key: this.labels.projectNo,
        value:dataForm['projectNumber'] || ''
      },
      {
        key: this.labels.poNumber,
        value:dataForm['poNumber'] || ''
      },
      {
        key: this.labels.poDate,
        value:dataForm['poDate'] || ''
      },
      {
        key: this.labels.fromDate,
        value:dataForm['fromDate'] || ''
      },
      {
        key: this.labels.toDate,
        value:dataForm['toDate'] || ''
      },
      {
        key: this.labels.poBillable,
        value:dataForm['billableAmount'] || ''
      },
      {
        key: this.labels.invoiceAmount,
        value:dataForm['InvoiceAmount'] || ''
      },

      {
        key: this.labels.taxIN,
        value:dataForm['TaxInvoiceNumber'] || ''
      },
      {
        key: this.labels.invoiceDate,
        value:dataForm['invoiceDate'] || ''
      },
      {
        key: this.labels.month,
        value:dataForm['month'] || ''
      },
      {
        key: this.labels.year,
        value:dataForm['year'] || ''
      },
      {
        key: this.labels.submittedDate,
        value:dataForm['submittedDate'] || ''
      },
      {
        key: this.labels.invoiceStatus,
        value:dataForm['InvoiceStatus'] || ''
      },
      {
        key: this.labels.invoiceAmountPaid,
        value:dataForm['InvoicePaidAmount'] || ''
      },
      {
        key: this.labels.tds,
        value:dataForm['tds'] || ''
      },
      {
        key: this.labels.penalty,
        value:dataForm['penalty'] || ''
      },
      {
        key: this.labels.shortPay,
        value:dataForm['shortPay'] || ''
      },
      {
        key: this.labels.paymentStatus,
        value:dataForm['paymentStatus'] || ''
      },
      {
        key: this.labels.remark,
        value:dataForm['remark'] || ''
      },
      {
        key: this.labels.projectName,
        value: dataForm['projectName'] || ''
      },
      {
        key :  this.labels.projectCordinator,
        value  : dataForm['projectCodinator'] || ''
      },{
        key :  this.labels.PONoAmendOrder,
        value :  dataForm['PONoAmendOrder'] || ''
      },
      {
        key :  this.labels.mail,
        value : dataForm['userEmail'] || ''
      },
      {
        key :  this.labels.totalSMS,
        value : dataForm['totalSMS'] || ''
      },
      {
        key :  this.labels.baseAmount,
        value : dataForm['baseAmount'] || ''
      },
      {
        key :  this.labels.tax,
        value : dataForm['tax'] || ''
      },
      {
        key :  this.labels.recvDate,
        value : dataForm['receiveDate'] || ''
      },
      {
        key :  this.labels.book,
        value : dataForm['book'] || ''
      },
      {
        key :  this.labels.dateEstimated,
        value : dataForm['dateEstimated'] || ''
      },
      {
        key :  this.labels.invoiceAmount2,
        value : dataForm['invoiceAmount2'] || ''
      },
      {
        key :  this.labels.bankReceived,
        value : dataForm['bankReceived'] || ''
      },
      {
        key :  this.labels.interestOnTDSotherDeduction,
        value : dataForm['interestOnTds'] || ''
      },
      {
        key :  this.labels.receiptDate,
        value : dataForm['receiptDate1'] || ''
      },
      {
        key :  this.labels.mrn,
        value : dataForm['mrnNumber'] || ''
      },
      {
        key :  this.labels.estimation,
        value : dataForm['Estimation'] || ''
      },
      {
        key : "",
        value : ""
      },
      {
        key :  "",
        value : ""
      },
      {
        key :  "",
        value : ""
      }

    ]   
  }

  assignToForm(dataForm  :any){

    this.taxInvoiceForm.patchValue({
      userName : dataForm['userName'] || '',
      taxIN : dataForm["TaxInvoiceNumber"] || '',
      invoiceDate : dataForm["invoiceDate"] || '',
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
      projectName:dataForm['projectName'] || '',
      projectCordinator:dataForm['projectCodinator'] || '',
      PONoAmendOrder:dataForm['PONoAmendOrder'] || '',
      mail:dataForm['userEmail'] || '',
      totalSMS:dataForm['totalSMS'] || '',
      counts:dataForm['counts1'] || '',
      baseAmount : dataForm['baseAmount'] || '',
      tax:dataForm['tax'] || '',
      recvDate : dataForm['receiveDate'] || '',
      book :  dataForm['book'] || '',
      dateEstimated :  dataForm['dateEstimated'] || '',
      invoiceAmount2 : dataForm['invoiceAmount2'] || '',
      bankReceived : dataForm['bankReceived'] || '',
      interestOnTDSotherDeduction : dataForm['interestOnTds'] || '',
      receiptDate :  dataForm['receiptDate1'] || '',
      month : dataForm['month'] || '',
      year : dataForm['year'] || '',
      mrn : dataForm['mrnNumber'] || ''


    })

  }



  OnEdit() {


    this.enableFlag = false;
    this.showUpdate = true;
    this.showEdit = true;
  }

  OnUpdate(){
    
    this.detectFormChanges();
    

    if(this.taxInvoiceForm.invalid){
      this.isDirty = true;
      return;
    }


    const feildControls = this.taxInvoiceForm.controls;
    const userName = feildControls.userName.value;
    const taxIN  = feildControls.taxIN.value;
    const invoiceDate = feildControls.invoiceDate.value;
    const projectNo = feildControls.projectNo.value;
    const poNumber = feildControls.poNumber.value;
    const poDate = feildControls.poDate.value;
    const fromDate = feildControls.fromDate.value;
    const toDate = feildControls.toDate.value;
    const invoiceAmount = feildControls.invoiceAmount.value;
    const remark = feildControls.remark.value;
    const uploadDoc = feildControls.uploadDoc.value;
    const paymentStatus = +feildControls.paymentStatus.value;
    const invoiceStatus = +feildControls.invoiceStatus.value;
    const invoiceAmountPaid = feildControls.invoiceAmountPaid.value;
    const tds = feildControls.tds.value;
    const penalty = feildControls.penalty.value;
    const shortPay = feildControls.shortPay.value;
    const submittedOn = feildControls.submittedOn.value;
    const poBillable = feildControls.poBillable.value;
    const projectName = feildControls.projectName.value;
    const projectCordinator = feildControls.projectCordinator.value;
    const PONoAmendOrder = +feildControls.PONoAmendOrder.value;
    const mail = +feildControls.mail.value;
    const totalSMS = Number(feildControls.totalSMS.value);
    const counts = feildControls.counts.value;
    const baseAmount = Number(feildControls.baseAmount.value);
    const tax = Number(feildControls.tax.value);
    const book = feildControls.book.value;
    const invoiceAmount2 = Number(feildControls.invoiceAmount2.value);
    const bankReceived = feildControls.bankReceived.value;
    const interestOnTDSotherDeduction = feildControls.interestOnTDSotherDeduction.value;
    const mrn = feildControls.mrn.value;
    const recvDate = feildControls.recvDate.value;
    const receiptDate = feildControls.receiptDate.value;
    const dateEstimated = feildControls.dateEstimated.value;
    const estimation = feildControls.estimation.value;

    const month = feildControls.month.value;
    const year = feildControls.year.value;

    
    const formattedRecvDate = this.Datepipe.transform(recvDate,'dd/MM/yyyy')
    const formattedReceiptDate = this.Datepipe.transform(receiptDate,'dd/MM/yyyy')
    const formattedDateEstimated = this.Datepipe.transform(dateEstimated,'dd/MM/yyyy')


    const formattedFromDate = this.Datepipe.transform(fromDate,'dd/MM/yyyy');
    const formattedToDate = this.Datepipe.transform(toDate,'dd/MM/yyyy');
    const formattedPoDate = this.Datepipe.transform(poDate,'dd/MM/yyyy');
    const formattedSubmitedOn = this.Datepipe.transform(submittedOn,'dd/MM/yyyy');

    const formattedInvoiceDate = this.Datepipe.transform(invoiceDate,'dd/MM/yyyy');

    const taxData = {
      "userName":userName,
      "projectNumber":projectNo,
      "poNumber":poNumber,
      "poDate":formattedPoDate,
      "fromDate":formattedFromDate,
      "toDate":formattedToDate,
      "billableAmount":poBillable,
      "InvoiceAmount":invoiceAmount,
      "TaxInvoiceNumber":taxIN,
      "submittedDate":formattedSubmitedOn,
      "InvoiceStatus":invoiceStatus,
      "InvoicePaidAmount":invoiceAmountPaid,
      "tds":tds,
      "penalty":penalty,
      "shortPay":shortPay,
      "paymentStatus":paymentStatus,
      "remark":remark,
      "uploadDocument":"File",
      "userEmail":mail,
      "totalSMS":totalSMS,
      "counts1":counts,
      "baseAmount":baseAmount,
      "tax":tax,
      "invoiceDate":formattedInvoiceDate,
      "receiveDate":formattedRecvDate,
      "book":book,
      "dateEstimated":formattedDateEstimated,
      "invoiceAmount2":invoiceAmount2,
      "bankReceived":bankReceived,
      "receiptDate1":formattedReceiptDate,
      "month":month,
      "year":year,
      "mrnNumber":mrn,
      "projectName":projectName,
      "Estimation":estimation,
      "id": this.currentTIId
    }

    this.invoiceService.updateTaxInvoice(taxData).subscribe((response)=> {
      console.log(response)

      if(response['ProcessVariables']['error']['code'] == '0') {

        this.toasterService.showSuccess('Data Saved Successfully','')
      }else {

        this.toasterService.showError(response['ProcessVariables']['error']['message'],'')
      }
    })

  }

  closeDialog(){
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
    }else if(type == 'recvDate') {
      this.taxInvoiceForm.patchValue({
        recvDate: ''
      })
      this.toasterService.showError('Please click the recvDate icon to select date','');
    }else if(type == 'dateEstimated') {
      this.taxInvoiceForm.patchValue({
        dateEstimated: ''
      })
      this.toasterService.showError('Please click the dateEstimated icon to select date','');
    }else if(type == 'receiptDate') {
      this.taxInvoiceForm.patchValue({
        receiptDate: ''
      })
      this.toasterService.showError('Please click the receiptDate icon to select date','');
    }else if(type == 'invoiceDate') {
      this.taxInvoiceForm.patchValue({
        invoiceDate: ''
      })
      this.toasterService.showError('Please click the invoiceDate icon to select date','');
    }
    
  }

}

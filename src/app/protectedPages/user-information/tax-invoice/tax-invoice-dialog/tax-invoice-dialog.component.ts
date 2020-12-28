import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {LabelsService} from '../../../../services/labels.service';
import {ToasterService} from '@services/toaster.service';
import { UtilService } from '@services/util.service';
import { Router,ActivatedRoute } from '@angular/router'
import { InvoiceService } from '@services/invoice.service';
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
      ) {

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
      poBillable : ['']
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

    this.activatedRoute.params.subscribe((value)=> {

      this.storeProjectNo = value.projectNo || 4535;
    })

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
        value:this.taxInvoiceForm.value.userName
      },
      {
        key: this.labels.projectNo,
        value:this.taxInvoiceForm.value.projectNo
      },
      {
        key: this.labels.poNumber,
        value:this.taxInvoiceForm.value.poNumber
      },
      {
        key: this.labels.poDate,
        value:`${day}/${month}/${year}`
      },
      {
        key: this.labels.fromDate,
        value:`${day}/${month}/${year}`
      },
      {
        key: this.labels.toDate,
        value:`${day}/${month}/${year}`
      },
      {
        key: this.labels.poBillable,
        value:this.taxInvoiceForm.value.poBillable
      },
      {
        key: this.labels.invoiceAmount,
        value:this.taxInvoiceForm.value.invoiceAmount
      },

      {
        key: this.labels.taxIN,
        value:this.taxInvoiceForm.value.taxIN
      },
      {
        key: this.labels.submittedDate,
        value:`${day}/${month}/${year}`
      },
      {
        key: this.labels.invoiceStatus,
        value:invoiceStatusList[0].value
      },
      {
        key: this.labels.invoiceAmountPaid,
        value:this.taxInvoiceForm.value.invoiceAmountPaid
      },
      {
        key: this.labels.tds,
        value:this.taxInvoiceForm.value.tds
      },
      {
        key: this.labels.penalty,
        value:this.taxInvoiceForm.value.penalty
      },
      {
        key: this.labels.shortPay,
        value:this.taxInvoiceForm.value.shortPay
      },
      {
        key: this.labels.paymentStatus,
        value:psData[0].value
      },
      {
        key: this.labels.remark,
        value:this.taxInvoiceForm.value.remark
      },
    ]   

    this.getTaxInvoiceDetailById(this.data)
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
      poBillable : dataForm['billableAmount'] || ''


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
    }
    
  }

}

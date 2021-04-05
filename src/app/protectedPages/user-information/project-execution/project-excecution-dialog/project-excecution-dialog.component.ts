import { Component, Inject, OnInit, Optional, EventEmitter } from '@angular/core';
import { Validators, FormBuilder, FormGroup,FormControl } from "@angular/forms";
import {LabelsService} from '../../../../services/labels.service';
import { MatDialog, MatDialogRef ,MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ToasterService} from '@services/toaster.service';
import { UtilService } from '@services/util.service';
import { Router,ActivatedRoute } from '@angular/router'
import { InvoiceService } from '@services/invoice.service';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';

import { UtilityService } from '@services/utility.service';
import { PreviewPopupComponent } from 'src/app/shared/preview-popup/preview-popup.component';


@Component({
  selector: 'app-project-excecution-dialog',
  templateUrl: './project-excecution-dialog.component.html',
  styleUrls: ['./project-excecution-dialog.component.scss']
})
export class ProjectExcecutionDialogComponent implements OnInit {

  ProjectExcecutionForm :  FormGroup ;
  isDirty: boolean;
  labels :  any;
  buttonName : any = 'Edit';
  enableflag :boolean = true;
  showDeleteModal: boolean;

  previewDocumentId : string = '';

  host  = environment.host;
  newAppiyoDrive  = environment.previewDocappiyoDrive;
  previewUrl : string = ''

  docAvailFlag : boolean;

  PEFormData : any;


  modeOfPaymentList = [];
  lovData : any;

  departmentListData = [
    {key:0,value:'Department of Sainik Welfare'},
    {key:1,value:'Ministry of Minority Affairs'},
    {key:2,value:'Visakhapatnam Port Trust'},
    {key:3,value:'Ministry of Tribal Affairs'},
    {key:4,value:'Bureau of Naviks.Mumbai'}
];

  piPaidValues = [];

  showUploadModal: boolean;

  imageUrl: string;
  fileSize: string = 'Size - 109.4 KB';
  fileName: string = 'invoice.pdf';;
  fileType: string;

  showPdfModal:boolean;
  remarkModal:boolean;
  showUpdate: boolean;

  selectedPEId: string;

  showDataSaveModal: boolean;

  dataValue: {
    title: string;
    message: string
  }

  storeProjectNo: string;

  viewInfoData: any;

  showEdit: boolean;
  isWrite = true;
  onFileUpload = new EventEmitter();
  updateFileID = new EventEmitter();
  onProjectExecutionUpdate = new EventEmitter();
  
  accountName : string;

  constructor(
    private labelsService : LabelsService,
    private toasterService: ToasterService,
    private dialogRef : MatDialogRef<ProjectExcecutionDialogComponent> ,
    private formBuilder :  FormBuilder,
    private utilService: UtilService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private invoiceService : InvoiceService,
    private utilityService: UtilityService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: string,
    private dialog : MatDialog
    ) { 
  }

  ngOnInit() {
    this.modeOfPaymentList = this.lovData? this.lovData.paymentModeStatusList: null;
    this.piPaidValues = this.lovData? this.lovData.piPaidStatusList: null;
    const smsPage = this.utilityService.getSettingsDataList('ProjectExecution');
    this.isWrite = smsPage.isWrite;

    this.labelsService.getLabelsData().subscribe((value) => {
      this.labels = value;
    })

    this.activatedRoute.params.subscribe((value)=> {

      this.storeProjectNo = value.projectNo || 4535;
    })

    this.utilService.userDetails$.subscribe((val)=> {

      this.accountName = val ? val['App_name'] :'';
    })

    this.patchLov();

    this.getProjectExecutionDetailById(this.data)

  }

  patchLov(){
    this.lovData = this.utilService.getLovData();
    this.modeOfPaymentList = this.lovData? this.lovData.paymentModeStatusList : null;
    this.piPaidValues = this.lovData? this.lovData.piPaidStatusList : null;
}


  getProjectExecutionDetailById(currentPEId : string){

    this.invoiceService.getProjectExecutionDetailbyId(Number(currentPEId)).subscribe(
      (response: any) => {
      const { 
        ProcessVariables  : { error : {
          code,
          message
        }}
      } = response;
      if(code == '0'){
        const data  = response["ProcessVariables"];
        this.selectedPEId = response["ProcessVariables"]["id"] ? response["ProcessVariables"]["id"] : ""; 
        this.setPreviewData(data);
        this.PEFormData = data;
        if(response.ProcessVariables.upload_document){
          this.previewDocumentId = response.ProcessVariables.upload_document;
          this.updatePreviewId(this.previewDocumentId);
          this.docAvailFlag = true;
        }
      }else{
        this.toasterService.showError(message,'')
      }
    },(error) => {
      console.log(error)
      this.toasterService.showError(error,'')
    })

  }

  updatePreviewId(docId : string){
    if(docId){
    this.updateFileID.emit(docId)
    }
  }

  uploadFile(event) {
    this.onFileUpload.emit(event);
  }


  setPreviewData(data){

    if(data){

      const psData = this.modeOfPaymentList.filter((val) =>{
          return val.key == data.paymentMode
      })

      const piPaid = this.piPaidValues.filter((val) =>{
          return val.key == data.paidPI
      })

      this.viewInfoData = [
        {
          key: this.labels.userName,
          value: (data ?  data.userName : '')
        },
        {
          key: this.labels.proformaIN,
          value: (data ? data.proformaInvoiceNumber : '')
        },
        {
          key: 'Proforma Invoice Date',
          value: (data ? data.proformaInvoiceDate : '')
        },
        {
          key: this.labels.piAmount,
          value: (data ? data.amount : '')
        },
        {
          key: this.labels.modeOfPayment,
          value:  ((psData && psData.length != 0) ?   psData[0].value :  '')
        },
        {
          key: this.labels.documentNo,
          value: (data ? data.documentNumber : '')
        },
        {
          key: 'Date of Transaction',
          value:  (data ? data.transactionDate : '')
        },
        {
          key: this.labels.bankName,
          value: (data ? data.branchName : '')
        },
        {
          key: this.labels.amountReceived,
          value: (data ? data.receivedAmount : '')
        },
        {
          key: this.labels.tds,
          value: (data ? data.tds : '')
        },
        {
          key: this.labels.nicsiProjectNumber,
          value: (data ? data.nicsiProjectNumber : '')
        },
        {
          key: 'PI Paid',
          value: ((piPaid && piPaid.length != 0) ? piPaid[0].value : '')
        },
        {
          key: this.labels.remark,
          value: (data ? data.remark : '')
        },
        {
          isButton: true,
          key: 'View PDF',
          value: data.upload_document
        }
  
      ]
    }

  }

  OnEdit() {
    this.enableflag = false;
    this.showUpdate = true;
    this.showEdit = true;
  }

  // OnUpdate(form ?: any){
    // const feildControls = this.ProjectExcecutionForm.controls;
    // const userName  = feildControls.userName.value;
    // const proformaInvoiceNumber  = feildControls.piNumber .value;
    // const amount = feildControls.piAmount.value;
    // const paymentMode = feildControls.modeOfPayment.value;
    // const documentNumber = feildControls.documentNo.value;
    // const branchName = feildControls.bankName.value;
    // const receivedAmount = feildControls.amountReceived.value;
    // const tds = feildControls.tds.value;
    // const nicsiProjectNumber = feildControls.NICSIProjectNo.value;
    // const invoiceDate = feildControls.invoiceDate.value;
    // const transactionDate = feildControls.transactionDate.value;
    // const paidPI = feildControls.piPaid.value;
    // const remark = feildControls.remark.value;

    // const formattedInvoiceDate = this.datePipe.transform(invoiceDate,'dd/MM/yyyy');
    // const formattedDateOfTransaction = this.datePipe.transform(transactionDate,'dd/MM/yyyy');

    // const Data = {
    //   id  : Number(this.selectedPEId),  //UPDATE ID
    //   userName,
    //   proformaInvoiceNumber,
    //   proformaInvoiceDate  : formattedInvoiceDate,
    //   amount,
    //   paymentMode,
    //   documentNumber,
    //   transactionDate : formattedDateOfTransaction,
    //   branchName,
    //   receivedAmount,
    //   tds,
    //   nicsiProjectNumber,
    //   paidPI,
    //   remark,
    //   uploadDocument : "file",
    // };


    // this.invoiceService.updateProjectExecutionDetail(Data).subscribe(
    //   (response: any) =>{
    //     const { 
    //       ProcessVariables  : { error : {
    //         code,
    //         message
    //       }}
    //     } = response;

    //     if(code == "0"){
    //       this.toasterService.showSuccess('Project Execution Details Updated Successfully','');
    //       this.ProjectExcecutionForm.reset();
    //       this.selectedPEId = "";
    //       this.isDirty = false;
    //       this.showDataSaveModal;
    //       this.showDataSaveModal = true;
    //       this.dataValue= {
    //        title: 'Project Execution Saved Successfully',
    //        message: 'Are you sure you want to proceed purchase order page?'
    //         }
    //     }else{
    //       this.toasterService.showError(message,'');
    //     }
        
    // },(error) =>{
    //     this.toasterService.showError(error,'');
    // })
// }


saveYes()
{
this.showDataSaveModal = false;
this.closeDialog()
this.next()
}

next() {
  this.utilService.setCurrentUrl('users/purchaseOrder')
  this.router.navigate([`/users/purchaseOrder/${this.storeProjectNo}`])
}

saveCancel() {

this.showDataSaveModal = false;
this.closeDialog()

}



  closeDialog(value ? : string){
    this.dialogRef.close(value);
  }

  // viewDoc() {
  //   this.showUploadModal = true;
  // }

  download(){
  
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
    this.previewUrl = `${this.host}${this.newAppiyoDrive}${this.previewDocumentId}`;
    const dialogRef  = this.dialog.open(PreviewPopupComponent,{
      data : this.previewUrl
    })

  }

  detectDateKeyAction(event,type) {

    console.log(event)
    
    if(type == 'invoiceDate') {

      this.ProjectExcecutionForm.patchValue({
        invoiceDate: ''
      })
      this.toasterService.showError('Please click the PI date icon to select date','');
    }else if(type == 'transactionDate') {

      this.ProjectExcecutionForm.patchValue({
        transactionDate: ''
      })
      this.toasterService.showError('Please click the date of transaction icon to select date','');
    }
    
  }

}

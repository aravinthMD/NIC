import { Component, Inject, OnInit, Optional, EventEmitter } from '@angular/core';
import { Validators, FormBuilder, FormGroup,FormControl } from "@angular/forms";
import {LabelsService} from '../../../../services/labels.service';
import { MatDialogRef ,MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ToasterService} from '@services/toaster.service';
import { UtilService } from '@services/util.service';
import { Router,ActivatedRoute } from '@angular/router'
import { InvoiceService } from '@services/invoice.service';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';

import { UtilityService } from '@services/utility.service';


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

  docAvailFlag : boolean


  modeOfPaymentList = [
    {key : 0 ,value : 'DD'},
    {key : 1 ,value : "Cheque"},
    {key : 2 , value : "RTGS"},
    {key : 3 ,value : "IMPS"}
  ]

  departmentListData = [
    {key:0,value:'Department of Sainik Welfare'},
    {key:1,value:'Ministry of Minority Affairs'},
    {key:2,value:'Visakhapatnam Port Trust'},
    {key:3,value:'Ministry of Tribal Affairs'},
    {key:4,value:'Bureau of Naviks.Mumbai'}
];

  piPaidValues = [
    {
    key: 0, 
    value: 'Full Payment'
  },
  {
    key: 1, 
    value: 'Partial Payment'
  }];

  showUploadModal: boolean;

  imageUrl: string;
  fileSize: string = 'Size - 109.4 KB';
  fileName: string = 'invoice.pdf';;
  fileType: string;

  showPdfModal:boolean;
  remarkModal:boolean;
  detectAuditTrialObj:any;
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
  lovData: any;

  constructor(
    private labelsService : LabelsService,
    private toasterService: ToasterService,
    private dialogRef : MatDialogRef<ProjectExcecutionDialogComponent> ,
    private formBuilder :  FormBuilder,
    private utilService: UtilService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private invoiceService : InvoiceService,
    private datePipe:DatePipe,
    private utilityService: UtilityService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: string,
    ) { 
  this.lovData = this.utilService.getLovData();

    this.InitForm();
    this.detectAuditTrialObj=this.ProjectExcecutionForm.value

  }

  InitForm(){
    this.ProjectExcecutionForm = this.formBuilder.group({
      userName : [''],
      piNumber : [''],
      piDate : new Date(),
      piAmount : [''],
      modeOfPayment : [''],
      documentNo : [''],
      dateOfTransaction : new Date(),
      bankName : [''],
      amountReceived : [''],
      tds : [''],
      NICSIProjectNo: [''],
      invoiceDate : new Date(),
      transactionDate : new Date(),
      piPaid : [''],
      remark:['',Validators.required]
    })
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

    this.getProjectExecutionDetailById(this.data)

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
        this.setFormValues(data);
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


  setFormValues(data){

    if(data){

      this.ProjectExcecutionForm.patchValue({
        userName : data.userName || '',
        piNumber : data.proformaInvoiceNumber || '',
        piAmount : data.amount || '',
        modeOfPayment : data.paymentMode || '',
        documentNo : data.documentNumber || '',
        bankName : data.branchName || '',
        amountReceived : data.receivedAmount || '',
        tds : data.tds || '',
        NICSIProjectNo: data.nicsiProjectNumber || '',
        invoiceDate : data.proformaInvoiceDate ? new Date(this.changeDateFormat(data.proformaInvoiceDate)) : '',
        transactionDate : data.transactionDate ? new Date(this.changeDateFormat(data.transactionDate)) : '',
        piPaid : data.paidPI || '',
        remark :  data.remark || ''

      })

      const psData = this.modeOfPaymentList.filter((val) =>{
          return val.key == this.ProjectExcecutionForm.controls['modeOfPayment'].value
      })

      const piPaid = this.piPaidValues.filter((val) =>{
          return val.key == this.ProjectExcecutionForm.controls['piPaid'].value
      })

      
      this.viewInfoData = [
        {
          key: this.labels.userName,
          value:this.ProjectExcecutionForm.controls['userName'].value
        },
        {
          key: this.labels.proformaIN,
          value:this.ProjectExcecutionForm.controls['piNumber'].value
        },
        {
          key: 'Proforma Invoice Date',
          value: data.proformaInvoiceDate
        },
        {
          key: this.labels.piAmount,
          value:this.ProjectExcecutionForm.controls['piAmount'].value
        },
        {
          key: this.labels.modeOfPayment,
          value:  psData.length >0 ?psData[0].value :''
        },
        {
          key: this.labels.documentNo,
          value:this.ProjectExcecutionForm.controls['documentNo'].value
        },
        {
          key: 'Date of Transaction',
          value:  data.transactionDate
        },
        {
          key: this.labels.bankName,
          value:this.ProjectExcecutionForm.controls['bankName'].value
        },
        {
          key: this.labels.amountReceived,
          value:this.ProjectExcecutionForm.controls['amountReceived'].value
        },
        {
          key: this.labels.tds,
          value:this.ProjectExcecutionForm.controls['tds'].value
        },
        {
          key: this.labels.nicsiProjectNumber,
          value:this.ProjectExcecutionForm.controls['NICSIProjectNo'].value
        },
        {
          key: 'PI Paid',
          value: piPaid.length >0? piPaid[0].value : ''
        },
        {
          key: this.labels.remark,
          value:this.ProjectExcecutionForm.controls['remark'].value
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

  OnUpdate(){
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

    const formValue =  this.ProjectExcecutionForm.value;

    const data = {
        ...formValue,
        id  : Number(this.selectedPEId)
    };


    this.onProjectExecutionUpdate.emit(data);

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
}

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



  closeDialog(){
    this.dialogRef.close({ event : 'close' ,data : 'returnvalue'});
  }

  // viewDoc() {
  //   this.showUploadModal = true;
  // }

  download(){
  
  }
  
  detectFormChanges() {

    let iRemark = false;

    const formObject = this.ProjectExcecutionForm.value;

    const keyArr = Object.keys(formObject);

    const index = keyArr.findIndex((val)=> {
      return val == 'remark'
    })
    
    keyArr.splice(index,1)

    const found = keyArr.find((element) => {
              return formObject[element] != this.ProjectExcecutionForm[element]
        
    });


    if(found && formObject['remark'] == this.detectAuditTrialObj['remark']){
      iRemark = true;
    // this.toasterService.showError('Please enter the remark','')
    this.remarkModal = true;
    this.ProjectExcecutionForm.patchValue({
      remark: ''
    })
    
    }else {

      // if(!found && !iRemark) {

      //   this.form.patchValue({
      //     remark: this.detectAuditTrialObj.remark
      //   })
      // }

      this.detectAuditTrialObj = this.ProjectExcecutionForm.value;
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
    // this.showUploadModal = false;
    this.showPdfModal = true;
    this.previewUrl = `${this.host}${this.newAppiyoDrive}${this.previewDocumentId}`

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

  changeDateFormat(date) {

    const splitDate = date.split('/');

    return `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}`

   }


}

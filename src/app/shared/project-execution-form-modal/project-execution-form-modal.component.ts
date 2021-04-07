import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ClientDetailsService } from '@services/client-details.service';
import { InvoiceService } from '@services/invoice.service';
import { LabelsService } from '@services/labels.service';
import { ToasterService } from '@services/toaster.service';
import { UtilService } from '@services/util.service';
import { UtilityService } from '@services/utility.service';
import { environment } from 'src/environments/environment';
import { PreviewPopupComponent } from '../preview-popup/preview-popup.component';

@Component({
  selector: 'project-execution-form',
  templateUrl: './project-execution-form-modal.component.html',
  styleUrls: ['./project-execution-form-modal.component.scss']
})
export class ProjectExecutionFormModalComponent implements OnInit,OnChanges {


  PEForm : FormGroup ;
  isDirty : boolean;
  enableflag  = true;
  lovData : any;
  modeOfPaymentList = [];
  docAvailFlag : boolean;
  labels : any;
  piPaidValues = [];
  proformaInvoicesList = [];
  clientId = '';
  documentUploadId = '';
  file : any;
  uploadedData : any = {};
  previewUrl : any;
  host  = environment.host;
  AppiyoDrive = environment.previewDocappiyoDrive;
  dropDownSettings : any = {}

  @Input() formData : any;
  @Input() btnText  = '';
  @Input() accountName = '';

  @Output() submitForm = new EventEmitter();

  

  constructor(
    private formBuilder : FormBuilder,
    private utilService: UtilService,
    private labelsService : LabelsService,
    private toasterService : ToasterService,
    private clientDetailService : ClientDetailsService,
    private invoiceService : InvoiceService,
    private datePipe : DatePipe,
    private dialog  : MatDialog,
    ) {
      this.clientId = this.clientDetailService.getClientId();
      this.dropDownSettings = this.utilService.getDropDownSetting();
      this.patchLov();
      this.InitForm();
      this.getLabel();
   }

  ngOnInit() {
    this.getPIAutoPopulate(this.clientId);
  }

  ngOnChanges(){

    if(this.formData){
      this.setForm(this.formData);
    }
    this.PEForm.controls['userName'].setValue(this.accountName);
  }

  patchLov(){
      this.lovData = this.utilService.getLovData();
      this.modeOfPaymentList = this.lovData? this.lovData.paymentModeStatusList : null;
      this.piPaidValues = this.lovData? this.lovData.piPaidStatusList : null;
  }

  getLabel(){
    this.labelsService.getLabelsData().subscribe((value : any) => {
        this.labels = value;
    })
  }


  InitForm(){
    this.PEForm = this.formBuilder.group({

        userName : [''],
        piNumber : ['',Validators.required],
        piDate : [''],
        piAmount : [''],
        modeOfPayment : [""],
        documentNo : [''],
        dateOfTransaction : [''],
        bankName : [''],
        amountReceived : [''],
        tds : [''],
        NICSIProjectNo: [''],
        invoiceDate : [''],
        transactionDate : [''],
        piPaid : [''],
        remark:['',Validators.required],
        importFile : [null],
        id : [null]

    })
  }
  

  setForm(data){

    if(data){

      const selectedPiNumber : any[] = [
            { id : data && data['proformaInvoiceNumber'] ? data['proformaInvoiceNumber'] : "",
              name : data && data['proformaInvoiceNumber'] ? data['proformaInvoiceNumber'] : ""}
            ];

      this.PEForm.patchValue({
        userName : data ?  data.userName : '',
        piNumber : selectedPiNumber ? selectedPiNumber : [],
        piAmount : data ? data.amount : '',
        modeOfPayment : data ? data.paymentMode : '',
        documentNo : data ? data.documentNumber : '',
        bankName : data ? data.branchName : '',
        amountReceived : data ? data.receivedAmount : '',
        tds : data ? data.tds : '',
        NICSIProjectNo: data  ? data.nicsiProjectNumber : '',
        invoiceDate : data.proformaInvoiceDate ? new Date(this.utilService.changeDateFormat(data.proformaInvoiceDate)) : '',
        transactionDate : data.transactionDate ? new Date(this.utilService.changeDateFormat(data.transactionDate)) : '',
        piPaid : data  ? data.paidPI : '',
        remark :  data ? data.remark : '',
        id : data ? data.id : null,
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

  displayFn(value)
  {
    if(!value)
      return
    this.getPIAutoPopulateonChange(value);
    return value;
  }

  onItemSelect(value){
    if(!(value && value.name))
      return
    this.getPIAutoPopulateonChange(value.name);
  }

  getPIAutoPopulateonChange(piNumber : any){
    this.invoiceService.getProformaInvoiceOnChangeData(Number(piNumber)).subscribe(
      (response) =>{

        const date = response['ProcessVariables']['date'];
        const amount = response['ProcessVariables']['piAmount'];
        this.PEForm.controls['invoiceDate'].setValue(date ? new Date(this.utilService.changeDateFormat(date)) : null);
        this.PEForm.controls['piAmount'].setValue(amount || '')
      },(error) =>{
        console.log(`Failed to fetch data`);
        this.toasterService.showError('Failed to Fetch Data','');
      })
}

  saveForm(){

    if(this.PEForm.invalid){
      this.isDirty = true;
      return
    }

    const feildControls = this.PEForm.controls;

      const userName = feildControls.userName.value;
      const piNumber = feildControls.piNumber.value;
      const piAmount = feildControls.piAmount.value;
      const modeOfPayment = feildControls.modeOfPayment.value;
      const documentNo = feildControls.documentNo.value;
      const bankName = feildControls.bankName.value;
      const amountReceived = feildControls.amountReceived.value;
      const tds = feildControls.tds.value;
      const NICSIProjectNo = feildControls.NICSIProjectNo.value;
      const invoiceDate = feildControls.invoiceDate.value;
      const transactionDate = feildControls.transactionDate.value;
      const piPaid = feildControls.piPaid.value;
      const remark = feildControls.remark.value;
      const id = feildControls.id.value ? Number(feildControls.id.value) : null;

      const formattedProformaInvoiceDate = this.datePipe.transform(
        invoiceDate,
        "dd/MM/yyyy"
      );
      const formattedDateOfTransaction = this.datePipe.transform(
        transactionDate,
        "dd/MM/yyyy"
      );

      const Data: any = {
        userName,
        piNumber,
        piDate: formattedProformaInvoiceDate,
        piAmount,
        modeOfPayment,
        documentNo,
        dateOfTransaction: formattedDateOfTransaction,
        bankName,
        amountReceived,
        tds,
        NICSIProjectNo,
        piPaid,
        remark,
        upload_document: this.documentUploadId,
        userId: this.clientId ? Number(this.clientId) : 0,
        id
      };

      const piNumberConverted = piNumber && piNumber.length != 0 ? piNumber : [];
      Data.piNumber = piNumberConverted.map(val => val.name ? val.name : "").toString();

      this.invoiceService.createProjectExecution(Data).subscribe(
        (res : any) => {
          const {
            ProcessVariables: {
              error: { code, message },
            },
          } = res;

          if(code == "0"){
            this.PEForm.reset();
            this.PEForm.controls["modeOfPayment"].setValue("");
            this.PEForm.controls["piPaid"].setValue("");
            this.PEForm.controls["userName"].setValue(this.accountName);
            this.PEForm.controls["piAmount"].setValue("");
            this.PEForm.controls["piDate"].setValue(null);
            this.documentUploadId = "";
            this.isDirty = false;
            
            this.toasterService.showSuccess("Data Saved Successfully",'');
            this.submitForm.emit('success');
          }else {
            this.toasterService.showError(message,"");
          }
      },
      (error) => {
        this.toasterService.showError(error,"");
      })

  }

  async uploadFile(file : FileList){
      this.uploadedData = await this.utilService.uploadToAppiyoDrive(file);
      if(this.uploadedData['uploadStatus'])
        this.documentUploadId = this.uploadedData['documentUploadId'];
  }

  preview(){
    this.previewUrl = `${this.host}${this.AppiyoDrive}${this.documentUploadId}`;
    const dialogRef  = this.dialog.open(PreviewPopupComponent,{
      data : this.previewUrl,
      width: '800px',
      height : '560px'
          });
  }

  detectDateKeyAction(event,type) {
    console.log(event)
    if(type == 'invoiceDate') {
      this.PEForm.patchValue({
        invoiceDate: ''
      })
      this.toasterService.showError('Please click the PI date icon to select date','');
    }else if(type == 'transactionDate') {
      this.PEForm.patchValue({
        transactionDate: ''
      })
      this.toasterService.showError('Please click the date of transaction icon to select date','');
    }
  }

  // uploadFile(event){
  //   this.fileUpload.emit(event);
  // }

}

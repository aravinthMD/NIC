import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientDetailsService } from '@services/client-details.service';
import { InvoiceService } from '@services/invoice.service';
import { LabelsService } from '@services/labels.service';
import { ToasterService } from '@services/toaster.service';
import { UtilService } from '@services/util.service';
import { UtilityService } from '@services/utility.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-shared-profoma-invoice',
  templateUrl: './shared-profoma-invoice.component.html',
  styleUrls: ['./shared-profoma-invoice.component.scss']
 
})
export class SharedProfomaInvoiceComponent implements OnInit {

  profomaInvoiceForm: FormGroup;
  labels: any;
  piStatusData;
  paymentStatusData: any;
  enableflag :boolean = false;
  customerData: any;
  refernceNumberList: Array<any>;
  referencedropdownSettings:any;
  file: any;
  uploadedData : any = {}
  documentUploadId : string = ''
  previewDocumentId : string = null;
  docAvailFlag: boolean;
  host  = environment.host;
  newAppiyoDrive  = environment.previewDocappiyoDrive;
  showPdfModal: boolean;
  previewUrl: string;
@Input() proformaInvoiceId: string;
@Input() isBackRequire: boolean;
@Input() isNextRequire: boolean;
@Input() accountName: string;
@Output() externEmit = new EventEmitter <boolean>();
@Output() callGetAll = new EventEmitter();
// onFileUpload= new EventEmitter();
isDirty: boolean = false;
  constructor(private formBuilder: FormBuilder,
              private labelsService: LabelsService,
              private utilService: UtilService,
              private invoiceService: InvoiceService,
              private toasterService: ToasterService,
              private utilityService: UtilityService,
              private datePipe: DatePipe,
              private clientDetailService: ClientDetailsService,
              private router: Router) { 
    this.labelsService.getLabelsData().subscribe((values)=> {
      this.labels = values;
    });
    const resolveData = this.utilService.getLovData();
      this.piStatusData = resolveData['piStatus'];
      this.paymentStatusData = resolveData['paymentStatusList'];
    this.customerData = this.utilService.getCustomerDetails();
    console.log('customer Data',this.customerData)
  }

  ngOnInit() {   
   
    this.initForm();
    this.referenceNumberLOV(Number(this.customerData.currentCustomerId));
    if (this.proformaInvoiceId){
      this.getProformaInvoiceByID(this.proformaInvoiceId);
    }
  }

  initForm(){
    this.profomaInvoiceForm =this.formBuilder.group({    
      accountName: {value:this.accountName, disabled: true},
      invoiceNumber : [''],
      refNumber: [''],
      piTraffic: [''],
      piOwner: [''],
      date: [null],
      nicsiManager: [''],
      piAmount: [''],
      startDate:[null],
      endDate:[null],
      piStatus: [''],
      paymentStatus:[''],
      remark:['',Validators.required]
    })
  }


  async referenceNumberLOV(clientId: number){
    this.referencedropdownSettings = {
      allowSearchFilter: true,
      enableCheckAll : true,
      clearSearchFilter : true,
      itemsShowLimit:2,
      idField: 'key',
      textField: 'value',
      singleSelection: true
    }
    if(clientId){
      this.invoiceService.getReferenceNumber(clientId).subscribe(
        resp => {
        console.log('get Referece Number',resp)
        if(resp['Error'] == 0 && resp['ProcessVariables']['error']['code']==0) {
          this.refernceNumberList = resp['ProcessVariables']['referenceNumberList'];
          this.refernceNumberList = this.refernceNumberList?this.refernceNumberList.filter(val => val.key != null): null;
        }else {
          this.toasterService.showError(resp['ProcessVariables']['error']['message'],'');
        }
        
      }
      )
    }
  }

  detectDateKeyAction(event,type) {

    console.log(event)    
    if(type == 'date') {
      this.profomaInvoiceForm.patchValue({
        date: ''
      })
      this.toasterService.showError('Please click the date icon to select date','');
    }else if(type == 'startDate') {
      this.profomaInvoiceForm.patchValue({
        startDate: ''
      })
      this.toasterService.showError('Please click the start date icon to select date','');
    }else if(type == 'endDate') {
      this.profomaInvoiceForm.patchValue({
        endDate: ''
      })
      this.toasterService.showError('Please click the end date icon to select date','');
    }
    
  }
  async getProformaInvoiceByID(proformaInvoiceId){
    this.invoiceService.getProformaInvoiceDetailById(proformaInvoiceId).subscribe(
      response =>{
      if(response['Error'] == 0 && response['ProcessVariables']['error']['code']==0) {
        if(response['ProcessVariables'].upload_document){
          this.previewDocumentId = response['ProcessVariables'].upload_document;
          this.docAvailFlag = true;
       }
        this.patchFormValues(response['ProcessVariables']);
      console.log('shared response',response)
      }else {
        this.toasterService.showError(response['ProcessVariables']['error']['message'],'');
      }
    }
    )

  }

  patchFormValues(data){

    const refNumerSelected: Array<any> = [{key:data['referenceNumber'],value: data['referenceNumber']}]
    
    // this.refernceNumberList.filter(val =>val.key == data['referenceNumber']);
    this.profomaInvoiceForm.patchValue({
      accountName : data['AccountName'] || this.accountName ,
      invoiceNumber : data['piNumber'] || '',
      refNumber : refNumerSelected || [],
      piTraffic  : data['traffic'] || '',
      piOwner : data['owner'] || '',
      date  : data['date'] ? new Date(`${this.utilityService.changeDateFormat(data['date'])}`) : '',
      nicsiManager  : data['nicsiManager'] || '',
      piAmount  : data['piAmount'] || '',
      startDate : data['startDate'] ? new Date(`${this.utilityService.changeDateFormat(data['startDate'])}`) : '',
      endDate : data['endDate'] ? new Date(`${this.utilityService.changeDateFormat(data['endDate'])}`) : '',
      piStatus : String(data['piStatus']) || '',
      paymentStatus : String(data['paymentStatus']) || '',
      remark : data['remark'] || ''

    })
  }


  saveUpdate(data?){
    let value: any = {};
    if (data) {
      value = data;
    } else {
     if (this.profomaInvoiceForm.invalid) {
       this.isDirty = true;
       return;
     }
    const feildControls = this.profomaInvoiceForm.controls;
    const AccountName = feildControls.accountName.value;
    const piNumber = feildControls.invoiceNumber.value;
    const referenceNumber = feildControls.refNumber.value;
    const traffic = feildControls.piTraffic.value;
    const owner = feildControls.piOwner.value;
    const date = feildControls.date.value;
    const nicsiManager = feildControls.nicsiManager.value;
    const piAmount = feildControls.piAmount.value;
    const startDate = feildControls.startDate.value;
    const endDate = feildControls.endDate.value;
    const piStatus = feildControls.piStatus.value;
    const paymentStatus = feildControls.paymentStatus.value;
    const remark = feildControls.remark.value;
    const formattedInvoiceDate = this.datePipe.transform(date,'dd/MM/yyyy');
    const formattedStartDate = this.datePipe.transform(startDate,'dd/MM/yyyy');
    const formattedEndDate = this.datePipe.transform(endDate,'dd/MM/yyyy');
    const userId = this.clientDetailService.getClientId();

    value =  {
      AccountName,
      piNumber,
      referenceNumber,
      traffic,
      owner,
      date : formattedInvoiceDate,
      nicsiManager,
      piAmount,
      startDate : formattedStartDate ,
      endDate : formattedEndDate ,
      piStatus : Number(piStatus),
      paymentStatus : Number(paymentStatus),
      remark,
      uploadDocument : "file",
      id : Number(this.proformaInvoiceId || 0),
      userId : Number(userId)
    }   
    const referenceArrya = referenceNumber || [];
    value.referenceNumber = referenceArrya.map(val => val.key).toString();
    value.upload_document = this.documentUploadId;

     
     

     this.invoiceService.createProformaInvoice(value).subscribe(
       (response: any) => {
         const { 
           ProcessVariables  : { error : {
             code,
             message
           }}
         } = response;
         console.log(`API response for the Create PI :${response}`)
         if(code == '0'){
          
          
           setTimeout(() => {             
            //  this.profomaInvoiceForm.get('accountName').setValue(this.accountName);
           })
           
           this.toasterService.showSuccess('Proforma Invoice Saved Sucessfully',''); 
           this.isDirty = false;      
           this.externEmit.emit(false); 
           
          //  this.dataValue = {
          //      title : 'Proforma Invoice Saved Successfully',               
          //  }
          if(value.id ==0){
            this.profomaInvoiceForm.reset();
            this.documentUploadId = '';        
            this.profomaInvoiceForm.controls['piStatus'].setValue("");
            this.profomaInvoiceForm.controls['paymentStatus'].setValue("");
            this.profomaInvoiceForm.controls['startDate'].setValue("");
            this.profomaInvoiceForm.controls['refNumber'].setValue("");
            this.callGetAll.emit();
            // this.fetchAllProformaInvoice(this.currentPage,this.userId)
          }
          //  ;
         }else {
           this.toasterService.showError(message,'');
         }
     },
     (error) => {
       console.log(`API error response for the create Pi ${error}`)
         this.toasterService.showError(error,'')
     })


  }
}

// uploadFile(event) {
//   this.onFileUpload.emit(event);
// }

async uploadFile(file : FileList){ 
  this.uploadedData = await this.utilService.uploadToAppiyoDrive(file);
  if(this.uploadedData['uploadStatus'])
    this.documentUploadId = this.uploadedData['documentUploadId'];
  }

showPDF() {
  this.showPdfModal = true;
 
 this.previewUrl = `${this.host}${this.newAppiyoDrive}${this.previewDocumentId}`

  // window.open(viewUrl,"_blank")
}
  
next() {

  // this.utilService.setCurrentUrl('users/projectExecution')

  this.router.navigate([`/users/projectExecution/${this.customerData.currentCustomerId}`])

}

back() {

  this.utilService.setCurrentUrl('users/smsCredit')

  this.router.navigate([`/users/smsCredit/${this.customerData.currentCustomerId}`])

}
}

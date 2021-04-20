import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ClientDetailsService } from '@services/client-details.service';
import { CustomDateAdapter } from '@services/custom-date-adapter.service';
import { InvoiceService } from '@services/invoice.service';
import { POService } from '@services/po-service';
import { ToasterService } from '@services/toaster.service';
import { UtilService } from '@services/util.service';
import { environment } from 'src/environments/environment';
import label from '../../../assets/labels/labels.json';
import { PreviewPopupComponent } from '../preview-popup/preview-popup.component';


@Component({
  selector: 'purchase-order-form-modal',
  templateUrl: './purchase-order-form-modal.component.html',
  styleUrls: ['./purchase-order-form-modal.component.scss']
})
export class PurchaseOrderFormModalComponent implements OnInit,OnChanges {


  POForm : FormGroup;
  labels : any = label;

  isDirty: boolean;
  poStatus = [];
  paymentStatus = [];
  proformaInvoicesList = [];
  clientId : string;
  dropDownSettings : any = {};
  departmentListData = [];
  docAvailFlag : boolean;
  documentUploadId : string;
  host  = environment.host;
  AppiyoDrive = environment.previewDocappiyoDrive;

  @Input() btnText : string;
  @Input() accountName : string;
  @Input() formData : any;

  @Output() saveFormData = new EventEmitter<any>();
  @Output() fileUpload = new EventEmitter<any>();

  set userName(value){
    this.POForm.controls['userName'].setValue(value);
}

  constructor(private utilService : UtilService,
              private invoiceService : InvoiceService,
              private clientDetailsService : ClientDetailsService,
              private toasterService : ToasterService,
              private poService : POService,
              private CustomDateAdapter : CustomDateAdapter,
              private dialog  : MatDialog,
              ) { 
        this.dropDownSettings = this.utilService.getDropDownSetting();
        this.patchLovValues();
        this.initForm();
              }

  ngOnInit() {
    this.clientId = this.clientDetailsService.getClientId();
    this.getPIAutoPopulate(this.clientId);

    this.poService.resetForm.subscribe((val) =>{
        if(val){
          this.resetForm();
        }
    })
  }

  ngOnChanges(){
    if(this.formData){
      this.setForm(this.formData);
    }
    this.userName = this.accountName;
  }

  initForm(){
    this.POForm = new FormGroup({
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
      remark: new FormControl('',Validators.required),
      id : new FormControl(null)
    })
  }

  patchLovValues(){
    const data =  this.utilService.getLovData();
    this.poStatus = data.poStatusList || [];
    this.paymentStatus = data.paymentStatusList || [];
    this.departmentListData = data.departmentList || [];
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

  getPIAutoPopulateonChange(piNumber: any) {
    this.invoiceService.getProformaInvoiceOnChangeData(piNumber).subscribe(
      (response: any) => {
        const processVariables = response.ProcessVariables;
        const projectNumber = processVariables.projectNumber ||  '';
        const smsApproved = processVariables.traffic || '';
        this.POForm.get('projectNo').setValue(projectNumber);
        this.POForm.get('smsApproved').setValue(smsApproved);
    });
  }

  onItemSelect(value){
    if(!(value && value.name))
      return
      this.getPIAutoPopulateonChange(value.name);
  }

  detectDateKeyAction(event, type) {

    if (type === 'date') {
      this.POForm.patchValue({
        date: ''
      });
      this.toasterService.showError('Please click the date icon to select date', '');
    } else if (type === 'startDate') {
      this.POForm.patchValue({
        startDate: ''
      });
      this.toasterService.showError('Please click the valid from icon to select date', '');
    } else if (type === 'endDate') {
      this.POForm.patchValue({
        endDate: ''
      });
      this.toasterService.showError('Please click the valid upto icon to select date', '');
    } 
  }
  
  setForm(data : any){
    if(data){
        const selectedPiNumber : any[] = [
          { id : data && data['piNumber'] ? data['piNumber'] : "" ,
          name : data && data['piNumber'] ? data['piNumber'] : ""}
        ]

        const date = data.poDate ? this.CustomDateAdapter.parseToDateObj(data.poDate) : null;
        const startDate = data.validFrom ? this.CustomDateAdapter.parseToDateObj(data.validFrom) :  null;
        const endDate = data.validTo ? this.CustomDateAdapter.parseToDateObj(data.validTo) : null

        this.POForm.patchValue({
          userName : data ? data.userName : '',
          piNumber : selectedPiNumber ? selectedPiNumber : '',
          poNumber : data ? data.poNumber : '',
          smsApproved : data ? data.smsApproved : '',
          projectName : data ? data.projectName : '',
          date : date,
          withoutTax : data ? data.withOutTax : '',
          poStatus :  data ? data.poStatus : '',
          startDate :  startDate,
          endDate :  endDate,
          userEmail : data ? data.userEmail : '',
          poManagerEmail : data ? data.managerEmail : '',
          projectNo : data ? data.projectNumber : '',
          poAmountWithTax : data ? data.amountWithTax : '',
          departmentName : data ? data.department : '',
          paymentStatus : data ? data.paymentStatus : '',
          remark :  data ? data.remark : '',
          id : data ? Number(data.id) : null
        })

        if(data && data.upload_document){
          this.docAvailFlag = true;
          this.documentUploadId = data.upload_document;
        }
    }
  }


  saveForm(){

    if(this.POForm.invalid){
      this.isDirty = true;
      return this.toasterService.showError('Please fill all the fields','');
    }

    const formValue = this.POForm.value;
    const data = {...formValue,
                  upload_document :this.documentUploadId }
    this.saveFormData.emit(data)

  }

  resetForm(){
    this.POForm.reset();
    this.isDirty = false;
    this.POForm.get('paymentStatus').setValue('');
    this.POForm.get('departmentName').setValue('');
    this.POForm.get('poStatus').setValue('');
    this.POForm.get('userName').setValue(this.accountName);
  }

  // uploadFile(event){
  //   this.fileUpload.emit(event);
  // }

  async uploadFile(file : FileList){
    let uploadedData = await this.utilService.uploadToAppiyoDrive(file);
    if(uploadedData['uploadStatus'])
      this.documentUploadId = uploadedData['documentUploadId'];
}

preview(){
  const previewUrl  = `${this.host}${this.AppiyoDrive}${this.documentUploadId}`;
  const dialogRef = this.dialog.open(PreviewPopupComponent,{
    data : previewUrl,
    width : '800px',
    height : '560px'
  })
}

}

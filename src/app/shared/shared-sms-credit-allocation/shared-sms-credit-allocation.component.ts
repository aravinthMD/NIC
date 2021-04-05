import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomDateAdapter } from '@services/custom-date-adapter.service';
import { LabelsService } from '@services/labels.service';
import { SmsCreditService } from '@services/sms-credit.service';
import { ToasterService } from '@services/toaster.service';
import { UtilService } from '@services/util.service';
import { UtilityService } from '@services/utility.service';
import { SmsCreditAllocation } from 'src/app/protectedPages/user-information/user-info/sms-credit-allocation/sms-credit.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-shared-sms-credit-allocation',
  templateUrl: './shared-sms-credit-allocation.component.html',
  styleUrls: ['./shared-sms-credit-allocation.component.scss']
})
export class SharedSmsCreditAllocationComponent implements OnInit,OnChanges {
public labels;
private customerData;
smsCreditForm: FormGroup

userId: any;
currentDate: any;
userName: string;
statusList = [];
smsQuotaMetrix = [];
resolveData;
isDisabledInp = true;
@Input() isDirty: boolean;  
@Input() formData: SmsCreditAllocation = null;
@Input() resetForm: boolean;
@Input() requireField: boolean;
@Output() saveUpdateData = new EventEmitter();
  constructor(private labelsService: LabelsService,
              private utilService: UtilService,
              private toasterService: ToasterService,
              private smsCreditService: SmsCreditService,
              private datePipe: DatePipe,
              private customDateAdapter: CustomDateAdapter,
              private utilityService: UtilityService,
              ) { 
    this.labelsService.getLabelsData().subscribe((values)=> {
      this.labels = values;
    });
     this.resolveData = this.utilService.getLovData();
     
    this.customerData = this.utilService.getCustomerDetails();
    console.log('customer Data',this.customerData)
    const userData = this.utilityService.getLoginDetail();            

    this.userName = userData.username;
  }

  ngOnInit() {
    
    this.pathLovValue();
    this.statusList = this.smsCreditService.getStatusListLov();
    this.currentDate = this.datePipe.transform(
      new Date(),
      'MMM d, y, h:mm:ss a'
    );
    if (this.formData && this.formData != null){
      this.initForm(this.formData);
      this.addFormControls();
    }else {
      this.initForm();
    }
    
    
    this.changeForm();
  }

  pathLovValue(){
    // const data =  this.activatedRoute.parent.snapshot.data || {};
    // const listOfValue = data.listOfValue || {};
    // const processVariables = this.resolveData.ProcessVariables;
    this.smsQuotaMetrix = this.resolveData.SMSApproval || [];
    this.smsCreditService.setStatusListLov(this.resolveData.smsCreditStatusList);
    this.smsCreditService.setSmsQuotaMatrix(this.smsQuotaMetrix);
  }
  initForm(data?) {
    console.log('data.status',data? data.status: 'not come');
    
    // const userName = localStorage.getItem('userName') || '';
    this.smsCreditForm = new FormGroup({
      smsApprover: new FormControl(data? data.smsApprover: ''),
      totalCredit: new FormControl(data? data.totalCredit:null),
      dateOfRequest: new FormControl(data?this.customDateAdapter.parseToDateObj(data.dateOfRequest): null),
      status: new FormControl(data? data.status: '0'),
      onApprovalOf: new FormControl(data? data.onApprovalOf:null),
      remark: new FormControl(data? data.remark:'',[Validators.required]),
      usedCredit: new FormControl(data? data.usedCredit: null),
      balanceCredit: new FormControl(data? data.balanceCredit:null),
      approvedBy: new FormControl(this.userName || null),
      timeStamp: new FormControl(this.currentDate),
    });
  }
  

  formReset(){
    this.smsCreditForm.reset();
    
    this.smsCreditForm.controls['approvedBy'].setValue(this.userName || null);
    this.smsCreditForm.controls['status'].setValue("0");
    this.smsCreditForm.controls['timeStamp'].setValue(this.currentDate);
    this.smsCreditForm.controls['smsApprover'].setValue("");
  }
  getStatusDescription(key) {
    if (!key) {
      return;
    }
    const status = this.statusList.find((val) => {
      return val.key == key;
    });
    return status.value;
  }
changeForm(){
  this.saveUpdateData.emit(this.smsCreditForm)
}
onQuotaMatrixChange(event) {
  this.smsCreditForm.get('onApprovalOf').setValue(event.value);
}
addFormControls(){
  this.smsCreditForm.addControl('balanceCredit',new FormControl({value: null, disable: true}),)
  this.smsCreditForm.addControl('usedCredit', new FormControl([null]),)
}

ngOnChanges(){
  if (this.resetForm){
    console.log('reset form');
    this.formReset();
    } 
  }

  detectDateKeyAction(event, type) {
    console.log(event);

    if (type === 'date') {
      this.smsCreditForm.patchValue({
        date: '',
      });
      this.toasterService.showError(
        'Please click the date icon to select date',
        ''
      );
    } 
  }
}

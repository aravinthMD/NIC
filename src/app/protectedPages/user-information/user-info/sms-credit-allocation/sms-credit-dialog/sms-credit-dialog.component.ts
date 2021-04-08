import { Component, OnInit, Optional, Inject, EventEmitter, OnDestroy } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DatePipe } from '@angular/common';
import { LabelsService } from '@services/labels.service';

import { ToasterService } from '@services/toaster.service';

import { UtilService } from '@services/util.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SmsCreditService } from '@services/sms-credit.service';
import { SmsCreditAllocation } from '../sms-credit.model';
import { ClientDetailsService } from '@services/client-details.service';
import { CustomDateAdapter } from '@services/custom-date-adapter.service';
import { UtilityService } from '@services/utility.service';

@Component({
  selector: 'app-sms-credit-dialog',
  templateUrl: './sms-credit-dialog.component.html',
  styleUrls: ['./sms-credit-dialog.component.scss']
})
export class SmsCreditDialogComponent implements OnInit, OnDestroy {

  smsCreditAllocation: FormGroup;

  currentDate: any;

  labels: any = {};

  propertyFlag: boolean;

  isDirty  = false;

  isDisabledInp = true;

  showDataSaveModal: boolean;

  dataValue: {
    title: string;
    message: string
  };

  showCredit : boolean;

  statusList = [];

  smsQuotaMatrix = [];

  showView = true;

  viewInfoData: any;

  clientId: string;

  edit = new EventEmitter();
  isDataUpdated: SmsCreditAllocation;
  isWrite = true;
  setFormData: any;
  saveForm: any;
  resetFormFlag: boolean;
  userName: string;
  constructor(
    private dialogRef: MatDialogRef<SmsCreditDialogComponent>,
    private datePipe: DatePipe,
    private labelsService: LabelsService,
    private toasterService: ToasterService,
    private formBuilder: FormBuilder,
    private utilService: UtilService,
    private router: Router,
    private smsCreditService: SmsCreditService,
    private clientDetailsService: ClientDetailsService,
    private customDateAdapter: CustomDateAdapter,
    private utilityService: UtilityService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {

    this.currentDate = this.datePipe.transform(new Date(), 'MMM d, y, h:mm:ss a	');
    const userData = this.utilityService.getLoginDetail();    this.userName = userData.username;
   }

  ngOnInit() {

    const smsPage = this.utilityService.getSettingsDataList('SmsCreditAllocation');
    this.isWrite = smsPage.isWrite; 

    this.smsQuotaMatrix = this.smsCreditService.getSmsQuotaMatrix();
    this.clientId = this.clientDetailsService.getClientId();

    console.log('modal data', this.data);
    this.statusList = this.smsCreditService.getStatusListLov();
    this.labelsService.getLabelsData().subscribe((values) => {
      this.labels = values;
    });
    this.initForm();
    this.viewInfoData = this.getDataForDialogModal();
    this.listenerForBalanceCredit();
  }

  listenerForBalanceCredit() {
    this.smsCreditAllocation.get('totalCredit')
         .valueChanges.subscribe((value) => {
          const usedCredit = Number(this.smsCreditAllocation.get('usedCredit').value || 0);
          const balanceCredit = Number(value) - usedCredit;
          this.smsCreditAllocation.get('balanceCredit').setValue(balanceCredit);
         });
    this.smsCreditAllocation.get('usedCredit')
        .valueChanges.subscribe((value) => {
          const totalCredit = Number(this.smsCreditAllocation.get('totalCredit').value || 0);
          const balanceCredit = totalCredit - Number(value);
          this.smsCreditAllocation.get('balanceCredit').setValue(balanceCredit);
        });
  }

  getDataForDialogModal() {
    const smsApprover = this.smsQuotaMatrix.find((val) => {
      return String(val.key) === String(this.data.smsApprover);
    }) || {};
    const status = this.statusList.find(val => {
      return val.key == this.data.status;
    });
    this.setCreditShowFlag(status)
    return [
      {
        key: this.labels.smsQuotaMatrix,
        value: smsApprover.value
      },
      {
        key: this.labels.dateOfRequest,
        value: this.data.dateOfRequest
      },
      {
        key: this.labels.credit,
        value: this.data.totalCredit
      },
      {
        key: this.labels.smsTraffic,
        value: this.data.usedCredit
      },
      {
        key: this.labels.availableCredit,
        value: this.data.balanceCredit
      },
      {
        key: this.labels.status,
        value: status.value
      },
      {
        key: this.labels.onApprovalOf,
        value: this.data.onApprovalOf
      },
      {
        key: this.labels.remark,
        value: this.data.remark
      },
      {
        key: this.labels.statusChangedBy,
        value: localStorage.getItem('userName')
      },
    ];
  }

  setCreditShowFlag(status : any){
    if(status.key == '1')
    this.showCredit = true
  }

  initForm() {
    const userName = localStorage.getItem('userName');
    this.smsCreditAllocation = new FormGroup({
      smsApprover: new FormControl(''),
      totalCredit: new FormControl(null),
      dateOfRequest: new FormControl([null]),
      status: new FormControl([null]),
      onApprovalOf: new FormControl([null]),
      remark: new FormControl([null]),
      usedCredit: new FormControl([null]),
      balanceCredit: new FormControl({value: null, disable: true}),
      approvedBy: new FormControl(userName),
      timeStamp: new FormControl(this.currentDate),
    });
  }

  closeDialog() {
    this.dialogRef.close(this.isDataUpdated);
  }

  onSubmit() {
    if (this.saveForm.invalid) {
      this.isDirty = true;
      this.toasterService.showError('Please fill all the mandatory fields', '');
      return;
    }

    const formValue = this.saveForm.getRawValue();

    const smsCredit: SmsCreditAllocation = {
      approvedBy: formValue.approvedBy,
      balanceCredit: formValue.balanceCredit,
      dateOfRequest: this.customDateAdapter.transform(formValue.dateOfRequest, 'dd/MM/yyyy'),
      onApprovalOf: formValue.onApprovalOf,
      remark: formValue.remark,
      smsApprover: formValue.smsApprover,
      status: formValue.status,
      totalCredit: formValue.totalCredit,
      usedCredit: formValue.usedCredit,
      clientId: this.clientId,
      id: Number(this.data.id),
      requestRaisedBy: this.userName
    };

    console.log('smsCredit', smsCredit);

    this.smsCreditService.saveOrUpdateSmsCreditDetails(smsCredit)
        .subscribe((res: any) => {
          const error = res.Error;
          const errorMessage = res.ErrorMessage;
          if (error !== '0') {
            return this.toasterService.showError(errorMessage, '');
          }
          const processVariables = res.ProcessVariables;
          this.isDataUpdated = processVariables;
          this.edit.emit(processVariables);
          this.toasterService.showSuccess('Data Updated Successfully', '');
          this.resetFormFlag = true;
          this.closeDialog();

        });

    // this.toasterService.showSuccess('Data Saved Successfully','')

    // this.showDataSaveModal = true;
    // this.dataValue= {
    //   title: 'SMS Credit Saved Successfully',
    //   message: 'Are you sure you want to proceed proforma invoice page?'
    // }

  }

  detectDateKeyAction(event, type) {
    console.log(event);
    if (type === 'date') {
      this.smsCreditAllocation.patchValue({
        date: ''
      });
      this.toasterService.showError('Please click the date icon to select date', '');
    }
  }

  saveYes() {
    this.utilService.setCurrentUrl('users/proformaInvoice');
    let pno = '';
    this.utilService.projectNumber$.subscribe((val) => {
      pno = val;
    });
    this.closeDialog();
    this.router.navigate(['/users/proformaInvoice/' + pno]);
  }

  saveCancel() {
    this.showDataSaveModal = false;
    this.closeDialog();
  }

  onEdit() {
    this.showView = false;
    this.smsCreditAllocation.patchValue({
      smsApprover: this.data.smsApprover,
      totalCredit: this.data.totalCredit,
      usedCredit: this.data.usedCredit,
      balanceCredit: this.data.balanceCredit,
      dateOfRequest : this.customDateAdapter.parseToDateObj(this.data.dateOfRequest),
      status : this.data.status,
      onApprovalOf : this.data.onApprovalOf,
      remark : this.data.remark,
      statusChangedBy : localStorage.getItem('userName'),
      timeStamp: this.currentDate
    });
    this.setFormData = this.data;
  }

  ngOnDestroy() {
    this.closeDialog();
  }
  saveUpdateForm(event){
    this.saveForm = event
    console.log('saveForm', event)
  }
}
